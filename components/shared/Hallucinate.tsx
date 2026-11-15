"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useDebug, useReducedMotionSafe } from "@/lib/hooks";

/**
 * Easter egg: while the "model" is hallucinating, headings scramble into
 * token-like fragments and settle on a plausible-but-wrong version.
 *
 * Accessibility: the real text always stays in the DOM (only its opacity
 * changes); the glitch layer is aria-hidden and absolutely positioned, so the
 * layout never shifts. Under reduced motion the wrong text appears instantly
 * with no scramble or jitter.
 */

const SWAPS: Array<[RegExp, string]> = [
  [/Shalev Atsis/, "Shalev Atlas"],
  [/TL;DR/, "TL;DNR"],
  [/Experience/, "Expedience"],
  [/Education/, "Speculation"],
  [/Skills/, "Spills"],
  [/Projects/, "Projections"],
  [/Gallery/, "Galaxy"],
  [/Personal World/, "Parallel World"],
  [/build something/, "bill someone"],
  [/Engineer/, "Barista"],
];

const TOKENS = ["▁the", "##ing", "<|eot|>", "[MASK]", "Ġof", "</s>", "##ly", "<unk>", "▁▁", "0x3f", "∅", "<pad>"];
const FRAMES = 14;

export function hallucinated(text: string): string {
  let out = text;
  for (const [pattern, wrong] of SWAPS) out = out.replace(pattern, wrong);
  return out === text ? `${text} (probably)` : out;
}

function scrambled(text: string, frame: number): string {
  return text
    .split(" ")
    .map((word, i) => ((i + frame) % 3 === 0 ? word : TOKENS[(i * 7 + frame * 5) % TOKENS.length]))
    .join(" ");
}

function GlitchLayer({ text }: { text: string }) {
  const reduced = useReducedMotionSafe();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFrame((f) => {
        if (f >= FRAMES) {
          clearInterval(id);
          return f;
        }
        return f + 1;
      });
    }, 75);
    return () => clearInterval(id);
  }, [reduced]);

  const settled = reduced || frame >= FRAMES;
  return (
    <span aria-hidden className="hallucination absolute inset-0 text-ink">
      {settled ? hallucinated(text) : scrambled(text, frame)}
    </span>
  );
}

interface HallucinateProps {
  /** The real text (also what the glitch layer scrambles). */
  text: string;
  /** Optional custom rendering of the real text (e.g. per-word spans). */
  children?: ReactNode;
  /** Classes for the real-text layer. */
  className?: string;
}

export default function Hallucinate({ text, children, className }: HallucinateProps) {
  const { isSystemBroken } = useDebug();
  return (
    <span className="relative block">
      <span className={cn(className, isSystemBroken && "opacity-0")}>{children ?? text}</span>
      {isSystemBroken && <GlitchLayer text={text} />}
    </span>
  );
}
