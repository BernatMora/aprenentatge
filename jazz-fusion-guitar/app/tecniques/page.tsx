"use client";

import { useState, useMemo } from "react";
import { fusionTechniques, fusionPracticeRoutines, fusionArtistApproaches } from "@/data/fusion-techniques";
import type { FusionTechnique } from "@/types/music";

type Category = "all" | "triads" | "polyChords" | "pentatonics" | "techniques";
type Difficulty = "all" | "intermediate" | "advanced" | "expert";

const categoryLabels: Record<Category, string> = {
  all: "Totes",
  triads: "Tríades",
  polyChords: "Poliacordes",
  pentatonics: "Pentatòniques",
  techniques: "Tècniques",
};

const difficultyColors: Record<string, string> = {
  intermediate: "badge-success",
  advanced: "badge-warning",
  expert: "badge-copper",
};

export default function TecniquesPage() {
  const [category, setCategory] = useState<Category>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [selected, setSelected] = useState<FusionTechnique | null>(null);

  const filtered = useMemo(() => {
    return fusionTechniques.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (difficulty !== "all" && t.difficulty !== difficulty) return false;
      return true;
    });
  }, [category, difficulty]);

  return (
    <>
      <section className="page-header">
        <h1>Tècniques</h1>
        <p>
          12 tècniques avançades de jazz fusió: tríades sobre acords, poliacordes, pentatòniques
          outside que resolen, lydian shift, divisions simètriques i més. Cadascuna amb exemples
          pràctics i el so que produeix.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="filter-group">
          {(Object.keys(categoryLabels) as Category[]).map((c) => (
            <button
              key={c}
              className={`filter-button ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {categoryLabels[c]}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {(["all", "intermediate", "advanced", "expert"] as Difficulty[]).map((d) => (
            <button
              key={d}
              className={`filter-button ${difficulty === d ? "active" : ""}`}
              onClick={() => setDifficulty(d)}
            >
              {d === "all" ? "Tots els nivells" : d}
            </button>
          ))}
        </div>

        <div className="grid grid-2">
          {filtered.map((t) => (
            <article
              key={t.id}
              className="card"
              onClick={() => setSelected(t)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0 }}>{t.name}</h3>
                <span className={`badge ${difficultyColors[t.difficulty]}`}>{t.difficulty}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", margin: "0.5rem 0" }}>
                {t.description}
              </p>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                {t.artists.slice(0, 3).map((a) => (
                  <span key={a} className="badge">{a}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Rutines de pràctica</h2>
        <p className="section-subtitle">
          Estructures guiades per dominar cada tècnica. Cadascuna indica durada, nivell i passos concrets.
        </p>
        <div className="grid grid-2">
          {fusionPracticeRoutines.map((r) => (
            <article key={r.title} className="card">
              <h3 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{r.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>{r.description}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <span className="badge badge-gold">⏱ {r.duration}</span>
                <span className={`badge ${difficultyColors[r.level]}`}>{r.level}</span>
              </div>
              <ol style={{ marginTop: "1rem", paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                {r.steps.map((s, i) => (
                  <li key={i} style={{ marginBottom: "0.25rem" }}>{s}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Estils dels mestres</h2>
        <p className="section-subtitle">
          Com cada artista integra les tècniques en el seu llenguatge propi.
        </p>
        <div className="grid grid-3">
          {fusionArtistApproaches.map((a) => (
            <article key={a.artist} className="card">
              <h3 style={{ color: "var(--accent-amber)", marginBottom: "0.75rem" }}>{a.artist}</h3>
              <h4 style={{ fontSize: "0.8125rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Característiques
              </h4>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                {a.characteristics.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <h4 style={{ fontSize: "0.8125rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Tècniques clau
              </h4>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                {a.keyTechniques.map((t) => (
                  <span key={t} className="badge badge-copper">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && <TechniqueModal technique={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function TechniqueModal({ technique, onClose }: { technique: FusionTechnique; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)", zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          maxWidth: 720, width: "100%", maxHeight: "85vh", overflow: "auto",
          background: "var(--bg-card)", border: "1px solid var(--border-default)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{technique.name}</h2>
            <span className={`badge ${difficultyColors[technique.difficulty]}`}>{technique.difficulty}</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-tertiary)", color: "var(--text-secondary)" }}>✕</button>
        </div>

        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{technique.description}</p>

        <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div><strong style={{ color: "var(--text-primary)" }}>Context:</strong> <span style={{ color: "var(--text-secondary)" }}>{technique.chordContext}</span></div>
          <div><strong style={{ color: "var(--text-primary)" }}>Aplicació:</strong> <span style={{ color: "var(--text-secondary)" }}>{technique.application}</span></div>
          <div><strong style={{ color: "var(--text-primary)" }}>So:</strong> <span style={{ color: "var(--text-secondary)" }}>{technique.sound}</span></div>
        </div>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Exemples</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {technique.examples.map((ex, i) => (
            <div key={i} className="artist-example">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                <span className="badge badge-copper">{ex.over}</span>
                <span style={{ color: "var(--text-secondary)" }}>→</span>
                <span style={{ color: "var(--accent-amber)", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>{ex.play}</span>
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>= <em>{ex.result}</em></div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Artistes associats</h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {technique.artists.map((a) => (
            <span key={a} className="badge badge-gold">{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
