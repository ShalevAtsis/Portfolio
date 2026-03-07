"use client";

import Link from "next/link";
import React from "react";

/**
 * BrandName — Client Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the brand name and handles smooth scroll to top on click.
 */
export default function BrandName() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If we're already on the home page, prevent default Link behavior and scroll top
        if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            // Optionally clear the hash if any
            if (window.location.hash) {
                window.history.pushState("", document.title, window.location.pathname);
            }
        }
    };

    return (
        <Link
            href="/"
            onClick={handleClick}
            className="block whitespace-nowrap text-sm font-extrabold tracking-tight text-slate-900
                 transition-colors duration-150 hover:text-indigo-600
                 dark:text-slate-50 dark:hover:text-indigo-400
                 sm:text-base md:text-lg"
        >
            Shalev Atsis
        </Link>
    );
}
