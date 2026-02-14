"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useView } from "@/context/ViewContext";
import type { GitHubRepo } from "@/lib/github";
import PortfolioView from "./PortfolioView";
import ResumeView from "./ResumeView";

interface ViewSwitcherProps {
  repos: GitHubRepo[];
}

export default function ViewSwitcher({ repos }: ViewSwitcherProps) {
  const { isResumeMode } = useView();

  return (
    <AnimatePresence mode="wait">
      {isResumeMode ? (
        <motion.div
          key="resume"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ResumeView />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <PortfolioView repos={repos} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
