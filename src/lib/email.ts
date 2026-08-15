import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_NAME = process.env.RESEND_FROM_NAME || "Business & Beyond";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "community@businessandbeyondindia.com";
const REPLY_TO = process.env.RESEND_REPLY_TO || "businessandbeyondindia@gmail.com";

function from() {
  return `${FROM_NAME} <${FROM_EMAIL}>`;
}

// ─────────────────────────────────────────────────────────
// 1. Email to CLIENT/ADMIN — new registration needs review
// ─────────────────────────────────────────────────────────
export async function sendClientApprovalEmail(
  registration: any,
  reviewUrl: string,
  rawToken: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  const clientEmail = process.env.CLIENT_APPROVAL_EMAIL;

  console.log("[EMAIL DIAGNOSTICS]", {
    RESEND_API_KEY_configured: !!apiKey,
    RESEND_FROM_NAME_configured: !!process.env.RESEND_FROM_NAME,
    RESEND_FROM_EMAIL_configured: !!process.env.RESEND_FROM_EMAIL,
    RESEND_REPLY_TO_configured: !!process.env.RESEND_REPLY_TO,
    CLIENT_APPROVAL_EMAIL_configured: !!clientEmail,
  });

  if (!apiKey) {
    const err = new Error("RESEND_API_KEY is not configured in server environment.");
    console.error("RESEND ERROR", { name: err.name, message: err.message });
    throw err;
  }

  if (!clientEmail) {
    const err = new Error("CLIENT_APPROVAL_EMAIL is not configured in server environment.");
    console.error("RESEND ERROR", { name: err.name, message: err.message });
    throw err;
  }

  const fromAddress = from();
  const toAddress = [clientEmail.trim()];
  const subject = `New B&B Registration — Review Required: ${registration.name}`;
  const html = buildClientApprovalHtml(registration, reviewUrl);

  console.log("[RESEND REQUEST]", {
    from: fromAddress,
    to: toAddress,
    subject: subject,
  });

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: REPLY_TO,
    subject: subject,
    html: html,
  });

  if (error) {
    console.error("RESEND ERROR", {
      name: error.name,
      message: error.message,
    });
    throw error;
  }

  console.log("RESEND SUCCESS", {
    id: data?.id,
  });

  return data;
}

// ─────────────────────────────────────────────────────────
// 2. Email to APPLICANT — approved + payment link
// ─────────────────────────────────────────────────────────
export async function sendApplicantApprovalEmail(registration: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const err = new Error("RESEND_API_KEY is not configured.");
    console.error("RESEND ERROR", { name: err.name, message: err.message });
    throw err;
  }

  const paymentLink = process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK || "#";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paymentPageUrl = `${siteUrl}/community/payment?reg_id=${registration.registration_id}`;

  const fromAddress = from();
  const toAddress = [registration.email.trim()];
  const subject = `You're Approved — Complete Your Business & Beyond Registration`;
  const html = buildApplicantApprovalHtml(registration, paymentPageUrl, paymentLink);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: REPLY_TO,
    subject: subject,
    html: html,
  });

  if (error) {
    console.error("RESEND ERROR", {
      name: error.name,
      message: error.message,
    });
    throw error;
  }

  console.log("RESEND SUCCESS", {
    id: data?.id,
  });

  return data;
}

// ─────────────────────────────────────────────────────────
// 3. Email to APPLICANT — rejected
// ─────────────────────────────────────────────────────────
export async function sendApplicantRejectionEmail(registration: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const err = new Error("RESEND_API_KEY is not configured.");
    console.error("RESEND ERROR", { name: err.name, message: err.message });
    throw err;
  }

  const fromAddress = from();
  const toAddress = [registration.email.trim()];
  const subject = `Business & Beyond — Application Status Update`;
  const html = buildApplicantRejectionHtml(registration);

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    replyTo: REPLY_TO,
    subject: subject,
    html: html,
  });

  if (error) {
    console.error("RESEND ERROR", {
      name: error.name,
      message: error.message,
    });
    throw error;
  }

  console.log("RESEND SUCCESS", {
    id: data?.id,
  });

  return data;
}


// ─────────────────────────────────────────────────────────
// HTML TEMPLATES
// ─────────────────────────────────────────────────────────
function buildClientApprovalHtml(registration: any, reviewUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Registration Review</title></head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
    <div style="background:#1a1a2e; padding:30px; text-align:center;">
      <h1 style="color:#d4af37; margin:0; font-size:24px;">Business &amp; Beyond</h1>
      <p style="color:#888; margin:8px 0 0;">New Community Application</p>
    </div>
    <div style="padding:30px;">
      <h2 style="color:#1a1a2e; margin-top:0;">New Registration Requires Your Review</h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold; width:40%;">Registration ID</td><td style="padding:8px; border-bottom:1px solid #eee; font-family:monospace; color:#d4af37; font-weight:bold;">${registration.registration_id}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Name</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.name}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Age</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.age}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Email</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.email}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Phone</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.phone}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Company</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.company_name}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Role</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.role}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Industry</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.industry}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Annual Revenue</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.annual_revenue}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Business Sector</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.business_sector}${registration.other_sector ? ` (${registration.other_sector})` : ""}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Product/Service</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.product_service}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Primary Need</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.primary_need}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee; font-weight:bold;">Primary Goal</td><td style="padding:8px; border-bottom:1px solid #eee;">${registration.primary_goal}</td></tr>
        <tr><td style="padding:8px; font-weight:bold;">About</td><td style="padding:8px;">${registration.about}</td></tr>
      </table>
      <div style="text-align:center; margin:30px 0;">
        <a href="${reviewUrl}" style="background:#d4af37; color:#1a1a2e; padding:14px 30px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:16px;">
          Review Application
        </a>
      </div>
      <p style="color:#888; font-size:12px; text-align:center;">This link expires in 48 hours. Do not share it.</p>
    </div>
  </div>
</body>
</html>`;
}

function buildApplicantApprovalHtml(registration: any, paymentPageUrl: string, paymentLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Application Approved</title></head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
    <div style="background:#1a1a2e; padding:30px; text-align:center;">
      <h1 style="color:#d4af37; margin:0; font-size:24px;">Business &amp; Beyond</h1>
      <p style="color:#888; margin:8px 0 0;">Application Approved</p>
    </div>
    <div style="padding:30px;">
      <h2 style="color:#1a1a2e; margin-top:0;">Congratulations, ${registration.name}!</h2>
      <p>We are delighted to inform you that your application to join <strong>Business &amp; Beyond</strong> has been <strong style="color:#22c55e;">approved</strong>.</p>
      <p>To confirm your seat for <strong>16 August 2026</strong>, please complete your payment at the earliest.</p>
      <p><strong>Registration ID:</strong> ${registration.registration_id}</p>
      <div style="text-align:center; margin:30px 0;">
        <a href="${paymentPageUrl}" style="background:#d4af37; color:#1a1a2e; padding:14px 30px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:16px;">
          Complete Payment
        </a>
      </div>
      <p style="color:#888; font-size:13px;">You can also pay directly via: <a href="${paymentLink}">${paymentLink}</a></p>
      <p style="color:#888; font-size:12px; margin-top:30px;">For any queries, reply to this email or contact us at businessandbeyondindia@gmail.com</p>
    </div>
  </div>
</body>
</html>`;
}

function buildApplicantRejectionHtml(registration: any): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Application Status</title></head>
<body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; overflow:hidden;">
    <div style="background:#1a1a2e; padding:30px; text-align:center;">
      <h1 style="color:#d4af37; margin:0; font-size:24px;">Business &amp; Beyond</h1>
      <p style="color:#888; margin:8px 0 0;">Application Update</p>
    </div>
    <div style="padding:30px;">
      <h2 style="color:#1a1a2e; margin-top:0;">Dear ${registration.name},</h2>
      <p>Thank you for your interest in joining <strong>Business &amp; Beyond</strong> and for taking the time to apply.</p>
      <p>After careful consideration, we regret to inform you that we are unable to move forward with your application at this time. Our community is curated to ensure the best possible experience for all members, and we carefully evaluate every application against our current cohort requirements.</p>
      <p>We appreciate your enthusiasm and encourage you to stay connected with us for future opportunities.</p>
      <p style="color:#888; font-size:12px; margin-top:30px;">For any queries, contact us at businessandbeyondindia@gmail.com</p>
    </div>
  </div>
</body>
</html>`;
}
