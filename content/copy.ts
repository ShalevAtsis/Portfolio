/**
 * Portfolio copy — AI/ML positioning, recruiter-focused.
 * Tune tone and details to your voice.
 */

export const hero = {
  headline: "Building Intelligent Software Solutions.",
  subheadline:
    "Motivated Software Engineer specializing in AI and Computer Vision. Passionate about developing reliable, maintainable software.",
  ctaPrimary: "See my AI work",
  currentlyLearning: "Currently: RAG, agentic systems & production ML.",
} as const;

export const about = {
  // P1 — Who I am right now
  opening:
    "I'm a Software Engineer in motion — simultaneously a Tier 2 Support Engineer at a high-availability Fintech SaaS company (Jifiti) and a Computer Science student at HIT, on track to graduate in 2026. Every week I debug production incidents by day and study algorithms by night. I genuinely enjoy both.",
  // P2 — What I'm passionate about
  proof:
    "My deep interest lies at the intersection of AI, Computer Vision, and robust backend engineering. Whether that's training a PyTorch model, querying a misbehaving database, or integrating an API that refuses to cooperate — I find backend puzzles energizing. I'm particularly excited by the way GenAI and diffusion models are reshaping what software can do, and I want to be close to that frontier.",
  // P3 — Diverse background as a differentiator
  closing:
    "My path to software wasn't a straight line. I led a 15-person platoon operating radar and EW systems at sea. I ran global field tests on drone software across four countries. Now I investigate high-stakes Fintech incidents under pressure. That arc means I'm a calm problem-solver, a fast learner in unfamiliar domains, and someone who has operated in high-stakes environments long before writing production code.",
} as const;

export const projects = {
  sectionTitle: "AI & systems work",
  sectionSubtitle: "Featured project and recent code.",
  swellSight: {
    title: "SwellSight",
    tag: "CV · GenAI · Sim-to-Real",
    description:
      "AI-powered wave analysis for surfers from beach cam footage. Three-stage pipeline: depth extraction (Depth-Anything-V2), synthetic data factory (FLUX.1-dev + ControlNet) for training, and a DINOv2-based multi-task wave analyzer. Outputs wave height, direction, and breaking type with confidence scores. Sim-to-real: generative AI creates labeled training data; model pre-trains on synthetic then fine-tunes on ~700 real labeled images.",
    thoughtProcess:
      "Why we built this: surfers rely on manual, subjective reads from distant cams; we wanted objective metrics and real-time analysis. Key decision: sim-to-real to overcome labeled data scarcity — FLUX+ControlNet generates diverse conditions with perfect labels; DINOv2 backbone + 4-channel (RGB+depth) handles real beach cams. Results: 0.18m MAE height, 92% direction, 89% breaking type; ~45ms inference. Next: REST API, ONNX export for edge, and more real-data collection.",
    linkLabel: "View on GitHub",
    colabUrl: "https://colab.research.google.com/drive/1YrqgS-ASdkxLKMhYFYFsA5aPPYNTJA77?usp=sharing",
    repoUrl: "https://github.com/ShalevAtsis/SwellSight_Colab",
  },
} as const;

export const lab = {
  sectionTitle: "Lab",
  sectionSubtitle: "Small builds and weekly explorations. Not always polished — always learning.",
  items: [
    {
      title: "SwellSight",
      description: "Beach cam → wave metrics for surfers. Depth-Anything-V2, FLUX+ControlNet synthetic data, DINOv2 multi-task analyzer. Sim-to-real training.",
      tech: "PyTorch, Depth-Anything-V2, FLUX.1-dev, ControlNet, DINOv2",
      href: "https://github.com/ShalevAtsis/SwellSight_Colab",
      status: "shipped" as const,
    },
    {
      title: "RAG & retrieval experiments",
      description: "Playing with retrieval-augmented flows and small docsets.",
      tech: "Python, LangChain / custom",
      href: "#",
      status: "in-progress" as const,
    },
    {
      title: "Dataset & metric viz",
      description: "Visualizing model outputs and metrics from papers and courses.",
      tech: "Python, Matplotlib, Pandas",
      href: "#",
      status: "in-progress" as const,
    },
  ],
} as const;

export const contact = {
  headline: "Let's build something together.",
  line: "Whether you're hiring, brainstorming, or just want to talk AI and backend architecture — my inbox is always open. No formal pleasantries required.",
  ctaLabel: "Send me an email",
  ctaHref: "mailto:Shalevatsis@gmail.com",
  resumeHint: "Prefer a one-pager? Use the Resume view above.",
} as const;
