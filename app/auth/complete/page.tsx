"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-context";
import type { AuthUser } from "@/lib/api";
import { getDivisionFromPath, type Division } from "@/lib/divisions";
import type { GoogleAuthResult } from "@/lib/google-auth-result";

const PENDING_PLAN_KEY = "nexbaron-pending-plan";
const RETURN_KEY = "nexbaron-auth-return";
const OAUTH_STATE_KEY = "nexbaron-oauth-state";

function CompleteInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn } = useAuth();
  const handled = useRef(false);
  const [fatalError, setFatalError] = useState<string | null>(null);
  const [errorDivision, setErrorDivision] = useState<Division | null>(null);
  const isPrintCallback = params.get("division") === "print";

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const returnedState = params.get("state");
    const expectedState = readAndClear(OAUTH_STATE_KEY);
    const returnPath = readAndClear(RETURN_KEY);
    const division = readDivision(params.get("division"));
    const fallbackDivision = division ?? (returnPath ? getDivisionFromPath(returnPath) : null);

    const fail = (message: string) => {
      setFatalError(message);
      setErrorDivision(fallbackDivision);
    };

    if (!returnedState || !expectedState || returnedState !== expectedState) {
      fail("The sign-in request could not be verified. Please try again.");
      return;
    }
    if (!division || divisionFromState(expectedState) !== division) {
      fail("The sign-in brand could not be verified. Please start again.");
      return;
    }

    void (async () => {
      let response: Response;
      try {
        response = await fetch(`/api/auth/google/result/${division}`, {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
        });
      } catch {
        fail("Could not finish signing in. Please try again.");
        return;
      }

      const result = (await response.json().catch(() => null)) as GoogleAuthResult | null;
      if (!response.ok || !result?.success) {
        fail(
          result && !result.success
            ? result.message
            : "The sign-in result expired. Please try again.",
        );
        return;
      }
      if (!isAuthUser(result.user) || result.user.division !== division) {
        fail("Could not verify the signed-in account. Please try again.");
        return;
      }

      signIn(result.token, result.user);
      const safeReturnPath =
        returnPath && returnPath.startsWith(`/${division}`) && !returnPath.startsWith("//")
          ? returnPath
          : `/${division}`;
      const pendingPlan = division === "digital" ? readAndClear(PENDING_PLAN_KEY) : null;
      router.replace(
        pendingPlan
          ? `/digital/onboarding?plan=${encodeURIComponent(pendingPlan)}`
          : safeReturnPath,
      );
    })();
  }, [params, router, signIn]);

  if (fatalError) {
    const isPrint = errorDivision === "print";
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 text-center">
        <div className="max-w-md space-y-4">
          <p className="text-lg font-heading font-bold text-white">Couldn&apos;t sign you in</p>
          <p className="text-sm text-red-300">{fatalError}</p>
          <button
            onClick={() => router.replace(errorDivision ? `/${errorDivision}` : "/")}
            className={`px-5 py-2.5 rounded-xl text-slate-950 font-semibold ${isPrint ? "bg-amber-500 hover:bg-amber-400" : "bg-teal-500 hover:bg-teal-400"}`}
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
        <div
          className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto ${isPrintCallback ? "border-amber-400" : "border-teal-400"}`}
        />
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

function readDivision(value: string | null): Division | null {
  return value === "digital" || value === "print" ? value : null;
}

function divisionFromState(state: string): Division | null {
  try {
    return readDivision((JSON.parse(state) as { division?: string }).division ?? null);
  } catch {
    return null;
  }
}

function isAuthUser(value: unknown): value is AuthUser {
  const user = value as Partial<AuthUser> | null;
  return Boolean(
    user?.id && user.name && (user.division === "digital" || user.division === "print"),
  );
}

function readAndClear(key: string): string | null {
  const value = window.sessionStorage.getItem(key);
  window.sessionStorage.removeItem(key);
  return value;
}
