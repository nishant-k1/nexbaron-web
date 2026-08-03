import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Results | Nexbaron Digital",
  description:
    "Real outcomes from real businesses — more traffic, more leads, more reviews. Results that speak for themselves.",
  openGraph: {
    title: "Results | Nexbaron Digital",
    description: "Real outcomes from real businesses.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const results = [
  {
    industry: "Dental Clinic",
    before: ["No website", "No Google Business Profile", "Zero online visibility"],
    after: [
      "Professional website launched",
      "Google Business Profile optimized & verified",
      "85+ reviews accumulated",
      "Appearing in local searches",
    ],
  },
  {
    industry: "Restaurant",
    before: ["No online menu", "No Google Business Profile", "Customers couldn't find them online"],
    after: [
      "Mobile-friendly online menu",
      "Google Business Profile updated",
      "More direct enquiries",
      "Higher foot traffic",
    ],
  },
];

export default function ResultsPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Results"
        title="Outcomes, Not Portfolios."
        highlight="Real Numbers."
        description="We don't showcase projects — we show results. More traffic, more leads, more reviews."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading
          accent="digital"
          eyebrow="What Results Look Like"
          title="Before and After"
          description="Every result starts with where the business was — and ends with where it is now."
        />

        <div className="space-y-12">
          {results.map((result) => (
            <SectionReveal key={result.industry}>
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <h3 className="text-2xl font-heading font-bold text-white mb-6">
                  {result.industry}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-mono font-semibold text-red-400 uppercase tracking-wider mb-4">
                      Before
                    </h4>
                    <ul className="space-y-2">
                      {result.before.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-red-400 mt-0.5">✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                      After
                    </h4>
                    <ul className="space-y-2">
                      {result.after.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
