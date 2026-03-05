/**
 * Centralized component prop types and interfaces
 */

import type { ReactNode, CSSProperties } from "react";

// ─── UI Components ────────────────────────────────────────────────────────────

export interface HoverEffectCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Card-specific accent colour for the spotlight centre — RGBA string */
  spotlightColor?: string;
}

export interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

// ─── Layout Components ────────────────────────────────────────────────────────

export interface BackgroundMatrixProps {
  children: ReactNode;
  className?: string;
}

// ─── Shared Components ────────────────────────────────────────────────────────

export type ContactColor =
  | "whatsapp" // green
  | "email" // indigo
  | "linkedin" // blue
  | "github" // slate
  | "phone" // amber
  | "download" // indigo (CV)
  | "default"; // slate

export type ContactVariant = "icon" | "full";

export interface ContactButtonProps {
  href: string;
  icon: ReactNode;
  label: string;
  description?: string; // shown only in "full" variant
  color?: ContactColor;
  variant?: ContactVariant;
  external?: boolean; // adds target="_blank" rel="noopener noreferrer"
  className?: string;
}

export interface PortfolioViewProps {
  repos: any[]; // GitHubRepo type from lib/github
}

export interface ProvidersProps {
  children: ReactNode;
}

// ─── Project Card ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  skills: string[];
  /** A lucide-react icon element rendered in the card header */
  icon?: ReactNode;
  /** Optional override for the spotlight colour */
  accentColor?: string;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}
