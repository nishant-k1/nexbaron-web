// Minimal plan data for server components at build time (generateMetadata,
// generateStaticParams, etc.). The runtime source of truth is the API's
// /digital/catalog endpoint — see PlansProvider in catalog.tsx.
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
    note: "Submitted within 2 days. Google verifies in 3-10 business days.",
  },
  {
    label: "Website launch",
    note: "Live on your confirmed date. Includes design, build, and review.",
  },
  {
    label: "Search visibility",
    note: "Begins ranking for local searches. Improves over 4-8 weeks.",
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
    oneTime: 24999,
    monthly: 1499,
    monthlyName: "Care",
    tagline: "Get your business online, professionally.",
    icon: () => null,
    timeline: "Website live in ~7 days",
    ctaLabel: "Start With Launch",
    services: [],
    addOns: [],
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 39999,
    monthly: 3999,
    monthlyName: "Growth Care",
    tagline: "Generate more calls, WhatsApp enquiries, and Google leads.",
    icon: () => null,
    timeline: "Website live in ~9 days",
    featured: true,
    ctaLabel: "Start With Growth",
    inherited: { label: "Everything in Launch", oneTime: 24999, monthly: 1499 },
    services: [],
    addOns: [],
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: 59999,
    monthly: 7999,
    monthlyName: "Business Partner",
    tagline: "Your outsourced digital growth team.",
    icon: () => null,
    timeline: "30-day foundation",
    timelineMode: "phased",
    foundationDays: 30,
    ctaLabel: "Start With Scale",
    inherited: { label: "Everything in Growth", oneTime: 39999, monthly: 3999 },
    services: [],
    addOns: [],
  },
];
