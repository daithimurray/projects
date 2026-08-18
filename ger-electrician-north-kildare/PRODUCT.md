# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS per page, zero dependencies, no build step. Chosen by the
user from the offered options (four separate pages rather than the
single-file pattern used by the sibling projects in this repo), because
PRD §7.1 requires distinct `/services`, `/about` and `/contact` URLs for
local search, and PRD §35 asks for a lightweight static architecture with
minimal JavaScript. Deploys by copying the directory to any static host.

## Users

**Primary: a homeowner in North Kildare who needs an electrician.** They
are usually mid-problem (a socket has stopped working, a light is out, a
fuse keeps tripping) or mid-project (an upgrade, new lighting). They found
the site through a Google search, a referral, or a link, often on a phone,
often standing in the room with the problem. Their job is to decide, in
well under a minute, whether to ring this person. They are not shopping;
they are filtering.

**Secondary: a landlord** with a repair or maintenance job at a rental
property, needing proof of registration and confidence the electrician
covers the property's town.

**Secondary: a small business owner** needing straightforward maintenance
or installation work. Per PRD §5.2 the site must not position Ger as a
commercial electrical contractor until he confirms what he does for
businesses.

The decisive question for all three is trust before contact: this is a
stranger who will be inside their home. Credentials, experience and
locality do the persuading, not price or marketing.

## Product Purpose

A four-page static marketing site for an independent electrician trading
in North Kildare. Its single job is to generate telephone enquiries. It
succeeds when a first-time visitor can answer five questions after roughly
ten seconds on the home page (PRD §39): who this is, what he does, where he
works, why he can be trusted, and how to contact him. Secondary conversion
is a quote request.

Success is measured by phone-link clicks, quote clicks, and form
submissions, not by time on page or scroll depth. Every design decision
that increases dwell time at the expense of a faster call is the wrong
decision.

## Positioning

One named, experienced local electrician who answers his own phone, not a
call centre, a franchise, or a national booking platform. The mechanism a
competitor cannot truthfully copy is the combination of a specific person
(Ger), a specific small area (Leixlip, Celbridge, Maynooth, North Kildare),
and a long single-operator track record. The site is deliberately not a
company site: PRD §18.1 requires the About page to feel personal and
explicitly not read like a large electrical company.

## Operating Context

Visitors arrive overwhelmingly on mobile, frequently from a Google search
for "electrician" plus a town name, and frequently while the fault is
still in front of them. Many arrive after being given Ger's name verbally
by a neighbour or family member; for those visitors the site is a
credibility check on a name they already have, not a discovery tool.

Conversion happens off-site, in a phone call. The site's role ends at the
`tel:` link. There is no booking, no account, no payment, no chat, and no
job tracking (PRD §36).

## Capabilities and Constraints

Confirmed and buildable:

- Four pages: `/`, `/services`, `/about`, `/contact`, plus a privacy page
  because the site collects enquiry information (PRD §37).
- `tel:` links throughout, with **Call Ger** as the single, consistently
  worded primary call to action (PRD §21.1) and **Request a Quote** as the
  single secondary one (PRD §21.2).
- A quote enquiry form that composes a `mailto:` message. Chosen by the
  user over a hosted form service. This means no server, no third-party
  script, and no spam endpoint, at the cost of depending on the visitor
  having a mail client. The form must therefore always display the phone
  number and email address as selectable plain text as a fallback.
- Real photographs of Ger and his work exist and will be supplied. The
  build must reference them at documented paths with reserved aspect
  ratios so that dropping the files in requires no markup change.
- Local business structured data, per-page metadata, sitemap and robots.

Explicitly undecided, and therefore not to be invented (PRD §3.2, §43):

- Trading name, telephone number, and contact email address.
- Safe Electric / Registered Electrical Contractor status and registration
  number. PRD §3.3 forbids publishing a registration number or Safe
  Electric logo until permission and accuracy are confirmed.
- Insurance status and exact qualifications.
- Exact years of experience (context supplies "approximately 30").
- Exact service list, exact service areas, opening hours.
- Whether Ger does emergency or out-of-hours work, commercial work, or
  accepts text messages.
- Any guarantee, any response-time claim.

The user has stated the client will review the whole site before it is
published. Supplied context facts (PRD §3.1) may therefore appear as
draft copy for that review, but anything the PRD bans outright stays out
regardless: no invented testimonials, no invented registration number, no
invented telephone number presented as real.

## Brand Commitments

- The primary call to action is worded **Call Ger** everywhere. Never
  "Contact us", "Get started", "Speak to someone", or "Book now"
  (PRD §21.1).
- The secondary call to action is worded **Request a Quote** everywhere.
- The customer-facing regulatory term, once verified, is "Registered
  Electrical Contractor (REC) with the Safe Electric Scheme" (PRD §3.3).
- The hero headline is fixed by the PRD: "Local Electrician in North
  Kildare" (PRD §10.1).
- No lightning bolts as the primary visual identity, no cartoon
  electrician graphics, no generic electrical-bolt icons (PRD §10.5,
  §22.4).
- Must not look like a technology startup or a national electrical
  company (PRD §22.1).

## Evidence on Hand

- The PRD itself, including supplied company context (PRD §3.1).
- Real photographs of Ger and of completed work: confirmed to exist,
  not yet supplied. Until they arrive the build ships labelled placeholder
  files at the documented paths so the layout is never broken and no
  stock or AI-generated image is ever passed off as Ger or his work
  (PRD §10.5, §34).
- **No customer testimonials are on hand.** PRD §15.2 forbids inventing
  them and PRD §15.2 says to remove the section at launch if none exist.
  The reviews section is therefore omitted, not filled.
- No logo. No Google Business Profile link. No domain.

## Product Principles

1. **The phone call is the product.** Every page ends in a reachable
   `tel:` link, and no interaction may sit between a visitor and that
   link. Information that does not help someone decide to ring is cut.
2. **Trust is earned with verifiable specifics, never with adjectives.**
   A named person, a named area, and a checkable registration beat
   "professional", "reliable" and "quality service". Where a specific is
   not yet verified, the site omits it rather than reaching for the
   adjective.
3. **Nothing ships that Ger has not confirmed.** Unverified claims are
   held out of the markup and listed for him, not softened into vague
   copy. An empty section is honest; a fabricated one is a liability.
4. **Mobile standing in the room is the design case.** Large touch
   targets, no horizontal scroll, trust signals near the top, and the
   phone number reachable without opening a menu.
5. **The site must read as one careful tradesman, not a brand.** Precision
   and restraint communicate competence in this trade; polish that reads
   as marketing spend actively undermines it.

## Accessibility & Inclusion

Target WCAG 2.2 AA (PRD §24). Specific obligations: semantic HTML,
logical heading order, visible keyboard focus, labels associated with every
form field, errors communicated by more than colour, alternative text on
meaningful images and empty alt on decorative ones, touch targets large
enough to hit one-handed, and `prefers-reduced-motion` honoured for any
animation. The audience skews older than a typical consumer web audience,
so body text runs larger than a default marketing site and contrast is
held above the minimum rather than at it.
