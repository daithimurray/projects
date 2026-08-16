# Website Design Reference Library

A detailed breakdown of 11 website designs I like, categorized by style, with implementation-ready specifications for each. Use this as a reference when building new projects.

---

## Table of Contents

1. [Blue Accountant — Bold SaaS Professional](#1-blue-accountant)
2. [Blue Cleaning Services — Clean Service Platform](#2-blue-cleaning-services)
3. [Dark Modern Accountant — Premium Dark Mode](#3-dark-modern-accountant)
4. [Green Accountant Modern — Organic Minimalist](#4-green-accountant-modern)
5. [Green and White Accountant — Traditional Warm](#5-green-and-white-accountant)
6. [Green Gardener — Editorial Nature](#6-green-gardener)
7. [Modern Accountant Green — Corporate Green SaaS](#7-modern-accountant-green)
8. [Modern Navy Accountant — Typographic Minimalist](#8-modern-navy-accountant)
9. [Navy White Accountant — Classic Financial Authority](#9-navy-white-accountant)
10. [Sleek Modern Accountant — Clean Purple SaaS](#10-sleek-modern-accountant)
11. [White and Light Purple — Elegant Professional](#11-white-and-light-purple)

---

## Common Themes Across All Designs

**What draws me to these:**
- Professional trust signals (testimonials, stats, client logos)
- Strong typographic hierarchy with generous whitespace
- Muted, confident colour palettes (never garish)
- Clear CTAs that don't scream
- Section-based layouts with distinct visual rhythm
- Photography featuring real people (not stock illustrations)
- Service-oriented information architecture

---

## 1. Blue Accountant

**File:** `blue accountant.webp`
**Style:** Bold SaaS Professional
**Mood:** Confident, modern, data-driven, trustworthy

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Vibrant blue | #4834D4 / #3B27BA |
| Secondary | Sky blue | #56CCF2 |
| Background | White | #FFFFFF |
| Dark sections | Deep navy/charcoal | #1A1A2E |
| Accent | Teal/cyan highlights | #00BFA6 |
| Text | Dark grey | #2D2D2D |
| Muted text | Medium grey | #6B6B6B |

### Typography

- **Headings:** Bold sans-serif (likely Inter or Poppins), 36-48px hero, tight line-height (1.1-1.2)
- **Body:** Regular weight sans-serif, 16px, line-height 1.6
- **Stats/numbers:** Extra-bold, oversized (48-64px), used as visual anchors
- **Labels:** Uppercase, small (12px), letter-spacing 0.05em

### Layout & Structure

- **Hero:** Full-width blue background, left-aligned text with right-side photo, overlapping card elements
- **Grid:** 3-4 column card grids for services, bento-style mixed sizing
- **Stats section:** Dark background with large white numbers + descriptive labels
- **Testimonials:** Card-based with circular avatars
- **Alternating sections:** White and blue backgrounds for rhythm
- **Cards:** White with subtle shadow, rounded corners (12-16px), icon + title + description

### Key Patterns

- Trust bar with partner logos below hero
- "Data don't lie" stats section with bold numbers (200+, 500+, etc.)
- Mixed media: photos bleed into coloured backgrounds
- Floating UI elements/mockups to suggest software product
- Blue gradient CTAs with hover lift
- Section introductions: small coloured label above large heading

### When to Use

Professional services that want to feel modern and tech-forward. SaaS products, fintech, modern consultancies. Works well when you have strong metrics to showcase.

### CSS Implementation Notes

```
--primary: #4834D4;
--primary-light: #6C5CE7;
--secondary: #56CCF2;
--dark: #1A1A2E;
--surface: #FFFFFF;
--text: #2D2D2D;
--text-muted: #6B6B6B;
--radius-card: 16px;
--radius-button: 8px;
--shadow-card: 0 4px 24px rgba(72, 52, 212, 0.08);
--shadow-hover: 0 8px 32px rgba(72, 52, 212, 0.15);
```

---

## 2. Blue Cleaning Services

**File:** `blue cleaning services.webp`
**Style:** Clean Service Platform
**Mood:** Approachable, trustworthy, efficient, friendly

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Soft violet/indigo | #6C5CE7 / #5B4DC7 |
| Background | White/off-white | #FFFFFF / #FAFAFA |
| Cards | Light grey | #F5F5F7 |
| Text | Near-black | #1A1A1A |
| Muted text | Medium grey | #666666 |
| Accent | Light lavender | #EDE9FF |

### Typography

- **Headings:** Bold sans-serif, 32-40px, tight tracking
- **Subheadings:** Medium weight, 20-24px
- **Body:** Regular 16px, generous line-height (1.7)
- **Feature labels:** Semi-bold, 14px

### Layout & Structure

- **Hero variations shown:** Multiple approaches (split-screen, centred, minimal)
- **Navigation:** Clean horizontal with pill-shaped CTA button
- **Process steps:** Numbered (1-2-3) with icon + title + description
- **Service grid:** 2x3 or 3-column with icons and labels
- **Trust signals:** "100% guarantee", "Eco-friendly", "Instant booking" badges
- **Pricing:** Clean card with highlighted popular plan

### Key Patterns

- Multiple hero concepts: always person + headline + single CTA
- Icon-based service categories (circular icons, outlined style)
- "How it works" 3-step process with numbered circles
- Guarantee/trust badges in a horizontal row
- Photo + text alternating sections
- Rounded pill buttons (full border-radius)
- Very generous padding between sections (80-120px)

### When to Use

Service businesses, booking platforms, local businesses wanting to feel professional but approachable. Cleaning, home services, wellness, personal services.

### CSS Implementation Notes

```
--primary: #6C5CE7;
--primary-hover: #5B4DC7;
--bg: #FFFFFF;
--surface: #F5F5F7;
--accent-light: #EDE9FF;
--text: #1A1A1A;
--text-muted: #666666;
--radius-card: 12px;
--radius-button: 999px; /* pill */
--radius-badge: 8px;
--shadow-card: 0 2px 12px rgba(0, 0, 0, 0.04);
--section-padding: 80px 0;
```

---

## 3. Dark Modern Accountant

**File:** `dark modern accountant.webp`
**Style:** Premium Dark Mode
**Mood:** Sophisticated, premium, bold, high-end

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Background | Rich black | #0A0A0A / #111111 |
| Primary surface | Dark green | #0D3B2E / #145A3C |
| Cards | Deep green | #1A4D3A |
| Text primary | White | #FFFFFF |
| Text secondary | Light grey | #B8B8B8 |
| Accent | Emerald green | #34D399 |
| Nav/header | Near-black | #0F0F0F |

### Typography

- **Headings:** Large serif or elegant sans-serif, 40-56px, light or regular weight
- **Body:** Sans-serif, 16px, light weight on dark bg
- **Service labels:** Medium weight, 14-16px, white on green cards
- **Navigation:** Light weight, 14px, wide letter-spacing

### Layout & Structure

- **Hero:** Dark background, large headline left, portrait photo right with green tint/overlay
- **Service cards:** Dark green with rounded corners, icon-based, 4-column grid
- **About section:** Photo + text side-by-side
- **News/blog:** Card grid with images, date stamps, truncated text
- **Footer:** Minimal, dark, single-row links

### Key Patterns

- Green glassmorphism effect on service cards
- Photos with dark/green colour grading for cohesion
- Rounded corner cards (16-20px radius) on dark backgrounds
- Subtle green glow/gradient behind key elements
- Minimal navigation with prominent CTA button (green)
- Icon style: outlined, thin, white on green
- Section headings: very large, sometimes with highlight colour on one word

### When to Use

Premium services, high-end consulting, wealth management, luxury brands, agencies wanting to feel exclusive. Works when you want to signal sophistication and exclusivity.

### CSS Implementation Notes

```
--bg: #0A0A0A;
--surface: #0D3B2E;
--surface-elevated: #1A4D3A;
--primary: #34D399;
--text: #FFFFFF;
--text-muted: #B8B8B8;
--radius-card: 20px;
--radius-button: 12px;
--shadow-glow: 0 0 40px rgba(52, 211, 153, 0.1);
--border: 1px solid rgba(255, 255, 255, 0.06);
```

---

## 4. Green Accountant Modern

**File:** `green accountant modern.webp`
**Style:** Organic Minimalist
**Mood:** Calm, natural, trustworthy, grounded

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Background | Warm light grey/sage | #F0F0E8 / #ECEEE6 |
| Primary | Deep forest green | #1B3B2A / #2D4A3A |
| Cards/hero | Soft off-white | #F5F5ED |
| Text | Dark charcoal | #1A1A1A |
| Accent | Green (for labels) | #2E7D52 |
| Button primary | Dark green | #1B3B2A |
| Button secondary | White with border | #FFFFFF |

### Typography

- **Headings:** Elegant serif (like Playfair Display or DM Serif), 36-44px, regular weight
- **Highlight word:** Underlined or italicized for emphasis within headings
- **Body:** Clean sans-serif, 16px, regular weight
- **Labels:** Sans-serif, small (12-13px), green colour, uppercase

### Layout & Structure

- **Hero:** Split layout in a rounded container, text left + photo right with soft overlay
- **Overall frame:** Entire page appears to sit within a rounded container on a coloured background
- **Navigation:** Minimal, serif logo, text links + dark pill CTA
- **Section transitions:** Dark green full-width sections alternate with light sections
- **Cards:** Minimal, borderless, relying on background colour shifts

### Key Patterns

- Page wrapped in rounded-corner container (creating "app in browser" feel)
- Green section label above serif heading (section intro pattern)
- Two CTAs side by side: filled dark green + outlined white
- Large photography with warm, natural lighting
- Dark green footer/services section with white text
- Serif + sans-serif pairing (serif headings, sans body)
- Underline decoration on key words in headings

### When to Use

Professional services wanting to feel human and approachable without sacrificing credibility. Accountants, financial advisors, consultants, wellness brands, sustainability-focused businesses.

### CSS Implementation Notes

```
--bg: #ECEEE6;
--surface: #F5F5ED;
--primary: #1B3B2A;
--primary-light: #2E7D52;
--text: #1A1A1A;
--text-muted: #5A5A5A;
--font-heading: 'DM Serif Display', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
--radius-container: 24px;
--radius-card: 16px;
--radius-button: 999px; /* pill */
--button-height: 44px;
```

---

## 5. Green and White Accountant

**File:** `green and white accountant.webp`
**Style:** Traditional Warm
**Mood:** Established, trustworthy, personal, classic

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Background | Blush/cream | #F5EDE8 / #FDF5F0 |
| Primary | Teal/dark cyan | #1A8B7C / #2D9B8C |
| Secondary | Warm orange | #E8734A |
| Surface | White | #FFFFFF |
| Text | Dark brown/charcoal | #2C2C2C |
| Accent bar | Teal | #1A8B7C |
| Form labels | Teal | #1A8B7C |

### Typography

- **Logo/brand:** Serif, elegant (like Cormorant or Libre Baskerville)
- **Headings:** Serif, 28-36px, regular weight
- **Body:** Sans-serif, 15-16px
- **Navigation:** Sans-serif, uppercase, spaced (14px)
- **Price/stats:** Bold, large (48px+)

### Layout & Structure

- **Hero:** Full-width photo slider/carousel with overlaid navigation dots
- **Announcement bar:** Teal full-width bar at top with contact info + social icons
- **Grid:** Collage-style layout showing multiple sections simultaneously
- **Pricing card:** Left sidebar style with feature checklist
- **Contact form:** White card with teal labels, floating over blush background
- **Testimonials:** Circular avatar photos with name + title

### Key Patterns

- Top announcement/contact bar (phone, message, social links)
- "Free Consultation" contact form prominently placed
- Pricing card with prominent dollar amount + feature list
- Photo carousel/slider for hero (dot navigation)
- Orange accent used sparingly for CTAs and "Read More" links
- Client logos in monochrome grid
- Serif headings give traditional/established feel
- Testimonial section with circular profile photos

### When to Use

Established professional services wanting to feel personal and trustworthy. Law firms, traditional accounting practices, financial planning, family businesses. Works when you want "we've been here for years" energy.

### CSS Implementation Notes

```
--bg: #F5EDE8;
--surface: #FFFFFF;
--primary: #1A8B7C;
--accent: #E8734A;
--text: #2C2C2C;
--text-muted: #6B6B6B;
--font-heading: 'Libre Baskerville', Georgia, serif;
--font-body: 'Open Sans', system-ui, sans-serif;
--radius-card: 8px;
--radius-avatar: 50%;
--radius-button: 4px;
--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.06);
--announcement-bar-bg: #1A8B7C;
```

---

## 6. Green Gardener

**File:** `green garder.webp`
**Style:** Editorial Nature
**Mood:** Organic, editorial, calm, sustainable, artisanal

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Background | Warm cream/ivory | #FAF8F3 / #F5F2ED |
| Primary | Dark olive/forest | #3D4A2C / #2E3A1F |
| Secondary | Sage green | #6B7D5A |
| Footer/dark sections | Deep olive | #2E3A1F |
| Text | Near-black | #1C1C1C |
| Accent | Olive green | #5C6B4A |
| Quote bg | Muted sage | #4A5A3A |

### Typography

- **Hero heading:** Mixed-media: serif text interspersed with small inline images/icons (leaf, flower emojis or illustrations)
- **Headings:** Elegant serif, 32-44px, regular or light weight
- **Body:** Clean sans-serif, 16px, generous line-height (1.8)
- **Labels/tags:** Small (11-12px), uppercase, letter-spacing
- **Quote text:** Italic serif, 20-24px, centred

### Layout & Structure

- **Hero:** Creative text layout with inline botanical images breaking up the headline
- **Photo grid:** Asymmetric mosaic/masonry layout (mixed sizes)
- **Services:** Tab-based navigation (horizontal tabs) with content below
- **Quote/mission:** Full-width dark section with centred italic text + attribution
- **Footer:** Dark olive with 3-4 column layout
- **Contact/CTA:** Simple inline form (email + button)

### Key Patterns

- Inline decorative images within headline text (very distinctive)
- Masonry/asymmetric photo grid (no uniform sizing)
- Horizontal tab navigation for services (underlined active state)
- Pull quote section on dark background (centred, serif, italic)
- Small trust indicators (Google rating, review count) near hero
- Social proof with linked photo + name attribution
- "Get in touch" section with minimal single-line form
- Organic, non-rigid layouts that breathe

### When to Use

Creative services, sustainability brands, garden/nature businesses, artisan food, editorial publications, portfolio sites for designers. Works when you want to feel handcrafted and thoughtful.

### CSS Implementation Notes

```
--bg: #FAF8F3;
--surface: #F5F2ED;
--primary: #3D4A2C;
--secondary: #6B7D5A;
--dark: #2E3A1F;
--text: #1C1C1C;
--text-muted: #6B6B6B;
--font-heading: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
--radius-card: 8px;
--radius-image: 4px;
--section-padding: 100px 0;
--max-width: 1200px;
```

---

## 7. Modern Accountant Green

**File:** `modern accountant green.webp`
**Style:** Corporate Green SaaS
**Mood:** Professional, modern, established, scalable

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Rich emerald green | #0A6847 / #1B7A57 |
| Background | White/very light grey | #FFFFFF / #F9F9F9 |
| Cards | Dark green | #0A5C3F |
| Text | Near-black | #1A1A1A |
| Accent | Green highlight | #2ECC71 |
| Surface | Light green tint | #F0FFF4 |
| Muted | Medium grey | #6C6C6C |

### Typography

- **Headings:** Clean serif (like DM Serif Text), 36-48px, regular weight
- **Hero headline:** Large serif with highlighted/underlined key words
- **Body:** Sans-serif, 16px
- **Navigation:** Sans-serif, 14px, medium weight
- **Trust badges:** Small caps or small text with icons
- **Service cards:** Bold titles, regular descriptions

### Layout & Structure

- **Hero:** White background, serif headline left, circular-cropped group photo right
- **Trust bar:** Rating stars + "4.8 by +1000 entrepreneurs" social proof
- **Service cards:** 4-column green cards with icons and descriptions
- **Full-page view:** Shown as scrolling page alongside mobile/tablet variations
- **Specialization tags:** Pill-shaped tags below hero (Finance, Corporate, Tax & Legal)
- **News section:** Blog card grid with photos and dates
- **CTA section:** "Let's work together" with contact form

### Key Patterns

- Circular photo crop in hero (distinctive, modern)
- Green service cards with white icons (4-column grid)
- Highlighted words in headings (green underline or yellow marker effect)
- Rating/review trust signal immediately below headline
- Specialization pills/tags for quick scanning
- "Clarity in numbers" stats section
- Service list as clickable text links (not cards)
- Responsive preview shown alongside desktop (multi-device mockup)

### When to Use

Professional services firms wanting to feel modern and tech-enabled. Accounting firms, consultancies, B2B SaaS, fintech. Good when you need to show scale and credibility.

### CSS Implementation Notes

```
--primary: #0A6847;
--primary-dark: #085A3C;
--primary-light: #F0FFF4;
--bg: #FFFFFF;
--surface: #F9F9F9;
--text: #1A1A1A;
--text-muted: #6C6C6C;
--font-heading: 'DM Serif Text', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
--radius-card: 16px;
--radius-pill: 999px;
--radius-photo: 50%; /* circular crop */
--shadow-card: 0 2px 16px rgba(10, 104, 71, 0.08);
```

---

## 8. Modern Navy Accountant

**File:** `modern navy accountant.webp`
**Style:** Typographic Minimalist
**Mood:** Bold, confident, no-nonsense, premium minimal

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Deep navy | #1A2B5A / #1E3264 |
| Background | Light grey | #EDEDED / #F0F0F0 |
| Surface | White | #FFFFFF |
| Text | Navy (same as primary) | #1A2B5A |
| Accent | Navy | #1A2B5A |
| Divider/line | Navy teal | #2A4A7A |

### Typography

- **Hero heading:** Very large (60-80px), bold sans-serif, navy, stacked/multi-line
- **Body:** Regular weight, 16px, navy-tinted dark
- **Navigation:** Light weight, small (13-14px), right-aligned
- **Logo:** Bold serif or geometric sans
- **CTA button:** Text in pill, strong contrast

### Layout & Structure

- **Hero:** Massive typography dominates (70% of viewport), minimal other elements
- **Supporting text:** Two small text columns below headline
- **CTA:** Single pill button, left-aligned, navy background
- **Scrolling bar:** Teal/navy banner with scrolling client names or stats
- **Overall:** Extremely minimal, almost just type + white space
- **Background element:** Subtle geometric shape (light grey) behind headline area

### Key Patterns

- Typography IS the design (no hero image)
- Enormous headline that fills most of the viewport
- Minimal nav: just text links + bordered pill CTA
- Subtle background geometric/abstract shape
- Horizontal scrolling ticker/marquee for social proof
- Max 2-3 colours total
- Very little visual decoration
- Personality comes entirely from type choice and size
- Description text split into 2 short columns

### When to Use

Personal brands, solo consultants, agencies, creative directors. Works when the name/brand itself is the product. Ideal for portfolios, single-person practices, or brands with strong name recognition.

### CSS Implementation Notes

```
--primary: #1A2B5A;
--bg: #EDEDED;
--surface: #FFFFFF;
--text: #1A2B5A;
--text-muted: #4A5A7A;
--font-heading: 'Instrument Sans', 'Inter', sans-serif;
--font-heading-size: clamp(48px, 8vw, 80px);
--font-heading-weight: 700;
--font-body: 'Inter', system-ui, sans-serif;
--radius-button: 999px;
--section-padding: 120px 0;
--max-width: 1100px;
```

---

## 9. Navy White Accountant

**File:** `navy whit accountant.webp`
**Style:** Classic Financial Authority
**Mood:** Established, authoritative, trust, heritage

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Deep navy/charcoal | #1C2B3A / #1A2332 |
| Secondary | Gold/bronze | #B8976C / #C4A882 |
| Background | White | #FFFFFF |
| Surface | Light warm grey | #F5F4F0 |
| Text | Dark charcoal | #2C2C2C |
| Borders | Light grey | #E0DDD8 |
| Accent highlights | Soft gold | #D4B88C |

### Typography

- **Headings:** Serif (like Times New Roman, Playfair, or Noto Serif), 28-40px
- **Body:** Serif for body text as well (editorial feel), 16px, line-height 1.8
- **Navigation:** Sans-serif, small, uppercase, wide letter-spacing
- **Logo:** Serif wordmark, elegant
- **Section headers:** Smaller, uppercase, gold or grey, letter-spaced

### Layout & Structure

- **Hero:** Full-width with navy overlay on photo, subtle geometric pattern (network/constellation lines)
- **Navigation:** Top banner with announcement, clean nav below
- **Content grid:** 2-3 column layouts, text-heavy with supporting photos
- **Value props:** 3-column with icons (gold/outlined)
- **Testimonial:** Long-form quote with attribution and photo
- **Footer:** Navy background, multi-column, comprehensive sitemap

### Key Patterns

- Geometric pattern overlay on hero (constellation/network lines)
- Gold monogram/crest as brand mark
- Full serif typography (body AND headings)
- Understated colour usage (navy + gold only, never bright)
- Long-form content sections (this site is text-rich)
- Banner/announcement bar at very top
- Partnership-focused language and layout
- Client silhouette photography (walking, meeting)
- Gold/bronze used for subtle accents (icons, lines, highlights)

### When to Use

Financial services, law firms, wealth management, established partnerships. When you need to convey decades of experience and institutional trust. Heritage brands, family offices, advisory firms.

### CSS Implementation Notes

```
--primary: #1C2B3A;
--secondary: #B8976C;
--bg: #FFFFFF;
--surface: #F5F4F0;
--text: #2C2C2C;
--text-muted: #6B6B6B;
--border: #E0DDD8;
--font-heading: 'Noto Serif', 'Playfair Display', Georgia, serif;
--font-body: 'Noto Serif', Georgia, serif;
--font-nav: 'Inter', system-ui, sans-serif;
--radius-card: 4px; /* very subtle */
--radius-button: 2px;
--shadow-card: none; /* relies on borders */
--border-width: 1px;
```

---

## 10. Sleek Modern Accountant

**File:** `sleek modern accountant.webp`
**Style:** Clean Purple SaaS
**Mood:** Modern, approachable, scalable, smart

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Soft violet/purple | #6C5CE7 / #7C6BF0 |
| Background | White | #FFFFFF |
| Surface | Very light grey | #F8F8FA |
| Text | Near-black | #1A1A1A |
| Text secondary | Medium grey | #6B6B6B |
| Cards | White | #FFFFFF |
| Border | Light grey | #EBEBEB |

### Typography

- **Headings:** Clean sans-serif (Inter or similar), bold, 24-32px
- **Body:** Sans-serif, 15-16px, regular weight
- **Logo:** Geometric mark + sans-serif wordmark
- **Labels:** Regular weight, small (13px)
- **CTAs:** Medium weight, 14px

### Layout & Structure

- **Hero:** Clean headline + subtext + dual CTAs (filled purple + outlined)
- **Navigation:** Minimal, clean, with pill CTA
- **Services grid:** 2-column cards with small images and descriptions
- **Industry sectors:** Grid of industry cards with icons and arrows
- **Blog/Articles:** Standard card grid (image + title + excerpt)
- **Leadership:** Team photos in grid with names and roles
- **FAQ:** Expandable accordion section
- **Mobile-responsive:** Full mobile views shown alongside desktop

### Key Patterns

- Dual CTA pattern: primary filled + secondary outlined, side by side
- Industry grid with icon + arrow indicator (clickable feel)
- Clean card design: subtle border, no shadow at rest, arrow for navigation
- Article/blog cards with greyscale photography
- Leadership section with professional headshots
- FAQ accordion (clean, no decorative elements)
- Very generous whitespace throughout
- Purple used sparingly (CTAs and occasional accents only)
- Simple line-based icons

### When to Use

SaaS products, professional platforms, modern B2B services. When you want to feel clean and scalable without being cold. Works for multi-industry services that need to appeal broadly.

### CSS Implementation Notes

```
--primary: #6C5CE7;
--primary-hover: #5B4DC7;
--bg: #FFFFFF;
--surface: #F8F8FA;
--text: #1A1A1A;
--text-muted: #6B6B6B;
--border: #EBEBEB;
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-weight-heading: 700;
--radius-card: 12px;
--radius-button: 8px;
--shadow-card: none; /* border only */
--border-card: 1px solid #EBEBEB;
--section-padding: 80px 0;
```

---

## 11. White and Light Purple

**File:** `white and light purple accountant.webp`
**Style:** Elegant Professional
**Mood:** Sophisticated, inviting, premium, aspirational

### Colour Palette

| Role | Colour | Hex (approx) |
|------|--------|--------------|
| Primary | Soft purple/violet | #7C6BF0 / #6B5CE7 |
| Background | White | #FFFFFF |
| Surface | Faint lavender | #FAFAFF |
| Text | Near-black | #1A1A1A |
| Text secondary | Medium grey | #5A5A5A |
| Heading accent | Purple (for cursive/italic words) | #7C6BF0 |
| Cards | White with very subtle shadow | #FFFFFF |

### Typography

- **Hero heading:** Mixed fonts: sans-serif bold + italic serif/script for key word (e.g., "Prosperity" in cursive)
- **Headings:** Sans-serif, bold, 32-40px
- **Accent words:** Serif italic, purple, elegant
- **Body:** Sans-serif, 16px, regular
- **Navigation:** Sans-serif, medium, 14px

### Layout & Structure

- **Hero:** Large headline with accent word in script, descriptive text right, dual CTAs below
- **Photo section:** Two side-by-side professional photos below hero (full-width)
- **Industry grid:** 3-column cards with icon + title + description + arrow
- **Overall:** Very spacious, lots of white space, content breathes
- **Navigation:** Clean, minimal, "Contact Us" pill CTA

### Key Patterns

- Script/cursive accent word within sans-serif heading (signature move)
- Purple used only for the accent word and primary CTAs
- Side-by-side photography (two photos in a row, different crops)
- Industry/sector grid with simple line icons and arrows
- Dual CTA buttons: filled purple + outlined black/dark
- Very generous line-height and letter-spacing on body
- Minimal decoration: design comes from typography and spacing
- Card hover: subtle lift + purple border or shadow
- Overall feeling: "less is more" with premium touch

### When to Use

Premium professional services, boutique firms, modern brands that want elegance without stuffiness. Financial advisory, executive coaching, design agencies, premium B2B services.

### CSS Implementation Notes

```
--primary: #7C6BF0;
--primary-hover: #6B5CE7;
--bg: #FFFFFF;
--surface: #FAFAFF;
--text: #1A1A1A;
--text-muted: #5A5A5A;
--font-heading: 'Inter', system-ui, sans-serif;
--font-accent: 'Playfair Display', Georgia, serif; /* italic */
--font-body: 'Inter', system-ui, sans-serif;
--radius-card: 12px;
--radius-button: 8px;
--radius-button-pill: 999px;
--shadow-card: 0 2px 12px rgba(124, 107, 240, 0.06);
--shadow-card-hover: 0 8px 24px rgba(124, 107, 240, 0.12);
--section-padding: 100px 0;
```

---

## Design Pattern Matrix

Quick reference for selecting patterns based on project needs:

| Pattern | Designs That Use It |
|---------|-------------------|
| Pill-shaped buttons | 2, 4, 7, 8, 10, 11 |
| Serif headings | 4, 5, 6, 7, 9 |
| Dark hero/sections | 1, 3, 4, 5, 9 |
| Stats/numbers section | 1, 7 |
| Process steps (1-2-3) | 2 |
| Card-based services | 1, 2, 3, 7, 10 |
| Circular photo crops | 7 |
| Inline decorated text | 6, 7, 11 |
| Scrolling marquee | 8 |
| Tab navigation | 6 |
| Industry grid | 10, 11 |
| Announcement bar | 5, 9 |
| Typography-first hero | 8 |
| Dual CTA pattern | 4, 10, 11 |
| Trust badges/ratings | 2, 7 |
| Gold/bronze accents | 5, 9 |
| Masonry photo grid | 6 |
| Contact form on page | 5 |
| FAQ accordion | 10 |
| Multi-device mockup | 7 |

---

## Colour Family Quick Reference

| Family | Designs | Best For |
|--------|---------|----------|
| **Navy/Blue** | 1, 8, 9 | Authority, trust, corporate |
| **Green/Emerald** | 3, 4, 6, 7 | Growth, nature, finance, sustainability |
| **Teal/Cyan** | 5 | Traditional professional |
| **Purple/Violet** | 2, 10, 11 | Modern, approachable, SaaS |
| **Dark mode** | 3 | Premium, exclusive |

---

## How to Use This Reference

1. **Starting a new project:** Identify the mood/audience, find the closest match above
2. **Choosing colours:** Use the hex values as a starting point, adjust to brand
3. **Setting typography:** Copy the font pairing and sizing rules
4. **Building layouts:** Reference the layout structure and key patterns
5. **CSS variables:** Copy the implementation notes block as your design token foundation
6. **Combining styles:** Mix patterns from multiple designs (use the matrix above)

---

*Last updated: August 2026*
