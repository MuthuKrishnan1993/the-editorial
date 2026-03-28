'use client';

import { useState, useCallback, useEffect } from 'react';
import type { CartItem, Address } from '@/types';

type PaymentProvider = 'stripe' | 'razorpay' | 'cod';

interface PaymentState {
  provider: PaymentProvider | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  orderId: string | null;
}

interface UsePaymentOptions {
  items: CartItem[];
  shippingAddress: Address;
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

export function usePayment({ items, shippingAddress, onSuccess, onError }: UsePaymentOptions) {
  const [state, setState] = useState<PaymentState>({
    provider: null,
    loading: false,
    error: null,
    success: false,
    orderId: null,
  });

  const selectProvider = useCallback((provider: PaymentProvider) => {
    setState((prev) => ({ ...prev, provider, error: null }));
  }, []);

  const processStripePayment = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch('/api/payments/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingAddress }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      // Load Stripe.js dynamically
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (!stripeJs) {
        throw new Error('Failed to load Stripe');
      }

      const { error: confirmError, paymentIntent } = await stripeJs.confirmPayment({
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order/confirmation`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment failed');
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Verify payment on server
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: 'stripe',
            paymentIntentId: paymentIntent.id,
            items,
            shippingAddress,
          }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
          throw new Error(verifyData.error || 'Payment verification failed');
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          success: true,
          orderId: verifyData.orderId,
        }));
        onSuccess?.(verifyData.orderId);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      onError?.(message);
    }
  }, [items, shippingAddress, onSuccess, onError]);

  const processRazorpayPayment = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingAddress }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create Razorpay order');
      }

      // Load Razorpay checkout script
      await loadRazorpayScript();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount * 100,
        currency: data.currency,
        name: 'THE EDITORIAL',
        description: `Order of ${items.length} item(s)`,
        order_id: data.orderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                provider: 'razorpay',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                items,
                shippingAddress,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            setState((prev) => ({
              ...prev,
              loading: false,
              success: true,
              orderId: verifyData.orderId,
            }));
            onSuccess?.(verifyData.orderId);
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Verification failed';
            setState((prev) => ({ ...prev, loading: false, error: message }));
            onError?.(message);
          }
        },
        modal: {
          ondismiss: () => {
            setState((prev) => ({ ...prev, loading: false }));
          },
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new (window as unknown as { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options);
      rzp.open();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      onError?.(message);
    }
  }, [items, shippingAddress, onSuccess, onError]);

  const processCODPayment = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          paymentMethod: 'cod',
          shippingAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        orderId: data.order.id,
      }));
      onSuccess?.(data.order.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to place order';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      onError?.(message);
    }
  }, [items, shippingAddress, onSuccess, onError]);

  const pay = useCallback(() => {
    switch (state.provider) {
      case 'stripe':
        return processStripePayment();
      case 'razorpay':
        return processRazorpayPayment();
      case 'cod':
        return processCODPayment();
      default:
        setState((prev) => ({ ...prev, error: 'Please select a payment method' }));
        return Promise.resolve();
    }
  }, [state.provider, processStripePayment, processRazorpayPayment, processCODPayment]);

  const reset = useCallback(() => {
    setState({
      provider: null,
      loading: false,
      error: null,
      success: false,
      orderId: null,
    });
  }, []);

  return {
    ...state,
    selectProvider,
    pay,
    reset,
  };
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.head.appendChild(script);
  });
}

// ---------------------
// UI Component
// ---------------------

const PAYMENT_METHODS: { id: PaymentProvider; label: string; description: string; icon: string }[] = [
  {
    id: 'stripe',
    label: 'Credit / Debit Card',
    description: 'Pay securely with Visa, Mastercard, or Amex',
    icon: 'card',
  },
  {
    id: 'razorpay',
    label: 'UPI / Netbanking',
    description: 'Pay with UPI, Netbanking, or Wallets via Razorpay',
    icon: 'upi',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when your order is delivered',
    icon: 'cash',
  },
];

function PaymentIcon({ type }: { type: string }) {
  switch (type) {
    case 'card':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case 'upi':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M8 7l4 5-4 5" />
          <path d="M16 7l-4 5 4 5" />
        </svg>
      );
    case 'cash':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M2 10h2M20 10h2M2 14h2M20 14h2" />
        </svg>
      );
    default:
      return null;
  }
}

interface PaymentSelectorProps {
  items: CartItem[];
  shippingAddress: Address;
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

export default function PaymentSelector({
  items,
  shippingAddress,
  onSuccess,
  onError,
}: PaymentSelectorProps) {
  const {
    provider,
    loading,
    error,
    success,
    orderId,
    selectProvider,
    pay,
  } = usePayment({ items, shippingAddress, onSuccess, onError });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (success && orderId) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <div className="mb-2 text-2xl text-green-600">Order Confirmed</div>
        <p className="text-sm text-green-700">
          Your order <span className="font-mono font-semibold">{orderId.slice(0, 8)}</span> has been placed successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight">Payment Method</h3>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => selectProvider(method.id)}
            disabled={loading}
            className={`w-full flex items-center gap-4 rounded-lg border p-4 text-left transition-all ${
              provider === method.id
                ? 'border-black bg-neutral-50 ring-1 ring-black'
                : 'border-neutral-200 hover:border-neutral-400'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className={`flex-shrink-0 ${provider === method.id ? 'text-black' : 'text-neutral-400'}`}>
              <PaymentIcon type={method.icon} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{method.label}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{method.description}</div>
            </div>
            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                provider === method.id ? 'border-black' : 'border-neutral-300'
              }`}
            >
              {provider === method.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-black" />
              )}
            </div>
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={pay}
        disabled={!provider || loading || items.length === 0}
        className={`w-full rounded-lg bg-black py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-opacity ${
          !provider || loading || items.length === 0
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:opacity-80'
        }`}
      >
        {loading ? 'Processing...' : provider === 'cod' ? 'Place Order' : 'Pay Now'}
      </button>
    </div>
  );
}
