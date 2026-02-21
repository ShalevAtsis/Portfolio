"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Linkedin as LinkedinIcon, Github as GithubIcon } from "lucide-react";
import ContactButton from "@/components/ContactButton";
import FadeInUp from "@/components/ui/FadeInUp";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 scroll-mt-20">
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
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
          description="shalev-atsis"
          color="linkedin"
          variant="full"
          external
        />
        <ContactButton
          href="https://github.com/ShalevAtsis"
          icon={<GithubIcon className="h-5 w-5" strokeWidth={1.75} />}
          label="GitHub"
          description="ShalevAtsis"
          color="github"
          variant="full"
          external
        />
      </motion.div>
    </section>
  );
}
