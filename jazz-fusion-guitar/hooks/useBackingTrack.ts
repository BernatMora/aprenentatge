"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Tipus de patró rítmic
export type RhythmPattern = "swing" | "straight" | "bossa" | "shuffle" | "bembe" | "rock" | "funk";

// Patrons rítmics (posicions en 8 subdivisions)
const PATTERNS: Record<RhythmPattern, { kick: number[]; snare: number[]; hat: number[]; description: string; }> = {
  swing: {
    kick: [0, 6],
    snare: [3],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "Swing 4/4 - basic jazz feel",
  },
  straight: {
    kick: [0, 4],
    snare: [2, 6],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "8vos rectes - rock/pop",
  },
  bossa: {
    kick: [0, 4],
    snare: [3, 7],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "Bossa nova (clave)",
  },
  shuffle: {
    kick: [0, 6],
    snare: [3],
    hat: [0, 2, 4, 6],
    description: "Shuffle/blues",
  },
  bembe: {
    kick: [0, 2, 4, 6],
    snare: [3, 7],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "Bembé (latin/afro)",
  },
  rock: {
    kick: [0, 6],
    snare: [2, 6],
    hat: [0, 2, 4, 6],
    description: "Rock 4/4",
  },
  funk: {
    kick: [0, 3, 6],
    snare: [2, 6],
    hat: [0, 1, 2, 3, 4, 5, 6, 7],
    description: "Funk 16ths",
  },
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
  chordDurationBeats?: number; // quants beats dura cada abans de canviar
};

// Notes MIDI per a les arrels d'acord (octava 3-4)
const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};
const SEMITONE_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Extreu la nota arrel d'un acord
function extractRoot(chord: string): { root: string; quality: string } {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return { root: "C", quality: "" };
  let [, root, quality] = match;
  // Normalitza bemolls
  const flatToSharp: Record<string, string> = {
    Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#",
  };
  const normalized = flatToSharp[root] || root;
  return { root: normalized, quality };
}

// Calcula les notes d'un acord (molt simplificat: només tríada + 7ma)
function getChordNotes(root: string, quality: string): number[] {
  const rootSemi = NOTE_TO_SEMITONE[root] ?? 0;
  const rootMidi = 48 + rootSemi; // C3 = 48
  const intervals: number[] = [0]; // root

  if (quality.includes("maj7") || quality === "") intervals.push(4, 7, 11);
  else if (quality.includes("m7") && !quality.includes("b5")) intervals.push(3, 7, 10);
  else if (quality.includes("m7b5") || quality.includes("dim") || quality.includes("°")) intervals.push(3, 6, 10);
  else if (quality.includes("7") && !quality.includes("maj")) intervals.push(4, 7, 10);
  else if (quality.includes("m")) intervals.push(3, 7);
  else intervals.push(4, 7); // major

  return intervals.map((i) => rootMidi + i);
}

// Notes del walking bass (escala de l'acord)
function getScaleNotes(root: string, quality: string): number[] {
  const rootSemi = NOTE_TO_SEMITONE[root] ?? 0;
  const rootMidi = 36 + rootSemi; // C2 = 36
  // Simplificat: escala dòrica per m7, mixolidi per 7, major per maj7
  let intervals: number[];
  if (quality.includes("m") || quality.includes("dim")) {
    intervals = quality.includes("dim") || quality.includes("b5")
      ? [0, 2, 3, 5, 6, 8, 10, 11]
      : [0, 2, 3, 5, 7, 9, 10];
  } else if (quality.includes("7") && !quality.includes("maj")) {
    intervals = [0, 2, 4, 5, 7, 9, 10, 11]; // mixolidi + b7
  } else {
    intervals = [0, 2, 4, 5, 7, 9, 11];
  }
  return intervals.map((i) => rootMidi + i);
}

export function useBackingTrack() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [pattern, setPattern] = useState<RhythmPattern>("swing");
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [chordDurationBeats, setChordDurationBeats] = useState(4);
  const [chordProgression, setChordProgression] = useState<string[]>([]);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const drumsGainRef = useRef<GainNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const schedulerTimerRef = useRef<number | null>(null);
  const currentBeatRef = useRef(0);
  const currentChordRef = useRef(0);
  const chordProgressionRef = useRef<string[]>([]);

  // Manté el ref sincronitzat amb l'estat
  useEffect(() => {
    chordProgressionRef.current = chordProgression;
  }, [chordProgression]);

  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      const ctx = audioContextRef.current;
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const bass = ctx.createGain();
      bass.gain.value = 0.5;
      bass.connect(master);
      bassGainRef.current = bass;

      const drums = ctx.createGain();
      drums.gain.value = 0.3;
      drums.connect(master);
      drumsGainRef.current = drums;

      const pad = ctx.createGain();
      pad.gain.value = 0.15;
      pad.connect(master);
      padGainRef.current = pad;
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Midi to freq
  const midiToFreq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

  // Schedule drum hit
  const scheduleDrum = useCallback(
    (time: number, type: "kick" | "snare" | "hat", velocity: number = 1) => {
      const ctx = audioContextRef.current;
      const dest = drumsGainRef.current;
      if (!ctx || !dest) return;

      if (type === "kick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(120, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
        gain.gain.setValueAtTime(0.8 * velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(time);
        osc.stop(time + 0.2);
      } else if (type === "snare") {
        // Noise burst
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 1000;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.4 * velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(time);
        noise.stop(time + 0.1);
      } else if (type === "hat") {
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 7000;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.15 * velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        noise.start(time);
        noise.stop(time + 0.05);
      }
    },
    []
  );

  // Schedule bass note
  const scheduleBass = useCallback(
    (time: number, midi: number, duration: number) => {
      const ctx = audioContextRef.current;
      const dest = bassGainRef.current;
      if (!ctx || !dest) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = midiToFreq(midi);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.5, time + 0.01);
      gain.gain.setValueAtTime(0.5, time + duration - 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(time);
      osc.stop(time + duration);
    },
    []
  );

  // Schedule pad (long sustained chord)
  const schedulePad = useCallback(
    (time: number, midis: number[], duration: number) => {
      const ctx = audioContextRef.current;
      const dest = padGainRef.current;
      if (!ctx || !dest) return;
      midis.forEach((m) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = midiToFreq(m);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.08, time + 0.5);
        gain.gain.setValueAtTime(0.08, time + duration - 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(time);
        osc.stop(time + duration);
      });
    },
    []
  );

  // Scheduler principal
  useEffect(() => {
    if (!isPlaying) return;

    const ctx = ensureAudioContext();
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

        // Update UI beat indicator
        const timeUntilClick = (nextNoteTime - ctx.currentTime) * 1000;
        const uiBeat = beat % beatsPerMeasure;
        window.setTimeout(() => {
          setCurrentBeat(uiBeat);
          if (beatInChord === 0) {
            setCurrentChordIndex(chordIdx);
          }
        }, Math.max(0, timeUntilClick));

        // Schedule drums (per cada 8è)
        const pat = PATTERNS[pattern];
        if (pat.kick.includes(eighth)) scheduleDrum(nextNoteTime, "kick", eighth === 0 ? 1.0 : 0.7);
        if (pat.snare.includes(eighth)) scheduleDrum(nextNoteTime, "snare", 0.9);
        if (pat.hat.includes(eighth)) scheduleDrum(nextNoteTime, "hat", 0.6);

        // Schedule bass on beats 1 and 3
        if (beatInChord === 0 || beatInChord === Math.floor(beatsPerMeasure / 2)) {
          const { root, quality } = extractRoot(currentChord);
          const rootMidi = 36 + (NOTE_TO_SEMITONE[root] ?? 0);
          scheduleBass(nextNoteTime, rootMidi, secondsPerBeat * 2);
        }

        // Schedule pad on chord change
        if (beatInChord === 0) {
          const { root, quality } = extractRoot(currentChord);
          const notes = getChordNotes(root, quality);
          schedulePad(nextNoteTime, notes, secondsPerBeat * chordDurationBeats);
        }

        // Avança
        nextNoteTime += secondsPerEighth;
        currentBeatRef.current += 0.5;

        // Canvi d'acord
        if (beatInChord === chordDurationBeats - 0.5) {
          if (progression.length > 0) {
            currentChordRef.current = (chordIdx + 1) % progression.length;
          }
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
  }, [isPlaying, bpm, pattern, beatsPerMeasure, chordDurationBeats, ensureAudioContext, scheduleBass, scheduleDrum, schedulePad]);

  const start = useCallback(
    (chords?: string[]) => {
      ensureAudioContext();
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
    start,
    stop,
    toggle,
    patterns: PATTERNS,
  };
}
