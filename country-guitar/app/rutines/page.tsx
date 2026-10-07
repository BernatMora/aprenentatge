"use client";

import { useState } from "react";
import { Clock, Target, BookOpen } from "lucide-react";
import { countryPracticeRoutines } from "@/data/country-techniques";

const difficultyColors: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-info",
  advanced: "badge-warning",
  expert: "badge-copper",
};

export default function RutinesPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <section className="page-header">
        <h1>Rutines de pràctica</h1>
        <p>
          Estructures guiades per dominar cada tècnica country. Cadascuna indica durada,
          nivell i passos concrets per practicar amb mètode.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="grid grid-2">
          {countryPracticeRoutines.map((r, idx) => (
            <article
              key={r.title}
              className="card"
              onClick={() => setSelected(selected === idx ? null : idx)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.5rem" }}>
                <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0 }}>{r.title}</h3>
                <span className={`badge ${difficultyColors[r.level]}`}>{r.level}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>{r.description}</p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <span className="badge badge-gold">⏱ {r.duration}</span>
              </div>
              {selected === idx && (
                <ol style={{ marginTop: "1rem", paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {r.steps.map((s, i) => (
                    <li key={i} style={{ marginBottom: "0.25rem" }}>{s}</li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ background: "linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Target size={20} /> Com estructurar la pràctica
          </h2>
          <ol style={{ color: "var(--text-secondary)", paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Escalfament:</strong> 5 minuts de digitació i alternate picking lent.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Tècnica:</strong> 10-15 minuts centrats en una tècnica concreta (chicken pickin', hybrid, etc.).
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Licks:</strong> 10 minuts aprenent i memoritzant 1-2 licks nous.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Aplicació:</strong> 10 minuts improvisant sobre una progressió amb els licks apresos.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Grava't:</strong> 5 minuts enregistrant el que has practicat per escoltar el progrés.
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
