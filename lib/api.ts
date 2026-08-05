export type Division = "digital" | "print";

const API_URL_FALLBACK = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function getApiUrl(division: Division): string {
  const url =
    division === "digital"
      ? process.env.NEXT_PUBLIC_API_URL_DIGITAL || API_URL_FALLBACK
      : process.env.NEXT_PUBLIC_API_URL_PRINT || API_URL_FALLBACK;
  return url.replace(/\/$/, "");
}

const AUTH_TOKEN_KEY_PREFIX = "nexbaron-auth-token";

export function authTokenKey(division: Division): string {
  return `${AUTH_TOKEN_KEY_PREFIX}-${division}`;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  division: Division;
  photo?: string | null;
}

export function getToken(division: Division): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(authTokenKey(division));
}

export function setToken(token: string | null, division: Division): void {
  if (typeof window === "undefined") return;
  const key = authTokenKey(division);
  if (token) {
    window.localStorage.setItem(key, token);
    if (division === "digital") {
      window.localStorage.removeItem(AUTH_TOKEN_KEY_PREFIX);
    }
  } else {
    window.localStorage.removeItem(key);
  }
}

export function getAuthHeaders(division: Division): Record<string, string> {
  const token = getToken(division);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  division: Division = "digital",
): Promise<T> {
  const response = await fetch(`${getApiUrl(division)}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(division),
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}
