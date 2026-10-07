"use client";

import { useState } from "react";
import { improvisationTechniques } from "@/data/improvisation";

export default function ImprovitzacioPage() {
  const [activeTab, setActiveTab] = useState(0);
  const techniques = improvisationTechniques;

  return (
    <>
      <section className="page-header">
        <h1>Improvisació</h1>
        <p>
          Tècniques d&apos;improvisació amb exemples, exercicis i artistes que les utilitzen.
          Aprèn a construir frases, aproximar-te a targets i desenvolupar el teu llenguatge.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="tabs">
          {techniques.map((t, i) => (
            <button
              key={t.id}
              className={`tab ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="fade-in" key={activeTab}>
          <article className="card">
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <h2 style={{ color: "var(--accent-amber)", margin: 0 }}>{techniques[activeTab].name}</h2>
              <span className="badge badge-copper">{techniques[activeTab].category}</span>
            </div>

            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "1.0625rem" }}>
              {techniques[activeTab].description}
            </p>

            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Exemples</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {techniques[activeTab].examples.map((ex, i) => (
                <div key={i} className="artist-example">
                  <div className="artist-example-title">
                    {ex.context} <span style={{ color: "var(--text-muted)" }}>· {ex.notes}</span>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                    {ex.explanation}
                  </p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>Exercicis</h3>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)" }}>
              {techniques[activeTab].exercises.map((ex, i) => (
                <li key={i} style={{ marginBottom: "0.375rem" }}>{ex}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Usat per</h3>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {techniques[activeTab].usedBy.map((a) => (
                <span key={a} className="badge badge-gold">{a}</span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
