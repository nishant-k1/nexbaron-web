"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { apiRequest, getToken, setToken, type AuthUser } from "@/lib/api";
import { getDivisionFromPath, type Division } from "@/lib/divisions";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://hub.nexbaron.com";

interface AuthContextValue {
  user: AuthUser | null;
  division: Division | null;
  initialized: boolean;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => void;
  refresh: () => Promise<void>;
  openSignIn: (opts?: { planId?: string; billingCycle?: string }) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const division = getDivisionFromPath(pathname ?? "");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializedDivision, setInitializedDivision] = useState<Division | null>(null);
  const refreshGeneration = useRef(0);

  const [lastDivision, setLastDivision] = useState<Division | null>(division);
  if (lastDivision !== division) {
    setLastDivision(division);
    setUser(null);
    setInitializedDivision(null);
  }

  const refresh = useCallback(async () => {
    const generation = ++refreshGeneration.current;
    const requestedDivision = division;
    if (!requestedDivision) return;

    try {
      const data = await apiRequest<{ success: boolean; user: AuthUser }>(
        `/${requestedDivision}/auth/me`,
        {},
        requestedDivision,
      );
      if (generation !== refreshGeneration.current) return;
      if (data.user.division !== requestedDivision) {
        // Token belongs to the other division — treat this division as signed out.
        setToken(null, requestedDivision);
        setUser(null);
      } else {
        // If user authenticated via cookie, persist token for subsequent Bearer calls (dev convenience)
        const existing = getToken(requestedDivision);
        if (!existing) {
          // No local token but cookie auth succeeded — keep user; token remains cookie-only
        }
        setUser(data.user);
      }
    } catch {
      if (generation === refreshGeneration.current) {
        // Only clear local token; cookie may still be valid but /me already failed
        setToken(null, requestedDivision);
        setUser(null);
      }
    } finally {
      if (generation === refreshGeneration.current) setInitializedDivision(requestedDivision);
    }
  }, [division]);

  useEffect(() => {
    void Promise.resolve().then(refresh);
  }, [refresh]);

  // Auto-login via ?token= in URL (from Hub OTP verification redirect)
  const tokenHandled = useRef(false);
  useEffect(() => {
    if (tokenHandled.current) return;
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    if (!tokenFromUrl || !division) return;
    tokenHandled.current = true;
    const gen = ++refreshGeneration.current;
    setToken(tokenFromUrl, division);
    apiRequest<{ success: boolean; user: AuthUser }>(`/${division}/auth/me`, {}, division)
      .then((data) => {
        if (gen !== refreshGeneration.current) return;
        if (data.user.division === division) {
          setUser(data.user);
        } else {
          setToken(null, division);
        }
      })
      .catch(() => {
        setToken(null, division);
      })
      .finally(() => {
        if (gen === refreshGeneration.current) {
          setInitializedDivision(division);
        }
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());
      });
  }, [division]);

  const signIn = useCallback((token: string, nextUser: AuthUser) => {
    ++refreshGeneration.current;
    setToken(token, nextUser.division);
    setUser(nextUser);
    setInitializedDivision(nextUser.division);
  }, []);

  const signOut = useCallback(() => {
    if (!division) return;
    setToken(null, division);
    setUser(null);
  }, [division]);

  // Sign-in happens on the Hub (OTP + Google), not on the marketing site.
  // Preserve plan intent if the user arrived via pricing ?plan=&billing=
  const openSignIn = useCallback(
    (opts?: { planId?: string; billingCycle?: string }) => {
      if (!division) return;
      const params = new URLSearchParams();
      const planId = opts?.planId ?? new URLSearchParams(window.location.search).get("plan") ?? "";
      const billing =
        opts?.billingCycle ?? new URLSearchParams(window.location.search).get("billing") ?? "";
      if (planId) params.set("plan", planId);
      if (billing) params.set("billing", billing);
      const qs = params.toString() ? `?${params.toString()}` : "";
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${HUB_URL}/${division}/login${qs}`);
    },
    [division],
  );

  const value = useMemo(
    () => ({
      user: division && user?.division === division ? user : null,
      division,
      initialized: division === null || initializedDivision === division,
      signIn,
      signOut,
      refresh,
      openSignIn,
    }),
    [user, division, initializedDivision, signIn, signOut, refresh, openSignIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
