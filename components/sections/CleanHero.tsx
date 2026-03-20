// Pure Server Component — zero JavaScript shipped for this component.
// All animations are CSS-only (Tailwind keyframes). The h1 LCP element
// paints before any JS parses or hydrates.

import { MessageCircle, Mail, Github, Linkedin, Download } from "lucide-react";
import { asset } from "@/lib/basePath";

// ─── Constants ────────────────────────────────────────────────────────────────

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const WHATSAPP_URL = "https://wa.me/+972585060699";

// ─── Component ────────────────────────────────────────────────────────────────
// Zero JS animation dependency. Pure Tailwind CSS keyframe classes:
//   animate-hero-slide-up  → h1 LCP: translate only, opacity always 1
//   animate-hero-fade-up   → secondary elements: fade + translate
// Animation-delay via inline style — no framer-motion, no React state.
// The h1 has NO animation-delay so it renders at its final position immediately.

export default function CleanHero() {
    return (
        <section
            id="hero"
            className="relative flex flex-col items-center px-4 pt-24 pb-8 text-center md:pt-32 md:pb-16 lg:pt-40 lg:pb-20"
        >
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            <div className="flex max-w-4xl flex-col items-center gap-y-6">

                {/* Status badge */}
                <div className="animate-hero-fade-up" style={{ animationDelay: "0ms" }}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse dark:border-emerald-500 dark:bg-emerald-950/80 dark:text-emerald-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 dark:bg-emerald-500" aria-hidden="true" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        </span>
                        Open to opportunities
                    </span>
                </div>

                {/* ── LCP ELEMENT ──────────────────────────────────────────────────────────
                    Uses animate-hero-slide-up (translate only, opacity ALWAYS 1).
                    Has ZERO animation-delay — renders at final position on the very first
                    CSS paint, before any JavaScript executes. This eliminates the 270ms
                    LCP render delay reported by Lighthouse.
                    ─────────────────────────────────────────────────────────────────────── */}
                <h1
                    className="animate-hero-slide-up text-5xl font-extrabold tracking-tight break-words text-slate-900 dark:text-slate-50 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl lg:tracking-tighter"
                    style={{ lineHeight: 1.05 }}
                >
                    Shalev Atsis
                </h1>

                {/* Title — fades in after h1 */}
                <p
                    className="animate-hero-fade-up text-xl font-medium text-slate-500 dark:text-slate-400 sm:text-2xl md:text-3xl lg:text-4xl"
                    style={{ animationDelay: "100ms" }}
                >
                    Software Engineer
                    <span className="mx-3 text-slate-300 dark:text-slate-600" aria-hidden>·</span>
                    <span className="text-indigo-600 dark:text-indigo-400">AI &amp; Computer Vision</span>
                </p>

                {/* Summary */}
                <p
                    className="animate-hero-fade-up max-w-2xl lg:max-w-[70ch] text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg lg:text-xl lg:leading-relaxed"
                    style={{ animationDelay: "180ms" }}
                >
                    Currently powering production systems at Jifiti while finishing a B.Sc. in Computer Science.{" "}
                    I turn ambiguous backend puzzles and AI research into clean, reliable software.
                </p>

                {/* ── CTA Row ── */}
                <div
                    className="animate-hero-fade-up flex w-full flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap"
                    style={{ animationDelay: "260ms" }}
                >
                    {/* Primary Button — WhatsApp */}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Message on WhatsApp"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-[transform,box-shadow] duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:scale-[1.04] hover:-translate-y-0.5 hover:shadow-[#25D366]/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:w-auto"
                    >
                        <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2.5} />
                        WhatsApp Me
                    </a>

                    {/* Secondary Buttons Row */}
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        {/* Download CV */}
                        <a
                            href={asset("/Shalev_Atsis_CV.pdf")}
                            download="Shalev_Atsis_CV.pdf"
                            aria-label="Download CV"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200/50 bg-indigo-50/50 px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-md transition-[transform,colors] duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:scale-[1.04] hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100 active:scale-[0.97] dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/20 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        >
                            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
                            Download CV
                        </a>

                        {/* Email */}
                        <a
                            href={EMAIL}
                            aria-label="Send email to Shalevatsis@gmail.com"
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200/50 bg-violet-50/50 px-6 py-3 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur-md transition-[transform,colors] duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:scale-[1.04] hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-100 active:scale-[0.97] dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/20 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        >
                            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2.5} />
                            Email
                        </a>
                    </div>

                    {/* Social Icon Links */}
                    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/50 bg-slate-50/50 shadow-sm backdrop-blur-md transition-[transform,colors] duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:scale-[1.04] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 active:scale-[0.97] dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                        >
                            <Github className="h-5 w-5 text-slate-600 transition-colors duration-300 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white" strokeWidth={2} />
                        </a>

                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            className="group flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/50 bg-blue-50/50 shadow-sm backdrop-blur-md transition-[transform,colors] duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:scale-[1.04] hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100 active:scale-[0.97] dark:border-blue-500/20 dark:bg-blue-900/20 dark:hover:border-blue-500/40 dark:hover:bg-blue-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <Linkedin className="h-5 w-5 text-blue-600 transition-colors duration-300 group-hover:text-[#0A66C2] dark:text-blue-400" strokeWidth={2} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
