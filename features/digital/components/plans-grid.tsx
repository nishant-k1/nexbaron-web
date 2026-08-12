"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PlanCard } from "@/features/digital/components/plan-card";
import { PlanSignupForm } from "@/features/digital/components/plan-signup-form";
import { savePlanSelection } from "@/features/digital/plan-selection";
import type { Plan } from "@/features/digital/plans";

export function PlansGrid({ plans }: { plans: Plan[] }) {
  const [signupPlan, setSignupPlan] = useState<string | null>(null);
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    if (planId === "custom") {
      router.push("/digital/contact");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("nexbaron-plan-id", planId);
    }
    savePlanSelection({ planId, plans: {} });
    setSignupPlan(planId);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelectPlan={() => handlePlanSelect(plan.id)} />
        ))}
      </div>

      {signupPlan && <PlanSignupForm planId={signupPlan} onClose={() => setSignupPlan(null)} />}
    </>
  );
}
