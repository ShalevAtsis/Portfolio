"use client";

import { motion } from "framer-motion";
import { Terminal, BrainCircuit, Shield } from "lucide-react";
import { springSnappy } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pillar {
  icon: React.ReactNode;
  label: string;          // small overline label
  heading: string;        // bold pillar title
  body: React.ReactNode;  // JSX so we can highlight key terms inline
}

// ─── Highlighted span helpers ────────────────────────────────────────────────
// Keep it DRY: one accent color, one semantic weight.

function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-emerald-600 dark:text-emerald-400">
      {children}
    </span>
  );
}

// ─── Pillar data ──────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    icon: <Terminal className="h-6 w-6" strokeWidth={1.5} />,
    label: "The Engineer",
    heading: "Building in parallel",
    body: (
      <>
        I&apos;m a Software Engineer in motion — simultaneously a{" "}
        <Hi>Tier&nbsp;2 Support Engineer</Hi> at a high-availability{" "}
        <Hi>Fintech SaaS</Hi> company (Jifiti) and a Computer Science student
        at HIT, on track to graduate in 2026. Every week I debug{" "}
        <Hi>production incidents</Hi> by day and study algorithms by night. I
        genuinely enjoy both.
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
        <Hi>15-person platoon</Hi> operating radar and EW systems at sea in the{" "}
        <Hi>Israeli Navy</Hi>. I ran global field tests on drone software across
        four countries. Now I investigate high-stakes{" "}
        <Hi>Fintech incidents</Hi> under pressure. That arc means I&apos;m a
        calm problem-solver, a fast learner in unfamiliar domains, and someone
        who has operated in high-stakes environments long before writing
        production code.
      </>
    ),
  },
];

// ─── Stagger config ───────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { ...springSnappy } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      {/* ── Section heading — centred, then body left-aligned ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          About Me
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          The TL;DR
        </h2>
      </motion.div>

      {/* ── Three pillars — staggered grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12"
      >
        {PILLARS.map((pillar) => (
          <motion.div
            key={pillar.label}
            variants={pillarVariants}
            className="flex flex-col gap-4"
          >
            {/* Icon + overline label */}
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {pillar.icon}
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {pillar.label}
              </p>
            </div>

            {/* Pillar heading */}
            <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-50">
              {pillar.heading}
            </h3>

            {/* Body — left-aligned, generous line height */}
            <p className="max-w-prose text-[0.9375rem] leading-relaxed text-slate-600 dark:text-slate-300">
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
