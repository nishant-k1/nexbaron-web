"use client";

import { ArrowRight, Check, Rocket, TrendingUp, Building2 } from "lucide-react";

import { formatINR, type Plan } from "@/features/digital/plans";

interface PlanCardProps {
  plan: Plan;
  onSelectPlan: () => void;
}

const WHO_ITS_FOR: Record<string, string> = {
  launch:
    "Solo business just starting out. 5-page site, mobile-ready, Google Business Profile created.",
  growth:
    "Growing business with 10–30 customers a day. Found on Google, booked on WhatsApp, reviews collected automatically.",
  scale:
    "Established business doing ₹50L+/year. Dedicated manager, unlimited updates, monthly strategy calls.",
};

const INCLUDES: Record<string, string[]> = {
  launch: [
    "Website — up to 5 pages",
    "Works perfectly on phone",
    "Logo, colours, and your photos",
    "WhatsApp button on every page",
    "Google Business Profile created",
    "All enquiries sent to your phone",
  ],
  growth: [
    "Everything in Launch",
    "Google profile optimised for your city",
    "Review collection — we ask after every sale",
    "Rank for searches in your area",
    "WhatsApp booking and reminders",
    "Auto-reply to common questions 24/7",
    "Monthly report in plain English",
  ],
  scale: [
    "Everything in Growth",
    "Dedicated growth manager",
    "Monthly strategy call",
    "Unlimited content and page updates",
    "Competitor review every quarter",
    "Campaign and offer pages",
  ],
};

const ICONS: Record<string, React.ElementType> = {
  launch: Rocket,
  growth: TrendingUp,
  scale: Building2,
};

export function PlanCard({ plan, onSelectPlan }: PlanCardProps) {
  const Icon = ICONS[plan.id] || Rocket;
  const who = WHO_ITS_FOR[plan.id] || "";
  const items = INCLUDES[plan.id] || [];

  return (
    <div
      id={plan.id}
      className={`h-full flex flex-col p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 scroll-mt-28 ${
        plan.featured
          ? "bg-teal-500/10 border-teal-500/40 shadow-2xl shadow-teal-500/10"
          : "bg-white/[0.03] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-white">{plan.name}</h3>
          {plan.featured && (
            <span className="text-[10px] font-semibold text-teal-400">Most popular</span>
          )}
        </div>
      </div>

      {/* Who it's for */}
      <p className="text-xs text-slate-400 leading-relaxed mb-4">{who}</p>

      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-heading font-extrabold text-white">
          {formatINR(plan.oneTime)}
        </span>
        <span className="text-xs text-slate-400 ml-1">one-time</span>
        <div className="text-sm text-slate-300 mt-0.5">
          + {formatINR(plan.monthly)}
          <span className="text-xs text-slate-400">/month</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-5">
        <span className="text-[10px] font-mono text-teal-400 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20">
          {plan.timeline}
        </span>
      </div>

      {/* Features list */}
      <div className="mb-6 pt-4 border-t border-white/10 space-y-2.5">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={onSelectPlan}
          className={`w-full h-11 font-bold px-8 rounded-xl shadow-lg cursor-pointer transition-colors inline-flex items-center justify-center gap-2 ${
            plan.featured
              ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
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
