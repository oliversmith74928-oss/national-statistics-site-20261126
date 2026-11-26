# Build log — Meridian national statistics site

Entry for make.fun bounty **“Make the best national statistics site”**
(`best-national-statistics-site-20261126-0539`, $50 USDC, 10 places at $5).
Repo: https://github.com/oliversmith74928-oss/national-statistics-site-20261126

This file is a build log written during the build. It is not a harness
session transcript; the session transcripts for submission are produced
separately by the kit's `bundle` command at submission time.

## Timeline (2026-11-26, UTC)

- 08:01 — Fetched the bounty page and `GET /api/competitions/<slug>/requirements`.
  Confirmed deliverables: public repo created after the bounty opened
  (2026-11-26T05:39:00Z), `main.ts` at root, `vendor/makefun-frontend.ts`
  unchanged, `app/` static files, 3–4 screenshots under `screenshots/`,
  agent transcripts, MIT license. Round 1 closes 2026-11-26T23:39:00Z;
  final deadline 2026-11-29T05:39:00Z.
- 08:02 — Downloaded the competition kit (`/c/<slug>/kit?phase=dev`),
  extracted it, read `RULES.txt` and the starter. The starter is a recipe
  site; its `main.ts` (copies `app/` + `screenshots/` to the output dir
  and writes `dossier.json` via `buildDossier`) was kept, and its
  `vendor/makefun-frontend.ts`, `LICENSE` and `serve.ts` were copied
  unchanged. The recipe content was replaced entirely with original
  statistics content.
- 08:02 — Created the public repo `oliversmith74928-oss/national-statistics-site-20261126`
  via the GitHub PAT helper (repo id 1472850618, created 2026-11-26T08:02:35Z,
  default branch `main`). Not via a browser, not as Muse.
- 08:05 — Built the site in `app/`:
  - `index.html` — shell, sticky nav, footer.
  - `style.css` — original navy/teal design, responsive down to phone width.
  - `data.js` — 16 countries, approximate 2024 figures (population, GDP,
    GDP per capita, life expectancy, literacy, area, urban share, internet
    share) plus 2015–2024 population and 2019–2024 GDP series.
  - `views.js` — home, country list, country profile, rankings, compare,
    about; inline-SVG bar and line charts drawn from the data.
  - `main.js` — hash router; every view has a link; `window.__shotReady`
    signals when a page has rendered.
- 08:12 — Verified `main.ts` runs locally (`MAKEFUN_OUTPUT_DIR=out node main.ts`)
  and writes `dossier.json`; served `app/` with `serve.ts` and checked the
  pages render with no console errors and no network requests.
- 08:12 — Took 4 screenshots with headless Chromium via Playwright
  (desktop 1280×800 overview, country profile and comparison; phone
  390×844 overview), saved under `screenshots/`, each under 256 KiB.
- 08:20 — Single commit pushed to `main` on GitHub; verified the repo is
  public and the files are present via the GitHub API.

## Design decisions

- One featured country (Japan) on the overview, so the first screen has a
  story, not just a table.
- Charts are hand-drawn inline SVG, not a chart library: zero network
  requests and nothing to vendor.
- Figures are labelled as approximate estimates with their sources, so no
  visitor mistakes the site for an official statistics office.
- No external images, fonts or scripts anywhere in `app/`.
