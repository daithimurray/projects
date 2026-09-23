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
import { poems, books, events, news } from "./data.js";
export function HomeScreen() {
  const p = poems[0];
  return <>
    <Hero layout="split" eyebrow="Irish writer · Celbridge, Co. Kildare" title={<>Memory, place, and the women <em>history overlooked.</em></>} lede="I write poems, short stories, radio drama and fiction. My debut collection, The Light Dancing, came out in 2025; my first novel, Swift, Vanessa & The Sluttery, in 2026." actions={<><Button variant="accent" href="/books">The novel</Button><Button variant="tertiary" href="/poetry" iconEnd="→">The poems</Button></>} media={<Figure ratio="4/5" placeholder="author portrait, to be supplied" mono />} />
    <Section id="books" tone="sunken" eyebrow="Books" title="Two books, one county" action={<TextLink variant="arrow" href="/books">Both books</TextLink>}>
      <Grid rows>{books.map(b => <Col key={b.slug} span={6} style={{ gridColumn: "span 6" }}><BookCard layout="row" href={"/books/" + b.slug} title={b.title} kind={b.kind} publisher={b.publisher} year={b.year} tag={b.tag} blurb={b.blurb} /></Col>)}</Grid>
    </Section>
    <Section id="poem" bordered eyebrow="From the collection" title={p.title} lede={p.about} action={<TextLink variant="arrow" href="/poetry">All poems</TextLink>}>
      <Grid><Col span={12} style={{ gridColumn: "3 / span 8" }}><PoemBlock meta={`from ${p.collection}, Revival Press ${p.year}`} stanzas={p.stanzas.slice(0, 1)} /><div style={{ marginTop: "var(--space-6)", display: "flex", gap: "var(--space-5)", flexWrap: "wrap" }}><TextLink variant="arrow" href="/poetry/the-light-dancing">Read the poem</TextLink><TextLink href={p.published[1].href} external>Also at The Milk House</TextLink></div></Col></Grid>
    </Section>
    <Section id="swift" tone="inverse" eyebrow="Celbridge, 1720" title="Swift came to Celbridge Abbey to see Vanessa." lede="The novel grew out of the town I live in. Esther Vanhomrigh's story is Celbridge's story, and a festival now carries both names." action={<TextLink variant="arrow" href="/swift-vanessa" style={{ color: "inherit" }}>The story behind the novel</TextLink>}>
      <Grid><Col span={8} style={{ gridColumn: "span 8" }}><Figure ratio="21/9" placeholder="Celbridge Abbey or River Liffey, licensed photograph" mono caption="Celbridge Abbey, where Swift visited Esther Vanhomrigh in 1720." /></Col></Grid>
    </Section>
    <Section id="news" eyebrow="News" title="Recently" action={<TextLink variant="arrow" href="/events">Readings & events</TextLink>}>
      <Grid><Col span={7} style={{ gridColumn: "span 7" }}><PostCard layout="hero" image={null} {...news[0]} href="/events" /></Col><Col span={4} style={{ gridColumn: "9 / span 4" }}>{news.slice(1).map(x => <PostCard key={x.title} layout="compact" {...x} href="/events" />)}</Col></Grid>
    </Section>
    <Container style={{ paddingBottom: "var(--gap-section)" }}><NewsletterSignup title="A letter from Celbridge" description="New poems, readings, and news of the novel. A few times a year, no more." /></Container>
  </>;
}