"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { caseStudy } from "@/content/caseStudy";

const DEEP_DIVE_KEYS = [
  "architecture",
  "dataFlow",
  "decisions",
  "tradeoffs",
  "scaling",
  "monitoring",
  "future",
] as const;

type DeepDiveKey = (typeof DEEP_DIVE_KEYS)[number];

function ArchitectureDiagram() {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-cyber-border/50 bg-cyber-bg/80 p-6">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-cyber-muted">
        Inference flow (SwellSight)
      </p>
      <svg
        viewBox="0 0 640 120"
        className="mx-auto h-auto w-full max-w-xl"
        aria-hidden
      >
        <defs>
          <linearGradient id="csGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
          <marker id="csArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <polygon points="0,0 8,4 0,8" fill="rgba(6,182,212,0.6)" />
          </marker>
        </defs>
        {/* Beach cam input */}
        <rect x="20" y="40" width="90" height="40" rx="6" fill="url(#csGrad)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
        <text x="65" y="62" textAnchor="middle" fill="currentColor" fontSize="10">Beach cam</text>
        <text x="65" y="74" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.8">RGB image</text>
        <line x1="115" y1="60" x2="148" y2="60" stroke="rgba(6,182,212,0.6)" strokeWidth="2" markerEnd="url(#csArrow)" />
        {/* Depth extraction */}
        <rect x="155" y="40" width="90" height="40" rx="6" fill="url(#csGrad)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
        <text x="200" y="62" textAnchor="middle" fill="currentColor" fontSize="10">Depth</text>
        <text x="200" y="74" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.8">Depth-Anything-V2</text>
        <line x1="250" y1="60" x2="283" y2="60" stroke="rgba(6,182,212,0.6)" strokeWidth="2" markerEnd="url(#csArrow)" />
        {/* Wave analyzer */}
        <rect x="290" y="35" width="100" height="50" rx="6" fill="url(#csGrad)" stroke="rgba(16,185,129,0.5)" strokeWidth="1" />
        <text x="340" y="52" textAnchor="middle" fill="currentColor" fontSize="10">Wave analyzer</text>
        <text x="340" y="66" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.8">DINOv2 + heads</text>
        <line x1="395" y1="60" x2="428" y2="60" stroke="rgba(6,182,212,0.6)" strokeWidth="2" markerEnd="url(#csArrow)" />
        {/* Output */}
        <rect x="435" y="40" width="110" height="40" rx="6" fill="url(#csGrad)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="currentColor" fontSize="10">Metrics</text>
        <text x="490" y="74" textAnchor="middle" fill="currentColor" fontSize="8" opacity="0.8">height · direction · breaking</text>
      </svg>
    </div>
  );
}

function DeepDiveBlock({
  id,
  title,
  body,
  isOpen,
  onToggle,
}: {
  id: DeepDiveKey;
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-cyber-border/50 bg-cyber-surface/40 rounded-lg overflow-hidden backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition hover:bg-cyber-surface/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-cyber-text">{title}</span>
        <span
          className={`shrink-0 text-cyber-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-cyber-border/50 px-4 py-3 text-sm text-cyber-muted leading-relaxed">
              {body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductionCaseStudySection() {
  const [openKey, setOpenKey] = useState<DeepDiveKey | null>("architecture");

  return (
    <section id="case-study" className="py-20 sm:py-28 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-cyber-accent/20 px-2 py-0.5 text-xs font-medium text-cyber-accent">
            Design doc
          </span>
        </div>
        <h2 className="text-2xl font-bold text-cyber-text sm:text-3xl">
          {caseStudy.sectionTitle}
        </h2>
        <p className="mt-1 text-cyber-accent font-medium">
          {caseStudy.sectionSubtitle}
        </p>
        <p className="mt-4 max-w-2xl text-cyber-muted leading-relaxed">
          {caseStudy.intro}
        </p>
        <p className="mt-4 max-w-2xl text-cyber-muted leading-relaxed text-sm">
          <strong className="text-cyber-text">{caseStudy.systemName}.</strong>{" "}
          {caseStudy.overview}
        </p>

        <ArchitectureDiagram />

        <p className="mb-4 text-xs font-medium uppercase tracking-wider text-cyber-muted">
          Expand for details
        </p>
        <div className="space-y-2">
          {DEEP_DIVE_KEYS.map((key) => (
            <DeepDiveBlock
              key={key}
              id={key}
              title={caseStudy.deepDive[key].title}
              body={caseStudy.deepDive[key].body}
              isOpen={openKey === key}
              onToggle={() => setOpenKey((prev) => (prev === key ? null : key))}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
