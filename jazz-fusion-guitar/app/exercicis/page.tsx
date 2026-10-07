"use client";

import { useState, useMemo } from "react";
import { Search, Clock, Target, CheckCircle, ChevronDown, ChevronRight } from "lucide-react";
import { practicalExercises } from "@/data/practical-exercises";
import type { Exercise } from "@/types/music";

const categoryLabels: Record<string, string> = {
  rhythm: "Ritme",
  harmony: "Harmonia",
  melody: "Melodia",
  ear: "Oida",
  technique: "Tecnica",
  integration: "Integracio",
};

const categoryColors: Record<string, string> = {
  rhythm: "badge-copper",
  harmony: "badge-info",
  melody: "badge-success",
  ear: "badge-warning",
  technique: "badge-gold",
  integration: "badge",
};

const levelColors: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-warning",
  advanced: "badge-copper",
};

const categoryIcons: Record<string, string> = {
  rhythm: "🥁",
  harmony: "🎼",
  melody: "🎵",
  ear: "👂",
  technique: "⚡",
  integration: "🔗",
};

export default function ExercicisPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return practicalExercises.filter((ex) => {
      if (category !== "all" && ex.category !== category) return false;
      if (level !== "all" && ex.level !== level) return false;
      if (!term) return true;
      return (
        ex.title.toLowerCase().includes(term) ||
        ex.goal.toLowerCase().includes(term) ||
        ex.steps.some((s) => s.instruction.toLowerCase().includes(term))
      );
    });
  }, [search, category, level]);

  const toggleStep = (exerciseId: string, step: number) => {
    const key = `${exerciseId}-${step}`;
    const next = new Set(completedSteps);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCompletedSteps(next);
  };

  const totalDuration = useMemo(
    () => filtered.reduce((sum, ex) => sum + ex.duration, 0),
    [filtered]
  );

  return (
    <>
      <section className="page-header">
        <h1>Exercicis practics</h1>
        <p>
          {practicalExercises.length} exercicis estesos amb estructura pedagogica completa:
          objectiu, setup, passos amb consells, avaluacio i seguent nivell. Tria per categoria
          (ritme, harmonia, melodia, oida, tecnica o integracio) i nivell.
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
            placeholder="Cerca per titol, objectiu o paraula clau..."
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
          Tots ({practicalExercises.length})
          </button>
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((c) => {
            const count = practicalExercises.filter((e) => e.category === c).length;
            return (
              <button
                key={c}
                className={`filter-button ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {categoryIcons[c]} {categoryLabels[c]} ({count})
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          {(["all", "beginner", "intermediate", "advanced"] as const).map((l) => (
            <button
              key={l}
              className={`filter-button ${level === l ? "active" : ""}`}
              onClick={() => setLevel(l)}
            >
              {l === "all" ? "Tots els nivells" : l}
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <div style={{ marginBottom: "1.5rem", padding: "0.75rem 1rem", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            <Clock size={16} />
            <span>
              <strong style={{ color: "var(--accent-amber)" }}>{filtered.length}</strong> exercici{filtered.length !== 1 ? "s" : ""} &middot;{" "}
              <strong style={{ color: "var(--accent-amber)" }}>{totalDuration}</strong> min totals
            </span>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty-state">
            Cap exercici trobat. Prova uns altres filtres.
          </div>
        ) : (
          <div className="grid grid-2">
            {filtered.map((ex) => {
              const completedCount = ex.steps.filter((s) => completedSteps.has(`${ex.id}-${s.step}`)).length;
              const progress = (completedCount / ex.steps.length) * 100;

              return (
                <article
                  key={ex.id}
                  className="card"
                  onClick={() => setSelected(ex)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0, lineHeight: 1.3 }}>
                      {categoryIcons[ex.category]} {ex.title}
                    </h3>
                    <span className={`badge ${levelColors[ex.level]}`}>{ex.level}</span>
                  </div>

                  <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    <span className={`badge ${categoryColors[ex.category]}`}>{categoryLabels[ex.category]}</span>
                    <span className="badge badge-gold">
                      <Clock size={11} style={{ marginRight: 3, verticalAlign: "middle" }} />
                      {ex.duration} min
                    </span>
                    <span className="badge">{ex.steps.length} passos</span>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                    <Target size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
                    {ex.goal}
                  </p>

                  {progress > 0 && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <div style={{ height: 4, background: "var(--bg-tertiary)", borderRadius: 999, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: progress === 100 ? "var(--color-success)" : "linear-gradient(90deg, var(--accent-gold), var(--accent-amber))",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        {completedCount} / {ex.steps.length} passos
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selected && (
        <ExerciseModal
          exercise={selected}
          completedSteps={completedSteps}
          onToggleStep={toggleStep}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

function ExerciseModal({
  exercise,
  completedSteps,
  onToggleStep,
  onClose,
}: {
  exercise: Exercise;
  completedSteps: Set<string>;
  onToggleStep: (id: string, step: number) => void;
  onClose: () => void;
}) {
  const completedCount = exercise.steps.filter((s) => completedSteps.has(`${exercise.id}-${s.step}`)).length;
  const progress = (completedCount / exercise.steps.length) * 100;

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
          maxWidth: 800, width: "100%", maxHeight: "88vh", overflow: "auto",
          background: "var(--bg-card)", border: "1px solid var(--border-default)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "1rem" }}>
          <div>
            <h2 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>
              {categoryIcons[exercise.category]} {exercise.title}
            </h2>
            <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
              <span className={`badge ${levelColors[exercise.level]}`}>{exercise.level}</span>
              <span className={`badge ${categoryColors[exercise.category]}`}>{categoryLabels[exercise.category]}</span>
              <span className="badge badge-gold">⏱ {exercise.duration} min</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-tertiary)", color: "var(--text-secondary)", flexShrink: 0 }}
            aria-label="Tanca"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.375rem" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Progres</span>
            <span style={{ color: "var(--accent-amber)", fontSize: "0.875rem", fontWeight: 600 }}>
              {completedCount} / {exercise.steps.length} ({Math.round(progress)}%)
            </span>
          </div>
          <div style={{ height: 6, background: "var(--bg-tertiary)", borderRadius: 999, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: progress === 100 ? "var(--color-success)" : "linear-gradient(90deg, var(--accent-gold), var(--accent-amber))",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Goal */}
        <div className="card" style={{ background: "var(--bg-tertiary)", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
            Objectiu
          </div>
          <p style={{ color: "var(--text-primary)", margin: 0, fontSize: "1rem" }}>{exercise.goal}</p>
        </div>

        {/* Setup */}
        {exercise.setup.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>Setup</h3>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)" }}>
              {exercise.setup.map((s, i) => (
                <li key={i} style={{ marginBottom: "0.25rem" }}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.75rem" }}>Passos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {exercise.steps.map((s) => {
              const isDone = completedSteps.has(`${exercise.id}-${s.step}`);
              return (
                <div
                  key={s.step}
                  onClick={() => onToggleStep(exercise.id, s.step)}
                  className="card"
                  style={{
                    background: isDone ? "rgba(95, 184, 120, 0.08)" : "var(--bg-tertiary)",
                    border: isDone ? "1px solid var(--color-success)" : "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    padding: "0.875rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: isDone ? "var(--color-success)" : "var(--bg-elevated)",
                        border: "1px solid var(--border-default)",
                        color: isDone ? "white" : "var(--text-muted)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontWeight: 600, fontSize: "0.875rem",
                      }}
                    >
                      {isDone ? <CheckCircle size={16} /> : s.step}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                        <p style={{ color: "var(--text-primary)", margin: 0, fontSize: "0.9375rem" }}>
                          {s.instruction}
                        </p>
                        <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
                          {s.duration && <span className="badge">{s.duration} min</span>}
                          {s.tempo && <span className="badge badge-copper">{s.tempo}</span>}
                        </div>
                      </div>
                      {s.tips.length > 0 && (
                        <ul style={{ paddingLeft: "1rem", color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.375rem" }}>
                          {s.tips.map((tip, j) => (
                            <li key={j} style={{ marginBottom: "0.125rem" }}>{tip}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progression */}
        {exercise.progression && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>Progressio de referencia</h3>
            <code style={{ display: "inline-block", background: "var(--bg-tertiary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", color: "var(--accent-amber)" }}>
              {exercise.progression}
            </code>
          </div>
        )}

        {/* Evaluation */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>Avaluacio</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Pregunta&apos;t honestament:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            {exercise.evaluation.map((e, i) => (
              <li key={i} style={{ marginBottom: "0.25rem" }}>{e}</li>
            ))}
          </ul>
        </div>

        {/* Next steps */}
        <div className="card" style={{ background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-card))", border: "1px solid var(--border-default)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-amber)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.375rem" }}>
            Seguent pas
          </div>
          <p style={{ color: "var(--text-primary)", margin: 0 }}>{exercise.nextSteps}</p>
        </div>
      </div>
    </div>
  );
}
