"use client";

import { LayoutDashboard, FileText } from "lucide-react";
import { useView } from "@/context/ViewContext";

export default function DualModeToggle() {
    const { isResumeMode, toggleMode } = useView();

    return (
        <div className="flex items-center gap-1.5" role="group" aria-label="View mode toggle">
            <LayoutDashboard
                className={`hidden h-3.5 w-3.5 sm:block transition-colors ${isResumeMode ? "text-slate-300 dark:text-slate-600" : "text-indigo-500 dark:text-indigo-400"}`}
                strokeWidth={1.75}
                aria-hidden
            />
            <button
                type="button"
                role="switch"
                aria-checked={isResumeMode}
                aria-label={isResumeMode ? "Switch to Portfolio view" : "Switch to Resume view"}
                onClick={toggleMode}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${isResumeMode
                        ? "border-slate-300 bg-slate-300 dark:border-slate-600 dark:bg-slate-600"
                        : "border-indigo-400 bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-950"
                    }`}
            >
                <span
                    className={`pointer-events-none my-auto ml-0.5 inline-block h-3 w-3 rounded-full shadow-sm transition-transform duration-300 ${isResumeMode
                            ? "translate-x-[14px] bg-white dark:bg-slate-300"
                            : "translate-x-0 bg-indigo-500 dark:bg-indigo-400"
                        }`}
                />
            </button>
            <FileText
                className={`hidden h-3.5 w-3.5 sm:block transition-colors ${isResumeMode ? "text-slate-500 dark:text-slate-400" : "text-slate-300 dark:text-slate-600"}`}
                strokeWidth={1.75}
                aria-hidden
            />
        </div>
    );
}
