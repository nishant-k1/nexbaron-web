import { ArrowRight } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { solutionSections } from "@/features/digital/solutions-data";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Solutions | Nexbaron Digital",
  description:
    "Everything your business needs to grow online — from building your digital presence to generating leads and keeping it all running. Six solutions, one partner.",
  openGraph: {
    title: "Solutions | Nexbaron Digital",
    description: "Build. Get Found. Stay Active. Grow. Automate. Care.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

export default function SolutionsPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Solutions"
        title="Not a list of services."
        highlight="A story of growth."
        description="Six solutions that take your business from invisible to unstoppable. Everything you need, organized by what it does."
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {solutionSections.map((section) => (
          <section key={section.id} id={section.id} className="py-16 scroll-mt-28">
            <SectionHeading accent="digital" eyebrow={section.title} title={section.subtitle} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                const content = (
                  <>
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-4">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    {item.href && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 mt-4 group-hover:text-teal-300">
                        Learn more
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </>
                );

                const cardClasses =
                  "p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]";

                return (
                  <SectionReveal key={item.title}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`${cardClasses} block cursor-pointer group`}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className={cardClasses}>{content}</div>
                    )}
                  </SectionReveal>
                );
              })}
            </div>
          </section>
        ))}

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
