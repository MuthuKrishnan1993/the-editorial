"use client";

import Link from "next/link";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";

const menuItems = [
  { icon: "shopping_bag", label: "My Orders", description: "Track, return, or buy again", href: "/cart" },
  { icon: "favorite", label: "Wishlist", description: "Your saved items", href: "#" },
  { icon: "location_on", label: "Addresses", description: "Manage delivery addresses", href: "#" },
  { icon: "credit_card", label: "Payment Methods", description: "Cards, UPI & wallets", href: "#" },
  { icon: "notifications", label: "Notifications", description: "Preferences & alerts", href: "#" },
];

export default function ProfilePage() {
  const hydrated = useHydrated();
  const wishlistItems = useWishlistStore((s) => s.items);

  return (
    <main className="pt-20 pb-32 px-6 space-y-8">
      {/* Profile Card */}
      <section className="flex flex-col items-center text-center pt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] flex items-center justify-center mb-4 shadow-lg">
          <span className="material-symbols-outlined text-white text-4xl">person</span>
        </div>
        <h2 className="font-headline font-extrabold text-2xl text-[#4e211e]">Julianne Moore</h2>
        <p className="text-sm text-[#834d48] mt-1">julianne@editorial.com</p>
        <div className="flex gap-6 mt-5">
          <div className="text-center">
            <p className="font-headline font-extrabold text-lg text-[#4e211e]">12</p>
            <p className="text-[10px] uppercase tracking-widest text-[#834d48] font-semibold">
              Orders
            </p>
          </div>
          <div className="w-px bg-[#e09c95]/30" />
          <div className="text-center">
            <p className="font-headline font-extrabold text-lg text-[#4e211e]">
              {hydrated ? wishlistItems.length : 0}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#834d48] font-semibold">
              Wishlist
            </p>
          </div>
          <div className="w-px bg-[#e09c95]/30" />
          <div className="text-center">
            <p className="font-headline font-extrabold text-lg text-[#a03a0f]">Gold</p>
            <p className="text-[10px] uppercase tracking-widest text-[#834d48] font-semibold">
              Tier
            </p>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-[#ffedeb] transition-colors"
          >
            <div className="w-10 h-10 bg-[#ffedeb] rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[#a03a0f]">{item.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#4e211e]">{item.label}</p>
              <p className="text-xs text-[#834d48]">{item.description}</p>
            </div>
            <span className="material-symbols-outlined text-[#834d48] text-xl">
              chevron_right
            </span>
          </Link>
        ))}
      </section>

      {/* Editorial Circle */}
      <section className="rounded-2xl bg-[#240303] p-6 text-center">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#ce8c86]">
          Editorial Circle
        </span>
        <h3 className="font-headline text-xl font-bold text-white mt-2">Gold Member</h3>
        <p className="text-sm text-[#ce8c86] mt-2">
          Free shipping on all orders + early access to new collections
        </p>
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-[#fe7e4f] to-[#a03a0f] rounded-full" />
        </div>
        <p className="text-xs text-[#ce8c86] mt-2">$150 more to reach Platinum</p>
      </section>

      {/* Sign Out */}
      <button className="w-full py-3 text-sm font-semibold text-[#b31b25] border border-[#b31b25]/20 rounded-full hover:bg-[#b31b25]/5 transition-colors">
        Sign Out
      </button>
    </main>
  );
}
