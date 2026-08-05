"use client";

import { useAuth } from "@/auth/auth-context";
import { AuthGate } from "@/auth/components/auth-gate";

/**
 * The single, app-wide sign-in dialog. Mounted once in the root layout inside
 * AuthProvider. Opened from the navbar, the pricing grid, the onboarding
 * wizard, and automatically as a fallback when Google One Tap can't display.
 */
export function AuthGateController() {
  const { signInOpen, closeSignIn, completeSignIn } = useAuth();
  return <AuthGate open={signInOpen} onClose={closeSignIn} onSuccess={completeSignIn} />;
}
