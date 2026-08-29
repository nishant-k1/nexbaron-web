import type { SavedPlanState } from "@/features/digital/plan-summary";
import type { BillingCycleChoice } from "@/features/digital/plans";

/**
 * Ephemeral pre-auth intent cache — NOT the source of truth.
 *
 * SSOT per AGENTS.md §0: API is authoritative for pricing/plans.
 * - Authenticated users: `PATCH /digital/auth/save-plan` + `PUT /digital/drafts` (lib/draft.ts)
 * - Anonymous users: URL `?plan=&billing=` is primary intent carrier (preserved through Hub redirect).
 *
 * This localStorage entry is a convenience fallback for anonymous users who
 * refresh before signing up. It is validated against the catalog on load and
 * expires after 7 days. Never treat it as billing truth — server recomputes.
 */
export const PLAN_SELECTION_KEY = "nexbaron-digital-plan-selection";
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SavedPlanSelection {
  planId: string;
  billingCycle: BillingCycleChoice;
  plans: Record<string, SavedPlanState>;
  at?: number; // epoch ms, for TTL
}

export function savePlanSelection(selection: SavedPlanSelection): void {
  if (typeof window === "undefined") return;
  const payload: SavedPlanSelection = { ...selection, at: Date.now() };
  window.localStorage.setItem(PLAN_SELECTION_KEY, JSON.stringify(payload));
}

export function loadPlanSelection(): SavedPlanSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PLAN_SELECTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPlanSelection;
    if (!parsed || typeof parsed.planId !== "string" || !parsed.plans) return null;
    // TTL expiry
    if (typeof parsed.at === "number" && Date.now() - parsed.at > TTL_MS) {
      window.localStorage.removeItem(PLAN_SELECTION_KEY);
      return null;
    }
    return {
      ...parsed,
      billingCycle: parsed.billingCycle === "annual" ? "annual" : "monthly",
    };
  } catch {
    return null;
  }
}

/** Remove stale or catalog-invalid entries. Call after catalog fetch. */
export function validatePlanSelection(validPlanIds: Set<string>): void {
  const loaded = loadPlanSelection();
  if (!loaded) return;
  if (!validPlanIds.has(loaded.planId)) {
    window.localStorage.removeItem(PLAN_SELECTION_KEY);
  }
}

export function clearPlanSelection(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PLAN_SELECTION_KEY);
}
