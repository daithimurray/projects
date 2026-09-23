import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
// Design-system tokens and components. tokens/fonts.css (Google Fonts) is skipped: fonts are self-hosted above.
import "@ds/tokens/colors.css";
import "@ds/tokens/typography.css";
import "@ds/tokens/spacing.css";
import "@ds/tokens/layout.css";
import "@ds/tokens/base.css";
import "@ds/components/components.css";
import "./site.css";
import { App } from "./App.jsx";

const root = document.getElementById("root");
const app = <React.StrictMode><App /></React.StrictMode>;
// The build pre-renders the page into #root; hydrate it. The dev server serves an empty root, so render.
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
