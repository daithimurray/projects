# Cathy Conlon site: source

Served at getawebsite.ie/cathyconlon/. The built `site/dist/` is copied into the main getawebsite.ie site as a `cathyconlon/` folder, and the main site is redeployed to Vercel.

- `project/` Claude Design handoff: design system, tokens, components, page (`ui_kits/website/OnePage.jsx`) and content (`data.js`).
- `site/` Vite + React app that imports `project/` and builds it. `site/vercel.json` holds the deploy config.
- `HANDOFF.md`, `chats/` original handoff notes and design transcript.

## Update the live site

    cd _source/cathy-conlon/site
    npm ci
    npm run dev      # check locally at /cathyconlon/
    npm run build    # output in dist/, asset paths start with /cathyconlon/

Copy `dist/` into the main getawebsite.ie site as `cathyconlon/` (in its public or static folder if it uses a framework), then redeploy that site to Vercel.

## Before launch

- Contact form and newsletter validate in the browser only. Connect them to a form service or mailing-list provider.
- Still needed from the author: portrait, headshot, cover images, Celbridge photo, poem text, novel quote, press-kit files, Privacy and Colophon pages. She also needs to confirm prizes and the ISBN.
