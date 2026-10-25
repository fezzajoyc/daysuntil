import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Countdown from '@/components/Countdown'
import { jsonLdScript } from '@/lib/jsonld'
import { BASE, fmtDate } from '@/lib/site'
import { HOLIDAYS, YEARS, dateToUTC, daysBetween, getDate, holidayBySlug, todayUTC } from '@/lib/holidays'

/** 节日×年份页(自动续期):该年日期 + 倒计时/已过 + 前后年互链。 */
export const revalidate = 86400

export function generateStaticParams() {
  const out: Array<{ slug: string; year: string }> = []
  for (const h of HOLIDAYS) for (const y of YEARS) out.push({ slug: h.slug, year: String(y) })
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; year: string }>
}): Promise<Metadata> {
  const { slug, year } = await params
  const h = holidayBySlug(slug)
  if (!h) return {}
  const date = getDate(h, Number(year))
  if (!date) return {}
  return {
    title: `${h.name} ${year} — Date, Weekday & Countdown`,
    description: `${h.name} ${year} falls on ${fmtDate(date)}. Countdown, weekday and neighboring years — calendar math, never guessed.`,
    alternates: { canonical: `/holiday/${h.slug}/${year}` },
  }
}

export default async function HolidayYearPage({
  params,
}: {
  params: Promise<{ slug: string; year: string }>
}) {
  const { slug, year: y } = await params
  const year = Number(y)
  const h = holidayBySlug(slug)
  if (!h || !YEARS.includes(year)) notFound()
  const date = getDate(h, year)
  if (!date) notFound()

  const today = todayUTC()
  const todayDate = dateToUTC(new Date())
  const days = daysBetween(todayDate, date)
  const isPast = days < 0
  const isToday = days === 0

  const faqLd = jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `When is ${h.name} ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${h.name} ${year} falls on ${fmtDate(date)}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How many days until ${h.name} ${year}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isPast
            ? `${h.name} ${year} was ${Math.abs(days)} days ago (relative to today).`
            : `${h.name} ${year} is ${days} days from today.`,
        },
      },
    ],
  })

  const prevYear = year - 1
  const nextYear = year + 1
  const prevDate = getDate(h, prevYear)
  const nextDate = getDate(h, nextYear)

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        {h.name} · {isToday ? 'today!' : isPast ? 'past' : 'countdown'}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {h.name} {year}
      </h1>
      <p className="mt-3 text-[15px] text-ink/65">
        {h.name} {year} falls on <strong>{fmtDate(date)}</strong>
        {isPast ? ` — ${Math.abs(days)} days ago.` : isToday ? ' — it\u2019s today!' : ` — ${days} days from today.`}
      </p>

      {isToday || (!isPast && days <= 60) ? (
        <div className="mt-6">
          <Countdown targetISO={date} />
        </div>
      ) : null}

      <AdSlot slot="hy-below-countdown" />

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">{h.name} dates across years</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {YEARS.map((y) => {
            const d = getDate(h, y)
            const on = y === year
            return (
              <Link
                key={y}
                href={`/holiday/${h.slug}/${y}`}
                className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold ${on ? 'border-brand bg-brand text-white' : 'border-ink/12 bg-white hover:border-ink/40'}`}
              >
                {y}
                {d ? <span className="ml-1.5 hidden text-[11px] font-normal opacity-70 sm:inline">{d.slice(5)}</span> : null}
              </Link>
            )
          })}
        </div>
      </section>

      <nav className="mt-8 flex items-center justify-between gap-3 text-[14px]">
        {prevDate ? (
          <Link href={`/holiday/${h.slug}/${prevYear}`} className="font-medium hover:text-brand">
            ← {h.name} {prevYear} ({prevDate})
          </Link>
        ) : <span />}
        <Link href={`/holiday/${h.slug}`} className="font-medium text-ink/60 hover:text-brand">Hub</Link>
        {nextDate ? (
          <Link href={`/holiday/${h.slug}/${nextYear}`} className="font-medium hover:text-brand">
            {h.name} {nextYear} ({nextDate}) →
          </Link>
        ) : <span />}
      </nav>
    </div>
  )
}
