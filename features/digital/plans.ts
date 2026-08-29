// Static plan data used as a degraded fallback when the catalog API is
// unreachable. The API is the source of truth — this only prevents a blank
// page and mirrors the current Launch/Growth/Scale/Custom shape.
import type { CatalogPlan, CatalogService } from "@/features/digital/catalog";

export type Plan = CatalogPlan;
export type PlanService = CatalogService;
export type ServiceStage = "design" | "build" | "setup";

export interface TimelineExpectation {
  label: string;
  note: string;
}

export const DEFAULT_EXPECTATIONS: TimelineExpectation[] = [
  {
    label: "Google Business Profile",
    note: "Submitted within 2 days. Google verifies in 3–10 business days.",
  },
  {
    label: "Website launch",
    note: "Live on your confirmed date. Design, build, and review included.",
  },
  {
    label: "Search visibility",
    note: "Starts ranking for local searches. Improves over 4–8 weeks.",
  },
];

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export type BillingCycleChoice = "monthly" | "annual";

export function svcSetup(svc: CatalogService): number {
  return svc.aggregate?.selling.setup ?? 0;
}

export function svcMonthly(svc: CatalogService): number {
  return svc.aggregate?.selling.monthly ?? 0;
}

export function svcAnnual(svc: CatalogService): number {
  return svc.aggregate?.selling.annual ?? 0;
}

export function svcCycle(svc: CatalogService, cycle: BillingCycleChoice): number {
  return cycle === "annual" ? svcAnnual(svc) : svcMonthly(svc);
}

export function cycleSuffix(cycle: BillingCycleChoice): string {
  return cycle === "annual" ? "/year" : "/month";
}

function fallbackService(
  id: string,
  label: string,
  opts?: Partial<CatalogService>,
): CatalogService {
  return { id, label, items: [], ...opts };
}

// Mirrors the API's digital/content/plans.ts. Do not rely on these for
// checkout — the server recomputes everything on create-order.
export const plans: CatalogPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "A simple website to get your business online and discoverable.",
    icon: "Globe",
    timeline: "Typically 5–7 business days",
    pricing: { setup: 8999, monthly: 599, annual: 4990, minimumMonths: 3 },
    services: [
      fallbackService("starter-business-website", "Business Website", {
        scope: "up to 5 pages",
        description: "Business website — up to 5 standard pages",
      }),
      fallbackService("starter-domain-setup", "Domain Setup", {
        scope: "1 domain",
        description: "Domain connection and configuration",
      }),
      fallbackService("starter-contact-form", "Contact Form", {
        scope: "1 standard form",
        description: "Contact/enquiry form",
      }),
      fallbackService("starter-google-business-profile", "Google Business Profile", {
        description: "Google Business Profile creation",
      }),
      fallbackService("starter-basic-seo", "Basic SEO", {
        scope: "5 pages",
        description: "Basic SEO setup for 5 pages",
      }),
      fallbackService("starter-search-console", "Search Console", {
        description: "Google Search Console setup and verification",
      }),
      fallbackService("starter-social-media-setup", "Social Media Setup", {
        scope: "up to 2 platforms",
        description: "Social Media Account Setup — up to 2 platforms",
      }),
    ],
    addOns: [],
    ctaLabel: "Choose Starter",
  },
  {
    id: "launch",
    name: "Launch",
    tagline: "Build a professional digital presence.",
    icon: "Rocket",
    timeline: "Typically 7–14 business days",
    pricing: { setup: 14999, monthly: 999, annual: 9990, minimumMonths: 3 },
    services: [
      fallbackService("launch-business-website", "Business Website", {
        scope: "up to 5 pages",
        description: "Business website — up to 5 standard pages",
      }),
      fallbackService("launch-domain-setup", "Domain Setup", {
        scope: "1 domain",
        description: "Domain connection and configuration",
      }),
      fallbackService("launch-business-email", "Business Email", {
        scope: "1 mailbox",
        description: "Business email setup — 1 mailbox",
      }),
      fallbackService("launch-contact-form", "Contact Form", {
        description: "Contact/enquiry form",
      }),
      fallbackService("launch-whatsapp-chat", "WhatsApp Chat", {
        description: "Floating WhatsApp Chat Button",
      }),
      fallbackService("launch-basic-seo", "Basic SEO", {
        scope: "5 pages",
        description: "Basic SEO setup for 5 pages",
      }),
      fallbackService("launch-google-maps", "Google Maps", {
        description: "Google Maps Embed",
      }),
      fallbackService("launch-google-business-profile", "Google Business Profile", {
        description: "Google Business Profile creation",
      }),
      fallbackService("launch-search-console", "Search Console", {
        description: "Google Search Console setup",
      }),
      fallbackService("launch-social-media-setup", "Social Media Setup", {
        scope: "up to 2 platforms",
        description: "Social Media Account Setup — up to 2 platforms",
      }),
    ],
    addOns: [],
    ctaLabel: "Choose Launch",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Turn your digital presence into a lead-generation channel",
    icon: "TrendingUp",
    timeline: "Monthly growth plan",
    featured: true,
    inherited: { label: "Everything in Launch" },
    services: [
      fallbackService("growth-expanded-pages", "Expanded Pages", {
        scope: "10 standard + 2 location pages",
        description: "Up to 10 standard pages + 2 Additional Location Pages for SEO",
      }),
      fallbackService("growth-onpage-seo", "On-Page SEO", {
        scope: "up to 10 pages",
        description: "On-Page SEO Optimization for up to 10 pages",
      }),
      fallbackService("growth-custom-forms", "Custom Forms", {
        scope: "1 additional form",
        description: "Up to 1 additional custom form",
      }),
      fallbackService("growth-blog-publishing", "Blog Publishing", {
        scope: "1 SEO article/month, up to 1,000 words",
        description: "Blog setup and publishing",
      }),
      fallbackService("growth-lead-capture", "Lead Capture", {
        description: "WhatsApp and Email lead capture",
      }),
      fallbackService("growth-live-chat", "Live Chat", {
        description: "Floating Live Chat button",
      }),
      fallbackService("growth-social-media-posts", "Social Media Posts", {
        scope: "2 graphic posts + 1 short/month",
        description: "Social Media Post Creation & Publishing",
      }),
      fallbackService("growth-conversion-tracking", "Conversion Tracking", {
        description: "Google Conversion Tracking Setup",
      }),
      fallbackService("growth-local-citations", "Local Citations", {
        scope: "up to 2 directories",
        description: "Local Citation Setup",
      }),
      fallbackService("growth-schema-markup", "Schema Markup", {
        description: "Schema Markup & Structured Data",
      }),
    ],
    addOns: [],
    ctaLabel: "Choose Growth",
    pricing: { setup: 29999, monthly: 2999, annual: 29990, minimumMonths: 3 },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Build systems that help you manage and automate growth.",
    icon: "Building2",
    timeline: "Monthly scale plan",
    timelineMode: "phased",
    foundationDays: 30,
    inherited: { label: "Everything in Growth" },
    services: [
      fallbackService("scale-expanded-pages", "Expanded Pages", {
        scope: "15 standard + 5 location pages",
        description: "Up to 15 standard pages + 5 Additional Location Pages for SEO",
      }),
      fallbackService("scale-advanced-seo", "Advanced SEO", {
        description: "Advanced SEO setup",
      }),
      fallbackService("scale-custom-forms", "Custom Forms", {
        scope: "2 additional forms",
        description: "Up to 2 additional custom forms",
      }),
      fallbackService("scale-meta-tracking", "Meta Tracking", {
        description: "Meta Conversion Tracking Setup",
      }),
      fallbackService("scale-lead-management", "Lead Management", {
        description: "Lead Management System",
      }),
      fallbackService("scale-automation", "Multi-channel Automation", {
        description: "Email and WhatsApp automation",
      }),
      fallbackService("scale-followup-automation", "Follow-up Automation", {
        description: "Lead follow-up automation",
      }),
      fallbackService("scale-blog-publishing", "Blog Publishing", {
        scope: "2 SEO articles/month, up to 1,000 words each",
        description: "Blog setup and publishing",
      }),
      fallbackService("scale-local-citations", "Local Citations", {
        scope: "up to 5 directories",
        description: "Local Citation Setup",
      }),
      fallbackService("scale-social-media-posts", "Social Media Posts", {
        scope: "4 graphic posts + 2 shorts/month",
        description: "Social Media Post Creation & Publishing",
      }),
    ],
    addOns: [],
    ctaLabel: "Choose Scale",
    pricing: { setup: 59999, monthly: 5999, annual: 59990, minimumMonths: 3 },
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Build exactly what your business requires.",
    icon: "MessageSquare",
    timeline: "We'll scope and quote after consultation",
    services: [
      fallbackService("custom-mix", "Mixed Services", {
        description: "Pick services from any plan",
      }),
      fallbackService("custom-development", "Custom Development", {
        description: "Request services not listed above like Custom Software Development",
      }),
      fallbackService("custom-quote", "Custom Quote", {
        description: "Receive a custom quote within 48h",
      }),
    ],
    addOns: [],
    ctaLabel: "Contact Us",
  },
];
