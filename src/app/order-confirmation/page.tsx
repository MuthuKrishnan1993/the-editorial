"use client";

import Link from "next/link";

const timelineSteps = [
  { label: "Order Confirmed", time: "Just now", active: true },
  { label: "Processing", time: "Estimated: Today", active: false },
  { label: "Shipped", time: "Estimated: Mar 29", active: false },
  { label: "Delivered", time: "Estimated: Mar 31 - Apr 2", active: false },
];

export default function OrderConfirmationPage() {
  const orderNumber = `#ED-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pb-8">
      {/* Success Animation */}
      <div className="animate-check mb-8">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
          <span
            className="material-symbols-outlined text-white text-5xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
      </div>

      <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#834d48] mb-2">
        Order Placed
      </span>
      <h1 className="font-headline text-3xl font-extrabold tracking-tight text-[#4e211e] text-center mb-2">
        Thank You!
      </h1>
      <p className="text-sm text-[#834d48] text-center max-w-xs mb-8">
        Your order has been confirmed and will be shipping soon.
      </p>

      {/* Order Info Card */}
      <div className="w-full bg-white rounded-2xl p-6 space-y-5 shadow-sm mb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#834d48] font-semibold">
              Order Number
            </p>
            <p className="font-headline font-extrabold text-[#4e211e] text-lg mt-0.5">
              {orderNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#834d48] font-semibold">
              Estimated Delivery
            </p>
            <p className="font-headline font-bold text-[#a03a0f] text-sm mt-0.5">
              Mar 31 - Apr 2
            </p>
          </div>
        </div>

        <div className="border-t border-[#e09c95]/15 pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#834d48]">Subtotal</span>
            <span className="font-medium text-[#4e211e]">$529.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#834d48]">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#e09c95]/15">
            <span className="font-headline font-bold text-[#4e211e]">Total Paid</span>
            <span className="font-headline font-extrabold text-[#4e211e] text-xl">$529.00</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full bg-[#ffedeb] rounded-2xl p-6 mb-8">
        <h3 className="font-headline font-bold text-sm text-[#4e211e] mb-5">Order Status</h3>
        <div className="space-y-0">
          {timelineSteps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step.active ? "bg-green-500" : "bg-[#e09c95]/40"
                  }`}
                />
                {i < timelineSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-8 ${
                      step.active ? "bg-green-500/30" : "bg-[#e09c95]/20"
                    }`}
                  />
                )}
              </div>
              <div className={i < timelineSteps.length - 1 ? "pb-6" : ""}>
                <p
                  className={`text-sm -mt-1 ${
                    step.active
                      ? "font-semibold text-[#4e211e]"
                      : "font-medium text-[#834d48]"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    step.active ? "text-[#834d48]" : "text-[#834d48]/60"
                  }`}
                >
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <Link
          href="/"
          className="w-full bg-gradient-to-br from-[#fe7e4f] to-[#a03a0f] text-white font-headline font-bold py-4 rounded-full shadow-[0_12px_32px_-4px_rgba(78,33,30,0.15)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Continue Shopping
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
        <Link
          href="/profile"
          className="w-full py-4 rounded-full bg-[#ffdad6] text-[#4e211e] font-headline font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          View My Orders
        </Link>
      </div>
    </main>
  );
}
