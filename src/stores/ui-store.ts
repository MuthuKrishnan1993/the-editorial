import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  cartSheetOpen: boolean;
  setMobileMenu: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCartSheet: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  cartSheetOpen: false,

  setMobileMenu: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setCartSheet: (open) => set({ cartSheetOpen: open }),
}));
