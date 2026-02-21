"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";
import FadeInUp from "@/components/ui/FadeInUp";
import HoverEffectCard from "@/components/HoverEffectCard";

// ─── Types ────────────────────────────────────────────────────────────────────

type SkillCategory = "lang" | "ai" | "devops" | "concepts";

interface Skill {
    label: string;
    category: SkillCategory;
}

interface SkillGroup {
    title: string;
    category: SkillCategory;
    skills: Skill[];
    spotlightColor: string;
}

// ─── Skill data ───────────────────────────────────────────────────────────────

function s(label: string, category: SkillCategory): Skill {
    return { label, category };
}

const SKILL_GROUPS: SkillGroup[] = [
    {
        title: "Programming",
        category: "lang",
        spotlightColor: "rgba(99,102,241,0.10)",
        skills: [
            s("Python", "lang"), s("TypeScript", "lang"), s("Java", "lang"),
            s("C++", "lang"), s("SQL", "lang"), s("JavaScript", "lang"),
            s("NumPy", "lang"), s("Pandas", "lang"), s("Matplotlib", "lang"),
        ],
    },
    {
        title: "AI & Machine Learning",
        category: "ai",
        spotlightColor: "rgba(16,185,129,0.10)",
        skills: [
            s("PyTorch", "ai"), s("OpenCV", "ai"), s("HuggingFace", "ai"),
            s("Scikit-learn", "ai"), s("GenAI", "ai"), s("Diffusion Models", "ai"),
            s("Computer Vision", "ai"), s("Deep Learning", "ai"),
        ],
    },
    {
        title: "Cloud & DevOps",
        category: "devops",
        spotlightColor: "rgba(245,158,11,0.10)",
        skills: [
            s("AWS (EC2, ECR)", "devops"), s("Docker", "devops"), s("CI/CD", "devops"),
            s("Jenkins", "devops"), s("MongoDB", "devops"), s("Git", "devops"),
        ],
    },
    {
        title: "Concepts & Soft Skills",
        category: "concepts",
        spotlightColor: "rgba(100,116,139,0.10)",
        skills: [
            s("Data Structures", "concepts"), s("Algorithms", "concepts"),
            s("OOP", "concepts"), s("System Design", "concepts"),
            s("Agile", "concepts"), s("Communication Networks", "concepts"),
            s("Analytical Thinking", "concepts"), s("Team Collaboration", "concepts"),
            s("Fast Learning", "concepts"),
        ],
    },
];

// ─── Semantic colour map ──────────────────────────────────────────────────────

const PILL_STYLES: Record<SkillCategory, string> = {
    // Programming — indigo/blue
    lang: [
        "bg-indigo-50   text-indigo-700  ring-1 ring-indigo-200",
        "dark:bg-indigo-950/60 dark:text-indigo-300 dark:ring-indigo-800",
        "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
    ].join(" "),

    // AI & ML — emerald/teal
    ai: [
        "bg-emerald-50  text-emerald-700 ring-1 ring-emerald-200",
        "dark:bg-emerald-950/60 dark:text-emerald-300 dark:ring-emerald-800",
        "hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
    ].join(" "),

    // Cloud & DevOps — amber/orange
    devops: [
        "bg-amber-50    text-amber-700   ring-1 ring-amber-200",
        "dark:bg-amber-950/60 dark:text-amber-300 dark:ring-amber-800",
        "hover:bg-amber-100 dark:hover:bg-amber-900/50",
    ].join(" "),

    // Concepts & Soft Skills — slate/gray
    concepts: [
        "bg-slate-100   text-slate-600   ring-1 ring-slate-200",
        "dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
        "hover:bg-slate-200 dark:hover:bg-slate-700",
    ].join(" "),
};

const TITLE_STYLES: Record<SkillCategory, string> = {
    lang: "text-indigo-600  dark:text-indigo-400",
    ai: "text-emerald-600 dark:text-emerald-400",
    devops: "text-amber-600   dark:text-amber-400",
    concepts: "text-slate-400   dark:text-slate-500",
};

// ─── Pill animation ───────────────────────────────────────────────────────────

const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { ...springSnappy } },
    exit: { opacity: 0, scale: 0.75, transition: { duration: 0.15 } },
};

function Pill({ skill }: { skill: Skill }) {
    return (
        <motion.span
            key={skill.label}
            layout
            variants={pillVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
            className={`inline-flex cursor-default items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${PILL_STYLES[skill.category]}`}
        >
            {skill.label}
        </motion.span>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function CleanSkills() {
    const [query, setQuery] = useState("");

    // Normalised query for loose matching
    const q = query.trim().toLowerCase();

    // Filter each group's skills dynamically
    const filteredGroups = useMemo(
        () =>
            SKILL_GROUPS.map((group) => ({
                ...group,
                skills: q
                    ? group.skills.filter((sk) =>
                        sk.label.toLowerCase().includes(q)
                    )
                    : group.skills,
            })).filter((group) => group.skills.length > 0),
        [q]
    );

    return (
        <section id="skills" className="py-24 sm:py-32 scroll-mt-20">
            {/* ── Header + search bar ── */}
            <FadeInUp className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Skills
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                    Languages, frameworks, and tools I use day-to-day.
                </p>
            </FadeInUp>

            {/* Search input */}
            <FadeInUp delay={0.06} className="mb-10">
                <div className="relative max-w-sm">
                    <Search
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        strokeWidth={1.75}
                        aria-hidden
                    />
                    <input
                        type="text"
                        placeholder="Filter skills…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Filter skills"
                        className={[
                            "w-full rounded-xl py-2.5 pl-10 pr-10 text-sm",
                            "border border-slate-200 bg-white/80 backdrop-blur-sm",
                            "dark:border-slate-700 dark:bg-slate-800/80",
                            "text-slate-900 placeholder:text-slate-400",
                            "dark:text-slate-100 dark:placeholder:text-slate-500",
                            "shadow-sm transition",
                            "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400",
                            "dark:focus:ring-emerald-400/40 dark:focus:border-emerald-500",
                        ].join(" ")}
                    />
                    {/* Clear button */}
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={springSnappy}
                                type="button"
                                aria-label="Clear search"
                                onClick={() => setQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
                            >
                                <X className="h-3.5 w-3.5" strokeWidth={2} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </FadeInUp>

            {/* ── Skill groups grid ── */}
            <AnimatePresence mode="popLayout">
                {filteredGroups.length > 0 ? (
                    <motion.div
                        key="groups"
                        layout
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                        {filteredGroups.map((group, i) => (
                            <motion.div
                                key={group.title}
                                layout
                                variants={fadeInUpVariants}
                                transition={{ ...springSnappy, delay: i * 0.06 }}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                                viewport={{ once: true, margin: "-60px" }}
                            >
                                <HoverEffectCard
                                    className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    spotlightColor={group.spotlightColor}
                                >
                                    <p className={`mb-4 text-xs font-bold uppercase tracking-widest ${TITLE_STYLES[group.category]}`}>
                                        {group.title}
                                    </p>
                                    <motion.div layout className="flex flex-wrap gap-2">
                                        <AnimatePresence mode="popLayout">
                                            {group.skills.map((skill) => (
                                                <Pill key={skill.label} skill={skill} />
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                </HoverEffectCard>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-slate-400 dark:text-slate-500"
                    >
                        No skills match &ldquo;{query}&rdquo;.
                    </motion.p>
                )}
            </AnimatePresence>
        </section>
    );
}
