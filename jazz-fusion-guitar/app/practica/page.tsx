"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Square, Volume2, Music2, Drum, Mic, Download, Trash2, Activity } from "lucide-react";
import { useMetronome } from "@/hooks/useMetronome";
import { useBackingTrack, getPatternDescriptions, type RhythmPattern } from "@/hooks/useBackingTrack";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { usePracticeTracker } from "@/hooks/usePracticeTracker";
import { progressions } from "@/data/progressions";

const ALL_KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};
const SEMITONE_TO_NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function transposeChord(chord: string, semitones: number): string {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;
  const [, root, suffix] = match;
  const flatToSharp: Record<string, string> = {
    Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#",
  };
  const sharpRoot = flatToSharp[root] || root;
  const semi = NOTE_TO_SEMITONE[sharpRoot] ?? 0;
  const newSemi = ((semi + semitones) % 12 + 12) % 12;
  return SEMITONE_TO_NOTE[newSemi] + suffix;
}

const PATTERN_LABELS = getPatternDescriptions();

export default function PracticaPage() {
  const metronome = useMetronome({ initialBpm: 100, initialBeatsPerMeasure: 4 });
  const backing = useBackingTrack();
  const recorder = useAudioRecorder();
  const tracker = usePracticeTracker();
  const [progressionId, setProgressionId] = useState<string>("");
  const [transpose, setTranspose] = useState(0);
  const [selectedChordIndex, setSelectedChordIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"metronome" | "backing">("backing");
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [logMinutes, setLogMinutes] = useState(15);
  const [logCategory, setLogCategory] = useState<"tecnic"|"escala"|"progressio"|"improvisacio"|"rutina"|"exercici"|"biblioteca"|"practica"|"altres">("practica");

  const selectedProgression = progressions.find((p) => p.id === progressionId);
  const transposedChords = selectedProgression
    ? selectedProgression.chords.map((c) => transposeChord(c, transpose))
    : [];

  // Quan canvia la progressió, actualitzar el backing track
  useEffect(() => {
    if (mode === "backing" && transposedChords.length > 0) {
      // No cal fer res, useBackingTrack ja té els acords
    }
  }, [transposedChords, mode]);

  // Quan es reprodueix, passar els acords al backing track
  const handlePlay = () => {
    if (mode === "backing") {
      if (transposedChords.length > 0) {
        backing.start(transposedChords);
      } else {
        backing.start();
      }
    } else {
      metronome.toggle();
    }
  };

  const handleStop = () => {
    if (mode === "backing") backing.stop();
    else metronome.stop();
  };

  const isPlaying = mode === "backing" ? backing.isPlaying : metronome.isPlaying;
  const currentBeat = mode === "backing" ? backing.currentBeat : metronome.currentBeat;
  const beatsPerMeasure = mode === "backing" ? backing.beatsPerMeasure : metronome.beatsPerMeasure;
  const bpm = mode === "backing" ? backing.bpm : metronome.bpm;
  const setBpm = mode === "backing" ? backing.setBpm : metronome.setBpm;
  const setBeatsPerMeasure = mode === "backing" ? backing.setBeatsPerMeasure : metronome.setBeatsPerMeasure;
  const currentChordIndex = mode === "backing" ? backing.currentChordIndex : selectedChordIndex;

  return (
    <>
      <section className="page-header">
        <h1>Sala de practica</h1>
        <p>
          Metronom o backing track generat (drums + baix + pad) per practicar amb so real.
          Tria una progressio, transporta-la a la teva tonalitat comoda i toca.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Mode selector */}
        <div className="filter-group" style={{ marginBottom: "1.5rem" }}>
          <button
            className={`filter-button ${mode === "backing" ? "active" : ""}`}
            onClick={() => {
              setMode("backing");
              metronome.stop();
            }}
          >
            <Drum size={14} style={{ marginRight: 4, verticalAlign: "middle" }} /> Backing track
          </button>
          <button
            className={`filter-button ${mode === "metronome" ? "active" : ""}`}
            onClick={() => {
              setMode("metronome");
              backing.stop();
            }}
          >
            <Volume2 size={14} style={{ marginRight: 4, verticalAlign: "middle" }} /> Metronom sol
          </button>
        </div>

        <div className="grid grid-2" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Control panel */}
          <article className="card">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.25rem", marginBottom: "1.5rem" }}>
              {mode === "backing" ? <Drum size={18} /> : <Volume2 size={18} />}
              {mode === "backing" ? "Backing track" : "Metronom"}
            </h2>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <label style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Tempo</label>
                <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent-amber)", fontFamily: "var(--font-mono)" }}>
                  {bpm}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="240"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-gold)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span>40</span>
                <span>240</span>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Beats per compas
              </label>
              <div className="filter-group" style={{ margin: 0 }}>
                {[3, 4, 5, 6, 7].map((n) => (
                  <button
                    key={n}
                    className={`filter-button ${beatsPerMeasure === n ? "active" : ""}`}
                    onClick={() => setBeatsPerMeasure(n)}
                  >
                    {n}/4
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern selector (backing track only) */}
            {mode === "backing" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  Patro ritmic
                </label>
                <div className="filter-group" style={{ margin: 0 }}>
                  {(Object.keys(PATTERN_LABELS) as RhythmPattern[]).map((p) => (
                    <button
                      key={p}
                      className={`filter-button ${backing.pattern === p ? "active" : ""}`}
                      onClick={() => backing.setPattern(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.5rem", marginBottom: 0 }}>
                  {PATTERN_LABELS[backing.pattern]}
                </p>
              </div>
            )}

            {/* Chord duration (backing track only) */}
            {mode === "backing" && transposedChords.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  Durada de cada acord: <strong style={{ color: "var(--accent-amber)" }}>{backing.chordDurationBeats} beats</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={backing.chordDurationBeats}
                  onChange={(e) => backing.setChordDurationBeats(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-gold)" }}
                />
              </div>
            )}

            {/* Beat indicator */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", justifyContent: "center" }}>
              {Array.from({ length: beatsPerMeasure }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "2px solid var(--border-default)",
                    background: currentBeat === i ? "var(--accent-amber)" : "var(--bg-tertiary)",
                    transition: "background 0.05s ease",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={handlePlay} className="button" style={{ flex: 1, justifyContent: "center" }}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                {isPlaying ? "Pausa" : "Inicia"}
              </button>
              <button onClick={handleStop} className="button button-secondary" aria-label="Atura">
                <Square size={16} />
              </button>
            </div>

            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              {mode === "backing" ? (
                <>
                  <strong style={{ color: "var(--text-secondary)" }}>♪</strong> Backing track: drums, walking bass i pad d&apos;acord. Tria una progressio per que soni.
                </>
              ) : (
                <>
                  <strong style={{ color: "var(--text-secondary)" }}>♩</strong> Clic audible de metronom. Volum maxim al sistema.
                </>
              )}
            </div>
          </article>

          {/* Play-along */}
          <article className="card">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.25rem", marginBottom: "1.5rem" }}>
              <Music2 size={18} /> Play-along
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Progressio
              </label>
              <select
                value={progressionId}
                onChange={(e) => {
                  setProgressionId(e.target.value);
                  setSelectedChordIndex(null);
                }}
                className="search-input"
              >
                <option value="">— Tria una progressio —</option>
                {progressions.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {selectedProgression && (
              <>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    Transposar (semitons): <strong style={{ color: "var(--accent-amber)" }}>{transpose > 0 ? `+${transpose}` : transpose}</strong>
                  </label>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    value={transpose}
                    onChange={(e) => setTranspose(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--accent-gold)" }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h4 style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                    Acords
                  </h4>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {transposedChords.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedChordIndex(i)}
                        className="chord-symbol"
                        style={{
                          fontSize: "1.125rem",
                          padding: "0.5rem 1rem",
                          background: currentChordIndex === i ? "var(--accent-amber)" : "var(--bg-tertiary)",
                          color: currentChordIndex === i ? "var(--text-on-accent)" : "var(--accent-amber)",
                          borderColor: currentChordIndex === i ? "var(--accent-amber)" : "var(--border-default)",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        {c}
                        {mode === "metronome" && currentBeat === 0 && i === selectedChordIndex && (
                          <span style={{
                            position: "absolute", top: -4, right: -4,
                            width: 8, height: 8, borderRadius: "50%",
                            background: "var(--accent-amber)",
                            animation: "pulse 1s ease-in-out infinite",
                          }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedProgression.suggestions[currentChordIndex ?? 0] && (
                  <div className="card" style={{ background: "var(--bg-tertiary)" }}>
                    <h4 style={{ color: "var(--accent-amber)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                      Suggeriments per a {transposedChords[currentChordIndex ?? 0]}
                    </h4>
                    {selectedProgression.suggestions[currentChordIndex ?? 0].pentatonics.length > 0 && (
                      <div style={{ marginBottom: "0.5rem" }}>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Pentatoniqes</div>
                        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                          {selectedProgression.suggestions[currentChordIndex ?? 0].pentatonics.map((p, j) => (
                            <span key={j} className="badge">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedProgression.suggestions[currentChordIndex ?? 0].triads.length > 0 && (
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Triades</div>
                        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                          {selectedProgression.suggestions[currentChordIndex ?? 0].triads.map((t, j) => (
                            <span key={j} className="badge badge-copper">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {!selectedProgression && (
              <div className="empty-state" style={{ padding: "2rem 1rem" }}>
                Tria una progressio per veure els acords i poder practicar.
              </div>
            )}
          </article>
        </div>

        {/* Enregistrament + tracker */}
        <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Enregistrament d'audio */}
          <article className="card">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "1rem" }}>
              <Mic size={18} /> Enregistra
            </h2>
            {recorder.error && (
              <div className="card" style={{ background: "rgba(214, 90, 90, 0.1)", border: "1px solid var(--color-error)", padding: "0.5rem", marginBottom: "0.75rem", color: "var(--color-error)", fontSize: "0.75rem" }}>
                {recorder.error}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              {!recorder.isRecording ? (
                <button onClick={recorder.start} className="button">
                  <Mic size={16} /> Gravar
                </button>
              ) : (
                <button onClick={recorder.stop} className="button" style={{ background: "var(--color-error)" }}>
                  <Square size={16} /> Aturar ({recorder.duration})
                </button>
              )}
              {recorder.isRecording && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-error)", animation: "pulse 1.5s ease-in-out infinite" }} />
                  <span style={{ color: "var(--color-error)", fontSize: "0.8125rem", fontWeight: 600, fontFamily: "var(--font-mono)" }}>REC</span>
                </div>
              )}
            </div>
            {recorder.audioUrl && !recorder.isRecording && (
              <div style={{ marginTop: "0.75rem" }}>
                <audio src={recorder.audioUrl} controls style={{ width: "100%", height: 32 }} />
                <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.5rem" }}>
                  <a href={recorder.audioUrl} download={`practica-${new Date().toISOString().split("T")[0]}.webm`} className="button button-secondary" style={{ fontSize: "0.75rem", padding: "0.375rem 0.625rem", textDecoration: "none" }}>
                    <Download size={12} /> Descarregar
                  </a>
                  <button onClick={recorder.clear} className="button button-secondary" style={{ fontSize: "0.75rem", padding: "0.375rem 0.625rem" }}>
                    <Trash2 size={12} /> Esborrar
                  </button>
                </div>
              </div>
            )}
          </article>

          {/* Registrar sessió */}
          <article className="card">
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "1rem" }}>
              <Activity size={18} /> Registra la sessió
            </h2>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Avui</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-amber)" }}>{tracker.stats.todayMinutes}<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> min</span></div>
              </div>
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Ratxa</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-copper)" }}>{tracker.stats.streak}<span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> dies</span></div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.375rem", alignItems: "center", flexWrap: "wrap" }}>
              <input
                type="number"
                min="5"
                max="300"
                value={logMinutes}
                onChange={(e) => setLogMinutes(Number(e.target.value))}
                style={{ width: 70, padding: "0.5rem", background: "var(--bg-tertiary)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
              />
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>min de</span>
              <select
                value={logCategory}
                onChange={(e) => setLogCategory(e.target.value as any)}
                style={{ flex: 1, minWidth: 100, padding: "0.5rem", background: "var(--bg-tertiary)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)" }}
              >
                <option value="practica">Pràctica lliure</option>
                <option value="tecnic">Tècnica</option>
                <option value="escala">Escales</option>
                <option value="progressio">Progressions</option>
                <option value="improvisacio">Improvisació</option>
                <option value="rutina">Rutina</option>
                <option value="exercici">Exercicis</option>
                <option value="biblioteca">Biblioteca</option>
                <option value="altres">Altres</option>
              </select>
              <button
                onClick={() => tracker.addSession({ minutes: logMinutes, category: logCategory })}
                className="button"
                style={{ fontSize: "0.875rem", padding: "0.5rem 0.875rem" }}
              >
                + Desar
              </button>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
