import { NextResponse } from 'next/server'
import { HOLIDAYS, getDate, holidayBySlug, todayUTC, upcoming } from '@/lib/holidays'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const year = Number(searchParams.get('year') ?? 0)

  if (slug) {
    const h = holidayBySlug(slug)
    if (!h) return NextResponse.json({ error: 'unknown holiday slug' }, { status: 404 })
    const today = todayUTC()
    const dates: Record<string, string> = {}
    for (let y = 2024; y <= 2030; y += 1) {
      const d = getDate(h, y)
      if (d) dates[String(y)] = d
    }
    return NextResponse.json(
      { holiday: { name: h.name, slug: h.slug }, dates, today, source: 'computed calendar rules' },
      { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=86400' } },
    )
  }
  return NextResponse.json(
    { holidays: HOLIDAYS.length, upcoming: upcoming().map((u) => ({ slug: u.holiday.slug, name: u.holiday.name, date: u.date, days: u.days })), usage: '?slug=<holiday>&year=2026 for dates' },
    { headers: { 'access-control-allow-origin': '*' } },
  )
}
