"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebug } from "@/context/DebugContext";

const EXPECTED_COMMAND = "sudo fix-site --force";
const HELP_HINT = "Try: sudo fix-site --force";

const BOOT_LINES = [
  "[    0.000000] Booting kernel...",
  "[    0.012341] Initializing subsystems...",
  "[    0.045678] ERROR: ui_rendering_engine: FAILURE",
  "[    0.045679] ERROR: layout_core: DEGRADED",
  "[    0.045680] WARN: System integrity at 40%",
  "[    0.046001] Awaiting recovery command.",
];

export default function TerminalOverlay() {
  const {
    isTerminalOpen,
    isSystemBroken,
    fixSystem,
    closeTerminal,
    isFixed,
  } = useDebug();
  const [input, setInput] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedInput = input.trim().toLowerCase();
  const isCorrect =
    normalizedInput === EXPECTED_COMMAND.toLowerCase() ||
    normalizedInput === "sudo fix-site --force";

  useEffect(() => {
    if (isTerminalOpen) {
      setInput("");
      setShowHelp(false);
      setShowSuccess(false);
      setProgress(0);
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isTerminalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect) {
      setShowSuccess(true);
      setProgress(0);
      const start = Date.now();
      const duration = 1500;
      const tick = () => {
        const elapsed = Date.now() - start;
        const p = Math.min(100, (elapsed / duration) * 100);
        setProgress(p);
        if (p < 100) requestAnimationFrame(tick);
        else {
          fixSystem();
        }
      };
      requestAnimationFrame(tick);
    } else if (
      normalizedInput === "help" ||
      normalizedInput === "--help" ||
      normalizedInput === "-h"
    ) {
      setShowHelp(true);
    }
  };

  if (!isTerminalOpen || isFixed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cyber-bg/80 backdrop-blur-sm"
          onClick={closeTerminal}
          aria-hidden
        />

        {/* Terminal panel */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-t-2xl border border-cyber-border/50 bg-cyber-surface/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-cyber-border/50 bg-cyber-bg/80 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-cyber-muted">
              system_recovery — CRITICAL
            </span>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-4 font-mono text-sm">
            {/* Boot log style */}
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-cyber-muted"
              >
                {line}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-red-400"
            >
              CRITICAL ERROR: UI RENDERING ENGINE FAILURE. SYSTEM INTEGRITY AT
              40%.
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-2 text-cyber-muted"
            >
              Enter recovery command to restore system.
            </motion.div>

            {showHelp && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-cyber-accent"
              >
                {HELP_HINT}
              </motion.p>
            )}

            {/* Success progress */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4"
              >
                <p className="mb-2 text-emerald-400">
                  Executing fix-site --force...
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-cyber-bg">
                  <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Input line */}
            {!showSuccess && (
              <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                <span className="text-cyber-accent">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=" Enter command..."
                  className="flex-1 bg-transparent font-mono text-cyber-text outline-none placeholder:text-cyber-muted/50"
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
