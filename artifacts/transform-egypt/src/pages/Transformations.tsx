import React from "react";

const ITEMS = [
  { label: "Hair Extensions Before & After", emoji: "✨", category: "Hair" },
  { label: "Lash Transformation", emoji: "👁", category: "Lash" },
  { label: "Brow Microblading", emoji: "🎨", category: "Brows" },
  { label: "Skincare Glow Up", emoji: "💆", category: "Skin" },
  { label: "Nail Art Portfolio", emoji: "💅", category: "Nails" },
  { label: "Wig Styling", emoji: "👑", category: "Wigs" },
];

export default function Transformations() {
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh" }}>
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Gallery</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", fontWeight: 700 }}>Transformations</h1>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {ITEMS.map((item, i) => (
          <div key={i} style={{ background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ background: "#111", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", position: "relative" }}>
              {item.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)", display: "flex", alignItems: "flex-end", padding: "1rem" }}>
                <span style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.2em" }}>{item.category}</span>
              </div>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <p style={{ color: "#B9ADA1", fontSize: "0.875rem" }}>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
