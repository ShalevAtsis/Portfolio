"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import BentoCard from "@/components/ui/BentoCard";
import ButtonLink, { FOCUS_RING } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SKILL_GROUPS } from "@/lib/content";
import { REPO_URL } from "@/lib/contact";
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

// Bento layout: the two headline groups are wide, the rest share a row.
const SPANS: Record<string, string> = {
  qa: "md:col-span-3",
  ai: "md:col-span-3",
  lang: "md:col-span-2",
  devops: "md:col-span-2",
  concepts: "md:col-span-2",
};

export default function CleanSkills() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      SKILL_GROUPS.map((group) => ({
        ...group,
        skills: q ? group.skills.filter((skill) => skill.toLowerCase().includes(q)) : group.skills,
      })).filter((group) => group.skills.length > 0),
    [q]
  );

  return (
    <Section id="skills">
      <SectionHeader eyebrow="Toolbox" title="Skills" lede="Languages, frameworks, and tools I use day-to-day." />

      <Reveal className="mb-8">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" strokeWidth={1.75} aria-hidden />
          <input
            type="text"
            placeholder="Filter skills…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter skills"
            className="glass h-12 w-full rounded-full pl-11 pr-11 text-[15px] text-ink outline-none transition-shadow placeholder:text-ink-2 focus-visible:ring-2 focus-visible:ring-accent"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className={cn("absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-2 hover:text-ink", FOCUS_RING)}
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </Reveal>

      <p aria-live="polite" className="sr-only">
        {q ? `${groups.reduce((n, g) => n + g.skills.length, 0)} skills match ${query}` : ""}
      </p>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {groups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.06} className={q ? "md:col-span-3" : SPANS[group.id]}>
              <BentoCard interactive className="h-full p-7 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{group.title}</p>
                <p className="mt-2 text-[15px] leading-snug text-ink-2">{group.blurb}</p>
                <motion.ul
                  className="mt-6 flex flex-wrap gap-2"
                  variants={staggerContainer(0.04, 0.15)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                >
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={staggerItem}
                      className="rounded-full border border-hairline bg-ink/[0.06] px-3.5 py-1.5 text-sm font-medium text-ink"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
                {group.id === "qa" && !q && (
                  <div className="mt-6 border-t border-hairline pt-5">
                    <p className="text-sm leading-relaxed text-ink-2">
                      Proof of work: this site ships with its own Playwright suite (Page Object Model, three
                      viewports, hermetic network).
                    </p>
                    <ButtonLink variant="link" href={`${REPO_URL}/tree/main/tests`} external className="mt-2">
                      See the tests
                    </ButtonLink>
                  </div>
                )}
              </BentoCard>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-[15px] text-ink-2">No skills match &ldquo;{query}&rdquo;.</p>
      )}
    </Section>
  );
}
