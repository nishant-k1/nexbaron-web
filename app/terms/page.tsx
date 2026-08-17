import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of the Nexbaron Private Limited website and its divisions.",
};

const sections = [
  {
    title: "Use of This Website",
    body: "By accessing nexbaron.com you agree to these terms. This website provides information about Nexbaron Private Limited and its two independent divisions: Nexbaron Digital and Nexbaron Print.",
  },
  {
    title: "Independent Divisions",
    body: "Nexbaron Digital and Nexbaron Print operate as separate commercial units. Each division maintains its own scope of services, pricing, and sales process. Requests are handled exclusively by the relevant division.",
  },
  {
    title: "Quotes & Estimates",
    body: "Estimates provided by the Nexbaron Print quote builder are indicative. Final pricing is confirmed in writing before an order is accepted. Nexbaron Digital proposals are valid for the period stated in each proposal.",
  },
  {
    title: "Intellectual Property",
    body: "All content, branding, and design elements on this website belong to Nexbaron Private Limited unless otherwise stated and may not be reproduced without permission.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by law, Nexbaron Private Limited is not liable for indirect or consequential losses arising from the use of this website or reliance on the information it contains.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-slate-800/20 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal>
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-200 font-semibold px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 inline-block mb-4">
              Nexbaron Private Limited
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-slate-200 text-sm leading-relaxed mb-12">
              Last updated: 2026. These terms govern your use of the Nexbaron Private Limited
              website.
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
                  <p className="text-sm text-slate-200 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
