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

// ─── Skills ───────────────────────────────────────────────────────────────────

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "qa",
    title: "Test Automation & QA",
    blurb: "What I do every day: proving that complex, safety-critical systems behave.",
    skills: ["Playwright", "E2E Testing", "API Testing", "Page Object Model", "Selenium", "CI Quality Gates", "Postman", "Jira"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    blurb: "From training models to validating them in the real world.",
    skills: ["PyTorch", "OpenCV", "HuggingFace", "Scikit-learn", "GenAI", "Diffusion Models", "Computer Vision", "Deep Learning"],
  },
  {
    id: "lang",
    title: "Programming",
    blurb: "Languages and libraries I reach for first.",
    skills: ["Python", "TypeScript", "Java", "C++", "SQL", "JavaScript", "NumPy", "Pandas", "Matplotlib", "React", "Node.js"],
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    blurb: "Shipping safely and repeatably.",
    skills: ["AWS", "Docker", "CI/CD Pipelines", "Jenkins", "MongoDB", "Git", "MLOps"],
  },
  {
    id: "concepts",
    title: "Concepts & Soft Skills",
    blurb: "How I think and work with people.",
    skills: ["Data Structures", "Algorithms", "OOP", "System Design", "Agile Methodologies", "Communication Networks", "Analytical Thinking", "Team Collaboration", "Fast Learning"],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectData {
  id: string;
  /** GitHub repository name (joins with live data from lib/github.ts). */
  repo: string;
  name: string;
  description: string;
  url: string;
  skills: string[];
}

export const PROJECTS: ProjectData[] = [
  {
    id: "swellsight",
    repo: "SwellSight_Colab",
    name: "SwellSight",
    description:
      "AI-powered system that analyzes beach cam footage to extract wave height, direction, and breaking type. Features a sim-to-real pipeline using Depth-Anything-V2 for depth extraction, FLUX.1 for synthetic data generation, and DINOv2 for real-time analysis, achieving 92% direction accuracy across diverse weather conditions.",
    url: "https://github.com/ShalevAtsis/SwellSight_Colab",
    skills: ["Python", "PyTorch", "DINOv2", "OpenCV", "HuggingFace", "ControlNet"],
  },
  {
    id: "anomalyze",
    repo: "Anomalyze",
    name: "Anomalyze",
    description:
      "Advanced AI-powered web security scanner that detects vulnerabilities, misconfigurations, and anomalies in web applications. Integrates ML-based analysis, CVE intelligence, and automated audits to deliver comprehensive, real-time security insights through an intuitive, analytics-driven dashboard.",
    url: "https://github.com/ShalevAtsis/Anomalyze",
    skills: ["React", "Node.js", "Docker", "Express", "MongoDB", "DevSecOps"],
  },
  {
    id: "tcp-chat",
    repo: "Multithreaded-TCP-Chat",
    name: "Multithreaded TCP Chat",
    description:
      "A multithreaded chat server implemented in Python using TCP sockets. Supports real-time communication between multiple clients with both private and broadcast messaging, session logging, and graceful shutdown.",
    url: "https://github.com/ShalevAtsis/Multithreaded-TCP-Chat",
    skills: ["Python", "TCP/IP", "Sockets", "Multithreading", "Client-Server"],
  },
  {
    id: "devops",
    repo: "DevOps-Project",
    name: "E2E DevOps Pipeline",
    description:
      "An automated end-to-end DevOps pipeline featuring CI/CD with Jenkins, cloud deployment on Render, UI automation with Selenium, and comprehensive performance benchmarking using Gatling.",
    url: "https://github.com/ShalevAtsis/DevOps-Project",
    skills: ["Jenkins", "Docker", "Selenium", "Gatling", "Tomcat", "CI/CD"],
  },
  {
    id: "titanic-ml",
    repo: "Machine-Learning-Flow",
    name: "Titanic ML Flow",
    description:
      "Machine Learning flow project predicting Titanic passenger survival using KNN, Decision Tree, and Naive Bayes. Features EDA, feature engineering, and model evaluation.",
    url: "https://github.com/ShalevAtsis/Machine-Learning-Flow",
    skills: ["Python", "Scikit-Learn", "Pandas", "Seaborn", "Classification"],
  },
  {
    id: "leetcode",
    repo: "LeetCode",
    name: "LeetCode Architecture",
    description:
      "A structured repository containing optimized solutions to various problems related to algorithms, data structures, and databases. Organized by problem number and category for efficient technical reference.",
    url: "https://github.com/ShalevAtsis/LeetCode",
    skills: ["Python", "C", "Algorithms", "Data Structures", "Graphs"],
  },
];
