import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: new Date('2026-08-03'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}
