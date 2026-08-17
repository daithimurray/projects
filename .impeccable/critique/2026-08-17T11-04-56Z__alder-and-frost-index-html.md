---
target: alder-and-frost site
total_score: 22
max_score: 32
na_heuristics: 7,9
p0_count: 1
p1_count: 2
timestamp: 2026-08-17T11-04-56Z
slug: alder-and-frost-index-html
---
# Critique — alder-and-frost (single page, premium dark)

Method: dual-agent (A: design review · B: detector). Detector DEGRADED regex mode.

## Heuristics (22/32; H7, H9 n/a — ≈69%, Acceptable/Good boundary)
1 Status 2 (no active-section signal; instant anchor jumps bury headings under sticky header) · 2 Real world 4 (founder-literate language) · 3 Control 3 (mailto-only funnel is a dead end without a mail client) · 4 Consistency 1 (P0: .site-nav a specificity beats .btn-accent — header CTA renders #b8bdb8 on #34d399, ≈1.1:1) · 5 Prevention 3 · 6 Recognition 3 · 8 Minimalist 4 (best restraint in the set) · 10 Help 2 (zero "what happens next" scaffolding)

## Specificity verdict
Most authored of the three: Roman-numeral glyphs, italic-emerald keywords, marquee, numbers band, POV copy. Genre gravity ("dark-luxury consultancy") but specific within it.

## Priority issues
- [P0] Header CTA illegible: `.site-nav a { color: var(--muted) }` (0,1,1) overrides `.btn-accent` (0,1,0). Fix: `.site-nav a.btn-accent { color:#06251a }`. One line.
- [P1] mailto: as sole conversion path. Fix: minimum — subject/body prefill + copy-email affordance; правильный — 4-field glass form.
- [P1] Anchor nav: add scroll-behavior:smooth (reduced-motion-guarded) + scroll-margin-top:90px.
- [P2] Glass cards inert on hover. Fix: 200ms ease-out border-color rgba(52,211,153,0.35), translateY(-3px), intensified glow.
- [P2] No proof layer: numbers with no attribution; add one attributed (anonymized) client quote in the .quote language.

## Detector
2 findings, both verified real but mitigated: dark-glow (zero-offset #34d399 glow — intentional identity), marquee (36s loop — reduced-motion kill + aria-hidden present). Judged acceptable with mitigations; keep.

## Personas
Jordan: three CTAs before any explains the 30-min/no-charge commitment; broken header CTA reads "broken firm". Casey: header never collapses at 390px (~155px stack), nav taps 35px < 44px, marquee clips mid-word, mailto abandonment. Sam: marquee correctly aria-hidden; illegible CTA is also the low-vision trap; no active-section signalling.

## Minor
No favicon/og:image; btn-ghost doesn't lift while btn-accent does; h1 max-width dead rule; #06251a and #0f4534 hardcoded outside token table; 36s marquee reads static.

## Questions
Where does the design take a risk equal to "candour over comfort"? What does the surviving illegible CTA say about visual QA? Why does "decide the future" end in a bare mailto?
