/* audio.js — escoltar les seqüències d'exercici.
   Sintetitzador de corda polsada (Karplus-Strong) en WebAudio: no cal cap fitxer
   d'àudio, el patró se sent amb l'afinació estàndard a la corda i el traste reals. */

/** MIDI de cada corda a l'aire (1a corda aguda → 6a greu). */
const OPEN_MIDI = { 1: 64, 2: 59, 3: 55, 4: 50, 5: 45, 6: 40 };

/** Traste 0 = corda a l'aire; cada traste puja un semitò. */
export function midiFor(stringNo, fret) {
  return (OPEN_MIDI[stringNo] || 64) + Math.max(0, Math.round(Number(fret) || 0));
}

export function fretToFreq(stringNo, fret) {
  return 440 * Math.pow(2, (midiFor(stringNo, fret) - 69) / 12);
}

export function midiName(stringNo, fret) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const midi = midiFor(stringNo, fret);
  return `${names[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

/** Genera una corda polsada amb Karplus-Strong i la deixa a la memòria cau. */
export function pluckBuffer(ctx, freq, seconds = 1.1) {
  const sr = ctx.sampleRate;
  const n = Math.floor(seconds * sr);
  const buf = ctx.createBuffer(1, n, sr);
  const out = buf.getChannelData(0);
  const N = Math.max(2, Math.round(sr / freq));
  const delay = new Float32Array(N);
  for (let i = 0; i < N; i++) delay[i] = Math.random() * 2 - 1;
  let idx = 0;
  const damp = 0.9965;
  for (let i = 0; i < n; i++) {
    const cur = delay[idx];
    out[i] = cur;
    const next = (idx + 1) % N;
    delay[idx] = 0.5 * (cur + delay[next]) * damp;
    idx = next;
  }
  const fade = Math.min(2400, n);
  for (let i = 0; i < fade; i++) out[n - 1 - i] *= i / fade;
  return buf;
}

export class PatternAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.cache = new Map();
    this.nodes = [];
    this.timers = [];
    this.playing = false;
    this.volume = 0.28;          // el so de corda polsada suma molt: de base fluix
  }

  init() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    // limitador: quan sonen sis cordes alhora el senyal se sumaria i clipsaria
    if (this.ctx.createDynamicsCompressor) {
      this.limiter = this.ctx.createDynamicsCompressor();
      this.limiter.threshold.value = -12;
      this.limiter.knee.value = 6;
      this.limiter.ratio.value = 12;
      this.limiter.attack.value = 0.003;
      this.limiter.release.value = 0.25;
      this.master.connect(this.limiter).connect(this.ctx.destination);
    } else {
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  /** Volum 0..1, amb efecte immediat (també mentre sona). */
  setVolume(v) {
    const vol = Math.max(0, Math.min(1, Number(v) || 0));
    this.volume = vol;
    if (this.master) this.master.gain.value = vol;   // canvi en directe
    return vol;
  }

  buffer(freq) {
    const key = Math.round(freq);
    if (!this.cache.has(key)) this.cache.set(key, pluckBuffer(this.ctx, freq));
    return this.cache.get(key);
  }

  /**
   * Toca una seqüència de notes, una per clic de metrònom.
   * steps: [{ string, fret, finger }] · bpm: notes per minut
   */
  play(steps, { bpm = 88, onNote = () => {}, onEnd = () => {}, gap = 0 } = {}) {
    if (!steps || !steps.length) { onEnd(); return; }
    this.stop();
    this.init();
    if (this.ctx.state === 'suspended' && this.ctx.resume) this.ctx.resume();
    this.playing = true;

    const interval = 60 / bpm;
    const start = this.ctx.currentTime + 0.08 + gap;
    steps.forEach((step, i) => {
      const t = start + i * interval;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffer(fretToFreq(step.string, step.fret));
      const g = this.ctx.createGain();
      g.gain.value = 0.5;          // cada nota, per sota del límitador
      src.connect(g).connect(this.master);
      src.start(t);
      src.stop(t + 1.2);
      this.nodes.push(src);

      const delay = Math.max(0, (t - this.ctx.currentTime) * 1000);
      this.timers.push(setTimeout(() => {
        if (this.playing) onNote(i, step);
      }, delay));
    });

    const total = (start - this.ctx.currentTime + steps.length * interval) * 1000;
    this.timers.push(setTimeout(() => {
      this.playing = false;
      onEnd();
    }, total + 80));
  }

  stop() {
    this.playing = false;
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.nodes.forEach((n) => { try { n.stop(); } catch { /* ja aturat */ } });
    this.nodes = [];
  }
}

export const patternAudio = new PatternAudio();

/** Construeix les notes a tocar a partir dels sistemes de tab.
    Cada sistema (posició) es toca corda a corda, de la més greu a la més aguda. */
export function stepsFromSystems(systems, { pauseNotes = 2 } = {}) {
  const steps = [];
  systems.forEach((sys, si) => {
    if (si > 0) for (let i = 0; i < pauseNotes; i++) steps.push({ rest: true });
    const rows = [...sys.rows].sort((a, b) => b.stringNo - a.stringNo);   // 6a → 1a
    rows.forEach((row) => {
      if (!row.notes) return;
      row.notes.forEach((n) => steps.push({ string: row.stringNo, fret: n.fret, finger: n.finger }));
    });
  });
  return steps;
}

/** Durada estimada en segons d'una seqüència a un tempo donat. */
export function sequenceSeconds(steps, bpm) {
  return (steps.length * 60) / bpm;
}
