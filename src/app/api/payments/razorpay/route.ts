import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { CartItem, Address } from '@/types';

interface RazorpayPaymentRequest {
  items: CartItem[];
  shippingAddress: Address;
}

function validateItems(items: unknown): items is CartItem[] {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      item.product &&
      typeof item.product.id === 'string' &&
      typeof item.product.name === 'string' &&
      typeof item.product.price === 'number' &&
      item.product.price > 0 &&
      typeof item.quantity === 'number' &&
      item.quantity > 0 &&
      Number.isInteger(item.quantity)
  );
}

function validateAddress(address: unknown): address is Address {
  if (!address || typeof address !== 'object') return false;
  const a = address as Record<string, unknown>;
  return (
    typeof a.fullName === 'string' &&
    a.fullName.length > 0 &&
    typeof a.street === 'string' &&
    a.street.length > 0 &&
    typeof a.city === 'string' &&
    a.city.length > 0 &&
    typeof a.state === 'string' &&
    a.state.length > 0 &&
    typeof a.postalCode === 'string' &&
    a.postalCode.length > 0 &&
    typeof a.country === 'string' &&
    a.country.length > 0
  );
}

function calculateTotal(items: CartItem[]): { subtotal: number; shipping: number; total: number } {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 5000 ? 0 : 299;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: RazorpayPaymentRequest = await request.json();

    if (!validateItems(body.items)) {
      return NextResponse.json(
        { error: 'Invalid items. Each item must have a valid product and positive quantity.' },
        { status: 400 }
      );
    }

    if (!validateAddress(body.shippingAddress)) {
      return NextResponse.json(
        { error: 'Invalid shipping address. All required fields must be provided.' },
        { status: 400 }
      );
    }

    const { subtotal, shipping, total } = calculateTotal(body.items);

    // Dynamic import for Razorpay (server-only module)
    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId: (session.user as { id: string }).id,
        itemCount: String(body.items.length),
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: total,
      currency: 'INR',
      subtotal,
      shipping,
    });
  } catch (error) {
    console.error('Razorpay payment error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
