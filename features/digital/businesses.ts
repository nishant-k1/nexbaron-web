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
    cached = { at: Date.now(), data: [] };
  }
  return cached.data;
}

export async function getBusinessBySlug(slug: string): Promise<ResolvedBusiness | undefined> {
  const businesses = await getBusinesses();
  return businesses.find((b) => b.slug === slug);
}
