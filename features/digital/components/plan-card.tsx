"use client";

import { ArrowRight, Check } from "lucide-react";

import {
  cycleSuffix,
  formatINR,
  type BillingCycleChoice,
  type Plan,
} from "@/features/digital/plans";
import { getIcon } from "@/lib/icon-map";

interface PlanCardProps {
  plan: Plan;
  billingCycle: BillingCycleChoice;
  onSelectPlan: () => void;
}

export function PlanCard({ plan, billingCycle, onSelectPlan }: PlanCardProps) {
  const Icon = getIcon(plan.icon);
  const isCustom = plan.id === "custom";
  const hasPricing = Boolean(plan.pricing);
  const annual = billingCycle === "annual";
  const recurringAmount = annual ? (plan.pricing?.annual ?? 0) : (plan.pricing?.monthly ?? 0);

  return (
    <div
      id={plan.id}
      className={`h-full flex flex-col p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 scroll-mt-28 ${
        plan.featured
          ? "bg-teal-500/10 border-teal-500/40 shadow-2xl shadow-teal-500/10"
          : isCustom
            ? "bg-white/[0.02] border-dashed border-teal-500/30 hover:border-teal-500/50 hover:bg-teal-500/[0.04]"
            : "bg-white/[0.03] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl border bg-teal-500/10 border-teal-500/30 text-teal-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-white">{plan.name}</h3>
          {plan.featured && (
            <span className="text-[10px] font-semibold text-teal-400">Most popular</span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        {isCustom || !hasPricing ? (
          <div className="space-y-1">
            <span className="text-xl font-heading font-extrabold text-teal-300">
              Let&apos;s Talk
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">{plan.tagline}</p>
          </div>
        ) : (
          <>
            <span className="text-2xl font-heading font-extrabold text-white">
              {formatINR(plan.pricing?.setup ?? 0)}
            </span>
            <span className="text-xs text-slate-400 ml-1">one-time</span>
            <div className="text-sm text-slate-300 mt-0.5">
              + {formatINR(recurringAmount)}
              <span className="text-xs text-slate-400">{cycleSuffix(billingCycle)}</span>
            </div>
            {plan.pricing?.minimumMonths && (
              <div className="text-[10px] text-slate-400 mt-1">
                {annual
                  ? "Annual care · billed once a year"
                  : `${plan.pricing.minimumMonths}-month minimum · cancel anytime after`}
              </div>
            )}
          </>
        )}
      </div>

      {/* Features list */}
      <div className="mb-6 pt-4 border-t border-white/10 space-y-2.5 flex-1">
        {plan.inherited && hasPricing && (
          <div className="flex items-start gap-2.5 pb-2.5 border-b border-white/5">
            <Check className="w-4 h-4 text-teal-500/60 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-400">{plan.inherited.label}</span>
          </div>
        )}
        {plan.services.map((svc) => (
          <div key={svc.id} className="flex items-start gap-2.5">
            <Check
              className={`w-4 h-4 shrink-0 mt-0.5 ${isCustom ? "text-teal-400/60" : "text-teal-400"}`}
            />
            <div className="min-w-0">
              <span
                className={`text-sm leading-relaxed ${isCustom ? "text-slate-400" : "text-slate-300"}`}
              >
                {svc.label}
              </span>
              {svc.description && (
                <span className="block text-[11px] text-slate-400 mt-0.5">{svc.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onSelectPlan}
          className={`w-full h-11 font-bold px-8 rounded-xl shadow-lg cursor-pointer transition-colors inline-flex items-center justify-center gap-2 ${
            plan.featured
              ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
              : isCustom
                ? "border border-teal-500/40 text-teal-300 hover:bg-teal-500/10 hover:border-teal-500/60"
                : "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
          }`}
        >
          {plan.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
