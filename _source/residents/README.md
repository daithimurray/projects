# Barnhall Meadows residents association: source

Source for the residents association site for Barnhall Meadows, Leixlip, Co. Kildare. The built site lives in `/residents/`.
Page map and copy come from the content plan (`content-plan/site-content-plan.md` in the project files). Estate facts come from
the research profile (`research/barnhall-meadows-profile.md` in the project files).

```
node build.mjs          # preview build: placeholders get a dotted underline and a banner
node build.mjs --final  # launch build: no banner, no underlines
npm run serve           # then open http://localhost:4321/residents/
```

The build has no dependencies (Node 18+). It writes every page, one `.ics` per event, copies the
assets, and fails if any internal link or anchor does not resolve. It also fails on house style problems in the copy:
any em or en dash, a hyphen used as a dash, or a banned stock phrase (`bannedPhrases` in `build.mjs`).

## Writing rules

David's rules for all site copy, agreed on 1 October 2026. The build catches dashes and fixed phrases. The rest need a read-through.

- No em or en dashes. Use commas, full stops, brackets, or "to" for ranges.
- No binary contrasts ("It's not X. It's Y.", "not just X but Y", "more than just").
- No throat-clearing openers, faux-insight setups or colon reveals. Colons in labels, times and lists are fine.
- No dramatic fragments or punchline endings. Short headlines and button labels can stay short.
- No superficial analysis ("highlighting", "reflecting", "showcasing") and no puffery ("a testament to", "pivotal").
- Name the source or cut the claim. No "experts agree" or "studies show".
- One name per thing: "residents" (never "homeowners"), "taken in charge" (not "handover"), "green areas",
  "street lights", "the monthly update", "the developer" after the first mention of Glenveagh Homes.

- `data.mjs`: all content. Site facts, posts, events, committee, documents, FAQs.
- `build.mjs`: page templates and the link check.
- `assets/`: `styles.css`, `main.js`, fonts, favicon, `robots.txt`, `vercel.json`.
- `wonderful-barn/`: David's interactive 3D model of the Wonderful Barn, built from the 2024 measured survey. The build copies it to
  `/residents/wonderful-barn/` as is. three.js r160 and the model's fonts are served from the folder, so the page makes no
  third-party requests. Home and the park post link to it.
- `DEPLOY.md`: how to put the site on Vercel.

## Adding content

- **News post**: add an entry to `posts` (kind `news` or `council`). It appears on Home (newest 3) and News.
- **Event**: add an entry to `events`. It gets its own page and calendar file. Home shows the next event
  still to come, worked out in the browser, so it never shows a past event.
- **Document**: set `file` to a path under `residents/docs/` and put the PDF there, or set `url` for an outside source. Otherwise it shows "Coming soon".
- **Sources**: council posts and the estate section carry `sources` (label and link), shown under the text.
- Update `site.lastUpdated` whenever content changes. It shows in the footer.

## Design

- Direction: "the estate beside the Barn", agreed by David on 1 October 2026.
- Type: upright Fraunces at a low optical size for headings (no italic), Public Sans for text.
- Palette: meadow green, limestone, barn ochre, slate blue. Ochre is for shapes and large type; text uses the
  darker `--ochre-ink`. Slate is for links and council notices. Red (`--signal`) is for errors and emergencies only.
  Every text pairing passes WCAG AA (contrast ratios are noted next to the tokens in `styles.css`).
- Logo and favicon: the Wonderful Barn with its two pigeon houses (`markShapes` in `build.mjs`; the favicon is generated from it).
- Signature: the estate skyline in SVG. The Barn stands in the meadow with modern semis, terraces and an apartment
  block either side. The back layers move on scroll, and windows light up on load. The Barn is drawn from
  published descriptions; check it against a photo before launch.
- Taking-in-charge tracker: stair steps on Home and on the taking-in-charge post (`takingInCharge` in `data.mjs`).
  The stair line draws itself once when it scrolls into view. Update the statuses when the council replies.
- Inner pages: a quiet, tone-on-tone Barn beside the page header (wide screens) and the stair coil as a divider.
- Motion: staggered scroll reveals, the stair line, sticky header that settles on scroll (no height change), reading-progress bar, count-up numbers,
  filter chips with view transitions, animated accordions, slide-in menu, cross-page transitions.
  All of it switches off under `prefers-reduced-motion`.
- Accessibility: skip link, landmarks, visible focus, 44px minimum targets, native `<dialog>` menu,
  form errors tied to fields with `aria-describedby`, live regions for filter and search results.

## How the forms work

There is no backend. Join, Contact and Subscribe validate in the page, then open a pre-filled email to
the association address. Nothing is stored by the site. If the committee wants submissions without the
visitor's email app, swap in a form service (for example FormSubmit, as on the Cathy Conlon site) and
update the privacy notice.

## Before launch

Everything with a dotted underline in a preview build is a placeholder. Posts and events marked "Example" are
placeholders too.

### Check the researched facts

The estate facts came from search-engine extracts, not full reads of each page. Check each one against the source
linked on the site before launch:

- Glenveagh built the estate. Planning for up to 450 homes granted 13 April 2018 (ABP-300606).
- Clúid Housing has 56 cost-rental homes in the estate.
- The Wonderful Barn: built 1743 by Katherine Conolly.
- Wonderful Barn park plan (Part 8, P82024.10) approved 18 October 2024.
- Taking in charge: consultation 19 November to 18 December 2024; still not taken in charge per the council's reply in September 2025.
- The Barn drawing (logo, favicon, skyline): check the stair, the flat roof and the pigeon houses against a photo (the 3D model in `wonderful-barn/` follows the 2024 survey and is the better guide).
- The taking-in-charge tracker: ask the council for the current position and update `takingInCharge`.
- Leixlip Garda Station, 19 Station Road, 01 666 7800.

### Kept as placeholders on purpose

- The association's name. "Barnhall Meadows Residents' Association" is a working name; none was found online.
- Which councillors to list. Leixlip or Celbridge local electoral area is unconfirmed, so the site lists none.
- The road list. Six roads were found and the list is likely incomplete, so the forms ask for a free-text address.
  Swap in a dropdown once the committee confirms every road.
- Bus routes, the council's phone number and online reporting link, and Glenveagh's contact for estate issues.
- How many of the 450 homes (including 100 apartments) are built and occupied.

### The committee must supply

1. Official name, and a yes or no on the Barn mark as the logo.
2. Committee names and one-line bios, with written consent to publish each. Cards show roles only until then.
3. A shared contact email the committee controls. Set `site.email` in `data.mjs`; the forms pick it up at build time.
   The current `committee@example.com` is a placeholder.
4. At least 3 real news posts or events to replace the examples.

Then: the documents, public social pages (set `site.facebook` and `site.instagram`; the links stay hidden while they are
`null`, and the current Facebook group is private so it can't be used), meeting dates and venue, and the privacy notice sign-off (data controller,
retention period). Build with `--final`, then remove the `X-Robots-Tag` header from `vercel.json` and the
`Disallow` from `robots.txt`.
