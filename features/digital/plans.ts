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

export function svcSetup(svc: CatalogService): number {
  return svc.aggregate?.selling.setup ?? 0;
}

export function svcMonthly(svc: CatalogService): number {
  return svc.aggregate?.selling.monthly ?? 0;
}

function fallbackService(
  id: string,
  label: string,
  opts?: Partial<CatalogService>,
): CatalogService {
  return { id, label, items: [], ...opts };
}

// Pricing mirrors the values computed by the backend enrichCatalog. Do not
// rely on these for checkout — the server recomputes everything on create-order.
export const plans: CatalogPlan[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "A professional website for your business.",
    icon: "Rocket",
    timeline: "Live in 2–3 days",
    services: [
      fallbackService("website", "Website — Up to 5 Pages", { deliverDays: 1, stage: "build" }),
      fallbackService("whatsapp", "WhatsApp Chat Button", { deliverDays: 0, stage: "build" }),
      fallbackService("gbp", "Google Business Profile — Setup & Verify", {
        deliverDays: 0.5,
        parallel: true,
        stage: "setup",
      }),
      fallbackService("analytics", "Visit Analytics", {
        deliverDays: 0.5,
        parallel: true,
        stage: "setup",
      }),
    ],
    addOns: [],
    ctaLabel: "Get Launch",
    minimumMonths: 3,
    pricing: {
      setup: 13870,
      monthly: 1154,
      annual: 0,
      ownSetup: 13870,
      ownMonthly: 1154,
      ownAnnual: 0,
    },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Get found on Google and booked on WhatsApp.",
    icon: "TrendingUp",
    timeline: "Live in 2–3 days · ranking builds over 4–8 weeks",
    featured: true,
    inherited: { label: "Everything in Launch" },
    services: [
      fallbackService("gbp-optimise", "Google Business Profile — Optimize & Rank", {
        deliverDays: 0.5,
        stage: "setup",
      }),
      fallbackService("local-seo", "Local SEO — Google Maps Ranking", { stage: "setup" }),
      fallbackService("whatsapp-book", "WhatsApp Business — Auto-reply & Booking", {
        deliverDays: 0.5,
        stage: "setup",
      }),
      fallbackService("reviews", "Review Generation & Management", {
        deliverDays: 0.25,
        parallel: true,
        stage: "setup",
      }),
      fallbackService("social", "Social Media — 8 Posts/month", {
        deliverDays: 0.25,
        parallel: true,
        stage: "setup",
      }),
      fallbackService("seo-report", "Monthly SEO Health Report", {
        deliverDays: 0.25,
        parallel: true,
        stage: "setup",
      }),
    ],
    addOns: [],
    ctaLabel: "Get Growth",
    minimumMonths: 3,
    pricing: {
      setup: 15570,
      monthly: 12809,
      annual: 0,
      ownSetup: 1700,
      ownMonthly: 11655,
      ownAnnual: 0,
    },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "A dedicated team managing your online growth.",
    icon: "Building2",
    timeline: "Kick-off call within 3 days",
    timelineMode: "phased",
    foundationDays: 30,
    inherited: { label: "Everything in Growth" },
    services: [
      fallbackService("account-manager", "Dedicated Growth Manager"),
      fallbackService("unlimited-updates", "Content & Page Updates — Unlimited"),
      fallbackService("social-reels", "Social Media — Reels & Stories"),
      fallbackService("google-ads-management", "Google Ads Management — Search, Maps & Video", {
        deliverDays: 1,
        stage: "build",
      }),
      fallbackService(
        "meta-ads-management",
        "Meta Ads Management — Facebook + Instagram + WhatsApp + Messenger",
      ),
      fallbackService(
        "email-marketing",
        "Email Marketing Management — Campaigns + Optimization + Reporting",
      ),
      fallbackService("competitor", "Competitor & Market Analysis"),
    ],
    addOns: [],
    ctaLabel: "Get Scale",
    minimumMonths: 3,
    pricing: {
      setup: 15570,
      monthly: 31844,
      annual: 0,
      ownSetup: 0,
      ownMonthly: 19035,
      ownAnnual: 0,
    },
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Not finding what you need? Let's build it together.",
    icon: "MessageSquare",
    timeline: "We'll scope and quote within 2 days",
    services: [
      fallbackService("custom-mix", "Pick services from any plan"),
      fallbackService("custom-new", "Request services not listed above"),
      fallbackService("custom-quote", "Receive a custom quote within 48h"),
    ],
    addOns: [],
    ctaLabel: "Contact Us",
  },
];
