"use client";

import { useState, useMemo } from "react";
import { harmonicSubstitutions } from "@/data/substitutions";
import { chordsData } from "@/data/chords";

export default function SubstitucionsPage() {
  const [activeTab, setActiveTab] = useState<"principles" | "chords">("principles");

  return (
    <>
      <section className="page-header">
        <h1>Substitucions i reharmonització</h1>
        <p>
          Eines per variar la harmonia d&apos;una progressió sense canviar-ne l&apos;estructura.
          Des de la clàssica substitució de tritó fins a reharmonitzacions avançades.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="tabs">
          <button className={`tab ${activeTab === "principles" ? "active" : ""}`} onClick={() => setActiveTab("principles")}>
            Principis i tècniques
          </button>
          <button className={`tab ${activeTab === "chords" ? "active" : ""}`} onClick={() => setActiveTab("chords")}>
            Catàleg d&apos;acords ({chordsData.length})
          </button>
        </div>

        {activeTab === "principles" && <PrinciplesView />}
        {activeTab === "chords" && <ChordsView />}
      </section>
    </>
  );
}

function PrinciplesView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {harmonicSubstitutions.map((s) => (
        <article key={s.id} className="card">
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-amber)", margin: 0 }}>{s.name}</h3>
            <span className="badge badge-copper">{s.type}</span>
          </div>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>{s.description}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span className="chord-symbol" style={{ fontSize: "1rem" }}>{s.original}</span>
            <span style={{ color: "var(--text-muted)" }}>→</span>
            <span className="chord-symbol" style={{ fontSize: "1rem", background: "var(--accent-copper)", color: "var(--text-on-accent)" }}>{s.substitution}</span>
          </div>

          <div className="card" style={{ background: "var(--bg-tertiary)", marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span className="badge">Original: <code style={{ marginLeft: 4 }}>{s.example.progression}</code></span>
              <span className="badge badge-info">Substituït: <code style={{ marginLeft: 4 }}>{s.example.substituted}</code></span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
              {s.example.context}
            </p>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>Teoria:</strong> {s.theory}
          </p>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
            <strong style={{ color: "var(--text-primary)" }}>So:</strong> <em>{s.soundDescription}</em>
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.375rem" }}>Casos d&apos;ús</div>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                {s.useCases.map((u, i) => (
                  <li key={i} style={{ marginBottom: "0.2rem" }}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.375rem" }}>Artistes</div>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                {s.artists.map((a) => (
                  <span key={a} className="badge badge-gold">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ChordsView() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return chordsData;
    return chordsData.filter(
      (c) =>
        c.chord.symbol.toLowerCase().includes(term) ||
        c.chord.fullName.toLowerCase().includes(term) ||
        c.pentatonics.some((p) => p.pentatonic.toLowerCase().includes(term)) ||
        c.triads.some((t) => t.triad.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <>
      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Cerca per acord, pentatònica o tríade..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtered.map((c, i) => (
          <article key={i} className="card">
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <span className="chord-symbol" style={{ fontSize: "1.125rem", padding: "0.375rem 0.75rem" }}>
                {c.chord.symbol}
              </span>
              <span style={{ color: "var(--text-secondary)" }}>{c.chord.fullName}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginLeft: "auto", fontFamily: "var(--font-mono)" }}>
                {c.chord.notes.join(" - ")}
              </span>
            </div>

            {c.chord.extensions.length > 0 && (
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {c.chord.extensions.map((ext) => (
                  <span key={ext} className="badge badge-info">{ext}</span>
                ))}
              </div>
            )}

            <details style={{ marginTop: "0.5rem" }}>
              <summary style={{ cursor: "pointer", color: "var(--accent-amber)", fontSize: "0.9375rem", fontWeight: 500 }}>
                Pentatòniques i tríades ({c.pentatonics.length + c.triads.length})
              </summary>
              <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.5rem" }}>
                {c.pentatonics.map((p, j) => (
                  <div key={j} className="artist-example">
                    <div className="artist-example-title">
                      {p.pentatonic} <span style={{ color: "var(--text-muted)" }}>· {p.relationship}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", margin: 0 }}>
                      {p.description}
                    </p>
                  </div>
                ))}
                {c.triads.map((t, j) => (
                  <div key={j} className="artist-example">
                    <div className="artist-example-title">
                      {t.triad} ({t.type}) → <span style={{ color: "var(--accent-copper)" }}>{t.resultingChord}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", margin: 0 }}>
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </article>
        ))}
      </div>
    </>
  );
}
