"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

/**
 * ContactButton
 * ─────────────
 * Reusable contact / social button with two display variants:
 *
 *  • "icon"  — compact square (40×40 px), icon only. Use in Navbar / tight spots.
 *  • "full"  — pill/card with icon + label + optional description. Use in Footer.
 *
 * Colour theming is done via the `color` prop which maps to Tailwind token groups.
 */

export type ContactColor =
    | "whatsapp" // green
    | "email"    // indigo
    | "linkedin" // blue
    | "github"   // slate
    | "phone"    // amber
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
            <motion.a
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={springSnappy}
                className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    "border border-transparent transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    c.text, c.hover, c.ring,
                    className,
                ].join(" ")}
                {...externalProps}
            >
                {icon}
            </motion.a>
        );
    }

    // "full" variant — icon + label + optional description
    return (
        <motion.a
            href={href}
            aria-label={label}
            whileHover={{ y: -3, boxShadow: "0 8px 24px -6px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className={[
                "group flex items-center gap-4 rounded-2xl",
                "border border-slate-100 dark:border-slate-800",
                "bg-white dark:bg-slate-900",
                "px-5 py-4 transition-all",
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
        </motion.a>
    );
}
