"use client";

const TECH_ITEMS = [
  "Python",
  "NumPy",
  "Pandas",
  "Java",
  "C++",
  "PyTorch",
  "GenAI",
  "SQL",
  "AWS",
  "Docker",
  "React",
  "TypeScript",
  "Next.js",
  "Git",
];

export default function TechMarquee() {
  const duplicated = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {duplicated.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="rounded-full border border-cyber-border/50 bg-cyber-surface/80 px-4 py-2 text-sm font-medium text-cyber-muted backdrop-blur-sm transition-colors hover:border-cyber-accent/50 hover:text-cyber-accent"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
