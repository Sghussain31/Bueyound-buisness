"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowRight } from "lucide-react";

function PaymentContent() {
  const searchParams = useSearchParams();
  const regId = searchParams.get("reg_id");

  const [status, setStatus] = useState<"loading" | "approved" | "pending" | "paid" | "rejected" | "not_found">("loading");
  const [registration, setRegistration] = useState<any>(null);

  const paymentLink = process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK || "#";

  useEffect(() => {
    if (!regId) { setStatus("not_found"); return; }
    fetch(`/api/registration-status?reg_id=${encodeURIComponent(regId)}`)
      .then(r => r.json())
      .then(data => {
        if (!data.success) { setStatus("not_found"); return; }
        setRegistration(data.registration);
        const s = data.registration.approval_status;
        const p = data.registration.payment_status;
        if (p === "PAID") setStatus("paid");
        else if (s === "APPROVED") setStatus("approved");
        else if (s === "REJECTED") setStatus("rejected");
        else setStatus("pending");
      })
      .catch(() => setStatus("not_found"));
  }, [regId]);

  if (status === "loading") {
    return (
      <div className="text-[#D6A63A] text-sm uppercase tracking-[0.20em] font-semibold text-center">
        Verifying Application Status...
      </div>
    );
  }

  if (status === "not_found") {
    return (
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-14 h-14 bg-[#020B24] border border-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center mx-auto mb-6 text-[#AAB3C3]">
          <AlertCircle size={28} />
        </div>
        <h1 className="text-2xl font-editorial text-[#F4F0E6] mb-3">Registration Not Found</h1>
        <p className="text-[#AAB3C3] text-sm font-light mb-6">
          The registration ID provided could not be matched. Please check your details or re-submit.
        </p>
        <Link href="/community/join" className="bb-btn-primary text-xs w-full py-3">
          ← BACK TO REGISTRATION
        </Link>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 md:p-12 text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-[#020B24] border border-[#D6A63A] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D6A63A]">
          <CheckCircle2 size={32} />
        </div>
        <span className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-2 block">
          MEMBERSHIP CONFIRMED
        </span>
        <h1 className="text-3xl font-editorial text-[#F4F0E6] mb-3">Welcome to Business &amp; Beyond</h1>
        <p className="text-[#AAB3C3] text-sm font-light mb-6 leading-relaxed">
          Your payment has been confirmed and your seat is officially reserved for <strong className="text-[#D6A63A] font-normal">16 August 2026</strong>.
        </p>

        <div className="bg-[#020B24] border border-[rgba(214,166,58,0.30)] rounded-[2px] p-6 mb-6">
          <p className="text-[#D6A63A] text-xs font-semibold uppercase tracking-[0.20em] mb-1">REGISTRATION ID</p>
          <p className="text-xl font-mono font-bold text-[#F4F0E6]">{registration?.registration_id}</p>
        </div>

        <p className="text-[#AAB3C3]/60 text-xs font-light">
          A confirmation receipt has been dispatched to <strong>{registration?.email}</strong>.
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="bg-[#06142F] border border-[rgba(239,68,68,0.30)] rounded-[2px] p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-14 h-14 bg-[#020B24] border border-red-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
          <XCircle size={28} />
        </div>
        <h1 className="text-2xl font-editorial text-[#F4F0E6] mb-3">Application Not Approved</h1>
        <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-6">
          Unfortunately, your application was not selected for this cohort cycle. We encourage you to re-apply for future events.
        </p>
        <p className="text-[#AAB3C3]/60 text-xs">
          Contact: businessandbeyond.bni@gmail.com
        </p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 md:p-12 text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-[#020B24] border border-[rgba(214,166,58,0.40)] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D6A63A]">
          <Clock size={30} />
        </div>
        <span className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-2 block">
          REVIEW IN PROGRESS
        </span>
        <h1 className="text-3xl font-editorial text-[#F4F0E6] mb-3">Application Under Review</h1>
        <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-6">
          Your application has been submitted and is currently being evaluated by our selection committee. You will receive an email update once a decision is finalized.
        </p>
        <div className="bg-[#020B24] border border-[rgba(255,255,255,0.08)] rounded-[2px] p-4">
          <p className="text-[#AAB3C3] text-xs font-light">
            Registration ID: <strong className="text-[#D6A63A] font-semibold">{regId}</strong>
          </p>
        </div>
      </div>
    );
  }

  // APPROVED STATUS — Show Payment CTA
  return (
    <div className="bg-[#06142F] border border-[rgba(214,166,58,0.35)] rounded-[2px] p-8 md:p-12 text-center max-w-lg w-full">
      <div className="w-16 h-16 bg-[#020B24] border border-[#D6A63A] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D6A63A]">
        <CheckCircle2 size={32} />
      </div>

      <span className="text-xs font-semibold text-[#D6A63A] tracking-[0.20em] uppercase mb-2 block">
        APPLICATION APPROVED
      </span>
      <h1 className="text-3xl font-editorial text-[#F4F0E6] mb-3">
        You&apos;re Approved
      </h1>

      <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-2">
        Congratulations, <strong className="text-[#F4F0E6] font-medium">{registration?.name}</strong>! Your Business &amp; Beyond registration has been approved.
      </p>
      <p className="text-[#AAB3C3] text-sm font-light mb-8">
        Complete your payment to finalize your seat reservation for <strong className="text-[#D6A63A]">16 August 2026</strong>.
      </p>

      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bb-btn-primary w-full py-4 text-xs tracking-[0.20em] mb-6 flex items-center justify-center gap-2"
      >
        PROCEED TO PAYMENT <ArrowRight size={14} />
      </a>

      <div className="bg-[#020B24] border border-[rgba(214,166,58,0.20)] rounded-[2px] p-4">
        <p className="text-[#AAB3C3] text-xs font-light">
          Registration ID: <strong className="text-[#D6A63A] font-semibold">{registration?.registration_id}</strong>
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#020B24] flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-[#D6A63A] text-xs font-semibold uppercase tracking-[0.20em]">Loading...</div>
      }>
        <PaymentContent />
      </Suspense>
    </main>
  );
}
