import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Phone, MapPin, Globe, ChevronDown, ChevronUp, Heart, Brain, Users, Shield, AlertCircle } from "lucide-react";
import { GrowingTree } from "./GrowingTree";

interface YouthResourceProps {
  name: string;
  type: string;
  address: string;
  phone: string;
  website: string;
  tags: string[];
  accent: string;
  desc: string;
}

const YOUTH_RESOURCES: YouthResourceProps[] = [
  {
    name: "OutYouth",
    type: "LGBTQIA+ Youth Community Center",
    address: "909 E 49½ St, Austin, TX 78751",
    phone: "(512) 419-1233",
    website: "outyouth.org",
    tags: ["Ages 9–17", "Young adults", "Drop-in programs", "Individual counseling", "Trans & gender-diverse support", "Family support", "Support groups"],
    accent: "#6FAF9B",
    desc: "The strongest dedicated resource for LGBTQIA+ youth in Central Texas. OutYouth offers drop-in community programs, individual counseling, family support, and specialized programs for trans and gender-diverse youth. Programs are organized by age group: 9–12, 13–17, and young adults.",
  },
  {
    name: "PFLAG Austin",
    type: "Family Support & Community Education",
    address: "Austin, TX (meeting locations vary)",
    phone: "",
    website: "pflagaustin.org",
    tags: ["Parents & caregivers", "Family education", "Community support", "Referrals to LGBTQ+ services"],
    accent: "#B9A7E6",
    desc: "Especially helpful if you need support talking with a parent or family member, or if a caregiver in your life wants to learn more. PFLAG Austin offers family education, support groups, and referrals to LGBTQ+ services throughout the Austin area.",
  },
  {
    name: "The SAFE Alliance",
    type: "Youth Support, Counseling & Advocacy",
    address: "Austin, TX (multiple locations)",
    phone: "(512) 267-7233",
    website: "safeaustin.org",
    tags: ["Counseling", "Youth support", "Advocacy", "Safety resources", "Family violence support"],
    accent: "#A7C7E7",
    desc: "Not LGBTQ+-specific, but an important resource if you feel unsafe at home or need support beyond healthcare. The SAFE Alliance provides counseling, youth advocacy, and family violence support for young people across Austin.",
  },
  {
    name: "Kind Clinic Austin",
    type: "LGBTQ+ Affirming Health Services",
    address: "2911 Medical Arts St, Austin, TX 78705",
    phone: "(512) 220-9008",
    website: "kindclinic.org",
    tags: ["LGBTQ+ specialized", "Telehealth available", "HRT", "Sexual health", "Sliding scale"],
    accent: "#2F6F6D",
    desc: "Kind Clinic provides LGBTQ+-affirming primary care, sexual health, and gender-affirming services. While primarily serving adults, they can connect younger patients with appropriate referrals and resources.",
  },
  {
    name: "Austin Travis County Integral Care",
    type: "Mental Health & Crisis Support",
    address: "1430 Collier St, Austin, TX 78704",
    phone: "(512) 472-4357",
    website: "integralcare.org",
    tags: ["Crisis line 24/7", "Mental health", "Youth services", "Medicaid accepted", "Telehealth"],
    accent: "#8CA9A3",
    desc: "Austin's primary community mental health center with a 24/7 crisis line. Serves youth and offers telehealth options. If you are in a mental health crisis, this is a key local resource.",
  },
];

const YOUTH_RIGHTS = [
  "You have the right to ask your provider to use your chosen name and pronouns.",
  "In Texas, minors can consent to STI testing and treatment without a parent's permission.",
  "You can ask to speak with a provider privately, without a parent in the room.",
  "You have the right to ask questions before agreeing to any care.",
  "Emergency care cannot be denied based on gender identity or sexual orientation.",
  "If you experience discrimination, you can report it to the HHS Office for Civil Rights.",
];

function YouthResourceCard({ r }: { r: YouthResourceProps }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `4px solid ${r.accent}` }}
    >
      <div className="mb-2">
        <h3 style={{ color: "var(--foreground)", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.15rem" }}>{r.name}</h3>
        <p style={{ color: r.accent, fontSize: "0.78rem", fontWeight: 600 }}>{r.type}</p>
      </div>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: "0.75rem" }}>{r.desc}</p>
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
          <MapPin size={13} /><span>{r.address}</span>
        </div>
        {r.phone && (
          <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
            <Phone size={13} />
            <a href={`tel:${r.phone}`} style={{ color: r.accent }}>{r.phone}</a>
          </div>
        )}
        <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
          <Globe size={13} />
          <a href={`https://${r.website}`} target="_blank" rel="noreferrer" style={{ color: r.accent }}>{r.website}</a>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {r.tags.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md" style={{ background: `${r.accent}12`, color: r.accent, fontSize: "0.73rem" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Accordion({ icon, title, children, accent = "var(--primary)" }: { icon: React.ReactNode; title: string; children: React.ReactNode; accent?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 gap-2"
        style={{ background: open ? "var(--secondary)" : "var(--card)", border: "none", cursor: "pointer", color: accent, fontWeight: 700, textAlign: "left" }}
      >
        <span className="flex items-center gap-2">{icon}{title}</span>
        {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3" style={{ background: "var(--card)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function YouthResultsPage({ onRestart }: { onRestart: () => void }) {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 0 2rem" }}>
      {/* Full tree */}
      <div style={{ marginBottom: "0.25rem" }}>
        <p style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.72rem", marginBottom: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Your path, youth resources
        </p>
        <GrowingTree phase={4} />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: "var(--secondary)", color: "var(--primary)", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
        >
          <ArrowLeft size={13} /> Start over
        </button>
      </div>

      {/* Header */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "linear-gradient(135deg, #B9A7E6 0%, #9b8fd4 60%, #6FAF9B 100%)", color: "#fff" }}
      >
        <p style={{ fontSize: "0.75rem", opacity: 0.82, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Youth resources · Austin, TX</p>
        <h1 style={{ fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.5rem", lineHeight: 1.2 }}>LGBTQIA+ resources for young people</h1>
        <p style={{ fontSize: "0.85rem", opacity: 0.88, lineHeight: 1.6 }}>
          These organizations specialize in supporting LGBTQIA+ youth and young adults in Central Texas. You deserve care that sees and respects you.
        </p>
      </div>

      {/* Top pick callout */}
      <div className="rounded-xl p-4 mb-5 flex items-start gap-3" style={{ background: "#6FAF9B15", border: "1px solid #6FAF9B40" }}>
        <Heart size={16} style={{ color: "#6FAF9B", flexShrink: 0, marginTop: "0.15rem" }} />
        <p style={{ color: "var(--foreground)", fontSize: "0.85rem", lineHeight: 1.65 }}>
          <span style={{ fontWeight: 700, color: "#2F6F6D" }}>OutYouth</span> is the strongest dedicated resource for LGBTQIA+ youth in Central Texas. If you're not sure where to start, start there.
        </p>
      </div>

      <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem", fontSize: "1rem" }}>Organizations that may be able to help</h2>
      <div className="flex flex-col gap-3 mb-6">
        {YOUTH_RESOURCES.map(r => <YouthResourceCard key={r.name} r={r} />)}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Accordion icon={<Users size={16} />} title="Your rights as a young patient" accent="var(--primary)">
          <ul className="flex flex-col gap-2.5">
            {YOUTH_RIGHTS.map((r, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.85rem", color: "var(--foreground)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.65rem" }}>&#9632;</span>
                {r}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion icon={<Brain size={16} />} title="Need someone to talk to right now?" accent="#B9A7E6">
          <div className="flex flex-col gap-2.5">
            {[
              { name: "Trevor Project", detail: "Crisis support for LGBTQ+ youth, 24/7", phone: "1-866-488-7386" },
              { name: "Trans Lifeline", detail: "Trans peer support hotline", phone: "1-877-565-8860" },
              { name: "Crisis Text Line", detail: "Text HOME to 741741", phone: "" },
              { name: "988 Lifeline", detail: "National 24/7 mental health crisis line", phone: "988" },
              { name: "OutYouth Counseling", detail: "LGBTQIA+ youth counseling in Austin", phone: "(512) 419-1233" },
            ].map(r => (
              <div key={r.name} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "var(--secondary)" }}>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.85rem" }}>{r.name}</p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{r.detail}</p>
                </div>
                {r.phone && (
                  <a href={`tel:${r.phone}`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, marginLeft: "1rem" }}>{r.phone}</a>
                )}
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion icon={<Shield size={16} />} title="Feeling unsafe at home?" accent="#A7C7E7">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            If you feel unsafe at home because of your identity, you are not alone. These organizations can help.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { name: "The SAFE Alliance", detail: "Youth support, counseling & advocacy in Austin", phone: "(512) 267-7233" },
              { name: "OutYouth", detail: "Safe space and family support resources", phone: "(512) 419-1233" },
              { name: "Trevor Project", detail: "LGBTQ+ youth crisis support", phone: "1-866-488-7386" },
            ].map(r => (
              <div key={r.name} className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: "var(--secondary)" }}>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.85rem" }}>{r.name}</p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.78rem" }}>{r.detail}</p>
                </div>
                <a href={`tel:${r.phone}`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, marginLeft: "1rem" }}>{r.phone}</a>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion icon={<AlertCircle size={16} />} title="Need a parent or family member to get involved?" accent="#6FAF9B">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            If a parent, guardian, or family member wants to learn more about supporting you, these resources are a good starting point.
          </p>
          <div className="rounded-lg p-4" style={{ background: "var(--secondary)" }}>
            <p style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.875rem", marginBottom: "0.2rem" }}>PFLAG Austin</p>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.6 }}>
              Support groups, education, and community for families of LGBTQ+ people. A gentle place for family members who want to understand and show up better.
            </p>
            <a href="https://pflagaustin.org" target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: "0.78rem", display: "block", marginTop: "0.35rem" }}>pflagaustin.org</a>
          </div>
        </Accordion>
      </div>

      {/* Still need help */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{ background: "linear-gradient(135deg, #6FAF9B15 0%, #B9A7E615 100%)", border: "1px solid var(--border)" }}
      >
        <p style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.35rem", fontSize: "0.95rem" }}>
          Still feeling unsure or overwhelmed?
        </p>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
          Navigating this alone is hard. A CareBranch volunteer can walk you through next steps in person or virtually, from figuring out what you need to scheduling your first appointment.
        </p>
        <button
          onClick={() => navigate("/connect")}
          className="px-4 py-2.5 rounded-xl"
          style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}
        >
          Get one-on-one help →
        </button>
      </div>

      <div className="rounded-xl p-5" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: "0.35rem", fontSize: "0.9rem" }}>These results are a starting point.</p>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.7 }}>
          If you turn 18 soon or want to explore adult provider options, you can start over and select the 18+ path.
        </p>
        <button
          onClick={onRestart}
          className="mt-3 px-4 py-2 rounded-lg"
          style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}
