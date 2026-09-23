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
export function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [v, setV] = React.useState({ name: "", email: "", topic: "", msg: "", ok: false });
  const [err, setErr] = React.useState({});
  const submit = (e) => { e.preventDefault(); const er = {}; if (!v.name) er.name = "Please tell me what to call you."; if (!/@/.test(v.email)) er.email = "That email doesn't look right."; if (!v.msg) er.msg = "A line or two is enough."; setErr(er); if (!Object.keys(er).length) setSent(true); };
  const set = (k) => (e) => setV(s => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  return <Container width="reading" style={{ paddingTop: "var(--space-9)", paddingBottom: "var(--gap-section)" }}>
    <h1 className="type-headline">Write to me</h1>
    <p className="type-bodylg" style={{ color: "var(--fg-secondary)", margin: "var(--space-4) 0 var(--space-8)" }}>Readings, book clubs, rights, or just to say hello. I read everything; I answer slowly. For publishing matters you can also reach the Limerick Writers' Centre.</p>
    {sent ? <Alert tone="success" title="Sent">Thank you. I'll reply within a week or two.</Alert> :
    <form onSubmit={submit} noValidate style={{ display: "grid", gap: "var(--space-5)" }}>
      {Object.keys(err).length > 0 && <Alert tone="error" title="A few things to fix">{Object.keys(err).length} field{Object.keys(err).length > 1 ? "s need" : " needs"} attention below.</Alert>}
      <Grid><Col span={6} style={{ gridColumn: "span 6" }}><TextField id="name" label="Name" value={v.name} onChange={set("name")} error={err.name} autoComplete="name" /></Col><Col span={6} style={{ gridColumn: "span 6" }}><TextField id="email" type="email" label="Email" value={v.email} onChange={set("email")} error={err.email} autoComplete="email" /></Col></Grid>
      <Select id="topic" label="Topic" placeholder="Choose one" value={v.topic} onChange={set("topic")} options={["Readings & festivals", "Book clubs", "Rights & permissions", "Press", "Something else"]} />
      <TextArea id="msg" label="Message" serif rows={6} value={v.msg} onChange={set("msg")} error={err.msg} />
      <Checkbox id="ok" label="Add me to the letter" description="A few emails a year. Unsubscribe any time." checked={v.ok} onChange={set("ok")} />
      <div><Button type="submit">Send</Button></div>
    </form>}
    <Divider />
    <p className="type-caption text-muted">Also on <TextLink href="https://x.com/cat_conlon" external>X</TextLink>. Publisher: Limerick Writers' Centre, 78 O'Connell Street, Limerick.</p>
  </Container>;
}