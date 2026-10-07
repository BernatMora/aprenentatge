"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Star, Trash2, ExternalLink, Search, Music, Users, Wrench, ListChecks, Layers, Repeat, PlayCircle } from "lucide-react";
import { useFavorites } from "@/components/FavoriteButton";

export default function FavoritsPage() {
  const { favorites, clearAll, remove } = useFavorites();
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const items = useMemo(() => {
    return Object.entries(favorites)
      .map(([id, f]) => ({ id, ...f }))
      .filter((f) => {
        if (typeFilter !== "all" && f.type !== typeFilter) return false;
        if (!filter.trim()) return true;
        const term = filter.toLowerCase();
        return f.title.toLowerCase().includes(term) || (f.subtitle?.toLowerCase().includes(term) ?? false);
      })
      .sort((a, b) => b.addedAt - a.addedAt);
  }, [favorites, filter, typeFilter]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const f of Object.values(favorites)) {
      counts[f.type] = (counts[f.type] || 0) + 1;
    }
    return counts;
  }, [favorites]);

  const getIcon = (type: string) => {
    switch (type) {
      case "escala": return Music;
      case "artista": return Users;
      case "tecnic": return Wrench;
      case "progressio": return Layers;
      case "exercici": return ListChecks;
      case "rutina": return PlayCircle;
      case "substitucio": return Repeat;
      default: return Star;
    }
  };

  return (
    <>
      <section className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <Star size={32} color="var(--accent-amber)" fill="var(--accent-amber)" />
          <h1 style={{ margin: 0 }}>Favorits</h1>
        </div>
        <p>
          Els teus recursos preferits. Es desen al navegador (localStorage), per la qual cosa
          estaran disponibles cada vegada que visitis l&apos;app.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {items.length === 0 ? (
          <div className="card empty-state" style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <Star size={48} style={{ opacity: 0.3, margin: "0 auto 1rem", color: "var(--text-muted)" }} />
            <h3 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>Encara no tens favorits</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1rem" }}>
              A qualsevol secció, fes clic a la icona d&apos;estrella per afegir.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/escales" className="button button-secondary">Explorar escales</Link>
              <Link href="/artistes" className="button button-secondary">Veure artistes</Link>
              <Link href="/progressions" className="button button-secondary">Veure progressions</Link>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative" }}>
                <Search
                  size={18}
                  style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Cerca als teus favorits..."
                  className="search-input"
                  style={{ paddingLeft: "2.75rem" }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <button
                  className={`filter-button ${typeFilter === "all" ? "active" : ""}`}
                  onClick={() => setTypeFilter("all")}
                >
                  Tots ({Object.keys(favorites).length})
                </button>
                {Object.entries(typeCounts).map(([t, c]) => (
                  <button
                    key={t}
                    className={`filter-button ${typeFilter === t ? "active" : ""}`}
                    onClick={() => setTypeFilter(t)}
                  >
                    {t} ({c})
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {items.map((item) => {
                const Icon = getIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-tertiary)",
                        color: "var(--accent-amber)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{item.title}</div>
                      {item.subtitle && (
                        <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.125rem" }}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <span className="badge" style={{ textTransform: "capitalize", fontSize: "0.75rem" }}>
                      {item.type}
                    </span>
                    <Link
                      href={item.href}
                      className="button button-secondary"
                      style={{ padding: "0.375rem 0.75rem", fontSize: "0.8125rem", textDecoration: "none" }}
                    >
                      <ExternalLink size={12} /> Anar
                    </Link>
                    <button
                      onClick={() => remove(item.id)}
                      title="Treure de favorits"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "0.25rem",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {Object.keys(favorites).length > 0 && (
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                  onClick={() => {
                    if (confirm("Segur que vols esborrar tots els favorits?")) {
                      clearAll();
                    }
                  }}
                  className="button button-secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Trash2 size={16} /> Esborrar tots els favorits
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
