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
  proof: "I built SwellSight (GenAI for ocean wave analysis) to go from idea to working model. I'm not just running tutorials — I'm shipping small end-to-end ML projects and pushing myself toward production ML and LLM applications.",
  closing:
    "I'm looking for my first role where I can ship ML end-to-end and learn from teams that build at scale.",
} as const;

export const projects = {
  sectionTitle: "AI & systems work",
  sectionSubtitle: "Featured project and recent code.",
  swellSight: {
    title: "SwellSight",
    tag: "GenAI · Computer Vision",
    description:
      "Generative model for ocean wave analysis — combining computer vision and deep learning for maritime and environmental use cases.",
    thoughtProcess:
      "Why I built this: to go end-to-end from problem definition to a real model. What I'd do next: add proper evaluation metrics and explore deployment (ONNX / small batch API).",
    linkLabel: "View on GitHub",
  },
} as const;

export const lab = {
  sectionTitle: "Lab",
  sectionSubtitle: "Small builds and weekly explorations. Not always polished — always learning.",
  items: [
    {
      title: "SwellSight",
      description: "GenAI + CV for ocean wave analysis. PyTorch, diffusion-style exploration.",
      tech: "PyTorch, OpenCV, Python",
      href: "https://github.com/ShalevAtsis",
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
