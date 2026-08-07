"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-context";
import { usePlans } from "@/features/digital/catalog";
import { PlanCard } from "@/features/digital/components/plan-card";
import { savePlanSelection } from "@/features/digital/plan-selection";

export function PlansGrid() {
  const router = useRouter();
  const { user, openSignIn } = useAuth();
  const { plans, loading } = usePlans();

  const selectPlan = (planId: string) => {
    savePlanSelection({ planId, plans: {} });

    if (user) {
      router.push(`/digital/onboarding?plan=${planId}`);
    } else {
      window.sessionStorage.setItem("nexbaron-pending-plan", planId);
      openSignIn(planId);
    }
  };

  if (loading && plans.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-96 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onSelectPlan={() => selectPlan(plan.id)} />
      ))}
    </div>
  );
}
