import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { registration_id, status, payment_id, payment_reference, payment_method, amount } = body;

    if (!registration_id || !status) {
      return NextResponse.json(
        { success: false, error: "registration_id and status are required." },
        { status: 400 }
      );
    }

    if (!["PAID", "FAILED", "PAYMENT_PENDING", "CANCELLED", "REFUNDED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid payment status value." },
        { status: 400 }
      );
    }

    const nowStr = new Date().toISOString();

    // Query Supabase for the registration ID
    const { data: registration, error: findErr } = await supabaseServer
      .from("registrations")
      .select("*")
      .eq("registration_id", registration_id)
      .maybeSingle();

    if (findErr || !registration) {
      return NextResponse.json(
        { success: false, error: "Registration record not found in database." },
        { status: 404 }
      );
    }

    // Update details in database
    const updateData: any = {
      payment_status: status,
      payment_id: status === "PAID" ? (payment_id || null) : null,
      payment_reference: status === "PAID" ? (payment_reference || null) : null,
      payment_method: status === "PAID" ? (payment_method || null) : null,
      amount: status === "PAID" && amount !== undefined ? Number(amount) : null,
      paid_at: status === "PAID" ? nowStr : null,
      updated_at: nowStr,
    };

    const { error: updateErr } = await supabaseServer
      .from("registrations")
      .update(updateData)
      .eq("id", registration.id);

    if (updateErr) {
      console.error("Database webhook update failed:", updateErr);
      return NextResponse.json(
        { success: false, error: "Failed to update payment details in database." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Payment status updated to ${status}.`,
      registration: {
        registration_id: registration_id,
        name: registration.name,
        payment_status: status,
        payment_id: status === "PAID" ? payment_id : null,
        paid_at: status === "PAID" ? nowStr : null,
      },
    });
  } catch (error) {
    console.error("Error updating payment status in webhook API:", error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

