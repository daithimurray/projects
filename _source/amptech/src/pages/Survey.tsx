import { useRef, useState } from "react";
import { Alert, Button, Card, Checkbox, Dialog, DescriptionList, FormField, Input, Radio, SectionHeader, Select, Stepper, Textarea, TextLink } from "../design-system";
import { Section, vars } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, PSA_LICENCE } from "../content";
import { go } from "../router";

const STEPS = ["Property", "Systems", "Contact"];
const SYSTEMS = [
  { id: "alarm", label: "Intruder alarm", description: "New system, upgrade or extension" },
  { id: "cctv", label: "CCTV", description: "Cameras, recorder and remote viewing" },
  { id: "fire", label: "Fire detection", description: "Smoke and heat detectors, or a full fire alarm system" },
] as const;
const TYPES = {
  home: ["Detached house", "Semi-detached", "Terraced", "Apartment"],
  biz: ["Retail unit", "Office", "Warehouse", "Workshop or yard", "Other"],
};
const TIMES = ["Any time", "Morning (9am to 12pm)", "Afternoon (12pm to 5pm)"];

type Form = {
  premises: "home" | "biz"; type: string; eircode: string; existing: string;
  systems: string[]; notes: string;
  first: string; last: string; phone: string; email: string; time: string; consent: boolean;
};
const EMPTY: Form = { premises: "home", type: "", eircode: "", existing: "", systems: ["alarm"], notes: "", first: "", last: "", phone: "", email: "", time: TIMES[0], consent: false };

// Irish landline or mobile, with or without +353 / 00353. Spaces, dashes and brackets ignored.
const IRISH_PHONE = /^(?:0|\+353|00353)\d{8,9}$/;

function validate(step: number, f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (step === 0 && !f.type) e.type = "Choose the property type.";
  if (step === 1 && f.systems.length === 0) e.systems = "Pick at least one. The engineer will confirm what you actually need.";
  if (step === 2) {
    if (!f.first.trim()) e.first = "Enter your first name.";
    if (!f.last.trim()) e.last = "Enter your surname.";
    if (!IRISH_PHONE.test(f.phone.replace(/[\s\-()]/g, ""))) e.phone = "Enter an Irish phone number, like 087 123 4567 or 01 800 0000.";
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Check the email address, or leave it blank.";
    if (!f.consent) e.consent = "Tick this so we can call you about the survey.";
  }
  return e;
}

export function Survey() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const dirty = JSON.stringify(form) !== JSON.stringify(EMPTY);
  const last = step === STEPS.length - 1;

  const next = () => {
    const e = validate(step, form);
    setErrors(e);
    if (Object.keys(e).length) {
      // Move focus to the first field that needs attention.
      requestAnimationFrame(() => cardRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [role='alert']")?.focus?.());
      return;
    }
    // TODO(launch): send `form` to the enquiry backend before confirming. Nothing is transmitted yet.
    if (last) { setDone(true); window.scrollTo(0, 0); return; }
    setStep(step + 1);
  };
  const back = () => {
    if (step > 0) return setStep(step - 1);
    if (dirty) return setLeaving(true);
    go("home");
  };

  const toggleSystem = (id: string, on: boolean) => set("systems", on ? [...form.systems, id] : form.systems.filter((s) => s !== id));
  const systemLabels = SYSTEMS.filter((s) => form.systems.includes(s.id)).map((s) => s.label).join(", ");

  return (
    <main>
      <Section style={{ paddingTop: 48 }}>
        <div className="ds-split" style={vars({ "--cols": "minmax(0, 7fr) minmax(0, 4fr)" })}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 640, minWidth: 0 }}>
            {done ? (
              <>
                <SectionHeader title="Survey requested" description={`Thanks, ${form.first.trim()}. An engineer will call you on ${form.phone.trim()} within one working day to arrange a visit.`} level={1} />
                <Card padding={32}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <DescriptionList
                      columns={2}
                      items={[
                        { term: "Property", detail: (form.premises === "home" ? "Home" : "Business") + ", " + form.type.toLowerCase() },
                        { term: "Systems", detail: systemLabels },
                        { term: "Best time to call", detail: form.time },
                        ...(form.eircode.trim() ? [{ term: "Eircode", detail: form.eircode.trim().toUpperCase() }] : []),
                      ]}
                    />
                    <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                      Need us sooner? Call <a href={PHONE_TEL} style={{ fontWeight: 600 }}>{PHONE_DISPLAY}</a>.
                    </p>
                    <div><Button variant="secondary" onClick={() => go("home")}>Back to home</Button></div>
                  </div>
                </Card>
              </>
            ) : (
              <>
                <SectionHeader title="Tell us a little about the building" description="Three short steps. An engineer calls you back within one working day to arrange a visit." level={1} />
                <Stepper steps={STEPS} current={step} />
                <Card padding="clamp(20px, 5vw, 32px)">
                  <div ref={cardRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {step === 0 && (
                      <>
                        <FormField label="Is this for a home or a business?">
                          <Radio name="prem" value={form.premises} onChange={(v) => { set("premises", v as Form["premises"]); set("type", ""); }} direction="row" options={[{ value: "home", label: "Home" }, { value: "biz", label: "Business" }]} />
                        </FormField>
                        <FormField label="Property type" htmlFor="type" required error={errors.type}>
                          <Select id="type" placeholder="Choose one" value={form.type} invalid={!!errors.type} onChange={(e) => set("type", e.target.value)} options={TYPES[form.premises]} />
                        </FormField>
                        <FormField label="Eircode" htmlFor="eir" hint="Helps us plan the visit" optional>
                          <Input id="eir" value={form.eircode} onChange={(e) => set("eircode", e.target.value)} placeholder="D15 XY12" autoComplete="postal-code" style={{ maxWidth: 200 }} />
                        </FormField>
                        <FormField label="Existing system" htmlFor="ex" optional>
                          <Input id="ex" value={form.existing} onChange={(e) => set("existing", e.target.value)} placeholder="For example, HKC alarm, about 10 years old" />
                        </FormField>
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <FormField label="Which systems are you interested in?" hint={errors.systems ? undefined : "Pick any. The engineer confirms what's actually needed."} error={errors.systems}>
                          <div role="group" aria-label="Systems" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {SYSTEMS.map((s) => (
                              <Checkbox key={s.id} id={"s-" + s.id} label={s.label} description={s.description} checked={form.systems.includes(s.id)} invalid={!!errors.systems} onChange={(e) => toggleSystem(s.id, e.target.checked)} />
                            ))}
                          </div>
                        </FormField>
                        <FormField label="Anything else we should know?" htmlFor="notes" optional>
                          <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Access, timing, what prompted this" />
                        </FormField>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <div className="ds-pair">
                          <FormField label="First name" htmlFor="fn" required error={errors.first}><Input id="fn" value={form.first} invalid={!!errors.first} autoComplete="given-name" onChange={(e) => set("first", e.target.value)} /></FormField>
                          <FormField label="Surname" htmlFor="ln" required error={errors.last}><Input id="ln" value={form.last} invalid={!!errors.last} autoComplete="family-name" onChange={(e) => set("last", e.target.value)} /></FormField>
                        </div>
                        <FormField label="Phone" htmlFor="ph" hint="We only call about your survey" required error={errors.phone}>
                          <Input id="ph" type="tel" iconLeft="phone" value={form.phone} invalid={!!errors.phone} autoComplete="tel" inputMode="tel" placeholder="087 123 4567" onChange={(e) => set("phone", e.target.value)} />
                        </FormField>
                        <FormField label="Email" htmlFor="em" optional error={errors.email}>
                          <Input id="em" type="email" iconLeft="mail" value={form.email} invalid={!!errors.email} autoComplete="email" onChange={(e) => set("email", e.target.value)} />
                        </FormField>
                        <FormField label="Best time to call" htmlFor="bt">
                          <Select id="bt" value={form.time} onChange={(e) => set("time", e.target.value)} options={TIMES} />
                        </FormField>
                        <FormField error={errors.consent}>
                          <Checkbox id="gdpr" label="You can contact me about this survey" description="We don't share your details or send marketing." checked={form.consent} invalid={!!errors.consent} onChange={(e) => set("consent", e.target.checked)} />
                        </FormField>
                      </>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap-reverse", justifyContent: "space-between", gap: 12, marginTop: 8, paddingTop: 20, borderTop: "1px solid var(--border-subtle)" }}>
                      <Button variant="ghost" iconLeft="arrow-left" onClick={back}>{step === 0 ? "Back to site" : "Back"}</Button>
                      <Button iconRight={last ? undefined : "arrow-right"} onClick={next}>{last ? "Request a survey" : "Continue"}</Button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>

          <aside className="ds-sticky-lg" style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            <Card tone="brand-subtle">
              <div style={{ fontWeight: 600 }}>Prefer to talk?</div>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>Monday to Friday, 8:30am to 5:30pm. An engineer, not a call centre.</p>
              <Button variant="secondary" iconLeft="phone" href={PHONE_TEL} style={{ alignSelf: "flex-start" }}>{PHONE_DISPLAY}</Button>
            </Card>
            <Alert tone="info" title="What happens next">A callback within one working day, a visit at a time that suits, then a fixed written quote.</Alert>
            <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>PSA licence no. {PSA_LICENCE}. <TextLink href="#" size="sm" muted>Privacy notice</TextLink></div>
          </aside>
        </div>
      </Section>

      <Dialog
        open={leaving}
        size="sm"
        title="Leave the survey?"
        description="Your answers so far won't be saved."
        onClose={() => setLeaving(false)}
        footer={<><Button variant="ghost" onClick={() => setLeaving(false)}>Keep going</Button><Button onClick={() => go("home")}>Leave</Button></>}
      />
    </main>
  );
}
