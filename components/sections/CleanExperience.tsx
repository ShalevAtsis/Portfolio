"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";
import FadeInUp from "@/components/ui/FadeInUp";
import HoverEffectCard from "@/components/HoverEffectCard";

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
}> = {
    work: {
        icon: "bg-emerald-50  text-emerald-600 ring-emerald-200",
        iconDark: "dark:bg-emerald-950/60 dark:text-emerald-400 dark:ring-emerald-800",
        org: "text-emerald-600",
        orgDark: "dark:text-emerald-400",
        bullet: "bg-emerald-400",
        bulletDark: "dark:bg-emerald-500",
        badge: "bg-emerald-50  text-emerald-700",
        badgeDark: "dark:bg-emerald-950/60 dark:text-emerald-300",
        spotlight: "rgba(16,185,129,0.08)",
    },
    education: {
        icon: "bg-violet-50   text-violet-600  ring-violet-200",
        iconDark: "dark:bg-violet-950/60 dark:text-violet-400  dark:ring-violet-800",
        org: "text-violet-600",
        orgDark: "dark:text-violet-400",
        bullet: "bg-violet-400",
        bulletDark: "dark:bg-violet-500",
        badge: "bg-violet-50   text-violet-700",
        badgeDark: "dark:bg-violet-950/60 dark:text-violet-300",
        spotlight: "rgba(139,92,246,0.08)",
    },
};

function NodeIcon({ kind }: { kind: EntryKind }) {
    const Icon = kind === "education" ? GraduationCap : Briefcase;
    const s = nodeStyle[kind];
    return (
        <span className={["flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1", s.icon, s.iconDark].join(" ")}>
            <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
    );
}

export default function CleanExperience() {
    return (
        <section id="experience" className="py-24 sm:py-32 scroll-mt-20">
            <FadeInUp className="mb-14">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Experience &amp; Education
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                    From naval operations to software engineering — built on systems thinking.
                </p>
            </FadeInUp>

            <div className="relative">
                {/* Spine */}
                <div
                    className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-200/60 to-transparent dark:from-slate-700 dark:via-slate-700/40"
                    aria-hidden
                />

                <div className="space-y-1">
                    {ENTRIES.map((entry, i) => {
                        const s = nodeStyle[entry.kind];
                        return (
                            <motion.div
                                key={entry.id}
                                className="relative flex gap-5 pb-10 last:pb-0"
                                variants={fadeInUpVariants}
                                transition={{ ...springSnappy, delay: i * 0.07 }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                            >
                                <div className="relative z-10 mt-0.5">
                                    <NodeIcon kind={entry.kind} />
                                </div>

                                <HoverEffectCard
                                    className="flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                    spotlightColor={s.spotlight}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                                {entry.role}
                                            </h3>
                                            <p className={`mt-0.5 text-sm font-medium ${s.org} ${s.orgDark}`}>
                                                {entry.org}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                {entry.period}
                                            </span>
                                            {entry.badge && (
                                                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${s.badge} ${s.badgeDark}`}>
                                                    {entry.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <ul className="mt-4 space-y-2">
                                        {entry.bullets.map((b) => (
                                            <li key={b} className="flex gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                                                <span className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${s.bullet} ${s.bulletDark}`} aria-hidden />
                                                {b}
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
