"use client";

import { Bug } from "lucide-react";
import { motion } from "framer-motion";
import { useDebug } from "@/context/DebugContext";

export default function BugTrigger() {
  const { triggerChaos } = useDebug();

  return (
    <motion.button
      type="button"
      onClick={triggerChaos}
      initial={{ opacity: 0.5 }}
      whileHover={{ opacity: 1, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-lg p-2 text-cyber-muted/60 transition-colors hover:bg-cyber-surface/50 hover:text-cyber-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
      aria-label="Trigger debug mode (easter egg)"
    >
      <Bug className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
    </motion.button>
  );
}
