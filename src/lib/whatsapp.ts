// WhatsApp API integration stub (Meta Cloud API)
// TODO: Replace with actual API calls when access token is available

interface BookingDetails {
  customerName: string;
  phone: string;
  service: 'grooming' | 'boarding';
  date: string;
  slot: string;
  petName: string;
  amount: number;
}

/**
 * Send booking confirmation via WhatsApp template
 * Stub: Logs the payload
 */
export async function sendBookingConfirmation(details: BookingDetails): Promise<boolean> {
  // TODO: Implement Meta Cloud API call
  // const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.META_WHATSAPP_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     messaging_product: 'whatsapp',
  //     to: details.phone,
  //     type: 'template',
  //     template: {
  //       name: 'booking_confirmed_bangalore',
  //       language: { code: 'en' },
  //       components: [{ type: 'body', parameters: [...] }],
  //     },
  //   }),
  // });

  console.log('[WhatsApp Stub] Sending booking confirmation:', {
    to: details.phone,
    template: 'booking_confirmed_bangalore',
    params: {
      customer_name: details.customerName,
      pet_name: details.petName,
      service: details.service,
      date: details.date,
      slot: details.slot,
      amount: `₹${details.amount}`,
    },
  });

  return true;
}

/**
 * Send "Pupdate" — post-session digital report card
 * Stub: Logs the payload
 */
export async function sendPupdate(
  phone: string,
  petName: string,
  sessionNotes: string,
  photos: string[]
): Promise<boolean> {
  console.log('[WhatsApp Stub] Sending Pupdate:', {
    to: phone,
    petName,
    sessionNotes,
    photoCount: photos.length,
  });

  return true;
}

/**
 * Send BBMP renewal alert
 * Stub: Logs the payload
 */
export async function sendRenewalAlert(
  phone: string,
  petName: string,
  documentType: string,
  expiryDate: string
): Promise<boolean> {
  console.log('[WhatsApp Stub] Sending renewal alert:', {
    to: phone,
    petName,
    documentType,
    expiryDate,
  });

  return true;
}
