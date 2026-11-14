"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, Code2, GitMerge, Server, ShieldCheck, Waves } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { CARD_SURFACE } from "@/components/ui/BentoCard";
import ButtonLink from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import ProjectCard, { RepoMeta, SkillChip } from "@/components/shared/ProjectCard";
import { PROJECTS } from "@/lib/content";
import type { GitHubRepo } from "@/lib/github";
import { useMediaQuery, useReducedMotionSafe } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const ICONS: Record<string, ReactNode> = {
  swellsight: <Waves className="h-5 w-5" strokeWidth={1.75} />,
  anomalyze: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
  "tcp-chat": <Server className="h-5 w-5" strokeWidth={1.75} />,
  devops: <GitMerge className="h-5 w-5" strokeWidth={1.75} />,
  "titanic-ml": <BrainCircuit className="h-5 w-5" strokeWidth={1.75} />,
  leetcode: <Code2 className="h-5 w-5" strokeWidth={1.75} />,
};

const [SWELLSIGHT, ...OTHER_PROJECTS] = PROJECTS;

const PIPELINE = [
  { step: "01", title: "Depth extraction", body: "Depth-Anything-V2 turns flat beach-cam frames into depth maps of the surf zone." },
  { step: "02", title: "Synthetic data", body: "FLUX.1 with ControlNet generates labelled waves for conditions no camera has captured yet." },
  { step: "03", title: "Real-time analysis", body: "A DINOv2 backbone reads height, direction, and breaking type from live footage." },
];

// ─── SwellSight showpiece ─────────────────────────────────────────────────────

/** Stylised "wave analysis" panel: contour lines + a scan line. Decorative. */
function WaveVisual() {
  return (
    <div
      aria-hidden="true"
      className="ocean-gradient relative aspect-[4/3] w-full overflow-hidden rounded-card border border-hairline lg:aspect-auto lg:h-[26rem]"
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" fill="none" className="absolute inset-0 h-full w-full text-accent">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M0 ${90 + i * 30} C 60 ${60 + i * 30}, 120 ${120 + i * 30}, 200 ${90 + i * 30} S 340 ${60 + i * 30}, 400 ${90 + i * 30}`}
            stroke="currentColor"
            strokeOpacity={0.9 - i * 0.11}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
        beach-cam · live
      </div>
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2 font-mono text-[11px] text-white">
        {[
          ["height", "1.4 m"],
          ["direction", "WNW"],
          ["break", "spilling"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md">
            <div className="text-white/70">{k}</div>
            <div className="mt-0.5 text-sm font-medium">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SwellSightShowcase({ repo }: { repo?: GitHubRepo }) {
  return (
    <Reveal>
      <article data-project-card className={cn(CARD_SURFACE, "overflow-visible rounded-card-lg p-6 md:p-10")}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* The visual stays pinned while the pipeline scrolls past it. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <WaveVisual />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                {ICONS.swellsight}
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Featured · Computer Vision</p>
            </div>
            <h3 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">{SWELLSIGHT.name}</h3>
            <div className="mt-3">
              <RepoMeta repo={repo} />
            </div>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-2">{SWELLSIGHT.description}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">direction accuracy</dt>
                <dd className="text-6xl font-semibold tracking-[-0.04em] text-ink md:text-7xl">
                  <CountUp to={92} suffix="%" />
                </dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-ink-2">models in the sim-to-real pipeline</dt>
                <dd className="text-6xl font-semibold tracking-[-0.04em] text-ink md:text-7xl">
                  <CountUp to={3} />
                </dd>
              </div>
            </dl>

            <ol className="mt-10 space-y-4">
              {PIPELINE.map((item, i) => (
                <Reveal as="li" key={item.step} delay={i * 0.08}>
                  <div className="rounded-card-sm border border-hairline bg-ink/[0.04] p-5">
                    <p className="font-mono text-xs text-accent">{item.step}</p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.01em] text-ink">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="SwellSight tech stack">
              {SWELLSIGHT.skills.map((skill) => (
                <SkillChip key={skill} label={skill} />
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink variant="link" href={SWELLSIGHT.url} external aria-label="View SwellSight on GitHub">
                View source on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// ─── Pinned horizontal gallery (desktop) ──────────────────────────────────────

function HorizontalGallery({ repos }: { repos: Map<string, GitHubRepo> }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  // Horizontal travel = how much wider the track is than the viewport.
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const observer = new ResizeObserver(() => {
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    });
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Keyboard users: when focus lands on an off-screen card, scroll the page to
  // the matching position instead of letting the browser shift the track.
  const onFocus = (e: React.FocusEvent<HTMLUListElement>) => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-gallery-item]");
    if (!outer || !viewport || !card) return;
    viewport.scrollLeft = 0;
    const cardCentre = card.offsetLeft + card.offsetWidth / 2;
    const travel = Math.min(distance, Math.max(0, cardCentre - viewport.clientWidth / 2));
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    scrollToTarget(outerTop + travel, { immediate: true });
  };

  return (
    <div ref={outerRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div ref={viewportRef} className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden">
        <Container className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">More builds</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-ink md:text-4xl">
              Systems, security, and the fundamentals.
            </p>
          </div>
          {/* Progress of the horizontal journey */}
          <div aria-hidden className="mb-2 hidden h-0.5 w-40 overflow-hidden rounded-full bg-ink/15 xl:block">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
          </div>
        </Container>
        <motion.ul
          ref={trackRef}
          role="list"
          onFocus={onFocus}
          className="flex w-max gap-6 px-[max(1.5rem,calc((100vw-1100px)/2+2rem))]"
          style={{ x }}
        >
          {OTHER_PROJECTS.map((project) => (
            <li key={project.id} data-gallery-item className="h-[min(27rem,58vh)] w-[min(32rem,80vw)] shrink-0">
              <ProjectCard project={project} repo={repos.get(project.repo)} icon={ICONS[project.id]} />
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CleanProjects({ repos }: { repos: GitHubRepo[] }) {
  const reduced = useReducedMotionSafe();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const pinned = isDesktop && !reduced;
  const repoByName = new Map(repos.map((repo) => [repo.name, repo]));

  return (
    <Section id="projects" bleed>
      <Container>
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          lede="A selection of personal and academic builds, from computer-vision pipelines to cloud infrastructure."
        />
        <SwellSightShowcase repo={repoByName.get(SWELLSIGHT.repo)} />
      </Container>

      {pinned ? (
        // Vertical scroll drives the horizontal translate.
        <HorizontalGallery repos={repoByName} />
      ) : (
        <Container className="mt-6">
          <ul role="list" className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {OTHER_PROJECTS.map((project, i) => (
              <Reveal as="li" key={project.id} delay={(i % 2) * 0.08}>
                <ProjectCard project={project} repo={repoByName.get(project.repo)} icon={ICONS[project.id]} />
              </Reveal>
            ))}
          </ul>
        </Container>
      )}
    </Section>
  );
}
