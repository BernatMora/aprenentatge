"use client";

import { useState } from "react";
import { Activity, Clock, Flame, Target, Plus, Trash2, TrendingUp, BookOpen, Music, Wrench, ListChecks, Layers, PlayCircle, Library, Sparkles, Mic } from "lucide-react";
import { usePracticeTracker } from "@/hooks/usePracticeTracker";

const CATEGORIES = [
  { id: "tecnic", label: "Tècnica", icon: Wrench, color: "badge-gold" },
  { id: "escala", label: "Escales", icon: Music, color: "badge-copper" },
  { id: "progressio", label: "Progressions", icon: Layers, color: "badge-info" },
  { id: "improvisacio", label: "Improvisació", icon: Sparkles, color: "badge-copper" },
  { id: "rutina", label: "Rutina", icon: PlayCircle, color: "badge-gold" },
  { id: "exercici", label: "Exercicis", icon: ListChecks, color: "badge-warning" },
  { id: "biblioteca", label: "Biblioteca", icon: Library, color: "badge-info" },
  { id: "practica", label: "Pràctica lliure", icon: Mic, color: "badge-success" },
  { id: "altres", label: "Altres", icon: BookOpen, color: "badge" },
] as const;

const LEVEL_COLORS = ["#1a1d28", "#0e4429", "#006d32", "#26a641", "#39d353"];

export default function ProgresPage() {
  const { data, addSession, removeSession, setGoals, clearAll, stats } = usePracticeTracker();
  const [minutes, setMinutes] = useState(15);
  const [category, setCategory] = useState<typeof CATEGORIES[number]["id"]>("escala");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    if (minutes <= 0) return;
    addSession({ minutes, category, notes: notes.trim() || undefined });
    setMinutes(15);
    setCategory("escala");
    setNotes("");
  };

  const todayProgress = Math.min(100, (stats.todayMinutes / data.goals.dailyMinutes) * 100);
  const weekProgress = Math.min(100, (stats.weekDays / data.goals.weeklyDays) * 100);

  return (
    <>
      <section className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <TrendingUp size={32} color="var(--accent-amber)" />
          <h1 style={{ margin: 0 }}>El meu progrés</h1>
        </div>
        <p>
          Fes el seguiment de la teva pràctica. Cada sessió que registres compta per a l&apos;streak
          diari i t&apos;ajuda a veure patrons al llarg del temps.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Targetes de resum */}
        <div className="grid grid-4" style={{ marginBottom: "1.5rem" }}>
          <div className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
            <Clock size={20} color="var(--accent-amber)" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent-amber)" }}>
              {stats.todayMinutes}<span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}> min</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Avui</div>
            <div style={{ height: 4, background: "var(--bg-tertiary)", borderRadius: 2, marginTop: "0.5rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${todayProgress}%`, background: "var(--accent-amber)" }} />
            </div>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
            <Flame size={20} color="var(--accent-copper)" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--accent-copper)" }}>
              {stats.streak}<span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}> {stats.streak === 1 ? "dia" : "dies"}</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Ratxa actual</div>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
            <Activity size={20} color="var(--color-success)" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-success)" }}>
              {stats.weekDays}<span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>/{data.goals.weeklyDays}</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Dies aquesta setmana</div>
            <div style={{ height: 4, background: "var(--bg-tertiary)", borderRadius: 2, marginTop: "0.5rem", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${weekProgress}%`, background: "var(--color-success)" }} />
            </div>
          </div>

          <div className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
            <Target size={20} color="var(--color-info)" style={{ margin: "0 auto 0.5rem" }} />
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-info)" }}>
              {Math.round(stats.totalMinutes / 60 * 10) / 10}<span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}> h</span>
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Total acumulat</div>
          </div>
        </div>

        {/* Gràfic d'activitat */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>Últims 90 dies</h2>
          <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
            {stats.chart.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.minutes} min`}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: LEVEL_COLORS[day.level],
                  border: day.level > 0 ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border-subtle)",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "flex-end", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <span>Menys</span>
            {LEVEL_COLORS.map((c, i) => (
              <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c, border: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--border-subtle)" }} />
            ))}
            <span>Més</span>
          </div>
        </div>

        {/* Formulari per afegir sessió */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Plus size={18} /> Registra una sessió
          </h2>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Minuts
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                style={{ flex: 1, accentColor: "var(--accent-gold)" }}
              />
              <span style={{ minWidth: 80, textAlign: "right", fontWeight: 600, color: "var(--accent-amber)", fontSize: "1.125rem", fontFamily: "var(--font-mono)" }}>
                {minutes} min
              </span>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Què has practicat?
            </label>
            <div className="filter-group" style={{ margin: 0 }}>
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`filter-button ${category === c.id ? "active" : ""}`}
                  >
                    <Icon size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
              Notes (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: He après el lick de Pat Martino a 80bpm..."
              className="search-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button onClick={handleAdd} className="button" style={{ width: "100%", justifyContent: "center" }}>
            <Plus size={16} /> Afegir sessió
          </button>
        </div>

        {/* Objectius */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Target size={18} /> Objectius
          </h2>
          <div className="grid grid-2">
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Minuts diaris: <strong style={{ color: "var(--accent-amber)" }}>{data.goals.dailyMinutes}</strong>
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={data.goals.dailyMinutes}
                onChange={(e) => setGoals({ ...data.goals, dailyMinutes: Number(e.target.value) })}
                style={{ width: "100%", accentColor: "var(--accent-gold)" }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Dies per setmana: <strong style={{ color: "var(--accent-amber)" }}>{data.goals.weeklyDays}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={data.goals.weeklyDays}
                onChange={(e) => setGoals({ ...data.goals, weeklyDays: Number(e.target.value) })}
                style={{ width: "100%", accentColor: "var(--accent-gold)" }}
              />
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.125rem", margin: 0 }}>Historial ({data.sessions.length} sessions)</h2>
            {data.sessions.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Esborrar tot l'historial?")) clearAll();
                }}
                className="filter-button"
                style={{ fontSize: "0.75rem" }}
              >
                <Trash2 size={12} style={{ marginRight: 4, verticalAlign: "middle" }} /> Esborrar tot
              </button>
            )}
          </div>

          {data.sessions.length === 0 ? (
            <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
              Encara no has registrat cap sessió. Comença avui! 🎸
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[...data.sessions].reverse().slice(0, 20).map((s, i) => {
                const cat = CATEGORIES.find((c) => c.id === s.category);
                const Icon = cat?.icon || BookOpen;
                const realIndex = data.sessions.length - 1 - i;
                return (
                  <div
                    key={realIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.625rem 0.75rem",
                      background: "var(--bg-tertiary)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", color: "var(--accent-amber)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--text-primary)", fontSize: "0.9375rem" }}>
                        <strong>{s.minutes} min</strong> · <span style={{ color: "var(--text-muted)" }}>{cat?.label || s.category}</span>
                      </div>
                      {s.notes && (
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.125rem" }}>
                          {s.notes}
                        </div>
                      )}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", textAlign: "right" }}>
                      {new Date(s.date).toLocaleDateString("ca-ES", { day: "2-digit", month: "short" })}
                    </div>
                    <button
                      onClick={() => removeSession(realIndex)}
                      style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem" }}
                      title="Esborrar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
              {data.sessions.length > 20 && (
                <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8125rem", padding: "0.5rem" }}>
                  Mostrant les últimes 20 de {data.sessions.length} sessions
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
