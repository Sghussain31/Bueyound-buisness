import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { sendApplicantApprovalEmail, sendApplicantRejectionEmail } from "@/lib/email";
import { hashToken } from "@/lib/hash";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, action } = body;

    if (!token || !action) {
      return NextResponse.json({ success: false, error: "Token and action are required." }, { status: 400 });
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ success: false, error: "Action must be 'approve' or 'reject'." }, { status: 400 });
    }

    const tokenHash = hashToken(token);

    const { data: registration, error: fetchErr } = await supabaseServer
      .from("registrations")
      .select("*")
      .eq("approval_token_hash", tokenHash)
      .maybeSingle();

    if (fetchErr) {
      console.error("Database error in review:", fetchErr);
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    if (!registration) {
      return NextResponse.json({ success: false, error: "Invalid, expired, or already reviewed token." }, { status: 404 });
    }

    // Check token expiry
    if (registration.approval_token_expires_at && new Date(registration.approval_token_expires_at) < new Date()) {
      return NextResponse.json({ success: false, error: "This review link has expired." }, { status: 410 });
    }

    const now = new Date().toISOString();

    if (action === "approve") {
      const { error: updateErr } = await supabaseServer
        .from("registrations")
        .update({
          approval_status: "APPROVED",
          approved_at: now,
          payment_status: "PAYMENT_PENDING",
          approval_token_hash: null,
          approval_token_expires_at: null,
          updated_at: now,
        })
        .eq("id", registration.id);

      if (updateErr) {
        console.error("Supabase update error on approve:", updateErr);
        return NextResponse.json({ success: false, error: "Failed to approve registration." }, { status: 500 });
      }

      await sendApplicantApprovalEmail({ ...registration, approval_status: "APPROVED" });

      return NextResponse.json({
        success: true,
        message: `Registration ${registration.registration_id} approved. Payment email sent to ${registration.email}.`,
        action: "approved",
        registration_id: registration.registration_id,
      });

    } else {
      const { error: updateErr } = await supabaseServer
        .from("registrations")
        .update({
          approval_status: "REJECTED",
          rejected_at: now,
          payment_status: "NOT_STARTED",
          approval_token_hash: null,
          approval_token_expires_at: null,
          updated_at: now,
        })
        .eq("id", registration.id);

      if (updateErr) {
        console.error("Supabase update error on reject:", updateErr);
        return NextResponse.json({ success: false, error: "Failed to reject registration." }, { status: 500 });
      }

      await sendApplicantRejectionEmail(registration);

      return NextResponse.json({
        success: true,
        message: `Registration ${registration.registration_id} rejected. Notification sent to ${registration.email}.`,
        action: "rejected",
        registration_id: registration.registration_id,
      });
    }
  } catch (error) {
    console.error("Review action handler error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}

