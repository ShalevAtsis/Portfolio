"use client";

import { useState, type ReactNode } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HoverEffectCard from "@/components/HoverEffectCard";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
    skills: string[];
    /** A lucide-react icon element rendered in the card header */
    icon?: ReactNode;
    /** Optional override for the spotlight colour */
    accentColor?: string;
}

// ─── Skill badge pill ─────────────────────────────────────────────────────────

function SkillBadge({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
            {label}
        </span>
    );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            // ── Scroll-reveal entrance ──
            variants={fadeInUpVariants}
            transition={{ ...springSnappy, delay: index * 0.06 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            // ── layout prop drives smooth height transition on expand ──
            layout
            className="h-full"         // ← ensures all grid cells stretch equally
        >
            <HoverEffectCard
                spotlightColor={project.accentColor ?? "rgba(99,102,241,0.09)"}
                className="h-full rounded-2xl"
            >
                {/*
                 * flex-col + h-full: the card fills its grid cell top-to-bottom.
                 * This means every card header aligns at the top and every
                 * footer badge row aligns at the bottom — regardless of text length.
                 */}
                <motion.div
                    layout
                    className={[
                        "flex h-full flex-col gap-4 rounded-2xl p-6",
                        "border border-slate-200/60 bg-white/70 backdrop-blur-sm",
                        "dark:border-slate-700/60 dark:bg-slate-900/60",
                        "transition-colors duration-300",
                    ].join(" ")}
                >
                    {/* ── Header row — project icon + external link ── */}
                    <div className="flex items-center justify-between">
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                        >
                            {project.icon ?? <Github className="h-5 w-5" strokeWidth={1.75} />}
                        </a>
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                            tabIndex={-1}
                            className="text-slate-400 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
                        >
                            <Github className="h-5 w-5" strokeWidth={1.75} />
                        </a>
                    </div>

                    {/* ── Title ── */}
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                        aria-hidden
                    >
                        <h3 className="text-xl font-semibold leading-snug text-slate-900 dark:text-slate-50">
                            {project.name}
                        </h3>
                    </a>

                    {/* ── Description + Read more toggle ── */}
                    {/*
                     * flex-1 here is the symmetry key:
                     * it makes the description block grow to fill the available
                     * vertical space, so the skill badges below always sit at
                     * the same row across sibling cards in the same grid row.
                     */}
                    <div className="flex flex-1 flex-col">
                        <AnimatePresence initial={false}>
                            <motion.p
                                key={isExpanded ? "expanded" : "collapsed"}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={[
                                    "text-sm leading-relaxed text-slate-500 dark:text-slate-400",
                                    isExpanded ? "" : "line-clamp-3",
                                ].join(" ")}
                            >
                                {project.description}
                            </motion.p>
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={() => setIsExpanded((v) => !v)}
                            className="mt-2 self-start text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400 focus:outline-none focus-visible:underline"
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    </div>

                    {/* ── Skills footer — mt-auto guarantees bottom alignment ── */}
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {project.skills.map((skill) => (
                            <SkillBadge key={skill} label={skill} />
                        ))}
                    </div>
                </motion.div>
            </HoverEffectCard>
        </motion.div>
    );
}
