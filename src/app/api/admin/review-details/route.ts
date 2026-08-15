import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { hashToken } from "@/lib/hash";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ success: false, error: "Review token is required." }, { status: 400 });
    }

    const tokenHash = hashToken(token);
    const { data: registration, error } = await supabaseServer
      .from("registrations")
      .select("*")
      .eq("approval_token_hash", tokenHash)
      .maybeSingle();

    if (error) {
      console.error("Database error in review-details:", error);
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    if (!registration) {
      return NextResponse.json({ success: false, error: "Invalid, expired, or already reviewed token." }, { status: 404 });
    }

    // Check token expiry
    if (registration.approval_token_expires_at && new Date(registration.approval_token_expires_at) < new Date()) {
      return NextResponse.json({ success: false, error: "This review link has expired." }, { status: 410 });
    }

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Review-details handler error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}

