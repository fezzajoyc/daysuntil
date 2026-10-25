import { NextResponse } from 'next/server'
import { BASE, SITE_NAME } from '@/lib/site'
import { HOLIDAYS } from '@/lib/holidays'

export const revalidate = 86400

export function GET(): Response {
  const body = `# ${SITE_NAME}

> Live holiday countdowns and exact dates for ${HOLIDAYS.length} holidays, ${2024}-${2030}, computed with standard calendar rules (fixed dates, nth-weekday, Gregorian computus for Easter).
> Live at ${BASE} . Pure calendar math — nothing guessed. AI crawlers and agents are welcome.

## Endpoints

- ${BASE}/api/holiday — upcoming holidays with days remaining
- ${BASE}/api/holiday?slug=christmas — all computed dates for one holiday
- ${BASE}/sitemap.xml — full URL list

## Pages

- /holiday/<slug> — live countdown to next occurrence + full date table
- /holiday/<slug>/<year> — one page per holiday per year (${HOLIDAYS.length} × 7)
- /week-number — current ISO-8601 week
- /days-between — date difference calculator

## Facts & policy

- All dates computed from calendar rules or published tables for lunar-calendar holidays.
- Countdowns tick to holiday midnight UTC.
`
  return new NextResponse(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
  })
}
