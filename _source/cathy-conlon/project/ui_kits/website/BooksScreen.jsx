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
import { books } from "./data.js";
export function BooksScreen({ onToast }) {
  const [novel, poetry] = books;
  return <>
    <Container style={{ paddingTop: "var(--space-9)" }}>
      <h1 className="type-headline" style={{ marginBottom: "var(--space-8)" }}>Books</h1>
      <BookCard layout="row" featured title={novel.title} kind={novel.kind} publisher={novel.publisher} year={novel.year} tag={novel.tag} blurb={novel.blurb} actions={<><Button variant="accent" href={novel.buy} target="_blank" rel="noopener noreferrer">Buy, {novel.price} ↗</Button><Button variant="tertiary" href="/swift-vanessa">The story behind it</Button></>} />
      <div style={{ marginTop: "var(--space-6)", maxWidth: "var(--measure-wide)" }}><Alert tone="info">Sold through Buythebook.ie, the Irish independent author marketplace. Set in 18th-century London, Dublin and Kildare. Launched 10 May 2026 by Ger Duffy.</Alert></div>
      <Divider variant="ornament" />
      <BookCard layout="row" title={poetry.title} kind={poetry.kind} publisher={poetry.publisher} year={poetry.year} blurb={poetry.blurb} actions={<><Button variant="secondary" onClick={() => onToast && onToast("Ask your bookshop, stockists listed below")}>Where to buy</Button><Button variant="tertiary" href="/poetry">Read the poems</Button></>} />
      <p className="type-caption text-muted" style={{ marginTop: "var(--space-5) " }}>Stocked by {poetry.stockists.join(" · ")}. Revival Press is the poetry imprint of the Limerick Writers' Centre.</p>
    </Container>
    <Section id="praise" tone="sunken" tight eyebrow="From the publisher" title="On Swift, Vanessa & The Sluttery">
      <Grid><Col span={7} style={{ gridColumn: "span 7" }}><PullQuote variant="rule" size="sm" cite="Savoy Editions">A novel of longing, learning, and the pull of genius.</PullQuote></Col><Col span={4} style={{ gridColumn: "9 / span 4" }}><p className="type-caption text-muted">Reader reviews and blurbs are not yet on file. This quotation paraphrases the publisher's description and should be replaced with an approved line.</p></Col></Grid>
    </Section>
  </>;
}