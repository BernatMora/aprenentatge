# Codi font de les apps de guitarra

Aquesta branca `source` conte **nomes el codi** de les dues apps. La branca `main`
es el lloc publicat (export estatic), i les dues no es barregen.

## Les apps

- `jazz-fusion-guitar/` — Jazz Fusion Guitar (Next.js 15, App Router)
- `country-guitar/` — Country Guitar (Next.js 15, App Router)

## Que NO hi es (a posta)

- `node_modules/`, `.next/`, `out/` → es regeneren amb `npm install` i `npm run build`
- `public/` → els actius (114 MB d'audio i 67 MB de PDFs) JA son publicats a
  <https://bernatmora.github.io/aprenentatge/> i es poden recuperar d'alla.
  L'audio viu a `library/audio/` i els PDFs a `documents/`.

## Com aixecar-les

```bash
cd jazz-fusion-guitar
npm install
npm run dev        # desenvolupament
npm run build      # compilacio normal
```

Per publicar a GitHub Pages cal construir l'export estatic amb `output: "export"`,
`images.unoptimized`, `trailingSlash` i `basePath: "/aprenentatge/<app>"`.
El proces complet es a la seccio 3e del RUNBOOK de la RPi.

## Nota

El projecte viu tambe a la Raspberry Pi (`~/jazz-fusion-guitar`, `~/country-guitar`),
servit per pm2 als ports 3030 i 3040. Aquesta branca existeix perque el codi
sobreviu si la targeta SD falla, i perque el MacBook Air M4 pugui fer-hi els
builds sense gastar dades de la 4G.
