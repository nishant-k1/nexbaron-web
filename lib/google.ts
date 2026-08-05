import type { Division } from "@/lib/api";

export function getGoogleClientId(division: Division): string | undefined {
  const brandSpecific =
    division === "digital"
      ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_DIGITAL
      : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_PRINT;
  return (
    brandSpecific ||
    (process.env.NODE_ENV !== "production" ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID : undefined)
  );
}

let scriptPromise: Promise<void> | null = null;

export function ensureGsiScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const g = (window as unknown as { google?: { accounts?: { id?: unknown } } }).google?.accounts
    ?.id;
  if (g) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]',
      );
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load Google script")));
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Google script"));
      };
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

type GoogleId = {
  initialize: (config: {
    client_id: string;
    callback: (response: { credential: string }) => void;
    auto_select?: boolean;
  }) => void;
  prompt: (
    listener: (notification: {
      isNotDisplayed: () => boolean;
      isSkippedMoment: () => boolean;
      isDismissedMoment: () => boolean;
      getNotDisplayedReason: () => string;
      getSkippedReason: () => string;
      getDismissedReason: () => string;
    }) => void,
  ) => void;
  disableAutoSelect: () => void;
  cancel: () => void;
};

export type PromptResult =
  | { status: "success" }
  | { status: "notDisplayed"; reason: string }
  | { status: "skipped"; reason: string }
  | { status: "dismissed"; reason: string };

export function getGoogleId(): GoogleId | null {
  const accounts = (window as unknown as { google?: { accounts?: { id?: unknown } } }).google
    ?.accounts?.id;
  return (accounts as GoogleId | undefined) ?? null;
}

type GoogleCredentialHandler = (credential: string) => void;

const credentialHandlers = new Set<GoogleCredentialHandler>();
let initializedClientId: string | null = null;

export function onGoogleCredential(handler: GoogleCredentialHandler): () => void {
  credentialHandlers.add(handler);
  return () => {
    credentialHandlers.delete(handler);
  };
}

export function initGoogleAuth(clientId: string): void {
  if (initializedClientId === clientId) return;
  const googleId = getGoogleId();
  if (!googleId) return;
  initializedClientId = clientId;
  googleId.initialize({
    client_id: clientId,
    callback: (response) => {
      credentialHandlers.forEach((handler) => handler(response.credential));
    },
    auto_select: true,
  });
}

let pendingPrompt: Promise<PromptResult> | null = null;

export function triggerGooglePrompt(): Promise<PromptResult> {
  // FedCM allows only one outstanding navigator.credentials.get() request.
  // If a prompt is already in flight, return that same promise instead of
  // starting a second, colliding request.
  if (pendingPrompt) return pendingPrompt;

  pendingPrompt = new Promise<PromptResult>((resolve) => {
    const googleId = getGoogleId();
    if (!googleId) {
      pendingPrompt = null;
      resolve({ status: "notDisplayed", reason: "gsi-not-loaded" });
      return;
    }
    googleId.prompt((notification) => {
      pendingPrompt = null;
      if (notification.isNotDisplayed()) {
        resolve({ status: "notDisplayed", reason: notification.getNotDisplayedReason() });
      } else if (notification.isSkippedMoment()) {
        resolve({ status: "skipped", reason: notification.getSkippedReason() });
      } else if (notification.isDismissedMoment()) {
        resolve({ status: "dismissed", reason: notification.getDismissedReason() });
      } else {
        resolve({ status: "success" });
      }
    });
  });

  return pendingPrompt;
}

export function cancelGooglePrompt(): void {
  pendingPrompt = null;
  getGoogleId()?.cancel();
}
