import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutShell } from "@/components/layout/layout-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE EDITORIAL | The Art of Essentialism",
  description:
    "Premium fashion e-commerce — curated essentials for the modern wardrobe. Sustainable, timeless pieces crafted with intention.",
  manifest: "/manifest.json",
  themeColor: "#a03a0f",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "THE EDITORIAL",
  },
  openGraph: {
    title: "THE EDITORIAL | The Art of Essentialism",
    description: "Premium fashion e-commerce — curated essentials for the modern wardrobe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, manrope.variable)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-[#fff4f3] text-[#4e211e] min-h-screen">
        <div className="max-w-[430px] mx-auto relative">
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
