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
import { poems } from "./data.js";
export function PoemScreen({ onToast }) {
  const p = poems[0];
  const [large, setLarge] = React.useState(false);
  return <Container width="reading" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--gap-section)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
      <Breadcrumb items={[{ label: "Poetry", href: "/poetry" }, { label: p.collection, href: "/books/the-light-dancing" }, { label: p.title }]} />
      <Menu align="end" trigger={<IconButton label="More">···</IconButton>} items={[{ type: "label", label: "This poem" }, { label: "Copy link", hint: "⌘C", onSelect: () => onToast && onToast("Link copied") }, { label: "Share…" }, { label: "Large type", checked: large, onSelect: () => setLarge(l => !l) }, { type: "separator" }, { label: "Report a typo", danger: true }]} />
    </div>
    <Alert tone="info">Poem text is not reproduced in this kit. The author supplies the final text; this block shows the setting only.</Alert>
    <div style={{ height: "var(--space-8)" }}></div>
    <PoemBlock title={p.title} meta={`from ${p.collection}, Revival Press ${p.year} · first published in Poethead, 2016`} stanzas={p.stanzas} endMark style={large ? { fontSize: "1.5rem" } : undefined} />
    <Divider variant="ornament" />
    <p className="type-body" style={{ color: "var(--fg-secondary)" }}><em>A note.</em> {p.about} It was first published online in 2016 and again, with two others, in 2023.</p>
    <div style={{ marginTop: "var(--space-5)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap" }}>{p.published.map(x => <TextLink key={x.href} href={x.href} external>Read at {x.where} ({x.when})</TextLink>)}</div>
    <div style={{ marginTop: "var(--space-6)" }}><TagList label="Themes">{p.themes.map(t => <Tag key={t} href={"/poetry?t=" + t}>{t}</Tag>)}</TagList></div>
    <Divider />
    <span className="ih-section__eyebrow">More from {p.collection}</span>
    {poems.slice(1, 3).map(x => <PostCard key={x.slug} layout="compact" title={x.title} excerpt={x.about} href={"/poetry/" + x.slug} />)}
    <div style={{ marginTop: "var(--space-8)" }}><Pagination variant="simple" page={1} total={poems.length} hrefFor={() => "/poetry/lizzie"} /></div>
  </Container>;
}