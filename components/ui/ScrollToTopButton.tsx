"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SCROLL_THRESHOLD = 600;
/** Hidden again this close to the end of the page, so it never covers the footer controls. */
const BOTTOM_CLEARANCE = 160;

/** Floating "back to top" control. Always mounted; CSS handles show/hide. */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setVisible(y > SCROLL_THRESHOLD && y < max - BOTTOM_CLEARANCE);
  });

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToTarget(0)}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "glass fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-ink shadow-lift transition-[opacity,transform] duration-300 hover:scale-105 active:scale-95 motion-reduce:transition-none",
        FOCUS_RING,
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}
