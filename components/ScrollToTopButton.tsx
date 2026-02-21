"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { springSnappy } from "@/lib/motion";

const SCROLL_THRESHOLD = 300; // px before the button appears

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
        // Set initial state
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-to-top"
                    type="button"
                    aria-label="Back to top"
                    onClick={scrollToTop}
                    // ── Entrance / exit ──
                    initial={{ opacity: 0, y: 20, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.85 }}
                    transition={springSnappy}
                    // ── Hover / tap ──
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={[
                        // Position
                        "fixed bottom-8 right-8 z-50",
                        // Shape
                        "flex h-11 w-11 items-center justify-center rounded-full",
                        // Glassmorphism
                        "border border-slate-200/80 bg-white/80 backdrop-blur-md",
                        "dark:border-slate-700/60 dark:bg-slate-900/70",
                        // Shadow & colour
                        "text-slate-600 shadow-lg shadow-slate-900/10",
                        "dark:text-slate-300 dark:shadow-slate-900/40",
                        // Hover tint
                        "transition-colors hover:border-indigo-300 hover:text-indigo-600",
                        "dark:hover:border-indigo-600 dark:hover:text-indigo-400",
                        // Focus ring
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                    ].join(" ")}
                >
                    <ArrowUp className="h-5 w-5" strokeWidth={2} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
