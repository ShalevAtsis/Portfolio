"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";

const GITHUB_URL = "https://github.com/ShalevAtsis";
const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
const EMAIL = "mailto:Shalevatsis@gmail.com";
const PHONE = "tel:+972585060699";

export default function ResumeView() {
  const handleDownloadPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="min-h-screen bg-paper-bg py-24 text-paper-text print:py-0">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4">
        {/* A4-proportioned container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="a4-proportion w-full max-w-[210mm] rounded-lg bg-paper-surface p-10 shadow-paper print:max-w-none print:rounded-none print:shadow-none md:p-14"
        >
          {/* Header */}
          <header className="border-b border-paper-border pb-4 text-center print:pb-3">
            <h1 className="font-serif text-3xl font-bold text-paper-text">
              Shalev Atsis
            </h1>
            <p className="mt-1 font-sans text-lg text-paper-muted">
              Software Engineer
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-paper-muted">
              <a href={PHONE} className="hover:text-paper-accent">058-5060699</a>
              <a href={EMAIL} className="hover:text-paper-accent">Shalevatsis@gmail.com</a>
              <a href={GITHUB_URL} target="_blank" rel="no-opener noreferrer" className="hover:text-paper-accent">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="no-opener noreferrer" className="hover:text-paper-accent">
                LinkedIn
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-paper-text">
              Professional Summary
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-paper-muted">
              Motivated Software Engineer specializing in AI and Computer Vision, currently a Tier 2 Software Support Engineer at Jifiti and completing a B.Sc. in Computer Science. Possesses strong foundations in algorithms, system design, and software engineering. Proficient in Python, TypeScript, Java, C++, and SQL, with proven problem-solving capabilities in Agile environments. Passionate about developing AI solutions and building reliable, maintainable software.
            </p>
          </section>

          {/* Experience */}
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-paper-text">
              Experience
            </h2>
            <div className="mt-3 space-y-4">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-sans font-semibold text-paper-text">
                    Tier 2 Software Support Engineer
                  </h3>
                  <span className="text-sm text-paper-muted">Jifiti · August 2025 – Present</span>
                </div>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-paper-muted">
                  <li>Owned Tier 2 Production investigations for a high availability Fintech SaaS platform.</li>
                  <li>Developed Python based analytics to derive business insights based on traffic and transactions.</li>
                  <li>Investigated backend and integration issues using SQL queries and deep log analysis.</li>
                  <li>Collaborated with R&D in an Agile environment, validating fixes through CI/CD pipelines.</li>
                </ul>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-sans font-semibold text-paper-text">
                    Software QA Specialist
                  </h3>
                  <span className="text-sm text-paper-muted">Hartech Technologies · November 2021 – December 2022</span>
                </div>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-paper-muted">
                  <li>Participated in agile teams to conduct testing and quality assurance, identifying and fixing defects in Command-and-Control systems.</li>
                  <li>Collaborated with cross-functional teams to enhance performance and reliability of the software.</li>
                  <li>Optimized drone and UGV software functionality, conducting 50+ field tests at global sites.</li>
                  <li>Participated in international projects, provided on-site training and support to overseas clients.</li>
                  <li>Implemented, integrated and supported software products at various professional sites worldwide, ensuring compatibility with existing systems.</li>
                  <li>Gained expertise in advanced communication solutions and in the tech industry.</li>
                </ul>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-sans font-semibold text-paper-text">
                    Command and Control System Operator
                  </h3>
                  <span className="text-sm text-paper-muted">Israeli Navy · February 2019 – October 2021</span>
                </div>
                <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-paper-muted">
                  <li>Served full military duty as a combat soldier on a 3rd Fleet ship of the Israeli Navy.</li>
                  <li>Operated C2 systems (radar, sonar, EW) to ensure real-time mission awareness; coordinated with Air Force units (UAVs, jets) to integrate multi-platform data under high pressure.</li>
                  <li>Led a 15-person platoon and a 70-person crew, demonstrating strong leadership and management.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-paper-text">
              Education
            </h2>
            <div className="mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-sans font-semibold text-paper-text">
                  B.Sc. Computer Science (In Progress)
                </h3>
                <span className="text-sm text-paper-muted">Expected June 2026</span>
              </div>
              <p className="text-sm text-paper-muted">
                HIT College · GPA 90
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-paper-text">
              Skills
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-paper-muted">
              <li><strong className="text-paper-text">Programming:</strong> OOP, Python (NumPy, Pandas, Matplotlib), Java, C++, SQL, JavaScript, TypeScript.</li>
              <li><strong className="text-paper-text">AI & Machine Learning:</strong> PyTorch, Scikit-learn, OpenCV, GenAI (Diffusion Models), HuggingFace.</li>
              <li><strong className="text-paper-text">Cloud & DevOps:</strong> AWS (EC2, ECR), Docker, CI/CD, Jenkins, MongoDB, Git.</li>
              <li><strong className="text-paper-text">Concepts:</strong> Deep Learning, Computer Vision, Data structures, Algorithms, Communication Networks.</li>
              <li><strong className="text-paper-text">Soft Skills:</strong> Analytical Thinking, Problem solving, Team collaboration, Fast Learning, Proactive.</li>
            </ul>
          </section>

          {/* Languages */}
          <section className="mt-6">
            <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-paper-text">
              Languages
            </h2>
            <ul className="mt-2 space-y-0.5 text-sm text-paper-muted">
              <li>Hebrew: Native proficiency</li>
              <li>English: Professional proficiency</li>
            </ul>
          </section>
        </motion.div>

        {/* Download PDF - visible only in resume mode, hidden when printing */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleDownloadPDF}
          className="no-print fixed bottom-8 right-8 rounded-full bg-paper-accent px-6 py-3 font-sans font-medium text-white shadow-lg transition hover:bg-paper-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-paper-accent focus-visible:ring-offset-2 print:hidden"
        >
          Download PDF
        </motion.button>
      </div>
    </div>
  );
}
