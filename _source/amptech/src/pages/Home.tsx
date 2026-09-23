import { Accordion, Button, CTASection, Hero, SectionHeader, ServiceCard, Stat, Stepper, Testimonial, TrustBar } from "../design-system";
import { Media } from "../components/Media";
import { Section, container } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, PSA_LICENCE, REVIEWS } from "../content";
import { go } from "../router";

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
        eyebrow="Dublin & surrounding counties"
        title="Alarms, cameras and fire systems, installed properly."
        description="We survey the building, design the system, install it ourselves and look after it for years. Homes and businesses across Dublin and Meath."
        primaryCta="Request a free survey"
        secondaryCta={PHONE_DISPLAY}
        onPrimary={() => go("survey")}
        onSecondary={() => (location.href = PHONE_TEL)}
        proof={["PSA licensed", "Our own engineers", "Callback within one working day"]}
        media={<Media label="engineer at panel — 4:5" ratio="4/5" radius={0} style={{ border: "none" }} />}
      />
      <div style={container}>
        <TrustBar
          label="Accredited"
          items={[
            { label: "PSA licensed", detail: "No. " + PSA_LICENCE },
            { label: "EN 50131", detail: "Grade 2 & 3", icon: "shield" },
            { label: "I.S. 3218", detail: "Fire detection", icon: "flame" },
            { label: "HKC & Hikvision", detail: "Approved installer", icon: "check-circle" },
          ]}
        />
      </div>

      <Section>
        <SectionHeader eyebrow="Services" title="Three systems, one installer" description="Most customers start with one and add the others later. Everything we fit works together and is maintained under a single agreement." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
          <ServiceCard icon="shield" title="Intruder alarms" description="Wired and wireless Grade 2 & 3 systems with app control. New installs, upgrades and extensions to existing panels." features={["HKC & Ajax systems", "App arming & alerts", "Upgrades of older panels"]} href="#/alarms" />
          <ServiceCard icon="camera" title="CCTV" description="IP camera systems designed around actual coverage, not camera count. Remote viewing on your phone." features={["4K coverage surveys", "30-day retention", "Remote viewing"]} href="#/cctv" />
          <ServiceCard icon="flame" title="Fire detection" description="Smoke and heat detection for homes, and I.S. 3218 fire alarm systems for commercial premises." features={["Domestic & commercial", "Certified to I.S. 3218", "Annual servicing"]} href="#/fire" />
        </div>
      </Section>

      <Section tone="sunken">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          <Stat value="20+" label="Years installing in Dublin" hint="Family-run since 2004" />
          <Stat value="1 day" label="Typical home install" hint="Surveyed first, no surprises" />
          <Stat value="24h" label="Fault response" hint="For maintained systems" />
          <Stat value="4.9" label="Average review score" hint="Google & site reviews" />
        </div>
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)", gap: 64, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <SectionHeader eyebrow="How it works" title="Survey first. Then a fixed quote." description="No pressure sales. An engineer visits, listens to what worries you, and designs a system for the building you actually have." />
            <Stepper steps={["Free survey", "Fixed quote", "Install & handover", "Maintenance"]} current={1} />
            <div><Button variant="secondary" iconRight="arrow-right" onClick={() => go("survey")}>Book a survey</Button></div>
          </div>
          <Media label="survey on site — 3:2" ratio="3/2" />
        </div>
      </Section>

      <Section tone="sunken">
        <SectionHeader eyebrow="Reviews" title="What customers say" description="Quoted as written. Names shortened for privacy." align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 48 }}>
          <Testimonial {...REVIEWS[1]} variant="feature" style={{ gridColumn: "span 2", ...featureCard }} />
          <Testimonial {...REVIEWS[0]} rating={5} />
          <Testimonial {...REVIEWS[4]} rating={5} />
          <Testimonial {...REVIEWS[2]} rating={5} />
          <Testimonial {...REVIEWS[3]} rating={5} />
        </div>
      </Section>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 4fr) minmax(0, 8fr)", gap: 64 }}>
          <SectionHeader eyebrow="Questions" title="Before you call" />
          <Accordion defaultOpen={[0]} items={FAQ} />
        </div>
      </Section>

      <div style={{ paddingBottom: "var(--space-section)" }}>
        <CTASection title="Not sure what you need? Start with a free survey." description="An engineer visits, listens, and quotes. No obligation, no hard sell." primaryCta="Request a survey" onPrimary={() => go("survey")} />
      </div>
    </main>
  );
}
