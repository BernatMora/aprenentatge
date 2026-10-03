/* ui-session.js — sessió guiada pas a pas i fitxa per imprimir.
   La sessió segueix el pla del dia del llibre: patró → step training → extensió → registre. */
import * as S from './store.js';
import * as M from './music.js';
import { metronome } from './metronome.js';
import { patternAudio, stepsFromSystems, sequenceSeconds, midiName } from './audio.js';
import { esc, sectionBadge, fmtTime, toast } from './dom.js';

const session = { steps: {}, started: null, elapsed: 0, timer: null };

function resetSession() {
  session.steps = {};
  session.elapsed = 0;
  if (session.timer) clearInterval(session.timer);
  session.timer = null;
}

function exerciseFor(ctx) {
  const all = ctx.data.exercises.exercises;
  return all.find((e) => e.id === ctx.state.plan.activeExerciseId) || null;
}

/* ------------------------------------------------------------- sessió guiada */

export function viewSessio(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const ex = exerciseFor(ctx);
  resetSession();

  if (!ex) {
    root.innerHTML = `
      <h1>Sessió guiada</h1>
      <div class="card">
        <p class="muted">Encara no tens exercici assignat per a aquesta setmana.</p>
        <div class="card-actions">
          <a class="btn primary" href="#/pla">Tria'n un al pla anual</a>
          <a class="btn" href="#/exercicis">Veure tots els exercicis</a>
        </div>
      </div>`;
    return;
  }

  const plan = S.todayPlan(st, ctx.data.exercises.exercises);
  const pattern = ex.notes.length > 8 ? ex.notes.slice(0, 8) : ex.notes;
  const systems = M.buildSystems({ pattern, position: Number(st.settings.position) || 1, strings: st.settings.strings });
  const posWeek = plan.patternDay ? 1 : st.settings.mode === 'step' ? 1 : 1;

  const steps = [
    {
      id: 'patro',
      title: plan.patternDay ? 'Dia 1 · entén el patró' : 'Escalfament · el patró a poc a poc',
      hint: plan.patternDay
        ? 'Sense metrònom. Memoritza els dits i troba la digitació més còmoda.'
        : 'Una passada lenta i conscient, sense metrònom, per escalfar.',
      body: `<div class="tab-block"><pre>${esc(M.renderSystemLines(systems[0]).join('\n'))}</pre></div>
             <p class="muted small">Patró: <strong>${esc(M.patternHelp(pattern))}</strong>. Un dit per traste.</p>
             <div class="row" style="margin-top:.4rem">
               <button id="s-listen">🔊 Escolta el patró</button>
               <span class="muted small" id="s-listen-info">una nota per clic, amb el so real de cada traste</span>
             </div>
             <div class="notes-dots" id="s-dots"></div>`,
    },
    {
      id: 'metro',
      title: st.settings.mode === 'step'
        ? `Step training · ${plan.tempos.join(' / ')} bpm`
        : `Metrònom · ${plan.tempos[0]} bpm`,
      hint: 'Un clic per nota. Toca el patró per tot el mànec, relaxat i net.',
      body: `<div class="row">
               <button class="big primary" id="s-play">▶︎ Comença la sèrie</button>
               <span class="muted small" id="s-status">Aturat</span>
             </div>
             <div class="beats" id="s-beats">${'<span class="beat-dot"></span>'.repeat(4)}</div>
             <div class="step-list" id="s-steps">${plan.tempos.map((t) => `<span class="step-pill">${t} bpm</span>`).join('')}</div>`,
    },
    {
      id: 'extensio',
      title: 'Extensió pel mànec',
      hint: 'El llibre insisteix: cada dia, del primer traste a l\'últim i tornar.',
      body: `<div class="row">${M.POSITION_BLOCKS.map((p) => `
                 <label class="inline"><input type="checkbox" data-pos="${p}"> Posició ${M.positionLabel(p)} (${p}–${p + 3})</label>`).join('')}</div>`,
      checkboxes: true,
    },
    {
      id: 'registre',
      title: 'Registra la sessió',
      hint: 'Anota què ha costat: és el que et dirà quan toca baixar 10 bpm.',
      body: `<div class="row">
               <label class="field">Minuts <input type="number" id="s-min" value="${plan.minutes}" min="1" max="180"></label>
               <label class="field">Millor bpm <input type="number" id="s-bpm" value="${Math.max(...plan.tempos)}" min="30" max="400"></label>
               <label class="field">Sensació
                 <select id="s-feel">
                   <option value="5">5 · fàcil i net</option><option value="4" selected>4 · bé</option>
                   <option value="3">3 · just</option><option value="2">2 · tens</option><option value="1">1 · no sortia</option>
                 </select></label>
             </div>
             <label class="field" style="margin-top:.4rem">Notes <input type="text" id="s-note" placeholder="tensió al canell, canvi de corda…"></label>`,
    },
  ];

  root.innerHTML = `
  <div class="spread">
    <h1>Sessió guiada</h1>
    <span class="muted small">setmana ${plan.week} · dia ${plan.day} de 6 · <span id="s-clock">00:00</span></span>
  </div>
  <div class="card">
    <div class="spread">
      <div>
        <h2 style="margin:0">${esc(ex.title)} ${sectionBadge(ex.section)}</h2>
        <div class="muted small">${esc(ex.desc)}</div>
      </div>
      <div class="row"><a class="btn small" href="#/exercici/${ex.id}">Detall amb tab complet</a>
        <a class="btn small" href="#/fitxa">Fitxa per imprimir</a></div>
    </div>
    <div class="row" style="margin-top:.6rem">
      <div style="flex:1;background:var(--bg-3);border-radius:999px;height:10px;overflow:hidden">
        <div id="s-progress" style="width:0%;height:100%;background:var(--accent)"></div>
      </div>
      <span class="muted small" id="s-count">0/${steps.length} passos</span>
    </div>
  </div>

  <div class="stack" style="margin-top:.8rem">
    ${steps.map((s2, i) => `
      <div class="card" data-step="${s2.id}">
        <div class="spread">
          <h3 style="margin:0">${i + 1}. ${esc(s2.title)}</h3>
          <label class="inline"><input type="checkbox" data-done="${s2.id}"> fet</label>
        </div>
        <p class="muted small" style="margin:.3rem 0">${esc(s2.hint)}</p>
        ${s2.body}
      </div>`).join('')}
  </div>

  <div class="card" style="margin-top:.8rem">
    <div class="row">
      <button class="primary big" id="s-save">Desa la sessió</button>
      <span class="muted small">Es desa al progrés amb la data d'avui.</span>
    </div>
  </div>`;

  /* --------------------------------------------------------------- progrés */
  const paint = () => {
    const doneN = steps.filter((s2) => session.steps[s2.id]).length;
    root.querySelector('#s-progress').style.width = `${Math.round((doneN / steps.length) * 100)}%`;
    root.querySelector('#s-count').textContent = `${doneN}/${steps.length} passos`;
  };
  root.querySelectorAll('[data-done]').forEach((cb) => cb.addEventListener('change', () => {
    session.steps[cb.dataset.done] = cb.checked;
    paint();
    if (steps.every((s2) => session.steps[s2.id])) toast('Sessió completa. No t\'oblidis de desar-la.');
  }));
  paint();

  /* ----------------------------------------------------------- escoltar el patró */
  const listenBtn = root.querySelector('#s-listen');
  const listenInfo = root.querySelector('#s-listen-info');
  if (listenBtn) {
    listenBtn.addEventListener('click', () => {
      if (patternAudio.playing) {
        patternAudio.stop(); listenBtn.textContent = '🔊 Escolta el patró'; listenInfo.textContent = 'aturat';
        return;
      }
      const steps = stepsFromSystems([systems[0]]);
      const bpm = plan.tempos[0];
      patternAudio.setVolume(Number(st.settings.volume));
      const dots = [...root.querySelectorAll('#s-dots .note-dot')];
      root.querySelector('#s-dots').innerHTML = '<span class="note-dot"></span>'.repeat(steps.length);
      const all = [...root.querySelectorAll('#s-dots .note-dot')];
      listenBtn.textContent = '■ Atura';
      listenInfo.textContent = `${steps.length} notes · ${Math.round(sequenceSeconds(steps, bpm))} s`;
      patternAudio.play(steps, {
        bpm,
        onNote: (i, step) => {
          all.forEach((d, k) => d.classList.toggle('on', k === i));
          if (all[i]) all[i].classList.add('done');
          if (!step.rest) listenInfo.textContent = `nota ${i + 1}/${steps.length} · ${midiName(step.string, step.fret)} · corda ${M.STRING_LABELS[step.string - 1]} · traste ${step.fret}`;
        },
        onEnd: () => { listenBtn.textContent = '🔊 Escolta el patró'; listenInfo.textContent = 'seqüència acabada ✓'; },
      });
    });
  }

  /* -------------------------------------------------------------- cronòmetre */
  session.elapsed = 0;
  session.timer = setInterval(() => {
    session.elapsed++;
    const clock = root.querySelector('#s-clock');
    if (clock) clock.textContent = fmtTime(session.elapsed).slice(3);
  }, 1000);

  /* --------------------------------------------------------------- metrònom */
  const stepPills = [...root.querySelectorAll('#s-steps .step-pill')];
  const dots = [...root.querySelectorAll('#s-beats .beat-dot')];
  const playBtn = root.querySelector('#s-play');
  const status = root.querySelector('#s-status');

  playBtn.addEventListener('click', () => {
    if (metronome.playing) {
      metronome.stop();
      playBtn.textContent = '▶︎ Comença la sèrie';
      status.textContent = 'Aturat';
      return;
    }
    metronome.notesPerClick = 1;
    metronome.setVolume(Number(st.settings.volume));
    playBtn.textContent = '■ Atura';
    metronome.start({
      tempos: plan.tempos,
      clicksPerTempo: 16,
      notesPerClick: 1,
      accentEvery: 4,
      accentOffset: 0,
      countIn: 4,
      loop: false,
      onTick: ({ index, accent, countIn }) => {
        const k = index % 4;
        dots.forEach((d, i) => { d.classList.toggle('on', i === k); d.classList.toggle('accent', accent && i === k); });
        if (countIn) status.textContent = 'Compte enrere…';
      },
      onSegment: (i, seg) => {
        stepPills.forEach((p, k) => { p.classList.toggle('active', k === i); if (k < i) p.classList.add('done'); });
        status.textContent = `Tempo ${seg.bpm} bpm`;
      },
      onFinish: () => {
        playBtn.textContent = '▶︎ Comença la sèrie';
        status.textContent = 'Sèrie completada ✓';
        dots.forEach((d) => d.classList.remove('on'));
        const cb = root.querySelector('[data-done="metro"]');
        if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new window.Event('change', { bubbles: true })); }
      },
    });
  });

  /* --------------------------------------------------------------- registre */
  root.querySelector('#s-save').addEventListener('click', () => {
    S.logSession(ctx.state, {
      exerciseId: ex.id,
      minutes: Number(root.querySelector('#s-min').value) || plan.minutes,
      bestBpm: Number(root.querySelector('#s-bpm').value) || null,
      tempos: plan.tempos,
      feel: Number(root.querySelector('#s-feel').value),
      note: root.querySelector('#s-note').value.trim(),
      position: st.settings.position,
      mode: st.settings.mode,
      guided: true,
      seconds: session.elapsed,
    });
    toast('Sessió desada ✓'); window.location.hash = '#/avui';
  });

  ctx.cleanup = () => {
    metronome.stop();
    patternAudio.stop();
    if (session.timer) clearInterval(session.timer);
    session.timer = null;
  };
}

/* ---------------------------------------------------------------- fitxa */

export function viewFitxa(ctx) {
  const root = document.getElementById('view');
  const st = ctx.state;
  const ex = exerciseFor(ctx);
  if (!ex) {
    root.innerHTML = '<h1>Fitxa</h1><p class="muted">Tria un exercici al <a href="#/pla">pla anual</a>.</p>';
    return;
  }
  const plan = S.todayPlan(st, ctx.data.exercises.exercises);
  const pattern = ex.notes.length > 8 ? ex.notes.slice(0, 8) : ex.notes;
  const systems = M.buildSystems({ pattern, position: Number(st.settings.position) || 1, strings: st.settings.strings, extend: true });

  root.innerHTML = `
  <div class="spread">
    <h1>Fitxa de pràctica</h1>
    <div class="row noprint"><button class="primary" onclick="window.print()">Imprimeix</button>
      <a class="btn" href="#/sessio">Sessió guiada</a></div>
  </div>
  <p class="muted small">Setmana ${plan.week} · <strong>${esc(ex.title)}</strong> ${sectionBadge(ex.section)} · tempos d'avui:
    <strong>${plan.tempos.join(' / ')}</strong> bpm · ${plan.minutes} min · ${plan.patternDay ? 'dia de patró (sense metrònom)' : 'amb metrònom, un clic per nota'}</p>

  <div class="card">
    <h2 style="margin-top:0">Tab</h2>
    ${systems.map((sys) => `
      <div class="tab-system">
        <div class="tab-position">Posició ${M.positionLabel(sys.position)} · trastes ${sys.position}–${sys.position + 3}</div>
        <pre>${esc(M.renderSystemLines(sys).join('\n'))}</pre>
      </div>`).join('')}
    <p class="small muted">Patró de dits: ${esc(M.patternHelp(pattern))} — un dit per traste (traste = posició + dit − 1).</p>
  </div>

  <div class="grid two" style="margin-top:.8rem">
    <div class="card">
      <h2 style="margin-top:0">Pla d'avui</h2>
      <ol class="small" style="margin:.3rem 0 0 1rem;padding:0">
        <li>${plan.patternDay ? 'Entendre el patró sense metrònom.' : 'Escalfament lent del patró.'}</li>
        <li>${st.settings.mode === 'step' ? `Step training: ${plan.tempos.join(' → ')} bpm (tocar un cop, +2 bpm, repetir).` : `Tocar-ho a ${plan.tempos[0]} bpm, net i relaxat.`}</li>
        <li>Estendre-ho del traste 1 al 12 i tornar.</li>
        <li>Anotar el millor tempo i com ha anat.</li>
      </ol>
    </div>
    <div class="card">
      <h2 style="margin-top:0">Anotacions</h2>
      <table class="simple">
        <thead><tr><th>Setmana</th><th>Tempos</th><th>Sensació</th><th>Notes</th></tr></thead>
        <tbody>${[1, 2, 3, 4, 5, 6, 7].map((i) => `<tr><td>${plan.week + i - 1}</td><td style="height:1.6rem"></td><td></td><td></td></tr>`).join('')}</tbody>
      </table>
    </div>
  </div>`;
}
