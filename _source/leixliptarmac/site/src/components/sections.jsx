// Static sections. Rendered to HTML at build time and shipped with no JS.
import React from 'react';
import { D } from '../data.js';
import { Hero } from '../ds/marketing/Hero.jsx';
import { TrustBar } from '../ds/marketing/TrustBar.jsx';
import { SectionHeader } from '../ds/marketing/SectionHeader.jsx';
import { ServiceCard } from '../ds/marketing/ServiceCard.jsx';
import { ContactStrip } from '../ds/marketing/ContactStrip.jsx';
import { CtaBanner } from '../ds/marketing/CtaBanner.jsx';
import { Stat, StatRow } from '../ds/display/Stat.jsx';
import { Testimonial } from '../ds/display/Testimonial.jsx';
import { Table } from '../ds/display/Table.jsx';
import { Steps } from '../ds/navigation/Steps.jsx';
import { Footer } from '../ds/navigation/Footer.jsx';

// Striped media slot. Swap for <img> once the client's photos arrive.
export const Placeholder = ({ label }) => <div className="lt-ph">{label}</div>;

export function HeroSection() {
  return (
    <>
      <Hero eyebrow="Tarmac, kerbing & groundworks · Kildare, Dublin & Meath" title={<>Driveways, kerbing &amp; groundworks. <em>One team from start to finish.</em></>} lede="Family run, with over 35 years in the trade. Free design consultation, a proper sub-base, and one small team that does the whole job: groundworks, drainage, kerbing and the finish." primaryLabel="Request a consultation" primaryHref="#quote" secondaryLabel="See our work" secondaryHref="#projects" proof={['Family run', 'Over 35 years in the trade', 'Free design consultation']} media={<Placeholder label="Photo · finished driveway" />} />
      <div className="hs-container"><TrustBar items={[{ icon: 'hard-hat', strong: '35+ years', label: 'in the trade' }, { icon: 'award', label: 'Kilsaran paving supplied' }, { icon: 'star', strong: '4.1', label: 'on Google' }, { icon: 'map-pin', label: 'Kildare · Dublin · Meath' }, { icon: 'layers', label: 'Groundworks and drainage in-house' }]} /></div>
    </>
  );
}

export function ServicesSection() {
  return (
    <section className="hs-section" id="services"><div className="hs-container">
      <SectionHeader eyebrow="What we do" title="Driveways, car parks, schools and roadways" lede="Residential and commercial projects of all sizes, across Kildare, Dublin and Meath." />
      <div className="lt-cards">{D.services.map((s) => <ServiceCard key={s.title} {...s} cta="Ask about this" href="#quote" />)}</div>
    </div></section>
  );
}

export function AboutSection() {
  return (
    <section className="hs-section hs-inverse" id="about"><div className="hs-container">
      <div className="hs-two" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
        <div>
          <SectionHeader eyebrow="About Leixlip Tarmac" title="Family run. Over 35 years in the trade." lede="We do the groundworks, drainage and kerbing ourselves, so the base is right before any tarmac arrives." />
          <StatRow><Stat value="35" suffix="+" label="Years in the trade" /><Stat value="3" label="Counties covered" accent /><Stat value="4.1" label="Google rating" icon="star" /></StatRow>
          <div style={{ marginTop: 32 }}>
            <div className="hs-overline" style={{ marginBottom: 12 }}>Clients include</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{D.clients.map((c) => <span key={c} className="hs-badge hs-badge--outline" style={{ color: 'var(--hs-stone-300)', borderColor: 'var(--hs-border-inverse)' }}>{c}</span>)}</div>
          </div>
        </div>
        <Steps vertical current={5} steps={[{ label: 'Free design consultation', description: 'We visit, measure, and talk through finishes, kerbing and drainage' }, { label: 'Written quote', description: 'No obligation' }, { label: 'Groundworks', description: 'Dig-out, drainage and pipework, kerbing, compacted Clause 804 base' }, { label: 'Lay and roll', description: 'Tarmacadam laid and rolled, edges finished' }, { label: 'Walk-round', description: 'We check it with you before we leave' }]} />
      </div>
    </div></section>
  );
}

export function ReviewsSection() {
  return (
    <section className="hs-section" id="reviews"><div className="hs-container">
      <SectionHeader eyebrow="Reviews" title="What customers say" align="center" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>{D.reviews.map((r) => <Testimonial key={r.name} {...r} />)}</div>
    </div></section>
  );
}

export function ContactHeader() {
  return (
    <>
      <SectionHeader eyebrow="Contact" title="Talk to Barry or John" lede="Ring Barry or John directly, or the office, or send the details and we'll ring you back to arrange a free, no-obligation design consultation." />
      <ContactStrip />
    </>
  );
}

export function ContactAside() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="hs-card"><div className="hs-card__media"><Placeholder label="Map · Leixlip, Co. Kildare" /></div><div className="hs-card__body"><h3 className="hs-card__title">Based in Leixlip, Co. Kildare</h3><p className="hs-card__desc">We work across Kildare, Dublin, Meath and the wider Leinster area. Site visits by arrangement, as we're usually on a job.</p></div></div>
      <Table compact caption="Leixlip Tarmac Enterprises Limited · Registered no. 496118" columns={[{ key: 'd', label: 'Who' }, { key: 'h', label: 'Number', numeric: true }]} rows={[{ d: 'Barry Roche', h: <a href="tel:0879352775">087 935 2775</a> }, { d: 'John Roche', h: <a href="tel:0872594880">087 259 4880</a> }, { d: 'Office', h: <a href="tel:016242130">01 624 2130</a> }]} />
    </div>
  );
}

export function CallBanner() {
  return (
    <section className="hs-section" style={{ paddingTop: 0 }}><div className="hs-container">
      <CtaBanner title="Ready to talk about your driveway?" description="Free, no-obligation design consultation. Call Barry or John, or send us the details." primaryLabel="Call Barry · 087 935 2775" primaryHref="tel:0879352775" secondaryLabel="Call John · 087 259 4880" secondaryHref="tel:0872594880" />
    </div></section>
  );
}

export function SiteFooter() {
  return <Footer columns={D.footerCols} />;
}
