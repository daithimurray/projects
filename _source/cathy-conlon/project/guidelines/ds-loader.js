/* Card helper: resolves the compiled bundle namespace, or compiles the component sources in-browser as a fallback. */
window.IHLoad = async function (paths) {
  let bundle = null;
  for (const k of Object.keys(window)) { if (k === "IH") continue; try { const v = window[k]; if (v && typeof v === "object" && typeof v.Button === "function" && typeof v.PoemBlock === "function") { bundle = v; break; } } catch (e) {} }
  const NS = window.IH = window.IH || Object.assign({}, bundle || {});
  const srcs = await Promise.all(paths.map(p => NS["__" + p] ? null : fetch(p).then(r => r.text())));
  for (const [i, p] of paths.entries()) {
    if (NS["__" + p]) continue;
    const src = srcs[i];
    const names = [...src.matchAll(/export\s+(?:function|const|let|class)\s+(\w+)/g)].map(m => m[1]);
    if (names.length && names.every(n => n in NS)) { NS["__" + p] = true; continue; }
    const imported = [...src.matchAll(/import\s*\{([^}]+)\}\s*from/g)].flatMap(m => m[1].split(",").map(s => s.trim().split(/\s+as\s+/).pop()).filter(Boolean));
    const code = (imported.length ? "const {" + imported.join(",") + "} = window.IH;\n" : "") + src.replace(/^import\s.*$/mg, "").replace(/export\s+(function|const|let|class)/g, "$1") + "\n;Object.assign(window.IH,{" + names.join(",") + "});";
    new Function("React", Babel.transform(code, { presets: ["react"] }).code)(React);
    NS["__" + p] = true;
  }
  return NS;
};
window.addEventListener("unhandledrejection", e => { console.error("IHLoad:", e.reason); const d = document.createElement("pre"); d.style.cssText = "padding:16px;color:#A83A32;font:12px monospace;white-space:pre-wrap"; d.textContent = String(e.reason && e.reason.stack || e.reason); document.body.appendChild(d); });
window.IHTheme = function () { const u = new URL(location.href); if (u.searchParams.get("theme") === "dark") document.documentElement.dataset.theme = "dark"; };
