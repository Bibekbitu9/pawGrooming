import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Pet Boarding in Bangalore – Half-Day & Full-Day',
  description:
    'Premium pet boarding in Bangalore with climate-controlled suites, webcam access, and daily Pupdates. Half-day shifts from ₹899, full-day from ₹1,799.',
};

export default function BoardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
