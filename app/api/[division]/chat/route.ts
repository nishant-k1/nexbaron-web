import { type NextRequest, NextResponse } from "next/server";

import { getApiUrl } from "@/lib/api";

function forwardHeaders(request: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const auth = request.headers.get("authorization");
  if (auth) headers["Authorization"] = auth;
  return headers;
}

export async function POST(request: NextRequest, { params }: { params: { division: string } }) {
  try {
    const { division } = params;
    if (division !== "digital" && division !== "print") {
      return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
    }

    const body = await request.json();
    const backendUrl = getApiUrl(division);

    const response = await fetch(`${backendUrl}/${division}/chat`, {
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

export async function GET(request: NextRequest, { params }: { params: { division: string } }) {
  try {
    const { division } = params;
    if (division !== "digital" && division !== "print") {
      return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
    }

    const backendUrl = getApiUrl(division);
    const url = new URL(request.url);
    const qs = url.search;

    const response = await fetch(`${backendUrl}/${division}/chat${qs}`, {
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
