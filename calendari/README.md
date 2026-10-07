# Calendari 2027 · BernatLab

Plantilla **editable** del calendari anual A3 vertical: 12 pàgines, una per mes, amb el
dibuix a dalt (i l'escrit sobreposat), el títol del mes i la graella dels dies a sota amb
les **fases de la lluna reals del 2027** i espai per escriure-hi a cada casella.

Tot es pot ajustar des de la mateixa pantalla: mides, tipografies, colors, posicions,
festius, mides de casella… i tot queda desat sol al navegador.

---

## 1. Com s'obre

- **Des de qualsevol lloc, sense Tailscale** (per enviar-ho a ella o a qui calgui):
  **https://hortosona.tail37c051.ts.net/calendari/**
  (publicat amb el Funnel de Tailscale de la Raspberry; cal la barra final, tot i que
  l'app ja ho arregla sola si s'oblida)
- **Dins del bernatlab** (Tailscale): `http://100.115.134.76:3019/`
- **En local (desenvolupament)**: `node tools/dev-server.mjs` i obrir `http://127.0.0.1:8099/`

> Cal obrir-lo per `http://` o `https://` (no amb `file://`): si no, el navegador no deixa
> desar els dibuixos a IndexedDB.
>
> **Privacitat**: el camí del Funnel és públic (qualsevol que tingui l'enllaç hi entra).
> L'app no conté cap dada personal — només la plantilla amb els esborranys de prova — i la
> feina de cadascú es desa **al seu propi navegador**, no al servidor. Si es vol més
> privacitat: canviar el camí per un de difícil d'endevinar o desactivar-lo amb
> `sudo tailscale funnel --set-path=/calendari off`.

## 2. Com es fa servir (4 passes)

1. **Tria el mes** a la barra de dalt (o clica la pàgina a la previsualització).
2. **Escriu el text** a «Escrit d'aquest mes» (pot tenir diverses línies).
3. **Puja el dibuix** amb «Puja un dibuix…» o arrossegant la imatge damunt la pàgina.
4. **Col·loca'l**: tria «Mou l'escrit» o «Mou el dibuix» i arrossega damunt la previsualització.
   Les barres del panell fan el mateix amb precisió (i les fletxes del teclat per afinar).

Quan ja està: **«Imprimeix aquest mes»** (A3) o **«Exporta els 12 mesos (ZIP)»**.

### Desar i enviar la feina

- Tot es desa **sol** en aquest navegador (textos i ajustos a `localStorage`, dibuixos a
  IndexedDB). Si es canvia d'ordinador o de navegador, no hi són.
- Per passar-ho a una altra persona: **«Desa el projecte (.json)»** i enviar el fitxer
  (conté textos, ajustos i, si es vol, els dibuixos). Amb **«Obre un projecte (.json)»**
  es recupera tot tal com estava.

## 3. Maquetació (el que fa el motor)

El full és de **297 × 420 mm** i totes les mides es treballen en mil·límetres reals, així
que el que es veu és exactament el que s'imprimeix. La graella dels dies mana: les caselles
fan la mida que es tria (35 × 35 mm per defecte), s'ancoren al marge inferior i el dibuix
ocupa tota la resta de dalt.

Amb els valors per defecte:

| Element            | Mida / posició                                  |
|--------------------|-------------------------------------------------|
| Pàgina             | 297 × 420 mm (A3 vertical), marge de 10 mm      |
| Casella de dia     | **35 × 35 mm** (7 columnes × 6 files)           |
| Graella            | 245 × 210 mm, centrada, de y = 200 a y = 410 mm  |
| Espai per escriure | **~22 mm d'alt per casella**, a sota del número |
| Dibuix             | 277 × 161 mm (tota la part de dalt)             |
| Títol del mes      | franja de 16 mm, alineat amb la graella         |
| Capçalera de dies  | franja de 8 mm                                  |

A cada casella: el **número del dia** a dalt a l'esquerra, la **lluna** (icona petita) a
dalt a la dreta, i el **nom de la fase** («Lluna plena», «Quart creixent»…) a baix, només
als 4 dies clau. Al mig queda l'espai lliure per escriure-hi.

## 4. Les llunes del 2027

El motor (`js/moon.js`) implementa els algorismes de Jean Meeus (*Astronomical Algorithms*,
cap. 49 per als instants de les fases i cap. 25/47/48 per a la fracció il·luminada). No depèn
d'internet ni de cap dada externa: es pot canviar l'any i es recalcula tot.

**Verificació**: les **49 fases del 2027** calculades coincideixen amb l'efemèride oficial de
referència (Sky Event Almanac 2027, Fred Espenak / astropixels) **dins de ±29 segons**, i les
hores surten en hora local de Catalunya (Europe/Madrid, amb el canvi d'hora aplicat).

## 5. Estructura

```
calendari-2027/
  index.html            interfície
  css/style.css         estil de l'app (no del calendari) + estils d'impressió A3
  js/moon.js            motor astronòmic (fases + fracció il·luminada + dibuix de la lluna)
  js/data.js            noms en català, festius (amb Pasqua calculada), disseny per defecte
  js/calendar.js        graella mensual, festius del dia, lluna de cada dia
  js/placeholder.js     dibuixos de prova generats amb canvas (12 paletes)
  js/images.js          preparació dels dibuixos pujats (versió ràpida i d'impressió)
  js/render.js          motor de maquetació: construeix cada pàgina com a SVG
  js/zip.js             empaquetador ZIP (per exportar els 12 mesos)
  js/exporter.js        SVG -> PNG/JPG, ZIP i impressió
  js/store.js           desat local (localStorage + IndexedDB, amb alternativa en memòria)
  js/ui.js              panell de control declaratiu (afegir opcions = afegir línies)
  js/app.js             controlador: estat, previsualització, accions, impressió
  tools/                servidor de proves i bateries de proves (no es publica)
```

Sense build ni dependències externes: JS natiu amb IIFE i SVG. Es pot editar i recarregar.

## 6. Comprovacions

```bash
node tools/test-moon.mjs      # 49 fases del 2027 contra l'efemèride oficial + fracció il·luminada
node tools/test-render.mjs    # 44 comprovacions de maquetació i contingut de les pàgines
```

Al navegador (amb el servidor de proves en marxa):

- `http://127.0.0.1:8099/tools/selftest.html` — 35 comprovacions del motor dins el navegador
  (llunes, graella, dibuixos, rasterització, PNG/JPG, ZIP, IndexedDB, panell).
- `http://127.0.0.1:8099/tools/proves.html` — tot l'anterior + l'app real dins un iframe
  (12 pàgines pintades, edició de text, desat) + **5 comprovacions visuals de la pantalla**
  (que cap capa tapi la pàgina, que la capa de progrés estigui amagada i que l'estat sigui bo).
- `http://127.0.0.1:8099/tools/prova-idb.html` — prova aïllada de l'emmagatzematge.

> **Lliçó apresa**: les comprovacions han de mirar la **pantalla**, no només el DOM. Un `display: flex`
> al CSS guanya l'atribut `hidden` i pot deixar una capa tapant tota l'app sense que cap prova
> que només llegeixi el DOM se n'adoni (va passar amb la capa «Treballant…»).

Comprovacions destacades que passen: el canvas **no queda contaminat** en rasteritzar
(l'exportació a PNG/JPG funciona), la pàgina exportada fa **1782 × 2520 px a 6 px/mm**
(= A3), l'espai d'escriptura de la casella queda **buit**, i la lluna plena del 22 de gener
surt com un disc fosc sencer.

## 7. Robustesa (per què no es pot quedar «carregant»)

- La previsualització són **SVG incrustats al DOM**, no imatges que s'hagin de carregar:
  no hi ha cap espera asíncrona que es pugui encallar i funciona igual a tots els navegadors.
- L'app és usable **al primer instant**; els dibuixos de prova es generen **d'un en un**
  amb el progrés a la barra d'estat (mesurat: app a punt en ~0,8 s i 12 dibuixos en ~0,3 s
  en un ordinador normal; en un mòbil triga més però es veu el progrés).
- Qualsevol error queda a la vista: a la barra d'estat hi ha un desplegable
  **«diagnòstic»** amb el navegador, si IndexedDB funciona, quantes pàgines s'han pintat,
  els temps d'arrencada i la llista d'avisos i errors. Si alguna cosa va malament, allò
  diu exactament què passa.
- Si un dibuix no es pot generar o una pàgina no es pot pintar, es continua endavant
  (sense dibuix o amb la pàgina buida) en comptes de quedar-se penjat.

## 8. Desplegament al bernatlab

Segons el runbook del homelab (`HOMELAB.md` / `DEPLOY.md`):

| Cosa        | Valor                                                     |
|-------------|-----------------------------------------------------------|
| Port        | **3019** (el 3017 ja el tenia `la-r`)                     |
| Fitxers     | `/mnt/nuvol/projects/calendari-2027/`                     |
| Compose     | `/home/bernat/homelab/compose/calendari-2027/compose.yml` |
| Contenidor  | `nginx:alpine`, bind-mount `:ro`                          |
| Accés extern| Funnel: `/calendari` → `http://127.0.0.1:3019`            |

```bash
ssh hortosona "sudo mkdir -p /mnt/nuvol/projects/calendari-2027 && sudo chown -R bernat:bernat /mnt/nuvol/projects/calendari-2027"
scp -q index.html hortosona:/mnt/nuvol/projects/calendari-2027/
scp -rq css js hortosona:/mnt/nuvol/projects/calendari-2027/
ssh hortosona "sudo chmod -R a+rX /mnt/nuvol/projects/calendari-2027"
ssh hortosona "cd /home/bernat/homelab/compose/calendari-2027 && docker compose up -d"
```

## 9. Idees pendents (per polir amb ella)

- Pujar una tipografia pròpia (fitxer .ttf/.otf) per fer servir al text i al títol.
- Imatge de fons a pàgina completa o dibuix a sang (sangrat, per impremta).
- Números de setmana i fase lunar amb nom a tots els dies.
- Un mode «senzill» (només text i dibuix) i un d'avançat, per si el panell li sembla massa.
- Exportar també un PDF de 12 pàgines generat per l'app, sense passar pel diàleg d'impressió.
