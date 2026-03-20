# Shalev Atsis | Software Engineer

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

**[🌍 Live Site: shalevatsis.dev](https://shalevatsis.dev)**

Experienced Software Engineer specializing in GenAI, Computer Vision, and complex system integrations. Proven track record of architecting performant, scalable front-end and full-stack solutions with an uncompromising standard for engineering quality and premium user experiences.

---

## 🏗️ Architecture & Technical Feats

This portfolio is not just a digital business card; it is a demonstration of enterprise-grade engineering practices, strict architectural patterns, and deep knowledge of the modern web platform.

- **Custom Cloudinary Loader Engine**  
  Bypassed standard Next.js image optimization constraints (which fail on `output: export`) by writing a custom loader that directly hooks into Cloudinary's CDN. It dynamically applies `q_auto` (perceptual quality algorithms) and `f_auto` format delivery, slashing bandwidth without relying on a Node.js runtime.

- **Interactive 3D WebGL Visualization**  
  Engineered a high-performance 3D globe utilizing `react-globe.gl` and Three.js. Real-time rendering of precise GPS coordinates handles complex data structures while maintaining a strict 60fps frame rate for geographical storytelling.

- **Strict WCAG 2.1 AA Accessibility**  
  Accessibility is not an afterthought, but an architectural requirement. The application features robust ARIA live regions for screen-reader announcements on dynamic state changes, rigorous keyboard focus management (including a functional UI-layer skip-to-content mechanism), and graceful motion degradation respecting the OS-level `prefers-reduced-motion` flag.

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

I am a Software Engineer available for a full-time role.

- **LinkedIn:** [linkedin.com/in/shalev-atsis](https://www.linkedin.com/in/shalev-atsis/)
- **GitHub:** [github.com/ShalevAtsis](https://github.com/ShalevAtsis)

---

## 💻 Getting Started

Detailed instructions for cloning and running the repository locally.

```bash
# Clone the repository
git clone https://github.com/ShalevAtsis/Portfolio.git

# Navigate into the project directory
cd Portfolio

# Install dependencies (requires Node.js 18+)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
