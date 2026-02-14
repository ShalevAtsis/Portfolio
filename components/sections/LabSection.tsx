"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { lab } from "@/content/copy";

function LabCardContent({
  item,
}: {
  item: (typeof lab.items)[number];
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-cyber-text">{item.title}</h3>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs ${
            item.status === "shipped"
              ? "bg-cyber-emerald/20 text-cyber-emerald"
              : "bg-cyber-accent/20 text-cyber-accent"
          }`}
        >
          {item.status === "shipped" ? "Shipped" : "In progress"}
        </span>
      </div>
      <p className="mt-2 text-sm text-cyber-muted">{item.description}</p>
      <p className="mt-2 text-xs text-cyber-accent">{item.tech}</p>
    </>
  );
}

export default function LabSection() {
  return (
    <section id="lab" className="py-20 sm:py-28 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold text-cyber-text sm:text-3xl">
          {lab.sectionTitle}
        </h2>
        <p className="mt-2 max-w-xl text-cyber-muted">
          {lab.sectionSubtitle}
        </p>
      </motion.div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lab.items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            {item.href && item.href !== "#" ? (
              <Link
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "no-opener noreferrer" : undefined}
                className="block rounded-xl border border-cyber-border/50 bg-cyber-surface/50 p-5 backdrop-blur-sm transition hover:border-cyber-accent/40 hover:shadow-glow"
              >
                <LabCardContent item={item} />
              </Link>
            ) : (
              <div className="block rounded-xl border border-cyber-border/50 bg-cyber-surface/50 p-5 backdrop-blur-sm">
                <LabCardContent item={item} />
              </div>
            )}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
