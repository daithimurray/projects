# Security systems design system

_Started 2026-09-23 15:30 UTC_

---

## User

Act as Apple Principal Designer. Build a complete design system for [intruder alarm, CCTV and fire system installer]. Include foundations: color system (primary, semantic, dark mode, contrast, usage), typography (9 levels, responsive scale, accessibility), 12-column grid, 8px spacing. Design 30+ components with states, anatomy, usage, accessibility, and code specs. Add patterns, design tokens JSON, principles, do’s/don’ts, and dev guide. Publish-ready.

## Assistant



## Assistant

_[tool: read_skill_prompt]_

_[tool: ask_user]_

Waiting on your answers — brand name, logo, target products and color lean most of all. Skip anything and I'll decide.

## User

Answered — surfaces: Marketing website; audience: Both equally; tone: Calm & reassuring

## Assistant



## Assistant

_[tool: ask_user]_

One short round on palette, type and mood — then I build everything without further questions.

## User

Answered — palette: Deep navy + warm white — trust, institutional calm; mood: Minimal & airy; placeholder_name: Amptech

## Assistant

_[tool: update_todos]_

_[tool: tool_search_tool_bm25]_

_[tool: set_project_title]_

_[tool: run_script]_

Now the foundation specimen cards.

_[tool: run_script]_

Real reviews, Dublin context noted — I'll build them into the Testimonial component and the website kit. Continuing with components.

_[tool: run_script]_

_[tool: list_files]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: show_to_user]_

I've hit the usage limit, so I'm pausing at a safe point.

**Built so far** (Amptech, navy + warm white, Hanken Grotesk):
- Tokens: colour (light + dark), 9-level fluid type, 8px spacing, 12-col grid, radius/shadow/motion, `tokens.json` (W3C format)
- 22 foundation cards in the Design System tab (colours, contrast matrix, dark mode, type, grid, spacing, shape, motion, principles, voice)
- 22 components with `.d.ts` specs and usage notes: Icon, Button, IconButton, TextLink, ButtonGroup, FormField, Input, Textarea, Select, Checkbox, Radio, Switch, SegmentedControl, Badge, StatusDot, Tag, Alert, Toast, ProgressBar, Spinner, Skeleton, EmptyState
- `readme.md` with principles, content rules and visual foundations

**Remaining** (listed in the readme): navigation, overlay, data and marketing components (~20), component preview cards, patterns + do/don't cards, dev guide, the marketing-site UI kit using your reviews, and SKILL.md.

Say "continue" and I'll pick up from the todo list. Also: set the file type to **Design System** in the Share menu so others in your org can view it.

## User

continue

## Assistant

_[tool: list_files]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: list_files]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: list_files]_

_[tool: run_script]_

Now the marketing-site UI kit.

_[tool: run_script]_

Now SKILL.md and the readme index update, then verify.

_[tool: run_script]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

_[tool: write_file]_

Now rewire the cards and kit to use the loader and await readiness.

_[tool: run_script]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: save_screenshot]_

The fallback compiler works and the site renders. Nav links wrap at narrow widths — I'll let them shrink gracefully (hide the phone label under 1024px isn't possible inline, so tighten gap/nowrap).

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

_[tool: update_todos]_

The system is out for review. Website kit is open — click nav links and "Request a survey" to walk the 3-step flow.

**Caveats**
- No logo supplied: wordmark is set in type. Fonts (Hanken Grotesk, JetBrains Mono) load from Google Fonts — send licensed files to self-host.
- Placeholder details to replace: PSA licence number, phone/email/address, guide prices, "since 2004" / stats.
- Imagery is striped placeholders — real installation photos needed.
- The compiled component bundle only appears once you set the file type to **Design System** in the Share menu; until then a dev loader compiles components in-browser (slower first paint, ~2s).

**Ask:** confirm the real PSA number, phone, service areas and the three service names you use, and drop in your logo + 3–4 install photos — I'll wire them through the tokens, kit and testimonials so this is ready to publish.

## User

Found issues — fixing…

## Assistant

_[tool: read_file]_

I'll make the navbar responsive: measure its width and collapse to a menu button + Drawer below 1024px, hiding the phone label between 1024–1200.

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Navbar now collapses: phone → icon under 1120px, links → menu button + Drawer under 960px, so nothing clips. Out for re-review.

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Navbar now measures synchronously on mount and on window resize (ResizeObserver as a bonus), so the collapse applies at first paint. Out for re-review.

