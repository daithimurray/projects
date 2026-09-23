---
target: Errol Brennan Painting site
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 3
timestamp: 2026-09-23T22-28-07Z
slug: errol-index-html
---
Method: dual-agent (A: design review · B: detector + browser)

Heuristics (9 scored, #7 n/a): 1 Status 3 · 2 Real world 3 · 3 Control 3 · 4 Consistency 2 · 5 Error prevention 2 · 6 Recognition 3 · 8 Minimalist 2 · 9 Error recovery 3 · 10 Help 3. Total 24/36 (67%, Acceptable).

Specificity: copy is specific to Errol; visual system is a category-interchangeable trade template (eyebrow over every h2, 4 zigzag service rows, 3 equal step cards, table, chips, accordion, 4-col footer). Detector: 9 low-contrast eyebrows (#9E6B19 4.0-4.3:1), 9 kicker-above-heading, 1 all-caps hero line; 5 cramped-padding + 1 hover contrast = false positives.

Priority issues:
- P0 Quote form dead-ends on the live domain (QUOTE_ENDPOINT empty); privacy link is # while collecting PII. harden.
- P1 No real photos; 13 placeholder captions visible and read by screen readers; before/after compares two grey boxes. distill then polish.
- P1 Unverified claims shown as fact: Fully insured, Most booked, Prep is 60%, prices, job titles, reply-by-weekday. clarify.
- P1 Broken interactions: slider handle not draggable (range input only covers bottom 64px); Text/Call reply accepted with no phone; Both guide price multiplies exterior EUR1,900 by room count. harden.
- P2 Templated rhythm: 12 eyebrows (cap 4) failing AA; 5 image/text splits in a row; 3 equal cards; 5-element hero; 13.7k px mobile page; Questions eyebrow broken by .faq-intro p specificity. distill then layout.

Minor: inconsistent CTA labels (Get a quote / free quote / fixed quote; Call vs Ring); 6 radii; input borders 1.6:1; small tap targets (chips 36px, segmented 40px, inline/footer links 16-19px); h2 service rows should be h3; headings inside summary; no required/aria-required; empty-email message wrong; photos lost on refresh; mobile price table hides 2 columns; 4+2 work grid; no OG image; self-host fonts; unguarded smooth scrollIntoView.
