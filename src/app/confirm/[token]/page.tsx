"use client";

export default function ConfirmTokenPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: "500px", color: "#fff" }}>
        <div style={{ fontSize: "50px", marginBottom: "20px" }}>ℹ️</div>
        <h1 style={{ color: "#d4af37", fontSize: "22px" }}>Link No Longer Valid</h1>
        <p style={{ color: "#aaa", lineHeight: "1.6" }}>
          Email confirmation links are no longer used. Your application is reviewed directly by our team, and you will be contacted via email with a decision.
        </p>
      </div>
    </main>
  );
}
