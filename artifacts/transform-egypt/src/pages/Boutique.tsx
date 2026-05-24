import React from "react";
import { ShoppingBag } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Argan Oil Hair Serum", price: "EGP 450", category: "Hair Care", emoji: "💆" },
  { id: 2, name: "Lash Growth Serum", price: "EGP 350", category: "Lash", emoji: "👁" },
  { id: 3, name: "Brow Tinting Kit", price: "EGP 280", category: "Brows", emoji: "🎨" },
  { id: 4, name: "Hydrating Face Mask", price: "EGP 220", category: "Skin", emoji: "✨" },
  { id: 5, name: "Nail Extension Kit", price: "EGP 380", category: "Nails", emoji: "💅" },
  { id: 6, name: "Keratin Treatment", price: "EGP 650", category: "Hair Care", emoji: "💆" },
];

export default function Boutique() {
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh" }}>
      <div style={{ padding: "4rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Online Store</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#fff", fontWeight: 700 }}>Beauty Boutique</h1>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{ background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ background: "#111", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>{p.emoji}</div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{p.category}</div>
                <h3 style={{ color: "#fff", fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "1rem" }}>{p.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#D4AF37", fontWeight: 700 }}>{p.price}</span>
                  <button style={{ background: "#D4AF37", color: "#000", border: "none", padding: "0.5rem 1rem", borderRadius: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: "0.8125rem" }}>
                    <ShoppingBag size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
