// Build step: render the page to static HTML so it reads without JavaScript (search engines, link previews).
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const { render } = await import(here("./dist-ssr/entry-server.js"));
const file = here("./dist/index.html");
const html = await readFile(file, "utf8");
if (!html.includes('<div id="root"></div>')) throw new Error("prerender: #root placeholder not found in dist/index.html");
await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
await rm(here("./dist-ssr"), { recursive: true, force: true });
console.log("prerendered dist/index.html");
