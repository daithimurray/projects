import React from "react";
import { Button } from "../../components/actions/Button.jsx";
import { TextLink } from "../../components/actions/TextLink.jsx";
import { IconButton } from "../../components/actions/IconButton.jsx";
import { Container, Grid, Col } from "../../components/layout/Container.jsx";
import { Section } from "../../components/layout/Section.jsx";
import { Hero } from "../../components/layout/Hero.jsx";
import { NewsletterSignup } from "../../components/layout/NewsletterSignup.jsx";
import { PoemBlock } from "../../components/content/PoemBlock.jsx";
import { PullQuote } from "../../components/content/PullQuote.jsx";
import { BookCard } from "../../components/content/BookCard.jsx";
import { EventCard } from "../../components/content/EventCard.jsx";
import { PostCard } from "../../components/content/PostCard.jsx";
import { Byline } from "../../components/content/Byline.jsx";
import { Divider } from "../../components/content/Divider.jsx";
import { Figure } from "../../components/content/Figure.jsx";
import { Breadcrumb } from "../../components/navigation/Breadcrumb.jsx";
import { Tabs } from "../../components/navigation/Tabs.jsx";
import { Pagination } from "../../components/navigation/Pagination.jsx";
import { Tag, TagList } from "../../components/feedback/Tag.jsx";
import { Badge } from "../../components/feedback/Badge.jsx";
import { Alert } from "../../components/feedback/Alert.jsx";
import { EmptyState } from "../../components/feedback/EmptyState.jsx";
import { Menu } from "../../components/overlays/Menu.jsx";
import { TextField } from "../../components/forms/TextField.jsx";
import { TextArea } from "../../components/forms/TextArea.jsx";
import { Select } from "../../components/forms/Select.jsx";
import { Checkbox } from "../../components/forms/Checkbox.jsx";
import { SearchField } from "../../components/forms/SearchField.jsx";
import { prizes, publications } from "./data.js";
export function AboutScreen() {
  return <Container style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--gap-section)" }}>
    <Grid>
      <Col span={4} style={{ gridColumn: "span 4" }}><Figure ratio="4/5" placeholder="author headshot, to be supplied" mono caption="Cathy Conlon" credit="photo credit to follow" /></Col>
      <Col span={7} style={{ gridColumn: "6 / span 7" }}>
        <h1 className="type-headline">About</h1>
        <div className="type-body" style={{ display: "grid", gap: "var(--space-5)", marginTop: "var(--space-5)", maxWidth: "var(--measure)" }}>
          <p>I'm an Irish writer living in Celbridge, Co. Kildare. I write poetry, short stories, radio drama and fiction. Some earlier work appeared under my full name, Catherine Conlon.</p>
          <p>My debut poetry collection, <em>The Light Dancing</em>, was published by Revival Press in 2025. My first novel, <em>Swift, Vanessa &amp; The Sluttery</em>, was published by Savoy Editions and launched at Barberstown Castle in May 2026.</p>
          <p>Two of my stage plays have been performed, and a radio play was shortlisted for the RTÉ P.J. O'Connor Awards.</p>
        </div>
        <Divider />
        <span className="ih-section__eyebrow">Prizes & shortlists</span>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{prizes.map(p => <li key={p.what} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-5)", padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}><span className="type-body">{p.what}</span><span className="type-caption text-muted" style={{ textAlign: "right" }}>{p.detail}</span></li>)}</ul>
        <p className="type-caption text-muted" style={{ marginTop: "var(--space-3)" }}>Prize details are as supplied by the author and await confirmation against organisers' records.</p>
        <Divider />
        <span className="ih-section__eyebrow">Press kit</span>
        <div style={{ display: "grid", gap: "var(--space-2)" }} className="type-body">
          <TextLink href="#" variant="quiet">Short bio, 60 words (.txt)</TextLink>
          <TextLink href="#" variant="quiet">Long bio (.txt)</TextLink>
          <TextLink href="#" variant="quiet">Headshot (to be supplied)</TextLink>
          <TextLink href="#" variant="quiet">Cover images: Swift, Vanessa &amp; The Sluttery · The Light Dancing</TextLink>
        </div>
        <div style={{ marginTop: "var(--space-6)" }}><TagList label="Publications">{publications.map(x => <Tag key={x} size="sm">{x}</Tag>)}</TagList></div>
      </Col>
    </Grid>
  </Container>;
}