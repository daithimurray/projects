import React from "react";
export function SkipLink({ href = "#main", children = "Skip to content", ...rest }) {
  return <a className="ih-skip" href={href} {...rest}>{children}</a>;
}
