import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH let one build serve getawebsite.ie/amptech (the default) or the client's own domain at /.
export default defineConfig({
  site: process.env.SITE_URL || 'https://getawebsite.ie',
  base: process.env.BASE_PATH || '/amptech',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
