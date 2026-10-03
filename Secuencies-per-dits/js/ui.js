/* ui.js — vistes: avui, mètode, figures, recursos, progrés, llibre i variacions. */
import * as S from './store.js';
import * as M from './music.js';
import { metronome } from './metronome.js';
import { esc, sectionBadge, sparkline, fmtDate, fmtMinutes, fmtTime, toast, wireZoom } from './dom.js';

const planFilter = { section: 'all' };

/* -------------------------------------------------------------------- avui */

export function viewAvui(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const exercises = ctx.data.exercises.exercises;
  const plan = S.todayPlan(st, exercises);
  const restDay = S.dayIndex() === 6;
  const ex = plan.exercise;
  const week = plan.week;
  const masteredCount = st.plan.mastered.length;

  root.innerHTML = `
  <div class="spread">
    <h1>Avui</h1>
    <span class="muted small">${new Date().toLocaleDateString('ca-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
  </div>

  ${restDay ? `<div class="card" style="border-color:var(--accent-2)">
      <h2 style="margin-top:0">Dia de descans</h2>
      <p class="muted">El llibre: 6 dies de 7. Avui toca descansar (o fer-ho només si et ve de gust, sense metrònom).</p>
    </div>` : ''}

  <div class="grid two" style="margin-top:.8rem">
    <div class="card">
      <div class="spread">
        <h2 style="margin:0">Sessió d'avui</h2>
        <span class="badge ${st.settings.mode === 'step' ? 'step' : ''}">${st.settings.mode === 'step' ? 'step training' : 'any 1 · precisió'}</span>
      </div>
      ${ex ? `
        <p class="small muted" style="margin-top:.6rem">
          Setmana ${week} · dia ${plan.day} de 6 ·
          ${plan.patternDay ? '<strong>dia de patró</strong> (sense metrònom: memoritza els dits)' : 'metrònom, un clic per nota, per tot el mànec'}
        </p>
        <h3 style="margin-bottom:.2rem">${esc(ex.title)} ${sectionBadge(ex.section)}</h3>
        <p class="small muted">${esc(ex.desc)}</p>
        <p class="small">Patró: <strong>${esc(ex.notes.slice(0, 8).join('-'))}</strong> ·
          tempos d'avui: <strong>${plan.tempos.join(' / ')}</strong> bpm ·
          ${plan.minutes} min</p>
        <div class="card-actions">
          <a class="btn primary" href="#/exercici/${ex.id}">${plan.patternDay ? 'Treballa el patró' : 'Obre la sessió amb metrònom'}</a>
          <button id="next-ex">Següent exercici</button>
          ${plan.doneToday ? '<span class="badge" style="color:var(--ok);border-color:var(--ok)">fet avui ✓</span>' : ''}
        </div>`
      : `<p class="muted" style="margin-top:.6rem">Encara no tens cap exercici assignat per a aquesta setmana.</p>
         <div class="card-actions">
           <button class="primary" id="pick-first">Comença pel patró 1-2-3-4</button>
           <a class="btn" href="#/exercicis">Tria'n un</a>
         </div>`}
    </div>

    <div class="card">
      <h2 style="margin-top:0">La teva pràctica</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(110px,1fr));margin-top:.5rem">
        <div><div class="metro-bpm" style="font-size:1.8rem">${S.streak(st)}<small>dies</small></div><div class="muted small">ratxa</div></div>
        <div><div class="metro-bpm" style="font-size:1.8rem">${Math.round(S.minutesThisWeek(st))}<small>min</small></div><div class="muted small">últims 7 dies</div></div>
        <div><div class="metro-bpm" style="font-size:1.8rem">${fmtMinutes(S.minutesTotal(st))}</div><div class="muted small">en total</div></div>
        <div><div class="metro-bpm" style="font-size:1.8rem">${masteredCount}<small>/${exercises.length}</small></div><div class="muted small">dominats</div></div>
      </div>
      <div class="row" style="margin-top:.8rem">
        <label class="field">Tempo base (bpm fàcil)
          <input type="number" id="base" value="${st.settings.baseBpm}" min="30" max="300"></label>
        <label class="field">Mode
          <select id="mode">
            <option value="anual" ${st.settings.mode === 'anual' ? 'selected' : ''}>Any 1 · un exercici per setmana, precisió</option>
            <option value="step" ${st.settings.mode === 'step' ? 'selected' : ''}>Any 2 · step training (3 tempos/dia)</option>
          </select></label>
      </div>
      <p class="muted small" style="margin-top:.4rem">Base actual amb el càlcul setmanal: <strong>${S.currentBaseBpm(st)} bpm</strong>
        (setmana ${week}${st.plan.plateau ? ' · recuperació activa −10 bpm' : ''}).</p>
      <div class="card-actions"><a class="btn" href="#/metode">Llegeix el mètode</a><a class="btn" href="#/progres">Progrés</a></div>
    </div>
  </div>

  <div class="section-head"><h2>El mètode en quatre línies</h2></div>
  <div class="grid">
    <div class="card tight"><strong>10-15 min al dia</strong><p class="muted small" style="margin:.2rem 0 0">6 dies de 7, no més. Millor poc i cada dia.</p></div>
    <div class="card tight"><strong>Un exercici per setmana</strong><p class="muted small" style="margin:.2rem 0 0">Dia 1: entendre el patró. Dies 2-6: metrònom, tot el mànec.</p></div>
    <div class="card tight"><strong>Step training</strong><p class="muted small" style="margin:.2rem 0 0">Tempo fàcil, +2 bpm, +2 bpm. I cada setmana, +2 bpm a tot.</p></div>
    <div class="card tight"><strong>Si t'encalles</strong><p class="muted small" style="margin:.2rem 0 0">Baixa 10 bpm i dedica 5 setmanes a tornar-hi. Sense pressa.</p></div>
  </div>`;

  root.querySelector('#base')?.addEventListener('change', (e) => {
    st.settings.baseBpm = Number(e.target.value) || 88; ctx.save(); viewAvui(ctx);
  });
  root.querySelector('#mode')?.addEventListener('change', (e) => {
    st.settings.mode = e.target.value; ctx.save(); viewAvui(ctx);
  });
  root.querySelector('#pick-first')?.addEventListener('click', () => {
    S.startWeek(st, exercises[0].id); toast('Setmana 1 començada amb el patró 1-2-3-4.'); viewAvui(ctx);
  });
  root.querySelector('#next-ex')?.addEventListener('click', () => {
    const next = S.nextExercise(st, exercises);
    S.startWeek(st, next.id); toast(`Ara: ${next.title}`); viewAvui(ctx);
  });
}

/* ------------------------------------------------------------------ mètode */

export function viewMetode(ctx) {
  const root = document.getElementById('view');
  const m = ctx.data.method;
  const r = m.rules;
  root.innerHTML = `
  <h1>El mètode</h1>
  <p class="muted">Text i regles extrets de <em>Chromatic Exercises for Guitar</em> (pàg. 3-12). L'app aplica
    aquestes regles automàticament al càlcul de tempos i al pla setmanal.</p>

  <div class="grid two" style="margin-top:.8rem">
    <div class="card">
      <h2 style="margin-top:0">Regles que fa servir l'app</h2>
      <table class="simple">
        <tbody>
          <tr><th>Sessió</th><td>${r.minutesPerDay[0]}-${r.minutesPerDay[1]} min · ${r.daysPerWeek} dies de 7</td></tr>
          <tr><th>Ritme</th><td>${r.exercisesPerWeek} exercici per setmana</td></tr>
          <tr><th>Dia 1</th><td>${esc(r.day1)}</td></tr>
          <tr><th>Dies 2-6</th><td>${esc(r.days2to6)}</td></tr>
          <tr><th>Step training</th><td>${esc(r.stepTraining.desc)}</td></tr>
          <tr><th>Setmanal</th><td>+${r.weeklyIncreaseBpm} bpm a tots els tempos</td></tr>
          <tr><th>Estancament</th><td>${esc(r.plateau.desc)}</td></tr>
          <tr><th>Subdivisió</th><td>${esc(r.subdivision)}</td></tr>
          <tr><th>Any 1</th><td>${esc(r.yearOne)}</td></tr>
          <tr><th>Any 2</th><td>${esc(r.yearTwo)}</td></tr>
        </tbody>
      </table>
      <p class="muted small" style="margin-top:.6rem">${esc(ctx.data.exercises.rule)}</p>
    </div>
    <div class="card">
      <h2 style="margin-top:0">Les 456 variacions</h2>
      <p class="muted small">El llibre ho diu així: <em>«Do I need to play all 456 variations???»</em> — la resposta és
        que no cal tenir pressa. Treballa'n unes quantes bé i deixa la resta per quan vulguis varietat.</p>
      <div class="card-actions"><a class="btn" href="#/variacions">Constructor de variacions</a></div>
    </div>
  </div>

  <div class="section-head"><h2>Text del llibre</h2></div>
  <div class="stack">
    ${m.sections.map((s) => `
      <details class="card">
        <summary style="cursor:pointer"><strong>${esc(s.title)}</strong> <span class="muted small">· pàg. ${s.page}</span></summary>
        <div class="prose small" style="margin-top:.6rem;white-space:pre-wrap">${esc(s.text)}</div>
        <img class="page-img" style="max-width:420px;margin-top:.6rem" src="media/pages/chromatic/p${String(s.page).padStart(2, '0')}.jpg"
             alt="Pàgina ${s.page}" data-zoom="media/pages/chromatic/p${String(s.page).padStart(2, '0')}.jpg" loading="lazy">
      </details>`).join('')}
  </div>`;
  wireZoom(root);
}

/* ----------------------------------------------------------------- figures */

export function viewFigures(ctx) {
  const root = document.getElementById('view');
  const figs = ctx.data.figures.figures;
  root.innerHTML = `
  <h1>Figures del llibre</h1>
  <p class="muted">${figs.length} figures extretes del PDF <em>How to Practice Guitar - Figures</em>, amb la seva llegenda.</p>
  <div class="gallery">
    ${figs.map((f) => `
      <figure>
        <img src="${f.file}" alt="Figura ${f.number ?? ''}: ${esc(f.title)}" data-zoom="${f.file}" loading="lazy">
        <figcaption>${f.number ? `<strong>Fig. ${f.number}</strong> · ` : ''}${esc(f.ca || f.title)}
          <br><span class="muted">pàg. ${f.bookPage} ·
          <a href="${f.pageImage}" target="_blank">pàgina original</a></span></figcaption>
      </figure>`).join('')}
  </div>`;
  wireZoom(root);
}

/* ---------------------------------------------------------------- recursos */

export function viewRecursos(ctx) {
  const root = document.getElementById('view');
  const notes = ctx.data.footnotes.notes;
  const st = ctx.state;
  const links = [];
  for (const n of notes) {
    if (n.urls.length) n.urls.forEach((u) => links.push({ n: n.n, text: n.text, ca: n.ca, url: u }));
    else links.push({ n: n.n, text: n.text, ca: n.ca, url: null });
  }
  root.innerHTML = `
  <h1>Notes i enllaços</h1>
  <p class="muted">De la pàgina <em>Footnotes and Links</em> del llibre. Marca el que ja has mirat: queda desat al navegador.</p>
  <div class="stack" style="margin-top:.8rem">
    ${links.map((l) => {
      const key = l.url || `note-${l.n}`;
      const done = !!st.resources[key];
      return `<div class="item">
        <span class="mono muted" style="min-width:2rem">${l.n}</span>
        <span class="grow">
          ${l.url ? `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.url)}</a>` : esc(l.ca || l.text)}
          ${l.url ? `<div class="muted small">${esc((l.ca || l.text).replace(l.url, '').trim() || 'enllaç del llibre')}</div>` : ''}
        </span>
        <label class="inline"><input type="checkbox" data-res="${esc(key)}" ${done ? 'checked' : ''}> vist</label>
      </div>`;
    }).join('')}
  </div>`;
  root.querySelectorAll('[data-res]').forEach((cb) => cb.addEventListener('change', () => {
    st.resources[cb.dataset.res] = cb.checked; ctx.save();
  }));
}

/* ------------------------------------------------------------------ progrés */

/** Calendari de pràctica: 12 setmanes × 7 dies, amb la intensitat de cada dia. */
export function practiceHeatmap(rows) {
  const level = (m) => (m <= 0 ? 0 : m < 10 ? 1 : m < 20 ? 2 : m < 30 ? 3 : 4);
  const dows = ['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'];
  return `<div class="heatmap">
    <div class="heat-days">${dows.map((d) => `<span>${d}</span>`).join('')}</div>
    <div class="heat-weeks">
      ${rows.map((w) => `<div class="heat-week" title="setmana del ${w.days[0].date.toLocaleDateString('ca-ES', { day: 'numeric', month: 'short' })}: ${Math.round(w.total)} min">
        ${w.days.map((d) => `<span class="heat-cell l${d.future ? 'x' : level(d.minutes)}"
            title="${d.iso}: ${Math.round(d.minutes)} min"></span>`).join('')}
      </div>`).join('')}
    </div>
    <div class="heat-legend muted small">menys
      ${[0, 1, 2, 3, 4].map((l) => `<span class="heat-cell l${l}"></span>`).join('')} més</div>
  </div>`;
}

export function viewProgres(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const exercises = ctx.data.exercises.exercises;
  const withData = exercises.map((e) => ({
    e, best: S.bestBpmFor(st, e.id), n: S.historyFor(st, e.id).length,
    last: S.historyFor(st, e.id).slice(-1)[0]?.dateISO,
  })).filter((r) => r.n > 0);

  const allPoints = st.log.filter((l) => l.bestBpm).map((l, i) => ({ x: i, y: l.bestBpm }));

  root.innerHTML = `
  <h1>Progrés</h1>
  <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));margin-top:.6rem">
    <div class="card tight"><div class="metro-bpm" style="font-size:1.9rem">${st.log.length}</div><div class="muted small">sessions</div></div>
    <div class="card tight"><div class="metro-bpm" style="font-size:1.9rem">${fmtMinutes(S.minutesTotal(st))}</div><div class="muted small">temps total</div></div>
    <div class="card tight"><div class="metro-bpm" style="font-size:1.9rem">${S.streak(st)}</div><div class="muted small">dies de ratxa</div></div>
    <div class="card tight"><div class="metro-bpm" style="font-size:1.9rem">${st.plan.mastered.length}</div><div class="muted small">exercicis dominats</div></div>
  </div>

  <div class="section-head"><h2>Mapa de pràctica</h2></div>
  <div class="card">
    ${practiceHeatmap(S.practiceCalendar(st, 12))}
    <p class="muted small" style="margin:.5rem 0 0">
      Cada quadre és un dia de les últimes 12 setmanes; com més fosc, més minuts.
      El llibre en demana 6 de cada 7 dies: mira si les columnes de descans quadren.
    </p>
  </div>

  <div class="section-head"><h2>BPM al llarg del temps</h2></div>
  <div class="card">${sparkline(allPoints)}</div>

  <div class="section-head"><h2>Per exercici</h2></div>
  <div class="card">
    <table class="simple">
      <thead><tr><th>Exercici</th><th>Secció</th><th>Sessions</th><th>Millor bpm</th><th>Última</th><th></th></tr></thead>
      <tbody>
        ${withData.map((r) => `<tr>
          <td>${esc(r.e.title)}</td><td>${esc(r.e.section)}</td><td>${r.n}</td>
          <td><strong>${r.best ?? '—'}</strong></td><td>${fmtDate(r.last)}</td>
          <td><a href="#/exercici/${r.e.id}">obrir</a></td></tr>`).join('')
          || '<tr><td colspan="6" class="muted">Encara no has registrat cap sessió. Comença per <a href="#/avui">Avui</a>.</td></tr>'}
      </tbody>
    </table>
  </div>

  <div class="section-head"><h2>Còpia de seguretat</h2></div>
  <div class="card">
    <p class="muted small">Tot es desa al navegador. Exporta el JSON per no perdre l'historial (o per passar-lo a la RPi).</p>
    <div class="card-actions">
      <button id="export">Exporta JSON</button>
      <button id="import">Importa enganxant JSON</button>
      <button class="danger" id="reset">Esborra-ho tot</button>
    </div>
    <textarea id="json" rows="6" style="width:100%;margin-top:.6rem" placeholder="Enganxa aquí un JSON exportat…"></textarea>
  </div>`;

  root.querySelector('#export').addEventListener('click', () => {
    const blob = new Blob([S.exportState(st)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `practica-guitar-${S.todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  root.querySelector('#import').addEventListener('click', () => {
    try {
      const next = S.importState(root.querySelector('#json').value);
      ctx.state = next; toast('Dades importades.'); viewProgres(ctx);
    } catch { toast('JSON no vàlid.'); }
  });
  root.querySelector('#reset').addEventListener('click', () => {
    if (!confirm('Segur que vols esborrar tot l\'historial de pràctica?')) return;
    ctx.state = S.saveState(S.defaultState()); toast('Esborrat.'); viewProgres(ctx);
  });
}

/* ------------------------------------------------------------------- llibre */

/** Intercala els subapartats que anuncia el narrador («Step 2. …») dins del text. */
export function withSubsections(chapter, ctx) {
  const subs = [...(chapter.subsections || [])].sort((a, b) => a.start - b.start);
  const out = [];
  let si = 0;
  for (const p of chapter.paragraphs) {
    while (si < subs.length && subs[si].start <= p.start + 0.5) {
      out.push(`<h4 class="subhead" id="${chapter.id}-sub${si}">${esc(subs[si].ca || subs[si].en)}</h4>`);
      si++;
    }
    out.push(`<div class="para${p.ca ? '' : ' untranslated'}" data-start="${p.start}" data-end="${p.end}">
        <p class="ca">${esc(p.ca || p.en)}</p>
        <p class="en" hidden>${esc(p.en)}</p>${annotations(ctx, p.en)}</div>`);
  }
  for (; si < subs.length; si++) {
    out.push(`<h4 class="subhead">${esc(subs[si].ca || subs[si].en)}</h4>`);
  }
  return out.join('');
}

/** Anotacions d'un paràgraf del llibre: figures i notes a peu de pàgina citades.
    El narrador diu «Figure 12…» o «Footnote 3…» i aquí ho enllacem amb el material. */
export function annotations(ctx, text) {
  const out = [];
  const figs = (ctx.data.figures && ctx.data.figures.figures) || [];
  const notes = (ctx.data.footnotes && ctx.data.footnotes.notes) || [];
  for (const m of text.matchAll(/figure\s+(\d+)/gi)) {
    const f = figs.find((x) => x.number === Number(m[1]));
    if (f) out.push(`<figure class="inline-fig"><img src="${f.file}" alt="Figura ${f.number}" data-zoom="${f.file}" loading="lazy"><figcaption>Fig. ${f.number} · ${esc(f.title)}</figcaption></figure>`);
  }
  for (const m of text.matchAll(/footnote\s+(\d+)/gi)) {
    const n = notes.find((x) => x.n === Number(m[1]));
    if (n) out.push(`<span class="inline-note">Nota ${n.n}: ${esc(n.text.slice(0, 200))}${n.urls.length ? ` — <a href="${esc(n.urls[0])}" target="_blank" rel="noopener">enllaç</a>` : ''}</span>`);
  }
  return out.length ? `<span class="annotations">${out.join('')}</span>` : '';
}

export function viewLlibre(ctx) {
  const root = document.getElementById('view');
  const book = ctx.data.chapters;

  if (!book || !book.chapters || !book.chapters.length) {
    const done = book?.progress?.done?.length ?? 0;
    const total = book?.progress?.total ?? 20;
    const pct = Math.round((done / total) * 100);
    root.innerHTML = `
      <h1>El llibre</h1>
      <div class="card">
        <h2 style="margin-top:0">Transcripció en curs…</h2>
        <p class="muted">L'audiollibre de <em>How to Practice Guitar and Train Your Creativity</em> (Sam Russell, 4 h 48 min)
          s'està transcrivint amb Whisper. Quan acabi, aquí tindràs els capítols amb text, àudio sincronitzat,
          les 35 figures al seu lloc i mode <em>shadowing</em> per repetir frase per frase.</p>
        <div class="row"><strong>${done}/${total} trossos</strong>
          <div style="flex:1;background:var(--bg-3);border-radius:999px;height:8px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--accent)"></div></div>
          <span class="muted small">${pct}%</span></div>
        <p class="muted small" style="margin-top:.6rem">Mentrestant, els exercicis cromàtics i el mètode ja estan llestos:
          <a href="#/exercicis">Exercicis</a> · <a href="#/metode">Mètode</a></p>
      </div>
      <div class="section-head"><h2>Figures del llibre</h2></div>
      <p class="muted small">Les 43 figures ja estan extretes i indexades: <a href="#/figures">veure-les</a>.</p>`;
    return;
  }

  const chapters = book.chapters;
  root.innerHTML = `
  <h1>El llibre</h1>
  <p class="muted">${chapters.length} capítols transcrits de l'audiollibre de Sam Russell.
    Clica una frase per saltar-hi; activa el mode <em>shadowing</em> per repetir-la.</p>
  <div class="row" style="margin:.6rem 0">
    <label class="inline"><input type="checkbox" id="shadow"> Mode shadowing (atura't al final de la frase)</label>
    <label class="inline"><input type="checkbox" id="show-en"> Mostra també l'anglès original</label>
    <label class="field" style="max-width:150px">Velocitat
      <select id="rate"><option value="0.6">0.6×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option></select></label>
  </div>
  <details class="card" id="index" open>
    <summary style="cursor:pointer"><strong>Índex</strong>
      <span class="muted small">· ${chapters.length} capítols · ${(chapters.reduce((a, c) => a + (c.subsections || []).length, 0))} subapartats</span></summary>
    <ol class="toc">
      ${chapters.map((c, i) => `<li>
        <a href="#/llibre" data-goto="ch-${c.id}">${esc(c.title_ca || c.title)}</a>
        <span class="muted small">· ${fmtTime(c.start)}</span>
        ${(c.subsections || []).length ? `<ul>${c.subsections.map((x, j) => `<li><a href="#/llibre" data-goto="ch-${c.id}-sub${j}">${esc(x.ca || x.en)}</a></li>`).join('')}</ul>` : ''}
      </li>`).join('')}
    </ol>
  </details>

  <div class="stack">
    ${chapters.map((c, i) => `
      <div class="card" id="ch-${c.id}">
        <div class="spread">
          <h3 style="margin:0">${i + 1}. ${esc(c.title_ca || c.title)}</h3>
          <span class="muted small">${fmtTime(c.start)} · ${Math.round((c.end - c.start) / 60)} min</span>
        </div>
        <audio class="chapter-audio" preload="none" controls src="${c.audio}"></audio>
        <details class="chapter-text" data-chapter="${i}">
          <summary>Mostra el text <span class="muted small">· ${c.paragraphs.length} paràgrafs${c.words ? ` · ${c.words} paraules` : ''}</span></summary>
          <div class="transcript-slot"></div>
        </details>
      </div>`).join('')}
  </div>`;

  let shadow = false, rate = 1;

  /** Dibuixa el text d'un capítol i hi enllaça els clics (només quan es demana). */
  const paintChapter = (details) => {
    const slot = details.querySelector('.transcript-slot');
    if (!slot || slot.dataset.ready) return;
    const idx = Number(details.dataset.chapter);
    slot.innerHTML = `<div class="transcript" data-chapter="${idx}">${withSubsections(chapters[idx], ctx)}</div>`;
    slot.dataset.ready = '1';
    wireParagraphs(slot);
    wireZoom(slot);
  };

  const wireParagraphs = (scope) => {
    scope.querySelectorAll('.para').forEach((p) => {
      p.addEventListener('click', () => {
        const el = p.closest('.card').querySelector('audio');
        p.closest('.transcript').querySelectorAll('.para').forEach((o) => o.classList.remove('active'));
        p.classList.add('active');
        try { el.currentTime = Number(p.dataset.start); } catch { /* mitjà sense motor */ }
        el.playbackRate = rate;
        const played = el.play();
        if (played && played.catch) played.catch(() => toast('Prem play per escoltar aquesta frase.'));
      });
    });
  };

  root.querySelectorAll('.chapter-text').forEach((details) => {
    details.querySelector('summary').addEventListener('click', () => {
      if (!details.open) setTimeout(() => paintChapter(details), 0);
    });
  });
  if (root.querySelector('.chapter-text')) paintChapter(root.querySelector('.chapter-text'));

  root.querySelectorAll('audio').forEach((el) => {
    el.addEventListener('timeupdate', () => {
      const box = el.closest('.card').querySelector('.transcript');
      if (!box) return;
      if (!shadow) return;
      const active = box.querySelector('.para.active');
      if (active && el.currentTime >= Number(active.dataset.end)) {
        el.pause();
        const next = active.nextElementSibling;
        if (next) { next.classList.add('active'); active.classList.remove('active'); }
      }
    });
  });
  root.querySelector('#shadow').addEventListener('change', (e) => { shadow = e.target.checked; });
  root.querySelectorAll('[data-goto]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = root.querySelector(`#${a.dataset.goto}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('flash');
      setTimeout(() => target.classList.remove('flash'), 1200);
    }
  }));
  root.querySelector('#show-en').addEventListener('change', (e) => {
    root.querySelectorAll('.transcript .en').forEach((el) => { el.hidden = !e.target.checked; });
  });
  root.querySelector('#rate').addEventListener('change', (e) => {
    rate = Number(e.target.value);
    root.querySelectorAll('audio').forEach((a) => { a.playbackRate = rate; });
  });
  ctx.cleanup = () => root.querySelectorAll('audio').forEach((a) => a.pause());
}


/* --------------------------------------------------------------- pla anual */

export function viewPla(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const base = ctx.baseExercises.length ? ctx.baseExercises : ctx.data.exercises.exercises;
  const weeks = S.yearPlan(st, base, 52);
  const done = weeks.filter((w) => w.done).length;
  const currentWeek = S.weekNumber(st);
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + Math.max(0, 52 - currentWeek) * 7);

  const visible = weeks.filter((w) => planFilter.section === 'all' || w.exercise.section === planFilter.section);

  root.innerHTML = `
  <div class="spread"><h1>Pla anual</h1>
    <span class="muted small">${base.length} exercicis · 1 per setmana</span></div>
  <p class="muted">El llibre: un exercici per setmana fins a acabar-los tots (més o menys un any).
    Els exercicis es reparteixen en l'ordre del llibre: primer els 24 de Beginner, després els de pedal i finalment els avançats.</p>

  <div class="card">
    <div class="spread">
      <div>
        <strong>Setmana ${currentWeek} de 52</strong>
        <div class="muted small">${done} setmanes fetes · si continues a aquest ritme acabes cap al
          ${endDate.toLocaleDateString('ca-ES', { month: 'long', year: 'numeric' })}</div>
      </div>
      <div style="flex:1;max-width:340px">
        <div style="background:var(--bg-3);border-radius:999px;height:10px;overflow:hidden">
          <div style="width:${Math.round((done / 52) * 100)}%;height:100%;background:var(--accent)"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="filters">
    <button data-sec="all" class="${planFilter.section === 'all' ? 'primary' : ''}">Tots</button>
    <button data-sec="Beginner" class="${planFilter.section === 'Beginner' ? 'primary' : ''}">Beginner</button>
    <button data-sec="Intermediate" class="${planFilter.section === 'Intermediate' ? 'primary' : ''}">Intermediate</button>
    <button data-sec="Advanced" class="${planFilter.section === 'Advanced' ? 'primary' : ''}">Advanced</button>
    <span class="muted small">${visible.length} setmanes</span>
  </div>

  <div class="grid">
    ${visible.map((w) => `
      <div class="card tight" style="${w.isCurrent ? 'border-color:var(--accent)' : ''}">
        <div class="spread">
          <span class="mono muted small">Setmana ${w.week}</span>
          ${w.isCurrent ? '<span class="badge step">ara</span>' : w.done ? '<span class="badge" style="color:var(--ok);border-color:var(--ok)">feta</span>' : ''}
        </div>
        <div style="margin-top:.35rem"><strong>${esc(w.exercise.title)}</strong></div>
        <div class="muted small">${sectionBadge(w.exercise.section)} ${w.best ? `${w.best} bpm` : ''} ${w.sessions ? `· ${w.sessions} sessions` : ''}</div>
        <div class="card-actions">
          <a class="btn small" href="#/exercici/${w.exercise.id}">Obre</a>
          ${w.isCurrent ? '' : `<button class="ghost" data-week="${w.week}" data-ex="${w.exercise.id}">Situa-m'hi</button>`}
        </div>
      </div>`).join('')}
  </div>

  <div class="section-head"><h2>Any 2: step training</h2></div>
  <div class="card">
    <p class="muted small" style="margin:0">Quan hagis passat pels exercicis, el llibre proposa triar-ne <strong>un</strong> per a tot
      l'any com a escalfament de 10 minuts, amb <em>step training</em> (3 tempos per dia, +2 bpm cada setmana).
      Canvia el mode a <a href="#/avui">Avui</a> quan hi arribis.</p>
  </div>`;

  root.querySelectorAll('[data-sec]').forEach((b) => b.addEventListener('click', () => {
    planFilter.section = b.dataset.sec; viewPla(ctx);
  }));
  root.querySelectorAll('[data-week]').forEach((b) => b.addEventListener('click', () => {
    S.startWeekAt(st, b.dataset.ex, Number(b.dataset.week));
    toast(`Setmana ${b.dataset.week} activada.`); viewPla(ctx);
  }));
}

/* --------------------------------------------------------------- variacions */

export function viewVariacions(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const patterns = ctx.data.exercises.exercises.filter((e) => e.kind === 'permutation');
  const pid = st.variation?.patternId || patterns[0].id;
  const routeId = st.variation?.routeId || M.ROUTES[0].id;
  const descend = !!st.variation?.descend;
  const pattern = (patterns.find((p) => p.id === pid) || patterns[0]).notes;
  const { route, systems } = M.buildVariation({ pattern, routeId, descend, position: Number(st.settings.position) || 1 });

  root.innerHTML = `
  <h1>Constructor de variacions</h1>
  <p class="muted">El llibre diu que hi ha <strong>456 variacions</strong> i que no cal córrer. Aquí en pots generar
    ${M.variationCount(patterns.length)} combinant els ${patterns.length} patrons amb ${M.ROUTES.length} recorreguts i dues direccions.</p>

  <div class="card" style="margin-top:.8rem">
    <div class="row">
      <label class="field">Patró
        <select id="pat">
          ${patterns.map((p) => `<option value="${p.id}" ${p.id === pid ? 'selected' : ''}>${esc(p.title)}</option>`).join('')}
        </select></label>
      <label class="field">Recorregut
        <select id="route">
          ${M.ROUTES.map((r) => `<option value="${r.id}" ${r.id === routeId ? 'selected' : ''}>${esc(r.name)}</option>`).join('')}
        </select></label>
      <label class="inline"><input type="checkbox" id="desc" ${descend ? 'checked' : ''}> Descendent</label>
    </div>
    <p class="muted small" style="margin-top:.4rem">${esc(route.desc)}</p>
    <div id="var-host">
      ${systems.map((sys) => `<div class="tab-system">
        <div class="tab-position">Posició ${M.positionLabel(sys.position)} · cordes ${esc(M.stringsLabel(sys.strings))}</div>
        <div class="tab-block"><pre>${esc(M.renderSystemLines(sys).join('\n'))}</pre></div>
      </div>`).join('')}
      <div style="margin-top:.6rem">${M.fretboardSVG(systems[0])}</div>
    </div>
    <div class="card-actions">
      <button class="primary" id="save-var">Desa-la com a exercici propi</button>
      <span class="muted small">Apareixerà a la llista d'exercicis i podràs practicar-la amb metrònom.</span>
    </div>
  </div>`;

  const persist = () => { st.variation = { patternId: pid, routeId, descend }; ctx.save(); };
  root.querySelector('#pat').addEventListener('change', (e) => { st.variation = { ...(st.variation || {}), patternId: e.target.value }; ctx.save(); viewVariacions(ctx); });
  root.querySelector('#route').addEventListener('change', (e) => { st.variation = { ...(st.variation || {}), routeId: e.target.value }; ctx.save(); viewVariacions(ctx); });
  root.querySelector('#desc').addEventListener('change', (e) => { st.variation = { ...(st.variation || {}), descend: e.target.checked }; ctx.save(); viewVariacions(ctx); });
  root.querySelector('#save-var').addEventListener('click', () => {
    const id = `var-${Date.now().toString(36)}`;
    st.custom = st.custom || [];
    st.custom.push({
      id, title: `${patterns.find((p) => p.id === pid).title} · ${route.name}${descend ? ' (desc.)' : ''}`,
      notes: descend ? [...pattern].reverse() : pattern,
      section: 'Variació', kind: 'variation', bookPage: 14,
      pageImage: '/data/pages/chromatic/p14.jpg', tab: [],
      desc: `${route.desc} Generada amb el constructor de variacions.`,
      custom: { strings: route.opts.strings, extend: !!route.opts.extend, descend },
    });
    ctx.save(); toast('Variació desada a Exercicis.');
  });
}
