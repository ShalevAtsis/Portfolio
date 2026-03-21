"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// framer-motion removed — visibility toggle uses CSS opacity/transform transition.
// AnimatePresence replaced by conditional class swap on a persistently mounted button.

const SCROLL_THRESHOLD = 300;

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setVisible(window.scrollY > SCROLL_THRESHOLD);
                    ticking = false;
                });
                ticking = true;
            }
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        // Always in DOM; CSS handles show/hide so there's no layout shift
        <button
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
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
                // Hover/active — CSS only
                "transition-[colors,transform,opacity] duration-200",
                "hover:border-indigo-300 hover:text-indigo-600 hover:scale-[1.1] hover:-translate-y-0.5",
                "dark:hover:border-indigo-600 dark:hover:text-indigo-400",
                "active:scale-90",
                // Focus ring
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                // Visibility — CSS transition replaces AnimatePresence
                visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-5 pointer-events-none",
            ].join(" ")}
        >
            <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </button>
    );
}
