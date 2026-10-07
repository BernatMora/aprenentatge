# 🎸 Jazz Fusion Guitar

App web per practicar guitarra elèctrica de **jazz fusió** i **rock fusion**. Reuneix escales, tècniques, progressions, artistes, rutines, exercicis i una sala de pràctica amb metrònom i backing track generat.

## 🚀 Arrencar ràpid

```bash
cd C:\Users\iadmin\Documents\Apps\jazz-fusion-guitar
npm install
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000) al navegador.

Si el port 3000 està ocupat:

```bash
npm run dev -- -p 3001
```

## 📦 Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (estricte, 0 errors)
- **Web Audio API** (metrònom + backing track generat)
- **lucide-react** (icones)
- CSS custom (sense Tailwind, però fàcil d'afegir)

## 📂 Estructura

```
jazz-fusion-guitar/
├── app/                    # Rutes Next.js
│   ├── page.tsx           # Inici
│   ├── artistes/          # 17 artistes
│   ├── escales/           # 22 escales + diapasó
│   ├── tecniques/         # 12 tècniques + rutines
│   ├── progressions/      # 40 progressions
│   ├── connexions/        # Escala ↔ Progressió
│   ├── substitucions/     # 12 substitucions + catàleg
│   ├── improvitzacio/     # Tècniques d'improvisació
│   ├── exercicis/         # 25+ exercicis pràctics
│   ├── rutines/           # 8 rutines guiades
│   ├── practica/          # Sala amb metrònom/backing
│   ├── referencia/        # Intervals, taules, cromatisme
│   └── pdfs/              # Biblioteca (3 PDFs ja)
├── components/
│   └── Fretboard.tsx      # Diapasó interactiu
├── hooks/
│   ├── useMetronome.ts    # Metrònom Web Audio
│   └── useBackingTrack.ts # Drums + baix + pad
├── data/                  # 13 fitxers de contingut
├── types/music.ts         # Tipus compartits
└── public/documents/      # PDFs servits
```

## ✨ Funcionalitats principals

### 🎼 Diapasó interactiu (`/escales/[id]`)
- 22 escales amb notes generades en totes les posicions
- Tonalitat configurable (C a B)
- Mode "mostra graus" o "mostra notes"
- La tònica sempre destacada

### 🥁 Backing track generat (`/practica`)
- 7 patrons rítmics: swing, straight, bossa, shuffle, bembé, rock, funk
- Drums (kick/snare/hi-hat) + baix walking + pad d'acord
- Canvi d'acord automàtic segons la progressió triada
- Transposador de ±6 semitons

### 🎯 Exercicis pràctics (`/exercicis`)
- 25+ exercicis amb estructura pedagògica completa
- Filtres per categoria (ritme, harmonia, melodia, oïda, tècnica, integració) i nivell
- Cada exercici té: objectiu, setup, passos amb durada i tempo, consells, avaluació i següent pas
- Progrés desat en memòria mentre dura la sessió

### 🗺️ Connexions escala-progressió (`/connexions`)
- Sidebar amb progressions i vista detallada a la dreta
- Per a cada acord: opcions d'escales amb prioritat (principal / alternativa / avançat)
- Justificació teòrica i consell pràctic per a cada combinació
- Exemple pràctic amb seqüència i referència d'escolta

## 📊 Continguts

| Secció | Quantitat |
|--------|-----------|
| Artistes | 17 |
| Escales | 22 |
| Tècniques | 12 (+ 5 rutines + 6 enfocaments d'artistes) |
| Progressions | 40 |
| Connexions | 20+ progressions amb escales recomanades |
| Substitucions | 12 + 13 acords amb pentatòniques i tríades |
| Tècniques d'improvització | 10 |
| Exercicis pràctics | 25+ |
| Rutines | 8 (30-60 min) |
| PDFs | 3 ja integrats |

## 🛠️ Desenvolupament

```bash
# Comprovar tipus TypeScript
npx tsc --noEmit

# Build de producció
npm run build

# Iniciar en mode producció
npm run start
```

## 📚 Fonts del contingut

Tot el contingut musical s'ha reaprofitat de dos projectes anteriors:

- `../rork-app-para-practicar-jazz-fusi-n/expo/data/` — Dades originals (artistes, tècniques, progressions, exercicis, rutines, substitucions, escales)
- `../rork-escalas-guitar-app/web/` — Inspiració per l'estructura i el component Fretboard

## 🔮 Possibles millores

- Persistència de progrés amb `localStorage`
- PWA (Service Worker per ús offline)
- Més PDFs (quan arribin d'OneDrive)
- Mode fosc/clar (ja és fosc per defecte)
- Més patrons rítmics (latin, odd meters, etc.)
- Sistema de favorits

---

Construït amb 🎵 per practicar, explorar i tocar.
