"use client";

import { ArrowRight, Check, MessageSquare, Rocket, TrendingUp, Building2 } from "lucide-react";

import type { CatalogService } from "@/features/digital/catalog";
import { formatINR, type Plan } from "@/features/digital/plans";

interface PlanCardProps {
  plan: Plan;
  onSelectPlan: () => void;
}

const INCLUDES: Record<string, string[]> = {
  launch: [
    "Website — Up to 5 Pages",
    "WhatsApp Button on Every Page",
    "Google Business Profile Setup",
    "Basic SEO Setup",
    "Basic Analytics",
  ],
  growth: [
    "Everything in Launch",
    "Google Business Profile Optimized for Your City",
    "Local SEO to Improve Search Visibility",
    "WhatsApp Booking & Reminders",
    "SEO Optimization",
    "Review Management",
    "Social Media Posts",
  ],
  scale: [
    "Everything in Growth",
    "Unlimited Content & Page Updates",
    "Social Media Posts + Reels",
    "Google Business Profile Management",
    "Campaign Execution",
    "Competitor Analysis",
    "Monthly Performance Report",
    "Monthly Strategy Call",
  ],
};

const ICONS: Record<string, React.ElementType> = {
  launch: Rocket,
  growth: TrendingUp,
  scale: Building2,
  custom: MessageSquare,
};

function priceLabel(svc: CatalogService): string {
  if (svc.carePrice) return `${formatINR(svc.price)} one-time + ${formatINR(svc.carePrice)}/mo`;
  if (svc.type === "monthly") return `${formatINR(svc.price)}/mo`;
  return `${formatINR(svc.price)} one-time`;
}

export function PlanCard({ plan, onSelectPlan }: PlanCardProps) {
  const Icon = ICONS[plan.id] || Rocket;
  const items = INCLUDES[plan.id] || [];
  const isCustom = plan.id === "custom";
  const hasServices = plan.services.length > 0;

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
        <div
          className={`p-2.5 rounded-xl border ${
            isCustom
              ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
              : "bg-teal-500/10 border-teal-500/30 text-teal-400"
          }`}
        >
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
        {isCustom ? (
          <div className="space-y-1">
            <span className="text-xl font-heading font-extrabold text-teal-300">
              Let&apos;s Talk
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">{plan.tagline}</p>
          </div>
        ) : (
          <>
            <span className="text-2xl font-heading font-extrabold text-white">
              {formatINR(plan.oneTime)}
            </span>
            <span className="text-xs text-slate-400 ml-1">one-time</span>
            <div className="text-sm text-slate-300 mt-0.5">
              + {formatINR(plan.monthly)}
              <span className="text-xs text-slate-400">/month</span>
            </div>
          </>
        )}
      </div>

      {/* Features list */}
      <div className="mb-6 pt-4 border-t border-white/10 space-y-2.5 flex-1">
        {hasServices ? (
          <>
            {plan.inherited && (
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-white/5">
                <Check className="w-4 h-4 text-teal-500/60 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-sm text-slate-400">{plan.inherited.label}</span>
                  <span className="block text-[11px] text-slate-600 mt-0.5">
                    +{formatINR(plan.inherited.oneTime)} one-time · +
                    {formatINR(plan.inherited.monthly)}/mo
                  </span>
                </div>
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
                  {!isCustom && (
                    <span className="block text-[11px] text-slate-500 tabular-nums mt-0.5">
                      {priceLabel(svc)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          items.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
            </div>
          ))
        )}
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
