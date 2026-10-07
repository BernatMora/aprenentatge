"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Tipus de patró rítmic
export type RhythmPattern =
  | "swing" | "straight" | "bossa" | "shuffle" | "bembe" | "rock" | "funk"
  | "boom-chicka" | "train" | "two-step" | "honky-tonk";

// Patrons rítmics (posicions en 8 subdivisions)
const PATTERNS: Record<RhythmPattern, { kick: number[]; snare: number[]; hat: number[]; chuck: number[]; description: string; }> = {
  swing: { kick: [0, 6], snare: [3], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [], description: "Swing 4/4 - basic jazz feel" },
  straight: { kick: [0, 4], snare: [2, 6], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [], description: "8vos rectes - rock/pop" },
  bossa: { kick: [0, 4], snare: [3, 7], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [], description: "Bossa nova (clave)" },
  shuffle: { kick: [0, 6], snare: [3], hat: [0, 2, 4, 6], chuck: [], description: "Shuffle/blues" },
  bembe: { kick: [0, 2, 4, 6], snare: [3, 7], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [], description: "Bembé (latin/afro)" },
  rock: { kick: [0, 6], snare: [2, 6], hat: [0, 2, 4, 6], chuck: [], description: "Rock 4/4" },
  funk: { kick: [0, 3, 6], snare: [2, 6], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [], description: "Funk 16ths" },
  "boom-chicka": { kick: [0, 4], snare: [], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [2, 6], description: "Boom-chicka: baix en 1 i 3, acord en 2 i 4 (country clàssic)" },
  train: { kick: [0, 2, 4, 6], snare: [3, 7], hat: [0, 1, 2, 3, 4, 5, 6, 7], chuck: [2, 6], description: "Patró de tren: bombo constant, acord en 2 i 4 (bluegrass)" },
  "two-step": { kick: [0, 4], snare: [], hat: [0, 2, 4, 6], chuck: [2, 6], description: "Two-step: baix en 1 i 3, acord en 2 i 4, 8vos lleugeres" },
  "honky-tonk": { kick: [0, 6], snare: [3], hat: [0, 2, 4, 6], chuck: [2, 6], description: "Honky-tonk: shuffle country amb acord en 2 i 4" },
};

export function getPatternDescriptions(): Record<RhythmPattern, string> {
  const result: Record<string, string> = {};
  for (const k of Object.keys(PATTERNS) as RhythmPattern[]) {
    result[k] = PATTERNS[k].description;
  }
  return result as Record<RhythmPattern, string>;
}

type BackingTrackOptions = {
  bpm?: number;
  beatsPerMeasure?: number;
  pattern?: RhythmPattern;
  chordDurationBeats?: number;
};

const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};
const SEMITONE_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function extractRoot(chord: string): { root: string; quality: string } {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return { root: "C", quality: "" };
  let [, root, quality] = match;
  const flatToSharp: Record<string, string> = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
  return { root: flatToSharp[root] || root, quality };
}

function getChordNotes(root: string, quality: string): number[] {
  const rootSemi = NOTE_TO_SEMITONE[root] ?? 0;
  const rootMidi = 48 + rootSemi;
  const intervals: number[] = [0];
  if (quality.includes("maj7") || quality === "") intervals.push(4, 7, 11);
  else if (quality.includes("m7") && !quality.includes("b5")) intervals.push(3, 7, 10);
  else if (quality.includes("m7b5") || quality.includes("dim") || quality.includes("°")) intervals.push(3, 6, 10);
  else if (quality.includes("7") && !quality.includes("maj")) intervals.push(4, 7, 10);
  else if (quality.includes("m")) intervals.push(3, 7);
  else intervals.push(4, 7);
  return intervals.map((i) => rootMidi + i);
}

function getScaleNotes(root: string, quality: string): number[] {
  const rootSemi = NOTE_TO_SEMITONE[root] ?? 0;
  const rootMidi = 36 + rootSemi;
  let intervals: number[];
  if (quality.includes("m") || quality.includes("dim")) {
    intervals = quality.includes("dim") || quality.includes("b5") ? [0, 2, 3, 5, 6, 8, 10, 11] : [0, 2, 3, 5, 7, 9, 10];
  } else if (quality.includes("7") && !quality.includes("maj")) {
    intervals = [0, 2, 4, 5, 7, 9, 10, 11];
  } else {
    intervals = [0, 2, 4, 5, 7, 9, 11];
  }
  return intervals.map((i) => rootMidi + i);
}

// Línia de baix per compàs (walking bass amb approach notes)
// each beat una nota: beats 1-3 chord tones, beat 4 approach note cap al següent acord
function getWalkingBassLine(
  root: string,
  quality: string,
  beatInChord: number,
  beatsPerMeasure: number,
  nextRoot: string,
  nextQuality: string
): number {
  const scale = getScaleNotes(root, quality);
  if (scale.length === 0) return 36;
  const rootSemi = NOTE_TO_SEMITONE[root] ?? 0;
  const nextSemi = NOTE_TO_SEMITONE[nextRoot] ?? rootSemi;
  const rootMidi = 36 + rootSemi; // octava de baix

  // Chord tones (dins l'octava): root (1), 3a, 5a, 7a/6a
  // Tria 3 chord tones per als beats 1-3
  const b = Math.floor(beatInChord) % beatsPerMeasure;
  const isLastBeat = b === beatsPerMeasure - 1;

  if (isLastBeat) {
    // Beat final: approach note cap a la tònica del següent acord
    const target = 36 + nextSemi;
    // Si el següent acord és el mateix, no fem approach
    if (nextRoot === root) {
      return getScaleNotes(root, quality)[0];
    }
    // Approach cromàtic des d'una 2a o 7a per sota del target
    // Escull: si target > rootMidi, aproximem des de target-1; sinó target+1
    return target > rootMidi ? target - 1 : target + 1;
  }

  // Chord tones en 3 posicions: root, 3a, 5a
  const degreeIdx = b % 3;
  // Troba els graus 0 (root), 2 (3a), 4 (5a) dins l'escala
  const wantDegree = [0, 2, 4][degreeIdx];
  // Busca la nota de l'escala més propera al grau volgut dins l'octava
  const rootIdx = scale.indexOf(rootMidi);
  if (rootIdx === -1) {
    // Fallback: graus de l'escala propers
    const idx = Math.min(wantDegree, scale.length - 1);
    return scale[idx];
  }
  // Retorna el grau volgut (respectant octava)
  const degreeNote = scale[(rootIdx + wantDegree) % scale.length];
  // Si el grau cau per sota de rootMidi, puja una octava (nota més aguda)
  return degreeNote < rootMidi ? degreeNote + 12 : degreeNote;
}

// Nom de nota per a un MIDI (per triar el sample de baix)
function midiToNoteName(midi: number): string {
  return SEMITONE_TO_NOTE[((midi % 12) + 12) % 12];
}

export function useBackingTrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [pattern, setPattern] = useState<RhythmPattern>("boom-chicka");
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [chordDurationBeats, setChordDurationBeats] = useState(4);
  const [chordProgression, setChordProgression] = useState<string[]>([]);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  const [drumsVolume, setDrumsVolume] = useState(0.3);
  const [bassVolume, setBassVolume] = useState(0.5);
  const [padVolume, setPadVolume] = useState(0.15);
  const [chuckVolume, setChuckVolume] = useState(0.35);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const drumsGainRef = useRef<GainNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const chuckGainRef = useRef<GainNode | null>(null);
  const schedulerTimerRef = useRef<number | null>(null);
  const currentBeatRef = useRef(0);
  const currentChordRef = useRef(0);
  const chordProgressionRef = useRef<string[]>([]);

  // Samples carregats
  const samplesRef = useRef<Record<string, AudioBuffer | null>>({});
  const samplesLoadedRef = useRef(false);

  useEffect(() => {
    chordProgressionRef.current = chordProgression;
  }, [chordProgression]);

  // Carrega els samples WAV
  const loadSamples = useCallback(async (ctx: AudioContext) => {
    if (samplesLoadedRef.current) return;
    const names = ["kick", "snare", "hat"];
    for (const n of SEMITONE_TO_NOTE) names.push(`bass_${n}`);
    const base = "/samples/";
    await Promise.all(
      names.map(async (name) => {
        try {
          const res = await fetch(base + name + ".wav");
          const buf = await res.arrayBuffer();
          samplesRef.current[name] = await ctx.decodeAudioData(buf);
        } catch (e) {
          console.warn("No es pot carregar sample:", name, e);
        }
      })
    );
    samplesLoadedRef.current = true;
  }, []);

  const ensureAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      const ctx = audioContextRef.current;
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const bass = ctx.createGain();
      bass.gain.value = bassVolume;
      bass.connect(master);
      bassGainRef.current = bass;

      const drums = ctx.createGain();
      drums.gain.value = drumsVolume;
      drums.connect(master);
      drumsGainRef.current = drums;

      const pad = ctx.createGain();
      pad.gain.value = padVolume;
      pad.connect(master);
      padGainRef.current = pad;

      const chuck = ctx.createGain();
      chuck.gain.value = chuckVolume;
      chuck.connect(master);
      chuckGainRef.current = chuck;

      await loadSamples(ctx);
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, [bassVolume, drumsVolume, padVolume, chuckVolume, loadSamples]);

  useEffect(() => { if (bassGainRef.current) bassGainRef.current.gain.value = bassVolume; }, [bassVolume]);
  useEffect(() => { if (drumsGainRef.current) drumsGainRef.current.gain.value = drumsVolume; }, [drumsVolume]);
  useEffect(() => { if (padGainRef.current) padGainRef.current.gain.value = padVolume; }, [padVolume]);
  useEffect(() => { if (chuckGainRef.current) chuckGainRef.current.gain.value = chuckVolume; }, [chuckVolume]);

  const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

  // Reproductor de sample
  const playSample = useCallback((name: string, time: number, velocity: number, dest: AudioNode | null) => {
    const ctx = audioContextRef.current;
    if (!ctx || !dest) return;
    const buffer = samplesRef.current[name];
    if (!buffer) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = velocity;
    src.connect(gain);
    gain.connect(dest);
    src.start(time);
  }, []);

  // Schedule drum hit (samples reals)
  const scheduleDrum = useCallback(
    (time: number, type: "kick" | "snare" | "hat", velocity: number = 1) => {
      playSample(type, time, velocity, drumsGainRef.current);
    },
    [playSample]
  );

  // Schedule bass (sample real per nota)
  const scheduleBass = useCallback(
    (time: number, midi: number, duration: number) => {
      const name = "bass_" + midiToNoteName(midi);
      playSample(name, time, 1, bassGainRef.current);
    },
    [playSample]
  );

  // Schedule chuck (strum mut - sintetitzat, sona bé com a percussió)
  const scheduleChuck = useCallback(
    (time: number, midis: number[], velocity: number = 1) => {
      const ctx = audioContextRef.current;
      const dest = chuckGainRef.current;
      if (!ctx || !dest) return;
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 0.8;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5 * velocity, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      noise.start(time);
      noise.stop(time + 0.09);
      midis.slice(0, 3).forEach((m, i) => {
        const osc = ctx.createOscillator();
        const og = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = midiToFreq(m);
        og.gain.setValueAtTime(0.12 * velocity, time);
        og.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
        osc.connect(og);
        og.connect(dest);
        osc.start(time + i * 0.002);
        osc.stop(time + 0.07);
      });
    },
    []
  );

  // Schedule pad (sintetitzat, acord sostingut)
  const schedulePad = useCallback(
    (time: number, midis: number[], duration: number) => {
      const ctx = audioContextRef.current;
      const dest = padGainRef.current;
      if (!ctx || !dest) return;
      midis.forEach((m) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = midiToFreq(m);
        const osc2 = ctx.createOscillator();
        osc2.type = "sine";
        osc2.frequency.value = midiToFreq(m) * 2;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08, time + 0.5);
        gain.gain.setValueAtTime(0.08, time + duration - 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0, time);
        gain2.gain.linearRampToValueAtTime(0.02, time + 0.5);
        gain2.gain.setValueAtTime(0.02, time + duration - 0.3);
        gain2.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(dest);
        gain2.connect(dest);
        osc.start(time);
        osc2.start(time);
        osc.stop(time + duration);
        osc2.stop(time + duration);
      });
    },
    []
  );

  // Scheduler principal
  useEffect(() => {
    if (!isPlaying) return;
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const secondsPerBeat = 60.0 / bpm;
    const secondsPerEighth = secondsPerBeat / 2;
    const lookahead = 0.1;
    const scheduleAheadTime = 0.1;
    let nextNoteTime = ctx.currentTime + 0.05;
    currentBeatRef.current = 0;
    currentChordRef.current = 0;

    const tick = () => {
      while (nextNoteTime < ctx.currentTime + scheduleAheadTime) {
        const beat = currentBeatRef.current;
        const chordIdx = currentChordRef.current;
        const progression = chordProgressionRef.current;
        const currentChord = progression.length > 0 ? progression[chordIdx % progression.length] : "Cmaj7";

        const beatInChord = beat % chordDurationBeats;
        const eighth = Math.floor(beat * 2) % 8;

        const timeUntilClick = (nextNoteTime - ctx.currentTime) * 1000;
        const uiBeat = beat % beatsPerMeasure;
        window.setTimeout(() => {
          setCurrentBeat(uiBeat);
          if (beatInChord === 0) setCurrentChordIndex(chordIdx);
        }, Math.max(0, timeUntilClick));

        const pat = PATTERNS[pattern];
        const { root, quality } = extractRoot(currentChord);
        const chordNotes = getChordNotes(root, quality);

        if (pat.kick.includes(eighth)) scheduleDrum(nextNoteTime, "kick", eighth === 0 ? 1.0 : 0.7);
        if (pat.snare.includes(eighth)) scheduleDrum(nextNoteTime, "snare", 0.9);
        if (pat.hat.includes(eighth)) scheduleDrum(nextNoteTime, "hat", 0.6);
        if (pat.chuck.includes(eighth)) scheduleChuck(nextNoteTime, chordNotes, 0.8);

        // Walking bass per a TOTS els patrons (una nota per beat amb approach notes)
        const nextChord = progression.length > 0
          ? progression[(chordIdx + 1) % progression.length]
          : currentChord;
        const nExt = extractRoot(nextChord);
        const bassNote = getWalkingBassLine(root, quality, beatInChord, beatsPerMeasure, nExt.root, nExt.quality);
        scheduleBass(nextNoteTime, bassNote, secondsPerBeat * 0.9);

        if (beatInChord === 0) {
          schedulePad(nextNoteTime, chordNotes, secondsPerBeat * chordDurationBeats);
        }

        nextNoteTime += secondsPerEighth;
        currentBeatRef.current += 0.5;

        if (beatInChord === chordDurationBeats - 0.5) {
          if (progression.length > 0) currentChordRef.current = (chordIdx + 1) % progression.length;
        }
      }
      schedulerTimerRef.current = window.setTimeout(tick, lookahead * 1000);
    };

    tick();
    return () => {
      if (schedulerTimerRef.current !== null) {
        clearTimeout(schedulerTimerRef.current);
        schedulerTimerRef.current = null;
      }
    };
  }, [isPlaying, bpm, pattern, beatsPerMeasure, chordDurationBeats, scheduleBass, scheduleDrum, schedulePad, scheduleChuck]);

  const start = useCallback(
    async (chords?: string[]) => {
      const ctx = await ensureAudioContext();
      if (chords && chords.length > 0) {
        setChordProgression(chords);
        chordProgressionRef.current = chords;
      }
      setIsPlaying(true);
    },
    [ensureAudioContext]
  );

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(0);
    setCurrentChordIndex(0);
    if (schedulerTimerRef.current !== null) {
      clearTimeout(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) stop();
    else start();
  }, [isPlaying, start, stop]);

  return {
    isPlaying,
    bpm,
    setBpm,
    pattern,
    setPattern,
    beatsPerMeasure,
    setBeatsPerMeasure,
    chordDurationBeats,
    setChordDurationBeats,
    currentBeat,
    currentChordIndex,
    chordProgression,
    drumsVolume,
    setDrumsVolume,
    bassVolume,
    setBassVolume,
    padVolume,
    setPadVolume,
    chuckVolume,
    setChuckVolume,
    start,
    stop,
    toggle,
    patterns: PATTERNS,
  };
}
