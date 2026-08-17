---
target: liffey-accountancy site
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-17T11-04-56Z
slug: liffey-accountancy-index-html
---
# Critique — liffey-accountancy (multi-page, navy classic)

Method: dual-agent (A: design review · B: detector). Detector ran in DEGRADED regex mode (HTML parser modules unavailable).

## Heuristics (27/40 — Acceptable/Good boundary)
1 Status 3 (submit button never disables during send) · 2 Real world 4 (excellent plain-English copy) · 3 Control 3 (mobile menu: no Escape, "Menu" never becomes "Close") · 4 Consistency 3 (5–8 inline style= per page fork the system) · 5 Error prevention 3 (novalidate + blur-only validation) · 6 Recognition 3 (near-synonymous card titles) · 7 Flexibility 3 · 8 Minimalist 2 (three 5–6 card walls, no visual peaks) · 9 Recovery 3 (error summary renders below submit) · 10 Help 3 (two FAQ answers are literally "Yes.")

## Specificity verdict
60% template / 40% authored; the authored part is all copywriting. No visual element could only belong to Liffey. Zero graphic device; founder (trust anchor) has no design presence.

## Priority issues
- [P1] Homepage is three interchangeable card walls (17 near-identical .card). Fix: cut "Six reasons" to 2-col editorial list; number/icon service cards, link to services.html#anchor, add 200ms cubic-bezier(0.2,0,0,1) lift+shadow hover.
- [P1] Contact form rows misalign when "(optional)" wraps labels to two lines (~25px input offset). Fix: optional tag inline-right on the label row (flex space-between).
- [P2] No hover/motion vocabulary beyond button color swaps; FAQ details snaps open. Fix: 200ms ease-out fades/underline slides, honoring existing reduced-motion block.
- [P2] Section rhythm forked by inline style="padding-top:0" overrides. Fix: a real .section--tight token.
- [P3] Georgia caps the brand; self-host a distinctive serif, h1 to clamp(2.6rem,6vw,4.2rem), -0.015em.

## Detector
5 findings; 2 confirmed FALSE POSITIVES (monotonous-spacing misread custom .mt-2 as Tailwind 8px — actual 32px; flat-type-hierarchy measured 3 inline sizes, missed styles.css clamp scale ≈4.4:1). Real: side-tab border-left on .problem-list (styles.css:346), em-dash overuse (about 8, services 12).

## Personas
Jordan: two competing header CTAs; mid-funnel exits before final reassurance. Casey: 8-option select; ~16px native radios; error summary below fold; "Book" pill below fold in open mobile menu. Sam (best of set): skip link, focus-visible, aria-invalid all good; footer has four h2s; no focus trap in mobile nav.

## Minor
No favicon; placeholder phone visible in copy AND hardcoded in the error-catch string; hero-card gutters ~64px unaligned at 1280; CSS comment says "green label" for a blue value; success-state green appears nowhere else in palette; 404 lost the header CTA.

## Questions
Why does the design's most-repeated component fragment the (excellent) copy into 40-word crumbs? Where is Aoife Byrne, the trust anchor? What single visual element would a client name in a lineup of five Kildare accountants?
