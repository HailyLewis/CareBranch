import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { BranchLogo } from "./BranchLogo";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

export function Layout() {
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const T = t[lang];
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  const NAV_LINKS = [
    { to: "/", label: T.nav.home },
    { to: "/find-care", label: T.nav.findCare },
    { to: "/resources", label: T.nav.resources },
    { to: "/volunteer", label: T.nav.volunteer },
    { to: "/about", label: T.nav.about },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #6FAF9B 0%, #2F6F6D 50%, #B9A7E6 100%)" }} />

      {/* Nav */}
      <header
        className="sticky top-0 z-20"
        style={{ background: "rgba(246,250,249,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0.8rem 1.25rem" }}
        >
          {/* Logo */}
          <button
            onClick={() => { navigate("/"); close(); }}
            className="flex items-center gap-2.5"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <BranchLogo size={26} />
            <div>
              <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1rem", letterSpacing: "-0.02em", display: "block", lineHeight: 1.1 }}>
                CareBranch
              </span>
              <span style={{ color: "var(--muted-foreground)", fontSize: "0.62rem", letterSpacing: "0.04em", display: "block" }}>
                Clear pathways to care.
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                style={({ isActive }) => ({
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.85rem",
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  background: isActive ? "var(--secondary)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                })}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/find-care" style={{ textDecoration: "none", marginLeft: "0.25rem" }}>
              {({ isActive }) =>
                !isActive ? (
                  <span
                    className="px-4 py-2 rounded-xl"
                    style={{ background: "var(--primary)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 2px 8px rgba(47,111,109,0.25)" }}
                  >
                    {T.nav.findCareBtn}
                  </span>
                ) : null
              }
            </NavLink>

            {/* Language toggle */}
            <div className="flex items-center gap-0.5 ml-3 rounded-lg overflow-hidden" style={{ border: "1.5px solid var(--border)" }}>
              {(["en", "es"] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "0.3rem 0.6rem",
                    background: lang === l ? "var(--primary)" : "transparent",
                    color: lang === l ? "#fff" : "var(--muted-foreground)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile: Find Care + language + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile language toggle */}
            <div className="flex items-center gap-0 rounded-lg overflow-hidden" style={{ border: "1.5px solid var(--border)" }}>
              {(["en", "es"] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: lang === l ? "var(--primary)" : "transparent",
                    color: lang === l ? "#fff" : "var(--muted-foreground)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => { navigate("/find-care"); close(); }}
              className="px-3 py-1.5 rounded-lg"
              style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.78rem" }}
            >
              {lang === "es" ? "Atención →" : "Find Care →"}
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", padding: "0.3rem" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", padding: "0.75rem 1.25rem 1rem" }}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={close}
                style={({ isActive }) => ({
                  padding: "0.7rem 0.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "1rem",
                  color: isActive ? "var(--primary)" : "var(--foreground)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border)",
                  display: "block",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--card)", padding: "2.5rem 1.25rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", marginBottom: "2rem" }}>
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <BranchLogo size={22} />
                <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "0.95rem" }}>CareBranch</span>
              </div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.75 }}>
                {T.footer.tagline}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.82rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{T.footer.navigate}</p>
              {NAV_LINKS.map(l => (
                <NavLink key={l.to} to={l.to} style={{ display: "block", color: "var(--muted-foreground)", fontSize: "0.82rem", textDecoration: "none", marginBottom: "0.45rem" }}>
                  {l.label}
                </NavLink>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.82rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{T.footer.crisis}</p>
              {T.footer.crisisLines.map(r => (
                <div key={r.label} style={{ marginBottom: "0.4rem" }}>
                  <span style={{ color: "var(--foreground)", fontSize: "0.79rem", fontWeight: 600 }}>{r.label}: </span>
                  <span style={{ color: "var(--muted-foreground)", fontSize: "0.79rem" }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.82rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{T.footer.disclaimer}</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.79rem", lineHeight: 1.75 }}>
                {T.footer.disclaimerText}
              </p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{T.footer.copy}</p>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{T.footer.built}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
