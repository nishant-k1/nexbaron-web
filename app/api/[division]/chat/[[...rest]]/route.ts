import { type NextRequest, NextResponse } from "next/server";

import { getChatUrl } from "@/lib/api";

function forwardHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;
  return headers;
}

// Only allow plain path segments (no traversal, no dots) before forwarding to
// the chat backend so a crafted request can't escape the brand-scoped route.
function buildSuffix(rest?: string[]): string | null {
  if (!rest?.length) return "";
  const safe = rest.every((segment) => /^[a-zA-Z0-9_-]+$/.test(segment));
  if (!safe) return null;
  return `/${rest.join("/")}`;
}

// Catch-all proxy for every /api/{division}/chat[/...rest] route (send, history,
// read, presence, merge). The path suffix is forwarded to the backend verbatim.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ division: string; rest?: string[] }> },
) {
  try {
    const { division, rest } = await params;
    if (division !== "digital" && division !== "print") {
      return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
    }

    const suffix = buildSuffix(rest);
    if (suffix === null) {
      return NextResponse.json({ success: false, message: "Invalid path" }, { status: 400 });
    }

    const body = await request.json();
    const backendUrl = getChatUrl();

    const response = await fetch(`${backendUrl}/${division}/chat${suffix}`, {
      method: "POST",
      headers: forwardHeaders(request),
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: "Chat service unavailable",
    }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Chat POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ division: string; rest?: string[] }> },
) {
  try {
    const { division, rest } = await params;
    if (division !== "digital" && division !== "print") {
      return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
    }

    const suffix = buildSuffix(rest);
    if (suffix === null) {
      return NextResponse.json({ success: false, message: "Invalid path" }, { status: 400 });
    }

    const backendUrl = getChatUrl();
    const url = new URL(request.url);
    const qs = url.search;

    const response = await fetch(`${backendUrl}/${division}/chat${suffix}${qs}`, {
      headers: forwardHeaders(request),
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: "Chat service unavailable",
    }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Chat GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load messages" },
      { status: 502 },
    );
  }
}
