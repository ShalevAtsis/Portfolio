"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { fadeInUpVariants, springSnappy } from "@/lib/motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// ─── Types ────────────────────────────────────────────────────────────────────

type BentoSize = "large" | "medium" | "small";

interface SkillItem {
    label: string;
    icon?: string; // emoji shorthand
}

interface BentoGroup {
    title: string;
    size: BentoSize;
    /** Tailwind col-span classes for the 12-col grid */
    colSpan: string;
    /** Row span (optional, for large cards) */
    rowSpan?: string;
    skills: SkillItem[];
    accentColor: string;   // Tailwind border/glow class
    glowColor: string;     // CSS rgba for spotlight radial
    glowBorder: boolean;   // Whether to render animated glow border
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENTO_GROUPS: BentoGroup[] = [
    // ── LARGE – Core Languages ────────────────────────────────────────────────
    {
        title: "Core Languages",
        size: "large",
        colSpan: "col-span-12 md:col-span-6",
        rowSpan: "md:row-span-2",
        accentColor: "border-cyber-accent/50 hover:border-cyber-accent",
        glowColor: "rgba(6, 182, 212, 0.13)",
        glowBorder: false,
        skills: [
            { label: "Python", icon: "🐍" },
            { label: "Java", icon: "☕" },
            { label: "C++", icon: "⚡" },
            { label: "TypeScript", icon: "🟦" },
            { label: "SQL", icon: "🗃️" },
        ],
    },
    // ── MEDIUM – AI / ML stack ───────────────────────────────────────────────
    {
        title: "AI & ML",
        size: "medium",
        colSpan: "col-span-12 sm:col-span-6 md:col-span-3",
        accentColor: "border-cyber-emerald/60 hover:border-cyber-emerald",
        glowColor: "rgba(16, 185, 129, 0.13)",
        glowBorder: true,
        skills: [
            { label: "PyTorch", icon: "🔥" },
            { label: "OpenCV", icon: "👁️" },
            { label: "GenAI", icon: "✨" },
            { label: "HuggingFace", icon: "🤗" },
        ],
    },
    // ── MEDIUM – More AI techniques ──────────────────────────────────────────
    {
        title: "Techniques",
        size: "medium",
        colSpan: "col-span-12 sm:col-span-6 md:col-span-3",
        accentColor: "border-cyber-emerald/60 hover:border-cyber-emerald",
        glowColor: "rgba(16, 185, 129, 0.11)",
        glowBorder: true,
        skills: [
            { label: "Sim-to-Real", icon: "🔄" },
            { label: "ControlNet", icon: "🎛️" },
            { label: "DINOv2", icon: "🦕" },
            { label: "RAG", icon: "🔍" },
        ],
    },
    // ── SMALL – Infra ────────────────────────────────────────────────────────
    {
        title: "AWS",
        size: "small",
        colSpan: "col-span-6 sm:col-span-3 md:col-span-3",
        accentColor: "border-cyber-border/50 hover:border-cyber-accent/40",
        glowColor: "rgba(6, 182, 212, 0.09)",
        glowBorder: false,
        skills: [{ label: "AWS", icon: "☁️" }, { label: "EC2 · S3 · Lambda", icon: "" }],
    },
    {
        title: "Docker",
        size: "small",
        colSpan: "col-span-6 sm:col-span-3 md:col-span-3",
        accentColor: "border-cyber-border/50 hover:border-cyber-accent/40",
        glowColor: "rgba(6, 182, 212, 0.09)",
        glowBorder: false,
        skills: [{ label: "Docker", icon: "🐳" }, { label: "Containerisation", icon: "" }],
    },
    {
        title: "CI/CD",
        size: "small",
        colSpan: "col-span-6 sm:col-span-3 md:col-span-3",
        accentColor: "border-cyber-border/50 hover:border-cyber-accent/40",
        glowColor: "rgba(6, 182, 212, 0.09)",
        glowBorder: false,
        skills: [{ label: "Jenkins", icon: "🔧" }, { label: "Git · GitHub Actions", icon: "" }],
    },
    {
        title: "Observability",
        size: "small",
        colSpan: "col-span-6 sm:col-span-3 md:col-span-3",
        accentColor: "border-cyber-border/50 hover:border-cyber-accent/40",
        glowColor: "rgba(6, 182, 212, 0.09)",
        glowBorder: false,
        skills: [{ label: "Logging", icon: "📊" }, { label: "Debugging · Tracing", icon: "" }],
    },
];

// ─── Bento Card with Spotlight ────────────────────────────────────────────────

interface BentoCardProps {
    group: BentoGroup;
    index: number;
}

function BentoCard({ group, index }: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const handleMouseLeave = () => {
        mouseX.set(-500);
        mouseY.set(-500);
    };

    // The Framer Motion spotlight: a radial gradient that tracks the cursor.
    const spotlight = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${group.glowColor}, transparent 70%)`;

    const isLarge = group.size === "large";
    const isMedium = group.size === "medium";

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={fadeInUpVariants}
            transition={{ ...springSnappy, delay: index * 0.06 }}
            className={[
                "group relative overflow-hidden rounded-2xl border bg-cyber-surface/50 backdrop-blur-xl",
                "transition-[border-color,box-shadow] duration-300",
                group.accentColor,
                group.glowBorder ? "hover:shadow-glow-emerald" : "hover:shadow-glow-soft",
                isLarge ? "p-6" : isMedium ? "p-5" : "p-4",
            ].join(" ")}
        >
            {/* ── Animated glow border ring for AI cards ── */}
            {group.glowBorder && (
                <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, transparent 60%)",
                    }}
                    aria-hidden
                />
            )}

            {/* ── Spotlight radial gradient layer ── */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: spotlight }}
                aria-hidden
            />

            {/* ── Card content (above spotlight layers) ── */}
            <div className="relative">
                <p
                    className={[
                        "font-semibold tracking-tight",
                        isLarge
                            ? "text-lg text-cyber-text"
                            : isMedium
                                ? "text-base text-cyber-emerald"
                                : "text-sm text-cyber-muted",
                    ].join(" ")}
                >
                    {group.title}
                </p>

                {isLarge && (
                    // Large card: pill grid
                    <div className="mt-5 flex flex-wrap gap-2">
                        {group.skills.map(({ label, icon }) => (
                            <motion.span
                                key={label}
                                whileHover={{ scale: 1.06 }}
                                transition={springSnappy}
                                className="inline-flex items-center gap-1.5 rounded-full border border-cyber-border/50 bg-cyber-bg/60 px-3 py-1.5 text-sm font-medium text-cyber-text"
                            >
                                {icon && <span>{icon}</span>}
                                {label}
                            </motion.span>
                        ))}
                    </div>
                )}

                {isMedium && (
                    // Medium card: stacked list
                    <ul className="mt-3 space-y-2">
                        {group.skills.map(({ label, icon }) => (
                            <li key={label} className="flex items-center gap-2 text-sm text-cyber-muted">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-emerald/70" aria-hidden />
                                {icon && <span className="text-base leading-none">{icon}</span>}
                                {label}
                            </li>
                        ))}
                    </ul>
                )}

                {!isLarge && !isMedium && (
                    // Small card: two lines
                    <div className="mt-2 space-y-0.5">
                        {group.skills.map(({ label, icon }) => (
                            <p key={label} className="flex items-center gap-1.5 text-xs text-cyber-muted">
                                {icon && <span>{icon}</span>}
                                {label}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function SkillsBentoGrid() {
    return (
        <SectionWrapper
            id="skills"
            title="Skills"
            subtitle="Languages · AI/ML stack · Infrastructure."
            centerHeading={false}
            className="py-20 sm:py-28 scroll-mt-20"
        >
            <motion.div
                className="mt-8 grid grid-cols-12 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.07 } },
                }}
            >
                {BENTO_GROUPS.map((group, i) => (
                    <div key={group.title} className={group.colSpan}>
                        <BentoCard group={group} index={i} />
                    </div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
