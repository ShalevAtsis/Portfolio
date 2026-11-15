# Redesign changelog (November 2026)

Summary of the work done from `IMPROVEMENT_PLAN.md`, by phase.

## Phase 1: audit gaps

- **Content:** current role is QA AI Automation Engineer at High Lander; Jifiti is
  past and split into Automation Engineer and Tier 2 Support; B.Sc. is complete
  (Honor Graduate, GPA 94, Oct 2023 - Jun 2026); platoon size is 14; Hartech role
  is Software QA Engineer. The public title stays "Software Engineer · AI Engineer".
- **CI:** new `CI` workflow on pull requests (lint, typecheck, build, Playwright on
  Desktop / Tablet / Mobile). Tests run against the static export in the official
  Playwright Docker image. The post-deploy workflow is a production smoke test.
- **Tests are hermetic:** Web3Forms and all external hosts are mocked, so the
  suite no longer e-mails the owner. Pixel baselines are Linux + Desktop Chrome only.
- **Resilience:** `lib/github.ts` has a static fallback, optional `GITHUB_TOKEN`,
  and a timeout. The contact-form honeypot is honoured.
- **Housekeeping:** ESLint 9 flat config, `public/CNAME`, rewritten deployment
  guide and README, Lighthouse baseline in `docs/perf.md`.

## Phase 2: design system

- Tokens as CSS variables (`app/globals.css`) exposed through Tailwind
  (`canvas`, `surface`, `elevated`, `ink`, `ink-2`, `accent`, `accent-fill`,
  `hairline`), dark by default with a polished light theme. Accent is Apple blue
  (`#2997ff` dark, `#0071e3` fills, `#0066cc` for text on light).
- Fluid type scale (`text-display`, `text-headline`), 20/28/36px radii, hairline
  borders, soft shadows, ~1100px content width, generous section spacing.
- Primitives in `components/ui/`: `Section`, `Container`, `Eyebrow`,
  `SectionHeader`, `Headline`, `ButtonLink`, `BentoCard`, `Reveal`, `Parallax`,
  `Magnetic`, `CountUp`, `SectionDivider`, `ErrorBoundary`.
- Glass navbar (52px, blur + saturation, hairline fades in after 8px of scroll),
  inline section links on large screens, a full-screen sheet with staggered links
  and a real focus trap on small screens.
- Static radial glows and light grain replace the matrix / flow-field backgrounds.
- The Resume view keeps its own light "paper" look in both themes.

## Phase 3: scroll-driven animation

- Lenis smooth scrolling with anchor handling (hash, scroll position and focus
  stay in sync); disabled under reduced motion; keyboard scrolling stays native.
- Scroll progress bar; wave-line section dividers that draw on scroll.
- **Hero:** word-by-word entrance (CSS, pre-hydration), content recedes on scroll.
- **About:** pinned statement whose words light up with scroll; bento pillars
  with parallax offsets.
- **Experience:** count-up stats, a timeline line that draws with scroll, and the
  card nearest the viewport centre emphasised.
- **Skills:** bento tiles with staggered chips and pointer tilt (mouse only); a
  new "Test Automation & QA" group leads, linking to this repo's test suite.
- **Projects:** SwellSight showcase with a sticky visual and count-up metrics; a
  pinned horizontal gallery on desktop and a vertical stack on small screens.
  Live language / stars come from the GitHub API with the static fallback.
- **Gallery:** two parallax columns, soft scale-in, captions fading in (replaces
  the autoplay slideshow; all seven photos and captions are kept).
- **Personal World:** the page "dives" into deep water; lazy, pausable globe;
  Apple-Music-style player with scrubber and waveform plus a navbar mini-player
  once playback has started (audio never autoplays or preloads).
- **Contact:** "Let's build something." closing headline, magnetic CTA, form in a
  glass card with accessible validation and a visible failure state.

## Phase 4: ocean shader and the AI easter egg

- `components/ui/OceanShader.tsx`: raw WebGL2, no dependencies. Uniforms `uTime`,
  `uResolution`, `uScroll`, `uPointer`, `uDepth`, `uLight`. Deferred until idle
  after load, 0.5-0.75x DPR, 30-45 fps cap, paused off-screen and in hidden tabs.
- Fallbacks: no WebGL2, software renderer, or lost context show the CSS gradient
  with animated SVG wave lines; reduced motion or Save-Data render one still frame.
- Easter egg: the footer bug makes the "model" hallucinate (headings scramble into
  token fragments and settle on a wrong-but-plausible version, with a
  "temperature: 1.9" badge). The real text stays in the DOM, glitch layers are
  `aria-hidden`, and the change is announced through `aria-live`.
- The terminal became an **agent console**: scripted thinking / tool-call trace,
  natural-language prompts with fuzzy intent matching (fix, repair, restore,
  reset, undo, heal, rollback, ...), suggested-prompt chips, a short diff and a
  patch progress bar. `sudo fix-site --force` still works as a hidden alias.
  No real model is called.
- The "AI Suggestion Engine" now says plainly that a human reads the suggestions.

## Phase 5: QA

- Playwright suite rewritten for the new UI (one page-object module, 79 tests per
  project): navigation on both breakpoints, contact details absent from server
  HTML, shader mount / pause / reduced-motion, scroll-linked effects, the pinned
  gallery, the player, form validation and failure, the full agent-console flow,
  focus traps, and pixel snapshots taken under reduced motion.
- Lighthouse mobile: Performance 96, Accessibility 100, Best Practices 100,
  SEO 100 (see `docs/perf.md`).
- Contact details are assembled at runtime (`lib/contact.ts`), so the e-mail
  address and phone number are not in the static HTML.

## Removed

`BackgroundMatrix`, `OceanicBackground`, `OceanicCanvas`, `FadeInUp`,
`HoverEffectCard`, `TerminalOverlay`, the unused `Footer`, `lib/types`, the Lora
font, and the gallery slideshow CSS.

## Left for the owner

- `public/Shalev_Atsis_CV.pdf` was not regenerated; export a new PDF if it still
  shows the old role or GPA.
- Confirm in the Web3Forms dashboard that the access key is restricted to
  `shalevatsis.dev`.
- Firefox and real-device checks (screen reader pass, mobile GPU performance)
  were not run in this work.
- The OG image on Cloudinary is unchanged and still shows the old design.
