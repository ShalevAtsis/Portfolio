/**
 * Navbar — Pure Server Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout: [≡ burger]     Shalev Atsis     [GH · LI · ✉ · WA | ☀ | ◉—]
 *
 * Icon palette:  unified neutral at rest → brand color on hover only.
 * No "use client" here — zero JS hydration cost for the header shell.
 */

import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";
import ThemeToggle from "@/components/ThemeToggle";
import DualModeToggle from "@/components/DualModeToggle";

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const WHATSAPP_URL = "https://wa.me/+972585060699";

// ─── Base icon button ────────────────────────────────────────────────────────
// All icons start neutral; each gets its own brand hover class below.
const BASE = "inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 transition-[color,background,transform] duration-150 hover:scale-[1.08] active:scale-90";

// ─── Separator ───────────────────────────────────────────────────────────────
const SEP = <span className="mx-1.5 h-5 w-px bg-slate-200 dark:bg-slate-800" aria-hidden />;

export default function Navbar() {
  return (
    <header className="animate-nav-slide-down fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
      <nav
        className="mx-auto grid w-full max-w-7xl grid-cols-3 items-center px-4 py-2 sm:px-6 lg:px-10"
        aria-label="Main navigation"
      >
        {/* ── Left: Burger ───────────────────────────────────────────── */}
        <div className="justify-self-start">
          <NavigationMenu />
        </div>

        {/* ── Center: Brand ──────────────────────────────────────────── */}
        <div className="justify-self-center">
          <Link
            href="/"
            className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-50 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400 sm:text-lg"
          >
            Shalev Atsis
          </Link>
        </div>

        {/* ── Right: Social icons → separator → Toggles ──────────────── */}
        {/* Group 1: social links — neutral → brand on hover             */}
        <div className="justify-self-end flex items-center gap-0.5">

          {/* GitHub → black/charcoal on hover */}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
            className={`${BASE} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50`}>
            <Github className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </a>

          {/* LinkedIn → #0A66C2 on hover */}
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
            className={`${BASE} hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-[#0A66C2] dark:hover:text-blue-400`}>
            <Linkedin className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </a>

          {/* Email → violet on hover */}
          <a href={EMAIL} aria-label="Send email"
            className={`${BASE} hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400`}>
            <Mail className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </a>

          {/* WhatsApp → emerald on hover */}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Message on WhatsApp"
            className={`${BASE} hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400`}>
            <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.75} />
          </a>

          {/* ── Separator → Utility toggles ── */}
          {SEP}

          {/* Theme toggle (☀ / ☽) */}
          <ThemeToggle />

          {/* View mode toggle (Portfolio ↔ Resume) */}
          <DualModeToggle />
        </div>
      </nav>
    </header>
  );
}