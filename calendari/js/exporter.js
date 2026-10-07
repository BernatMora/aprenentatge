/*!
 * exporter.js — SVG -> PNG/JPG/ZIP i impressió.
 *
 * El SVG de cada pàgina és autònom (els dibuixos hi van incrustats com a data
 * URL), així que es pot rasteritzar a qualsevol resolució sense dependre de res
 * extern: A3 a 300 ppp són 3508 × 4961 px.
 *
 * UMD: navegador (window.BLExporter). Necessita BLZip.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./zip.js'));
  else root.BLExporter = factory(root.BLZip);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Zip) {
  'use strict';

  var DPI_PRESETS = [150, 200, 300];

  function dpiToPxPerMm(dpi) { return dpi / 25.4; }

  /* Rasteritza un SVG (string) a un canvas de la mida indicada. */
  function svgToCanvas(svg, pxPerMm) {
    return new Promise(function (resolve, reject) {
      var blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var img = new Image();
      var m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
      var wmm = m ? parseFloat(m[1]) : 297;
      var hmm = m ? parseFloat(m[2]) : 420;
      img.onload = function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = Math.round(wmm * pxPerMm);
          canvas.height = Math.round(hmm * pxPerMm);
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(url);
          resolve(canvas);
        } catch (e) {
          URL.revokeObjectURL(url);
          reject(e);
        }
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error('No s\'ha pogut rasteritzar la pàgina'));
      };
      img.src = url;
    });
  }

  function canvasToBlob(canvas, format, quality) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error('No s\'ha pogut generar el fitxer'));
      }, format === 'jpeg' ? 'image/jpeg' : 'image/png', quality || 0.94);
    });
  }

  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  /* Rasteritza una pàgina i retorna el Blob. */
  function pageBlob(svg, opts) {
    opts = opts || {};
    var pxPerMm = opts.pxPerMm || dpiToPxPerMm(opts.dpi || 200);
    return svgToCanvas(svg, pxPerMm).then(function (canvas) {
      return canvasToBlob(canvas, opts.format || 'png', opts.quality);
    });
  }

  /* Exporta diverses pàgines i les empaqueta en un ZIP. */
  function pagesZip(pages, opts) {
    opts = opts || {};
    var pxPerMm = opts.pxPerMm || dpiToPxPerMm(opts.dpi || 200);
    var out = [];
    var chain = Promise.resolve();
    pages.forEach(function (p) {
      chain = chain.then(function () {
        if (opts.onProgress) opts.onProgress(out.length, pages.length, p.name);
        return pageBlob(p.svg, { pxPerMm: pxPerMm, format: opts.format, quality: opts.quality })
          .then(function (blob) {
            out.push({ name: p.name, blob: blob });
          });
      });
    });
    return chain.then(function () {
      if (opts.onProgress) opts.onProgress(out.length, pages.length, 'empaquetant');
      return Zip.create(out);
    });
  }

  return {
    DPI_PRESETS: DPI_PRESETS,
    dpiToPxPerMm: dpiToPxPerMm,
    svgToCanvas: svgToCanvas,
    canvasToBlob: canvasToBlob,
    pageBlob: pageBlob,
    pagesZip: pagesZip,
    download: download
  };
});
