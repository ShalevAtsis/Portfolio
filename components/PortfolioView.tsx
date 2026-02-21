"use client";

import type { GitHubRepo } from "@/lib/github";
import BackgroundMatrix from "@/components/BackgroundMatrix";
import SectionDivider from "@/components/SectionDivider";
import BugTrigger from "@/components/BugTrigger";
import CleanHero from "@/components/sections/CleanHero";
import AboutSection from "@/components/sections/AboutSection";
import CleanExperience from "@/components/sections/CleanExperience";
import CleanSkills from "@/components/sections/CleanSkills";
import CleanProjects from "@/components/sections/CleanProjects";
import PersonalWorld from "@/components/sections/PersonalWorld";
import ContactSection from "@/components/sections/ContactSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos: _repos }: PortfolioViewProps) {
  return (
    <BackgroundMatrix className="text-slate-900 antialiased dark:text-slate-100">
      <main className="mx-auto max-w-5xl px-6 pb-32 sm:px-8 lg:px-12">
        <CleanHero />
        <SectionDivider />
        <AboutSection />
        <SectionDivider double />
        <CleanExperience />
        <SectionDivider double />
        <CleanSkills />
        <SectionDivider double />
        <CleanProjects />
        <SectionDivider />
        <PersonalWorld />
        <SectionDivider />
        <ContactSection />
      </main>

      <footer className="border-t border-slate-100 py-6 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Shalev Atsis &middot; Software Engineer &middot; {new Date().getFullYear()}
          </p>
          <BugTrigger />
        </div>
      </footer>
      <ScrollToTopButton />
    </BackgroundMatrix>
  );
}
