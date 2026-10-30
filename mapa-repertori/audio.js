/* audio.js v2 — sintetitzador d'acords amb DURADA PER COMPÁS.
   Estil → tempo (BPM) i pulsacions per acord (compassos per defecte 1, però els
   últims acords d'una cadència ocupen més temps).
   - Ballad: 70 BPM, 8 pulsacions/acord (2 compassos de 4/4)
   - Medium Swing / Up: 160-200 BPM, 4 pulsacions/acord (1 compàs de 4/4)
   - Bossa / Even 8ths: 130 BPM, 4 pulsacions/acord
   Loop automàtic: torna a començar quan acaba. */
"use strict";

(function () {
  const SEMITONS = { C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11 };
  const QUALITATS = {
    "": [0, 4, 7], "m": [0, 3, 7], "maj7": [0, 4, 7, 11], "m7": [0, 3, 7, 10],
    "7": [0, 4, 7, 10], "m7b5": [0, 3, 6, 10], "dim7": [0, 3, 6, 9], "o7": [0, 3, 6, 9],
    "mMaj7": [0, 3, 7, 11], "6": [0, 4, 7, 9], "m6": [0, 3, 7, 9], "9": [0, 4, 7, 10, 14],
    "maj9": [0, 4, 7, 11, 14], "m9": [0, 3, 7, 10, 14], "7b9": [0, 4, 7, 10, 13], "7#9": [0, 4, 7, 10, 15],
    "7#11": [0, 4, 7, 10, 18], "7alt": [0, 4, 6, 10, 13, 15], "sus4": [0, 5, 7], "sus2": [0, 2, 7],
    "7sus4": [0, 5, 7, 10], "5": [0, 7], "add9": [0, 4, 7, 14], "madd9": [0, 3, 7, 14], "6/9": [0, 4, 7, 9, 14]
  };
  // estil -> {bpm, pulsacionsPerAcord}
  const ESTILS = {
    ballad:        { bpm: 70,  puls: 8 },
    "medium swing":{ bpm: 160, puls: 4 },
    "medium up swing": { bpm: 200, puls: 4 },
    "up tempo swing":  { bpm: 220, puls: 4 },
    bossa:         { bpm: 130, puls: 4 },
    "even 8ths":   { bpm: 140, puls: 4 },
    default:       { bpm: 160, puls: 4 }
  };

  let ctx = null, bucle = null;

  function obtenirCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function freq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  function parseAcord(text) {
    const m = String(text).trim().match(/^([A-G](?:#|b)?)(.*)$/);
    if (!m) return null;
    const base = SEMITONS[m[1]];
    if (base === undefined) return null;
    const q = m[2] || "";
    const iv = QUALITATS[q] || QUALITATS[""];
    return { base, intervals: iv };
  }

  function estilDe(text) {
    const t = String(text || "").toLowerCase();
    for (const k of Object.keys(ESTILS)) if (k !== "default" && t.includes(k)) return ESTILS[k];
    return ESTILS.default;
  }

  function tocaUnAcord(ac, acords, t0, durada) {
    const p = parseAcord(acords);
    if (!p) return;
    const midiBase = 60 + p.base;
    const notes = p.intervals.map(iv => midiBase + iv);
    notes.forEach((n, idx) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = idx === notes.length - 1 ? "triangle" : "sine";
      o.frequency.value = freq(n);
      const vol = 0.15 / (idx + 1);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol, t0 + 0.03);
      g.gain.setValueAtTime(vol, t0 + durada * 0.75);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + durada);
      o.connect(g).connect(ac.destination);
      o.start(t0); o.stop(t0 + durada + 0.05);
    });
  }

  // tocaAcord(nom|llista, opts): opts={durada, estil, loop}
  window.tocaAcord = function (nom, opts) {
    opts = opts || {};
    const ac = obtenirCtx();
    if (bucle) { clearTimeout(bucle); bucle = null; }
    const llistat = Array.isArray(nom) ? nom : [nom];
    const est = estilDe(opts.estil);
    const puls = est.puls;
    const segPerPuls = 60 / est.bpm;
    const duradaAcord = (opts.compassos || 1) * puls * segPerPuls;
    let t = ac.currentTime + 0.05;
    llistat.forEach(a => { tocaUnAcord(ac, a, t, duradaAcord); t += duradaAcord; });
    const total = t - ac.currentTime;
    if (opts.loop) {
      bucle = setTimeout(() => window.tocaAcord(nom, opts), total * 1000);
    }
    return total;
  };
  window.paraAcord = function () { if (bucle) { clearTimeout(bucle); bucle = null; } };

  // botons 🔊 per a [data-acords]
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-acords]").forEach(el => {
      if (el.querySelector(".btn-play")) return;
      const b = document.createElement("button");
      b.className = "btn-play"; b.type = "button"; b.textContent = "🔊";
      b.title = "Escolta: " + el.dataset.acords;
      b.style.cssText = "border:none;background:var(--panel2,#1f2f52);border:1px solid var(--border,#24344f);color:var(--txt,#eaf0f9);border-radius:8px;padding:3px 9px;font-size:.85rem;cursor:pointer;margin-left:6px;vertical-align:middle";
      b.onclick = () => window.tocaAcord(el.dataset.acords.split(","), {estil: el.dataset.estil});
      el.appendChild(b);
    });
  });
})();
