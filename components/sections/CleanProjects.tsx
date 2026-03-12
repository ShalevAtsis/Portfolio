"use client";

import { Waves, ShieldCheck, Server, GitMerge, BrainCircuit, Code2 } from "lucide-react";
import type { Project } from "@/lib/types/components";
import ProjectCard from "@/components/shared/ProjectCard";
import FadeInUp from "@/components/ui/FadeInUp";

// ─── Project data ─────────────────────────────────────────────────────────────
// Edit descriptions / skills / urls / icons here; the grid renders automatically.

const PROJECTS: Project[] = [
    {
        id: "swellsight",
        name: "SwellSight",
        description:
            "AI-powered system that analyzes beach cam footage to extract wave height, direction, and breaking type. Features a sim-to-real pipeline using Depth-Anything-V2 for depth extraction, FLUX.1 for synthetic data generation, and DINOv2 for real-time analysis, achieving 92% direction accuracy across diverse weather conditions.",
        url: "https://github.com/ShalevAtsis/SwellSight_Colab",
        skills: ["Python", "PyTorch", "DINOv2", "OpenCV", "HuggingFace", "ControlNet"],
        icon: <Waves className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(6,182,212,0.09)",   // cyan — CV / AI
    },
    {
        id: "anomalyze",
        name: "Anomalyze",
        description:
            "Advanced AI-powered web security scanner that detects vulnerabilities, misconfigurations, and anomalies in web applications. Integrates ML-based analysis, CVE intelligence, and automated audits to deliver comprehensive, real-time security insights through an intuitive, analytics-driven dashboard.",
        url: "https://github.com/ShalevAtsis/Anomalyze",
        skills: ["React", "Node.js", "Docker", "Express", "MongoDB", "DevSecOps"],
        icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(249,115,22,0.09)",  // orange — security
    },
    {
        id: "tcp-chat",
        name: "Multithreaded TCP Chat",
        description:
            "A multithreaded chat server implemented in Python using TCP sockets. Supports real-time communication between multiple clients with both private and broadcast messaging, session logging, and graceful shutdown.",
        url: "https://github.com/ShalevAtsis/Multithreaded-TCP-Chat",
        skills: ["Python", "TCP/IP", "Sockets", "Multithreading", "Client-Server"],
        icon: <Server className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(16,185,129,0.09)",  // emerald — systems / networking
    },
    {
        id: "devops",
        name: "E2E DevOps Pipeline",
        description:
            "An automated end-to-end DevOps pipeline featuring CI/CD with Jenkins, cloud deployment on Render, UI automation with Selenium, and comprehensive performance benchmarking using Gatling.",
        url: "https://github.com/ShalevAtsis/DevOps-Project",
        skills: ["Jenkins", "Docker", "Selenium", "Gatling", "Tomcat", "CI/CD"],
        icon: <GitMerge className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(99,102,241,0.09)",  // indigo — DevOps
    },
    {
        id: "titanic-ml",
        name: "Titanic ML Flow",
        description:
            "Machine Learning flow project predicting Titanic passenger survival using KNN, Decision Tree, and Naive Bayes. Features EDA, feature engineering, and model evaluation.",
        url: "https://github.com/ShalevAtsis/Machine-Learning-Flow",
        skills: ["Python", "Scikit-Learn", "Pandas", "Seaborn", "Classification"],
        icon: <BrainCircuit className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(139,92,246,0.09)",  // violet — classic ML
    },
    {
        id: "leetcode",
        name: "LeetCode Architecture",
        description:
            "A structured repository containing optimized solutions to various problems related to algorithms, data structures, and databases. Organized by problem number and category for efficient technical reference.",
        url: "https://github.com/ShalevAtsis/LeetCode",
        skills: ["Python", "C", "Algorithms", "Data Structures", "Graphs"],
        icon: <Code2 className="h-5 w-5" strokeWidth={1.75} />,
        accentColor: "rgba(234,179,8,0.09)",   // amber — CS theory
    },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CleanProjects() {
    return (
        <section id="projects" className="py-24 sm:py-32 lg:py-40 xl:py-48 scroll-mt-20">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-8 xl:gap-10">
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}
