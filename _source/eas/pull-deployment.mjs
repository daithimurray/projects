// Download the source files of a Vercel deployment (CLI-uploaded static deploys).
// Usage: VERCEL_TOKEN=... node pull-deployment.mjs <deploymentId> <outDir> [teamId]
import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';

const [id, out, teamId] = process.argv.slice(2);
const token = process.env.VERCEL_TOKEN;
if (!id || !out || !token) {
  console.error('Usage: VERCEL_TOKEN=... node pull-deployment.mjs <deploymentId> <outDir> [teamId]');
  process.exit(1);
}
const q = teamId ? `?teamId=${teamId}` : '';
const api = (path) => fetch(`https://api.vercel.com${path}${q}`, { headers: { Authorization: `Bearer ${token}` } });

const tree = await api(`/v6/deployments/${id}/files`);
if (!tree.ok) throw new Error(`File tree: HTTP ${tree.status} ${await tree.text()}`);
const entries = await tree.json();

let count = 0;
async function walk(nodes, base) {
  for (const n of nodes) {
    const path = join(base, n.name);
    if (n.type === 'directory') { await walk(n.children || [], path); continue; }
    if (n.type !== 'file') continue;
    const res = await api(`/v7/deployments/${id}/files/${n.uid}`);
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    // The endpoint returns either raw bytes or JSON { data: base64 }, depending on API version.
    let buf = Buffer.from(await res.arrayBuffer());
    if ((res.headers.get('content-type') || '').includes('application/json')) {
      try { const j = JSON.parse(buf.toString()); if (typeof j.data === 'string') buf = Buffer.from(j.data, 'base64'); } catch {}
    }
    await mkdir(dirname(join(out, path)), { recursive: true });
    await writeFile(join(out, path), buf);
    count++;
    console.log(path);
  }
}
await walk(entries, '');
console.log(`\n${count} files written to ${out}`);
// Source uploads are often nested under a top-level "src/" entry: check before deploying.
