"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Music, Users, Wrench, Layers, Sparkles, ListChecks, PlayCircle } from "lucide-react";

type SearchResult = {
  type: "escala" | "artista" | "tecnic" | "progressio" | "lick" | "rutina" | "seccio";
  title: string;
  subtitle?: string;
  href: string;
  icon: typeof Music;
  score: number;
};

import { scales } from "@/data/scales";
import { artists } from "@/data/artists";
import { countryTechniques } from "@/data/country-techniques";
import { progressions } from "@/data/progressions";
import { licks } from "@/data/licks";
import { countryPracticeRoutines } from "@/data/country-techniques";

const sections = [
  { href: "/artistes", label: "Artistes", icon: Users },
  { href: "/escales", label: "Escales", icon: Music },
  { href: "/tecniques", label: "Tècniques", icon: Wrench },
  { href: "/progressions", label: "Progressions", icon: Layers },
  { href: "/licks", label: "Licks", icon: Sparkles },
  { href: "/rutines", label: "Rutines", icon: ListChecks },
  { href: "/practica", label: "Pràctica", icon: PlayCircle },
];

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return [];
    const out: SearchResult[] = [];

    // Seccions
    for (const s of sections) {
      if (s.label.toLowerCase().includes(term)) {
        out.push({ type: "seccio", title: s.label, href: s.href, icon: s.icon, score: 50 });
      }
    }

    // Escales
    for (const s of scales) {
      const haystack = `${s.name} ${s.description} ${s.usage}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "escala",
          title: s.name,
          subtitle: s.formula,
          href: `/escales/${s.id}`,
          icon: Music,
          score: (s.name.toLowerCase().includes(term) ? 100 : 0) + 10,
        });
      }
    }

    // Artistes
    for (const a of artists) {
      const haystack = `${a.name} ${a.bio} ${a.examples.map((e) => e.song + " " + e.technique).join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "artista",
          title: a.name,
          subtitle: a.examples.length + " exemples",
          href: "/artistes",
          icon: Users,
          score: (a.name.toLowerCase().includes(term) ? 100 : 0) + 10,
        });
      }
    }

    // Tècniques
    for (const t of countryTechniques) {
      const haystack = `${t.name} ${t.description} ${t.chordContext}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "tecnic",
          title: t.name,
          subtitle: t.difficulty,
          href: "/tecniques",
          icon: Wrench,
          score: (t.name.toLowerCase().includes(term) ? 100 : 0) + 10,
        });
      }
    }

    // Progressions
    for (const p of progressions) {
      const haystack = `${p.name} ${p.description} ${p.chords.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "progressio",
          title: p.name,
          subtitle: p.chords.join(" - "),
          href: "/progressions",
          icon: Layers,
          score: (p.name.toLowerCase().includes(term) ? 100 : 0) + (p.chords.some((c) => c.toLowerCase().includes(term)) ? 80 : 0) + 10,
        });
      }
    }

    // Licks
    for (const l of licks) {
      const haystack = `${l.name} ${l.description} ${l.artists.join(" ")}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "lick",
          title: l.name,
          subtitle: `${l.key} · ${l.difficulty}`,
          href: "/licks",
          icon: Sparkles,
          score: (l.name.toLowerCase().includes(term) ? 100 : 0) + 10,
        });
      }
    }

    // Rutines
    for (const r of countryPracticeRoutines) {
      const haystack = `${r.title} ${r.description}`.toLowerCase();
      if (haystack.includes(term)) {
        out.push({
          type: "rutina",
          title: r.title,
          subtitle: `${r.level} · ${r.duration}`,
          href: "/rutines",
          icon: ListChecks,
          score: (r.title.toLowerCase().includes(term) ? 100 : 0) + 10,
        });
      }
    }

    return out.sort((a, b) => b.score - a.score).slice(0, 30);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of results) counts[r.type] = (counts[r.type] || 0) + 1;
    return counts;
  }, [results]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="filter-button"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", background: "var(--bg-tertiary)", color: "var(--text-secondary)", fontSize: "0.8125rem" }}
        aria-label="Cerca global"
      >
        <Search size={14} />
        <span> Cerca</span>
        <kbd style={{ padding: "0.125rem 0.375rem", background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: "3px", fontSize: "0.6875rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginLeft: "0.25rem" }}>
          Ctrl K
        </kbd>
      </button>

      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4rem 1rem 1rem" }}
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 640, background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)", maxHeight: "75vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <Search size={18} color="var(--text-muted)" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Cerca artistes, escales, tècniques, licks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1, marginLeft: "0.75rem", background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "1rem", outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={() => setIsOpen(false)} className="filter-button" style={{ padding: "0.25rem 0.5rem" }} aria-label="Tanca">
                <X size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "0.5rem" }}>
              {!query && (
                <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
                  <Search size={32} style={{ opacity: 0.3, margin: "0 auto 0.5rem" }} />
                  <p style={{ fontSize: "0.875rem" }}>Escriu per cercar a tota l&apos;app</p>
                  <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                    Prova: <em>Brent Mason</em>, <em>chicken pickin</em>, <em>G-C-D</em>...
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
                      <> · {Object.entries(typeCounts).map(([t, c], i) => <span key={t}>{c} {t}{i < Object.entries(typeCounts).length - 1 ? ", " : ""}</span>)}</>
                    )}
                  </div>
                  {results.map((r, i) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={`${r.type}-${i}`}
                        onClick={() => handleSelect(r.href)}
                        style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.625rem 0.75rem", background: "transparent", border: "none", borderRadius: "var(--radius-md)", color: "var(--text-primary)", textAlign: "left", cursor: "pointer", fontSize: "0.9375rem", fontFamily: "inherit" }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-tertiary)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--bg-tertiary)", color: "var(--accent-amber)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{r.title}</div>
                          {r.subtitle && <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginTop: "0.125rem" }}>{r.subtitle}</div>}
                        </div>
                        <span className="badge" style={{ textTransform: "capitalize", fontSize: "0.6875rem" }}>{r.type}</span>
                      </button>
                    );
                  })}
                </>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem", borderTop: "1px solid var(--border-subtle)", fontSize: "0.75rem", color: "var(--text-muted)", background: "var(--bg-tertiary)" }}>
              <span><kbd style={kbdStyle}>↑↓</kbd> navegar · <kbd style={kbdStyle}>↵</kbd> seleccionar · <kbd style={kbdStyle}>Esc</kbd> tancar</span>
              <span>~{scales.length + artists.length + countryTechniques.length + progressions.length + licks.length + countryPracticeRoutines.length} ítems</span>
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
