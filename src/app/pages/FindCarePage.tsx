import { useState } from "react";
import { Heart, Shield, Brain, Sparkles, HelpCircle, ChevronLeft, Users } from "lucide-react";
import { ChoiceCard } from "../components/ChoiceCard";
import { YesNoCard } from "../components/YesNoCard";
import { ResultsPage } from "../components/ResultsPage";
import { YouthResultsPage } from "../components/YouthResultsPage";
import { GrowingTree, CARE_TO_IDX } from "../components/GrowingTree";
import { useLang } from "../i18n/LanguageContext";
import t from "../i18n/translations";

type Step = "age" | "care" | "help-choose-1" | "help-choose-2" | "insurance" | "transport" | "results" | "youth-results";

interface Answers {
  isAdult: boolean;
  careType: string;
  hasInsurance: "yes" | "no" | "unsure";
  hasTransportation: "yes" | "no" | "limited";
}

const CARE_OPTIONS = [
  { id: "Primary Care", icon: <Heart size={22} />, accent: "#6FAF9B" },
  { id: "Sexual Health Care", icon: <Shield size={22} />, accent: "#A7C7E7" },
  { id: "Mental Health Care", icon: <Brain size={22} />, accent: "#B9A7E6" },
  { id: "Gender Affirming Care", icon: <Sparkles size={22} />, accent: "#2F6F6D" },
  { id: "help", icon: <HelpCircle size={22} />, accent: "#8CA9A3" },
];

const HELP_Q1_OPTIONS = [
  { care: "Gender Affirming Care", accent: "#2F6F6D" },
  { care: "Mental Health Care", accent: "#B9A7E6" },
  { care: "Sexual Health Care", accent: "#A7C7E7" },
  { care: "Primary Care", accent: "#6FAF9B" },
];

const HELP_Q2_OPTIONS = [
  { care: "Mental Health Care", accent: "#B9A7E6" },
  { care: "Primary Care", accent: "#6FAF9B" },
  { care: "Sexual Health Care", accent: "#A7C7E7" },
  { care: "Gender Affirming Care", accent: "#2F6F6D" },
];

function helpOpt(label: string, accent: string, onClick: () => void) {
  return (
    <button
      key={label}
      onClick={onClick}
      className="w-full text-left rounded-2xl px-5 py-4 transition-all duration-150"
      style={{ background: "var(--card)", border: "2px solid var(--border)", cursor: "pointer", color: "var(--foreground)", fontSize: "0.95rem", lineHeight: 1.5 }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accent; (e.currentTarget as HTMLElement).style.background = `${accent}0e`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--card)"; }}
    >
      <span style={{ color: accent, marginRight: "0.6rem" }}>→</span>{label}
    </button>
  );
}

function AgeCard({ onAdult, onMinor, T }: { onAdult: () => void; onMinor: () => void; T: typeof t["en"]["findCare"] }) {
  return (
    <div>
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6"
        style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em" }}
      >
        <Users size={13} /> {T.ageBadge}
      </div>
      <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem", fontSize: "1.15rem" }}>
        {T.ageTitle}
      </h2>
      <p style={{ color: "var(--muted-foreground)", marginBottom: "1.75rem", fontSize: "0.9rem", lineHeight: 1.65 }}>
        {T.ageSubtitle}
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={onAdult}
          className="w-full rounded-2xl px-6 py-5 text-left transition-all duration-150"
          style={{ background: "var(--card)", border: "2px solid var(--border)", cursor: "pointer" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#6FAF9B"; el.style.background = "#6FAF9B0e"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.background = "var(--card)"; }}
        >
          <div style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "1rem", marginBottom: "0.2rem" }}>{T.ageAdultTitle}</div>
          <div style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>{T.ageAdultDesc}</div>
        </button>
        <button
          onClick={onMinor}
          className="w-full rounded-2xl px-6 py-5 text-left transition-all duration-150"
          style={{ background: "var(--card)", border: "2px solid var(--border)", cursor: "pointer" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#B9A7E6"; el.style.background = "#B9A7E60e"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.background = "var(--card)"; }}
        >
          <div style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "1rem", marginBottom: "0.2rem" }}>{T.ageMinorTitle}</div>
          <div style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}>{T.ageMinorDesc}</div>
        </button>
      </div>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginTop: "1.25rem", textAlign: "center" }}>
        {T.agePrivacy}
      </p>
    </div>
  );
}

export function FindCarePage() {
  const { lang } = useLang();
  const T = t[lang].findCare;

  const [step, setStep] = useState<Step>("age");
  const [answers, setAnswers] = useState<Partial<Answers>>({});

  const CARE_OPTION_LABELS = [
    { title: T.careTitle, description: "Routine checkups, preventive care, referrals, and general health management." },
    { title: "Sexual Health Care", description: "STI testing and treatment, PrEP/PEP, contraception, and sexual wellness." },
    { title: "Mental Health Care", description: "Therapy, counseling, and support for mental health and identity-related concerns." },
    { title: "Gender Affirming Care", description: "Hormone therapy, transition support, surgical referrals, and letters of support." },
    { title: "Help me choose", description: "Not sure where to start? Answer a few questions and we'll suggest a direction." },
  ];

  const HELP_Q1_LABELS = [
    "I want to start or continue hormone therapy or transition-related care",
    "I'm experiencing mental health concerns: anxiety, depression, identity, or trauma",
    "I need STI testing, PrEP, or help with sexual health",
    "I need a general checkup or an ongoing primary care provider",
  ];

  const HELP_Q2_LABELS = [
    "I feel isolated or overwhelmed and would benefit from someone to talk to",
    "I want to explore or confirm what kind of care I need with a provider",
    "I have concerns about a recent sexual health situation or STI exposure",
    "I am questioning my gender or want support navigating transition",
  ];

  const getPhase = (): 0 | 1 | 2 | 3 | 4 => {
    if (step === "age") return 0;
    if (step === "care" || step === "help-choose-1" || step === "help-choose-2") return 1;
    if (step === "insurance") return 2;
    if (step === "transport") return 3;
    return 4;
  };

  const careIdx = answers.careType !== undefined ? CARE_TO_IDX[answers.careType] : undefined;
  const insChoice = answers.hasInsurance ? (answers.hasInsurance === "yes" ? "left" : "right") as "left" | "right" : undefined;
  const transChoice = answers.hasTransportation ? (answers.hasTransportation === "yes" ? "left" : "right") as "left" | "right" : undefined;

  const showBackButton = step !== "age" && step !== "results" && step !== "youth-results";

  const goBack = () => {
    if (step === "care") setStep("age");
    else if (step === "help-choose-1") setStep("care");
    else if (step === "help-choose-2") setStep("help-choose-1");
    else if (step === "insurance") setStep("care");
    else if (step === "transport") setStep("insurance");
  };

  const chooseCare = (id: string) => {
    if (id === "help") setStep("help-choose-1");
    else { setAnswers(a => ({ ...a, careType: id })); setStep("insurance"); }
  };

  const chooseHelpCare = (care: string) => {
    setAnswers(a => ({ ...a, careType: care }));
    setStep("insurance");
  };

  const restart = () => { setAnswers({}); setStep("age"); };

  const showTree = step !== "results" && step !== "youth-results";

  const treeLabel = step === "age" ? T.treeLabel1 : step === "care" ? T.treeLabel2 : T.treeLabel3;

  return (
    <div style={{ minHeight: "60vh" }}>
      {showBackButton && (
        <div style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "0.6rem 1.5rem" }}>
            <button
              onClick={goBack}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
              style={{ background: "var(--secondary)", color: "var(--primary)", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
            >
              <ChevronLeft size={15} /> {T.back}
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {showTree && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.72rem", marginBottom: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {treeLabel}
            </p>
            <GrowingTree
              phase={getPhase()}
              careIdx={careIdx}
              insChoice={insChoice}
              transChoice={transChoice}
              showLabels={step === "care"}
            />
          </div>
        )}

        {/* AGE QUESTION */}
        {step === "age" && (
          <AgeCard
            T={T}
            onAdult={() => { setAnswers(a => ({ ...a, isAdult: true })); setStep("care"); }}
            onMinor={() => { setAnswers(a => ({ ...a, isAdult: false })); setStep("youth-results"); }}
          />
        )}

        {/* CARE SELECTION */}
        {step === "care" && (
          <div>
            <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.4rem" }}>{T.careTitle}</h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{T.careSubtitle}</p>
            <div className="flex flex-col gap-3">
              {CARE_OPTIONS.map((opt, idx) => (
                <ChoiceCard key={opt.id} icon={opt.icon} title={CARE_OPTION_LABELS[idx].title} description={CARE_OPTION_LABELS[idx].description} accent={opt.accent} onClick={() => chooseCare(opt.id)} />
              ))}
            </div>
          </div>
        )}

        {/* HELP Q1 */}
        {step === "help-choose-1" && (
          <div>
            <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.4rem" }}>{T.helpQ1Title}</h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{T.helpQ1Subtitle}</p>
            <div className="flex flex-col gap-3">
              {HELP_Q1_OPTIONS.map((opt, idx) => helpOpt(HELP_Q1_LABELS[idx], opt.accent, () => chooseHelpCare(opt.care)))}
              <button
                onClick={() => setStep("help-choose-2")}
                className="w-full text-left rounded-2xl px-5 py-4"
                style={{ background: "transparent", border: "2px dashed var(--border)", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "0.9rem" }}
              >
                {T.helpNone}
              </button>
            </div>
          </div>
        )}

        {/* HELP Q2 */}
        {step === "help-choose-2" && (
          <div>
            <h2 style={{ fontWeight: 700, color: "var(--foreground)", marginBottom: "0.4rem" }}>{T.helpQ2Title}</h2>
            <p style={{ color: "var(--muted-foreground)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>{T.helpQ2Subtitle}</p>
            <div className="flex flex-col gap-3">
              {HELP_Q2_OPTIONS.map((opt, idx) => helpOpt(HELP_Q2_LABELS[idx], opt.accent, () => chooseHelpCare(opt.care)))}
            </div>
            <div className="mt-4 rounded-2xl p-4" style={{ background: "var(--secondary)", border: "1px dashed var(--primary)" }}>
              <p style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.3rem" }}>{T.stillUnsure}</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                {T.stillUnsureText}{" "}
                <button onClick={() => chooseHelpCare("Primary Care")} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: "0.82rem" }}>
                  {T.stillUnsureLink}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* INSURANCE */}
        {step === "insurance" && (
          <div>
            <div className="mb-4 rounded-xl px-4 py-2 inline-block" style={{ background: "var(--secondary)" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.82rem", fontWeight: 700 }}>{T.lookingFor} {answers.careType}</span>
            </div>
            <YesNoCard
              question={T.insuranceQ}
              subtext={T.insuranceHint}
              onYes={() => { setAnswers(a => ({ ...a, hasInsurance: "yes" })); setStep("transport"); }}
              onNo={() => { setAnswers(a => ({ ...a, hasInsurance: "no" })); setStep("transport"); }}
              onUnsure={() => { setAnswers(a => ({ ...a, hasInsurance: "unsure" })); setStep("transport"); }}
              yesLabel={T.yesInsurance}
              noLabel={T.noInsurance}
              unsureLabel={T.unsureInsurance}
            />
          </div>
        )}

        {/* TRANSPORT */}
        {step === "transport" && (
          <div>
            <div className="mb-4 rounded-xl px-4 py-2 inline-block" style={{ background: "var(--secondary)" }}>
              <span style={{ color: "var(--primary)", fontSize: "0.82rem", fontWeight: 700 }}>{T.lookingFor} {answers.careType}</span>
            </div>
            <YesNoCard
              question={T.transportQ}
              subtext={T.transportHint}
              onYes={() => { setAnswers(a => ({ ...a, hasTransportation: "yes" })); setStep("results"); }}
              onNo={() => { setAnswers(a => ({ ...a, hasTransportation: "no" })); setStep("results"); }}
              onUnsure={() => { setAnswers(a => ({ ...a, hasTransportation: "limited" })); setStep("results"); }}
              yesLabel={T.yesTransport}
              noLabel={T.noTransport}
              unsureLabel={T.unsureTransport}
            />
          </div>
        )}

        {/* ADULT RESULTS */}
        {step === "results" && answers.careType && answers.hasInsurance && answers.hasTransportation && (
          <ResultsPage
            answers={{ careType: answers.careType, hasInsurance: answers.hasInsurance, hasTransportation: answers.hasTransportation }}
            onRestart={restart}
          />
        )}

        {/* YOUTH RESULTS */}
        {step === "youth-results" && (
          <YouthResultsPage onRestart={restart} />
        )}
      </div>
    </div>
  );
}
