/*!
 * images.js — Preparació dels dibuixos: pujada, escalat i versions.
 *
 * De cada dibuix se'n guarden dues versions (totes dues com a data URL, que és
 * el que necessita el SVG per poder-se imprimir i rasteritzar sense dependre de
 * cap fitxer extern):
 *   - display: ràpida, per treballar còmodament (max 1500 px de costat llarg)
 *   - print:   d'alta resolució, per imprimir i exportar (max 3400 px)
 *
 * UMD: navegador (window.BLImages). Necessita BLPlaceholder.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./placeholder.js'));
  else root.BLImages = factory(root.BLPlaceholder);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Placeholder) {
  'use strict';

  var DISPLAY_MAX = 1200;   /* prou per treballar còmodament i lleuger de generar */
  var PRINT_MAX = 3400;     /* alta resolució: només es genera quan cal imprimir/exportar */

  function decode(file) {
    if (typeof createImageBitmap === 'function') {
      return createImageBitmap(file, { imageOrientation: 'from-image' })
        .catch(function () { return createImageBitmap(file); })
        .catch(function () { return decodeWithImage(file); });
    }
    return decodeWithImage(file);
  }

  function decodeWithImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('No s\'ha pogut obrir la imatge')); };
      img.src = url;
    });
  }

  function drawVersion(source, srcW, srcH, maxSide, background, quality) {
    var scale = Math.min(1, maxSide / Math.max(srcW, srcH));
    var w = Math.max(2, Math.round(srcW * scale));
    var h = Math.max(2, Math.round(srcH * scale));
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.fillStyle = background || '#FFFFFF';
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, w, h);
    return { dataUrl: c.toDataURL('image/jpeg', quality), width: w, height: h };
  }

  /* Processa un fitxer pujat per l'usuària. */
  function processFile(file, opts) {
    opts = opts || {};
    var background = opts.background || '#FFFFFF';
    return decode(file).then(function (bmp) {
      var srcW = bmp.width || bmp.naturalWidth;
      var srcH = bmp.height || bmp.naturalHeight;
      var display = drawVersion(bmp, srcW, srcH, opts.displayMax || DISPLAY_MAX, background, 0.86);
      var print = drawVersion(bmp, srcW, srcH, opts.printMax || PRINT_MAX, background, 0.92);
      if (bmp.close) bmp.close();
      return {
        display: display.dataUrl,
        print: print.dataUrl,
        meta: {
          name: file.name || 'dibuix',
          isPlaceholder: false,
          srcWidth: srcW,
          srcHeight: srcH,
          width: print.width,
          height: print.height
        }
      };
    });
  }

  /* Dibuix de prova generat al navegador (mateixa forma que un dibuix real).
     opts.kinds permet generar només la versió que cal ('display' és barata,
     'print' triga una mica més i es genera a demanda). */
  function placeholder(monthIndex, aspect, opts) {
    opts = opts || {};
    var kinds = opts.kinds || ['display', 'print'];
    var ratio = aspect && aspect > 0 ? aspect : 1.117;
    var out = {
      meta: {
        name: 'esbós de prova',
        isPlaceholder: true,
        srcWidth: opts.printMax || PRINT_MAX,
        srcHeight: Math.round((opts.printMax || PRINT_MAX) / ratio),
        width: opts.printMax || PRINT_MAX,
        height: Math.round((opts.printMax || PRINT_MAX) / ratio)
      }
    };
    if (kinds.indexOf('display') >= 0) {
      var dw = opts.displayMax || DISPLAY_MAX;
      out.display = Placeholder.dataURL(monthIndex, dw, Math.round(dw / ratio), 0.85);
    }
    if (kinds.indexOf('print') >= 0) {
      var pw = opts.printMax || PRINT_MAX;
      out.print = Placeholder.dataURL(monthIndex, pw, Math.round(pw / ratio), 0.9);
    }
    return out;
  }

  /* Dimensions intrínseques d'una data URL (per calcular el retall). */
  function dataUrlSize(dataUrl) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve({ width: img.naturalWidth, height: img.naturalHeight }); };
      img.onerror = function () { resolve({ width: 1000, height: 1000 }); };
      img.src = dataUrl;
    });
  }

  return {
    processFile: processFile,
    placeholder: placeholder,
    dataUrlSize: dataUrlSize,
    DISPLAY_MAX: DISPLAY_MAX,
    PRINT_MAX: PRINT_MAX
  };
});
