# Shalev Atsis — AI/ML Portfolio

A **Portfolio** (AI-focused, recruiter-optimized) and **Resume** (document-style, printable) site built with Next.js 14, Tailwind CSS, and Framer Motion. Positioned for AI engineering, applied ML, and LLM-based roles.

**Strategy & concept:** See **[docs/PORTFOLIO_CONCEPT.md](./docs/PORTFOLIO_CONCEPT.md)** for full structure, recruiter psychology, copy guidelines, and feature rationale.

## Project structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles, smooth scroll, glass, A4
│   ├── layout.tsx           # Root layout, fonts, ViewProvider
│   └── page.tsx             # Fetches GitHub repos, Navbar + ViewSwitcher
├── components/
│   ├── Navbar.tsx           # Section links (About, Projects, Lab, Contact) + Resume toggle + socials
│   ├── ViewSwitcher.tsx     # AnimatePresence; PortfolioView | ResumeView
│   ├── PortfolioView.tsx    # Composes: Hero, About, Projects, Lab, Contact
│   ├── sections/
│   │   ├── HeroSection.tsx      # Headline, subhead, CTA, "Currently learning"
│   │   ├── AboutSection.tsx     # Narrative + AI direction
│   │   ├── ProjectsSection.tsx  # TechMarquee + SwellSight + repo grid
│   │   ├── LabSection.tsx       # Experiments / small builds
│   │   └── ContactSection.tsx   # Single CTA, open to opportunities
│   ├── SwellSightCard.tsx   # Featured AI project + "Why I built this" thought process
│   ├── RepoCard.tsx         # GitHub repo card
│   ├── TechMarquee.tsx      # Scrolling tech stack
│   └── ResumeView.tsx       # A4 resume, print/PDF
├── content/
│   └── copy.ts              # Hero, about, projects, lab, contact copy (edit here)
├── context/
│   └── ViewContext.tsx      # isResumeMode, toggleMode
├── docs/
│   └── PORTFOLIO_CONCEPT.md # Full concept: structure, psychology, copy, features
├── lib/
│   └── github.ts            # getPinnedRepos(username)
├── tailwind.config.ts       # Cyber & Paper themes
└── next.config.js
```

**Views & state**

- **State:** `context/ViewContext.tsx` — `isResumeMode` boolean and `toggleMode()`.
- **Portfolio view:** `components/PortfolioView.tsx` (and SwellSightCard, RepoCard, TechMarquee).
- **Resume view:** `components/ResumeView.tsx`.
- **Integration:** `app/page.tsx` wraps the app in `ViewProvider`, renders `Navbar` and `ViewSwitcher`; `ViewSwitcher` uses `useView()` and `AnimatePresence` to switch between the two views.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the navbar toggle to switch between **View: Interactive** (Portfolio) and **View: Resume**.

## Customization

- **Copy (hero, about, projects, lab, contact):** Edit `content/copy.ts`. Tune tone and "Currently learning" to your voice.
- **Email:** Update in `components/Navbar.tsx` and `components/sections/ContactSection.tsx` (and ResumeView if needed).
- **GitHub:** Repos are fetched for `ShalevAtsis` in `app/page.tsx` and `lib/github.ts`; change the username if needed.
- **Lab items:** Add or edit experiments in `content/copy.ts` under `lab.items`; set `href` to real URLs when you have them.
- **Themes:** Edit `tailwind.config.ts` (`cyber` and `paper` colors) and `app/globals.css` for visual tweaks.

## Publish to GitHub Pages

The site can be deployed to GitHub Pages via GitHub Actions. **See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** for step-by-step instructions to configure your repository and Pages source (Settings → Pages → Source: **GitHub Actions**). After that, every push to `main` will build and deploy automatically.

## Resume / PDF

In **Resume** mode, click **Download PDF** to open the print dialog and save as PDF. Print styles hide the navbar and the button.
