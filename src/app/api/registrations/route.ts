import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data: registrations, error } = await supabaseServer
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database fetch error in registrations API:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      throw error;
    }

    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error("Error fetching registrations in admin API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read registrations from database." },
      { status: 500 }
    );
  }
}

