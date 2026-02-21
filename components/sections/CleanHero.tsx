"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Github, Linkedin, ArrowDown } from "lucide-react";
import { fadeInUpVariants, springSnappy, staggerContainer } from "@/lib/motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const WHATSAPP_URL = "https://wa.me/+972585060699";

// ─── Component ────────────────────────────────────────────────────────────────

export default function CleanHero() {
    const scrollToExperience = () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    };

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
                    className="flex flex-wrap items-center justify-center gap-3 pt-2"
                >
                    {/* WhatsApp — primary CTA */}
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Message on WhatsApp"
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px -6px rgba(16,185,129,0.40)" }}
                        whileTap={{ scale: 0.97 }}
                        transition={springSnappy}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-colors hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:shadow-emerald-950 dark:hover:bg-emerald-600"
                    >
                        <MessageCircle className="h-4 w-4" strokeWidth={2} />
                        WhatsApp Me
                    </motion.a>

                    {/* Email — secondary */}
                    <motion.a
                        href={EMAIL}
                        aria-label="Send email to Shalevatsis@gmail.com"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={springSnappy}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50"
                    >
                        <Mail className="h-4 w-4" strokeWidth={2} />
                        Email
                    </motion.a>

                    {/* Icon links */}
                    <div className="flex items-center gap-1">
                        {[
                            { href: GITHUB_URL, label: "GitHub", icon: <Github className="h-5 w-5" strokeWidth={1.75} /> },
                            { href: LINKEDIN_URL, label: "LinkedIn", icon: <Linkedin className="h-5 w-5" strokeWidth={1.75} /> },
                        ].map(({ href, label, icon }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.93 }}
                                transition={springSnappy}
                                className="inline-flex rounded-lg p-2.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                            >
                                {icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.button
                onClick={scrollToExperience}
                aria-label="Scroll to experience"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full p-2 text-slate-300 transition-colors hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ArrowDown className="h-5 w-5" strokeWidth={1.5} />
                </motion.div>
            </motion.button>
        </section>
    );
}
