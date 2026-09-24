#!/usr/bin/env node
// Screenshot + console harness for checking sections in a real browser.
//
// Usage (start `npm run dev -- --port 4400` or `npm run preview -- --port 4400` first):
//   node tools/shoot.mjs --port 4400 --widths 390,1440 --selector "#services"
//   node tools/shoot.mjs --port 4400 --full --widths 390,1440
//   node tools/shoot.mjs --port 4400 --selector "#how-it-works" --frames 0,0.2,0.5,0.8,1
//   node tools/shoot.mjs --port 4400 --reduced --full
//   node tools/shoot.mjs --port 4400 --hover ".btn--primary" --selector "#top"
//
// --frames: for pinned/scrubbed sections. Scrolls so the section's scroll range
//   (top of section at top of viewport -> bottom of section at bottom of viewport)
//   is at each progress value, then captures the viewport.
// Prints console errors, page errors and horizontal overflow for every width.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = args[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
};

const port = opt('port', '4321');
const base = opt('base', '/amptech/');
const url = opt('url', `http://localhost:${port}${base}`);
const widths = String(opt('widths', '390,1440')).split(',').map(Number);
const selector = opt('selector', null);
const full = !!opt('full', false);
const reduced = !!opt('reduced', false);
const frames = opt('frames', null);
const hover = opt('hover', null);
const outDir = opt('out', 'shots');
const wait = Number(opt('wait', 1400));
const tag = opt('tag', '');
const heightFor = (w) => Number(opt('height', w < 700 ? 844 : w < 1100 ? 1024 : 900));

fs.mkdirSync(outDir, { recursive: true });
const slug = (s) => String(s || 'page').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'],
});

const files = [];
for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: heightFor(width) },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
    hasTouch: width < 700,
    isMobile: width < 700,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`[console.${m.type()}] ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));

  await page.goto(url, { waitUntil: 'networkidle' });
  // The skip link shows while the page has focus after load; never capture it.
  await page.addStyleTag({ content: '.skip-link{display:none!important}' });
  await page.waitForTimeout(wait);

  // Walk the page so once-only scroll reveals fire, then return to the top.
  const walk = async () => {
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += Math.round(heightFor(width) * 0.6)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(90);
    }
    await page.waitForTimeout(600);
  };

  const prefix = `${slug(tag || selector || 'page')}-${width}${reduced ? '-reduced' : ''}`;

  if (frames && selector) {
    const list = String(frames).split(',').map(Number);
    for (const p of list) {
      await page.evaluate(
        ({ sel, p }) => {
          const el = document.querySelector(sel);
          const pinSpacer = el.closest('.pin-spacer') || el;
          const top = pinSpacer.getBoundingClientRect().top + window.scrollY;
          const range = Math.max(0, pinSpacer.offsetHeight - window.innerHeight);
          window.scrollTo(0, top + range * p);
        },
        { sel: selector, p },
      );
      await page.waitForTimeout(wait);
      const file = path.join(outDir, `${prefix}-f${String(p).replace('.', '_')}.png`);
      await page.screenshot({ path: file });
      files.push(file);
    }
  } else if (full) {
    await walk();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(wait);
    const file = path.join(outDir, `${prefix}-full.png`);
    await page.screenshot({ path: file, fullPage: true });
    files.push(file);
  } else if (selector) {
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(wait);
    if (hover) {
      await page.locator(hover).first().hover();
      await page.waitForTimeout(500);
    }
    const file = path.join(outDir, `${prefix}.png`);
    // Fixed chrome would be stitched into tall element captures.
    // A viewport-resizing element capture can re-run the floodlight reveal mid-way; show the lit state.
    await page.addStyleTag({ content: '.site-header,.mobile-bar{visibility:hidden!important}.lit-veil{display:none!important}' });
    const box = await el.boundingBox();
    if (box && box.height > heightFor(width) * 3) {
      // Very tall (pinned) sections: capture the viewport instead.
      await page.screenshot({ path: file });
    } else {
      await el.screenshot({ path: file });
    }
    files.push(file);
  } else {
    const file = path.join(outDir, `${prefix}-viewport.png`);
    if (hover) {
      await page.locator(hover).first().hover();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: file });
    files.push(file);
  }

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const over = doc.scrollWidth - doc.clientWidth;
    if (over <= 0) return null;
    const culprits = [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${[...el.classList].join('.')}`);
    return { over, culprits };
  });

  console.log(`\n== ${width}px ${reduced ? '(reduced motion)' : ''}`);
  if (overflow) console.log(`  HORIZONTAL OVERFLOW ${overflow.over}px:`, overflow.culprits.join(', '));
  else console.log('  no horizontal overflow');
  if (errors.length) errors.forEach((e) => console.log('  ' + e));
  else console.log('  no console errors');
  await context.close();
}

await browser.close();
console.log('\nfiles:\n' + files.map((f) => '  ' + f).join('\n'));
