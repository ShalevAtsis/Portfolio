"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BrainCircuit, Shield, Terminal } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import BentoCard from "@/components/ui/BentoCard";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/cn";

// ─── Scroll-linked statement ──────────────────────────────────────────────────

const STATEMENT =
  "I build software you can trust in places where failure is not an option: at sea, in the air, and in production. Today that means teaching machines to see, and proving they are right before they fly.";
const WORDS = STATEMENT.split(" ");

function Word({ children, index, dim, read }: { children: string; index: number; dim: MotionValue<number>; read: MotionValue<number> }) {
  const start = index / WORDS.length;
  const end = Math.min(1, start + 3 / WORDS.length);
  const lit = useTransform(read, [start, end], [0.2, 1]);
  // Words stay fully opaque until the block approaches the viewport (so the
  // text is never low-contrast while off-screen), then light up one by one.
  const opacity = useTransform([dim, lit], ([d, l]: number[]) => Math.max(d, l));
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/**
 * Pinned statement: the block sticks while its words go from 20% to 100%
 * opacity with scroll. Under reduced motion it is a normal paragraph.
 */
function ScrollStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 60%"] });
  const { scrollYProgress: read } = useScroll({ target: ref, offset: ["start 20%", "end 85%"] });
  const dim = useTransform(enter, [0, 1], [1, 0.2]);

  const textClass =
    "mx-auto max-w-5xl text-balance text-[clamp(1.75rem,4.4vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink";

  if (reduced) {
    return (
      <Container className="py-16">
        <p className={textClass}>{STATEMENT}</p>
      </Container>
    );
  }

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <Container>
          <p className={textClass}>
            {WORDS.map((word, i) => (
              <Word key={i} index={i} dim={dim} read={read}>
                {word}
              </Word>
            ))}
          </p>
        </Container>
      </div>
    </div>
  );
}

// ─── Pillars ──────────────────────────────────────────────────────────────────

function Hi({ children }: { children: ReactNode }) {
  return <span className="font-medium text-ink">{children}</span>;
}

interface Pillar {
  icon: ReactNode;
  label: string;
  heading: string;
  body: ReactNode;
  className: string;
  parallax: number;
}

const PILLARS: Pillar[] = [
  {
    icon: <Terminal className="h-5 w-5" strokeWidth={1.5} />,
    label: "The Engineer",
    heading: "Engineering trust in AI",
    className: "md:col-span-3",
    parallax: 14,
    body: (
      <>
        I&apos;m a Software Engineer working on <Hi>AI-driven quality engineering</Hi> at High Lander, where
        uncrewed aircraft share real airspace. I build the <Hi>Playwright, TypeScript, and Python</Hi> frameworks
        that validate computer-vision algorithms and real-time decision engines before they fly. I hold a B.Sc.
        in Computer Science from HIT: <Hi>Honor Graduate, GPA&nbsp;94</Hi>.
      </>
    ),
  },
  {
    icon: <BrainCircuit className="h-5 w-5" strokeWidth={1.5} />,
    label: "The Passion",
    heading: "At the AI frontier",
    className: "md:col-span-3",
    parallax: 30,
    body: (
      <>
        My deep interest lies at the intersection of <Hi>AI, Computer Vision</Hi>, and robust backend
        engineering. Whether that&apos;s training a <Hi>PyTorch model</Hi>, querying a misbehaving database, or
        integrating an API that refuses to cooperate, I find these puzzles energizing. I&apos;m especially
        excited by how <Hi>GenAI and diffusion models</Hi> are reshaping what software can do.
      </>
    ),
  },
  {
    icon: <Shield className="h-5 w-5" strokeWidth={1.5} />,
    label: "The Journey",
    heading: "An unconventional path",
    className: "md:col-span-6",
    parallax: 8,
    body: (
      <>
        My path to software wasn&apos;t a straight line. I led a <Hi>14-person platoon</Hi> operating radar and
        EW systems at sea in the <Hi>Israeli Navy</Hi>. I ran global field tests on drone software across four
        countries. At Jifiti I investigated high-stakes <Hi>Fintech incidents</Hi> and cut manual regression
        time by 30% with automation. That arc means I&apos;m a calm problem-solver, a fast learner in unfamiliar
        domains, and someone who operated in high-stakes environments long before writing production code.
      </>
    ),
  },
];

export default function AboutSection() {
  return (
    <Section id="about" bleed className="pb-28 md:pb-44">
      <Container>
        <SectionHeader eyebrow="About Me" title="The TL;DR" className="mb-0 md:mb-0" />
      </Container>

      <ScrollStatement />

      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {PILLARS.map((pillar, i) => (
            <Parallax key={pillar.label} offset={pillar.parallax} className={pillar.className}>
              <Reveal delay={i * 0.1} className="h-full">
                <BentoCard className="h-full p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                    >
                      {pillar.icon}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-2">{pillar.label}</p>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink md:text-3xl">
                    {pillar.heading}
                  </h3>
                  <p className={cn("mt-4 text-[17px] leading-relaxed text-ink-2", i === 2 && "max-w-3xl")}>
                    {pillar.body}
                  </p>
                </BentoCard>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </Container>
    </Section>
  );
}
