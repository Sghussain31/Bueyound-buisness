import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Email confirmation is no longer required. This endpoint has been deprecated.", code: "DEPRECATED" },
    { status: 410 }
  );
}
