import { ArrowRight, CheckCircle2 } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { getBusinessBySlug, getBusinesses } from "@/features/digital/businesses";
import { formatINR } from "@/features/digital/plans";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const businesses = await getBusinesses();
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Who We Help | Nexbaron Digital" };
  return {
    title: `${business.label} | Websites & Growth | Nexbaron Digital`,
    description: `${business.tagline} ${business.problems.join(" ")}`,
    openGraph: {
      title: `${business.label} | Nexbaron Digital`,
      description: business.tagline,
      ...divisionOpenGraph("digital"),
    },
    twitter: divisionTwitter("digital"),
  };
}

function planLabel(planId: string): string {
  return planId.charAt(0).toUpperCase() + planId.slice(1);
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();

  const Icon = business.icon;
  const hasPricing = business.services.length > 0;

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow={business.category}
        title={`For ${business.label}`}
        highlight={planLabel(business.recommendedPlan) + " Plan"}
        description={business.tagline}
        primaryCta={{
          label: `See the ${planLabel(business.recommendedPlan)} Plan`,
          href: `/digital/pricing#${business.recommendedPlan}`,
        }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Problems we solve */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {business.problems.map((problem) => (
              <div
                key={problem}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md"
              >
                <p className="text-sm text-slate-300 leading-relaxed">{problem}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-semibold text-teal-300 mt-8">
            We fix all of it — for one fixed price.
          </p>
        </section>

        {/* What you get */}
        <section className="py-16 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                What You Get
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                The {planLabel(business.recommendedPlan)} package, tailored to{" "}
                {business.label.toLowerCase()}.
              </p>
            </div>
          </div>

          {hasPricing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {business.services.map((svc) => {
                  const setup = svc.aggregate?.selling.setup ?? 0;
                  const monthly = svc.aggregate?.selling.monthly ?? 0;
                  return (
                    <div
                      key={svc.id}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white">{svc.service.label}</h3>
                        <p className="text-[11px] font-mono text-slate-500 mt-1">
                          {setup > 0 && `${formatINR(setup)} one-time`}
                          {setup > 0 && monthly > 0 && " + "}
                          {monthly > 0 && `${formatINR(monthly)}/mo`}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {business.addOns.map((svc) => {
                  const setup = svc.aggregate?.selling.setup ?? 0;
                  const monthly = svc.aggregate?.selling.monthly ?? 0;
                  return (
                    <div
                      key={svc.id}
                      className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white">{svc.service.label}</h3>
                        <p className="text-[11px] font-mono text-slate-500 mt-1">
                          {setup > 0 && `${formatINR(setup)} one-time`}
                          {setup > 0 && monthly > 0 && " + "}
                          {monthly > 0 && `${formatINR(monthly)}/mo`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                    Estimated {planLabel(business.recommendedPlan)} package
                  </span>
                  <div className="text-2xl font-heading font-extrabold text-white mt-1">
                    {formatINR(business.pricing.setup)}
                    <span className="text-xs text-slate-400 font-normal ml-1">one-time</span>
                    <span className="text-sm text-slate-300 font-normal">
                      {" + "}
                      {formatINR(business.pricing.monthly)}
                      <span className="text-xs text-slate-400">/mo</span>
                    </span>
                  </div>
                </div>
                <Link
                  href={`/digital/pricing#${business.recommendedPlan}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-slate-950 rounded-xl font-bold hover:bg-teal-400 transition-colors"
                >
                  See the Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">
              Pricing is available on the {planLabel(business.recommendedPlan)} plan page.
            </p>
          )}
        </section>

        <CTABanner
          accent="digital"
          title={`Ready to grow your ${business.label.toLowerCase()}?`}
          description="Pick the plan and we'll handle everything — from building your presence to keeping it growing every month."
          ctaLabel="See Pricing"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}
