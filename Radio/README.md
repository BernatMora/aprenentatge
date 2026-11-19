# Radio-Feina · IA i converses variades

Radio i programes en angles per escoltar dins de la mateixa pagina. App independent i no oficial; els continguts son dels seus editors.

## Seleccio d’angles

- Intelligent Machines (TWiT): novetats i impacte de la IA.
- Practical AI: IA aplicada, agents i eines.
- This Week in Tech (TWiT): productes i cultura digital.
- 99% Invisible: disseny, arquitectura i histories quotidianes.
- BBC Radio 4 Extra: humor, ficcio i lectures d’arxiu en directe.
- Startup.Radio: emprenedoria i tecnologia en directe.
- ABC Radio National: ciencia, cultura i entrevistes; tambe franges informatives.
- Vaughan: aprenentatge de l’angles.

Els programes per episodis es distingeixen de la radio en directe. Inclouen titol, data, selector, salts de -15/+30 segons i continuacio automatica opcional. Dificultat orientativa B2+/C1, segons programa.

## Actualitzacio

A la pagina es poden consultar els feeds publics, si permeten acces CORS. Si no, es mantenen els episodis inclosos o desats amb la seva data, sense presentar-los com a actualitzats. A GitHub Pages no s’executa Python.

Per regenerar els episodis inclosos abans de publicar:

```sh
cd Radio
python actualitza-programes.py
```

Es llegeixen nomes els quatre feeds publics indicats a `podcasts.py`. No s’enllacen feeds privats ni d’abonament. El reproductor enllaca els fitxers dels editors, sense allotjar ni modificar l’audio.

## Windows

Desa la carpeta sencera en una ubicacio permanent i executa `Installa-Radio-Feina.cmd` per crear o actualitzar la icona de l’escriptori. `Engega-Radio-Feina.cmd` comprova Python i arrenca l’ajudant local. L’API de feeds de l’ajudant permet actualitzar quan el navegador bloqueja els feeds publics. Si s’actualitza un ajudant que ja estava engegat, cal reiniciar-lo.

L’instal·lador de Windows no ha estat executat en l’entorn Linux de preparacio.

## Credits

TWiT: https://twit.tv/ . Intelligent Machines i This Week in Tech: audio public original, CC BY-NC-ND 4.0. Aquesta app no esta afiliada ni avalada per TWiT i no rep suport de TWiT.
Practical AI: https://practicalai.show/ .
99% Invisible: https://99percentinvisible.org/ .
BBC Radio 4 Extra: BBC. Startup.Radio: https://startup.radio/ . ABC Radio National: ABC. Vaughan: Grupo Vaughan.

No totes les emissores o programes son lliures de publicitat. La disponibilitat i les dates de publicacio depenen dels editors.
