import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import type { PublicService, ServiceSection } from "@/features/digital/services";
import { getIcon } from "@/lib/icon-map";

interface SolutionDetailProps {
  section: ServiceSection;
  services: PublicService[];
  eyebrow: string;
  highlight: string;
  description: string;
}

export function SolutionDetail({
  section,
  services,
  eyebrow,
  highlight,
  description,
}: SolutionDetailProps) {
  const Icon = getIcon(section.icon);

  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow={eyebrow}
        title={highlight}
        description={description}
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="py-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                What&apos;s Included
              </h2>
              <p className="text-sm text-slate-400 mt-1">{section.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const ItemIcon = getIcon(service.icon);
              return (
                <Link
                  key={service.id}
                  href={`/digital/${section.slug}/${service.id}`}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {service.label}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-16 border-t border-white/10">
          <SectionHeading
            accent="digital"
            eyebrow="Why Nexbaron"
            title="One Partner for Every Stage"
            description="From building your presence to keeping it growing every month — one fixed price, no juggling five vendors."
          />
          <div className="mt-8 flex items-center justify-center">
            <Link
              href="/digital/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
            >
              See all solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <CTABanner
          accent="digital"
          title="Ready to grow your business?"
          description="Pick a plan and we'll handle everything — from building your digital presence to keeping it growing every month."
          ctaLabel="See Pricing"
          href="/digital/pricing"
        />
      </div>
    </div>
  );
}
