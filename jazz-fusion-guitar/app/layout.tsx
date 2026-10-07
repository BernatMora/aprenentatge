import type { Metadata } from "next";
import Link from "next/link";
import { Music } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Jazz Fusion Guitar — Pràctica de guitarra elèctrica",
  description: "App per practicar guitarra elèctrica de jazz fusió i rock fusion. Escales, tècniques, progressions, artistes, rutines i més.",
};

const navItems = [
  { href: "/", label: "Inici" },
  { href: "/artistes", label: "Artistes" },
  { href: "/escales", label: "Escales" },
  { href: "/tecniques", label: "Tècniques" },
  { href: "/progressions", label: "Progressions" },
  { href: "/connexions", label: "Connexions" },
  { href: "/substitucions", label: "Substitucions" },
  { href: "/improvitzacio", label: "Improvisació" },
  { href: "/exercicis", label: "Exercicis" },
  { href: "/rutines", label: "Rutines" },
  { href: "/practica", label: "Pràctica" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/favorits", label: "Favorits" },
  { href: "/progres", label: "Progrés" },
  { href: "/referencia", label: "Referència" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/configuracio/mycloud", label: "Setup" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="site-logo">
              <span className="site-logo-icon">
                <Music size={18} />
              </span>
              <span>Jazz Fusion Guitar</span>
            </Link>
            <nav className="site-nav">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <SearchBar />
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <p>
            Jazz Fusion Guitar · App de pràctica per a guitarra elèctrica ·
            Construït amb ♪ per aprendre, explorar i tocar.
          </p>
        </footer>
      </body>
    </html>
  );
}
