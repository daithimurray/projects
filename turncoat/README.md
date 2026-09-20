# Turncoat multiplayer test build

One file: `index.html`. No server of your own. No accounts for players.

## Put it online (about 5 minutes)
1. Open app.netlify.com/drop on a computer.
2. Drag this folder onto the page.
3. Sign up for a free account to claim the site. Without a claim, the site stays private and expires.
4. Open the site link. Any static web host works too (GitHub Pages, Cloudflare Pages, a site you own).

## Run a game
1. Open the link on a laptop, tablet, or TV browser. Tap "Make this screen the Table".
2. Keep the Table open, awake, and on power. It runs the game and plays the sound.
3. Each player scans the QR code with a phone camera and enters a name.
4. The first player to join is the Host. Fewer than 5 people? Tap "Add a bot" on the Table.
5. The Host taps "Start game". The Table strip has the same controls as a fallback.

## Dry run alone
Open `index.html?local=1`. Make that tab the Table. Open the join link in other tabs of the same browser.

## Limits
- The Table is the server. If it sleeps or closes, the game stops. Reopen the page and tap "Go back to game".
- Player links use the free PeerJS join service. If it is down, players cannot connect. Try again later.
- The network path was not tested on real phones yet. The game logic was tested with up to 12 simulated phones.
- A phone that locks reconnects by itself when it wakes.
