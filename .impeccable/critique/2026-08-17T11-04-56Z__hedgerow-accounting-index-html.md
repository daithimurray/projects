---
target: hedgerow-accounting site
total_score: 21
max_score: 32
na_heuristics: 7,9
p0_count: 1
p1_count: 2
timestamp: 2026-08-17T11-04-56Z
slug: hedgerow-accounting-index-html
---
# Critique — hedgerow-accounting (single page, editorial cream/olive)

Method: dual-agent (A: design review · B: detector). Detector DEGRADED regex mode.

## Heuristics (21/32; H7, H9 n/a — ≈66%, Acceptable)
1 Status 2 (instant tab swaps; non-sticky header loses nav) · 2 Real world 4 (best audience-matched copy in the set) · 3 Control 1 (P0: init select(tabs[0]) calls focus() — page force-scrolls to y=742 on load, hero skipped for all JS visitors) · 4 Consistency 3 (correct ARIA tabs; load focus ring looks like a glitch) · 5 Prevention 3 (no-JS stacked fallback robust) · 6 Recognition 2 (tabs hide 75% of services content, no preview) · 8 Minimalist 4 (least boxy page of the three) · 10 Help 2 (no FAQ/process/fees signal)

## Specificity verdict
Authored — clearest concept of the three. Seasons grid, identity-based tabs ("pick the one that sounds like you"), botanical marks, kitchen-table copy. Same chassis as siblings.

## Priority issues
- [P0] Focus-steal scroll on load. Fix: select(tab, setFocus=false) at init; only focus inside keyboard handlers. One parameter.
- [P1] Conversion moment under-designed: two bare serif links. Fix: .btn-olive pill for the call action + 3-item reassurance cluster in --sage 0.85rem.
- [P1] No sticky header, no CTA across ~2800px mid-page. Fix: sticky header with blur + collapse to single row after scroll.
- [P2] Tab swap hard cut + page-length jump. Fix: 180ms ease-out fade/4px rise on incoming panel; min-height reservation.
- [P2] Mobile tablist wraps to a 3-line jumble at 390px. Fix: horizontally scrollable row with edge fade at ≤640px.

## Detector
1 advisory finding (10 em-dashes), exit 0. Runtime: 0 console errors, 0 overflow.

## Personas
Jordan: lands mid-page at the tabs, brand off-screen; no process or price signal. Casey: 4,400px scroll to contact without sticky nav; serif text links instead of thumb pills. Sam: best tab widget of the set, but load focus() bypasses skip link/h1 and sabotages reading order; panel swaps unannounced.

## Minor
Trust line (★ 4.9) is highest-evidence, lowest-priority element; three hardcoded near-identical body inks; footer nav asymmetric to header; header nav 0.78rem/0.18em near legibility floor for older rural readers; no favicon/og:image.

## Questions
Could the site behave seasonally (current season emphasized by date)? If "we'll come to you" is the differentiator, why nothing spatial? What about the visitor who is two of the four tabs?
