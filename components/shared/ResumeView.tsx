"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { asset } from "@/lib/basePath";
import { CV_FILENAME, CV_PATH } from "@/lib/contact";
import { BUTTON_VARIANTS, FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const PDF_PATH = asset(CV_PATH);

/**
 * Resume view. Keeps its own document-style "paper" look: a light sheet on a
 * neutral desk, independent of the portfolio's dark / light theme.
 */
export default function ResumeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen bg-paper-bg pt-[52px] text-paper-text"
    >
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <div className="no-print sticky top-[52px] z-40 border-b border-paper-border bg-paper-surface/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
            <div className="flex items-center gap-2.5 text-paper-muted">
              <FileText className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              <h1 className="text-sm font-medium text-paper-text">Interactive Resume</h1>
            </div>
            <a
              href={PDF_PATH}
              download={CV_FILENAME}
              aria-label="Download resume PDF"
              className={cn(BUTTON_VARIANTS.primary, FOCUS_RING, "min-h-10 px-5 py-2 text-sm focus-visible:ring-offset-white")}
            >
              <Download className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              Download PDF
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          {/* <object> lets the browser render the PDF inline; the inner block is the
              fallback for browsers that cannot (iOS Safari, some Android browsers). */}
          <object
            data={PDF_PATH}
            type="application/pdf"
            aria-label="Shalev Atsis resume PDF"
            className="w-full rounded-2xl border border-paper-border bg-paper-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
            style={{ height: "calc(100vh - 180px)", minHeight: "600px" }}
          >
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-paper-surface px-6 py-20 text-center">
              <FileText className="h-12 w-12 text-paper-muted" strokeWidth={1} aria-hidden />
              <div>
                <p className="font-semibold text-paper-text">Your browser doesn&apos;t support inline PDF viewing.</p>
                <p className="mt-1 text-sm text-paper-muted">
                  No problem:{" "}
                  <a href={PDF_PATH} download={CV_FILENAME} className="font-medium text-[#0066cc] underline underline-offset-2">
                    click here to download the PDF
                  </a>{" "}
                  and open it in your preferred reader.
                </p>
              </div>
            </div>
          </object>
        </div>
      </main>
    </motion.div>
  );
}
