# Deploying to GitHub Pages

The site is a Next.js **static export** (`output: "export"`) served by GitHub Pages
at the root of a custom domain: **https://shalevatsis.dev**. There is no base path.

## How a deploy happens

1. A commit lands on `main` (always through a pull request).
2. `.github/workflows/deploy.yml` runs `npm ci && npm run build`, uploads `./out`,
   and publishes it with `actions/deploy-pages`.
3. `.github/workflows/playwright.yml` then runs the hermetic smoke suite against
   the live site.

Pull requests are gated by `.github/workflows/ci.yml` (lint, typecheck, build,
Playwright on Desktop / Tablet / Mobile).

## One-time repository settings

- **Settings → Pages → Build and deployment → Source:** GitHub Actions.
- **Settings → Pages → Custom domain:** `shalevatsis.dev`, with *Enforce HTTPS* on.
  `public/CNAME` carries the same value so the export is self-describing.
- **DNS** (at the registrar): apex `A`/`AAAA` records pointing at GitHub Pages,
  as listed in the GitHub Pages documentation for apex domains.

## Build-time environment

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | repository secret | Contact form delivery (Web3Forms). Public by design; restrict it to `shalevatsis.dev` in the Web3Forms dashboard. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | repository secret | Cloudinary account for the image loader. |
| `GITHUB_TOKEN` | provided by Actions | Lifts the GitHub API rate limit at build time. Optional: `lib/github.ts` falls back to a static list. |
| `NEXT_PUBLIC_BASE_PATH` | unset | Only needed if the site is ever served from a sub-path. |

## Local commands

```bash
npm run dev                 # dev server on :3000
npm run build               # static export to ./out
npm run lint && npm run typecheck
npm test                    # Playwright against the static export
npm run test:visual:update  # regenerate Linux pixel baselines (needs Docker)
```
