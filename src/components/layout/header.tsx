"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartItemCount } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { useHydrated } from "@/hooks/use-hydrated";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/products" },
  { label: "Categories", href: "/search" },
  { label: "My Orders", href: "/profile" },
  { label: "Wishlist", href: "/profile" },
];

export function Header() {
  const hydrated = useHydrated();
  const cartCount = useCartItemCount();
  const { mobileMenuOpen, setMobileMenu } = useUIStore();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff4f3]/80 backdrop-blur-xl flex items-center justify-between px-6 h-16 max-w-[430px] left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenu}>
          <SheetTrigger className="text-[#4e211e] hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined">menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#fff4f3] p-6">
            <SheetHeader>
              <SheetTitle className="font-headline font-extrabold tracking-tighter text-xl text-[#4e211e]">
                THE EDITORIAL
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#ffedeb] transition-colors text-sm font-bold text-[#4e211e]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <Link href="/" className="font-headline font-extrabold tracking-tighter text-xl text-[#4e211e]">
        THE EDITORIAL
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/cart" className="relative text-[#4e211e] hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined">shopping_bag</span>
          {hydrated && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#a03a0f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
