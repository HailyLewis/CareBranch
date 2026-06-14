import { useEffect, useRef } from "react";

export interface GrowingTreeProps {
  phase: 0 | 1 | 2 | 3 | 4;
  careIdx?: number;
  insChoice?: "left" | "right";
  transChoice?: "left" | "right";
  showLabels?: boolean;
}

export const CARE_TO_IDX: Record<string, number> = {
  "Primary Care": 0,
  "Sexual Health Care": 1,
  "Mental Health Care": 2,
  "Gender Affirming Care": 3,
};

// Logical canvas dimensions — drawing code always uses these coords
const LW = 600;
const LH = 300;

// Max branch depth per phase
const MAX_DEPTH: Record<number, number> = { 0: 1, 1: 3, 2: 5, 3: 7, 4: 8 };

// Fractal parameters
const TRUNK_LEN = 72;
const BRANCH_RATIO = 0.68;
const SPREAD_DEG = 27;

interface Branch {
  x1: number; y1: number;
  x2: number; y2: number;
  depth: number;
}

function buildBranches(maxD: number): Branch[] {
  const result: Branch[] = [];
  function recurse(x: number, y: number, angleDeg: number, len: number, d: number) {
    const rad = (angleDeg * Math.PI) / 180;
    const x2 = x + Math.cos(rad) * len;
    const y2 = y + Math.sin(rad) * len;
    result.push({ x1: x, y1: y, x2, y2, depth: d });
    if (d < maxD) {
      recurse(x2, y2, angleDeg - SPREAD_DEG, len * BRANCH_RATIO, d + 1);
      recurse(x2, y2, angleDeg + SPREAD_DEG, len * BRANCH_RATIO, d + 1);
    }
  }
  recurse(LW / 2, LH - 8, -90, TRUNK_LEN, 0);
  return result;
}

function branchColor(depth: number, maxD: number): string {
  const t = depth / Math.max(1, maxD);
  if (t < 0.25) return "#2F6F6D";
  if (t < 0.5)  return "#3D8A87";
  if (t < 0.75) return "#5BA39F";
  return "#7DB8B4";
}

function branchWidth(depth: number): number {
  return Math.max(0.7, 8.5 * Math.pow(0.62, depth));
}

const LEAF_COLORS = ["#2d6a4f", "#40916c", "#52b788", "#6FAF9B", "#74c69d", "#2F6F6D"];

export function GrowingTree({ phase }: GrowingTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // Size canvas to container, maintaining aspect ratio
    const containerW = Math.max(wrap.clientWidth || LW, 200);
    const scale = containerW / LW;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(LW * scale * dpr);
    canvas.height = Math.round(LH * scale * dpr);
    canvas.style.width = `${Math.round(LW * scale)}px`;
    canvas.style.height = `${Math.round(LH * scale)}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr * scale, dpr * scale);

    const maxD = MAX_DEPTH[phase] ?? 1;
    const branches = buildBranches(maxD);

    // Group branches by depth level for sequential animation
    const byDepth: Record<number, Branch[]> = {};
    branches.forEach(b => { (byDepth[b.depth] = byDepth[b.depth] || []).push(b); });

    const MS_PER_LEVEL = phase === 0 ? 600 : 320;
    const LEAF_DELAY = (maxD + 1) * MS_PER_LEVEL;
    const LEAF_DURATION = 700;

    let startTime: number | null = null;

    function draw(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, LW, LH);

      // Ground shadow
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(LW / 2, LH - 5, 62, 6, 0, 0, Math.PI * 2);
      const grd = ctx.createRadialGradient(LW / 2, LH - 5, 0, LW / 2, LH - 5, 62);
      grd.addColorStop(0, "rgba(111,175,155,0.22)");
      grd.addColorStop(1, "rgba(111,175,155,0)");
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();

      // Draw branches level by level, each animating from its parent to its tip
      for (let d = 0; d <= maxD; d++) {
        const levelBranches = byDepth[d] ?? [];
        const levelStart = d * MS_PER_LEVEL;
        const progress = Math.min(1, Math.max(0, (elapsed - levelStart) / MS_PER_LEVEL));
        if (progress <= 0) break;

        ctx.lineWidth = branchWidth(d);
        ctx.strokeStyle = branchColor(d, maxD);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        levelBranches.forEach(b => {
          const ex = b.x1 + (b.x2 - b.x1) * progress;
          const ey = b.y1 + (b.y2 - b.y1) * progress;
          ctx.beginPath();
          ctx.moveTo(b.x1, b.y1);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        });
      }

      // Leaves at phase 4
      if (phase === 4) {
        const leafProgress = Math.min(1, Math.max(0, (elapsed - LEAF_DELAY) / LEAF_DURATION));
        if (leafProgress > 0) {
          const tips = byDepth[maxD] ?? [];
          ctx.globalAlpha = leafProgress;
          tips.forEach((tip, ti) => {
            const count = 6;
            for (let li = 0; li < count; li++) {
              const angle = ((ti * 41 + li * 137.508) % 360) * (Math.PI / 180);
              const dist = 7 + (li % 4) * 5;
              const r = (3.5 + (li % 3) * 2) * Math.min(1, leafProgress * 2);
              const lx = tip.x2 + Math.cos(angle) * dist;
              const ly = tip.y2 + Math.sin(angle) * dist - 3;
              ctx.beginPath();
              ctx.arc(lx, ly, r, 0, Math.PI * 2);
              ctx.fillStyle = LEAF_COLORS[(ti * 3 + li) % LEAF_COLORS.length];
              ctx.fill();
            }
          });
          ctx.globalAlpha = 1;
        }
      }

      const totalMs = LEAF_DELAY + (phase === 4 ? LEAF_DURATION + 200 : 0);
      if (elapsed < totalMs) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return (
    <div ref={wrapRef} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block", maxWidth: "100%" }} />
    </div>
  );
}
