"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useAuth } from "@/features/auth/auth-context";
import { AuthGate } from "@/features/auth/components/auth-gate";
import { PlanCard } from "@/features/digital/components/plan-card";
import { savePlanSelection } from "@/features/digital/lib/plan-selection";
import {
  computePrepared,
  createDefaultSelection,
  type PlanSelection,
} from "@/features/digital/plan-summary";
import { plans } from "@/features/digital/plans";
import { type AuthUser } from "@/lib/api";

export function PlansGrid() {
  const router = useRouter();
  const { user, signIn } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const getPlan = (id: string) => plans.find((p) => p.id === id) ?? plans[0]!;
  const getSelection = (id: string): PlanSelection =>
    selections[id] ?? createDefaultSelection(getPlan(id));
  const [selections, setSelections] = useState<Record<string, PlanSelection>>(() =>
    Object.fromEntries(plans.map((plan) => [plan.id, createDefaultSelection(plan)])),
  );

  const toggleService = (planId: string, serviceId: string) => {
    setSelections((prev) => {
      const current = prev[planId] ?? createDefaultSelection(getPlan(planId));
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
      const current = prev[planId] ?? createDefaultSelection(getPlan(planId));
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
      const current = prev[planId] ?? createDefaultSelection(getPlan(planId));
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
      const current = prev[planId] ?? createDefaultSelection(getPlan(planId));
      return { ...prev, [planId]: { ...current, inheritedOn: !current.inheritedOn } };
    });
  };

  const selectPlan = (planId: string) => {
    savePlanSelection({
      planId,
      plans: Object.fromEntries(
        plans.map((plan) => {
          const selection = getSelection(plan.id);
          return [
            plan.id,
            {
              selected: Array.from(selection.selected),
              addOns: Array.from(selection.addOns),
              addOnCounts: selection.addOnCounts,
              inheritedOn: selection.inheritedOn,
            },
          ];
        }),
      ),
    });

    if (user) {
      router.push(`/digital/onboarding?plan=${planId}`);
    } else {
      setPendingPlan(planId);
      setAuthOpen(true);
    }
  };

  const handleAuthSuccess = ({ token, user: authUser }: { token: string; user: AuthUser }) => {
    signIn(token, authUser);
    setAuthOpen(false);
    if (pendingPlan) {
      router.push(`/digital/onboarding?plan=${pendingPlan}`);
    }
  };

  const handleAuthClose = () => {
    setAuthOpen(false);
    setPendingPlan(null);
  };

  const prepared = useMemo<ReturnType<typeof computePrepared>>(
    () => computePrepared(plans, (id) => getSelection(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selections],
  );

  return (
    <>
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
                onSelectPlan={() => selectPlan(plan.id)}
              />
            );
          },
        )}
      </div>

      <AuthGate open={authOpen} onClose={handleAuthClose} onSuccess={handleAuthSuccess} />
    </>
  );
}
