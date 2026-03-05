"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        // Stable skeleton prevents layout shift during SSR/hydration
        return <span className="inline-flex h-9 w-9 rounded-xl" aria-hidden />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-[colors,transform] duration-150 hover:bg-slate-100 hover:text-slate-800 hover:scale-[1.08] active:scale-90 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
            {isDark
                ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
                : <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />}
        </button>
    );
}
