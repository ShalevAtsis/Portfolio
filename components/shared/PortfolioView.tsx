// Server Component layout shell. All client-interactive children (OceanicBackground,
// dynamic section imports, ScrollToTopButton, BugTrigger) carry their own
// "use client" boundaries and hydrate independently.

import dynamic from "next/dynamic";
import type { GitHubRepo } from "@/lib/github";
import OceanicBackground from "@/components/shared/OceanicBackground";
import SectionDivider from "@/components/ui/SectionDivider";
import BugTrigger from "@/components/shared/BugTrigger";
// Only CleanHero must be eagerly loaded — it contains the LCP element
import CleanHero from "@/components/sections/CleanHero";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
// All sections below CleanHero — split into separate JS chunks, loaded on demand
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const CleanExperience = dynamic(() => import("@/components/sections/CleanExperience"), { ssr: false });
const CleanSkills = dynamic(() => import("@/components/sections/CleanSkills"), { ssr: false });
const CleanProjects = dynamic(() => import("@/components/sections/CleanProjects"), { ssr: false });
const PersonalWorld = dynamic(() => import("@/components/sections/PersonalWorld"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos: _repos }: PortfolioViewProps) {
  return (
    <OceanicBackground className="text-slate-900 antialiased dark:text-slate-100">
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-32 sm:px-8 lg:px-12">
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

      <footer className="relative z-10 border-t border-slate-100 py-6 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Shalev Atsis &middot; Software Engineer &middot; {new Date().getFullYear()}
          </p>
          <BugTrigger />
        </div>
      </footer>
      <ScrollToTopButton />
    </OceanicBackground>
  );
}
