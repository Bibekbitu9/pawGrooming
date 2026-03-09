export interface Neighborhood {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  mapEmbed?: string;
}

export const BANGALORE_NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'koramangala',
    name: 'Koramangala',
    tagline: 'The Heart of Pet-Friendly Bangalore',
    description:
      'Serving Koramangala\'s vibrant pet parent community with premium grooming and boarding. Just minutes from Forum Mall and Koramangala 5th Block.',
  },
  {
    slug: 'indiranagar',
    name: 'Indiranagar',
    tagline: 'Where Paws Meet Style',
    description:
      'Premium pet care for Indiranagar\'s discerning pet parents. Located near 100 Feet Road with easy access from all blocks.',
  },
  {
    slug: 'whitefield',
    name: 'Whitefield',
    tagline: 'Tech Park Pets Deserve the Best',
    description:
      'Convenient boarding and grooming for Whitefield\'s busy tech professionals. Drop off before work, pick up after.',
  },
  {
    slug: 'hsr-layout',
    name: 'HSR Layout',
    tagline: 'Your Neighborhood Pet Haven',
    description:
      'Trusted pet care in HSR Layout. Our dedicated team ensures your furry friend enjoys every moment of their stay.',
  },
  {
    slug: 'jayanagar',
    name: 'Jayanagar',
    tagline: 'Classic Care for Your Companion',
    description:
      'Bringing premium pet services to Jayanagar\'s beloved community. BBMP-compliant and vet-supervised care.',
  },
  {
    slug: 'marathahalli',
    name: 'Marathahalli',
    tagline: 'Pawfect Care on the ORR',
    description:
      'Easily accessible from Outer Ring Road, Marathahalli. Ideal for pet parents commuting to and from tech corridors.',
  },
  {
    slug: 'jp-nagar',
    name: 'JP Nagar',
    tagline: 'South Bangalore\'s Pet Destination',
    description:
      'Premium pet grooming and boarding serving JP Nagar and surrounding areas. Climate-controlled suites and professional groomers.',
  },
  {
    slug: 'electronic-city',
    name: 'Electronic City',
    tagline: 'Smart Care for Smart Pets',
    description:
      'India\'s tech capital deserves tech-forward pet care. Real-time webcam updates and digital health reports.',
  },
];
