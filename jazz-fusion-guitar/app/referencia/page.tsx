"use client";

import { useState } from "react";
import { INTERVALS } from "@/data/intervals";
import { referenceTables } from "@/data/reference";
import { chromaticTechniques, chromaticArtists } from "@/data/chromaticism";

const tabs = [
  { id: "intervals", label: "Intervals" },
  { id: "reference", label: "Taules de referència" },
  { id: "chromaticism", label: "Cromatisme" },
];

export default function ReferenciaPage() {
  const [activeTab, setActiveTab] = useState("intervals");

  return (
    <>
      <section className="page-header">
        <h1>Referència</h1>
        <p>
          Material de consulta ràpida: intervals, extensions, tipus d&apos;acord, patrons cromàtics.
          Ideal per tenir a mà durant la pràctica.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="fade-in" key={activeTab}>
          {activeTab === "intervals" && <IntervalsView />}
          {activeTab === "reference" && <ReferenceView />}
          {activeTab === "chromaticism" && <ChromaticismView />}
        </div>
      </section>
    </>
  );
}

function IntervalsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
      {INTERVALS.map((iv) => (
        <article key={iv.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
            <h3 style={{ color: "var(--accent-amber)", margin: 0 }}>{iv.name}</h3>
            <span className="chord-symbol" style={{ fontSize: "1.25rem" }}>{iv.symbol}</span>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-copper">{iv.semitones} semitons</span>
            <span className="badge">{iv.category}</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{iv.description}</p>
        </article>
      ))}
    </div>
  );
}

function ReferenceView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {referenceTables.map((table, i) => (
        <article key={i} className="card" style={{ overflowX: "auto" }}>
          <h3 style={{ color: "var(--accent-amber)", marginBottom: "0.75rem" }}>{table.title}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr>
                {table.headers.map((h, j) => (
                  <th
                    key={j}
                    style={{
                      padding: "0.5rem",
                      textAlign: "left",
                      borderBottom: "1px solid var(--border-default)",
                      color: "var(--accent-amber)",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, j) => (
                <tr key={j}>
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ))}
    </div>
  );
}

function ChromaticismView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <section>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--accent-amber)" }}>Tècniques cromàtiques</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {chromaticTechniques.map((t, i) => (
            <article key={i} className="card">
              <h3 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{t.name}</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>{t.description}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                <strong style={{ color: "var(--text-secondary)" }}>Aplicació:</strong> {t.application}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                <strong style={{ color: "var(--text-secondary)" }}>Exemple:</strong> <code>{t.example}</code>
              </p>
              <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                {t.tips.map((tip, j) => (
                  <li key={j} style={{ marginBottom: "0.25rem" }}>{tip}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--accent-amber)" }}>Artistes cromàtics</h2>
        <div className="grid grid-2">
          {chromaticArtists.map((a, i) => (
            <article key={i} className="card">
              <h3 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{a.name}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{a.style}</p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                <strong style={{ color: "var(--text-primary)" }}>Approach:</strong> {a.approach}
              </p>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {a.techniques.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Recomanacions:</div>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.8125rem" }}>
                  {a.listeningRecommendations.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
