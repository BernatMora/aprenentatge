"use client";

import { useState, useMemo } from "react";
import { Search, Link2, Music, Star, Zap } from "lucide-react";
import { scaleProgressionConnections } from "@/data/scale-progression-connections";

const priorityColors: Record<string, string> = {
  primary: "badge-success",
  alternative: "badge-warning",
  advanced: "badge-copper",
};

const priorityLabels: Record<string, string> = {
  primary: "Principal",
  alternative: "Alternativa",
  advanced: "Avancat",
};

export default function ConnexionsPage() {
  const [search, setSearch] = useState("");
  const [selectedProgression, setSelectedProgression] = useState(
    scaleProgressionConnections[0]?.progressionId || ""
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return scaleProgressionConnections;
    return scaleProgressionConnections.filter(
      (c) =>
        c.progressionName.toLowerCase().includes(term) ||
        c.recommendedScales.some(
          (rs) =>
            rs.chordSymbol.toLowerCase().includes(term) ||
            rs.scaleOptions.some(
              (so) =>
                so.scaleName.toLowerCase().includes(term) ||
                so.notes.toLowerCase().includes(term)
            )
        )
    );
  }, [search]);

  const current = scaleProgressionConnections.find((c) => c.progressionId === selectedProgression);

  return (
    <>
      <section className="page-header">
        <h1>Connexions escala-progressio</h1>
        <p>
          Mapa complet de quines escales funcionen sobre quins acords dins de cada progressio.
          Per a cada combinacio trobaras la justificacio teoric-musical i un consell practic
          d&apos;aplicacio. Ideal per triar quina escala tocar en temps real.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 320px) 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* Sidebar: llistat de progressions */}
          <aside style={{ position: "sticky", top: "1rem" }}>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <Search
                size={16}
                style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
              />
              <input
                type="text"
                placeholder="Cerca progressio o escala..."
                className="search-input"
                style={{ paddingLeft: "2.5rem", fontSize: "0.875rem" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", maxHeight: "70vh", overflowY: "auto" }}>
              {filtered.map((c) => (
                <button
                  key={c.progressionId}
                  onClick={() => setSelectedProgression(c.progressionId)}
                  className="card"
                  style={{
                    padding: "0.625rem 0.875rem",
                    textAlign: "left",
                    cursor: "pointer",
                    background: selectedProgression === c.progressionId ? "var(--bg-elevated)" : "var(--bg-card)",
                    border: selectedProgression === c.progressionId ? "1px solid var(--accent-gold)" : "1px solid var(--border-subtle)",
                    color: "inherit",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Link2 size={14} color={selectedProgression === c.progressionId ? "var(--accent-amber)" : "var(--text-muted)"} />
                    <span style={{
                      fontSize: "0.875rem",
                      color: selectedProgression === c.progressionId ? "var(--accent-amber)" : "var(--text-primary)",
                      fontWeight: selectedProgression === c.progressionId ? 600 : 500,
                    }}>
                      {c.progressionName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Main: detalls de la progressio seleccionada */}
          <div>
            {!current ? (
              <div className="empty-state">Tria una progressio del llistat.</div>
            ) : (
              <div className="fade-in" key={current.progressionId}>
                <div className="card" style={{ marginBottom: "1.5rem" }}>
                  <h2 style={{ color: "var(--accent-amber)", marginBottom: "1rem" }}>{current.progressionName}</h2>

                  {current.recommendedScales.map((rs, i) => (
                    <div key={i} style={{ marginBottom: "1.5rem" }}>
                      <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.0625rem", marginBottom: "0.75rem" }}>
                        <span className="chord-symbol" style={{ fontSize: "0.9375rem" }}>{rs.chordSymbol}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>opcions recomanades</span>
                      </h3>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                        {rs.scaleOptions.map((so, j) => (
                          <div
                            key={j}
                            className="card"
                            style={{
                              background: "var(--bg-tertiary)",
                              border: so.priority === "primary" ? "1px solid var(--color-success)" : "1px solid var(--border-subtle)",
                              padding: "0.875rem",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                {so.priority === "primary" ? <Star size={14} color="var(--color-success)" /> : <Zap size={14} color="var(--text-muted)" />}
                                <strong style={{ color: "var(--accent-amber)" }}>{so.scaleName}</strong>
                              </div>
                              <span className={`badge ${priorityColors[so.priority]}`}>{priorityLabels[so.priority]}</span>
                            </div>

                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                              {so.notes}
                            </div>

                            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                              <strong style={{ color: "var(--text-primary)" }}>Per que:</strong> {so.why}
                            </p>

                            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                              <strong style={{ color: "var(--text-primary)" }}>Consell:</strong> {so.exerciseTip}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {current.practicalExample && (
                    <div className="card" style={{ background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-card))", border: "1px solid var(--border-default)" }}>
                      <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-amber)", fontSize: "1.0625rem", marginBottom: "0.75rem" }}>
                        <Music size={16} /> Exemple practic
                      </h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                        {current.practicalExample.description}
                      </p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0.25rem 0" }}>
                        <strong style={{ color: "var(--text-primary)" }}>Sequencia:</strong>{" "}
                        <code style={{ background: "var(--bg-tertiary)", padding: "0.125rem 0.375rem", borderRadius: "var(--radius-sm)" }}>
                          {current.practicalExample.scaleSequence}
                        </code>
                      </p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: 0 }}>
                        <strong style={{ color: "var(--text-primary)" }}>Escolta:</strong> {current.practicalExample.listenTo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
