"use client";

import { motion } from "framer-motion";
import { hero } from "@/content/copy";

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center py-20 sm:py-28">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
      >
        <span className="text-cyber-text">{hero.headline}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 max-w-2xl text-lg text-cyber-muted leading-relaxed"
      >
        {hero.subheadline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={scrollToProjects}
          className="rounded-full bg-cyber-accent px-6 py-3 text-sm font-semibold text-cyber-bg shadow-glow transition hover:bg-cyber-accentDim focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
        >
          {hero.ctaPrimary}
        </button>
        <span className="rounded-full border border-cyber-border/60 bg-cyber-surface/50 px-4 py-2 text-sm text-cyber-muted backdrop-blur-sm">
          {hero.currentlyLearning}
        </span>
      </motion.div>
    </section>
  );
}
