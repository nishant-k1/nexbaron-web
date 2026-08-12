// Static plan data used as fallback when the catalog API is unreachable.
// Must stay in sync with the backend source of truth:
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
    oneTime: 4999,
    monthly: 624,
    monthlyName: "Care",
    tagline: "A professional website for your business.",
    icon: () => null,
    timeline: "Live in 5–7 days",
    services: [
      {
        id: "website",
        label: "Website — Up to 5 Pages",
        price: 2500,
        carePrice: 199,
        type: "oneTime" as const,
        deliverDays: 3,
        stage: "build" as const,
      },
      {
        id: "whatsapp",
        label: "WhatsApp Button on Every Page",
        price: 499,
        carePrice: 50,
        type: "oneTime" as const,
        deliverDays: 0,
        stage: "build" as const,
      },
      {
        id: "gbp",
        label: "Google Business Profile Setup",
        price: 500,
        carePrice: 50,
        type: "oneTime" as const,
        deliverDays: 1,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "seo-basic",
        label: "Basic SEO Setup",
        price: 1000,
        carePrice: 175,
        type: "oneTime" as const,
        deliverDays: 1,
        stage: "setup" as const,
      },
      {
        id: "analytics",
        label: "Basic Analytics",
        price: 500,
        carePrice: 150,
        type: "oneTime" as const,
        deliverDays: 1,
        parallel: true,
        stage: "setup" as const,
      },
    ],
    addOns: [],
    ctaLabel: "Get Launch",
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 12499,
    monthly: 1249,
    monthlyName: "Growth Care",
    tagline: "Get found on Google and booked on WhatsApp.",
    icon: () => null,
    timeline: "Live in 5–7 days · ranking builds over 4–8 weeks",
    featured: true,
    ctaLabel: "Get Growth",
    inherited: { label: "Everything in Launch", oneTime: 4999, monthly: 624 },
    services: [
      {
        id: "gbp-optimise",
        label: "Google Business Profile Optimized for Your City",
        price: 5000,
        carePrice: 125,
        type: "oneTime" as const,
        deliverDays: 1,
        stage: "setup" as const,
      },
      {
        id: "local-seo",
        label: "Local SEO to Improve Search Visibility",
        price: 500,
        carePrice: 125,
        type: "oneTime" as const,
        deliverDays: 0,
        stage: "setup" as const,
      },
      {
        id: "whatsapp-book",
        label: "WhatsApp Booking & Reminders",
        price: 500,
        carePrice: 100,
        type: "oneTime" as const,
        deliverDays: 1,
        stage: "setup" as const,
      },
      {
        id: "seo-opt",
        label: "SEO Optimization",
        price: 500,
        carePrice: 100,
        type: "oneTime" as const,
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "reviews",
        label: "Review Management",
        price: 500,
        carePrice: 100,
        type: "oneTime" as const,
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "social",
        label: "Social Media Posts",
        price: 500,
        carePrice: 75,
        type: "oneTime" as const,
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
    ],
    addOns: [],
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: 24999,
    monthly: 2499,
    monthlyName: "Business Partner",
    tagline: "A dedicated team managing your online growth.",
    icon: () => null,
    timeline: "Kick-off call within 3 days",
    timelineMode: "phased",
    foundationDays: 30,
    ctaLabel: "Get Scale",
    inherited: { label: "Everything in Growth", oneTime: 12499, monthly: 1249 },
    services: [
      {
        id: "unlimited-updates",
        label: "Unlimited Content & Page Updates",
        price: 2000,
        carePrice: 200,
        type: "oneTime" as const,
      },
      {
        id: "social-reels",
        label: "Social Media Posts + Reels",
        price: 2000,
        carePrice: 200,
        type: "oneTime" as const,
      },
      {
        id: "gbp-mgmt",
        label: "Google Business Profile Management",
        price: 1500,
        carePrice: 150,
        type: "oneTime" as const,
      },
      {
        id: "campaign-exec",
        label: "Campaign Execution",
        price: 3000,
        carePrice: 200,
        type: "oneTime" as const,
        deliverDays: 3,
        stage: "build" as const,
      },
      {
        id: "competitor",
        label: "Competitor Analysis",
        price: 1500,
        carePrice: 150,
        type: "oneTime" as const,
      },
      {
        id: "perf-report",
        label: "Monthly Performance Report",
        price: 1500,
        carePrice: 200,
        type: "oneTime" as const,
      },
      {
        id: "strategy",
        label: "Monthly Strategy Call",
        price: 1000,
        carePrice: 150,
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
