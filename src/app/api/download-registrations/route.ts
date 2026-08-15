import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database download error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    const registrations = data || [];

    // Build CSV
    const headers = [
      "Registration ID", "Name", "Age", "Email", "Phone", "Gender", "LinkedIn", "Instagram",
      "Company", "Role", "Industry", "Annual Revenue", "Business Sector",
      "Product/Service", "Primary Need", "Primary Goal", "About",
      "Approval Status", "Payment Status", "Created At"
    ];

    const rows = registrations.map((r: any) => [
      r.registration_id, r.name, r.age ?? "", r.email, r.phone, r.gender,
      r.linkedin || "", r.instagram || "",
      r.company_name, r.role, r.industry, r.annual_revenue, r.business_sector,
      r.product_service, r.primary_need, r.primary_goal, r.about,
      r.approval_status, r.payment_status,
      r.created_at,
    ].map((v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","));

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Download registrations error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}

