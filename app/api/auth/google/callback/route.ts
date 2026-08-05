import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getApiUrl, type AuthUser, type Division } from "@/lib/api";
import {
  encodeGoogleAuthResult,
  GOOGLE_AUTH_RESULT_MAX_AGE,
  googleAuthResultCookie,
  googleAuthResultPath,
  type GoogleAuthResult,
} from "@/lib/google-auth-result";

interface GoogleTokenResponse {
  id_token?: string;
  error_description?: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  const origin = new URL(request.url).origin;
  const state = request.nextUrl.searchParams.get("state") ?? "";
  const division = divisionFromState(state);

  if (!division) {
    return redirectToComplete(origin, { state });
  }

  const finish = (result: GoogleAuthResult): NextResponse => {
    const response = redirectToComplete(origin, { division, state });
    response.cookies.set(googleAuthResultCookie(division), encodeGoogleAuthResult(result), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: googleAuthResultPath(division),
      maxAge: GOOGLE_AUTH_RESULT_MAX_AGE,
    });
    return response;
  };

  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return finish({ success: false, message: "Google sign-in was cancelled." });
  }

  const { clientId, clientSecret } = googleOAuthConfig(division);
  if (!clientId || !clientSecret) {
    return finish({ success: false, message: "Google sign-in isn't configured on the server." });
  }

  const redirectUri = `${origin}/api/auth/google/callback`;
  let tokens: GoogleTokenResponse;
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });
    tokens = (await response.json()) as GoogleTokenResponse;
  } catch {
    return finish({ success: false, message: "Could not reach Google. Please try again." });
  }

  if (!tokens.id_token) {
    return finish({
      success: false,
      message: tokens.error_description ?? "Google sign-in failed. Please try again.",
    });
  }

  let backend: Response;
  try {
    backend = await fetch(`${getApiUrl(division)}/${division}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: tokens.id_token }),
      cache: "no-store",
    });
  } catch {
    return finish({
      success: false,
      message: "Could not reach the sign-in service. Please try again.",
    });
  }

  const data = (await backend.json().catch(() => null)) as {
    token?: string;
    user?: AuthUser;
    message?: string;
  } | null;
  if (!backend.ok || !data?.token || !data.user) {
    return finish({
      success: false,
      message: data?.message ?? "Could not sign in with Google.",
    });
  }
  if (data.user.division !== division) {
    return finish({ success: false, message: "Google returned an account for another division." });
  }

  return finish({ success: true, token: data.token, user: data.user });
}

function divisionFromState(state: string): Division | null {
  try {
    const parsed = JSON.parse(state) as { division?: string };
    return parsed.division === "digital" || parsed.division === "print" ? parsed.division : null;
  } catch {
    return null;
  }
}

function googleOAuthConfig(division: Division): {
  clientId: string | undefined;
  clientSecret: string | undefined;
} {
  const brandClientId =
    division === "digital"
      ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_DIGITAL
      : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_PRINT;
  const brandSecret =
    division === "digital"
      ? process.env.GOOGLE_CLIENT_SECRET_DIGITAL
      : process.env.GOOGLE_CLIENT_SECRET_PRINT;
  // Fall back to generic credentials when brand-specific ones are not set
  const clientId = brandClientId || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = brandSecret || process.env.GOOGLE_CLIENT_SECRET;
  return { clientId, clientSecret };
}

function redirectToComplete(origin: string, params: Record<string, string>): NextResponse {
  const url = new URL("/auth/complete", origin);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return NextResponse.redirect(url);
}
