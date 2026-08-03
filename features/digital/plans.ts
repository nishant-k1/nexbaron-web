import { Rocket, MapPin, TrendingUp } from "lucide-react";

export type BillingType = "oneTime" | "monthly";

export interface PlanService {
  id: string;
  label: string;
  price: number;
  type: BillingType;
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
  forWho: string[];
  timeline: string;
  featured?: boolean;
  inherited?: InheritedService;
  icon: React.ElementType;
  services: PlanService[];
  addOns: string[];
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
    forWho: [
      "New salons & cafes",
      "Freelancers",
      "Home-service businesses",
      "Shops getting online for the first time",
    ],
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
    addOns: ["Extra pages (₹999/page)", "Additional photos (₹499)", "Domain setup (₹999 one-time)"],
    ctaLabel: "Start With Launch",
  },
  {
    id: "growth",
    name: "Growth",
    oneTime: 39999,
    monthly: 3999,
    monthlyName: "Growth Care",
    tagline: "Generate more calls, WhatsApp enquiries, and Google leads every month.",
    forWho: [
      "Restaurants & cafes",
      "Clinics & doctors",
      "Salons, spas & gyms",
      "Law & CA firms",
      "Local businesses relying on Google searches",
    ],
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
    addOns: ["Google Ads setup (separate)", "Extra city coverage", "Payment link in chat"],
    ctaLabel: "Start With Growth",
  },
  {
    id: "scale",
    name: "Scale",
    oneTime: 59999,
    monthly: 7999,
    monthlyName: "Business Partner",
    tagline: "Your outsourced digital growth team.",
    forWho: [
      "Multi-location businesses",
      "Growing practices that have outgrown DIY",
      "Owners who want it handled, not managed",
    ],
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
    addOns: ["Same-day priority support", "Multi-location campaigns", "Advanced reporting"],
    ctaLabel: "Start With Scale",
  },
];

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
