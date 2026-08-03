import { type BillingType, type Plan } from "@/features/digital/plans";

export interface PlanSelection {
  selected: Set<string>;
  addOns: Set<string>;
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
}

export interface InheritedView {
  label: string;
  oneTime: number;
  monthly: number;
  active: boolean;
  anySelected: boolean;
}

export interface PreparedPlan {
  plan: Plan;
  oneTimeTotal: number;
  monthlyTotal: number;
  serviceSelection: Record<string, boolean>;
  addOnSelection: Record<string, boolean>;
  addOnCounts: Record<string, number>;
  inherited: InheritedView | null;
}

export type SavedPlanState = {
  selected: string[];
  addOns: string[];
  addOnCounts: Record<string, number>;
  inheritedOn: boolean;
};

export function createDefaultSelection(plan: Plan): PlanSelection {
  return {
    selected: new Set(plan.services.map((s) => s.id)),
    addOns: new Set<string>(),
    addOnCounts: {},
    inheritedOn: true,
  };
}

export function selectionFromSaved(plan: Plan, saved?: SavedPlanState): PlanSelection {
  if (!saved) return createDefaultSelection(plan);
  return {
    selected: new Set(saved.selected),
    addOns: new Set(saved.addOns),
    addOnCounts: saved.addOnCounts ?? {},
    inheritedOn: saved.inheritedOn,
  };
}

function offByType(plan: Plan, selection: Set<string>, type: BillingType): number {
  return plan.services
    .filter((s) => s.type === type && !selection.has(s.id))
    .reduce((sum, s) => sum + s.price, 0);
}

function addOnByType(
  plan: Plan,
  selection: Set<string>,
  counts: Record<string, number>,
  type: BillingType,
): number {
  return plan.addOns
    .filter((s) => s.type === type && selection.has(s.id))
    .reduce((sum, s) => sum + s.price * (counts[s.id] ?? 1), 0);
}

function totalSelected(plan: Plan, selection: Set<string>): number {
  return plan.services.filter((s) => selection.has(s.id)).length;
}

export function computePrepared(
  plans: Plan[],
  byId: (id: string) => PlanSelection,
): PreparedPlan[] {
  const result: PreparedPlan[] = [];
  let lower: { plan: Plan; oneTimeLive: number; monthlyLive: number } | null = null;

  for (const plan of plans) {
    const selection = byId(plan.id);
    const ownOffOneTime = offByType(plan, selection.selected, "oneTime");
    const ownOffMonthly = offByType(plan, selection.selected, "monthly");

    let inheritedOneTime = 0;
    let inheritedMonthly = 0;
    let inherited: InheritedView | null = null;

    if (lower) {
      const lowerReductionOneTime = lower.plan.oneTime - lower.oneTimeLive;
      const lowerReductionMonthly = lower.plan.monthly - lower.monthlyLive;
      const lowerSelected = totalSelected(lower.plan, byId(lower.plan.id).selected);

      if (selection.inheritedOn) {
        inheritedOneTime = lowerReductionOneTime;
        inheritedMonthly = lowerReductionMonthly;
      } else {
        inheritedOneTime = lower.plan.oneTime;
        inheritedMonthly = lower.plan.monthly;
      }

      inherited = {
        label:
          lowerSelected === lower.plan.services.length
            ? (plan.inherited?.label ?? "Everything in previous plan")
            : lowerSelected > 0
              ? `${plan.inherited?.label ?? "Everything"} (${lowerSelected}/${lower.plan.services.length} included)`
              : `No ${(plan.inherited?.label ?? "services").replace("Everything in ", "").toLowerCase()} selected`,
        oneTime: lower.plan.oneTime,
        monthly: lower.plan.monthly,
        active: selection.inheritedOn,
        anySelected: lowerSelected > 0,
      };
    }

    const oneTimeTotal = Math.max(
      0,
      plan.oneTime -
        ownOffOneTime -
        inheritedOneTime +
        addOnByType(plan, selection.addOns, selection.addOnCounts, "oneTime"),
    );
    const monthlyTotal = Math.max(
      0,
      plan.monthly -
        ownOffMonthly -
        inheritedMonthly +
        addOnByType(plan, selection.addOns, selection.addOnCounts, "monthly"),
    );

    const serviceSelection: Record<string, boolean> = {};
    for (const service of plan.services) {
      serviceSelection[service.id] = selection.selected.has(service.id);
    }

    const addOnSelection: Record<string, boolean> = {};
    for (const addOn of plan.addOns) {
      addOnSelection[addOn.id] = selection.addOns.has(addOn.id);
    }

    result.push({
      plan,
      oneTimeTotal,
      monthlyTotal,
      serviceSelection,
      addOnSelection,
      addOnCounts: selection.addOnCounts,
      inherited,
    });

    lower = {
      plan,
      oneTimeLive: oneTimeTotal,
      monthlyLive: monthlyTotal,
    };
  }

  return result;
}
