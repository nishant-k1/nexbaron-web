import type { SavedPlanState } from "@/features/digital/plan-summary";
import type { BillingCycleChoice } from "@/features/digital/plans";

export const PLAN_SELECTION_KEY = "nexbaron-digital-plan-selection";

export interface SavedPlanSelection {
  planId: string;
  billingCycle: BillingCycleChoice;
  plans: Record<string, SavedPlanState>;
}

export function savePlanSelection(selection: SavedPlanSelection): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLAN_SELECTION_KEY, JSON.stringify(selection));
}

export function loadPlanSelection(): SavedPlanSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PLAN_SELECTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPlanSelection;
    if (!parsed || typeof parsed.planId !== "string" || !parsed.plans) return null;
    return {
      ...parsed,
      billingCycle: parsed.billingCycle === "annual" ? "annual" : "monthly",
    };
  } catch {
    return null;
  }
}
