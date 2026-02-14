# Production System Case Study — Design Rationale

This doc explains why the "Production System Case Study" section exists, how it influences hiring decisions, and what visual/interactive choices were made.

---

## 1. Section concept

**Idea:** One section that frames a single project (SwellSight) as a **system** — with architecture, data flow, engineering decisions, tradeoffs, scaling, monitoring, and a path to production. The content is written in the style of an internal design doc, not a project description.

**Why it impresses hiring managers:**

- **Pattern match:** They’re used to design docs and post‑mortems. Seeing that format on a portfolio signals “this person documents and thinks like we do.”
- **Depth over breadth:** One project explained in system terms beats a long list of shallow bullets. It shows you can go from “I built X” to “here’s how X is structured and how I’d run it at scale.”
- **Production mindset:** Sections on bottlenecks, monitoring, and future improvements show you think beyond the model: deployment, reliability, and iteration. That’s what separates a research prototype from someone who can ship in a product team.
- **Honest scope:** The copy is explicit that the current system is a research-grade prototype and that the “design below” is how you’d document it for a team. No fake scale or FAANG claims — just clear, credible engineering thinking.

---

## 2. Hiring manager psychology

**Why this section increases interview probability:**

1. **Reduces uncertainty.** Hiring managers ask: “Can this person work with our stack and our docs?” A section that looks like a real design doc answers: “Yes — they already write and think in this format.”
2. **Signals maturity.** Juniors often describe *what* they built. Staff-level thinking includes *why* (decisions, tradeoffs) and *what’s next* (monitoring, scaling, improvements). This section forces that structure.
3. **Differentiation.** Most portfolios stop at “Tech: PyTorch, Python.” This one adds: architecture, data flow, reliability, and production path. That makes you easy to remember in a pile of resumes.
4. **Conversation starter.** Interviewers can ask: “Walk me through your case study” or “How would you change this for 10x traffic?” You’ve already given them the outline; the interview becomes a technical discussion, not a guessing game.
5. **Role fit.** AI/backend roles care about systems, not only models. Showing you think about pipelines, config, logging, and deployment positions you for both ML and platform work.

**What makes them close a portfolio:** Generic project lists, no evidence of production thinking, or copy that feels inflated. This section is the opposite: specific, structured, and scoped to what you actually did and would do next.

---

## 3. Visual and interactive ideas (implemented and optional)

**Implemented:**

- **“Design doc” badge** — Small label so the section is immediately read as “internal doc style,” not marketing.
- **Architecture diagram (SVG)** — Simple data-flow: Input → Preprocess → Model (CV + Gen) → Output. No clutter; reinforces the written architecture and shows you can communicate visually.
- **Expandable deep-dive blocks** — Each topic (Architecture, Data flow, Decisions, Tradeoffs, Scaling, Monitoring, Future) is a collapsible block. Recruiters can skim the titles and open only what they care about; technical readers can go deep without a wall of text.
- **One block open by default** — “Architecture overview” opens first so the first impression is “this person structures systems,” not “this is a long essay.”

**Optional enhancements (if you want to go further):**

- **Sequence diagram** — For one flow (e.g. “single inference request”), a small sequence diagram: Client → API → Preprocess → Model → Response. Libraries like Mermaid (rendered to SVG) or a hand-coded SVG would work.
- **“Before / after” or “v1 → v2”** — If you iterate on SwellSight (e.g. add ONNX export), a short “Then vs now” or “What I’d change” with 2–3 bullets and a small diagram.
- **Metrics placeholder** — A fake or real “dashboard” thumbnail (e.g. “What I’d monitor: input distribution, latency p99, error rate”) as an image or simple React component. Signals that you think in terms of observability.
- **Copy-to-clipboard for “design doc”** — A button that copies the full deep-dive text as markdown. Gimmicky but memorable; only add if it fits your tone.

**What we avoided:** Heavy animation, 3D, or interactive “build your own pipeline” — the goal is credibility and clarity, not flash. The diagram and expandable blocks are enough to make the section feel interactive and professional.
