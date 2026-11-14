"use client";

import { useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CARD_SURFACE } from "@/components/ui/BentoCard";
import { BUTTON_VARIANTS, FOCUS_RING } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FormErrors = { name?: string; email?: string; message?: string };
type Status = "idle" | "submitting" | "success" | "error";

const INPUT =
  "w-full rounded-2xl border bg-elevated/70 px-4 py-3.5 text-[16px] text-ink outline-none transition-shadow placeholder:text-ink-2/80 focus-visible:ring-2";
const INPUT_OK = "border-hairline focus-visible:ring-accent";
const INPUT_ERROR = "border-[#ff453a]/60 focus-visible:ring-[#ff453a]";
const LABEL = "mb-1.5 block text-sm font-medium text-ink";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", botcheck: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Please enter a valid email address";
    if (!formData.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Honeypot: real users never see or tick this field. Pretend success, send nothing.
    if (formData.botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          subject: "New Contact Form Submission from Portfolio",
          from_name: "Portfolio Contact Form",
          category: "Contact Form",
          botcheck: "",
        }),
      });
      setStatus(response.status === 200 ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Auto-grow the textarea (write then read inside one animation frame).
  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    });
  };

  return (
    <div className={cn(CARD_SURFACE, "min-h-[560px] p-6 sm:p-9")}>
      {status === "success" ? (
        <div className="flex min-h-[480px] flex-col items-center justify-center text-center" role="status">
          <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#30d158]/15 text-[#30d158]">
            <CheckCircle2 strokeWidth={2} className="h-8 w-8" aria-hidden />
          </span>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-ink">Message sent successfully!</h3>
          <p className="mt-2 text-ink-2">I&apos;ll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Honeypot */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            checked={formData.botcheck}
            onChange={handleChange}
          />

          <div>
            <label htmlFor="name" className={LABEL}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={cn(INPUT, errors.name ? INPUT_ERROR : INPUT_OK)}
            />
            {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-sm text-[#ff6961]">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={LABEL}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(INPUT, errors.email ? INPUT_ERROR : INPUT_OK)}
            />
            {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-sm text-[#ff6961]">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="company" className={LABEL}>
              Company / LinkedIn Profile <span className="font-normal text-ink-2">(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              placeholder="Optional"
              className={cn(INPUT, INPUT_OK)}
            />
          </div>

          <div>
            <label htmlFor="message" className={LABEL}>How can I help?</label>
            <textarea
              id="message"
              name="message"
              ref={textareaRef}
              rows={4}
              value={formData.message}
              onChange={handleTextareaInput}
              placeholder="Tell me about your project or opportunity..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(INPUT, errors.message ? INPUT_ERROR : INPUT_OK, "min-h-[120px] resize-none overflow-hidden")}
            />
            {errors.message && <p id="message-error" role="alert" className="mt-1.5 text-sm text-[#ff6961]">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(BUTTON_VARIANTS.primary, FOCUS_RING, "w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-60")}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "error" && (
            <p role="alert" className="text-sm text-[#ff6961]">
              Something went wrong and the message was not sent. Please try again, or reach me on WhatsApp or e-mail.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
