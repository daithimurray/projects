import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served under a sub-path of getawebsite.ie. To move it, change this and the redirects in vercel.json (keep both slashes).
const BASE_PATH = "/amptech/";

export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  build: { outDir: "dist" + BASE_PATH, emptyOutDir: true },
});
