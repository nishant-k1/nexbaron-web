import { CheckCircle2 } from "lucide-react";
import { type Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { LaunchTracker } from "@/components/tracking/launch-tracker";
import { PlansGrid } from "@/features/digital/components/plans-grid";
import {
  buildStageSchedule,
  computeLaunchTimeline,
  createDefaultSelection,
} from "@/features/digital/plan-summary";
import { plans } from "@/features/digital/plans";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Pricing | Fixed-Price Growth Plans | Nexbaron Digital",
  description:
    "Three fixed-price plans for local businesses: Launch, Growth, and Scale. One-time build fee plus a simple monthly care plan. No hidden costs, no lock-in.",
  openGraph: {
    title: "Pricing | Nexbaron Digital",
    description: "One-time build. Simple monthly care. No hidden costs, no lock-in.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const comparisonRows = [
  { feature: "Professional website", launch: true, growth: true, scale: true },
  {
    feature: "Google Business Profile created & verified",
    launch: true,
    growth: true,
    scale: true,
  },
  { feature: "Get found on Google (ranking & reviews)", launch: false, growth: true, scale: true },
  { feature: "WhatsApp booking & no-show reminders", launch: false, growth: true, scale: true },
  { feature: "24/7 automatic replies", launch: false, growth: true, scale: true },
  { feature: "Dedicated growth manager", launch: false, growth: false, scale: true },
  { feature: "Unlimited content & page updates", launch: false, growth: false, scale: true },
  { feature: "Monthly strategy session", launch: false, growth: false, scale: true },
  { feature: "Cancel anytime, no lock-in", launch: true, growth: true, scale: true },
  { feature: "Keep your website forever", launch: true, growth: true, scale: true },
];

function LaunchTimelineSection() {
  const launchPlan = plans.find((p) => p.id === "launch")!;
  const demoSelection = createDefaultSelection(launchPlan);
  const demo = computeLaunchTimeline(plans, () => demoSelection, "launch");
  const stages = buildStageSchedule(demo.launchDays);

  return (
    <section id="launch-timeline" className="py-16 border-t border-white/10 scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="max-w-xl">
          <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
            Your Launch Timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            A Confirmed Date. Not a Guess.
          </h2>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed">
            The moment you pay, we commit to a real calendar date and you can watch your progress
            live. Add or remove services on the cards above and the date updates automatically.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {demo.expectations.map((e) => (
              <li key={e.label} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <span className="font-semibold text-white">{e.label} — </span>
                  {e.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <LaunchTracker
          launchDays={demo.launchDays}
          launchDate={demo.launchDate}
          stages={stages}
          prefix="Illustrative Launch Date"
        />
      </div>
    </section>
  );
}

export default function DigitalServicesPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Pricing"
        title="Pick a Plan. Launch by Your"
        highlight="Confirmed Date."
        description="Published prices. No hidden costs. No sales call required to get started — choose a plan, fill in a short form, and we take it from there. Your launch date is confirmed the moment you pay."
        primaryCta={{ label: "Compare Plans Below", href: "#plans" }}
        secondaryCta={{ label: "Already Have a Website?", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Growth Plans */}
        <section id="plans" className="py-16 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Growth Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              One Plan. Everything Your Business Needs.
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Each plan includes a website, hosting, and support. Pick the stage your business is at
              — you can always move up.
            </p>
          </div>

          <PlansGrid />
        </section>

        {/* Launch Timeline */}
        <LaunchTimelineSection />

        {/* Comparison Table */}
        <section className="py-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Compare Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Everything, Side by Side
            </h2>
            <p className="text-sm text-slate-300 mt-4">
              Same inclusions, three levels of growth. Pick the one that matches where your business
              is today.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10">
                  <th className="sticky left-0 bg-slate-950 text-left px-6 py-4 font-mono text-xs uppercase tracking-wider text-slate-400 z-10">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-6 py-4 text-center font-heading font-semibold ${
                        plan.featured ? "text-teal-300" : "text-white"
                      }`}
                    >
                      {plan.name}
                      {plan.featured && (
                        <span className="block text-[10px] font-mono text-teal-400 mt-1">
                          Most Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 last:border-0 ${
                      index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    }`}
                  >
                    <td className="sticky left-0 bg-slate-950 px-6 py-3.5 text-slate-300 z-10">
                      {row.feature}
                    </td>
                    {[row.launch, row.growth, row.scale].map((included, colIndex) => (
                      <td key={colIndex} className="px-6 py-3.5 text-center">
                        {included ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 mx-auto" />
                        ) : (
                          <span className="text-slate-600 text-xs font-mono">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
