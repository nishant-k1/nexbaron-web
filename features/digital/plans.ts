// Types and utility functions for plan data. The actual plan catalog is
// fetched from the API via PlansProvider — no static fallback.
import type { CatalogPlan, CatalogService } from "@/features/digital/catalog";

export type Plan = CatalogPlan;
export type PlanService = CatalogService;
export type ServiceStage = "design" | "build" | "setup";

export interface TimelineExpectation {
  label: string;
  note: string;
}

export function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export type BillingCycleChoice = "monthly" | "annual";

export function svcSetup(svc: CatalogService): number {
  return svc.aggregate?.selling.setup ?? 0;
}

export function svcMonthly(svc: CatalogService): number {
  return svc.aggregate?.selling.monthly ?? 0;
}

export function svcAnnual(svc: CatalogService): number {
  return svc.aggregate?.selling.annual ?? 0;
}

export function svcCycle(svc: CatalogService, cycle: BillingCycleChoice): number {
  return cycle === "annual" ? svcAnnual(svc) : svcMonthly(svc);
}

export function cycleSuffix(cycle: BillingCycleChoice): string {
  return cycle === "annual" ? "/year" : "/month";
}
