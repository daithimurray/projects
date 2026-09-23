# Cathy Conlon site: source

Live at cathy-conlon.getawebsite.ie. It's a separate Vercel project from the main getawebsite.ie site.

- `project/` Claude Design handoff: design system, tokens, components, page (`ui_kits/website/OnePage.jsx`) and content (`data.js`).
- `site/` Vite + React app that imports `project/` and builds it. `site/vercel.json` holds the deploy config.
- `HANDOFF.md`, `chats/` original handoff notes and design transcript.

## Vercel project settings

- Import `daithimurray/projects`.
- Root Directory: `_source/cathy-conlon/site`.
- Keep "Include files outside the root directory in the Build Step" on (default). The app imports `../project`.
- Domain: `cathy-conlon.getawebsite.ie`.

## Update the live site

    cd _source/cathy-conlon/site
    npm ci
    npm run dev      # edit, check locally
    git add -A && git commit && git push   # Vercel rebuilds on push to the production branch

## Before launch

- Contact form and newsletter validate in the browser only. Connect them to a form service or mailing-list provider.
- Still needed from the author: portrait, headshot, cover images, Celbridge photo, poem text, novel quote, press-kit files, Privacy and Colophon pages. She also needs to confirm prizes and the ISBN.
