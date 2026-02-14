"use client";

import BugTrigger from "./BugTrigger";

export default function Footer() {
  return (
    <footer className="relative border-t border-cyber-border/30 py-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-cyber-muted/70">
          © {new Date().getFullYear()} Shalev Atsis
        </p>
        <BugTrigger />
      </div>
    </footer>
  );
}
