# Shalev Atsis | Software Engineer · AI Engineer

[![CI](https://github.com/ShalevAtsis/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ShalevAtsis/Portfolio/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

**[🌍 Live Site: shalevatsis.dev](https://shalevatsis.dev)**

Software Engineer and AI Engineer. I currently build AI-driven quality engineering for autonomous aviation at High Lander: validating computer-vision algorithms and real-time decision engines with Playwright, TypeScript, and Python. B.Sc. Computer Science (HIT), Honor Graduate, GPA 94.

---

## 🏗️ Architecture & Technical Feats

This portfolio is not just a digital business card; it is a demonstration of enterprise-grade engineering practices, strict architectural patterns, and deep knowledge of the modern web platform.

- **Custom Cloudinary Loader Engine**  
  Bypassed standard Next.js image optimization constraints (which fail on `output: export`) by writing a custom loader that directly hooks into Cloudinary's CDN. It dynamically applies `q_auto` (perceptual quality algorithms) and `f_auto` format delivery, slashing bandwidth without relying on a Node.js runtime.

- **Interactive 3D WebGL Visualization**  
  A 3D globe built with `react-globe.gl` (Three.js under the hood) plots surf and dive spots from GPS coordinates. It is lazy-mounted only when it approaches the viewport, so it costs nothing on first load.

- **Strict WCAG 2.1 AA Accessibility**  
  Accessibility is not an afterthought, but an architectural requirement. The application features robust ARIA live regions for screen-reader announcements on dynamic state changes, rigorous keyboard focus management (including a functional UI-layer skip-to-content mechanism), and graceful motion degradation respecting the OS-level `prefers-reduced-motion` flag.

- **Hermetic Playwright suite (Page Object Model)**  
  `tests/` holds a POM suite that runs on Desktop, Tablet, and Mobile against the static export. Every external host is mocked (`tests/fixtures.ts`), so CI never sends real e-mails or depends on third-party uptime. Pixel baselines are generated in the official Playwright Docker image and compared on Linux only.

- **Cinematic, Zero-Crop Renderings**  
  Developed a continuous, responsive image slideshow engine utilizing mathematical dynamic aspect ratios (`aspect-ratio: width / height`). It actively prevents Continuous Layout Shifts (CLS) while ensuring complex images are never cropped, regardless of esoteric viewport dimensions.

---

## 🧠 Featured Engineering: SwellSight

**SwellSight** demonstrates my capability to build and deploy end-to-end machine learning and computer vision architectures.

It is a custom GenAI model engineered to process and analyze ocean wave parameters directly from unstructured beach camera images. This project showcases:
- **Computer Vision Pipeline Development:** Handling noisy, real-world visual data streams.
- **Machine Learning Integration:** Moving from Python/PyTorch research to a deployed, capable inference engine.
- **Architectural Scalability:** Connecting deep learning backends with responsive, user-facing data presentation layers.

---

## 📬 Contact & Availability

I am open to hearing about software and AI engineering opportunities.

- **LinkedIn:** [linkedin.com/in/shalev-atsis-software-developer/](https://www.linkedin.com/in/shalev-atsis-software-developer/)
- **GitHub:** [github.com/ShalevAtsis](https://github.com/ShalevAtsis)

---

## 🛠️ Development

```bash
npm ci
npm run dev                 # http://localhost:3000
npm run lint && npm run typecheck
npm run build               # static export to ./out
npm test                    # Playwright (Desktop, Tablet, Mobile)
npm run test:visual:update  # regenerate Linux pixel baselines (Docker)
```

Deployment notes live in [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md); performance numbers in [docs/perf.md](docs/perf.md).
