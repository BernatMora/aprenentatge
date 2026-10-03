/* ui-exercise.js — llista d'exercicis i detall amb tab, metrònom i registre. */
import * as M from './music.js';
import * as S from './store.js';
import { metronome, buildStepSegments } from './metronome.js';
import { patternAudio, stepsFromSystems, sequenceSeconds, midiName } from './audio.js';
import { esc, sectionBadge, sparkline, fmtDate, fmtTime, toast, fmtMinutes } from './dom.js';

const filters = { section: 'all', q: '', pendingOnly: false };

/* ------------------------------------------------------------------- llista */

export function viewExercises(ctx) {
  const all = ctx.data.exercises.exercises;
  const mastered = new Set(ctx.state.plan.mastered.map((m) => m.exerciseId));
  const list = all.filter((e) => {
    if (filters.section !== 'all' && e.section !== filters.section) return false;
    if (filters.pendingOnly && mastered.has(e.id)) return false;
    if (filters.q) {
      const hay = `${e.title} ${e.header} ${e.notes.join(' ')} ${e.section}`.toLowerCase();
      if (!hay.includes(filters.q.toLowerCase())) return false;
    }
    return true;
  });

  const root = document.getElementById('view');
  root.innerHTML = `
    <h1>Exercicis cromàtics</h1>
    <p class="muted">${all.length} exercicis extrets de <em>Chromatic Exercises for Guitar</em> (Sam Russell, 2023):
      ${ctx.data.exercises.counts.Beginner} de Beginner, ${ctx.data.exercises.counts.Intermediate} de Intermediate
      i ${ctx.data.exercises.counts.Advanced} d'Advanced amb text al PDF.</p>
    <p class="muted small">${esc(ctx.data.exercises.rule)}</p>

    <div class="filters">
      <button data-sec="all" class="${filters.section === 'all' ? 'primary' : ''}">Tots</button>
      <button data-sec="Beginner" class="${filters.section === 'Beginner' ? 'primary' : ''}">Beginner</button>
      <button data-sec="Intermediate" class="${filters.section === 'Intermediate' ? 'primary' : ''}">Intermediate</button>
      <button data-sec="Advanced" class="${filters.section === 'Advanced' ? 'primary' : ''}">Advanced</button>
      <input type="text" id="q" placeholder="Cerca patró…" value="${esc(filters.q)}">
      <label class="inline"><input type="checkbox" id="pending" ${filters.pendingOnly ? 'checked' : ''}> Només pendents</label>
      <span class="muted small">${list.length} resultats</span>
    </div>

    <div class="stack" id="list">
      ${list.map((e) => {
        const best = S.bestBpmFor(ctx.state, e.id);
        const isActive = ctx.state.plan.activeExerciseId === e.id;
        return `<a class="item" href="#/exercici/${e.id}">
          <span class="mono" style="min-width:2.4rem;color:var(--muted)">${String(e.index).padStart(2, '0')}</span>
          ${sectionBadge(e.section)}
          <span class="grow">
            <span class="title">${esc(e.title)}</span>
            <span class="muted small"> · pàg. ${e.bookPage}${e.kind === 'advanced' ? '' : ` · ${e.notes.length} notes`}</span>
          </span>
          ${isActive ? '<span class="badge step">setmana</span>' : ''}
          ${mastered.has(e.id) ? '<span class="badge">dominat</span>' : ''}
          ${best ? `<span class="badge">${best} bpm</span>` : ''}
        </a>`;
      }).join('') || '<p class="muted">Cap resultat amb aquests filtres.</p>'}
    </div>`;

  root.querySelectorAll('[data-sec]').forEach((b) => b.addEventListener('click', () => {
    filters.section = b.dataset.sec;
    viewExercises(ctx);
  }));
  const q = root.querySelector('#q');
  q.addEventListener('input', () => { filters.q = q.value; viewExercises(ctx); q.focus(); q.setSelectionRange(q.value.length, q.value.length); });
  root.querySelector('#pending').addEventListener('change', (ev) => { filters.pendingOnly = ev.target.checked; viewExercises(ctx); });
}

/* ------------------------------------------------------------------ detall */

function currentSystems(ctx, ex, st) {
  const pattern = ex.notes.length > 8 ? ex.notes.slice(0, 8) : ex.notes;
  const cfg = ex.custom
    ? {
        position: Number(st.settings.position) || 1,
        strings: ex.custom.strings || [1, 2, 3, 4, 5, 6],
        extend: !!ex.custom.extend,
        descend: !!ex.custom.descend,
      }
    : {
        position: Number(st.settings.position) || 1,
        strings: st.settings.strings,
        extend: !!st.settings.extend,
        descend: !!st.settings.descend,
      };
  return M.buildSystems({ pattern, ...cfg });
}

function tabHTML(ctx, ex, st) {
  const systems = currentSystems(ctx, ex, st);
  const blocks = systems.map((sys) => `
    <div class="tab-system">
      <div class="tab-position">Posició ${M.positionLabel(sys.position)} · trastes ${sys.position}–${sys.position + 3}</div>
      <pre>${esc(M.renderSystemLines(sys).join('\n'))}</pre>
    </div>`).join('');
  return `<div class="tab-block">${blocks}</div>`;
}

export function viewExerciseDetail(ctx, id) {
  const ex = ctx.data.exercises.exercises.find((e) => e.id === id);
  const root = document.getElementById('view');
  if (!ex) {
    root.innerHTML = '<h1>Exercici no trobat</h1><p><a href="#/exercicis">Torna a la llista</a></p>';
    return;
  }
  const st = ctx.state;
  const systems = currentSystems(ctx, ex, st);
  const notesPerSystem = M.systemNoteCount(systems[0]);
  const plan = S.todayPlan(ctx.state, ctx.data.exercises.exercises);
  const tempos = S.todayTempos(st);
  const best = S.bestBpmFor(st, ex.id);
  const history = S.historyFor(st, ex.id);
  const warning = S.plateauWarning(st, ex.id);
  const isActive = st.plan.activeExerciseId === ex.id;

  root.innerHTML = `
  <p class="small"><a href="#/exercicis">← Tots els exercicis</a></p>
  <div class="spread">
    <h1>${esc(ex.title)} ${sectionBadge(ex.section)}</h1>
    <span class="muted small">pàg. ${ex.bookPage}</span>
  </div>
  <p class="muted">${esc(ex.desc)}</p>
  <p class="small muted">Patró de dits: <strong>${esc(M.patternHelp(ex.notes.slice(0, 8)))}</strong>
     ${best ? ` · millor: <strong>${best} bpm</strong>` : ''}
     ${isActive ? ' · <span class="badge step">exercici d\'aquesta setmana</span>' : ''}</p>

  ${warning ? `<div class="card" style="border-color:var(--warn)">
      <strong>Avis d'estancament:</strong> ${warning.last.join(', ')} bpm sense passar de ${warning.prevMax} bpm.
      El llibre diu: baixa 10 bpm i dedica 5 setmanes a tornar-hi.
      <div class="card-actions">
        <button class="primary" id="do-plateau">He baixat 10 bpm</button>
        <span class="muted small">Base actual: ${S.currentBaseBpm(st)} bpm</span>
      </div></div>` : ''}
  ${st.plan.plateau ? `<div class="card" style="border-color:var(--accent-4)">
      <strong>Recuperació activa:</strong> base ${S.currentBaseBpm(st)} bpm (−10 bpm des de ${st.plan.plateau.fromBpm} bpm).
      Objectiu: tornar-hi en 5 setmanes a +2 bpm per setmana.
      <div class="card-actions"><button id="clear-plateau">Ja he recuperat el nivell</button></div></div>` : ''}

  <div class="grid two" style="margin-top:1rem">
    <div class="card">
      <div class="spread"><h2 style="margin:0">Tab generat</h2>
        <span class="muted small">${notesPerSystem} notes per passada</span></div>
      <div class="row" style="margin:.6rem 0">
        <label class="field">Posició
          <select id="pos">
            ${[1, 2, 3, 4, 5, 7, 9, 10, 12].map((p) => `<option value="${p}" ${Number(st.settings.position) === p ? 'selected' : ''}>${M.positionLabel(p)} (${p}–${p + 3})</option>`).join('')}
          </select></label>
        ${ex.custom ? '' : `
        <label class="inline"><input type="checkbox" id="extend" ${st.settings.extend ? 'checked' : ''}> Estendre pel mànec</label>
        <label class="inline"><input type="checkbox" id="descend" ${st.settings.descend ? 'checked' : ''}> Descendent</label>`}
      </div>
      ${ex.custom ? `<p class="muted small">Variació amb cordes ${esc(M.stringsLabel(ex.custom.strings))}${ex.custom.extend ? ' · tot el mànec' : ''}${ex.custom.descend ? ' · descendent' : ''}.</p>` : `
      <div class="row" style="margin-bottom:.5rem">
        <span class="muted small">Cordes:</span>
        ${[1, 2, 3, 4, 5, 6].map((s) => `<label class="inline"><input type="checkbox" data-string="${s}" ${st.settings.strings.includes(s) ? 'checked' : ''}> ${M.STRING_LABELS[s - 1]}</label>`).join('')}
      </div>`}
      <div id="tab-host">${tabHTML(ctx, ex, st)}</div>
      <div style="margin-top:.6rem">${M.fretboardSVG(systems[systems.length - 1])}</div>
    </div>

    <div class="stack">
      <div class="metro" id="metro">
        <div class="spread">
          <div>
            <div class="metro-bpm"><span id="bpm-view">${tempos[0]}</span><small>bpm</small></div>
            <div class="muted small" id="mode-line">
              ${st.settings.mode === 'step' ? `Step training · setmana ${plan.week} · base ${S.currentBaseBpm(st)} bpm` : `Any 1 · precisió (base ${S.currentBaseBpm(st)} bpm)`}
            </div>
          </div>
          <div class="row">
            <button class="big primary" id="play">▶︎ Comença</button>
            <button id="reset">↺</button>
          </div>
        </div>

        <div class="beats" id="beats">${'<span class="beat-dot"></span>'.repeat(4)}</div>

        <div class="step-list" id="steps">
          ${tempos.map((t, i) => `<span class="step-pill" data-step="${i}">${t} bpm</span>`).join('')}
        </div>

        <div class="row" style="margin-top:.6rem">
          <button id="listen">🔊 Escolta el patró</button>
          <span class="muted small" id="listen-info">una nota per clic, amb el so real de la corda i el traste</span>
        </div>
        <div class="notes-dots" id="listen-dots"></div>

        <div class="row" style="margin-top:.5rem">
          <span class="muted small" id="status">Aturat</span>
          <span class="muted small">· <span id="nps">${metronome.nps(tempos[0]).toFixed(1)}</span> notes/s</span>
          <span class="muted small">· sessió <span id="timer">00:00</span> / ${plan.minutes} min</span>
        </div>

        <details style="margin-top:.7rem">
          <summary class="muted small">Ajustos del metrònom</summary>
          <div class="grid" style="margin-top:.5rem">
            <label class="field">Clics per tempo <input type="number" id="clicks" value="16" min="4" max="64" step="2"></label>
            <label class="field">Notes per clic
              <select id="npc">
                <option value="1" ${st.settings.notesPerClick === 1 ? 'selected' : ''}>1 (un clic per nota)</option>
                <option value="2" ${st.settings.notesPerClick === 2 ? 'selected' : ''}>2 (8es)</option>
                <option value="4" ${st.settings.notesPerClick === 4 ? 'selected' : ''}>4 (16es)</option>
              </select></label>
            <label class="field">Accent cada <input type="number" id="accent-every" value="4" min="0" max="8"></label>
            <label class="field">Desplaça l'accent <input type="number" id="accent-offset" value="0" min="0" max="7"></label>
            <label class="field">Compte enrere <input type="number" id="countin" value="4" min="0" max="8"></label>
            <label class="field">Volum <input type="range" id="vol" min="0" max="1" step="0.05" value="${st.settings.volume}"></label>
            <label class="inline"><input type="checkbox" id="loop"> Repeteix la sèrie</label>
            <label class="field">Tempos (separats per espai)
              <input type="text" id="tempos" value="${tempos.join(' ')}"></label>
          </div>
        </details>
      </div>

      <div class="card">
        <h2 style="margin-top:0">Registra la sessió</h2>
        <div class="row">
          <label class="field">Minuts <input type="number" id="log-min" value="${plan.minutes}" min="1" max="180"></label>
          <label class="field">Millor bpm <input type="number" id="log-bpm" value="${tempos[tempos.length - 1]}" min="30" max="400"></label>
          <label class="field">Sensació
            <select id="log-feel">
              <option value="5">5 · fàcil i net</option>
              <option value="4" selected>4 · bé</option>
              <option value="3">3 · just</option>
              <option value="2">2 · tens</option>
              <option value="1">1 · no sortia</option>
            </select></label>
        </div>
        <label class="field" style="margin-top:.4rem">Notes <input type="text" id="log-note" placeholder="tensió a la mà dreta, canvi de corda…"></label>
        <div class="card-actions">
          <button class="primary" id="save-log">Desa la sessió</button>
          <button id="set-week">${isActive ? 'És l\'exercici de la setmana' : 'Fes-lo l\'exercici de la setmana'}</button>
          <button id="master">Marca com a dominat</button>
        </div>
      </div>

      <div class="card">
        <h2 style="margin-top:0">Progrés</h2>
        ${sparkline(history.filter((r) => r.bestBpm).map((r, i) => ({ x: i, y: r.bestBpm })))}
        <table class="simple" style="margin-top:.5rem">
          <thead><tr><th>Data</th><th>min</th><th>bpm</th><th>Notes</th></tr></thead>
          <tbody>${history.slice(-8).reverse().map((r) => `<tr><td>${fmtDate(r.dateISO)}</td><td>${r.minutes ?? '—'}</td><td>${r.bestBpm ?? '—'}</td><td class="muted small">${esc(r.note || '')}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Sense sessions encara.</td></tr>'}</tbody>
        </table>
      </div>

      <div class="card">
        <h2 style="margin-top:0">Referència del llibre</h2>
        <p class="muted small">Pàgina ${ex.bookPage} del PDF. El tab de sobre és generat per l'app amb la regla
          «un dit per traste»; aquí tens la pàgina original per comparar-hi el dibuix.</p>
        ${ex.pageImage ? `<img class="page-img" src="${ex.pageImage}" alt="Pàgina ${ex.bookPage}" data-zoom="${ex.pageImage}" loading="lazy">` : ''}
        ${(ex.tab && ex.tab.length) ? `<details style="margin-top:.5rem"><summary class="muted small">Text extret de la pàgina</summary>
          <pre class="small" style="white-space:pre-wrap;color:var(--muted)">${esc(ex.tab.join('\n'))}</pre></details>` : ''}
      </div>
    </div>
  </div>`;

  /* ---------------------------------------------------------- interaccions */
  root.querySelector('#do-plateau')?.addEventListener('click', () => {
    S.markPlateau(ctx.state); toast('Base baixada 10 bpm. Torna-hi en 5 setmanes.');
    viewExerciseDetail(ctx, id);
  });
  root.querySelector('#clear-plateau')?.addEventListener('click', () => {
    S.clearPlateau(ctx.state); toast('Recuperació tancada.'); viewExerciseDetail(ctx, id);
  });

  const rerenderTab = () => { root.querySelector('#tab-host').innerHTML = tabHTML(ctx, ex, ctx.state); };
  root.querySelector('#pos').addEventListener('change', (e) => { ctx.state.settings.position = Number(e.target.value); ctx.save(); rerenderTab(); });
  root.querySelector('#extend')?.addEventListener('change', (e) => { ctx.state.settings.extend = e.target.checked; ctx.save(); rerenderTab(); });
  root.querySelector('#descend')?.addEventListener('change', (e) => { ctx.state.settings.descend = e.target.checked; ctx.save(); rerenderTab(); });
  root.querySelectorAll('[data-string]').forEach((cb) => cb.addEventListener('change', () => {
    const s = Number(cb.dataset.string);
    const set = new Set(ctx.state.settings.strings);
    cb.checked ? set.add(s) : set.delete(s);
    ctx.state.settings.strings = [...set].sort((a, b) => a - b);
    if (!ctx.state.settings.strings.length) { ctx.state.settings.strings = [1]; }
    ctx.save(); rerenderTab();
  }));

  /* ------------------------------------------------------------- metrònom */
  let timerInt = null, elapsed = 0;
  const stepPills = [...root.querySelectorAll('.step-pill')];
  const beatDots = [...root.querySelectorAll('.beat-dot')];
  const el = (sel) => root.querySelector(sel);
  const readTempos = () => (el('#tempos').value.match(/\d+/g) || []).map(Number).filter((n) => n > 0);
  const setActiveStep = (i) => stepPills.forEach((p, k) => {
    p.classList.toggle('active', k === i);
    if (k < i) p.classList.add('done');
  });

  const startTimer = () => {
    clearInterval(timerInt);
    timerInt = setInterval(() => { elapsed++; el('#timer').textContent = fmtTime(elapsed).slice(3); }, 1000);
  };

  el('#reset').addEventListener('click', () => {
    metronome.stop(); clearInterval(timerInt); elapsed = 0;
    el('#timer').textContent = '00:00'; el('#status').textContent = 'Aturat';
    stepPills.forEach((p) => p.classList.remove('active', 'done'));
    beatDots.forEach((d) => d.classList.remove('on'));
    el('#play').textContent = '▶︎ Comença';
  });

  el('#vol').addEventListener('input', (e) => { metronome.setVolume(Number(e.target.value)); ctx.state.settings.volume = Number(e.target.value); ctx.save(); });
  el('#npc').addEventListener('change', (e) => {
    ctx.state.settings.notesPerClick = Number(e.target.value); ctx.save();
    el('#nps').textContent = metronome.nps(readTempos()[0] || 88).toFixed(1);
  });
  el('#tempos').addEventListener('input', () => {
    const t = readTempos();
    if (t.length) { el('#nps').textContent = metronome.nps(t[0]).toFixed(1); el('#bpm-view').textContent = t[0]; }
  });

  el('#play').addEventListener('click', async () => {
    if (metronome.playing) {
      metronome.stop(); clearInterval(timerInt);
      el('#play').textContent = '▶︎ Comença'; el('#status').textContent = 'Aturat';
      return;
    }
    const temposNow = readTempos();
    if (!temposNow.length) return toast('Cal almenys un tempo.');
    metronome.notesPerClick = Number(el('#npc').value);
    metronome.setVolume(Number(el('#vol').value));
    elapsed = 0; el('#timer').textContent = '00:00';
    el('#play').textContent = '■ Atura';
    startTimer();
    metronome.start({
      tempos: temposNow,
      clicksPerTempo: Number(el('#clicks').value) || 16,
      notesPerClick: Number(el('#npc').value),
      accentEvery: Number(el('#accent-every').value),
      accentOffset: Number(el('#accent-offset').value),
      countIn: Number(el('#countin').value),
      loop: el('#loop').checked,
      onTick: ({ countIn, index, accent }) => {
        const k = index % 4;
        beatDots.forEach((d, i) => {
          d.classList.toggle('on', i === k);
          d.classList.toggle('accent', accent && i === k);
        });
        if (countIn) el('#status').textContent = 'Compte enrere…';
      },
      onSegment: (i, seg) => {
        if (i >= 0) { setActiveStep(i); el('#bpm-view').textContent = seg.bpm; el('#nps').textContent = (seg.bpm * Number(el('#npc').value) / 60).toFixed(1); }
        el('#status').textContent = `Tempo ${seg.bpm} bpm`;
      },
      onFinish: () => {
        clearInterval(timerInt);
        el('#play').textContent = '▶︎ Comença';
        el('#status').textContent = 'Sèrie completada ✓';
        beatDots.forEach((d) => d.classList.remove('on'));
        el('#log-min').value = Math.max(1, elapsed ? Math.round(elapsed / 60) : plan.minutes);
        el('#log-bpm').value = Math.max(...temposNow);
        toast('Sèrie completada. Registra la sessió.');
      },
    });
  });

  /* escoltar la seqüència: se sent el patró amb el so de cada corda i traste */
  let listenDots = [];
  const listenBtn = el('#listen');
  const listenInfo = el('#listen-info');
  const paintDots = (n) => {
    el('#listen-dots').innerHTML = '<span class="note-dot"></span>'.repeat(n);
    listenDots = [...root.querySelectorAll('.note-dot')];
  };
  listenBtn.addEventListener('click', () => {
    if (patternAudio.playing) {
      patternAudio.stop();
      listenBtn.textContent = '🔊 Escolta el patró';
      listenInfo.textContent = 'aturat';
      return;
    }
    const systems = currentSystems(ctx, ex, ctx.state);
    const steps = stepsFromSystems(systems);
    const bpm = readTempos()[0] || 88;
    patternAudio.setVolume(Number(el('#vol')?.value ?? ctx.state.settings.volume));
    paintDots(steps.length);
    listenBtn.textContent = '■ Atura';
    listenInfo.textContent = `${steps.length} notes · ${Math.round(sequenceSeconds(steps, bpm))} s a ${bpm} bpm`;
    patternAudio.play(steps, {
      bpm,
      onNote: (i, step) => {
        listenDots.forEach((d, k) => d.classList.toggle('on', k === i));
        if (listenDots[i]) listenDots[i].classList.add('done');
        if (!step.rest) {
          listenInfo.textContent = `nota ${i + 1}/${steps.length} · ${midiName(step.string, step.fret)} · `
            + `corda ${M.STRING_LABELS[step.string - 1]} · traste ${step.fret} · dit ${step.finger ? M.FINGER_NAMES[step.finger] : '—'}`;
        }
      },
      onEnd: () => {
        listenBtn.textContent = '🔊 Escolta el patró';
        listenInfo.textContent = 'seqüència acabada ✓';
        listenDots.forEach((d) => d.classList.remove('on'));
      },
    });
  });

  el('#save-log').addEventListener('click', () => {
    S.logSession(ctx.state, {
      exerciseId: ex.id,
      minutes: Number(el('#log-min').value) || plan.minutes,
      bestBpm: Number(el('#log-bpm').value) || null,
      tempos: readTempos(),
      feel: Number(el('#log-feel').value),
      note: el('#log-note').value.trim(),
      position: ctx.state.settings.position,
      mode: ctx.state.settings.mode,
    });
    toast('Sessió desada.'); viewExerciseDetail(ctx, id);
  });

  el('#set-week').addEventListener('click', () => {
    S.startWeek(ctx.state, ex.id); toast('Exercici assignat a la setmana.'); viewExerciseDetail(ctx, id);
  });
  el('#master').addEventListener('click', () => {
    S.markMastered(ctx.state, ex.id, Number(el('#log-bpm').value) || best || 0);
    toast('Marcat com a dominat.'); viewExerciseDetail(ctx, id);
  });

  /* Dreceres de teclat: amb la guitarra a les mans, la barra espaiadora mana. */
  const onKey = (ev) => {
    const tag = (ev.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    if (ev.code === 'Space') {
      ev.preventDefault();
      el('#play').click();
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
      ev.preventDefault();
      const delta = ev.key === 'ArrowUp' ? 2 : -2;
      const next = readTempos().map((t) => Math.max(30, t + delta));
      el('#tempos').value = next.join(' ');
      el('#bpm-view').textContent = next[0];
      el('#nps').textContent = metronome.nps(next[0]).toFixed(1);
      ctx.state.settings.baseBpm = Math.max(30, ctx.state.settings.baseBpm + delta);
      ctx.save();
    }
  };
  document.addEventListener('keydown', onKey);

  ctx.cleanup = () => {
    metronome.stop();
    patternAudio.stop();
    clearInterval(timerInt);
    document.removeEventListener('keydown', onKey);
  };
}
