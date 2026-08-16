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
    id: "launch",
    name: "Launch",
    tagline: "Build a professional online presence for your business.",
    icon: "Rocket",
    timeline: "Scoped after consultation",
    pricing: { setup: 4999, monthly: 999, annual: 11988, minimumMonths: 12 },
    services: [
      fallbackService("engineering-website-business-website", "Business Website", {
        description: "Pages: 5",
      }),
      fallbackService("engineering-integrations-whatsapp-integration", "WhatsApp Integration", {
        description: "Type: contact",
      }),
      fallbackService("engineering-analytics-web-analytics", "Web Analytics", {
        description: "Type: basic",
      }),
      fallbackService(
        "digital-marketing-seo-google-business-profile",
        "Google Business Profile Management",
        { description: "Type: setup" },
      ),
    ],
    addOns: [],
    ctaLabel: "Discuss Launch",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Get found online and turn visibility into enquiries.",
    icon: "TrendingUp",
    timeline: "Monthly growth plan",
    featured: true,
    inherited: { label: "Everything in Launch" },
    services: [
      fallbackService("digital-marketing-seo-seo", "SEO", { description: "Type: localBusiness" }),
      fallbackService(
        "digital-marketing-social-media-social-media-management",
        "Social Media Management",
        { description: "Posts Per Month: 8" },
      ),
      fallbackService(
        "digital-marketing-content-marketing-social-media-creatives",
        "Social Media Creatives",
        { description: "Creatives Per Month: 8" },
      ),
      fallbackService("digital-marketing-lead-generation-lead-generation", "Lead Generation", {
        description: "Campaigns Per Month: 1",
      }),
      fallbackService("digital-marketing-analytics-conversion-tracking", "Conversion Tracking", {
        description: "Type: standard",
      }),
      fallbackService("digital-marketing-analytics-campaign-reporting", "Campaign Reporting", {
        description: "Frequency: monthly",
      }),
    ],
    addOns: [],
    ctaLabel: "Discuss Growth",
    pricing: { setup: 4999, monthly: 6999, annual: 83988, minimumMonths: 12 },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Scale campaigns, content, and reporting with a dedicated growth system.",
    icon: "Building2",
    timeline: "Monthly scale plan",
    timelineMode: "phased",
    foundationDays: 30,
    inherited: { label: "Everything in Growth" },
    services: [
      fallbackService("digital-marketing-paid-advertising-google-ads", "Google Ads Management", {
        description: "Campaigns: 2 · Remarketing: Included",
      }),
      fallbackService("digital-marketing-paid-advertising-meta-ads", "Meta Ads Management", {
        description: "Campaigns: 2 · Remarketing: Included",
      }),
      fallbackService(
        "digital-marketing-content-marketing-short-form-video",
        "Short-Form Video Content",
        { description: "Videos Per Month: 4" },
      ),
      fallbackService("digital-marketing-analytics-marketing-analytics", "Marketing Analytics", {
        description: "Frequency: monthly",
      }),
    ],
    addOns: [],
    ctaLabel: "Discuss Scale",
    pricing: { setup: 4999, monthly: 11999, annual: 143988, minimumMonths: 12 },
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Not finding what you need? Let's build it together.",
    icon: "MessageSquare",
    timeline: "We'll scope and quote after consultation",
    services: [
      fallbackService("custom-mix", "Pick services from any plan"),
      fallbackService(
        "custom-new",
        "Request services not listed above like Custom Software Development — Dashboards, CRMs, Internal Tools",
      ),
      fallbackService("custom-quote", "Receive a custom quote within 48h"),
    ],
    addOns: [],
    ctaLabel: "Contact Us",
  },
];
