import type { ReactNode } from "react";
import { Github, Star } from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";
import { FOCUS_RING } from "@/components/ui/Button";
import type { ProjectData } from "@/lib/content";
import type { GitHubRepo } from "@/lib/github";
import { cn } from "@/lib/cn";

export function SkillChip({ label }: { label: string }) {
  return (
    <li className="rounded-full border border-hairline bg-ink/[0.06] px-3 py-1 text-xs font-medium text-ink">{label}</li>
  );
}

/** Language + stars from the GitHub API (or the static fallback). */
export function RepoMeta({ repo }: { repo?: GitHubRepo }) {
  if (!repo?.language && !repo?.stargazers_count) return null;
  return (
    <p className="flex items-center gap-3 text-xs text-ink-2">
      {repo.language && (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          {repo.language}
        </span>
      )}
      {repo.stargazers_count > 0 && (
        <span className="inline-flex items-center gap-1" data-visual-mask>
          <Star className="h-3 w-3" strokeWidth={2} aria-hidden />
          <span className="sr-only">Stars:</span>
          {repo.stargazers_count}
        </span>
      )}
    </p>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  repo?: GitHubRepo;
  icon: ReactNode;
  className?: string;
}

export default function ProjectCard({ project, repo, icon, className }: ProjectCardProps) {
  return (
    <BentoCard interactive className={cn("h-full", className)}>
      <article data-project-card className="flex h-full flex-col gap-5 p-7 md:p-8">
        <div className="flex items-center justify-between">
          <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
            {icon}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full border border-hairline bg-ink/[0.06] px-4 text-sm font-medium text-ink transition-colors hover:bg-ink/[0.12]",
              FOCUS_RING
            )}
          >
            <Github className="h-4 w-4" strokeWidth={2} aria-hidden />
            Source
          </a>
        </div>

        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{project.name}</h3>
          <div className="mt-2">
            <RepoMeta repo={repo} />
          </div>
        </div>

        <p className="flex-1 text-[15px] leading-relaxed text-ink-2">{project.description}</p>

        <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
          {project.skills.map((skill) => (
            <SkillChip key={skill} label={skill} />
          ))}
        </ul>
      </article>
    </BentoCard>
  );
}
