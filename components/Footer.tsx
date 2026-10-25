import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-8 text-[13px] leading-relaxed text-ink/55">
        <p>
          Every date on this site is computed with standard calendar rules (fixed dates, nth-weekday
          rules, the Gregorian computus for Easter) — never guessed. Countdowns tick to the holiday's
          midnight UTC. Not affiliated with any government agency.
        </p>
        <p className="mt-3">
          <Link href="/sitemap.xml" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">Sitemap</Link> ·{' '}
          <Link href="/llms.txt" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">llms.txt</Link> ·{' '}
          <Link href="/api/holiday" className="underline decoration-ink/30 underline-offset-2 hover:text-ink">JSON API</Link>
        </p>
      </div>
    </footer>
  )
}
