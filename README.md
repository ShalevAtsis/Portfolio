# Shalev Atsis — Dual-Mode Personal Website

A **Portfolio** (visual, interactive) and **Resume** (document-style, printable) site built with Next.js 14, Tailwind CSS, and Framer Motion.

## Project structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles, glass & A4 utilities
│   ├── layout.tsx           # Root layout, fonts, ViewProvider
│   └── page.tsx             # Main page: fetches GitHub repos, renders Navbar + ViewSwitcher
├── components/
│   ├── Navbar.tsx           # Toggle (View: Interactive / View: Resume) + GitHub, LinkedIn, Email
│   ├── ViewSwitcher.tsx     # AnimatePresence; conditionally renders PortfolioView | ResumeView
│   ├── PortfolioView.tsx    # Portfolio mode: Hero, TechMarquee, SwellSight + repo grid
│   ├── ResumeView.tsx       # Resume mode: A4 layout, experience, education, Download PDF
│   ├── SwellSightCard.tsx   # Featured project card (SwellSight)
│   ├── RepoCard.tsx         # GitHub repo card
│   └── TechMarquee.tsx      # Scrolling tech stack (Python, PyTorch, etc.)
├── context/
│   └── ViewContext.tsx      # State: isResumeMode, setResumeMode, toggleMode
├── lib/
│   └── github.ts           # getPinnedRepos(username) — GitHub API
├── tailwind.config.ts      # Cyber (portfolio) & Paper (resume) theme colors
├── package.json
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

- **Email:** Update the `EMAIL` constant in `components/Navbar.tsx` (and in ResumeView if you add contact there).
- **GitHub:** Repos are fetched for `ShalevAtsis` in `app/page.tsx` and `lib/github.ts`; change the username if needed.
- **Themes:** Edit `tailwind.config.ts` (`cyber` and `paper` colors) and `app/globals.css` for visual tweaks.

## Resume / PDF

In **Resume** mode, click **Download PDF** to open the print dialog and save as PDF. Print styles hide the navbar and the button.
