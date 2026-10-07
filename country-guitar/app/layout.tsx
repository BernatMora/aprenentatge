import type { Metadata } from "next";
import Link from "next/link";
import { Guitar } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Country Guitar — Pràctica de guitarra country",
  description: "App per practicar guitarra country: modern, clàssic i bluegrass. Tècniques, escales, progressions, artistes, licks i rutines.",
};

const navItems = [
  { href: "/", label: "Inici" },
  { href: "/artistes", label: "Artistes" },
  { href: "/escales", label: "Escales" },
  { href: "/tecniques", label: "Tècniques" },
  { href: "/progressions", label: "Progressions" },
  { href: "/licks", label: "Licks" },
  { href: "/rutines", label: "Rutines" },
  { href: "/practica", label: "Pràctica" },
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
                <Guitar size={18} />
              </span>
              <span>Country Guitar</span>
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
            Country Guitar · App de pràctica per a guitarra · Modern, clàssic i bluegrass ·
            Construït amb ♪ per aprendre, explorar i tocar.
          </p>
        </footer>
      </body>
    </html>
  );
}
