import { type NextRequest, NextResponse } from "next/server";

import { getApiUrl } from "@/lib/api";

export async function POST(request: NextRequest, { params }: { params: { division: string } }) {
  try {
    const { division } = params;
    if (division !== "digital" && division !== "print") {
      return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
    }

    const body = await request.json();
    const backendUrl = getApiUrl(division);

    // Forward to backend chat endpoint
    const response = await fetch(backendUrl + "/" + division + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: "Chat service unavailable",
    }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 502 },
    );
  }
}
