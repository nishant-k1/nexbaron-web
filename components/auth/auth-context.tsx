"use client";

import { usePathname, useRouter } from "next/navigation";
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
import { getDivisionFromPath, type DivisionSlug } from "@/lib/divisions";

interface AuthContextValue {
  user: AuthUser | null;
  division: DivisionSlug | null;
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
  const pathname = usePathname();
  const division = getDivisionFromPath(pathname ?? "");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializedDivision, setInitializedDivision] = useState<DivisionSlug | null>(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInDivision, setSignInDivision] = useState<DivisionSlug | null>(null);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);
  const refreshGeneration = useRef(0);

  const refresh = useCallback(async () => {
    const generation = ++refreshGeneration.current;
    const requestedDivision = division;
    setUser(null);
    setInitializedDivision(null);
    if (!requestedDivision) return;

    const token = getToken(requestedDivision);
    if (!token) {
      if (generation === refreshGeneration.current) setInitializedDivision(requestedDivision);
      return;
    }
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
        setUser(data.user);
      }
    } catch {
      if (generation === refreshGeneration.current) {
        setToken(null, requestedDivision);
        setUser(null);
      }
    } finally {
      if (generation === refreshGeneration.current) setInitializedDivision(requestedDivision);
    }
  }, [division]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

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

  const googleSignIn = useCallback(
    async (credential: string): Promise<{ token: string; user: AuthUser } | null> => {
      if (!division) return null;
      try {
        const data = await apiRequest<{ success: boolean; token: string; user: AuthUser }>(
          `/${division}/auth/google`,
          {
            method: "POST",
            body: JSON.stringify({ credential }),
          },
          division,
        );
        signIn(data.token, data.user);
        return { token: data.token, user: data.user };
      } catch {
        return null;
      }
    },
    [signIn, division],
  );

  const openSignIn = useCallback(
    (planId?: string) => {
      if (!division) return;
      setSignInDivision(division);
      setPendingPlan(planId ?? null);
      setSignInOpen(true);
    },
    [division],
  );

  const closeSignIn = useCallback(() => {
    setSignInOpen(false);
    setSignInDivision(null);
    setPendingPlan(null);
    if (typeof window !== "undefined") {
      if (division === "digital") {
        window.sessionStorage.removeItem("nexbaron-pending-plan");
      }
    }
  }, [division]);

  const completeSignIn = useCallback(
    (result: { token: string; user: AuthUser }) => {
      signIn(result.token, result.user);
      setSignInOpen(false);
      setSignInDivision(null);
      const plan = pendingPlan;
      setPendingPlan(null);
      if (typeof window !== "undefined" && result.user.division === "digital") {
        window.sessionStorage.removeItem("nexbaron-pending-plan");
      }
      if (plan && result.user.division === "digital") {
        router.push(`/digital/onboarding?plan=${plan}`);
      }
    },
    [signIn, pendingPlan, router],
  );

  const value = useMemo(
    () => ({
      user: division && user?.division === division ? user : null,
      division,
      initialized: division === null || initializedDivision === division,
      signIn,
      signOut,
      refresh,
      googleSignIn,
      signInOpen: signInOpen && signInDivision === division,
      pendingPlan,
      openSignIn,
      closeSignIn,
      completeSignIn,
    }),
    [
      user,
      division,
      initializedDivision,
      signIn,
      signOut,
      refresh,
      googleSignIn,
      signInOpen,
      signInDivision,
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
