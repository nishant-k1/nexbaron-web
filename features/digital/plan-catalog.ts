import type { CatalogPlan } from "@/features/digital/catalog";
import { plans as staticPlans } from "@/features/digital/plans";
import { getApiUrl } from "@/lib/api";

export interface PlanCatalog {
  version: string;
  updatedAt: string;
  currency: string;
  disclaimer?: string;
  plans: CatalogPlan[];
}

// Server-side catalog fetch — powers the pricing page (server-rendered for SEO).
// Falls back to the static mirror only when the API is unreachable.
export async function getPlanCatalog(): Promise<PlanCatalog> {
  try {
    const response = await fetch(`${getApiUrl("digital")}/digital/catalog`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    const data = (await response.json()) as PlanCatalog;
    if (!Array.isArray(data.plans) || data.plans.length === 0) throw new Error("Empty catalog");
    return data;
  } catch {
    return {
      version: "4.1.0",
      updatedAt: "",
      currency: "INR",
      plans: staticPlans,
    };
  }
}
