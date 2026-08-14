import type { LucideIcon } from "lucide-react";

import { getApiUrl } from "@/lib/api";
import { getIcon } from "@/lib/icon-map";

export type BusinessTier = "tier1" | "tier2";

export interface BusinessService {
  id: string;
  label: string;
  clientCostNote?: string;
  aggregate?: {
    selling: { setup: number; monthly: number; annual: number };
  };
  unitLabel?: string;
}

interface RawBusiness {
  id: string;
  slug: string;
  label: string;
  category: string;
  tier: BusinessTier;
  icon: string;
  tagline: string;
  problems: string[];
  recommendedPlan: string;
  serviceIds: string[];
  addOnIds: string[];
  services: BusinessService[];
  addOns: BusinessService[];
  pricing: { setup: number; monthly: number; annual: number };
}

export interface ResolvedBusiness extends Omit<RawBusiness, "icon"> {
  icon: LucideIcon;
}

export interface BusinessCatalog {
  version: string;
  categories: string[];
  businesses: RawBusiness[];
}

function resolveIcon(business: RawBusiness): ResolvedBusiness {
  return { ...business, icon: getIcon(business.icon) };
}

let cached: { at: number; data: ResolvedBusiness[] } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function getBusinesses(): Promise<ResolvedBusiness[]> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.data;
  try {
    const response = await fetch(`${getApiUrl("digital")}/digital/businesses`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Business catalog request failed: ${response.status}`);
    const data = (await response.json()) as BusinessCatalog;
    cached = { at: Date.now(), data: data.businesses.map(resolveIcon) };
  } catch {
    // Degrade gracefully to the static mirror when the API is unreachable.
    cached = { at: Date.now(), data: businessFallback.map(resolveIcon) };
  }
  return cached.data;
}

export async function getBusinessBySlug(slug: string): Promise<ResolvedBusiness | undefined> {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.slug === slug);
}

// Static mirror of the API business catalog (metadata only — no resolved
// services or pricing). Used as a degraded fallback so SSG pages never 404.
const businessFallback: RawBusiness[] = [
  {
    id: "restaurants",
    slug: "restaurants",
    label: "Restaurants",
    category: "Food & Hospitality",
    tier: "tier2",
    icon: "Utensils",
    tagline: "Get found by hungry locals and take orders on WhatsApp.",
    problems: [
      'Customers searching "near me" pick your competitor?',
      "Your menu and offers invisible on phones?",
      "Good reviews going unwritten?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "reviews", "qr-suite"],
    addOnIds: ["ordering-page", "appointment-booking", "meta-ads-setup"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "cafes",
    slug: "cafes",
    label: "Cafes & Tea Stalls",
    category: "Food & Hospitality",
    tier: "tier1",
    icon: "Coffee",
    tagline: "A QR menu and a Google presence that fills seats.",
    problems: [
      "Passers-by can't find you on Maps?",
      "Your menu isn't scannable on the table?",
      "No way for customers to order ahead?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "qr-suite"],
    addOnIds: ["launch-pages"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "bakeries",
    slug: "bakeries",
    label: "Bakeries & Sweet Shops",
    category: "Food & Hospitality",
    tier: "tier1",
    icon: "Cake",
    tagline: "Show off your bakes and take festive orders online.",
    problems: [
      "Customers asking for your menu on WhatsApp?",
      "Festive orders getting missed?",
      "Your best cakes hidden from new buyers?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "ordering-page"],
    addOnIds: ["festive-campaign"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "hotels",
    slug: "hotels",
    label: "Boutique Hotels & Homestays",
    category: "Food & Hospitality",
    tier: "tier2",
    icon: "Hotel",
    tagline: "A presence that books rooms while you sleep.",
    problems: [
      "Travellers booking the hotel that shows up first?",
      "No easy way for guests to check availability?",
      "Reviews and photos not selling the experience?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "reviews", "social"],
    addOnIds: ["appointment-booking", "meta-ads-management", "sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "salons",
    slug: "salons",
    label: "Salons & Beauty Parlours",
    category: "Beauty & Wellness",
    tier: "tier1",
    icon: "Scissors",
    tagline: "Fill your chairs with online booking and reminders.",
    problems: [
      "Chairs sitting empty on your busy days?",
      "Clients forgetting to rebook?",
      "No-shows costing you revenue?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "appointment-booking"],
    addOnIds: ["social", "sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "spas",
    slug: "spas",
    label: "Spas & Wellness Centres",
    category: "Beauty & Wellness",
    tier: "tier2",
    icon: "Flower2",
    tagline: "Package bookings and a calm, premium online presence.",
    problems: [
      "Clients comparing you against bigger spas?",
      "Package bookings hard to manage over calls?",
      "Your atmosphere not coming through online?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "social", "appointment-booking"],
    addOnIds: ["sms-marketing", "festive-campaign"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "gyms",
    slug: "gyms",
    label: "Gyms & Fitness Studios",
    category: "Beauty & Wellness",
    tier: "tier2",
    icon: "Dumbbell",
    tagline: "Fill memberships and classes with reminders and reviews.",
    problems: [
      "Memberships not renewing?",
      "Prospects picking the gym that answers first?",
      "Classes under-booked and hard to fill?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "reviews", "social"],
    addOnIds: ["appointment-booking", "sms-marketing", "membership"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "clinics",
    slug: "clinics",
    label: "Doctor Clinics",
    category: "Healthcare",
    tier: "tier1",
    icon: "Stethoscope",
    tagline: "Patients book themselves and never miss an appointment.",
    problems: [
      "Too many calls just to check timings?",
      "Patients asking for directions?",
      "Appointments getting missed?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "appointment-booking"],
    addOnIds: ["whatsapp-book", "sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "multi-speciality",
    slug: "multi-speciality",
    label: "Multi-Speciality Clinics",
    category: "Healthcare",
    tier: "tier2",
    icon: "HeartPulse",
    tagline: "One front desk for every department, online and always on.",
    problems: [
      "Patients routed through a confusing front desk?",
      "Departments and doctors hard to find online?",
      "Follow-ups slipping through the cracks?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "reviews", "appointment-booking"],
    addOnIds: ["ai-chatbot", "email-marketing-setup", "sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "tutors",
    slug: "tutors",
    label: "Private Tutors",
    category: "Education",
    tier: "tier1",
    icon: "GraduationCap",
    tagline: "Get found by parents and book demo classes online.",
    problems: [
      "Parents finding the tutor with better reviews?",
      "Demo classes hard to schedule over the phone?",
      "Your results and credentials not visible?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "reviews"],
    addOnIds: ["appointment-booking"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "coaching",
    slug: "coaching",
    label: "Coaching Institutes",
    category: "Education",
    tier: "tier2",
    icon: "BookOpen",
    tagline: "Admissions enquiries captured and followed up automatically.",
    problems: [
      "Enquiries going cold after hours?",
      "Results and faculty not showcased?",
      "Follow-ups slipping through the cracks?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "reviews", "social"],
    addOnIds: ["appointment-booking", "sms-marketing", "email-marketing-setup"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "schools",
    slug: "schools",
    label: "Schools & Pre-Schools",
    category: "Education",
    tier: "tier2",
    icon: "School",
    tagline: "Admissions season without the enquiry chaos.",
    problems: [
      "Parents comparing schools online before calling?",
      "Admission enquiries scattered across calls and WhatsApp?",
      "Events and achievements not visible?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "social"],
    addOnIds: ["ai-lead-qualifier", "email-marketing-setup"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "kirana",
    slug: "kirana",
    label: "Kirana & Grocery Stores",
    category: "Retail",
    tier: "tier1",
    icon: "ShoppingCart",
    tagline: "Take orders on WhatsApp and accept UPI with a QR.",
    problems: [
      "Customers calling to ask what's in stock?",
      "No easy way to take phone orders?",
      "Nearby shoppers can't find you online?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "ordering-page"],
    addOnIds: ["qr-suite"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "boutiques",
    slug: "boutiques",
    label: "Boutiques & Tailoring",
    category: "Retail",
    tier: "tier1",
    icon: "Shirt",
    tagline: "A catalogue that sells your designs on WhatsApp.",
    problems: [
      "Customers asking to see your latest designs?",
      "New arrivals not reaching your regulars?",
      "Your craftsmanship invisible online?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "social"],
    addOnIds: ["ai-product-photos"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "supermarkets",
    slug: "supermarkets",
    label: "Supermarkets",
    category: "Retail",
    tier: "tier2",
    icon: "Store",
    tagline: "Offers, delivery, and a store locator that brings footfall.",
    problems: [
      "Shoppers picking the store that shows up first?",
      "Offers and new stock not reaching customers?",
      "Delivery enquiries hard to manage?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "social"],
    addOnIds: ["sms-marketing", "delivery-tracking"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "pharmacies",
    slug: "pharmacies",
    label: "Pharmacies & Medical Stores",
    category: "Retail",
    tier: "tier2",
    icon: "Pill",
    tagline: "Order-ahead refills and reminders for regular customers.",
    problems: [
      "Patients calling to check medicine availability?",
      "Refills and reminders hard to track?",
      'Your store not showing for "pharmacy near me"?',
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "ordering-page"],
    addOnIds: ["sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "plumbers-electricians",
    slug: "plumbers-electricians",
    label: "Plumbers & Electricians",
    category: "Home Services",
    tier: "tier1",
    icon: "Wrench",
    tagline: 'Get found for "near me" emergencies and book instantly.',
    problems: [
      "Emergency calls going to the competitor who ranks first?",
      "No easy way to get a quote or book a visit?",
      "Your work and reviews not visible?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "reviews"],
    addOnIds: ["launch-pages"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "laundry",
    slug: "laundry",
    label: "Laundry & Dry Cleaners",
    category: "Home Services",
    tier: "tier1",
    icon: "Shirt",
    tagline: "Pickup requests and status updates on WhatsApp.",
    problems: [
      "Customers calling to schedule pickups?",
      "Order status hard to communicate?",
      "Nearby customers can't find you online?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "ordering-page"],
    addOnIds: ["delivery-tracking"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "car-service",
    slug: "car-service",
    label: "Car Service Centres",
    category: "Home Services",
    tier: "tier2",
    icon: "Car",
    tagline: "Service bookings and reminders that keep bays full.",
    problems: [
      "Customers forgetting service due dates?",
      "Bookings scattered across calls?",
      "Your centre not ranking for local searches?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "appointment-booking"],
    addOnIds: ["sms-marketing"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "law-ca",
    slug: "law-ca",
    label: "Law & CA Firms",
    category: "Professional Services",
    tier: "tier2",
    icon: "Scale",
    tagline: "A credible presence that wins trust before the first call.",
    problems: [
      "Clients Googling your practice area first?",
      "Your firm not looking established online?",
      "Consultations going to the firm that does?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "reviews", "business-email"],
    addOnIds: ["appointment-booking", "blog-content"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "real-estate",
    slug: "real-estate",
    label: "Real Estate & Builders",
    category: "Professional Services",
    tier: "tier2",
    icon: "Building",
    tagline: "Project pages and instant enquiries that never slip.",
    problems: [
      "Serious buyers going cold after they enquire?",
      "Follow-ups slipping through the cracks?",
      "Projects invisible to local buyers?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "local-seo", "social", "brochure-pdf"],
    addOnIds: ["ai-lead-qualifier", "meta-ads-setup"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "photographers",
    slug: "photographers",
    label: "Photographers",
    category: "Creative & Events",
    tier: "tier1",
    icon: "Camera",
    tagline: "A portfolio that books shoots while you're shooting.",
    problems: [
      "Clients asking to see your portfolio on WhatsApp?",
      "Your best work hidden across apps?",
      "Bookings coming in while you're busy?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "social-reels"],
    addOnIds: ["branding-identity"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "event-planners",
    slug: "event-planners",
    label: "Event Planners",
    category: "Creative & Events",
    tier: "tier2",
    icon: "CalendarDays",
    tagline: "Enquiries captured and packaged into winning proposals.",
    problems: [
      "Enquiries scattered across calls and DMs?",
      "Your past events not showcasing your range?",
      "Proposals taking too long to send?",
    ],
    recommendedPlan: "growth",
    serviceIds: ["website", "gbp-optimise", "social", "brochure-pdf"],
    addOnIds: ["ai-lead-qualifier", "festive-campaign"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
  {
    id: "startups",
    slug: "startups",
    label: "Startups & SMEs",
    category: "Creative & Events",
    tier: "tier1",
    icon: "Rocket",
    tagline: "A credible footprint live on a confirmed date.",
    problems: [
      "Looking unprofessional to new customers?",
      "No time to figure out a website?",
      "Lost enquiries after you close for the day?",
    ],
    recommendedPlan: "launch",
    serviceIds: ["website", "gbp", "whatsapp", "analytics", "branding-identity"],
    addOnIds: ["business-email"],
    services: [],
    addOns: [],
    pricing: { setup: 0, monthly: 0, annual: 0 },
  },
];
