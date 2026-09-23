import React from "react";
import { List, X, Moon, Sun } from "@phosphor-icons/react";
import { SkipLink } from "@ds/components/navigation/SkipLink.jsx";
import { NavBar } from "@ds/components/navigation/NavBar.jsx";
import { Footer } from "@ds/components/navigation/Footer.jsx";
import { OnePage } from "./OnePage.jsx";
import { author, novel, publisher } from "./content.js";

export const THEME_KEY = "cc-theme";
const NAV_OFFSET = 72;
const BASE = import.meta.env.BASE_URL;

const links = [
  { label: "Books", href: "#books" },
  { label: "Swift & Vanessa", href: "#swift" },
  { label: "Poetry", href: "#poetry" },
  { label: "Readings", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const footerColumns = [
  { title: "On this page", links },
  { title: "Elsewhere", links: [{ label: "@cat_conlon on X", href: author.x }, { label: "Buy the novel at Buythebook.ie", href: novel.buy }, { label: publisher.name, href: publisher.href }] },
];

function scrollToHash(hash, behavior = "smooth") {
  const el = document.getElementById(hash.slice(1));
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: reduce ? "auto" : behavior });
  return true;
}

// Theme: follow the system unless the visitor has chosen. Server and first client render agree (light, no choice);
// the pre-paint script in index.html has already applied any stored choice, so there is no flash.
function useTheme() {
  const [pref, setPref] = React.useState(null);
  const [systemDark, setSystemDark] = React.useState(false);
  React.useEffect(() => {
    try { const s = localStorage.getItem(THEME_KEY); if (s === "dark" || s === "light") setPref(s); } catch (e) {}
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const on = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const dark = pref ? pref === "dark" : systemDark;
  const toggle = () => {
    const next = dark ? "light" : "dark";
    setPref(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  };
  return [dark, toggle];
}

export function App() {
  const [dark, toggleTheme] = useTheme();
  const [current, setCurrent] = React.useState("#top");

  // Highlight the nav link for the section in the middle of the viewport.
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((x) => { if (x.isIntersecting) setCurrent("#" + x.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach((l) => { const el = document.getElementById(l.href.slice(1)); el && obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Honour a deep link (e.g. /#events) once the page has rendered.
  React.useEffect(() => { if (location.hash.length > 1) scrollToHash(location.hash, "auto"); }, []);

  const onClick = (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const h = a.getAttribute("href");
    if (h && h.startsWith("#") && h.length > 1 && scrollToHash(h)) {
      e.preventDefault();
      history.replaceState(null, "", h);
      if (h === "#main") document.getElementById("main").focus({ preventScroll: true });
    }
  };

  const themeLabel = dark ? "Switch to light theme" : "Switch to dark theme";
  return <div onClick={onClick}>
    <SkipLink />
    <NavBar brand={author.name} brandHref="#top" current={current} links={links}
      menuIcon={<List size={22} />} closeIcon={<X size={22} />}
      actions={<button type="button" className="ih-iconbtn" aria-label={themeLabel} title={themeLabel} onClick={toggleTheme}>{dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}</button>} />
    <main id="main" tabIndex={-1}><OnePage /></main>
    <Footer name={author.name} tagline="Poetry, fiction and radio drama from Celbridge, Co. Kildare." columns={footerColumns}
      copyright={`© ${new Date().getFullYear()} ${author.name}. Set in Cormorant Garamond, Newsreader and Instrument Sans.`}
      bottomLinks={[{ label: "Privacy", href: BASE + "privacy/" }]} />
  </div>;
}
