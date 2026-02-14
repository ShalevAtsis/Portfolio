"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/content/copy";

const c = projects.swellSight;

export default function SwellSightCard() {
  const [showThought, setShowThought] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative col-span-full overflow-hidden rounded-2xl border border-cyber-border/50 bg-cyber-surface/60 p-8 backdrop-blur-xl md:col-span-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-accent/10 to-cyber-emerald/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cyber-accent/20 text-cyber-accent shadow-glow">
          <WaveIcon />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-cyber-text">{c.title}</h3>
          <p className="mt-1 text-sm font-medium text-cyber-accent">{c.tag}</p>
          <p className="mt-2 text-cyber-muted">{c.description}</p>
          {c.thoughtProcess && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowThought(!showThought)}
                className="text-sm font-medium text-cyber-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent rounded"
              >
                {showThought ? "Hide" : "Why we built this & what we'd do next"}
              </button>
              {showThought && (
                <p className="mt-2 text-sm text-cyber-muted italic">
                  {c.thoughtProcess}
                </p>
              )}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-4">
            <Link
              href={c.repoUrl}
              target="_blank"
              rel="no-opener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyber-accent hover:underline"
            >
              {c.linkLabel}
              <span aria-hidden>→</span>
            </Link>
            {c.colabUrl && (
              <Link
                href={c.colabUrl}
                target="_blank"
                rel="no-opener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-cyber-muted hover:text-cyber-accent hover:underline"
              >
                Run in Colab
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function WaveIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M2 12c.5 2 2.5 4 5 4s4.5-2 5-4c.5-2 2.5-4 5-4s4.5 2 5 4" />
      <path d="M2 17c.5 2 2.5 4 5 4s4.5-2 5-4c.5-2 2.5-4 5-4s4.5 2 5 4" />
      <path d="M2 7c.5 2 2.5 4 5 4s4.5-2 5-4c.5-2 2.5-4 5-4s4.5 2 5 4" />
    </svg>
  );
}
