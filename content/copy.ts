/**
 * Portfolio copy — AI/ML positioning, recruiter-focused.
 * Tune tone and details to your voice.
 */

export const hero = {
  headline: "Building systems that learn.",
  subheadline:
    "Software Engineer shipping production systems today; building GenAI & ML projects on the side. B.Sc. CS (HIT). Targeting applied AI & ML engineering roles.",
  ctaPrimary: "See my AI work",
  currentlyLearning: "Currently: RAG, agentic systems & production ML.",
} as const;

export const about = {
  opening:
    "I'm Shalev — a software engineer with a sharp turn toward AI. I've spent the last few years in production support and QA, which taught me how systems fail and how to fix them. Now I'm focused on building the kind of systems that learn: applied ML, GenAI, and LLM-based products.",
  proof: "I co-built SwellSight — an AI system that analyzes beach cam footage to give surfers objective wave metrics (height, direction, breaking type). We used a three-stage pipeline: depth extraction, a synthetic data factory (FLUX + ControlNet) to overcome label scarcity, and a DINOv2-based analyzer. Sim-to-real training; results at 0.18m MAE and 92% direction accuracy. I'm pushing toward production ML and LLM applications.",
  closing:
    "I'm looking for my first role where I can ship ML end-to-end and learn from teams that build at scale.",
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
  headline: "Let's talk.",
  line: "I'm actively looking for roles in AI engineering, applied ML, and LLM-based systems. If that's your team — say hi.",
  ctaLabel: "Email me",
  ctaHref: "mailto:Shalevatsis@gmail.com",
  resumeHint: "Prefer a one-pager? Use the Resume view above.",
} as const;
