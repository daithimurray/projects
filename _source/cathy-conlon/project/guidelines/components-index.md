# Component index

39 components in 7 groups. Anatomy · states · usage · a11y live in each `.d.ts` / `.prompt.md`; visuals in each group's `*.card.html`.

| Group | Components |
|---|---|
| actions | Button, IconButton, TextLink, ButtonGroup |
| forms | TextField, TextArea, Select, Checkbox, Radio + RadioGroup, Switch, SearchField |
| navigation | NavBar, Footer, Breadcrumb, Tabs, Pagination, SkipLink |
| content | PoemBlock, PullQuote, BookCard, EventCard, PostCard, Byline, Divider, Figure |
| feedback | Alert, Toast + ToastRegion, Badge, Tag + TagList, Tooltip, Skeleton, EmptyState |
| overlays | Dialog, Drawer, Menu |
| layout | Container + Grid + Col, Section, Hero, NewsletterSignup |

## Shared state model
| State | Mechanism | Visual |
|---|---|---|
| hover | `:hover` | ink → sienna (primary), inset fill (ghost), border darkens (outline) |
| active | `:active` | 1px downward translate, darker fill |
| focus | `:focus-visible` | 2px `--focus-ring`, 2px offset; inputs: ink border + 3px soft halo |
| disabled | `[disabled]` / `aria-disabled` | 40–50% opacity, `not-allowed` |
| loading | `data-loading` / `aria-busy` | spinner replaces label, width preserved |
| invalid | `aria-invalid` | madder border, message with "!" |
| selected/current | `aria-selected` / `aria-current` / `aria-pressed` | ink fill or ink underline |

## Anatomy conventions
Every component root is `ih-{name}`; children are `ih-{name}__{part}`; look variants are `ih-{name}--{variant}`. Sizes: `sm` 32px · `md` 44px · `lg` 52px. Radii: controls 4px, panels 8–12px, chips full.
