"use client";

import { LayoutDashboard, FileText } from "lucide-react";
import { useView } from "@/lib/hooks";
import { cn } from "@/lib/cn";
import { FOCUS_RING } from "@/components/ui/Button";

/** Portfolio / Resume switch. */
export default function DualModeToggle() {
  const { isResumeMode, toggleMode } = useView();

  return (
    <div className="flex items-center gap-1.5 pl-1" role="group" aria-label="View mode toggle">
      <LayoutDashboard
        className={cn("hidden h-3.5 w-3.5 transition-colors sm:block", isResumeMode ? "text-ink-2/50" : "text-accent")}
        strokeWidth={1.75}
        aria-hidden
      />
      <button
        type="button"
        role="switch"
        aria-checked={isResumeMode}
        aria-label={isResumeMode ? "Switch to Portfolio view" : "Switch to Resume view"}
        onClick={toggleMode}
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-hairline transition-colors duration-300",
          isResumeMode ? "bg-accent-fill" : "bg-ink/[0.12]",
          FOCUS_RING
        )}
      >
        <span
          className={cn(
            "pointer-events-none ml-0.5 inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-300 motion-reduce:transition-none",
            isResumeMode ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
      <FileText
        className={cn("hidden h-3.5 w-3.5 transition-colors sm:block", isResumeMode ? "text-accent" : "text-ink-2/50")}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}
