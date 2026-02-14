"use client";

import { motion } from "framer-motion";
import { about } from "@/content/copy";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold text-cyber-text sm:text-3xl mb-10"
      >
        About
      </motion.h2>
      <div className="max-w-2xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-cyber-muted leading-relaxed"
        >
          {about.opening}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-cyber-muted leading-relaxed"
        >
          {about.proof}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-cyber-text font-medium leading-relaxed"
        >
          {about.closing}
        </motion.p>
      </div>
    </section>
  );
}
