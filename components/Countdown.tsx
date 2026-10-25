'use client'

import { useEffect, useState } from 'react'

/** 实时倒计时:目标日期 00:00 UTC;每秒刷新(节日零点 ET/UTC 口径页脚注明)。 */
export default function Countdown({ targetISO, accent = '#c2452d' }: { targetISO: string; accent?: string }) {
  const target = new Date(`${targetISO}T00:00:00Z`).getTime()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = Math.max(0, target - now.getTime())
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  const Cell = ({ n, l, big }: { n: number; l: string; big?: boolean }) => (
    <div className={big ? 'du-cd-big' : 'du-cd-sm'}>
      <div className="du-cd-n">{n}</div>
      <div className="du-cd-l">{l}</div>
    </div>
  )

  return (
    <div className="du-cd" role="timer" aria-live="polite" aria-label={`Countdown to ${targetISO}`}>
      <Cell n={days} l="days" big />
      <Cell n={hours} l="hours" />
      <Cell n={mins} l="minutes" />
      <Cell n={secs} l="seconds" />
      <style>{`
        .du-cd { display:flex; justify-content:center; gap:10px; }
        .du-cd-big, .du-cd-sm { border-radius:14px; padding:14px 20px; min-width:84px; }
        .du-cd-big { background:${accent}; color:#fff; }
        .du-cd-sm { background:rgba(255,255,255,.75); border:1px solid ${accent}33; color:${accent}; }
        .du-cd-n { font-size:32px; font-weight:800; font-variant-numeric:tabular-nums; }
        .du-cd-l { font-size:11px; opacity:.8; }
      `}</style>
    </div>
  )
}
