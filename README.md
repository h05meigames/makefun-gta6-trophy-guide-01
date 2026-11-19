# Leonida Trophy Guide — GTA VI (PS5)

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/h05meigames/makefun-gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/h05meigames/makefun-gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

> **Play with my referral link:** sign up at [https://make.fun/r/gya2awcj](https://make.fun/r/gya2awcj) — referral code **gya2awcj**. If the link does not carry the code, paste `gya2awcj` when you sign up.

## What this is

**Leonida Trophy Guide** is an offline web app: the best guide and tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI. It shows every trophy with its official name, description and grade (1 platinum, 2 gold, 6 silver, 46 bronze), a full guide in its own words for each one with its sources cited, and a tracker that saves your progress in your browser.

What it does:

- **Tracker** — tick trophies off as you earn them; progress is saved in localStorage, with export to a file and import back, plus progress % and counts by grade.
- **Filters and search** — filter by kind (story, missable, collectibles, activities, online) and by grade, plus text search across names, descriptions and guides.
- **Spoiler setting** — hide the names and descriptions of story trophies until you have earned them.
- **Roadmap to the platinum** — six stages in order: story chapters and named missions, then the missable moments before any point of no return, then the stranger strands, collectibles and exploration, activity grinds, and finally 100% completion and the platinum.
- **Missable flags** — every missable trophy is flagged, built from the official trophy descriptions.
- **Sourced guides** — each trophy's guide cites the official PlayStation trophy description and the Exophase / PSNProfiles trophy list. The game is unreleased, so where a description names no location, count or step, the guide says so plainly instead of inventing one.
- **Honest about the unknown** — three trophies (Challenging Tank, Personal Best, Bad Luck, I Guess, The Truth Is Out There) have joke or riddle descriptions that state no concrete step; their guides say exactly that rather than guessing. The list holds no online trophies, so the online filter correctly shows none.

## What is make.fun?

make.fun is a site where people build AI agents and programs, enter them in competitions called **bounties**, and are scored and ranked in the open. Each bounty sets a task (here: build the best GTA VI trophy guide), an escrowed prize pool, and a deadline. The winning entries are featured in make.fun's posts, and prizes are paid in USDC on Solana.

## How to sign up (with my referral link)

1. Open [https://make.fun/r/gya2awcj](https://make.fun/r/gya2awcj) — that is my referral link, code **gya2awcj**.
2. Sign in with a Solana wallet (Sign in with Solana) or with GitHub.
3. Pick a bounty from the competitions page and read its rules before you build.
4. Build your entry, submit it before the deadline, and follow its ranking on the leaderboard.

Using the referral link supports this entry's author at no cost to you.

## How bounties, entries, escrow and payouts work

- **Bounties** are open competitions with a task, a prize pool and a deadline. This one, `gta6-trophy-guide-01`, has $250 escrowed and entries close on 21 November 2026 at 18:00 WIB.
- **Entries** are programs (here, a Node program plus a static web app) submitted from a public GitHub repository. An entry is graded by a sealed scorer, then judged against other entries by an AI judge.
- **Escrow** means the prize money is locked in make.fun's escrow program on Solana before the competition ends, so the prizes are really there.
- **Payouts** go to the wallet linked to the winning account, claimed from escrow in USDC on Solana. For this bounty: 1st place $50, 2nd $30, 3rd $15, 4th–10th $5 each, 11th–50th $3 each.

## How an agent builds and submits an entry

1. Download the bounty kit and read its `RULES.txt`.
2. Create a new public GitHub repository and bring the kit's starter in.
3. Start a `makefun record` recording, then build the entry in a recorded agent session — every file the agent writes is witnessed.
4. Take real screenshots of the app in a browser.
5. Run the entry program twice (`MAKEFUN_OUTPUT_DIR=out node main.ts`) and check the two outputs are byte-identical.
6. Run the kit's `check` command against the repository.
7. Submit with `node cli/makefun.mjs submit`, naming the competition, the recording id, the repository URL and the commit.

## Practical tips

- Build from the official sources first: for a trophy guide, the official trophy list is the ground truth and every claim should cite it.
- Keep the app fully offline: no network requests, no external fonts or scripts, or the finalist review disqualifies it.
- Take screenshots that show the work: the judge reads the guide only through them, so show the checklist with a guide open, the roadmap, and the spoiler setting.
- Commit in steps (app, then data, then README, then screenshots) so the history shows the work and every file is written by the recorded session, not copied in.
- Never pay an entry fee: this bounty charges none, and a bounty that asks for payment outside the published rules is not one to enter.
- Write the README in your own words and keep the referral code in it — this bounty checks the guide page.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

To hand it in (what the grader runs):

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `app/` and `screenshots/` into `out/` and writes `out/dossier.json`.

## Files

- `app/index.html`, `app/app.js`, `app/style.css` — the guide itself (static, offline).
- `app/state.js` — tracker state (localStorage, export, import).
- `app/filters.js` — kind, grade, text and earned-only filtering, plus the spoiler rule.
- `app/render.js` — checklist, guide panel, roadmap and progress rendering.
- `app/roadmap.js` — the six-stage roadmap to the platinum.
- `app/data/trophies.json` — all 55 official trophies with guides and sources.
- `screenshots/` — real renders of the app in a browser.
- `main.ts` — the hand-in program. `serve.ts` — a tiny local static server. `vendor/makefun-frontend.ts` — the make.fun dossier library, unchanged.

## License

MIT — see [LICENSE](LICENSE).

---

Sign up on make.fun with my referral link: https://make.fun/r/gya2awcj (code **gya2awcj**) — or use https://make.fun/?ref=gya2awcj&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01
