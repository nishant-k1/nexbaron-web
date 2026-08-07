"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-context";
import { usePlans } from "@/features/digital/catalog";
import { PlanCard } from "@/features/digital/components/plan-card";
import { savePlanSelection } from "@/features/digital/plan-selection";

export function PlansGrid() {
  const router = useRouter();
  const { user, openSignIn } = useAuth();
  const { plans } = usePlans();

  const selectPlan = (planId: string) => {
    savePlanSelection({ planId, plans: {} });

    if (user) {
      router.push(`/digital/onboarding?plan=${planId}`);
    } else {
      window.sessionStorage.setItem("nexbaron-pending-plan", planId);
      openSignIn(planId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onSelectPlan={() => selectPlan(plan.id)} />
      ))}
    </div>
  );
}
