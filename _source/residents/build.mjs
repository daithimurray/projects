// Builds the Hawthorn Green Residents' Association site into ../../residents/.
// No dependencies: `node build.mjs` (preview, placeholders underlined) or `node build.mjs --final`.
// Output is plain HTML, CSS and JS with relative paths, so it can be served from any folder.

import { mkdirSync, rmSync, writeFileSync, copyFileSync, readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, impact, whatWeDo, posts, events, committee, nextMeeting, documents, faqs } from './data.mjs';

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
const byDateDesc = (a, b) => b.date.localeCompare(a.date);
const byDateAsc = (a, b) => a.date.localeCompare(b.date);
const upcoming = events.filter(e => e.date >= site.lastUpdated).sort(byDateAsc);
const kindLabel = { news: 'News', council: 'Council notice', event: 'Event' };

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
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
</svg>`;

// Mark: a hawthorn sprig (leaf and three berries) over a roofline.
const mark = (size = 40) => `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">
  <rect width="48" height="48" rx="12" fill="var(--green)"/>
  <path d="M9 33 24 20l15 13" fill="none" stroke="var(--paper)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 20c1-6 5-9 11-9-1 6-5 9-11 9z" fill="var(--leaf)"/>
  <circle cx="18" cy="38" r="3" fill="var(--berry-bright)"/><circle cx="24.5" cy="39.5" r="3" fill="var(--berry-bright)"/><circle cx="31" cy="38" r="3" fill="var(--berry-bright)"/>
</svg>`;

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
    <a class="btn btn-sun btn-lg" href="${r}get-involved/#join">Become a member ${icon('arrow')}</a>
  </div>
  ${skyline('band')}
</section>`;

function footer(r) {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="${r}">${mark(44)}<span class="brand-text"><span class="brand-name">${esc(site.estate)}</span><span class="brand-sub">Residents’ Association</span></span></a>
        <p>The residents association for ${ph(site.estate)}, ${ph(site.area)}. Volunteer-run, non-political, and open to every resident.</p>
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
        <a class="btn btn-sun" href="${r}get-involved/#join">Join the association ${icon('arrow')}</a>
      </div>
    </div>
    <p class="footer-word" aria-hidden="true">${esc(site.estate)}</p>
    <div class="footer-base">
      <p>© ${new Date().getFullYear()} ${esc(site.name)}</p>
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

/* ---------- illustration: estate skyline ----------
   Deterministic rows of houses with windows that light up. Layers move at different speeds on scroll (main.js). */
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}
function houseRow({ seed, y, h, minW, maxW, fill, win, winChance, width = 1440 }) {
  const rand = rng(seed);
  let x = -20;
  let out = '';
  let n = 0;
  while (x < width + 20) {
    const w = Math.round(minW + rand() * (maxW - minW));
    const hh = Math.round(h * (0.8 + rand() * 0.35));
    const roof = Math.round(w * (0.28 + rand() * 0.14));
    const top = y - hh;
    out += `<path d="M${x} ${y}V${top}L${x + w / 2} ${top - roof}L${x + w} ${top}V${y}Z" fill="${fill}"/>`;
    if (rand() > 0.55) out += `<rect x="${x + w * 0.68}" y="${top - roof * 0.9}" width="${Math.max(6, w * 0.08)}" height="${roof * 0.7}" fill="${fill}"/>`;
    if (win) {
      const cols = w > 90 ? 3 : 2;
      const ww = Math.max(7, w * 0.13);
      for (let row = 0; row < 2; row++) {
        for (let c = 0; c < cols; c++) {
          const wx = x + (w / (cols + 1)) * (c + 1) - ww / 2;
          const wy = top + 12 + row * (hh * 0.38);
          const lit = rand() < winChance;
          out += `<rect class="win${lit ? ' lit' : ''}" style="--d:${(n++ % 17) * 0.23}s" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ww.toFixed(1)}" height="${(ww * 1.25).toFixed(1)}" rx="1.5" fill="${win}"/>`;
        }
      }
    }
    x += w + Math.round(4 + rand() * 18);
  }
  return out;
}
function tree(x, y, s, fill, berries) {
  let out = `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-40" width="8" height="40" fill="${fill}"/>`;
  out += `<circle cx="0" cy="-70" r="38" fill="${fill}"/><circle cx="-30" cy="-50" r="26" fill="${fill}"/><circle cx="30" cy="-52" r="28" fill="${fill}"/>`;
  if (berries) {
    const rand = rng(x + 7);
    for (let i = 0; i < 14; i++) out += `<circle class="berry" cx="${(rand() * 90 - 45).toFixed(1)}" cy="${(-rand() * 80 - 30).toFixed(1)}" r="3.2" fill="var(--berry-bright)" style="--d:${(i * 0.12).toFixed(2)}s"/>`;
  }
  return out + '</g>';
}
function skyline(variant) {
  if (variant === 'band') {
    return `<svg class="skyline skyline-band" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      ${houseRow({ seed: 11, y: 120, h: 50, minW: 50, maxW: 90, fill: 'rgba(255,255,255,.06)', winChance: 0 })}
    </svg>`;
  }
  return `<svg class="skyline" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
    <g class="layer" data-depth="0.18"><path d="M0 250C180 200 320 215 480 235S820 180 1000 205 1300 230 1440 200V420H0Z" fill="var(--hill)"/></g>
    <g class="layer" data-depth="0.1">${houseRow({ seed: 3, y: 330, h: 70, minW: 60, maxW: 110, fill: 'var(--house-far)', win: 'var(--win-far)', winChance: 0.3 })}</g>
    <g>${houseRow({ seed: 29, y: 404, h: 110, minW: 90, maxW: 150, fill: 'var(--house-near)', win: 'var(--sun)', winChance: 0.45 })}${tree(118, 408, 1.25, 'var(--tree)', true)}${tree(1318, 408, 1.1, 'var(--tree)', true)}<rect x="0" y="400" width="1440" height="60" fill="var(--house-near)"/></g>
  </svg>`;
}

/* ---------- components ---------- */
const dateBadge = iso => `<span class="date-badge" aria-hidden="true"><span class="db-m">${fmt(iso, { month: 'short' })}</span><span class="db-d">${fmt(iso, { day: 'numeric' })}</span></span>`;

const postCard = (p, r, i = 0) => `<article class="post-card" data-kind="${p.kind}" data-reveal style="--i:${i}">
  <p class="meta"><span class="tag tag-${p.kind}">${kindLabel[p.kind]}</span><time datetime="${p.date}">${shortDate(p.date)}</time></p>
  <h3><a class="stretched" href="${r}news/${p.slug}/">${esc(p.title)}</a></h3>
  <p>${esc(p.summary)}</p>
  <span class="more" aria-hidden="true">Read more ${icon('arrow', 18)}</span>
</article>`;

const eventRow = (e, r, i = 0) => `<li class="event-row" data-kind="event" data-reveal style="--i:${i}">
  ${dateBadge(e.date)}
  <div class="event-body">
    <h3><a class="stretched" href="${r}events/${e.slug}/">${esc(e.title)}</a></h3>
    <p class="event-meta"><span>${icon('clock', 16)}<time datetime="${e.date}T${e.start}">${fmt(e.date, { weekday: 'short', day: 'numeric', month: 'short' })}, ${time12(e.start)}</time></span><span>${icon('pin', 16)}${esc(e.place)}</span></p>
  </div>
  <span class="chev" aria-hidden="true">${icon('arrow')}</span>
</li>`;

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

const roadSelect = (id = 'road') => `<div class="field">
  <label for="${id}">Your road</label>
  <select id="${id}" name="${id}" required autocomplete="address-line1">
    <option value="">Choose your road</option>
    ${site.roads.map(r => `<option>${esc(r)}</option>`).join('')}
    <option>Outside the estate</option>
  </select>
  <p class="error" id="${id}-error" hidden></p>
</div>`;

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
      <p class="eyebrow" data-reveal>${ph(site.estate)} · ${ph(site.area)}</p>
      <h1 class="display-hero" data-reveal style="--i:1">Looking after ${(() => { const w = esc(site.estate).split(' '); const last = w.pop(); return `${w.length ? `<em>${w.join(' ')}</em> ` : ''}<span class="nw"><em>${last}</em>,</span>`; })()} together.</h1>
      <p class="lede" data-reveal style="--i:2">We’re the residents association for ${ph(site.estate)}. We represent ${ph(site.homes + ' homes')} and work with the council, local groups and each other to keep this a great place to live.</p>
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
        <li>${icon('pin', 18)}<span data-ne-place>${esc(next.place)}</span></li>
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

<section class="impact" aria-label="The association in numbers">
  <div class="container impact-grid">
    ${impact.map((m, i) => `<p class="stat" data-reveal style="--i:${i}"><span class="stat-num" data-count="${m.value}">${FINAL ? m.value : `<span class="ph">${m.value}</span>`}</span><span class="stat-label">${esc(m.label)}</span></p>`).join('')}
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
    <div class="prose" data-reveal style="--i:3">${p.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
  </div>
</article>`,
  });
}

// Single events + .ics
for (const e of events) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.place + ', ' + site.area)}`;
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
        <li>${icon('pin', 18)}<a href="${mapUrl}" rel="noopener">${esc(e.place)}</a></li>
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
    `UID:${e.slug}-${e.date}@hawthorngreen-ra.ie`,
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
    intro: `The committee is made up of volunteer residents, elected at our AGM each ${ph(site.meetingMonth)}. We meet ${ph(site.meetingRhythm)} and all residents are welcome to attend.`,
  })}
<section class="section tight">
  <div class="container">
    <ul class="people">
      ${committee.map((c, i) => `<li class="person" data-reveal style="--i:${i}">
        <span class="avatar" aria-hidden="true" style="--h:${(i * 47) % 360}">${esc(initials(c.name))}</span>
        <div><p class="role">${esc(c.role)}</p><h2 class="person-name">${ph(c.name)}</h2><p>${esc(c.line)}</p></div>
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
      <p class="eyebrow on-dark">Next committee meeting</p>
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
    intro: `Every resident of ${ph(site.estate)} can be a member, whether you own or rent.`,
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
      <div class="field-row">
        ${roadSelect()}
        ${field({ id: 'house', label: 'House number', autocomplete: 'address-line2', attrs: 'inputmode="numeric"' })}
      </div>
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
  body: r => `${pageHero({ eyebrow: 'Documents', title: 'Everything on the record.', intro: 'Minutes, reports and key documents from the association. Most recent first.' })}
<section class="section tight">
  <div class="container narrow">
    <div class="search" data-doc-search hidden>
      <label for="doc-q" class="visually-hidden">Search documents</label>
      ${icon('search', 20)}
      <input id="doc-q" type="search" placeholder="Search documents, for example “minutes”" autocomplete="off">
    </div>
    <p class="visually-hidden" role="status" data-doc-status></p>
    <div class="accordion docs">
      ${documents.map((c, i) => `<details${i < 3 ? ' open' : ''} data-reveal style="--i:${i}" data-doc-cat>
        <summary><span>${esc(c.category)} <span class="count">${c.items.length}</span></span>${icon('plus', 20)}</summary>
        <div class="acc-body"><ul class="doc-list">
          ${[...c.items].sort(byDateDesc).map(it => `<li class="doc" data-doc="${esc((it.title + ' ' + c.category).toLowerCase())}">
            ${icon('file', 22)}
            <div><p class="doc-title">${esc(it.title)}</p><p class="doc-meta"><time datetime="${it.date}">${shortDate(it.date)}</time> · ${it.type}, ${it.size}</p></div>
            ${it.file ? `<a class="btn btn-outline btn-sm" href="${r}${it.file}" download>${icon('down', 18)} Download<span class="visually-hidden"> ${esc(it.title)}</span></a>` : `<span class="soon">Coming soon</span>`}
          </li>`).join('')}
        </ul></div>
      </details>`).join('')}
    </div>
    <p class="doc-empty" data-doc-empty hidden>No documents match that search. Try “minutes” or “planning”.</p>
    <p class="note">Looking for something that isn’t here? <a href="${r}contact/">Contact the Secretary</a>.</p>
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
      ${roadSelect('c-road')}
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
          <li>${icon('lamp', 22)}<p><strong>Street lights, potholes, bins, illegal dumping:</strong> report to <a href="${site.councilUrl}" rel="noopener">${ph(site.council)}</a>.</p></li>
          <li>${icon('shield', 22)}<p><strong>Anti-social behaviour:</strong> contact ${ph(site.garda)}.</p></li>
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
      <p>${esc(site.name)} is the data controller for personal data collected through this website. Contact: <a href="mailto:${site.email}">${ph(site.email)}</a>.</p>
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
for (const f of ['styles.css', 'favicon.svg', 'robots.txt', 'vercel.json']) {
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
