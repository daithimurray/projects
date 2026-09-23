import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// SITE_URL and BASE_PATH let the same build serve the client's domain or a sub-path such as getawebsite.ie/leixlip-tarmac.
export default defineConfig({
  site: process.env.SITE_URL || 'https://leixliptarmac.com',
  base: process.env.BASE_PATH || '/',
  integrations: [react()],
});
