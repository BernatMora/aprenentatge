# 🗺️ Mapa viu del repertori

Els 20 estàndards del quadern col·locats al **cercle de quintes** segons el seu to.
Clica un tema → veus la progressió real amb els graus funcionals i pots **escoltar-la** 🔊
(amb `audio.js`, el mateix sintetitzador Web Audio del curs d'harmonia).

- **Port:** 3051 · **pm2:** `mapa-repertori` · **URL:** `http://100.115.134.76:3051/`
- **Dades:** `temes.json` (extret del quadern `harmonia-avancat/curs.html`)
- **API:** `/api/temes`, `/api/tema?id=N` (amb coordenades x,y per al cercle SVG)
- Només tailnet. Al Webs Radar i a la Homepage.

## Regenerar temes.json
Si canvia el quadern, extreu de nou:
```bash
python3 extrae-temes.py   # (o el snippet que va generar temes.json)
```
