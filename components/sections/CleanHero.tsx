"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import ButtonLink, { FOCUS_RING } from "@/components/ui/Button";
import OceanBackdrop from "@/components/ui/OceanBackdrop";
import Hallucinate from "@/components/shared/Hallucinate";
import { asset } from "@/lib/basePath";
import { CV_FILENAME, CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { useContact, useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/cn";

const NAME = "Shalev Atsis";
const TITLE_WORDS: Array<{ text: string; accent?: boolean; separator?: boolean }> = [
  { text: "Software" },
  { text: "Engineer" },
  { text: "·", separator: true },
  { text: "AI", accent: true },
  { text: "Engineer", accent: true },
];

const ICON_LINK = cn(
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-ink/[0.06] text-ink backdrop-blur-md transition-[background-color,transform] duration-200 hover:bg-ink/[0.12] active:scale-95",
  FOCUS_RING
);

/**
 * Hero: the ocean behind a single confident statement.
 *
 * - The entrance is CSS-only (it runs before hydration); the <h1> is the LCP
 *   element and only ever animates `transform`, never opacity.
 * - On scroll the content scales to 0.9, fades and rises ("product recedes"),
 *   driven by MotionValues. Under reduced motion it simply scrolls away.
 */
export default function CleanHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const contact = useContact();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-28 text-center"
    >
      <OceanBackdrop variant="hero" scroll={scrollYProgress} />
      {/* Scrim keeps text contrast above 4.5:1 over the moving water. */}
      <div aria-hidden className="hero-scrim pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
        style={reduced ? undefined : { scale, opacity, y }}
      >
        <div className="hero-fade">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[13px] font-medium text-ink">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-[#30d158]" />
            </span>
            Open To Opportunities
          </span>
        </div>

        <h1 className="mt-8 text-display font-bold tracking-[-0.045em] text-ink">
          <Hallucinate text={NAME}>
            {NAME.split(" ").map((word, i) => (
              <span key={word}>
                <span className="hero-word text-gradient pb-[0.08em]" style={{ animationDelay: `${i * 110}ms` }}>
                  {word}
                </span>
                {i === 0 ? " " : null}
              </span>
            ))}
          </Hallucinate>
        </h1>

        <p className="mt-5 text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl md:text-4xl">
          {TITLE_WORDS.map(({ text, accent, separator }, i) => (
            <span key={i}>
              <span
                className={cn("hero-fade inline-block", accent && "text-accent", separator && "text-ink-2")}
                style={{ animationDelay: `${260 + i * 80}ms` }}
                aria-hidden={separator || undefined}
              >
                {text}
              </span>
              {i < TITLE_WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </p>

        <p
          className="hero-slide mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/85 sm:text-xl"
        >
          Building AI-driven quality engineering for autonomous aviation at High Lander. I turn AI research,
          computer vision, and test automation into software you can trust.
        </p>

        <div
          className="hero-fade mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          style={{ animationDelay: "760ms" }}
        >
          <ButtonLink
            href={contact.whatsapp}
            external
            aria-label="Message on WhatsApp"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
            WhatsApp Me
          </ButtonLink>
          <ButtonLink
            variant="secondary"
            href={asset(CV_PATH)}
            download={CV_FILENAME}
            aria-label="Download CV"
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
            Download CV
          </ButtonLink>
          <div className="flex items-center gap-3">
            <a href={contact.mailto} aria-label="Send email" className={ICON_LINK}>
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={ICON_LINK}>
              <Github className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={ICON_LINK}>
              <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center text-ink-2"
        style={reduced ? undefined : { opacity: cueOpacity }}
      >
        <ChevronDown className="h-6 w-6 animate-bounce motion-reduce:animate-none" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
