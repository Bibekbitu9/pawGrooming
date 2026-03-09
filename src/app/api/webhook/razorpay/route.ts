import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/webhook/razorpay
 * Receives Razorpay payment.captured events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-razorpay-signature') || '';

    // TODO: Verify HMAC signature with Razorpay webhook secret
    // const { verifySignature } = await import('@/lib/razorpay');
    // if (!verifySignature(body.payload.payment.entity.order_id, body.payload.payment.entity.id, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    const event = body.event;

    if (event === 'payment.captured') {
      const payment = body.payload?.payment?.entity;
      console.log('[Razorpay Webhook] Payment captured:', {
        orderId: payment?.order_id,
        paymentId: payment?.id,
        amount: payment?.amount,
        currency: payment?.currency,
      });

      // TODO: Update booking status in database
      // TODO: Trigger WhatsApp confirmation
      // const { sendBookingConfirmation } = await import('@/lib/whatsapp');
      // await sendBookingConfirmation({ ... });

      return NextResponse.json({ status: 'ok', message: 'Payment processed' });
    }

    return NextResponse.json({ status: 'ok', message: 'Event ignored' });
  } catch (error) {
    console.error('[Razorpay Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
