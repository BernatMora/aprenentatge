/*!
 * moon.js — Motor de fases lunars per al calendari.
 *
 * Implementa els algorismes de Jean Meeus, "Astronomical Algorithms" (2a ed.):
 *   - Cap. 49: instants de les fases principals (nova, quart creixent, plena, quart minvant).
 *   - Cap. 25 + 47 + 48: longituds eclíptiques del Sol i de la Lluna i fracció il·luminada.
 *
 * Precisió: els instants de fase queden dins d'uns ~2 minuts de les efemèrides
 * oficials (USNO / astropixels) i la fracció il·luminada dins de l'1 %. Suficient
 * i de sobres per a un calendari, i permet calcular qualsevol any sense dependre
 * de dades externes ni d'internet.
 *
 * Sense dependencies. UMD: funciona al navegador (window.BLMoon) i a Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BLMoon = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var RAD = Math.PI / 180;
  var J1970 = 2440587.5;           /* JD del 1970-01-01T00:00:00Z */
  var J2000 = 2451545.0;           /* JD del 2000-01-01T12:00:00Z (TT) */
  var SUN_DIST = 149598000;        /* distància Terra-Sol mitjana, km */

  function sind(x) { return Math.sin(x * RAD); }
  function cosd(x) { return Math.cos(x * RAD); }
  function norm360(x) { x = x % 360; return x < 0 ? x + 360 : x; }

  /* ---------------------------------------------------------------- temps */

  /* Data (JS Date, UTC) -> dia julià */
  function toJD(date) { return date.getTime() / 86400000 + J1970; }

  /* Dia julià -> Date UTC (ms). Accepta fraccions. */
  function fromJD(jd) { return new Date((jd - J1970) * 86400000); }

  /* ΔT = TT − UT en segons (Espenak & Meeus). Per al 2027 dona ~76 s;
     la diferència real és d'uns segons i no afecta el dia del calendari. */
  function deltaTSeconds(year) {
    var t = year - 2000;
    if (year >= 2005 && year < 2051) return 62.92 + 0.32217 * t + 0.005589 * t * t;
    if (year >= 1986 && year < 2005) {
      var u = (year - 2000) / 100;
      return 63.86 + 0.3345 * u - 0.060374 * u * u + 0.0017275 * Math.pow(u, 3) +
             0.000651814 * Math.pow(u, 4) + 0.00002373599 * Math.pow(u, 5);
    }
    /* aproximació grollera per a anys llunyans */
    var t2 = year - 2000;
    return 62.92 + 0.32217 * t2 + 0.005589 * t2 * t2;
  }

  /* ------------------------------------------------- fases (Meeus, cap. 49) */

  var PHASE_TYPES = ['new', 'first', 'full', 'last'];
  var PHASE_QUARTER = { new: 0, first: 0.25, full: 0.5, last: 0.75 };

  /* Instant (JD en TT) de la fase `type` amb número de lunació kBase. */
  function phaseJDE(kBase, type) {
    var q = PHASE_QUARTER[type];
    if (q === undefined) throw new Error('tipus de fase desconegut: ' + type);
    var k = kBase + q;
    var T = k / 1236.85;
    var T2 = T * T, T3 = T2 * T, T4 = T3 * T;

    var jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 -
              0.000000150 * T3 + 0.00000000073 * T4;

    var E = 1 - 0.002516 * T - 0.0000074 * T2;
    var M = 2.5534 + 29.10535670 * k - 0.0000014 * T2 - 0.00000011 * T3;
    var Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T2 +
             0.00001238 * T3 - 0.000000058 * T4;
    var F = 160.7108 + 390.67050284 * k - 0.0016118 * T2 -
            0.00000227 * T3 + 0.000000011 * T4;
    var Om = 124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3;

    var corr = 0;

    if (type === 'new' || type === 'full') {
      var isFull = type === 'full';
      corr += (isFull ? -0.40614 : -0.40720) * sind(Mp);
      corr += 0.17302 * E * sind(M) * (isFull ? 1 : 0) + (isFull ? 0 : 0.17241 * E * sind(M));
      corr += (isFull ? 0.01614 : 0.01608) * sind(2 * Mp);
      corr += (isFull ? 0.01043 : 0.01039) * sind(2 * F);
      corr += (isFull ? 0.00734 : 0.00739) * E * sind(Mp - M);
      corr += (isFull ? -0.00515 : -0.00514) * E * sind(Mp + M);
      corr += 0.00209 * E * E * sind(2 * M) * (isFull ? 1 : 0) + (isFull ? 0 : 0.00208 * E * E * sind(2 * M));
      corr += -0.00111 * sind(Mp - 2 * F);
      corr += -0.00057 * sind(Mp + 2 * F);
      corr += 0.00056 * E * sind(2 * Mp + M);
      corr += -0.00042 * sind(3 * Mp);
      corr += 0.00042 * E * sind(M + 2 * F);
      corr += 0.00038 * E * sind(M - 2 * F);
      corr += -0.00024 * E * sind(2 * Mp - M);
      corr += -0.00017 * sind(Om);
      corr += -0.00007 * sind(Mp + 2 * M);
      corr += 0.00004 * sind(2 * Mp - 2 * F);
      corr += 0.00004 * sind(3 * M);
      corr += 0.00003 * sind(Mp + M - 2 * F);
      corr += 0.00003 * sind(2 * Mp + 2 * F);
      corr += -0.00003 * sind(Mp + M + 2 * F);
      corr += 0.00003 * sind(Mp - M + 2 * F);
      corr += -0.00002 * sind(Mp - M - 2 * F);
      corr += -0.00002 * sind(3 * Mp + M);
      corr += 0.00002 * sind(4 * Mp);
    } else {
      corr += -0.62801 * sind(Mp);
      corr += 0.17172 * E * sind(M);
      corr += -0.01183 * E * sind(Mp + M);
      corr += 0.00862 * sind(2 * Mp);
      corr += 0.00804 * sind(2 * F);
      corr += 0.00454 * E * sind(Mp - M);
      corr += 0.00204 * E * E * sind(2 * M);
      corr += -0.00180 * sind(Mp - 2 * F);
      corr += -0.00070 * sind(Mp + 2 * F);
      corr += -0.00040 * sind(3 * Mp);
      corr += -0.00034 * E * sind(2 * Mp - M);
      corr += 0.00032 * E * sind(M + 2 * F);
      corr += 0.00032 * E * sind(M - 2 * F);
      corr += -0.00028 * E * E * sind(Mp + 2 * M);
      corr += 0.00027 * E * sind(2 * Mp + M);
      corr += -0.00017 * sind(Om);
      corr += -0.00005 * sind(Mp - M - 2 * F);
      corr += 0.00004 * sind(2 * Mp + 2 * F);
      corr += -0.00004 * sind(Mp + M + 2 * F);
      corr += 0.00004 * sind(Mp - 2 * M);
      corr += 0.00003 * sind(Mp + M - 2 * F);
      corr += 0.00003 * sind(3 * M);
      corr += 0.00002 * sind(2 * Mp - 2 * F);
      corr += 0.00002 * sind(Mp - M + 2 * F);
      corr += -0.00002 * sind(3 * Mp + M);

      var W = 0.00306 - 0.00038 * E * cosd(M) + 0.00026 * cosd(Mp) -
              0.00002 * cosd(Mp - M) + 0.00002 * cosd(Mp + M) + 0.00002 * cosd(2 * F);
      corr += (type === 'first') ? W : -W;
    }

    /* correccions planetàries addicionals */
    var A = [
      299.77 + 0.107408 * k - 0.009173 * T2,
      251.88 + 0.016321 * k,
      251.83 + 26.651886 * k,
      349.42 + 36.412478 * k,
      84.66 + 18.206239 * k,
      141.74 + 53.303771 * k,
      207.14 + 2.453732 * k,
      154.84 + 7.306860 * k,
      34.52 + 27.261239 * k,
      207.19 + 0.121824 * k,
      291.34 + 1.844379 * k,
      161.72 + 24.198154 * k,
      239.56 + 25.513099 * k,
      331.55 + 3.592518 * k
    ];
    var AW = [0.000325, 0.000165, 0.000164, 0.000126, 0.000110, 0.000062, 0.000060,
              0.000056, 0.000047, 0.000042, 0.000040, 0.000037, 0.000035, 0.000023];
    for (var i = 0; i < A.length; i++) corr += AW[i] * sind(A[i]);

    return jde + corr;
  }

  /* Instant (Date UTC) d'una fase. */
  function phaseDate(kBase, type) {
    var jdeTT = phaseJDE(kBase, type);
    var year = fromJD(jdeTT).getUTCFullYear();
    return fromJD(jdeTT - deltaTSeconds(year) / 86400);
  }

  /* Totes les fases d'un any natural (any local). opts.timeZone per filtrar
     pel dia local; retorna [{ type, k, date (UTC), ... }] ordenat. */
  function phasesForYear(year, timeZone) {
    var out = [];
    var k0 = Math.round((year - 2000) * 12.3685);
    for (var q = 0; q < PHASE_TYPES.length; q++) {
      var type = PHASE_TYPES[q];
      for (var k = k0 - 2; k <= k0 + 14; k++) {
        var d = phaseDate(k, type);
        var y = timeZone ? zonedParts(d, timeZone).year : d.getUTCFullYear();
        if (y === year) out.push({ type: type, k: k, date: d });
      }
    }
    out.sort(function (a, b) { return a.date - b.date; });
    return out;
  }

  /* ------------------------------------------------------------- posicions */

  /* Longitud eclíptica verdadera del Sol (graus), Meeus cap. 25 (baixa precisió). */
  function sunLongitude(T) {
    var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    var M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sind(M) +
            (0.019993 - 0.000101 * T) * sind(2 * M) +
            0.000289 * sind(3 * M);
    return norm360(L0 + C);
  }

  /* Longitud eclíptica de la Lluna i distància (km), Meeus cap. 47. */
  function moonPosition(T) {
    var T2 = T * T, T3 = T2 * T, T4 = T3 * T;
    var Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 +
             T3 / 538841 - T4 / 65194000;
    var D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T2 +
            T3 / 545868 - T4 / 113065000;
    var M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000;
    var Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T2 +
             T3 / 69699 - T4 / 14712000;
    var F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T2 -
            T3 / 3526000 + T4 / 863310000;

    var lon = Lp +
      6.288774 * sind(Mp) +
      1.274027 * sind(2 * D - Mp) +
      0.658314 * sind(2 * D) +
      0.213618 * sind(2 * Mp) -
      0.185116 * sind(M) -
      0.114332 * sind(2 * F) +
      0.058793 * sind(2 * D - 2 * Mp) +
      0.057066 * sind(2 * D - M - Mp) +
      0.053322 * sind(2 * D + Mp) +
      0.045758 * sind(2 * D - M) -
      0.040923 * sind(M - Mp) -
      0.034720 * sind(D) -
      0.030383 * sind(M + Mp) +
      0.015327 * sind(2 * D - 2 * F) -
      0.012528 * sind(Mp + 2 * F) +
      0.010980 * sind(Mp - 2 * F) +
      0.010675 * sind(4 * D - Mp) +
      0.010034 * sind(3 * Mp) +
      0.008548 * sind(4 * D - 2 * Mp) -
      0.007888 * sind(2 * D + M - Mp) -
      0.006766 * sind(2 * D + M) -
      0.005163 * sind(D - Mp) +
      0.004987 * sind(D + M) +
      0.004036 * sind(2 * D - M + Mp) +
      0.003994 * sind(2 * D + 2 * Mp) +
      0.003861 * sind(4 * D) +
      0.003665 * sind(2 * D - 3 * Mp);

    var dist = 385000.56 -
      20905.355 * cosd(Mp) -
      3699.111 * cosd(2 * D - Mp) -
      2955.968 * cosd(2 * D) -
      569.925 * cosd(2 * Mp) +
      48.888 * cosd(M) -
      3.149 * cosd(2 * F) +
      246.158 * cosd(2 * D - 2 * Mp) -
      152.138 * cosd(2 * D - M - Mp) -
      170.733 * cosd(2 * D + Mp) -
      204.586 * cosd(2 * D - M) -
      129.620 * cosd(M - Mp) +
      108.743 * cosd(D) +
      104.755 * cosd(M + Mp) +
      79.661 * cosd(Mp - 2 * F) +
      48.888 * cosd(M);

    return { lon: norm360(lon), dist: dist };
  }

  /* Fracció il·luminada i sentit (creixent/minvant) en un instant.
     Retorna { illuminated: 0..1, waxing: bool, phaseAngle: graus 0..180 }.

     L'angle de fase i és l'angle Sol-Lluna-Terra: i ≈ 0 a la lluna plena
     i i ≈ 180 a la lluna nova. Llavors k = (1 + cos i) / 2 (Meeus 48.1).

     NOTA IMPORTANT: el signe del denominador a l'equació 48.3
     (Δ − R·cos ψ, amb Δ ≪ R) és el que distingeix lluna nova de lluna plena.
     Cal atan2 amb els signes intactes i normalitzar a [0,360); si es
     "corregeix" sumant 180 s'inverteix la il·luminació. */
  function moonInfo(date) {
    var jd = toJD(date);
    var T = (jd - J2000) / 36525;
    var ls = sunLongitude(T);
    var m = moonPosition(T);
    var psi = norm360(m.lon - ls);
    var si = sind(psi);
    var ci = cosd(psi);
    var i = Math.atan2(SUN_DIST * si, m.dist - SUN_DIST * ci) / RAD;
    if (i < 0) i += 360;
    var illum = (1 + cosd(i)) / 2;
    var angle = i > 180 ? 360 - i : i;   /* per informar, en 0..180 */
    return { illuminated: illum, waxing: si > 0, phaseAngle: angle, elongation: psi };
  }

  /* ------------------------------------------------------------- zones */

  /* Parts de data/hora locals d'un instant en una zona IANA, sense
     dependre de regles DST escrites a mà (usa Intl). */
  function zonedParts(date, timeZone) {
    var dtf = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone || 'UTC',
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    var parts = {};
    dtf.formatToParts(date).forEach(function (p) { parts[p.type] = p.value; });
    var hour = parseInt(parts.hour, 10);
    if (hour === 24) hour = 0;
    return {
      year: parseInt(parts.year, 10),
      month: parseInt(parts.month, 10),
      day: parseInt(parts.day, 10),
      hour: hour,
      minute: parseInt(parts.minute, 10),
      second: parseInt(parts.second, 10)
    };
  }

  /* Desplaçament (minuts) de la zona respecte UTC en un instant donat. */
  function zoneOffsetMinutes(date, timeZone) {
    var p = zonedParts(date, timeZone);
    var asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    return Math.round((asUTC - Math.floor(date.getTime() / 1000) * 1000) / 60000);
  }

  /* Instants de les fases d'un any amb l'hora local i el dia local. */
  function phasesLocal(year, timeZone) {
    return phasesForYear(year, timeZone).map(function (p) {
      var lp = zonedParts(p.date, timeZone);
      return {
        type: p.type,
        date: p.date,
        year: lp.year,
        month: lp.month,
        day: lp.day,
        hour: lp.hour,
        minute: lp.minute,
        time: pad2(lp.hour) + ':' + pad2(lp.minute),
        key: lp.year + '-' + pad2(lp.month) + '-' + pad2(lp.day)
      };
    });
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* --------------------------------------------------------- dibuix (SVG) */

  /* Camí SVG de la part il·luminada per a un disc de radi r centrat a (0,0).
     Dibuixa la forma com si fos creixent (llum a la dreta); per a minvant,
     aplica scale(-1,1). f = fracció il·luminada 0..1. */
  function litPath(r, f) {
    if (f <= 0.004) return '';
    if (f >= 0.996) {
      return 'M 0 ' + (-r) + ' A ' + r + ' ' + r + ' 0 1 1 0 ' + r +
             ' A ' + r + ' ' + r + ' 0 1 1 0 ' + (-r) + ' Z';
    }
    var rx = r * Math.abs(2 * f - 1);
    var sweepTerm = f > 0.5 ? 1 : 0;
    return 'M 0 ' + (-r) +
           ' A ' + r + ' ' + r + ' 0 0 1 0 ' + r +
           ' A ' + rx.toFixed(3) + ' ' + r + ' 0 0 ' + sweepTerm + ' 0 ' + (-r) +
           ' Z';
  }

  /* Nom català de la fase. */
  var PHASE_LABEL_CA = {
    new: 'Lluna nova',
    first: 'Quart creixent',
    full: 'Lluna plena',
    last: 'Quart minvant'
  };

  return {
    PHASE_TYPES: PHASE_TYPES,
    PHASE_LABEL_CA: PHASE_LABEL_CA,
    toJD: toJD,
    fromJD: fromJD,
    deltaTSeconds: deltaTSeconds,
    phaseDate: phaseDate,
    phaseJDE: phaseJDE,
    phasesForYear: phasesForYear,
    phasesLocal: phasesLocal,
    moonInfo: moonInfo,
    sunLongitude: sunLongitude,
    moonPosition: moonPosition,
    zonedParts: zonedParts,
    zoneOffsetMinutes: zoneOffsetMinutes,
    litPath: litPath,
    pad2: pad2
  };
});
