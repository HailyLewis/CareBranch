import { useNavigate } from "react-router";
import { ExternalLink, Phone, AlertCircle, Building2, Shield, Brain, Sparkles, CreditCard, Car, Scale } from "lucide-react";

interface Resource {
  name: string;
  desc: string;
  contact?: string;
  phone?: string;
  url?: string;
}

interface Section {
  title: string;
  color: string;
  Icon: React.ElementType;
  resources: Resource[];
}

const SECTIONS: Section[] = [
  {
    title: "Crisis & Immediate Support",
    color: "#2F6F6D",
    Icon: AlertCircle,
    resources: [
      { name: "Integral Care Crisis Line, Austin", desc: "Austin/Travis County 24/7 mental health and crisis support line", phone: "(512) 472-4357", url: "integralcare.org" },
      { name: "Trevor Project Lifeline", desc: "24/7 crisis support for LGBTQ+ youth", phone: "1-866-488-7386", url: "thetrevorproject.org" },
      { name: "Trans Lifeline", desc: "Peer crisis support by and for trans people", phone: "1-877-565-8860", url: "translifeline.org" },
      { name: "Crisis Text Line", desc: "Text-based crisis support, available 24/7", contact: "Text HOME to 741741", url: "crisistextline.org" },
      { name: "988 Suicide & Crisis Lifeline", desc: "National 24/7 mental health crisis line. Call or text.", phone: "988", url: "988lifeline.org" },
    ],
  },
  {
    title: "Austin LGBTQ+ Affirming Providers",
    color: "#6FAF9B",
    Icon: Building2,
    resources: [
      { name: "Kind Clinic Austin", desc: "LGBTQ+-focused community health center offering primary care, sexual health, PrEP, and HRT. Sliding scale available.", phone: "(512) 220-9008", url: "kindclinic.org" },
      { name: "CommUnity Care Centers", desc: "Federally qualified health centers across Austin. Sliding scale fees, Medicaid accepted, multilingual staff.", phone: "(512) 978-9400", url: "communitycaretx.org" },
      { name: "Waterloo Counseling Center", desc: "LGBTQ+-affirming therapy and counseling in Austin. Individual, couples, and group sessions. Sliding scale available.", phone: "(512) 444-9922", url: "waterloocounseling.org" },
      { name: "Austin Travis County Integral Care", desc: "Comprehensive mental health and substance use services. Accepts Medicaid. Includes 24/7 crisis services.", phone: "(512) 472-4357", url: "integralcare.org" },
      { name: "Austin Public Health Clinics", desc: "City-operated clinics with sliding scale fees, STD testing, and general health services. No appointment required for some services.", phone: "(512) 972-5430", url: "austintexas.gov/health" },
    ],
  },
  {
    title: "Sexual Health in Austin",
    color: "#A7C7E7",
    Icon: Shield,
    resources: [
      { name: "Kind Clinic Austin", desc: "PrEP, PEP, STI testing and treatment, sexual health education. LGBTQ+-specialized and affirming.", phone: "(512) 220-9008", url: "kindclinic.org" },
      { name: "Planned Parenthood Greater Texas, Austin", desc: "STI testing, contraception, PrEP, and reproductive health services. Sliding scale and Medicaid accepted.", phone: "(512) 571-7000", url: "plannedparenthood.org" },
      { name: "Austin Public Health STD Clinic", desc: "Confidential STD testing and treatment at low or no cost. Walk-in and appointment options available.", phone: "(512) 972-5430", url: "austintexas.gov/health" },
      { name: "Texas HIV Connection", desc: "HIV prevention, testing, linkage to care, and support services across Texas including Austin.", phone: "(214) 521-5124", url: "texashivconnection.org" },
    ],
  },
  {
    title: "Mental Health in Austin",
    color: "#B9A7E6",
    Icon: Brain,
    resources: [
      { name: "Waterloo Counseling Center", desc: "Austin's leading LGBTQ+-affirming counseling center. Serving individuals, couples, and groups since 1980. Sliding scale fees.", phone: "(512) 444-9922", url: "waterloocounseling.org" },
      { name: "Austin Travis County Integral Care", desc: "Austin's community mental health authority. Psychiatry, therapy, crisis services, and substance use treatment. Medicaid accepted.", phone: "(512) 472-4357", url: "integralcare.org" },
      { name: "NAMI Austin", desc: "Free mental health education, peer support groups, and advocacy. Offers LGBTQ+-specific programming.", phone: "(512) 420-9810", url: "namiaustin.org" },
      { name: "Open Path Collective", desc: "Directory of therapists offering reduced-fee sessions ($30–$80). Filter for LGBTQ+-affirming providers.", url: "openpathcollective.org" },
    ],
  },
  {
    title: "Gender Affirming Care in Austin",
    color: "#2F6F6D",
    Icon: Sparkles,
    resources: [
      { name: "Kind Clinic Austin", desc: "HRT and gender-affirming primary care for trans and non-binary patients. Sliding scale, Medicaid accepted, telehealth available.", phone: "(512) 220-9008", url: "kindclinic.org" },
      { name: "Folx Health", desc: "Virtual gender-affirming care and HRT serving Texas patients. Subscription-based; no insurance required.", url: "folxhealth.com" },
      { name: "UT Health Austin", desc: "Academic health system with specialist network. Some providers offer gender-affirming care and referrals. Insurance accepted.", phone: "(512) 694-9000", url: "uthealthaustin.org" },
      { name: "WPATH Standards of Care", desc: "Clinical guidelines for gender-affirming healthcare, useful for understanding what care you're entitled to request.", url: "wpath.org" },
    ],
  },
  {
    title: "Insurance & Financial Assistance",
    color: "#8CA9A3",
    Icon: CreditCard,
    resources: [
      { name: "Texas HHS, Medicaid & CHIP Enrollment", desc: "Apply for Texas Medicaid or Children's Health Insurance Program if you may qualify based on income.", phone: "(877) 541-7905", url: "hhs.texas.gov" },
      { name: "HealthCare.gov, ACA Marketplace", desc: "Apply for subsidized health coverage. Open enrollment each fall; special enrollment may apply to your situation.", phone: "(800) 318-2596", url: "healthcare.gov" },
      { name: "Community Care Collaborative Austin", desc: "Local network connecting uninsured Austin residents to affordable primary care and specialty services.", url: "communitycarecollaborative.org" },
      { name: "GoodRx", desc: "Prescription discount cards that can reduce medication costs significantly, including HRT medications.", url: "goodrx.com" },
      { name: "Patient Advocate Foundation", desc: "Help navigating insurance appeals, coverage disputes, and access to care barriers.", phone: "(800) 532-5274", url: "patientadvocate.org" },
    ],
  },
  {
    title: "Transportation in Austin",
    color: "#6FAF9B",
    Icon: Car,
    resources: [
      { name: "Capital Metro (CapMetro)", desc: "Austin's public transit network. Bus and rail routes serve most major clinic locations.", phone: "(512) 474-1200", url: "capmetro.org" },
      { name: "RideAustin", desc: "Nonprofit rideshare company based in Austin. Lower rates than commercial alternatives; serves the metro area.", url: "rideaustin.com" },
      { name: "Medicaid Non-Emergency Medical Transportation", desc: "If you have Texas Medicaid, free rides to medical appointments may be covered. Call your Medicaid plan to confirm.", phone: "(877) 541-7905", url: "hhs.texas.gov" },
      { name: "Telehealth via Kind Clinic & Integral Care", desc: "Both Kind Clinic and Integral Care offer video and phone appointments. Ask any provider whether this option is available.", url: "kindclinic.org" },
    ],
  },
  {
    title: "Legal Rights & Advocacy",
    color: "#2F6F6D",
    Icon: Scale,
    resources: [
      { name: "Texas Civil Rights Project", desc: "Legal advocacy for civil rights violations including LGBTQ+ healthcare discrimination in Texas.", phone: "(512) 474-5073", url: "texascivilrightsproject.org" },
      { name: "Lambda Legal", desc: "National LGBTQ+ legal organization handling discrimination cases, including healthcare denials.", phone: "(212) 809-8585", url: "lambdalegal.org" },
      { name: "ACLU Texas", desc: "Civil liberties advocacy and legal resources for LGBTQ+ Texans.", phone: "(512) 478-7300", url: "aclutx.org" },
      { name: "HHS Office for Civil Rights", desc: "File a formal complaint if you were denied care or treated differently due to your identity or sexual orientation.", phone: "(800) 368-1019", url: "hhs.gov/ocr" },
    ],
  },
];

function ResourceCard({ name, desc, contact, phone, url, color }: Resource & { color: string }) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "0.875rem" }}>{name}</div>
      <div style={{ color: "var(--muted-foreground)", fontSize: "0.8rem", lineHeight: 1.6 }}>{desc}</div>
      <div className="flex gap-2 flex-wrap mt-auto pt-1">
        {contact && (
          <span className="px-2 py-1 rounded-lg" style={{ background: `${color}14`, color, fontSize: "0.75rem", fontWeight: 600 }}>
            {contact}
          </span>
        )}
        {phone && (
          <a href={`tel:${phone}`} className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: `${color}14`, color, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}>
            <Phone size={11} /> {phone}
          </a>
        )}
        {url && (
          <a href={`https://${url}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: `${color}14`, color, fontSize: "0.75rem", fontWeight: 600, textDecoration: "none" }}>
            <ExternalLink size={11} /> {url}
          </a>
        )}
      </div>
    </div>
  );
}

export function ResourcesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: 600, marginBottom: "3rem" }}>
          <h1 style={{ fontWeight: 800, color: "var(--foreground)", marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>
            Austin LGBTQ+ Health Resources
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
            A curated directory of affirming healthcare resources specific to Austin, Texas. All entries are free or low-cost unless noted.
          </p>
          <button
            onClick={() => navigate("/find-care")}
            className="px-5 py-2.5 rounded-xl"
            style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem", boxShadow: "0 2px 8px rgba(47,111,109,0.2)" }}
          >
            Get a personalized match instead →
          </button>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {SECTIONS.map(section => (
            <div key={section.title}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${section.color}16`, color: section.color }}>
                  <section.Icon size={16} />
                </div>
                <h2 style={{ fontWeight: 800, color: "var(--foreground)", fontSize: "1.05rem" }}>
                  {section.title}
                </h2>
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {section.resources.map(r => (
                  <ResourceCard key={r.name} {...r} color={section.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-xl p-6" style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}>
          <p style={{ color: "var(--primary)", fontWeight: 700, marginBottom: "0.4rem" }}>
            Want a personalized recommendation?
          </p>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
            Answer three questions and CareBranch will suggest Austin providers and tools specific to your situation.
          </p>
          <button
            onClick={() => navigate("/find-care")}
            className="px-5 py-2.5 rounded-xl"
            style={{ background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}
          >
            Find my care match →
          </button>
        </div>
      </div>
    </div>
  );
}
