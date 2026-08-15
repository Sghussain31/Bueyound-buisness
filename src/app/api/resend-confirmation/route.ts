import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: false, error: "Email confirmation is no longer required. This endpoint has been deprecated.", code: "DEPRECATED" },
    { status: 410 }
  );
}
