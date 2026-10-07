"use client";

import Link from "next/link";
import { Music, FileText, Disc, Headphones, ChevronRight, Network } from "lucide-react";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof Music;
  href: string;
  status: "available" | "pending";
  itemCount: number;
  totalSize: string;
  color: string;
};

// Format de milers DETERMINISTA. toLocaleString() dona resultats diferents al Node
// (en-US -> "9,634") i al navegador (ca-ES -> "9.634"), i aixo trenca la hidratacio
// de React i fa petar la pagina amb "Application error".
const milers = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const categories: Category[] = [
  {
    id: "creative-intervallic",
    title: "Creative Intervallic Guitar Soloing",
    description: "10 estudis d'improvisació per intervals (2a a 8a + compostos). Cada un amb 4 versions: sol normal, sol alentit, backing i backing alentit. Aprèn tocant a sobre del backing a velocitat reduïda.",
    icon: Headphones,
    href: "/biblioteca/creative-intervallic",
    status: "available",
    itemCount: 42,
    totalSize: "113 MB",
    color: "gold",
  },
  {
    id: "backing-tracks",
    title: "Backing Tracks",
    description: "10 pistes d'acompanyament per practicar, una per interval, amb versio normal i alentida al 80%.",
    icon: Disc,
    href: "/biblioteca/backing-tracks",
    status: "available",
    itemCount: 20,
    totalSize: "58 MB",
    color: "copper",
  },
  {
    id: "pdfs",
    title: "PDFs i partitures",
    description: "Material imprès: transcripcions, partitures, llibres, tutorials.",
    icon: FileText,
    href: "#",
    status: "pending",
    itemCount: 120,
    totalSize: "50 MB",
    color: "gold",
  },
  {
    id: "tabs",
    title: "Guitar Pro Tabs",
    description: "Més de 10.000 tabs en format Guitar Pro (.gp3, .gp4, .gtp).",
    icon: Music,
    href: "#",
    status: "pending",
    itemCount: 9634,
    totalSize: "226 MB",
    color: "copper",
  },
  {
    id: "blues-jazz-audio",
    title: "Àudio Blues & Jazz",
    description: "Col·lecció de blues i jazz per escoltar i estudiar. CD-Jazz, Absolute Blues, Blues For Guitar, etc.",
    icon: Disc,
    href: "#",
    status: "pending",
    itemCount: 116,
    totalSize: "299 MB",
    color: "gold",
  },
  {
    id: "country",
    title: "Country & More",
    description: "Material de country guitar, tabs i backings.",
    icon: Music,
    href: "#",
    status: "pending",
    itemCount: 76,
    totalSize: "127 MB",
    color: "copper",
  },
];

export default function BibliotecaPage() {
  return (
    <>
      <section className="page-header">
        <h1>Biblioteca</h1>
        <p>
          Material de pràctica: àudios, PDFs, tabs i molt més. Cada secció té un player o visor
          integrat per practicar directament al navegador.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card" style={{ marginBottom: "1.5rem", background: "linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Estat de la biblioteca</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", margin: 0 }}>
            La biblioteca s&apos;amplia gradualment. Les seccions marcades amb{" "}
            <span className="badge">Pendent</span> estaran disponibles quan es processi el
            material del My Cloud Home.
          </p>
          <div style={{ marginTop: "0.75rem" }}>
            <Link
              href="/configuracio/mycloud"
              className="button button-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
            >
              <Network size={16} /> Guia: Connectar el My Cloud Home
            </Link>
          </div>
        </div>

        <div className="grid grid-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isAvailable = cat.status === "available";
            const Wrapper = isAvailable ? Link : "div";
            const wrapperProps = isAvailable ? { href: cat.href } : {};

            return (
              <Wrapper
                key={cat.id}
                {...(wrapperProps as any)}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  cursor: isAvailable ? "pointer" : "default",
                  opacity: isAvailable ? 1 : 0.65,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div
                    className="site-logo-icon"
                    style={{
                      background:
                        cat.color === "gold"
                          ? "linear-gradient(135deg, var(--accent-gold), var(--accent-amber))"
                          : "linear-gradient(135deg, var(--accent-copper), var(--accent-gold))",
                      width: 40,
                      height: 40,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <h3 style={{ color: "var(--accent-amber)", fontSize: "1.0625rem", margin: 0 }}>{cat.title}</h3>
                      {isAvailable ? (
                        <span className="badge badge-success">Disponible</span>
                      ) : (
                        <span className="badge">Pendent</span>
                      )}
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                      {cat.description}
                    </p>
                  </div>
                  {isAvailable && <ChevronRight size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 4 }} />}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                  <span className="badge">{milers(cat.itemCount)} fitxers</span>
                  <span className="badge badge-copper">{cat.totalSize}</span>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>
    </>
  );
}
