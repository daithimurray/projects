import { Accordion, Button, CTASection, Hero, SectionHeader, ServiceCard, Stepper, Testimonial, TrustBar } from "../design-system";
import { CoveragePlan } from "../components/CoveragePlan";
import { Media } from "../components/Media";
import { Section, container, vars } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, PSA_LICENCE, REVIEWS } from "../content";
import { go } from "../router";

const call = () => (location.href = PHONE_TEL);
const featureCard = { padding: 32, background: "var(--surface-default)", border: "1px solid var(--border-default)", borderRadius: 16 };

const FAQ = [
  { title: "Do I need a PSA-licensed installer?", content: "Yes. In Ireland anyone installing intruder alarms or CCTV must hold a Private Security Authority licence. Ours is shown in the footer and on every quote." },
  { title: "Can you upgrade my existing HKC alarm?", content: "Usually, yes. Many older panels can be replaced without re-wiring, and existing sensors are often reused. The survey confirms what can stay." },
  { title: "How long does a home installation take?", content: "Most homes are finished in a day, including a walk-through of the system before we leave." },
  { title: "What does maintenance include?", content: "An annual inspection and certificate, priority fault response within 24 hours, and software updates for app-connected systems." },
];

export function Home() {
  return (
    <main>
      <Hero
        title="Alarms, cameras and fire systems, installed properly."
        description="We survey the building, design the system, install it ourselves and look after it for years. Homes and businesses across Dublin and Meath."
        primaryCta="Request a survey"
        secondaryCta={PHONE_DISPLAY}
        onPrimary={() => go("survey")}
        onSecondary={call}
        proof={["PSA licensed", "Our own engineers", "Callback within one working day"]}
        media={<Media label="engineer at the panel" radius={0} style={{ border: "none" }} />}
      />
      <div style={container}>
        <TrustBar
          items={[
            { label: "PSA licensed", detail: "No. " + PSA_LICENCE },
            { label: "EN 50131", detail: "Grade 2 & 3 alarms", icon: "shield" },
            { label: "I.S. 3218", detail: "Fire detection", icon: "flame" },
            { label: "HKC & Hikvision", detail: "Approved installer", icon: "check-circle" },
          ]}
        />
      </div>

      <Section id="services">
        <SectionHeader title="Three systems, one installer" description="Most customers start with an alarm and add the others later. Everything we fit works together and is maintained under one agreement." />
        <div className="ds-grid ds-grid-2" style={{ marginTop: 48 }}>
          <ServiceCard className="ds-span-2" icon="shield" title="Intruder alarms" description="Wired and wireless Grade 2 & 3 systems with app control. New installs, upgrades of older panels and extensions after building work. Most homes are finished in a day." features={["HKC & Ajax systems", "Arm, disarm and get alerts on your phone", "Existing sensors reused where they can be"]} href="#/alarms" cta="See how we plan alarms" />
          <ServiceCard icon="camera" title="CCTV" description="IP camera systems designed around what each camera needs to see, not how many you buy. Remote viewing on your phone." features={["4K cameras", "30-day recording", "GDPR signage supplied"]} href="#/cctv" cta="See how we plan cameras" />
          <ServiceCard icon="flame" title="Fire detection" description="Smoke and heat detection for homes, and I.S. 3218 fire alarm systems for commercial premises." features={["Domestic & commercial", "Certified to I.S. 3218", "Annual servicing"]} href="#/fire" cta="See where detectors go" />
        </div>
      </Section>

      <Section tone="sunken">
        <div className="ds-split" style={vars({ "--cols": "minmax(0, 5fr) minmax(0, 6fr)", "--split-align": "center" })}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <SectionHeader title="Survey first. Then a fixed quote." description="No pressure sales. An engineer visits, listens to what worries you, and designs a system for the building you actually have." />
            <Stepper steps={["Free survey", "Fixed quote", "Install & handover", "Maintenance"]} current={-1} />
            <div><Button variant="secondary" onClick={() => go("survey")}>Request a survey</Button></div>
          </div>
          <CoveragePlan plan="cctv-home" />
        </div>
      </Section>

      <Section id="reviews">
        <SectionHeader title="What customers say" description="Quoted as written. Names shortened for privacy." align="center" />
        <div className="ds-grid" style={{ ...vars({ "--min": "300px" }), marginTop: 48 }}>
          <div className="ds-span-2" style={{ display: "flex" }}><Testimonial {...REVIEWS[6]} variant="feature" style={{ ...featureCard, flex: 1 }} /></div>
          <Testimonial {...REVIEWS[0]} />
          <Testimonial {...REVIEWS[4]} />
          <Testimonial {...REVIEWS[2]} />
          <Testimonial {...REVIEWS[3]} />
        </div>
      </Section>

      <Section id="questions" tone="sunken">
        <div className="ds-split" style={vars({ "--cols": "minmax(0, 4fr) minmax(0, 8fr)" })}>
          <SectionHeader title="Before you call" />
          <Accordion defaultOpen={[0]} items={FAQ} />
        </div>
      </Section>

      <div style={{ padding: "clamp(56px, 9vw, var(--space-section)) 0" }}>
        <CTASection title="Not sure what you need? Start with a free survey." description="An engineer visits, listens, and quotes. No obligation, no hard sell." primaryCta="Request a survey" onPrimary={() => go("survey")} secondaryCta={"Call " + PHONE_DISPLAY} onSecondary={call} />
      </div>
    </main>
  );
}
