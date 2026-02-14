"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";
import { projects } from "@/content/copy";
import SwellSightCard from "@/components/SwellSightCard";
import RepoCard from "@/components/RepoCard";
import TechMarquee from "@/components/TechMarquee";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeInUp from "@/components/ui/FadeInUp";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";

interface ProjectsSectionProps {
  repos: GitHubRepo[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export default function ProjectsSection({ repos }: ProjectsSectionProps) {
  const filteredRepos = repos.filter((repo) => repo.name !== "SwellSight");

  return (
    <SectionWrapper
      id="projects"
      title={projects.sectionTitle}
      subtitle={projects.sectionSubtitle}
      centerHeading
      className="py-20 sm:py-28 scroll-mt-20"
    >
      <FadeInUp className="mb-12">
        <TechMarquee />
      </FadeInUp>

      <motion.div
        className="grid grid-cols-12 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          className="col-span-12 md:col-span-8 h-full flex flex-col"
          variants={fadeInUpVariants}
          transition={springSnappy}
        >
          <SwellSightCard />
        </motion.div>

        {filteredRepos.map((repo, i) => (
          <motion.div
            key={repo.id}
            className="col-span-12 sm:col-span-6 md:col-span-4 h-full flex flex-col"
            variants={fadeInUpVariants}
            transition={springSnappy}
          >
            <SpotlightCard className="h-full flex flex-col">
              <RepoCard repo={repo} index={i} insideSpotlight />
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
