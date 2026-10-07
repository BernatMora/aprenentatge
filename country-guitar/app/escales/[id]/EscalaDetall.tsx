"use client";

import { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Music, BookOpen, Lightbulb } from "lucide-react";
import { scales } from "@/data/scales";
import Fretboard, { generateScaleNotes, SCALE_INTERVALS, ROOT_MIDI } from "@/components/Fretboard";

const ALL_KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function EscalaDetall({ id }: { id: string }) {
  const scale = scales.find((s) => s.id === id);
  const [root, setRoot] = useState("C");
  const [showNotes, setShowNotes] = useState(true);

  const intervals = useMemo(() => SCALE_INTERVALS[id] || [], [id]);
  const rootMidi = useMemo(() => ROOT_MIDI[root], [root]);

  const fretboardNotes = useMemo(() => {
    if (!intervals.length) return [];
    return generateScaleNotes(rootMidi, intervals, 15);
  }, [intervals, rootMidi]);

  if (!scale) {
    return (
      <div className="section">
        <h1>Escala no trobada</h1>
        <p>L'escala "{id}" no existeix a la base de dades.</p>
        <Link href="/escales" className="button" style={{ marginTop: "1rem" }}>
          <ArrowLeft size={16} /> Tornar a escales
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="page-header">
        <Link href="/escales" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          <ArrowLeft size={14} /> Tornar a escales
        </Link>
        <h1>{scale.name}</h1>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <span className="badge badge-gold" style={{ fontFamily: "var(--font-mono)" }}>{scale.formula}</span>
          <span className="badge badge-copper">{scale.chordTypes.length} tipus d'acord</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>{scale.description}</p>
        </div>

        {/* Diapasó */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.25rem", margin: 0 }}>
              <Music size={18} /> Diapasó
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="filter-button"
                style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem" }}
              >
                {showNotes ? "Mostrar graus" : "Mostrar notes"}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem", color: "var(--text-muted)", fontSize: "0.8125rem" }}>
              Tonalitat:
            </div>
            <div className="filter-group" style={{ margin: 0 }}>
              {ALL_KEYS.map((k) => (
                <button
                  key={k}
                  className={`filter-button ${root === k ? "active" : ""}`}
                  onClick={() => setRoot(k)}
                  style={{ minWidth: 40, padding: "0.375rem 0.625rem" }}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <Fretboard notes={fretboardNotes} showNoteNames={showNotes} />
        </div>

        {/* Ús */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
            <BookOpen size={16} /> Quan utilitzar-la
          </h3>
          <p style={{ color: "var(--text-secondary)", margin: 0 }}>{scale.usage}</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {scale.chordTypes.map((ct) => (
              <span key={ct} className="chord-symbol">{ct}</span>
            ))}
          </div>
        </div>

        {/* Exemples */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Exemples d'artistes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {scale.examples.map((ex, i) => (
              <div key={i} className="artist-example">
                <div className="artist-example-title">
                  {ex.artist} · <em>{ex.song}</em>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                  {ex.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exercicis */}
        <div className="card">
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
            <Lightbulb size={16} /> Exercicis pràctics
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {scale.exercises.map((ex, i) => (
              <div key={i}>
                <h4 style={{ color: "var(--accent-amber)", marginBottom: "0.375rem" }}>{ex.title}</h4>
                <p style={{ color: "var(--text-secondary)", margin: "0 0 0.5rem 0" }}>{ex.description}</p>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  {ex.tips.map((tip, j) => (
                    <li key={j} style={{ marginBottom: "0.25rem" }}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
