/*!
 * ui.js — Panell de control declaratiu.
 *
 * Cada control és una entrada de l'esquema (vegeu SCHEMA) amb un `path` que
 * apunta a l'estat. Afegir una opció nova al calendari és afegir una línia a
 * l'esquema: la resta (lectura, escriptura, refresc) és automàtica.
 *
 * UMD: navegador (window.BLUI). Necessita BLData.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./data.js'));
  else root.BLUI = factory(root.BLData);
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Data) {
  'use strict';

  var FONT_OPTIONS = [
    { value: Data.FONTS.serifDisplay, label: 'Palatino / serif clàssica' },
    { value: Data.FONTS.serif, label: 'Georgia / serif' },
    { value: Data.FONTS.sans, label: 'Helvetica / sans' },
    { value: Data.FONTS.sansCondensed, label: 'Arial Narrow / sans estreta' },
    { value: Data.FONTS.mono, label: 'Courier / monoespaiada' },
    { value: Data.FONTS.hand, label: 'Lletra lligada (Segoe Script)' },
    { value: Data.FONTS.handAlt, label: 'Lletra lligada alternativa (Ink Free)' }
  ];

  var WEIGHT_OPTIONS = [
    { value: 300, label: 'Fina' }, { value: 400, label: 'Normal' },
    { value: 500, label: 'Mitjana' }, { value: 600, label: 'Seminegra' },
    { value: 700, label: 'Negreta' }
  ];

  var ALIGN_OPTIONS = [
    { value: 'left', label: 'Esquerra' }, { value: 'center', label: 'Centre' },
    { value: 'right', label: 'Dreta' }
  ];

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  }

  function labelFor(text, hint) {
    var l = el('label', 'field-label');
    l.textContent = text;
    if (hint) {
      var h = el('span', 'hint');
      h.textContent = hint;
      l.appendChild(h);
    }
    return l;
  }

  /* ------------------------------------------------------------- esquema */

  function monthQuoteSection() {
    return {
      id: 'quote', title: 'Escrit d\'aquest mes', icon: '✍️', open: true,
      note: 'Aquests valors són només per al mes seleccionat. Si no els toques, ' +
            'seguiexen l\'estil global.',
      fields: [
        { type: 'area', label: 'Text', path: 'month.quote.text', rows: 4,
          hint: 'Enter per fer salt de línia' },
        { type: 'select', label: 'Tipografia', path: 'month.quote.font', options: FONT_OPTIONS, asFont: true },
        { type: 'range', label: 'Mida', path: 'month.quote.size', min: 4, max: 34, step: 0.2, unit: 'mm' },
        { type: 'range', label: 'Interlineat', path: 'month.quote.lineHeight', min: 0.9, max: 2.2, step: 0.01 },
        { type: 'select', label: 'Alineació', path: 'month.quote.align', options: ALIGN_OPTIONS },
        { type: 'select', label: 'Gruix', path: 'month.quote.weight', options: WEIGHT_OPTIONS },
        { type: 'check', label: 'Cursiva', path: 'month.quote.italic' },
        { type: 'check', label: 'MAJÚSCULES', path: 'month.quote.uppercase' },
        { type: 'range', label: 'Espai entre lletres', path: 'month.quote.letterSpacing', min: 0, max: 2, step: 0.02, unit: 'mm' },
        { type: 'color', label: 'Color del text', path: 'month.quote.color' },
        { type: 'range', label: 'Ombra', path: 'month.quote.shadow', min: 0, max: 0.9, step: 0.02 },
        { type: 'range', label: 'Difuminat de l\'ombra', path: 'month.quote.shadowBlur', min: 0, max: 6, step: 0.1, unit: 'mm' },
        { type: 'select', label: 'Fons de l\'escrit', path: 'month.quote.box', options: [
          { value: 'none', label: 'Sense fons' },
          { value: 'soft', label: 'Caixa suau darrere el text' },
          { value: 'band', label: 'Banda de costat a costat' }
        ] },
        { type: 'color', label: 'Color del fons', path: 'month.quote.boxColor' },
        { type: 'range', label: 'Opacitat del fons', path: 'month.quote.boxOpacity', min: 0, max: 0.9, step: 0.02 },
        { type: 'range', label: 'Radi de la caixa', path: 'month.quote.boxRadius', min: 0, max: 12, step: 0.5, unit: 'mm' },
        { type: 'range', label: 'Posició horitzontal', path: 'month.quote.xPct', min: 0, max: 100, step: 0.5, unit: '%' },
        { type: 'range', label: 'Posició vertical', path: 'month.quote.yPct', min: -10, max: 115, step: 0.5, unit: '%' },
        { type: 'range', label: 'Amplada del text', path: 'month.quote.widthPct', min: 20, max: 100, step: 1, unit: '%' },
        { type: 'buttons', buttons: [
          { label: 'Aplica aquest estil als 12 mesos', action: 'quoteStyleToAll' },
          { label: 'Torna a l\'estil global', action: 'quoteResetMonth' },
          { label: 'Buida el text d\'aquest mes', action: 'quoteClearMonth' }
        ] }
      ]
    };
  }

  function monthImageSection() {
    return {
      id: 'image', title: 'Dibuix d\'aquest mes', icon: '🖼️',
      fields: [
        { type: 'note', id: 'imageInfo', text: '' },
        { type: 'buttons', buttons: [
          { label: 'Puja un dibuix…', action: 'pickImage', primary: true },
          { label: 'Treu-lo (torna a l\'esbós)', action: 'clearImage' }
        ] },
        { type: 'select', label: 'Encaix', path: 'month.image.fit', options: [
          { value: 'cover', label: 'Omple el marc (retalla el que sobra)' },
          { value: 'contain', label: 'Sencer (deixa marges)' }
        ] },
        { type: 'range', label: 'Zoom', path: 'month.image.zoom', min: 0.5, max: 3, step: 0.01, unit: '×' },
        { type: 'range', label: 'Desplaçament horitzontal', path: 'month.image.offsetXPct', min: -60, max: 60, step: 0.5, unit: '%' },
        { type: 'range', label: 'Desplaçament vertical', path: 'month.image.offsetYPct', min: -60, max: 60, step: 0.5, unit: '%' },
        { type: 'select', label: 'Cantonades', path: 'month.image.shape', options: [
          { value: 'rect', label: 'Rectes' }, { value: 'rounded', label: 'Arrodonides' }
        ] },
        { type: 'range', label: 'Radi de les cantonades', path: 'month.image.radius', min: 0, max: 20, step: 0.5, unit: 'mm' },
        { type: 'range', label: 'Marc', path: 'month.image.borderWidth', min: 0, max: 3, step: 0.1, unit: 'mm' },
        { type: 'color', label: 'Color del marc', path: 'month.image.borderColor' },
        { type: 'color', label: 'Fons darrere el dibuix', path: 'month.image.background' },
        { type: 'buttons', buttons: [
          { label: 'Aplica aquests ajustos als 12 mesos', action: 'imageSettingsToAll' }
        ] }
      ]
    };
  }

  function SCHEMA() {
    return [
      monthQuoteSection(),
      monthImageSection(),
      {
        id: 'grid', title: 'Dies i graella', icon: '📅', open: true, fields: [
          { type: 'range', label: 'Amplada de cada casella', path: 'design.grid.cellWidth',
            min: 15, max: 42, step: 0.5, unit: 'mm', hint: '7 columnes · 35 mm dona espai per escriure-hi' },
          { type: 'range', label: 'Alçada de cada casella', path: 'design.grid.cellHeight',
            min: 15, max: 45, step: 0.5, unit: 'mm' },
          { type: 'check', label: 'Les 7 columnes omplen tot l\'ample del full', path: 'design.grid.fillWidth',
            hint: 'si ho marques, la mida de casella d\'amplada s\'ajusta sola' },
          { type: 'note', id: 'layoutInfo', text: '' },
          { type: 'select', label: 'Posició de la graella', path: 'design.grid.gridAlign', options: [
            { value: 'center', label: 'Centrada' },
            { value: 'left', label: 'A l\'esquerra' },
            { value: 'right', label: 'A la dreta' }
          ] },
          { type: 'check', label: 'Files fixes (6 sempre)', path: 'design.grid.fixedRows',
            hint: 'si ho desmarques, el febrer tindrà 4 files i el dibuix més espai' },
          { type: 'check', label: 'Línies de la graella', path: 'design.grid.showLines' },
          { type: 'color', label: 'Color de les línies', path: 'design.grid.lineColor' },
          { type: 'range', label: 'Gruix de les línies', path: 'design.grid.lineWidth', min: 0, max: 1, step: 0.02, unit: 'mm' },
          { type: 'select', label: 'Tipografia dels números', path: 'design.grid.dayNumberFont', options: FONT_OPTIONS, asFont: true },
          { type: 'range', label: 'Mida dels números', path: 'design.grid.dayNumberSize', min: 3, max: 16, step: 0.1, unit: 'mm' },
          { type: 'select', label: 'Gruix dels números', path: 'design.grid.dayNumberWeight', options: WEIGHT_OPTIONS },
          { type: 'select', label: 'Número del dia', path: 'design.grid.dayNumberAlign', options: [
            { value: 'left', label: 'A dalt a l\'esquerra' },
            { value: 'center', label: 'A dalt al centre' }
          ] },
          { type: 'color', label: 'Color dels números', path: 'design.grid.dayNumberColor' },
          { type: 'color', label: 'Color dels diumenges', path: 'design.grid.sundayColor' },
          { type: 'color', label: 'Color dels festius', path: 'design.grid.holidayColor' },
          { type: 'check', label: 'Fons gris al cap de setmana', path: 'design.grid.showWeekendShade' },
          { type: 'color', label: 'Color del fons del cap de setmana', path: 'design.grid.weekendShadeColor' },
          { type: 'check', label: 'Mostra els dies del mes veí', path: 'design.grid.showAdjacentDays' },
          { type: 'color', label: 'Color dels dies del mes veí', path: 'design.grid.adjacentColor' },
          { type: 'check', label: 'Capçalera amb els dies de la setmana', path: 'design.grid.showWeekdayHeader' },
          { type: 'text', label: 'Etiquetes dels dies', path: 'design.grid.weekdayLabels', list: true,
            hint: 'separades per comes; es pot canviar a "dl, dt, dc, dj, dv, ds, dg"' },
          { type: 'select', label: 'Tipografia de les etiquetes', path: 'design.grid.weekdayFont', options: FONT_OPTIONS, asFont: true },
          { type: 'range', label: 'Mida de les etiquetes', path: 'design.grid.weekdaySize', min: 2, max: 8, step: 0.1, unit: 'mm' },
          { type: 'color', label: 'Color de les etiquetes', path: 'design.grid.weekdayColor' },
          { type: 'range', label: 'Espai entre lletres de les etiquetes', path: 'design.grid.weekdayLetterSpacing', min: 0, max: 2, step: 0.05, unit: 'mm' }
        ]
      },
      {
        id: 'moon', title: 'Llunes', icon: '🌙', fields: [
          { type: 'check', label: 'Icona de la lluna cada dia', path: 'design.moon.daily' },
          { type: 'check', label: 'Nom de la fase als 4 dies clau', path: 'design.moon.names' },
          { type: 'check', label: 'Hora exacta de la fase', path: 'design.moon.times' },
          { type: 'select', label: 'On va la icona dins la casella', path: 'design.moon.pos', options: [
            { value: 'top-right', label: 'A dalt a la dreta' },
            { value: 'bottom-right', label: 'A baix a la dreta' },
            { value: 'center', label: 'Al centre' }
          ] },
          { type: 'select', label: 'On va el nom de la fase', path: 'design.moon.namePos', options: [
            { value: 'bottom', label: 'A baix de la casella' },
            { value: 'under-icon', label: 'Sota la icona' }
          ] },
          { type: 'range', label: 'Mida de la lluna', path: 'design.moon.radius', min: 1, max: 8, step: 0.1, unit: 'mm' },
          { type: 'range', label: 'Gruix del contorn', path: 'design.moon.outline', min: 0, max: 1, step: 0.02, unit: 'mm' },
          { type: 'color', label: 'Color del contorn', path: 'design.moon.lineColor' },
          { type: 'color', label: 'Color de la part il·luminada', path: 'design.moon.litColor' },
          { type: 'color', label: 'Color de la part fosca', path: 'design.moon.unlitColor' },
          { type: 'select', label: 'Tipografia del nom', path: 'design.moon.nameFont', options: FONT_OPTIONS, asFont: true },
          { type: 'range', label: 'Mida del nom', path: 'design.moon.nameSize', min: 1, max: 5, step: 0.05, unit: 'mm' },
          { type: 'color', label: 'Color del nom', path: 'design.moon.nameColor' }
        ]
      },
      {
        id: 'title', title: 'Títol del mes', icon: '🔤', fields: [
          { type: 'select', label: 'Text del títol', path: 'design.title.mode', options: [
            { value: 'auto', label: 'El nom del mes' }, { value: 'custom', label: 'Un text propi' }
          ] },
          { type: 'text', label: 'Text propi', path: 'design.title.custom', hint: 'només si has triat "un text propi"' },
          { type: 'select', label: 'Majúscules', path: 'design.title.caseMode', options: [
            { value: 'upper', label: 'GENER' }, { value: 'capitalize', label: 'Gener' },
            { value: 'lower', label: 'gener' }, { value: 'asis', label: 'Tal com s\'escriu' }
          ] },
          { type: 'select', label: 'Col·locació', path: 'design.title.layout', options: [
            { value: 'split', label: 'Mes a l\'esquerra, any a la dreta' },
            { value: 'left', label: 'Tot a l\'esquerra' },
            { value: 'center', label: 'Centrat' }
          ] },
          { type: 'select', label: 'Tipografia', path: 'design.title.font', options: FONT_OPTIONS, asFont: true },
          { type: 'range', label: 'Mida', path: 'design.title.size', min: 4, max: 40, step: 0.5, unit: 'mm' },
          { type: 'select', label: 'Gruix', path: 'design.title.weight', options: WEIGHT_OPTIONS },
          { type: 'range', label: 'Espai entre lletres', path: 'design.title.letterSpacing', min: 0, max: 4, step: 0.05, unit: 'mm' },
          { type: 'color', label: 'Color', path: 'design.title.color' },
          { type: 'check', label: 'Mostra l\'any', path: 'design.title.showYear' },
          { type: 'range', label: 'Mida de l\'any', path: 'design.title.yearSize', min: 3, max: 30, step: 0.5, unit: 'mm' },
          { type: 'range', label: 'Espai entre xifres de l\'any', path: 'design.title.yearLetterSpacing', min: 0, max: 6, step: 0.1, unit: 'mm' },
          { type: 'color', label: 'Color de l\'any', path: 'design.title.yearColor' }
        ]
      },
      {
        id: 'holidays', title: 'Festius', icon: '🎉', fields: [
          { type: 'check', label: 'Marca els festius', path: 'design.holidays.enabled' },
          { type: 'check', label: 'Escriu el nom del festiu', path: 'design.holidays.showNames' },
          { type: 'color', label: 'Color', path: 'design.holidays.color' },
          { type: 'range', label: 'Mida del nom', path: 'design.holidays.nameSize', min: 1, max: 5, step: 0.05, unit: 'mm' },
          { type: 'area', label: 'Llista de festius', path: 'design.holidays.list', rows: 8, holidays: true,
            hint: 'una línia per festiu: MM-DD Nom' },
          { type: 'buttons', buttons: [
            { label: 'Restaura els festius de Catalunya', action: 'holidaysReset' }
          ] }
        ]
      },
      {
        id: 'page', title: 'Pàgina i mesures', icon: '📐', fields: [
          { type: 'number', label: 'Any', path: 'design.year', min: 1900, max: 2200, step: 1 },
          { type: 'select', label: 'Zona horària', path: 'design.timeZone', options: [
            { value: 'Europe/Madrid', label: 'Europe/Madrid (Catalunya)' },
            { value: 'Europe/Lisbon', label: 'Europe/Lisbon' },
            { value: 'Europe/Paris', label: 'Europe/Paris' },
            { value: 'UTC', label: 'UTC' }
          ] },
          { type: 'range', label: 'Marge de seguretat', path: 'design.page.margin', min: 0, max: 25, step: 0.5, unit: 'mm' },
          { type: 'color', label: 'Color del paper', path: 'design.page.background' },
          { type: 'range', label: 'Separació dibuix-títol', path: 'design.layout.gap', min: 0, max: 20, step: 0.5, unit: 'mm' },
          { type: 'range', label: 'Alçada de la franja del títol', path: 'design.layout.titleHeight', min: 6, max: 35, step: 0.5, unit: 'mm' },
          { type: 'range', label: 'Alçada de la capçalera de dies', path: 'design.layout.weekdayHeight', min: 3, max: 16, step: 0.5, unit: 'mm' },
          { type: 'note', text: 'Pàgina A3 vertical: 297 × 420 mm. L\'alçada del dibuix es calcula sola: ' +
                                'és tot l\'espai que queda per sobre de la graella dels dies.' }
        ]
      },
      {
        id: 'export', title: 'Imprimir i exportar', icon: '🖨️', fields: [
          { type: 'select', label: 'Resolució de les imatges', path: 'app.dpi', options: [
            { value: 150, label: '150 ppp (proves ràpides)' },
            { value: 200, label: '200 ppp (recomanat per casa)' },
            { value: 300, label: '300 ppp (impremta)' }
          ] },
          { type: 'select', label: 'Format', path: 'app.format', options: [
            { value: 'png', label: 'PNG (sense pèrdua)' },
            { value: 'jpeg', label: 'JPG (més lleuger)' }
          ] },
          { type: 'buttons', buttons: [
            { label: 'Imprimeix aquest mes (A3)', action: 'printOne', primary: true },
            { label: 'Imprimeix els 12 mesos (A3)', action: 'printAll' },
            { label: 'Exporta aquest mes', action: 'exportOne' },
            { label: 'Exporta els 12 mesos (ZIP)', action: 'exportZip' }
          ] },
          { type: 'buttons', buttons: [
            { label: 'Desa el projecte (.json)', action: 'saveProject', primary: true },
            { label: 'Obre un projecte (.json)', action: 'loadProject' },
            { label: 'Reinicia-ho tot', action: 'resetAll', danger: true }
          ] },
          { type: 'check', label: 'Inclou els dibuixos al .json', path: 'app.includeImages' },
          { type: 'buttons', buttons: [
            { label: 'Torna a posar els textos d\'exemple', action: 'quotesReset' },
            { label: 'Torna a posar els esbossos de prova', action: 'placeholdersReset' }
          ] }
        ]
      }
    ];
  }

  /* ------------------------------------------------------- construcció DOM */

  function buildPanel(host, opts) {
    var get = opts.get, set = opts.set, run = opts.run, schema = SCHEMA();
    var refreshers = [];
    host.innerHTML = '';

    schema.forEach(function (section) {
      if (section.id === 'quote' && opts.monthSection === false) return;
      var details = el('details', 'section');
      details.open = !!section.open;
      var summary = el('summary');
      var iconSpan = el('span', 'sec-icon');
      iconSpan.textContent = section.icon || '•';
      summary.appendChild(iconSpan);
      summary.appendChild(document.createTextNode(section.title));
      details.appendChild(summary);

      var body = el('div', 'section-body');
      if (section.note) {
        var n = el('p', 'sec-note');
        n.textContent = section.note;
        body.appendChild(n);
      }

      section.fields.forEach(function (f) {
        body.appendChild(buildField(f, get, set, run, refreshers));
      });
      details.appendChild(body);
      host.appendChild(details);
    });

    function refresh() {
      refreshers.forEach(function (fn) { fn(); });
    }

    return { element: host, refresh: refresh };
  }

  function buildField(f, get, set, run, refreshers) {
    var wrap = el('div', 'field field-' + f.type);

    if (f.type === 'note') {
      var p = el('p', 'note-text');
      if (f.id) {
        p.id = f.id;
        refreshers.push(function () { if (f.refreshText) p.textContent = f.refreshText(); });
      } else {
        p.textContent = f.text;
      }
      wrap.appendChild(p);
      return wrap;
    }

    if (f.type === 'buttons') {
      var bar = el('div', 'btn-bar');
      f.buttons.forEach(function (b) {
        var btn = el('button', 'btn' + (b.primary ? ' btn-primary' : '') + (b.danger ? ' btn-danger' : ''));
        btn.type = 'button';
        btn.textContent = b.label;
        btn.addEventListener('click', function () { run(b.action, btn); });
        bar.appendChild(btn);
      });
      wrap.appendChild(bar);
      return wrap;
    }

    wrap.appendChild(labelFor(f.label, f.hint));

    var input;
    if (f.type === 'range') {
      var row = el('div', 'range-row');
      input = el('input', null, {
        type: 'range', min: f.min, max: f.max, step: f.step == null ? 1 : f.step
      });
      var out = el('span', 'range-value');
      row.appendChild(input);
      row.appendChild(out);
      wrap.appendChild(row);
      var apply = function (silent) {
        var v = parseFloat(input.value);
        out.textContent = (f.step && f.step < 1 ? v.toFixed(2) : v.toString()) + (f.unit ? ' ' + f.unit : '');
        if (!silent) set(f.path, v);
      };
      input.addEventListener('input', function () { apply(false); });
      refreshers.push(function () {
        var v = get(f.path);
        if (typeof v === 'number') { input.value = v; apply(true); }
      });
      return wrap;
    }

    if (f.type === 'color') {
      var crow = el('div', 'color-row');
      input = el('input', null, { type: 'color' });
      var hexText = el('input', 'hex-input', { type: 'text', spellcheck: 'false' });
      crow.appendChild(input);
      crow.appendChild(hexText);
      wrap.appendChild(crow);
      input.addEventListener('input', function () { hexText.value = input.value; set(f.path, input.value); });
      hexText.addEventListener('change', function () {
        var v = hexText.value.trim();
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) { input.value = v; set(f.path, v); }
        else hexText.value = input.value;
      });
      refreshers.push(function () {
        var v = get(f.path);
        if (typeof v === 'string') { input.value = v; hexText.value = v; }
      });
      return wrap;
    }

    if (f.type === 'select') {
      input = el('select');
      f.options.forEach(function (o) {
        var opt = el('option', null, { value: String(o.value) });
        opt.textContent = o.label;
        if (f.asFont) opt.style.fontFamily = o.value;
        input.appendChild(opt);
      });
      wrap.appendChild(input);
      input.addEventListener('change', function () {
        var v = input.value;
        if (f.options.length && typeof f.options[0].value === 'number') v = parseFloat(v);
        set(f.path, v);
      });
      refreshers.push(function () {
        var v = get(f.path);
        if (v !== undefined && v !== null) input.value = String(v);
      });
      return wrap;
    }

    if (f.type === 'check') {
      input = el('input', null, { type: 'checkbox' });
      var cwrap = el('label', 'check-row');
      cwrap.appendChild(input);
      var span = el('span');
      span.textContent = f.label;
      cwrap.appendChild(span);
      wrap.innerHTML = '';
      wrap.appendChild(cwrap);
      input.addEventListener('change', function () { set(f.path, input.checked); });
      refreshers.push(function () { input.checked = !!get(f.path); });
      return wrap;
    }

    if (f.type === 'area') {
      input = el('textarea', null, { rows: f.rows || 4 });
      wrap.appendChild(input);
      input.addEventListener('input', function () {
        if (f.holidays) set(f.path, parseHolidays(input.value));
        else set(f.path, input.value);
      });
      refreshers.push(function () {
        if (document.activeElement === input) return;
        var v = get(f.path);
        if (f.holidays) input.value = formatHolidays(v);
        else input.value = v == null ? '' : String(v);
      });
      return wrap;
    }

    if (f.type === 'number' || f.type === 'text') {
      input = el('input', null, {
        type: f.type === 'number' ? 'number' : 'text',
        min: f.min, max: f.max, step: f.step
      });
      wrap.appendChild(input);
      var onChange = function () {
        var v;
        if (f.type === 'number') v = parseFloat(input.value);
        else if (f.list) v = input.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        else v = input.value;
        set(f.path, v);
      };
      input.addEventListener('change', onChange);
      if (f.type === 'text' && !f.list) input.addEventListener('input', onChange);
      refreshers.push(function () {
        if (document.activeElement === input) return;
        var v = get(f.path);
        if (f.list) input.value = Array.isArray(v) ? v.join(', ') : (v == null ? '' : String(v));
        else input.value = v == null ? '' : String(v);
      });
      if (f.type === 'number' && f.refreshText) refreshers.push(function () {});
      return wrap;
    }

    return wrap;
  }

  function formatHolidays(list) {
    if (!Array.isArray(list)) return '';
    return list.map(function (h) {
      return String(h.month).padStart(2, '0') + '-' + String(h.day).padStart(2, '0') + ' ' + (h.name || '');
    }).join('\n');
  }

  function parseHolidays(text) {
    return String(text || '').split(/\r?\n/).map(function (line) {
      var m = /^\s*(\d{1,2})\s*[-/]\s*(\d{1,2})\s*(.*)$/.exec(line);
      if (!m) return null;
      return { month: parseInt(m[1], 10), day: parseInt(m[2], 10), name: m[3].trim() || 'Festiu' };
    }).filter(Boolean);
  }

  return {
    SCHEMA: SCHEMA,
    buildPanel: buildPanel,
    formatHolidays: formatHolidays,
    parseHolidays: parseHolidays,
    FONT_OPTIONS: FONT_OPTIONS
  };
});
