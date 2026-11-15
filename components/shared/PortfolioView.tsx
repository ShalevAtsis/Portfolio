// Layout shell for the portfolio view. Sections are imported statically so the
// whole page hydrates in a single pass; heavy visuals (WebGL ocean, globe) are
// lazy-loaded inside their own components.

import type { GitHubRepo } from "@/lib/github";
import SectionDivider from "@/components/ui/SectionDivider";
import BugTrigger from "@/components/shared/BugTrigger";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import CleanHero from "@/components/sections/CleanHero";
import AboutSection from "@/components/sections/AboutSection";
import CleanExperience from "@/components/sections/CleanExperience";
import CleanSkills from "@/components/sections/CleanSkills";
import CleanProjects from "@/components/sections/CleanProjects";
import GallerySection from "@/components/sections/GallerySection";
import PersonalWorld from "@/components/sections/PersonalWorld";
import ContactSection from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Section";

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos }: PortfolioViewProps) {
  return (
    <div className="relative">
      {/* Static radial glows + very light grain, fixed behind everything. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="page-backdrop absolute inset-0" />
        <div className="page-grain absolute inset-0" />
      </div>

      <ScrollProgress />

      <main id="main-content" tabIndex={-1} className="relative focus:outline-none">
        <CleanHero />
        <AboutSection />
        <SectionDivider />
        <CleanExperience />
        <SectionDivider />
        <CleanSkills />
        <SectionDivider />
        <CleanProjects repos={repos} />
        <SectionDivider />
        <GallerySection />
        <PersonalWorld />
        <ContactSection />
      </main>

      <footer className="relative border-t border-hairline py-8">
        <Container className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink-2">
            Shalev Atsis &middot; Software Engineer &middot; {new Date().getFullYear()}
          </p>
          <BugTrigger />
        </Container>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}
