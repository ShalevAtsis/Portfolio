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
        transition={{ duration: 0.4 }}
        className="max-w-xl"
      >
        <h2 className="text-2xl font-bold text-cyber-text sm:text-3xl">
          {contact.headline}
        </h2>
        <p className="mt-4 text-cyber-muted leading-relaxed">
          {contact.line}
        </p>
        <a
          href={contact.ctaHref}
          className="mt-6 inline-flex rounded-full bg-cyber-accent px-6 py-3 text-sm font-semibold text-cyber-bg shadow-glow transition hover:bg-cyber-accentDim focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
        >
          {contact.ctaLabel}
        </a>
        <p className="mt-4 text-sm text-cyber-muted">
          {contact.resumeHint}
        </p>
      </motion.div>
    </section>
  );
}
