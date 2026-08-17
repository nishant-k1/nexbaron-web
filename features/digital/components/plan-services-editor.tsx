"use client";

import { Minus, Plus, ShieldCheck } from "lucide-react";

import type { InheritedView } from "@/features/digital/plan-summary";
import { formatINR, svcMonthly, svcSetup, type Plan } from "@/features/digital/plans";

interface PlanServicesEditorProps {
  plan: Plan;
  serviceSelection: Record<string, boolean>;
  addOnSelection: Record<string, boolean>;
  addOnCounts: Record<string, number>;
  inherited: InheritedView | null;
  inheritedOn: boolean;
  disabled?: boolean;
  onToggleService: (id: string) => void;
  onToggleAddOn: (id: string) => void;
  onSetAddOnCount: (id: string, count: number) => void;
  onToggleInherited: () => void;
}

export function PlanServicesEditor({
  plan,
  serviceSelection,
  addOnSelection,
  addOnCounts,
  inherited,
  inheritedOn,
  disabled = false,
  onToggleService,
  onToggleAddOn,
  onSetAddOnCount,
  onToggleInherited,
}: PlanServicesEditorProps) {
  const inheritedActive = inherited !== null && inheritedOn && inherited.anySelected;

  const selectedCount =
    Object.values(serviceSelection).filter(Boolean).length +
    (inheritedActive ? 1 : 0) +
    Object.values(addOnSelection).filter(Boolean).length;
  const totalCount = plan.services.length + (inherited ? 1 : 0) + plan.addOns.length;

  return (
    <div>
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
          disabled={disabled || !inherited.anySelected}
          onClick={onToggleInherited}
          className={`w-full flex items-center gap-3 text-left py-2.5 px-3 mb-2 rounded-xl border transition-all duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${
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
                  : "text-slate-300 line-through"
              }`}
            >
              {inherited.label}
            </span>
            <span className="text-[10px] font-mono text-teal-400/80">
              {formatINR(inherited.setup)} <span className="text-slate-500">one-time</span>
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
              disabled={disabled}
              onClick={() => onToggleService(service.id)}
              className={`w-full flex items-center gap-3 text-left py-2 px-3 rounded-xl border transition-all duration-200 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              } ${
                isSelected
                  ? "bg-teal-500/10 border-teal-500/30"
                  : "bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <span className="flex-1 min-w-0">
                <span
                  className={`block text-xs ${
                    isSelected ? "text-slate-200" : "text-slate-300 line-through"
                  }`}
                >
                  {service.label}
                </span>
                <span className="text-[10px] font-mono text-teal-400/80">
                  {formatINR(svcSetup(service) || svcMonthly(service) || 0)}{" "}
                  <span className="text-slate-500">
                    {svcSetup(service) ? "one-time" : "/month"}
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

      {plan.addOns.length > 0 && (
        <div className="pt-4">
          <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-500 block mb-2">
            Add-on options
          </span>
          <div className="space-y-2">
            {plan.addOns.map((addOn) => {
              const isSelected = addOnSelection[addOn.id] ?? false;
              const count = addOnCounts[addOn.id] ?? 0;
              const addOnPrice = svcSetup(addOn) || svcMonthly(addOn);

              if (addOn.unitLabel) {
                return (
                  <div
                    key={addOn.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-xl border transition-all duration-200 ${
                      disabled ? "opacity-50" : ""
                    } ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-white/[0.02] border-white/10"
                    }`}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs text-slate-200">{addOn.label}</span>
                      <span className="text-[10px] font-mono text-amber-400/80">
                        {isSelected
                          ? `+${formatINR(addOnPrice * count)}`
                          : `+${formatINR(addOnPrice)}`}{" "}
                        <span className="text-slate-500">
                          {svcSetup(addOn) ? "one-time" : "/month"} · {formatINR(addOnPrice)}{" "}
                          {addOn.unitLabel}
                        </span>
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSetAddOnCount(addOn.id, count - 1)}
                        disabled={disabled || count === 0}
                        aria-label={`Remove ${addOn.label}`}
                        className="cursor-pointer w-7 h-7 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={count}
                        disabled={disabled}
                        onChange={(e) =>
                          onSetAddOnCount(
                            addOn.id,
                            Math.max(0, Math.floor(Number(e.target.value) || 0)),
                          )
                        }
                        aria-label={`Number of ${addOn.label}`}
                        className="w-12 h-7 text-center text-sm font-mono bg-white/[0.03] border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500/40 disabled:opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => onSetAddOnCount(addOn.id, count + 1)}
                        disabled={disabled}
                        aria-label={`Add ${addOn.label}`}
                        className="cursor-pointer w-7 h-7 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={addOn.id}
                  type="button"
                  role="switch"
                  aria-checked={isSelected}
                  disabled={disabled}
                  onClick={() => onToggleAddOn(addOn.id)}
                  className={`w-full flex items-center gap-3 text-left py-2 px-3 rounded-xl border transition-all duration-200 ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/30"
                      : "bg-white/[0.02] border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-xs ${
                        isSelected ? "text-slate-200" : "text-slate-300"
                      }`}
                    >
                      {addOn.label}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400/80">
                      +{formatINR(addOnPrice)}{" "}
                      <span className="text-slate-500">
                        {svcSetup(addOn) ? "one-time" : "/month"}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${
                      isSelected ? "bg-amber-500" : "bg-white/10 border border-white/10"
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
    </div>
  );
}
