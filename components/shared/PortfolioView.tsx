// Server Component layout shell. All client-interactive children (OceanicBackground,
// dynamic section imports, ScrollToTopButton, BugTrigger) carry their own
// "use client" boundaries and hydrate independently.

import type { GitHubRepo } from "@/lib/github";
import OceanicBackground from "@/components/shared/OceanicBackground";
import SectionDivider from "@/components/ui/SectionDivider";
import BugTrigger from "@/components/shared/BugTrigger";
// Only CleanHero must be eagerly loaded — it contains the LCP element
import CleanHero from "@/components/sections/CleanHero";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
// Regular static imports for all sections to ensure immediate rendering
import AboutSection from "@/components/sections/AboutSection";
import CleanExperience from "@/components/sections/CleanExperience";
import CleanSkills from "@/components/sections/CleanSkills";
import CleanProjects from "@/components/sections/CleanProjects";
import GallerySection from "@/components/sections/GallerySection";
import PersonalWorld from "@/components/sections/PersonalWorld";
import ContactSection from "@/components/sections/ContactSection";

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos: _repos }: PortfolioViewProps) {
  return (
    <OceanicBackground className="text-slate-900 antialiased dark:text-slate-100">
      <main className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl 2xl:max-w-screen-xl px-4 pb-32 sm:px-8 lg:px-12 lg:pb-40 2xl:px-16">
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
        <GallerySection />
        <SectionDivider />
        <PersonalWorld />
        <SectionDivider />
        <ContactSection />
      </main>

      <footer className="relative z-10 border-t border-slate-100 py-6 lg:py-10 dark:border-slate-800">
        <div className="mx-auto flex max-w-5xl lg:max-w-6xl 2xl:max-w-screen-xl items-center justify-between gap-3 px-6 sm:px-8 lg:px-12 2xl:px-16">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Shalev Atsis &middot; Software Engineer &middot; {new Date().getFullYear()}
          </p>
          <BugTrigger />
        </div>
      </footer>
      <ScrollToTopButton />
    </OceanicBackground>
  );
}
