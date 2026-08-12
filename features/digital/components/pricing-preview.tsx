"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatINR, type Plan } from "@/features/digital/plans";

export function PricingPreview({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      {plans.slice(0, 3).map((plan) => (
        <div
          key={plan.id}
          className={`p-6 rounded-2xl border transition-all ${
            plan.featured
              ? "bg-teal-500/10 border-teal-500/40 shadow-xl shadow-teal-500/10"
              : "bg-white/[0.03] border-white/10 hover:border-teal-500/30"
          }`}
        >
          <h3 className="text-lg font-heading font-bold text-white mb-1">{plan.name}</h3>
          <div className="text-3xl font-heading font-extrabold text-teal-300 mb-1">
            {formatINR(plan.pricing?.setup ?? 0)}
          </div>
          <div className="text-xs text-slate-500 mb-4">
            + {formatINR(plan.pricing?.monthly ?? 0)} monthly care
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{plan.tagline}</p>
          <Link
            href="/digital/pricing#plans"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              plan.featured
                ? "text-teal-300 hover:text-teal-200"
                : "text-teal-400 hover:text-teal-300"
            }`}
          >
            See full details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export function PricingPreviewCta() {
  return (
    <div className="text-center mt-10">
      <Button
        asChild
        size="lg"
        className="cursor-pointer bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-teal-500/20"
      >
        <Link href="/digital/pricing#plans" className="flex items-center gap-2">
          Compare All Plans <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}
