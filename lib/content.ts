/**
 * Single source of truth for career content shown on the site.
 * Keep in sync with tests/portfolio.spec.ts (EXPERIENCE_JOBS / EXPERIENCE_COMPANIES).
 */

export type EntryKind = "work" | "education";

export interface TimelineEntry {
  id: string;
  kind: EntryKind;
  role: string;
  org: string;
  period: string;
  badge?: string;
  bullets: string[];
}

export const SITE_TITLE = "Software Engineer · AI Engineer";

export const EXPERIENCE: TimelineEntry[] = [
  {
    id: "highlander",
    kind: "work",
    role: "QA AI Automation Engineer",
    org: "High Lander",
    period: "Sep 2026 – Present",
    badge: "Current",
    bullets: [
      "AI-driven quality engineering for autonomous aviation — uncrewed airspace management (UTM) platforms where safety is mission-critical.",
      "Validate AI and computer-vision algorithms and real-time decision engines before they reach live airspace.",
      "Build E2E, API, and system test frameworks in Playwright, TypeScript, and Python, wired into CI/CD and MLOps quality gates.",
    ],
  },
  {
    id: "jifiti-automation",
    kind: "work",
    role: "Automation Engineer",
    org: "Jifiti",
    period: "Oct 2025 – Sep 2026",
    bullets: [
      "Built Playwright and TypeScript E2E and system test suites for a high-availability Fintech SaaS platform.",
      "Cut manual regression time by 30% by automating the critical release flows.",
      "Integrated the suites into CI/CD so every build is verified before it ships.",
    ],
  },
  {
    id: "jifiti-support",
    kind: "work",
    role: "Tier 2 Software Support Engineer",
    org: "Jifiti",
    period: "Aug 2025 – Sep 2026",
    bullets: [
      "Investigated production incidents from initial triage to root cause using SQL, deep log analysis, and API testing.",
      "Built Python analytics tools to surface business insights from transaction and traffic data.",
      "Set up proactive monitoring and alerting, working with R&D through Jira in an Agile squad.",
    ],
  },
  {
    id: "hit",
    kind: "education",
    role: "B.Sc. Computer Science",
    org: "Holon Institute of Technology (HIT)",
    period: "Oct 2023 – Jun 2026",
    badge: "Honor Graduate · GPA 94",
    bullets: [
      "Specialised in Artificial Intelligence and Computer Vision — coursework spanned Deep Learning, Algorithms, Databases, and Communication Networks.",
      "Applied classroom ML theory directly to side projects: PyTorch, OpenCV, diffusion models, and real-world data pipelines.",
    ],
  },
  {
    id: "hartech",
    kind: "work",
    role: "Software QA Engineer",
    org: "Hartech Technologies",
    period: "Nov 2021 – Dec 2022",
    bullets: [
      "Ran 50+ field tests across international sites for drone (UAV) and UGV Command-and-Control (C4I) software.",
      "Delivered on-site client training and system integration in multiple countries, including a Royal Thai Navy demo in Phuket.",
      "Identified and resolved defects in C2 systems alongside cross-functional engineering teams.",
    ],
  },
  {
    id: "navy",
    kind: "work",
    role: "Command and Control System Operator",
    org: "Israeli Navy",
    period: "Feb 2019 – Oct 2021",
    bullets: [
      "Operated radar, sonar, and electronic warfare systems aboard a 3rd Fleet corvette in real-time operational conditions.",
      "Coordinated multi-platform intelligence integration with Air Force units (UAVs, jets) under pressure.",
      "Commanded a 70-person crew and a 14-person specialist platoon — accountability was non-negotiable.",
    ],
  },
];
