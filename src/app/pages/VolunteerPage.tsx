import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Heart, Phone, Calendar, Users, MessageCircle, ArrowLeft } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

const ROLES_BASE = [
  { icon: <Heart size={20} />, color: "#6FAF9B", commitment: "Flexible" },
  { icon: <Phone size={20} />, color: "#2F6F6D", commitment: "Flexible" },
  { icon: <Users size={20} />, color: "#B9A7E6", commitment: "As available" },
  { icon: <MessageCircle size={20} />, color: "#A7C7E7", commitment: "Flexible" },
  { icon: <Calendar size={20} />, color: "#8CA9A3", commitment: "As available" },
];

const AVAILABILITY_OPTIONS = [
  { id: "weekday-morning", label: "Weekday mornings" },
  { id: "weekday-afternoon", label: "Weekday afternoons" },
  { id: "weekday-evening", label: "Weekday evenings" },
  { id: "weekend", label: "Weekends" },
  { id: "flexible", label: "Flexible / varies" },
];

const ROLES_EN = [
  { title: "Care Navigator", desc: "Walk people through the CareBranch matching process, help them understand their results, and answer questions about local resources." },
  { title: "Appointment Assistant", desc: "Help someone call a clinic for the first time, schedule appointments, or prepare for their first visit with a new provider." },
  { title: "In-Person Support", desc: "Accompany someone to an appointment in Austin as a support person, so they don't have to navigate it alone." },
  { title: "Virtual Support", desc: "Connect via video or phone to help someone set up telehealth, understand their options, or work through next steps from wherever you are." },
  { title: "Transportation Help", desc: "Offer rides to medical appointments for community members in Austin who have limited transportation options." },
];

type SubmitState = "idle" | "submitting" | "submitted" | "error";

const FORMSPREE_URL = "https://formspree.io/f/xwvjapee";

export function VolunteerPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const T = t[lang].volunteer;

  const [roles, setRoles] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const toggleRole = (title: string) =>
    setRoles(prev => prev.includes(title) ? prev.filter(r => r !== title) : [...prev, title]);

  const toggleAvailability = (id: string) =>
    setAvailability(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const canSubmit = roles.length > 0 && name.trim().length > 0 && email.trim().length > 0 && submitState !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitState("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "Not provided",
          "volunteer-roles": roles.join(", "),
          availability: availability.length > 0 ? availability.join(", ") : "Not specified",
          about: about || "Not provided",
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

  if (submitState === "submitted") {
    return (
      <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#6FAF9B20" }}>
            <CheckCircle size={32} style={{ color: "#6FAF9B" }} />
          </div>
          <h1 style={{ fontWeight: 800, color: "var(--foreground)", fontSize: "1.7rem", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
            {T.successTitle}, {name.split(" ")[0]}.
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            {T.successText} <strong style={{ color: "var(--foreground)" }}>{email}</strong> {T.successText2}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-xl"
              style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}
            >
              {T.backHome}
            </button>
            <button
              onClick={() => navigate("/find-care")}
              className="px-5 py-2.5 rounded-xl"
              style={{ background: "var(--secondary)", color: "var(--primary)", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem" }}
            >
              {T.explore}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--primary)", padding: "4.5rem 1.5rem 3.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-5"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            <Heart size={13} /> {T.badge}
          </div>
          <h1 style={{ fontWeight: 800, color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            {T.heroTitle}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            {T.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Why volunteer */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.5rem", letterSpacing: "-0.015em" }}>
            {T.whyTitle}
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem", maxWidth: 640 }}>
            {T.whySubtitle}
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              {
                stat: "1 in 3",
                desc: "LGBTQ+ adults report a negative experience with a healthcare provider related to their sexual orientation or gender identity",
                source: "KFF Health Tracking Poll, 2020",
                sourceUrl: "https://www.kff.org/report-section/kff-the-washington-post-survey-of-lgbtq-adults-experiences-and-perspectives-on-health-care/",
              },
              {
                stat: "48%",
                desc: "of LGBTQ+ adults say they have had to educate their own doctor about LGBTQ+ healthcare needs to receive appropriate care",
                source: "KFF / Washington Post LGBTQ+ Survey, 2023",
                sourceUrl: "https://www.kff.org/other/poll-finding/lgbtq-adults-in-the-us/",
              },
              {
                stat: "Your time",
                desc: "even a few hours can help someone take a step toward care they couldn't take alone",
                source: null,
                sourceUrl: null,
              },
            ].map(s => (
              <div key={s.stat} className="rounded-xl p-5 flex flex-col justify-between" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--primary)", marginBottom: "0.4rem" }}>{s.stat}</div>
                  <div style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
                {s.source && (
                  <a
                    href={s.sourceUrl!}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--muted-foreground)", fontSize: "0.7rem", marginTop: "0.75rem", display: "block", textDecoration: "underline", opacity: 0.7 }}
                  >
                    {s.source}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer roles */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.5rem", letterSpacing: "-0.015em" }}>
            {T.rolesTitle}
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            {T.rolesSubtitle}
          </p>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {ROLES_BASE.map((r, idx) => (
              <div key={ROLES_EN[idx].title} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: `3px solid ${r.color}` }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${r.color}18`, color: r.color }}>
                  {r.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.95rem", marginBottom: "0.4rem" }}>{ROLES_EN[idx].title}</h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>{ROLES_EN[idx].desc}</p>
                <span className="inline-block px-2.5 py-1 rounded-lg" style={{ background: `${r.color}14`, color: r.color, fontSize: "0.73rem", fontWeight: 600 }}>
                  {r.commitment}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            {T.expectTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {T.expectSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--primary)", color: "#fff", fontWeight: 800, fontSize: "0.85rem" }}>
                  {idx + 1}
                </div>
                <div className="rounded-xl p-4 flex-1" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{step.title}</p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up form */}
      <section style={{ padding: "4rem 1.5rem" }}>
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
                {T.nameLbl} <span style={{ color: "#e05" }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First and last name"
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {T.emailLbl} <span style={{ color: "#e05" }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {T.phoneLbl} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>{T.phoneOptional}</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(512) 000-0000"
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Roles */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.6rem" }}>
                {T.rolesLbl} <span style={{ color: "#e05" }}>*</span>
                <span style={{ color: "var(--muted-foreground)", fontWeight: 400, marginLeft: "0.4rem" }}>{T.selectAll}</span>
              </label>
              <div className="flex flex-col gap-2.5">
                {ROLES_BASE.map((r, idx) => {
                  const selected = roles.includes(ROLES_EN[idx].title);
                  return (
                    <button
                      key={ROLES_EN[idx].title}
                      type="button"
                      onClick={() => toggleRole(ROLES_EN[idx].title)}
                      className="w-full text-left rounded-xl px-4 py-3 transition-all duration-150"
                      style={{
                        background: selected ? `${r.color}14` : "var(--card)",
                        border: `2px solid ${selected ? r.color : "var(--border)"}`,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, background: selected ? r.color : "transparent", border: `2px solid ${selected ? r.color : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selected && <CheckCircle size={11} style={{ color: "#fff" }} />}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem" }}>{ROLES_EN[idx].title}</div>
                        <div style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{r.commitment}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.6rem" }}>
                {T.availLbl} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>{T.availOptional}</span>
              </label>
              <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
                {AVAILABILITY_OPTIONS.map(a => {
                  const selected = availability.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAvailability(a.id)}
                      className="rounded-xl px-3 py-2.5 text-center transition-all duration-150"
                      style={{
                        background: selected ? "#6FAF9B14" : "var(--card)",
                        border: `2px solid ${selected ? "#6FAF9B" : "var(--border)"}`,
                        cursor: "pointer",
                        color: selected ? "var(--primary)" : "var(--foreground)",
                        fontWeight: selected ? 700 : 500,
                        fontSize: "0.82rem",
                      }}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* About */}
            <div>
              <label style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
                {T.aboutLbl} <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>{T.aboutOptional}</span>
              </label>
              <textarea
                value={about}
                onChange={e => setAbout(e.target.value)}
                placeholder={T.aboutPlaceholder}
                rows={4}
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.9rem", outline: "none", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="rounded-xl p-4" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", lineHeight: 1.7 }}>
                {T.privacyNote}
              </p>
            </div>

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

            {submitState === "error" && (
              <div className="rounded-xl p-4" style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>
                <p style={{ color: "#dc2626", fontSize: "0.85rem", fontWeight: 600 }}>{T.errorMsg}</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
