"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BillingToggle } from "@/features/digital/components/billing-toggle";
import { PlanCard } from "@/features/digital/components/plan-card";
import { PlanSignupForm } from "@/features/digital/components/plan-signup-form";
import { savePlanSelection } from "@/features/digital/plan-selection";
import type { BillingCycleChoice, Plan } from "@/features/digital/plans";

export function PlansGrid({ plans }: { plans: Plan[] }) {
  const [signupPlan, setSignupPlan] = useState<{
    planId: string;
    billingCycle: BillingCycleChoice;
  } | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycleChoice>("monthly");
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    if (planId === "custom") {
      router.push("/digital/contact");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("nexbaron-plan-id", planId);
    }
    savePlanSelection({ planId, billingCycle, plans: {} });
    setSignupPlan({ planId, billingCycle });
  };

  return (
    <>
      <div className="flex justify-center mb-10">
        <BillingToggle value={billingCycle} onChange={setBillingCycle} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            onSelectPlan={() => handlePlanSelect(plan.id)}
          />
        ))}
      </div>

      {signupPlan && (
        <PlanSignupForm
          plan={plans.find((p) => p.id === signupPlan?.planId)!}
          billingCycle={signupPlan.billingCycle}
          onClose={() => setSignupPlan(null)}
        />
      )}
    </>
  );
}
