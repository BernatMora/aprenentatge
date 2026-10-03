/* store.js — estat persistent (localStorage) + motor de pràctica del llibre.
   Regles del mètode (Sam Russell, pàg. 11-12):
     · 10-15 min/dia, 6 dies de 7
     · 1 exercici per setmana (any 1: precisió; any 2: step training)
     · step training: 3 tempos per dia, +2 bpm cada cop
     · +2 bpm a tots els tempos cada setmana
     · si t'encalles: baixa 10 bpm i torna-hi en 5 setmanes
*/

const KEY = 'practica-guitar-v1';

export function defaultState() {
  return {
    version: 1,
    settings: {
      mode: 'anual',                 // 'anual' (any 1) | 'step' (any 2)
      baseBpm: 88,
      subdivision: 'note',           // 'note' = un clic per nota | 'sixteenths' = 16es
      notesPerClick: 1,
      accent: true,
      volume: 0.45,                 // metrònom
      patternVolume: 0.28,          // escoltar les seqüències d'exercici
      position: 1,
      extend: false,
      strings: [1, 2, 3, 4, 5, 6],
      descend: false,
    },
    plan: {
      activeExerciseId: null,        // exercici de la setmana
      startISO: null,                // quan va començar la setmana 1
      week: 1,
      plateau: null,                 // { startedISO, fromBpm, dropBpm }
      mastered: [],
    },
    log: [],                         // { exerciseId, dateISO, minutes, tempos, bestBpm, feel, note }
    sessions: 0,
    resources: {},                   // enllaços marcats com a llegits
    readChapters: {},
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed, settings: { ...defaultState().settings, ...(parsed.settings || {}) }, plan: { ...defaultState().plan, ...(parsed.plan || {}) } };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* quota */ }
  return state;
}

export function exportState(state) {
  return JSON.stringify(state, null, 1);
}

export function importState(json) {
  const parsed = JSON.parse(json);
  return saveState({ ...defaultState(), ...parsed });
}

/* ------------------------------------------------------------------- càlculs */

export const todayISO = () => new Date().toISOString().slice(0, 10);

export function weekNumber(state) {
  const { startISO, week } = state.plan;
  if (!startISO) return week || 1;
  const days = (Date.now() - new Date(startISO + 'T00:00:00').getTime()) / 86400000;
  return Math.max(1, Math.floor(days / 7) + 1);
}

/** Dia de pràctica dins la setmana (0 = dia 1, que és el dia de patró). */
export function dayIndex() {
  const d = new Date().getDay();          // 0 diumenge
  return d === 0 ? 6 : d - 1;             // dilluns = 0
}

/** Tempos d'avui segons el mode. */
export function todayTempos(state) {
  const w = weekNumber(state);
  const base = currentBaseBpm(state);
  if (state.settings.mode === 'step') {
    return [base, base + 2, base + 4].map((b) => Math.round(b));
  }
  return [base];
}

/** Estancament: el llibre diu baixar 10 bpm i tornar-hi en 5 setmanes, a +2 bpm
    per setmana. Per tant el descompte es va escurçant 2 bpm cada setmana. */
export function plateauState(state) {
  const p = state.plan.plateau;
  if (!p) return null;
  const weeks = Math.max(0, Math.floor((Date.now() - new Date(p.startedISO + 'T00:00:00').getTime()) / (7 * 86400000)));
  const drop = Math.max(0, 10 - 2 * weeks);
  return { weeks, drop, weeksLeft: Math.ceil(drop / 2), fromBpm: p.fromBpm };
}

export function currentBaseBpm(state) {
  const { baseBpm } = state.settings;
  const w = weekNumber(state);
  const weekly = 2 * (w - 1);
  const pl = plateauState(state);
  const drop = pl ? pl.drop : 0;
  return Math.max(30, Math.round(baseBpm + weekly - drop));
}

/** Minuts recomanats per a avui. */
export function recommendedMinutes(state) {
  // ~1 minut per exercici del patró el dia 1; 10-15 la resta
  const d = dayIndex();
  if (state.settings.mode === 'step') return 10;
  return d === 0 ? 10 : 15;
}

export function isPatternDay() { return dayIndex() === 0; }

/** Ratxa de dies seguits amb sessió registrada.
    Si avui encara no has practicat, la ratxa d'ahir es manté (encara tens el dia). */
export function streak(state) {
  const days = new Set(state.log.map((l) => l.dateISO));
  const d = new Date();
  const iso = () => d.toISOString().slice(0, 10);
  if (!days.has(iso())) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(iso())) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function minutesTotal(state) { return state.log.reduce((a, l) => a + (l.minutes || 0), 0); }
export function minutesThisWeek(state) {
  const since = Date.now() - 7 * 86400000;
  return state.log.filter((l) => new Date(l.dateISO).getTime() >= since)
    .reduce((a, l) => a + (l.minutes || 0), 0);
}

/** Minuts practicats per dia (mapa dateISO → minuts). */
export function minutesByDay(state) {
  const out = {};
  for (const l of state.log) out[l.dateISO] = (out[l.dateISO] || 0) + (l.minutes || 0);
  return out;
}

/** Últimes N setmanes (de dilluns a diumenge) amb els minuts de cada dia. */
export function practiceCalendar(state, weeks = 12) {
  const byDay = minutesByDay(state);
  const today = new Date();
  const dow = (today.getDay() + 6) % 7;              // dilluns = 0
  const monday = new Date(today);
  monday.setDate(today.getDate() - dow);
  const rows = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() - w * 7 + d);
      const iso = day.toISOString().slice(0, 10);
      days.push({ iso, date: day, minutes: byDay[iso] || 0, future: day > today });
    }
    rows.push({ week: rows.length + 1, days, total: days.reduce((a, x) => a + x.minutes, 0) });
  }
  return rows;
}

export function bestBpmFor(state, exerciseId) {
  const rows = state.log.filter((l) => l.exerciseId === exerciseId && l.bestBpm);
  return rows.length ? Math.max(...rows.map((l) => l.bestBpm)) : null;
}

/** Historial d'un exercici ordenat per data. */
export function historyFor(state, exerciseId) {
  return state.log.filter((l) => l.exerciseId === exerciseId)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
}

/** Avís d'estancament: 3 sessions seguides sense millorar el BPM. */
export function plateauWarning(state, exerciseId) {
  const h = historyFor(state, exerciseId).filter((l) => l.bestBpm);
  if (h.length < 4) return null;
  const last = h.slice(-3).map((l) => l.bestBpm);
  const prev = h.slice(0, -3).map((l) => l.bestBpm);
  if (!prev.length) return null;
  const prevMax = Math.max(...prev);
  if (last.every((b) => b <= prevMax)) return { prevMax, last };
  return null;
}

/** Sessió d'avui resumida, per al tauler. */
export function todayPlan(state, exercises) {
  const exId = state.plan.activeExerciseId;
  const exercise = exercises.find((e) => e.id === exId) || null;
  const patternDay = isPatternDay();
  return {
    exercise,
    week: weekNumber(state),
    day: dayIndex() + 1,
    patternDay,
    tempos: todayTempos(state),
    minutes: recommendedMinutes(state),
    baseBpm: currentBaseBpm(state),
    mode: state.settings.mode,
    doneToday: state.log.some((l) => l.dateISO === todayISO() && (!exId || l.exerciseId === exId)),
  };
}

/** Registra una sessió. */
export function logSession(state, entry) {
  const full = { dateISO: todayISO(), ...entry };
  state.log.push(full);
  state.sessions = (state.sessions || 0) + 1;
  return saveState(state);
}

/** Passa de setmana (o assigna exercici nou). */
export function startWeek(state, exerciseId) {
  state.plan.activeExerciseId = exerciseId;
  state.plan.startISO = todayISO();
  state.plan.week = weekNumber(state);
  state.plan.plateau = null;
  return saveState(state);
}

/** Situa el pla a una setmana concreta (1..52) amb un exercici concret. */
export function startWeekAt(state, exerciseId, week) {
  const d = new Date();
  d.setDate(d.getDate() - (Math.max(1, week) - 1) * 7);
  state.plan.activeExerciseId = exerciseId;
  state.plan.startISO = d.toISOString().slice(0, 10);
  state.plan.week = week;
  state.plan.plateau = null;
  return saveState(state);
}

/** Pla anual: un exercici per setmana, en l'ordre del llibre. */
export function yearPlan(state, exercises, weeks = 52) {
  const current = weekNumber(state);
  const mastered = new Set(state.plan.mastered.map((m) => m.exerciseId));
  const doneWeeks = new Set(state.log.map((l) => Math.floor(
    (new Date(l.dateISO + 'T00:00:00') - new Date((state.plan.startISO || todayISO()) + 'T00:00:00')) / (7 * 86400000)) + 1));
  const out = [];
  for (let w = 1; w <= weeks; w++) {
    const ex = exercises[(w - 1) % Math.max(1, exercises.length)];
    if (!ex) break;
    out.push({
      week: w,
      exercise: ex,
      isCurrent: w === current,
      done: mastered.has(ex.id) || doneWeeks.has(w),
      best: bestBpmFor(state, ex.id),
      sessions: state.log.filter((l) => l.exerciseId === ex.id).length,
    });
  }
  return out;
}

export function markPlateau(state) {
  state.plan.plateau = { startedISO: todayISO(), fromBpm: currentBaseBpm(state), dropBpm: 10 };
  return saveState(state);
}

export function clearPlateau(state) {
  state.plan.plateau = null;
  return saveState(state);
}

export function markMastered(state, exerciseId, bpm) {
  if (!state.plan.mastered.some((m) => m.exerciseId === exerciseId)) {
    state.plan.mastered.push({ exerciseId, bpm, dateISO: todayISO() });
  }
  return saveState(state);
}

/** Proper exercici no dominat, per rotar setmanalment. */
export function nextExercise(state, exercises) {
  const mastered = new Set(state.plan.mastered.map((m) => m.exerciseId));
  const currentIdx = exercises.findIndex((e) => e.id === state.plan.activeExerciseId);
  for (let i = 1; i <= exercises.length; i++) {
    const cand = exercises[(currentIdx + i + exercises.length) % exercises.length];
    if (!mastered.has(cand.id)) return cand;
  }
  return exercises[0];
}
