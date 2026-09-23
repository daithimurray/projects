import { useState } from "react";
import { Alert, Button, Card, Checkbox, FormField, Input, Radio, SectionHeader, Select, Stepper, Textarea, TextLink } from "../design-system";
import { Section } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, PSA_LICENCE } from "../content";
import { go } from "../router";
import type { ShowToast } from "../App";

const STEPS = ["Property", "Systems", "Contact"];
const stack = { display: "flex", flexDirection: "column", gap: 20 } as const;

export function Survey({ toast }: { toast: ShowToast }) {
  const [step, setStep] = useState(0);
  const [premises, setPremises] = useState("home");
  const last = step === STEPS.length - 1;

  const next = () => {
    if (!last) return setStep(step + 1);
    toast({ tone: "success", title: "Survey requested", description: "We'll call within one working day to arrange a time." });
    go("home");
  };

  return (
    <main>
      <Section style={{ paddingTop: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 7fr) minmax(0, 4fr)", gap: 64, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 640 }}>
            <SectionHeader eyebrow="Free survey" title="Tell us a little about the building" description="Three short steps. An engineer calls you back within one working day to arrange a visit." level={1} />
            <Stepper steps={STEPS} current={step} />
            <Card padding={32}>
              {step === 0 && (
                <div style={stack}>
                  <FormField label="Is this for a home or a business?">
                    <Radio name="prem" value={premises} onChange={setPremises} direction="row" options={[{ value: "home", label: "Home" }, { value: "biz", label: "Business" }]} />
                  </FormField>
                  <FormField label="Property type" htmlFor="type">
                    <Select id="type" placeholder="Choose one" options={premises === "home" ? ["Detached house", "Semi-detached", "Terraced", "Apartment"] : ["Retail unit", "Office", "Warehouse", "Workshop / yard", "Other"]} />
                  </FormField>
                  <FormField label="Eircode" htmlFor="eir" hint="Helps us plan the visit" optional>
                    <Input id="eir" placeholder="D15 XY12" style={{ maxWidth: 200 }} />
                  </FormField>
                  <FormField label="Existing system" htmlFor="ex" optional>
                    <Input id="ex" placeholder="e.g. HKC alarm, about 10 years old" />
                  </FormField>
                </div>
              )}
              {step === 1 && (
                <div style={stack}>
                  <FormField label="Which systems are you interested in?" hint="Pick any. The engineer confirms what's actually needed.">
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <Checkbox id="s1" label="Intruder alarm" description="New system, upgrade or extension" defaultChecked />
                      <Checkbox id="s2" label="CCTV" description="Cameras, recorder and remote viewing" />
                      <Checkbox id="s3" label="Fire detection" description="Smoke/heat detectors or a full fire alarm system" />
                    </div>
                  </FormField>
                  <FormField label="Anything else we should know?" htmlFor="notes" optional>
                    <Textarea id="notes" rows={3} placeholder="Access, timing, what prompted this…" />
                  </FormField>
                </div>
              )}
              {step === 2 && (
                <div style={stack}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <FormField label="First name" htmlFor="fn" required><Input id="fn" /></FormField>
                    <FormField label="Surname" htmlFor="ln" required><Input id="ln" /></FormField>
                  </div>
                  <FormField label="Phone" htmlFor="ph" hint="We only call about your survey" required>
                    <Input id="ph" type="tel" iconLeft="phone" placeholder="+353 87 000 0000" />
                  </FormField>
                  <FormField label="Email" htmlFor="em" optional><Input id="em" type="email" iconLeft="mail" /></FormField>
                  <FormField label="Best time to call" htmlFor="bt">
                    <Select id="bt" options={["Morning (9–12)", "Afternoon (12–5)", "Any time"]} />
                  </FormField>
                  <Checkbox id="gdpr" label="You can contact me about this survey" description="We don't share your details or send marketing." />
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border-subtle)" }}>
                <Button variant="ghost" iconLeft="arrow-left" onClick={() => (step === 0 ? go("home") : setStep(step - 1))}>{step === 0 ? "Back to site" : "Back"}</Button>
                <Button iconRight={last ? undefined : "arrow-right"} onClick={next}>{last ? "Request survey" : "Continue"}</Button>
              </div>
            </Card>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 96 }}>
            <Card tone="brand-subtle">
              <div style={{ fontWeight: 600 }}>Prefer to talk?</div>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>Mon–Fri 8:30–17:30. An engineer, not a call centre.</p>
              <Button variant="secondary" iconLeft="phone" href={PHONE_TEL} style={{ alignSelf: "flex-start" }}>{PHONE_DISPLAY}</Button>
            </Card>
            <Alert tone="info" title="What happens next">A callback within one working day, a visit at a time that suits, then a fixed written quote.</Alert>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>PSA licence no. {PSA_LICENCE} · <TextLink href="#" size="sm" muted>Privacy notice</TextLink></div>
          </div>
        </div>
      </Section>
    </main>
  );
}
