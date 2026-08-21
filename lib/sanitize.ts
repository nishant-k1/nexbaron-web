const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "authorization",
  "authorisation",
  "otp",
  "code",
  "secret",
  "apikey",
  "api_key",
  "accesstoken",
  "refreshtoken",
  "cookie",
  "session",
  "x-api-key",
  "razorpay",
  "card",
  "cvv",
  "ssn",
  "authorization",
]);

export function sanitize(input: unknown): unknown {
  if (input === null || input === undefined || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map((v) => sanitize(v));

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    const lc = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lc)) {
      out[key] = "[REDACTED]";
    } else if (lc.includes("email")) {
      out[key] = typeof value === "string" ? value.replace(/(.{2}).*(@.*)/, "$1***$2") : value;
    } else if (lc.includes("phone") || lc.includes("mobile")) {
      out[key] = typeof value === "string" ? value.replace(/.(?=.{2})/g, "*") : value;
    } else if (value && typeof value === "object") {
      out[key] = sanitize(value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export default sanitize;
