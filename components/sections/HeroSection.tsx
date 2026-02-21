"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants, fadeInUp, staggerContainer } from "@/lib/motion";
import { hero } from "@/content/copy";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  /** Optional override for the CTA scroll target id. Defaults to "projects". */
  scrollTargetId?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection({ scrollTargetId = "projects" }: HeroSectionProps) {
  const scrollTo = () => {
    document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center py-20 sm:py-28"
    >
      {/* Ambient glow blob */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cyber-glow"
        aria-hidden
      />

      {/* FadeInUp stagger container */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-y-6"
      >
        {/* Headline */}
        <motion.h1
          variants={fadeInUpVariants}
          transition={fadeInUp}
          className="text-4xl font-bold tracking-tight text-cyber-text sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
        >
          {hero.headline}
        </motion.h1>

        {/* Sub-headline / Bio */}
        <motion.p
          variants={fadeInUpVariants}
          transition={{ ...fadeInUp, delay: 0.05 }}
          className="max-w-2xl text-lg leading-relaxed text-cyber-muted"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeInUpVariants}
          transition={{ ...fadeInUp, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4"
        >
          <motion.button
            type="button"
            onClick={scrollTo}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px -10px rgba(6, 182, 212, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={fadeInUp}
            className="rounded-full bg-cyber-accent px-6 py-3 text-sm font-semibold text-cyber-bg shadow-glow hover:bg-cyber-accentDim focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
          >
            {hero.ctaPrimary}
          </motion.button>

          <span className="rounded-full border border-cyber-border/60 bg-cyber-surface/50 px-4 py-2 text-sm text-cyber-muted backdrop-blur-sm">
            {hero.currentlyLearning}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
