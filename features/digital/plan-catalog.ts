import type { CatalogPlan } from "@/features/digital/catalog";
import { getApiUrl } from "@/lib/api";

export interface PlanCatalog {
  version: string;
  updatedAt: string;
  currency: string;
  disclaimer?: string;
  plans: CatalogPlan[];
}

// Server-side catalog fetch — powers the pricing page (server-rendered for SEO).
// The API is the single source of truth for plan inclusions.
export async function getPlanCatalog(): Promise<PlanCatalog> {
  const response = await fetch(`${getApiUrl("digital")}/digital/catalog`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);

  const data = (await response.json()) as PlanCatalog;
  if (!Array.isArray(data.plans) || data.plans.length === 0) throw new Error("Empty catalog");

  return data;
}
