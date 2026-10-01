# Deploy: the residents site on Vercel

David asked for the site and the 3D model of the Wonderful Barn to be hosted on Vercel (1 October 2026).
The model lives inside the site at `/wonderful-barn/`, so one Vercel project serves both.

The site deploys as plain static files from `/residents/`. There is no build step on Vercel: the committed folder is
already built. It is the **preview** build (placeholder banner and dotted underlines), on purpose, until the committee
confirms the details. `vercel.json` sends `X-Robots-Tag: noindex` and `robots.txt` blocks crawlers until launch.

## Route A: a Claude session deploys it (needs a token)

Preconditions, set once by David in Project settings, environment (a new session picks them up):

- `VERCEL_TOKEN` environment variable (never pasted into chat). Create it at vercel.com/account/tokens, with an expiry date.
- Network access set to Custom, with `vercel.com`, `api.vercel.com` and `*.vercel.app` in Allowed domains, and the default
  package manager list kept on (the Vercel CLI installs through npm). David's step-by-step version, in ASD-STE100, is
  `residents-site/vercel-token-setup-ste.md` in the project files.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

```sh
cd residents
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name barnhall-meadows
```

The project name gives the address, `https://barnhall-meadows.vercel.app` if it is free (Vercel adds a suffix if not).
Redeploy the same way after every change.

## Route B: Vercel builds it from GitHub (David clicks)

1. Merge PR #1 so `residents/` is on the default branch.
2. On vercel.com, Add New, Project, import `daithimurray/projects`.
3. Root Directory `residents`. Framework Preset `Other`. Leave the build and output settings empty.
4. Deploy. Every later merge to the default branch redeploys.

## Check

- `/` loads with the preview banner, and `/wonderful-barn` redirects to `/wonderful-barn/`.
- The 3D model loads, and the network tab shows requests to the site's own host only.
- `/news/wonderful-barn-park/` and Home link to the model.
- Response headers include `X-Robots-Tag: noindex`.
