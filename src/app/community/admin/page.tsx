"use client";

import { useEffect, useState } from "react";

interface Registration {
  id?: string;
  registration_id: string;
  name: string;
  age?: number;
  email: string;
  phone: string;
  gender: string;
  company_name: string;
  role: string;
  industry: string;
  annual_revenue: string;
  approval_status: string;
  payment_status: string;
  created_at: string;
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/registrations")
      .then(r => r.json())
      .then(data => {
        setRegistrations(data.registrations || []);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load registrations."); setLoading(false); });
  }, []);

  function statusColor(status: string) {
    if (status === "PENDING_APPROVAL") return "#f59e0b";
    if (status === "APPROVED") return "#22c55e";
    if (status === "REJECTED") return "#ef4444";
    if (status === "PAID") return "#22c55e";
    if (status === "PAYMENT_PENDING") return "#3b82f6";
    return "#888";
  }

  const total = registrations.length;
  const pending = registrations.filter(r => r.approval_status === "PENDING_APPROVAL").length;
  const approved = registrations.filter(r => r.approval_status === "APPROVED").length;
  const paid = registrations.filter(r => r.payment_status === "PAID").length;

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a1a", padding: "30px 20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ color: "#d4af37", fontSize: "22px", margin: "0 0 4px" }}>Admin Panel — Registrations</h1>
            <p style={{ color: "#666", fontSize: "13px", margin: 0 }}>Business & Beyond Community · 16 August 2026</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="/api/download-registrations" style={{ background: "#1a1a2e", border: "1px solid #d4af37", color: "#d4af37", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontSize: "13px" }}>
              ↓ Export CSV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Total", value: total, color: "#d4af37" },
            { label: "Pending Review", value: pending, color: "#f59e0b" },
            { label: "Approved", value: approved, color: "#22c55e" },
            { label: "Paid", value: paid, color: "#3b82f6" },
          ].map(stat => (
            <div key={stat.label} style={{ background: "#1a1a2e", border: "1px solid #2a2a4e", borderRadius: "10px", padding: "18px 20px", textAlign: "center" }}>
              <p style={{ color: stat.color, fontSize: "28px", fontWeight: "bold", margin: "0 0 4px" }}>{stat.value}</p>
              <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {loading && <p style={{ color: "#888", textAlign: "center", padding: "40px" }}>Loading registrations...</p>}
        {error && <p style={{ color: "#ef4444", textAlign: "center", padding: "40px" }}>{error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#1a1a2e", borderBottom: "1px solid #2a2a4e" }}>
                  {["Reg ID", "Name", "Age", "Email", "Phone", "Company", "Role", "Approval", "Payment", "Date"].map(h => (
                    <th key={h} style={{ color: "#888", padding: "12px 14px", textAlign: "left", fontWeight: "normal", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 && (
                  <tr><td colSpan={10} style={{ color: "#666", textAlign: "center", padding: "40px" }}>No registrations yet.</td></tr>
                )}
                {registrations.map((reg, i) => (
                  <tr key={reg.registration_id || i} style={{ borderBottom: "1px solid #1a1a2e", background: i % 2 === 0 ? "transparent" : "#0d0d1a" }}>
                    <td style={{ padding: "12px 14px", color: "#d4af37", fontFamily: "monospace" }}>{reg.registration_id}</td>
                    <td style={{ padding: "12px 14px", color: "#fff" }}>{reg.name}</td>
                    <td style={{ padding: "12px 14px", color: "#aaa" }}>{reg.age ?? "-"}</td>
                    <td style={{ padding: "12px 14px", color: "#aaa" }}>{reg.email}</td>
                    <td style={{ padding: "12px 14px", color: "#aaa" }}>{reg.phone}</td>
                    <td style={{ padding: "12px 14px", color: "#aaa" }}>{reg.company_name}</td>
                    <td style={{ padding: "12px 14px", color: "#aaa" }}>{reg.role}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: statusColor(reg.approval_status) + "22", color: statusColor(reg.approval_status), padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>
                        {reg.approval_status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ background: statusColor(reg.payment_status) + "22", color: statusColor(reg.payment_status), padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>
                        {reg.payment_status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#666", whiteSpace: "nowrap" }}>
                      {new Date(reg.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
