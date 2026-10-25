#!/usr/bin/env node
const SITE_URL = (process.env.SITE_URL ?? '').replace(/\/+$/, '')
if (!SITE_URL) { console.error('[health] SITE_URL not configured'); process.exit(1) }
const failures = []
const check = async (name, fn) => {
  try { await fn(); console.log(`[health] ✓ ${name}`) } catch (err) { failures.push(name); console.error(`[health] ✗ ${name}: ${err.message}`) }
}
const get = async (path, timeout = 30_000) => {
  const res = await fetch(`${SITE_URL}${path}`, { signal: AbortSignal.timeout(timeout), headers: { 'User-Agent': 'daysuntil-healthcheck' } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}
await check('home renders', async () => {
  const html = await get('/')
  if (!/countdown/i.test(html)) throw new Error('missing countdown')
})
await check('api christmas dates', async () => {
  const body = JSON.parse(await get('/api/holiday?slug=christmas'))
  if (body.dates?.['2026'] !== '2026-12-25') throw new Error(`bad date: ${body.dates?.['2026']}`)
})
await check('christmas hub renders', async () => {
  const html = await get('/holiday/christmas')
  if (!/December 25, 2026/.test(html)) throw new Error('missing date')
})
await check('week number renders', async () => {
  const html = await get('/week-number')
  if (!/week/i.test(html)) throw new Error('missing week')
})
await check('sitemap covers year pages', async () => {
  const xml = await get('/sitemap.xml', 60_000)
  const count = (xml.match(/<url>/g) ?? []).length
  if (count < 300) throw new Error(`only ${count} URLs`)
})
if (failures.length > 0) { console.error(`[health] FAILED: ${failures.join(' | ')}`); process.exit(1) }
console.log('[health] all checks passed')
