import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function SearchField({ id = "search", label = "Search", placeholder = "Search poems, books, essays…", value, onChange, onClear, shortcut, size = "md", className, ...rest }) {
  return <div role="search" className={cx("ih-search", className)}>
    <span className="ih-search__icon" aria-hidden="true">⌕</span>
    <input id={id} type="search" aria-label={label} placeholder={placeholder} value={value} onChange={onChange} className={cx("ih-input", size === "sm" && "ih-input--sm")} {...rest} />
    {value ? <button type="button" className="ih-iconbtn ih-iconbtn--sm ih-iconbtn--round ih-search__clear" aria-label="Clear search" onClick={onClear}><span aria-hidden="true">×</span></button>
           : shortcut && <kbd className="ih-search__kbd">{shortcut}</kbd>}
  </div>;
}
