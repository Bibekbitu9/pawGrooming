import { MetadataRoute } from 'next';
import { BANGALORE_NEIGHBORHOODS } from '@/lib/neighborhoods';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guardiansofpaws.in';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/grooming`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/boarding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pet-vault`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const neighborhoodPages: MetadataRoute.Sitemap = BANGALORE_NEIGHBORHOODS.map((n) => ({
    url: `${baseUrl}/areas/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...neighborhoodPages];
}
