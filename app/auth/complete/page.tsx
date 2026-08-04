"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { useAuth } from "@/features/auth/auth-context";
import type { AuthUser } from "@/lib/api";

const PENDING_PLAN_KEY = "nexbaron-pending-plan";
const RETURN_KEY = "nexbaron-auth-return";

function CompleteInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useAuth();
  const handled = useRef(false);
  const [fatalError, setFatalError] = useState<string | null>(null);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = params.get("token");
    const userRaw = params.get("user");
    const error = params.get("error");
    const pendingPlan = readAndClear(PENDING_PLAN_KEY);

    if (error) {
      setFatalError(error);
      return;
    }

    try {
      if (token && userRaw) {
        signIn(token, JSON.parse(userRaw) as AuthUser);
      } else {
        setFatalError("No credentials were returned from Google. Please try again.");
        return;
      }
    } catch {
      setFatalError("Could not finish signing in. Please try again.");
      return;
    }

    const returnPath = readAndClear(RETURN_KEY) ?? "/digital";
    router.replace(pendingPlan ? `/digital/onboarding?plan=${pendingPlan}` : returnPath);
  }, [params, router, signIn]);

  if (fatalError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 text-center">
        <div className="max-w-md space-y-4">
          <p className="text-lg font-heading font-bold text-white">Couldn&apos;t sign you in</p>
          <p className="text-sm text-red-300">{fatalError}</p>
          <button
            onClick={() => router.replace("/digital")}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 text-sm">Signing you in…</p>
      </div>
    </div>
  );
}

export default function GoogleAuthCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <CompleteInner />
    </Suspense>
  );
}

function readAndClear(key: string): string | null {
  const value = window.sessionStorage.getItem(key);
  window.sessionStorage.removeItem(key);
  return value;
}
