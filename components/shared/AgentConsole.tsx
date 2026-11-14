"use client";

/**
 * AgentConsole: the easter-egg recovery dialog.
 *
 * When the "model" hallucinates (BugTrigger -> triggerChaos), this console opens
 * and plays a scripted, model-style trace: thinking, streamed tokens, tool calls,
 * a confidence score. The visitor fixes the site with a natural-language prompt
 * ("fix the site", "undo the hallucination", ...) or a suggested-prompt chip.
 *
 * Nothing here calls a real LLM: the site is static, so every line is scripted.
 *
 * Accessibility: role="dialog" with a focus trap, Escape closes, focus returns
 * to the trigger, the transcript is an aria-live log, and under reduced motion
 * all text appears instantly.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CornerDownLeft, X } from "lucide-react";
import { useDebug, useFocusTrap, useReducedMotionSafe } from "@/lib/hooks";
import { setScrollLocked } from "@/lib/scroll";
import { FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type LineKind = "think" | "text" | "tool" | "warn" | "user" | "del" | "add" | "ok";
interface Line {
  kind: LineKind;
  text: string;
}

const INTRO: Line[] = [
  { kind: "think", text: "thinking…" },
  { kind: "text", text: "I rendered this page from memory instead of the DOM. Some headings may be… creative." },
  { kind: "tool", text: "tool: read_file(layout.tsx) → 97 lines, none of them my fault" },
  { kind: "tool", text: "tool: run_tests → 3 failed, 1 flaky, 1 “works on my machine”" },
  { kind: "warn", text: "confidence: 0.42 · I am 97% sure this was working yesterday." },
  { kind: "text", text: "Tell me what to do in plain language, or type help." },
];

const HELP: Line[] = [
  { kind: "text", text: "Hint, agent to human: ask me to fix, restore, or undo the hallucination. The chips below work too." },
  { kind: "text", text: "Old-school? sudo fix-site --force still works. I won't tell anyone." },
];

const SHRUGS = [
  "As a large language model I cannot render this footer. I can fix the site, though. Just ask.",
  "context window exceeded: too many open tabs. Try “fix the site”.",
  "Confidently wrong answer loading… or you could simply say “restore”.",
];

const FIX: Line[] = [
  { kind: "think", text: "thinking…" },
  { kind: "text", text: "Root cause: asked for a portfolio, improvised a multiverse." },
  { kind: "tool", text: "tool: read_file(app/layout.tsx)" },
  { kind: "tool", text: "tool: run_tests --grep hallucination" },
  { kind: "del", text: "temperature: 1.9" },
  { kind: "add", text: "temperature: 0.2" },
  { kind: "del", text: "headings: generated from vibes" },
  { kind: "add", text: "headings: grounded in the DOM" },
];

const SUGGESTIONS = ["fix the site", "undo the hallucination", "help"];

/** Fuzzy intent: anything that sounds like "make it right again". */
const FIX_INTENT = /\b(fix|repair|restor|reset|undo|heal|roll\s*-?\s*back|revert|recover|debug)\w*/i;
const LEGACY_COMMAND = /^sudo\s+fix-site(\s+--force)?$/i;
const HELP_INTENT = /^(help|--help|-h|\?|hint|hints)$/i;

const LINE_STYLE: Record<LineKind, string> = {
  think: "text-ink-2 italic",
  text: "text-ink",
  tool: "text-accent",
  warn: "text-[#ff9f0a]",
  user: "text-ink-2",
  del: "rounded bg-[#ff453a]/10 px-2 text-[#ff6961]",
  add: "rounded bg-[#30d158]/10 px-2 text-[#30d158]",
  ok: "font-medium text-[#30d158]",
};

const PREFIX: Partial<Record<LineKind, string>> = { user: "› ", del: "- ", add: "+ ", ok: "✓ " };

export default function AgentConsole() {
  const { isTerminalOpen, isFixed } = useDebug();
  // The panel mounts fresh on every open, so its transcript resets naturally.
  if (!isTerminalOpen || isFixed) return null;
  return <ConsolePanel />;
}

function ConsolePanel() {
  const { fixSystem, closeTerminal } = useDebug();
  const reduced = useReducedMotionSafe();

  const [log, setLog] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"chat" | "fixing" | "patching" | "resolved">("chat");

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shrugIndex = useRef(0);
  // In-flight stream: lets a new prompt (or Skip) flush the remaining lines at once.
  const stream = useRef<{ timer: ReturnType<typeof setTimeout> | null; rest: Line[]; partial: boolean; done?: () => void }>({
    timer: null,
    rest: [],
    partial: false,
  });

  useFocusTrap(panelRef, true, closeTerminal);

  const flush = useCallback(() => {
    const s = stream.current;
    if (s.timer) clearTimeout(s.timer);
    s.timer = null;
    const { rest, partial, done } = s;
    s.rest = [];
    s.partial = false;
    s.done = undefined;
    if (rest.length > 0) {
      // `partial` means rest[0] is already on screen, half-typed: replace it.
      setLog((prev) => [...(partial ? prev.slice(0, -1) : prev), ...rest]);
    }
    done?.();
  }, []);

  const play = useCallback(
    (lines: Line[], done?: () => void) => {
      flush();
      if (reduced) {
        setLog((prev) => [...prev, ...lines]);
        done?.();
        return;
      }
      const s = stream.current;
      s.rest = lines.slice();
      s.done = done;

      const nextLine = () => {
        const line = s.rest[0];
        if (!line) {
          s.timer = null;
          const finished = s.done;
          s.done = undefined;
          finished?.();
          return;
        }
        const words = line.text.split(" ");
        let shown = 0;
        s.partial = true;
        setLog((prev) => [...prev, { ...line, text: "" }]);
        const tick = () => {
          shown += 1;
          const text = words.slice(0, shown).join(" ");
          setLog((prev) => [...prev.slice(0, -1), { ...line, text }]);
          if (shown < words.length) {
            s.timer = setTimeout(tick, line.kind === "text" ? 26 : 14);
          } else {
            s.rest.shift();
            s.partial = false;
            s.timer = setTimeout(nextLine, line.kind === "think" ? 320 : 110);
          }
        };
        s.timer = setTimeout(tick, 30);
      };
      nextLine();
    },
    [flush, reduced]
  );

  // Intro trace, input focus, and scroll lock for the lifetime of the dialog.
  useEffect(() => {
    const s = stream.current;
    const introTimer = setTimeout(() => play(INTRO), 0);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 80);
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(focusTimer);
      if (s.timer) clearTimeout(s.timer);
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
    // Runs once per open; `play` only changes with the reduced-motion preference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest line in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, phase]);

  const resolve = useCallback(() => {
    setPhase("resolved");
    setLog((prev) => [...prev, { kind: "ok", text: "Hallucination resolved. All tests green." }]);
    setTimeout(fixSystem, reduced ? 0 : 650);
  }, [fixSystem, reduced]);

  const submit = (raw: string) => {
    const prompt = raw.trim();
    if (!prompt || phase !== "chat") return;
    flush();
    setInput("");
    setLog((prev) => [...prev, { kind: "user", text: prompt }]);

    if (HELP_INTENT.test(prompt)) {
      play(HELP);
    } else if (LEGACY_COMMAND.test(prompt) || FIX_INTENT.test(prompt)) {
      setPhase("fixing");
      play(FIX, () => setPhase("patching"));
    } else {
      play([{ kind: "text", text: SHRUGS[shrugIndex.current++ % SHRUGS.length] }]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={closeTerminal}
        aria-hidden
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="agent-console-title"
        initial={reduced ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="relative flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-card border border-hairline bg-surface/85 shadow-lift backdrop-blur-2xl backdrop-saturate-150 sm:rounded-card"
      >
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-3">
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-[#ff453a]" />
          </span>
          <h2 id="agent-console-title" className="font-mono text-[13px] font-medium text-ink">
            agent_recovery
          </h2>
          <span className="hidden font-mono text-[11px] text-ink-2 sm:inline">portfolio-agent · temperature 1.9</span>
          <button
            type="button"
            onClick={closeTerminal}
            aria-label="Close agent console"
            className={cn(
              "ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/[0.08] hover:text-ink",
              FOCUS_RING
            )}
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Agent transcript"
          data-lenis-prevent
          className="min-h-[11rem] flex-1 space-y-1.5 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed"
        >
          {log.map((line, i) => (
            <p key={i} className={cn("whitespace-pre-wrap break-words", LINE_STYLE[line.kind])}>
              {PREFIX[line.kind]}
              {line.text}
            </p>
          ))}

          {(phase === "patching" || phase === "resolved") && (
            <div className="pt-2">
              <p className="mb-1.5 text-ink-2">applying patch…</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-accent"
                  initial={{ scaleX: reduced ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduced ? 0 : 1.1, ease: "easeInOut" }}
                  onAnimationComplete={() => {
                    if (phase === "patching") resolve();
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {phase === "fixing" && (
          <div className="flex justify-end border-t border-hairline px-5 py-3">
            <button
              type="button"
              onClick={flush}
              className={cn("rounded-full px-3 py-1.5 font-mono text-xs text-ink-2 hover:text-ink", FOCUS_RING)}
            >
              skip reasoning
            </button>
          </div>
        )}

        {phase === "chat" && (
          <div className="border-t border-hairline px-5 pb-5 pt-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submit(suggestion)}
                  className={cn(
                    "rounded-full border border-hairline bg-ink/[0.06] px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:bg-ink/[0.12]",
                    FOCUS_RING
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-hairline bg-elevated/80 px-3 py-1.5 focus-within:ring-2 focus-within:ring-accent"
            >
              <label htmlFor="agent-prompt" className="sr-only">
                Prompt the agent
              </label>
              <input
                ref={inputRef}
                id="agent-prompt"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the agent to fix the site…"
                className="min-w-0 flex-1 bg-transparent py-1.5 font-mono text-[13px] text-ink outline-none placeholder:text-ink-2"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                enterKeyHint="send"
              />
              <button
                type="submit"
                aria-label="Send prompt"
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-fill text-white transition-opacity hover:opacity-90",
                  FOCUS_RING
                )}
              >
                <CornerDownLeft className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
            <p className="mt-2 text-[11px] text-ink-2">Scripted for fun. No real model was harmed. Esc closes.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
