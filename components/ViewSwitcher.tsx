"use client";

import type { GitHubRepo } from "@/lib/github";
import { useView } from "@/context/ViewContext";
import PortfolioView from "@/components/PortfolioView";
import ResumeView from "@/components/ResumeView";

interface ViewSwitcherProps {
  repos: GitHubRepo[];
}

/**
 * ViewSwitcher
 * ─────────────
 * Reads the current view mode from ViewContext and renders either
 * the main portfolio or the resume/PDF viewer. The Navbar's resume
 * toggle button calls toggleMode() from the same context.
 */
export default function ViewSwitcher({ repos }: ViewSwitcherProps) {
  const { isResumeMode } = useView();
  return isResumeMode ? <ResumeView /> : <PortfolioView repos={repos} />;
}
