import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "What to Expect | Nexbaron Digital",
  description:
    "From order to online: what your website launch and Google visibility actually look like with Nexbaron Digital — with honest timelines you can rely on.",
  alternates: { canonical: "/digital/results" },
  openGraph: {
    title: "What to Expect | Nexbaron Digital",
    description: "One clear path from order to online.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const journeySteps = [
  {
    phase: "Your Website",
    before: [
      "No website, or one that looks dated",
      "Customers can't find what you offer",
      "Enquiries go nowhere after hours",
    ],
    after: [
      "A professional website, live by a date we confirm before you pay",
      "Every enquiry reaches you instantly, even at night",
      "Looks perfect on every phone, tablet, and computer",
    ],
  },
  {
    phase: "Google Visibility",
    before: [
      "Invisible when people search \u201cnear me\u201d",
      "No Google Business Profile",
      "No reviews to build trust",
    ],
    after: [
      "Google Business Profile created and submitted for verification (Google usually verifies in 3\u201310 business days)",
      "Ranking improves over the following weeks \u2014 we track it and report monthly",
      "We ask happy customers for reviews after every sale",
    ],
  },
  {
    phase: "WhatsApp & Bookings",
    before: [
      "Missed messages at night",
      "No-shows and double bookings",
      "The same questions answered over and over",
    ],
    after: [
      "24/7 automatic answers for hours, address, and prices",
      "Customers book themselves \u2014 reminders cut no-shows",
      "Every enquiry captured, followed up, and never lost",
    ],
  },
];

export default function ResultsPage() {
  return (
    <div className="relative">
      <PageHero
        accent="digital"
        eyebrow="What to Expect"
        title="From Order to Online."
        highlight="One Clear Path."
        description="No mystery, no surprises. Here's exactly what changes when you work with us — from the day you choose a plan to your website going live and your business getting found."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading
          accent="digital"
          eyebrow="What Your Launch Looks Like"
          title="Before and After"
          description="The problems every local business has — and the outcome you can expect from us, in plain English."
        />

        <div className="space-y-12">
          {journeySteps.map((result) => (
            <SectionReveal key={result.phase}>
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <h3 className="text-2xl font-heading font-bold text-white mb-6">{result.phase}</h3>

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
