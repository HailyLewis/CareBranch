import { useNavigate } from "react-router";
import { BranchLogo } from "../components/BranchLogo";
import { Shield, Lock, Users, Compass, Heart } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

const VALUES = [
  { icon: <Compass size={20} />, title: "Navigation, not instruction", desc: "CareBranch helps people identify options and understand pathways. We surface information; we do not make clinical decisions.", color: "#6FAF9B" },
  { icon: <Shield size={20} />, title: "Affirming by design", desc: "Every resource listed has been selected because it meets a standard of LGBTQ+-affirming practice. We do not include generic directories.", color: "#A7C7E7" },
  { icon: <Lock size={20} />, title: "No data collected", desc: "CareBranch stores nothing about you. There is no account, no login, no tracking. The session ends when you close the tab.", color: "#B9A7E6" },
  { icon: <Users size={20} />, title: "Accessible to everyone", desc: "The tool is free, works on any device, and requires no technical knowledge or health literacy background to use.", color: "#2F6F6D" },
];

const FAQ = [
  {
    q: "Is any personal information stored?",
    a: "No. CareBranch collects and stores no personal data. There are no accounts, no cookies, and no analytics tied to individual users. When you close the browser tab, nothing is retained.",
  },
  {
    q: "How are providers and resources selected?",
    a: "Resources are drawn from established LGBTQ+-affirming health organizations including GLMA, Fenway Health, UCSF Transgender Care, and federally maintained databases. We do not independently credential individual clinicians. We recommend confirming a provider's experience directly when scheduling.",
  },
  {
    q: "I live in a state with restrictive healthcare laws. Can CareBranch still help?",
    a: "Yes. We prioritize telehealth options, which allow you to connect with affirming providers licensed in other states. We also include legal advocacy resources and guidance on your rights under federal anti-discrimination protections.",
  },
  {
    q: "Can this tool be used by a care navigator, social worker, or family member?",
    a: "Yes. CareBranch is designed to be useful both for individuals navigating their own care and for professionals or family members supporting others through that process.",
  },
  {
    q: "What does 'LGBTQ+-affirming' mean in practice?",
    a: "For our purposes, affirming means: providers who use correct pronouns without prompting, who do not assume sexuality or gender identity, who have documented experience with LGBTQ+-specific health concerns, and who create a clinical environment where patients do not need to educate their providers.",
  },
  {
    q: "A resource in the directory appears outdated or incorrect.",
    a: "We review listings regularly. If you encounter an error, please use the contact options in the footer to flag it. We take accuracy seriously.",
  },
];

export function AboutPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const T = t[lang].about;

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--primary)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontWeight: 800,
              color: "#fff",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              margin: "1.25rem 0 1rem",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {T.heroTitle}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            {T.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section style={{ padding: "4.5rem 1.5rem", background: "var(--background)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="rounded-2xl p-8" style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "4px solid #6FAF9B" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#6FAF9B20" }}>
                <Heart size={20} style={{ color: "#6FAF9B" }} />
              </div>
              <div>
                <p style={{ fontWeight: 800, color: "var(--foreground)", fontSize: "1rem", lineHeight: 1.2 }}>{T.founderName}</p>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{T.founderRole}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
                {T.founderP1}
              </p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
                {T.founderP2}
              </p>
              <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.85, fontWeight: 600 }}>
                {T.founderP3}
              </p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
                {T.founderP4}
              </p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
                {T.founderP5}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand meaning */}
      <section style={{ padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            {T.brandTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl p-6" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>{T.careLabel}</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {T.careDesc}
              </p>
            </div>
            <div className="rounded-xl p-6" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
              <p style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>{T.branchLabel}</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {T.branchDesc}
              </p>
            </div>
          </div>
          <div className="rounded-xl p-6 mt-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
              {T.brandDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "4.5rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "1.5rem", letterSpacing: "-0.015em" }}>
            {T.missionTitle}
          </h2>
          <div className="flex flex-col gap-4">
            <p style={{ color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
              {T.missionP1}
            </p>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
              {T.missionP2}
            </p>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.85 }}>
              {T.missionP3}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 540, marginBottom: "2.5rem" }}>
            <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>
              {T.principlesTitle}
            </h2>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              {T.principlesSubtitle}
            </p>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {VALUES.map(v => (
              <div key={v.title} className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${v.color}18`, color: v.color }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>{v.title}</h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ padding: "4.5rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
            {T.whoTitle}
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
            {T.whoSubtitle}
          </p>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {[
              "LGBTQ+ adults seeking any type of care",
              "Transgender and non-binary people",
              "LGBTQ+ youth and young adults",
              "LGBTQ+ people without insurance",
              "People in rural or underserved areas",
              "Care navigators and social workers",
              "Family members supporting a loved one",
              "Healthcare providers seeking resources",
            ].map(item => (
              <div key={item} className="rounded-lg px-4 py-3" style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.85rem", fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "2rem", letterSpacing: "-0.015em" }}>
            {T.faqTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {FAQ.map(item => (
              <div key={item.q} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <p style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem", fontSize: "0.9rem" }}>{item.q}</p>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", lineHeight: 1.75 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: "2rem 1.5rem", background: "var(--secondary)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.4rem", fontSize: "0.85rem" }}>{T.disclaimerTitle}</p>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", lineHeight: 1.8 }}>
              {T.disclaimerText}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.75rem", letterSpacing: "-0.015em" }}>
          {T.ctaTitle}
        </h2>
        <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {T.ctaSubtitle}
        </p>
        <button
          onClick={() => navigate("/find-care")}
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.95rem",
            borderRadius: "0.75rem",
            padding: "0.8rem 1.75rem",
            boxShadow: "0 2px 10px rgba(47,111,109,0.22)",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          {T.ctaBtn}
        </button>
      </section>
    </div>
  );
}
