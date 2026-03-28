"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { BottomNav } from "./bottom-nav";

const hideHeaderRoutes = ["/checkout", "/order-confirmation", "/search"];
const hideBottomNavRoutes = ["/checkout", "/order-confirmation"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const showBottomNav = !hideBottomNavRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      {children}
      {showBottomNav && <BottomNav />}
    </>
  );
}
