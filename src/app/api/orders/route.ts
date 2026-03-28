import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;

    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch orders error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();

    // Validate required fields
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required and must be a non-empty array.' },
        { status: 400 }
      );
    }

    if (!body.paymentMethod || !['stripe', 'razorpay', 'cod'].includes(body.paymentMethod)) {
      return NextResponse.json(
        { error: 'Valid payment method is required (stripe, razorpay, or cod).' },
        { status: 400 }
      );
    }

    if (!body.shippingAddress || typeof body.shippingAddress !== 'object') {
      return NextResponse.json(
        { error: 'Shipping address is required.' },
        { status: 400 }
      );
    }

    // For non-COD orders, payment must be verified first
    if (body.paymentMethod !== 'cod' && !body.paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required for non-COD orders.' },
        { status: 400 }
      );
    }

    // Calculate totals server-side
    const subtotal = body.items.reduce(
      (sum: number, item: { product: { price: number }; quantity: number }) =>
        sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal >= 5000 ? 0 : 299;
    const total = subtotal + shipping;

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
        status: body.paymentMethod === 'cod' ? 'confirmed' : 'processing',
        payment_method: body.paymentMethod,
        payment_id: body.paymentId || null,
        shipping_address: body.shippingAddress,
        estimated_delivery: estimatedDelivery.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Create order error:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Orders POST error:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
