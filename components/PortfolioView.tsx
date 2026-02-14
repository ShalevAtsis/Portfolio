"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";
import SwellSightCard from "./SwellSightCard";
import RepoCard from "./RepoCard";
import TechMarquee from "./TechMarquee";

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos }: PortfolioViewProps) {
  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      {/* Subtle glow */}
      <div className="pointer-events-none fixed inset-0 bg-cyber-glow" />

      <main className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-cyber-text">Building </span>
            <span className="bg-gradient-to-r from-cyber-accent to-cyber-emerald bg-clip-text text-transparent">
              Intelligent
            </span>
            <br />
            <span className="text-cyber-text">Software Solutions.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-cyber-muted"
          >
            Tier 2 Software Support Engineer at Jifiti · B.Sc. Computer Science
            (HIT) · Python, AI/ML, and full-stack development.
          </motion.p>
        </section>

        {/* Tech marquee */}
        <section className="py-4">
          <TechMarquee />
        </section>

        {/* Project Showcase */}
        <section className="py-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-2xl font-bold text-cyber-text sm:text-3xl"
          >
            Projects
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SwellSightCard />
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i + 1} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
