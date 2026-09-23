import { Breadcrumb, CTASection, DescriptionList, Hero, PricingCard, SectionHeader, Tabs, Testimonial, TextLink } from "../design-system";
import { Media } from "../components/Media";
import { Section } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, REVIEWS } from "../content";
import { go } from "../router";

const featureCard = { padding: 32, background: "var(--surface-default)", border: "1px solid var(--border-default)", borderRadius: 16 };

export function Service() {
  return (
    <main>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px var(--grid-margin) 0" }}>
        <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Services", href: "#/" }, { label: "CCTV" }]} />
      </div>
      <Hero
        eyebrow="CCTV"
        title="Cameras placed where they actually see something."
        description="We design coverage from a site survey — entrances, approaches, blind spots — then choose cameras to suit. Remote viewing on your phone, footage kept for 30 days."
        primaryCta="Request a survey"
        secondaryCta={PHONE_DISPLAY}
        onPrimary={() => go("survey")}
        onSecondary={() => (location.href = PHONE_TEL)}
        proof={["PSA licensed", "Hikvision approved", "GDPR signage supplied"]}
        media={<Media label="camera install — 4:5" ratio="4/5" radius={0} style={{ border: "none" }} />}
        style={{ paddingTop: 0 }}
      />

      <Section tone="sunken">
        <Tabs items={[{ value: "home", label: "Homes", icon: "home" }, { value: "biz", label: "Business", icon: "building" }]}>
          {(v) => {
            const home = v === "home";
            return (
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 7fr) minmax(0, 5fr)", gap: 64, paddingTop: 40 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <SectionHeader
                    title={home ? "A typical home system" : "A typical commercial system"}
                    description={home ? "Four to six cameras covering front, rear and side access, recorded locally with app access for the household." : "Coverage-led design for yards, loading bays, tills and stock rooms, with retention and access policies agreed up front."}
                    level={3}
                  />
                  <DescriptionList
                    columns={2}
                    items={[
                      { term: "Cameras", detail: home ? "4–6 × 4MP/4K IP" : "8–32 × 4K IP, PTZ where needed" },
                      { term: "Recording", detail: "NVR, 30-day retention" },
                      { term: "Viewing", detail: "iOS & Android app" },
                      { term: "Standard", detail: home ? "PSA licensed install" : "PSA · GDPR signage & policy" },
                      { term: "Typical install", detail: home ? "1 day" : "2–5 days" },
                      { term: "Maintenance", detail: "Annual, optional" },
                    ]}
                  />
                  <TextLink href="#" arrow>Download the CCTV & GDPR guide</TextLink>
                </div>
                <Media label={home ? "home cameras — 4:5" : "warehouse cameras — 4:5"} ratio="4/5" />
              </div>
            );
          }}
        </Tabs>
      </Section>

      <Section>
        <SectionHeader eyebrow="Guide prices" title="What it usually costs" description="Every quote follows a survey, so these are honest starting points, not offers." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
          <PricingCard name="Home · 4 cameras" price="€1,450" description="Front, rear and both sides. NVR and app." features={["4 × 4MP IP cameras", "2TB NVR, 30 days", "App viewing", "1-day install"]} onCta={() => go("survey")} />
          <PricingCard name="Home · 6 cameras" price="€1,950" description="Adds driveway and garden coverage." features={["6 × 4K IP cameras", "4TB NVR, 30 days", "App viewing & alerts", "1-day install"]} highlighted badge="Most chosen" onCta={() => go("survey")} />
          <PricingCard name="Business" price="Quoted" period="" description="Designed from a coverage survey." features={["8–32 cameras", "Retention & access policy", "GDPR signage", "Maintenance agreement"]} cta="Book a site survey" onCta={() => go("survey")} />
        </div>
      </Section>

      <Section tone="sunken">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <Testimonial {...REVIEWS[1]} variant="feature" style={featureCard} />
          <Testimonial {...REVIEWS[5]} variant="feature" style={featureCard} />
        </div>
      </Section>

      <div style={{ paddingBottom: "var(--space-section)" }}>
        <CTASection title="Get camera coverage designed for your building." description="Free survey, fixed quote, installed by our own engineers." primaryCta="Request a survey" onPrimary={() => go("survey")} />
      </div>
    </main>
  );
}
