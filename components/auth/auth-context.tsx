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
  openSignIn: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const division = getDivisionFromPath(pathname ?? "");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initializedDivision, setInitializedDivision] = useState<Division | null>(null);
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

  // Sign-in happens on the Hub (OTP + Google), not on the marketing site.
  const openSignIn = useCallback(() => {
    if (!division) return;
    // Full cross-app navigation to the Hub, not an internal Next.js page.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign(`${HUB_URL}/${division}/login`);
  }, [division]);

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
