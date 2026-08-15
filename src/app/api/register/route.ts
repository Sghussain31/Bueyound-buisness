import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { sendClientApprovalEmail } from "@/lib/email";
import { hashToken } from "@/lib/hash";
import { checkRateLimit } from "@/lib/rateLimit";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Rate limit by IP
    const clientIp = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const ipLimit = checkRateLimit(`register_ip_${clientIp}`, 10, 5 * 60 * 1000);
    if (!ipLimit.success) {
      return NextResponse.json(
        { success: false, error: ipLimit.error || "Too many attempts. Please wait." },
        { status: 429 }
      );
    }

    // Server-side required fields validation
    const requiredFields = [
      "name", "age", "email", "phone", "gender",
      "company_name", "role", "industry", "annual_revenue", "business_sector",
      "product_service", "primary_need", "primary_goal", "about",
    ];
    const missingFields = requiredFields.filter((f) => body[f] === undefined || body[f] === null || body[f] === "");
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Age validation (integer between 18 and 100)
    const ageNum = Number(body.age);
    if (!Number.isInteger(ageNum) || ageNum < 18 || ageNum > 100) {
      return NextResponse.json(
        { success: false, error: "Age must be an integer between 18 and 100." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    // About field validation (minimum 20 characters)
    if (typeof body.about !== "string" || body.about.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: "About section must be at least 20 characters long." },
        { status: 400 }
      );
    }

    const emailKey = body.email.toLowerCase().trim();
    const phoneKey = body.phone.trim();

    // Generate secure 48h review token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = hashToken(rawToken);
    const expiryHours = Number(process.env.APPROVAL_TOKEN_EXPIRY_HOURS) || 48;
    const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const reviewUrl = `${siteUrl}/admin/review/${rawToken}`;

    // 1. Duplicate Email Check in Supabase
    const { data: existingEmail, error: emailErr } = await supabaseServer
      .from("registrations")
      .select("email, approval_status, payment_status, registration_id")
      .eq("email", emailKey)
      .maybeSingle();

    if (emailErr) {
      console.error("Database email check error:", {
        message: emailErr.message,
        code: emailErr.code,
        details: emailErr.details,
        hint: emailErr.hint,
      });
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    if (existingEmail) {
      const s = existingEmail.approval_status;
      if (s === "PENDING_APPROVAL") {
        return NextResponse.json(
          { success: false, error: "Your application is already under review.", code: "PENDING_APPROVAL" },
          { status: 400 }
        );
      }
      if (s === "APPROVED" && existingEmail.payment_status === "PAID") {
        return NextResponse.json(
          { success: false, error: "Your registration is already complete.", code: "PAID" },
          { status: 400 }
        );
      }
      if (s === "APPROVED") {
        return NextResponse.json(
          {
            success: false,
            error: "Your application is already approved. Please complete payment.",
            code: "PAYMENT_PENDING",
            registration_id: existingEmail.registration_id,
          },
          { status: 400 }
        );
      }
      if (s === "REJECTED") {
        return NextResponse.json(
          { success: false, error: "We are unable to accept duplicate applications for this email.", code: "REJECTED" },
          { status: 400 }
        );
      }
    }

    // 2. Duplicate Phone Check in Supabase
    const { data: existingPhone, error: phoneErr } = await supabaseServer
      .from("registrations")
      .select("phone")
      .eq("phone", phoneKey)
      .maybeSingle();

    if (phoneErr) {
      console.error("Database phone check error:", {
        message: phoneErr.message,
        code: phoneErr.code,
        details: phoneErr.details,
        hint: phoneErr.hint,
      });
      return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
    }

    if (existingPhone) {
      return NextResponse.json({ success: false, error: "This contact number is already registered." }, { status: 400 });
    }

    // 3. Database-safe Registration ID Generation
    let registrationId = "";

    // Try PostgreSQL RPC function first if created
    const { data: rpcRegId } = await supabaseServer.rpc("get_next_registration_id");
    if (rpcRegId && typeof rpcRegId === "string") {
      registrationId = rpcRegId;
    } else {
      // Fallback: Query MAX existing registration_id
      const { data: maxReg } = await supabaseServer
        .from("registrations")
        .select("registration_id")
        .order("registration_id", { ascending: false })
        .limit(1)
        .maybeSingle();

      let nextNum = 1;
      if (maxReg?.registration_id) {
        const match = maxReg.registration_id.match(/(\d+)$/);
        if (match) {
          nextNum = parseInt(match[1], 10) + 1;
        }
      }
      registrationId = `BNB-2026-${String(nextNum).padStart(5, "0")}`;
    }

    // 4. Exact Application-Controlled Supabase INSERT Payload
    const newRecord = {
      registration_id: registrationId,
      name: body.name.trim(),
      age: ageNum,
      email: emailKey,
      phone: phoneKey,
      gender: body.gender,
      linkedin: body.linkedin?.trim() || null,
      instagram: body.instagram?.trim() || null,
      company_name: body.company_name.trim(),
      role: body.role,
      industry: body.industry,
      annual_revenue: body.annual_revenue,
      business_sector: body.business_sector,
      other_sector: body.other_sector?.trim() || null,
      product_service: body.product_service.trim(),
      primary_need: body.primary_need,
      primary_goal: body.primary_goal,
      about: body.about.trim(),
      approval_status: "PENDING_APPROVAL",
      approval_token_hash: tokenHash,
      approval_token_expires_at: expiresAt,
      payment_status: "NOT_STARTED",
    };

    const { error: insertErr } = await supabaseServer.from("registrations").insert([newRecord]);
    if (insertErr) {
      console.error("Supabase insert error details:", {
        message: insertErr.message,
        code: insertErr.code,
        details: insertErr.details,
        hint: insertErr.hint,
      });
      return NextResponse.json({ success: false, error: "Failed to save registration." }, { status: 500 });
    }

    // Send client approval email via real Resend API
    await sendClientApprovalEmail(newRecord, reviewUrl, rawToken);

    return NextResponse.json({
      success: true,
      message: "Registration submitted for admin review.",
      registration_id: registrationId,
      token: rawToken,
    });
  } catch (error) {
    console.error("Registration handler error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}

