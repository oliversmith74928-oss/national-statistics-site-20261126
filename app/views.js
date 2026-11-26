// HTML for each page, built from the country data. Every value is escaped
// before it goes into the page. Charts are plain inline SVG drawn in code,
// so the site needs no library and no network.

import { countries, byCode, sortedBy, fmtPop, fmtGdp, fmtMoney, fmtNum, YEAR } from './data.js';

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function barRows(items, value, format, colorClass = '') {
  const max = Math.max(...items.map((i) => i[value]));
  return items
    .map(
      (i) => `<div class="bar-row">
  <span class="nm">${escape(i.name)}</span>
  <span class="bar-track"><span class="bar-fill ${colorClass}" style="display:block;width:${Math.max(2, (i[value] / max) * 100).toFixed(1)}%"></span></span>
  <span class="val num">${format(i[value])}</span>
</div>`,
    )
    .join('');
}

export function lineChart(series, labels, color = '#0e7c7b') {
  const w = 640, h = 220, padL = 46, padB = 28, padT = 14, padR = 12;
  const min = Math.min(...series) * 0.96, max = Math.max(...series) * 1.02;
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  const pts = series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const v = min + (max - min) * f;
    const yy = y(v);
    return `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="#e3eaee" stroke-width="1"/>
      <text x="${padL - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="#5b6b78">${Math.round(v)}</text>`;
  }).join('');
  const xlabels = labels.map((l, i) => `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#5b6b78">${l}</text>`).join('');
  const dots = series.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${color}"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart">
    ${grid}<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${xlabels}
  </svg>`;
}

function kpiCard(label, big, sub) {
  return `<div class="card"><div class="label">${label}</div><div class="big num">${big}</div><div class="muted small">${sub}</div></div>`;
}

export function home() {
  const totalPop = countries.reduce((s, c) => s + c.population, 0);
  const totalGdp = countries.reduce((s, c) => s + c.gdp, 0);
  const topPop = sortedBy('population').slice(0, 8);
  const topGdp = sortedBy('gdp').slice(0, 8);
  const longest = [...countries].sort((a, b) => b.lifeExp - a.lifeExp)[0];
  const featured = byCode('JPN');
  const featuredGrowth = ((featured.popSeries[9] - featured.popSeries[0]) / featured.popSeries[0] * 100).toFixed(1);
  return `<section class="hero">
  <p class="eyebrow" style="color:#8fd0cf">World in numbers · ${YEAR} estimates</p>
  <h1>How big is a country, really?</h1>
  <p>Population, GDP, health and education for ${countries.length} countries — every figure on one page, every chart drawn from the data, and the whole site works offline.</p>
  <div class="kpis">
    <div class="kpi"><div class="v num">${fmtPop(totalPop)}</div><div class="l">people in ${countries.length} countries</div></div>
    <div class="kpi"><div class="v num">$${(totalGdp / 1000).toFixed(1)}T</div><div class="l">combined GDP</div></div>
    <div class="kpi"><div class="v num">${longest.lifeExp} yrs</div><div class="l">longest life expectancy — ${escape(longest.name)}</div></div>
    <div class="kpi"><div class="v num">${fmtMoney(sortedBy('gdpPerCapita')[0].gdpPerCapita)}</div><div class="l">highest GDP per person — ${escape(sortedBy('gdpPerCapita')[0].name)}</div></div>
  </div>
</section>

<section>
  <h2>Featured country — ${escape(featured.name)}</h2>
  <p class="lede">Capital ${escape(featured.capital)} · ${fmtPop(featured.population)} people · GDP ${fmtGdp(featured.gdp)} · life expectancy ${featured.lifeExp} years.</p>
  <div class="grid cols-4">
    ${kpiCard('Population', fmtPop(featured.population), `10-year change ${featuredGrowth}%`)}
    ${kpiCard('GDP', fmtGdp(featured.gdp), `${fmtMoney(featured.gdpPerCapita)} per person`)}
    ${kpiCard('Life expectancy', `${featured.lifeExp} years`, 'Highest of the 16 countries')}
    ${kpiCard('Internet users', `${featured.internet}%`, `${featured.urban}% live in cities`)}
  </div>
  <p style="margin-top:14px"><a class="btn" href="#/country/JPN">Open Japan's full profile →</a>
  <a class="btn ghost" href="#/compare?c=JPN&c=DEU">Compare Japan vs Germany</a></p>
</section>

<section class="grid cols-2" style="margin-top:8px">
  <div class="card">
    <h3>Largest populations</h3>
    <p class="muted small">Millions of people, ${YEAR}</p>
    ${barRows(topPop, 'population', fmtPop)}
    <p><a href="#/rankings">See the full ranking →</a></p>
  </div>
  <div class="card">
    <h3>Largest economies</h3>
    <p class="muted small">GDP in US$ billions, ${YEAR}</p>
    ${barRows(topGdp, 'gdp', fmtGdp, 'navy')}
    <p><a href="#/rankings">See the full ranking →</a></p>
  </div>
</section>

<section>
  <h2>Explore all ${countries.length} countries</h2>
  <div class="grid cols-3">
    ${sortedBy('population').slice(0, 6).map((c) => countryCard(c)).join('')}
  </div>
  <p style="margin-top:14px"><a class="btn ghost" href="#/countries">Browse all countries →</a></p>
</section>`;
}

export function countryCard(c) {
  return `<a class="country-card card" href="#/country/${c.code}">
  <div class="name">${escape(c.name)}</div>
  <div class="meta">${escape(c.capital)} · ${escape(c.region)}</div>
  <div class="stats">
    <span><b class="num">${fmtPop(c.population)}</b>people</span>
    <span><b class="num">${fmtGdp(c.gdp)}</b>GDP</span>
    <span><b class="num">${c.lifeExp} yrs</b>life expectancy</span>
  </div>
</a>`;
}

export function countriesList(state) {
  const q = (state.q || '').toLowerCase();
  const region = state.region || 'All regions';
  const sort = state.sort || 'population';
  let list = countries.filter((c) => (!q || c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q)) && (region === 'All regions' || c.region === region));
  list = [...list].sort((a, b) => b[sort] - a[sort]);
  const regions = ['All regions', ...new Set(countries.map((c) => c.region))];
  return `<p class="eyebrow">Countries</p>
<h1>All ${countries.length} countries</h1>
<p class="lede">Search, filter by region and sort by any indicator. Every row opens a full country profile.</p>
<div class="controls">
  <input type="search" id="q" placeholder="Search a country or capital…" value="${escape(state.q || '')}" aria-label="Search countries">
  <select id="sort" aria-label="Sort by">
    ${['population', 'gdp', 'gdpPerCapita', 'lifeExp', 'literacy', 'area'].map((k) => `<option value="${k}" ${sort === k ? 'selected' : ''}>Sort: ${k}</option>`).join('')}
  </select>
</div>
<div class="controls">
  ${regions.map((r) => `<button class="chip ${region === r ? 'active' : ''}" data-region="${escape(r)}">${escape(r)}</button>`).join('')}
</div>
<p class="muted">${list.length} countr${list.length === 1 ? 'y' : 'ies'} shown</p>
<div class="grid cols-3">${list.map(countryCard).join('') || '<p class="muted">No country matches that search.</p>'}</div>`;
}

export function countryDetail(c) {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const gdpYears = [2019, 2020, 2021, 2022, 2023, 2024];
  const popChange = ((c.popSeries[9] - c.popSeries[0]) / c.popSeries[0] * 100);
  const density = (c.population * 1e6 / c.area).toFixed(1);
  const rankPop = sortedBy('population').findIndex((x) => x.code === c.code) + 1;
  const rankGdp = sortedBy('gdp').findIndex((x) => x.code === c.code) + 1;
  return `<p><a href="#/countries">← All countries</a></p>
<p class="eyebrow">${escape(c.region)} · Capital ${escape(c.capital)}</p>
<h1>${escape(c.name)} in numbers</h1>
<p class="lede">The key statistics for ${escape(c.name)} in ${YEAR}, with a decade of population history and six years of GDP.</p>
<div>
  <span class="pill">#${rankPop} by population</span>
  <span class="pill">#${rankGdp} by GDP</span>
  <span class="pill">${escape(c.region)}</span>
</div>
<div class="kv">
  ${kpiCard('Population', fmtPop(c.population), `${popChange >= 0 ? '+' : ''}${popChange.toFixed(1)}% since 2015`)}
  ${kpiCard('GDP', fmtGdp(c.gdp), `${fmtMoney(c.gdpPerCapita)} per person`)}
  ${kpiCard('Life expectancy', `${c.lifeExp} years`, `Literacy ${c.literacy}%`)}
  ${kpiCard('Land area', `${fmtNum(c.area)} km²`, `${density} people per km²`)}
</div>
<div class="grid cols-2">
  <div class="card">
    <h3>Population, 2015–2024</h3>
    <p class="muted small">Millions of people</p>
    ${lineChart(c.popSeries, years)}
    <p class="small">Population ${popChange >= 0 ? 'grew' : 'fell'} by ${Math.abs(popChange).toFixed(1)}% over the decade.</p>
  </div>
  <div class="card">
    <h3>GDP, 2019–2024</h3>
    <p class="muted small">US$ billions</p>
    ${lineChart(c.gdpSeries, gdpYears, '#123a5c')}
    <p class="small">GDP per person in ${YEAR}: <strong class="num">${fmtMoney(c.gdpPerCapita)}</strong>.</p>
  </div>
</div>
<div class="card" style="margin-top:14px">
  <h3>At a glance</h3>
  <div class="table-wrap" style="border:0">
  <table>
    <tr><th>Indicator</th><th>Value</th><th>What it means</th></tr>
    <tr><td>Population</td><td class="num">${fmtPop(c.population)}</td><td>${rankPop === 1 ? 'The largest population in this set' : `Ranked #${rankPop} of ${countries.length} by population`}</td></tr>
    <tr><td>GDP</td><td class="num">${fmtGdp(c.gdp)}</td><td>Ranked #${rankGdp} of ${countries.length} by GDP</td></tr>
    <tr><td>GDP per capita</td><td class="num">${fmtMoney(c.gdpPerCapita)}</td><td>Average economic output per person</td></tr>
    <tr><td>Life expectancy</td><td class="num">${c.lifeExp} years</td><td>Years a newborn is expected to live</td></tr>
    <tr><td>Literacy rate</td><td class="num">${c.literacy}%</td><td>Share of adults who can read and write</td></tr>
    <tr><td>Urban population</td><td class="num">${c.urban}%</td><td>Share of people living in cities</td></tr>
    <tr><td>Internet users</td><td class="num">${c.internet}%</td><td>Share of people using the internet</td></tr>
    <tr><td>Land area</td><td class="num">${fmtNum(c.area)} km²</td><td>Population density ${density} per km²</td></tr>
  </table>
  </div>
  <p style="margin-top:14px"><a class="btn" href="#/compare?c=${c.code}&c=${c.code === 'USA' ? 'CHN' : 'USA'}">Compare ${escape(c.name)} with ${c.code === 'USA' ? 'China' : 'the United States'}</a></p>
</div>
<div class="card" style="margin-top:14px">
  <h3>How ${escape(c.name)} compares</h3>
  <p class="muted small">Population against the five largest countries</p>
  ${barRows(sortedBy('population').slice(0, 5), 'population', fmtPop, 'gold')}
</div>`;
}

export function rankings(state) {
  const sort = state.sort || 'population';
  const list = sortedBy(sort);
  const cols = [
    ['population', 'Population'],
    ['gdp', 'GDP (US$ bn)'],
    ['gdpPerCapita', 'GDP per capita (US$)'],
    ['lifeExp', 'Life expectancy'],
    ['literacy', 'Literacy (%)'],
    ['area', 'Area (km²)'],
  ];
  const fmt = { population: fmtPop, gdp: (v) => fmtNum(v), gdpPerCapita: fmtMoney, lifeExp: (v) => `${v} yrs`, literacy: (v) => `${v}%`, area: fmtNum };
  return `<p class="eyebrow">Rankings</p>
<h1>Rankings, ${YEAR}</h1>
<p class="lede">Every country, ranked by the indicator you choose. Click a column heading to re-sort the table.</p>
<div class="controls">
  ${cols.map(([k, label]) => `<button class="chip ${sort === k ? 'active' : ''}" data-sort="${k}">${label}</button>`).join('')}
</div>
<div class="table-wrap">
<table>
  <thead><tr><th>#</th><th>Country</th><th>Region</th><th>${cols.find(([k]) => k === sort)[1]}</th><th>Population</th><th>GDP</th></tr></thead>
  <tbody>
  ${list.map((c, i) => `<tr>
    <td class="num">${i + 1}</td>
    <td><a href="#/country/${c.code}">${escape(c.name)}</a></td>
    <td>${escape(c.region)}</td>
    <td class="num"><strong>${fmt[sort](c[sort])}</strong></td>
    <td class="num">${fmtPop(c.population)}</td>
    <td class="num">${fmtGdp(c.gdp)}</td>
  </tr>`).join('')}
  </tbody>
</table>
</div>
<p class="small" style="margin-top:12px">Figures are approximate ${YEAR} estimates. Sources: UN and World Bank estimates — see <a href="#/about">About the data</a>.</p>`;
}

export function compareView(state) {
  const a = byCode(state.a || 'JPN') || byCode('JPN');
  const b = byCode(state.b || 'USA') || byCode('USA');
  const row = (label, va, vb, format) => {
    const max = Math.max(va, vb);
    return `<tr><td>${label}</td>
      <td class="num"><strong>${format(va)}</strong><div class="bar-track" style="margin-top:4px"><span class="bar-fill" style="display:block;width:${(va / max * 100).toFixed(1)}%"></span></span></td>
      <td class="num"><strong>${format(vb)}</strong><div class="bar-track" style="margin-top:4px"><span class="bar-fill navy" style="display:block;width:${(vb / max * 100).toFixed(1)}%"></span></span></td></tr>`;
  };
  const options = countries.map((c) => `<option value="${c.code}">${escape(c.name)}</option>`).join('');
  return `<p class="eyebrow">Compare</p>
<h1>${escape(a.name)} vs ${escape(b.name)}</h1>
<p class="lede">Two countries, side by side, on the same indicators. Pick any two from the lists below.</p>
<div class="controls">
  <label>Country A <select id="cmp-a">${countries.map((c) => `<option value="${c.code}" ${c.code === a.code ? 'selected' : ''}>${escape(c.name)}</option>`).join('')}</select></label>
  <span class="vs">VS</span>
  <label>Country B <select id="cmp-b">${countries.map((c) => `<option value="${c.code}" ${c.code === b.code ? 'selected' : ''}>${escape(c.name)}</option>`).join('')}</select></label>
</div>
<div class="compare-grid">
  <div class="card"><h3>${escape(a.name)}</h3><p class="muted">${escape(a.capital)} · ${escape(a.region)}</p>
    <p class="big num" style="font-size:28px;font-weight:800;color:var(--navy)">${fmtPop(a.population)}</p><p class="muted small">people · GDP ${fmtGdp(a.gdp)} · ${a.lifeExp} years life expectancy</p>
    <p><a href="#/country/${a.code}">Full profile →</a></p></div>
  <div class="card"><h3>${escape(b.name)}</h3><p class="muted">${escape(b.capital)} · ${escape(b.region)}</p>
    <p class="big num" style="font-size:28px;font-weight:800;color:var(--navy)">${fmtPop(b.population)}</p><p class="muted small">people · GDP ${fmtGdp(b.gdp)} · ${b.lifeExp} years life expectancy</p>
    <p><a href="#/country/${b.code}">Full profile →</a></p></div>
</div>
<div class="table-wrap" style="margin-top:14px">
<table>
  <thead><tr><th>Indicator</th><th>${escape(a.name)}</th><th>${escape(b.name)}</th></tr></thead>
  <tbody>
    ${row('Population', a.population, b.population, fmtPop)}
    ${row('GDP (US$ bn)', a.gdp, b.gdp, (v) => fmtNum(v))}
    ${row('GDP per capita', a.gdpPerCapita, b.gdpPerCapita, fmtMoney)}
    ${row('Life expectancy (years)', a.lifeExp, b.lifeExp, (v) => `${v}`)}
    ${row('Literacy (%)', a.literacy, b.literacy, (v) => `${v}%`)}
    ${row('Urban population (%)', a.urban, b.urban, (v) => `${v}%`)}
    ${row('Internet users (%)', a.internet, b.internet, (v) => `${v}%`)}
    ${row('Land area (km²)', a.area, b.area, fmtNum)}
  </tbody>
</table>
</div>
<p class="small" style="margin-top:12px">The longer bar wins each row. ${escape(a.name)} is bigger on ${['Population', 'GDP', 'GDP per capita', 'Life expectancy'].filter((_, i) => [a.population, a.gdp, a.gdpPerCapita, a.lifeExp][i] > [b.population, b.gdp, b.gdpPerCapita, b.lifeExp][i]).join(', ') || 'none of the headline indicators'}.</p>`;
}

export function about() {
  return `<p class="eyebrow">About the data</p>
<h1>About Meridian</h1>
<p class="lede">Meridian is an original, offline national statistics site. It shows population, GDP, health and education figures for 16 countries, with charts, rankings and comparisons — all from files shipped with the site.</p>
<div class="grid cols-2">
  <div class="card">
    <h3>Where the figures come from</h3>
    <p>All figures are approximate ${YEAR} estimates compiled from public sources — United Nations population estimates and World Bank development indicators. They are rounded for readability and are not official releases from any national statistics office.</p>
    <p class="small">If a figure looks out of date, that is because it is an estimate: the site is a demonstration of how national statistics can be presented, not a source of record.</p>
  </div>
  <div class="card">
    <h3>How the site works</h3>
    <p>The whole site is static files under <code>app/</code>: one HTML shell, one stylesheet and three JavaScript modules. No network request is ever made — no fonts, no analytics, no images from elsewhere. Open <code>app/index.html</code> in a desktop browser or on a phone and it just works.</p>
    <p class="small">Charts are inline SVG drawn from the data in <code>app/data.js</code>. Pages are hash routes, so every view has its own link.</p>
  </div>
</div>
<h2>What you can do here</h2>
<div class="grid cols-3">
  <div class="card"><h3>Browse</h3><p>Search and filter all ${countries.length} countries by name, capital or region, and sort by any indicator.</p><p><a href="#/countries">Browse countries →</a></p></div>
  <div class="card"><h3>Rank</h3><p>See every country ranked by population, GDP, GDP per capita, life expectancy, literacy or area.</p><p><a href="#/rankings">See rankings →</a></p></div>
  <div class="card"><h3>Compare</h3><p>Put any two countries side by side on eight indicators, with bars that show who leads each row.</p><p><a href="#/compare">Compare countries →</a></p></div>
</div>
<p class="note" style="margin-top:22px">Meridian is an independent site built for make.fun's “Make the best national statistics site” bounty. It copies no other site's brand, text or images.</p>`;
}

export function missing() {
  return `<h1>Page not found</h1>
<p class="lede">There is no statistics page at this address.</p>
<p><a class="btn" href="#/">Back to the overview</a></p>`;
}
