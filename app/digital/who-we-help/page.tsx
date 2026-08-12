import { ArrowRight, CheckCircle2 } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { getBusinesses, type ResolvedBusiness } from "@/features/digital/businesses";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Who We Help | Growth Plans for Local Businesses | Nexbaron Digital",
  description:
    "How we help clinics, restaurants, law & CA firms, salons, gyms, real estate, and startups get more customers — with a clear recommended plan for each.",
  openGraph: {
    title: "Who We Help | Nexbaron Digital",
    description: "A clear recommended plan for every type of local business.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function planLabel(planId: string): string {
  return planId.charAt(0).toUpperCase() + planId.slice(1);
}

function BusinessCard({ business }: { business: ResolvedBusiness }) {
  const Icon = business.icon;
  const hasPricing = business.services.length > 0;

  return (
    <SectionReveal>
      <Link
        href={`/digital/who-we-help/${business.slug}`}
        className="h-full group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono text-teal-300 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20">
            {business.tier === "tier1" ? "Small Business" : "Growing Business"}
          </span>
        </div>

        <span className="text-xs uppercase tracking-wider font-mono font-semibold text-teal-400 mb-2">
          {business.category}
        </span>
        <h3 className="text-xl font-heading font-semibold text-white mb-3">{business.label}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">{business.tagline}</p>

        <div className="space-y-2.5 mb-4">
          {business.problems.slice(0, 3).map((problem) => (
            <div key={problem} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-400">{problem}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-teal-300">
              Recommended: {planLabel(business.recommendedPlan)}
            </span>
            {hasPricing && (
              <span className="text-[11px] font-mono text-slate-400">
                {formatINR(business.pricing.setup)} + {formatINR(business.pricing.monthly)}/mo
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:text-teal-300">
            See the package
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </SectionReveal>
  );
}

export default async function DigitalIndustriesPage() {
  const businesses = await getBusinesses();
  const categories: string[] = [];
  for (const b of businesses) {
    if (!categories.includes(b.category)) categories.push(b.category);
  }

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Who We Help"
        title="Your Business."
        highlight="Your Growth Plan."
        description="Every industry grows differently. Pick yours below, and we'll show you the problems we solve and the plan built for it."
        primaryCta={{ label: "Find My Industry", href: "#food-hospitality" }}
        secondaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {categories.map((category) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="py-12 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-heading font-bold text-white">{category}</h2>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {businesses
                .filter((b) => b.category === category)
                .map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
            </div>
          </section>
        ))}

        <CTABanner
          accent="digital"
          title="Don't see your industry?"
          description="Every local business gets more customers with the same three things: found on Google, easy to contact, and looking professional. Tell us what you do and we'll recommend a plan."
          ctaLabel="Get a Plan Recommendation"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}
