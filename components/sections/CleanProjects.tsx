"use client";

import type { Project } from "@/components/ProjectCard";
import ProjectCard from "@/components/ProjectCard";
import FadeInUp from "@/components/ui/FadeInUp";

// ─── Project data ─────────────────────────────────────────────────────────────
// Edit descriptions / skills here anytime; the grid renders automatically.

const PROJECTS: Project[] = [
    {
        id: "swellsight",
        name: "SwellSight",
        description:
            "AI-powered ocean wave analysis system utilizing GenAI and Computer Vision to extract critical metrics from beach camera footage.",
        url: "https://github.com/ShalevAtsis/SwellSight_Colab",
        skills: ["Python", "PyTorch", "OpenCV", "GenAI"],
        accentColor: "rgba(6,182,212,0.09)",   // cyan — CV / AI
    },
    {
        id: "anomalyze",
        name: "Anomalyze",
        description:
            "Machine learning pipeline for detecting anomalies and outliers in complex datasets.",
        url: "https://github.com/ShalevAtsis/Anomalyze",
        skills: ["Machine Learning", "Python", "Data Analysis"],
        accentColor: "rgba(249,115,22,0.09)",  // orange — anomaly detection
    },
    {
        id: "ml-flow",
        name: "Machine Learning Flow",
        description:
            "End-to-end ML architecture demonstrating data processing, model training, and evaluation workflows.",
        url: "https://github.com/ShalevAtsis/Machine-Learning-Flow",
        skills: ["Scikit-learn", "Pandas", "Model Training"],
        accentColor: "rgba(99,102,241,0.09)",  // indigo — classic ML
    },
    {
        id: "tcp-chat",
        name: "Multithreaded TCP Chat",
        description:
            "High-performance client-server chat application built with robust multithreading and socket programming.",
        url: "https://github.com/ShalevAtsis/Multithreaded-TCP-Chat",
        skills: ["C++/Java", "Sockets", "Multithreading", "Networking"],
        accentColor: "rgba(16,185,129,0.09)",  // emerald — systems / networking
    },
    {
        id: "devops",
        name: "DevOps CI/CD Pipeline",
        description:
            "Comprehensive cloud infrastructure project featuring automated testing, containerization, and continuous deployment.",
        url: "https://github.com/ShalevAtsis/DevOps-Project",
        skills: ["AWS", "Docker", "Jenkins", "CI/CD"],
        accentColor: "rgba(99,102,241,0.14)",  // indigo — matches other cards
    },
    {
        id: "leetcode",
        name: "LeetCode Solutions",
        description:
            "Collection of optimized algorithmic solutions focusing on data structures, time complexity, and dynamic programming.",
        url: "https://github.com/ShalevAtsis/LeetCode",
        skills: ["Algorithms", "Data Structures", "Problem Solving"],
        accentColor: "rgba(139,92,246,0.09)",  // violet — CS theory
    },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CleanProjects() {
    return (
        <section id="projects" className="py-24 sm:py-32 scroll-mt-20">
            {/* Section header */}
            <FadeInUp className="mb-14">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Featured Projects
                </h2>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                    A selection of personal and academic builds — from CV pipelines to cloud infrastructure.
                </p>
            </FadeInUp>

            {/* Responsive 3-column grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}
