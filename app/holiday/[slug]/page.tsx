import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Countdown from '@/components/Countdown'
import { jsonLdScript, breadcrumbLd } from '@/lib/jsonld'
import { BASE, fmtDate } from '@/lib/site'
import { HOLIDAYS, YEARS, dateToUTC, daysBetween, getDate, holidayBySlug, todayUTC } from '@/lib/holidays'

/** 节日 hub 页:下次日期实时倒计时 + 全年份日期表(自动续期)。 */
export const revalidate = 86400

export function generateStaticParams() {
  return HOLIDAYS.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const h = holidayBySlug(slug)
  if (!h) return {}
  const today = todayUTC()
  let nextDate: string | null = null
  for (const y of [today.slice(0, 4), String(Number(today.slice(0, 4)) + 1)].map(Number)) {
    const d = getDate(h, y)
    if (d && d >= today) { nextDate = d; break }
  }
  const next = nextDate ?? `${h.dates ? Object.values(h.dates).sort().at(-1) : '2026'}`
  return {
    title: `How Many Days Until ${h.name} ${nextDate?.slice(0, 4) ?? ''} — Countdown & Dates`,
    description: `Days until ${h.name}: live countdown to ${fmtDate(nextDate ?? next)}. Full ${h.name} dates for ${YEARS[0]}–${YEARS[YEARS.length - 1]}, weekday info, and related holidays.`,
    alternates: { canonical: `/holiday/${h.slug}` },
  }
}

export default async function HolidayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const h = holidayBySlug(slug)
  if (!h) notFound()
  const today = todayUTC()
  const todayDate = dateToUTC(new Date())

  // 下一次(含今天)
  let nextISO: string | null = null
  let nextYear = 0
  for (const y of [Number(today.slice(0, 4)), Number(today.slice(0, 4)) + 1]) {
    const d = getDate(h, y)
    if (d && d >= today) { nextISO = d; nextYear = y; break }
  }

  const allDates = YEARS.map((y) => ({ year: y, date: getDate(h, y) })).filter((x) => x.date)
  const related = HOLIDAYS.filter((x) => x.slug !== h.slug).slice(0, 6)

  const faqLd = jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...(nextISO
        ? [
            {
              '@type': 'Question',
              name: `How many days until ${h.name} ${nextYear}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${h.name} ${nextYear} falls on ${fmtDate(nextISO)} — ${daysBetween(todayDate, nextISO)} days from today (live countdown on this page).`,
              },
            },
          ]
        : []),
      {
        '@type': 'Question',
        name: `What day of the week is ${h.name} ${nextYear}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: nextISO ? `${h.name} ${nextYear} is on a ${fmtDate(nextISO).split(',')[0]}.` : 'See the dates table.',
        },
      },
    ],
  })

  const breadcrumb = breadcrumbLd([
    { name: 'Home', url: `${BASE}/` },
    { name: h.name },
  ])

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumb }} />

      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        Countdown · calendar math, never guessed
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        How many days until {h.name}?
      </h1>
      {nextISO ? (
        <>
          <p className="mt-3 text-[15px] text-ink/65">
            {h.name} {nextYear} falls on <strong>{fmtDate(nextISO)}</strong> — {daysBetween(todayDate, nextISO)} days from today.
          </p>
          <div className="mt-6">
            <Countdown targetISO={nextISO} />
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[14px] text-amber-900">
          Next date beyond our computed range — see the table below for computed years.
        </div>
      )}

      <AdSlot slot="holiday-below-countdown" />

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">{h.name} dates {YEARS[0]}–{YEARS[YEARS.length - 1]}</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-ink/10 bg-white">
          {allDates.map(({ year, date }, i) => (
            <Link
              key={year}
              href={`/holiday/${h.slug}/${year}`}
              className={`flex items-baseline justify-between gap-3 px-4 py-2.5 text-[14px] hover:bg-brand/5 ${i < allDates.length - 1 ? 'border-b border-ink/5' : ''}`}
            >
              <span className="font-medium">{h.name} {year}</span>
              <span className="text-ink/60">{date ? `${fmtDate(date)} · ${date}` : '—'}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Other holidays</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {related.map((x) => (
            <Link key={x.slug} href={`/holiday/${x.slug}`} className="rounded-lg border border-ink/12 bg-white px-3 py-1.5 text-[13.5px] font-semibold hover:border-ink/40">
              {x.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
