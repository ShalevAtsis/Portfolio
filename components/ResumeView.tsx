"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

const PDF_PATH = "/Shalev_Atsis_CV.pdf";
const PDF_FILENAME = "Shalev_Atsis_CV.pdf";

export default function ResumeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20"
    >
      {/* ── Sticky toolbar ──────────────────────────────────────────────── */}
      <div className="sticky top-[57px] z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 sm:px-8 lg:px-12">
          {/* Title */}
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-sm font-medium">Interactive Resume</span>
          </div>

          {/* Download CTA */}
          <motion.a
            href={PDF_PATH}
            download={PDF_FILENAME}
            aria-label="Download resume PDF"
            whileHover={{ scale: 1.04, boxShadow: "0 6px 20px -4px rgba(16,185,129,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            <Download className="h-4 w-4 shrink-0" strokeWidth={2} />
            Download PDF
          </motion.a>
        </div>
      </div>

      {/* ── PDF viewer ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-12">
        {/*
         * <object> gives browsers the most control over how to render the PDF.
         * The inner <p> is the fallback shown when inline rendering is not supported
         * (e.g. iOS Safari, some Android browsers).
         */}
        <object
          data={PDF_PATH}
          type="application/pdf"
          aria-label="Shalev Atsis resume PDF"
          className="w-full rounded-xl border border-slate-200 shadow-xl dark:border-slate-800"
          style={{ height: "calc(100vh - 180px)", minHeight: "600px" }}
        >
          {/* ── Mobile / unsupported fallback ── */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-slate-100 py-20 text-center dark:bg-slate-900">
            <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" strokeWidth={1} />
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Your browser doesn&apos;t support inline PDF viewing.
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                No problem —{" "}
                <a
                  href={PDF_PATH}
                  download={PDF_FILENAME}
                  className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  click here to download the PDF
                </a>{" "}
                and open it in your preferred reader.
              </p>
            </div>
          </div>
        </object>
      </div>
    </motion.div>
  );
}
