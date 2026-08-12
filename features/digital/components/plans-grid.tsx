"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { usePlans } from "@/features/digital/catalog";
import { PlanCard } from "@/features/digital/components/plan-card";
import { PlanSignupForm } from "@/features/digital/components/plan-signup-form";
import { savePlanSelection } from "@/features/digital/plan-selection";

export function PlansGrid() {
  const { plans, loading } = usePlans();
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

  if (loading && plans.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-96 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelectPlan={() => handlePlanSelect(plan.id)} />
        ))}
      </div>

      {signupPlan && <PlanSignupForm planId={signupPlan} onClose={() => setSignupPlan(null)} />}
    </>
  );
}
