"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CARD_SURFACE } from "@/components/ui/BentoCard";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { EXPERIENCE, type TimelineEntry } from "@/lib/content";
import { SCROLL_SPRING } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const STATS = [
  { value: 50, suffix: "+", label: "field tests on UAV and UGV systems" },
  { value: 70, suffix: "", label: "person crew commanded at sea" },
  { value: 14, suffix: "", label: "person specialist platoon led" },
  { value: 94, suffix: "", label: "final GPA, B.Sc. Computer Science" },
];

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Emphasis: the card nearest the middle of the viewport is fully lit; the
  // others are dimmed to ~50% by a veil in the page colour (opacity-only, and
  // the text itself never loses its real contrast in the DOM).
  const veil = useTransform(scrollYProgress, [0.12, 0.38, 0.62, 0.88], [0.5, 0, 0, 0.5]);
  const dotScale = useTransform(scrollYProgress, [0.12, 0.38, 0.62, 0.88], [0.7, 1.25, 1.25, 0.7]);
  const Icon = entry.kind === "education" ? GraduationCap : Briefcase;

  return (
    <li ref={ref} className="relative pl-12 sm:pl-16">
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-elevated text-accent"
        style={reduced ? undefined : { scale: dotScale }}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </motion.span>

      <Reveal delay={Math.min(index, 2) * 0.04}>
        <article className={cn(CARD_SURFACE, "p-7 md:p-9")}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">{entry.role}</h3>
              <p className="mt-1 text-[15px] font-medium text-accent">{entry.org}</p>
            </div>
            <div className="flex shrink-0 flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
              {entry.badge && (
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {entry.badge}
                </span>
              )}
              <span className="text-[13px] text-ink-2">{entry.period}</span>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink-2">
                <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-ink-2" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-canvas"
              style={{ opacity: veil }}
            />
          )}
        </article>
      </Reveal>
    </li>
  );
}

export default function CleanExperience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 65%", "end 65%"] });
  const lineScale = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Career"
        title="Experience & Education"
        lede="From naval operations to AI quality engineering: built on systems thinking."
      />

      <dl className="mb-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mb-24 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse">
            <dt className="mt-2 text-sm leading-snug text-ink-2">{stat.label}</dt>
            <dd className="text-5xl font-semibold tracking-[-0.04em] text-ink md:text-6xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>

      <div ref={timelineRef} className="relative">
        {/* Spine + the line that draws as you scroll */}
        <div aria-hidden="true" className="absolute bottom-0 left-5 top-7 w-px -translate-x-1/2 bg-hairline" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-7 w-px -translate-x-1/2 origin-top bg-accent"
          style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
        />

        <ol className="space-y-6 md:space-y-8">
          {EXPERIENCE.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
