import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { SERVICES, BRANCHES, SOCIAL, WHATSAPP_URL } from "@/lib/utils";

function Hero() {
  const { t } = useI18n();
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000 0%, #0f0f0f 40%, #1a1200 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold accent lines */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)", backgroundSize: "30px 30px" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

      <div style={{ position: "relative", maxWidth: 900, animation: "var(--animate-fade-up)" }}>
        {/* Pre-heading */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: "2rem" }}>
          <div style={{ height: 1, width: 80, background: "linear-gradient(to right, transparent, #D4AF37)" }} />
          <span style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
            Est. Cairo, Egypt
          </span>
          <div style={{ height: 1, width: 80, background: "linear-gradient(to left, transparent, #D4AF37)" }} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ color: "#fff" }}>Where Beauty</span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Meets Precision
          </span>
        </h1>

        <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#E8D48A", fontStyle: "italic", marginBottom: "1rem" }}>
          "A new you, Today!"
        </p>
        <p style={{ color: "#B9ADA1", fontSize: "1rem", letterSpacing: "0.05em", maxWidth: 500, margin: "0 auto 3rem" }}>
          Egypt &amp; the Middle East's #1 Premium Beauty Brand<br />
          <span style={{ color: "#D4AF37" }}>by Mervat Attalla</span>
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/book"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #9A7B1A)",
              color: "#000",
              padding: "0.875rem 2.5rem",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderRadius: 2,
              boxShadow: "0 8px 40px rgba(212,175,55,0.35)",
            }}
          >
            {t("hero.cta")}
          </Link>
          <Link
            to="/services"
            style={{
              border: "1px solid rgba(212,175,55,0.5)",
              color: "#D4AF37",
              padding: "0.875rem 2.5rem",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderRadius: 2,
            }}
          >
            {t("hero.explore")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "10K+", label: "Happy Clients" },
    { value: "4", label: "Luxury Branches" },
    { value: "6+", label: "Beauty Services" },
    { value: "5★", label: "Average Rating" },
  ];
  return (
    <section style={{ background: "#0a0a0a", padding: "4rem 1.5rem", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem", textAlign: "center" }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 700, color: "#D4AF37" }}>{s.value}</div>
            <div style={{ color: "#B9ADA1", fontSize: "0.8125rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { lang } = useI18n();
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#050505" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>What We Offer</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff" }}>
            Our Signature Services
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {SERVICES.map((s) => (
            <div
              key={s.id}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 2,
                padding: "2rem",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "#fff", marginBottom: "0.5rem" }}>
                {lang === "ar" ? s.nameAr : s.name}
              </h3>
              <p style={{ color: "#B9ADA1", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{s.description}</p>
              <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: "1rem" }}>
                {s.prices.map((p) => (
                  <div key={p.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: 4 }}>
                    <span style={{ color: "#B9ADA1" }}>{p.label}</span>
                    <span style={{ color: "#D4AF37", fontWeight: 600 }}>{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/services" style={{ border: "1px solid #D4AF37", color: "#D4AF37", padding: "0.875rem 2.5rem", textDecoration: "none", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2 }}>
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 2, aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#4a4a4a" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📸</div>
            <p style={{ fontSize: "0.8125rem" }}>Mervat Attalla<br />Founder Photo</p>
          </div>
        </div>
        <div>
          <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Founder</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.5rem" }}>Mervat Attalla</h2>
          <p style={{ color: "#B9ADA1", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            With over two decades of expertise in luxury beauty, Mervat Attalla built TransforM Egypt into the region's most trusted premium beauty destination.
          </p>
          <p style={{ color: "#B9ADA1", lineHeight: 1.8, marginBottom: "2rem" }}>
            Her mission: deliver transformative beauty experiences that combine artistry, precision, and the finest techniques — giving every client a new you, today.
          </p>
          <Link to="/book" style={{ display: "inline-block", background: "#D4AF37", color: "#000", padding: "0.75rem 2rem", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.1em", borderRadius: 2 }}>
            Book with Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const { lang } = useI18n();
  return (
    <section style={{ padding: "6rem 1.5rem", background: "#000" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1rem" }}>Where to Find Us</div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff" }}>
            4 Luxury Branches
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {BRANCHES.map((b) => (
            <a
              key={b.name}
              href={b.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 2, padding: "2rem", textDecoration: "none", textAlign: "center" }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📍</div>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                {lang === "ar" ? b.nameAr : b.name}
              </h3>
              <span style={{ color: "#D4AF37", fontSize: "0.8125rem", letterSpacing: "0.1em" }}>View on Map →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingCTA() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(135deg, #0a0800 0%, #1a1200 50%, #0a0800 100%)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Start Your Transformation
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1.5rem" }}>
          Book Your Appointment
        </h2>
        <p style={{ color: "#B9ADA1", fontSize: "1.125rem", marginBottom: "3rem", lineHeight: 1.6 }}>
          Visit any of our 4 luxury branches in Cairo or reach us directly on WhatsApp.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/book"
            style={{ background: "linear-gradient(135deg, #D4AF37, #9A7B1A)", color: "#000", padding: "1rem 2.5rem", textDecoration: "none", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "0.1em", borderRadius: 2, boxShadow: "0 8px 40px rgba(212,175,55,0.35)" }}
          >
            Book Online
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#25D366", color: "#fff", padding: "1rem 2.5rem", textDecoration: "none", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "0.1em", borderRadius: 2 }}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ServicesGrid />
      <Founder />
      <Locations />
      <BookingCTA />
    </>
  );
}
