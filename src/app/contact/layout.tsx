import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – Premium Pet Care Bangalore',
  description:
    'Get in touch with Guardians of Paws. Located in Koramangala, Bangalore. Call, WhatsApp, or visit us for premium pet boarding and grooming.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
