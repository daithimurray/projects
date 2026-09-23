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
import { poems, publications } from "./data.js";
export function PoemsScreen() {
  const [q, setQ] = React.useState("");
  const [col, setCol] = React.useState("all");
  const [themes, setThemes] = React.useState([]);
  const all = [...new Set(poems.flatMap(p => p.themes))];
  const list = poems.filter(p => (col === "all" || p.collection === col) && (!q || (p.title + p.about).toLowerCase().includes(q.toLowerCase())) && themes.every(t => p.themes.includes(t)));
  return <Container style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--gap-section)" }}>
    <div style={{ maxWidth: "var(--measure-wide)" }}><h1 className="type-headline">Poetry</h1><p className="type-bodylg" style={{ color: "var(--fg-secondary)", marginTop: "var(--space-4)" }}>Poems from The Light Dancing and a few uncollected ones. Where a poem is online, I link to it; the rest are in the book.</p></div>
    <div style={{ display: "flex", gap: "var(--space-5)", alignItems: "center", flexWrap: "wrap", margin: "var(--space-8) 0 var(--space-5)" }}>
      <div style={{ flex: "1 1 18rem", maxWidth: 360 }}><SearchField value={q} onChange={e => setQ(e.target.value)} onClear={() => setQ("")} shortcut="⌘K" placeholder="Search titles" /></div>
      <Tabs id="col" variant="pills" value={col} onChange={setCol} tabs={[{ value: "all", label: "All" }, { value: "The Light Dancing", label: "The Light Dancing" }, { value: "Uncollected", label: "Uncollected" }]} />
    </div>
    <TagList label="Themes">{all.map(t => <Tag key={t} size="sm" selected={themes.includes(t)} onClick={() => setThemes(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t])}>{t}</Tag>)}</TagList>
    <Grid style={{ marginTop: "var(--space-8)" }}>
      <Col span={8} style={{ gridColumn: "span 8" }}>
        {list.length ? list.map(p => <PostCard key={p.slug} layout="compact" kicker={p.published.length ? "Online · " + p.published.map(x => x.where).join(", ") : p.collection} title={p.title} excerpt={p.about} href={"/poetry/" + p.slug} />) : <EmptyState glyph="¶" title="Nothing here yet" description="No poems match those filters. Try one theme at a time." actions={<Button variant="secondary" onClick={() => { setThemes([]); setQ(""); setCol("all"); }}>Clear filters</Button>} />}
      </Col>
      <Col span={4} style={{ gridColumn: "9 / span 4" }}>
        <span className="ih-section__eyebrow">Poems & stories have appeared in</span>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }} className="type-body">{publications.map(x => <li key={x} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "var(--space-2)" }}>{x}</li>)}</ul>
      </Col>
    </Grid>
  </Container>;
}