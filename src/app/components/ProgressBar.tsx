interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-7">
      <div className="flex justify-between mb-1.5" style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", fontWeight: 600 }}>
        <span>Step {current} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "var(--accent)" }}
        />
      </div>
    </div>
  );
}
