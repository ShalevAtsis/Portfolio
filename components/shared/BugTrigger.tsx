"use client";

import { Bug } from "lucide-react";
import { useDebug } from "@/lib/hooks";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Footer easter-egg trigger: makes the "model" hallucinate and opens the agent console. */
export default function BugTrigger() {
  const { triggerChaos } = useDebug();

  return (
    <button
      type="button"
      onClick={(e) => {
        // WebKit does not focus buttons on click; focus explicitly so the
        // console can hand focus back here when it closes.
        e.currentTarget.focus();
        triggerChaos();
      }}
      className={cn(
        "group relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-[color,background-color,transform] duration-150 hover:bg-ink/[0.08] hover:text-[#ff6961] active:scale-90",
        FOCUS_RING
      )}
      aria-label="Trigger debug mode (easter egg)"
    >
      <span
        className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs text-canvas opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      >
        Raise the model temperature?
      </span>
      <Bug className="h-[18px] w-[18px]" strokeWidth={1.5} />
    </button>
  );
}
