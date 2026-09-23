import React from "react";
import { Button } from "@ds/components/actions/Button.jsx";
import { TextLink } from "@ds/components/actions/TextLink.jsx";
import { Section } from "@ds/components/layout/Section.jsx";
import { Hero } from "@ds/components/layout/Hero.jsx";
import { BookCard } from "@ds/components/content/BookCard.jsx";
import { EventCard } from "@ds/components/content/EventCard.jsx";
import { Alert } from "@ds/components/feedback/Alert.jsx";
import { TextField } from "@ds/components/forms/TextField.jsx";
import { TextArea } from "@ds/components/forms/TextArea.jsx";
import { Select } from "@ds/components/forms/Select.jsx";
import { author, novel, collection, readOnline, publications, events, prizes, publisher, festival } from "./content.js";

// Forms only render when a provider is configured, so nothing on the page pretends to send.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "";           // Formspree-style JSON endpoint
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT || ""; // list provider's embed-subscribe URL
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "";

const BASE = import.meta.env.BASE_URL; // "/cathyconlon/"
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Cover({ book, className }) {
  if (book.cover) return <img className={className} src={book.cover} alt={`Cover of ${book.title}`} />;
  return <div className={"cc-cover " + (className || "")} aria-hidden="true">
    <span className="cc-cover__title">{book.title}</span>
    <span className="cc-cover__author">{author.name}</span>
  </div>;
}

function ContactForm() {
  const [v, setV] = React.useState({ name: "", email: "", topic: "", message: "" });
  const [err, setErr] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | failed
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = "Please tell me what to call you.";
    if (!EMAIL_RE.test(v.email.trim())) er.email = "That email address doesn't look right.";
    if (!v.message.trim()) er.message = "A line or two is enough.";
    setErr(er);
    const first = ["name", "email", "message"].find((k) => er[k]);
    if (first) { document.getElementById("cc-" + first)?.focus(); return; }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) });
      setStatus(res.ok ? "sent" : "failed");
    } catch { setStatus("failed"); }
  };
  if (status === "sent") return <Alert tone="success" title="Message sent">Thank you. I'll reply within a week or two.</Alert>;
  const n = Object.keys(err).length;
  return <form onSubmit={submit} noValidate className="cc-form">
    {n > 0 && <Alert tone="error" title="A few things to fix">{n} field{n > 1 ? "s need" : " needs"} attention below.</Alert>}
    {status === "failed" && <Alert tone="error" title="That didn't send">Please try again in a moment{CONTACT_EMAIL ? <>, or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></> : ""}.</Alert>}
    <div className="cc-form__row">
      <TextField id="cc-name" name="name" label="Name" value={v.name} onChange={set("name")} error={err.name} autoComplete="name" />
      <TextField id="cc-email" name="email" type="email" label="Email" value={v.email} onChange={set("email")} error={err.email} autoComplete="email" />
    </div>
    <Select id="cc-topic" name="topic" label="Topic" optional placeholder="Choose one" value={v.topic} onChange={set("topic")} options={["Readings and festivals", "Book clubs", "Rights and permissions", "Press", "Something else"]} />
    <TextArea id="cc-message" name="message" label="Message" serif rows={5} value={v.message} onChange={set("message")} error={err.message} />
    <div><Button type="submit" loading={status === "sending"}>{status === "sending" ? "Sending" : "Send"}</Button></div>
  </form>;
}

function Newsletter() {
  return <div className="cc-letter">
    <h3 className="cc-h3">A letter from Celbridge</h3>
    <p className="cc-muted">New poems, readings and news of the novel, a few times a year.</p>
    <form className="cc-letter__form" action={NEWSLETTER_ENDPOINT} method="post" target="_blank">
      <label htmlFor="cc-letter-email" className="ih-field__label">Email address</label>
      <div className="cc-letter__row">
        <input id="cc-letter-email" className="ih-input" type="email" name="email" required autoComplete="email" />
        <Button type="submit" variant="secondary">Subscribe</Button>
      </div>
      <p className="cc-fine">Unsubscribe any time. See the <a href={BASE + "privacy/"}>privacy notice</a>.</p>
    </form>
  </div>;
}

export function OnePage() {
  return <>
    <Hero id="top" layout="split" className="cc-hero"
      eyebrow="Poet and novelist, Celbridge"
      title={<><span className="visually-hidden">{author.name}: </span>Memory, place, and the women <em>history overlooked.</em></>}
      lede={<>Poems, stories and radio drama from Co. Kildare. My first novel, <cite>{novel.title}</cite>, is out now.</>}
      actions={<><Button variant="accent" href={novel.buy} target="_blank" rel="noopener noreferrer">Buy the novel</Button><Button variant="tertiary" href="#poetry">Read the poems</Button></>}
      media={author.portrait ? <img className="cc-portrait" src={author.portrait} alt={`Portrait of ${author.name}`} /> : <a href="#books" className="cc-hero__book" aria-label={`${novel.title}, novel, ${novel.year}`}><Cover book={novel} /></a>} />

    <Section id="books" tone="sunken" title="Books">
      <div className="cc-books">
        <BookCard layout="row" featured title={novel.title} author={author.name} cover={novel.cover} kind={novel.kind} publisher={novel.publisher} year={novel.year} blurb={novel.blurb}
          actions={<><Button variant="accent" href={novel.buy} target="_blank" rel="noopener noreferrer">Buy the novel, {novel.price}</Button><TextLink variant="arrow" href="#swift">The story behind it</TextLink></>} />
        <BookCard layout="row" title={collection.title} author={author.name} cover={collection.cover} kind={collection.kind} publisher={collection.publisher} year={collection.year} blurb={collection.blurb}
          actions={<p className="cc-stockists"><span className="cc-label">In bookshops</span>{collection.stockists.join("; ")}.</p>} />
      </div>
      <p className="cc-note">Both books are published by the <TextLink href={publisher.href} external>{publisher.name}</TextLink>.</p>
    </Section>

    <Section id="swift" tone="inverse" eyebrow="Celbridge, 1720" title="Swift came to Celbridge Abbey to see Vanessa.">
      <div className="cc-chapter">
        <div className="cc-chapter__text">
          <p className="cc-lede">In 1720 Jonathan Swift visited Esther Vanhomrigh, the woman he called Vanessa, a short walk from where I live. Their seventeen years of letters and arguments became my first novel, about a woman who wanted an equal place beside him.</p>
          <div className="cc-links"><TextLink href={festival.href} external>{festival.name}</TextLink><TextLink href={events[1].href} external>Watch the launch at Barberstown Castle</TextLink></div>
        </div>
        <p className="cc-chapter__year" aria-hidden="true">1720</p>
      </div>
    </Section>

    <Section id="poetry" title="Poems to read and hear">
      <ul className="cc-reads">
        {readOnline.map((r) => <li key={r.href}>
          <a className="cc-read" href={r.href} target="_blank" rel="noopener noreferrer">
            <span className="cc-read__meta">{r.kind} at {r.where}, {r.year}</span>
            <span className="cc-read__title">{r.title}<span className="visually-hidden"> (opens in new tab)</span></span>
            <span className="cc-read__note">{r.note}</span>
          </a>
        </li>)}
      </ul>
      <p className="cc-note cc-note--wide">Poems and stories have also appeared in {publications.slice(0, -1).join(", ")} and {publications.at(-1)}.</p>
    </Section>

    <Section id="events" tone="sunken" title="Readings">
      <div className="cc-events">
        <div className="cc-events__cta">
          <p className="cc-lede">Nothing is scheduled right now. Festivals, libraries and book clubs are welcome to ask.</p>
          <Button variant="secondary" href="#contact">Ask about a reading</Button>
        </div>
        <div className="cc-events__list">
          <h3 className="cc-h3">Recent</h3>
          {events.map((e) => <EventCard key={e.title} date={e.date} title={e.title} venue={e.venue} city={e.city} time={e.time} kind={e.kind}
            actions={e.href ? <TextLink href={e.href} external>{e.linkLabel}</TextLink> : undefined} />)}
        </div>
      </div>
    </Section>

    <Section id="about" title="About Cathy">
      <div className="cc-about">
        <div className="cc-about__bio type-body">
          <p>I'm an Irish writer living in Celbridge, Co. Kildare. I write poetry, short stories, radio drama and fiction. Some earlier work appeared under my full name, Catherine Conlon.</p>
          <p>My debut poetry collection, <cite>{collection.title}</cite>, was published by Revival Press in 2025. My first novel, <cite>{novel.title}</cite>, was published by Savoy Editions and launched at Barberstown Castle by Ger Duffy in May 2026. Two of my stage plays have been performed, and a radio play was shortlisted for the RTÉ P.J. O'Connor Awards.</p>
          <div className="cc-links"><TextLink href={BASE + "press/cathy-conlon-bio.txt"} download>Short bio for press (.txt)</TextLink><TextLink href={author.x} external>@cat_conlon on X</TextLink></div>
        </div>
        <div className="cc-about__prizes">
          <h3 className="cc-h3">Prizes</h3>
          <ul className="cc-prizes">{prizes.won.map((p) => <li key={p.what}><span className="cc-prizes__what">{p.href ? <TextLink href={p.href} external>{p.what}</TextLink> : p.what}</span><span className="cc-muted">{p.detail}</span></li>)}</ul>
          <h3 className="cc-h3">Shortlisted</h3>
          <ul className="cc-prizes">{prizes.shortlisted.map((p) => <li key={p.what}><span className="cc-prizes__what">{p.what}</span><span className="cc-muted">{p.detail}</span></li>)}</ul>
        </div>
      </div>
    </Section>

    <Section id="contact" tone="sunken" title="Write to me">
      <div className="cc-contact">
        <div className="cc-contact__main">
          <p className="cc-lede">Readings, book clubs, rights, or just to say hello.</p>
          {FORM_ENDPOINT ? <ContactForm /> : <ul className="cc-routes">
            {CONTACT_EMAIL && <li><span className="cc-label">Email</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>}
            <li><span className="cc-label">On X</span><TextLink href={author.x} external>@cat_conlon</TextLink></li>
            <li><span className="cc-label">Readings and rights</span><span>through my publisher, the {publisher.name}: <a href={`mailto:${publisher.email}`}>{publisher.email}</a></span></li>
          </ul>}
        </div>
        {NEWSLETTER_ENDPOINT && <div className="cc-contact__side"><Newsletter /></div>}
      </div>
    </Section>
  </>;
}
