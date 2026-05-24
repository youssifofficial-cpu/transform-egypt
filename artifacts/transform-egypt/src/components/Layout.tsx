import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_URL, SOCIAL, BRANCHES, PHONE_1, PHONE_2 } from "@/lib/utils";

function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/transformations", label: t("nav.transformations") },
    { to: "/boutique", label: t("nav.boutique") },
    { to: "/reviews", label: t("nav.reviews") },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, backdrop-filter 0.3s",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.1em" }}>
              TransforM
            </span>
            <span style={{ fontSize: "0.75rem", color: "#B9ADA1", marginLeft: 4, letterSpacing: "0.3em" }}>EGYPT</span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  textDecoration: "none",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: location.pathname === l.to ? "#D4AF37" : "#ffffff",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              style={{ background: "none", border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", padding: "0.25rem 0.75rem", borderRadius: 2, cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              {t("nav.lang")}
            </button>
            <Link
              to="/book"
              style={{ background: "#D4AF37", color: "#000", padding: "0.5rem 1.25rem", borderRadius: 2, textDecoration: "none", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              {t("nav.book")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: "#0a0a0a", borderTop: "1px solid rgba(212,175,55,0.2)", padding: "1.5rem" }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ display: "block", color: "#fff", textDecoration: "none", padding: "0.75rem 0", fontSize: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            style={{ display: "block", marginTop: "1rem", background: "#D4AF37", color: "#000", textAlign: "center", padding: "0.75rem", textDecoration: "none", fontWeight: 600, borderRadius: 2 }}
          >
            {t("nav.book")}
          </Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(212,175,55,0.15)", padding: "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "#D4AF37", marginBottom: "1rem", fontWeight: 700 }}>
              TransforM
            </div>
            <p style={{ color: "#B9ADA1", fontSize: "0.875rem", lineHeight: 1.7 }}>{t("footer.tagline")}</p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
              {Object.entries(SOCIAL).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                   style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("footer.locations")}
            </h4>
            {BRANCHES.map((b) => (
              <a key={b.name} href={b.mapUrl} target="_blank" rel="noopener noreferrer"
                 style={{ display: "block", color: "#B9ADA1", fontSize: "0.875rem", marginBottom: "0.5rem", textDecoration: "none" }}>
                {lang === "ar" ? b.nameAr : b.name}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
              {t("footer.contact")}
            </h4>
            <a href={`tel:+2${PHONE_1}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#B9ADA1", fontSize: "0.875rem", marginBottom: "0.5rem", textDecoration: "none" }}>
              <Phone size={14} /> {PHONE_1}
            </a>
            <a href={`tel:+2${PHONE_2}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#B9ADA1", fontSize: "0.875rem", textDecoration: "none" }}>
              <Phone size={14} /> {PHONE_2}
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "#4a4a4a", fontSize: "0.8125rem" }}>
            © {year} TransforM Egypt. {t("footer.rights")}
          </p>
          <p style={{ color: "#4a4a4a", fontSize: "0.8125rem" }}>
            Founded by Mervat Attalla
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t("whatsapp.label")}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 40,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        textDecoration: "none",
        animation: "var(--animate-pulse-gold)",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
