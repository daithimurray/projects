# Hawthorn Green Residents' Association: source

Source for the residents association site. The built site lives in `/residents/`.
Page map and copy come from the content plan (`content-plan/site-content-plan.md` in the project files).

```
node build.mjs          # preview build: placeholders get a dotted underline and a banner
node build.mjs --final  # launch build: no banner, no underlines
npm run serve           # then open http://localhost:4321/residents/
```

The build has no dependencies (Node 18+). It writes every page, one `.ics` per event, copies the
assets, and fails if any internal link or anchor does not resolve.

- `data.mjs`: all content. Site facts, posts, events, committee, documents, FAQs.
- `build.mjs`: page templates and the link check.
- `assets/`: `styles.css`, `main.js`, fonts, favicon, `robots.txt`, `vercel.json`.

## Adding content

- **News post**: add an entry to `posts` (kind `news` or `council`). It appears on Home (newest 3) and News.
- **Event**: add an entry to `events`. It gets its own page and calendar file. Home shows the next event
  still to come, worked out in the browser, so it never shows a past event.
- **Document**: set `file` to a path under `residents/docs/` and put the PDF there. Until then it shows "Coming soon".
- Update `site.lastUpdated` whenever content changes. It shows in the footer.

## Design

- Type: Fraunces (display) and Public Sans (text). Palette: hawthorn green, paper, berry red, sun yellow.
- Signature: an estate skyline drawn in SVG. Its three layers move at different speeds on scroll, and windows light up on load.
- Motion: staggered scroll reveals, sticky header that condenses, reading-progress bar, count-up numbers,
  filter chips with view transitions, animated accordions, slide-in menu, cross-page transitions.
  All of it switches off under `prefers-reduced-motion`.
- Accessibility: skip link, landmarks, visible focus, 44px minimum targets, native `<dialog>` menu,
  form errors tied to fields with `aria-describedby`, live regions for filter and search results.

## How the forms work

There is no backend. Join, Contact and Subscribe validate in the page, then open a pre-filled email to
the association address. Nothing is stored by the site. If the committee wants submissions without the
visitor's email app, swap in a form service (for example FormSubmit, as on the Cathy Conlon site) and
update the privacy notice.

## Before launch: the association must supply

Everything with a dotted underline in a preview build is a placeholder. From the content plan, the blockers are:

1. Official name and logo (the mark and "Hawthorn Green" are placeholders).
2. Committee names, roles and one-line bios, with written consent to publish each. Photos optional (initials show until then).
3. A shared contact email the committee controls (set `site.email` in `data.mjs`; the forms pick it up at build time).
4. At least 3 real news posts or events.

Then: estate facts (homes, roads, council), the documents, social links, meeting details, and the
privacy notice sign-off (data controller, retention period). Build with `--final`, then remove the
`X-Robots-Tag` header from `vercel.json` and the `Disallow` from `robots.txt`.
