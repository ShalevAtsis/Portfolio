"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";
import FadeInUp from "@/components/ui/FadeInUp";
import HoverEffectCard from "@/components/ui/HoverEffectCard";

type EntryKind = "work" | "education";

interface TimelineEntry {
    id: string;
    kind: EntryKind;
    role: string;
    org: string;
    period: string;
    badge?: string;
    bullets: string[];
}

const ENTRIES: TimelineEntry[] = [
    {
        id: "jifiti",
        kind: "work",
        role: "Tier 2 Software Support Engineer",
        org: "Jifiti",
        period: "Aug 2025 – Present",
        badge: "Current",
        bullets: [
            "Investigate production incidents on a high-availability Fintech SaaS platform — from initial triage to root cause, using SQL and deep log analysis.",
            "Built Python analytics pipelines to surface business insights from transaction and traffic data.",
            "Collaborate embedded in an R\u0026D Agile squad, validating backend fixes through CI/CD pipelines before they ship.",
        ],
    },
    {
        id: "hit",
        kind: "education",
        role: "B.Sc. Computer Science (In Progress)",
        org: "Holon Institute of Technology (HIT)",
        period: "2022 – June 2026",
        badge: "GPA 90",
        bullets: [
            "Specialising in Artificial Intelligence and Computer Vision — coursework spans Deep Learning, Algorithms, Databases, and Communication Networks.",
            "Applying classroom ML theory directly to side projects: PyTorch, OpenCV, diffusion models, and real-world data pipelines.",
        ],
    },
    {
        id: "hartech",
        kind: "work",
        role: "Software QA Specialist",
        org: "Hartech Technologies",
        period: "Nov 2021 – Dec 2022",
        bullets: [
            "Ran 50+ field tests across international sites for drone (UAV) and UGV Command-and-Control software.",
            "Delivered on-site client training and system integration support in multiple countries.",
            "Identified and resolved defects in C2 systems alongside cross-functional engineering teams.",
        ],
    },
    {
        id: "navy",
        kind: "work",
        role: "C2 System Operator & Team Lead",
        org: "Israeli Navy",
        period: "Feb 2019 – Oct 2021",
        bullets: [
            "Operated radar, sonar, and electronic warfare systems aboard a 3rd Fleet naval vessel in real-time operational conditions.",
            "Coordinated multi-platform intelligence integration with Air Force units (UAVs, jets) under pressure.",
            "Led a 70-person crew and a 15-person specialist platoon — accountability was non-negotiable.",
        ],
    },
];

// Work → Emerald   |   Education → Violet
const nodeStyle: Record<EntryKind, {
    icon: string; iconDark: string;
    org: string; orgDark: string;
    bullet: string; bulletDark: string;
    badge: string; badgeDark: string;
    spotlight: string;
    borderHover: string;
    shadowHover: string;
}> = {
    work: {
        icon: "bg-emerald-50  text-emerald-600 ring-emerald-200 shadow-emerald-200/50",
        iconDark: "dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-800 dark:shadow-emerald-900/50",
        org: "text-emerald-600",
        orgDark: "dark:text-emerald-400",
        bullet: "bg-emerald-400",
        bulletDark: "dark:bg-emerald-500",
        badge: "bg-emerald-50  text-emerald-700",
        badgeDark: "dark:bg-emerald-950/60 dark:text-emerald-300",
        spotlight: "rgba(16,185,129,0.12)",
        borderHover: "hover:border-emerald-300/50 dark:hover:border-emerald-700/50",
        shadowHover: "hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10",
    },
    education: {
        icon: "bg-violet-50   text-violet-600  ring-violet-200 shadow-violet-200/50",
        iconDark: "dark:bg-violet-950/60 dark:text-violet-400  dark:ring-violet-800 dark:shadow-violet-900/50",
        org: "text-violet-600",
        orgDark: "dark:text-violet-400",
        bullet: "bg-violet-400",
        bulletDark: "dark:bg-violet-500",
        badge: "bg-violet-50   text-violet-700",
        badgeDark: "dark:bg-violet-950/60 dark:text-violet-300",
        spotlight: "rgba(139,92,246,0.12)",
        borderHover: "hover:border-violet-300/50 dark:hover:border-violet-700/50",
        shadowHover: "hover:shadow-violet-500/10 dark:hover:shadow-violet-500/10",
    },
};

function NodeIcon({ kind }: { kind: EntryKind }) {
    const Icon = kind === "education" ? GraduationCap : Briefcase;
    const s = nodeStyle[kind];
    return (
        <span className={["relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-2 shadow-sm transition-transform duration-300 group-hover:scale-110", s.icon, s.iconDark].join(" ")}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
    );
}

export default function CleanExperience() {
    return (
        <section id="experience" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
            <FadeInUp className="mb-14">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Experience &amp; Education
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                    From naval operations to software engineering — built on systems thinking.
                </p>
            </FadeInUp>

            <div className="relative mx-auto max-w-4xl px-2 sm:px-0">
                {/* ── Background Spine Line ── */}
                <div
                    className="absolute bottom-0 left-[26px] top-6 w-[2px] rounded-full bg-gradient-to-b from-slate-200 via-slate-200/80 to-transparent dark:from-slate-700/80 dark:via-slate-700/40"
                    aria-hidden
                />

                <div className="space-y-6 lg:space-y-12">
                    {ENTRIES.map((entry, i) => {
                        const s = nodeStyle[entry.kind];
                        return (
                            <motion.div
                                key={entry.id}
                                className="group relative flex gap-6"
                                variants={fadeInUpVariants}
                                transition={{ ...springSnappy, delay: i * 0.07 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                            >
                                {/* Subtle glowing node backplate */}
                                <div className="absolute left-[4px] top-[4px] z-10 h-11 w-11 rounded-full bg-inherit blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

                                <div className="relative z-20 mt-1 flex flex-col items-center">
                                    <NodeIcon kind={entry.kind} />
                                </div>

                                <HoverEffectCard
                                    className={`relative z-20 flex-1 rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out group-hover:-translate-y-1 ${s.borderHover} ${s.shadowHover} dark:border-slate-800/60 dark:bg-slate-900/60`}
                                    spotlightColor={s.spotlight}
                                >
                                    <div className="flex flex-col gap-y-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 dark:text-slate-100">
                                                {entry.role}
                                            </h3>
                                            <p className={`mt-1 text-sm font-semibold tracking-wide uppercase ${s.org} ${s.orgDark}`}>
                                                {entry.org}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                                            {entry.badge && (
                                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${s.badge} ${s.badgeDark}`}>
                                                    {entry.badge}
                                                </span>
                                            )}
                                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                {entry.period}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="mt-5 space-y-3">
                                        {entry.bullets.map((b) => (
                                            <li key={b} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-slate-600 dark:text-slate-400">
                                                <span className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125 ${s.bullet} ${s.bulletDark}`} aria-hidden />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </HoverEffectCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
