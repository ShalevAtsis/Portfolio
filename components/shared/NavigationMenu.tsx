"use client";

/**
 * NavigationMenu — React Portal Overlay
 * Client island. Parent <header> is a Pure Server Component.
 * Uses ReactDOM.createPortal to escape all stacking contexts and guarantee
 * absolute visibility over WebGL globes and other 3D components.
 * Solid backgrounds only (no backdrop-filter) to prevent WebGL bleed-through.
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const NAV_LINKS = [
    { href: "#about", label: "About", idx: "01" },
    { href: "#experience", label: "Experience", idx: "02" },
    { href: "#skills", label: "Skills", idx: "03" },
    { href: "#projects", label: "Projects", idx: "04" },
    { href: "#gallery", label: "Gallery", idx: "05" },
    { href: "#personal-world", label: "Personal World", idx: "06" },
    { href: "#contact", label: "Contact", idx: "07" },
];

const STYLE = `
@keyframes linkSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nav-link-enter {
  opacity: 0;
  animation: linkSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
}
`;

export default function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Only render portal on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // Strict Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Escape to close
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    const close = () => setIsOpen(false);

    // The full-screen overlay (rendered via Portal)
    const overlayContent = (
        <div
            id="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            aria-hidden={!isOpen}
            className={[
                "fixed inset-x-0 top-0 z-[99999]",
                "flex h-[100dvh] flex-col items-center justify-center",
                // SOLID premium colours — NO transparency or backdrop-blur
                "bg-white dark:bg-slate-950",
                // Pure CSS fade-in/out
                "transition-[opacity,visibility] duration-300",
                isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
            ].join(" ")}
        >
            <style dangerouslySetInnerHTML={{ __html: STYLE }} />

            {/* Subtly animated ambient glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[50vh] w-[60vw] rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-3xl" />
            </div>

            {/* ── Top Bar inside Portal ── */}
            <div className="absolute inset-x-0 top-0">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center px-4 py-2 sm:px-6 lg:px-10">
                    <div className="justify-self-start">
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={close}
                            className={[
                                "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                                "transition-[colors,transform] duration-150",
                                "hover:scale-[1.08] active:scale-90",
                                "text-slate-900 dark:text-slate-100",
                                "hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
                            ].join(" ")}
                        >
                            <X className="h-6 w-6" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Centred nav links with adjusted sizes ── */}
            <nav aria-label="Site sections" className="relative z-10 flex w-full flex-col items-center px-4 text-center">
                <ul className="flex w-full max-w-lg flex-col gap-1.5 sm:gap-3 lg:gap-5" role="list">
                    {NAV_LINKS.map(({ href, label, idx }, i) => (
                        <li key={href}>
                            <a
                                href={href}
                                onClick={close}
                                className={[
                                    "nav-link-enter group flex items-center justify-center gap-3 py-1.5 sm:py-2 focus:outline-none",
                                    !isOpen && "hidden",
                                ].join(" ")}
                                style={{
                                    animationDelay: `${i * 50}ms`,
                                    animationPlayState: isOpen ? "running" : "paused",
                                }}
                            >
                                {/* Index */}
                                <span className="w-6 text-right text-[10px] font-bold tabular-nums text-slate-500 dark:text-slate-400 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:w-8 sm:text-xs">
                                    {idx}
                                </span>

                                {/* Label — Scaled down to fit mobile cleanly */}
                                <span className="relative text-3xl font-black tracking-tighter text-slate-900 dark:text-white transition-[colors,transform] duration-300 group-hover:translate-x-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {label}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <p className="absolute bottom-6 inset-x-0 text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Shalev Atsis · Software Engineer
            </p>
        </div>
    );

    return (
        <>
            {/* ── Original Burger Button (in Navbar) ── */}
            <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="nav-overlay"
                onClick={() => setIsOpen(true)}
                className={[
                    "inline-flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl",
                    "transition-[colors,transform] duration-150",
                    "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                    "hover:scale-[1.08] active:scale-90",
                ].join(" ")}
            >
                <span className="block h-[1.5px] w-[18px] rounded-full bg-current" />
                <span className="block h-[1.5px] w-[18px] rounded-full bg-current" />
                <span className="block h-[1.5px] w-[18px] rounded-full bg-current" />
            </button>

            {/* ── React Portal Overlay ── */}
            {mounted && typeof document !== "undefined"
                ? createPortal(overlayContent, document.body)
                : null}
        </>
    );
}
