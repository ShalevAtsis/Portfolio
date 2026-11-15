"use client";

import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import Headline from "@/components/ui/Headline";
import ButtonLink from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import ContactButton from "@/components/shared/ContactButton";
import ContactForm from "@/components/shared/ContactForm";
import { asset } from "@/lib/basePath";
import { CV_FILENAME, CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { useContact } from "@/lib/hooks";

export default function ContactSection() {
  const contact = useContact();

  return (
    <Section id="contact">
      <Reveal className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
        <Eyebrow>Let&apos;s Talk</Eyebrow>
        <Headline size="display" className="mt-5">
          Let&apos;s build something.
        </Headline>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
          Whether you have a project in mind, a role to fill, or just want to connect, pick your preferred
          channel and I&apos;ll get back to you fast.
        </p>
        <div className="mt-10">
          <Magnetic>
            <ButtonLink
              href={contact.whatsapp}
              external
              aria-label="Start a conversation"
              className="px-8 py-3.5 text-[17px]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
              Start a conversation
            </ButtonLink>
          </Magnetic>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ContactButton
            href={contact.whatsapp}
            icon={<MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            label="WhatsApp"
            description="Fastest response"
            external
          />
          <ContactButton
            href={contact.mailto}
            icon={<Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            label="Email"
            description={contact.email ?? "Write me an e-mail"}
          />
          <ContactButton
            href={LINKEDIN_URL}
            icon={<Linkedin className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            label="LinkedIn"
            description="Let's connect"
            external
          />
          <ContactButton
            href={GITHUB_URL}
            icon={<Github className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            label="GitHub"
            description="Explore my code"
            external
          />
          <ContactButton
            href={asset(CV_PATH)}
            download={CV_FILENAME}
            icon={<Download className="h-5 w-5" strokeWidth={1.75} aria-hidden />}
            label="Download CV"
            description="Get my full resume (PDF)"
            className="sm:col-span-2"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
