"use client";

import { ArrowRight, CalendarCheck } from "lucide-react";

import { formatCalendarDate } from "@/components/tracking/launch-tracker";
import { Button } from "@/components/ui/button";
import { PlanServicesEditor } from "@/features/digital/components/plan-services-editor";
import type { InheritedView, LaunchTimeline } from "@/features/digital/plan-summary";
import { formatINR, type Plan } from "@/features/digital/plans";

interface PlanCardProps {
  plan: Plan;
  launchTimeline?: LaunchTimeline;
  oneTimeTotal: number;
  monthlyTotal: number;
  serviceSelection: Record<string, boolean>;
  addOnSelection: Record<string, boolean>;
  addOnCounts: Record<string, number>;
  inherited: InheritedView | null;
  inheritedOn: boolean;
  onToggleService: (id: string) => void;
  onToggleAddOn: (id: string) => void;
  onSetAddOnCount: (id: string, count: number) => void;
  onToggleInherited: () => void;
  onSelectPlan: () => void;
}

export function PlanCard({
  plan,
  launchTimeline,
  oneTimeTotal,
  monthlyTotal,
  serviceSelection,
  addOnSelection,
  addOnCounts,
  inherited,
  inheritedOn,
  onToggleService,
  onToggleAddOn,
  onSetAddOnCount,
  onToggleInherited,
  onSelectPlan,
}: PlanCardProps) {
  const Icon = plan.icon;

  return (
    <div
      id={plan.id}
      className={`h-full flex flex-col p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 scroll-mt-28 ${
        plan.featured
          ? "bg-teal-500/10 border-teal-500/40 shadow-2xl shadow-teal-500/10"
          : "bg-white/[0.03] border-white/10 hover:border-teal-500/40 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <Icon className="w-6 h-6" />
        </div>
        {plan.featured && (
          <span className="text-[10px] font-mono text-slate-950 px-2.5 py-1 rounded bg-teal-400 font-semibold">
            Most Popular
          </span>
        )}
      </div>

      <h3 className="text-xl font-heading font-semibold text-white mb-1">{plan.name}</h3>
      <p className="text-sm text-slate-300 leading-relaxed mb-4">{plan.tagline}</p>

      <div className="mb-4">
        <span className="text-3xl font-heading font-extrabold text-white">
          {formatINR(oneTimeTotal)}
        </span>
        <span className="text-xs text-slate-400 ml-1">one-time</span>
        <div className="text-sm text-slate-300 mt-1">
          + {formatINR(monthlyTotal)}
          <span className="text-xs text-slate-400">/month · {plan.monthlyName}</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-[10px] font-mono text-teal-400 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 inline-flex items-center gap-1.5">
          {plan.timelineMode === "phased" ? (
            plan.timeline
          ) : launchTimeline ? (
            <>
              <CalendarCheck className="w-3 h-3" />
              Web live by {formatCalendarDate(launchTimeline.launchDate)}
            </>
          ) : (
            plan.timeline
          )}
        </span>
      </div>

      {(inherited || plan.services.length > 0) && (
        <div className="mb-6 pt-4 border-t border-white/10">
          <PlanServicesEditor
            plan={plan}
            serviceSelection={serviceSelection}
            addOnSelection={addOnSelection}
            addOnCounts={addOnCounts}
            inherited={inherited}
            inheritedOn={inheritedOn}
            onToggleService={onToggleService}
            onToggleAddOn={onToggleAddOn}
            onSetAddOnCount={onSetAddOnCount}
            onToggleInherited={onToggleInherited}
          />
        </div>
      )}

      <div className="mt-auto pt-4">
        <Button
          type="button"
          size="lg"
          onClick={onSelectPlan}
          className={`w-full font-bold px-8 rounded-xl shadow-lg cursor-pointer ${
            plan.featured
              ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
              : "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
          }`}
        >
          <span className="inline-flex items-center justify-center gap-2">
            {plan.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </div>
  );
}
