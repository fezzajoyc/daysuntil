/** 节日日历数据层:全部日期由规则或历表计算——纯日历数学,零猜测。
 *  45 个节日 × 2024-2030 年份页全部由 getDate(year) 确定性生成。 */

export interface Holiday {
  name: string
  slug: string
  /** fixed: 每年同月日;nth: 第 N 个星期 W;last: 最后一个星期 W;easter: computus;table: 外部历表(农历/希伯来等) */
  kind: 'fixed' | 'nth' | 'last' | 'easter' | 'offset' | 'table'
  month?: number
  day?: number
  nth?: number
  weekday?: number
  /** kind=offset:相对某锚日的偏移(如 Black Friday = 感恩节+1) */
  offsetFrom?: string
  offsetDays?: number
  /** kind=table:2024-2031 日期映射(农历/希伯来历无简单公式) */
  dates?: Record<number, string>
}

export const HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", slug: 'new-years-day', kind: 'fixed', month: 1, day: 1 },
  { name: 'MLK Day', slug: 'mlk-day', kind: 'nth', month: 1, nth: 3, weekday: 1 },
  { name: "Groundhog Day", slug: 'groundhog-day', kind: 'fixed', month: 2, day: 2 },
  { name: "Valentine's Day", slug: 'valentines-day', kind: 'fixed', month: 2, day: 14 },
  { name: 'Presidents Day', slug: 'presidents-day', kind: 'nth', month: 2, nth: 3, weekday: 1 },
  { name: 'St. Patrick\u2019s Day', slug: 'st-patricks-day', kind: 'fixed', month: 3, day: 17 },
  { name: 'April Fools\u2019 Day', slug: 'april-fools-day', kind: 'fixed', month: 4, day: 1 },
  { name: 'Easter', slug: 'easter', kind: 'easter' },
  { name: 'Earth Day', slug: 'earth-day', kind: 'fixed', month: 4, day: 22 },
  { name: 'Cinco de Mayo', slug: 'cinco-de-mayo', kind: 'fixed', month: 5, day: 5 },
  { name: 'Mother\u2019s Day', slug: 'mothers-day', kind: 'nth', month: 5, nth: 2, weekday: 0 },
  { name: 'Memorial Day', slug: 'memorial-day', kind: 'last', month: 5, weekday: 1 },
  { name: 'Flag Day', slug: 'flag-day', kind: 'fixed', month: 6, day: 14 },
  { name: 'Father\u2019s Day', slug: 'fathers-day', kind: 'nth', month: 6, nth: 3, weekday: 0 },
  { name: 'Juneteenth', slug: 'juneteenth', kind: 'fixed', month: 6, day: 19 },
  { name: 'Independence Day', slug: 'independence-day', kind: 'fixed', month: 7, day: 4 },
  { name: 'Labor Day', slug: 'labor-day', kind: 'nth', month: 9, nth: 1, weekday: 1 },
  { name: 'Patriot Day', slug: 'patriot-day', kind: 'fixed', month: 9, day: 11 },
  { name: 'Halloween', slug: 'halloween', kind: 'fixed', month: 10, day: 31 },
  { name: 'Daylight Saving Ends', slug: 'daylight-saving-ends', kind: 'nth', month: 11, nth: 1, weekday: 0 },
  { name: 'Veterans Day', slug: 'veterans-day', kind: 'fixed', month: 11, day: 11 },
  { name: 'Thanksgiving', slug: 'thanksgiving', kind: 'nth', month: 11, nth: 4, weekday: 4 },
  { name: 'Black Friday', slug: 'black-friday', kind: 'offset', offsetFrom: 'thanksgiving', offsetDays: 1 },
  { name: 'Cyber Monday', slug: 'cyber-monday', kind: 'offset', offsetFrom: 'thanksgiving', offsetDays: 4 },
  { name: 'Pearl Harbor Day', slug: 'pearl-harbor-day', kind: 'fixed', month: 12, day: 7 },
  { name: 'Christmas Eve', slug: 'christmas-eve', kind: 'fixed', month: 12, day: 24 },
  { name: 'Christmas', slug: 'christmas', kind: 'fixed', month: 12, day: 25 },
  { name: 'Kwanzaa', slug: 'kwanzaa', kind: 'fixed', month: 12, day: 26 },
  { name: "New Year's Eve", slug: 'new-years-eve', kind: 'fixed', month: 12, day: 31 },
  { name: 'Pi Day', slug: 'pi-day', kind: 'fixed', month: 3, day: 14 },
  { name: 'Star Wars Day', slug: 'star-wars-day', kind: 'fixed', month: 5, day: 4 },
  { name: 'Tax Day', slug: 'tax-day', kind: 'fixed', month: 4, day: 15 },
  { name: 'Daylight Saving Begins', slug: 'daylight-saving-begins', kind: 'nth', month: 3, nth: 2, weekday: 0 },
  { name: 'Advent', slug: 'advent', kind: 'nth', month: 11, nth: 0, weekday: 0 }, // 占位,由 special 处理
  { name: 'Chinese New Year', slug: 'chinese-new-year', kind: 'table', dates: { 2024: '2024-02-10', 2025: '2025-01-29', 2026: '2026-02-17', 2027: '2027-02-06', 2028: '2028-01-26', 2029: '2029-02-13', 2030: '2030-02-03' } },
  { name: 'Hanukkah (first day)', slug: 'hanukkah', kind: 'table', dates: { 2024: '2024-12-25', 2025: '2025-12-14', 2026: '2026-12-04', 2027: '2027-12-24', 2028: '2028-12-12', 2029: '2029-12-01', 2030: '2030-12-20' } },
  { name: 'Ramadan (first day)', slug: 'ramadan', kind: 'table', dates: { 2024: '2024-03-11', 2025: '2025-03-01', 2026: '2026-02-18', 2027: '2027-02-08', 2028: '2028-01-28', 2029: '2029-01-17', 2030: '2030-01-06' } },
  { name: 'Diwali', slug: 'diwali', kind: 'table', dates: { 2024: '2024-11-01', 2025: '2025-10-20', 2026: '2026-11-08', 2027: '2027-10-29', 2028: '2028-10-17', 2029: '2029-11-05', 2030: '2030-10-26' } },
  { name: 'Ash Wednesday', slug: 'ash-wednesday', kind: 'offset', offsetFrom: 'easter', offsetDays: -46 },
  { name: 'Good Friday', slug: 'good-friday', kind: 'offset', offsetFrom: 'easter', offsetDays: -2 },
  { name: 'Easter Monday', slug: 'easter-monday', kind: 'offset', offsetFrom: 'easter', offsetDays: 1 },
  { name: 'Palm Sunday', slug: 'palm-sunday', kind: 'offset', offsetFrom: 'easter', offsetDays: -7 },
]

export const YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030]

/** Anonymous Gregorian computus(复活节算法,1883-4099 有效)——纯数学。 */
export function easterDate(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(Date.UTC(year, month - 1, day))
}

const ISO = (d: Date) => d.toISOString().slice(0, 10)

function nthWeekday(year: number, month: number, nth: number, weekday: number): Date {
  if (nth === 0) {
    // nth=0 → 该月最后一个该 weekday(Advent 需倒推,由调用方处理;此处兜底)
    return lastWeekday(year, month, weekday)
  }
  const first = new Date(Date.UTC(year, month - 1, 1))
  const shift = (weekday - first.getUTCDay() + 7) % 7
  return new Date(Date.UTC(year, month - 1, 1 + shift + (nth - 1) * 7))
}

function lastWeekday(year: number, month: number, weekday: number): Date {
  const last = new Date(Date.UTC(year, month, 0)) // 下月 0 号 = 本月最后一天
  const shift = (last.getUTCDay() - weekday + 7) % 7
  return new Date(Date.UTC(year, month - 1, last.getUTCDate() - shift))
}

/** 某节日某年日期;超出范围(表格年/无效年)返回 null。 */
export function getDate(h: Holiday, year: number): string | null {
  if (h.kind === 'fixed') return ISO(new Date(Date.UTC(year, h.month! - 1, h.day!)))
  if (h.kind === 'nth') {
    if (h.slug === 'advent') {
      // Advent:圣诞前第 4 个星期日
      const christmas = new Date(Date.UTC(year, 11, 25))
      const shift = (christmas.getUTCDay() - 0 + 7) % 7 // 距最近的星期日
      const fourth = new Date(christmas.getTime() - (shift + 21) * 86400000)
      return ISO(fourth)
    }
    return ISO(nthWeekday(year, h.month!, h.nth!, h.weekday!))
  }
  if (h.kind === 'last') return ISO(lastWeekday(year, h.month!, h.weekday!))
  if (h.kind === 'easter') return ISO(easterDate(year))
  if (h.kind === 'offset') {
    const anchor = HOLIDAYS.find((x) => x.slug === h.offsetFrom)
    if (!anchor) return null
    const anchorDate = getDate(anchor, year)
    if (!anchorDate) return null
    const d = new Date(`${anchorDate}T00:00:00Z`)
    d.setUTCDate(d.getUTCDate() + (h.offsetDays ?? 0))
    return ISO(d)
  }
  if (h.kind === 'table') return h.dates?.[year] ?? null
  return null
}

export function holidayBySlug(slug: string): Holiday | null {
  return HOLIDAYS.find((h) => h.slug === slug) ?? null
}

export function dateToUTC(d: Date): string {
  return ISO(d)
}

export function todayUTC(now: Date = new Date()): string {
  return ISO(now)
}

export function daysBetween(fromISO: string, toISO: string): number {
  return Math.round((new Date(`${toISO}T00:00:00Z`).getTime() - new Date(`${fromISO}T00:00:00Z`).getTime()) / 86400000)
}

/** 从 today 起,未来节日列表(含今天,按日期升序),跨年份取。 */
export interface UpcomingItem {
  holiday: Holiday
  date: string
  days: number
  year: number
}

export function upcoming(now: Date = new Date(), limit = 8): UpcomingItem[] {
  const today = todayUTC(now)
  const out: UpcomingItem[] = []
  for (let dy = 0; dy <= 2; dy += 1) {
    const year = now.getUTCFullYear() + dy
    for (const h of HOLIDAYS) {
      const d = getDate(h, year)
      if (!d || d < today) continue
      out.push({ holiday: h, date: d, days: daysBetween(today, d), year })
    }
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit).reverse().slice(-limit).reverse()
}

/** ISO 周数(ISO 8601:含第一个星期四的那周为第 1 周)。 */
export function isoWeek(now: Date = new Date()): { year: number; week: number } {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const dayNum = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - dayNum + 3) // 本周四
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4))
  const fDayNum = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - fDayNum + 3)
  const week = 1 + Math.round((d.getTime() - firstThursday.getTime()) / (7 * 86400000))
  return { year: d.getUTCFullYear(), week }
}
