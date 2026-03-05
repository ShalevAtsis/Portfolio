"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
        botcheck: false, // Honeypot field
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If validation fails, stop here
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "281812e7-7bc2-4ab8-a187-5c126385345a",
                    ...formData,
                }),
            });

            if (response.status === 200) {
                setIsSuccess(true);
            } else {
                console.error("Form submission failed with status:", response.status);
            }
        } catch (error) {
            console.error("Form submission error", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // Clear the specific error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset to auto to calculate new height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const inputBaseStyle = "bg-slate-950/50 border transition-all rounded-xl p-3.5 text-slate-100 placeholder:text-slate-500 w-full outline-none";
    const inputNormalStyle = "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500";
    const inputErrorStyle = "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500";

    return (
        <div className="w-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate // Disable native HTML5 validation to use our custom UI
                    >
                        {/* Honeypot Field */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            className="hidden"
                            style={{ display: 'none' }}
                            checked={formData.botcheck}
                            onChange={handleChange}
                        />

                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-slate-300 mb-1.5 block">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={`${inputBaseStyle} ${errors.name ? inputErrorStyle : inputNormalStyle}`}
                            />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-slate-300 mb-1.5 block">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className={`${inputBaseStyle} ${errors.email ? inputErrorStyle : inputNormalStyle}`}
                            />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="company" className="text-sm font-medium text-slate-300 mb-1.5 block">
                                Company / LinkedIn Profile <span className="text-slate-500 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Optional"
                                className={`${inputBaseStyle} ${inputNormalStyle}`}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="text-sm font-medium text-slate-300 mb-1.5 block">
                                How can I help?
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                ref={textareaRef}
                                rows={4}
                                value={formData.message}
                                onInput={handleTextareaInput}
                                placeholder="Tell me about your project or opportunity..."
                                className={`${inputBaseStyle} ${errors.message ? inputErrorStyle : inputNormalStyle} resize-none min-h-[100px] overflow-hidden`}
                            />
                            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={!isSubmitting ? { scale: 0.98 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.96 } : {}}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 rounded-xl w-full py-3.5 font-bold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 block"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6"
                        >
                            <CheckCircle2 strokeWidth={2.5} className="h-8 w-8" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Message sent successfully!</h3>
                        <p className="text-slate-400">I&apos;ll be in touch soon.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
