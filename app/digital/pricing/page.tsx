import { ArrowRight, CheckCircle2, Rocket, MapPin, TrendingUp } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
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

interface Plan {
  id: string;
  name: string;
  oneTime: string;
  monthly: string;
  monthlyName: string;
  tagline: string;
  forWho: string[];
  timeline: string;
  featured?: boolean;
  features: string[];
  addOns: string[];
  icon: React.ElementType;
  ctaLabel: string;
}

const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    oneTime: "₹24,999",
    monthly: "₹1,499",
    monthlyName: "Care",
    tagline: "Get your business online, professionally.",
    forWho: [
      "New salons & cafes",
      "Freelancers",
      "Home-service businesses",
      "Shops getting online for the first time",
    ],
    timeline: "Live in 7 days",
    icon: Rocket,
    features: [
      "Professional business website (up to 4 pages)",
      "Mobile-perfect design",
      "Your logo, colors & business photos",
      "\u201cWhatsApp us\u201d button on every page",
      "Google Business Profile created & verified",
      "Every enquiry emailed straight to you",
    ],
    addOns: ["Extra pages (₹999/page)", "Additional photos (₹499)", "Domain setup (₹999 one-time)"],
    ctaLabel: "Start With Launch",
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: "₹39,999",
    monthly: "₹3,999",
    monthlyName: "Growth Care",
    tagline: "Generate more calls, WhatsApp enquiries, and Google leads every month.",
    forWho: [
      "Restaurants & cafes",
      "Clinics & doctors",
      "Salons, spas & gyms",
      "Law & CA firms",
      "Local businesses relying on Google searches",
    ],
    timeline: "Live in 7–10 days · ranking builds over 60–90 days",
    featured: true,
    icon: MapPin,
    features: [
      "Everything in Launch",
      "Google Business Profile optimization",
      "Review system — we ask after every sale",
      "Rank for \u201cnear me\u201d searches in your city",
      "WhatsApp booking & no-show reminders",
      "24/7 automatic answers (hours, address, prices)",
      "Plain-English monthly ranking report",
    ],
    addOns: ["Google Ads setup (separate)", "Extra city coverage", "Payment link in chat"],
    ctaLabel: "Start With Growth",
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: "₹59,999",
    monthly: "₹7,999",
    monthlyName: "Business Partner",
    tagline: "Your outsourced digital growth team.",
    forWho: [
      "Multi-location businesses",
      "Growing practices that have outgrown DIY",
      "Owners who want it handled, not managed",
    ],
    timeline: "First 30 days: foundation + audit + plan",
    icon: TrendingUp,
    features: [
      "Everything in Growth",
      "Dedicated growth manager",
      "Monthly strategy session & growth plan",
      "Unlimited content & page updates",
      "Quarterly competitor review",
      "Campaign & offer pages (seasonal, launches)",
    ],
    addOns: ["Same-day priority support", "Multi-location campaigns", "Advanced reporting"],
    ctaLabel: "Start With Scale",
  },
];

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

export default function DigitalServicesPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Pricing"
        title="Pick a Plan. Start in"
        highlight="7 Days."
        description="Published prices. No hidden costs. No sales call required to get started — choose a plan, fill in a short form, and we take it from there."
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <SectionReveal key={plan.id}>
                  <div
                    id={plan.id}
                    className={`h-full flex flex-col p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 scroll-mt-28 ${
                      plan.featured
                        ? "bg-teal-500/10 border-teal-500/40 shadow-2xl shadow-teal-500/10"
                        : "bg-white/[0.03] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      {plan.featured && (
                        <span className="text-[10px] font-mono text-slate-950 px-2.5 py-1 rounded bg-teal-400 font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-heading font-semibold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">{plan.tagline}</p>

                    <div className="mb-4">
                      <span className="text-3xl font-heading font-extrabold text-white">
                        {plan.oneTime}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">one-time</span>
                      <div className="text-sm text-slate-300 mt-1">
                        + {plan.monthly}
                        <span className="text-xs text-slate-400">/month · {plan.monthlyName}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-teal-400 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 inline-block">
                        {plan.timeline}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
                        Best for
                      </span>
                      <ul className="mt-2 space-y-1.5">
                        {plan.forWho.map((item) => (
                          <li key={item} className="text-xs text-slate-400 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
                        Add-ons
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {plan.addOns.map((addOn) => (
                          <span
                            key={addOn}
                            className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded bg-white/5 border border-white/10"
                          >
                            {addOn}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Button
                        asChild
                        size="lg"
                        className={`w-full font-bold px-8 rounded-xl shadow-lg ${
                          plan.featured
                            ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
                            : "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
                        }`}
                      >
                        <Link
                          href={`/digital/contact?plan=${plan.id}`}
                          className="inline-flex items-center justify-center gap-2"
                        >
                          {plan.ctaLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </section>

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
                  <th className="text-left px-6 py-4 font-mono text-xs uppercase tracking-wider text-slate-400">
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
                    <td className="px-6 py-3.5 text-slate-300">{row.feature}</td>
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
