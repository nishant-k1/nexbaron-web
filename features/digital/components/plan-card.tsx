"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { InheritedView } from "@/features/digital/components/plans-grid";
import { formatINR, type Plan } from "@/features/digital/plans";

interface PlanCardProps {
  plan: Plan;
  oneTimeTotal: number;
  monthlyTotal: number;
  serviceSelection: Record<string, boolean>;
  inherited: InheritedView | null;
  inheritedOn: boolean;
  onToggleService: (id: string) => void;
  onToggleInherited: () => void;
}

export function PlanCard({
  plan,
  oneTimeTotal,
  monthlyTotal,
  serviceSelection,
  inherited,
  inheritedOn,
  onToggleService,
  onToggleInherited,
}: PlanCardProps) {
  const Icon = plan.icon;

  const inheritedActive = inherited !== null && inheritedOn && inherited.anySelected;

  const selectedCount =
    Object.values(serviceSelection).filter(Boolean).length + (inheritedActive ? 1 : 0);
  const totalCount = plan.services.length + (inherited ? 1 : 0);

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
        <span className="text-[10px] font-mono text-teal-400 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 inline-block">
          {plan.timeline}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
          Best for
        </span>
        <ul className="mt-2 space-y-1.5">
          {plan.forWho.map((item) => (
            <li key={item} className="text-xs text-slate-400 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {(inherited || plan.services.length > 0) && (
        <div className="mb-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500">
              Customize your services
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {selectedCount}/{totalCount} selected
            </span>
          </div>

          {inherited && (
            <button
              type="button"
              role="switch"
              aria-checked={inheritedOn}
              disabled={!inherited.anySelected}
              onClick={onToggleInherited}
              className={`w-full flex items-center gap-3 text-left py-2.5 px-3 mb-2 rounded-xl border transition-all duration-200 ${
                inheritedOn && inherited.anySelected
                  ? "bg-teal-500/5 border-teal-500/20"
                  : "bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <ShieldCheck
                className={`w-4 h-4 shrink-0 ${
                  inheritedOn && inherited.anySelected ? "text-teal-400" : "text-slate-500"
                }`}
              />
              <span className="flex-1 min-w-0">
                <span
                  className={`block text-xs font-medium ${
                    inheritedOn && inherited.anySelected
                      ? "text-teal-200"
                      : "text-slate-400 line-through"
                  }`}
                >
                  {inherited.label}
                </span>
                <span className="text-[10px] font-mono text-teal-400/80">
                  {formatINR(inherited.oneTime)} <span className="text-slate-500">one-time</span>
                  {" · "}
                  {formatINR(inherited.monthly)}
                  <span className="text-slate-500">/month</span>
                </span>
              </span>
              {inherited.anySelected && (
                <span
                  className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${
                    inheritedOn ? "bg-teal-500" : "bg-white/10 border border-white/10"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      inheritedOn ? "translate-x-4" : ""
                    }`}
                  />
                </span>
              )}
            </button>
          )}

          <div className="space-y-2">
            {plan.services.map((service) => {
              const isSelected = serviceSelection[service.id] ?? false;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="switch"
                  aria-checked={isSelected}
                  onClick={() => onToggleService(service.id)}
                  className={`w-full flex items-center gap-3 text-left py-2 px-3 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-teal-500/10 border-teal-500/30"
                      : "bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-xs ${
                        isSelected ? "text-slate-200" : "text-slate-400 line-through"
                      }`}
                    >
                      {service.label}
                    </span>
                    <span className="text-[10px] font-mono text-teal-400/80">
                      {formatINR(service.price)}{" "}
                      <span className="text-slate-500">
                        {service.type === "oneTime" ? "one-time" : "/month"}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${
                      isSelected ? "bg-teal-500" : "bg-white/10 border border-white/10"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        isSelected ? "translate-x-4" : ""
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <Button
          asChild
          size="lg"
          className={`w-full font-bold px-8 rounded-xl shadow-lg ${
            plan.featured
              ? "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/20"
              : "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20"
          }`}
        >
          <Link
            href={`/digital/contact?plan=${plan.id}`}
            className="inline-flex items-center justify-center gap-2"
          >
            {plan.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
