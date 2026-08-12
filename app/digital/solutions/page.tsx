import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { getServiceCatalog } from "@/features/digital/services";
import { getIcon } from "@/lib/icon-map";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Solutions | Nexbaron Digital",
  description:
    "Everything your business needs to grow online — from building your digital presence to generating leads and keeping it all running. Solutions for every stage, one partner.",
  openGraph: {
    title: "Solutions | Nexbaron Digital",
    description: "Build. Get Found. Stay Active. Grow. Automate. Care. One partner.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default async function SolutionsPage() {
  const catalog = await getServiceCatalog();

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Solutions"
        title="Not a list of services."
        highlight="A story of growth."
        description="From your first website to custom software built around your workflow — everything you need, organized by what it does."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {catalog.sections.map((section) => {
          const services = catalog.services.filter((s) => s.section === section.id);
          return (
            <section key={section.id} id={section.id} className="py-16 scroll-mt-28">
              <SectionHeading accent="digital" eyebrow={section.title} title={section.subtitle} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const ItemIcon = getIcon(service.icon);
                  return (
                    <SectionReveal key={service.id}>
                      <Link
                        href={`/digital/${section.slug}/${service.id}`}
                        className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] flex flex-col"
                      >
                        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-white mb-2">
                          {service.label}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 mt-4">
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </SectionReveal>
                  );
                })}
              </div>
            </section>
          );
        })}

        <CTABanner
          accent="digital"
          title="Ready to grow?"
          description="Pick a plan and we'll handle everything — from building your digital presence to keeping it growing every month."
          ctaLabel="See Pricing"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}
