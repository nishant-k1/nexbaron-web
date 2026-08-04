import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Forward the full submitted payload so division-specific fields
    // (plan, businessType, city, goal, requirement, quantity, deadline,
    // deliveryPincode, etc.) are preserved as a lead in the CRM.
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to submit contact form");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
