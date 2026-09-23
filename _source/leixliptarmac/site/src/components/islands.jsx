// Interactive islands. Each one is server-rendered, then hydrated in the browser.
import React from 'react';
import { D } from '../data.js';
import { Navbar } from '../ds/navigation/Navbar.jsx';
import { Tabs } from '../ds/navigation/Tabs.jsx';
import { SectionHeader } from '../ds/marketing/SectionHeader.jsx';
import { QuoteEstimator } from '../ds/marketing/QuoteEstimator.jsx';
import { Accordion } from '../ds/display/Accordion.jsx';
import { FormField } from '../ds/forms/FormField.jsx';
import { Input } from '../ds/forms/Input.jsx';
import { Select } from '../ds/forms/Select.jsx';
import { Textarea } from '../ds/forms/Textarea.jsx';
import { Button } from '../ds/actions/Button.jsx';
import { Alert } from '../ds/feedback/Alert.jsx';

const LINKS = [{ label: 'Services', href: '#services' }, { label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Reviews', href: '#reviews' }, { label: 'Contact', href: '#quote' }];

// Sections carry scroll-margin-top, so the sticky navbar never covers a heading.
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', '#' + id);
};

export function SiteNav() {
  const [current, setCurrent] = React.useState('');
  React.useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const onScroll = () => { let c = ''; for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top - 120 <= 0) c = LINKS.find((l) => l.href === '#' + id).label; } setCurrent(c); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <Navbar links={LINKS} current={current} onNavigate={(l) => scrollToId(l.href.slice(1))} ctaLabel="Request a consultation" onCta={() => scrollToId('quote')} />;
}

const FILTERS = [{ id: 'all', label: 'All' }, { id: 'driveway', label: 'Driveways' }, { id: 'roadway', label: 'Roadways' }, { id: 'commercial', label: 'Commercial' }, { id: 'repair', label: 'Repairs' }];

// Mosaic on a 3-column grid. The first tile's size depends on the count, so every row ends full.
const leadSize = (n) => (n % 3 === 0 ? 'lt-work--big' : n % 3 === 1 ? 'lt-work--full' : 'lt-work--wide');

export function ProjectsSection() {
  const [cat, setCat] = React.useState('all');
  const list = D.projects.filter((p) => cat === 'all' || p.category.toLowerCase() === cat);
  return (
    <>
      <SectionHeader title="Jobs across Kildare, Dublin and Meath" lede="Castleknock, Dundrum, Howth, Straffan, Suncroft, Kilcloon and more." action={<Tabs variant="pills" value={cat} onChange={setCat} tabs={FILTERS} />} />
      <ul className="lt-work" id={'hs-panel-' + cat} role="tabpanel" aria-labelledby={'hs-tab-' + cat}>
        {list.map((p, i) => (
          <li key={p.title} className={i === 0 ? leadSize(list.length) : undefined}>
            <figure>
              {p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : <div className="lt-ph lt-ph--light"><span className="lt-ph__place">{p.location.split(',')[0]}</span><span className="lt-ph__label">Photo to come</span></div>}
              <figcaption><strong>{p.title}</strong><span>{p.location}</span></figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Estimator() {
  return <QuoteEstimator onRequest={() => scrollToId('quote')} />;
}

export function Faq() {
  return <Accordion defaultOpen={[0]} items={D.faqs} />;
}

const JOB_TYPES = ['Tarmac driveway', 'Kerbing & groundworks', 'Car park or roadway', 'School or playground', 'Pothole repair', 'Powerwash & reseal', 'Resin bound (base preparation)', 'Not sure, advise me'];
const ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT;

export function ConsultationForm() {
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | failed
  const [errors, setErrors] = React.useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.company) return; // honeypot filled, so a bot
    const next = {};
    if (!data.name?.trim()) next.name = 'Enter your name';
    if (!/^[+\d][\d\s()-]{6,}$/.test(data.phone?.trim() || '')) next.phone = 'Enter a phone number we can ring';
    if (!data.service) next.service = 'Choose a job type';
    setErrors(next);
    if (Object.keys(next).length) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
    setStatus('sending');
    try {
      if (!ENDPOINT) throw new Error('PUBLIC_FORM_ENDPOINT is not set');
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, eircode: data.eircode?.toUpperCase(), _subject: 'Consultation request: ' + data.service }) });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('failed');
    }
  };

  return (
    <form className="hs-card" onSubmit={onSubmit} noValidate><div className="hs-card__body" style={{ padding: 32, gap: 24 }}>
      <div><h3 className="hs-h3" style={{ margin: '0 0 4px' }}>Request a consultation</h3><p style={{ margin: 0, color: 'var(--hs-text-2)', fontSize: 14 }}>Tell us roughly what you need. Barry or John will ring you back.</p></div>
      {status === 'sent' ? <Alert tone="success" title="Request sent">Barry or John will ring you back to arrange a time.</Alert> : null}
      {status === 'failed' ? <Alert tone="danger" title="That didn't send">Please ring Barry on <a href="tel:0879352775">087 935 2775</a> or John on <a href="tel:0872594880">087 259 4880</a>.</Alert> : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        <FormField id="qn" label="Your name" required error={errors.name}><Input id="qn" name="name" autoComplete="name" required invalid={!!errors.name} /></FormField>
        <FormField id="qp" label="Phone" required error={errors.phone}><Input id="qp" name="phone" type="tel" autoComplete="tel" icon="phone" placeholder="087 123 4567" required invalid={!!errors.phone} /></FormField>
        <FormField id="qs" label="What do you need" required error={errors.service}><Select id="qs" name="service" placeholder="Choose a job type" options={JOB_TYPES} required invalid={!!errors.service} /></FormField>
        <FormField id="qe" label="Eircode of the job" optional><Input id="qe" name="eircode" icon="map-pin" placeholder="W23 X4Y5" autoComplete="postal-code" style={{ textTransform: 'uppercase' }} /></FormField>
      </div>
      <FormField id="qm" label="Anything we should know" optional hint="Rough size, current surface, drainage problems, access"><Textarea id="qm" name="message" rows={4} aria-describedby="qm-hint" /></FormField>
      <div className="hs-visually-hidden" aria-hidden="true"><label htmlFor="qc">Company</label><input id="qc" name="company" tabIndex={-1} autoComplete="off" /></div>
      <div><Button type="submit" variant="accent" iconRight="arrow-right" loading={status === 'sending'}>Send request</Button></div>
    </div></form>
  );
}
