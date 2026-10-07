"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type MetronomeOptions = {
  initialBpm?: number;
  initialBeatsPerMeasure?: number;
};

export function useMetronome({ initialBpm = 100, initialBeatsPerMeasure = 4 }: MetronomeOptions = {}) {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(initialBeatsPerMeasure);
  const [currentBeat, setCurrentBeat] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const beatRef = useRef(0);

  // Initialize AudioContext on first user interaction
  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Schedule a single click at a specific time
  const scheduleClick = useCallback((time: number, isAccent: boolean) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = isAccent ? 1600 : 1000;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(isAccent ? 0.4 : 0.2, time + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
  }, []);

  // Scheduler loop using lookahead
  useEffect(() => {
    if (!isPlaying) return;

    const secondsPerBeat = 60.0 / bpm;
    const lookahead = 0.1; // seconds to look ahead
    const scheduleAheadTime = 0.1;

    const ctx = ensureAudioContext();
    if (!ctx) return;

    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    beatRef.current = 0;

    const tick = () => {
      const ctxNow = ctx.currentTime;
      while (nextNoteTimeRef.current < ctxNow + scheduleAheadTime) {
        const isAccent = beatRef.current % beatsPerMeasure === 0;
        scheduleClick(nextNoteTimeRef.current, isAccent);

        // Use setTimeout to update UI beat indicator
        const beat = beatRef.current % beatsPerMeasure;
        const timeUntilClick = (nextNoteTimeRef.current - ctxNow) * 1000;
        window.setTimeout(() => {
          setCurrentBeat(beat);
        }, Math.max(0, timeUntilClick));

        nextNoteTimeRef.current += secondsPerBeat;
        beatRef.current += 1;
      }
      timerIdRef.current = window.setTimeout(tick, lookahead * 1000);
    };

    tick();

    return () => {
      if (timerIdRef.current !== null) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [isPlaying, bpm, beatsPerMeasure, scheduleClick, ensureAudioContext]);

  const start = useCallback(() => {
    ensureAudioContext();
    setIsPlaying(true);
  }, [ensureAudioContext]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(0);
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) stop();
    else start();
  }, [isPlaying, start, stop]);

  return {
    bpm,
    setBpm,
    isPlaying,
    toggle,
    stop,
    start,
    beatsPerMeasure,
    setBeatsPerMeasure,
    currentBeat,
  };
}
