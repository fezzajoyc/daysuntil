# DaysUntil · 节日倒数站(俗,大流量词)

"How many days until christmas" 类会话式大词 ×44 节日。**全部日期由日历规则计算**(fixed/nth-weekday/last-weekday/Gregorian computus 复活节/农历表),纯数学零猜测。45 hub + 315 年份页 + 周数页 + 日期差计算器 = 345 静态页 + 实时倒计时。

三个不掺假的事(站群纪律):

- 每个日期都是日历规则计算的结果,测试锚点全过(Easter 2026-04-05 computus、Thanksgiving 2026-11-26 第四个周四、CNY 2026-02-17 农历表)。
- 倒计时每秒跳到节日 00:00 UTC,页面明示口径。
- 页面自动续期:每年 1 月 1 日新年份页自动进入矩阵,零人工。

## 站点结构

| 路径 | 内容 | SEO 角色 |
|---|---|---|
| `/holiday/[slug]` | 节日 hub ×45:实时倒计时 + 7 年日期表 | "days until christmas" 大词 |
| `/holiday/[slug]/[year]` | 年份页 ×315 | "christmas 2027 date" 长尾 |
| `/week-number` · `/days-between` | 周数/日期差工具 | "what week is it" |
| `/api/holiday` | JSON(CORS 全开) | agent 数据口 |

## 质量

`npm test`(8 项:computus 三年锚点/规则节日/偏移节日/农历表/全范围解析/ISO 周)。Schema:Event(节日)+ FAQ。Vercel 导入零配置;每日 CI 体检开 issue;广告位已埋。
