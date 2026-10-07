/*!
 * data.js — Noms en català, festius, textos d'exemple i disseny per defecte.
 * UMD: navegador (window.BLData) i Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BLData = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var MONTHS_CA = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny',
                   'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
  var MONTHS_CA_TITLE = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
                         'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
  var DAYS_CA = ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'];
  var DAYS_CA_SHORT = ['dl', 'dt', 'dc', 'dj', 'dv', 'ds', 'dg'];

  /* --------------------------------------------------------------- festius */

  /* Diumenge de Pasqua (algorisme gregorià anònim). */
  function easterSunday(year) {
    var a = year % 19, b = Math.floor(year / 100), c = year % 100;
    var d = Math.floor(b / 4), e = b % 4;
    var f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month - 1, day));
  }

  function addDays(date, n) {
    return new Date(date.getTime() + n * 86400000);
  }

  /* Festius per defecte: Catalunya. Els de Pasqua es calculen sols. */
  function defaultHolidays(year) {
    var list = [
      { month: 1, day: 1, name: 'Cap d\'Any' },
      { month: 1, day: 6, name: 'Reis' },
      { month: 5, day: 1, name: 'Festa del Treball' },
      { month: 6, day: 24, name: 'Sant Joan' },
      { month: 8, day: 15, name: 'Assumpció' },
      { month: 9, day: 11, name: 'Diada' },
      { month: 10, day: 12, name: 'Hispanitat' },
      { month: 11, day: 1, name: 'Tots Sants' },
      { month: 12, day: 6, name: 'Constitució' },
      { month: 12, day: 8, name: 'Immaculada' },
      { month: 12, day: 25, name: 'Nadal' },
      { month: 12, day: 26, name: 'Sant Esteve' }
    ];
    var e = easterSunday(year);
    var good = addDays(e, -2), easterMon = addDays(e, 1);
    list.push({ month: good.getUTCMonth() + 1, day: good.getUTCDate(), name: 'Divendres Sant', easter: true });
    list.push({ month: easterMon.getUTCMonth() + 1, day: easterMon.getUTCDate(), name: 'Dilluns de Pasqua', easter: true });
    list.sort(function (a, b) { return a.month - b.month || a.day - b.day; });
    return list;
  }

  /* Textos d'exemple (esborranys, pensats perquè ella els canviï tots). */
  var SAMPLE_QUOTES = [
    'El fred dibuixa finestres on abans hi havia núvols.',
    'La llum torna a poc a poc, sense pressa, com qui no vol molestar.',
    'Els brots no pregunten si és el moment: simplement hi confien.',
    'Tot el que estava quiet comença a dir el seu nom.',
    'Les flors no s\'assemblen a ningú, i per això són flors.',
    'El dia s\'allarga i nosaltres amb ell.',
    'La calor ens ensenya a anar més a poc a poc.',
    'Hi ha un silenci que només sona a l\'estiu.',
    'Tornem, i tornem diferents, com les fulles.',
    'Els colors cauen sense fer soroll.',
    'La terra descansa i nosaltres aprenem a fer-ho.',
    'Ens guardem la llum per dins i la compartim.'
  ];

  /* Paletes dels dibuixos de prova (una per mes). */
  var SAMPLE_PALETTES = [
    { bg: ['#E8EDF2', '#C7D3DE'], ink: '#4A5A6A', accent: '#B4472F', soft: '#F5F1E8' },
    { bg: ['#F1E9E4', '#DCC9C0'], ink: '#6A4F4A', accent: '#3E6B5A', soft: '#F7F2EA' },
    { bg: ['#E6EFE7', '#C2D8C6'], ink: '#3F5C46', accent: '#D08A3E', soft: '#F4F7F0' },
    { bg: ['#F3EFE2', '#DED3B4'], ink: '#5E5636', accent: '#8C6BA3', soft: '#FAF6EA' },
    { bg: ['#F6E9EC', '#E3C4CD'], ink: '#7A4A58', accent: '#4E8C7A', soft: '#FCF3F4' },
    { bg: ['#EDF2F4', '#CBDDE3'], ink: '#3C5A63', accent: '#E0A32E', soft: '#F6FAFA' },
    { bg: ['#F7EFD9', '#EBD9A8'], ink: '#6B5A2E', accent: '#C05A3A', soft: '#FDF8E8' },
    { bg: ['#F2E7D5', '#DFC29A'], ink: '#6E5335', accent: '#3F6E8C', soft: '#FBF4E6' },
    { bg: ['#F0E6DA', '#D8C0A6'], ink: '#6B4E3A', accent: '#7C8C5A', soft: '#FAF3E9' },
    { bg: ['#EDE7DE', '#CBB9A3'], ink: '#5A4A3A', accent: '#A6533A', soft: '#F8F3EB' },
    { bg: ['#E4E7EA', '#BFC6CC'], ink: '#45505A', accent: '#8A6B4A', soft: '#F2F4F5' },
    { bg: ['#E9EDF1', '#C3CDD8'], ink: '#3E4C5C', accent: '#B08A2E', soft: '#F5F8FA' }
  ];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var FONTS = {
    serif: "Georgia, 'Times New Roman', 'Noto Serif', serif",
    serifDisplay: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
    sans: "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif",
    sansCondensed: "'Arial Narrow', 'Helvetica Neue Condensed', 'Segoe UI', sans-serif",
    mono: "'Courier New', Courier, monospace",
    hand: "'Segoe Script', 'Bradley Hand', 'Snell Roundhand', 'Comic Sans MS', cursive",
    handAlt: "'Ink Free', 'Segoe Print', 'Marker Felt', 'Comic Sans MS', cursive"
  };

  /* --------------------------------------------------- disseny per defecte */

  function defaultDesign(year, timeZone) {
    return {
      year: year,
      timeZone: timeZone || 'Europe/Madrid',
      page: { width: 297, height: 420, margin: 10, background: '#FFFFFF' },
      /* La graella mana: caselles de 35 × 35 mm amb espai per escriure-hi.
         El dibuix ocupa tota la resta de la part de dalt del full. */
      layout: { gap: 5, titleHeight: 16, weekdayHeight: 8 },

      title: {
        mode: 'auto',              /* auto | custom */
        custom: '',
        caseMode: 'upper',         /* upper | capitalize | lower | asis */
        font: FONTS.serifDisplay,
        size: 15,
        weight: 600,
        letterSpacing: 0.6,
        color: '#2B2B2B',
        showYear: true,
        yearSize: 10,
        yearLetterSpacing: 1.2,
        yearColor: '#8A857C',
        layout: 'split'            /* split | left | center */
      },

      image: {
        fit: 'cover',              /* cover | contain */
        zoom: 1,
        offsetXPct: 0,
        offsetYPct: 0,
        shape: 'rect',             /* rect | rounded */
        radius: 2,
        borderWidth: 0,
        borderColor: '#2B2B2B',
        background: '#FFFFFF'
      },

      quote: {
        text: '',
        font: FONTS.serif,
        size: 11,
        lineHeight: 1.32,
        weight: 400,
        italic: true,
        uppercase: false,
        letterSpacing: 0,
        align: 'center',           /* left | center | right */
        color: '#FFFFFF',
        shadow: 0.45,              /* 0 = sense ombra */
        shadowBlur: 2.2,
        box: 'none',               /* none | soft | band */
        boxColor: '#000000',
        boxOpacity: 0.34,
        boxRadius: 3,
        xPct: 50,                  /* centre del bloc, % de l'amplada de la imatge */
        yPct: 82,                  /* línia base de la 1a línia, % de l'alçada de la imatge */
        widthPct: 76               /* amplada màxima del text */
      },

      grid: {
        fixedRows: true,
        cellWidth: 35,             /* mm per casella de dia */
        cellHeight: 35,
        fillWidth: false,          /* si sí, les 7 columnes omplen tot l'ample */
        gridAlign: 'center',       /* center | left | right */
        showLines: true,
        lineColor: '#DCD6CE',
        lineWidth: 0.2,
        outerLines: true,
        dayNumberFont: FONTS.sans,
        dayNumberSize: 7,
        dayNumberWeight: 400,
        dayNumberAlign: 'left',    /* left | center */
        dayNumberColor: '#2B2B2B',
        sundayColor: '#B4472F',
        holidayColor: '#B4472F',
        showWeekendShade: false,
        weekendShadeColor: '#F6F3EE',
        showAdjacentDays: false,
        adjacentColor: '#C6C0B7',
        showWeekdayHeader: true,
        weekdayLabels: DAYS_CA_SHORT.slice(),
        weekdayFont: FONTS.sans,
        weekdaySize: 4.2,
        weekdayWeight: 500,
        weekdayColor: '#8A857C',
        weekdayLetterSpacing: 0.5
      },

      moon: {
        daily: true,               /* icona de la lluna a tots els dies */
        names: true,               /* nom de la fase als 4 dies clau */
        times: false,              /* hora exacta de la fase */
        pos: 'top-right',          /* top-right | bottom-right | center */
        namePos: 'bottom',         /* bottom | under-icon */
        radius: 3.1,
        outline: 0.26,
        lineColor: '#2B2B2B',
        litColor: '#2B2B2B',
        unlitColor: '#FFFFFF',
        nameFont: FONTS.sans,
        nameSize: 2.3,
        nameColor: '#5E5A54',
        nameLetterSpacing: 0.05
      },

      holidays: {
        enabled: true,
        showNames: false,
        color: '#B4472F',
        nameSize: 2.1,
        list: defaultHolidays(year)
      }
    };
  }

  function defaultMonths(year) {
    var out = [];
    for (var m = 0; m < 12; m++) {
      out.push({
        month: m + 1,
        quote: { text: SAMPLE_QUOTES[m] },
        image: { name: '', isPlaceholder: true },
        locked: false
      });
    }
    return out;
  }

  return {
    MONTHS_CA: MONTHS_CA,
    MONTHS_CA_TITLE: MONTHS_CA_TITLE,
    DAYS_CA: DAYS_CA,
    DAYS_CA_SHORT: DAYS_CA_SHORT,
    FONTS: FONTS,
    SAMPLE_QUOTES: SAMPLE_QUOTES,
    SAMPLE_PALETTES: SAMPLE_PALETTES,
    easterSunday: easterSunday,
    defaultHolidays: defaultHolidays,
    defaultDesign: defaultDesign,
    defaultMonths: defaultMonths,
    clone: clone
  };
});
