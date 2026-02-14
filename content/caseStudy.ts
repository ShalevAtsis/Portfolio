/**
 * Production System Case Study — SwellSight.
 * Aligned with SwellSight_README.md: 3-stage pipeline, sim-to-real, real metrics.
 */

export const caseStudy = {
  sectionTitle: "Production System Case Study",
  sectionSubtitle: "From idea to scalable AI system",
  systemName: "SwellSight",
  systemTagline: "AI-powered wave analysis for surfers from beach cam footage.",

  intro: `I took one project end-to-end: problem definition, data pipeline, model design, and a clear path to production. Below is how I think about the system — architecture, decisions, tradeoffs, and what we'd do next at scale.`,

  overview: `SwellSight ingests beach cam imagery (1920×1080 to 4K), runs a three-stage pipeline: (A) depth extraction with Depth-Anything-V2 for geometry-aware representations, (B) optional synthetic data generation with FLUX.1-dev + ControlNet for training data, (C) a DINOv2-based multi-task wave analyzer (RGB + depth) that outputs wave height (m), direction (left/right/straight), and breaking type (spilling/plunging/surging) with confidence scores. Training is sim-to-real: pre-train on 500+ synthetic images with perfect labels, then fine-tune on ~700 real labeled beach cam frames. Current results: 0.18m MAE height, 92% direction accuracy, 89% breaking type; ~45ms inference per image.`,

  deepDive: {
    architecture: {
      title: "Architecture overview",
      body: `Three-stage hybrid pipeline. Stage A (Depth): Depth-Anything-V2-Large, 518×518 input → normalized depth maps; preserves wave geometry for downstream use. Stage B (Synthetic factory, training only): FLUX.1-dev + ControlNet-Depth generates 1024×1024 labeled synthetic images from depth + text prompts (weather/lighting); used to create 500+ training samples with perfect labels. Stage C (Wave analyzer): DINOv2 ViT backbone (frozen) with 4-channel input (RGB + depth), multi-task heads — regression for height (0.5–8m), classification for direction (3 classes) and breaking type (4 classes). Inference path: beach cam → depth extraction → wave analyzer → structured metrics + confidence. Pipeline is modular so we can swap or upgrade stages (e.g., different depth model or analyzer backbone).`,
    },
    dataFlow: {
      title: "Data flow",
      body: `Training: Real beach cams → depth extraction → depth maps; depth + prompts → FLUX+ControlNet → synthetic images + automatic labels. Synthetic and real datasets → preprocessing (Albumentations, no geometric scaling to preserve height scale) → DINOv2 analyzer (4-channel) → loss (Smooth L1 for height, cross-entropy for direction and breaking). Inference: RGB image → Depth-Anything-V2 → depth map; RGB + depth → analyzer → wave_height_m, direction, breaking_type, confidence scores. Config-driven; data and model versions tracked for reproducibility.`,
    },
    decisions: {
      title: "Key engineering decisions",
      body: `(1) Sim-to-real: Labeled real wave data is scarce and expensive; we use FLUX+ControlNet to generate diverse synthetic data with perfect labels, then fine-tune on ~700 real images. (2) Depth as geometry signal: Depth-Anything-V2 gives a consistent 518×518 representation and preserves wave shape; 4-channel (RGB+depth) input lets the analyzer use both appearance and geometry. (3) DINOv2 backbone frozen: Self-supervised pretraining transfers well; we only train task heads to speed iteration and reduce overfitting on small real data. (4) PyTorch + config-driven runs: All stages in one codebase; config files for model paths, hyperparameters, and data paths so training and inference are reproducible.`,
    },
    tradeoffs: {
      title: "Tradeoffs",
      body: `Accuracy vs. latency: Depth-Anything-V2 is ~400ms per image, analyzer ~200ms; E2E ~600ms on RTX 3080. For real-time dashboards we'd consider smaller depth models or cached depth. Model size vs. deployment: DINOv2-base and FLUX are GPU-heavy; for edge or low-cost serving we'd look at distillation, ONNX export, or a smaller analyzer. Synthetic quality vs. cost: FLUX+ControlNet gives high-quality labeled data but ~7s per image; we generate once and reuse. Real data: 700 images is enough for fine-tuning but more would help; we'd invest in collection and validation.`,
    },
    scaling: {
      title: "Bottlenecks and scaling",
      body: `Current bottlenecks: (1) Depth extraction is the slowest step (~400ms); batching or a lighter depth model would help. (2) Synthetic generation is offline-only; scaling training data means more GPU hours. (3) Single-GPU training; larger batches or multi-GPU would need code changes. Scaling strategy: Inference — horizontal replication of the pipeline behind a queue; precompute depth for live cams on a schedule if near-real-time is enough. Training — more synthetic runs in parallel; real data pipeline with versioning and automated fine-tuning when new labels arrive. We already have evaluation dashboards and metrics (MAE, accuracy, inference time) to track regressions.`,
    },
    monitoring: {
      title: "Monitoring and reliability",
      body: `Input distribution: Track resolution, time-of-day, and basic image stats for beach cams; alert if distribution shifts (e.g., new camera or format). Model performance: Log predictions and, where we have labels, MAE and accuracy over time; we have an evaluation dashboard (metrics, confusion matrices, training curves) for offline checks. Pipeline health: Success/failure rates per stage (depth, analyzer), latency percentiles (target: analyzer ~45ms, E2E <1s with current depth). Confidence calibration is measured (ECE, Brier); we'd surface low-confidence or outlier predictions for review. No over-engineering for a research prototype — but the same habits (logging, config, reproducible training) carry to production.`,
    },
    future: {
      title: "Future production improvements",
      body: `(1) REST API: Wrap pipeline in FastAPI with auth, rate limits, and input validation; we have an api/server.py scaffold. (2) ONNX export for the analyzer (and optionally depth) to test CPU/edge inference and reduce dependency on PyTorch at serve time. (3) More real data: Expand beyond ~700 labeled frames; automated or semi-automated labeling where possible. (4) A/B or shadow mode: Run new model versions alongside current and compare metrics before cutover. (5) Caching: For fixed cameras, cache depth or full results on a schedule to reduce live compute. (6) Evaluation dashboard is already in place; hook it into CI or a periodic job to catch regressions.`,
    },
  },
} as const;
