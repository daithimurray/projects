import React from "react";
export function ButtonGroup({ children, align = "start", direction = "row", gap = 8, wrap = true, style }) {
  return <div role="group" style={{ display: "flex", flexDirection: direction, flexWrap: wrap ? "wrap" : "nowrap", gap, alignItems: direction === "row" ? "center" : "stretch", justifyContent: align === "end" ? "flex-end" : align === "center" ? "center" : align === "between" ? "space-between" : "flex-start", ...style }}>{children}</div>;
}
