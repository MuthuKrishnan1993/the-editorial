import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, color) =>
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedSize === size &&
                item.selectedColor === color
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { product, quantity: 1, selectedSize: size, selectedColor: color },
            ],
          };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        })),

      updateQuantity: (productId, size, color, qty) =>
        set((state) => {
          if (qty <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product.id === productId &&
                    item.selectedSize === size &&
                    item.selectedColor === color
                  )
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
                ? { ...item, quantity: qty }
                : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'editorial-cart' }
  )
);

/** Computed: total number of items in cart */
export const useCartItemCount = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

/** Computed: cart subtotal */
export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

/** Computed: shipping cost (free over $200, else $15) */
export const useCartShipping = () =>
  useCartStore((state) => {
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return subtotal >= 200 ? 0 : 15;
  });

/** Computed: cart total (subtotal + shipping) */
export const useCartTotal = () =>
  useCartStore((state) => {
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal >= 200 ? 0 : 15;
    return subtotal + shipping;
  });
