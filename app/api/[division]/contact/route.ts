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

    // Forward to the brand-scoped backend endpoint so the lead lands in the
    // correct division database.
    const response = await fetch(`${backendUrl}/api/${division}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({
      success: false,
      message: "The contact service returned an invalid response",
    }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reach the contact service" },
      { status: 502 },
    );
  }
}
