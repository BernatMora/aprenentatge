"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { artists } from "@/data/artists";
import type { Artist } from "@/types/music";

export default function ArtistesPage() {
  const [search, setSearch] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return artists;
    return artists.filter(
      (a) =>
        a.name.toLowerCase().includes(term) ||
        a.bio.toLowerCase().includes(term) ||
        a.examples.some(
          (e) =>
            e.song.toLowerCase().includes(term) ||
            e.technique.toLowerCase().includes(term) ||
            e.description.toLowerCase().includes(term)
        )
    );
  }, [search]);

  return (
    <>
      <section className="page-header">
        <h1>Artistes</h1>
        <p>
          Guitarristes i músics clau del jazz fusió i rock fusion. Cada perfil inclou biografia,
          exemples de cançons, tècniques característiques i anàlisi del seu llenguatge.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ position: "relative", marginBottom: "1.5rem" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Cerca per nom, cançó o tècnica..."
            className="search-input"
            style={{ paddingLeft: "2.75rem" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            Cap artista trobat per "{search}". Prova un altre terme.
          </div>
        ) : (
          <div className="grid grid-2">
            {filtered.map((artist) => (
              <article
                key={artist.id}
                className="card artist-card"
                onClick={() => setSelectedArtist(artist)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
                  <h3 className="artist-name" style={{ margin: 0 }}>{artist.name}</h3>
                  <span className="badge badge-gold">{artist.examples.length} exemples</span>
                </div>
                <p className="artist-bio">{artist.bio}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.5rem" }}>
                  {artist.examples.slice(0, 3).map((ex, i) => (
                    <span key={i} className="badge">{ex.technique}</span>
                  ))}
                  {artist.examples.length > 3 && (
                    <span className="badge">+{artist.examples.length - 3}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {selectedArtist && (
        <ArtistModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      )}
    </>
  );
}

function ArtistModal({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          maxWidth: 720,
          width: "100%",
          maxHeight: "85vh",
          overflow: "auto",
          background: "var(--bg-card)",
          border: "1px solid var(--border-default)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ color: "var(--accent-amber)", marginBottom: "0.5rem" }}>{artist.name}</h2>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>{artist.bio}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-label="Tanca"
          >
            ✕
          </button>
        </div>

        <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem", fontSize: "1.125rem" }}>
          Exemples i tècniques
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {artist.examples.map((ex, i) => (
            <div key={i} className="artist-example">
              <div className="artist-example-title">
                {ex.song} <span style={{ color: "var(--text-muted)" }}>· {ex.technique}</span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                {ex.description}
              </p>
              {(ex.chord || ex.scale) && (
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {ex.chord && <span className="badge badge-copper">Acord: {ex.chord}</span>}
                  {ex.scale && <span className="badge badge-info">Escala: {ex.scale}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
