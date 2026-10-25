import type { MetadataRoute } from 'next'
import { BASE } from '@/lib/site'
import { HOLIDAYS, YEARS } from '@/lib/holidays'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/week-number`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/days-between`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
  const hubs: MetadataRoute.Sitemap = HOLIDAYS.map((h) => ({
    url: `${BASE}/holiday/${h.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))
  const yearPages: MetadataRoute.Sitemap = []
  for (const h of HOLIDAYS) {
    for (const y of YEARS) {
      yearPages.push({
        url: `${BASE}/holiday/${h.slug}/${y}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })
    }
  }
  return [...base, ...hubs, ...yearPages]
}
