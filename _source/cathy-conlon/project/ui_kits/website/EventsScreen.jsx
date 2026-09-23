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
import { events } from "./data.js";
export function EventsScreen({ onToast }) {
  const up = events.filter(e => !e.past), past = events.filter(e => e.past);
  const row = (e) => <EventCard key={e.title} {...e} actions={!e.past && !e.soldOut && <Button size="sm" variant="secondary" onClick={() => onToast && onToast("Seat reserved. See you there")}>Reserve a seat</Button>} />;
  return <Container style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--gap-section)" }}>
    <div style={{ maxWidth: "var(--measure-wide)", marginBottom: "var(--space-8)" }}><h1 className="type-headline">Readings &amp; events</h1><p className="type-bodylg" style={{ color: "var(--fg-secondary)", marginTop: "var(--space-4)" }}>Launches, festival readings, and book-club visits. If you'd like me to read, write to me.</p></div>
    <Grid><Col span={8} style={{ gridColumn: "span 8" }}>
      <Tabs id="ev" tabs={[{ value: "up", label: "Upcoming", count: up.length, content: up.length ? <div>{up.map(row)}</div> : <EmptyState glyph="¶" title="Nothing scheduled yet" description="New readings are announced in the letter first. Or ask me to come to your festival, library or book club." actions={<Button variant="secondary" href="/contact">Enquire about a reading</Button>} /> }, { value: "past", label: "Past", content: <div>{past.map(row)}</div> }]} />
    </Col><Col span={4} style={{ gridColumn: "9 / span 4" }}><NewsletterSignup variant="plain" title="Hear about readings first" description="The letter goes out before every event." fine="" onSubmit={() => onToast && onToast("You're on the list")} /></Col></Grid>
  </Container>;
}