"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, useCartSubtotal, useCartShipping, useCartTotal } from "@/stores/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const hydrated = useHydrated();
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = useCartSubtotal();
  const shipping = useCartShipping();
  const total = useCartTotal();

  if (!hydrated) {
    return (
      <main className="pt-20 px-6 pb-32 flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-[#a03a0f] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="pt-20 px-6 pb-32 space-y-10">
      {/* Page Header */}
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#a03a0f] font-label font-semibold">
          Your Selection
        </p>
        <h2 className="text-3xl font-headline font-extrabold tracking-tight text-[#4e211e]">
          Shopping Bag
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-[#e09c95] mb-4">
            shopping_bag
          </span>
          <p className="font-headline font-bold text-lg text-[#4e211e] mb-2">Your bag is empty</p>
          <p className="text-sm text-[#834d48] mb-6">
            Discover our curated collection of essentials.
          </p>
          <Link
            href="/products"
            className="bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white px-8 py-3 rounded-full font-label font-semibold"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <section className="space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="flex items-center gap-4 bg-white p-4 rounded-xl"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline font-bold text-sm leading-tight">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.selectedSize, item.selectedColor)
                      }
                    >
                      <span className="material-symbols-outlined text-[#a36761] text-lg hover:text-[#b31b25] transition-colors">
                        delete
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-[#834d48]">
                    Size: {item.selectedSize} | {item.selectedColor}
                  </p>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-headline font-extrabold text-[#a03a0f]">
                      {formatPrice(item.product.price)}
                    </span>
                    <div className="flex items-center bg-[#ffedeb] rounded-full px-2 py-1 gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                      >
                        <span className="material-symbols-outlined text-sm text-[#834d48] font-bold">
                          remove
                        </span>
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                      >
                        <span className="material-symbols-outlined text-sm text-[#a03a0f] font-bold">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Order Summary */}
          <section className="bg-[#ffedeb] rounded-xl p-6 space-y-6">
            <h3 className="font-headline font-bold text-lg">Order Summary</h3>
            {/* Promo Code */}
            <div className="flex gap-2">
              <input
                className="flex-grow bg-white border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#a03a0f] outline-none text-[#4e211e]"
                placeholder="Promo code"
                type="text"
              />
              <button className="bg-[#4e211e] text-[#fff4f3] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                Apply
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-[#834d48]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#834d48]">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-[#a03a0f] font-medium" : ""}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#e09c95]/20 flex justify-between items-end">
                <span className="font-headline font-bold">Total</span>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-[#834d48] leading-none mb-1">
                    Tax Included
                  </p>
                  <p className="text-2xl font-headline font-extrabold text-[#4e211e]">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Button */}
          <Link
            href="/checkout"
            className="w-full bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white font-headline font-bold py-4 rounded-full shadow-[0_12px_32px_-4px_rgba(78,33,30,0.15)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            Proceed to Checkout
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </>
      )}
    </main>
  );
}
