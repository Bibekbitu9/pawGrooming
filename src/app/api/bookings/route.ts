import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { type, date, slotKey, petName, petBreed, petWeight, instructions, packageName, amount } = body;

    if (!type || !date || !slotKey || !petName) {
      return NextResponse.json(
        { error: 'Missing required fields: type, date, slotKey, petName' },
        { status: 400 }
      );
    }

    // TODO: Save to database via Prisma
    // const booking = await prisma.booking.create({ ... });

    // TODO: Create Razorpay order
    // const { createOrder } = await import('@/lib/razorpay');
    // const order = await createOrder(amount, booking.id);

    const booking = {
      id: `booking_${Date.now()}`,
      type,
      date,
      slotKey,
      petName,
      petBreed,
      petWeight,
      instructions,
      packageName,
      amount,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    };

    console.log('[Bookings API] Created booking:', booking);

    return NextResponse.json({
      booking,
      // razorpayOrder: order,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('[Bookings API] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/bookings
 * List bookings (stub)
 */
export async function GET() {
  // TODO: Fetch from database, filter by user
  return NextResponse.json({
    bookings: [],
    message: 'No bookings found (stub)',
  });
}
