import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, MapPin, Phone, Monitor, CheckCircle, ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

const HELP_TYPES_BASE = [
  { id: "figure-out", accent: "#6FAF9B" },
  { id: "schedule", accent: "#2F6F6D" },
  { id: "insurance", accent: "#B9A7E6" },
  { id: "transport", accent: "#A7C7E7" },
  { id: "accompany", accent: "#6FAF9B" },
  { id: "overwhelmed", accent: "#8CA9A3" },
];

const CONTACT_PREFS_BASE = [
  { id: "email" },
  { id: "phone" },
  { id: "text" },
  { id: "virtual" },
];

type SubmitState = "idle" | "submitting" | "submitted" | "error";

const FORMSPREE_URL = "https://formspree.io/f/xkoakndl";

export function ConnectPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const T = t[lang].connect;

  const [helpTypes, setHelpTypes] = useState<string[]>([]);
  const [contactPref, setContactPref] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [name, setName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const toggleHelp = (id: string) => {
    setHelpTypes(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]);
  };

  const canSubmit = helpTypes.length > 0 && contactPref && contactInfo.trim().length > 0 && submitState !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitState("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "Not provided",
          "help-needed": helpTypes.join(", "),
          "contact-preference": contactPref,
          "contact-info": contactInfo,
          "additional-info": additionalInfo || "None",
        }),
      });
      if (res.ok) {
        setSubmitState("submitted");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  const getContactInfoLabel = () => {
    if (contactPref === "email") return T.contactInfoLbl.email;
    if (contactPref === "phone" || contactPref === "text") return T.contactInfoLbl.phone;
    if (contactPref === "virtual") return T.contactInfoLbl.virtual;
    return T.contactInfoLbl.default;
  };

  const getContactPlaceholder = () => {
    if (contactPref === "email") return T.contactPlaceholder.email;
    if (contactPref === "phone" || contactPref === "text") return T.contactPlaceholder.phone;
    return T.contactPlaceholder.default;
  };

  if (submitState === "submitted") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#6FAF9B20" }}>
            <CheckCircle size={32} style={{ color: "#6FAF9B" }} />
          </div>
          <h1 style={{ fontWeight: 800, color: "var(--foreground)", fontSize: "1.6rem", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
            {T.successTitle}
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.75rem" }}>
            {T.successText1}{name ? `, ${name}` : ""}. {T.successText2}
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            {T.successCrisis}{" "}
            <a href="tel:988" style={{ color: "var(--primary)", fontWeight: 600 }}>988 Lifeline</a> or the{" "}
            <a href="tel:18664887386" style={{ color: "var(--primary)", fontWeight: 600 }}>Trevor Project (1-866-488-7386)</a>.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/find-care")}
              className="px-5 py-2.5 rounded-xl"
              style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}
            >
              {T.backToFindCare}
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-xl"
              style={{ background: "var(--secondary)", color: "var(--primary)", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
            >
              {T.goHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--primary)", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontWeight: 800, color: "#fff", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", marginBottom: "0.75rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            {T.heroTitle}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
            {T.heroSubtitle}
          </p>
        </div>
      </section>

      {/* What volunteers can help with */}
      <section style={{ padding: "3rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "1rem", letterSpacing: "-0.015em" }}>
            {T.whatTitle}
          </h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {[
              { icon: <Heart size={16} />, color: "#6FAF9B" },
              { icon: <Phone size={16} />, color: "#2F6F6D" },
              { icon: <MapPin size={16} />, color: "#A7C7E7" },
              { icon: <Monitor size={16} />, color: "#B9A7E6" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl p-4 flex items-start gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <p style={{ color: "var(--foreground)", fontSize: "0.85rem", lineHeight: 1.6 }}>{T.whatItems[idx]}</p>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", marginTop: "1rem", lineHeight: 1.65 }}>
            {T.volunteerNote}
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 mb-6"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "0.85rem", fontWeight: 600, padding: 0 }}
          >
            <ArrowLeft size={14} /> {T.back}
          </button>

          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.5rem", letterSpacing: "-0.015em" }}>
            {T.formTitle}
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "2rem" }}>
            {T.formSubtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {T.nameLbl} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>{T.nameOptional}</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={T.namePlaceholder}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
                  border: "1.5px solid var(--border)", background: "var(--card)",
                  color: "var(--foreground)", fontSize: "0.9rem", outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Help type */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.6rem" }}>
                {T.helpLbl} <span style={{ color: "#e05" }}>*</span>
                <span style={{ color: "var(--muted-foreground)", fontWeight: 400, marginLeft: "0.4rem" }}>{T.helpSelectAll}</span>
              </label>
              <div className="flex flex-col gap-2.5">
                {HELP_TYPES_BASE.map((h, idx) => {
                  const selected = helpTypes.includes(h.id);
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => toggleHelp(h.id)}
                      className="w-full text-left rounded-xl px-4 py-3.5 transition-all duration-150"
                      style={{
                        background: selected ? `${h.accent}14` : "var(--card)",
                        border: `2px solid ${selected ? h.accent : "var(--border)"}`,
                        cursor: "pointer",
                        color: "var(--foreground)",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          background: selected ? h.accent : "transparent",
                          border: `2px solid ${selected ? h.accent : "var(--border)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {selected && <CheckCircle size={11} style={{ color: "#fff" }} />}
                      </span>
                      {T.helpTypes[idx].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact preference */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.6rem" }}>
                {T.contactPrefLbl} <span style={{ color: "#e05" }}>*</span>
              </label>
              <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
                {CONTACT_PREFS_BASE.map((p, idx) => {
                  const selected = contactPref === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setContactPref(p.id)}
                      className="rounded-xl px-3 py-3 text-center transition-all duration-150"
                      style={{
                        background: selected ? "#6FAF9B14" : "var(--card)",
                        border: `2px solid ${selected ? "#6FAF9B" : "var(--border)"}`,
                        cursor: "pointer",
                        color: selected ? "var(--primary)" : "var(--foreground)",
                        fontWeight: selected ? 700 : 500,
                        fontSize: "0.875rem",
                      }}
                    >
                      {T.contactPrefs[idx].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {getContactInfoLabel()}{" "}
                <span style={{ color: "#e05" }}>*</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={e => setContactInfo(e.target.value)}
                placeholder={getContactPlaceholder()}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
                  border: "1.5px solid var(--border)", background: "var(--card)",
                  color: "var(--foreground)", fontSize: "0.9rem", outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Additional info */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {T.additionalLbl} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>{T.additionalOptional}</span>
              </label>
              <textarea
                value={additionalInfo}
                onChange={e => setAdditionalInfo(e.target.value)}
                placeholder={T.additionalPlaceholder}
                rows={4}
                style={{
                  width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
                  border: "1.5px solid var(--border)", background: "var(--card)",
                  color: "var(--foreground)", fontSize: "0.9rem", outline: "none",
                  resize: "vertical", lineHeight: 1.6, boxSizing: "border-box",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="rounded-xl p-4" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", lineHeight: 1.7 }}>
                {T.privacyNote}
              </p>
            </div>

            {submitState === "error" && (
              <div className="rounded-xl p-4" style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
                <p style={{ color: "#dc2626", fontSize: "0.85rem", fontWeight: 600 }}>{T.errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-xl py-3.5"
              style={{
                background: canSubmit ? "var(--primary)" : "var(--border)",
                color: canSubmit ? "#fff" : "var(--muted-foreground)",
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                fontWeight: 700,
                fontSize: "1rem",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {submitState === "submitting" ? T.submitting : T.submitBtn}
            </button>
          </form>
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
