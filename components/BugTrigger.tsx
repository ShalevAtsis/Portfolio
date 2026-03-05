"use client";

import { Bug } from "lucide-react";
import { useDebug } from "@/context/DebugContext";

// framer-motion removed. Hover/tap effects are pure CSS transitions.

export default function BugTrigger() {
  const { triggerChaos } = useDebug();

  return (
    <button
      type="button"
      onClick={triggerChaos}
      className="group relative rounded-lg p-2 text-slate-400 opacity-60 transition-[colors,opacity,transform] duration-150 hover:bg-slate-100 hover:text-red-500 hover:opacity-100 active:scale-[0.92] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 dark:hover:bg-slate-800 dark:hover:text-red-400"
      aria-label="Trigger debug mode (easter egg)"
    >
      {/* Tooltip — group-hover CSS only */}
      <span
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 dark:bg-white dark:text-slate-900"
        aria-hidden
      >
        Found a bug? Try to fix it.
      </span>

      <Bug className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
    </button>
  );
}
