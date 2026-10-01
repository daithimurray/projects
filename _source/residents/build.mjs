// Builds the Barnhall Meadows residents association site into ../../residents/.
// No dependencies: `node build.mjs` (preview, placeholders underlined) or `node build.mjs --final`.
// Output is plain HTML, CSS and JS with relative paths, so it can be served from any folder.

import { mkdirSync, rmSync, writeFileSync, copyFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, impact, estateFacts, whatWeDo, takingInCharge, posts, events, committee, nextMeeting, documents, faqs } from './data.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '../../residents');
const FINAL = process.argv.includes('--final');

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Placeholder: shows with a dotted underline in preview builds so nobody mistakes it for real detail.
const ph = s => (FINAL ? esc(s) : `<span class="ph" title="Placeholder">${esc(s)}</span>`);
const d = iso => new Date(iso + 'T12:00:00Z');
const fmt = (iso, opts) => new Intl.DateTimeFormat('en-IE', { timeZone: 'UTC', ...opts }).format(d(iso));
const longDate = iso => fmt(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const shortDate = iso => fmt(iso, { day: 'numeric', month: 'long', year: 'numeric' });
const time12 = t => {
  const [h, m] = t.split(':').map(Number);
  const hh = ((h + 11) % 12) + 1;
  return `${hh}${m ? '.' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`;
};
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('');
const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');
const byDateAsc = (a, b) => a.date.localeCompare(b.date);
const upcoming = events.filter(e => e.date >= site.lastUpdated).sort(byDateAsc);
const kindLabel = { news: 'News', council: 'Council notice', event: 'Event' };

const sourceList = (sources, cls = 'sources') => sources && sources.length ? `<p class="${cls}"><span>Sources:</span> ${sources.map(([label, url]) => `<a href="${url}" rel="noopener">${esc(label)}</a>`).join('; ')}</p>` : '';
const exampleTag = item => (!FINAL && item.placeholder ? '<span class="tag tag-example">Example</span>' : '');

const icon = (id, size = 20) => `<svg class="i" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

/* ---------- shared chrome ---------- */
const NAV = [
  ['', 'Home'],
  ['news/', 'News & Events'],
  ['committee/', 'Committee'],
  ['get-involved/', 'Get Involved'],
  ['documents/', 'Documents'],
  ['contact/', 'Contact'],
];

const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-back" viewBox="0 0 24 24"><path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-cal" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4"/></g></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></g></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></g></symbol>
  <symbol id="i-file" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></g></symbol>
  <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></g></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></g></symbol>
  <symbol id="i-lamp" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z"/></g></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
</svg>`;

// Logo mark: the Wonderful Barn and its two dovecotes. Locked up with the association's name in the header and footer.
const markShapes = `<rect width="48" height="48" rx="12" fill="var(--green)"/>
  <path d="M5.5 40 7.4 28H9.6L11.5 40ZM6.8 25.6h3.4v2.4H6.8ZM36.5 40 38.4 28H40.6L42.5 40ZM37.8 25.6h3.4v2.4h-3.4Z" fill="var(--ochre-light)"/>
  <path d="M13 40 19 12H29L35 40ZM18 8.6h12v3.6H18Z" fill="var(--ochre)"/>
  <path d="M12 37 36 31.4M14 28.9 34 23.9M16 20.8 32 16.4" stroke="var(--green)" stroke-width="2.4"/>
  <rect x="4" y="39.6" width="40" height="2.6" rx="1.3" fill="var(--limestone)"/>`;
const mark = (size = 40) => `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">${markShapes}</svg>`;

function header(r, current) {
  const links = NAV.map(([href, label]) => {
    const cur = href === current ? ' aria-current="page"' : '';
    return `<a href="${r}${href}"${cur}>${label}</a>`;
  });
  return `<header class="site-header" data-header>
  <div class="container bar">
    <a class="brand" href="${r}" aria-label="${esc(site.name)}, home">${mark(40)}<span class="brand-text"><span class="brand-name">${esc(site.estate)}</span><span class="brand-sub">Residents’ Association</span></span></a>
    <nav class="nav" aria-label="Main">${links.join('')}</nav>
    <div class="bar-actions">
      <a class="btn btn-primary btn-sm" href="${r}get-involved/#join">Join us</a>
      <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-haspopup="dialog" data-menu-open>${icon('menu', 24)}</button>
    </div>
  </div>
  <div class="progress" aria-hidden="true"><span></span></div>
</header>
<dialog class="drawer" aria-label="Menu" data-menu>
  <div class="drawer-top">
    <span class="brand-name">Menu</span>
    <button class="icon-btn" type="button" aria-label="Close menu" data-menu-close>${icon('close', 24)}</button>
  </div>
  <nav aria-label="Main">${links.map((l, i) => l.replace('<a ', `<a style="--i:${i}" `)).join('')}</nav>
  <a class="btn btn-primary" href="${r}get-involved/#join">Join the association ${icon('arrow')}</a>
</dialog>`;
}

const joinBand = r => `<section class="join-band" aria-labelledby="join-band-title">
  <div class="container join-inner" data-reveal>
    <div>
      <p class="eyebrow on-dark">Membership is free</p>
      <h2 id="join-band-title" class="display-m">It takes two minutes to join. The more of us, the louder our voice.</h2>
    </div>
    <a class="btn btn-ochre btn-lg" href="${r}get-involved/#join">Become a member ${icon('arrow')}</a>
  </div>
  ${skyline('band')}
</section>`;

function footer(r) {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="${r}">${mark(44)}<span class="brand-text"><span class="brand-name">${esc(site.estate)}</span><span class="brand-sub">Residents’ Association</span></span></a>
        <p>The residents association for ${esc(site.estate)}, ${esc(site.area)}. Volunteer-run, non-political, and open to every resident.</p>
      </div>
      <nav aria-label="Footer">
        <h2 class="footer-h">Pages</h2>
        <ul>${NAV.map(([h, l]) => `<li><a href="${r}${h}">${l}</a></li>`).join('')}<li><a href="${r}privacy/">Privacy notice</a></li></ul>
      </nav>
      <div>
        <h2 class="footer-h">Get in touch</h2>
        <ul>
          <li><a href="mailto:${site.email}">${ph(site.email)}</a></li>
          <li><a href="${site.facebook}" rel="noopener">Facebook</a></li>
          <li><a href="${site.instagram}" rel="noopener">Instagram</a></li>
        </ul>
        <a class="btn btn-ochre" href="${r}get-involved/#join">Join the association ${icon('arrow')}</a>
      </div>
    </div>
    <p class="footer-word" aria-hidden="true">${esc(site.estate)}</p>
    <div class="footer-base">
      <p>© ${new Date().getFullYear()} ${ph(site.name)}</p>
      <p>Last updated <time datetime="${site.lastUpdated}">${shortDate(site.lastUpdated)}</time></p>
    </div>
  </div>
</footer>`;
}

function layout({ path, title, description, current, body, bodyClass = '', noJoinBand = false }) {
  const depth = path === '' ? 0 : path.split('/').filter(Boolean).length;
  const r = '../'.repeat(depth);
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.area}`;
  return `<!DOCTYPE html>
<html lang="en-IE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#173B2C">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title || site.name)}">
<meta property="og:description" content="${esc(description)}">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preload" href="${r}fonts/fraunces-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${r}fonts/public-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r}styles.css">
<script>document.documentElement.classList.add('js')</script>
<script src="${r}main.js" defer></script>
</head>
<body class="${bodyClass}">
${sprite}
<a class="skip-link" href="#main">Skip to content</a>
${FINAL ? '' : `<aside class="preview-note" aria-label="Preview notice"><p>Preview. Names, dates and numbers with a dotted underline are placeholders.</p></aside>`}
${header(r, current)}
<main id="main" tabindex="-1">
${typeof body === 'function' ? body(r) : body}
</main>
${noJoinBand ? '' : joinBand(r)}
${footer(r)}
</body>
</html>
`;
}

/* ---------- illustration: the estate beside the Barn ----------
   Deterministic rows of houses with windows that light up. The back layers move on scroll (main.js);
   the Barn and the front row stay put so the Barn stays anchored to the ground. */
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}
function tree(x, y, s, fill) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3.5" y="-44" width="7" height="44" fill="${fill}"/><circle cx="0" cy="-74" r="34" fill="${fill}"/><circle cx="-25" cy="-54" r="23" fill="${fill}"/><circle cx="25" cy="-56" r="25" fill="${fill}"/></g>`;
}
// A young street tree, as planted along the estate's roads.
const sapling = (x, y, s, fill) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2" y="-36" width="4" height="36" fill="${fill}"/><ellipse cx="0" cy="-50" rx="14" ry="22" fill="${fill}"/></g>`;

// A tapering round tower with a stair winding round the outside to a flat roof with a parapet.
// Each stair band is the front half of one turn, so it wraps round the edges like the real thing.
function tower(cx, y, { base, top, h, turns, ext, band, body, stair, doors = false }) {
  const w = hh => base - (base - top) * (hh / h);
  let out = `<path d="M${cx - base} ${y}L${cx - top} ${y - h}H${cx + top}L${cx + base} ${y}Z" fill="${body}"/>`;
  out += `<rect x="${cx - top - 3}" y="${y - h - 11}" width="${(top + 3) * 2}" height="11" fill="${body}"/>`;
  const pitch = (h - 8) / turns;
  for (let k = 0; k < turns; k++) {
    const h0 = 4 + k * pitch;
    const pts = [];
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      const hh = h0 + (t * pitch) / 2;
      pts.push([cx - Math.cos(t * Math.PI) * (w(hh) + ext), y - hh]);
    }
    const edge = pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join('L');
    const under = [...pts].reverse().map(([px, py]) => `${px.toFixed(1)} ${(py + band).toFixed(1)}`).join('L');
    out += `<path d="M${edge}L${under}Z" fill="${stair}"/>`;
    if (doors && k > 0 && k % 2 === 0) {
      const hy = y - (h0 + pitch / 4);
      out += `<path d="M${cx - 5} ${hy}v-13a5 5 0 0 1 10 0v13Z" fill="${stair}"/>`;
    }
  }
  return out;
}
// The Wonderful Barn (1743), drawn from published descriptions: a conical tower about twice as tall as it is wide,
// 94 steps winding round the outside to a flat roof with a parapet, and two smaller towers of the same design
// (dovecotes) behind it. Check against a photo before launch.
function barn(cx, y, scale = 1, { body = 'var(--barn)', stair = 'var(--barn-stair)', back = body } = {}) {
  let out = `<g class="barn" transform="translate(${cx} ${y}) scale(${scale}) translate(${-cx} ${-y})">`;
  out += `<rect x="${cx - 112}" y="${y - 16}" width="224" height="16" fill="${back}"/>`;
  for (const dx of [-100, 100]) out += tower(cx + dx, y, { base: 21, top: 11, h: 74, turns: 2, ext: 2.5, band: 5, body: back, stair });
  out += tower(cx, y, { base: 52, top: 22, h: 208, turns: 5, ext: 5, band: 9, body, stair, doors: true });
  return out + '</g>';
}

/* Modern estate housing: semis and terraces under shallow roofs, and flat-roofed apartment blocks. */
// apartments: chance that a building is an apartment block, or a list of the building numbers that are.
function houseRow({ seed, y, from = -20, to = 1460, unit: [uMin, uMax], storey, fill, win, winChance, apartments = 0.14, width = 1440 }) {
  const rand = rng(seed);
  let x = from;
  let out = '';
  let n = 0;
  let b = 0;
  const pane = (px, py, pw, ph, cls = 'win') => {
    const lit = cls === 'win' && rand() < winChance;
    return `<rect class="${cls}${lit ? ' lit' : ''}" style="--d:${(n++ % 17) * 0.23}s" x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="1" fill="${win}"/>`;
  };
  while (x < to) {
    const r = rand();
    const u = uMin + rand() * (uMax - uMin);
    const apt = Array.isArray(apartments) ? apartments.includes(b) : r < apartments;
    const kind = apt ? 'apt' : r < 0.6 ? 'semi' : 'terrace';
    const units = kind === 'semi' ? 2 : kind === 'terrace' ? 3 + (rand() < 0.4 ? 1 : 0) : 0;
    const w = kind === 'apt' ? u * (2.8 + rand() * 0.8) : u * units;
    if (x + w > to && to < width) break;
    if (kind === 'apt') {
      const floors = 4;
      const top = y - storey * floors - 6;
      out += `<path d="M${x} ${y}V${top}H${x + w}V${y}Z" fill="${fill}"/><rect x="${x + w * 0.62}" y="${top - 8}" width="${w * 0.22}" height="9" fill="${fill}"/>`;
      if (win) {
        const cols = Math.max(3, Math.round(w / (u * 0.55)));
        const cw = w / cols;
        for (let f = 0; f < floors; f++) {
          for (let c = 0; c < cols; c++) {
            const py = top + 10 + f * storey;
            out += pane(x + c * cw + cw * 0.22, py, cw * 0.56, storey * 0.5);
            if (f > 0 && c % 2 === 0) out += pane(x + c * cw + cw * 0.12, py + storey * 0.58, cw * 0.76, 2.5, 'rail');
          }
        }
      }
    } else {
      const top = y - storey * 2;
      const roof = storey * 0.32;
      const hip = rand() < 0.5 ? roof * 1.8 : 0;
      out += `<path d="M${x} ${y}V${top}H${(x - 3).toFixed(1)}L${(x + hip).toFixed(1)} ${(top - roof).toFixed(1)}H${(x + w - hip).toFixed(1)}L${(x + w + 3).toFixed(1)} ${top}H${x + w}V${y}Z" fill="${fill}"/>`;
      // Some semis have a shallow front gable over one house.
      if (kind === 'semi' && rand() < 0.5) {
        const gx = rand() < 0.5 ? x : x + u;
        out += `<path d="M${(gx + u * 0.08).toFixed(1)} ${top}L${(gx + u * 0.5).toFixed(1)} ${(top - roof * 1.5).toFixed(1)}L${(gx + u * 0.92).toFixed(1)} ${top}Z" fill="${fill}"/>`;
      }
      if (win) {
        for (let k = 0; k < units; k++) {
          const ux = x + k * u;
          const mirror = k % 2 === 1;
          const doorX = mirror ? ux + u * 0.7 : ux + u * 0.12;
          const winX = mirror ? ux + u * 0.1 : ux + u * 0.46;
          out += pane(doorX, y - storey * 0.68, u * 0.18, storey * 0.68, 'door');
          out += `<rect x="${(doorX - u * 0.04).toFixed(1)}" y="${(y - storey * 0.76).toFixed(1)}" width="${(u * 0.26).toFixed(1)}" height="3" fill="${win}" opacity=".5"/>`;
          out += pane(winX, y - storey * 0.72, u * 0.42, storey * 0.38);
          out += pane(ux + u * 0.14, top + storey * 0.26, u * 0.3, storey * 0.38);
          out += pane(ux + u * 0.56, top + storey * 0.26, u * 0.3, storey * 0.38);
        }
      }
    }
    x += w + Math.round(6 + rand() * 22);
    b++;
  }
  return out;
}
function skyline(variant) {
  if (variant === 'band') {
    const near = { y: 120, unit: [26, 34], storey: 22, fill: 'rgba(255,255,255,.06)', winChance: 0, apartments: [3] };
    return `<svg class="skyline skyline-band" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      ${houseRow({ seed: 11, from: -20, to: 1080, ...near })}${houseRow({ seed: 13, from: 1290, ...near })}
      ${barn(1185, 120, 0.42, { body: 'rgba(255,255,255,.1)', stair: 'rgba(255,255,255,.06)', back: 'rgba(255,255,255,.07)' })}
    </svg>`;
  }
  const far = { y: 330, unit: [24, 32], storey: 26, fill: 'var(--house-far)', win: 'var(--win-far)', winChance: 0.3 };
  const near = { y: 404, unit: [44, 54], storey: 44, fill: 'var(--house-near)', win: 'var(--ochre-light)', winChance: 0.45, apartments: [] };
  return `<svg class="skyline" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
    <g class="layer" data-depth="0.18"><path d="M0 250C180 200 320 215 480 235S820 180 1000 205 1300 230 1440 200V420H0Z" fill="var(--hill)"/></g>
    <g class="layer" data-depth="0.1">${houseRow({ seed: 3, from: -20, to: 590, ...far })}${houseRow({ seed: 7, from: 860, ...far })}</g>
    <g>${barn(720, 404, 1.38)}${tree(505, 406, 0.9, 'var(--tree)')}${tree(948, 406, 0.75, 'var(--tree)')}
      ${houseRow({ seed: 29, from: -20, to: 462, ...near })}${houseRow({ seed: 41, from: 1000, ...near, apartments: [0] })}
      ${sapling(150, 406, 1, 'var(--tree)')}${sapling(1290, 406, 1.1, 'var(--tree)')}<rect x="0" y="400" width="1440" height="60" fill="var(--house-near)"/></g>
  </svg>`;
}

/* ---------- components ---------- */
const dateBadge = iso => `<span class="date-badge" aria-hidden="true"><span class="db-m">${fmt(iso, { month: 'short' })}</span><span class="db-d">${fmt(iso, { day: 'numeric' })}</span></span>`;

const postCard = (p, r, i = 0) => `<article class="post-card" data-kind="${p.kind}" data-reveal style="--i:${i}">
  <p class="meta"><span class="tag tag-${p.kind}">${kindLabel[p.kind]}</span>${exampleTag(p)}<time datetime="${p.date}">${shortDate(p.date)}</time></p>
  <h3><a class="stretched" href="${r}news/${p.slug}/">${esc(p.title)}</a></h3>
  <p>${esc(p.summary)}</p>
  <span class="more" aria-hidden="true">Read more ${icon('arrow', 18)}</span>
</article>`;

const eventRow = (e, r, i = 0) => `<li class="event-row" data-kind="event" data-reveal style="--i:${i}">
  ${dateBadge(e.date)}
  <div class="event-body">
    <h3><a class="stretched" href="${r}events/${e.slug}/">${esc(e.title)}</a></h3>
    <p class="event-meta"><span>${icon('clock', 16)}<time datetime="${e.date}T${e.start}">${fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })}, ${time12(e.start)}</time></span><span>${icon('pin', 16)}${ph(e.place)}</span></p>
  </div>
  <span class="chev" aria-hidden="true">${icon('arrow')}</span>
</li>`;

// Taking-in-charge tracker: stair steps that climb to the right, like the Barn's stair. On narrow
// containers it becomes a vertical list. The stair line draws itself once, when it scrolls into view.
const statusText = { done: 'Done', now: 'In progress', next: 'Not started' };
function stairTracker(level = 'h3') {
  const steps = takingInCharge.steps;
  const done = steps.filter(st => st.status === 'done').length;
  return `<div class="stair" data-reveal style="--steps:${steps.length}">
  <p class="stair-status"><strong>${done} of ${steps.length} steps done.</strong> Waiting on ${esc(takingInCharge.waitingOn)}. Latest update we have found: ${esc(takingInCharge.latest)}.</p>
  <ol class="stair-steps">
    ${steps.map((st, n) => `<li class="stair-step is-${st.status}" style="--n:${n}"${st.status === 'now' ? ' aria-current="step"' : ''}>
      <span class="stair-dot" aria-hidden="true">${st.status === 'done' ? icon('check', 18) : n + 1}</span>
      <p class="stair-when">${st.whenPlaceholder ? ph(st.when) : esc(st.when)}<span class="visually-hidden">. ${statusText[st.status]}.</span></p>
      <${level} class="stair-title">${esc(st.title)}</${level}>
      <p class="stair-body">${esc(st.body)}</p>
      ${st.source ? `<p class="stair-src">Source: <a href="${st.source[1]}" rel="noopener">${esc(st.source[0])}</a></p>` : ''}
    </li>`).join('')}
  </ol>
</div>`;
}

const pageHero = ({ eyebrow, title, intro }) => `<section class="page-hero">
  <div class="container">
    <p class="eyebrow" data-reveal>${eyebrow}</p>
    <h1 class="display-xl" data-reveal style="--i:1">${title}</h1>
    ${intro ? `<p class="lede" data-reveal style="--i:2">${intro}</p>` : ''}
  </div>
</section>`;

const field = ({ id, label, type = 'text', required = true, autocomplete, hint, attrs = '' }) => `<div class="field">
  <label for="${id}">${label}${required ? '' : ' <span class="opt">(optional)</span>'}</label>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ''}
  <input id="${id}" name="${id}" type="${type}"${required ? ' required' : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${hint ? ` aria-describedby="${id}-hint"` : ''} ${attrs}>
  <p class="error" id="${id}-error" hidden></p>
</div>`;

const addressField = (id, required = true) => field({ id, label: 'Your address', required, autocomplete: 'street-address', hint: `House number and road in ${esc(site.estate)}, for example 12 The Drive.` });

const consent = (r, id) => `<div class="field check-field">
  <input type="checkbox" id="${id}" name="consent" required>
  <label for="${id}">I agree to the association using these details to contact me about association business, as set out in the <a href="${r}privacy/">privacy notice</a>.</label>
  <p class="error" id="${id}-error" hidden></p>
</div>`;

/* ---------- pages ---------- */
const pages = [];
const page = (path, opts) => pages.push({ path, ...opts });

// Home
page('', {
  current: '',
  bodyClass: 'home',
  description: `The residents association for ${site.estate}, ${site.area}. News, events, the committee, and how to join.`,
  body: r => {
    const next = upcoming[0];
    const latest = [...posts].sort(byDateDesc).slice(0, 3);
    return `<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow" data-reveal>${esc(site.estate)} · ${esc(site.area)}</p>
      <h1 class="display-hero" data-reveal style="--i:1">Looking after ${(() => { const w = esc(site.estate).split(' '); const last = w.pop(); return `${w.length ? `<span class="estate-name">${w.join(' ')}</span> ` : ''}<span class="nw"><span class="estate-name">${last}</span>,</span>`; })()} together.</h1>
      <p class="lede" data-reveal style="--i:2">We’re the residents association for ${esc(site.estate)} in Leixlip, an estate of ${ph('up to ' + site.homes + ' homes')}. We work with the council, the developer, local groups and each other to keep this a great place to live.</p>
      <div class="hero-ctas" data-reveal style="--i:3">
        <a class="btn btn-primary btn-lg" href="${r}get-involved/#join">Join the association ${icon('arrow')}</a>
        <a class="btn btn-ghost btn-lg" href="${r}news/">See what’s on</a>
      </div>
    </div>
    <aside class="notice" aria-labelledby="next-title" data-reveal style="--i:4" data-next-event>
      <span class="notice-pin" aria-hidden="true"></span>
      <p class="eyebrow">Next event</p>
      <h2 id="next-title" class="display-s"><a href="${r}events/${next.slug}/" data-ne-link>${esc(next.title)}</a></h2>
      <p class="countdown" data-countdown="${next.date}T${next.start}" hidden></p>
      <ul class="notice-facts">
        <li>${icon('cal', 18)}<time datetime="${next.date}" data-ne-date>${longDate(next.date).replace(/ \d{4}$/, '')}</time></li>
        <li>${icon('clock', 18)}<span data-ne-time>${time12(next.start)} to ${time12(next.end)}</span></li>
        <li>${icon('pin', 18)}<span data-ne-place>${ph(next.place)}</span></li>
      </ul>
      <a class="btn btn-outline btn-sm" href="${r}events/${next.slug}/event.ics" download data-ne-ics>${icon('cal', 18)} Add to calendar</a>
    </aside>
  </div>
  ${skyline('hero')}
  <script type="application/json" id="events-data">${JSON.stringify(upcoming.map(e => ({ slug: e.slug, title: e.title, date: e.date, start: e.start, end: e.end, place: e.place, when: longDate(e.date).replace(/ \d{4}$/, ''), time: `${time12(e.start)} to ${time12(e.end)}` })))}</script>
</section>

<section class="section what" aria-labelledby="what-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>What we do</p>
      <h2 id="what-title" class="display-l" data-reveal style="--i:1">Three jobs, done by neighbours.</h2>
    </div>
    <ol class="what-list">
      ${whatWeDo.map((w, i) => `<li data-reveal style="--i:${i}"><span class="what-num" aria-hidden="true">0${i + 1}</span><h3 class="display-s">${esc(w.title)}</h3><p>${esc(w.body)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section campaign" aria-labelledby="tic-title">
  <div class="container">
    <div class="section-head split">
      <div>
        <p class="eyebrow" data-reveal>Our first job</p>
        <h2 id="tic-title" class="display-l" data-reveal style="--i:1">Getting the estate taken in charge.</h2>
      </div>
      <a class="link-arrow" href="${r}news/taking-in-charge/" data-reveal style="--i:2">What taking in charge means ${icon('arrow', 18)}</a>
    </div>
    ${stairTracker()}
  </div>
</section>

<section class="section estate" aria-labelledby="estate-title">
  <div class="container estate-grid">
    <div class="estate-copy">
      <p class="eyebrow" data-reveal>The estate</p>
      <h2 id="estate-title" class="display-l" data-reveal style="--i:1">${esc(estateFacts.title)}</h2>
      <div class="estate-body" data-reveal style="--i:2">${estateFacts.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
      <div data-reveal style="--i:3">${sourceList(estateFacts.sources)}</div>
    </div>
    <ul class="facts" aria-label="The estate in numbers">
      ${impact.map((m, i) => `<li class="stat" data-reveal style="--i:${i}"><span class="stat-num" data-count="${m.value}">${m.placeholder && !FINAL ? `<span class="ph">${m.value}</span>` : m.value}</span><span class="stat-label">${esc(m.label)}</span><span class="stat-source">${esc(m.source)}</span></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section news-home" aria-labelledby="latest-title">
  <div class="container">
    <div class="section-head split">
      <div>
        <p class="eyebrow" data-reveal>Latest news</p>
        <h2 id="latest-title" class="display-l" data-reveal style="--i:1">What’s happening on the estate.</h2>
      </div>
      <a class="link-arrow" href="${r}news/" data-reveal style="--i:2">All news and events ${icon('arrow', 18)}</a>
    </div>
    <div class="post-grid">${latest.map((p, i) => postCard(p, r, i)).join('')}</div>
  </div>
</section>

<section class="section coming" aria-labelledby="coming-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Coming up</p>
      <h2 id="coming-title" class="display-l" data-reveal style="--i:1">Put these in the diary.</h2>
    </div>
    <ul class="event-list">${upcoming.map((e, i) => eventRow(e, r, i)).join('')}</ul>
  </div>
</section>`;
  },
});

// News & Events
page('news/', {
  current: 'news/',
  title: 'News & Events',
  description: `Updates from the committee, upcoming events and council notices for ${site.estate}.`,
  body: r => `${pageHero({
    eyebrow: 'News & Events',
    title: `What’s happening in ${esc(site.estate)}.`,
    intro: 'Updates from the committee, upcoming events and notices from the council.',
  })}
<section class="section tight">
  <div class="container">
    <div class="chips" role="group" aria-label="Show" data-filter hidden>
      <button type="button" class="chip" aria-pressed="true" data-f="all">All</button>
      <button type="button" class="chip" aria-pressed="false" data-f="news">News</button>
      <button type="button" class="chip" aria-pressed="false" data-f="event">Events</button>
      <button type="button" class="chip" aria-pressed="false" data-f="council">Council notices</button>
    </div>
    <p class="visually-hidden" role="status" data-filter-status></p>

    <div class="filter-group" data-group>
      <h2 class="display-m group-title">Upcoming events</h2>
      <ul class="event-list">${upcoming.map((e, i) => eventRow(e, r, i)).join('')}</ul>
    </div>

    <div class="filter-group" data-group>
      <h2 class="display-m group-title">Latest news</h2>
      <div class="post-grid">${[...posts].sort(byDateDesc).map((p, i) => postCard(p, r, i)).join('')}</div>
    </div>
  </div>
</section>

<section class="section signup-wrap" aria-labelledby="signup-title">
  <div class="container">
    <form class="signup" data-form="subscribe" data-reveal novalidate action="mailto:${site.email}?subject=Subscribe" method="post" enctype="text/plain">
      <div>
        <h2 id="signup-title" class="display-m">Get updates by email.</h2>
        <p>One short email a month. No spam.</p>
      </div>
      <div class="signup-row">
        ${field({ id: 'sub-email', label: 'Email address', type: 'email', autocomplete: 'email' })}
        <button class="btn btn-primary" type="submit">Subscribe</button>
      </div>
      <p class="form-status" role="status" hidden></p>
    </form>
  </div>
</section>`,
});

// Single posts
for (const p of posts) {
  page(`news/${p.slug}/`, {
    current: 'news/',
    title: p.title,
    description: p.summary,
    body: r => `<article class="article">
  <div class="container narrow">
    <a class="link-back" href="${r}news/">${icon('back', 18)} Back to news</a>
    <p class="meta" data-reveal><span class="tag tag-${p.kind}">${kindLabel[p.kind]}</span><time datetime="${p.date}">${longDate(p.date)}</time></p>
    <h1 class="display-xl" data-reveal style="--i:1">${esc(p.title)}</h1>
    <p class="byline" data-reveal style="--i:2">From the ${esc(p.author)}</p>
    <div class="prose" data-reveal style="--i:3">${!FINAL && p.placeholder ? '<p class="callout"><strong>Example post.</strong> Replace with a real one before launch.</p>' : ''}${p.body.map(t => `<p>${esc(t)}</p>`).join('')}${p.slug === 'taking-in-charge' ? '' : sourceList(p.sources)}</div>
    ${p.slug === 'taking-in-charge' ? `<section class="post-steps" id="steps" aria-labelledby="steps-title"><h2 id="steps-title" class="display-m">Where things stand, step by step</h2>${stairTracker()}</section><div class="prose">${sourceList(p.sources)}</div>` : ''}
  </div>
</article>`,
  });
}

// Single events + .ics
for (const e of events) {
  const mapUrl = e.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}` : null;
  page(`events/${e.slug}/`, {
    current: 'news/',
    title: e.title,
    description: `${e.title}, ${longDate(e.date)}. ${e.summary}`,
    body: r => `<article class="article">
  <div class="container narrow">
    <a class="link-back" href="${r}news/">${icon('back', 18)} Back to news and events</a>
    <p class="meta" data-reveal><span class="tag tag-event">Event</span></p>
    <h1 class="display-xl" data-reveal style="--i:1">${esc(e.title)}</h1>
    <div class="event-card" data-reveal style="--i:2">
      ${dateBadge(e.date)}
      <ul class="notice-facts">
        <li>${icon('cal', 18)}<time datetime="${e.date}">${longDate(e.date)}</time></li>
        <li>${icon('clock', 18)}<span>${time12(e.start)} to ${time12(e.end)}</span></li>
        <li>${icon('pin', 18)}${mapUrl ? `<a href="${mapUrl}" rel="noopener">${esc(e.place)}</a>` : `<span>${ph(e.place)}</span>`}</li>
      </ul>
      <a class="btn btn-primary" href="event.ics" download>${icon('cal', 18)} Add to calendar</a>
    </div>
    <div class="prose" data-reveal style="--i:3">${e.body.map(t => `<p>${esc(t)}</p>`).join('')}
      <p>Questions? <a href="${r}contact/">Contact the ${esc(e.contact)}</a>.</p>
    </div>
  </div>
</article>`,
    ics: ics(e),
  });
}

function ics(e) {
  const dt = (date, t) => date.replace(/-/g, '') + 'T' + t.replace(':', '') + '00';
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${site.shortName}//Website//EN`, 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE', 'TZID:Europe/Dublin',
    'BEGIN:STANDARD', 'DTSTART:19701025T020000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0000', 'TZNAME:GMT', 'END:STANDARD',
    'BEGIN:DAYLIGHT', 'DTSTART:19700329T010000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'TZOFFSETFROM:+0000', 'TZOFFSETTO:+0100', 'TZNAME:IST', 'END:DAYLIGHT',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${e.slug}-${e.date}@${site.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    `DTSTAMP:${site.lastUpdated.replace(/-/g, '')}T000000Z`,
    `DTSTART;TZID=Europe/Dublin:${dt(e.date, e.start)}`,
    `DTEND;TZID=Europe/Dublin:${dt(e.date, e.end)}`,
    `SUMMARY:${e.title} (${site.shortName})`,
    `LOCATION:${e.place.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${e.summary.replace(/,/g, '\\,')}`,
    'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n');
}

// Committee
page('committee/', {
  current: 'committee/',
  title: 'Committee',
  description: `Meet the volunteer committee of ${site.name}.`,
  body: r => `${pageHero({
    eyebrow: 'Committee',
    title: 'Volunteers you can put a name to.',
    intro: `The first committee will be elected at our first public meeting, then at an AGM each ${ph(site.meetingMonth)}. It will meet ${ph(site.meetingRhythm)}, and all residents are welcome to attend.`,
  })}
<section class="section tight">
  <div class="container">
    <ul class="people">
      ${committee.map((c, i) => `<li class="person" data-reveal style="--i:${i}">
        <span class="avatar avatar-${i % 3}" aria-hidden="true">${esc(initials(c.role).toUpperCase())}</span>
        <div><p class="role">${esc(c.role)}</p><h2 class="person-name">${c.name ? ph(c.name) : ph('Name to be confirmed')}</h2><p>${esc(c.line)}</p></div>
      </li>`).join('')}
    </ul>
  </div>
</section>
<section class="section how" aria-labelledby="how-title">
  <div class="container how-grid">
    <div>
      <p class="eyebrow" data-reveal>How we work</p>
      <h2 id="how-title" class="display-l" data-reveal style="--i:1">Open by default.</h2>
    </div>
    <ul class="principles">
      <li data-reveal>${icon('shield', 24)}<p><strong>Non-political and independent.</strong> We work with every councillor and every party on estate issues.</p></li>
      <li data-reveal style="--i:1">${icon('file', 24)}<p><strong>Decisions by committee vote.</strong> Minutes are published on the <a href="${r}documents/">Documents page</a>.</p></li>
      <li data-reveal style="--i:2">${icon('chat', 24)}<p><strong>Our constitution is available to all residents.</strong> Ask the Secretary for a printed copy.</p></li>
    </ul>
    <div class="meeting" data-reveal>
      <p class="eyebrow on-dark">First public meeting</p>
      <p class="display-m"><time datetime="${nextMeeting.date}">${longDate(nextMeeting.date).replace(/ \d{4}$/, '')}</time></p>
      <p>${ph(nextMeeting.time)} · ${ph(nextMeeting.venue)}. All residents welcome.</p>
    </div>
  </div>
</section>`,
});

// Get Involved
page('get-involved/', {
  current: 'get-involved/',
  noJoinBand: true, // the page is the join form
  title: 'Get Involved',
  description: `Join ${site.name}, volunteer for an event or become a road rep.`,
  body: r => `${pageHero({
    eyebrow: 'Get Involved',
    title: 'You don’t need lots of time. Even signing up helps.',
    intro: `Every resident of ${esc(site.estate)} can be a member, whether you own your home, rent privately or rent from Clúid Housing.`,
  })}
<section class="section tight">
  <div class="container">
    <ul class="ways">
      <li class="way" data-reveal>
        <span class="way-num" aria-hidden="true">01</span>
        <h2 class="display-s">Become a member</h2>
        <p>${ph('Free')} for every household. Members get a vote at the AGM and our monthly update.</p>
        <a class="btn btn-primary" href="#join" data-intent="member">Join now ${icon('arrow')}</a>
      </li>
      <li class="way" data-reveal style="--i:1">
        <span class="way-num" aria-hidden="true">02</span>
        <h2 class="display-s">Volunteer for an event</h2>
        <p>Help at a clean-up, fun day or the Christmas lights. An hour makes a difference.</p>
        <a class="btn btn-outline" href="#join" data-intent="volunteer">I can help ${icon('arrow')}</a>
      </li>
      <li class="way" data-reveal style="--i:2">
        <span class="way-num" aria-hidden="true">03</span>
        <h2 class="display-s">Be a road rep</h2>
        <p>Be the link between your road and the committee. Share updates and flag issues.</p>
        <a class="btn btn-outline" href="#join" data-intent="roadrep">Tell me more ${icon('arrow')}</a>
      </li>
    </ul>
  </div>
</section>

<section class="section form-section" id="join" aria-labelledby="join-title" tabindex="-1">
  <div class="container form-grid">
    <div class="form-intro">
      <p class="eyebrow" data-reveal>Join the association</p>
      <h2 id="join-title" class="display-l" data-reveal style="--i:1">Two minutes, and you’re in.</h2>
      <p data-reveal style="--i:2">We only use your details to contact you about association business. We never share them. Read the <a href="${r}privacy/">privacy notice</a>.</p>
    </div>
    <form class="form" data-form="join" novalidate action="mailto:${site.email}?subject=Membership" method="post" enctype="text/plain" data-reveal>
      <fieldset class="field">
        <legend>I’d like to</legend>
        <div class="seg">
          <input type="radio" id="intent-member" name="intent" value="Become a member" checked><label for="intent-member">Join</label>
          <input type="radio" id="intent-volunteer" name="intent" value="Volunteer for events"><label for="intent-volunteer">Volunteer</label>
          <input type="radio" id="intent-roadrep" name="intent" value="Be a road rep"><label for="intent-roadrep">Road rep</label>
        </div>
      </fieldset>
      ${field({ id: 'name', label: 'Full name', autocomplete: 'name' })}
      ${addressField('address')}
      ${field({ id: 'email', label: 'Email', type: 'email', autocomplete: 'email' })}
      ${field({ id: 'phone', label: 'Phone', type: 'tel', required: false, autocomplete: 'tel' })}
      <fieldset class="field">
        <legend>What are you interested in? <span class="opt">(optional)</span></legend>
        <div class="checks">
          ${['Events', 'Environment', 'Safety', 'Planning', 'Youth'].map(t => `<label class="check-pill"><input type="checkbox" name="interests" value="${t}"><span>${t}</span></label>`).join('')}
        </div>
      </fieldset>
      ${consent(r, 'join-consent')}
      <button class="btn btn-primary btn-lg" type="submit">Send my details ${icon('arrow')}</button>
      <p class="form-status" role="status" hidden></p>
    </form>
  </div>
</section>

<section class="section faq" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title" class="display-l" data-reveal>Questions</h2>
    <div class="accordion">
      ${faqs.map((f, i) => `<details data-reveal style="--i:${i}"><summary>${esc(f.q)}${icon('plus', 20)}</summary><div class="acc-body"><p>${f.q.startsWith('How is my data') ? `Only to contact you about association business. See our <a href="${r}privacy/">privacy notice</a>.` : esc(f.a)}</p></div></details>`).join('')}
    </div>
  </div>
</section>`,
});

// Documents
page('documents/', {
  current: 'documents/',
  title: 'Documents',
  description: `Minutes, reports and key documents from ${site.name}.`,
  body: r => `${pageHero({ eyebrow: 'Documents', title: 'Everything on the record.', intro: 'The association’s own papers, plus council and planning documents about the estate. Most recent first.' })}
<section class="section tight">
  <div class="container narrow">
    <div class="search" data-doc-search hidden>
      <label for="doc-q" class="visually-hidden">Search documents</label>
      ${icon('search', 20)}
      <input id="doc-q" type="search" placeholder="Search documents, for example “minutes”" autocomplete="off">
    </div>
    <p class="visually-hidden" role="status" data-doc-status></p>
    <div class="accordion docs">
      ${documents.map((c, i) => `<details${c.items.some(it => it.file || it.url) ? ' open' : ''} data-reveal style="--i:${i}" data-doc-cat>
        <summary><span>${esc(c.category)} <span class="count">${c.items.length}</span></span>${icon('plus', 20)}</summary>
        <div class="acc-body"><ul class="doc-list">
          ${[...c.items].sort(byDateDesc).map(it => `<li class="doc" data-doc="${esc((it.title + ' ' + c.category + ' ' + (it.source || '')).toLowerCase())}">
            ${icon('file', 22)}
            <div><p class="doc-title">${esc(it.title)}</p><p class="doc-meta">${[it.source && esc(it.source), it.date && `<time datetime="${it.date}">${shortDate(it.date)}</time>`, it.type + (it.size ? `, ${it.size}` : '')].filter(Boolean).join(' · ')}</p></div>
            ${it.file ? `<a class="btn btn-outline btn-sm" href="${r}${it.file}" download>${icon('down', 18)} Download<span class="visually-hidden"> ${esc(it.title)}</span></a>` : it.url ? `<a class="btn btn-outline btn-sm" href="${it.url}" rel="noopener">${icon('arrow', 18)} Open<span class="visually-hidden"> ${esc(it.title)} (opens ${esc(it.source)} website)</span></a>` : `<span class="soon">Coming soon</span>`}
          </li>`).join('')}
        </ul></div>
      </details>`).join('')}
    </div>
    <p class="doc-empty" data-doc-empty hidden>No documents match that search. Try “minutes” or “planning”.</p>
    <p class="note">Looking for something that isn’t here? <a href="${r}contact/">Contact us</a>.</p>
  </div>
</section>`,
});

// Contact
page('contact/', {
  current: 'contact/',
  title: 'Contact',
  description: `Contact ${site.name}: questions, ideas and issues.`,
  body: r => `${pageHero({ eyebrow: 'Contact', title: 'Got a question, idea or issue?', intro: `Get in touch. We aim to reply within ${ph(site.replyDays + ' days')}.` })}
<section class="section tight">
  <div class="container form-grid">
    <form class="form" data-form="contact" novalidate action="mailto:${site.email}" method="post" enctype="text/plain" data-reveal>
      ${field({ id: 'c-name', label: 'Name', autocomplete: 'name' })}
      ${field({ id: 'c-email', label: 'Email', type: 'email', autocomplete: 'email' })}
      ${addressField('c-address', false)}
        <div class="field">
          <label for="c-topic">Topic</label>
          <select id="c-topic" name="c-topic" required>
            <option value="">Choose a topic</option>
            <option>General</option><option>Report an issue</option><option>Events</option><option>Membership</option><option>Media</option>
          </select>
          <p class="error" id="c-topic-error" hidden></p>
        </div>
      <div class="field">
        <label for="c-message">Message</label>
        <textarea id="c-message" name="c-message" rows="6" required maxlength="2000" aria-describedby="c-message-count"></textarea>
        <p class="hint count-hint" id="c-message-count" aria-live="polite">Up to 2,000 characters</p>
        <p class="error" id="c-message-error" hidden></p>
      </div>
      ${consent(r, 'c-consent')}
      <button class="btn btn-primary btn-lg" type="submit">Send message ${icon('arrow')}</button>
      <p class="form-status" role="status" hidden></p>
    </form>

    <aside class="contact-side">
      <div class="direct" data-reveal>
        <p class="eyebrow">Email us directly</p>
        <p><a class="big-link" href="mailto:${site.email}">${ph(site.email)}</a></p>
        <p class="socials"><a href="${site.facebook}" rel="noopener">Facebook</a><a href="${site.instagram}" rel="noopener">Instagram</a></p>
      </div>
      <div class="routes" data-reveal style="--i:1">
        <h2 class="display-s">Who to contact for what</h2>
        <ul>
          <li class="urgent">${icon('alert', 22)}<p><strong>Emergencies:</strong> call <a href="tel:999">999</a> or <a href="tel:112">112</a>.</p></li>
          <li>${icon('lamp', 22)}<p><strong>Roads, street lights and green areas:</strong> the estate is <a href="${r}news/taking-in-charge/">not yet taken in charge</a>, so these are still the developer’s job. Report them to Glenveagh Homes (${ph('contact to be confirmed')}) and copy us.</p></li>
          <li>${icon('file', 22)}<p><strong>Bins, illegal dumping and other council services:</strong> report to <a href="${site.councilUrl}" rel="noopener">${esc(site.council)}</a> (${ph('reporting link to be confirmed')}).</p></li>
          <li>${icon('home', 22)}<p><strong>Clúid Housing tenants:</strong> report repairs in your home to <a href="${site.cluidUrl}" rel="noopener">Clúid Housing</a>.</p></li>
          <li>${icon('shield', 22)}<p><strong>Anti-social behaviour:</strong> ${esc(site.garda.name)}, ${esc(site.garda.address)}, <a href="tel:${site.garda.tel}">${esc(site.garda.phone)}</a>.</p></li>
          <li>${icon('chat', 22)}<p><strong>Everything else:</strong> use the form.</p></li>
        </ul>
      </div>
      <div class="direct" data-reveal style="--i:2">
        <p class="eyebrow">Where we meet</p>
        <p>${ph(site.meetingVenue)}, ${ph(site.meetingRhythm)}.</p>
      </div>
    </aside>
  </div>
</section>`,
});

// Privacy
page('privacy/', {
  current: null,
  title: 'Privacy notice',
  description: `How ${site.name} uses the personal data it collects.`,
  body: r => `<article class="article">
  <div class="container narrow">
    <p class="eyebrow">Privacy notice</p>
    <h1 class="display-xl">How we use your details.</h1>
    <div class="prose">
      <p class="callout">${FINAL ? '' : '<strong>Draft for committee sign-off.</strong> '}The committee must confirm the data controller, retention period and storage before launch.</p>
      <h2>Who we are</h2>
      <p>${ph(site.name)} is the data controller for personal data collected through this website. Contact: <a href="mailto:${site.email}">${ph(site.email)}</a>.</p>
      <h2>What we collect</h2>
      <p>When you join, volunteer or contact us, we collect your name, road and house number, email address, and, if you give it, your phone number, interests and message.</p>
      <h2>Why we use it</h2>
      <p>Only to contact you about association business: membership, meetings, events and replies to your messages. Our legal basis is your consent, which you can withdraw at any time.</p>
      <h2>How the forms work</h2>
      <p>The forms on this site open an email to the association in your own email app. The website does not store anything you type. Your email is kept in the association’s mailbox.</p>
      <h2>Who sees it</h2>
      <p>Committee members only. We never sell or share your details, and we never pass them to councillors, political parties or businesses.</p>
      <h2>How long we keep it</h2>
      <p>For as long as you are a member, and ${ph('12 months')} after you leave or your last contact with us. Then we delete it.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete your data at any time by emailing us. If you are unhappy with how we handle it, you can complain to the <a href="https://www.dataprotection.ie/" rel="noopener">Data Protection Commission</a>.</p>
      <h2>Cookies</h2>
      <p>This website uses no cookies and no tracking.</p>
      <p class="byline">Last updated <time datetime="${site.lastUpdated}">${shortDate(site.lastUpdated)}</time></p>
    </div>
  </div>
</article>`,
});

/* ---------- write ---------- */
if (existsSync(OUT)) {
  // Keep the committed fonts directory; rebuild everything else.
  for (const f of readdirSync(OUT)) if (f !== 'fonts') rmSync(join(OUT, f), { recursive: true, force: true });
}
mkdirSync(OUT, { recursive: true });

const written = new Set();
for (const p of pages) {
  const file = join(OUT, p.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, layout(p));
  written.add(relative(OUT, file));
  if (p.ics) {
    writeFileSync(join(OUT, p.path, 'event.ics'), p.ics);
    written.add(relative(OUT, join(OUT, p.path, 'event.ics')));
  }
}
// The favicon is the logo mark, with the colour tokens written out.
const HEX = { green: '#173B2C', ochre: '#C8913A', 'ochre-light': '#E0B25E', limestone: '#EDE9E0' };
writeFileSync(join(OUT, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${markShapes.replace(/var\(--([\w-]+)\)/g, (_, k) => HEX[k])}</svg>\n`);
written.add('favicon.svg');
for (const f of ['styles.css', 'robots.txt', 'vercel.json']) {
  copyFileSync(join(HERE, 'assets', f), join(OUT, f));
  written.add(f);
}
// The forms send to the address in data.mjs.
writeFileSync(join(OUT, 'main.js'), readFileSync(join(HERE, 'assets/main.js'), 'utf8').replace("'__EMAIL__'", `'${site.email}'`));
written.add('main.js');
mkdirSync(join(OUT, 'fonts'), { recursive: true });
for (const f of readdirSync(join(HERE, 'assets/fonts'))) {
  copyFileSync(join(HERE, 'assets/fonts', f), join(OUT, 'fonts', f));
  written.add('fonts/' + f);
}
copyFileSync(join(HERE, 'README.site.md'), join(OUT, 'README.md'));

/* ---------- check: every internal link and asset resolves ---------- */
let broken = 0;
for (const rel of written) {
  if (!rel.endsWith('.html')) continue;
  const html = readFileSync(join(OUT, rel), 'utf8');
  const base = dirname(join(OUT, rel));
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    let target = join(base, clean);
    if (clean.endsWith('/') || clean === '.' || clean === '..') target = join(target, 'index.html');
    if (!existsSync(target)) {
      console.error(`Broken link in ${rel}: ${url}`);
      broken++;
    }
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${id}"`)) {
      console.error(`Missing anchor in ${rel}: #${id}`);
      broken++;
    }
  }
}
if (broken) {
  console.error(`${broken} broken link(s).`);
  process.exit(1);
}
console.log(`Built ${pages.length} pages, ${events.length} calendar files into ${relative(process.cwd(), OUT) || '.'} (${FINAL ? 'final' : 'preview'}). All internal links resolve.`);
