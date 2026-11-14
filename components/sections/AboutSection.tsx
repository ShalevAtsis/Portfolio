"use client";

import { Terminal, BrainCircuit, Shield } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pillar {
  icon: React.ReactNode;
  label: string;
  heading: string;
  body: React.ReactNode;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-emerald-600 dark:text-emerald-400">
      {children}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    icon: <Terminal className="h-6 w-6" strokeWidth={1.5} />,
    label: "The Engineer",
    heading: "Engineering trust in AI",
    body: (
      <>
        I&apos;m a Software Engineer working on{" "}
        <Hi>AI-driven quality engineering</Hi> at High Lander, where uncrewed
        aircraft share real airspace. I build the{" "}
        <Hi>Playwright, TypeScript, and Python</Hi> frameworks that validate
        computer-vision algorithms and real-time decision engines before they
        fly. I hold a B.Sc. in Computer Science from HIT —{" "}
        <Hi>Honor Graduate, GPA&nbsp;94</Hi>.
      </>
    ),
  },
  {
    icon: <BrainCircuit className="h-6 w-6" strokeWidth={1.5} />,
    label: "The Passion",
    heading: "At the AI frontier",
    body: (
      <>
        My deep interest lies at the intersection of{" "}
        <Hi>AI, Computer Vision</Hi>, and robust backend engineering. Whether
        that&apos;s training a <Hi>PyTorch model</Hi>, querying a misbehaving
        database, or integrating an API that refuses to cooperate — I find
        backend puzzles energizing. I&apos;m particularly excited by the way{" "}
        <Hi>GenAI and diffusion models</Hi> are reshaping what software can do,
        and I want to be close to that frontier.
      </>
    ),
  },
  {
    icon: <Shield className="h-6 w-6" strokeWidth={1.5} />,
    label: "The Journey",
    heading: "An unconventional path",
    body: (
      <>
        My path to software wasn&apos;t a straight line. I led a{" "}
        <Hi>14-person platoon</Hi> operating radar and EW systems at sea in the{" "}
        <Hi>Israeli Navy</Hi>. I ran global field tests on drone software across
        four countries. At Jifiti I investigated high-stakes{" "}
        <Hi>Fintech incidents</Hi> and cut manual regression time by 30% with
        automation. That arc means I&apos;m a
        calm problem-solver, a fast learner in unfamiliar domains, and someone
        who has operated in high-stakes environments long before writing
        production code.
      </>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
// framer-motion removed. Entrance animations use CSS scroll-driven approach:
// the section uses whileInView-equivalent via the `animate-fade-in-up` patterns
// defined in globals.css, applied with staggered animation-delay inline styles.

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
      {/* ── Section heading ── */}
      <div className="mb-14 hero-item" style={{ animationDelay: "0ms" }}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          About Me
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
          The TL;DR
        </h2>
      </div>

      {/* ── Three pillars — CSS staggered grid ── */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.label}
            className="flex flex-col gap-4 hero-item"
            style={{ animationDelay: `${80 + i * 130}ms` }}
          >
            {/* Icon + overline label */}
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {pillar.icon}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {pillar.label}
              </p>
            </div>

            {/* Pillar heading */}
            <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-50">
              {pillar.heading}
            </h3>

            {/* Body */}
            <p className="max-w-prose text-[0.9375rem] leading-relaxed text-slate-600 dark:text-slate-300 lg:text-lg lg:leading-relaxed">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
