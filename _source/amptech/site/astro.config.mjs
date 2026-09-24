import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Every section script imports the shared motion chunk (GSAP, ScrollTrigger,
// Lenis). Preload it from <head> so the browser fetches it alongside the
// section modules instead of discovering it only after they arrive.
const preloadSharedMotion = () => ({
  name: 'amptech-preload-shared-motion',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir);
      const assets = path.join(root, '_astro');
      if (!fs.existsSync(assets)) return;
      const shared = fs.readdirSync(assets).filter((f) => /^motion\.[\w-]+\.js$/.test(f));
      if (!shared.length) return;
      const base = `${(process.env.BASE_PATH || '/amptech').replace(/\/$/, '')}/`;
      const pages = (d) =>
        fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? pages(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : [],
        );
      for (const file of pages(root)) {
        const html = fs.readFileSync(file, 'utf8');
        if (!html.includes('type="module"')) continue;
        const links = shared.map((f) => `<link rel="modulepreload" href="${base}_astro/${f}">`).join('');
        fs.writeFileSync(file, html.replace('</title>', `</title>${links}`));
      }
    },
  },
});

// SITE_URL and BASE_PATH let one build serve getawebsite.ie/amptech (the default) or the client's own domain at /.
export default defineConfig({
  site: process.env.SITE_URL || 'https://getawebsite.ie',
  base: process.env.BASE_PATH || '/amptech',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  integrations: [preloadSharedMotion()],
  // The hero's lazy three.js chunk is ~150 KB gzipped and loads after the page is idle.
  vite: { build: { chunkSizeWarningLimit: 700 } },
});
