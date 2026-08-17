import { CheckCircle2 } from "lucide-react";
import { type Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { LaunchTracker } from "@/components/tracking/launch-tracker";
import { PlansGrid } from "@/features/digital/components/plans-grid";
import { getPlanCatalog } from "@/features/digital/plan-catalog";
import {
  buildStageSchedule,
  computeLaunchTimeline,
  createDefaultSelection,
} from "@/features/digital/plan-summary";
import type { Plan } from "@/features/digital/plans";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Pricing | Growth Plans | Nexbaron Digital",
  description:
    "Growth plan inclusions for local businesses: Launch, Growth, Scale, and Custom. Pricing is scoped after consultation based on your requirements.",
  alternates: { canonical: "/digital/pricing" },
  openGraph: {
    title: "Pricing | Nexbaron Digital",
    description: "Plan inclusions scoped around your business requirements.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

function LaunchTimelineSection({ plans }: { plans: Plan[] }) {
  const launchPlan = plans.find((p) => p.id === "launch") ?? plans[0]!;
  const demoSelection = createDefaultSelection(launchPlan);
  const demo = computeLaunchTimeline(plans, () => demoSelection, "launch");
  const stages = buildStageSchedule(demo.launchDays);

  return (
    <section
      id="launch-timeline"
      className="min-h-screen flex items-center justify-center py-16 scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Your Launch Timeline
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              A No Hidden Costs. Not a Guess.
            </h2>
            <p className="text-sm text-slate-200 mt-4 leading-relaxed">
              The moment you pay, we commit to a real calendar date and you can watch your progress
              live. Add or remove services on the cards above and the date updates automatically.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
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
      </div>
    </section>
  );
}

export default async function DigitalServicesPage() {
  const { plans } = await getPlanCatalog();

  return (
    <div className="relative">
      <PageHero
        accent="digital"
        eyebrow="Pricing"
        title="Choose the right growth plan."
        highlight="Scope it with us."
        description="See what each plan includes, then talk to us for a quote based on your exact requirements. No forced package, no hidden work."
        primaryCta={{ label: "Compare Plans Below", href: "#plans" }}
        secondaryCta={{ label: "Already Have a Website?", href: "/digital/contact" }}
      />

      <section
        id="plans"
        className="min-h-screen flex items-center justify-center py-16 scroll-mt-28"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-400 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 inline-block mb-3">
              Growth Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Simple Plans. Scoped Pricing.
            </h2>
            <p className="text-sm text-slate-200 mt-4">
              Launch builds your web presence, Growth gets you found, and Scale adds paid growth
              campaigns. Each inclusion is loaded from the API plan catalog.
            </p>
          </div>

          <PlansGrid plans={plans} />
        </div>
      </section>

      <LaunchTimelineSection plans={plans} />
    </div>
  );
}
