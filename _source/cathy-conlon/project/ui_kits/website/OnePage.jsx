import React from "react";
import { Button } from "../../components/actions/Button.jsx";
import { TextLink } from "../../components/actions/TextLink.jsx";
import { Container, Grid, Col } from "../../components/layout/Container.jsx";
import { Section } from "../../components/layout/Section.jsx";
import { Hero } from "../../components/layout/Hero.jsx";
import { NewsletterSignup } from "../../components/layout/NewsletterSignup.jsx";
import { PoemBlock } from "../../components/content/PoemBlock.jsx";
import { PullQuote } from "../../components/content/PullQuote.jsx";
import { BookCard } from "../../components/content/BookCard.jsx";
import { EventCard } from "../../components/content/EventCard.jsx";
import { PostCard } from "../../components/content/PostCard.jsx";
import { Divider } from "../../components/content/Divider.jsx";
import { Figure } from "../../components/content/Figure.jsx";
import { Tabs } from "../../components/navigation/Tabs.jsx";
import { Tag, TagList } from "../../components/feedback/Tag.jsx";
import { Alert } from "../../components/feedback/Alert.jsx";
import { EmptyState } from "../../components/feedback/EmptyState.jsx";
import { TextField } from "../../components/forms/TextField.jsx";
import { TextArea } from "../../components/forms/TextArea.jsx";
import { Select } from "../../components/forms/Select.jsx";
import { Checkbox } from "../../components/forms/Checkbox.jsx";
import { poems, books, events, news, prizes, publications } from "./data.js";

export function OnePage({ onToast }) {
  const p = poems[0]; const [novel, poetry] = books;
  const up = events.filter(e => !e.past), past = events.filter(e => e.past);
  const [sent, setSent] = React.useState(false);
  const [v, setV] = React.useState({ name: "", email: "", topic: "", msg: "", ok: false });
  const [err, setErr] = React.useState({});
  const submit = (e) => { e.preventDefault(); const er = {}; if (!v.name) er.name = "Please tell me what to call you."; if (!/@/.test(v.email)) er.email = "That email doesn't look right."; if (!v.msg) er.msg = "A line or two is enough."; setErr(er); if (!Object.keys(er).length) setSent(true); };
  const set = (k) => (e) => setV(s => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  return <>
    <Hero id="top" layout="split" eyebrow="Irish writer · Celbridge, Co. Kildare" title={<>Memory, place, and the women <em>history overlooked.</em></>} lede="I write poems, short stories, radio drama and fiction. My debut collection, The Light Dancing, came out in 2025; my first novel, Swift, Vanessa & The Sluttery, in 2026." actions={<><Button variant="accent" href="#books">The novel</Button><Button variant="tertiary" href="#poetry" iconEnd="→">The poems</Button></>} media={<Figure ratio="4/5" placeholder="author portrait, to be supplied" mono />} />

    <Section id="books" tone="sunken" eyebrow="Books" title="Two books, one county">
      <Grid rows>
        <Col span={6} style={{ gridColumn: "span 6" }}><BookCard layout="row" featured title={novel.title} kind={novel.kind} publisher={novel.publisher} year={novel.year} tag={novel.tag} blurb={novel.blurb} actions={<><Button variant="accent" size="sm" href={novel.buy} target="_blank" rel="noopener noreferrer">Buy, {novel.price} ↗</Button><Button variant="tertiary" size="sm" href="#swift">The story behind it</Button></>} /></Col>
        <Col span={6} style={{ gridColumn: "span 6" }}><BookCard layout="row" title={poetry.title} kind={poetry.kind} publisher={poetry.publisher} year={poetry.year} blurb={poetry.blurb} actions={<><Button variant="secondary" size="sm" onClick={() => onToast && onToast("Stocked by " + poetry.stockists.join(", "))}>Where to buy</Button><Button variant="tertiary" size="sm" href="#poetry">Read the poems</Button></>} /></Col>
      </Grid>
      <p className="type-caption text-muted" style={{ marginTop: "var(--space-6)" }}>The novel is sold through Buythebook.ie. The collection is stocked by {poetry.stockists.join(" · ")}. Both imprints belong to the Limerick Writers' Centre.</p>
    </Section>

    <Section id="swift" tone="inverse" eyebrow="Celbridge, 1720" title="Swift came to Celbridge Abbey to see Vanessa." lede="In 1720 Jonathan Swift visited Esther Vanhomrigh, the woman he called Vanessa, a short walk from where I live. Their seventeen years of letters and arguments became my first novel, about a woman who wanted an equal place beside him." action={<TextLink variant="arrow" href="https://swiftandvanessa.com/" style={{ color: "inherit" }} external>Swift &amp; Vanessa Festival</TextLink>}>
      <Grid><Col span={8} style={{ gridColumn: "span 8" }}><Figure ratio="21/9" placeholder="Celbridge Abbey or River Liffey, licensed photograph" mono caption="Celbridge Abbey, Co. Kildare. I read from the novel at Castletown House in July 2026." /></Col><Col span={4} style={{ gridColumn: "9 / span 4" }}><PullQuote variant="rule" size="sm" cite="a line from the novel, to be supplied">A sentence from the novel, in Vanessa's voice, goes here.</PullQuote></Col></Grid>
    </Section>

    <Section id="poetry" bordered eyebrow="Poetry" title={p.title} lede={p.about + " From The Light Dancing, Revival Press 2025. The setting below is a placeholder. The author supplies the text."}>
      <Grid>
        <Col span={7} style={{ gridColumn: "span 7" }}><PoemBlock stanzas={p.stanzas} endMark /><div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap" }}>{p.published.map(x => <TextLink key={x.href} href={x.href} external>Read at {x.where} ({x.when})</TextLink>)}</div><div style={{ marginTop: "var(--space-5)" }}><TagList label="Themes">{p.themes.map(t => <Tag key={t} size="sm">{t}</Tag>)}</TagList></div></Col>
        <Col span={4} style={{ gridColumn: "9 / span 4" }}>
          <span className="ih-section__eyebrow">Also from the collection</span>
          {poems.slice(1, 4).map(x => <PostCard key={x.slug} layout="compact" kicker={x.published.length ? "Online · " + x.published.map(y => y.where).join(", ") : x.collection} title={x.title} excerpt={x.about} href={x.published[0] ? x.published[0].href : undefined} />)}
          <span className="ih-section__eyebrow" style={{ marginTop: "var(--space-7)" }}>Poems &amp; stories have appeared in</span>
          <TagList>{publications.map(x => <Tag key={x} size="sm">{x}</Tag>)}</TagList>
        </Col>
      </Grid>
    </Section>

    <Section id="events" tone="sunken" eyebrow="Readings & events" title="Launches, festivals, book clubs">
      <Grid><Col span={8} style={{ gridColumn: "span 8" }}>
        <Tabs id="ev" tabs={[{ value: "up", label: "Upcoming", count: up.length, content: up.length ? <div>{up.map(e => <EventCard key={e.title} {...e} />)}</div> : <EmptyState compact glyph="¶" title="Nothing scheduled yet" description="New readings are announced in the letter first. Or ask me to come to your festival, library or book club." actions={<Button variant="secondary" href="#contact">Enquire about a reading</Button>} /> }, { value: "past", label: "Past", content: <div>{past.map(e => <EventCard key={e.title} {...e} />)}</div> }]} />
      </Col><Col span={4} style={{ gridColumn: "9 / span 4" }}><span className="ih-section__eyebrow">News</span>{news.map(x => <PostCard key={x.title} layout="compact" {...x} />)}</Col></Grid>
    </Section>

    <Section id="about" bordered eyebrow="About" title="Cathy Conlon">
      <Grid>
        <Col span={4} style={{ gridColumn: "span 4" }}><Figure ratio="4/5" placeholder="author headshot, to be supplied" mono credit="photo credit to follow" /></Col>
        <Col span={7} style={{ gridColumn: "6 / span 7" }}>
          <div className="type-body" style={{ display: "grid", gap: "var(--space-5)", maxWidth: "var(--measure)" }}>
            <p>I'm an Irish writer living in Celbridge, Co. Kildare. I write poetry, short stories, radio drama and fiction. Some earlier work appeared under my full name, Catherine Conlon.</p>
            <p>My debut poetry collection, <em>The Light Dancing</em>, was published by Revival Press in 2025. My first novel, <em>Swift, Vanessa &amp; The Sluttery</em>, was published by Savoy Editions and launched at Barberstown Castle by Ger Duffy in May 2026. Two of my stage plays have been performed, and a radio play was shortlisted for the RTÉ P.J. O'Connor Awards.</p>
          </div>
          <Divider />
          <span className="ih-section__eyebrow">Prizes &amp; shortlists</span>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{prizes.map(x => <li key={x.what} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-5)", padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}><span className="type-body">{x.what}</span><span className="type-caption text-muted" style={{ textAlign: "right" }}>{x.detail}</span></li>)}</ul>
          <p className="type-caption text-muted" style={{ marginTop: "var(--space-3)" }}>Prize details are as supplied by the author and await confirmation against organisers' records.</p>
          <div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap" }} className="type-label"><TextLink href="#" variant="quiet">Short bio (.txt)</TextLink><TextLink href="#" variant="quiet">Headshot (to be supplied)</TextLink><TextLink href="#" variant="quiet">Cover images</TextLink><TextLink href="https://x.com/cat_conlon" external>X</TextLink></div>
        </Col>
      </Grid>
    </Section>

    <Section id="contact" tone="sunken" eyebrow="Contact" title="Write to me" lede="Readings, book clubs, rights, or just to say hello. I read everything; I answer slowly.">
      <Grid>
        <Col span={7} style={{ gridColumn: "span 7" }}>
          {sent ? <Alert tone="success" title="Sent">Thank you. I'll reply within a week or two.</Alert> :
          <form onSubmit={submit} noValidate style={{ display: "grid", gap: "var(--space-5)" }}>
            {Object.keys(err).length > 0 && <Alert tone="error" title="A few things to fix">{Object.keys(err).length} field{Object.keys(err).length > 1 ? "s need" : " needs"} attention below.</Alert>}
            <Grid><Col span={6} style={{ gridColumn: "span 6" }}><TextField id="name" label="Name" value={v.name} onChange={set("name")} error={err.name} autoComplete="name" /></Col><Col span={6} style={{ gridColumn: "span 6" }}><TextField id="email" type="email" label="Email" value={v.email} onChange={set("email")} error={err.email} autoComplete="email" /></Col></Grid>
            <Select id="topic" label="Topic" placeholder="Choose one" value={v.topic} onChange={set("topic")} options={["Readings & festivals", "Book clubs", "Rights & permissions", "Press", "Something else"]} />
            <TextArea id="msg" label="Message" serif rows={5} value={v.msg} onChange={set("msg")} error={err.msg} />
            <Checkbox id="ok" label="Add me to the letter" description="A few emails a year. Unsubscribe any time." checked={v.ok} onChange={set("ok")} />
            <div><Button type="submit">Send</Button></div>
          </form>}
        </Col>
        <Col span={4} style={{ gridColumn: "9 / span 4" }}><NewsletterSignup variant="plain" title="A letter from Celbridge" description="New poems, readings, and news of the novel. A few times a year, no more." onSubmit={() => onToast && onToast("You're on the list")} /><p className="type-caption text-muted" style={{ marginTop: "var(--space-6)" }}>Publisher: Limerick Writers' Centre, 78 O'Connell Street, Limerick.</p></Col>
      </Grid>
    </Section>
  </>;
}