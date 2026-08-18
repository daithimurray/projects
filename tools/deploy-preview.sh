#!/usr/bin/env bash
# Deploy a site folder to the gh-pages preview at
# https://daithimurray.github.io/projects/<site>/
#
# Staging only: every deployed page gets a noindex tag injected, so a preview
# can never compete with the real domain in search results. The source files
# are left untouched — the tag exists only in the deployed copy.
#
#   tools/deploy-preview.sh <site-folder> ["Card title"] ["Card description"]
#
# The card title/description are optional; pass them the first time a site is
# deployed to add it to the preview index.
set -euo pipefail

SITE=${1:?usage: tools/deploy-preview.sh <site-folder> [title] [description]}
TITLE=${2:-}
BLURB=${3:-}
SITE=${SITE%/}

REPO=$(git rev-parse --show-toplevel)
cd "$REPO"
[ -d "$SITE" ] || { echo "no such site folder: $SITE" >&2; exit 1; }

WORKTREE=$(mktemp -d)
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true' EXIT

git fetch origin gh-pages
git worktree add --detach "$WORKTREE" origin/gh-pages

rm -rf "${WORKTREE:?}/$SITE"
mkdir -p "$WORKTREE/$SITE"
tar -c --exclude='.git' -C "$SITE" . | tar -x -C "$WORKTREE/$SITE"

# Inject the staging noindex into every deployed page.
python3 - "$WORKTREE/$SITE" <<'PY'
import pathlib, sys
tag = '<meta name="robots" content="noindex"><!-- staging deploy only -->'
for p in sorted(pathlib.Path(sys.argv[1]).rglob('*.html')):
    t = p.read_text()
    if 'staging deploy only' in t:
        continue
    if '<meta name="robots"' in t:          # page already noindex on its own
        continue
    t = t.replace('</title>', '</title>\n' + tag, 1)
    p.write_text(t)
    print('noindex ->', p.name)
PY

# Add the site to the preview index the first time it is deployed.
if [ -n "$TITLE" ]; then
  python3 - "$WORKTREE/index.html" "$SITE" "$TITLE" "$BLURB" <<'PY'
import html, pathlib, sys
index, site, title, blurb = sys.argv[1:5]
p = pathlib.Path(index)
t = p.read_text()
if f'href="{site}/"' not in t:
    card = (f'  <a class="site" href="{site}/">\n'
            f'    <strong>{html.escape(title)}</strong>\n'
            f'    <span>{html.escape(blurb)}</span>\n'
            f'  </a>\n')
    t = t.replace('</main>', card + '</main>', 1)
    p.write_text(t)
    print('index card added')
PY
fi

cd "$WORKTREE"
git add -A
git -c user.name="$(git -C "$REPO" config user.name)" \
    -c user.email="$(git -C "$REPO" config user.email)" \
    commit -q -m "Redeploy preview: $SITE"
git push origin HEAD:gh-pages
echo
echo "https://daithimurray.github.io/projects/$SITE/"
