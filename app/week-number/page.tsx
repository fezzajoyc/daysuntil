import Link from 'next/link'
import type { Metadata } from 'next'
import { jsonLdScript } from '@/lib/jsonld'
import { isoWeek } from '@/lib/holidays'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'What Week Is It? — Current ISO Week Number',
  description: 'The current ISO-8601 week number, plus the full week calendar for the year. Standard ISO rules: the week containing the first Thursday is week 1.',
  alternates: { canonical: '/week-number' },
}

export default function WeekNumberPage() {
  const { year, week } = isoWeek()
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1)
  const faqLd = jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What week number is it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Right now it is ISO week ${week} of ${year} (ISO-8601: the week containing the year's first Thursday is week 1).`,
        },
      },
    ],
  })

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">ISO-8601</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        It is week <span className="text-brand">{week}</span> of {year}
      </h1>
      <p className="mt-3 text-[15px] text-ink/65">
        Computed with ISO-8601 rules: weeks start Monday, and week 1 is the week containing the
        first Thursday of the year.
      </p>
      <h2 className="mt-10 text-lg font-semibold tracking-tight">All weeks of {year}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {weeks.map((w) => (
          <span key={w} className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold ${w === week ? 'border-brand bg-brand text-white' : 'border-ink/12 bg-white'}`}>
            W{w}
          </span>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-ink/50">
        Leap years and year boundaries handled per ISO-8601 — some years have 53 weeks.
      </p>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-ink px-4 py-2 text-[14px] font-semibold text-white hover:bg-ink/85">
        ← Holiday countdowns
      </Link>
    </div>
  )
}
