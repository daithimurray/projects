import React from "react";
import { SkipLink } from "@ds/components/navigation/SkipLink.jsx";
import { NavBar } from "@ds/components/navigation/NavBar.jsx";
import { Footer } from "@ds/components/navigation/Footer.jsx";
import { Switch } from "@ds/components/forms/Switch.jsx";
import { Toast, ToastRegion } from "@ds/components/feedback/Toast.jsx";
import { OnePage } from "@ds/ui_kits/website/OnePage.jsx";

const THEME_KEY = "ih-kit-theme";
const NAV_OFFSET = 72;

const links = [
  { label: "Books", href: "#books" },
  { label: "Swift & Vanessa", href: "#swift" },
  { label: "Poetry", href: "#poetry" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const footerColumns = [
  { title: "On this page", links: [{ label: "Books", href: "#books" }, { label: "Poetry", href: "#poetry" }, { label: "Swift & Vanessa", href: "#swift" }] },
  { title: "Meet", links: [{ label: "Events", href: "#events" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] },
  { title: "Elsewhere", links: [{ label: "X · @cat_conlon", href: "https://x.com/cat_conlon" }, { label: "Buythebook.ie", href: "https://www.buythebook.ie/product/swift-vanessa-the-sluttery/" }, { label: "Limerick Writers' Centre", href: "https://limerickwriterscentre.com/" }] },
];

const readTheme = () => { try { return localStorage.getItem(THEME_KEY) === "dark"; } catch (e) { return false; } };

function scrollToHash(hash, behavior = "smooth") {
  const el = document.getElementById(hash.slice(1));
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, behavior: reduce ? "auto" : behavior });
  return true;
}

export function App() {
  const [dark, setDark] = React.useState(readTheme);
  const [toast, setToast] = React.useState(null);
  const [current, setCurrent] = React.useState("#top");

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem(THEME_KEY, dark ? "dark" : "light"); } catch (e) {}
  }, [dark]);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

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
    if (h === "#") { e.preventDefault(); return; }
    if (h && h.startsWith("#") && scrollToHash(h)) {
      e.preventDefault();
      history.replaceState(null, "", h);
      if (h === "#main") document.getElementById("main").focus({ preventScroll: true });
    }
  };

  return <div onClick={onClick}>
    <SkipLink />
    <NavBar brand="Cathy Conlon" brandHref="#top" current={current} links={links}
      actions={<Switch id="theme" size="sm" label={<span className="type-caption text-muted">Candlelight</span>} checked={dark} onChange={setDark} />} />
    <main id="main" tabIndex={-1}><OnePage onToast={setToast} /></main>
    <Footer name="Cathy Conlon" tagline="Poetry, fiction and radio drama from Celbridge, Co. Kildare." columns={footerColumns}
      bottomLinks={[{ label: "Privacy", href: "#" }, { label: "Colophon", href: "#" }]} />
    {toast && <ToastRegion><Toast tone="success" message={toast} onDismiss={() => setToast(null)} /></ToastRegion>}
  </div>;
}
