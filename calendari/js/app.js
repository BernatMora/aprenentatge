/*!
 * app.js — Controlador del calendari.
 *
 * Uneix totes les peces: estat, dibuixos, previsualització, editor, impressió
 * i exportació. Sense build: JS natiu amb IIFE, com la resta de projectes.
 */
(function () {
  'use strict';

  var Data = window.BLData;
  var Render = window.BLRender;
  var UI = window.BLUI;
  var Store = window.BLStore;
  var Images = window.BLImages;
  var Exporter = window.BLExporter;

  var DEFAULT_YEAR = 2027;

  var state = null;
  var currentMonth = 0;
  var imageCache = [];
  var pageEls = [];
  var pageUrls = [];
  var tool = 'quote';
  var qualityHigh = false;
  var preferHigh = false;
  var saveTimer = null;
  var panel = null;
  var refreshPending = false;

  var dom = {};
  var diag = { errors: [], pagesOk: 0, pagesFailed: [], t0: 0, bootMs: null, placeholderMs: null };

  function nowMs() {
    return (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  }

  /* ------------------------------------------------------- diagnòstic */

  /* Qualsevol problema s'ha de veure: mai una pantalla "penjada" en silenci. */
  function noteDiag(kind, msg) {
    var line = kind + ': ' + msg;
    if (diag.errors.indexOf(line) < 0) diag.errors.push(line);
    if (diag.errors.length > 8) diag.errors.shift();
    try { console.error('[calendari] ' + line); } catch (e) {}
    if (!diag.notified && dom.status) {
      diag.notified = true;
      setStatus('Hi ha hagut un problema · mira el «diagnòstic» de sota');
    }
    if (dom.diagBox) fillDiagBox();
  }

  function fillDiagBox() {
    if (!dom.diagBox) return;
    var lines = [
      'Navegador: ' + navigator.userAgent,
      'Pantalla: ' + window.innerWidth + '×' + window.innerHeight +
        ' (densitat ' + (window.devicePixelRatio || 1) + ')',
      'Adreça: ' + location.href,
      'IndexedDB (per desar els dibuixos): ' + (Store.isPersistent() ? 'disponible' : 'NO disponible'),
      'Pàgines pintades: ' + diag.pagesOk + ' de 12',
      'Dibuixos a la memòria: ' + imageCache.filter(function (c) { return c && c.display; }).length + ' de 12',
      'Temps: app a punt en ' + (diag.bootMs == null ? '—' : Math.round(diag.bootMs) + ' ms') +
        ' · dibuixos de prova en ' + (diag.placeholderMs == null ? '—' : Math.round(diag.placeholderMs) + ' ms'),
      'Zona horària detectada: ' + (function () {
        try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return '?'; }
      })()
    ];
    if (diag.pagesFailed.length) lines.push('Pàgines que no han acabat de pintar-se: ' + diag.pagesFailed.join(', '));
    if (diag.errors.length) lines.push('', 'Últims avisos i errors:', diag.errors.join('\n'));
    dom.diagBox.textContent = lines.join('\n');
  }

  /* ------------------------------------------------------------ camins */

  function isPlainObject(v) { return v && typeof v === 'object' && !Array.isArray(v); }

  function deepGet(obj, path) {
    if (!obj) return undefined;
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function deepSet(obj, path, value) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var k = parts[i];
      if (!isPlainObject(cur[k]) && !Array.isArray(cur[k])) cur[k] = {};
      cur = cur[k];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function deepDel(obj, path) {
    var parts = path.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      cur = cur[parts[i]];
      if (!cur) return;
    }
    delete cur[parts[parts.length - 1]];
  }

  /* Lectura amb herència: si el mes no ha tocat un valor, val el global. */
  function getPath(path) {
    if (path.indexOf('month.') === 0) {
      var key = path.slice(6);
      var m = state.months[currentMonth];
      var v = deepGet(m, key);
      if (v === undefined || v === null) return deepGet(state.design, key);
      return v;
    }
    if (path.indexOf('design.') === 0) return deepGet(state.design, path.slice(7));
    if (path.indexOf('app.') === 0) return deepGet(state.app, path.slice(4));
    return undefined;
  }

  function setPath(path, value) {
    if (path.indexOf('month.') === 0) deepSet(state.months[currentMonth], path.slice(6), value);
    else if (path.indexOf('design.') === 0) deepSet(state.design, path.slice(7), value);
    else if (path.indexOf('app.') === 0) deepSet(state.app, path.slice(4), value);
    afterChange(path);
  }

  /* --------------------------------------------------------- estat */

  function mergeDeep(base, over) {
    if (Array.isArray(base)) {
      if (!Array.isArray(over)) return base;
      if (base.length && isPlainObject(base[0]) && base.length === over.length) {
        return base.map(function (b, i) { return mergeDeep(b, over[i]); });
      }
      return over.slice();
    }
    if (isPlainObject(base)) {
      var out = {};
      Object.keys(base).forEach(function (k) { out[k] = base[k]; });
      if (isPlainObject(over)) {
        Object.keys(over).forEach(function (k) {
          out[k] = Object.prototype.hasOwnProperty.call(base, k) ? mergeDeep(base[k], over[k]) : over[k];
        });
      }
      return out;
    }
    return over === undefined ? base : over;
  }

  function defaults() {
    return {
      version: 1,
      savedAt: null,
      app: {
        dpi: 200,
        format: 'png',
        includeImages: true,
        welcomeDismissed: false,
        tool: 'quote'
      },
      design: Data.defaultDesign(DEFAULT_YEAR, 'Europe/Madrid'),
      months: Data.defaultMonths()
    };
  }

  function normalizeState(saved) {
    var def = defaults();
    if (!saved || typeof saved !== 'object') return def;
    var s = mergeDeep(def, saved);
    if (!s.design || typeof s.design.year !== 'number') s.design.year = DEFAULT_YEAR;
    if (!Array.isArray(s.months) || s.months.length !== 12) s.months = def.months;
    s.months = s.months.map(function (m, i) {
      m.month = i + 1;
      if (!isPlainObject(m.quote)) m.quote = { text: '' };
      if (!isPlainObject(m.image)) m.image = { name: '', isPlaceholder: true };
      return m;
    });
    return s;
  }

  function saveNow() {
    state.savedAt = new Date().toISOString();
    var ok = Store.saveState(state);
    /* El missatge de desat va a part, per no tapar l'estat de l'aplicació */
    if (dom.saved) dom.saved.textContent = ok
      ? 'Desat a les ' + new Date().toLocaleTimeString('ca-ES')
      : 'No s\'ha pogut desar';
    if (!ok) noteDiag('avís', 'no s\'ha pogut desar l\'estat en aquest navegador');
  }

  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 500);
  }

  /* ------------------------------------------------------ dibuixos */

  function imageAspect() {
    var L = Render.computeLayout(state.design, 6);
    return L.imageW / L.imageH;
  }

  function loadImageCache() {
    var jobs = [];
    for (var i = 0; i < 12; i++) {
      jobs.push((function (i) {
        return Promise.all([
          Store.get('img:' + i + ':display'),
          Store.get('img:' + i + ':print'),
          Store.get('meta:' + i)
        ]).then(function (r) {
          imageCache[i] = { display: r[0] || null, print: r[1] || null, meta: r[2] || null };
        });
      })(i));
    }
    return Promise.all(jobs);
  }

  /* Assegura que hi ha la versió demanada del dibuix (o genera l'esbós).
     Si la generació fallés (memòria, canvas bloquejat…), es continua sense
     dibuix en comptes de quedar-se penjat. */
  function ensureImage(i, kind) {
    var c = imageCache[i] || (imageCache[i] = { display: null, print: null, meta: null });
    if (c[kind]) return Promise.resolve(c[kind]);
    try {
      var gen = Images.placeholder(i, imageAspect(), { kinds: [kind] });
      c[kind] = gen[kind];
      if (!c.meta) c.meta = gen.meta;
      Store.set('img:' + i + ':' + kind, c[kind]);
      if (!c.metaStored) {
        c.metaStored = true;
        Store.set('meta:' + i, c.meta);
      }
    } catch (e) {
      noteDiag('avís', 'no s\'ha pogut generar l\'esbós del mes ' + (i + 1) + ' (' +
        (e && e.message ? e.message : e) + ')');
      c[kind] = null;
    }
    return Promise.resolve(c[kind]);
  }

  /* Genera els dibuixos de prova que faltin, d'un en un, pintant cada pàgina
     a mesura que està llesta: l'app es pot fer servir des del primer segon. */
  function generateMissingPlaceholders() {
    var pending = [];
    for (var i = 0; i < 12; i++) if (!imageCache[i] || !imageCache[i].display) pending.push(i);
    if (!pending.length) return Promise.resolve();
    var done = 0;
    var t0 = nowMs();
    return pending.reduce(function (chain, i) {
      return chain.then(function () {
        setStatus('Preparant els dibuixos de prova… ' + (done + 1) + ' de ' + pending.length);
        ensureImage(i, 'display');
        done++;
        return updatePage(i);
      });
    }, Promise.resolve()).then(function () {
      diag.placeholderMs = nowMs() - t0;
    });
  }

  function ensureAll(kind) {
    var jobs = [];
    for (var i = 0; i < 12; i++) jobs.push(ensureImage(i, kind));
    return Promise.all(jobs);
  }

  function pageSVGString(i, kind) {
    var c = imageCache[i] || {};
    var meta = c.meta || { width: 1000, height: 1120 };
    return Render.pageSVG({
      design: state.design,
      monthIndex: i,
      month: state.months[i],
      imageHref: c[kind] || null,
      imageWidth: meta.width,
      imageHeight: meta.height
    });
  }

  /* --------------------------------------------------- previsualització */

  /* Pinta una pàgina incrustant l'SVG directament al DOM. Sense cap càrrega
     asíncrona: no hi ha res que es pugui quedar penjat i funciona igual a tots
     els navegadors (els dibuixos hi van incrustats com a data URL). */
  function updatePage(i) {
    var el = pageEls[i];
    if (!el) return Promise.resolve(false);
    var kind = qualityHigh ? 'print' : 'display';
    try {
      el.paper.innerHTML = pageSVGString(i, kind);
      diag.pagesOk = Math.max(diag.pagesOk, i + 1);
      var at = diag.pagesFailed.indexOf(i + 1);
      if (at >= 0) diag.pagesFailed.splice(at, 1);
      if (dom.diagBox) fillDiagBox();
      return Promise.resolve(true);
    } catch (e) {
      if (diag.pagesFailed.indexOf(i + 1) < 0) diag.pagesFailed.push(i + 1);
      noteDiag('error', 'no s\'ha pogut dibuixar la pàgina ' + (i + 1) + ': ' +
        (e && e.message ? e.message : e));
      return Promise.resolve(false);
    }
  }

  function updateAllPages() {
    var jobs = [];
    for (var i = 0; i < 12; i++) jobs.push(updatePage(i));
    return Promise.all(jobs);
  }

  function buildPreview() {
    dom.preview.innerHTML = '';
    pageEls = [];
    pageUrls = [];
    for (var i = 0; i < 12; i++) {
      var wrap = document.createElement('div');
      wrap.className = 'page-wrap';
      wrap.dataset.month = String(i);
      var label = document.createElement('div');
      label.className = 'page-label';
      label.textContent = (i + 1) + ' · ' + Data.MONTHS_CA_TITLE[i];
      var paper = document.createElement('div');
      paper.className = 'page-paper';
      paper.setAttribute('role', 'img');
      paper.setAttribute('aria-label', 'Calendari ' + state.design.year + ' · ' +
        Data.MONTHS_CA_TITLE[i]);
      wrap.appendChild(label);
      wrap.appendChild(paper);
      wrap.addEventListener('click', function (idx) {
        return function () { selectMonth(idx, { scroll: false }); };
      }(i));
      attachDrag(wrap, i);
      attachDrop(wrap, i);
      dom.preview.appendChild(wrap);
      pageEls.push({ wrap: wrap, paper: paper, label: label });
    }
    markSelected();
  }

  function markSelected() {
    pageEls.forEach(function (el, i) {
      el.wrap.classList.toggle('is-selected', i === currentMonth);
      el.wrap.dataset.tool = tool;
    });
  }

  function selectMonth(i, opts) {
    opts = opts || {};
    currentMonth = Math.max(0, Math.min(11, i));
    dom.monthSelect.value = String(currentMonth);
    markSelected();
    buildPanelUI();
    if (opts.scroll !== false) {
      var el = pageEls[currentMonth];
      if (el) el.wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    updateImageInfo();
  }

  function updateImageInfo() {
    var note = document.getElementById('imageInfo');
    if (!note) return;
    var c = imageCache[currentMonth] || {};
    var meta = c.meta || {};
    note.textContent = meta.isPlaceholder || !meta.name
      ? 'Ara mateix: esbós de prova generat (no és cap dibuix original). Puja el dibuix de debò quan el tinguis.'
      : 'Dibuix: ' + meta.name + (meta.srcWidth ? ' · ' + meta.srcWidth + '×' + meta.srcHeight + ' px' : '') +
        ' · versió d\'impressió ' + (meta.width || '?') + '×' + (meta.height || '?') + ' px';
  }

  /* Mesures resultants + avisos si alguna cosa no hi cap. */
  function updateLayoutInfo() {
    var d = state.design;
    var L = Render.computeLayout(d, d.grid.fixedRows === false ? 4 : 6);
    var rows = d.grid.fixedRows === false ? '4 a 6' : '6';
    var note = document.getElementById('layoutInfo');
    if (note) {
      note.textContent = 'Resultat: caselles de ' + round1(L.colW) + ' × ' + round1(L.rowH) + ' mm · ' +
        'graella de ' + round1(L.gridW) + ' × ' + round1(L.gridH) + ' mm (' + rows + ' files) · ' +
        'dibuix de ' + round1(L.imageW) + ' × ' + round1(L.imageH) + ' mm. ' +
        'Cada casella té uns ' + round1(Math.max(0, L.rowH - d.grid.dayNumberSize * 1.6 -
          d.moon.nameSize * 2.4)) + ' mm d\'alt per escriure-hi.';
    }
    return L;
  }

  function round1(v) { return Math.round(v * 10) / 10; }

  function updateWarnings() {
    var bar = document.getElementById('warnBar');
    if (!bar) return;
    var msgs = [];
    var L = Render.computeLayout(state.design, state.design.grid.fixedRows === false ? 4 : 6);
    if (L.imageH < 60) {
      msgs.push('El dibuix queda molt baix (' + round1(L.imageH) + ' mm): reduceix la mida de les caselles, ' +
                'el marge o l\'alçada del títol.');
    }
    var q = Object.assign({}, state.design.quote, state.months[currentMonth].quote);
    if (q.text) {
      var mq = Render.measureQuote(q, L.imageW, L.imageH);
      if (!mq.fitsHeight) {
        msgs.push('L\'escrit d\'aquest mes fa ' + round1(mq.blockH) + ' mm d\'alt i la zona del dibuix en té ' +
                  round1(L.imageH) + ': redueix la mida, l\'interlineat o el nombre de línies.');
      } else if (!mq.fitsWidth) {
        msgs.push('L\'escrit és més ample que la seva caixa: amplia «Amplada del text» o redueix la mida.');
      }
    }
    bar.textContent = msgs.join(' ');
    bar.hidden = msgs.length === 0;
  }

  /* ------------------------------------------------ interacció directa */

  function attachDrag(wrap, i) {
    var paper = wrap.querySelector('.page-paper');
    var active = false, startX = 0, startY = 0, baseA = 0, baseB = 0, rect = null, pathX = '', pathY = '';

    wrap.addEventListener('pointerdown', function (ev) {
      if (ev.button !== 0) return;
      if (ev.target.closest('.page-label')) return;
      if (currentMonth !== i) selectMonth(i, { scroll: false });
      active = true;
      startX = ev.clientX;
      startY = ev.clientY;
      rect = paper.getBoundingClientRect();
      if (tool === 'quote') { pathX = 'month.quote.xPct'; pathY = 'month.quote.yPct'; }
      else { pathX = 'month.image.offsetXPct'; pathY = 'month.image.offsetYPct'; }
      baseA = Number(getPath(pathX)) || 0;
      baseB = Number(getPath(pathY)) || 0;
      wrap.classList.add('is-dragging');
      try { wrap.setPointerCapture(ev.pointerId); } catch (e) {}
      ev.preventDefault();
    });

    wrap.addEventListener('pointermove', function (ev) {
      if (!active) return;
      var d = state.design;
      var mmPerPx = d.page.width / rect.width;
      var L = Render.computeLayout(d, 6);
      var imageW = L.imageW, imageH = L.imageH;
      var dA = (ev.clientX - startX) * mmPerPx / imageW * 100;
      var dB = (ev.clientY - startY) * mmPerPx / imageH * 100;
      var limA = tool === 'quote' ? [-20, 120] : [-80, 80];
      var limB = tool === 'quote' ? [-30, 130] : [-80, 80];
      deepSet(state.months[i], tool === 'quote' ? 'quote.xPct' : 'image.offsetXPct',
              Math.round(Math.max(limA[0], Math.min(limA[1], baseA + dA)) * 10) / 10);
      deepSet(state.months[i], tool === 'quote' ? 'quote.yPct' : 'image.offsetYPct',
              Math.round(Math.max(limB[0], Math.min(limB[1], baseB + dB)) * 10) / 10);
      updatePage(i);
      schedulePanelRefresh();
      scheduleSave();
    });

    function end(ev) {
      if (!active) return;
      active = false;
      wrap.classList.remove('is-dragging');
      try { wrap.releasePointerCapture(ev.pointerId); } catch (e) {}
      schedulePanelRefresh(true);
    }
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);
  }

  function attachDrop(wrap, i) {
    wrap.addEventListener('dragover', function (ev) {
      ev.preventDefault();
      wrap.classList.add('is-drop');
    });
    wrap.addEventListener('dragleave', function () { wrap.classList.remove('is-drop'); });
    wrap.addEventListener('drop', function (ev) {
      ev.preventDefault();
      wrap.classList.remove('is-drop');
      var file = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
      if (file) setImage(i, file);
    });
  }

  function schedulePanelRefresh(force) {
    if (refreshPending && !force) return;
    refreshPending = true;
    requestAnimationFrame(function () {
      refreshPending = false;
      if (panel) panel.refresh();
    });
  }

  /* ------------------------------------------------------- accions */

  function afterChange(path) {
    if (path.indexOf('design.') === 0 && path !== 'design.title.custom') {
      updateAllPages();
      if (path === 'design.year') syncYearLabels();
    } else {
      updatePage(currentMonth);
    }
    if (path.indexOf('design.grid.') === 0 || path.indexOf('design.layout.') === 0 ||
        path === 'design.page.margin') {
      updateLayoutInfo();
    }
    scheduleSave();
    updateImageInfo();
    updateWarnings();
  }

  function syncYearLabels() {
    dom.yearLabel.textContent = state.design.year;
    document.title = 'Calendari ' + state.design.year + ' · BernatLab';
    pageEls.forEach(function (el, i) {
      el.label.textContent = (i + 1) + ' · ' + Data.MONTHS_CA_TITLE[i];
    });
    refreshMoonButtonLabel();
  }

  function refreshMoonButtonLabel() { /* reservat per a futures etiquetes */ }

  function setImage(i, file) {
    setBusy('Preparant el dibuix…');
    return Images.processFile(file, { background: state.design.page.background })
      .then(function (res) {
        imageCache[i] = { display: res.display, print: res.print, meta: res.meta, metaStored: true };
        var img = state.months[i].image || {};
        img.name = res.meta.name;
        img.isPlaceholder = false;
        state.months[i].image = img;
        return Promise.all([
          Store.set('img:' + i + ':display', res.display),
          Store.set('img:' + i + ':print', res.print),
          Store.set('meta:' + i, res.meta)
        ]);
      })
      .then(function () {
        return updatePage(i);
      })
      .then(function () {
        saveNow();
        updateImageInfo();
        toast('Dibuix posat: ' + (imageCache[i].meta.name || ''));
      })
      .catch(function (e) {
        toast('No s\'ha pogut obrir el dibuix: ' + (e && e.message ? e.message : e));
      })
      .then(function () { clearBusy(); });
  }

  function clearImage(i) {
    var gen = Images.placeholder(i, imageAspect(), { kinds: ['display'] });
    imageCache[i] = { display: gen.display, print: null, meta: gen.meta, metaStored: true };
    var img = state.months[i].image || {};
    img.name = '';
    img.isPlaceholder = true;
    state.months[i].image = img;
    Store.del('img:' + i + ':print');
    Store.set('img:' + i + ':display', gen.display);
    Store.set('meta:' + i, gen.meta);
    updatePage(i);
    saveNow();
    updateImageInfo();
    toast('Tornem a l\'esbós de prova');
  }

  var QUOTE_STYLE_KEYS = ['font', 'size', 'lineHeight', 'weight', 'italic', 'uppercase',
    'letterSpacing', 'align', 'color', 'shadow', 'shadowBlur', 'box', 'boxColor',
    'boxOpacity', 'boxRadius', 'xPct', 'yPct', 'widthPct'];
  var IMAGE_STYLE_KEYS = ['fit', 'zoom', 'offsetXPct', 'offsetYPct', 'shape', 'radius',
    'borderWidth', 'borderColor', 'background'];

  function quoteStyleToAll() {
    var src = state.months[currentMonth].quote || {};
    var style = {};
    QUOTE_STYLE_KEYS.forEach(function (k) {
      if (src[k] !== undefined) style[k] = src[k];
      else if (state.design.quote[k] !== undefined) style[k] = state.design.quote[k];
    });
    state.months.forEach(function (m, i) {
      if (i === currentMonth) return;
      m.quote = m.quote || {};
      QUOTE_STYLE_KEYS.forEach(function (k) { m.quote[k] = style[k]; });
    });
    updateAllPages();
    saveNow();
    panel.refresh();
    toast('Estil de l\'escrit aplicat als 12 mesos (cada text es manté)');
  }

  function quoteResetMonth() {
    var m = state.months[currentMonth];
    var text = m.quote ? m.quote.text : '';
    m.quote = { text: text };
    updatePage(currentMonth);
    saveNow();
    panel.refresh();
    toast('Aquest mes torna a seguir l\'estil global');
  }

  function imageSettingsToAll() {
    var src = state.months[currentMonth].image || {};
    var style = {};
    IMAGE_STYLE_KEYS.forEach(function (k) {
      if (src[k] !== undefined) style[k] = src[k];
      else if (state.design.image[k] !== undefined) style[k] = state.design.image[k];
    });
    state.months.forEach(function (m, i) {
      if (i === currentMonth) return;
      m.image = m.image || {};
      IMAGE_STYLE_KEYS.forEach(function (k) { m.image[k] = style[k]; });
    });
    updateAllPages();
    saveNow();
    panel.refresh();
    toast('Ajustos de dibuix aplicats als 12 mesos');
  }

  function runAction(action, btn) {
    switch (action) {
      case 'pickImage': dom.filePicker.click(); break;
      case 'clearImage': clearImage(currentMonth); break;
      case 'quoteStyleToAll': quoteStyleToAll(); break;
      case 'quoteResetMonth': quoteResetMonth(); break;
      case 'quoteClearMonth':
        state.months[currentMonth].quote.text = '';
        updatePage(currentMonth); saveNow(); panel.refresh();
        break;
      case 'imageSettingsToAll': imageSettingsToAll(); break;
      case 'holidaysReset':
        state.design.holidays.list = Data.defaultHolidays(state.design.year);
        updateAllPages(); saveNow(); panel.refresh();
        toast('Festius restaurats per a l\'any ' + state.design.year);
        break;
      case 'quotesReset':
        state.months.forEach(function (m, i) { m.quote.text = Data.SAMPLE_QUOTES[i]; });
        updateAllPages(); saveNow(); panel.refresh();
        toast('Textos d\'exemple restaurats');
        break;
      case 'placeholdersReset':
        for (var i = 0; i < 12; i++) {
          var gen = Images.placeholder(i, imageAspect(), { kinds: ['display'] });
          imageCache[i] = { display: gen.display, print: null, meta: gen.meta, metaStored: true };
          state.months[i].image = { name: '', isPlaceholder: true };
          Store.del('img:' + i + ':print');
          Store.set('img:' + i + ':display', gen.display);
          Store.set('meta:' + i, gen.meta);
        }
        updateAllPages(); saveNow(); panel.refresh();
        toast('Esbossos de prova restaurats');
        break;
      case 'printOne': printPages(false); break;
      case 'printAll': printPages(true); break;
      case 'exportOne': exportOne(); break;
      case 'exportZip': exportZip(); break;
      case 'saveProject': saveProject(); break;
      case 'loadProject': dom.jsonPicker.click(); break;
      case 'resetAll': resetAll(); break;
      default: break;
    }
  }

  /* ----------------------------------------------------- impressió */

  function loadAllPages() {
    return Promise.all(pageEls.map(function (_, i) { return updatePage(i); }));
  }

  function printPages(all) {
    var targets = [];
    for (var i = 0; i < 12; i++) if (all || i === currentMonth) targets.push(i);
    setBusy('Preparant la impressió en alta qualitat…');
    var chain = Promise.resolve();
    targets.forEach(function (i) {
      chain = chain.then(function () { return ensureImage(i, 'print'); });
    });
    return chain.then(function () {
      qualityHigh = true;
      return loadAllPages();
    }).then(function () {
      document.body.classList.toggle('printing-single', !all);
      pageEls.forEach(function (el, i) {
        el.wrap.classList.toggle('is-print-target', i === currentMonth);
      });
      clearBusy();
      return new Promise(function (r) { setTimeout(r, 80); });
    }).then(function () {
      window.print();
    });
  }

  window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing-single');
    pageEls.forEach(function (el) { el.wrap.classList.remove('is-print-target'); });
    qualityHigh = preferHigh;
    updateAllPages();
  });

  /* ----------------------------------------------------- exportació */

  function slug(i) {
    return Data.MONTHS_CA[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/gi, '-');
  }

  function ext() { return state.app.format === 'jpeg' ? 'jpg' : 'png'; }

  function exportOne() {
    setBusy('Generant el mes…');
    return ensureImage(currentMonth, 'print').then(function () {
      var svg = pageSVGString(currentMonth, 'print');
      return Exporter.pageBlob(svg, { dpi: state.app.dpi, format: state.app.format, quality: 0.95 });
    }).then(function (blob) {
      Exporter.download(blob, 'calendari-' + state.design.year + '-' + slug(currentMonth) + '.' + ext());
      clearBusy();
      toast('Fitxer desat (' + state.app.dpi + ' ppp)');
    }).catch(function (e) {
      clearBusy();
      toast('Error exportant: ' + (e && e.message ? e.message : e));
    });
  }

  function exportZip() {
    setBusy('Preparant els 12 mesos…');
    var pages = [];
    var chain = Promise.resolve();
    for (var i = 0; i < 12; i++) {
      (function (i) {
        chain = chain.then(function () {
          return ensureImage(i, 'print').then(function () {
            pages.push({
              name: 'calendari-' + state.design.year + '-' + String(i + 1).padStart(2, '0') + '-' +
                    slug(i) + '.' + ext(),
              svg: pageSVGString(i, 'print')
            });
          });
        });
      })(i);
    }
    return chain.then(function () {
      return Exporter.pagesZip(pages, {
        dpi: state.app.dpi,
        format: state.app.format,
        quality: 0.95,
        onProgress: function (done, total, name) {
          setBusy('Generant ' + Math.min(done + 1, total) + '/' + total + ' · ' + name);
        }
      });
    }).then(function (blob) {
      Exporter.download(blob, 'calendari-' + state.design.year + '-A3.zip');
      clearBusy();
      toast('ZIP desat amb els 12 mesos');
    }).catch(function (e) {
      clearBusy();
      toast('Error exportant: ' + (e && e.message ? e.message : e));
    });
  }

  /* ------------------------------------------------ projecte (.json) */

  function saveProject() {
    setBusy('Preparant el projecte…');
    var out = {
      app: 'bernatlab-calendari',
      version: 1,
      savedAt: new Date().toISOString(),
      state: state
    };
    var chain = Promise.resolve();
    if (state.app.includeImages) {
      out.images = {};
      for (var i = 0; i < 12; i++) {
        (function (i) {
          chain = chain.then(function () {
            return ensureImage(i, 'display').then(function () {
              out.images[i] = {
                display: imageCache[i].display,
                print: imageCache[i].print || null,
                meta: imageCache[i].meta
              };
            });
          });
        })(i);
      }
    }
    return chain.then(function () {
      var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
      Exporter.download(blob, 'calendari-' + state.design.year + '-projecte.json');
      clearBusy();
      toast('Projecte desat' + (state.app.includeImages ? ' (amb dibuixos)' : ' (sense dibuixos)'));
    });
  }

  function loadProjectFile(file) {
    setBusy('Obrint el projecte…');
    return file.text().then(function (txt) {
      var parsed = JSON.parse(txt);
      if (parsed.app !== 'bernatlab-calendari' || !parsed.state) {
        throw new Error('aquest fitxer no sembla un projecte del calendari');
      }
      state = normalizeState(parsed.state);
      var jobs = [];
      for (var i = 0; i < 12; i++) {
        imageCache[i] = { display: null, print: null, meta: null };
      }
      if (parsed.images) {
        Object.keys(parsed.images).forEach(function (k) {
          var i = parseInt(k, 10);
          if (!(i >= 0 && i < 12)) return;
          imageCache[i] = {
            display: parsed.images[k].display || null,
            print: parsed.images[k].print || null,
            meta: parsed.images[k].meta || null,
            metaStored: true
          };
          if (imageCache[i].display) jobs.push(Store.set('img:' + i + ':display', imageCache[i].display));
          if (imageCache[i].print) jobs.push(Store.set('img:' + i + ':print', imageCache[i].print));
          jobs.push(Store.set('meta:' + i, imageCache[i].meta));
        });
      }
      return Promise.all(jobs).then(function () { return ensureAll('display'); });
    }).then(function () {
      syncYearLabels();
      dom.yearLabel.textContent = state.design.year;
      dom.qualityBox.checked = false;
      preferHigh = false;
      qualityHigh = false;
      return updateAllPages();
    }).then(function () {
      selectMonth(currentMonth, { scroll: false });
      saveNow();
      clearBusy();
      toast('Projecte obert');
    }).catch(function (e) {
      clearBusy();
      toast('No s\'ha pogut obrir: ' + (e && e.message ? e.message : e));
    });
  }

  function resetAll() {
    if (!window.confirm('Segur que vols esborrar-ho tot i tornar a començar? Els dibuixos pujats es perdran.')) return;
    Store.clearAll().then(function () {
      state = defaults();
      for (var i = 0; i < 12; i++) imageCache[i] = { display: null, print: null, meta: null };
      return ensureAll('display');
    }).then(function () {
      qualityHigh = false;
      preferHigh = false;
      dom.qualityBox.checked = false;
      syncYearLabels();
      return updateAllPages();
    }).then(function () {
      selectMonth(0, { scroll: false });
      saveNow();
      toast('Tot reiniciat');
    });
  }

  /* ---------------------------------------------------- interfície */

  function toast(msg, ms) {
    dom.toast.textContent = msg;
    dom.toast.classList.add('is-visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { dom.toast.classList.remove('is-visible'); }, ms || 2600);
  }

  function setStatus(msg) { dom.status.textContent = msg; }

  function setBusy(msg) {
    dom.busyText.textContent = msg || 'Treballant…';
    dom.busy.hidden = false;
  }

  function clearBusy() { dom.busy.hidden = true; }

  function buildPanelUI() {
    dom.panel.innerHTML = '';

    var warn = document.createElement('div');
    warn.id = 'warnBar';
    warn.className = 'warn-bar';
    warn.hidden = true;
    dom.panel.appendChild(warn);

    var welcome = document.createElement('details');
    welcome.className = 'welcome';
    welcome.open = !state.app.welcomeDismissed;
    var sum = document.createElement('summary');
    sum.textContent = 'Com es fa servir (4 passes)';
    welcome.appendChild(sum);
    var body = document.createElement('div');
    body.className = 'welcome-body';
    body.innerHTML =
      '<ol>' +
      '<li><b>Escriu el text</b> a «Escrit d\'aquest mes». Pot tenir diverses línies.</li>' +
      '<li><b>Puja el dibuix</b> amb «Puja un dibuix…» (o arrossega la imatge damunt la pàgina).</li>' +
      '<li><b>Col·loca\'l</b>: tria «Mou l\'escrit» o «Mou el dibuix» i arrossega damunt la previsualització. ' +
      'Les barres del panell fan el mateix amb precisió.</li>' +
      '<li><b>Imprimeix o exporta</b>: «Imprimeix aquest mes» (A3) o «Exporta els 12 mesos (ZIP)».</li>' +
      '</ol>' +
      '<p>Tot es desa sol en aquest navegador. Per enviar la feina a algú altre: ' +
      '«Desa el projecte (.json)» i envia el fitxer; l\'altra persona el pot obrir amb «Obre un projecte».</p>';
    welcome.appendChild(body);
    welcome.addEventListener('toggle', function () {
      var closed = !welcome.open;
      if (state.app.welcomeDismissed === closed) return;   /* res a fer */
      state.app.welcomeDismissed = closed;
      scheduleSave();
    });
    dom.panel.appendChild(welcome);

    var host = document.createElement('div');
    dom.panel.appendChild(host);
    panel = UI.buildPanel(host, { get: getPath, set: setPath, run: runAction });
    panel.refresh();
    updateImageInfo();
    updateLayoutInfo();
    updateWarnings();
  }

  function buildToolbar() {
    dom.monthSelect.innerHTML = '';
    for (var i = 0; i < 12; i++) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = (i + 1) + ' · ' + Data.MONTHS_CA_TITLE[i];
      dom.monthSelect.appendChild(opt);
    }
    dom.monthSelect.value = '0';
    dom.monthSelect.addEventListener('change', function () {
      selectMonth(parseInt(dom.monthSelect.value, 10), { scroll: true });
    });
    dom.prevBtn.addEventListener('click', function () { selectMonth(currentMonth - 1, { scroll: true }); });
    dom.nextBtn.addEventListener('click', function () { selectMonth(currentMonth + 1, { scroll: true }); });

    dom.qualityBox.checked = preferHigh;
    dom.qualityBox.addEventListener('change', function () {
      preferHigh = dom.qualityBox.checked;
      if (!preferHigh) {
        qualityHigh = false;
        updateAllPages();
        return;
      }
      setBusy('Preparant la vista d\'alta qualitat…');
      ensureAll('print').then(function () {
        qualityHigh = true;
        return updateAllPages();
      }).then(clearBusy);
    });

    dom.toolButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tool = btn.dataset.tool;
        state.app.tool = tool;
        dom.toolButtons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        markSelected();
        scheduleSave();
      });
    });

    dom.zoom.addEventListener('input', function () {
      var v = parseFloat(dom.zoom.value);
      document.documentElement.style.setProperty('--page-w', v + 'px');
      /* Percentatge respecte la mida real en pantalla (A3 = 297 mm ≈ 1122 px a 96 ppp) */
      dom.zoomValue.textContent = Math.round(v / 1122 * 100) + ' %';
    });
    dom.zoom.dispatchEvent(new Event('input'));

    dom.printOne.addEventListener('click', function () { printPages(false); });
    dom.printAll.addEventListener('click', function () { printPages(true); });
    dom.exportOne.addEventListener('click', function () { exportOne(); });
    dom.exportZip.addEventListener('click', function () { exportZip(); });
    dom.saveJson.addEventListener('click', function () { saveProject(); });
    dom.loadJson.addEventListener('click', function () { dom.jsonPicker.click(); });

    dom.filePicker.addEventListener('change', function () {
      var f = dom.filePicker.files && dom.filePicker.files[0];
      dom.filePicker.value = '';
      if (f) setImage(currentMonth, f);
    });
    dom.jsonPicker.addEventListener('change', function () {
      var f = dom.jsonPicker.files && dom.jsonPicker.files[0];
      dom.jsonPicker.value = '';
      if (f) loadProjectFile(f);
    });

    document.addEventListener('keydown', function (ev) {
      var t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) return;
      var step = ev.shiftKey ? 5 : 1;
      var pathX = tool === 'quote' ? 'month.quote.xPct' : 'month.image.offsetXPct';
      var pathY = tool === 'quote' ? 'month.quote.yPct' : 'month.image.offsetYPct';
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
        ev.preventDefault();
        var vx = Number(getPath(pathX)) || 0, vy = Number(getPath(pathY)) || 0;
        if (ev.key === 'ArrowLeft') vx -= step;
        if (ev.key === 'ArrowRight') vx += step;
        if (ev.key === 'ArrowUp') vy -= step;
        if (ev.key === 'ArrowDown') vy += step;
        deepSet(state.months[currentMonth], tool === 'quote' ? 'quote.xPct' : 'image.offsetXPct', Math.round(vx * 10) / 10);
        deepSet(state.months[currentMonth], tool === 'quote' ? 'quote.yPct' : 'image.offsetYPct', Math.round(vy * 10) / 10);
        updatePage(currentMonth);
        schedulePanelRefresh(true);
        scheduleSave();
      }
    });

    window.addEventListener('beforeunload', function () { if (saveTimer) { clearTimeout(saveTimer); saveNow(); } });
  }

  /* --------------------------------------------------------- arrencada */

  function boot() {
    dom = {
      panel: document.getElementById('panel'),
      preview: document.getElementById('preview'),
      toast: document.getElementById('toast'),
      status: document.getElementById('status'),
      saved: document.getElementById('saved'),
      busy: document.getElementById('busy'),
      busyText: document.getElementById('busyText'),
      monthSelect: document.getElementById('monthSelect'),
      prevBtn: document.getElementById('prevMonth'),
      nextBtn: document.getElementById('nextMonth'),
      qualityBox: document.getElementById('quality'),
      zoom: document.getElementById('zoom'),
      zoomValue: document.getElementById('zoomValue'),
      toolButtons: Array.prototype.slice.call(document.querySelectorAll('[data-tool]')),
      printOne: document.getElementById('printOne'),
      printAll: document.getElementById('printAll'),
      exportOne: document.getElementById('exportOne'),
      exportZip: document.getElementById('exportZip'),
      saveJson: document.getElementById('saveJson'),
      loadJson: document.getElementById('loadJson'),
      filePicker: document.getElementById('filePicker'),
      jsonPicker: document.getElementById('jsonPicker'),
      yearLabel: document.getElementById('yearLabel'),
      diagBox: document.getElementById('diag'),
      warnBar: null
    };
    diag.t0 = nowMs();

    /* Cap error no es pot perdre: tot va a la barra d'estat i al diagnòstic. */
    window.addEventListener('error', function (e) {
      noteDiag('error', (e.message || 'error desconegut') + ' (' +
        String(e.filename || '').split('/').pop() + ':' + (e.lineno || '?') + ')');
    });
    window.addEventListener('unhandledrejection', function (e) {
      var r = e.reason;
      noteDiag('error', r && r.message ? r.message : String(r));
    });

    try {
      state = normalizeState(Store.loadState());
    } catch (e) {
      noteDiag('avís', 'no s\'ha pogut llegir el projecte desat, es comença de nou');
      state = defaults();
    }
    tool = state.app.tool === 'image' ? 'image' : 'quote';

    if (!Store.isPersistent()) {
      diag.errors.push('IndexedDB no disponible: els dibuixos no es podran desar entre sessions');
    }

    syncYearLabels();
    buildToolbar();
    buildPreview();
    buildPanelUI();
    updatePage(0);
    finishStatus('Llest');

    /* Cadena d'arrencada: primer es pinta el full (ràpid), després es recuperen
       o es generen els dibuixos de prova un a un. Sempre acaba, passi el que passi. */
    Promise.resolve()
      .then(function () { return loadImageCache(); })
      .then(function () { return updateAllPages(); })
      .then(function () { return generateMissingPlaceholders(); })
      .then(function () { return updateAllPages(); })
      .then(function () {
        finishStatus(diag.errors.length ? 'Tot a punt (amb avisos)' : 'Tot a punt');
      })
      .catch(function (e) {
        noteDiag('error', 'arrencada: ' + (e && e.message ? e.message : e));
        finishStatus('Hi ha hagut un problema');
      })
      .then(function () {
        clearBusy();
        if (dom.diagBox) fillDiagBox();
      });
  }

  function finishStatus(prefix) {
    diag.bootMs = nowMs() - diag.t0;
    var extra = diag.errors.length ? ' · mira el diagnòstic' : '';
    setStatus(prefix + ' · ' + state.design.year + ' · A3 ' + state.design.page.width + '×' +
              state.design.page.height + ' mm' + extra);
    if (dom.diagBox) fillDiagBox();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.BLApp = {
    getState: function () { return state; },
    selectMonth: selectMonth,
    updateAllPages: updateAllPages,
    setImage: setImage,
    getImageCache: function () { return imageCache; }
  };
})();
