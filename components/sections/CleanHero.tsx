"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Github, Linkedin, Download } from "lucide-react";
import { fadeInUpVariants, springSnappy, staggerContainer } from "@/lib/motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const WHATSAPP_URL = "https://wa.me/+972585060699";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CleanHero() {

    return (
        <section
            id="hero"
            className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-24 text-center"
        >
            {/* Ambient glow — adapts to dark/light */}
            <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
                }}
                aria-hidden
            />

            <motion.div
                variants={staggerContainer(0.09)}
                initial="hidden"
                animate="visible"
                className="flex max-w-4xl flex-col items-center gap-y-6"
            >
                {/* Status badge */}
                <motion.div variants={fadeInUpVariants} transition={springSnappy}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75 dark:bg-indigo-500" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400" />
                        </span>
                        Open to opportunities
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={fadeInUpVariants}
                    transition={springSnappy}
                    className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-7xl md:text-8xl lg:text-[6rem]"
                    style={{ lineHeight: 1.05 }}
                >
                    Shalev Atsis
                </motion.h1>

                {/* Title */}
                <motion.p
                    variants={fadeInUpVariants}
                    transition={{ ...springSnappy, delay: 0.04 }}
                    className="text-2xl font-medium text-slate-500 dark:text-slate-400 sm:text-3xl"
                >
                    Software Engineer
                    <span className="mx-3 text-slate-300 dark:text-slate-600" aria-hidden>·</span>
                    <span className="text-indigo-600 dark:text-indigo-400">AI &amp; Computer Vision</span>
                </motion.p>

                {/* Summary */}
                <motion.p
                    variants={fadeInUpVariants}
                    transition={{ ...springSnappy, delay: 0.08 }}
                    className="max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg"
                >
                    Currently powering production systems at Jifiti while finishing a B.Sc. in Computer Science (GPA 90).{" "}
                    I turn ambiguous backend puzzles and AI research into clean, reliable software.
                </motion.p>

                {/* Contact row */}
                <motion.div
                    variants={fadeInUpVariants}
                    transition={{ ...springSnappy, delay: 0.12 }}
                    className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:flex-wrap"
                >
                    {/* Primary Button — WhatsApp */}
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Message on WhatsApp"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={springSnappy}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:shadow-[#25D366]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:w-auto"
                    >
                        <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2.5} />
                        WhatsApp Me
                    </motion.a>

                    {/* Secondary Buttons Row */}
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        {/* Download CV (Indigo Theme) */}
                        <motion.a
                            href="/Shalev_Atsis_CV.pdf"
                            download="Shalev_Atsis_CV.pdf"
                            aria-label="Download CV"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={springSnappy}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200/50 bg-indigo-50/50 px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-100 hover:shadow-indigo-500/10 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/20 sm:w-auto"
                        >
                            <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
                            Download CV
                        </motion.a>

                        {/* Email (Violet Theme) */}
                        <motion.a
                            href={EMAIL}
                            aria-label="Send email to Shalevatsis@gmail.com"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={springSnappy}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200/50 bg-violet-50/50 px-6 py-3 text-sm font-semibold text-violet-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-violet-300 hover:bg-violet-100 hover:shadow-violet-500/10 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/20 sm:w-auto"
                        >
                            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" strokeWidth={2.5} />
                            Email
                        </motion.a>
                    </div>

                    {/* Social Icon Links */}
                    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
                        <motion.a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/50 bg-slate-50/50 shadow-sm backdrop-blur-md transition-all duration-300 ease-in-out hover:border-slate-300 hover:bg-slate-100 hover:shadow-slate-500/10 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:shadow-slate-500/20"
                        >
                            <Github className="h-5 w-5 text-slate-600 transition-colors duration-300 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white" strokeWidth={2} />
                        </motion.a>

                        <motion.a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/50 bg-blue-50/50 shadow-sm backdrop-blur-md transition-all duration-300 ease-in-out hover:border-blue-300 hover:bg-blue-100 hover:shadow-blue-500/20 dark:border-blue-500/20 dark:bg-blue-900/20 dark:hover:border-blue-500/40 dark:hover:bg-blue-900/40"
                        >
                            <Linkedin className="h-5 w-5 text-blue-600 transition-colors duration-300 group-hover:text-[#0A66C2] dark:text-blue-400 dark:group-hover:text-[#0A66C2]" strokeWidth={2} />
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
}
