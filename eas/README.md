# Everyday Accountancy Services: website

Single-page static site for Everyday Accountancy Services (Galway & Dublin).
Intended URL: https://getawebsite.ie/eas/

One self-contained file (CSS inlined, fonts from Google Fonts). It uses no relative
asset paths, so it works with or without a slash at the end of the URL.

## Files

- `index.html`: the page (CSS inlined).
- `fonts/`: self-hosted Source Serif 4 and Work Sans (latin subset, weights 400–500). Referenced as `/eas/fonts/…`.
- `privacy/index.html`: privacy notice, linked from the form and footer.
- `robots.txt`.

## Before launch (blocking)

1. **Client sign-off**: written OK from EAS to publish on getawebsite.ie, including the privacy notice wording.
2. **Team photos**: still hotlinked from everydayaccountancy.ie (the build environment could not download them). Save local copies into `eas/img/` and update the four `<img src>` values (three team photos and the contact block).
3. **Enquiry form**: opens a pre-filled email; the page tells visitors what to do if nothing opens. Swap for a form service if the client wants submissions without an email app. Update the privacy notice if you do.

## Review record (impeccable + taste-skill)

- Contrast: all text passes WCAG AA (text amber `#955625`, amber on dark `#E8B084`, smallest grey `#6B665C`).
- No horizontal overflow from 320px to 1440px; all controls at least 44px tall, except one inline text link.
- Detector: 26 findings reduced to 2 (cramped-padding is a false positive; the cream palette is part of the brand).
