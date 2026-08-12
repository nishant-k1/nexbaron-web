"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { plans as staticPlans } from "@/features/digital/plans";
import { getApiUrl } from "@/lib/api";
import { getIcon } from "@/lib/icon-map";

export interface ServiceItem {
  label: string;
  costPrice: { setup: number; monthly: number; annual: number };
  profitMargin: { setup: number; monthly: number; annual: number };
  sellingPrice?: { setup?: number; monthly?: number; annual?: number };
}

export interface ServiceAggregate {
  cost: { setup: number; monthly: number; annual: number };
  selling: { setup: number; monthly: number; annual: number };
  margin: { setup: number; monthly: number; annual: number };
}

export interface CatalogService {
  id: string;
  service: {
    label: string;
    items: ServiceItem[];
    clientCostNote?: string;
  };
  aggregate?: ServiceAggregate;
  unitLabel?: string;
  deliverDays?: number;
  parallel?: boolean;
  stage?: "design" | "build" | "setup";
}

export interface PlanPricing {
  setup: number;
  monthly: number;
  annual: number;
  ownSetup: number;
  ownMonthly: number;
  ownAnnual: number;
}

export interface CatalogPlan {
  id: string;
  name: string;
  tagline: string;
  timeline: string;
  icon: React.ElementType;
  featured?: boolean;
  inherited?: { label: string };
  services: CatalogService[];
  addOns: CatalogService[];
  ctaLabel: string;
  timelineMode?: "phased";
  foundationDays?: number;
  expectations?: { label: string; note: string }[];
  minimumMonths?: number;
  pricing?: PlanPricing;
}

interface PlansContextValue {
  plans: CatalogPlan[];
  loading: boolean;
}

const CACHE_KEY = "nexbaron-digital-catalog";
const CACHE_TTL = 15 * 60 * 1000;

function readCache(): CatalogPlan[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; plans: CatalogPlan[] };
    if (!parsed?.plans || Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.plans.map((p) => ({ ...p, icon: getIcon(p.icon as unknown as string) }));
  } catch {
    return null;
  }
}

function writeCache(plans: CatalogPlan[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), plans }));
  } catch {
    // ignore
  }
}

async function fetchCatalog(): Promise<CatalogPlan[]> {
  const response = await fetch(`${getApiUrl("digital")}/digital/catalog`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
  const data = (await response.json()) as { plans: (CatalogPlan & { icon: string })[] };
  if (!Array.isArray(data.plans) || data.plans.length === 0) throw new Error("Empty catalog");
  return data.plans.map((p) => ({ ...p, icon: getIcon(p.icon) }));
}

const PlansContext = createContext<PlansContextValue>({
  plans: [],
  loading: true,
});

export function usePlans(): PlansContextValue {
  return useContext(PlansContext);
}

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<CatalogPlan[]>(staticPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setPlans(cached);
      setLoading(false);
    }

    (async () => {
      try {
        const fetched = await fetchCatalog();
        writeCache(fetched);
        if (!cancelled) setPlans(fetched);
      } catch {
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <PlansContext.Provider value={{ plans, loading }}>{children}</PlansContext.Provider>;
}
