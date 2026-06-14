interface BranchLogoProps {
  size?: number;
}

export function BranchLogo({ size = 28 }: BranchLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 34"
      fill="none"
      aria-hidden="true"
    >
      {/* Trunk */}
      <line x1="16" y1="33" x2="16" y2="22" stroke="#2F6F6D" strokeWidth="2.8" strokeLinecap="round" />

      {/* Level 1 branches */}
      <line x1="16" y1="22" x2="8" y2="15" stroke="#2F6F6D" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="24" y2="15" stroke="#2F6F6D" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="16" y2="14" stroke="#2F6F6D" strokeWidth="2" strokeLinecap="round" />

      {/* Level 2 — left branch */}
      <line x1="8" y1="15" x2="4" y2="9" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />
      <line x1="8" y1="15" x2="10" y2="8" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />

      {/* Level 2 — center branch */}
      <line x1="16" y1="14" x2="12" y2="7" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />
      <line x1="16" y1="14" x2="20" y2="7" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />

      {/* Level 2 — right branch */}
      <line x1="24" y1="15" x2="22" y2="8" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />
      <line x1="24" y1="15" x2="28" y2="9" stroke="#3D8A87" strokeWidth="1.35" strokeLinecap="round" />

      {/* Level 3 — from (4,9) */}
      <line x1="4" y1="9" x2="1" y2="5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="4" y1="9" x2="5.5" y2="4.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Level 3 — from (10,8) */}
      <line x1="10" y1="8" x2="7.5" y2="3.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="10" y1="8" x2="12" y2="3.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Level 3 — from (12,7) */}
      <line x1="12" y1="7" x2="10" y2="2.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="12" y1="7" x2="13.5" y2="2" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Level 3 — from (20,7) */}
      <line x1="20" y1="7" x2="18.5" y2="2" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="20" y1="7" x2="22" y2="2.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Level 3 — from (22,8) */}
      <line x1="22" y1="8" x2="20" y2="3.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="22" y1="8" x2="24.5" y2="3.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Level 3 — from (28,9) */}
      <line x1="28" y1="9" x2="26.5" y2="4.5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />
      <line x1="28" y1="9" x2="31" y2="5" stroke="#5BA39F" strokeWidth="0.85" strokeLinecap="round" />

      {/* Leaf clusters at all level-3 tips */}
      <circle cx="1" cy="5" r="2.1" fill="#52b788" />
      <circle cx="5.5" cy="4.5" r="2" fill="#40916c" />
      <circle cx="7.5" cy="3.5" r="2" fill="#74c69d" />
      <circle cx="12" cy="3.5" r="2.1" fill="#52b788" />
      <circle cx="10" cy="2.5" r="1.8" fill="#2d6a4f" />
      <circle cx="13.5" cy="2" r="1.8" fill="#40916c" />
      <circle cx="18.5" cy="2" r="1.8" fill="#40916c" />
      <circle cx="22" cy="2.5" r="1.8" fill="#2d6a4f" />
      <circle cx="20" cy="3.5" r="2.1" fill="#52b788" />
      <circle cx="24.5" cy="3.5" r="2" fill="#74c69d" />
      <circle cx="26.5" cy="4.5" r="2" fill="#40916c" />
      <circle cx="31" cy="5" r="2.1" fill="#52b788" />

      {/* Small accent leaf dots for fullness */}
      <circle cx="3" cy="3" r="1.2" fill="#74c69d" />
      <circle cx="8.5" cy="1.5" r="1.2" fill="#6FAF9B" />
      <circle cx="16" cy="0.8" r="1.4" fill="#52b788" />
      <circle cx="23.5" cy="1.5" r="1.2" fill="#6FAF9B" />
      <circle cx="29" cy="3" r="1.2" fill="#74c69d" />
    </svg>
  );
}
