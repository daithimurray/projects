#!/usr/bin/env node
// Renders the hero posters and the social card from the live three.js scene.
//
// Usage (start the dev server first: `npx astro dev --port 4411`):
//   node tools/capture-hero.mjs [--port 4411] [--quality 0.85]
//
// The page is opened with ?poster: the scene renders a deterministic frame
// (floodlight on, camera at rest, no hint, fixed drizzle and cloud time) and
// exposes window.__heroCapture(w, h, q), which returns the canvas as WebP.
// Writes public/hero/poster-wide.webp (1600x1000), public/hero/poster-tall.webp
// (900x1500) and public/og.png (1200x630, the hero with its headline).
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const port = opt('port', '4411');
const quality = Number(opt('quality', 0.85));
const url = `http://localhost:${port}${opt('base', '/amptech/')}?poster`;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => path.join(root, 'public', p);
fs.mkdirSync(out('hero'), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'],
});

async function open(width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', (e) => console.error('  pageerror:', e.message));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__heroReady === true, null, { timeout: 180000 });
  await page.evaluate(() => document.fonts.ready);
  return { page, context };
}

const save = (file, dataUrl) => {
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  fs.writeFileSync(file, buf);
  console.log(`  ${path.relative(root, file)}  ${(buf.length / 1024).toFixed(0)} KB`);
};

// Posters: canvas only (no headline, no UI), rendered at their own aspect.
{
  const { page, context } = await open(1600, 1000);
  for (const [name, w, h] of [
    ['poster-wide', 1600, 1000],
    ['poster-tall', 900, 1500],
  ]) {
    const data = await page.evaluate(([w, h, q]) => window.__heroCapture(w, h, q), [w, h, quality]);
    save(out(`hero/${name}.webp`), data);
  }
  await context.close();
}

// Social card: the hero as a visitor sees it, headline included.
{
  const { page, context } = await open(1200, 630);
  // A card, not a page: the wordmark, the CCTV display and the headline.
  await page.addStyleTag({
    content:
      '.site-nav, .site-header__actions, .hero__lede, .hero__ctas, .hero__proof { display: none !important; } .hero__rec i { animation: none !important; }',
  });
  await page.waitForTimeout(400);
  const file = out('og.png');
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`  ${path.relative(root, file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  await context.close();
}

await browser.close();
