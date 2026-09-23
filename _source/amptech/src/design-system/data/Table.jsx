import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Table({ columns = [], rows = [], caption, dense = false, striped = false, style }) {
  const py = dense ? 8 : 14;
  return <div style={{ overflowX: "auto", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", background: "var(--surface-default)", ...style }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-body-sm)" }}>
      {caption && <caption style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: "var(--text-body)", captionSide: "top" }}>{caption}</caption>}
      <thead><tr>{columns.map(c => <th key={c.key} scope="col" style={{ textAlign: c.align || "left", padding: py + "px 16px", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-tertiary)", background: "var(--surface-sunken)", borderBottom: "1px solid var(--border-default)", whiteSpace: "nowrap" }}>{c.label}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <Row key={r.id ?? i} row={r} columns={columns} py={py} striped={striped && i % 2 === 1} last={i === rows.length - 1} />)}</tbody>
    </table>
  </div>;
}
function Row({ row, columns, py, striped, last }) {
  const it = useInteractive(false);
  return <tr {...it.handlers} style={{ background: it.hover ? "var(--surface-sunken)" : striped ? "var(--surface-page)" : "transparent", ...transition("background-color") }}>
    {columns.map(c => <td key={c.key} style={{ padding: py + "px 16px", textAlign: c.align || "left", borderBottom: last ? "none" : "1px solid var(--border-subtle)", color: "var(--text-primary)", fontFamily: c.mono ? "var(--font-mono)" : "inherit", fontSize: c.mono ? 12 : "inherit", verticalAlign: "middle" }}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
  </tr>;
}
