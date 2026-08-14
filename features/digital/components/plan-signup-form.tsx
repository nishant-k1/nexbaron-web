"use client";

import { X, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatINR, type Plan } from "@/features/digital/plans";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  description: string;
}

export function PlanSignupForm({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const planId = plan.id;
  const [step, setStep] = useState<"form" | "submitting" | "done">("form");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [hubUrl, setHubUrl] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }

    setStep("submitting");

    try {
      const res = await fetch("/api/digital/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, planId }),
      });

      const data = await res.json();

      if (data.success && data.hubUrl) {
        localStorage.setItem("nexbaron-plan-id", planId);
        setHubUrl(data.hubUrl);
        setStep("done");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        setStep("form");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStep("form");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-signup-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        ref={dialogRef}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 id="plan-signup-title" className="text-lg font-bold text-white">
              {step === "done" ? "Account Created" : `Get ${plan.name}`}
            </h2>
            {step !== "done" && (
              <p className="text-xs text-slate-400 mt-0.5">
                {formatINR(plan.pricing?.setup ?? 0)} one-time +{" "}
                {formatINR(plan.pricing?.monthly ?? 0)}/month
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "done" ? (
          /* Success */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">You&apos;re all set!</h3>
            <p className="text-sm text-slate-400">
              Your account has been created. You can now manage your plan, track progress, and make
              payments from your dashboard.
            </p>
            <a
              href={hubUrl}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-slate-950 rounded-xl font-bold hover:bg-teal-400 transition-colors"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-xs text-slate-400 mb-1">
                Your Name *
              </label>
              <input
                id="signup-name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                required
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="signup-email" className="block text-xs text-slate-400 mb-1">
                  Email *
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@business.com"
                  required
                  className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                />
              </div>
              <div>
                <label htmlFor="signup-phone" className="block text-xs text-slate-400 mb-1">
                  Phone *
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-company" className="block text-xs text-slate-400 mb-1">
                Company / Business Name
              </label>
              <input
                id="signup-company"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Your business name"
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>

            <div>
              <label htmlFor="signup-address" className="block text-xs text-slate-400 mb-1">
                Business Address
              </label>
              <input
                id="signup-address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Area, city"
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>

            <div>
              <label htmlFor="signup-description" className="block text-xs text-slate-400 mb-1">
                About Your Business
              </label>
              <textarea
                id="signup-description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="What do you do? What do you want visitors to know?"
                rows={3}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={step === "submitting"}
              className="cursor-pointer w-full py-3 bg-teal-500 text-slate-950 rounded-xl font-bold hover:bg-teal-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {step === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating your account...
                </>
              ) : (
                "Create Account & Continue"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
