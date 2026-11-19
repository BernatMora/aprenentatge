#!/usr/bin/env python3
"""
canco-server.py — L'ajudant de cançons de Radio-Feina (en aquest ordinador).

Per què cal? La pàgina és un fitxer local i el navegador no deixa mirar la
capçalera `icy-metaint` de la majoria d'emissores, així que no pot saber quina
cançó sona. Aquest ajudant sí: demana el flux, en llegeix el primer bloc de
metadades (uns quants KB) i tanca la connexió. No baixa la música, només el
títol.

  python canco-server.py            # engega l'ajudant al port 8765
  python canco-server.py --prova    # prova totes les emissores de la pàgina
  python canco-server.py --prova "https://..."   # prova una adreça concreta

La pàgina li demana: http://127.0.0.1:8765/api/canco?u=<adreça del flux>
"""
import json
from podcasts import episodes_for
import os
import re
import socket
import ssl
import sys
import time
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = 8765
PAGINA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")
REGISTRE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ajudant.log")
CACHE_SEGONS = 25          # no repetir la lectura dins d'aquesta estona
CACHE_NEGATIU = 600        # si una emissora no diu res, no insistir-hi
_cache = {}


def anota(text):
    """Registre curt, per si algun dia l'ajudant no arrenca com toca."""
    try:
        with open(REGISTRE, "a", encoding="utf-8") as fh:
            fh.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')}  {text}\n")
    except Exception:
        pass


def ja_hi_ha_algú():
    """Comprova si el port ja està ocupat (per no engegar-ne dos)."""
    s = socket.socket()
    s.settimeout(1.5)
    try:
        s.connect(("127.0.0.1", PORT))
        return True
    except Exception:
        return False
    finally:
        s.close()


def _obre(url, timeout=8):
    p = urllib.parse.urlparse(url)
    host, port = p.hostname, p.port or (443 if p.scheme == "https" else 80)
    cami = (p.path or "/") + (("?" + p.query) if p.query else "")
    s = socket.create_connection((host, port), timeout=timeout)
    if p.scheme == "https":
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        s = ctx.wrap_socket(s, server_hostname=host)
    s.sendall((f"GET {cami} HTTP/1.0\r\nHost: {host}\r\n"
               "User-Agent: Mozilla/5.0 (Radio-Feina)\r\n"
               "Icy-MetaData: 1\r\nConnection: close\r\n\r\n").encode())
    return s


def llegeix_icy(url, max_bytes=400000):
    """(canço, motiu). Només llegeix fins al primer bloc amb contingut."""
    for _salt in range(4):
        try:
            s = _obre(url)
        except Exception as e:  # noqa: BLE001
            return None, f"connexió: {type(e).__name__}"
        dades = b""
        while b"\r\n\r\n" not in dades and len(dades) < 65536:
            tros = s.recv(4096)
            if not tros:
                break
            dades += tros
        caps, _, resta = dades.partition(b"\r\n\r\n")
        metaint = desti = None
        for linia in caps.decode("latin-1", "replace").split("\r\n"):
            low = linia.lower()
            if low.startswith("icy-metaint:"):
                try:
                    metaint = int(linia.split(":", 1)[1].strip())
                except ValueError:
                    metaint = None
            elif low.startswith("location:"):
                desti = linia.split(":", 1)[1].strip()
        if not metaint:
            s.close()
            if desti:
                url = desti
                continue
            return None, "aquest flux no porta metadades"
        buffer, canco = resta, ""
        for _bloc in range(8):          # el primer bloc sol venir buit
            while len(buffer) < metaint + 1 and len(buffer) < max_bytes:
                tros = s.recv(16384)
                if not tros:
                    break
                buffer += tros
            if len(buffer) < metaint + 1:
                break
            llarg = buffer[metaint] * 16
            while len(buffer) < metaint + 1 + llarg and len(buffer) < max_bytes:
                tros = s.recv(16384)
                if not tros:
                    break
                buffer += tros
            bloc = buffer[metaint + 1:metaint + 1 + llarg]
            buffer = buffer[metaint + 1 + llarg:]
            text = bloc.decode("utf-8", "replace").strip("\x00").strip()
            trobat = re.search(r"StreamTitle='(.*?)';", text)
            if trobat and trobat.group(1).strip():
                canco = trobat.group(1).strip()
                break
        s.close()
        if not canco:
            return None, "l'emissora no publica què sona"
        return canco, ""
    return None, "massa redireccions"


def canco(url):
    ara = time.time()
    guardat = _cache.get(url)
    if guardat:
        vida = CACHE_SEGONS if guardat["dades"].get("ok") else CACHE_NEGATIU
        if ara - guardat["quan"] < vida:
            return guardat["dades"], True          # True = ve de la memòria cau
    text, motiu = llegeix_icy(url)
    dades = {"ok": bool(text), "canco": text, "motiu": motiu,
             "quan": time.strftime("%H:%M:%S")}
    if text:
        parts = text.split(" - ", 1)
        dades["artista"] = parts[0].strip() if len(parts) > 1 else ""
        dades["titol"] = parts[1].strip() if len(parts) > 1 else text
    _cache[url] = {"quan": ara, "dades": dades}
    return dades, False


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def _json(self, obj, codi=200):
        cos = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(codi)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(cos)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(cos)

    def do_GET(self):
        cami = self.path.split("?")[0]
        if cami == "/api/episodis":
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            feed_id = (query.get("id") or [""])[0]
            try:
                return self._json(episodes_for(feed_id))
            except ValueError as e:
                return self._json({"ok": False, "motiu": str(e)}, 400)
            except Exception:
                return self._json({"ok": False, "motiu": "No s'ha pogut actualitzar el feed"}, 502)
        if cami == "/api/estat":
            return self._json({"ok": True, "app": "Radio-Feina", "versio": 3})
        if cami in ("/", "/index.html"):
            return self._pagina()
        if cami != "/api/canco":
            return self._json({"ok": True, "ajudant": "cançons de Radio-Feina",
                               "usa": "/api/canco?u=<adreça del flux>"})
        consulta = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        url = (consulta.get("u") or [""])[0]
        if not url.lower().startswith(("http://", "https://")):
            return self._json({"ok": False, "motiu": "cal una adreça http"}, 400)
        try:
            dades, cache = canco(url)
        except Exception as e:  # noqa: BLE001
            return self._json({"ok": False, "motiu": str(e)[:120]}, 500)
        dades = dict(dades)
        dades["cache"] = cache
        return self._json(dades)

    def _pagina(self):
        """Serveix la mateixa pàgina: així tot és del mateix origen i el
        navegador no té cap excusa per bloquejar la petició de la cançó."""
        try:
            with open(PAGINA, "rb") as fh:
                cos = fh.read()
        except Exception as e:  # noqa: BLE001
            cos = f"No he trobat index.html al costat de l'ajudant ({e})".encode()
            self.send_response(404)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(cos)))
            self.end_headers()
            self.wfile.write(cos)
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(cos)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(cos)


def emissores_de_la_pagina():
    """Llegeix les emissores del propi index.html (per a --prova)."""
    try:
        t = open(PAGINA, encoding="utf-8").read()
    except Exception:
        return []
    bloc = re.search(r"const EMISSORES = \[(.*?)\]\.map", t, re.S)
    if not bloc:
        return []
    fora = []
    for m in re.finditer(r"\{ n:'([^']+)',\s*u:'([^']+)'", bloc.group(1)):
        fora.append((m.group(1), m.group(2)))
    return fora


def prova(llista):
    bones = dolentes = 0
    for nom, url in llista:
        text, motiu = llegeix_icy(url)
        if text:
            bones += 1
            print(f"  ✅ {nom:26} {text[:64]}")
        else:
            dolentes += 1
            print(f"  ❌ {nom:26} {motiu}")
    print(f"\n  {bones} emissores donen la cançó · {dolentes} no")


if __name__ == "__main__":
    if "--prova" in sys.argv:
        i = sys.argv.index("--prova")
        if len(sys.argv) > i + 1:
            prova([("adreça donada", sys.argv[i + 1])])
        else:
            llista = emissores_de_la_pagina()
            print(f"Provant les {len(llista)} emissores de la pàgina…\n")
            prova(llista)
    else:
        if ja_hi_ha_algú():
            anota(f"ja n'hi havia un d'engegat al port {PORT}: no faig res")
            print(f"El port {PORT} ja esta ocupat. Obre http://127.0.0.1:{PORT}/ per comprovar si es Radio-Feina.", flush=True)
            sys.exit(0)
        anota(f"engegat al port {PORT}")
        print(f"Ajudant de cançons engegat a http://127.0.0.1:{PORT}", flush=True)
        print("Deixa aquesta finestra oberta mentre escoltes la ràdio.", flush=True)
        ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
