"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Waves, Film, Music2, Sparkles, Send,
    CheckCircle2, Loader2, BookOpen,
    Wind, Anchor, Play, Pause,
} from "lucide-react";
import FadeInUp from "@/components/ui/FadeInUp";
import GlobeLoader, { type GlobeVizHandle } from "@/components/ui/GlobeLoader";
import { asset } from "@/lib/basePath";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SURF_SPOTS: { label: string; lat: number; lng: number }[] = [
    { label: "Brazil",    lat: -14.235,  lng: -51.925  },
    { label: "Colombia",  lat:  11.249,  lng: -73.561  },
    { label: "Ecuador",   lat:  -1.826,  lng: -80.751  },
    { label: "Panama",    lat:   7.433,  lng: -80.183  },
    { label: "Nicaragua", lat:  11.254,  lng: -85.871  },
    { label: "Mexico",    lat:  15.864,  lng: -97.071  },
];

const DIVE_SPOTS: { label: string; lat: number; lng: number }[] = [
    { label: "Eilat",         lat:  29.558, lng:  34.948 },
    { label: "Thailand",      lat:  10.094, lng:  99.838 },
    { label: "San Andrés",    lat:  12.585, lng: -81.701 },
    { label: "Galapagos",     lat:  -0.380, lng: -90.300 },
    { label: "Bocas del Toro",lat:   9.333, lng: -82.250 },
    { label: "Belize",        lat:  17.316, lng: -87.535 },
    { label: "Cozumel",       lat:  20.423, lng: -86.922 },
];

const BOOKS_READ = [
    "The Power of Habit", "Can't Hurt Me", "Badulina",
    "The Alchemist", "Rich Dad Poor Dad", "The Monk Who Sold His Ferrari",
];
const FILMS = [
    { title: "Shutter Island", year: 2010 },
    { title: "The Godfather", year: 1972 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Inception", year: 2010 },
    { title: "Fight Club", year: 1999 },
    { title: "Django Unchained", year: 2012 },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────

function CardLabel({ icon, label, color = "text-slate-400" }: {
    icon: React.ReactNode; label: string; color?: string;
}) {
    return (
        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] ${color}`}>
            {icon}{label}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 1 — Ocean Matrix
// ═══════════════════════════════════════════════════════════════════════════════

function OceanCard() {
    const globeRef = useRef<GlobeVizHandle>(null);

    const flyTo = (lat: number, lng: number) => {
        globeRef.current?.flyTo(lat, lng);
    };

    return (
        <div
            className="relative col-span-1 overflow-hidden rounded-2xl md:col-span-2 bg-slate-950/80 ring-1 ring-slate-800"
            style={{ minHeight: 380 }}
        >
            {/* 3D Globe Background */}
            <div className="absolute inset-0 z-0 transition-opacity duration-700 hover:opacity-100 opacity-90">
                <GlobeLoader ref={globeRef} minHeight={380} />
            </div>

            {/* Subtle overlay to retain text legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />

            {/* ── Content overlay ── */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-20">
                <CardLabel icon={<Waves className="h-3 w-3" />} label="Global Adventures" color="text-cyan-400 drop-shadow-md" />
                <h3 className="mt-2 text-base font-bold text-white drop-shadow-md pointer-events-none">Surf & Dive Spots</h3>

                <div className="mt-3 flex flex-col gap-2">
                    {/* Surf pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <Wind className="h-3 w-3 text-emerald-400 shrink-0 drop-shadow-md pointer-events-none" />
                        {SURF_SPOTS.map((s) => (
                            <button
                                key={s.label}
                                onClick={() => flyTo(s.lat, s.lng)}
                                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 bg-emerald-500/10 text-emerald-300 ring-emerald-500/30 backdrop-blur-md shadow-sm cursor-pointer transition duration-300 hover:scale-105 hover:bg-emerald-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                    {/* Dive pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <Anchor className="h-3 w-3 text-indigo-400 shrink-0 drop-shadow-md pointer-events-none" />
                        {DIVE_SPOTS.map((s) => (
                            <button
                                key={s.label}
                                onClick={() => flyTo(s.lat, s.lng)}
                                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 bg-indigo-500/10 text-indigo-300 ring-indigo-500/30 backdrop-blur-md shadow-sm cursor-pointer transition duration-300 hover:scale-105 hover:bg-indigo-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 2 — Cinephile & Reader
// ═══════════════════════════════════════════════════════════════════════════════

function CinephileReaderCard() {
    const [tab, setTab] = useState<"cinema" | "books">("cinema");

    return (
        <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70">
            {/* Tab toggle */}
            <div className="mb-4 flex gap-2">
                {(["cinema", "books"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${tab === t
                            ? t === "cinema"
                                ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                                : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            }`}
                    >
                        {t === "cinema" ? <Film className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
                        {t === "cinema" ? "Cinema" : "Library"}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {tab === "cinema" ? (
                    <motion.div
                        key="cinema"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-1 flex-col gap-2"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                            Director's Cut
                        </p>
                        {FILMS.map((f, i) => (
                            <div key={f.title} className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-indigo-50/80 dark:hover:bg-indigo-950/30">
                                <span className="w-4 text-center text-[10px] font-bold text-indigo-400/60">#{i + 1}</span>
                                <span className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">{f.title}</span>
                                <span className="text-[10px] text-slate-400">{f.year}</span>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="books"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-1 flex-col gap-3"
                    >
                        {/* Currently reading */}
                        <div className="rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-400/20">
                            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Currently Reading</p>
                            <p className="font-semibold text-slate-900 dark:text-slate-50">📖 The Lean Startup</p>
                            <p className="text-xs text-slate-400">Eric Ries</p>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Read</p>
                        <div className="flex flex-col gap-1.5">
                            {BOOKS_READ.map((b) => (
                                <div key={b} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="text-emerald-500">✓</span> {b}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 3 — Now Playing
// ═══════════════════════════════════════════════════════════════════════════════

const EQ_HEIGHTS = [
    [0.3, 1.0, 0.5, 1.4, 0.3],
    [0.5, 1.4, 0.8, 0.4, 0.5],
    [1.0, 0.4, 1.2, 0.6, 1.0],
    [0.6, 1.2, 0.3, 1.0, 0.6],
];

function NowPlayingCard() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0–100
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("6:18");

    // Initialise audio element once — inside useEffect to ensure client-only
    useEffect(() => {
        const audio = new Audio(asset("/bad_bunny.mp3"));
        audio.preload = "none"; // Core Web Vitals Optimization: don't download audio until needed
        audioRef.current = audio;

        const onTimeUpdate = () => {
            if (!audio.duration) return;
            setProgress((audio.currentTime / audio.duration) * 100);
            const m = Math.floor(audio.currentTime / 60);
            const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
            setCurrentTime(`${m}:${s}`);
        };

        const onLoadedMetadata = () => {
            const m = Math.floor(audio.duration / 60);
            const s = Math.floor(audio.duration % 60).toString().padStart(2, "0");
            setDuration(`${m}:${s}`);
        };

        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.pause();
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying((prev) => !prev);
    };

    return (
        <div className="flex flex-col rounded-2xl border border-slate-200/60 bg-white/60 p-5 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70">
            <CardLabel icon={<Music2 className="h-3 w-3" />} label="Now Playing" color="text-emerald-600 dark:text-emerald-400" />

            {/* Album art + vinyl */}
            <div className="relative mt-4 flex justify-center">
                <div className="relative h-24 w-24">
                    <motion.div
                        className="h-full w-full overflow-hidden rounded-full ring-4 ring-slate-700 shadow-2xl"
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={isPlaying
                            ? { duration: 4, repeat: Infinity, ease: "linear" }
                            : { duration: 0.4, ease: "easeOut" }
                        }
                    >
                        <Image
                            loader={cloudinaryLoader}
                            src="bad_bunny_svvufd.png"
                            alt="Bad Bunny — Debí Tirar Más Fotos"
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                        />
                        {/* Vinyl groove rings */}
                        <div className="absolute inset-0 rounded-full" style={{
                            background: "radial-gradient(circle, transparent 25%, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.08) 30%, transparent 30%, transparent 45%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.08) 50%, transparent 50%)",
                        }} />
                    </motion.div>
                    {/* Centre dot */}
                    <div className="absolute inset-[42%] rounded-full bg-slate-900" />
                </div>
            </div>

            {/* Track info + Play/Pause */}
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <p className="font-bold text-slate-900 dark:text-slate-50">Baile Inolvidable</p>
                    <p className="text-sm text-slate-400">Bad Bunny</p>
                </div>
                <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying
                        ? <Pause className="h-4 w-4" fill="white" />
                        : <Play className="h-4 w-4" fill="white" />}
                </motion.button>
            </div>

            {/* Equalizer — only animates when playing */}
            <div className="mt-3 flex items-end justify-center gap-1 h-6">
                {(EQ_HEIGHTS as number[][]).map((keyframes: number[], i: number) => (
                    <motion.div
                        key={i}
                        className="w-1.5 rounded-full bg-emerald-500"
                        style={{ originY: 1, height: "100%" }}
                        animate={{ scaleY: isPlaying ? keyframes : 0.15 }}
                        transition={isPlaying
                            ? { duration: 0.9 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
                            : { duration: 0.3 }
                        }
                    />
                ))}
            </div>

            {/* Progress bar — live */}
            <div className="mt-4">
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 origin-left">
                    <motion.div
                        className="h-full w-full rounded-full bg-emerald-500 origin-left"
                        style={{ originX: 0 }}
                        animate={{ scaleX: progress / 100 }}
                        transition={{ duration: 0.25, ease: "linear" }}
                    />
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    <span>{currentTime}</span><span>{duration}</span>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 4 — AI Suggestion Box
// ═══════════════════════════════════════════════════════════════════════════════

type SuggestionState = "idle" | "processing" | "success";

function SuggestionCard() {
    const [state, setState] = useState<SuggestionState>("idle");
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setState("processing");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
                    subject: "New AI Suggestion from Portfolio",
                    from_name: "Portfolio AI Suggestion",
                    suggestion: input,
                    category: "AI Suggestion",
                    botcheck: ""
                }),
            });

            const result = await response.json();

            if (result.success) {
                setInput("");
                setState("success");
            } else {
                console.error(result);
                setState("idle");
            }

        } catch (error) {
            console.error(error);
            setState("idle");
        }
    };

    const reset = () => { setState("idle"); setInput(""); };

    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/70">
            <div className="mx-auto max-w-2xl">
                <CardLabel icon={<Sparkles className="h-3 w-3" />} label="AI Suggestion Engine" color="text-violet-600 dark:text-violet-400" />

                <AnimatePresence mode="wait">
                    {state === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-50">
                                Know a movie, book, or dive site I'd love?
                            </p>
                            <p className="mt-1 text-sm text-slate-400">Drop it here. My AI rates compatibility with my taste. Seriously.</p>

                            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="e.g. The Social Network, Sipadan Island, Thinking Fast and Slow..."
                                    className="flex-1 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none backdrop-blur-sm transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder:text-slate-500"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                                >
                                    <Send className="h-3.5 w-3.5" /> Send
                                </motion.button>
                            </form>
                        </motion.div>
                    )}

                    {state === "processing" && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 flex flex-col items-center gap-3 py-4 text-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="h-8 w-8 text-violet-500" />
                            </motion.div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                AI analyzing compatibility with Shalev&apos;s taste&hellip;
                            </p>
                            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <motion.div
                                    className="h-full rounded-full bg-violet-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {state === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 flex flex-col items-center gap-3 py-4 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                            </motion.div>
                            <p className="font-semibold text-slate-900 dark:text-slate-50">
                                Match Confirmed! Added to my backlog.
                            </p>
                            <p className="text-sm text-slate-400">Thanks for the rec 🤙</p>
                            <button
                                onClick={reset}
                                className="mt-1 text-xs text-violet-500 hover:underline focus:outline-none"
                            >
                                Suggest something else
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Card 5 — AI Marine CV Scanner
// ═══════════════════════════════════════════════════════════════════════════════

function AISharkCard() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ minHeight: 300 }}
        >
            <Image
                loader={cloudinaryLoader}
                src="hammerhead_vj3iky"
                alt="Hammerhead shark — AI CV scan"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute inset-0 object-cover transition-transform duration-700 ease-out"
                style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(6,182,212,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,.8) 1px,transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* ── CV Targeting Box ── */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: 200, height: 130 }}>
                    {/* Pulsing border */}
                    <motion.div
                        className="absolute inset-0 rounded border-2 border-cyan-400"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            boxShadow: [
                                "0 0 8px rgba(6,182,212,0.3)",
                                "0 0 28px rgba(6,182,212,1)",
                                "0 0 8px rgba(6,182,212,0.3)",
                            ],
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Corner ticks */}
                    {["-top-px -left-px border-t-2 border-l-2",
                        "-top-px -right-px border-t-2 border-r-2",
                        "-bottom-px -left-px border-b-2 border-l-2",
                        "-bottom-px -right-px border-b-2 border-r-2"].map((c, i) => (
                            <div key={i} className={`absolute h-4 w-4 border-cyan-300 ${c}`} />
                        ))}

                    {/* Scan line */}
                    <motion.div
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                        style={{ boxShadow: "0 0 10px rgba(6,182,212,0.9)" }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Readout chip — above box */}
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-14 left-0 right-0 rounded border border-cyan-500/40 bg-slate-950/90 px-3 py-1.5 font-mono text-[10px] text-cyan-300 backdrop-blur-sm"
                    >
                        <div className="font-bold text-cyan-400">[AI TARGET ACQUIRED]</div>
                        <div>Species: Hammerhead Shark</div>
                        <div>
                            Match:{" "}
                            <span className="font-bold text-emerald-400">99.8%</span>
                            {" "}·{" "}
                            Status: <span className="text-amber-400">Favorite</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom label */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    Computer Vision · Marine Biology
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                    AI Species Classifier — Galapagos Islands
                </p>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Section
// ═══════════════════════════════════════════════════════════════════════════════

export default function PersonalWorld() {
    return (
        <section id="personal-world" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
            <FadeInUp className="mb-12">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Beyond the Code
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Personal World
                </h2>
                <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
                    A dashboard of the things that make me tick outside of the terminal.
                </p>
            </FadeInUp>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {/* Row 1 */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <OceanCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-1"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                    <CinephileReaderCard />
                </motion.div>

                <motion.div
                    className="lg:col-span-1"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <NowPlayingCard />
                </motion.div>

                {/* Row 2 — AI Shark (left) + Suggestion Box (right) */}
                <motion.div
                    className="col-span-1 md:col-span-2"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                >
                    <AISharkCard />
                </motion.div>

                <motion.div
                    className="col-span-1 md:col-span-2"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                >
                    <SuggestionCard />
                </motion.div>
            </div>
        </section>
    );
}
