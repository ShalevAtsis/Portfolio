"use client";

import { motion } from "framer-motion";
import { contact } from "@/content/copy";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "rounded-3xl px-8 py-12 sm:px-12",
          "bg-slate-100 dark:bg-slate-900/50",
          "border border-slate-200/80 dark:border-slate-800/60",
        ].join(" ")}
      >
        {/* Headline */}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {contact.headline}
        </h2>

        {/* Sub-copy */}
        <p className="mt-4 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">
          {contact.line}
        </p>

        {/* Hint */}
        {contact.resumeHint && (
          <p className="mt-5 text-sm text-slate-400 dark:text-slate-500">
            {contact.resumeHint}
          </p>
        )}
      </motion.div>
    </section>
  );
}
