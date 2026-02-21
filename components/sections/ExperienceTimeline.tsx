"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineEntry {
    id: string;
    role: string;
    org: string;
    period: string;
    bullets: string[];
    tag: string;
    /** Accent color class used for the node ring + tag. */
    accent: "cyan" | "emerald" | "muted";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE: TimelineEntry[] = [
    {
        id: "jifiti",
        role: "Tier 2 Software Support Engineer",
        org: "Jifiti",
        period: "Aug 2025 – Present",
        tag: "Fintech SaaS",
        accent: "cyan",
        bullets: [
            "Own Tier 2 production investigations end-to-end for a global Fintech SaaS platform.",
            "Python-driven analytics scripts to surface anomalies in transaction data.",
            "SQL backend debugging across distributed services; CI/CD validation.",
        ],
    },
    {
        id: "hit",
        role: "B.Sc. Computer Science",
        org: "Holon Institute of Technology (HIT)",
        period: "2022 – June 2026",
        tag: "GPA 90 · AI & CV focus",
        accent: "emerald",
        bullets: [
            "Specialisation in Artificial Intelligence and Computer Vision.",
            "Key coursework: Deep Learning, Computer Vision, Algorithms, OS, Databases.",
        ],
    },
    {
        id: "hartech",
        role: "Software QA Specialist",
        org: "Hartech",
        period: "Nov 2021 – Dec 2022",
        tag: "Defence Tech",
        accent: "cyan",
        bullets: [
            "End-to-end QA on C2 systems for Drones and UGVs.",
            "Led 50+ global field tests; authored test plans and defect reports.",
        ],
    },
    {
        id: "navy",
        role: "C2 Operator + Team Lead",
        org: "Israeli Navy",
        period: "Feb 2019 – Oct 2021",
        tag: "Leadership · Operations",
        accent: "muted",
        bullets: [
            "Led a 15-person platoon of C2 operators in the 3rd Fleet.",
            "Operated Radar, Sonar, and Electronic Warfare systems in live missions.",
        ],
    },
];

// ─── Accent helpers ───────────────────────────────────────────────────────────

const accentRing: Record<TimelineEntry["accent"], string> = {
    cyan: "ring-cyber-accent bg-cyber-accent/20",
    emerald: "ring-cyber-emerald bg-cyber-emerald/20",
    muted: "ring-cyber-border bg-cyber-border/30",
};

const accentDot: Record<TimelineEntry["accent"], string> = {
    cyan: "bg-cyber-accent shadow-[0_0_8px_2px_rgba(6,182,212,0.6)]",
    emerald: "bg-cyber-emerald shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]",
    muted: "bg-cyber-muted",
};

const accentTag: Record<TimelineEntry["accent"], string> = {
    cyan: "text-cyber-accent border-cyber-accent/40 bg-cyber-accent/10",
    emerald: "text-cyber-emerald border-cyber-emerald/40 bg-cyber-emerald/10",
    muted: "text-cyber-muted border-cyber-border/40 bg-cyber-surface/40",
};

const accentGlow: Record<TimelineEntry["accent"], string> = {
    cyan: "rgba(6, 182, 212, 0.1)",
    emerald: "rgba(16, 185, 129, 0.09)",
    muted: "rgba(148, 163, 184, 0.06)",
};

// ─── Timeline Node Card ───────────────────────────────────────────────────────

interface TimelineNodeProps {
    entry: TimelineEntry;
    index: number;
}

function TimelineNode({ entry, index }: TimelineNodeProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(-200);
        mouseY.set(-200);
    };

    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${accentGlow[entry.accent]}, transparent 65%)`;

    return (
        <motion.div
            className="relative flex gap-6"
            variants={fadeInUpVariants}
            transition={{ ...springSnappy, delay: index * 0.07 }}
        >
            {/* Node column */}
            <div className="relative flex flex-col items-center" aria-hidden>
                {/* Ring + dot */}
                <span
                    className={`z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ${accentRing[entry.accent]}`}
                >
                    <span className={`h-3 w-3 rounded-full ${accentDot[entry.accent]}`} />
                </span>
                {/* Connector line (hidden for last child via CSS) */}
                <span className="timeline-line mt-1 w-px flex-1 bg-gradient-to-b from-cyber-border/60 to-transparent" />
            </div>

            {/* Card */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative mb-10 flex-1 overflow-hidden rounded-2xl border border-cyber-border/40 bg-cyber-surface/50 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-cyber-accent/30"
            >
                {/* Spotlight layer */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background }}
                    aria-hidden
                />

                {/* Content */}
                <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <h3 className="text-base font-semibold text-cyber-text">{entry.role}</h3>
                            <p className="mt-0.5 text-sm font-medium text-cyber-accent">{entry.org}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="text-xs text-cyber-muted">{entry.period}</span>
                            <span
                                className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${accentTag[entry.accent]}`}
                            >
                                {entry.tag}
                            </span>
                        </div>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                        {entry.bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm text-cyber-muted">
                                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-cyber-accent/60" aria-hidden />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ExperienceTimeline() {
    return (
        <SectionWrapper
            id="experience"
            title="Experience & Education"
            subtitle="From operations to engineering — a career built on systems thinking."
            centerHeading={false}
            className="py-20 sm:py-28 scroll-mt-20"
        >
            {/* Hide the last node's connector line */}
            <style>{`.timeline-line { display: block; } .relative:last-child .timeline-line { display: none; }`}</style>

            <motion.div
                className="mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08 } },
                }}
            >
                {TIMELINE.map((entry, i) => (
                    <TimelineNode key={entry.id} entry={entry} index={i} />
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
