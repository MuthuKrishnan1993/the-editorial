import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase-server';
import crypto from 'crypto';

interface StripeVerifyRequest {
  provider: 'stripe';
  paymentIntentId: string;
  items: { product: { id: string; name: string; price: number }; quantity: number; selectedSize: string; selectedColor: string }[];
  shippingAddress: Record<string, unknown>;
}

interface RazorpayVerifyRequest {
  provider: 'razorpay';
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  items: { product: { id: string; name: string; price: number }; quantity: number; selectedSize: string; selectedColor: string }[];
  shippingAddress: Record<string, unknown>;
}

type VerifyRequest = StripeVerifyRequest | RazorpayVerifyRequest;

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: VerifyRequest = await request.json();
    const userId = (session.user as { id: string }).id;

    if (!body.provider || !['stripe', 'razorpay'].includes(body.provider)) {
      return NextResponse.json(
        { error: 'Invalid payment provider. Must be "stripe" or "razorpay".' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required.' },
        { status: 400 }
      );
    }

    if (!body.shippingAddress || typeof body.shippingAddress !== 'object') {
      return NextResponse.json(
        { error: 'Shipping address is required.' },
        { status: 400 }
      );
    }

    let paymentId: string;
    let paymentMethod: 'stripe' | 'razorpay';

    if (body.provider === 'stripe') {
      if (!isStripeConfigured || !stripe) {
        return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
      }
      const stripeBody = body as StripeVerifyRequest;
      if (!stripeBody.paymentIntentId) {
        return NextResponse.json(
          { error: 'Payment intent ID is required for Stripe verification.' },
          { status: 400 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(
        stripeBody.paymentIntentId
      );

      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: `Payment not completed. Status: ${paymentIntent.status}` },
          { status: 400 }
        );
      }

      paymentId = stripeBody.paymentIntentId;
      paymentMethod = 'stripe';
    } else {
      const rpBody = body as RazorpayVerifyRequest;
      if (!rpBody.razorpayOrderId || !rpBody.razorpayPaymentId || !rpBody.razorpaySignature) {
        return NextResponse.json(
          { error: 'Razorpay order ID, payment ID, and signature are required.' },
          { status: 400 }
        );
      }

      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(`${rpBody.razorpayOrderId}|${rpBody.razorpayPaymentId}`)
        .digest('hex');

      if (expectedSignature !== rpBody.razorpaySignature) {
        return NextResponse.json(
          { error: 'Invalid payment signature. Verification failed.' },
          { status: 400 }
        );
      }

      paymentId = rpBody.razorpayPaymentId;
      paymentMethod = 'razorpay';
    }

    // Calculate totals server-side
    const subtotal = body.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal >= 5000 ? 0 : 299;
    const total = subtotal + shipping;

    // Estimated delivery: 5-7 business days
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        items: body.items,
        subtotal,
        shipping,
        total,
        status: 'confirmed',
        payment_method: paymentMethod,
        payment_id: paymentId,
        shipping_address: body.shippingAddress,
        estimated_delivery: estimatedDelivery.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Order creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
