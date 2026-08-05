"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { plans as defaultPlans, type Plan } from "@/features/digital/plans";
import { getApiUrl } from "@/lib/api";

export interface CatalogService {
  id: string;
  label: string;
  price: number;
  type: "oneTime" | "monthly";
  unitLabel?: string;
  deliverDays?: number;
  parallel?: boolean;
  stage?: "design" | "build" | "setup";
}

export interface CatalogPlan {
  id: string;
  name: string;
  oneTime: number;
  monthly: number;
  monthlyName: string;
  tagline: string;
  timeline: string;
  featured?: boolean;
  inherited?: { label: string; oneTime: number; monthly: number };
  services: CatalogService[];
  addOns: CatalogService[];
  ctaLabel: string;
  timelineMode?: "phased";
  foundationDays?: number;
  expectations?: { label: string; note: string }[];
}

export interface DigitalCatalog {
  version: string;
  updatedAt: string;
  currency: "INR";
  plans: CatalogPlan[];
}

const CACHE_KEY = "nexbaron-digital-catalog";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface PlansContextValue {
  plans: Plan[];
  source: "local" | "catalog";
  loading: boolean;
}

const PlansContext = createContext<PlansContextValue>({
  plans: defaultPlans,
  source: "local",
  loading: true,
});

export function usePlans(): PlansContextValue {
  return useContext(PlansContext);
}

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
    // ignore quota / privacy mode failures — static fallback remains
  }
}

export function mergeCatalog(defaults: Plan[], fetched: CatalogPlan[]): Plan[] {
  if (!Array.isArray(fetched) || fetched.length === 0) return defaults;
  const localById = new Map(defaults.map((p) => [p.id, p]));
  const merged: Plan[] = fetched.map((remote) => {
    const local = localById.get(remote.id);
    const plan: Plan = {
      ...remote,
      icon: local?.icon ?? (() => null),
    };
    return plan;
  });
  return merged;
}

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [source, setSource] = useState<"local" | "catalog">("local");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setPlans(mergeCatalog(defaultPlans, cached));
      setSource("catalog");
      setLoading(false);
    }

    (async () => {
      try {
        const response = await fetch(`${getApiUrl("digital")}/api/digital/catalog`, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
        const data = (await response.json()) as DigitalCatalog;
        if (!Array.isArray(data.plans) || data.plans.length === 0) throw new Error("Empty catalog");
        writeCache(data.plans);
        if (!cancelled) {
          setPlans(mergeCatalog(defaultPlans, data.plans));
          setSource("catalog");
        }
      } catch {
        if (!cancelled) setLoading(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PlansContext.Provider value={{ plans, source, loading }}>{children}</PlansContext.Provider>
  );
}
