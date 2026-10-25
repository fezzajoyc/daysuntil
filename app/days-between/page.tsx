import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Days Between Two Dates — Calculator',
  description: 'Compute the number of days between any two dates. Calendar math in your browser.',
  alternates: { canonical: '/days-between' },
}

export default function DaysBetweenPage() {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">Calculator</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Days between two dates</h1>
      <p className="mt-3 text-[15px] text-ink/65">
        Pick two dates — the result updates instantly in your browser.
      </p>
      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5" data-days-between>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="db-from" className="mb-1 block text-[12px] font-medium uppercase tracking-wider text-ink/45">From</label>
            <input id="db-from" type="date" defaultValue="2026-01-01" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-[14px] focus:border-brand focus:outline-none" />
          </div>
          <div>
            <label htmlFor="db-to" className="mb-1 block text-[12px] font-medium uppercase tracking-wider text-ink/45">To</label>
            <input id="db-to" type="date" defaultValue="2026-12-31" className="w-full rounded-lg border border-ink/15 px-3 py-2 text-[14px] focus:border-brand focus:outline-none" />
          </div>
        </div>
        <div className="mt-4 text-[15px]" aria-live="polite">
          <strong id="db-result" className="text-brand">—</strong>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  function upd() {
    var f = document.getElementById('db-from').value;
    var t = document.getElementById('db-to').value;
    var el = document.getElementById('db-result');
    if (!f || !t) { el.textContent = 'Pick both dates.'; return; }
    var d = Math.round((new Date(t) - new Date(f)) / 86400000);
    el.textContent = d + ' days (' + Math.abs(d) + (d >= 0 ? ' forward' : ' back') + ')';
  }
  ['db-from', 'db-to'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', upd);
    document.getElementById(id).addEventListener('change', upd);
  });
  upd();
})();`,
        }}
      />
      <p className="mt-4 text-[12px] text-ink/50">Runs entirely in your browser — no cookies, nothing sent anywhere.</p>
      <Link href="/" className="mt-8 inline-block rounded-lg bg-ink px-4 py-2 text-[14px] font-semibold text-white hover:bg-ink/85">
        ← Holiday countdowns
      </Link>
    </div>
  )
}
