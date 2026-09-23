# Cathy Conlon site: source

Served at getawebsite.ie/cathy-conlon/ from the static build in `/cathy-conlon`.

- `project/` Claude Design handoff: design system, tokens, components, page (`ui_kits/website/OnePage.jsx`) and content (`data.js`).
- `site/` Vite + React app that imports `project/` and builds it.
- `HANDOFF.md`, `chats/` original handoff notes and design transcript.

## Update the live site

    cd _source/cathy-conlon/site
    npm ci
    npm run dev      # edit, check locally
    npm run build    # rewrites /cathy-conlon at the repo root
    git add -A && git commit && git push

Commit the rebuilt `/cathy-conlon` folder. Vercel serves the repo as static files and does not run the build.

## Before launch

- Contact form and newsletter validate in the browser only. Connect them to a form service or mailing-list provider.
- Still needed from the author: portrait, headshot, cover images, Celbridge photo, poem text, novel quote, press-kit files, Privacy and Colophon pages. She also needs to confirm prizes and the ISBN.
