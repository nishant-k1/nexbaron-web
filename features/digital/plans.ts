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
    services: [],
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
    services: [],
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
    services: [],
    addOns: [],
  },
];
