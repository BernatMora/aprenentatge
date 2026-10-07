# 🚀 Desplegament al bernat-pc (Linux Mint)

Guia pas a pas per instal·lar i executar **Jazz Fusion Guitar** al bernat-pc amb Linux Mint, accessible per SSH via Tailscale.

## 📋 Requisits

- bernat-pc amb Linux Mint (Cinnamon, MATE o XFCE)
- Node.js 18+ (veure instal·lació a sota)
- ~1 GB d'espai lliure (després d'instal·lar dependències)
- Connexió SSH via Tailscale establerta

## 1️⃣ Verificar / instal·lar Node.js

Connecta't per SSH:

```bash
ssh bernat-pc
```

Comprova si tens Node.js:

```bash
node --version
npm --version
```

Si no el tens o és massa antic, instal·la'l amb **nvm** (recomanat):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

Verifica:

```bash
node --version    # hauria de ser v20+ o v22+
npm --version
```

## 2️⃣ Transferir el projecte

### Opció A: Des de Windows per SCP (recomanat)

Des de la terminal de Windows (PowerShell o CMD), des de `C:\Users\iadmin\Documents\Apps`:

```bash
scp -r jazz-fusion-guitar bernat-pc:~/
```

Això copiarà tota la carpeta `jazz-fusion-guitar` al directori home de l'usuari al Linux.

### Opció B: Clonar des d'un repo Git (si l'has pujat)

Si has pujat el projecte a GitHub/GitLab:

```bash
ssh bernat-pc
cd ~
git clone <url-del-repo> jazz-fusion-guitar
cd jazz-fusion-guitar
```

### Opció C: Via OneDrive (si està sincronitzat)

Si tens OneDrive al Linux:

```bash
ssh bernat-pc
ls ~/OneDrive/    # o la ruta de OneDrive al Linux
cp -r ~/OneDrive/jazz-fusion-guitar ~/
```

## 3️⃣ Instal·lar dependències

```bash
ssh bernat-pc
cd ~/jazz-fusion-guitar
npm install
```

Això trigarà 1-3 minuts i crearà la carpeta `node_modules` (~350 MB).

## 4️⃣ Build de producció

```bash
npm run build
```

Tarda 30-90 segons. Si tot va bé, veuràs:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Collecting build data
```

## 5️⃣ Iniciar l'aplicació

### Mode bàsic (terminal)

```bash
npm run start
```

Arrenca a `http://localhost:3000`. Per accedir-hi des del navegador del bernat-pc, obre [http://localhost:3000](http://localhost:3000).

### Mode persistent amb PM2 (recomanat per servidor)

Instal·la PM2 globalment:

```bash
npm install -g pm2
```

Inicia l'app:

```bash
cd ~/jazz-fusion-guitar
pm2 start npm --name "jazz-fusion-guitar" -- start
pm2 save
pm2 startup    # segueix les instruccions que mostra
```

Comandaments útils:

```bash
pm2 status                           # veure estat
pm2 logs jazz-fusion-guitar          # veure logs
pm2 restart jazz-fusion-guitar       # reiniciar
pm2 stop jazz-fusion-guitar          # aturar
```

### Mode servidor de xarxa (accessible des d'altres dispositius)

Si vols accedir des d'altres dispositius de la teva xarxa Tailscale, edita el `package.json` i canvia l'script `start`:

```json
"start": "next start -H 0.0.0.0 -p 3000"
```

Després reinicia:

```bash
pm2 restart jazz-fusion-guitar
```

Aleshores pots accedir des de qualsevol dispositiu de la teva xarxa Tailscale:
- `http://bernat-pc:3000` (si tens el hostname configurat)
- `http://<ip-tailscale>:3000`

## 6️⃣ Firewall (si cal)

Si tens `ufw` activat al Linux Mint i vols accedir des de la xarxa:

```bash
sudo ufw allow 3000/tcp
sudo ufw reload
```

Però si accedeixes només des del propi bernat-pc, NO cal.

## 7️⃣ Actualitzar l'aplicació

Quan facis canvis al projecte des de Windows:

1. Torna a transferir els fitxers (pots fer-ho per SCP només dels canvis)
2. Al bernat-pc:
   ```bash
   cd ~/jazz-fusion-guitar
   npm install          # si has afegit dependencies
   npm run build        # re-build
   pm2 restart jazz-fusion-guitar
   ```

## 🛠️ Solució de problemes

### "Cannot find module"
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Port 3000 ja en ús
```bash
# Trobar què l'ocupa
sudo lsof -i :3000
# o
sudo ss -tlnp | grep 3000

# Canviar el port
pm2 delete jazz-fusion-guitar
pm2 start npm --name "jazz-fusion-guitar" -- start -- -p 3001
```

### L'àudio (metrònom/backing) no sona
- Assegura't que el navegador té permís per reproduir àudio
- A Firefox pot caldre `about:config` → `media.autoplay.block_policy` → false
- A Chrome/Edge sol funcionar per defecte

### Error de tipus a `npm run build`
```bash
npx tsc --noEmit
```
Et dirà exactament on és l'error.

## 📞 Comandament ràpid (resum)

```bash
ssh bernat-pc
cd ~/jazz-fusion-guitar
npm install && npm run build && pm2 start npm --name "jazz-fusion-guitar" -- start
pm2 save
```

Això és tot! 🎸
