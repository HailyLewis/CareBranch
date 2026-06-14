import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Phone, MapPin, Globe, ChevronDown, ChevronUp,
  Copy, CheckCheck, ArrowLeft, Scale, Car, CreditCard,
  AlertCircle, Laptop, DollarSign, Building2, Info,
} from "lucide-react";
import { GrowingTree, CARE_TO_IDX } from "./GrowingTree";

interface UserAnswers {
  careType: string;
  hasInsurance: "yes" | "no" | "unsure";
  hasTransportation: "yes" | "no" | "limited";
}

interface Provider {
  name: string;
  type: string;
  address: string;
  phone: string;
  website: string;
  telehealth: boolean;
  slidingScale: boolean;
  acceptsMedicaid: boolean;
  tags: string[];
  accent: string;
}

const PROVIDERS: Record<string, Provider[]> = {
  "Primary Care": [
    {
      name: "Kind Clinic Austin",
      type: "LGBTQ+ Affirming Community Health Center",
      address: "2911 Medical Arts St, Austin, TX 78705",
      phone: "(512) 220-9008",
      website: "kindclinic.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["LGBTQ+ specialized", "Sliding scale", "Telehealth"],
      accent: "#6FAF9B",
    },
    {
      name: "CommUnity Care Centers",
      type: "Federally Qualified Health Center",
      address: "Multiple locations, Austin, TX",
      phone: "(512) 978-9400",
      website: "communitycaretx.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["Sliding scale", "Medicaid accepted", "Multilingual"],
      accent: "#2F6F6D",
    },
    {
      name: "Austin Public Health Clinics",
      type: "City Health Services",
      address: "7201 Levander Loop, Austin, TX 78702",
      phone: "(512) 972-5430",
      website: "austintexas.gov/health",
      telehealth: false,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["Low-cost", "Walk-in available", "Medicaid accepted"],
      accent: "#B9A7E6",
    },
  ],
  "Sexual Health Care": [
    {
      name: "Kind Clinic Austin",
      type: "LGBTQ+ Sexual Health Services",
      address: "2911 Medical Arts St, Austin, TX 78705",
      phone: "(512) 220-9008",
      website: "kindclinic.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["STI testing", "PrEP/PEP", "LGBTQ+ specialized"],
      accent: "#6FAF9B",
    },
    {
      name: "Planned Parenthood Greater Texas, Austin",
      type: "Sexual & Reproductive Health",
      address: "201 E Ben White Blvd, Austin, TX 78704",
      phone: "(512) 571-7000",
      website: "plannedparenthood.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["STI testing", "Contraception", "Sliding scale"],
      accent: "#A7C7E7",
    },
    {
      name: "Austin Public Health STD Services",
      type: "City STD Clinic",
      address: "7201 Levander Loop, Austin, TX 78702",
      phone: "(512) 972-5430",
      website: "austintexas.gov/health",
      telehealth: false,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["Low-cost testing", "Confidential", "Walk-in"],
      accent: "#2F6F6D",
    },
  ],
  "Mental Health Care": [
    {
      name: "Waterloo Counseling Center",
      type: "LGBTQ+ Affirming Therapy",
      address: "314 E Highland Mall Blvd, Austin, TX 78752",
      phone: "(512) 444-9922",
      website: "waterloocounseling.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: false,
      tags: ["LGBTQ+ specialized", "Sliding scale", "Individual & group"],
      accent: "#B9A7E6",
    },
    {
      name: "Austin Travis County Integral Care",
      type: "Community Mental Health Center",
      address: "1430 Collier St, Austin, TX 78704",
      phone: "(512) 472-4357",
      website: "integralcare.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["Crisis line 24/7", "Medicaid accepted", "Psychiatry"],
      accent: "#6FAF9B",
    },
    {
      name: "NAMI Austin",
      type: "Mental Health Support & Education",
      address: "Austin, TX",
      phone: "(512) 420-9810",
      website: "namiaustin.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: false,
      tags: ["Free support groups", "Education", "Peer support"],
      accent: "#2F6F6D",
    },
  ],
  "Gender Affirming Care": [
    {
      name: "Kind Clinic Austin",
      type: "Gender-Affirming Primary Care & HRT",
      address: "2911 Medical Arts St, Austin, TX 78705",
      phone: "(512) 220-9008",
      website: "kindclinic.org",
      telehealth: true,
      slidingScale: true,
      acceptsMedicaid: true,
      tags: ["HRT", "LGBTQ+ specialized", "Telehealth"],
      accent: "#2F6F6D",
    },
    {
      name: "Folx Health",
      type: "Virtual Gender-Affirming Care (Serves Texas)",
      address: "Fully virtual",
      phone: "N/A (online intake only)",
      website: "folxhealth.com",
      telehealth: true,
      slidingScale: false,
      acceptsMedicaid: false,
      tags: ["HRT online", "LGBTQ+ founded", "Subscription model"],
      accent: "#6FAF9B",
    },
    {
      name: "UT Health Austin",
      type: "Academic Medical Center",
      address: "1601 Trinity St, Austin, TX 78712",
      phone: "(512) 694-9000",
      website: "uthealthaustin.org",
      telehealth: true,
      slidingScale: false,
      acceptsMedicaid: true,
      tags: ["Referrals available", "Specialist network", "Insurance accepted"],
      accent: "#B9A7E6",
    },
  ],
};

const CALL_SCRIPTS: Record<string, string> = {
  "Primary Care": "Hi, I'm calling to schedule a new patient appointment for primary care. I'm looking for a provider who is affirming of LGBTQ+ patients. Do you have providers with experience in this area? I also wanted to confirm whether you accept [insurance name] or offer a sliding scale fee option.",
  "Sexual Health Care": "Hi, I'm looking to schedule an appointment for sexual health services, including [STI testing / PrEP consultation]. I want to make sure the provider is LGBTQ+ affirming. Could you let me know if that's something your clinic supports? I also wanted to ask about costs and whether you offer a sliding scale.",
  "Mental Health Care": "Hi, I'm looking for a therapist who has experience working with LGBTQ+ individuals and [specific concerns: gender identity / anxiety / depression / trauma]. Do any of your providers specialize in this area? I'd also like to ask about session costs and whether you accept [insurance / sliding scale].",
  "Gender Affirming Care": "Hi, I'm calling to ask about gender-affirming care services. I'm interested in [HRT / referrals for surgery / letter writing for insurance]. I want to confirm that the provider uses correct pronouns and has experience with trans and non-binary patients. Could you tell me about your intake process?",
};

const RIGHTS = [
  "You have the right to use your chosen name and pronouns with any provider.",
  "You can request a provider with LGBTQ+ experience at any clinic.",
  "You may bring a support person to any appointment.",
  "You can ask questions and take time before agreeing to any treatment.",
  "Emergency care cannot be denied due to gender identity or sexual orientation.",
  "You can file a complaint with the HHS Office for Civil Rights if you experience discrimination.",
];

const TRANSPORT_RESOURCES = [
  { name: "Capital Metro (CapMetro)", desc: "Austin's public transit system. Routes serve most major clinic locations in the city.", url: "capmetro.org" },
  { name: "RideAustin", desc: "Nonprofit rideshare serving Austin with lower rates than commercial alternatives.", url: "rideaustin.com" },
  { name: "Telehealth Option", desc: "Both Kind Clinic and Integral Care offer video and phone appointments. Ask your provider directly.", url: "" },
];

const INSURANCE_RESOURCES = [
  { name: "Texas Health and Human Services, Medicaid", desc: "Apply for Texas Medicaid or CHIP if you may qualify based on income.", url: "hhs.texas.gov", phone: "(877) 541-7905" },
  { name: "HealthCare.gov", desc: "Apply for ACA marketplace coverage. Open enrollment each fall; special enrollment available after life events.", url: "healthcare.gov", phone: "(800) 318-2596" },
  { name: "Community Care Collaborative Austin", desc: "Local safety-net network connecting uninsured Austin residents to affordable care.", url: "communitycarecollaborative.org", phone: "" },
];

function Badge({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: `${color}14`, color, fontSize: "0.75rem", fontWeight: 600 }}>
      {icon} {label}
    </span>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: `4px solid ${provider.accent}` }}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <h3 style={{ color: "var(--foreground)", fontWeight: 700, marginBottom: "0.15rem", fontSize: "0.95rem" }}>{provider.name}</h3>
          <p style={{ color: provider.accent, fontSize: "0.78rem", fontWeight: 600 }}>{provider.type}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {provider.telehealth && <Badge icon={<Laptop size={11} />} label="Telehealth" color="#2F6F6D" />}
          {provider.slidingScale && <Badge icon={<DollarSign size={11} />} label="Sliding scale" color="#6FAF9B" />}
          {provider.acceptsMedicaid && <Badge icon={<Building2 size={11} />} label="Medicaid" color="#B9A7E6" />}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
          <MapPin size={13} />
          <span>{provider.address}</span>
        </div>
        <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
          <Phone size={13} />
          <a href={`tel:${provider.phone}`} style={{ color: provider.accent }}>{provider.phone}</a>
        </div>
        <div className="flex items-center gap-2" style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>
          <Globe size={13} />
          <a href={`https://${provider.website}`} target="_blank" rel="noreferrer" style={{ color: provider.accent }}>{provider.website}</a>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {provider.tags.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md" style={{ background: `${provider.accent}12`, color: provider.accent, fontSize: "0.73rem" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
      style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer" }}
    >
      {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy script"}
    </button>
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

interface ResultsPageProps {
  answers: UserAnswers;
  onRestart: () => void;
}

export function ResultsPage({ answers, onRestart }: ResultsPageProps) {
  const navigate = useNavigate();
  const providers = PROVIDERS[answers.careType] ?? PROVIDERS["Primary Care"];
  const script = CALL_SCRIPTS[answers.careType] ?? CALL_SCRIPTS["Primary Care"];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Full tree */}
      <div style={{ marginBottom: "0.25rem" }}>
        <p style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.72rem", marginBottom: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Your path, fully branched
        </p>
        <GrowingTree
          phase={4}
          careIdx={CARE_TO_IDX[answers.careType]}
          insChoice={answers.hasInsurance === "yes" ? "left" : "right"}
          transChoice={answers.hasTransportation === "yes" ? "left" : "right"}
        />
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

      {/* Match summary */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "linear-gradient(135deg, #2F6F6D 0%, #4A9A96 60%, #6FAF9B 100%)", color: "#fff" }}
      >
        <p style={{ fontSize: "0.75rem", opacity: 0.78, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Care match · Austin, TX</p>
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.5rem", letterSpacing: "-0.015em" }}>{answers.careType}</h1>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.18)", fontSize: "0.78rem" }}>
            {answers.hasInsurance === "yes" ? "Has insurance" : answers.hasInsurance === "no" ? "No insurance" : "Insurance uncertain"}
          </span>
          <span className="px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.18)", fontSize: "0.78rem" }}>
            {answers.hasTransportation === "yes" ? "Has transportation" : answers.hasTransportation === "no" ? "No transportation" : "Limited transportation"}
          </span>
        </div>
      </div>

      <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "1rem", fontSize: "1rem" }}>Austin providers that may be a match</h2>
      <div className="flex flex-col gap-3 mb-6">
        {providers.map(p => <ProviderCard key={p.name} provider={p} />)}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Accordion icon={<Phone size={16} />} title="Script to use when calling for an appointment" accent="var(--primary)">
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", marginBottom: "0.75rem", lineHeight: 1.65 }}>
            Calling a new provider can be difficult. This script is designed to help you confirm the clinic is a good fit before your first appointment.
          </p>
          <div className="rounded-lg p-4 mb-3" style={{ background: "var(--secondary)", color: "var(--foreground)", fontSize: "0.875rem", lineHeight: 1.75, fontStyle: "italic" }}>
            {script}
          </div>
          <CopyButton text={script} />
          <div className="flex items-start gap-2 mt-3" style={{ color: "var(--muted-foreground)", fontSize: "0.78rem", lineHeight: 1.6 }}>
            <Info size={13} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            <span>If a clinic doesn't feel like a good fit, you can try another. Most providers on this list are accustomed to these questions.</span>
          </div>
        </Accordion>

        <Accordion icon={<Scale size={16} />} title="Patient rights" accent="#2F6F6D">
          <ul className="flex flex-col gap-2.5">
            {RIGHTS.map((r, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "0.85rem", color: "var(--foreground)", lineHeight: 1.6 }}>
                <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.65rem" }}>&#9632;</span>
                {r}
              </li>
            ))}
          </ul>
        </Accordion>

        {(answers.hasTransportation === "no" || answers.hasTransportation === "limited") && (
          <Accordion icon={<Car size={16} />} title="Transportation options in Austin" accent="#6FAF9B">
            <div className="flex flex-col gap-3">
              {TRANSPORT_RESOURCES.map(r => (
                <div key={r.name} className="rounded-lg p-4" style={{ background: "var(--secondary)" }}>
                  <p style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.2rem", fontSize: "0.875rem" }}>{r.name}</p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.6 }}>{r.desc}</p>
                  {r.url && (
                    <a href={`https://${r.url}`} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: "0.78rem", display: "block", marginTop: "0.35rem" }}>
                      {r.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Accordion>
        )}

        {(answers.hasInsurance === "no" || answers.hasInsurance === "unsure") && (
          <Accordion icon={<CreditCard size={16} />} title="Options if you are uninsured or unsure" accent="#B9A7E6">
            <div className="flex flex-col gap-3">
              {INSURANCE_RESOURCES.map(r => (
                <div key={r.name} className="rounded-lg p-4" style={{ background: "var(--secondary)" }}>
                  <p style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.2rem", fontSize: "0.875rem" }}>{r.name}</p>
                  <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.6 }}>{r.desc}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {r.phone && <span style={{ color: "var(--primary)", fontSize: "0.78rem", fontWeight: 600 }}>{r.phone}</span>}
                    {r.url && (
                      <a href={`https://${r.url}`} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontSize: "0.78rem" }}>
                        {r.url}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Accordion>
        )}

        <Accordion icon={<AlertCircle size={16} />} title="Crisis and emergency contacts" accent="#A7C7E7">
          <div className="flex flex-col gap-2.5">
            {[
              { name: "Integral Care Crisis Line, Austin/Travis County", detail: "24/7 local mental health crisis support", phone: "(512) 472-4357" },
              { name: "Trevor Project", detail: "Crisis support for LGBTQ+ youth", phone: "1-866-488-7386" },
              { name: "Trans Lifeline", detail: "Trans peer support hotline", phone: "1-877-565-8860" },
              { name: "Crisis Text Line", detail: "Text HOME to 741741", phone: "" },
              { name: "988 Lifeline", detail: "National 24/7 mental health crisis line", phone: "988" },
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
      </div>

      {/* Still unsure prompt */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{ background: "linear-gradient(135deg, #6FAF9B18 0%, #B9A7E618 100%)", border: "1.5px solid #6FAF9B50" }}
      >
        <p style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.4rem", fontSize: "1rem" }}>
          Still feeling unsure or overwhelmed?
        </p>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1rem" }}>
          Navigating healthcare alone is hard. A CareBranch volunteer can walk through next steps with you, in person or virtually. From figuring out exactly what you need to scheduling your first appointment and arranging transportation, we're here to help.
        </p>
        <button
          onClick={() => navigate("/connect")}
          className="px-5 py-2.5 rounded-xl"
          style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", boxShadow: "0 2px 8px rgba(47,111,109,0.22)" }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Get one-on-one help →
        </button>
      </div>

      <div className="rounded-xl p-5" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
        <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: "0.35rem", fontSize: "0.9rem" }}>These results are a starting point.</p>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.7 }}>
          If an option doesn't fit your situation, you can return and adjust your answers or browse the full Austin resource library.
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
