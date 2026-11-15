"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useDebug } from "@/lib/hooks";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const AgentConsole = dynamic(() => import("@/components/shared/AgentConsole"), { ssr: false });

/**
 * Hosts the "model hallucination" easter egg:
 *  - marks the page with data-broken (CSS adds a subtle chromatic offset)
 *  - shows a pulsing, decorative "temperature" badge
 *  - announces the state change to screen readers (aria-live)
 *  - renders the agent console dialog and the success toast
 */
export default function DebugLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSystemBroken, toastMessage, dismissToast } = useDebug();

  return (
    <>
      <div data-broken={isSystemBroken} className="debug-chaos-wrapper min-h-screen">
        {children}
      </div>

      <div aria-live="polite" role="status" className="sr-only">
        {isSystemBroken
          ? "Easter egg: the page is pretending its AI model is hallucinating. Headings look scrambled, but the real content is unchanged. Ask the agent console to fix the site."
          : ""}
      </div>

      {isSystemBroken && (
        <div
          aria-hidden
          className="pointer-events-none fixed right-4 top-16 z-[90] animate-soft-pulse rounded-full border border-[#ff453a]/40 bg-[#ff453a]/15 px-3 py-1 font-mono text-[11px] font-medium text-[#ff6961] backdrop-blur-md"
        >
          temperature: 1.9
        </div>
      )}

      <AgentConsole />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-6 z-[110] flex justify-center px-4"
          >
            <button
              type="button"
              onClick={dismissToast}
              className={cn(
                "glass rounded-full px-5 py-3 text-sm font-medium text-ink shadow-lift",
                FOCUS_RING
              )}
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#30d158]" aria-hidden />
              {toastMessage}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
