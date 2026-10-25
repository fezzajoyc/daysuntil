import Link from 'next/link'
import type { Metadata } from 'next'
import AdSlot from '@/components/AdSlot'
import Countdown from '@/components/Countdown'
import { jsonLdScript } from '@/lib/jsonld'
import { BASE, SITE_NAME, fmtDate } from '@/lib/site'
import { HOLIDAYS, upcoming } from '@/lib/holidays'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'How Many Days Until…? — Live Holiday Countdowns',
  description: 'Live countdowns to Christmas, Halloween, Thanksgiving, New Year and 40+ more holidays — computed with standard calendar rules, never guessed.',
  alternates: { canonical: '/' },
}

export default function Home() {
  const up = upcoming()
  const next = up[0]
  const siteLd = jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${BASE}/`,
    description: 'Live holiday countdowns and exact dates, computed with calendar rules.',
  })

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: siteLd }} />

      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">
        {HOLIDAYS.length} holidays · computed, never guessed
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        How many days until…?
      </h1>
      <p className="mt-3 text-[15px] text-ink/65">
        Live countdowns to every major holiday, with exact dates for years ahead. All computed
        with standard calendar rules.
      </p>

      {next ? (
        <section className="mt-8 rounded-2xl border border-brand/20 bg-white p-6 text-center">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-brand">
            Next up · {fmtDate(next.date)}
          </div>
          <h2 className="mt-1 text-2xl font-bold">
            <Link href={`/holiday/${next.holiday.slug}/${next.year}`} className="hover:text-brand">
              {next.holiday.name} {next.year}
            </Link>
          </h2>
          <div className="mt-4">
            <Countdown targetISO={next.date} />
          </div>
        </section>
      ) : null}

      <AdSlot slot="home-top" />

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Upcoming holidays</h2>
        <ul className="mt-4 divide-y divide-ink/8 text-[14.5px]">
          {up.map(({ holiday: h, date, days, year }) => (
            <li key={`${h.slug}-${year}`} className="py-2.5">
              <Link href={`/holiday/${h.slug}/${year}`} className="flex items-baseline justify-between gap-3 hover:text-brand">
                <span className="font-medium">{h.name} {year}</span>
                <span className="shrink-0 text-ink/55">{fmtDate(date).split(',')[0]} · {days} days</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="home-bottom" />

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">All holidays</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {HOLIDAYS.map((h) => (
            <Link key={h.slug} href={`/holiday/${h.slug}`} className="rounded-lg border border-ink/12 bg-white px-3 py-1.5 text-[13.5px] font-semibold hover:border-ink/40">
              {h.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
