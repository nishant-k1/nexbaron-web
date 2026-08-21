"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#020617",
          color: "#fff",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ fontSize: 14, color: "#cbd5e1", marginBottom: 16 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              background: "#14b8a6",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              fontSize: 14,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
