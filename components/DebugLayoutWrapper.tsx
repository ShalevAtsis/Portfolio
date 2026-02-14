"use client";

import { useDebug } from "@/context/DebugContext";
import TerminalOverlay from "./TerminalOverlay";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function DebugLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSystemBroken, toastMessage, dismissToast } = useDebug();

  return (
    <>
      <div
        data-broken={isSystemBroken}
        className="debug-chaos-wrapper min-h-screen transition-transform duration-500 ease-out"
      >
        {children}
        <Footer />
      </div>

      <TerminalOverlay />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2"
          >
            <button
              type="button"
              onClick={dismissToast}
              className="rounded-xl border border-cyber-emerald/50 bg-cyber-bg/95 px-5 py-3 font-medium text-cyber-emerald shadow-lg backdrop-blur-sm hover:border-cyber-emerald/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
            >
              {toastMessage}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
