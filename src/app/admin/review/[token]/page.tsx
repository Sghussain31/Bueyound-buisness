"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function AdminReviewPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<any>(null);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [result, setResult] = useState<{ action: string; message: string } | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/admin/review-details?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setRegistration(data.registration);
        else setError(data.error || "Failed to load registration.");
        setLoading(false);
      })
      .catch(() => { setError("Network error. Please try again."); setLoading(false); });
  }, [token]);

  async function handleAction(action: "approve" | "reject") {
    if (!confirm(`Are you sure you want to ${action} this application?`)) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ action: data.action, message: data.message });
      } else {
        setError(data.error || "Action failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setActionLoading(false);
  }

  if (loading) return (
    <main className="min-h-screen bg-[#020B24] flex items-center justify-center p-4">
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 text-center">
        <p className="text-[#D6A63A] text-xs uppercase tracking-[0.20em] font-semibold">Loading Application Details...</p>
      </div>
    </main>
  );

  if (result) return (
    <main className="min-h-screen bg-[#020B24] flex items-center justify-center p-4">
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-[#020B24] border border-[#D6A63A] rounded-full flex items-center justify-center mx-auto mb-6 text-[#D6A63A]">
          {result.action === "approved" ? <CheckCircle2 size={32} /> : <XCircle size={32} className="text-red-400" />}
        </div>
        <h1 className="text-2xl font-editorial text-[#F4F0E6] mb-3">
          Application {result.action === "approved" ? "Approved" : "Rejected"}
        </h1>
        <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-6">{result.message}</p>
        <p className="text-[#AAB3C3]/50 text-xs">This single-use review link has now been invalidated.</p>
      </div>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-[#020B24] flex items-center justify-center p-4">
      <div className="bg-[#06142F] border border-red-500/30 rounded-[2px] p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-14 h-14 bg-[#020B24] border border-red-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-2xl font-editorial text-[#F4F0E6] mb-3">Review Link Error</h1>
        <p className="text-[#AAB3C3] text-sm font-light leading-relaxed mb-4">{error}</p>
        <p className="text-[#AAB3C3]/50 text-xs">This link may have already been used or has expired.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#020B24] py-12 px-4 flex items-center justify-center text-[#F4F0E6]">
      <div className="bg-[#06142F] border border-[rgba(214,166,58,0.25)] rounded-[2px] max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-[rgba(255,255,255,0.08)] bg-[#010719]">
          <p className="text-[#D6A63A] text-xs font-semibold uppercase tracking-[0.20em] mb-1">
            BUSINESS &amp; BEYOND — ADMIN REVIEW
          </p>
          <h1 className="text-2xl sm:text-3xl font-editorial text-[#F4F0E6]">
            Application Review
          </h1>
          <p className="text-[#AAB3C3] text-xs mt-1 font-mono">
            Registration ID: <strong className="text-[#D6A63A]">{registration.registration_id}</strong>
          </p>
        </div>

        {/* Details */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.name}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Age</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.age}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.email}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Phone</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Gender</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.gender}</p>
            </div>
            {registration.linkedin && (
              <div>
                <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">LinkedIn</p>
                <p className="text-sm truncate">
                  <a href={registration.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#D6A63A] underline">
                    {registration.linkedin}
                  </a>
                </p>
              </div>
            )}
          </div>

          <hr className="border-[rgba(255,255,255,0.08)]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Company</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.company_name}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Role</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Industry</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.industry}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Annual Revenue</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.annual_revenue}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Business Sector</p>
            <p className="text-sm font-medium text-[#F4F0E6]">{registration.business_sector}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Product / Service</p>
            <p className="text-sm font-light text-[#AAB3C3] leading-relaxed">{registration.product_service}</p>
          </div>

          <hr className="border-[rgba(255,255,255,0.08)]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Primary Need</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.primary_need}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">Primary Goal</p>
              <p className="text-sm font-medium text-[#F4F0E6]">{registration.primary_goal}</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-[#D6A63A] uppercase tracking-wider mb-1">About</p>
            <p className="text-sm font-light text-[#AAB3C3] leading-relaxed">{registration.about}</p>
          </div>

          <div className="bg-[#020B24] border border-[rgba(214,166,58,0.20)] rounded-[2px] p-4 text-xs text-[#AAB3C3] font-light">
            ⚠️ This decision is <strong>permanent</strong>. Approving dispatches a payment link directly to the applicant. Rejecting sends a polite decline email.
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => handleAction("approve")}
              disabled={actionLoading}
              className="bb-btn-primary flex-1 py-4 text-xs disabled:opacity-50"
            >
              {actionLoading ? "PROCESSING..." : "✓ APPROVE APPLICATION"}
            </button>
            <button
              onClick={() => handleAction("reject")}
              disabled={actionLoading}
              className="border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors uppercase font-semibold text-xs tracking-[0.15em] flex-1 py-4 rounded-[2px] disabled:opacity-50"
            >
              ✗ REJECT APPLICATION
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
