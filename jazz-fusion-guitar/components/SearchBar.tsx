"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Music, Users, Wrench, BookOpen, Layers, Sparkles, ListChecks, PlayCircle, BookOpenText, Link2, Repeat, FileText, Library } from "lucide-react";

// Tipus unificat per a tots els resultats de cerca
type SearchResult = {
  type: "escala" | "artista" | "tecnic" | "progressio" | "exercici" | "rutina" | "substitucio" | "connexio" | "seccio";
  title: string;
  subtitle?: string;
  href: string;
  icon: typeof Music;
  matchField?: string;
  score: number;
};

import { scales } from "@/data/scales";
import { artists } from "@/data/artists";
import { fusionTechniques } from "@/data/fusion-techniques";
import { progressions } from "@/data/progressions";
import { practicalExercises } from "@/data/practical-exercises";
import { practiceRoutines } from "@/data/practice-routines";
import { harmonicSubstitutions } from "@/data/substitutions";
import { scaleProgressionConnections } from "@/data/scale-progression-connections";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cmd/Ctrl + K per obrir
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Focus quan s'obre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Tancar quan clica fora
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen]);

  const results = useMemo<SearchResult[]>(() => {
    const term = query.toLowerCase().trim();
    if (!term) return [];

    const out: SearchResult[] = [];

    // Escales
    for (const s of scales) {
      const haystack = `${s.name} ${s.description} ${s.formula} ${s.notes.join(" ")} ${s.usage}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (s.name.toLowerCase().includes(term) ? 100 : 0) +
          (s.description.toLowerCase().includes(term) ? 30 : 0) +
          (s.formula.toLowerCase().includes(term) ? 50 : 0) +
          10;
        out.push({
          type: "escala",
          title: s.name,
          subtitle: s.formula,
          href: `/escales/${s.id}`,
          icon: Music,
          matchField: s.description.substring(0, 80) + "...",
          score,
        });
      }
    }

    // Artistes
    for (const a of artists) {
      const haystack = `${a.name} ${a.bio} ${a.examples.map((e) => `${e.song} ${e.technique} ${e.description}`).join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (a.name.toLowerCase().includes(term) ? 100 : 0) +
          (a.bio.toLowerCase().includes(term) ? 20 : 0) +
          10;
        out.push({
          type: "artista",
          title: a.name,
          subtitle: a.bio.substring(0, 80) + "...",
          href: "/artistes",
          icon: Users,
          matchField: a.examples[0]?.song,
          score,
        });
      }
    }

    // Tècniques
    for (const t of fusionTechniques) {
      const haystack = `${t.name} ${t.description} ${t.chordContext} ${t.application} ${t.sound} ${t.artists.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (t.name.toLowerCase().includes(term) ? 100 : 0) +
          (t.description.toLowerCase().includes(term) ? 20 : 0) +
          10;
        out.push({
          type: "tecnic",
          title: t.name,
          subtitle: t.difficulty,
          href: "/tecniques",
          icon: Wrench,
          matchField: t.chordContext,
          score,
        });
      }
    }

    // Progressions
    for (const p of progressions) {
      const haystack = `${p.name} ${p.description} ${p.chords.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (p.name.toLowerCase().includes(term) ? 100 : 0) +
          (p.chords.some((c) => c.toLowerCase().includes(term)) ? 80 : 0) +
          10;
        out.push({
          type: "progressio",
          title: p.name,
          subtitle: p.chords.join(" - "),
          href: "/progressions",
          icon: Layers,
          matchField: p.description.substring(0, 80),
          score,
        });
      }
    }

    // Exercicis
    for (const ex of practicalExercises) {
      const haystack = `${ex.title} ${ex.goal} ${ex.steps.map((s) => s.instruction).join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (ex.title.toLowerCase().includes(term) ? 100 : 0) +
          (ex.goal.toLowerCase().includes(term) ? 30 : 0) +
          10;
        out.push({
          type: "exercici",
          title: ex.title,
          subtitle: `${ex.category} · ${ex.level} · ${ex.duration} min`,
          href: "/exercicis",
          icon: ListChecks,
          matchField: ex.goal.substring(0, 80),
          score,
        });
      }
    }

    // Rutines
    for (const r of practiceRoutines) {
      const haystack = `${r.name} ${r.description} ${r.goals.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (r.name.toLowerCase().includes(term) ? 100 : 0) +
          (r.description.toLowerCase().includes(term) ? 20 : 0) +
          10;
        out.push({
          type: "rutina",
          title: r.name,
          subtitle: `${r.level} · ${r.duration} min`,
          href: "/rutines",
          icon: PlayCircle,
          matchField: r.description.substring(0, 80),
          score,
        });
      }
    }

    // Substitucions
    for (const s of harmonicSubstitutions) {
      const haystack = `${s.name} ${s.description} ${s.theory} ${s.useCases.join(" ")} ${s.artists.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        const score = (s.name.toLowerCase().includes(term) ? 100 : 0) +
          10;
        out.push({
          type: "substitucio",
          title: s.name,
          subtitle: s.type,
          href: "/substitucions",
          icon: Repeat,
          matchField: s.description.substring(0, 80),
          score,
        });
      }
    }

    // Ordenar per score i limitar
    return out.sort((a, b) => b.score - a.score).slice(0, 30);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  // Comptar per tipus per mostrar resum
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of results) {
      counts[r.type] = (counts[r.type] || 0) + 1;
    }
    return counts;
  }, [results]);

  return (
    <>
      {/* Botó per obrir la cerca */}
      <button
        onClick={() => setIsOpen(true)}
        className="filter-button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.375rem 0.75rem",
          background: "var(--bg-tertiary)",
          color: "var(--text-secondary)",
          fontSize: "0.8125rem",
        }}
        aria-label="Cerca global"
      >
        <Search size={14} />
        <span> Cerca</span>
        <kbd
          style={{
            padding: "0.125rem 0.375rem",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "3px",
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            marginLeft: "0.25rem",
          }}
        >
          Ctrl K
        </kbd>
      </button>

      {/* Modal de cerca */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "4rem 1rem 1rem",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 640,
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
              maxHeight: "75vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Input */}
            <div style={{ display: "flex", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <Search size={18} color="var(--text-muted)" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Cerca artistes, escales, progressions, exercicis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  marginLeft: "0.75rem",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="filter-button"
                style={{ padding: "0.25rem 0.5rem" }}
                aria-label="Tanca"
              >
                <X size={16} />
              </button>
            </div>

            {/* Resultats */}
            <div style={{ flex: 1, overflow: "auto", padding: "0.5rem" }}>
              {!query && (
                <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <Search size={32} style={{ opacity: 0.3, margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.875rem" }}>Escriu per cercar a tota l&apos;app</p>
                  <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                    Prova: <em>alterada</em>, <em>Holdsworth</em>, <em>ii-V-I</em>, <em>tritò</em>...
                  </p>
                </div>
              )}

              {query && results.length === 0 && (
                <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                  Cap resultat per &quot;{query}&quot;
                </div>
              )}

              {results.length > 0 && (
                <>
                  <div style={{ padding: "0.5rem 0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {results.length} resultat{results.length !== 1 ? "s" : ""}
                    {Object.entries(typeCounts).length > 0 && (
                      <>
                        {" · "}
                        {Object.entries(typeCounts).map(([t, c], i) => (
                          <span key={t}>
                            {c} {t}
                            {i < Object.entries(typeCounts).length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  {results.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={`${r.type}-${i}`}
                        onClick={() => handleSelect(r.href)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          width: "100%",
                          padding: "0.625rem 0.75rem",
                          background: "transparent",
                          border: "none",
                          borderRadius: "var(--radius-md)",
                          color: "var(--text-primary)",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.9375rem",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--bg-tertiary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-tertiary)",
                            color: "var(--accent-amber)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{r.title}</div>
                          {r.subtitle && (
                            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.125rem" }}>
                              {r.subtitle}
                            </div>
                          )}
                        </div>
                        <span className="badge" style={{ textTransform: "capitalize", fontSize: "0.6875rem" }}>
                          {r.type}
                        </span>
                      </button>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                borderTop: "1px solid var(--border-subtle)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                background: "var(--bg-tertiary)",
              }}
            >
              <span>
                <kbd style={kbdStyle}>↑↓</kbd> navegar ·{" "}
                <kbd style={kbdStyle}>↵</kbd> seleccionar ·{" "}
                <kbd style={kbdStyle}>Esc</kbd> tancar
              </span>
              <span>~{scales.length + artists.length + fusionTechniques.length + progressions.length + practicalExercises.length + practiceRoutines.length + harmonicSubstitutions.length} ítems</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const kbdStyle: React.CSSProperties = {
  padding: "0.0625rem 0.375rem",
  background: "var(--bg-elevated)",
  border: "1px solid var(--border-default)",
  borderRadius: "3px",
  fontSize: "0.6875rem",
  fontFamily: "var(--font-mono)",
  margin: "0 0.125rem",
};
