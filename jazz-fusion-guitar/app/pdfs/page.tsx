"use client";

import { FileText, BookOpen, ExternalLink, FolderOpen } from "lucide-react";

export default function PDFsPage() {
  return (
    <>
      <section className="page-header">
        <h1>Biblioteca de PDFs</h1>
        <p>
          Material de lectura: PDFs de referència sobre progressions, tècniques i teoria del jazz.
          Aquesta secció s'anirà ampliant a mesura que sincronitzis la teva carpeta de música
          d'OneDrive.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="card" style={{ marginBottom: "1.5rem", background: "linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", fontSize: "1.125rem" }}>
            <FolderOpen size={20} /> Progressions Classics (ja disponibles)
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem", fontSize: "0.9375rem" }}>
            Tres volums de progressions clàssiques en format PDF, ja integrats a l'aplicació.
          </p>
          <div className="grid grid-3">
            {[
              { file: "Progressions Classics Volume 1.pdf", label: "Volum 1" },
              { file: "Progressions Classics Volume 2.pdf", label: "Volum 2" },
              { file: "Progressions Classics Volume 3.pdf", label: "Volum 3" },
            ].map((pdf) => (
              <a
                key={pdf.file}
                href={`/documents/${encodeURIComponent(pdf.file)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: "none", color: "inherit", display: "block", padding: "1rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <FileText size={18} color="var(--accent-amber)" />
                  <span style={{ color: "var(--accent-amber)", fontWeight: 600, fontSize: "0.9375rem" }}>{pdf.label}</span>
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginBottom: "0.5rem" }}>
                  {pdf.file}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--accent-amber)", fontSize: "0.8125rem" }}>
                  Obrir <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: "var(--bg-card)", border: "1px dashed var(--border-default)" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", fontSize: "1.125rem" }}>
            <BookOpen size={20} />Properament
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Quan sincronitzis la teva carpeta de música d'OneDrive, afegirem aquí tots els PDFs
            amb categorització automàtica (per títol, temàtica, artista...).
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            <li>Materials de Berklee i altres escoles</li>
            <li>Transcripcions d'artistes específics</li>
            <li>Llibres de progressions i voicings</li>
            <li>Backing tracks i materials d'àudio</li>
          </ul>
        </div>
      </section>
    </>
  );
}
