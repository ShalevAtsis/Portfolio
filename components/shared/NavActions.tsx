"use client";

/**
 * NavActions
 * ─────────────────────────────────────────────────────────────────────────────
 * Desktop (sm+): renders the full social icon row inline — identical to before.
 * Mobile  (<sm): collapses icons into a single "⋯" trigger button that opens a
 *               frosted-glass dropdown panel. Theme + mode toggles always visible.
 *
 * Layout of the trigger zone (mobile):
 *   [☀ theme] [◉— mode] [⋯ socials]
 *
 * Dropdown:
 *   ┌─────────────────────────┐
 *   │  GitHub     LinkedIn    │
 *   │  Mail       WhatsApp    │
 *   └─────────────────────────┘
 */

import { useState, useEffect, useRef } from "react";
import {
    Github, Linkedin, Mail, MessageCircle,
    MoreHorizontal, X,
} from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import DualModeToggle from "@/components/shared/DualModeToggle";

// ─── Config ───────────────────────────────────────────────────────────────────

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const WHATSAPP_URL = "https://wa.me/+972585060699";

const SOCIALS = [
    {
        label: "GitHub",
        href: GITHUB_URL,
        icon: Github,
        color: "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50",
    },
    {
        label: "LinkedIn",
        href: LINKEDIN_URL,
        icon: Linkedin,
        color: "hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-[#0A66C2] dark:hover:text-blue-400",
    },
    {
        label: "Email",
        href: EMAIL,
        icon: Mail,
        color: "hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400",
    },
    {
        label: "WhatsApp",
        href: WHATSAPP_URL,
        icon: MessageCircle,
        color: "hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400",
    },
];

// ─── Desktop icon row ─────────────────────────────────────────────────────────

const ICON_BTN =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 transition-[color,background,transform] duration-150 motion-reduce:transition-none hover:scale-[1.08] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

const SEP = (
    <span
        className="mx-1.5 h-5 w-px shrink-0 bg-slate-200 dark:bg-slate-800"
        aria-hidden
    />
);

function InlineIcons() {
    return (
        <div className="hidden sm:flex items-center gap-0.5">
            {SOCIALS.map(({ label, href, icon: Icon, color }) => (
                <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${ICON_BTN} ${color}`}
                >
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                </a>
            ))}
            {SEP}
            <ThemeToggle />
            <DualModeToggle />
        </div>
    );
}

// ─── Mobile dropdown ──────────────────────────────────────────────────────────

function MobileActions() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (
                panelRef.current && !panelRef.current.contains(e.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open]);

    return (
        // Only shows on xs (<sm) screens
        <div className="flex sm:hidden items-center gap-1 relative">
            {/* Always-visible utility toggles */}
            <ThemeToggle />
            <DualModeToggle />

            {/* Socials trigger */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Open social links"
                className={[
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    "text-slate-500 dark:text-slate-400",
                    "transition-[color,background,transform] duration-150 motion-reduce:transition-none",
                    "hover:scale-[1.08] active:scale-90",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950",
                    open
                        ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800",
                ].join(" ")}
            >
                {open
                    ? <X className="h-[15px] w-[15px]" strokeWidth={2} />
                    : <MoreHorizontal className="h-[17px] w-[17px]" strokeWidth={1.75} />
                }
            </button>

            {/* Dropdown panel */}
            <div
                ref={panelRef}
                role="menu"
                aria-label="Social links"
                style={{
                    // CSS transition approach — no framer-motion dep needed
                    transition: "opacity 160ms ease, transform 160ms cubic-bezier(0.22,1,0.36,1)",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.96)",
                    pointerEvents: open ? "auto" : "none",
                }}
                className={[
                    "absolute right-0 top-[calc(100%+10px)] z-50",
                    "w-52 rounded-2xl p-3",
                    "border border-slate-200/80 dark:border-slate-700/60",
                    "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl",
                    "shadow-xl shadow-slate-900/10 dark:shadow-slate-900/40",
                    "origin-top-right",
                ].join(" ")}
            >
                {/* 2×2 social grid */}
                <div className="grid grid-cols-2 gap-2">
                    {SOCIALS.map(({ label, href, icon: Icon, color }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            role="menuitem"
                            aria-label={label}
                            onClick={() => setOpen(false)}
                            className={[
                                "flex flex-col items-center gap-1.5 rounded-xl px-3 py-3",
                                "text-slate-500 dark:text-slate-400",
                                "transition-[color,background,transform] duration-150",
                                "hover:scale-[1.04] active:scale-95",
                                color,
                            ].join(" ")}
                        >
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function NavActions() {
    return (
        <>
            <InlineIcons />
            <MobileActions />
        </>
    );
}
