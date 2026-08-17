import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nexbaron Private Limited collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email address, phone number, and company details when you contact us through our website, WhatsApp, or quote builder. We also collect limited usage data to improve site performance and security.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to respond to inquiries, prepare quotes, deliver the services you request, and keep you informed about your projects. We do not sell your personal information to third parties.",
  },
  {
    title: "WhatsApp & Communication",
    body: "When you contact Nexbaron Digital or Nexbaron Print via WhatsApp or our contact forms, your messages are used solely to serve your request. Each division manages its own leads independently.",
  },
  {
    title: "Data Security",
    body: "We apply reasonable technical and organizational measures to protect your information against unauthorized access, alteration, or loss.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us through the details on our contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-slate-800/20 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-300 font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 inline-block mb-4">
              Nexbaron Private Limited
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-12">
              Last updated: 2026. This policy explains how Nexbaron Private Limited, including its
              divisions Nexbaron Digital and Nexbaron Print, handles personal information.
            </p>

            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                  <h2 className="text-lg font-heading font-semibold text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
