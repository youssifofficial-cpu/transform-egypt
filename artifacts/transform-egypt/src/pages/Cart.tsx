import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Cart() {
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
        <ShoppingBag size={64} color="#D4AF37" style={{ marginBottom: "1.5rem" }} />
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#fff", marginBottom: "1rem" }}>Your Cart</h1>
        <p style={{ color: "#B9ADA1", marginBottom: "2rem" }}>Your cart is empty.</p>
        <Link to="/boutique" style={{ background: "#D4AF37", color: "#000", padding: "0.875rem 2rem", textDecoration: "none", fontWeight: 700, borderRadius: 2 }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
