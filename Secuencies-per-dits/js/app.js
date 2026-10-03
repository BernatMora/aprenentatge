/* app.js — arrencada, càrrega de dades i encaminador. */
import * as S from './store.js';
import { viewAvui, viewMetode, viewFigures, viewRecursos, viewProgres, viewLlibre, viewVariacions, viewPla } from './ui.js';
import { viewExercises, viewExerciseDetail } from './ui-exercise.js';
import { viewSessio, viewFitxa } from './ui-session.js';

export const ctx = { data: {}, state: null, cleanup: null, baseExercises: [], save() {} };

async function loadJSON(path) {
  // resolem contra la base del document: funciona igual a l'arrel, en una
  // subcarpeta de GitHub Pages o amb qualsevol <base>
  const url = new URL(path, document.baseURI).href;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

function refreshExercises() {
  const built = (ctx.data.exercises && ctx.data.exercises.exercises) ? null : null;
  if (!ctx.baseExercises.length && built) ctx.baseExercises = built;
  const custom = (ctx.state.custom || []).map((c) => ({ ...c, isCustom: true }));
  const all = ctx.baseExercises.concat(custom);
  ctx.data.exercises.exercises = all;
  ctx.data.allExercises = all;
}

const routes = [
  [/^#?\/?$/, () => viewAvui(ctx)],
  [/^#\/avui$/, () => viewAvui(ctx)],
  [/^#\/exercicis$/, () => viewExercises(ctx)],
  [/^#\/exercici\/(.+)$/, (m) => viewExerciseDetail(ctx, m[1])],
  [/^#\/sessio$/, () => viewSessio(ctx)],
  [/^#\/fitxa$/, () => viewFitxa(ctx)],
  [/^#\/pla$/, () => viewPla(ctx)],
  [/^#\/variacions$/, () => viewVariacions(ctx)],
  [/^#\/llibre$/, () => viewLlibre(ctx)],
  [/^#\/metode$/, () => viewMetode(ctx)],
  [/^#\/figures$/, () => viewFigures(ctx)],
  [/^#\/recursos$/, () => viewRecursos(ctx)],
  [/^#\/progres$/, () => viewProgres(ctx)],
];

function markNav(hash) {
  document.querySelectorAll('#nav a').forEach((a) => {
    a.classList.toggle('active', hash.startsWith(a.getAttribute('href')));
  });
}

function updateFooter() {
  const el = document.getElementById('footer-stats');
  if (!el) return;
  const st = ctx.state;
  el.textContent = `${st.log.length} sessions · ${Math.round(S.minutesTotal(st))} min · ratxa ${S.streak(st)} dies · setmana ${S.weekNumber(st)}`;
}

export function render() {
  if (ctx.cleanup) { try { ctx.cleanup(); } catch { /* noop */ } ctx.cleanup = null; }
  refreshExercises();
  const hash = location.hash || '#/avui';
  for (const [re, fn] of routes) {
    const m = hash.match(re);
    if (m) {
      try { fn(m); } catch (err) {
        document.getElementById('view').innerHTML =
          `<h1>Error en aquesta vista</h1><pre class="small">${String(err && err.stack || err)}</pre>`;
        console.error(err);
      }
      markNav(hash);
      updateFooter();
      window.scrollTo({ top: 0 });
      return;
    }
  }
  viewAvui(ctx);
}

async function boot() {
  const [exercises, figures, footnotes, method, meta, chapters, progress] = await Promise.all([
    loadJSON('data/exercises.json'),
    loadJSON('data/figures.json'),
    loadJSON('data/footnotes.json'),
    loadJSON('data/method.json'),
    loadJSON('data/meta.json'),
    loadJSON('data/chapters.json'),
    loadJSON('data/progress.json'),
  ]);

  ctx.baseExercises = (exercises && exercises.exercises) || [];
  ctx.data = {
    exercises: exercises || { exercises: [], counts: {} },
    figures: figures || { figures: [] },
    footnotes: footnotes || { notes: [] },
    method: method || { rules: { minutesPerDay: [10, 15], daysPerWeek: 6, exercisesPerWeek: 1, day1: '', days2to6: '', stepTraining: { desc: '' }, weeklyIncreaseBpm: 2, plateau: { desc: '' }, subdivision: '', yearOne: '', yearTwo: '' }, sections: [] },
    meta: meta || {},
    chapters: chapters ? { ...chapters, progress } : { progress },
  };

  ctx.state = S.loadState();
  ctx.save = () => { S.saveState(ctx.state); updateFooter(); };

  window.addEventListener('hashchange', render);
  render();
  console.log('Pràctica de guitarra a punt:', ctx.baseExercises.length, 'exercicis');
}

boot();
