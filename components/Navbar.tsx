"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, MessageCircle, Mail,
  LayoutDashboard, FileText,
} from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { useView } from "@/context/ViewContext";
import { springSnappy } from "@/lib/motion";
import ContactButton from "@/components/ContactButton";

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_URL = "https://wa.me/+972585060699";
const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={springSnappy}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5" strokeWidth={1.75} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5" strokeWidth={1.75} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Portfolio/Resume mode toggle ─────────────────────────────────────────────

function DualModeToggle() {
  const { isResumeMode, toggleMode } = useView();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="View mode toggle">
      <LayoutDashboard
        className={`hidden h-4 w-4 sm:block ${isResumeMode ? "text-slate-400 dark:text-slate-600" : "text-indigo-500 dark:text-indigo-400"}`}
        strokeWidth={1.75}
        aria-hidden
      />
      <button
        type="button"
        role="switch"
        aria-checked={isResumeMode}
        aria-label={isResumeMode ? "Switch to Portfolio view" : "Switch to Resume view"}
        onClick={toggleMode}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${isResumeMode
          ? "border-slate-300 bg-slate-300 dark:border-slate-600 dark:bg-slate-600"
          : "border-indigo-400 bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-950"
          }`}
      >
        <motion.span
          animate={{ x: isResumeMode ? 18 : 0 }}
          transition={springSnappy}
          className={`pointer-events-none my-auto ml-0.5 inline-block h-4 w-4 rounded-full shadow-sm ${isResumeMode ? "bg-white dark:bg-slate-300" : "bg-indigo-500 dark:bg-indigo-400"
            }`}
        />
      </button>
      <FileText
        className={`hidden h-4 w-4 sm:block ${isResumeMode ? "text-slate-500 dark:text-slate-400" : "text-slate-300 dark:text-slate-600"}`}
        strokeWidth={1.75}
        aria-hidden
      />
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const { isResumeMode } = useView();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springSnappy}
      className={[
        "fixed inset-x-0 top-0 z-50",
        "border-b transition-colors duration-300",
        isResumeMode
          ? "border-slate-200 bg-white/90 text-slate-700 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-200"
          : "border-white/10 bg-white/80 text-slate-700 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80 dark:text-slate-200",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 md:px-12 lg:px-16"
        aria-label="Main navigation"
      >
        {/* ── Brand ── */}
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-slate-900 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400"
        >
          Shalev Atsis
        </Link>

        {/* ── Centre nav links — portfolio mode, md+ ── */}
        {!isResumeMode && (
          <div className="hidden items-center gap-6 text-sm md:flex">
            {["about", "experience", "skills", "projects", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="capitalize text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {id === "about" ? "About" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        )}

        {/* ── Right-hand actions ── */}
        <div className="flex items-center gap-1">

          {/* ── Theme Toggle ── */}
          <ThemeToggle />

          {/* Divider */}
          <span className="mx-1.5 hidden h-5 w-px bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden />

          {/* ── Social links (icon only) ── */}
          <ContactButton
            href={GITHUB_URL}
            icon={<Github className="h-5 w-5" strokeWidth={1.75} />}
            label="GitHub profile"
            color="github"
            variant="icon"
            external
          />
          <ContactButton
            href={LINKEDIN_URL}
            icon={<Linkedin className="h-5 w-5" strokeWidth={1.75} />}
            label="LinkedIn profile"
            color="linkedin"
            variant="icon"
            external
          />

          {/* Divider */}
          <span className="mx-1.5 hidden h-5 w-px bg-slate-200 dark:bg-slate-700 sm:block" aria-hidden />

          {/* ── Email (icon only on mobile, label on sm+) ── */}
          <motion.a
            href={EMAIL}
            aria-label="Send email"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-indigo-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:text-indigo-400 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50"
          >
            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Email</span>
          </motion.a>

          {/* ── WhatsApp — primary CTA ── */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp"
            whileHover={{ scale: 1.04, boxShadow: "0 6px 24px -4px rgba(16,185,129,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.a>

          {/* ── Dual-mode toggle ── */}
          <span className="mx-1.5 h-5 w-px bg-slate-200 dark:bg-slate-700" aria-hidden />
          <DualModeToggle />
        </div>
      </nav>
    </motion.header>
  );
}