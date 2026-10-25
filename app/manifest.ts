import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DaysUntil — Holiday Countdowns',
    short_name: 'DaysUntil',
    description: 'How many days until every holiday — computed with calendar rules.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff7f0',
    theme_color: '#c2452d',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
