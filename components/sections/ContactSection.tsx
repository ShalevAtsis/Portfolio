"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Linkedin as LinkedinIcon, Github as GithubIcon, Download } from "lucide-react";
import ContactButton from "@/components/shared/ContactButton";
import ContactForm from "@/components/shared/ContactForm";
import FadeInUp from "@/components/ui/FadeInUp";
import { asset } from "@/lib/basePath";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20">
      <FadeInUp className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Let&apos;s Talk
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          Whether you have a project in mind, a role to fill, or just want to connect — pick
          your preferred channel and I&apos;ll get back to you fast.
        </p>
      </FadeInUp>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
        {/* Left side: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          <ContactButton
            href="https://wa.me/+972585060699"
            icon={<MessageCircle className="h-5 w-5" strokeWidth={1.75} />}
            label="WhatsApp"
            description="Fastest response"
            color="whatsapp"
            variant="full"
            external
          />
          <ContactButton
            href="mailto:Shalevatsis@gmail.com"
            icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}
            label="Email"
            description="Shalevatsis@gmail.com"
            color="email"
            variant="full"
          />
          <ContactButton
            href="https://www.linkedin.com/in/shalev-atsis-software-developer/"
            icon={<LinkedinIcon className="h-5 w-5" strokeWidth={1.75} />}
            label="LinkedIn"
            description="Let's connect"
            color="linkedin"
            variant="full"
            external
          />
          <ContactButton
            href="https://github.com/ShalevAtsis"
            icon={<GithubIcon className="h-5 w-5" strokeWidth={1.75} />}
            label="GitHub"
            description="Explore my code"
            color="github"
            variant="full"
            external
          />
          <ContactButton
            href={asset("/Shalev_Atsis_CV.pdf")}
            icon={<Download className="h-5 w-5" strokeWidth={1.75} />}
            label="Download CV"
            description="Get my full resume (PDF)"
            color="download"
            variant="full"
            className="sm:col-span-2 lg:col-span-2 flex-col sm:flex-row justify-center py-6 sm:py-4"
            external
          />
        </motion.div>

        {/* Right side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
