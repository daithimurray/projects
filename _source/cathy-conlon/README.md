# Cathy Conlon site: source

Served at getawebsite.ie/cathyconlon/. The built `site/dist/` is copied into the main getawebsite.ie site as a `cathyconlon/` folder, and the main site is redeployed to Vercel.

- `project/` Claude Design handoff: design system, tokens, components, page (`ui_kits/website/OnePage.jsx`) and content (`data.js`).
- `site/` Vite + React app that imports `project/` and builds it. `site/vercel.json` holds the deploy config.
- `HANDOFF.md`, `chats/` original handoff notes and design transcript.

## Configuration (build-time environment variables)

The page never shows a form that can't deliver. Each block appears only when its variable is set:

- `VITE_FORM_ENDPOINT`: a Formspree-style endpoint that accepts JSON (`name`, `email`, `topic`, `message`). Without it, the Contact section lists the real contact routes instead of a form.
- `VITE_NEWSLETTER_ENDPOINT`: a mailing-list provider's embed-subscribe URL (plain form post, field `email`). Without it, no sign-up is shown.
- `VITE_CONTACT_EMAIL`: a public email address for Cathy. Shown in Contact when set.

Content lives in `site/src/content.js`. Set `author.portrait`, `novel.cover` or `collection.cover` to an image path and the page uses it in place of the typographic cover.

## Update the live site

    cd _source/cathy-conlon/site
    npm ci
    npm run dev      # check locally at /cathyconlon/
    npm run build    # output in dist/, asset paths start with /cathyconlon/

Copy `dist/` into the main getawebsite.ie site as `cathyconlon/` (in its public or static folder if it uses a framework), then redeploy that site to Vercel.

## Before launch

- Choose a form service and a mailing-list provider, then set the variables above.
- Cathy to approve the first-person copy and the privacy notice (`site/public/privacy/index.html`).
- Still wanted from the author (the page works without them): portrait, cover images, one or two review quotes, a public contact email, hi-res press photos. She should also confirm the prize list.
