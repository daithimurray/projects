// Static sections. Rendered to HTML at build time and shipped with no JS.
import React from 'react';
import { D } from '../data.js';
import { Icon } from '../ds/core/Icon.jsx';
import { Badge } from '../ds/feedback/Badge.jsx';
import { Hero } from '../ds/marketing/Hero.jsx';
import { TrustBar } from '../ds/marketing/TrustBar.jsx';
import { SectionHeader } from '../ds/marketing/SectionHeader.jsx';
import { ContactStrip } from '../ds/marketing/ContactStrip.jsx';
import { CtaBanner } from '../ds/marketing/CtaBanner.jsx';
import { Testimonial } from '../ds/display/Testimonial.jsx';
import { Steps } from '../ds/navigation/Steps.jsx';
import { Footer } from '../ds/navigation/Footer.jsx';

// Media slot until the client's photos arrive. Names the shot it's waiting for.
export const Placeholder = ({ label, place }) => (
  <div className="lt-ph">
    {place ? <span className="lt-ph__place">{place}</span> : null}
    <span className="lt-ph__label">{label}</span>
  </div>
);

export function HeroSection() {
  return (
    <>
      <Hero title="Driveways, kerbing and groundworks, done by one crew." lede="Family run from Leixlip. Free design consultation, a proper sub-base, and the same team from dig-out to final roll." primaryLabel="Request a consultation" primaryHref="#quote" secondaryLabel="See our work" secondaryHref="#projects" media={<Placeholder place="Leixlip" label="Photo to come: finished driveway" />} />
      <div className="hs-container"><TrustBar items={[{ icon: 'check-circle', label: 'Free design consultation' }, { icon: 'layers', label: 'Groundworks and drainage in-house' }, { icon: 'award', label: 'Kilsaran paving supplied' }, { icon: 'map-pin', label: 'Kildare, Dublin and Meath' }]} /></div>
    </>
  );
}

export function ServicesSection() {
  const featured = D.services.filter((s) => s.featured);
  const rest = D.services.filter((s) => !s.featured);
  return (
    <section className="hs-section" id="services"><div className="hs-container">
      <SectionHeader title="Driveways, car parks, schools and roadways" lede="Residential and commercial jobs of all sizes, across Kildare, Dublin and Meath." />
      <div className="lt-services">
        {featured.map((s, i) => (
          <a key={s.title} href="#quote" className={'lt-service' + (i === 0 ? ' lt-service--lead' : '')}>
            {i === 0 ? <div className="lt-service__media"><Placeholder place="Driveways" label="Photo to come: new tarmac driveway" /></div> : null}
            <span className="hs-service__icon"><Icon name={s.icon} /></span>
            <span className="lt-service__head"><h3 className="lt-service__title">{s.title}</h3>{s.badge ? <Badge tone="accent">{s.badge}</Badge> : null}</span>
            <p className="lt-service__desc">{s.description}</p>
            <span className="lt-service__meta">{s.meta.join(', ')}</span>
            <span className="hs-link hs-link--arrow lt-service__cta">Ask about this<Icon name="arrow-right" /></span>
          </a>
        ))}
      </div>
      <h3 className="lt-also">We also do</h3>
      <ul className="lt-also__list">
        {rest.map((s) => (
          <li key={s.title}>
            <Icon name={s.icon} className="lt-also__icon" />
            <div><strong>{s.title}</strong><p>{s.description}</p></div>
          </li>
        ))}
      </ul>
    </div></section>
  );
}

export function AboutSection() {
  return (
    <section className="hs-section hs-inverse" id="about"><div className="hs-container">
      <div className="hs-two" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
        <div className="lt-about">
          <SectionHeader title="Family run. Over 35 years in the trade." lede="We do the groundworks, drainage and kerbing ourselves, so the base is right before any tarmac arrives." />
          <p>Paving comes from Kilsaran. For resin bound finishes, we prepare the base and our partners Redlough Landscapes and Saxa Landscapes lay the resin.</p>
          <p>Barry and John Roche run the business. Ring either of them directly.</p>
        </div>
        <Steps vertical current={5} steps={[{ label: 'Free design consultation', description: 'We visit, measure, and talk through finishes, kerbing and drainage' }, { label: 'Written quote', description: 'No obligation' }, { label: 'Groundworks', description: 'Dig-out, drainage and pipework, kerbing, compacted Clause 804 base' }, { label: 'Lay and roll', description: 'Tarmacadam laid and rolled, edges finished' }, { label: 'Walk-round', description: 'We check it with you before we leave' }]} />
      </div>
    </div></section>
  );
}

export function ReviewsSection() {
  return (
    <section className="hs-section" id="reviews"><div className="hs-container">
      <SectionHeader title="What customers say" align="center" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>{D.reviews.map((r) => <Testimonial key={r.name} {...r} />)}</div>
    </div></section>
  );
}

export function ContactHeader() {
  return (
    <>
      <SectionHeader title="Talk to Barry or John" lede="Ring Barry, John or the office. Or send the details and we'll ring you back to arrange a free, no-obligation design consultation." />
      <ContactStrip />
    </>
  );
}

export function ContactAside() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="hs-card"><div className="hs-card__media"><Placeholder place="Leixlip, Co. Kildare" label="Map to come" /></div><div className="hs-card__body"><h3 className="hs-card__title">Based in Leixlip, Co. Kildare</h3><p className="hs-card__desc">We work across Kildare, Dublin, Meath and the wider Leinster area. Site visits by arrangement, as we're usually on a job.</p><p className="hs-card__desc">Leixlip Tarmac Enterprises Limited, registered in Ireland no. 496118.</p></div></div>
    </div>
  );
}

export function CallBanner() {
  return (
    <section className="hs-section" style={{ paddingTop: 0 }}><div className="hs-container">
      <CtaBanner title="Ready to talk about your driveway?" description="Free, no-obligation design consultation. Call Barry or John, or send us the details." primaryLabel="Call Barry on 087 935 2775" primaryHref="tel:0879352775" secondaryLabel="Call John on 087 259 4880" secondaryHref="tel:0872594880" />
    </div></section>
  );
}

export function SiteFooter() {
  return <Footer columns={D.footerCols} tagline="Family-run tarmac, kerbing and groundworks contractor, serving Kildare, Dublin, Meath and Leinster." />;
}
