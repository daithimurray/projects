import { useEffect, useState } from "react";

import type { ServiceKey } from "./services";

export type Page = "home" | "service" | "survey";

/** Home-page sections reachable from the nav. */
const SECTIONS: Record<string, string> = { services: "services", reviews: "reviews", questions: "questions" };
const SERVICE_ROUTES: ServiceKey[] = ["alarms", "cctv", "fire"];

export function parseHash(hash: string): { page: Page; section?: string; service?: ServiceKey } {
  const h = hash.replace("#/", "");
  if (h === "survey") return { page: "survey" };
  if ((SERVICE_ROUTES as string[]).includes(h)) return { page: "service", service: h as ServiceKey };
  if (SECTIONS[h]) return { page: "home", section: SECTIONS[h] };
  return { page: "home" };
}

export function go(page: "home" | "survey") {
  location.hash = page === "home" ? "/" : "/" + page;
}

/** Hash router: current hash (for nav active state), page, and optional home section to scroll to. */
export function useHashRoute() {
  const [hash, setHash] = useState(() => location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const route = parseHash(hash);
  useEffect(() => {
    // After the page renders: jump to the section, or to the top for a new page.
    requestAnimationFrame(() => {
      const el = route.section && document.getElementById(route.section);
      if (el) el.scrollIntoView({ block: "start" });
      else window.scrollTo(0, 0);
    });
  }, [hash]); // eslint-disable-line react-hooks/exhaustive-deps
  return { hash, ...route };
}
