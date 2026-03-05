"use client";

import dynamic from "next/dynamic";
import type { GitHubRepo } from "@/lib/github";
import { useView } from "@/context/ViewContext";
import PortfolioView from "@/components/PortfolioView";
const ResumeView = dynamic(() => import("@/components/ResumeView"), { ssr: false });

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
