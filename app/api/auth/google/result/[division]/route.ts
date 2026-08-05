import { type NextRequest, NextResponse } from "next/server";

import type { Division } from "@/lib/api";
import {
  decodeGoogleAuthResult,
  googleAuthResultCookie,
  googleAuthResultPath,
} from "@/lib/google-auth-result";

export async function POST(
  request: NextRequest,
  { params }: { params: { division: string } },
): Promise<NextResponse> {
  const division = params.division;
  if (division !== "digital" && division !== "print") {
    return NextResponse.json({ success: false, message: "Unknown division" }, { status: 400 });
  }

  const cookieName = googleAuthResultCookie(division);
  const encoded = request.cookies.get(cookieName)?.value;
  const result = encoded ? decodeGoogleAuthResult(encoded) : null;
  const response = result
    ? NextResponse.json(result)
    : NextResponse.json(
        { success: false, message: "The sign-in result expired. Please try again." },
        { status: 404 },
      );

  clearResultCookie(response, division, cookieName);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function clearResultCookie(response: NextResponse, division: Division, cookieName: string): void {
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: googleAuthResultPath(division),
    maxAge: 0,
  });
}
