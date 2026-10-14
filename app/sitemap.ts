import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { publications } from '@/lib/data/publications';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...publications.map((pub) => ({
      url: `${baseUrl}/publications/${pub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/visiting-card`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
