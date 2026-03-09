// Razorpay integration stub
// TODO: Replace with actual Razorpay API calls when keys are available

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

/**
 * Create a Razorpay order for booking payment
 * Stub: returns a simulated order object
 */
export async function createOrder(
  amount: number,
  bookingId: string,
  currency: string = 'INR'
): Promise<RazorpayOrder> {
  // TODO: Integrate with Razorpay SDK
  // const Razorpay = require('razorpay');
  // const instance = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET,
  // });
  // return instance.orders.create({ amount: amount * 100, currency, receipt: bookingId });

  console.log(`[Razorpay Stub] Creating order for booking ${bookingId}: ₹${amount}`);

  return {
    id: `order_${Date.now()}_${bookingId}`,
    amount: amount * 100,
    currency,
    status: 'created',
  };
}

/**
 * Verify Razorpay payment signature
 * Stub: always returns true in dev
 */
export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  // TODO: Implement HMAC verification
  // const crypto = require('crypto');
  // const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  // hmac.update(orderId + '|' + paymentId);
  // const generated = hmac.digest('hex');
  // return generated === signature;

  console.log(`[Razorpay Stub] Verifying signature for ${orderId}`);
  return true;
}

/**
 * Razorpay client config for frontend checkout
 */
export function getCheckoutConfig(order: RazorpayOrder) {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    amount: order.amount,
    currency: order.currency,
    name: 'Guardians of Paws',
    description: 'Pet Care Booking',
    order_id: order.id,
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    theme: {
      color: '#E89830',
    },
  };
}
