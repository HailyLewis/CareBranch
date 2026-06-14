interface YesNoCardProps {
  question: string;
  subtext?: string;
  onYes: () => void;
  onNo: () => void;
  onUnsure?: () => void;
  yesLabel?: string;
  noLabel?: string;
  unsureLabel?: string;
}

export function YesNoCard({
  question,
  subtext,
  onYes,
  onNo,
  onUnsure,
  yesLabel = "Yes",
  noLabel = "No",
  unsureLabel = "I'm not sure",
}: YesNoCardProps) {
  const base: React.CSSProperties = {
    flex: 1,
    padding: "0.875rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    background: "var(--card)",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    transition: "all 0.15s",
    color: "var(--foreground)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };

  return (
    <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <p style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: subtext ? "0.4rem" : "1.5rem", color: "var(--foreground)", lineHeight: 1.4 }}>
        {question}
      </p>
      {subtext && (
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.85rem", marginBottom: "1.5rem", lineHeight: 1.65 }}>
          {subtext}
        </p>
      )}
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2.5">
          <button
            style={{ ...base }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--accent)";
              el.style.background = "#EAF4F2";
              el.style.color = "var(--primary)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--card)";
              el.style.color = "var(--foreground)";
            }}
            onClick={onYes}
          >
            ✓ {yesLabel}
          </button>
          <button
            style={{ ...base }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#B9A7E6";
              el.style.background = "#F3F0FB";
              el.style.color = "#5B4A8A";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--card)";
              el.style.color = "var(--foreground)";
            }}
            onClick={onNo}
          >
            {noLabel}
          </button>
        </div>
        {onUnsure && (
          <button
            style={{ ...base, flex: "unset", width: "100%", fontWeight: 500, color: "var(--muted-foreground)", fontSize: "0.85rem", background: "var(--secondary)" }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--primary)";
              el.style.color = "var(--primary)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--muted-foreground)";
            }}
            onClick={onUnsure}
          >
            {unsureLabel}
          </button>
        )}
      </div>
    </div>
  );
}
