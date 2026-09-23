# Do's and don'ts

## Colour
- **Do** use ink for every headline. **Don't** colour headlines sienna.
- **Do** allow one accent button per page. **Don't** put two accent buttons in the same viewport.
- **Do** use `--fg-muted` for meta text. **Don't** use `--fg-subtle` below 24px.
- **Do** use semantic soft tints for alerts. **Don't** use semantic colours for decoration or brand moments.
- **Do** design both themes at once. **Don't** invert or filter the light palette to make dark.

## Typography
- **Do** set poems in Newsreader at body-large with hanging indents. **Don't** justify, centre, or auto-hyphenate verse.
- **Do** keep prose within `--measure`. **Don't** let a paragraph run past 75 characters.
- **Do** use Cormorant light for display. **Don't** use Cormorant below 21px, it loses its hairlines.
- **Do** use Instrument Sans for anything the user operates. **Don't** set buttons in a serif.
- **Do** balance headlines (`text-wrap: balance`). **Don't** insert manual line breaks in titles.

## Layout
- **Do** let sections breathe with `--gap-section`. **Don't** stack sections tighter than 64px.
- **Do** use hairlines to separate rows. **Don't** put cards in boxes with shadows unless they float.
- **Do** keep book covers 2:3. **Don't** crop, round heavily, or tilt covers.
- **Do** use the 12-column grid for compositions. **Don't** force reading text onto grid columns, use the measure.

## Components
- **Do** name IconButtons. **Don't** ship an icon without `label`.
- **Do** use Alert for persistent messages, Toast for transient ones. **Don't** toast an error the user needs to read.
- **Do** mark optional fields. **Don't** mark required ones with asterisks.
- **Do** put the primary action last in dialog footers. **Don't** label a button "OK".
- **Do** use Tabs for peer views. **Don't** use Tabs as navigation between pages.

## Imagery
- **Do** use quiet photography, desaturated and warm. **Don't** use stock imagery, illustration, or icons-as-decoration.
- **Do** use the striped placeholder until real photography exists. **Don't** generate images.

## Motion
- **Do** use `--ease-out` and the four durations. **Don't** bounce, spring, or overshoot.
- **Do** honour `prefers-reduced-motion`. **Don't** autoplay anything.
