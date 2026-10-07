"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { licks } from "@/data/licks";
import type { CountryLick } from "@/data/licks";

const categoryLabels: Record<string, string> = {
  "chicken-pickin": "Chicken Pickin'",
  "hybrid-picking": "Hybrid Picking",
  "banjo-roll": "Banjo Rolls",
  "double-stop": "Double Stops",
  bend: "Bends",
  "open-string": "Open Strings",
  "travis-picking": "Travis Picking",
  crosspicking: "Crosspicking",
  flatpicking: "Flatpicking",
  fingerpicking: "Fingerpicking",
};

const difficultyColors: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-info",
  advanced: "badge-warning",
  expert: "badge-copper",
};

export default function LicksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<CountryLick | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return licks.filter((l) => {
      if (category !== "all" && l.category !== category) return false;
      if (!term) return true;
      return (
        l.name.toLowerCase().includes(term) ||
        l.description.toLowerCase().includes(term) ||
        l.artists.some((a) => a.toLowerCase().includes(term))
      );
    });
  }, [search, category]);

  return (
    <>
      <section className="page-header">
        <h1>Licks</h1>
        <p>
          Licks característics del country: obertures, bends, rolls i frases per incorporar
          al teu vocabulari. Cada lick inclou tablatura, tonalitat, dificultat i consells.
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
            placeholder="Cerca per nom, artista o tècnica..."
            className="search-input"
            style={{ paddingLeft: "2.75rem" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button
            className={`filter-button ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            Tots
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              className={`filter-button ${category === key ? "active" : ""}`}
              onClick={() => setCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">Cap lick trobat per "{search}".</div>
        ) : (
          <div className="grid grid-2">
            {filtered.map((l) => (
              <article
                key={l.id}
                className="card"
                onClick={() => setSelected(l)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0 }}>{l.name}</h3>
                  <span className={`badge ${difficultyColors[l.difficulty]}`}>{l.difficulty}</span>
                </div>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                  <span className="badge badge-copper">{categoryLabels[l.category]}</span>
                  <span className="badge badge-gold">Tonalitat: {l.key}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>
                  {l.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {selected && <LickModal lick={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function LickModal({ lick, onClose }: { lick: CountryLick; onClose: () => void }) {
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
            <h2 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{lick.name}</h2>
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              <span className="badge badge-copper">{categoryLabels[lick.category]}</span>
              <span className="badge badge-gold">Tonalitat: {lick.key}</span>
              <span className={`badge ${difficultyColors[lick.difficulty]}`}>{lick.difficulty}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-tertiary)", color: "var(--text-secondary)" }}>✕</button>
        </div>

        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{lick.description}</p>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Tablatura</h3>
        <pre
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            overflowX: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            color: "var(--accent-amber)",
            marginBottom: "1.5rem",
          }}
        >
          {lick.tab}
        </pre>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Artistes</h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {lick.artists.map((a) => (
            <span key={a} className="badge badge-gold">{a}</span>
          ))}
        </div>

        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Consells</h3>
        <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {lick.tips.map((t, i) => (
            <li key={i} style={{ marginBottom: "0.375rem" }}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
