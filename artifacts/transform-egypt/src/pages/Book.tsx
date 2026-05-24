import React, { useState } from "react";
import { BRANCHES } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export default function Book() {
  const { lang } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh" }}>
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Appointments</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", fontWeight: 700 }}>Book Your Visit</h1>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "3rem", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 2 }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "var(--font-serif)", color: "#D4AF37", fontSize: "1.75rem", marginBottom: "1rem" }}>Booking Received!</h2>
            <p style={{ color: "#B9ADA1" }}>We'll confirm your appointment via WhatsApp shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { name: "phone", label: "Phone Number", type: "tel", placeholder: "01xxxxxxxxx" },
              { name: "email", label: "Email (optional)", type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <div key={f.name}>
                <label style={{ display: "block", color: "#D4AF37", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} required={f.name !== "email"} style={{ width: "100%", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.2)", color: "#fff", padding: "0.875rem 1rem", borderRadius: 2, outline: "none", fontSize: "1rem" }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", color: "#D4AF37", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Branch</label>
              <select style={{ width: "100%", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.2)", color: "#fff", padding: "0.875rem 1rem", borderRadius: 2, outline: "none", fontSize: "1rem" }}>
                {BRANCHES.map((b) => <option key={b.name} value={b.name}>{lang === "ar" ? b.nameAr : b.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#D4AF37", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Preferred Date</label>
              <input type="date" required style={{ width: "100%", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.2)", color: "#fff", padding: "0.875rem 1rem", borderRadius: 2, outline: "none", fontSize: "1rem" }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#D4AF37", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Service</label>
              <textarea placeholder="Which service are you interested in?" rows={3} style={{ width: "100%", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.2)", color: "#fff", padding: "0.875rem 1rem", borderRadius: 2, outline: "none", fontSize: "1rem", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ background: "linear-gradient(135deg, #D4AF37, #9A7B1A)", color: "#000", padding: "1rem", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em", border: "none", borderRadius: 2, cursor: "pointer" }}>
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
