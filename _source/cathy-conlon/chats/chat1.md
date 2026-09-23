# Design System for Poetry Platform

_Started 2026-09-23 12:45 UTC_

---

## User

Act as Apple Principal Designer. Build a complete design system for a website for a poet and author. Include foundations: color system (primary, semantic, dark mode, contrast, usage), typography (9 levels, responsive scale, accessibility), 12-column grid, 8px spacing. Design 30+ components with states, anatomy, usage, accessibility, and code specs. Add patterns, design tokens JSON, principles, do’s/don’ts, and dev guide. Publish-ready.

## Assistant



## Assistant

_[tool: read_skill_prompt]_

_[tool: ask_user]_

_[tool: ask_user]_

Waiting on the form — author name, mood, type direction, and sections. Skip anything and I'll decide.

## User

Answered — mood: Quiet & literary — warm paper, ink, generous whitespace

## Assistant

_[tool: set_project_title]_

_[tool: update_todos]_

_[tool: tool_search_tool_bm25]_

_[tool: run_script]_

_[tool: write_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: list_files]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: show_html]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: run_script]_

Now readme + SKILL.md.

_[tool: run_script]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

_[tool: run_script]_

_[tool: ready_for_verification]_

The system is out for review. Everything sits in the Design System tab (22 foundation cards, 7 component groups, the website kit); the click-through site is open now.

**Caveats**
- "Iris Halloway" is a working name — one find-and-replace away from the real author.
- Fonts load from Google Fonts; self-host for production.
- No photography, cover art, or logo exist — striped placeholders throughout; the wordmark is the name in Cormorant.
- Journal and About screens are patterned (`guidelines/patterns.md`) but not built in the kit.

**Set the File type to "Design System" in the Share menu** so others in your org can use it.

**To make this perfect, I need from you:** the author's real name, genre(s), 2–3 real poems (line breaks intact), book titles/covers, and any portrait photography — plus a verdict on the sienna accent versus a cooler alternative.

## User

Fantastic - thank you! Now please make it spoecific to this person, see attached file

## Assistant

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: set_project_title]_

_[tool: ready_for_verification]_

The system is now Cathy Conlon's — out for review. Wordmark, kit (8 screens incl. a Swift & Vanessa story page and About/press kit), cards, prompts, readme and patterns all use the dossier's verified facts.

**Decisions I made — please confirm**
- Brand line: "Memory, place, and the women history overlooked."
- Spellings: *Esther Vanhomrigh*; "Poems for Patience"; "Cathy" throughout, "Catherine" once in About.
- Poem text is **not** reproduced anywhere (copyright) — placeholders link to The Milk House / Poethead. Prize claims carry a "to confirm" caption.

**Still needed:** headshot, both cover images (with permission), 2–3 poems as she wants them set, any blurbs/launch quotes, the ISBN check, and a contact email.

## User

can you make this a single p[age website please?

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

_[tool: grep]_

_[tool: grep]_

_[tool: run_script]_

_[tool: grep]_

Only the uploaded dossier (your file) still has em dashes. Checking my files for leftover dash artifacts and slop phrases.

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

Adding an explicit anti-slop rule set to the voice guidelines and readme, then verifying.

_[tool: run_script]_

_[tool: ready_for_verification]_

Done, out for review. Every em dash in the system is gone (131 files: site copy, component prompts, guideline cards, readme, tokens comments), including the two the code generated itself (PullQuote's cite prefix and Figure's credit, now "Photo: name"). The listed slop patterns were not present; I added them as a banned list in `guidelines/principles.md` and the readme so nobody reintroduces them.

The only remaining em dashes are in your uploaded dossier, which I left untouched.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: grep]_

Also checking the CSS clamp values, which used `, .5vw` style decimals.

_[tool: grep]_

_[tool: grep]_

Line 214 shows the damage pattern in CSS: `::before, .ih-quote--rule` lost its comma. Repairing all `X.ih-`/`X.type-` selector joins and the cubic-bezier values.

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Fixed and back out for review. The dash cleanup's tidy step had also stripped commas before `...rest` spreads in all 39 component files, and before selectors and easing decimals in the CSS; all restored. Em dashes remain removed everywhere.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Restored the `a.ih-tag` / `button.ih-tag` selectors; links and buttons no longer pick up tag styling. Back out for review.

