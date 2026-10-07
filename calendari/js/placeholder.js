/*!
 * placeholder.js — Dibuixos de prova generats al navegador.
 *
 * Serveixen perquè el calendari es vegi "acabat" des del primer moment i es
 * pugui enviar a ella perquè decideixi. Són composicions abstractes
 * deterministes (una paleta per mes) dibuixades amb canvas 2D: es poden
 * substituir per cada dibuix original amb un clic.
 *
 * UMD: navegador (window.BLPlaceholder). Al navegador necessita BLData.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./data.js'));
  else root.BLPlaceholder = factory(root.BLData);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Data) {
  'use strict';

  /* Generador pseudoaleatori determinista (mulberry32). */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hexA(hex, alpha) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  var grainTile = null;
  function getGrainTile() {
    if (grainTile) return grainTile;
    var size = 160;
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var ctx = c.getContext('2d');
    var img = ctx.createImageData(size, size);
    var r = rng(20270101);
    for (var i = 0; i < img.data.length; i += 4) {
      var v = 128 + Math.round((r() - 0.5) * 255);
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    grainTile = c;
    return c;
  }

  /* Dibuixa el dibuix de prova del mes `monthIndex` (0-11) dins el canvas. */
  function paint(canvas, monthIndex) {
    var W = canvas.width, H = canvas.height;
    var ctx = canvas.getContext('2d');
    var pal = Data.SAMPLE_PALETTES[((monthIndex % 12) + 12) % 12];
    var r = rng(97 + monthIndex * 7919);
    var u = W / 1000;                     /* unitat relativa */

    /* 1. cel / fons */
    var grad = ctx.createLinearGradient(0, 0, W * 0.25, H);
    grad.addColorStop(0, pal.bg[0]);
    grad.addColorStop(1, pal.bg[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* 2. taques suaus */
    var blobColors = [pal.soft, pal.accent, pal.ink, pal.bg[0]];
    for (var i = 0; i < 4; i++) {
      var cx = r() * W, cy = r() * H * 0.75;
      var rad = (0.25 + r() * 0.45) * W;
      var g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g2.addColorStop(0, hexA(blobColors[i % blobColors.length], 0.34));
      g2.addColorStop(1, hexA(blobColors[i % blobColors.length], 0));
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    /* 3. discs (sol / lluna) */
    var discs = 1 + Math.floor(r() * 2);
    for (var d = 0; d < discs; d++) {
      var dx = (0.15 + r() * 0.7) * W;
      var dy = (0.1 + r() * 0.4) * H;
      var dr = (0.05 + r() * 0.09) * W;
      var halo = ctx.createRadialGradient(dx, dy, dr * 0.4, dx, dy, dr * 4.2);
      halo.addColorStop(0, hexA(pal.accent, 0.28));
      halo.addColorStop(1, hexA(pal.accent, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(dx, dy, dr * 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hexA(i % 2 === 0 ? pal.accent : pal.ink, 0.42);
      ctx.beginPath();
      ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fill();
    }

    /* 4. turons / aigua: bandes horitzontals amb corbes suaus */
    var bands = 3;
    for (var b = 0; b < bands; b++) {
      var baseY = H * (0.58 + b * 0.13);
      var amp = H * (0.03 + r() * 0.05);
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      var steps = 6;
      for (var s = 1; s <= steps; s++) {
        var x = (W / steps) * s;
        var y = baseY + Math.sin((s + b) * 1.7 + r()) * amp - amp * 0.4;
        var px = (W / steps) * (s - 1);
        ctx.bezierCurveTo(px + W / steps / 2, baseY - amp, x - W / steps / 2, y, x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = hexA(b % 2 === 0 ? pal.ink : pal.soft, 0.16 + b * 0.1);
      ctx.fill();
    }

    /* 5. tiges i fulles */
    var stems = 3 + Math.floor(r() * 3);
    for (var t = 0; t < stems; t++) {
      var sx = (0.12 + r() * 0.76) * W;
      var sy = H * (0.98 - r() * 0.06);
      var topX = sx + (r() - 0.5) * W * 0.18;
      var topY = H * (0.36 + r() * 0.3);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx - (r() - 0.5) * W * 0.08, sy - H * 0.2,
                        topX + (r() - 0.5) * W * 0.08, topY + H * 0.15, topX, topY);
      ctx.strokeStyle = hexA(pal.ink, 0.45);
      ctx.lineWidth = 2.4 * u;
      ctx.lineCap = 'round';
      ctx.stroke();

      var leaves = 3 + Math.floor(r() * 3);
      for (var l = 0; l < leaves; l++) {
        var f = 0.25 + r() * 0.6;
        var lx = sx + (topX - sx) * f;
        var ly = sy + (topY - sy) * f;
        var lr = (10 + r() * 22) * u;
        var ang = (r() - 0.5) * 1.6;
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.ellipse(lr * 1.6, 0, lr * 1.7, lr * 0.72, 0, 0, Math.PI * 2);
        ctx.fillStyle = hexA(l % 2 === 0 ? pal.accent : pal.soft, 0.4);
        ctx.fill();
        ctx.restore();
      }
    }

    /* 6. espurnes */
    for (var k = 0; k < 26; k++) {
      var px2 = r() * W, py2 = r() * H;
      var pr = u * (1.5 + r() * 4);
      ctx.beginPath();
      ctx.arc(px2, py2, pr, 0, Math.PI * 2);
      ctx.fillStyle = hexA(r() > 0.5 ? pal.soft : pal.accent, 0.25 + r() * 0.3);
      ctx.fill();
    }

    /* 7. gra de paper */
    try {
      var pat = ctx.createPattern(getGrainTile(), 'repeat');
      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    } catch (e) { /* sense gra */ }

    /* 8. etiqueta discreta */
    var fs = Math.max(9, H * 0.014);
    ctx.font = 'italic ' + fs.toFixed(1) + 'px Georgia, serif';
    ctx.fillStyle = hexA(pal.ink, 0.5);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('esbós de prova · ' + Data.MONTHS_CA[monthIndex % 12] +
                 ' — substituïu-lo pel dibuix original', W * 0.035, H * 0.965);
  }

  function make(monthIndex, width, height) {
    var c = document.createElement('canvas');
    c.width = Math.max(2, Math.round(width));
    c.height = Math.max(2, Math.round(height));
    paint(c, monthIndex);
    return c;
  }

  /* Data URL JPEG del dibuix de prova. El canvas s'allibera tot seguit:
     generar 12 dibuixos de cop pot consumir molta memòria en mòbils. */
  function dataURL(monthIndex, width, height, quality) {
    var c = make(monthIndex, width, height);
    var url = c.toDataURL('image/jpeg', quality || 0.86);
    c.width = 0;
    c.height = 0;
    return url;
  }

  return { paint: paint, make: make, dataURL: dataURL, rng: rng, hexA: hexA };
});
