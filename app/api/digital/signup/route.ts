import { type NextRequest, NextResponse } from "next/server";

import { getApiUrl } from "@/lib/api";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://hub.nexbaron.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, address, description, planId } = body;

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    const backendUrl = getApiUrl("digital");

    // Step 1: Create user account via OTP/signup
    const signupRes = await fetch(`${backendUrl}/digital/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() }),
    });

    const signupData = await signupRes.json().catch(() => ({}));

    if (!signupRes.ok && signupRes.status !== 409) {
      return NextResponse.json(
        { success: false, message: signupData.message || "Failed to create account" },
        { status: signupRes.status },
      );
    }

    // Signup returns a login token for brand-new accounts (201). For existing
    // accounts (409) no token is issued; send them to the hub login page instead.

    // Step 2: Submit as a lead/contact
    await fetch(`${backendUrl}/digital/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company?.trim() || undefined,
        city: address?.trim() || undefined,
        message: description?.trim() || undefined,
        plan: planId || undefined,
        source: "pricing-page",
      }),
    }).catch(() => {});

    const hubUrl = signupData.token
      ? `${HUB_URL}/digital?token=${signupData.token}`
      : `${HUB_URL}/digital/login`;

    return NextResponse.json({ success: true, hubUrl });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
