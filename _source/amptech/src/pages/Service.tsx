import { Breadcrumb, CTASection, DescriptionList, Hero, PricingCard, SectionHeader, Tabs, Testimonial } from "../design-system";
import { CoveragePlan } from "../components/CoveragePlan";
import { Media } from "../components/Media";
import { Section, vars } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, REVIEWS } from "../content";
import { go } from "../router";

const call = () => (location.href = PHONE_TEL);
const featureCard = { padding: 32, background: "var(--surface-default)", border: "1px solid var(--border-default)", borderRadius: 16 };

export function Service() {
  return (
    <main>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px var(--grid-margin) 0" }}>
        <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Services", href: "#/services" }, { label: "CCTV" }]} />
      </div>
      <Hero
        title="Cameras placed where they actually see something."
        description="We design coverage from a site survey: entrances, approaches and blind spots first, then the cameras to suit. Remote viewing on your phone, footage kept for 30 days."
        primaryCta="Request a survey"
        secondaryCta={PHONE_DISPLAY}
        onPrimary={() => go("survey")}
        onSecondary={call}
        proof={["PSA licensed", "Hikvision approved", "GDPR signage supplied"]}
        media={<Media label="camera install" radius={0} style={{ border: "none" }} />}
        style={{ paddingTop: 0 }}
      />

      <Section tone="sunken">
        <SectionHeader title="Coverage first, cameras second" description="Every system starts as a plan like this one: what each camera sees, and nothing left in the dark between them." />
        <Tabs style={{ marginTop: 32 }} items={[{ value: "home", label: "Homes", icon: "home" }, { value: "biz", label: "Business", icon: "building" }]}>
          {(v) => {
            const home = v === "home";
            return (
              <div className="ds-split" style={{ ...vars({ "--cols": "minmax(0, 6fr) minmax(0, 5fr)", "--split-align": "start" }), paddingTop: 40 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <SectionHeader
                    title={home ? "A typical home system" : "A typical commercial system"}
                    description={home ? "Four to six cameras covering front, rear and side access, recorded locally with app access for the household." : "Coverage-led design for yards, loading bays, tills and stock rooms, with retention and access policies agreed up front."}
                    level={3}
                  />
                  <DescriptionList
                    columns={2}
                    items={[
                      { term: "Cameras", detail: home ? "4 to 6 × 4MP or 4K IP" : "8 to 32 × 4K IP, PTZ where needed" },
                      { term: "Recording", detail: "Recorder on site, 30 days kept" },
                      { term: "Viewing", detail: "iOS & Android app" },
                      { term: "Standard", detail: home ? "PSA licensed install" : "PSA licensed, GDPR signage & policy" },
                      { term: "Typical install", detail: home ? "1 day" : "2 to 5 days" },
                      { term: "Maintenance", detail: "Annual, optional" },
                    ]}
                  />
                </div>
                <CoveragePlan variant={home ? "home" : "business"} />
              </div>
            );
          }}
        </Tabs>
      </Section>

      <Section>
        <SectionHeader title="What it usually costs" description="Every quote follows a survey, so these are honest starting points, not offers." />
        <div className="ds-grid" style={{ ...vars({ "--min": "260px" }), marginTop: 48 }}>
          <PricingCard name="Home, 4 cameras" price="€1,450" description="Front, rear and both sides. Recorder and app." features={["4 × 4MP IP cameras", "2TB recorder, 30 days", "App viewing", "1-day install"]} onCta={() => go("survey")} />
          <PricingCard name="Home, 6 cameras" price="€1,950" description="Adds driveway and garden coverage." features={["6 × 4K IP cameras", "4TB recorder, 30 days", "App viewing & alerts", "1-day install"]} highlighted badge="Most chosen" onCta={() => go("survey")} />
          <PricingCard name="Business" price="Quoted" period="" description="Designed from a coverage survey." features={["8 to 32 cameras", "Retention & access policy", "GDPR signage", "Maintenance agreement"]} onCta={() => go("survey")} />
        </div>
      </Section>

      <Section tone="sunken">
        <div className="ds-grid" style={vars({ "--min": "300px" })}>
          <Testimonial {...REVIEWS[1]} variant="feature" style={featureCard} />
          <Testimonial {...REVIEWS[5]} variant="feature" style={featureCard} />
        </div>
      </Section>

      <div style={{ padding: "clamp(56px, 9vw, var(--space-section)) 0" }}>
        <CTASection title="Get camera coverage designed for your building." description="Free survey, fixed quote, installed by our own engineers." primaryCta="Request a survey" onPrimary={() => go("survey")} secondaryCta={"Call " + PHONE_DISPLAY} onSecondary={call} />
      </div>
    </main>
  );
}
