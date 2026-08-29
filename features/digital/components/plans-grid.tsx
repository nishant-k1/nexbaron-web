"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import { AuthenticatedPlanConfirm } from "@/features/digital/components/authenticated-plan-confirm";
import { BillingToggle } from "@/features/digital/components/billing-toggle";
import { PlanCard } from "@/features/digital/components/plan-card";
import { PlanSignupForm } from "@/features/digital/components/plan-signup-form";
import { savePlanSelection, validatePlanSelection } from "@/features/digital/plan-selection";
import type { BillingCycleChoice, Plan } from "@/features/digital/plans";

export function PlansGrid({ plans }: { plans: Plan[] }) {
  const [signupPlan, setSignupPlan] = useState<{
    planId: string;
    billingCycle: BillingCycleChoice;
  } | null>(null);
  const [authConfirm, setAuthConfirm] = useState<{
    planId: string;
    billingCycle: BillingCycleChoice;
  } | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycleChoice>("monthly");
  const router = useRouter();
  const { user } = useAuth();

  // Purge ephemeral local intent if catalog no longer contains it (SSOT guard).
  useEffect(() => {
    if (plans.length === 0) return;
    validatePlanSelection(new Set(plans.map((p) => p.id)));
  }, [plans]);

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);

    if (planId === "custom" || !plan?.pricing) {
      router.push("/digital/contact");
      return;
    }
    savePlanSelection({ planId, billingCycle, plans: {} });
    // Authenticated fast-path: create proposal directly (no re-registration)
    if (user) {
      setAuthConfirm({ planId, billingCycle });
      return;
    }
    setSignupPlan({ planId, billingCycle });
  };

  return (
    <>
      {plans.some((plan) => plan.pricing) && (
        <div className="flex justify-center mb-10">
          <BillingToggle value={billingCycle} onChange={setBillingCycle} />
        </div>
      )}

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

      {authConfirm &&
        (() => {
          const plan = plans.find((p) => p.id === authConfirm.planId);
          if (!plan) return null;
          return (
            <AuthenticatedPlanConfirm
              plan={plan}
              billingCycle={authConfirm.billingCycle}
              onClose={() => setAuthConfirm(null)}
            />
          );
        })()}
    </>
  );
}
