#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor del Mapa Viu del Repertori (port 3051).

Serveix ~/mapa-repertori i una API amb els 20 estàndards del quadern:
posició al cercle de quintes segons el seu to, progressió real i graus.

API:
  GET /api/temes   -> [{nom, to, acords[], graus[], x, y}] (x,y = posició cercle)
  GET /api/tema?id=3 -> detall d'un tema

Pattern: ReusableTCPServer + SimpleHTTPRequestHandler (com diari/quiz/webs-radar).
Només tailnet (com la resta del dashboard).
"""
import http.server
import socketserver
import os
import json
import math
import urllib.parse

PORT = 3051
DIRECTORY = "/home/bernat/mapa-repertori"
TEMES = os.path.join(DIRECTORY, "temes.json")

# cercle de quintes: índex de cada to (C=0, G=1, D=2, ... en quintes pujant)
CERCLE = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"]
# variants de nom -> índex
ALIAS = {}
for i, t in enumerate(CERCLE):
    ALIAS[t] = i
    ALIAS[t + "m"] = i          # menor comparteix posició (relatiu)
for nom, idx in list(ALIAS.items()):
    pass
# afegir bemolls equivalents
BEMOLLS = {"Db": "C#", "Ab": "G#", "Eb": "D#", "Bb": "A#", "Gb": "F#"}
for b, s in BEMOLLS.items():
    if b in ALIAS and s not in ALIAS:
        ALIAS[s] = ALIAS[b]
        ALIAS[s + "m"] = ALIAS[b]


def carrega_temes():
    try:
        with open(TEMES, encoding="utf-8") as f:
            temes = json.load(f)
    except Exception:
        return []
    out = []
    R = 300  # radi del cercle (coordenades SVG/canvas)
    for i, t in enumerate(temes):
        to = t["to"].strip()
        idx = ALIAS.get(to)
        if idx is None and to.endswith("m"):
            idx = ALIAS.get(to[:-1])
        if idx is None:
            idx = 0
        angle = (idx / 12.0) * 2 * math.pi - math.pi / 2  # C a dalt
        x = 400 + R * math.cos(angle)
        y = 340 + R * math.sin(angle)
        # modulacions detectades: canvis de to dins la progressió (graus amb b/# sobtats
        # o canvis de centre evident). Simplificat: comptem quants graus "alterats" hi ha.
        alters = sum(1 for g in t.get("graus", []) if "#" in g or (g.lower().startswith("b") and g[1:2].isdigit()))
        out.append({
            "id": i, "nom": t["nom"], "to": to,
            "menor": to.endswith("m"),
            "estil": t.get("estil", ""),
            "acords": t["acords"], "graus": t["graus"],
            "x": round(x, 1), "y": round(y, 1),
            "modulacions": alters,
        })
    # relacions entre temes: mateix to, relatiu (mateix cercle), tríton (6 passos)
    relacions = []
    for a in out:
        for b in out:
            if a["id"] >= b["id"]:
                continue
            ia = ALIAS.get(a["to"].rstrip("m"), 0)
            ib = ALIAS.get(b["to"].rstrip("m"), 0)
            d = abs(ia - ib) % 12
            tipus = None
            if d == 0:
                tipus = "mateix to" if a["menor"] == b["menor"] else "relatiu"
            elif d == 6:
                tipus = "tríton"
            elif d in (2, 10):
                tipus = "quinta"
            if tipus:
                relacions.append({"a": a["id"], "b": b["id"], "tipus": tipus})
    return {"temes": out, "relacions": relacions}


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


class MapaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, *args):
        pass

    def _json(self, obj, code=200):
        data = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        q = urllib.parse.parse_qs(parsed.query)
        if parsed.path == "/api/temes":
            dades = carrega_temes()
            return self._json({"ok": True, "temes": dades["temes"],
                               "relacions": dades["relacions"], "cercle": CERCLE})
        if parsed.path == "/api/tema":
            try:
                i = int(q.get("id", ["0"])[0])
                dades = carrega_temes()
                return self._json({"ok": True, "tema": dades["temes"][i]})
            except Exception:
                return self._json({"ok": False}, 400)
        if parsed.path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/index.html")
            self.end_headers()
            return
        self.path = urllib.parse.quote(urllib.parse.unquote(parsed.path), safe="/%")
        return super().do_GET()

    def end_headers(self):
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


print(f"✓ Mapa Viu del Repertori a 0.0.0.0:{PORT}", flush=True)
with ReusableTCPServer(("0.0.0.0", PORT), MapaHandler) as httpd:
    httpd.serve_forever()
