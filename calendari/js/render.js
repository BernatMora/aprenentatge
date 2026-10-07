/*!
 * render.js — Construcció de cada pàgina A3 com a SVG.
 *
 * El viewBox fa 297 × 420 unitats = mil·límetres reals de l'A3 vertical, així
 * que totes les mides del disseny s'escriuen directament en mm. El mateix SVG
 * serveix per previsualitzar, imprimir i exportar (canviant només width/height),
 * de manera que el que es veu és exactament el que s'imprimeix.
 *
 * Maquetació: la graella dels dies es defineix per la MIDA DE CASELLA en mm
 * (35 × 35 mm per defecte, amb espai per escriure-hi). La graella s'ancora al
 * marge inferior i el dibuix ocupa tota la resta de la part de dalt, de manera
 * que canviar la mida de les caselles redistribueix el full automàticament.
 *
 * UMD: navegador (window.BLRender). Necessita BLCalendar, BLMoon, BLData.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./calendar.js'), require('./moon.js'), require('./data.js'));
  } else {
    root.BLRender = factory(root.BLCalendar, root.BLMoon, root.BLData);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Calendar, Moon, Data) {
  'use strict';

  /* ------------------------------------------------------------- utilitats */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  function mm(n) { return (Math.round(n * 1000) / 1000).toString(); }

  function mergeStyle(base, over) {
    var out = {};
    Object.keys(base || {}).forEach(function (k) { out[k] = base[k]; });
    if (over) {
      Object.keys(over).forEach(function (k) {
        if (over[k] !== undefined && over[k] !== null) out[k] = over[k];
      });
    }
    return out;
  }

  var measureCtx = null;
  function fontString(f) {
    return (f.italic ? 'italic ' : '') + (f.weight || 400) + ' ' + 100 + 'px ' + (f.font || 'serif');
  }

  /* Amplada d'un text en mm. Mesura amb canvas (escala 100 px) i, si no hi ha
     canvas (per exemple a Node), fa una estimació per amplades mitjanes. */
  function textWidthMm(str, f) {
    if (!str) return 0;
    var extra = (f.letterSpacing || 0) * Math.max(0, str.length - 1);
    var canMeasure = typeof document !== 'undefined' && document.createElement;
    if (canMeasure) {
      if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
      measureCtx.font = fontString(f);
      return (measureCtx.measureText(str).width / 100) * f.size + extra;
    }
    var narrow = "iljtIf.,;:'!|()[]{}/\\ ";
    var wide = "mwMW@%";
    var units = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      units += narrow.indexOf(ch) >= 0 ? 0.3 : (wide.indexOf(ch) >= 0 ? 0.86 : 0.53);
    }
    return units * f.size + extra;
  }

  /* Partir el text en línies que càpiguen a maxWidth (mm). Respecta els \n. */
  function wrapText(text, f, maxWidth) {
    var paragraphs = String(text == null ? '' : text).replace(/\r/g, '').split('\n');
    var lines = [];
    for (var p = 0; p < paragraphs.length; p++) {
      var words = paragraphs[p].split(/\s+/).filter(function (w) { return w.length; });
      if (!words.length) { lines.push(''); continue; }
      var line = '';
      for (var i = 0; i < words.length; i++) {
        var test = line ? line + ' ' + words[i] : words[i];
        if (textWidthMm(test, f) <= maxWidth || !line) line = test;
        else { lines.push(line); line = words[i]; }
        if (!line.includes(' ') && textWidthMm(line, f) > maxWidth) {
          var chunk = '';
          for (var c = 0; c < line.length; c++) {
            if (textWidthMm(chunk + line[c], f) > maxWidth && chunk) { lines.push(chunk); chunk = line[c]; }
            else chunk += line[c];
          }
          line = chunk;
        }
      }
      if (line) lines.push(line);
    }
    if (!lines.length) lines = [''];
    return lines;
  }

  /* ------------------------------------------------------------ maquetació */

  /**
   * Calcula la geometria del full en mil·límetres.
   * La graella dels dies mana: les caselles fan `grid.cellWidth` × `grid.cellHeight`
   * (o omplen l'amplada si `grid.fillWidth`), s'ancoren al marge inferior, i el
   * dibuix ocupa tota la resta de dalt.
   */
  function computeLayout(design, rows) {
    var W = design.page.width, H = design.page.height, M = design.page.margin;
    var CW = W - 2 * M, CH = H - 2 * M;
    var G = design.grid, L = design.layout;
    var rowsN = rows || 6;

    var colW = G.fillWidth ? CW / 7 : Math.min(G.cellWidth || 35, CW / 7);
    var gridW = colW * 7;
    var rowH = Math.min(G.cellHeight || 35, Math.max(6, CH * 0.55 / rowsN));
    var gridH = rowH * rowsN;

    var gridBottom = H - M;
    var gridTop = gridBottom - gridH;
    var weekdayTop = gridTop - L.weekdayHeight;
    var titleTop = weekdayTop - L.titleHeight;

    var imageBottom = titleTop - L.gap;
    var imageH = Math.max(15, imageBottom - M);

    var align = G.gridAlign || 'center';
    var gridLeft = M + (align === 'left' ? 0 : align === 'right' ? (CW - gridW) : (CW - gridW) / 2);

    /* Espai útil per escriure dins la casella: queda entre el número del dia
       (a dalt) i el nom de la fase (a baix, només als 4 dies clau). */
    var pad = Math.max(1.6, Math.min(2.6, colW * 0.075));
    var numSize = G.dayNumberSize || 7;
    var writingTop = pad + numSize;
    var nameReserve = (design.moon.names === false) ? 0 : (design.moon.nameSize || 2.3) * 1.5;
    var writingBottom = rowH - nameReserve;

    return {
      pageW: W, pageH: H, margin: M, contentW: CW, contentH: CH,
      rows: rowsN,
      colW: colW, rowH: rowH, pad: pad,
      gridW: gridW, gridH: gridH, gridLeft: gridLeft,
      gridTop: gridTop, gridBottom: gridBottom, gridRight: gridLeft + gridW,
      weekdayTop: weekdayTop, weekdayH: L.weekdayHeight,
      titleTop: titleTop, titleH: L.titleHeight,
      imageX: M, imageY: M, imageW: CW, imageH: imageH,
      imageBottom: imageBottom,
      writing: {
        top: writingTop,
        bottom: writingBottom,
        height: Math.max(0, writingBottom - writingTop)
      }
    };
  }

  /* Mètrica del bloc d'escrit. Serveix per dibuixar i per avisar l'usuària. */
  function measureQuote(q, imageW, imageH) {
    var shown = q.uppercase ? String(q.text || '').toUpperCase() : String(q.text || '');
    var boxW = Math.min(imageW * (q.widthPct || 76) / 100, imageW);
    var lines = wrapText(shown, q, boxW);
    var lineH = q.size * (q.lineHeight || 1.3);
    var blockH = lines.length * lineH;
    var maxLineW = 0;
    for (var i = 0; i < lines.length; i++) maxLineW = Math.max(maxLineW, textWidthMm(lines[i], q));
    return {
      lines: lines, boxW: boxW, lineH: lineH, blockH: blockH, maxLineW: maxLineW, imageH: imageH,
      fits: blockH <= imageH && maxLineW <= boxW + 0.6,
      fitsHeight: blockH <= imageH,
      fitsWidth: maxLineW <= boxW + 0.6
    };
  }

  /* --------------------------------------------------------- lluna (icona) */

  function moonIcon(cx, cy, r, cell, cfg) {
    var out = '';
    var info = cell.moon;
    out += '<circle cx="' + mm(cx) + '" cy="' + mm(cy) + '" r="' + mm(r) + '" fill="' +
           esc(cfg.unlitColor) + '"' +
           (cfg.outline > 0 ? ' stroke="' + esc(cfg.lineColor) + '" stroke-width="' + mm(cfg.outline) + '"' : '') +
           '/>';
    var d = Moon.litPath(r, info.illuminated);
    if (d) {
      out += '<g transform="translate(' + mm(cx) + ' ' + mm(cy) + ')' +
             (info.waxing ? '' : ' scale(-1 1)') + '">' +
             '<path d="' + d + '" fill="' + esc(cfg.litColor) + '"/></g>';
    }
    return out;
  }

  /* --------------------------------------------------------------- pàgina */

  /**
   * Construeix el SVG d'una pàgina.
   * opts: { design, monthIndex (0-11), month (dades del mes, opcional),
   *         imageHref, imageWidth, imageHeight, pxPerMm }
   */
  function pageSVG(opts) {
    var monthData = opts.month || {};
    var design = {
      year: opts.design.year,
      timeZone: opts.design.timeZone,
      page: opts.design.page,
      layout: opts.design.layout,
      title: opts.design.title,
      grid: opts.design.grid,
      moon: opts.design.moon,
      holidays: opts.design.holidays,
      image: mergeStyle(opts.design.image, monthData.image),
      quote: mergeStyle(opts.design.quote, monthData.quote)
    };

    var idx = opts.monthIndex;
    var monthNumber = idx + 1;
    var year = design.year;
    var W = design.page.width, H = design.page.height;
    var grid = Calendar.monthGrid(year, monthNumber, design);
    var L = computeLayout(design, grid.rows);

    var id = 'p' + monthNumber;
    var svg = [];
    var sizeAttrs = opts.pxPerMm
      ? 'width="' + Math.round(W * opts.pxPerMm) + '" height="' + Math.round(H * opts.pxPerMm) + '"'
      : 'width="' + mm(W) + 'mm" height="' + mm(H) + 'mm"';

    svg.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
             'viewBox="0 0 ' + mm(W) + ' ' + mm(H) + '" ' + sizeAttrs + '>');

    /* --- defs: retall de la imatge, ombra de l'escrit --- */
    svg.push('<defs>');
    var clipShape = design.image.shape === 'rounded'
      ? '<rect x="' + mm(L.imageX) + '" y="' + mm(L.imageY) + '" width="' + mm(L.imageW) +
        '" height="' + mm(L.imageH) + '" rx="' + mm(design.image.radius) + '" ry="' + mm(design.image.radius) + '"/>'
      : '<rect x="' + mm(L.imageX) + '" y="' + mm(L.imageY) + '" width="' + mm(L.imageW) +
        '" height="' + mm(L.imageH) + '"/>';
    svg.push('<clipPath id="' + id + '-img">' + clipShape + '</clipPath>');
    if (design.quote.shadow > 0) {
      svg.push('<filter id="' + id + '-shadow" x="-20%" y="-40%" width="140%" height="180%">' +
               '<feDropShadow dx="0" dy="0.5" stdDeviation="' + mm(design.quote.shadowBlur || 1.6) +
               '" flood-color="#000000" flood-opacity="' + design.quote.shadow + '"/></filter>');
    }
    svg.push('</defs>');

    /* --- fons --- */
    svg.push('<rect x="0" y="0" width="' + mm(W) + '" height="' + mm(H) + '" fill="' +
             esc(design.page.background) + '"/>');

    /* --- dibuix --- */
    svg.push('<g clip-path="url(#' + id + '-img)">');
    if (design.image.borderWidth > 0 || design.image.shape === 'rounded') {
      svg.push('<rect x="' + mm(L.imageX) + '" y="' + mm(L.imageY) + '" width="' + mm(L.imageW) +
               '" height="' + mm(L.imageH) + '" fill="' + esc(design.image.background) + '"/>');
    }
    if (opts.imageHref) {
      var iw = opts.imageWidth || 1000, ih = opts.imageHeight || 1000;
      var scale = (design.image.fit === 'contain')
        ? Math.min(L.imageW / iw, L.imageH / ih)
        : Math.max(L.imageW / iw, L.imageH / ih);
      scale *= (design.image.zoom || 1);
      var dw = iw * scale, dh = ih * scale;
      var dx = L.imageX + (L.imageW - dw) / 2 + (design.image.offsetXPct || 0) / 100 * L.imageW;
      var dy = L.imageY + (L.imageH - dh) / 2 + (design.image.offsetYPct || 0) / 100 * L.imageH;
      svg.push('<image x="' + mm(dx) + '" y="' + mm(dy) + '" width="' + mm(dw) + '" height="' + mm(dh) +
               '" preserveAspectRatio="none" xlink:href="' + esc(opts.imageHref) +
               '" href="' + esc(opts.imageHref) + '"/>');
    }
    if (design.image.borderWidth > 0) {
      svg.push('<rect x="' + mm(L.imageX + design.image.borderWidth / 2) + '" y="' +
               mm(L.imageY + design.image.borderWidth / 2) + '" width="' + mm(L.imageW - design.image.borderWidth) +
               '" height="' + mm(L.imageH - design.image.borderWidth) + '" fill="none" stroke="' +
               esc(design.image.borderColor) + '" stroke-width="' + mm(design.image.borderWidth) + '"' +
               (design.image.shape === 'rounded' ? ' rx="' + mm(design.image.radius) + '"' : '') + '/>');
    }
    svg.push('</g>');

    /* --- escrit sobreposat --- */
    var q = design.quote;
    if (q.text) {
      var mq = measureQuote(q, L.imageW, L.imageH);
      var lines = mq.lines, lineH = mq.lineH, blockH = mq.blockH, boxW = mq.boxW;

      var cx = L.imageX + L.imageW * (q.xPct || 50) / 100;
      var cy = L.imageY + L.imageH * (q.yPct || 82) / 100;
      if (mq.fitsHeight) {
        cy = Math.max(L.imageY + blockH / 2, Math.min(L.imageY + L.imageH - blockH / 2, cy));
      } else {
        cy = L.imageY + L.imageH / 2;
      }
      if (boxW <= L.imageW) {
        cx = Math.max(L.imageX + boxW / 2, Math.min(L.imageX + L.imageW - boxW / 2, cx));
      }
      var firstBaseline = cy - blockH / 2 + q.size * 0.78;
      var boxL = cx - boxW / 2;
      var anchor = q.align === 'left' ? 'start' : (q.align === 'right' ? 'end' : 'middle');
      var tx = q.align === 'left' ? boxL : (q.align === 'right' ? boxL + boxW : cx);

      if (q.box && q.box !== 'none') {
        var pad = q.size * 0.5, bx, bw, by, bh, rx;
        if (q.box === 'band') {
          bx = L.imageX; bw = L.imageW; by = cy - blockH / 2 - pad; bh = blockH + pad * 2; rx = 0;
        } else {
          var widest = 0;
          for (var w2 = 0; w2 < lines.length; w2++) widest = Math.max(widest, textWidthMm(lines[w2], q));
          widest = Math.min(widest, boxW);
          bx = cx - widest / 2 - pad; bw = widest + pad * 2;
          by = cy - blockH / 2 - pad; bh = blockH + pad * 2;
          rx = q.boxRadius || 2;
        }
        svg.push('<rect x="' + mm(bx) + '" y="' + mm(by) + '" width="' + mm(bw) + '" height="' + mm(bh) +
                 '" rx="' + mm(rx) + '" ry="' + mm(rx) + '" fill="' + esc(q.boxColor) +
                 '" fill-opacity="' + (q.boxOpacity == null ? 0.34 : q.boxOpacity) + '"/>');
      }

      var common = 'font-family="' + esc(q.font) + '" font-size="' + mm(q.size) + '"' +
        ' font-weight="' + (q.weight || 400) + '"' +
        (q.italic ? ' font-style="italic"' : '') +
        (q.letterSpacing ? ' letter-spacing="' + mm(q.letterSpacing) + '"' : '') +
        ' text-anchor="' + anchor + '" xml:space="preserve"';
      var shadowFilter = q.shadow > 0 ? ' filter="url(#' + id + '-shadow)"' : '';
      var tspans = '';
      for (var li = 0; li < lines.length; li++) {
        tspans += '<tspan x="' + mm(tx) + '" y="' + mm(firstBaseline + li * lineH) + '">' +
                  esc(lines[li]) + '</tspan>';
      }
      svg.push('<text ' + common + ' fill="' + esc(q.color) + '"' + shadowFilter + '>' + tspans + '</text>');
    }

    /* --- títol del mes (alineat amb la graella) --- */
    var T = design.title;
    var monthName = T.mode === 'custom' && T.custom ? T.custom : Data.MONTHS_CA_TITLE[monthNumber - 1];
    if ((T.caseMode || 'capitalize') === 'upper') monthName = monthName.toUpperCase();
    else if (T.caseMode === 'lower') monthName = monthName.toLowerCase();

    var titleBaseY = L.titleTop + L.titleH * 0.74;
    var titleCommon = 'font-family="' + esc(T.font) + '" font-size="' + mm(T.size) + '" font-weight="' +
      (T.weight || 600) + '" fill="' + esc(T.color) + '"' +
      (T.letterSpacing ? ' letter-spacing="' + mm(T.letterSpacing) + '"' : '');
    var yearCommon = 'font-family="' + esc(T.font) + '" font-size="' + mm(T.yearSize) + '" fill="' +
      esc(T.yearColor) + '"' + (T.yearLetterSpacing ? ' letter-spacing="' + mm(T.yearLetterSpacing) + '"' : '');
    var yearText = String(year);

    if (T.layout === 'center') {
      svg.push('<text x="' + mm((L.gridLeft + L.gridRight) / 2) + '" y="' + mm(titleBaseY) +
               '" text-anchor="middle" ' + titleCommon + '>' + esc(monthName) +
               (T.showYear ? '<tspan font-size="' + mm(T.yearSize) + '" fill="' + esc(T.yearColor) +
                 '" letter-spacing="' + mm(T.yearLetterSpacing || 0) + '">  ' + esc(yearText) + '</tspan>' : '') +
               '</text>');
    } else if (T.layout === 'left') {
      svg.push('<text x="' + mm(L.gridLeft) + '" y="' + mm(titleBaseY) + '" text-anchor="start" ' +
               titleCommon + '>' + esc(monthName) + '</text>');
      if (T.showYear) {
        var mw = textWidthMm(monthName, T);
        svg.push('<text x="' + mm(L.gridLeft + mw + 4) + '" y="' + mm(titleBaseY) +
                 '" text-anchor="start" ' + yearCommon + '>' + esc(yearText) + '</text>');
      }
    } else {
      svg.push('<text x="' + mm(L.gridLeft) + '" y="' + mm(titleBaseY) + '" text-anchor="start" ' +
               titleCommon + '>' + esc(monthName) + '</text>');
      if (T.showYear) {
        svg.push('<text x="' + mm(L.gridRight) + '" y="' + mm(titleBaseY) + '" text-anchor="end" ' +
                 yearCommon + '>' + esc(yearText) + '</text>');
      }
    }

    /* --- capçalera dels dies de la setmana --- */
    var G = design.grid;
    if (G.showWeekdayHeader) {
      var wdBaseY = L.weekdayTop + L.weekdayH * 0.72;
      var wdFont = 'font-family="' + esc(G.weekdayFont) + '" font-size="' + mm(G.weekdaySize) +
        '" font-weight="' + (G.weekdayFontWeight || G.weekdayWeight || 500) + '" text-anchor="middle"' +
        (G.weekdayLetterSpacing ? ' letter-spacing="' + mm(G.weekdayLetterSpacing) + '"' : '');
      var labels = G.weekdayLabels || Data.DAYS_CA_SHORT;
      for (var c = 0; c < 7; c++) {
        var color = c === 6 ? G.sundayColor : (c === 5 ? (G.saturdayColor || G.weekdayColor) : G.weekdayColor);
        svg.push('<text x="' + mm(L.gridLeft + L.colW * (c + 0.5)) + '" y="' + mm(wdBaseY) +
                 '" fill="' + esc(color) + '" ' + wdFont + '>' + esc(labels[c] || '') + '</text>');
      }
    }

    /* --- fons del cap de setmana --- */
    if (G.showWeekendShade) {
      svg.push('<rect x="' + mm(L.gridLeft + L.colW * 5) + '" y="' + mm(L.gridTop) +
               '" width="' + mm(L.colW * 2) + '" height="' + mm(L.gridH) + '" fill="' +
               esc(G.weekendShadeColor) + '"/>');
    }

    /* --- caselles dels dies --- */
    var moonCfg = design.moon;
    var pad = L.pad;
    var numSize = G.dayNumberSize;
    var r = moonCfg.radius;
    var namePos = moonCfg.namePos || 'bottom';

    for (var w = 0; w < grid.weeks.length; w++) {
      for (var d = 0; d < 7; d++) {
        var cell = grid.weeks[w][d];
        var x0 = L.gridLeft + L.colW * d, y0 = L.gridTop + L.rowH * w;

        if (!cell.inMonth) {
          if (G.showAdjacentDays && cell.day > 0) {
            svg.push('<text x="' + mm(x0 + pad) + '" y="' + mm(y0 + pad + numSize * 0.78) +
                     '" font-family="' + esc(G.dayNumberFont) + '" font-size="' + mm(numSize) +
                     '" fill="' + esc(G.adjacentColor) + '">' + cell.day + '</text>');
          }
          continue;
        }

        var isFest = !!cell.holiday;
        var numColor = cell.isSunday ? G.sundayColor : (isFest ? G.holidayColor : G.dayNumberColor);

        /* número del dia (a dalt a l'esquerra: la resta de la casella queda lliure) */
        if ((G.dayNumberAlign || 'left') === 'center') {
          svg.push('<text x="' + mm(x0 + L.colW / 2) + '" y="' + mm(y0 + pad + numSize * 0.78) +
                   '" text-anchor="middle" font-family="' + esc(G.dayNumberFont) + '" font-size="' + mm(numSize) +
                   '" font-weight="' + (G.dayNumberWeight || 400) + '" fill="' + esc(numColor) + '">' +
                   cell.day + '</text>');
        } else {
          svg.push('<text x="' + mm(x0 + pad) + '" y="' + mm(y0 + pad + numSize * 0.78) +
                   '" font-family="' + esc(G.dayNumberFont) + '" font-size="' + mm(numSize) +
                   '" font-weight="' + (G.dayNumberWeight || 400) + '" fill="' + esc(numColor) + '">' +
                   cell.day + '</text>');
        }

        /* lluna (icona petita en una cantonada, per no menjar espai d'escriptura) */
        var showIcon = moonCfg.daily !== false || cell.moon.phaseType;
        if (showIcon && cell.moon.showIcon) {
          var mcx, mcy;
          var pos = moonCfg.pos || 'top-right';
          if (pos === 'center') { mcx = x0 + L.colW / 2; mcy = y0 + L.rowH * 0.5; }
          else if (pos === 'bottom-right') { mcx = x0 + L.colW - pad - r; mcy = y0 + L.rowH - pad - r; }
          else { mcx = x0 + L.colW - pad - r; mcy = y0 + pad + r; }
          svg.push(moonIcon(mcx, mcy, r, cell, moonCfg));

          var labelParts = [];
          if (moonCfg.names && cell.moon.phaseLabel) labelParts.push(cell.moon.phaseLabel);
          if (moonCfg.times && cell.moon.phaseTime) labelParts.push(cell.moon.phaseTime);
          if (labelParts.length) {
            var label = labelParts.join(' · ');
            var nameFont = 'font-family="' + esc(moonCfg.nameFont) + '" font-size="' + mm(moonCfg.nameSize) +
              '" fill="' + esc(moonCfg.nameColor) + '"' +
              (moonCfg.nameLetterSpacing ? ' letter-spacing="' + mm(moonCfg.nameLetterSpacing) + '"' : '');
            if (namePos === 'under-icon') {
              svg.push('<text x="' + mm(mcx + r) + '" y="' + mm(mcy + r + moonCfg.nameSize * 1.2) +
                       '" text-anchor="end" ' + nameFont + '>' + esc(label) + '</text>');
            } else {
              svg.push('<text x="' + mm(x0 + L.colW / 2) + '" y="' + mm(y0 + L.rowH - Math.max(1.4, pad * 0.7)) +
                       '" text-anchor="middle" ' + nameFont + '>' + esc(label) + '</text>');
            }
          }
        }

        /* nom del festiu (a baix a l'esquerra, petit) */
        if (isFest && design.holidays.showNames) {
          svg.push('<text x="' + mm(x0 + pad) + '" y="' + mm(y0 + L.rowH - Math.max(1.4, pad * 0.7)) +
                   '" text-anchor="start" font-family="' + esc(G.dayNumberFont) + '" font-size="' +
                   mm(design.holidays.nameSize) + '" fill="' + esc(design.holidays.color) + '">' +
                   esc(cell.holiday) + '</text>');
        }
      }
    }

    /* --- línies de la graella --- */
    if (G.showLines) {
      var lines = [];
      for (var rr = 0; rr <= grid.rows; rr++) {
        lines.push('M ' + mm(L.gridLeft) + ' ' + mm(L.gridTop + L.rowH * rr) + ' H ' + mm(L.gridRight));
      }
      for (var cc = 0; cc <= 7; cc++) {
        lines.push('M ' + mm(L.gridLeft + L.colW * cc) + ' ' + mm(L.gridTop) + ' V ' + mm(L.gridBottom));
      }
      svg.push('<path d="' + lines.join(' ') + '" fill="none" stroke="' + esc(G.lineColor) +
               '" stroke-width="' + mm(G.lineWidth) + '" shape-rendering="crispEdges"/>');
    }

    svg.push('</svg>');
    return svg.join('');
  }

  return {
    pageSVG: pageSVG,
    computeLayout: computeLayout,
    measureQuote: measureQuote,
    wrapText: wrapText,
    textWidthMm: textWidthMm,
    esc: esc
  };
});
