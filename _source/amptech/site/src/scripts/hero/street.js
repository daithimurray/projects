// The estate: pairs of two-storey semi-detached houses, their gardens and
// cobble-lock driveways, the footpath, kerb and road, a sodium streetlight,
// and the security hardware on "our" house. Geometry is merged per material
// so the whole street draws in a few dozen calls.
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RingGeometry,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as T from './textures.js';

export const W = 6.5; // half width (one house)
export const D = 8.2; // depth
export const EAVE = 5.3;
export const RIDGE = 8.3;
export const DRIVE = 3.6;
export const PITCH = 21.2; // pair to pair
const TH = Math.atan2(RIDGE - EAVE, D / 2);
const RC = Math.cos(TH);
const RS = Math.sin(TH);
const RL = Math.hypot(RIDGE - EAVE, D / 2) + 0.45; // slope + overhang
const EZ = -D / 2 + RC * RL; // eave line
const EY = RIDGE + 0.06 - RS * RL;

// Where the hardware lives on our house (right half of pair 0).
export const SPOTS = {
  flood: [6.22, 3.95, 0.2],
  floodAim: [7.9, 0, 2.3],
  cctv: [6.28, EY - 0.3, 0.24],
  led: [3.55, 4.79, 0.11],
  porch: [5.72, 1.98, 0.2],
  door: [5.0, 1.2, 0],
  lamp: [-0.7, 7.02, 8.55],
  lampAim: [-0.7, 0, 9.4],
};

/** Planar UVs from position, chosen by face normal, so textures keep real scale. */
function planarUV(g, s) {
  const p = g.attributes.position;
  const n = g.attributes.normal;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const z = p.getZ(i);
    const ax = Math.abs(n.getX(i));
    const ay = Math.abs(n.getY(i));
    const az = Math.abs(n.getZ(i));
    if (ay > 0.7) uv.setXY(i, x * s, -z * s);
    else if (ax > az) uv.setXY(i, z * s, y * s);
    else uv.setXY(i, x * s, y * s);
  }
}

class Kit {
  constructor() {
    this.parts = {};
  }
  add(key, g) {
    (this.parts[key] ||= []).push(g);
    return g;
  }
  box(key, w, h, d, x, y, z, rx = 0, ry = 0) {
    const g = new BoxGeometry(w, h, d);
    if (rx) g.rotateX(rx);
    if (ry) g.rotateY(ry);
    g.translate(x, y, z);
    return this.add(key, g);
  }
  cyl(key, r0, r1, h, x, y, z, seg = 10) {
    const g = new CylinderGeometry(r0, r1, h, seg);
    g.translate(x, y, z);
    return this.add(key, g);
  }
  flat(key, x0, x1, z0, z1, y = 0) {
    const g = new PlaneGeometry(x1 - x0, z1 - z0);
    g.rotateX(-Math.PI / 2);
    g.translate((x0 + x1) / 2, y, (z0 + z1) / 2);
    return this.add(key, g);
  }
  build(mats, uvScale = {}) {
    const group = new Group();
    for (const key in this.parts) {
      const g = mergeGeometries(this.parts[key]);
      if (uvScale[key]) planarUV(g, uvScale[key]);
      const m = new Mesh(g, mats[key]);
      m.name = key;
      group.add(m);
    }
    return group;
  }
}

// Triangle closing the roof at a gable end.
function gable(x, nx) {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute([x, EAVE, -D, x, EAVE, 0, x, RIDGE, -D / 2], 3));
  g.setAttribute('normal', new Float32BufferAttribute([nx, 0, 0, nx, 0, 0, nx, 0, 0], 3));
  g.setAttribute('uv', new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 2));
  g.setIndex(nx > 0 ? [1, 0, 2] : [0, 1, 2]);
  return g;
}

function massing(k) {
  k.box('render', 2 * W, EAVE, D, 0, EAVE / 2, -D / 2);
  k.add('render', gable(W, 1));
  k.add('render', gable(-W, -1));
  k.box('plinth', 2 * W + 0.04, 0.34, D + 0.04, 0, 0.17, -D / 2);
  const t = 0.14;
  for (const s of [1, -1]) {
    const cz = -D / 2 + s * (RC * RL / 2 + RS * t / 2);
    const cy = RIDGE + 0.06 - RS * RL / 2 + RC * t / 2;
    k.box('slate', 2 * W + 0.44, t, RL, 0, cy, cz, s * TH);
    for (const side of [1, -1]) {
      const bz = -D / 2 + s * (RC * RL / 2 - RS * 0.05);
      const by = RIDGE + 0.06 - RS * RL / 2 - RC * 0.05;
      k.box('pvc', 0.04, 0.26, RL, side * (W + 0.23), by, bz, s * TH);
    }
  }
  k.box('ridge', 2 * W + 0.46, 0.16, 0.32, 0, RIDGE + 0.2, -D / 2);
  k.box('pvc', 2 * W + 0.44, 0.24, 0.04, 0, EY - 0.04, EZ + 0.02);
  k.box('pvc', 2 * W + 0.4, 0.03, EZ, 0, EY - 0.15, EZ / 2);
  k.box('gutter', 2 * W + 0.52, 0.11, 0.12, 0, EY - 0.1, EZ + 0.1);
  for (const s of [1, -1]) k.cyl('gutter', 0.045, 0.045, EY - 0.1, s * (W - 0.14), (EY - 0.1) / 2, 0.08, 8);
  // Shared chimney on the party wall
  k.box('render', 0.74, 1.8, 1.08, 0, RIDGE + 0.45, -D / 2);
  k.box('cap', 0.88, 0.09, 1.22, 0, RIDGE + 1.38, -D / 2);
  for (const s of [1, -1]) k.cyl('pot', 0.1, 0.12, 0.44, s * 0.18, RIDGE + 1.64, -D / 2, 8);
}

// A white PVC window on the front wall. Glass goes in a slot, lit per house.
function win(k, slots, kind, cx, cy, w, h, mull) {
  const f = 0.075;
  const fd = 0.1;
  const z = 0.04;
  k.box('pvc', w, f, fd, cx, cy + h / 2 - f / 2, z);
  k.box('pvc', w, f, fd, cx, cy - h / 2 + f / 2, z);
  k.box('pvc', f, h - 2 * f, fd, cx - w / 2 + f / 2, cy, z);
  k.box('pvc', f, h - 2 * f, fd, cx + w / 2 - f / 2, cy, z);
  for (let i = 1; i <= mull; i++) k.box('pvc', 0.06, h - 2 * f, fd * 0.8, cx - w / 2 + (w * i) / (mull + 1), cy, z);
  if (w > 1) k.box('pvc', w - 2 * f, 0.055, fd * 0.8, cx, cy + h * 0.2, z);
  k.box('sill', w + 0.22, 0.08, 0.22, cx, cy - h / 2 - 0.04, 0.1);
  slots.push({ kind, x: cx, y: cy, z: 0.014, w: w - 0.04, h: h - 0.04, ry: 0 });
}

function half(k, slots, s) {
  const X = (x) => s * x;
  win(k, slots, 'living', X(2.05), 1.52, 2.4, 1.36, 2);
  win(k, slots, 'bed', X(2.05), 4.02, 1.85, 1.16, 1);
  win(k, slots, 'small', X(5.0), 4.08, 0.72, 1.0, 0);
  // Front door, fanlight and step
  const dx = X(5.0);
  k.box('pvc', 0.08, 2.46, 0.11, dx - 0.5, 1.35, 0.03);
  k.box('pvc', 0.08, 2.46, 0.11, dx + 0.5, 1.35, 0.03);
  k.box('pvc', 1.08, 0.07, 0.11, dx, 2.2, 0.03);
  k.box('pvc', 1.08, 0.08, 0.11, dx, 2.56, 0.03);
  slots.push({ kind: 'fan', x: dx, y: 2.38, z: 0.014, w: 0.92, h: 0.27, ry: 0 });
  slots.push({ kind: 'doorglass', x: dx, y: 1.8, z: 0.045, w: 0.6, h: 0.46, ry: 0 });
  k.box('sill', 1.4, 0.14, 0.5, dx, 0.07, 0.25);
  // Porch canopy: slate lean-to on two brackets
  k.box('slate', 1.95, 0.09, 1.0, dx, 2.83, 0.47, 0.27);
  k.box('pvc', 1.97, 0.16, 0.03, dx, 2.66, 0.97);
  for (const b of [-0.86, 0.86]) k.box('gutter', 0.05, 0.05, 0.8, dx + b, 2.42, 0.4, -0.8);
  // Porch lantern
  k.box('gutter', 0.16, 0.28, 0.16, X(5.72), 1.98, 0.1);
  k.box('gutter', 0.2, 0.04, 0.2, X(5.72), 2.14, 0.1);
  slots.push({ kind: 'lantern', x: X(5.72), y: 1.97, z: 0.182, w: 0.1, h: 0.2, ry: 0 });
  // Landing window on the gable
  const gx = s * (W + 0.04);
  k.box('pvc', 0.1, 0.075, 0.64, gx, 4.08 + 0.46, -5.2);
  k.box('pvc', 0.1, 0.075, 0.64, gx, 4.08 - 0.46, -5.2);
  k.box('pvc', 0.1, 0.85, 0.075, gx, 4.08, -5.2 + 0.28);
  k.box('pvc', 0.1, 0.85, 0.075, gx, 4.08, -5.2 - 0.28);
  k.box('sill', 0.22, 0.08, 0.8, s * (W + 0.1), 3.58, -5.2);
  slots.push({ kind: 'gable', x: s * (W + 0.014), y: 4.08, z: -5.2, w: 0.6, h: 0.9, ry: (s * Math.PI) / 2 });

  // Garden: lawn, cobble-lock drive that wraps to the door, walls and hedge
  const lo = (a, b) => [Math.min(X(a), X(b)), Math.max(X(a), X(b))];
  k.flat('lawn', ...lo(0.12, 4.1), 0, 5.75, 0.01);
  k.flat('paving', ...lo(4.1, W + DRIVE + 0.1), 0, 5.75, 0.012);
  k.flat('paving', ...lo(W, W + DRIVE + 0.1), -3.4, 0, 0.012);
  k.box('cap', 0.08, 0.06, 5.75, X(4.1), 0.03, 2.87);
  k.box('wall', 3.9, 0.62, 0.22, X(2.1), 0.31, 5.86);
  k.box('cap', 4.02, 0.07, 0.32, X(2.1), 0.655, 5.86);
  k.box('wall', 0.44, 0.84, 0.44, X(4.22), 0.42, 5.86);
  k.box('cap', 0.54, 0.07, 0.54, X(4.22), 0.875, 5.86);
  k.box('hedge', 0.8, 1.7, 6.3, X(W + DRIVE + 0.5), 0.85, -0.3);
  k.box('wall', 0.22, 0.3, 3.1, X(W + DRIVE + 0.3), 0.15, 4.35);
  k.box('cap', 0.3, 0.05, 3.16, X(W + DRIVE + 0.3), 0.325, 4.35);
  k.box('gate', DRIVE, 1.75, 0.07, X(W + DRIVE / 2), 0.9, -3.4);
  k.box('gate', 0.1, 1.9, 0.1, X(W + DRIVE - 0.05), 0.95, -3.4);
}

/** One pair's shared shell (both halves), without glass or doors. */
function pairShell(slots) {
  const k = new Kit();
  massing(k);
  half(k, slots, 1);
  half(k, slots, -1);
  k.box('wall', 0.2, 0.5, 5.75, 0, 0.25, 2.93);
  k.box('cap', 0.28, 0.06, 5.85, 0, 0.53, 2.93);
  return k;
}

const DARK_TOP = [0.075, 0.095, 0.14];
const DARK_BOT = [0.02, 0.028, 0.045];
const CELL = { living: [0, 2, 3], bed: [0, 1, 2], small: [1], gable: [1], fan: [3], doorglass: [3], lantern: [3] };

/** Glass for one pair: which rooms have the lights on tonight. */
function glassFor(slots, lit) {
  const geos = [];
  slots.forEach((sl, i) => {
    const g = new PlaneGeometry(sl.w, sl.h);
    if (sl.ry) g.rotateY(sl.ry);
    g.translate(sl.x, sl.y, sl.z);
    const on = lit(sl, i);
    const uv = g.attributes.uv;
    const col = [];
    const cells = CELL[sl.kind];
    const cell = on ? cells[i % cells.length] : 0;
    const cx = (cell % 2) * 0.5;
    const cy = 0.5 - Math.floor(cell / 2) * 0.5;
    for (let v = 0; v < uv.count; v++) {
      const top = uv.getY(v) > 0.5;
      if (on) {
        uv.setXY(v, cx + 0.01 + uv.getX(v) * 0.48, cy + 0.01 + uv.getY(v) * 0.48);
        const k = on;
        col.push(1.0 * k, 0.8 * k, 0.55 * k);
      } else {
        uv.setXY(v, 0.25, 0.656);
        col.push(...(top ? DARK_TOP : DARK_BOT));
      }
    }
    g.setAttribute('color', new Float32BufferAttribute(col, 3));
    geos.push(g);
  });
  return mergeGeometries(geos);
}

export function buildStreet(scene, r) {
  const std = (o) => new MeshStandardMaterial({ roughness: 0.9, metalness: 0, ...o });
  const tx = {
    pebble: T.pebbledash(r),
    slate: T.slate(r),
    paving: T.paving(r),
    tarmac: T.tarmac(r),
    concrete: T.concrete(r),
    wet: T.wet(r),
    grass: T.foliage(r, [34, 46, 30], [1, 5], 5000),
    hedge: T.foliage(r, [22, 34, 24], [3, 3], 4200),
    door: T.door(),
    rooms: T.rooms(r),
  };
  const mats = {
    render: std({ map: tx.pebble, bumpMap: tx.pebble, bumpScale: 3, roughness: 0.96 }),
    wall: std({ map: tx.pebble, color: '#c9c3b8', roughness: 0.96 }),
    plinth: std({ color: '#4d4c4a', roughness: 0.85 }),
    slate: std({ map: tx.slate, roughness: 0.42, metalness: 0.1 }),
    ridge: std({ color: '#191c22', roughness: 0.5 }),
    pvc: std({ color: '#e4e6e3', roughness: 0.4 }),
    sill: std({ color: '#8d8a84', roughness: 0.85 }),
    cap: std({ color: '#8a8780', roughness: 0.8 }),
    gutter: std({ color: '#1c1f24', roughness: 0.45, metalness: 0.3 }),
    pot: std({ color: '#7b4a33', roughness: 0.8 }),
    lawn: std({ map: tx.grass, roughness: 1 }),
    hedge: std({ map: tx.hedge, roughness: 1 }),
    paving: std({ map: tx.paving, roughnessMap: tx.wet, roughness: 0.9 }),
    gate: std({ color: '#1b1a1a', roughness: 0.7 }),
    tarmac: std({ map: tx.tarmac, roughnessMap: tx.wet, roughness: 0.85 }),
    path: std({ map: tx.concrete, roughness: 0.82 }),
    kerb: std({ color: '#86847e', roughness: 0.8 }),
    tree: std({ color: '#0d1512', roughness: 1 }),
    glass: new MeshBasicMaterial({ map: tx.rooms, vertexColors: true }),
    binG: std({ color: '#2d5133', roughness: 0.55 }),
    binK: std({ color: '#1e2023', roughness: 0.55 }),
  };
  const uv = { render: 1 / 1.6, wall: 1 / 1.6, slate: 1 / 2.4, paving: 1 / 1.7, lawn: 1 / 3, hedge: 1 / 2, tarmac: 1 / 3, path: 1 / 1.8 };
  tx.slate.repeat.set(1, 1);

  const shadowKeys = new Set(['render', 'wall', 'cap', 'hedge', 'gate', 'slate', 'pvc', 'gutter', 'sill']);
  const receiveKeys = new Set(['render', 'wall', 'cap', 'lawn', 'paving', 'path', 'tarmac', 'kerb', 'hedge', 'sill', 'plinth', 'gate']);
  const flag = (group, cast) =>
    group.traverse((m) => {
      if (!m.isMesh) return;
      m.receiveShadow = receiveKeys.has(m.name);
      m.castShadow = cast && shadowKeys.has(m.name);
    });

  // Pairs: ours at the origin, one to the right, three receding into the fog.
  const slots = [];
  const shell = pairShell(slots).build(mats, uv);
  const doorGeo = new BoxGeometry(0.92, 2.02, 0.05);
  const doorMats = {};
  const doorMat = (hex) => (doorMats[hex] ||= std({ map: tx.door, color: hex, roughness: 0.32 }));
  const pairs = [
    { at: 0, doors: ['#a3221c', '#0f6e6b'] },
    { at: 1, doors: ['#d7d2c6', '#1f4a33'] },
    { at: -1, doors: ['#1f4a33', '#d7d2c6'] },
    { at: -2, doors: ['#c49a26', '#1c2847'] },
    { at: -3, doors: ['#6b1d2a', '#0f6e6b'] },
  ];
  for (const p of pairs) {
    const g = p.at === 0 ? shell : shell.clone();
    g.position.x = p.at * PITCH;
    flag(g, p.at === 0);
    const lit =
      p.at === 0
        ? (sl) => {
            const right = sl.x > 0;
            if (right) return { living: 1.25, fan: 1.3, doorglass: 0.9, lantern: 3.2 }[sl.kind] || 0;
            return { bed: 1.05, fan: 0.55, doorglass: 0.45 }[sl.kind] || 0;
          }
        : (sl) =>
            // the next pair's landing light breaks up its gable, seen end-on
            p.at === 1 && sl.kind === 'gable' && sl.x < 0
              ? 1.1
              : r() < (sl.kind === 'lantern' ? 0.3 : sl.kind === 'fan' || sl.kind === 'doorglass' ? 0.5 : 0.34)
                ? sl.kind === 'lantern'
                  ? 2.6
                  : 0.75 + r() * 0.6
                : 0;
    g.add(new Mesh(glassFor(slots, lit), mats.glass));
    p.doors.forEach((hex, i) => {
      const d = new Mesh(doorGeo, doorMat(hex));
      d.position.set((i ? -1 : 1) * 5.0, 1.15, 0.012);
      d.receiveShadow = p.at === 0;
      g.add(d);
    });
    scene.add(g);
  }

  // Street: footpaths, kerbs, road, verges, the ground behind, a treeline.
  const k = new Kit();
  const X0 = -150;
  const X1 = 60;
  k.flat('path', X0, X1, 5.75, 8.0, 0.0);
  k.flat('tarmac', X0, X1, 8.0, 15.0, -0.12);
  k.box('kerb', X1 - X0, 0.14, 0.16, (X0 + X1) / 2, -0.05, 8.02);
  k.box('kerb', X1 - X0, 0.14, 0.16, (X0 + X1) / 2, -0.05, 14.98);
  k.flat('path', X0, X1, 15.0, 17.0, 0.0);
  k.flat('lawn', X0, X1, 17.0, 40, 0.0);
  k.flat('lawn', X0, X1, -90, 5.76, -0.02);
  for (let i = 0; i < 26; i++) {
    const g = new IcosahedronGeometry(1, 0);
    const s = 3 + r() * 4;
    g.scale(s * (0.8 + r() * 0.5), s * (1.1 + r() * 0.8), s);
    g.translate(X0 + 20 + i * 7.5 + r() * 4, s * 0.9, -26 - r() * 22);
    k.add('tree', g);
  }
  // Streetlights: the near one lights the scene; two more recede down the road.
  for (const lx of [SPOTS.lamp[0], SPOTS.lamp[0] - 2 * PITCH, SPOTS.lamp[0] - 4 * PITCH]) {
    k.cyl('gutter', 0.07, 0.1, 7.2, lx, 3.6, 7.7, 8);
    k.box('gutter', 0.08, 0.08, 1.1, lx, 7.12, 8.1, -0.12);
    k.box('gutter', 0.34, 0.14, 0.72, lx, 7.1, 8.55);
  }
  const street = k.build(mats, uv);
  flag(street, false);
  scene.add(street);

  // Our house's extras: wheelie bins by the side gate.
  const ex = new Kit();
  ex.box('binG', 0.58, 0.98, 0.72, 7.0, 0.49, -2.55);
  ex.box('binG', 0.62, 0.06, 0.78, 7.0, 1.0, -2.57);
  ex.box('binK', 0.58, 0.98, 0.72, 7.68, 0.49, -2.55);
  ex.box('binK', 0.62, 0.06, 0.78, 7.68, 1.0, -2.57);
  // TV aerial on the chimney: a silhouette against the glowing cloud
  ex.cyl('gutter', 0.02, 0.02, 1.5, 0.28, RIDGE + 2.1, -D / 2 + 0.3, 6);
  ex.box('gutter', 0.03, 0.03, 1.2, 0.28, RIDGE + 2.75, -D / 2 + 0.3);
  for (let i = 0; i < 6; i++) ex.box('gutter', 0.46 - i * 0.04, 0.02, 0.02, 0.28, RIDGE + 2.75, -D / 2 - 0.2 + i * 0.2);
  // Bell box on the front wall
  ex.box('pvc', 0.32, 0.44, 0.1, SPOTS.led[0], 4.56, 0.05);
  ex.box('gutter', 0.26, 0.06, 0.02, SPOTS.led[0], 4.43, 0.105);
  const extras = ex.build(mats);
  flag(extras, true);
  scene.add(extras);

  // Emissive parts that animate
  const basic = (hex) => new MeshBasicMaterial({ color: hex });
  const led = new Mesh(new BoxGeometry(0.1, 0.04, 0.03), basic('#3d7cff'));
  led.position.set(...SPOTS.led);
  scene.add(led);

  // PIR floodlight: a body that aims at the drive, a lens that switches on.
  const flood = new Group();
  flood.position.set(...SPOTS.flood);
  const body = new Mesh(new BoxGeometry(0.32, 0.22, 0.1), mats.gutter);
  const lens = new Mesh(new PlaneGeometry(0.27, 0.17), basic('#ffffff'));
  lens.position.z = 0.051;
  const pir = new Mesh(new CylinderGeometry(0.05, 0.05, 0.08, 10), mats.pvc);
  pir.position.set(0, -0.16, 0.02);
  flood.add(body, lens, pir);
  flood.lookAt(...SPOTS.floodAim);
  const bracket = new Mesh(new BoxGeometry(0.07, 0.07, 0.2), mats.gutter);
  bracket.position.set(SPOTS.flood[0], SPOTS.flood[1] + 0.05, 0.08);
  scene.add(flood, bracket);

  // CCTV bullet camera under the eave. The head pans and tilts.
  const cctv = new Group();
  cctv.position.set(...SPOTS.cctv);
  const plate = new Mesh(new BoxGeometry(0.14, 0.03, 0.14), mats.pvc);
  plate.position.y = 0.1;
  const stem = new Mesh(new CylinderGeometry(0.025, 0.025, 0.12, 8), mats.pvc);
  stem.position.y = 0.04;
  const head = new Group();
  const barrel = new CylinderGeometry(0.068, 0.068, 0.36, 16);
  barrel.rotateX(Math.PI / 2);
  // Its own material: the flood's bounce lights the housing when it trips
  const camMat = std({ color: '#e8eaec', roughness: 0.38, emissive: '#dfe7f5', emissiveIntensity: 0.06 });
  const cam = new Mesh(barrel, camMat);
  cam.position.z = 0.12;
  const shield = new Mesh(new BoxGeometry(0.17, 0.02, 0.42), camMat);
  shield.position.set(0, 0.08, 0.14);
  const lensGeo = new CylinderGeometry(0.05, 0.05, 0.02, 16);
  lensGeo.rotateX(Math.PI / 2);
  const camLens = new Mesh(lensGeo, basic('#05070b'));
  camLens.position.z = 0.305;
  const ir = new Mesh(new RingGeometry(0.052, 0.064, 20), basic('#5a0a0a'));
  ir.position.z = 0.302;
  head.add(cam, shield, camLens, ir);
  head.scale.setScalar(1.9);
  cctv.add(plate, stem, head);
  scene.add(cctv);

  // Lamp heads' glowing undersides
  const lampLens = [];
  for (const lx of [SPOTS.lamp[0], SPOTS.lamp[0] - 2 * PITCH, SPOTS.lamp[0] - 4 * PITCH]) {
    const m = new Mesh(new PlaneGeometry(0.28, 0.6), basic('#ffb45c'));
    m.rotation.x = Math.PI / 2;
    m.position.set(lx, 7.025, 8.55);
    scene.add(m);
    lampLens.push(m);
  }

  return { led, lens, head, ir, camMat, lampLens };
}
