import React from "react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { lang } = useI18n();
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh" }}>
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Full Menu</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", fontWeight: 700 }}>Our Services</h1>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {SERVICES.map((s, i) => (
          <div key={s.id} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: "4rem", marginBottom: "6rem", alignItems: "center" }}>
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#fff", marginBottom: "1rem" }}>
                {lang === "ar" ? s.nameAr : s.name}
              </h2>
              <p style={{ color: "#B9ADA1", lineHeight: 1.8, marginBottom: "2rem" }}>{s.description}</p>
              <div style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: "1.5rem" }}>
                {s.prices.map((p) => (
                  <div key={p.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color: "#B9ADA1" }}>{p.label}</span>
                    <span style={{ color: "#D4AF37", fontWeight: 600 }}>{p.price}</span>
                  </div>
                ))}
              </div>
              <Link to="/book" style={{ display: "inline-block", marginTop: "1.5rem", background: "#D4AF37", color: "#000", padding: "0.75rem 2rem", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", borderRadius: 2 }}>
                Book Now
              </Link>
            </div>
            <div style={{ order: i % 2 === 0 ? 1 : 0, background: "#111", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 2, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "#4a4a4a" }}>
                <div style={{ fontSize: "4rem" }}>{s.icon}</div>
                <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem" }}>Service Photo</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
