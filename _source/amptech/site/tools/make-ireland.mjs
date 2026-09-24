#!/usr/bin/env node
// Generates src/data/ireland.js: the island of Ireland (one landmass, no
// border) projected into a fixed viewBox, a simplified coastline path, a hex
// dot grid inside the island (run-length encoded per row), and the city-light
// sources the About map uses to make the night view.
//
//   node tools/make-ireland.mjs
//
// Source: world-atlas land-10m (Natural Earth 1:10m land, public domain).
// Projection: equirectangular with a cos(lat) correction at the island's
// middle latitude. Accurate enough for a map this size.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { company } from '../src/data/content.js';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../src/data/ireland.js');

const topo = JSON.parse(fs.readFileSync(require.resolve('world-atlas/land-10m.json'), 'utf8'));
const land = feature(topo, topo.objects.land).features[0].geometry;

// Every land polygon whose centroid sits in Ireland's box. Great Britain,
// Islay and Man fall outside it; Achill, Aran, Rathlin and friends fall in.
const centroid = (ring) => {
  let x = 0;
  let y = 0;
  for (const [lng, lat] of ring) {
    x += lng;
    y += lat;
  }
  return [x / ring.length, y / ring.length];
};
const rings = land.coordinates
  .filter((poly) => {
    const [lng, lat] = centroid(poly[0]);
    return lng > -10.8 && lng < -5.3 && lat > 51.2 && lat < 55.45;
  })
  .map((poly) => poly[0]);

// ---- Projection -----------------------------------------------------------
let minLng = Infinity;
let maxLng = -Infinity;
let minLat = Infinity;
let maxLat = -Infinity;
for (const ring of rings) {
  for (const [lng, lat] of ring) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
}
const S = 190; // viewBox units per degree of latitude
const PAD = 28;
const lat0 = (minLat + maxLat) / 2;
const k = Math.cos((lat0 * Math.PI) / 180);
const W = Math.round((maxLng - minLng) * k * S + PAD * 2);
const H = Math.round((maxLat - minLat) * S + PAD * 2);
const project = (lat, lng) => [(lng - minLng) * k * S + PAD, (maxLat - lat) * S + PAD];
const kmPerUnit = 111.32 / S;

const projected = rings.map((ring) => ring.map(([lng, lat]) => project(lat, lng)));

// ---- Simplify (Ramer–Douglas–Peucker) ------------------------------------
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const sq = tolerance * tolerance;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = dx * dx + dy * dy;
    let maxD = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      let t = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0;
      t = Math.max(0, Math.min(1, t));
      const ex = ax + t * dx - px;
      const ey = ay + t * dy - py;
      const d = ex * ex + ey * ey;
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > sq && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

const area = (ring) => {
  let s = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    s += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return Math.abs(s / 2);
};

const outlineRings = projected
  .map((ring) => simplify(ring, 0.7))
  .filter((ring) => ring.length > 3 && area(ring) > 4);

const r1 = (n) => Math.round(n * 10) / 10;
// Compact number: no leading zero, sign doubles as the separator.
const num = (n) => String(r1(n)).replace(/^(-?)0\./, '$1.');
const pair = (a, b) => {
  const sa = num(a);
  const sb = num(b);
  return sa + (sb.startsWith('-') ? '' : ' ') + sb;
};
const outline = outlineRings
  .map((ring) => {
    let px = r1(ring[0][0]);
    let py = r1(ring[0][1]);
    const parts = [];
    for (let i = 1; i < ring.length; i++) {
      const x = r1(ring[i][0]);
      const y = r1(ring[i][1]);
      if (x === px && y === py) continue;
      parts.push(pair(x - px, y - py));
      px = x;
      py = y;
    }
    // Implicit lineto after the first pair; a leading '-' is its own separator.
    let body = parts[0];
    for (let i = 1; i < parts.length; i++) body += parts[i].startsWith('-') ? parts[i] : ' ' + parts[i];
    return `M${pair(r1(ring[0][0]), r1(ring[0][1]))}l${body}z`;
  })
  .join('');

// ---- Dot grid ------------------------------------------------------------
const inside = (x, y) => {
  let hit = false;
  for (const ring of projected) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
  }
  return hit;
};

const step = 9.6;
const rowStep = Math.round(step * 0.866 * 100) / 100;
const x0 = PAD / 2;
const y0 = PAD / 2;
const cols = Math.ceil((W - x0) / step);
const rowsN = Math.ceil((H - y0) / rowStep);
const rows = [];
let count = 0;
for (let j = 0; j < rowsN; j++) {
  const y = y0 + j * rowStep;
  const off = (j % 2) * (step / 2);
  const runs = [];
  let start = -1;
  for (let i = 0; i <= cols; i++) {
    const on = i < cols && inside(x0 + off + i * step, y);
    if (on && start < 0) start = i;
    if (!on && start >= 0) {
      runs.push(start, i - 1);
      count += i - start;
      start = -1;
    }
  }
  if (runs.length) rows.push([j, ...runs]);
}

// ---- Light sources --------------------------------------------------------
// [lat, lng, weight, sigma in km]. Dublin and Leixlip carry the glow; the
// other cities and towns are faint, so the island reads like a night view.
const sources = [
  [53.349, -6.26, 1.0, 9],
  [53.34, -6.3, 0.45, 20],
  [company.geo.lat, company.geo.lng, 0.7, 5],
  [53.381, -6.591, 0.3, 4], // Maynooth
  [53.34, -6.45, 0.35, 5], // Lucan
  [53.216, -6.666, 0.22, 5], // Naas
  [54.597, -5.93, 0.62, 9], // Belfast
  [54.51, -6.04, 0.26, 6], // Lisburn
  [51.898, -8.475, 0.55, 8], // Cork
  [52.664, -8.627, 0.4, 7], // Limerick
  [53.271, -9.057, 0.38, 6], // Galway
  [52.259, -7.11, 0.3, 5], // Waterford
  [54.997, -7.309, 0.32, 5], // Derry
  [53.718, -6.348, 0.24, 4], // Drogheda
  [54.0, -6.405, 0.22, 4], // Dundalk
  [54.176, -6.349, 0.16, 4], // Newry
  [52.654, -7.244, 0.18, 4], // Kilkenny
  [53.423, -7.94, 0.18, 4], // Athlone
  [54.277, -8.476, 0.18, 4], // Sligo
  [54.95, -7.73, 0.16, 4], // Letterkenny
  [52.27, -9.7, 0.16, 4], // Tralee
  [52.84, -8.98, 0.14, 4], // Ennis
  [52.336, -6.463, 0.14, 4], // Wexford
  [53.652, -6.681, 0.16, 4], // Navan
  [53.19, -6.1, 0.2, 4], // Bray
  [52.84, -6.93, 0.12, 4], // Carlow
  [53.53, -7.34, 0.12, 4], // Mullingar
  [54.34, -7.63, 0.12, 4], // Enniskillen
  [54.86, -6.28, 0.12, 4], // Ballymena
];
const lights = sources.map(([lat, lng, w, sigma]) => {
  const [x, y] = project(lat, lng);
  return [r1(x), r1(y), w, r1(sigma / kmPerUnit)];
});

const [lx, ly] = project(company.geo.lat, company.geo.lng);

const file = `// Generated by tools/make-ireland.mjs. Do not edit by hand.
// The island of Ireland from Natural Earth 1:10m land (via world-atlas),
// equirectangular with a cos(${r1(lat0)}°) correction, ${S} units per degree of latitude.

/** [width, height] of the map's viewBox. */
export const viewBox = [${W}, ${H}];

/** Kilometres per viewBox unit. */
export const kmPerUnit = ${kmPerUnit.toFixed(5)};

/** Coastline, simplified. */
export const outline = '${outline}';

/**
 * Hex dot grid inside the island (${count} dots). Row j sits at y0 + j * rowStep,
 * odd rows shift right by step / 2. Each row is [j, start, end, start, end, ...]:
 * inclusive runs of column indices, x = x0 + offset + i * step.
 */
export const grid = {
  step: ${step},
  rowStep: ${rowStep},
  x0: ${x0},
  y0: ${y0},
  rows: ${JSON.stringify(rows)},
};

/** Leixlip (company.geo) in viewBox units. */
export const leixlip = [${r1(lx)}, ${r1(ly)}];

/** City-light sources: [x, y, weight, sigma] in viewBox units. */
export const lights = ${JSON.stringify(lights)};

/** City glow at a point: the sum of every light source's gaussian. */
export function glow(x, y) {
  let b = 0;
  for (const [lx, ly, w, s] of lights) {
    const dx = x - lx;
    const dy = y - ly;
    const d2 = dx * dx + dy * dy;
    if (d2 < 9 * s * s) b += w * Math.exp(-d2 / (2 * s * s));
  }
  return b;
}

/** Expand the grid into a flat [x0, y0, x1, y1, ...] array. */
export function gridPoints(g = grid) {
  const pts = [];
  for (const row of g.rows) {
    const y = g.y0 + row[0] * g.rowStep;
    const off = (row[0] % 2) * (g.step / 2);
    for (let r = 1; r < row.length; r += 2) {
      for (let i = row[r]; i <= row[r + 1]; i++) pts.push(g.x0 + off + i * g.step, y);
    }
  }
  return pts;
}
`;

fs.writeFileSync(out, file);
console.log(
  `ireland.js: viewBox ${W}x${H}, ${outlineRings.length} rings, ${outlineRings.reduce((n, r) => n + r.length, 0)} outline points, ${count} dots, ${(file.length / 1024).toFixed(1)} KB. Leixlip at ${r1(lx)}, ${r1(ly)}`,
);
