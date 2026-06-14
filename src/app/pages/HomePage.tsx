import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Heart, Shield, Brain, Sparkles, HelpCircle, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { GrowingTree } from "../components/GrowingTree";
import { BranchLogo } from "../components/BranchLogo";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

const CARE_ICONS = [
  { icon: <Heart size={18} />, color: "#6FAF9B" },
  { icon: <Shield size={18} />, color: "#A7C7E7" },
  { icon: <Brain size={18} />, color: "#B9A7E6" },
  { icon: <Sparkles size={18} />, color: "#2F6F6D" },
  { icon: <HelpCircle size={18} />, color: "#8CA9A3" },
];

const HOW_STEPS = ["01", "02", "03"];

export function HomePage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const T = t[lang].home;
  const [treeBloomed, setTreeBloomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTreeBloomed(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const btnPrimary: React.CSSProperties = {
    background: "var(--primary)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95rem",
    borderRadius: "0.75rem",
    padding: "0.75rem 1.5rem",
    boxShadow: "0 2px 10px rgba(47,111,109,0.22)",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "opacity 0.15s",
  };

  const btnSecondary: React.CSSProperties = {
    background: "var(--secondary)",
    color: "var(--primary)",
    border: "1px solid var(--border)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    borderRadius: "0.75rem",
    padding: "0.75rem 1.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "opacity 0.15s",
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "3rem 1.25rem 2.5rem", background: "var(--background)" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ maxWidth: 1100, margin: "0 auto", gap: "3rem", alignItems: "center" }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6"
              style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              <BranchLogo size={14} /> {T.badge}
            </div>
            <h1
              style={{
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: 1.15,
                color: "var(--foreground)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {T.h1.split('\n')[0]}<br />{T.h1.split('\n')[1]}
            </h1>
            <p
              style={{
                color: "var(--muted-foreground)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
                maxWidth: 420,
              }}
            >
              {T.subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                style={btnPrimary}
                onClick={() => navigate("/find-care")}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {T.findCareBtn} <ArrowRight size={16} />
              </button>
              <button
                style={btnSecondary}
                onClick={() => navigate("/resources")}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {T.resourcesBtn}
              </button>
            </div>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", marginTop: "1rem" }}>
              {T.disclaimer}
            </p>
          </div>

          {/* Auto-blooming tree — hidden on small screens */}
          <div className="hidden md:flex" style={{ flexDirection: "column", alignItems: "center" }}>
            <GrowingTree key={treeBloomed ? "bloom" : "rest"} phase={treeBloomed ? 4 : 1} />
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginTop: "0.4rem", textAlign: "center" }}>
              {T.treeCaption}
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: "var(--primary)", padding: "2.5rem 1.5rem 1.75rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "1.25rem" }}>
            <div className="text-center">
              <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#fff", marginBottom: "0.35rem" }}>{T.stat1Value}</div>
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.82rem", lineHeight: 1.55 }}>
                {T.stat1Label}<sup style={{ fontSize: "0.6rem", opacity: 0.8 }}>1</sup>
              </div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#fff", marginBottom: "0.35rem" }}>{T.stat2Value}</div>
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.82rem", lineHeight: 1.55 }}>
                {T.stat2Label}<sup style={{ fontSize: "0.6rem", opacity: 0.8 }}>2</sup>
              </div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "#fff", marginBottom: "0.35rem" }}>{T.stat3Value}</div>
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.82rem", lineHeight: 1.55 }}>
                {T.stat3Label}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "0.9rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem" }}>
              <sup>1</sup>{" "}
              <a href="https://www.americanprogress.org/article/discrimination-prevents-lgbtq-people-accessing-health-care/" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>
                {T.source1}
              </a>
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem" }}>
              <sup>2</sup>{" "}
              <a href="https://transequality.org/sites/default/files/docs/usts/USTS-Full-Report-Dec17.pdf" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "underline" }}>
                {T.source2}
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Care categories */}
      <section style={{ padding: "3.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 540, marginBottom: "2.5rem" }}>
            <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>
              {T.careTitle}
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              {T.careSubtitle}
            </p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))" }}>
            {T.careTiles.map((tile, idx) => {
              const { icon, color } = CARE_ICONS[idx];
              return (
                <button
                  key={tile.label}
                  onClick={() => navigate("/find-care")}
                  className="rounded-xl p-5 text-left transition-all duration-200"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = color;
                    el.style.boxShadow = `0 4px 16px ${color}28`;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${color}18`, color: color }}
                  >
                    {icon}
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.3rem", fontSize: "0.9rem" }}>{tile.label}</div>
                  <div style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", lineHeight: 1.55 }}>{tile.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "3.5rem 1.25rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 540, marginBottom: "2.5rem" }}>
            <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>
              {T.howTitle}
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              {T.howSubtitle}
            </p>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {T.steps.map((item, idx) => (
              <div key={HOW_STEPS[idx]} className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                  Step {HOW_STEPS[idx]}
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem", fontSize: "1rem" }}>{item.title}</h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: "3.5rem 1.25rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1100, margin: "0 auto", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>
              {T.featuresTitle}
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {T.featuresSubtitle}
            </p>
            <div className="flex flex-col gap-3">
              {T.features.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.15rem" }} />
                  <span style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                {T.scriptLabel}
              </p>
              <p style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.8, fontStyle: "italic" }}>
                {T.scriptText}
              </p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginTop: "0.75rem" }}>
                {T.scriptCaption}
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                {T.rightsLabel}
              </p>
              <p style={{ color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {T.rightsText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--primary)", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.9rem", color: "#fff", marginBottom: "0.75rem", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
            {T.ctaTitle}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "2rem", lineHeight: 1.75, fontSize: "0.95rem" }}>
            {T.ctaSubtitle}
          </p>
          <button
            onClick={() => navigate("/find-care")}
            style={{
              background: "#fff",
              color: "var(--primary)",
              border: "none",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: "1rem",
              borderRadius: "0.75rem",
              padding: "0.9rem 2rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {T.ctaBtn}
          </button>
        </div>
      </section>

      {/* Crisis strip */}
      <section style={{ background: "#1F2933", padding: "1rem 1.5rem", textAlign: "center" }}>
        <Phone size={13} style={{ color: "#6FAF9B", display: "inline", marginRight: "0.4rem", verticalAlign: "middle" }} />
        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}>
          {T.crisisStrip}{" "}
          <a href="tel:988" style={{ color: "#6FAF9B", fontWeight: 700 }}>988</a>
          {" · "}Trevor Project{" "}
          <a href="tel:18664887386" style={{ color: "#6FAF9B", fontWeight: 700 }}>1-866-488-7386</a>
          {" · "}Text HOME to{" "}
          <span style={{ color: "#6FAF9B", fontWeight: 700 }}>741741</span>
        </span>
      </section>
    </div>
  );
}
