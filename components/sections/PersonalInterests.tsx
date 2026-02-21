"use client";

import { motion } from "framer-motion";
import {
    Waves,
    BookOpen,
    Music2,
    Film,
    Scan,
    Anchor,
} from "lucide-react";
import HoverEffectCard from "@/components/HoverEffectCard";
import FadeInUp from "@/components/ui/FadeInUp";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

// ─── Shared card shell ────────────────────────────────────────────────────────

function BentoCard({ children, className = "", spotlightColor }: BentoCardProps) {
    return (
        <HoverEffectCard
            spotlightColor={spotlightColor}
            className={`h-full rounded-2xl ${className}`}
        >
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/60">
                {children}
            </div>
        </HoverEffectCard>
    );
}

// ─── Card label ───────────────────────────────────────────────────────────────

function CardLabel({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
    return (
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${color}`}>
            {icon}
            {label}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 1 — AI Marine Logbook
// ═══════════════════════════════════════════════════════════════════════════════

function MarineCard() {
    return (
        <BentoCard
            spotlightColor="rgba(6,182,212,0.12)"
            className="md:col-span-2"
        >
            <CardLabel
                icon={<Waves className="h-3.5 w-3.5" />}
                label="AI Marine Logbook"
                color="text-cyan-600 dark:text-cyan-400"
            />

            {/* Dive info */}
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    Recent Dive: Red Sea Reef
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-700 ring-1 ring-cyan-400/30 dark:text-cyan-300">
                    <Anchor className="h-3 w-3" /> Depth: 24m
                </span>
            </div>

            {/* CV Scanner mock UI */}
            <div className="relative flex-1 overflow-hidden rounded-xl bg-slate-950 p-4">
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* Subject silhouette — sea turtle made from emoji + sizing */}
                <div className="relative flex items-center justify-center py-4">
                    <span
                        className="select-none text-7xl opacity-80 drop-shadow-lg"
                        role="img"
                        aria-label="Sea turtle"
                    >
                        🐢
                    </span>

                    {/* Scanning line */}
                    <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_2px_rgba(6,182,212,0.6)]"
                        initial={{ top: "10%" }}
                        animate={{ top: ["10%", "90%", "10%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Corner brackets */}
                    {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
                        "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((pos, i) => (
                            <div key={i} className={`absolute ${pos} h-4 w-4 border-cyan-400`} />
                        ))}
                </div>

                {/* Classifier readout */}
                <div className="mt-2 space-y-1.5 font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <Scan className="h-3 w-3 text-cyan-400" />
                        <span className="text-cyan-400">Species Identified:</span>
                        <span className="text-white">Cheloniidae</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 pl-5">AI Confidence:</span>
                        <span className="text-emerald-400 font-bold">98.2%</span>
                        {/* Confidence bar */}
                        <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-emerald-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "98.2%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="pl-5">Model:</span>
                        <span>YOLOv8-marine · fine-tuned on Red Sea dataset</span>
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 2 — Digital Bookshelf
// ═══════════════════════════════════════════════════════════════════════════════

const BOOKS = [
    { title: "Shoe Dog", author: "Phil Knight", emoji: "👟" },
    { title: "Atomic Habits", author: "James Clear", emoji: "⚛️" },
    { title: "Meditations", author: "Marcus Aurelius", emoji: "🏛️" },
    { title: "Zero to One", author: "Peter Thiel", emoji: "🚀" },
];

function BookshelfCard() {
    return (
        <BentoCard spotlightColor="rgba(16,185,129,0.10)">
            <CardLabel
                icon={<BookOpen className="h-3.5 w-3.5" />}
                label="Digital Bookshelf"
                color="text-emerald-600 dark:text-emerald-400"
            />

            {/* Currently reading */}
            <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-400/20">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Currently Reading
                </p>
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                    {BOOKS[0].emoji} {BOOKS[0].title}
                </p>
                <p className="text-xs text-slate-500">{BOOKS[0].author}</p>
            </div>

            {/* Top shelf */}
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 -mb-2">
                Top Shelf
            </p>
            <div className="flex flex-col gap-2">
                {BOOKS.slice(1).map((book) => (
                    <div
                        key={book.title}
                        className="flex items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                        <span className="text-xl">{book.emoji}</span>
                        <div>
                            <p className="text-sm font-medium leading-tight text-slate-800 dark:text-slate-200">
                                {book.title}
                            </p>
                            <p className="text-xs text-slate-400">{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </BentoCard>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 3 — Now Playing
// ═══════════════════════════════════════════════════════════════════════════════

const BAR_DELAYS = [0, 0.15, 0.3, 0.45];

function EqualizerBars() {
    return (
        <div className="flex items-end gap-[3px] h-5">
            {BAR_DELAYS.map((delay, i) => (
                <motion.div
                    key={i}
                    className="w-1 rounded-full bg-emerald-500"
                    style={{ originY: 1 }}
                    animate={{ scaleY: [0.3, 1.4, 0.5, 1.2, 0.3] }}
                    transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay,
                    }}
                />
            ))}
        </div>
    );
}

function VinylRecord() {
    return (
        <div className="relative h-20 w-20 shrink-0">
            {/* Outer rim */}
            <motion.div
                className="absolute inset-0 rounded-full bg-slate-900 shadow-xl ring-4 ring-slate-700"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                {/* Grooves */}
                {[14, 22, 30].map((r) => (
                    <div
                        key={r}
                        className="absolute rounded-full border border-slate-700/60"
                        style={{
                            inset: `${r}%`,
                        }}
                    />
                ))}
                {/* Label centre */}
                <div className="absolute inset-[35%] rounded-full bg-emerald-600 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-slate-900" />
                </div>
            </motion.div>
        </div>
    );
}

function MusicCard() {
    return (
        <BentoCard spotlightColor="rgba(16,185,129,0.09)">
            <CardLabel
                icon={<Music2 className="h-3.5 w-3.5" />}
                label="Now Playing"
                color="text-emerald-600 dark:text-emerald-400"
            />

            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-2">
                <VinylRecord />

                {/* Song info */}
                <div className="text-center">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                        Your Song Here
                    </p>
                    <p className="text-sm text-slate-400">Artist — Album</p>
                </div>

                {/* Equalizer */}
                <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500">Live</span>
                    <EqualizerBars />
                </div>

                {/* Progress bar */}
                <div className="w-full">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <motion.div
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "63%" }}
                            transition={{ duration: 2, ease: "easeOut", delay: 0.6 }}
                        />
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                        <span>2:14</span>
                        <span>3:32</span>
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 4 — Cinema & Screen
// ═══════════════════════════════════════════════════════════════════════════════

const FILMS = [
    { title: "Interstellar", year: "2014", dir: "Nolan" },
    { title: "The Godfather", year: "1972", dir: "Coppola" },
    { title: "Oppenheimer", year: "2023", dir: "Nolan" },
];

function CinemaCard() {
    return (
        <BentoCard
            spotlightColor="rgba(99,102,241,0.10)"
            className="md:col-span-2"
        >
            {/* Film-strip side accent */}
            <div className="flex gap-4">
                {/* Perforations strip */}
                <div className="flex flex-col items-center gap-[5px] py-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-3 w-2 rounded-[2px] bg-indigo-500/20 dark:bg-indigo-400/20"
                        />
                    ))}
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <CardLabel
                        icon={<Film className="h-3.5 w-3.5" />}
                        label="Director's Cut"
                        color="text-indigo-600 dark:text-indigo-400"
                    />

                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                        🍿 All-Time Favorites
                    </h3>

                    <div className="flex flex-col gap-3">
                        {FILMS.map((film, i) => (
                            <motion.div
                                key={film.title}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.35 }}
                                className="flex items-center gap-3"
                            >
                                {/* Rank */}
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                    #{i + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium leading-tight text-slate-900 dark:text-slate-50">
                                        {film.title}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {film.year} · Dir. {film.dir}
                                    </p>
                                </div>
                                {/* Star */}
                                <span className="text-amber-400">★</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Section
// ═══════════════════════════════════════════════════════════════════════════════

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function PersonalInterests() {
    return (
        <section id="interests" className="py-20 sm:py-28 scroll-mt-20">
            <FadeInUp className="mb-12">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Beyond the Code
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Personal Bento
                </h2>
                <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
                    A dashboard of the things that make me tick outside of the terminal.
                </p>
            </FadeInUp>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
            >
                <motion.div variants={cardVariants} className="lg:col-span-2">
                    <MarineCard />
                </motion.div>

                <motion.div variants={cardVariants} className="lg:col-span-1">
                    <BookshelfCard />
                </motion.div>

                <motion.div variants={cardVariants} className="lg:col-span-1">
                    <MusicCard />
                </motion.div>

                <motion.div variants={cardVariants} className="md:col-span-2 lg:col-span-2">
                    <CinemaCard />
                </motion.div>
            </motion.div>
        </section>
    );
}
