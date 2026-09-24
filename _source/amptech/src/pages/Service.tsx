import type { ReactNode } from "react";
import { Accordion, Breadcrumb, CTASection, DescriptionList, Hero, PricingCard, SectionHeader, Tabs, Testimonial } from "../design-system";
import { CoveragePlan } from "../components/CoveragePlan";
import { Media } from "../components/Media";
import { Section, vars } from "../components/Section";
import { PHONE_DISPLAY, PHONE_TEL, REVIEWS } from "../content";
import { SERVICES, type ServiceKey } from "../services";
import { go } from "../router";

const call = () => (location.href = PHONE_TEL);
const featureCard = { padding: 32, background: "var(--surface-default)", border: "1px solid var(--border-default)", borderRadius: 16 };

export function Service({ service }: { service: ServiceKey }) {
  const s = SERVICES[service];

  // Sections after the hero alternate sunken / page backgrounds in order.
  const sections: { key: string; node: ReactNode }[] = [];

  sections.push({
    key: "plan",
    node: (
      <>
        <SectionHeader title={s.plan.title} description={s.plan.description} />
        <Tabs style={{ marginTop: 32 }} items={[{ value: "home", label: "Homes", icon: "home" }, { value: "biz", label: "Business", icon: "building" }]}>
          {(v) => {
            const variant = v === "home" ? s.home : s.business;
            return (
              <div className="ds-split" style={{ ...vars({ "--cols": "minmax(0, 6fr) minmax(0, 5fr)" }), paddingTop: 40 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <SectionHeader title={variant.title} description={variant.description} level={3} />
                  <DescriptionList columns={2} items={variant.specs} />
                </div>
                <CoveragePlan plan={variant.plan} />
              </div>
            );
          }}
        </Tabs>
      </>
    ),
  });

  if (s.also) {
    sections.push({
      key: "also",
      node: (
        <div className="ds-split" style={vars({ "--cols": "minmax(0, 4fr) minmax(0, 8fr)" })}>
          <SectionHeader title={s.also.title} />
          <dl style={{ margin: 0, display: "grid", gap: 0 }}>
            {s.also.items.map((it) => (
              <div key={it.title} style={{ padding: "20px 0", borderTop: "1px solid var(--border-default)", display: "grid", gap: 6 }}>
                <dt style={{ fontSize: "var(--text-h4)", fontWeight: 600, letterSpacing: "-0.01em" }}>{it.title}</dt>
                <dd style={{ margin: 0, color: "var(--text-secondary)", maxWidth: "60ch" }}>{it.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      ),
    });
  }

  if (s.pricing) {
    sections.push({
      key: "pricing",
      node: (
        <>
          <SectionHeader title={s.pricing.title} description={s.pricing.description} />
          <div className="ds-grid" style={{ ...vars({ "--min": "260px" }), marginTop: 48 }}>
            {s.pricing.items.map((p) => <PricingCard key={p.name} {...p} onCta={() => go("survey")} />)}
          </div>
        </>
      ),
    });
  }

  const reviews = s.reviews.map((i) => REVIEWS[i]);
  sections.push({
    key: "reviews",
    node: (
      <div className="ds-grid" style={vars({ "--min": reviews.length > 2 ? "260px" : "300px" })}>
        {reviews.length > 2
          ? reviews.map((r) => <Testimonial key={r.name} {...r} />)
          : reviews.map((r) => <Testimonial key={r.name} {...r} variant="feature" style={featureCard} />)}
      </div>
    ),
  });

  sections.push({
    key: "faq",
    node: (
      <div className="ds-split" style={vars({ "--cols": "minmax(0, 4fr) minmax(0, 8fr)" })}>
        <SectionHeader title="Before you call" />
        <Accordion defaultOpen={[0]} items={s.faq} />
      </div>
    ),
  });

  return (
    <main>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px var(--grid-margin) 0" }}>
        <Breadcrumb items={[{ label: "Home", href: "#/" }, { label: "Services", href: "#/services" }, { label: s.name }]} />
      </div>
      <Hero
        title={s.hero.title}
        description={s.hero.description}
        primaryCta="Request a survey"
        secondaryCta={PHONE_DISPLAY}
        onPrimary={() => go("survey")}
        onSecondary={call}
        proof={s.hero.proof}
        media={<Media label={s.hero.photo} radius={0} style={{ border: "none" }} />}
        style={{ paddingTop: 0 }}
      />
      {sections.map((sec, i) => (
        <Section key={sec.key} tone={i % 2 === 0 ? "sunken" : "page"}>{sec.node}</Section>
      ))}
      <div style={{ padding: "clamp(56px, 9vw, var(--space-section)) 0" }}>
        <CTASection title={s.cta.title} description={s.cta.description} primaryCta="Request a survey" onPrimary={() => go("survey")} secondaryCta={"Call " + PHONE_DISPLAY} onSecondary={call} />
      </div>
    </main>
  );
}
