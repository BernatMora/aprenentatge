"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { scales } from "@/data/scales";
import type { Scale } from "@/types/music";

const ALL_KEYS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
  "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11,
};

const SEMITONE_TO_NOTE_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function transposeNotes(notes: string[], fromKey: string, toKey: string): string[] {
  const fromSemi = NOTE_TO_SEMITONE[fromKey];
  const toSemi = NOTE_TO_SEMITONE[toKey];
  const shift = toSemi - fromSemi;
  return notes.map((n) => {
    const semi = NOTE_TO_SEMITONE[n];
    return SEMITONE_TO_NOTE_SHARP[((semi + shift) % 12 + 12) % 12];
  });
}

export default function EscalesPage() {
  const [search, setSearch] = useState("");
  const [root, setRoot] = useState("C");

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return scales;
    return scales.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.usage.toLowerCase().includes(term) ||
        s.examples.some((e) => e.artist.toLowerCase().includes(term) || e.song.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <>
      <section className="page-header">
        <h1>Escales</h1>
        <p>
          22 escales essencials per a jazz fusió: alterada, lidia dominant, disminuïdes, hexatòniques, bebop...
          Cada escala inclou fórmula, notes, tipus d'acords on s'aplica i exercicis pràctics.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Cerca per nom, artista o cançó..."
              className="search-input"
              style={{ paddingLeft: "2.75rem" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <div style={{ marginBottom: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Tonalitat (transporta les notes visualitzades):
            </div>
            <div className="filter-group" style={{ margin: 0 }}>
              {ALL_KEYS.map((k) => (
                <button
                  key={k}
                  className={`filter-button ${root === k ? "active" : ""}`}
                  onClick={() => setRoot(k)}
                  style={{ minWidth: 44 }}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">Cap escala trobada per "{search}".</div>
        ) : (
          <div className="grid grid-2">
            {filtered.map((scale) => (
              <ScaleCard key={scale.id} scale={scale} root={root} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function ScaleCard({ scale, root }: { scale: Scale; root: string }) {
  const transposedNotes = useMemo(() => {
    // La primera nota sempre és C al fitxer original
    return transposeNotes(scale.notes, "C", root);
  }, [scale.notes, root]);

  return (
    <Link
      href={`/escales/${scale.id}`}
      className="card"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0 }}>{scale.name}</h3>
        <span className="badge badge-gold" style={{ fontFamily: "var(--font-mono)" }}>{root}</span>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
        {scale.formula}
      </div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "0.5rem 0" }}>
        {scale.description}
      </p>
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
        {transposedNotes.slice(0, 7).map((n, i) => (
          <span
            key={i}
            className="chord-symbol"
            style={{
              fontSize: "0.75rem",
              padding: "0.125rem 0.5rem",
              background: i === 0 ? "var(--accent-copper)" : "var(--bg-tertiary)",
              color: i === 0 ? "var(--text-on-accent)" : "var(--accent-amber)",
              borderColor: i === 0 ? "var(--accent-copper)" : "var(--border-default)",
            }}
          >
            {n}
          </span>
        ))}
      </div>
      <div style={{ marginTop: "0.75rem", color: "var(--text-muted)", fontSize: "0.8125rem" }}>
        Acords: {scale.chordTypes.slice(0, 2).join(", ")}
      </div>
    </Link>
  );
}
