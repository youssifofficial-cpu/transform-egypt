import React from "react";

const REVIEWS = [
  { name: "Sarah M.", rating: 5, text: "Absolutely transformed my look! The hair extensions are incredible — so natural and beautiful. Will definitely be back.", service: "Hair Extensions" },
  { name: "Nadia K.", rating: 5, text: "Best lash extensions I've ever had. The team is professional and the results last so long. 10/10!", service: "Lash Extensions" },
  { name: "Hana R.", rating: 5, text: "Mervat's team did an amazing job with my microblading. My brows have never looked this good.", service: "Microblading" },
  { name: "Laila T.", rating: 5, text: "The City Stars branch is luxurious and the staff are so attentive. I felt like royalty!", service: "Skincare" },
  { name: "Yasmine F.", rating: 5, text: "The nail art was exactly what I envisioned. Incredibly talented team!", service: "Nails" },
  { name: "Dina A.", rating: 5, text: "My wig fits perfectly and looks completely natural. So happy with the result!", service: "Wigs" },
];

export default function Reviews() {
  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh" }}>
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>What Clients Say</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", fontWeight: 700 }}>Client Reviews</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
          <span style={{ color: "#D4AF37", fontSize: "2rem" }}>★★★★★</span>
          <span style={{ color: "#B9ADA1" }}>4.9 / 5 — over 10,000 reviews</span>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {REVIEWS.map((r, i) => (
          <div key={i} style={{ background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 2, padding: "2rem" }}>
            <div style={{ color: "#D4AF37", fontSize: "1.25rem", marginBottom: "1rem" }}>{stars(r.rating)}</div>
            <p style={{ color: "#E8E1D8", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>"{r.text}"</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: 600 }}>{r.name}</span>
              <span style={{ color: "#D4AF37", fontSize: "0.8125rem" }}>{r.service}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
