import { Footer, Navbar } from "./design-system";
import { FOOTER_COLS, LEGAL, NAV, PHONE_DISPLAY, PHONE_TEL, PSA_LICENCE } from "./content";
import { go, useHashRoute } from "./router";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { Survey } from "./pages/Survey";

function UrgentStrip() {
  return (
    <div className="urgent">
      <p style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "4px var(--grid-margin)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 8px" }}>
        <span>Break-in, alarm fault or a siren that won't stop? Talk to an engineer:</span>
        <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
      </p>
    </div>
  );
}

export function App() {
  const { hash, page } = useHashRoute();
  return (
    <div>
      <UrgentStrip />
      <Navbar links={NAV} activeHref={hash} phone={PHONE_DISPLAY} sticky onCta={() => go("survey")} />
      {page === "survey" ? <Survey /> : page === "service" ? <Service /> : <Home />}
      <Footer columns={FOOTER_COLS} legal={LEGAL} phone={PHONE_DISPLAY} licence={"PSA licence no. " + PSA_LICENCE} />
    </div>
  );
}
