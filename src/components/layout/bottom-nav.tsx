"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartItemCount } from "@/stores/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";

const navItems = [
  { icon: "home", href: "/", label: "Home" },
  { icon: "search", href: "/search", label: "Search" },
  { icon: "shopping_cart", href: "/cart", label: "Cart" },
  { icon: "person", href: "/profile", label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useCartItemCount();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="bg-white/80 backdrop-blur-xl w-[90%] max-w-md rounded-full px-6 py-3 shadow-[0_12px_32px_-4px_rgba(78,33,30,0.08)] flex justify-around items-center pointer-events-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center justify-center p-3 rounded-full transition-colors ${
                active
                  ? "bg-[#ffedeb] text-[#FF7F50]"
                  : "text-[#4e211e] hover:bg-[#ffedeb]"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              {item.icon === "shopping_cart" && hydrated && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#a03a0f] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
