// Meridian router: hash routes, all working offline.
//
//   #/                    overview
//   #/countries           searchable, filterable country list
//   #/country/<CODE>      one country's full profile
//   #/rankings            sortable ranking table
//   #/compare?c=A&c=B     side-by-side comparison
//   #/about               sources and method
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { byCode } from './data.js';
import { home, countriesList, countryDetail, rankings, compareView, about, missing } from './views.js';

const app = document.getElementById('app');

let listState = { q: '', region: 'All regions', sort: 'population' };
let rankState = { sort: 'population' };

function setActiveNav(route) {
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === route);
  });
}

function render() {
  window.__shotReady = false;
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  const params = new URLSearchParams(queryPart || '');
  const parts = pathPart.split('/').filter(Boolean);

  if (parts.length === 0) {
    setActiveNav('home');
    document.title = 'Meridian — National Statistics in Numbers';
    app.innerHTML = home();
  } else if (parts[0] === 'countries') {
    setActiveNav('countries');
    document.title = 'All countries | Meridian';
    app.innerHTML = countriesList(listState);
    wireList();
  } else if (parts[0] === 'country' && parts[1]) {
    const c = byCode(parts[1]);
    setActiveNav('countries');
    if (!c) {
      document.title = 'Not found | Meridian';
      app.innerHTML = missing();
    } else {
      document.title = `${c.name} in numbers | Meridian`;
      app.innerHTML = countryDetail(c);
    }
  } else if (parts[0] === 'rankings') {
    setActiveNav('rankings');
    document.title = 'Rankings | Meridian';
    app.innerHTML = rankings(rankState);
    app.querySelectorAll('[data-sort]').forEach((b) => {
      b.addEventListener('click', () => {
        rankState.sort = b.dataset.sort;
        render();
      });
    });
  } else if (parts[0] === 'compare') {
    setActiveNav('compare');
    const cs = params.getAll('c');
    const state = { a: cs[0] || 'JPN', b: cs[1] || 'USA' };
    document.title = `${state.a} vs ${state.b} | Meridian`;
    app.innerHTML = compareView(state);
    const go = () => {
      const a = document.getElementById('cmp-a').value;
      const b = document.getElementById('cmp-b').value;
      location.hash = `#/compare?c=${a}&c=${b}`;
    };
    document.getElementById('cmp-a').addEventListener('change', go);
    document.getElementById('cmp-b').addEventListener('change', go);
  } else if (parts[0] === 'about') {
    setActiveNav('about');
    document.title = 'About the data | Meridian';
    app.innerHTML = about();
  } else {
    setActiveNav('');
    document.title = 'Not found | Meridian';
    app.innerHTML = missing();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function wireList() {
  const q = document.getElementById('q');
  const sort = document.getElementById('sort');
  if (q) {
    q.addEventListener('input', () => {
      listState.q = q.value;
      const pos = q.selectionStart;
      render();
      const next = document.getElementById('q');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });
  }
  if (sort) {
    sort.addEventListener('change', () => {
      listState.sort = sort.value;
      render();
    });
  }
  app.querySelectorAll('[data-region]').forEach((b) => {
    b.addEventListener('click', () => {
      listState.region = b.dataset.region;
      render();
    });
  });
}

window.addEventListener('hashchange', render);
render();
