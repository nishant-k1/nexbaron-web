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
    monthly: 1149,
    monthlyName: "Care",
    tagline: "A professional website for your business.",
    icon: () => null,
    timeline: "Live in 2–3 days",
    services: [
      {
        id: "website",
        label: "Website — Up to 5 Pages",
        type: "oneTime" as const,
        oneTime: { cost: 1500, selling: 2500 },
        monthly: { cost: 400, selling: 575 },
        deliverDays: 1,
        stage: "build" as const,
      },
      {
        id: "whatsapp",
        label: "WhatsApp Chat Button",
        type: "oneTime" as const,
        oneTime: { cost: 200, selling: 499 },
        monthly: { cost: 50, selling: 115 },
        deliverDays: 0,
        stage: "build" as const,
      },
      {
        id: "maps",
        label: "Google Maps Business Listing",
        type: "oneTime" as const,
        oneTime: { cost: 600, selling: 1000 },
        monthly: { cost: 100, selling: 230 },
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "gbp",
        label: "Google Business Profile — Setup & Verify",
        type: "oneTime" as const,
        oneTime: { cost: 400, selling: 500 },
        monthly: { cost: 113, selling: 115 },
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "analytics",
        label: "Visit Analytics",
        type: "oneTime" as const,
        oneTime: { cost: 400, selling: 500 },
        monthly: { cost: 100, selling: 114 },
        deliverDays: 0.5,
        parallel: true,
        stage: "setup" as const,
      },
    ],
    addOns: [],
    ctaLabel: "Get Launch",
    minimumMonths: 3,
    annualMonthly: 999,
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 7999,
    monthly: 5499,
    monthlyName: "Growth Care",
    tagline: "Get found on Google and booked on WhatsApp.",
    icon: () => null,
    timeline: "Live in 2–3 days · ranking builds over 4–8 weeks",
    featured: true,
    ctaLabel: "Get Growth",
    minimumMonths: 3,
    annualMonthly: 4599,
    inherited: { label: "Everything in Launch", oneTime: 4999, monthly: 1149 },
    services: [
      {
        id: "gbp-optimise",
        label: "Google Business Profile — Optimize & Rank",
        type: "oneTime" as const,
        oneTime: { cost: 500, selling: 1200 },
        monthly: { cost: 800, selling: 1200 },
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "local-seo",
        label: "Local SEO — Google Maps Ranking",
        type: "oneTime" as const,
        oneTime: { cost: 300, selling: 500 },
        monthly: { cost: 600, selling: 900 },
        deliverDays: 0,
        stage: "setup" as const,
      },
      {
        id: "whatsapp-book",
        label: "WhatsApp Business — Auto-reply & Booking",
        type: "oneTime" as const,
        oneTime: { cost: 300, selling: 500 },
        monthly: { cost: 400, selling: 700 },
        deliverDays: 0.5,
        stage: "setup" as const,
      },
      {
        id: "reviews",
        label: "Review Generation & Management",
        type: "oneTime" as const,
        oneTime: { cost: 200, selling: 300 },
        monthly: { cost: 350, selling: 650 },
        deliverDays: 0.25,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "social",
        label: "Social Media — 8 Posts/month",
        type: "oneTime" as const,
        oneTime: { cost: 150, selling: 250 },
        monthly: { cost: 300, selling: 500 },
        deliverDays: 0.25,
        parallel: true,
        stage: "setup" as const,
      },
      {
        id: "seo-report",
        label: "Monthly SEO Health Report",
        type: "oneTime" as const,
        oneTime: { cost: 150, selling: 250 },
        monthly: { cost: 200, selling: 400 },
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
    oneTime: 11999,
    monthly: 7999,
    monthlyName: "Business Partner",
    tagline: "A dedicated team managing your online growth.",
    icon: () => null,
    timeline: "Kick-off call within 3 days",
    timelineMode: "phased",
    foundationDays: 30,
    ctaLabel: "Get Scale",
    minimumMonths: 3,
    annualMonthly: 6699,
    inherited: { label: "Everything in Growth", oneTime: 7999, monthly: 5499 },
    services: [
      {
        id: "account-manager",
        label: "Dedicated Growth Manager",
        type: "oneTime" as const,
        oneTime: { cost: 400, selling: 1000 },
        monthly: { cost: 500, selling: 700 },
      },
      {
        id: "unlimited-updates",
        label: "Content & Page Updates — Unlimited",
        type: "oneTime" as const,
        oneTime: { cost: 300, selling: 800 },
        monthly: { cost: 350, selling: 500 },
      },
      {
        id: "social-reels",
        label: "Social Media — Reels & Stories",
        type: "oneTime" as const,
        oneTime: { cost: 300, selling: 800 },
        monthly: { cost: 250, selling: 400 },
      },
      {
        id: "google-ads",
        label: "Google Ads — Campaign Setup & Run",
        type: "oneTime" as const,
        oneTime: { cost: 250, selling: 800 },
        monthly: { cost: 300, selling: 550 },
        deliverDays: 1,
        stage: "build" as const,
      },
      {
        id: "competitor",
        label: "Competitor & Market Analysis",
        type: "oneTime" as const,
        oneTime: { cost: 100, selling: 350 },
        monthly: { cost: 100, selling: 150 },
      },
      {
        id: "strategy",
        label: "Monthly Strategy Call & Report",
        type: "oneTime" as const,
        oneTime: { cost: 50, selling: 250 },
        monthly: { cost: 100, selling: 200 },
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
      { id: "custom-mix", label: "Pick services from any plan", type: "oneTime" as const },
      { id: "custom-new", label: "Request services not listed above", type: "oneTime" as const },
      { id: "custom-quote", label: "Receive a custom quote within 48h", type: "oneTime" as const },
    ],
    addOns: [],
  },
];
