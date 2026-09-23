import { useEffect, useRef, useState } from "react";

/**
 * Plan-view drawing of a property with each camera's field of view.
 * Illustrates "coverage-led design": where cameras go and what each one sees.
 * Examples only. Real plans come from the site survey.
 */

type Area = { x: number; y: number; w: number; h: number; label: string; tone: "building" | "ground" | "hard"; lx?: number; ly?: number };
type Camera = { x: number; y: number; dir: number; fov: number; r: number; covers: string };
type Plan = { title: string; summary: string; areas: Area[]; party?: [number, number, number, number]; cameras: Camera[] };

const PLANS: Record<"home" | "business", Plan> = {
  home: {
    title: "Example coverage plan: semi-detached house",
    summary: "Four cameras cover every way onto the property.",
    party: [40, 190, 40, 360],
    areas: [
      { x: 40, y: 24, w: 336, h: 166, label: "Rear garden", tone: "ground" },
      { x: 40, y: 190, w: 230, h: 170, label: "House", tone: "building" },
      { x: 270, y: 190, w: 106, h: 170, label: "Side passage", tone: "hard", ly: 300 },
      { x: 40, y: 360, w: 210, h: 92, label: "Front garden", tone: "ground", ly: 432 },
      { x: 250, y: 360, w: 126, h: 92, label: "Driveway", tone: "hard", ly: 432 },
    ],
    cameras: [
      { x: 165, y: 362, dir: 90, fov: 74, r: 92, covers: "Front door and path" },
      { x: 266, y: 364, dir: 48, fov: 66, r: 118, covers: "Driveway and car" },
      { x: 274, y: 194, dir: 72, fov: 48, r: 170, covers: "Side passage and gate" },
      { x: 150, y: 188, dir: -90, fov: 96, r: 164, covers: "Back door and rear garden" },
    ],
  },
  business: {
    title: "Example coverage plan: warehouse and yard",
    summary: "Five cameras cover the entrance, bays, yard and perimeter.",
    areas: [
      { x: 40, y: 60, w: 260, h: 230, label: "Warehouse", tone: "building" },
      { x: 40, y: 290, w: 120, h: 90, label: "Office", tone: "building" },
      { x: 160, y: 290, w: 216, h: 162, label: "Yard", tone: "hard", lx: 300, ly: 400 },
      { x: 300, y: 24, w: 76, h: 266, label: "Side lane", tone: "hard", lx: 338, ly: 250 },
      { x: 40, y: 24, w: 260, h: 36, label: "Rear lane", tone: "hard", lx: 110, ly: 47 },
    ],
    cameras: [
      { x: 100, y: 382, dir: 90, fov: 76, r: 68, covers: "Office entrance" },
      { x: 174, y: 294, dir: 28, fov: 84, r: 130, covers: "Loading bays" },
      { x: 372, y: 296, dir: 128, fov: 70, r: 160, covers: "Yard and gate" },
      { x: 304, y: 62, dir: 88, fov: 34, r: 222, covers: "Side lane" },
      { x: 298, y: 58, dir: 180, fov: 26, r: 252, covers: "Rear lane" },
    ],
  },
};

const rad = (d: number) => (d * Math.PI) / 180;

function wedge({ x, y, dir, fov, r }: Camera) {
  const a1 = rad(dir - fov / 2), a2 = rad(dir + fov / 2);
  const p1 = [x + r * Math.cos(a1), y + r * Math.sin(a1)];
  const p2 = [x + r * Math.cos(a2), y + r * Math.sin(a2)];
  return `M${x} ${y}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}A${r} ${r} 0 0 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z`;
}

const FILL = { building: "var(--surface-default)", ground: "var(--surface-sunken)", hard: "var(--surface-muted)" };

export function CoveragePlan({ variant = "home" }: { variant?: "home" | "business" }) {
  const plan = PLANS[variant];
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "armed" | "shown">("static");

  // One authored moment: fields of view sweep in when the plan scrolls into view.
  // Content is visible by default; reduced motion and no-JS never hide it.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState("shown"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  const clipId = "cp-clip-" + variant;
  return (
    <figure ref={ref} className={"cp cp-" + state} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--border-default)", background: "var(--surface-page)", overflow: "hidden" }}>
        <svg viewBox="0 0 400 500" role="img" aria-labelledby={clipId + "-t"} style={{ width: "100%", height: "auto" }}>
          <title id={clipId + "-t"}>{plan.title}. {plan.summary}</title>
          <defs>
            <clipPath id={clipId}><rect x="24" y="24" width="352" height="428" /></clipPath>
          </defs>
          {/* Road */}
          <rect x="0" y="452" width="400" height="48" fill="var(--stone-100)" />
          <text x="200" y="481" textAnchor="middle" style={{ font: "500 12px var(--font-sans)", fill: "var(--text-tertiary)" }}>Road</text>
          {/* Areas */}
          {plan.areas.map((a) => (
            <rect key={a.label} x={a.x} y={a.y} width={a.w} height={a.h} fill={FILL[a.tone]} stroke={a.tone === "building" ? "var(--stone-400)" : "var(--border-default)"} strokeWidth={a.tone === "building" ? 1.5 : 1} />
          ))}
          {plan.party && <line x1={plan.party[0]} y1={plan.party[1]} x2={plan.party[2]} y2={plan.party[3]} stroke="var(--stone-600)" strokeWidth="4" />}
          {/* Boundary */}
          <rect x="24" y="24" width="352" height="428" fill="none" stroke="var(--stone-300)" strokeDasharray="4 5" />
          {/* Fields of view */}
          <g clipPath={`url(#${clipId})`}>
            {plan.cameras.map((c, i) => (
              <path key={i} className="cp-fov" d={wedge(c)} style={{ transitionDelay: i * 140 + "ms" }} fill="var(--navy-500)" fillOpacity="0.16" stroke="var(--navy-500)" strokeOpacity="0.55" strokeWidth="1" />
            ))}
          </g>
          {/* Area labels */}
          {plan.areas.map((a) => (
            <text key={a.label} x={a.lx ?? a.x + a.w / 2} y={a.ly ?? a.y + a.h / 2 + 4} textAnchor="middle" style={{ font: `${a.tone === "building" ? 600 : 500} 13px var(--font-sans)`, fill: a.tone === "building" ? "var(--text-primary)" : "var(--text-secondary)" }}>{a.label}</text>
          ))}
          {/* Cameras */}
          {plan.cameras.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y} r="11" fill="var(--navy-700)" stroke="var(--surface-default)" strokeWidth="2.5" />
              <text x={c.x} y={c.y + 4.5} textAnchor="middle" style={{ font: "700 12px var(--font-sans)", fill: "#fff" }}>{i + 1}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{plan.title}. {plan.summary}</span>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "8px 20px", fontSize: "var(--text-body-sm)" }}>
          {plan.cameras.map((c, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden style={{ width: 22, height: 22, flex: "none", borderRadius: "50%", background: "var(--navy-700)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "700 12px var(--font-sans)" }}>{i + 1}</span>
              <span><span className="ds-sr-only">Camera {i + 1}: </span>{c.covers}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
