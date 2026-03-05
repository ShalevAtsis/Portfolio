"use client";

import { type ReactNode } from "react";

/**
 * ContactButton
 * ─────────────
 * framer-motion has been removed. All hover/tap effects are pure CSS
 * (transition-transform, hover:scale-*, active:scale-*) so this component
 * can be safely imported in Navbar without pulling framer-motion into the
 * critical-path bundle.
 */

export type ContactColor =
    | "whatsapp" // green
    | "email"    // indigo
    | "linkedin" // blue
    | "github"   // slate
    | "phone"    // amber
    | "download" // indigo (CV)
    | "default"; // slate

export type ContactVariant = "icon" | "full";

interface ContactButtonProps {
    href: string;
    icon: ReactNode;
    label: string;
    description?: string;          // shown only in "full" variant
    color?: ContactColor;
    variant?: ContactVariant;
    external?: boolean;            // adds target="_blank" rel="noopener noreferrer"
    className?: string;
}

// ── Color token map ──────────────────────────────────────────────────────────
const colorMap: Record<ContactColor, {
    text: string;
    hover: string;
    ring: string;
}> = {
    whatsapp: {
        text: "text-emerald-600  dark:text-emerald-400",
        hover: "hover:bg-emerald-50  dark:hover:bg-emerald-950/50",
        ring: "focus-visible:ring-emerald-500",
    },
    email: {
        text: "text-indigo-600   dark:text-indigo-400",
        hover: "hover:bg-indigo-50   dark:hover:bg-indigo-950/50",
        ring: "focus-visible:ring-indigo-500",
    },
    linkedin: {
        text: "text-blue-600     dark:text-blue-400",
        hover: "hover:bg-blue-50     dark:hover:bg-blue-950/50",
        ring: "focus-visible:ring-blue-500",
    },
    download: {
        text: "text-indigo-600   dark:text-indigo-400",
        hover: "hover:bg-indigo-50   dark:hover:bg-indigo-500/10",
        ring: "focus-visible:ring-indigo-500",
    },
    github: {
        text: "text-slate-700    dark:text-slate-300",
        hover: "hover:bg-slate-100   dark:hover:bg-slate-800",
        ring: "focus-visible:ring-slate-500",
    },
    phone: {
        text: "text-amber-600    dark:text-amber-400",
        hover: "hover:bg-amber-50    dark:hover:bg-amber-950/40",
        ring: "focus-visible:ring-amber-500",
    },
    default: {
        text: "text-slate-500    dark:text-slate-400",
        hover: "hover:bg-slate-100   dark:hover:bg-slate-800",
        ring: "focus-visible:ring-slate-500",
    },
};

// ── Component ────────────────────────────────────────────────────────────────

export default function ContactButton({
    href,
    icon,
    label,
    description,
    color = "default",
    variant = "icon",
    external = false,
    className = "",
}: ContactButtonProps) {
    const c = colorMap[color];
    const externalProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    if (variant === "icon") {
        return (
            <a
                href={href}
                aria-label={label}
                className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    "border border-transparent transition-[colors,transform]",
                    "hover:scale-[1.08] hover:-translate-y-0.5 active:scale-[0.94]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    c.text, c.hover, c.ring,
                    className,
                ].join(" ")}
                {...externalProps}
            >
                {icon}
            </a>
        );
    }

    // "full" variant — icon + label + optional description
    return (
        <a
            href={href}
            aria-label={label}
            className={[
                "group flex items-center gap-4 rounded-2xl",
                "border border-slate-100 dark:border-slate-800",
                "bg-white dark:bg-slate-900",
                "px-5 py-4 transition-[colors,transform,box-shadow]",
                "hover:-translate-y-[3px] hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)]",
                "active:scale-[0.97]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                c.ring,
                className,
            ].join(" ")}
            {...externalProps}
        >
            {/* Icon container */}
            <span
                className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    "bg-slate-50 dark:bg-slate-800 transition-colors",
                    `group-hover:bg-slate-100 dark:group-hover:bg-slate-700`,
                    c.text,
                ].join(" ")}
            >
                {icon}
            </span>

            {/* Text */}
            <span className="min-w-0">
                <span className={`block text-sm font-semibold ${c.text}`}>{label}</span>
                {description && (
                    <span className="block truncate text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {description}
                    </span>
                )}
            </span>
        </a>
    );
}
