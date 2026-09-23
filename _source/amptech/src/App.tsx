import { useEffect, useState } from "react";
import { Footer, Navbar, Toast } from "./design-system";
import type { ToastProps } from "./design-system/feedback/Toast";
import { FOOTER_COLS, LEGAL, NAV } from "./content";
import { go, useHashRoute } from "./router";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { Survey } from "./pages/Survey";

export type ShowToast = (t: Omit<ToastProps, "onDismiss">) => void;

export function App() {
  const { hash, page } = useHashRoute();
  const [toast, setToast] = useState<Omit<ToastProps, "onDismiss"> | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div>
      <Navbar links={NAV} activeHref={hash} sticky onCta={() => go("survey")} />
      {page === "survey" ? <Survey toast={setToast} /> : page === "service" ? <Service /> : <Home />}
      <Footer columns={FOOTER_COLS} legal={LEGAL} />
      {toast && (
        <div style={{ position: "fixed", left: 24, bottom: 24, zIndex: 500 }}>
          <Toast {...toast} onDismiss={() => setToast(null)} />
        </div>
      )}
    </div>
  );
}
