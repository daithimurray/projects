# Principles

Five commitments. When two conflict, the earlier one wins.

## 1. The poem is the interface
Everything on the site exists to deliver a line of verse to a reader with as little between them as possible. Chrome recedes: hairlines instead of boxes, paper instead of white, one accent instead of a palette. If a component draws the eye before the words do, it is too loud.

## 2. Set it like a book
We inherit five hundred years of typographic craft rather than web convention. Old-style numerals, hanging punctuation, ragged right, a measure of 45–75 characters, generous leading. Line breaks belong to the author and are never reflowed. The reading experience should feel like a well-made paperback, not a feed.

## 3. Quiet, then warm
The default register is ink on paper: neutral, calm, unhurried. Warmth enters through one gesture: sienna. It appears when something responds (a hover), when something matters (the single commercial action), or when the author is speaking directly (an eyebrow, a quote mark). Sienna is not used as decoration.

## 4. Nothing hurries
Motion decelerates and never bounces. Durations are short (120–360ms) and easing is `ease-out`. Pages fade, panels rise a few pixels, covers lift. Anything that draws attention to itself as animation has failed. Reduced-motion is honoured completely.

## 5. Readable by everyone, in any light
Contrast is designed, not checked afterwards: every text token clears 4.5:1 in both themes. Dark mode is a deliberate second palette ("candlelight") rather than an inversion. Sizes are in rem, layouts reflow to 400% zoom, every control is 44px, every image has alt text, every icon has a name.

---

## Voice
The site speaks as the author, in the first person, to one reader.

- **Person:** "I" and "you". Never "we", never third person about the author on her own site, except in press-facing bio blocks, which are marked.
- **Case:** Sentence case everywhere: titles, buttons, nav. Poem titles keep the author's own casing.
- **Length:** Buttons ≤ 3 words. Ledes ≤ 30 words. Fine print one line.
- **Tone:** Plain, warm, exact. Say what arrives and when ("One letter a month") instead of marketing ("Join our community!").
- **Punctuation:** Real quotation marks, en dash for ranges, ellipsis character. No em dashes. No exclamation marks in UI.
- **Emoji:** Never.
- **Numbers:** Old-style figures in prose (`onum`). Dates as "14 October 2026", day first, month spelled.

## Banned patterns
Copy anywhere on the site (and in this documentation) avoids these. Rewrite plainly.
- Binary contrasts: "It's not X. It's Y."
- Throat-clearing openers: "Here's the thing", "Let me be clear".
- Faux-insight setups: "What nobody tells you", "The part everyone misses".
- Colon reveals: "The best part: it learns."
- Dramatic fragments: "That's it. That's the whole thing."
- Superficial analysis: "highlighting the team's commitment to innovation".
- Importance puffery: "marks a pivotal moment", "a testament to".
- Weasel attribution: "experts agree", "studies show".
- Synonym cycling: renaming the same thing in consecutive sentences.
- Fake-profound endings: "The future isn't coming. It's already here."
- Em dashes, anywhere. Use a comma, colon, semicolon, parentheses or a new sentence.

Examples
- ✓ "A letter, once a month. New poems, readings, and what I'm reading. No noise."
- ✗ "Subscribe to our newsletter for exclusive updates!"
- ✓ "Reserve a seat" · ✗ "Click here to RSVP now"
- ✓ "Nothing here yet" · ✗ "Oops! No results found"
