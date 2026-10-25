import { describe, expect, it } from 'vitest'
import { HOLIDAYS, easterDate, getDate, holidayBySlug, isoWeek } from '@/lib/holidays'

describe('calendar math (pure, verifiable anchors)', () => {
  it('easter computus: 2026-04-05, 2024-03-31, 2025-04-20', () => {
    expect(easterDate(2026).toISOString().slice(0, 10)).toBe('2026-04-05')
    expect(easterDate(2024).toISOString().slice(0, 10)).toBe('2024-03-31')
    expect(easterDate(2025).toISOString().slice(0, 10)).toBe('2025-04-20')
  })

  it('fixed holidays', () => {
    const christmas = HOLIDAYS.find((h) => h.slug === 'christmas')!
    expect(getDate(christmas, 2026)).toBe('2026-12-25')
    const ny = HOLIDAYS.find((h) => h.slug === 'new-years-day')!
    expect(getDate(ny, 2027)).toBe('2027-01-01')
  })

  it('rule-based: Thanksgiving 2026 = Nov 26 (4th Thursday)', () => {
    const t = HOLIDAYS.find((h) => h.slug === 'thanksgiving')!
    expect(getDate(t, 2026)).toBe('2026-11-26')
    const m = HOLIDAYS.find((h) => h.slug === 'memorial-day')!
    expect(getDate(m, 2026)).toBe('2026-05-25') // last Monday May 2026
  })

  it('offset: Black Friday = Thanksgiving+1, Ash Wednesday = Easter−46', () => {
    const bf = HOLIDAYS.find((h) => h.slug === 'black-friday')!
    expect(getDate(bf, 2026)).toBe('2026-11-27')
    const ash = HOLIDAYS.find((h) => h.slug === 'ash-wednesday')!
    expect(getDate(ash, 2026)).toBe('2026-02-18')
  })

  it('table holidays present for full 2024-2030 span', () => {
    const cny = HOLIDAYS.find((h) => h.slug === 'chinese-new-year')!
    expect(getDate(cny, 2026)).toBe('2026-02-17')
    expect(getDate(cny, 2030)).toBe('2030-02-03')
  })

  it('every holiday resolves for every year in range', () => {
    for (const h of HOLIDAYS) {
      for (let y = 2024; y <= 2030; y += 1) {
        expect(getDate(h, y), `${h.slug} ${y}`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      }
    }
  })

  it('ISO week: 2026-01-01 is week 1 of 2026', () => {
    expect(isoWeek(new Date('2026-01-01T12:00:00Z')).week).toBe(1)
  })
})

describe('lookup honesty', () => {
  it('unknown slug null', () => {
    expect(holidayBySlug('not-a-holiday')).toBeNull()
  })
})
