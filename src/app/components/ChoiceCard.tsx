import { ReactNode } from "react";

interface ChoiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: string;
  onClick: () => void;
}

export function ChoiceCard({ icon, title, description, accent = "var(--primary)", onClick }: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl p-5 transition-all duration-150 group"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = accent;
        el.style.boxShadow = `0 4px 16px ${accent}22`;
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}18`, color: accent }}
        >
          {icon}
        </div>
        <div>
          <div style={{ color: "var(--foreground)", fontWeight: 700, marginBottom: "0.2rem", fontSize: "0.95rem" }}>{title}</div>
          <div style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", lineHeight: 1.6 }}>{description}</div>
        </div>
      </div>
    </button>
  );
}
