"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, useCartSubtotal, useCartShipping, useCartTotal } from "@/stores/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "upi" | "card" | "cod";

const paymentOptions: { id: PaymentMethod; icon: string; label: string; description: string }[] = [
  { id: "upi", icon: "account_balance_wallet", label: "UPI Transfer", description: "Instant & Secure" },
  { id: "card", icon: "credit_card", label: "Credit / Debit Card", description: "Visa, Mastercard, Amex" },
  { id: "cod", icon: "payments", label: "Cash on Delivery", description: "Pay when you receive" },
];

export default function CheckoutPage() {
  const hydrated = useHydrated();
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const subtotal = useCartSubtotal();
  const shipping = useCartShipping();
  const total = useCartTotal();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [name, setName] = useState("Julianne Moore");
  const [address, setAddress] = useState("742 Evergreen Terrace, Springfield, OR 97403");
  const [phone, setPhone] = useState("+1 (555) 0123-4567");

  if (!hydrated) {
    return (
      <main className="pt-20 px-6 pb-32 flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-[#a03a0f] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/order-confirmation");
  };

  return (
    <>
      <header className="fixed top-0 w-full max-w-[430px] left-1/2 -translate-x-1/2 z-50 bg-[#fff4f3]/80 backdrop-blur-xl flex items-center justify-between px-6 h-16">
        <Link href="/cart" className="flex items-center">
          <span className="material-symbols-outlined text-[#4e211e]">arrow_back</span>
        </Link>
        <h1 className="text-xl font-extrabold tracking-tighter text-[#4e211e] font-headline">
          Checkout
        </h1>
        <div className="w-6" />
      </header>

      <main className="pt-20 pb-32 px-5 space-y-10">
        {/* Delivery Address Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-baseline">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#834d48] font-label">
              Delivery Address
            </h2>
            <span className="text-xs font-semibold text-[#a03a0f]">Edit</span>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-tighter text-[#a36761]">
                Full Name
              </label>
              <input
                className="w-full bg-[#ffedeb] border-none rounded-lg py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-[#a03a0f] outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-tighter text-[#a36761]">
                Shipping Address
              </label>
              <textarea
                className="w-full bg-[#ffedeb] border-none rounded-lg py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-[#a03a0f] outline-none resize-none"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-tighter text-[#a36761]">
                Phone Number
              </label>
              <input
                className="w-full bg-[#ffedeb] border-none rounded-lg py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-[#a03a0f] outline-none"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Payment Method Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#834d48] font-label">
            Payment Method
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                className={`relative flex items-center justify-between p-4 bg-white rounded-xl cursor-pointer border-2 transition-all active:scale-95 ${
                  paymentMethod === option.id
                    ? "border-[#a03a0f]"
                    : "border-transparent hover:border-[#e09c95]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={paymentMethod === option.id}
                  onChange={() => setPaymentMethod(option.id)}
                />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#ffedeb] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#a03a0f]">
                      {option.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#4e211e]">{option.label}</p>
                    <p className="text-[10px] text-[#834d48] font-medium">{option.description}</p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === option.id
                      ? "border-[#a03a0f] bg-[#a03a0f]"
                      : "border-[#e09c95]"
                  }`}
                >
                  {paymentMethod === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Order Summary Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#834d48] font-label">
            Order Summary
          </h2>
          <div className="bg-[#ffedeb] rounded-xl p-5 space-y-4">
            {items.slice(0, 2).map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#4e211e] leading-tight">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-[#834d48] mt-1">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </p>
                  <p className="text-sm font-extrabold text-[#a03a0f] mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-[#e09c95]/20 space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#834d48]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-[#834d48]">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 uppercase font-bold tracking-tighter" : ""}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-[#4e211e] uppercase tracking-widest">
                  Total Amount
                </span>
                <span className="text-xl font-black text-[#4e211e] font-headline tracking-tighter">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Action Area */}
      <div className="fixed bottom-0 w-full max-w-[430px] left-1/2 -translate-x-1/2 p-6 bg-[#fff4f3]/90 backdrop-blur-xl z-50">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white py-4 px-6 rounded-full font-bold text-base tracking-tight shadow-[0_12px_32px_-4px_rgba(78,33,30,0.08)] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <span>Place Order</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </>
  );
}
