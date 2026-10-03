/* metronome.js — metrònom WebAudio amb step training automàtic.
   El llibre insisteix: "un clic per nota". Això és el mode 'note'.
   El mode 'sixteenths' fa un clic per temps i compta 4 notes per clic. */

export function buildStepSegments(tempos, clicksPerTempo = 16, label = '') {
  return tempos.map((bpm, i) => ({ bpm, clicks: clicksPerTempo, label: label || `Tempo ${i + 1}` }));
}

export class Metronome {
  constructor() {
    this.ctx = null;
    this.playing = false;
    this.timer = null;
    this.volume = 0.6;
  }

  init() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.volume;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  setVolume(v) {
    this.volume = v;
    if (this.master) this.master.gain.value = v;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') return this.ctx.resume();
    return Promise.resolve();
  }

  /** Clic: dos oscil·ladors curts, accent més agut i més fort. */
  click(time, accent = false) {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = accent ? 1568 : 1046;
    const peak = accent ? 0.9 : 0.45;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(peak, time + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    osc.connect(g).connect(this.master);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  /**
   * start({tempos, clicksPerTempo, notesPerClick, accentEvery, accentOffset,
   *        countIn, loop, onTick, onSegment, onFinish})
   */
  start(opts) {
    this.init();
    this.resume();
    const {
      tempos = [88], clicksPerTempo = 16, notesPerClick = 1, accentEvery = 4,
      accentOffset = 0, countIn = 4, loop = false, onTick = () => {}, onSegment = () => {},
      onFinish = () => {},
    } = opts;

    this.segments = tempos.map((bpm) => ({ bpm, clicks: clicksPerTempo }));
    this.notesPerClick = notesPerClick;
    this.accentEvery = accentEvery;
    this.accentOffset = accentOffset;
    this.loop = loop;
    this.onTick = onTick;
    this.onSegment = onSegment;
    this.onFinish = onFinish;

    this.segIdx = 0;
    this.clickInSeg = 0;
    this.countInLeft = countIn;
    this.playing = true;
    this.nextTime = this.ctx.currentTime + 0.12;
    // anuncia el primer tempo de seguida perquè la UI el marqui com a actiu
    this.onSegment(0, { bpm: this.segments[0].bpm, countIn: countIn > 0, first: true });

    this.timer = setInterval(() => this.schedule(), 20);
  }

  schedule() {
    if (!this.playing) return;
    const horizon = this.ctx.currentTime + 0.12;
    let guard = 0;
    while (this.playing && this.nextTime < horizon && guard++ < 64) {
      const seg = this.segments[this.segIdx];
      if (!seg) { this.stop(true); return; }
      const interval = 60 / seg.bpm;

      if (this.countInLeft > 0) {
        const accent = this.countInLeft === 4;
        this.click(this.nextTime, accent);
        this.emitTick({ countIn: true, index: this.countInLeft - 1, accent, bpm: seg.bpm });
        this.countInLeft--;
        this.nextTime += interval;
        continue;
      }

      const i = this.clickInSeg;
      const accent = this.accentEvery > 0 && (i % this.accentEvery) === this.accentOffset;
      this.click(this.nextTime, accent);
      this.emitTick({ countIn: false, index: i, accent, bpm: seg.bpm, segment: this.segIdx });

      this.clickInSeg++;
      this.nextTime += interval;

      if (this.clickInSeg >= seg.clicks) {
        this.clickInSeg = 0;
        this.segIdx++;
        if (this.segIdx >= this.segments.length) {
          if (this.loop) { this.segIdx = 0; }
          else { const at = this.nextTime; setTimeout(() => { if (this.playing) this.stop(true); }, Math.max(0, (at - this.ctx.currentTime) * 1000)); return; }
        } else {
          const next = this.segments[this.segIdx];
          const idx = this.segIdx;
          const t = this.nextTime;
          setTimeout(() => { this.onSegment(idx, next); }, Math.max(0, (t - this.ctx.currentTime) * 1000));
        }
      }
    }
  }

  emitTick(info) {
    const delay = Math.max(0, (this.nextTime - this.ctx.currentTime) * 1000);
    setTimeout(() => { if (this.playing || info.countIn) this.onTick(info); }, delay);
  }

  stop(finished = false) {
    this.playing = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    if (finished) this.onFinish();
  }

  /** Notes per segon al tempo actual (informatiu). */
  nps(bpm) { return (bpm * this.notesPerClick) / 60; }
}

export const metronome = new Metronome();
