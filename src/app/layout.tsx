import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import GeoModal from '@/components/GeoModal';
import { getLocalBusinessSchema } from '@/lib/jsonld';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Guardians of Paws | Premium Pet Boarding & Grooming in Bangalore',
    template: '%s | Guardians of Paws – Bangalore',
  },
  description:
    'Bangalore\'s most trusted pet boarding and grooming service. BBMP-compliant, vet-approved, with AI-powered health tracking. Book your furry friend\'s stay today!',
  keywords: [
    'pet boarding Bangalore',
    'dog grooming Bangalore',
    'pet care Koramangala',
    'dog boarding Indiranagar',
    'pet grooming near me',
    'BBMP pet registration',
    'premium pet care Bangalore',
    'Guardians of Paws',
  ],
  authors: [{ name: 'Guardians of Paws' }],
  creator: 'Guardians of Paws',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://guardiansofpaws.in',
    siteName: 'Guardians of Paws',
    title: 'Guardians of Paws | Premium Pet Boarding & Grooming in Bangalore',
    description:
      'Bangalore\'s most trusted pet boarding and grooming service. Book premium care for your furry family member.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guardians of Paws – Premium Pet Care in Bangalore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guardians of Paws | Premium Pet Care Bangalore',
    description: 'BBMP-compliant pet boarding & grooming with AI-powered health tracking.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://guardiansofpaws.in'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <Header />
        <GeoModal />
        <main className="min-h-screen pt-0 md:pt-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
