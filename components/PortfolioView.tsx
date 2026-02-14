"use client";

import type { GitHubRepo } from "@/lib/github";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProductionCaseStudySection from "@/components/sections/ProductionCaseStudySection";
import LabSection from "@/components/sections/LabSection";
import ContactSection from "@/components/sections/ContactSection";

interface PortfolioViewProps {
  repos: GitHubRepo[];
}

export default function PortfolioView({ repos }: PortfolioViewProps) {
  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      <div className="pointer-events-none fixed inset-0 bg-cyber-glow" />
      <main className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <ProjectsSection repos={repos} />
        <ProductionCaseStudySection />
        <LabSection />
        <ContactSection />
      </main>
    </div>
  );
}