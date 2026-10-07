"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { progressions } from "@/data/progressions";
import type { Progression } from "@/types/music";

export default function ProgressionsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Progression | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return progressions;
    return progressions.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.chords.some((c) => c.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <>
      <section className="page-header">
        <h1>Progressions</h1>
        <p>
          40 progressions clàssiques de jazz, bossa, modal i fusió. Per a cada acord trobaràs
          pentatòniques i tríades (UST) recomanades per improvisar amb solvència.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <Search
            size={18}
            style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Cerca per nom o acord (ex: Dm7, Giant Steps)..."
            className="search-input"
            style={{ paddingLeft: "2.75rem" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">Cap progressió trobada per "{search}".</div>
        ) : (
          <div className="grid grid-2">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="card"
                onClick={() => setSelected(p)}
                style={{ cursor: "pointer" }}
              >
                <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", marginBottom: "0.5rem" }}>{p.name}</h3>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  {p.chords.map((c, i) => (
                    <span key={i} className="chord-symbol">{c}</span>
                  ))}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
                  {p.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {selected && <ProgressionModal progression={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function ProgressionModal({ progression, onClose }: { progression: Progression; onClose: () => void }) {
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
          maxWidth: 800, width: "100%", maxHeight: "85vh", overflow: "auto",
          background: "var(--bg-card)", border: "1px solid var(--border-default)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{progression.name}</h2>
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              {progression.chords.map((c, i) => (
                <span key={i} className="chord-symbol">{c}</span>
              ))}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-tertiary)", color: "var(--text-secondary)" }}>✕</button>
        </div>

        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{progression.description}</p>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Suggeriments per a cada acord</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {progression.suggestions.map((s, i) => (
            <div key={i} className="card" style={{ background: "var(--bg-tertiary)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span className="chord-symbol" style={{ fontSize: "1rem" }}>{s.chord}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>compàs {i + 1}</span>
              </div>

              {s.pentatonics.length > 0 && (
                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>
                    Pentatòniques
                  </div>
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                    {s.pentatonics.map((p, j) => (
                      <span key={j} className="badge">{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {s.triads.length > 0 && (
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>
                    Tríades (UST)
                  </div>
                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                    {s.triads.map((t, j) => (
                      <span key={j} className="badge badge-copper">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
