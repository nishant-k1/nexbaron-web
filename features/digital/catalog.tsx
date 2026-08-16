"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { getApiUrl } from "@/lib/api";

export interface ServiceItem {
  label: string;
  costPrice: { setup: number; monthly: number; annual: number }; // INR — vendor/pass-through COGS
  labourHours?: { setup?: number; monthly?: number; annual?: number }; // our hours per tier
  hourlyCost?: number; // override for the global labour rate
  markupPct: { setup: number; monthly: number; annual: number }; // markup percentage (40 = 40%)
  sellingPrice?: { setup?: number; monthly?: number; annual?: number }; // optional INR override
}

export interface ServiceAggregate {
  vendor: { setup: number; monthly: number; annual: number }; // INR
  labour: { setup: number; monthly: number; annual: number }; // INR
  cost: { setup: number; monthly: number; annual: number }; // INR — vendor + labour
  selling: { setup: number; monthly: number; annual: number }; // INR
  grossMarginPct: { setup: number | null; monthly: number | null; annual: number | null }; // null = no modeled cost
  costCoveredPct: { setup: number; monthly: number; annual: number }; // % of selling backed by modeled cost
}

export interface CatalogService {
  id: string;
  label: string;
  description?: string;
  domain?: string;
  category?: string;
  service?: string;
  scope?: Record<string, unknown>;
  items: ServiceItem[];
  clientCostNote?: string;
  aggregate?: ServiceAggregate;
  unitLabel?: string;
  deliverDays?: number;
  parallel?: boolean;
  stage?: "design" | "build" | "setup";
  icon?: string;
  section?: string;
}

export interface PlanPricing {
  setup: number;
  monthly: number;
  annual?: number;
  minimumMonths?: number;
}

export interface CatalogPlan {
  id: string;
  name: string;
  tagline: string;
  timeline: string;
  icon: string;
  featured?: boolean;
  inherited?: { label: string };
  inheritsFrom?: string;
  services: CatalogService[];
  addOns: CatalogService[];
  ctaLabel: string;
  timelineMode?: "phased";
  foundationDays?: number;
  expectations?: { label: string; note: string }[];
  pricing?: PlanPricing;
}

interface PlansContextValue {
  plans: CatalogPlan[];
  loading: boolean;
}

const CACHE_KEY = "nexbaron-digital-catalog-v2";
const CACHE_TTL = 15 * 60 * 1000;

function readCache(): CatalogPlan[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; plans: CatalogPlan[] };
    if (!parsed?.plans || Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.plans;
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
  return data.plans;
}

const PlansContext = createContext<PlansContextValue>({
  plans: [],
  loading: true,
});

export function usePlans(): PlansContextValue {
  return useContext(PlansContext);
}

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<CatalogPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cached = readCache();
      await Promise.resolve();
      if (cancelled) return;
      if (cached) {
        setPlans(cached);
        setLoading(false);
      }

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
