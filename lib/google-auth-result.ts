import type { AuthUser, Division } from "@/lib/api";

export type GoogleAuthResult =
  { success: true; token: string; user: AuthUser } | { success: false; message: string };

export const GOOGLE_AUTH_RESULT_MAX_AGE = 120;

export function googleAuthResultCookie(division: Division): string {
  return `nexbaron-google-result-${division}`;
}

export function googleAuthResultPath(division: Division): string {
  return `/api/auth/google/result/${division}`;
}

export function encodeGoogleAuthResult(result: GoogleAuthResult): string {
  return Buffer.from(JSON.stringify(result), "utf8").toString("base64url");
}

export function decodeGoogleAuthResult(value: string): GoogleAuthResult | null {
  try {
    const result = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as GoogleAuthResult;
    if (result.success) {
      return result.token && result.user ? result : null;
    }
    return typeof result.message === "string" ? result : null;
  } catch {
    return null;
  }
}
