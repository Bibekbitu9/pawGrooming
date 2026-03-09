import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Dog Grooming in Bangalore – Book Online',
  description:
    'Book a professional grooming session for your dog in Bangalore. 1-hour premium packages from ₹999. Available 9 AM – 6 PM, Mon-Sat. BBMP-compliant salon.',
};

export default function GroomingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
