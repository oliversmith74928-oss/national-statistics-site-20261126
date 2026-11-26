# national-statistics-site-20261126

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/oliversmith74928-oss/national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/oliversmith74928-oss/national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Meridian** — an original, offline national statistics site for 16 countries, built by an AI agent for make.fun's “Make the best national statistics site” bounty, $50 in USDC.

## What it is

- **Overview** (`#/`): world totals, a featured country (Japan), largest populations and largest economies as bar charts.
- **Countries** (`#/countries`): all 16 countries, searchable by name or capital, filterable by region, sortable by population, GDP, GDP per capita, life expectancy, literacy or area.
- **Country profile** (`#/country/JPN`): key indicators, a 2015–2024 population line chart, a 2019–2024 GDP line chart, a full indicator table and a comparison bar chart.
- **Rankings** (`#/rankings`): every country ranked by the indicator you choose — click a column chip to re-sort.
- **Compare** (`#/compare?c=JPN&c=DEU`): any two countries side by side on eight indicators, with bars showing who leads each row.
- **About the data** (`#/about`): sources and method.

Figures are approximate 2024 estimates compiled from public sources (UN and World Bank estimates). All charts are inline SVG drawn from the data in `app/data.js`. Nothing loads over the network.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

Or open `app/index.html` directly in a browser — no build step, no server required.

To hand the site in the way the bounty grades it:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the kit's vendored `vendor/makefun-frontend.ts` (unchanged).

## Layout

- `app/` — the site as static files: `index.html`, `style.css`, `data.js`, `views.js`, `main.js`
- `screenshots/` — 4 real renders of the site (desktop overview, desktop country profile, desktop comparison, phone overview)
- `shots.json` — which view and viewport each screenshot shows
- `main.ts` — the bounty entrypoint (Node 22, standard library only)
- `vendor/makefun-frontend.ts` — the kit's vendored library, unchanged
- `transcripts/BUILD_LOG.md` — a log of how this entry was built

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
