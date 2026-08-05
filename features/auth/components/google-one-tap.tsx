"use client";

import { useEffect, useRef } from "react";

import { useAuth } from "@/features/auth/auth-context";
import {
  cancelGooglePrompt,
  ensureGsiScript,
  getGoogleClientId,
  initGoogleAuth,
  onGoogleCredential,
  triggerGooglePrompt,
  type PromptResult,
} from "@/lib/google";

/**
 * Global Google One Tap trigger. Mounted once inside AuthProvider.
 * - Attempts One Tap on page load when signed out. Chrome itself limits the
 *   prompt to once per browser session, so the guard is not needed here.
 * - Auto-select is enabled, so returning Google users sign in silently.
 * - If the prompt can't be displayed (e.g. Chrome blocks third-party sign-in /
 *   FedCM for the site), we auto-open the sign-in dialog as a fallback so the
 *   user lands directly on the "Continue with Google" OAuth button.
 */
export function GoogleOneTap() {
  const { user, division, initialized, googleSignIn, openSignIn } = useAuth();
  const attemptedRef = useRef(false);
  const attemptedDivisionRef = useRef(division);

  useEffect(() => {
    if (attemptedDivisionRef.current !== division) {
      attemptedDivisionRef.current = division;
      attemptedRef.current = false;
    }
    if (!division || !initialized || user || attemptedRef.current) return;
    attemptedRef.current = true;

    const clientId = getGoogleClientId(division);
    if (!clientId) return;

    let cancelled = false;
    let openedFallback = false;
    const offCredential = onGoogleCredential((credential) => {
      if (!cancelled) googleSignIn(credential);
    });

    (async () => {
      try {
        await ensureGsiScript();
        if (cancelled) return;
        initGoogleAuth(clientId);
        const result: PromptResult = await triggerGooglePrompt();
        if (cancelled) return;
        // Prompt couldn't be shown (FedCM blocked, browser not supported, etc.)
        // → fall back to the dialog, which offers the FedCM-independent OAuth
        //   redirect flow. Open it at most once so it isn't obnoxious.
        if (result.status === "notDisplayed" && !openedFallback) {
          openedFallback = true;
          openSignIn();
        }
      } catch {
        // silent — the dialog / button remains the fallback
      }
    })();

    return () => {
      cancelled = true;
      offCredential();
      cancelGooglePrompt();
    };
  }, [division, initialized, user, googleSignIn, openSignIn]);

  return null;
}
