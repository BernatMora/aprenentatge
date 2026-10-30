/* audio.js — sintetitzador d'acords per al curs d'harmonia avançat.
   Toca un acord amb un clic, sense dependències externes (Web Audio API).
   Nota base MIDI: Do4 = 60. Semitons des de Do: C=0, C#=1, D=2, ... */
"use strict";

(function () {
  const SEMITONS = { C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11 };

  // intervals en semitons des de l'arrel
  const QUALITATS = {
    "": [0, 4, 7], "m": [0, 3, 7], "maj7": [0, 4, 7, 11], "m7": [0, 3, 7, 10],
    "7": [0, 4, 7, 10], "m7b5": [0, 3, 6, 10], "dim7": [0, 3, 6, 9], "mMaj7": [0, 3, 7, 11],
    "6": [0, 4, 7, 9], "m6": [0, 3, 7, 9], "9": [0, 4, 7, 10, 14], "maj9": [0, 4, 7, 11, 14],
    "m9": [0, 3, 7, 10, 14], "7b9": [0, 4, 7, 10, 13], "7#9": [0, 4, 7, 10, 15], "7#11": [0, 4, 7, 10, 18],
    "7alt": [0, 4, 6, 10, 13, 15], "sus4": [0, 5, 7], "sus2": [0, 2, 7], "7sus4": [0, 5, 7, 10],
    "5": [0, 7], "add9": [0, 4, 7, 14], "madd9": [0, 3, 7, 14], "6/9": [0, 4, 7, 9, 14]
  };

  let ctx = null;

  function obtenirCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function freq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  // parseja "Nom7", "Fm6", "Bbmaj7", "C#o7"...
  function parseAcord(text) {
    const m = text.trim().match(/^([A-G](?:#|b)?)(.*)$/);
    if (!m) return null;
    const nota = m[1], qual = m[2] || "";
    const base = SEMITONS[nota];
    if (base === undefined) return null;
    let intervals = null;
    if (qual === "o7" || qual === "dim" || qual === "dim7") intervals = QUALITATS["dim7"];
    else if (qual === "ø" || qual === "ø7" || qual === "m7b5") intervals = QUALITATS["m7b5"];
    else if (QUALITATS[qual] !== undefined) intervals = QUALITATS[qual];
    else if (qual === "7alt" || qual === "alt") intervals = QUALITATS["7alt"];
    else return null;
    // inversions: "C/E"
    const parts = text.split("/");
    const baix = parts.length > 1 ? SEMITONS[parts[1].replace(/[^A-G#b]/g, "")] : null;
    return { base, intervals, baixNota: baix };
  }

  // toca un acord: nom pot ser "Dm7" o una llista ["Dm7","G7","Cmaj7"]
  window.tocaAcord = function (nom, opts) {
    opts = opts || {};
    const ac = obtenirCtx();
    const llistat = Array.isArray(nom) ? nom : [nom];
    const perAcord = opts.durada || 1.6; // segons per acord
    llistat.forEach((a, i) => {
      const p = parseAcord(a);
      if (!p) return;
      const t0 = ac.currentTime + i * perAcord * 0.85;
      const midiBase = 60 + p.base; // Do4 + nota
      const notes = p.intervals.map(iv => midiBase + iv);
      // afegir baix una octava abaix si s'indica inversió
      if (p.baixNota !== null) notes.unshift(48 + p.baixNota);
      notes.forEach((n, idx) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = idx === notes.length - 1 ? "triangle" : "sine";
        o.frequency.value = freq(n);
        const vol = 0.16 / (idx + 1);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
        g.gain.setValueAtTime(vol, t0 + perAcord * 0.7);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + perAcord);
        o.connect(g).connect(ac.destination);
        o.start(t0);
        o.stop(t0 + perAcord + 0.05);
      });
    });
    return llistat.length * perAcord * 0.85;
  };

  // afegeix botons "🔊" als elements amb data-acords="Dm7,G7,Cmaj7"
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-acords]").forEach(el => {
      const b = document.createElement("button");
      b.className = "btn-play";
      b.type = "button";
      b.textContent = "🔊";
      b.title = "Escolta: " + el.dataset.acords;
      b.style.cssText = "border:none;background:var(--panel2);border:1px solid var(--border);color:var(--txt);border-radius:8px;padding:3px 9px;font-size:.85rem;cursor:pointer;margin-left:6px;vertical-align:middle";
      b.onclick = () => window.tocaAcord(el.dataset.acords.split(","));
      el.appendChild(b);
    });
  });
})();
