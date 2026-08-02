import {
  ArrowRight,
  CheckCircle2,
  Database,
  MessageSquare,
  Monitor,
  Search,
  ShieldCheck,
} from "lucide-react";
import { type Metadata } from "next";

import { SectionReveal } from "@/components/motion/section-reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/divisions";
import { divisionOpenGraph, divisionTwitter } from "@/lib/og";

export const metadata: Metadata = {
  title: "Digital Services | Nexbaron Digital",
  description:
    "Business websites, Google Business Profile & local SEO, WhatsApp Business & AI chatbots, CRM automation, and managed hosting for growing local businesses.",
  openGraph: {
    title: "Digital Services | Nexbaron Digital",
    description:
      "End-to-end digital growth services: websites, local SEO, WhatsApp automation, CRM and hosting.",
    ...divisionOpenGraph("digital"),
  },
  twitter: divisionTwitter("digital"),
};

const services = [
  {
    id: "websites",
    index: "01",
    icon: Monitor,
    eyebrow: "Web Presence",
    title: "Business Websites & Landing Pages",
    description:
      "Custom, ultra-fast websites engineered for conversion. We design around your customers and calls-to-action so every visit becomes a lead, on any device.",
    features: [
      "Custom design built around your brand",
      "Sub-second page load on mobile networks",
      "Lead forms + WhatsApp click-to-chat built in",
      "On-page SEO foundation from day one",
      "Google Analytics & conversion tracking",
      "Multi-page sites and high-focus landing pages",
    ],
    deliverables: [
      "Custom website (up to 6 pages)",
      "Conversion landing page",
      "Speed optimization report",
      "Analytics & tracking setup",
      "30-day post-launch support",
    ],
    ctaMessage: "Hi Nexbaron Digital, I want to know more about business websites",
  },
  {
    id: "local-seo",
    index: "02",
    icon: Search,
    eyebrow: "Local Visibility",
    title: "Google Business Profile & Local SEO",
    description:
      "Win the Google 3-Pack for searches in your city. We optimize your Google Business Profile, structure local keywords, and automate reviews so customers find you first.",
    features: [
      "Google Business Profile setup & optimization",
      "Google 3-Pack ranking strategy for your area",
      "Review generation & automation",
      "Local keyword mapping per service",
      "Competitor gap analysis",
      "Monthly ranking reports",
    ],
    deliverables: [
      "#1 map-pack target in your category",
      "Automated review funnel",
      "Monthly local SEO report",
    ],
    ctaMessage: "Hi Nexbaron Digital, I want to rank #1 on Google Maps",
  },
  {
    id: "automation",
    index: "03",
    icon: MessageSquare,
    eyebrow: "Always-On Sales",
    title: "WhatsApp Business & AI Chatbots",
    description:
      "Answer customers, capture leads, and book appointments 24/7 without hiring more staff. AI chatbots respond instantly on WhatsApp and hand over to your team when it matters.",
    features: [
      "WhatsApp Business setup & verification",
      "24/7 AI chatbot replies in your voice",
      "Instant lead capture & team notifications",
      "Appointment & booking automation",
      "Broadcast campaigns for offers",
      "Seamless human handoff",
    ],
    deliverables: [
      "Live AI chatbot configured",
      "Automation workflow built",
      "Lead notification setup",
    ],
    ctaMessage: "Hi Nexbaron Digital, I want a WhatsApp AI chatbot for my business",
  },
  {
    id: "crm",
    index: "04",
    icon: Database,
    eyebrow: "Lead Pipeline",
    title: "CRM & Lead Automation",
    description:
      "Never lose a lead again. We connect your website, WhatsApp, and forms into one simple CRM that tracks, follows up, and reminds your team automatically.",
    features: [
      "Central lead tracking dashboard",
      "Automated follow-up sequences",
      "WhatsApp + website form integration",
      "Sales pipeline & status tracking",
      "Email / SMS nudges for hot leads",
      "Performance reporting",
    ],
    deliverables: ["Configured CRM pipeline", "Automation flows live", "Team onboarding session"],
    ctaMessage: "Hi Nexbaron Digital, I want CRM & lead automation",
  },
  {
    id: "maintenance",
    index: "05",
    icon: ShieldCheck,
    eyebrow: "Reliability",
    title: "Hosting, Speed & Maintenance",
    description:
      "Keep your website fast, secure, and online. Managed hosting with daily backups, SSL, uptime monitoring, and ongoing speed optimization — without you lifting a finger.",
    features: [
      "99.9% uptime managed hosting",
      "SSL security & malware protection",
      "Automated daily backups",
      "Continuous speed optimization",
      "Content & page updates on request",
      "Uptime monitoring & alerts",
    ],
    deliverables: [
      "Managed hosting environment",
      "SSL + backup protection",
      "Monthly maintenance summary",
    ],
    ctaMessage: "Hi Nexbaron Digital, I want managed hosting & maintenance",
  },
];

export default function DigitalServicesPage() {
  return (
    <div className="relative overflow-hidden">
      <PageHero
        accent="digital"
        eyebrow="Nexbaron Digital Services"
        title="End-to-End Digital Solutions for"
        highlight="Growing Local Businesses"
        description="Every service is built to do one thing: turn your website and Google presence into a reliable source of new customers."
        primaryCta={{
          label: "Get a Free Growth Audit",
          href: buildWhatsAppLink("digital", "Hi Nexbaron Digital, I want a free growth audit"),
          external: true,
        }}
        secondaryCta={{ label: "Talk to an Expert", href: "/digital/contact" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <SectionReveal key={service.id}>
                <div
                  id={service.id}
                  className="h-full group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.06] flex flex-col scroll-mt-28"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">{service.index}</span>
                  </div>

                  <span className="text-xs uppercase tracking-wider font-mono font-semibold text-teal-400 mb-2">
                    {service.eyebrow}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                    {service.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded bg-white/5 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 rounded-xl shadow-lg shadow-teal-500/20"
                    >
                      <a
                        href={buildWhatsAppLink("digital", service.ctaMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        Inquire About This Service
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        <CTABanner
          accent="digital"
          title="Not sure where to start?"
          description="Book a free video audit and we will tell you exactly what your website and Google ranking need — within 2 hours."
          ctaLabel="Claim Free Audit via WhatsApp"
          href={buildWhatsAppLink("digital", "Hi Nexbaron Digital, send me a free audit")}
          external
        />
      </div>
    </div>
  );
}
