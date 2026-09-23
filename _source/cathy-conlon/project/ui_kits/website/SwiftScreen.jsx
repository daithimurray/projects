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
export function SwiftScreen() {
  return <>
    <Container width="reading" style={{ paddingTop: "var(--space-9)" }}>
      <span className="ih-section__eyebrow">The story behind the novel</span>
      <h1 className="type-headline">Swift, Vanessa & Celbridge</h1>
      <p className="type-bodylg" style={{ color: "var(--fg-secondary)", marginTop: "var(--space-4)" }}>In 1720 Jonathan Swift came to Celbridge Abbey to visit Esther Vanhomrigh, the woman he called Vanessa. I live a short walk from where they met, and the novel began there.</p>
    </Container>
    <Container style={{ paddingTop: "var(--space-8)" }}><Figure ratio="21/9" placeholder="Celbridge Abbey, licensed photograph or commission" mono caption="Celbridge Abbey, Co. Kildare." credit="photo credit to follow" /></Container>
    <Container width="reading" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--gap-section)" }}>
      <div className="type-body" style={{ display: "grid", gap: "var(--space-5)" }}>
        <p>Esther Vanhomrigh was a young woman in Georgian society when she met Swift in London. Their relationship lasted seventeen years and has usually been told as a love triangle with Stella at the third corner. The novel reads it differently: as the story of a woman who argued, in letters and in person, for intellectual equality with the most brilliant man of his age.</p>
        <p>The book moves between London, Dublin and Kildare in the early eighteenth century. It is my first novel; before it I wrote poems, stories and radio drama.</p>
        <PullQuote variant="rule" size="sm" cite="a line for the author to supply">A sentence from the novel, in Vanessa's voice, goes here.</PullQuote>
        <h2 className="type-title2">A note on the name</h2>
        <p>Her name is spelled several ways in the records. This site uses <em>Esther Vanhomrigh</em>, the standard historical spelling.</p>
        <h2 className="type-title2">The festival</h2>
        <p>Celbridge holds a <TextLink href="https://swiftandvanessa.com/" external>Swift &amp; Vanessa Festival</TextLink> each summer. I read from the novel at Castletown House in July 2026.</p>
      </div>
      <Divider />
      <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}><Button variant="accent" href="/books">Buy the novel</Button><Button variant="secondary" href="/contact">Book a reading or a book-club visit</Button></div>
    </Container>
  </>;
}