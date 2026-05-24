import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ paddingTop: 72, background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "8rem", color: "#D4AF37", lineHeight: 1, marginBottom: "1rem" }}>404</div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "#fff", marginBottom: "1rem" }}>Page Not Found</h1>
        <p style={{ color: "#B9ADA1", marginBottom: "2rem" }}>The page you're looking for doesn't exist.</p>
        <Link to="/" style={{ background: "#D4AF37", color: "#000", padding: "0.875rem 2rem", textDecoration: "none", fontWeight: 700, borderRadius: 2 }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
