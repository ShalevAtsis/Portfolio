"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";
import { projects } from "@/content/copy";
import SwellSightCard from "@/components/SwellSightCard";
import RepoCard from "@/components/RepoCard";
import TechMarquee from "@/components/TechMarquee";

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

export default function ProjectsSection({ repos }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 sm:py-28 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-cyber-text sm:text-3xl">
          {projects.sectionTitle}
        </h2>
        <p className="mt-2 text-cyber-muted">{projects.sectionSubtitle}</p>
      </motion.div>
      <div className="mb-12">
        <TechMarquee />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SwellSightCard />
        {repos
          .filter((repo) => repo.name !== "SwellSight")
          .map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i + 1} />
          ))}
      </div>
    </section>
  );
}
