import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Holiday not found</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] text-ink/65">
        We only track holidays with computable dates — this slug isn&rsquo;t one of them.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-ink px-4 py-2 text-[14px] font-semibold text-white hover:bg-ink/85">
        All holidays
      </Link>
    </div>
  )
}
