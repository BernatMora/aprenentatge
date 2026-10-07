import Link from "next/link";
import {
  Users,
  Music,
  Wrench,
  Layers,
  Sparkles,
  ListChecks,
  PlayCircle,
  Guitar,
} from "lucide-react";

const sections = [
  {
    href: "/artistes",
    icon: Users,
    title: "Artistes",
    description: "Descobreix els guitarristes clau del country: Brent Mason, Albert Lee, Brad Paisley, Chet Atkins, i molts més.",
    color: "gold",
  },
  {
    href: "/escales",
    icon: Music,
    title: "Escales",
    description: "Escales essencials per a country amb diapasó interactiu: pentatòniques, blues, mixolidi, country scale...",
    color: "copper",
  },
  {
    href: "/tecniques",
    icon: Wrench,
    title: "Tècniques",
    description: "Chicken pickin', hybrid picking, banjo rolls, double stops, pedal steel bends, Travis picking...",
    color: "gold",
  },
  {
    href: "/progressions",
    icon: Layers,
    title: "Progressions",
    description: "Progressions clàssiques de country, bluegrass i honky-tonk amb suggeriments d'escales.",
    color: "copper",
  },
  {
    href: "/licks",
    icon: Sparkles,
    title: "Licks",
    description: "Licks característics del country: obertures, bends, rolls i frases per incorporar al teu vocabulari.",
    color: "gold",
  },
  {
    href: "/rutines",
    icon: ListChecks,
    title: "Rutines",
    description: "Rutines guiades de 15, 30, 45 i 60 minuts. Des de principiant fins a nivell avançat.",
    color: "copper",
  },
  {
    href: "/practica",
    icon: PlayCircle,
    title: "Pràctica",
    description: "Sala de pràctica amb metrònom o backing track generat (drums + baix + pad) per tocar amb so real.",
    color: "gold",
  },
];

const stats = [
  { value: "10", label: "Artistes" },
  { value: "12", label: "Escales" },
  { value: "12", label: "Tècniques" },
  { value: "20", label: "Progressions" },
  { value: "15+", label: "Licks" },
  { value: "6", label: "Rutines" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Country Guitar</h1>
        <p>
          La teva eina per practicar guitarra country: modern, clàssic i bluegrass.
          Tècniques, escales, progressions, artistes, licks i rutines — tot en un sol lloc.
        </p>
        <Link href="/practica" className="button">
          <PlayCircle size={18} />
          Comença a practicar
        </Link>
      </section>

      <section className="section">
        <h2 className="section-title">Continguts</h2>
        <p className="section-subtitle">
          Tria per on vols començar. Cada secció té teoria, exemples i exercicis pràctics.
        </p>

        <div className="grid grid-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="card" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div
                    className="site-logo-icon"
                    style={{
                      background:
                        s.color === "gold"
                          ? "linear-gradient(135deg, var(--accent-gold), var(--accent-amber))"
                          : "linear-gradient(135deg, var(--accent-copper), var(--accent-gold))",
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 style={{ fontSize: "1.125rem", color: "var(--accent-amber)" }}>{s.title}</h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", margin: 0 }}>
                  {s.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">En números</h2>
        <p className="section-subtitle">
          Material curat, organitzat per nivell i estil.
        </p>
        <div className="grid grid-3" style={{ gap: "1rem" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="card" style={{ textAlign: "center", padding: "1.25rem" }}>
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--accent-amber)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ background: "linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))" }}>
          <h2 style={{ marginBottom: "1rem" }}>Com treballar amb aquesta app</h2>
          <ol style={{ color: "var(--text-secondary)", paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Escolta:</strong> Comença pels artistes. Tria 2-3 que t'agradin i escolta'ls activament.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Aprèn:</strong> Explora les tècniques que fan servir. Practica-les amb el diapasó interactiu.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Aplica:</strong> Tria progressions reals i improvisa sobre elles amb els licks apresos.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong style={{ color: "var(--text-primary)" }}>Estructura:</strong> Segueix una rutina de 15-60 minuts que combinï tècnica + improvisació.
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Grava't:</strong> Qualsevol exercici, per simple que sigui, val la pena enregistrar-lo.
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
