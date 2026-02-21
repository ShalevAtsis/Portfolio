"use client";

import type { GitHubRepo } from "@/lib/github";
import { MessageCircle, Mail, Linkedin as LinkedinIcon, Github as GithubIcon } from "lucide-react";
import BackgroundMatrix from "@/components/BackgroundMatrix";
import SectionDivider from "@/components/SectionDivider";
import ContactButton from "@/components/ContactButton";
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

      <footer className="border-t border-slate-100 bg-white/60 py-12 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">

          {/* ── Contact grid ── */}
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Get in touch
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ContactButton
              href="https://wa.me/+972585060699"
              icon={<MessageCircle className="h-5 w-5" strokeWidth={1.75} />}
              label="WhatsApp"
              description="Fastest response"
              color="whatsapp"
              variant="full"
              external
            />
            <ContactButton
              href="mailto:Shalevatsis@gmail.com"
              icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}
              label="Email"
              description="Shalevatsis@gmail.com"
              color="email"
              variant="full"
            />
            <ContactButton
              href="https://www.linkedin.com/in/shalev-atsis-software-developer/"
              icon={<LinkedinIcon className="h-5 w-5" strokeWidth={1.75} />}
              label="LinkedIn"
              description="shalev-atsis"
              color="linkedin"
              variant="full"
              external
            />
            <ContactButton
              href="https://github.com/ShalevAtsis"
              icon={<GithubIcon className="h-5 w-5" strokeWidth={1.75} />}
              label="GitHub"
              description="ShalevAtsis"
              color="github"
              variant="full"
              external
            />
          </div>

          {/* ── Copyright + Easter Egg ── */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <p className="text-center text-sm text-slate-400 dark:text-slate-500">
              Shalev Atsis &middot; Software Engineer &middot; {new Date().getFullYear()}
            </p>
            <BugTrigger />
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </BackgroundMatrix>
  );
}
