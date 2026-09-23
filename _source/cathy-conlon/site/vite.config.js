import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

// The design system in ../project is the single source of truth for components, tokens and content.
// It has no node_modules of its own, so React resolves from this package.
// Served from getawebsite.ie/cathy-conlon/. Output goes straight into the deployable folder at the repo root.
export default defineConfig({
  base: "/cathy-conlon/",
  build: { outDir: here("../../../cathy-conlon"), emptyOutDir: true },
  plugins: [react({ include: /\.(jsx|js)$/ })],
  resolve: {
    alias: { "@ds": here("../project"), react: here("./node_modules/react"), "react-dom": here("./node_modules/react-dom") },
    dedupe: ["react", "react-dom"],
  },
  server: { fs: { allow: [here("..")] } },
});
