"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { apiRequest, getToken, setToken, type AuthUser } from "@/lib/api";
import { decodeGoogleJwt } from "@/lib/google";

interface AuthContextValue {
  user: AuthUser | null;
  initialized: boolean;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => void;
  refresh: () => Promise<void>;
  googleSignIn: (credential: string) => Promise<{ token: string; user: AuthUser } | null>;
  signInOpen: boolean;
  pendingPlan: string | null;
  openSignIn: (planId?: string) => void;
  closeSignIn: () => void;
  completeSignIn: (result: { token: string; user: AuthUser }) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setInitialized(true);
      return;
    }
    try {
      const data = await apiRequest<{ success: boolean; user: AuthUser }>("/api/digital/auth/me");
      setUser(data.user);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signIn = useCallback((token: string, nextUser: AuthUser) => {
    setToken(token);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const googleSignIn = useCallback(
    async (credential: string): Promise<{ token: string; user: AuthUser } | null> => {
      try {
        const payload = decodeGoogleJwt(credential);
        const data = await apiRequest<{ success: boolean; token: string; user: AuthUser }>(
          "/api/digital/auth/google",
          {
            method: "POST",
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              googleId: payload.sub,
              photo: payload.picture,
              division: "digital",
            }),
          },
        );
        signIn(data.token, data.user);
        return { token: data.token, user: data.user };
      } catch {
        return null;
      }
    },
    [signIn],
  );

  const openSignIn = useCallback((planId?: string) => {
    setPendingPlan(planId ?? null);
    setSignInOpen(true);
  }, []);

  const closeSignIn = useCallback(() => {
    setSignInOpen(false);
    setPendingPlan(null);
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("nexbaron-pending-plan");
    }
  }, []);

  const completeSignIn = useCallback(
    (result: { token: string; user: AuthUser }) => {
      signIn(result.token, result.user);
      setSignInOpen(false);
      const plan = pendingPlan;
      setPendingPlan(null);
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("nexbaron-pending-plan");
      }
      if (plan) {
        router.push(`/digital/onboarding?plan=${plan}`);
      }
    },
    [signIn, pendingPlan, router],
  );

  const value = useMemo(
    () => ({
      user,
      initialized,
      signIn,
      signOut,
      refresh,
      googleSignIn,
      signInOpen,
      pendingPlan,
      openSignIn,
      closeSignIn,
      completeSignIn,
    }),
    [
      user,
      initialized,
      signIn,
      signOut,
      refresh,
      googleSignIn,
      signInOpen,
      pendingPlan,
      openSignIn,
      closeSignIn,
      completeSignIn,
    ],
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
