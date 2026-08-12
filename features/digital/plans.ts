// Static plan data used as fallback when the catalog API is unreachable.
// Must stay in sync with the backend source of truth (v2 AI-era pricing):
//   nexbaron-api/src/features/digital/catalog/catalog.ts
import type { CatalogPlan, CatalogService } from "@/features/digital/catalog";

export type Plan = CatalogPlan;
export type BillingType = "oneTime" | "monthly";
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
export type PlanService = CatalogService;

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const plans: CatalogPlan[] = [
  {
    id: "launch",
    name: "Launch",
    oneTime: 999,
    monthly: 499,
    monthlyName: "Care",
    tagline: "A professional website for your business.",
    icon: () => null,
    timeline: "Live in 2–3 days",
    services: [
      {
        id: "website",
        label: "Website — Up to 5 Pages",
        price: 400,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 1,
        stage: "build" as const,
      },
      {
        id: "whatsapp",
        label: "WhatsApp Chat Button",
        price: 99,
        carePrice: 49,
        type: "oneTime" as const,
        deliverDays: 0,
        stage: "build" as const,
      },
      {
        id: "maps",
        label: "Google Maps Business Listing",
        price: 200,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "gbp",
        label: "Google Business Profile — Setup & Verify",
        price: 100,
        carePrice: 50,
        type: "oneTime" as const,
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "analytics",
        label: "Visit Analytics",
        price: 200,
        carePrice: 100,
        type: "oneTime" as const,
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
    ],
    addOns: [],
    ctaLabel: "Get Launch",
    minimumMonths: 3,
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 1999,
    monthly: 1499,
    monthlyName: "Growth Care",
    tagline: "Get found on Google and booked on WhatsApp.",
    icon: () => null,
    timeline: "Live in 2–3 days · ranking builds over 4–8 weeks",
    featured: true,
    ctaLabel: "Get Growth",
    minimumMonths: 3,
    inherited: { label: "Everything in Launch", oneTime: 999, monthly: 499 },
    services: [
      {
        id: "gbp-optimise",
        label: "Google Business Profile — Optimize & Rank",
        price: 400,
        carePrice: 250,
        type: "oneTime" as const,
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "local-seo",
        label: "Local SEO — Google Maps Ranking",
        price: 200,
        carePrice: 200,
        type: "oneTime" as const,
        deliverDays: 0,
        stage: "setup" as const,
      },
      {
        id: "whatsapp-book",
        label: "WhatsApp Business — Auto-reply & Booking",
        price: 200,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "reviews",
        label: "Review Generation & Management",
        price: 100,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 0.25,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "social",
        label: "Social Media — 8 Posts/month",
        price: 50,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 0.25,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "seo-report",
        label: "Monthly SEO Health Report",
        price: 50,
        carePrice: 100,
        type: "oneTime" as const,
        deliverDays: 0.25,
        parallel: true,
        stage: "setup" as const,
      },
    ],
    addOns: [],
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: 2999,
    monthly: 3499,
    monthlyName: "Business Partner",
    tagline: "A dedicated team managing your online growth.",
    icon: () => null,
    timeline: "Kick-off call within 3 days",
    timelineMode: "phased",
    foundationDays: 30,
    ctaLabel: "Get Scale",
    minimumMonths: 3,
    inherited: { label: "Everything in Growth", oneTime: 1999, monthly: 1499 },
    services: [
      {
        id: "account-manager",
        label: "Dedicated Growth Manager",
        price: 250,
        carePrice: 500,
        type: "oneTime" as const,
      },
      {
        id: "unlimited-updates",
        label: "Content & Page Updates — Unlimited",
        price: 200,
        carePrice: 350,
        type: "oneTime" as const,
      },
      {
        id: "social-reels",
        label: "Social Media — Reels & Stories",
        price: 200,
        carePrice: 300,
        type: "oneTime" as const,
      },
      {
        id: "google-ads",
        label: "Google Ads — Campaign Setup & Run",
        price: 200,
        carePrice: 450,
        type: "oneTime" as const,
        deliverDays: 1,
        stage: "build" as const,
      },
      {
        id: "competitor",
        label: "Competitor & Market Analysis",
        price: 100,
        carePrice: 200,
        type: "oneTime" as const,
      },
      {
        id: "strategy",
        label: "Monthly Strategy Call & Report",
        price: 50,
        carePrice: 200,
        type: "oneTime" as const,
      },
    ],
    addOns: [],
  },
  {
    id: "custom",
    name: "Custom",
    oneTime: 0,
    monthly: 0,
    monthlyName: "",
    tagline: "Not finding what you need? Let's build it together.",
    icon: () => null,
    timeline: "We'll scope and quote within 2 days",
    ctaLabel: "Contact Us",
    services: [
      {
        id: "custom-mix",
        label: "Pick services from any plan",
        price: 0,
        type: "oneTime" as const,
      },
      {
        id: "custom-new",
        label: "Request services not listed above",
        price: 0,
        type: "oneTime" as const,
      },
      {
        id: "custom-quote",
        label: "Receive a custom quote within 48h",
        price: 0,
        type: "oneTime" as const,
      },
    ],
    addOns: [],
  },
];
