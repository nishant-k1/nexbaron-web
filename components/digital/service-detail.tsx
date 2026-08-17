import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import type { PublicService, ServiceSection } from "@/features/digital/services";
import { getEntityId } from "@/lib/business-profile";
import { getIcon } from "@/lib/icon-map";

interface ServiceDetailProps {
  service: PublicService;
  section: ServiceSection;
  related: PublicService[];
}

export function ServiceDetail({ service, section, related }: ServiceDetailProps) {
  const Icon = getIcon(service.icon);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexbaron.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    description: service.description,
    provider: { "@id": getEntityId("digital"), name: "Nexbaron Digital" },
    serviceType: section.title,
    areaServed: "IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Nexbaron Digital",
        item: `${siteUrl}/digital`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${siteUrl}/digital/solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: section.title,
        item: `${siteUrl}/digital/${section.slug}`,
      },
      { "@type": "ListItem", position: 4, name: service.label },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="absolute top-24 md:top-28 z-10">
          <ol className="flex items-center gap-2 text-xs text-slate-400">
            <li>
              <Link href="/digital/solutions" className="hover:text-teal-300 transition-colors">
                Solutions
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li>
              <Link
                href={`/digital/${section.slug}`}
                className="hover:text-teal-300 transition-colors"
              >
                {section.title}
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" />
            <li aria-current="page" className="text-slate-200">
              {service.label}
            </li>
          </ol>
        </nav>
      </div>

      <PageHero
        accent="digital"
        eyebrow={section.title}
        title={service.label}
        description={service.details || service.description}
        primaryCta={{ label: "See Pricing", href: "/digital/pricing" }}
        secondaryCta={{ label: "Talk to Us", href: "/digital/contact" }}
      />

      {service.overview.length > 0 && (
        <section className="min-h-screen flex items-center justify-center py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              {service.overview.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.benefits.length > 0 && (
        <section className="min-h-screen flex items-center justify-center py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                  Why It Helps Your Business
                </h2>
                <p className="text-sm text-slate-400 mt-1">{service.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.benefits.map((item) => (
                <SectionReveal key={item}>
                  <div className="flex items-start gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06]">
                    <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{item}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.howItWorks.length > 0 && (
        <section className="min-h-screen flex items-center justify-center py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
              How It Works
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.howItWorks.map((step, index) => (
                <li
                  key={step}
                  className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-bold mb-3">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="min-h-screen flex items-center justify-center py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 text-sm font-semibold text-white hover:text-teal-300 transition-colors">
                      {faq.question}
                      <span
                        className="text-teal-400 shrink-0 group-open:rotate-45 transition-transform"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-5 pb-4 text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="min-h-screen flex items-center justify-center py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-10">
              More in {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((item) => {
                const ItemIcon = getIcon(item.icon);
                return (
                  <Link
                    key={item.id}
                    href={`/digital/${section.slug}/${item.id}`}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] group"
                  >
                    <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 w-fit mb-3">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-teal-300 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="min-h-[20vh] flex items-center justify-center py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Link
              href={`/digital/${section.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {section.title}
            </Link>
          </div>
        </div>
      </div>

      <CTABanner
        accent="digital"
        title="Ready to get started?"
        description="Pick a plan and we'll handle everything — from building your digital presence to keeping it growing every month."
        ctaLabel="See Pricing"
        href="/digital/pricing"
      />
    </div>
  );
}
