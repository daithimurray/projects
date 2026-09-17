# Crisis Command — mobile-first game

Single-player geopolitical crisis simulation, adapted from the ChatGPT MVP
prompt into a playable mobile-first web app. One `index.html`, no framework,
no build step, no server — deploy `index.html` and `robots.txt` to any static
host and it runs entirely in the browser.

## How it works

- The full CRISIS COMMAND simulation prompt ships as the system prompt.
- The browser calls the Claude API directly (`POST /v1/messages`, streaming
  SSE) using the player's own Anthropic API key. The key is stored only in
  `localStorage` on the device; there is no backend and no telemetry.
- Default engine is `claude-opus-5` (best simulation quality), with
  `claude-sonnet-5` and `claude-haiku-4-5` selectable for speed/cost.
- On Opus 5, server-side refusal fallbacks are enabled
  (`fallbacks: "default"` + the `server-side-fallback-2026-07-01` beta) so a
  safety-classifier decline reruns on a fallback model instead of dead-ending
  the game. Remove those two lines in `callClaude()` if you don't want that.
- The system prompt carries a 1-hour `cache_control` breakpoint so its ~4K
  tokens are cached across turns. Conversation history itself is re-sent
  uncached each turn — a long Opus game can cost a few dollars.

## Game UX

- **Setup**: scenario + role free text, or "Surprise Me". Connection panel
  holds the API key and model choice.
- **Play**: briefings render as markdown cards (turn header, sections,
  confidence badges); orders go through the composer. Quick chips: End Turn
  (tap-to-confirm), Advisers, Intel, Risks, "If we wait?".
- **Turns**: END TURN triggers the hidden resolution phase; the turn counter
  tracks it. Menu offers after-action review (END SIMULATION), transcript
  copy, settings, and abandon.
- **Persistence**: game state autosaves to `localStorage` after each
  exchange; the setup screen offers resume/discard.

## Known limits (MVP)

- Whole conversation is replayed each turn; very long games will get slow
  and expensive before hitting the context window.
- No server, so the API key lives in the browser — fine for personal use,
  not for public distribution to strangers.
- Markdown renderer is a deliberate subset (headings, bold/italic, lists,
  rules, blockquotes, inline code) matching what the prompt asks the model
  to emit.
