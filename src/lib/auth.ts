import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase-server';

const providers: NextAuthOptions['providers'] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

providers.push(
  CredentialsProvider({
    name: 'Email',
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password || !isSupabaseConfigured) {
        return null;
      }

      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error || !data.user) {
        return null;
      }

      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('name, tier, avatar_url')
        .eq('id', data.user.id)
        .single();

      return {
        id: data.user.id,
        email: data.user.email!,
        name: profile?.name || data.user.email!,
        image: profile?.avatar_url || null,
        tier: profile?.tier || 'bronze',
      };
    },
  })
);

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && isSupabaseConfigured) {
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
        const supaUser = existingUser?.users?.find(
          (u) => u.email === user.email
        );

        if (!supaUser) {
          const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
            email: user.email!,
            email_confirm: true,
            user_metadata: { name: user.name, avatar_url: user.image },
          });

          if (!error && newUser.user) {
            user.id = newUser.user.id;
          }
        } else {
          user.id = supaUser.id;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tier = (user as { tier?: string }).tier || 'bronze';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { tier: string }).tier = (token.tier as string) || 'bronze';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
};
