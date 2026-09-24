import { useEffect, useId, useRef, useState } from "react";

/**
 * Plan-view drawing of a property showing where each device goes and what it covers:
 * camera and motion-sensor fields of view (wedges), detector coverage (circles), door contacts
 * and panels (points). Examples only. Real plans come from the site survey.
 */

type Rect = [x: number, y: number, w: number, h: number];
type Area = { x: number; y: number; w: number; h: number; label: string; tone: "building" | "ground" | "hard"; lx?: number; ly?: number; size?: number };
/** `n` is the legend number. Devices that share `n` share one legend entry (e.g. a grid of detectors). */
type Device = { n: number; x: number; y: number; shape: "wedge" | "circle" | "point"; dir?: number; fov?: number; r?: number; clip?: Rect; label: string };
type Plan = { title: string; summary: string; areas: Area[]; party?: [number, number, number, number]; devices: Device[]; links?: number[][]; note?: string };

// Shared site layouts, so the same house and the same warehouse appear on every service page.
const HOUSE: Area[] = [
  { x: 40, y: 24, w: 336, h: 166, label: "Rear garden", tone: "ground" },
  { x: 40, y: 190, w: 230, h: 170, label: "House", tone: "building" },
  { x: 270, y: 190, w: 106, h: 170, label: "Side passage", tone: "hard", ly: 300 },
  { x: 40, y: 360, w: 210, h: 92, label: "Front garden", tone: "ground", ly: 432 },
  { x: 250, y: 360, w: 126, h: 92, label: "Driveway", tone: "hard", ly: 432 },
];
const HOUSE_ROOMS: Area[] = [
  { x: 40, y: 24, w: 336, h: 166, label: "Rear garden", tone: "ground" },
  { x: 40, y: 190, w: 120, h: 80, label: "Kitchen", tone: "building", ly: 212 },
  { x: 160, y: 190, w: 110, h: 80, label: "Dining", tone: "building", ly: 212 },
  { x: 40, y: 270, w: 120, h: 90, label: "Living room", tone: "building", ly: 289 },
  { x: 160, y: 270, w: 40, h: 90, label: "Hall", tone: "building", ly: 286, size: 12 },
  { x: 200, y: 270, w: 70, h: 90, label: "Study", tone: "building", ly: 296 },
  { x: 270, y: 190, w: 106, h: 170, label: "Side passage", tone: "hard", ly: 300 },
  { x: 40, y: 360, w: 210, h: 92, label: "Front garden", tone: "ground", ly: 432 },
  { x: 250, y: 360, w: 126, h: 92, label: "Driveway", tone: "hard", ly: 432 },
];
const PARTY: [number, number, number, number] = [40, 190, 40, 360];
const WAREHOUSE: Area[] = [
  { x: 40, y: 60, w: 260, h: 230, label: "Warehouse", tone: "building" },
  { x: 40, y: 290, w: 120, h: 90, label: "Office", tone: "building" },
  { x: 160, y: 290, w: 216, h: 162, label: "Yard", tone: "hard", lx: 300, ly: 400 },
  { x: 300, y: 24, w: 76, h: 266, label: "Side lane", tone: "hard", lx: 338, ly: 250 },
  { x: 40, y: 24, w: 260, h: 36, label: "Rear lane", tone: "hard", lx: 110, ly: 47 },
];
const HOUSE_CLIP: Rect = [40, 190, 230, 170];
const WAREHOUSE_CLIP: Rect = [40, 60, 260, 230];

export const PLANS = {
  "cctv-home": {
    title: "Example coverage plan: semi-detached house",
    summary: "Four cameras cover every way onto the property.",
    party: PARTY, areas: HOUSE,
    devices: [
      { n: 1, x: 165, y: 362, shape: "wedge", dir: 90, fov: 74, r: 92, label: "Front door and path" },
      { n: 2, x: 266, y: 364, shape: "wedge", dir: 48, fov: 66, r: 118, label: "Driveway and car" },
      { n: 3, x: 274, y: 194, shape: "wedge", dir: 72, fov: 48, r: 170, label: "Side passage and gate" },
      { n: 4, x: 150, y: 188, shape: "wedge", dir: -90, fov: 96, r: 164, label: "Back door and rear garden" },
    ],
  },
  "cctv-business": {
    title: "Example coverage plan: warehouse and yard",
    summary: "Five cameras cover the entrance, bays, yard and perimeter.",
    areas: WAREHOUSE,
    devices: [
      { n: 1, x: 100, y: 382, shape: "wedge", dir: 90, fov: 76, r: 68, label: "Office entrance" },
      { n: 2, x: 174, y: 294, shape: "wedge", dir: 28, fov: 84, r: 130, label: "Loading bays" },
      { n: 3, x: 372, y: 296, shape: "wedge", dir: 128, fov: 70, r: 160, label: "Yard and gate" },
      { n: 4, x: 304, y: 62, shape: "wedge", dir: 88, fov: 34, r: 222, label: "Side lane" },
      { n: 5, x: 298, y: 58, shape: "wedge", dir: 180, fov: 26, r: 252, label: "Rear lane" },
    ],
  },
  "alarm-home": {
    title: "Example alarm plan: semi-detached house",
    summary: "Every door has a contact, and motion sensors cover the rooms someone would walk through.",
    party: PARTY, areas: HOUSE_ROOMS,
    devices: [
      { n: 1, x: 180, y: 322, shape: "point", label: "Panel and keypad by the front door" },
      { n: 2, x: 180, y: 360, shape: "point", label: "Front door contact" },
      { n: 3, x: 100, y: 190, shape: "point", label: "Back door contact" },
      { n: 4, x: 44, y: 356, shape: "wedge", dir: -45, fov: 90, r: 104, clip: [40, 270, 120, 90], label: "Motion sensor, living room" },
      { n: 5, x: 266, y: 194, shape: "wedge", dir: 158, fov: 76, r: 168, clip: [40, 190, 230, 80], label: "Motion sensor, kitchen and dining" },
      { n: 6, x: 236, y: 362, shape: "point", label: "External siren and strobe" },
    ],
  },
  "alarm-business": {
    title: "Example alarm plan: warehouse and office",
    summary: "Contacts on every door, including the roller doors, and motion sensors across the floor.",
    areas: WAREHOUSE,
    devices: [
      { n: 1, x: 70, y: 352, shape: "point", label: "Panel and keypad in the office" },
      { n: 2, x: 100, y: 380, shape: "point", label: "Office door contact" },
      { n: 3, x: 44, y: 64, shape: "wedge", dir: 45, fov: 90, r: 196, clip: WAREHOUSE_CLIP, label: "Motion sensors across the warehouse floor" },
      { n: 3, x: 296, y: 286, shape: "wedge", dir: -135, fov: 90, r: 196, clip: WAREHOUSE_CLIP, label: "Motion sensors across the warehouse floor" },
      { n: 4, x: 240, y: 290, shape: "point", label: "Roller door contacts on the loading bays" },
      { n: 5, x: 300, y: 170, shape: "point", label: "External siren and strobe" },
    ],
  },
  "fire-home": {
    title: "Example detector plan: semi-detached house, ground floor",
    summary: "Heat where there's cooking, smoke on the escape route, all linked together.",
    party: PARTY, areas: HOUSE_ROOMS,
    note: "Landing and bedrooms upstairs get the same treatment.",
    devices: [
      { n: 1, x: 100, y: 248, shape: "circle", r: 28, clip: HOUSE_CLIP, label: "Heat detector, kitchen" },
      { n: 2, x: 180, y: 330, shape: "circle", r: 34, clip: HOUSE_CLIP, label: "Smoke detector, hall" },
      { n: 3, x: 100, y: 330, shape: "circle", r: 36, clip: HOUSE_CLIP, label: "Smoke detector, living room" },
      { n: 4, x: 215, y: 248, shape: "circle", r: 30, clip: HOUSE_CLIP, label: "Smoke detector, dining" },
    ],
    links: [[100, 248], [215, 248], [180, 330], [100, 330]],
  },
  "fire-business": {
    title: "Example fire alarm plan: warehouse and office",
    summary: "Detection across every area, call points at the exits and the panel at the entrance.",
    areas: WAREHOUSE.map((w) => (w.label === "Office" ? { ...w, lx: 70, ly: 364 } : w.label === "Warehouse" ? { ...w, ly: 180 } : w)),
    devices: [
      { n: 1, x: 140, y: 362, shape: "point", label: "Fire alarm panel at the entrance" },
      { n: 2, x: 105, y: 125, shape: "circle", r: 58, clip: WAREHOUSE_CLIP, label: "Smoke detectors across the warehouse" },
      { n: 2, x: 235, y: 125, shape: "circle", r: 58, clip: WAREHOUSE_CLIP, label: "Smoke detectors across the warehouse" },
      { n: 2, x: 105, y: 228, shape: "circle", r: 58, clip: WAREHOUSE_CLIP, label: "Smoke detectors across the warehouse" },
      { n: 2, x: 235, y: 228, shape: "circle", r: 58, clip: WAREHOUSE_CLIP, label: "Smoke detectors across the warehouse" },
      { n: 3, x: 120, y: 318, shape: "circle", r: 26, clip: [40, 290, 120, 90], label: "Smoke detector, office" },
      { n: 4, x: 100, y: 380, shape: "point", label: "Manual call points at every exit" },
      { n: 4, x: 240, y: 290, shape: "point", label: "Manual call points at every exit" },
    ],
  },
} satisfies Record<string, Plan>;

export type PlanKey = keyof typeof PLANS;

const rad = (d: number) => (d * Math.PI) / 180;

function shapePath(d: Device) {
  const r = d.r ?? 0;
  if (d.shape === "circle") return `M${d.x - r} ${d.y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
  const dir = d.dir ?? 0, fov = d.fov ?? 60;
  const a1 = rad(dir - fov / 2), a2 = rad(dir + fov / 2);
  const p = (a: number) => `${(d.x + r * Math.cos(a)).toFixed(1)} ${(d.y + r * Math.sin(a)).toFixed(1)}`;
  return `M${d.x} ${d.y}L${p(a1)}A${r} ${r} 0 0 1 ${p(a2)}Z`;
}

const FILL = { building: "var(--surface-default)", ground: "var(--surface-sunken)", hard: "var(--surface-muted)" };

export function CoveragePlan({ plan: key }: { plan: PlanKey }) {
  const plan: Plan = PLANS[key];
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "armed" | "shown">("static");

  // One authored moment: coverage sweeps in when the plan scrolls into view.
  // Content is visible by default; reduced motion and no-JS never hide it.
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState("shown"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [key]);

  const legend = [...new Map(plan.devices.map((d) => [d.n, d.label])).entries()];
  const titleId = uid + "-t";
  return (
    <figure ref={ref} className={"cp cp-" + state} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--border-default)", background: "var(--surface-page)", overflow: "hidden" }}>
        <svg viewBox="0 0 400 500" role="img" aria-labelledby={titleId} style={{ width: "100%", height: "auto" }}>
          <title id={titleId}>{plan.title}. {plan.summary}</title>
          <defs>
            <clipPath id={uid + "-site"}><rect x="24" y="24" width="352" height="428" /></clipPath>
            {plan.devices.map((d, i) => d.clip && <clipPath key={i} id={`${uid}-c${i}`}><rect x={d.clip[0]} y={d.clip[1]} width={d.clip[2]} height={d.clip[3]} /></clipPath>)}
          </defs>
          <rect x="0" y="452" width="400" height="48" fill="var(--stone-100)" />
          <text x="200" y="481" textAnchor="middle" style={{ font: "500 12px var(--font-sans)", fill: "var(--text-tertiary)" }}>Road</text>
          {plan.areas.map((a) => (
            <rect key={a.label} x={a.x} y={a.y} width={a.w} height={a.h} fill={FILL[a.tone]} stroke={a.tone === "building" ? "var(--stone-400)" : "var(--border-default)"} strokeWidth={a.tone === "building" ? 1.5 : 1} />
          ))}
          {plan.party && <line x1={plan.party[0]} y1={plan.party[1]} x2={plan.party[2]} y2={plan.party[3]} stroke="var(--stone-600)" strokeWidth="4" />}
          <rect x="24" y="24" width="352" height="428" fill="none" stroke="var(--stone-300)" strokeDasharray="4 5" />
          <g clipPath={`url(#${uid}-site)`}>
            {plan.devices.map((d, i) => d.shape !== "point" && (
              <g key={i} clipPath={d.clip ? `url(#${uid}-c${i})` : undefined}>
                <path className="cp-fov" d={shapePath(d)} style={{ transitionDelay: i * 120 + "ms" }} fill="var(--navy-500)" fillOpacity="0.16" stroke="var(--navy-500)" strokeOpacity="0.55" strokeWidth="1" />
              </g>
            ))}
          </g>
          {plan.links && <polyline className="cp-fov" points={plan.links.map((p) => p.join(",")).join(" ")} fill="none" stroke="var(--navy-700)" strokeWidth="1.5" strokeDasharray="3 4" style={{ transitionDelay: plan.devices.length * 120 + "ms" }} />}
          {plan.areas.map((a) => (
            <text key={a.label} x={a.lx ?? a.x + a.w / 2} y={a.ly ?? a.y + a.h / 2 + 4} textAnchor="middle" style={{ font: `${a.tone === "building" ? 600 : 500} ${a.size ?? 13}px var(--font-sans)`, fill: a.tone === "building" ? "var(--text-primary)" : "var(--text-secondary)", stroke: FILL[a.tone], strokeWidth: 4, strokeLinejoin: "round", paintOrder: "stroke" }}>{a.label}</text>
          ))}
          {plan.devices.map((d, i) => (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r="11" fill="var(--navy-700)" stroke="var(--surface-default)" strokeWidth="2.5" />
              <text x={d.x} y={d.y + 4.5} textAnchor="middle" style={{ font: "700 12px var(--font-sans)", fill: "#fff" }}>{d.n}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{plan.title}. {plan.summary}{plan.note ? " " + plan.note : ""}</span>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "8px 20px", fontSize: "var(--text-body-sm)" }}>
          {legend.map(([n, label]) => (
            <li key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden style={{ width: 22, height: 22, flex: "none", borderRadius: "50%", background: "var(--navy-700)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "700 12px var(--font-sans)" }}>{n}</span>
              <span>{label}</span>
            </li>
          ))}
          {plan.links && (
            <li style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg aria-hidden width="22" height="22" viewBox="0 0 22 22" style={{ flex: "none" }}><line x1="1" y1="11" x2="21" y2="11" stroke="var(--navy-700)" strokeWidth="1.5" strokeDasharray="3 4" /></svg>
              <span>Interlinked: when one sounds, they all sound</span>
            </li>
          )}
        </ol>
      </figcaption>
    </figure>
  );
}
