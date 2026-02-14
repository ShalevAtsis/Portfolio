"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/lib/github";

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
}

export default function RepoCard({ repo, index }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="no-opener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="group block overflow-hidden rounded-xl border border-cyber-border/50 bg-cyber-surface/50 p-5 backdrop-blur-sm transition-all hover:border-cyber-accent/40 hover:shadow-glow"
    >
      <h4 className="font-semibold text-cyber-text group-hover:text-cyber-accent transition-colors">
        {repo.name}
      </h4>
      {repo.description && (
        <p className="mt-1 line-clamp-2 text-sm text-cyber-muted">
          {repo.description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {repo.language && (
          <span className="rounded bg-cyber-accent/20 px-2 py-0.5 text-xs text-cyber-accent">
            {repo.language}
          </span>
        )}
        <span className="text-xs text-cyber-muted">
          ★ {repo.stargazers_count}
        </span>
      </div>
    </motion.a>
  );
}
