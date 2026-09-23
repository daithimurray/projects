import { useEffect, useState } from "react";

export type Page = "home" | "service" | "survey";

const SERVICE_ROUTES = new Set(["cctv", "alarms", "fire"]);

export function pageFromHash(hash: string): Page {
  const h = hash.replace("#/", "");
  if (h === "survey") return "survey";
  if (SERVICE_ROUTES.has(h)) return "service";
  return "home";
}

export function go(page: "home" | "survey") {
  location.hash = page === "home" ? "/" : "/" + page;
}

/** Hash router: returns the current hash (for nav active state) and resolved page; scrolls to top on change. */
export function useHashRoute() {
  const [hash, setHash] = useState(() => location.hash || "#/");
  useEffect(() => {
    const onChange = () => { setHash(location.hash || "#/"); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return { hash, page: pageFromHash(hash) };
}
