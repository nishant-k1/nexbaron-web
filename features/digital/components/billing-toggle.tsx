"use client";

import type { BillingCycleChoice } from "@/features/digital/plans";

interface BillingToggleProps {
  value: BillingCycleChoice;
  onChange: (cycle: BillingCycleChoice) => void;
  accent?: "digital" | "print";
  className?: string;
}

export function BillingToggle({
  value,
  onChange,
  accent = "digital",
  className = "",
}: BillingToggleProps) {
  const active =
    accent === "digital" ? "bg-teal-500 text-slate-950" : "bg-amber-500 text-slate-950";
  const idle = "text-slate-400 hover:text-slate-200";

  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className={`inline-flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-white/[0.03] ${className}`}
    >
      {(["monthly", "annual"] as const).map((cycle) => (
        <button
          key={cycle}
          type="button"
          role="tab"
          aria-selected={value === cycle}
          onClick={() => onChange(cycle)}
          className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            value === cycle ? active : idle
          }`}
        >
          {cycle === "monthly" ? "Monthly" : "Annual"}
          {cycle === "annual" && (
            <span className="ml-1.5 text-[10px] font-bold text-emerald-400">2 mo free</span>
          )}
        </button>
      ))}
    </div>
  );
}
