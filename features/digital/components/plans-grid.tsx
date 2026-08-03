"use client";

import { useMemo, useState } from "react";

import { PlanCard } from "@/features/digital/components/plan-card";
import { plans, type BillingType, type Plan } from "@/features/digital/plans";

interface PlanSelection {
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

export function PlansGrid() {
  const [selections, setSelections] = useState<Record<string, PlanSelection>>(() =>
    Object.fromEntries(
      plans.map((plan) => [
        plan.id,
        {
          selected: new Set(plan.services.map((s) => s.id)),
          addOns: new Set<string>(),
          addOnCounts: {},
          inheritedOn: true,
        },
      ]),
    ),
  );

  const getSelection = (id: string): PlanSelection =>
    selections[id] ?? {
      selected: new Set<string>(),
      addOns: new Set<string>(),
      addOnCounts: {},
      inheritedOn: true,
    };

  const toggleService = (planId: string, serviceId: string) => {
    setSelections((prev) => {
      const current = prev[planId] ?? {
        selected: new Set<string>(),
        addOns: new Set<string>(),
        addOnCounts: {},
        inheritedOn: true,
      };
      const next = new Set(current.selected);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return { ...prev, [planId]: { ...current, selected: next } };
    });
  };

  const toggleAddOn = (planId: string, addOnId: string) => {
    setSelections((prev) => {
      const current = prev[planId] ?? {
        selected: new Set<string>(),
        addOns: new Set<string>(),
        addOnCounts: {},
        inheritedOn: true,
      };
      const next = new Set(current.addOns);
      if (next.has(addOnId)) {
        next.delete(addOnId);
      } else {
        next.add(addOnId);
      }
      return { ...prev, [planId]: { ...current, addOns: next } };
    });
  };

  const setAddOnCount = (planId: string, addOnId: string, count: number) => {
    setSelections((prev) => {
      const current = prev[planId] ?? {
        selected: new Set<string>(),
        addOns: new Set<string>(),
        addOnCounts: {},
        inheritedOn: true,
      };
      const next = new Set(current.addOns);
      const nextCounts = { ...current.addOnCounts };
      if (count > 0) {
        next.add(addOnId);
        nextCounts[addOnId] = count;
      } else {
        next.delete(addOnId);
        delete nextCounts[addOnId];
      }
      return { ...prev, [planId]: { ...current, addOns: next, addOnCounts: nextCounts } };
    });
  };

  const toggleInherited = (planId: string) => {
    setSelections((prev) => {
      const current = prev[planId] ?? {
        selected: new Set<string>(),
        addOns: new Set<string>(),
        addOnCounts: {},
        inheritedOn: true,
      };
      return { ...prev, [planId]: { ...current, inheritedOn: !current.inheritedOn } };
    });
  };

  const prepared = useMemo<PreparedPlan[]>(() => {
    const result: PreparedPlan[] = [];
    let lower: { plan: Plan; oneTimeLive: number; monthlyLive: number } | null = null;

    for (const plan of plans) {
      const selection = getSelection(plan.id);
      const ownOffOneTime = offByType(plan, selection.selected, "oneTime");
      const ownOffMonthly = offByType(plan, selection.selected, "monthly");

      let inheritedOneTime = 0;
      let inheritedMonthly = 0;
      let inherited: InheritedView | null = null;

      if (lower) {
        const lowerReductionOneTime = lower.plan.oneTime - lower.oneTimeLive;
        const lowerReductionMonthly = lower.plan.monthly - lower.monthlyLive;
        const lowerSelected = totalSelected(lower.plan, getSelection(lower.plan.id).selected);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
      {prepared.map(
        ({
          plan,
          oneTimeTotal,
          monthlyTotal,
          serviceSelection,
          addOnSelection,
          addOnCounts,
          inherited,
        }) => {
          const selection = getSelection(plan.id);
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              oneTimeTotal={oneTimeTotal}
              monthlyTotal={monthlyTotal}
              serviceSelection={serviceSelection}
              addOnSelection={addOnSelection}
              addOnCounts={addOnCounts}
              inherited={inherited}
              inheritedOn={selection.inheritedOn}
              onToggleService={(id) => toggleService(plan.id, id)}
              onToggleAddOn={(id) => toggleAddOn(plan.id, id)}
              onSetAddOnCount={(id, count) => setAddOnCount(plan.id, id, count)}
              onToggleInherited={() => toggleInherited(plan.id)}
            />
          );
        },
      )}
    </div>
  );
}
