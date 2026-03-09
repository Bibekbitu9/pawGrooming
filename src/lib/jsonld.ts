export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://guardiansofpaws.in',
    name: 'Guardians of Paws – Bangalore',
    description:
      'Premium pet boarding and grooming services in Bangalore. BBMP-compliant, vet-approved care for your furry family members.',
    image: 'https://guardiansofpaws.in/og-image.jpg',
    url: 'https://guardiansofpaws.in',
    telephone: '+91-9876543210',
    email: 'hello@guardiansofpaws.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '42, 4th Cross Road, Koramangala 5th Block',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560095',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9352,
      longitude: 77.6245,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Credit Card, Debit Card, Cash',
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet Care Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Pet Grooming',
            description: '1-hour professional grooming sessions including bath, trim, nail clipping, and ear cleaning.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Boarding - Half Day',
            description: 'Comfortable half-day boarding in climate-controlled suites with webcam access.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Boarding - Full Day',
            description: '24-hour premium boarding with dedicated caretaker, play sessions, and meal service.',
          },
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/guardiansofpaws',
      'https://www.facebook.com/guardiansofpaws',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '247',
    },
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  price: string;
  area: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Guardians of Paws – Bangalore',
    },
    areaServed: {
      '@type': 'Place',
      name: service.area,
    },
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'INR',
    },
  };
}
