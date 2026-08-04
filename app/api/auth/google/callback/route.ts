import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface GoogleIdToken {
  name?: string;
  email?: string;
  sub?: string;
  picture?: string;
}

function decodeIdToken(token: string): GoogleIdToken {
  const part = token.split(".")[1] ?? "";
  const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
}

/**
 * OAuth2 Authorization Code callback.
 *
 * The client navigates the browser to accounts.google.com (a plain full-page
 * redirect, no FedCM / no GSI script). Google redirects back here with
 * ?code=..., which we exchange for an ID token using the client secret, upsert
 * the user via the backend, and hand the token to the /auth/complete page.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const origin = new URL(req.url).origin;
  const redirectTo = (path: string, params?: Record<string, string>) => {
    const url = new URL(path, origin);
    for (const [k, v] of Object.entries(params ?? {})) url.searchParams.set(k, v);
    return NextResponse.redirect(url);
  };

  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return redirectTo("/auth/complete", { error: "Google sign-in was cancelled." });
  }

  // The client encodes { nonce, division } in the OAuth state so we can create
  // the user under the right division (digital vs print).
  const state = req.nextUrl.searchParams.get("state");
  let division: "digital" | "print" = "digital";
  try {
    const parsed = state ? (JSON.parse(state) as { division?: "digital" | "print" }) : null;
    if (parsed?.division) division = parsed.division;
  } catch {
    // fall through with digital
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return redirectTo("/auth/complete", {
      error: "Google sign-in isn't configured on the server.",
    });
  }

  const redirectUri = `${origin}/api/auth/google/callback`;

  let tokens: { id_token?: string; error?: string; error_description?: string };
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    tokens = await res.json();
  } catch {
    return redirectTo("/auth/complete", {
      error: "Could not reach Google. Please try again.",
    });
  }

  if (!tokens.id_token) {
    return redirectTo("/auth/complete", {
      error: tokens.error_description ?? "Google sign-in failed. Please try again.",
    });
  }

  let payload: GoogleIdToken;
  try {
    payload = decodeIdToken(tokens.id_token);
  } catch {
    return redirectTo("/auth/complete", { error: "Invalid Google response." });
  }

  if (!payload.email || !payload.sub) {
    return redirectTo("/auth/complete", { error: "Google didn't return a valid profile." });
  }

  let backend: Response;
  try {
    backend = await fetch(`${API_URL}/api/digital/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        photo: payload.picture,
        division,
      }),
    });
  } catch {
    return redirectTo("/auth/complete", {
      error: "Could not reach the sign-in service. Please try again.",
    });
  }

  const data = await backend.json().catch(() => null);
  if (!backend.ok || !data?.token) {
    return redirectTo("/auth/complete", {
      error: data?.message ?? "Could not sign in with Google.",
    });
  }

  return redirectTo("/auth/complete", {
    token: data.token,
    user: JSON.stringify(data.user),
  });
}
