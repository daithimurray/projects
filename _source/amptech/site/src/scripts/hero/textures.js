// Procedural materials for the estate, painted on small canvases at load.
// Every tile wraps seamlessly; colours are the page's illustration materials.
import { CanvasTexture, ClampToEdgeWrapping, RepeatWrapping, SRGBColorSpace } from 'three';

/** Seeded PRNG (mulberry32): the same street every visit, and for the posters. */
export function rng(seed = 7) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function make(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d', { willReadFrequently: true })];
}

function tex(c, srgb = true) {
  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  if (srgb) t.colorSpace = SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function grain(x, w, h, amp, r) {
  const img = x.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (r() - 0.5) * amp;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  x.putImageData(img, 0, 0);
}

const rgb = (c, k = 1) => `rgb(${(c[0] * k) | 0},${(c[1] * k) | 0},${(c[2] * k) | 0})`;

/** Pebbledash render: a height field of small stones, lit from above. */
export function pebbledash(r) {
  const S = 256;
  const [c, x] = make(S);
  const img = x.createImageData(S, S);
  const d = img.data;
  const h = new Float32Array(S * S);
  for (let i = 0; i < S * S; i++) h[i] = r() * 0.22;
  for (let k = 0; k < 7200; k++) {
    const cx = (r() * S) | 0;
    const cy = (r() * S) | 0;
    const rad = 0.8 + r() * 1.5;
    const v = 0.35 + r() * 0.65;
    for (let yy = -2; yy <= 2; yy++) {
      for (let xx = -2; xx <= 2; xx++) {
        const q = Math.hypot(xx, yy) / rad;
        if (q > 1) continue;
        const i = ((cy + yy + S) % S) * S + ((cx + xx + S) % S);
        h[i] = Math.max(h[i], v * Math.sqrt(1 - q * q));
      }
    }
  }
  for (let y = 0; y < S; y++) {
    for (let x0 = 0; x0 < S; x0++) {
      const i = y * S + x0;
      const up = h[((y - 1 + S) % S) * S + x0];
      const s = (0.8 + h[i] * 0.32 + (h[i] - up) * 0.85) * (r() < 0.035 ? 0.82 : 1);
      d[i * 4] = 171 * s;
      d[i * 4 + 1] = 165 * s;
      d[i * 4 + 2] = 152 * s;
      d[i * 4 + 3] = 255;
    }
  }
  x.putImageData(img, 0, 0);
  return tex(c);
}

/** Natural slate: staggered courses, each slate a slightly different blue-grey. */
export function slate(r) {
  const S = 256;
  const [c, x] = make(S);
  x.fillStyle = '#12161e';
  x.fillRect(0, 0, S, S);
  const rh = 32;
  for (let row = 0; row < 8; row++) {
    for (let sx = -(row % 2) * 16; sx < S; sx += 32) {
      const t = 62 + r() * 26;
      x.fillStyle = rgb([t, t + 6, t + 16]);
      x.fillRect(sx + 1, row * rh + 1, 30, rh - 3);
    }
    x.fillStyle = 'rgba(0,0,0,.55)';
    x.fillRect(0, row * rh + rh - 4, S, 3);
    x.fillStyle = 'rgba(160,175,200,.10)';
    x.fillRect(0, row * rh + 1, S, 1);
  }
  grain(x, S, S, 12, r);
  return tex(c);
}

/** Cobble-lock block paving in a 90° herringbone, brindle tones. */
export function paving(r) {
  const S = 512;
  const N = 3;
  const u = S / (4 * N);
  const [c, x] = make(S);
  x.fillStyle = '#1b1c1f';
  x.fillRect(0, 0, S, S);
  const tones = [[96, 90, 84], [80, 78, 76], [110, 100, 88], [68, 67, 68], [118, 108, 94], [88, 82, 76]];
  const brick = (bx, by, bw, bh) => {
    const t = tones[(r() * tones.length) | 0];
    const k = 0.84 + r() * 0.3;
    for (const ox of [-S, 0, S]) {
      for (const oy of [-S, 0, S]) {
        const X = bx + ox + 1.5;
        const Y = by + oy + 1.5;
        x.fillStyle = rgb(t, k);
        x.fillRect(X, Y, bw - 3, bh - 3);
        x.fillStyle = 'rgba(255,255,255,.07)';
        x.fillRect(X, Y, bw - 3, 1.5);
        x.fillStyle = 'rgba(0,0,0,.22)';
        x.fillRect(X, Y + bh - 4.5, bw - 3, 1.5);
      }
    }
  };
  for (let a = 0; a < 4 * N; a++) {
    for (let b = 0; b < N; b++) {
      const px = (((a + 2 * b) % (4 * N)) + 4 * N) % (4 * N);
      const py = (((a - 2 * b) % (4 * N)) + 4 * N) % (4 * N);
      brick(px * u, py * u, 2 * u, u);
      brick(px * u, (py + 1) * u, u, 2 * u);
    }
  }
  grain(x, S, S, 18, r);
  return tex(c);
}

/** Tarmac with pale aggregate. */
export function tarmac(r) {
  const S = 256;
  const [c, x] = make(S);
  x.fillStyle = '#23262c';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 2600; i++) {
    const t = 40 + r() * 60;
    x.fillStyle = rgb([t, t, t + 4]);
    x.fillRect(r() * S, r() * S, 1 + r(), 1 + r());
  }
  grain(x, S, S, 26, r);
  return tex(c);
}

/** Poured concrete footpath with saw-cut joints. */
export function concrete(r) {
  const S = 256;
  const [c, x] = make(S);
  x.fillStyle = '#7d7c78';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    const t = 95 + r() * 50;
    x.fillStyle = `rgba(${t},${t},${t - 4},.35)`;
    x.fillRect(r() * S, r() * S, 2 + r() * 3, 2 + r() * 3);
  }
  x.fillStyle = 'rgba(20,20,22,.8)';
  x.fillRect(0, 0, S, 2);
  x.fillRect(0, 0, 2, S);
  x.fillRect(S / 2, 0, 1.5, S);
  grain(x, S, S, 20, r);
  return tex(c);
}

/** A lawn at night, and a clipped Leylandii hedge. */
export function foliage(r, base, strokes, n) {
  const S = 256;
  const [c, x] = make(S);
  x.fillStyle = rgb(base);
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < n; i++) {
    const k = 0.6 + r() * 0.8;
    x.fillStyle = rgb(base, k);
    const px = r() * S;
    const py = r() * S;
    for (const ox of [-S, 0, S]) x.fillRect(px + ox, py, strokes[0], strokes[1] + r() * strokes[1]);
  }
  grain(x, S, S, 16, r);
  return tex(c);
}

/** Wet ground: a roughness map with puddles (dark = glossy). */
export function wet(r) {
  const S = 256;
  const [c, x] = make(S);
  x.fillStyle = 'rgb(150,150,150)';
  x.fillRect(0, 0, S, S);
  for (let i = 0; i < 14; i++) {
    const px = r() * S;
    const py = r() * S;
    const rad = 8 + r() * 22;
    for (const ox of [-S, 0, S]) {
      for (const oy of [-S, 0, S]) {
        const g = x.createRadialGradient(px + ox, py + oy, 0, px + ox, py + oy, rad);
        g.addColorStop(0, 'rgba(70,70,70,.8)');
        g.addColorStop(1, 'rgba(70,70,70,0)');
        x.fillStyle = g;
        x.fillRect(px + ox - rad, py + oy - rad, rad * 2, rad * 2);
      }
    }
  }
  grain(x, S, S, 30, r);
  return tex(c, false);
}

/** A painted panel door: grooves and highlights, tinted by the material colour. */
export function door() {
  const [c, x] = make(128, 256);
  x.fillStyle = '#f2f2f2';
  x.fillRect(0, 0, 128, 256);
  const panel = (px, py, w, h) => {
    x.fillStyle = '#d6d6d6';
    x.fillRect(px, py, w, h);
    x.fillStyle = '#8a8a8a';
    x.fillRect(px, py, w, 3);
    x.fillRect(px, py, 3, h);
    x.fillStyle = '#ffffff';
    x.fillRect(px, py + h - 3, w, 3);
    x.fillRect(px + w - 3, py, 3, h);
  };
  panel(16, 18, 96, 70); // glazed panel sits over this
  panel(16, 128, 42, 110);
  panel(70, 128, 42, 110);
  x.fillStyle = '#6d6d6d';
  x.fillRect(40, 102, 48, 10); // letter plate
  x.fillStyle = '#b9b9b9';
  x.fillRect(106, 104, 6, 22); // handle
  return tex(c);
}

/**
 * Lit rooms seen through glass, four variants in a 2x2 atlas:
 * open curtains, venetian blind, drawn curtains, a bare lit room.
 */
export function rooms(r) {
  const S = 256;
  const H = 128;
  const [c, x] = make(S);
  const cell = (cx, cy, draw) => {
    x.save();
    x.translate(cx * H, cy * H);
    x.beginPath();
    x.rect(0, 0, H, H);
    x.clip();
    const g = x.createRadialGradient(64, 88, 6, 64, 70, 100);
    g.addColorStop(0, '#fff6e2');
    g.addColorStop(0.55, '#e9b77c');
    g.addColorStop(1, '#8f5a35');
    x.fillStyle = g;
    x.fillRect(0, 0, H, H);
    draw();
    x.restore();
  };
  const curtain = (px, w, tone) => {
    for (let i = 0; i < w; i += 5) {
      x.fillStyle = i % 10 ? tone[0] : tone[1];
      x.fillRect(px + i, 0, 5, H);
    }
  };
  cell(0, 0, () => {
    curtain(0, 26, ['#7a3f24', '#5a2c19']);
    curtain(102, 26, ['#7a3f24', '#5a2c19']);
    x.fillStyle = 'rgba(40,24,16,.55)';
    x.fillRect(38, 92, 52, 36); // sofa back
  });
  cell(1, 0, () => {
    for (let y = 0; y < H; y += 9) {
      x.fillStyle = 'rgba(120,80,48,.55)';
      x.fillRect(0, y, H, 5);
    }
  });
  cell(0, 1, () => {
    curtain(0, 58, ['#c7803f', '#a8652e']);
    curtain(70, 58, ['#c7803f', '#a8652e']);
  });
  cell(1, 1, () => {
    x.fillStyle = 'rgba(50,30,20,.55)';
    x.fillRect(12, 70, 30, 58);
    x.fillRect(84, 34, 36, 6);
    x.fillStyle = 'rgba(255,250,235,.9)';
    x.beginPath();
    x.ellipse(64, 8, 20, 10, 0, 0, Math.PI * 2);
    x.fill();
  });
  grain(x, S, S, 10, r);
  const t = tex(c);
  t.wrapS = t.wrapT = ClampToEdgeWrapping; // atlas cells must not bleed
  return t;
}

/** Soft radial glow for light sources that bloom (lamps, LEDs, lenses). */
export function glow() {
  const [c, x] = make(128);
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.12, 'rgba(255,255,255,.55)');
  g.addColorStop(0.4, 'rgba(255,255,255,.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}
