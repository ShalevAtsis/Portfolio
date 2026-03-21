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
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold sections
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const CleanExperience = dynamic(() => import("@/components/sections/CleanExperience"));
const CleanSkills = dynamic(() => import("@/components/sections/CleanSkills"));
const CleanProjects = dynamic(() => import("@/components/sections/CleanProjects"));
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"));
const PersonalWorld = dynamic(() => import("@/components/sections/PersonalWorld"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos: _repos }: PortfolioViewProps) {
  return (
    <OceanicBackground className="text-slate-900 antialiased dark:text-slate-100">
      <main id="main-content" tabIndex={-1} className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl 2xl:max-w-screen-xl px-4 pb-32 sm:px-8 lg:px-12 lg:pb-40 2xl:px-16 focus:outline-none">
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
