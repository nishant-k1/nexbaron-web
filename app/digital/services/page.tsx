import { Monitor, Search, MessageSquare, Database, ShieldCheck } from "lucide-react";
import { type Metadata } from "next";

import { CTABanner } from "@/components/sections/cta-banner";
import { FeatureSection } from "@/components/sections/feature-section";
import { PageHero } from "@/components/sections/page-hero";
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
        {services.map((service) => (
          <FeatureSection
            key={service.id}
            accent="digital"
            id={service.id}
            index={service.index}
            icon={service.icon}
            eyebrow={service.eyebrow}
            title={service.title}
            description={service.description}
            features={service.features}
            deliverables={service.deliverables}
            cta={{
              label: "Inquire About This Service",
              href: buildWhatsAppLink("digital", service.ctaMessage),
              external: true,
            }}
          />
        ))}

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
