"use client";

import { about } from "@/content/copy";
import FadeInUp from "@/components/ui/FadeInUp";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <FadeInUp as="h2" className="text-2xl font-bold text-cyber-text sm:text-3xl mb-10">
        About
      </FadeInUp>
      <div className="max-w-2xl space-y-6">
        <FadeInUp delay={0.05} className="text-cyber-muted leading-relaxed">
          {about.opening}
        </FadeInUp>
        <FadeInUp delay={0.1} className="text-cyber-muted leading-relaxed">
          {about.proof}
        </FadeInUp>
        <FadeInUp delay={0.15} className="text-cyber-text font-medium leading-relaxed">
          {about.closing}
        </FadeInUp>
      </div>
    </section>
  );
}
