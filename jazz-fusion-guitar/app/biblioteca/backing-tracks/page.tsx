"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Music, ChevronLeft, Gauge, Disc } from "lucide-react";

type Track = {
  interval: string;
  variant: "backing" | "backing-slowed";
  filename: string;
  url: string;
  size: number;
};

const INTERVALS = [
  "Seconds",
  "Thirds",
  "Fourths",
  "Fifths",
  "Sixths",
  "Sevenths",
  "Octaves",
  "Compound Intervals",
  "Mixed Intervals - part 1",
  "Mixed Intervals - part 2",
];

const INTERVAL_DESCRIPTIONS: Record<string, string> = {
  Seconds: "Segones (2a) — el moviment més bàsic del diapasó.",
  Thirds: "Tercers (3a) — l'interval més melòdic.",
  Fourths: "Quartes (4a) — so modern i suspès (Holdsworth, jazz modal).",
  Fifths: "Quintes (5a) — poder i estabilitat, pedal tones.",
  Sixths: "Sextes (6a) — so dolç i cantable.",
  Sevenths: "Sèptimes (7a) — tensió i color, línies bebop.",
  Octaves: "Octaves (8a) — so ple i ample (Wes Montgomery, Benson).",
  "Compound Intervals": "Intervals compostos (9a, 10a, 11a) — extensions de fusió.",
  "Mixed Intervals - part 1": "Mescla 2a, 3a i 4a — coordinació avançada.",
  "Mixed Intervals - part 2": "Mescla 4a, 5a, 6a i 7a — el repte final.",
};

// L app pot estar a l arrel (servidor local) o en un subdirectori (GitHub Pages).
// Deduim l arrel de l app a partir de la URL actual, buscant el segment "/biblioteca/".
function arrelApp(): string {
  if (typeof window === "undefined") return "";
  const i = window.location.pathname.indexOf("/biblioteca/");
  return i > 0 ? window.location.pathname.slice(0, i) : "";
}

function buildTracks(): Track[] {
  const tracks: Track[] = [];
  for (const interval of INTERVALS) {
    const variants: Array<{ variant: Track["variant"]; filename: string; size: number }> = [
      { variant: "backing", filename: `Solo Study (${interval}) - backing track.mp3`, size: 2.5 },
      { variant: "backing-slowed", filename: `Solo Study (${interval}) - backing track[SLOWED DOWN].mp3`, size: 3.2 },
    ];
    for (const v of variants) {
      tracks.push({
        interval,
        variant: v.variant,
        filename: v.filename,
        url: `/library/audio/creative-intervallic/${encodeURIComponent(v.filename)}`,
        size: v.size * 1024 * 1024,
      });
    }
  }
  return tracks;
}

const VARIANT_LABELS: Record<Track["variant"], { label: string; color: string; description: string }> = {
  backing: { label: "Backing", color: "badge-copper", description: "Acompanyament a velocitat original" },
  "backing-slowed": { label: "Backing alentit", color: "badge-success", description: "Acompanyament al 80%, per practicar a poc a poc" },
};

export default function BackingTracksPage() {
  const tracks = buildTracks();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const playTrack = (track: Track) => {
    if (currentTrack?.url === track.url && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    if (currentTrack?.url !== track.url) setCurrentTrack(track);
    setAudioSrc(`${arrelApp()}${track.url}`);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 50);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
    else { audioRef.current?.play(); setIsPlaying(true); }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <section className="page-header">
        <Link
          href="/biblioteca"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", marginBottom: "1rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}
        >
          <ChevronLeft size={14} /> Tornar a biblioteca
        </Link>
        <h1>Backing Tracks</h1>
        <p>
          10 pistes d&apos;acompanyament per tocar a sobre, una per interval. Cada una té dues versions:
          <strong> normal</strong> i <strong>alentida al 80%</strong>, per començar a poc a poc i anar pujant.
          Tria un interval, dona-li al play i improvisa-hi.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div
          className="card"
          style={{
            position: "sticky", top: "1rem", zIndex: 50, background: "var(--bg-elevated)",
            border: "1px solid var(--accent-copper, var(--accent-gold))", marginBottom: "1.5rem",
            display: currentTrack ? "block" : "none",
          }}
        >
          {currentTrack && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                <button
                  onClick={togglePlay}
                  className="button"
                  style={{ minWidth: 56, height: 56, borderRadius: "50%", padding: 0, justifyContent: "center" }}
                  aria-label={isPlaying ? "Pausa" : "Reprodueix"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "var(--accent-amber)", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.125rem" }}>
                    {currentTrack.interval}
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                    {VARIANT_LABELS[currentTrack.variant].label}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Gauge size={14} color="var(--text-muted)" />
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", color: "var(--text-primary)", padding: "0.25rem 0.5rem", fontSize: "0.8125rem" }}
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                  </select>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-muted)", minWidth: 90, textAlign: "right" }}>
                  {formatTime(progress)} / {formatTime(duration)}
                </div>
              </div>
              <div style={{ height: 4, background: "var(--bg-tertiary)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: duration > 0 ? `${(progress / duration) * 100}%` : "0%", background: "linear-gradient(90deg, var(--accent-gold), var(--accent-amber))", transition: "width 0.1s linear" }} />
              </div>
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          preload="none"
        />

        {INTERVALS.map((interval) => {
          const intervalTracks = tracks.filter((t) => t.interval === interval);
          return (
            <div key={interval} className="card" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Disc size={18} color="var(--accent-amber)" />
                <h2 style={{ color: "var(--accent-amber)", fontSize: "1.125rem", margin: 0 }}>{interval}</h2>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                {INTERVAL_DESCRIPTIONS[interval]}
              </p>
              <div className="grid grid-2">
                {intervalTracks.map((track) => {
                  const isCurrent = currentTrack?.url === track.url;
                  const playing = isCurrent && isPlaying;
                  const variantInfo = VARIANT_LABELS[track.variant];
                  return (
                    <button
                      key={track.filename}
                      onClick={() => playTrack(track)}
                      className="card"
                      style={{
                        background: isCurrent ? "var(--bg-elevated)" : "var(--bg-tertiary)",
                        border: isCurrent ? "1px solid var(--accent-gold)" : "1px solid var(--border-subtle)",
                        textAlign: "left", cursor: "pointer", padding: "0.875rem", color: "inherit",
                        display: "flex", alignItems: "center", gap: "0.75rem",
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: isCurrent ? "var(--accent-amber)" : "var(--bg-elevated)", color: isCurrent ? "var(--text-on-accent)" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {playing ? <Pause size={16} /> : <Play size={16} />}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                          <span className={`badge ${variantInfo.color}`}>{variantInfo.label}</span>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                            {track.size > 0 ? `${(track.size / 1024 / 1024).toFixed(1)} MB` : ""}
                          </span>
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>{variantInfo.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
