import { Rocket, MapPin, TrendingUp } from "lucide-react";

export type BillingType = "oneTime" | "monthly";

export interface PlanService {
  id: string;
  label: string;
  price: number;
  type: BillingType;
  unitLabel?: string;
}

export interface InheritedService {
  label: string;
  oneTime: number;
  monthly: number;
}

export interface Plan {
  id: string;
  name: string;
  oneTime: number;
  monthly: number;
  monthlyName: string;
  tagline: string;
  timeline: string;
  featured?: boolean;
  inherited?: InheritedService;
  icon: React.ElementType;
  services: PlanService[];
  addOns: PlanService[];
  ctaLabel: string;
}

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    oneTime: 24999,
    monthly: 1499,
    monthlyName: "Care",
    tagline: "Get your business online, professionally.",
    timeline: "Live in 7 days",
    icon: Rocket,
    services: [
      {
        id: "website",
        label: "Professional business website (up to 4 pages)",
        price: 18000,
        type: "oneTime",
      },
      { id: "mobile-design", label: "Mobile-perfect design", price: 3000, type: "oneTime" },
      { id: "logo", label: "Your logo, colors & business photos", price: 2000, type: "oneTime" },
      {
        id: "whatsapp-btn",
        label: "\u201cWhatsApp us\u201d button on every page",
        price: 999,
        type: "oneTime",
      },
      {
        id: "gbp-setup",
        label: "Google Business Profile created & verified",
        price: 1000,
        type: "oneTime",
      },
      {
        id: "enquiries",
        label: "Every enquiry emailed straight to you",
        price: 1499,
        type: "monthly",
      },
    ],
    addOns: [
      {
        id: "launch-extra-pages",
        label: "Extra pages",
        price: 999,
        type: "oneTime",
        unitLabel: "per page",
      },
      { id: "launch-photos", label: "Additional photos", price: 499, type: "oneTime" },
      { id: "launch-domain", label: "Domain setup", price: 999, type: "oneTime" },
    ],
    ctaLabel: "Start With Launch",
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 39999,
    monthly: 3999,
    monthlyName: "Growth Care",
    tagline: "Generate more calls, WhatsApp enquiries, and Google leads every month.",
    timeline: "Live in 7–10 days · ranking builds over 60–90 days",
    featured: true,
    inherited: { label: "Everything in Launch", oneTime: 24999, monthly: 1499 },
    icon: MapPin,
    services: [
      {
        id: "gbp-opt",
        label: "Google Business Profile optimization",
        price: 15000,
        type: "oneTime",
      },
      {
        id: "reviews",
        label: "Review system — we ask after every sale",
        price: 800,
        type: "monthly",
      },
      {
        id: "rank",
        label: "Rank for \u201cnear me\u201d searches in your city",
        price: 1000,
        type: "monthly",
      },
      {
        id: "whatsapp-booking",
        label: "WhatsApp booking & no-show reminders",
        price: 800,
        type: "monthly",
      },
      {
        id: "auto-answers",
        label: "24/7 automatic answers (hours, address, prices)",
        price: 900,
        type: "monthly",
      },
      { id: "report", label: "Plain-English monthly ranking report", price: 499, type: "monthly" },
    ],
    addOns: [
      { id: "growth-ads", label: "Google Ads setup", price: 4999, type: "oneTime" },
      { id: "growth-city", label: "Extra city coverage", price: 3000, type: "monthly" },
      { id: "growth-payment", label: "Payment link in chat", price: 2000, type: "oneTime" },
    ],
    ctaLabel: "Start With Growth",
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: 59999,
    monthly: 7999,
    monthlyName: "Business Partner",
    tagline: "Your outsourced digital growth team.",
    timeline: "First 30 days: foundation + audit + plan",
    inherited: { label: "Everything in Growth", oneTime: 39999, monthly: 3999 },
    icon: TrendingUp,
    services: [
      { id: "manager", label: "Dedicated growth manager", price: 1500, type: "monthly" },
      {
        id: "strategy",
        label: "Monthly strategy session & growth plan",
        price: 1000,
        type: "monthly",
      },
      {
        id: "unlimited-content",
        label: "Unlimited content & page updates",
        price: 1500,
        type: "monthly",
      },
      {
        id: "competitor-review",
        label: "Quarterly competitor review",
        price: 1000,
        type: "monthly",
      },
      {
        id: "campaign-pages",
        label: "Campaign & offer pages (seasonal, launches)",
        price: 9000,
        type: "oneTime",
      },
    ],
    addOns: [
      { id: "scale-support", label: "Same-day priority support", price: 5000, type: "monthly" },
      { id: "scale-multi", label: "Multi-location campaigns", price: 8000, type: "oneTime" },
      { id: "scale-reporting", label: "Advanced reporting", price: 4000, type: "monthly" },
    ],
    ctaLabel: "Start With Scale",
  },
];

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
