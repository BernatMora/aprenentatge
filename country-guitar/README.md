# Country Guitar — App de pràctica de guitarra country

App web (Next.js) per practicar guitarra country: modern, clàssic i bluegrass.
És una adaptació de la jazz-fusion-guitar, amb contingut 100% country.

## On és i com s'executa

- **Directori**: `/home/bernat/country-guitar` (a hortosona)
- **Port**: `3040` → http://100.115.134.76:3040/
- **Procés**: pm2, nom `country-guitar` (id 3)
- **Enllaçat a Homepage** (`:3000`) via `services.yaml`

## Com es va crear (per si cal replicar)

1. Clonat de `jazz-fusion-guitar` → `country-guitar` (base d'estructura Next.js).
2. Dades noves a `data/` (generades, tot country):
   - `artists.ts` — 10 guitarristes (Brent Mason primer)
   - `country-techniques.ts` — 12 tècniques + rutines + estils de mestres
   - `scales.ts` — 12 escales country
   - `progressions.ts` — 20 progressions
   - `licks.ts` — 18 licks amb tablatura
3. Pàgines adaptades: `app/artistes`, `app/escales`, `app/tecniques`, `app/progressions`, `app/rutines`, `app/practica`.
4. Pàgina nova: `app/licks` (no existia a la jazz).
5. `components/Fretboard.tsx` — afegits els intervals de les escales country a `SCALE_INTERVALS`.
6. `components/SearchBar.tsx` — simplificat per cercar només en seccions country.
7. `styles/globals.css` — paleta country (fusta/cuir/denim).
8. `app/layout.tsx` + `app/page.tsx` — títol, nav i portada country.

## Estructura de dades

- `data/artists.ts` → `Artist[]` (id, name, bio, examples[])
- `data/country-techniques.ts` → `CountryTechnique[]`, `countryPracticeRoutines[]`, `countryArtistApproaches[]`
- `data/scales.ts` → `Scale[]` (id ha de coincidir amb `SCALE_INTERVALS` del Fretboard)
- `data/progressions.ts` → `Progression[]`
- `data/licks.ts` → `CountryLick[]` (id, name, category, description, tab, key, difficulty, artists, tips)

## Desplegament

```bash
cd /home/bernat/country-guitar
npm run build
pm2 restart country-guitar
pm2 save
```

## Pàgines òrfenes de jazz (NO eliminades)

El clon encara conté pàgines de jazz no enllaçades: `biblioteca`, `configuracio`,
`connexions`, `exercicis`, `favorits`, `flashcards`, `improvitzacio`, `pdfs`,
`progres`, `referencia`, `substitucions`. No estan al menú ni a la portada, però
són visibles per URL directa. Es van deixar per decisió de l'usuari (no es va
aprovar eliminar-les). Si es volen treure: `rm -rf app/{biblioteca,configuracio,connexions,exercicis,favorits,flashcards,improvitzacio,pdfs,progres,referencia,substitucions}` i rebuild.

## Hooks reutilitzats (genèrics, no cal tocar-los)

- `hooks/useMetronome.ts` — metrònom
- `hooks/useBackingTrack.ts` — backing track (drums+baix+pad), patrons inclouen shuffle/swing
- `hooks/useAudioRecorder.ts` — gravació
- `hooks/usePracticeTracker.ts` — registre de sessions
