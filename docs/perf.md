# Lighthouse (mobile)

Measured with Lighthouse 12, mobile form factor with default simulated throttling,
against the static export served locally (`npx serve out`). Scores vary by a few
points between runs; treat them as indicative.

## Before the redesign (commit `22176ca`, `main` on 2026-11-14)

| Category | Score |
| --- | --- |
| Performance | 54 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Metric | Value |
| --- | --- |
| First Contentful Paint | 0.9 s |
| Largest Contentful Paint | 3.7 s |
| Total Blocking Time | 6,030 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 6.0 s |

The performance score is dominated by Total Blocking Time: the full-page 2D
flow-field canvas runs on the main thread for the whole visit.

## After the redesign

_Filled in at the end of Phase 5._
