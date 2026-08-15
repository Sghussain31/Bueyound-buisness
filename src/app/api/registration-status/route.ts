import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reg_id = searchParams.get("reg_id");

    if (!reg_id) {
      return NextResponse.json({ success: false, error: "Registration ID is required." }, { status: 400 });
    }

    const { data: registration, error } = await supabaseServer
      .from("registrations")
      .select("registration_id, name, email, approval_status, payment_status, paid_at")
      .eq("registration_id", reg_id)
      .maybeSingle();

    if (error) {
      console.error("Database error in registration-status API:", error);
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    if (!registration) {
      return NextResponse.json({ success: false, error: "Registration not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Registration status handler error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}

