"use client";

import { ArrowRight, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import {
  cycleSuffix,
  formatINR,
  type BillingCycleChoice,
  type Plan,
} from "@/features/digital/plans";
import { apiRequest, getToken } from "@/lib/api";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://hub.nexbaron.com";

export function AuthenticatedPlanConfirm({
  plan,
  billingCycle,
  onClose,
}: {
  plan: Plan;
  billingCycle: BillingCycleChoice;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const recurringAmount =
    billingCycle === "annual" ? (plan.pricing?.annual ?? 0) : (plan.pricing?.monthly ?? 0);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest<{ proposal: { proposalCode: string } }>(
        `/digital/proposals/from-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId: plan.id, billingCycle }),
        },
        "digital",
      );
      const code = res.proposal?.proposalCode;
      const token = getToken("digital");
      const params = new URLSearchParams();
      if (code) params.set("proposal", code);
      // Include token for cross-domain hydration (hub also reads cookie fallback)
      if (token) params.set("token", token);
      const hubUrl = code
        ? `${HUB_URL}/digital/proposals?${params.toString()}`
        : `${HUB_URL}/digital/proposals${token ? `?token=${encodeURIComponent(token)}` : ""}`;
      window.location.assign(hubUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create proposal. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 id="auth-confirm-title" className="text-lg font-bold text-white">
              Add {plan.name} to your account
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {formatINR(plan.pricing?.setup ?? 0)} one-time + {formatINR(recurringAmount)}
              {cycleSuffix(billingCycle)}
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold text-white">{user?.name ?? "Your account"}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <p className="text-xs text-slate-300 mt-3">
              We&apos;ll create a proposal for{" "}
              <span className="font-semibold text-white">{plan.name}</span>{" "}
              {billingCycle === "annual" ? "(Annual)" : "(Monthly)"}. You can review and accept it
              in your Hub dashboard — no need to re-enter your details.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer px-5 py-2.5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/[0.06] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-slate-950 rounded-xl font-bold hover:bg-teal-400 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              {loading ? "Creating proposal..." : "Request proposal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
