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

## After the redesign (branch `redesign/apple-ai`, 2026-11-15)

| Category | Before | After | Target |
| --- | --- | --- | --- |
| Performance | 54 | **96** | >= 90 |
| Accessibility | 100 | **100** | 100 |
| Best Practices | 100 | **100** | >= 95 |
| SEO | 100 | **100** | 100 |

| Metric | Before | After |
| --- | --- | --- |
| First Contentful Paint | 0.9 s | 0.9 s |
| Largest Contentful Paint | 3.7 s | 2.9 s |
| Total Blocking Time | 6,030 ms | 60 ms |
| Cumulative Layout Shift | 0 | 0 |
| Speed Index | 6.0 s | 1.5 s |

What moved the numbers:

- The always-on 2D canvas is gone. The ocean is now a WebGL2 fragment shader that
  compiles only after `load` when the main thread is idle, renders at 0.5-0.75x
  DPR, is capped at 30-45 fps, and pauses off-screen and in hidden tabs.
- Software renderers (SwiftShader, llvmpipe) are treated as "no WebGL": the CSS
  gradient + SVG wave fallback is shown instead of running the shader on the CPU.
  Lighthouse's headless Chrome is such an environment, so the score above is
  measured with the fallback; on a real GPU the shader adds no main-thread work
  beyond one draw call per frame.
- The 3D globe chunk (three.js) is fetched only within 200px of the viewport and
  its render loop is paused whenever the card is off-screen.
- The LCP elements (the name and the summary paragraph) animate `transform`
  only, so they count as painted on the first frame.
- Lora was dropped; Inter is the only web font.

## How to reproduce

```bash
npm run build
npx serve out -l 4312 &
npx lighthouse http://localhost:4312/ --form-factor=mobile --chrome-flags="--headless=new"
```

## Not measured

- Real-device performance with the shader running on a mobile GPU (lab runs use
  the fallback, see above).
- Firefox. The Playwright suite covers Chromium (desktop) and WebKit (iPad and
  iPhone profiles) only.
