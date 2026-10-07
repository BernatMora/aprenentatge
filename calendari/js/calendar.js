/*!
 * calendar.js — Graella mensual, festius i lluna de cada dia.
 * UMD: navegador (window.BLCalendar). Necessita BLMoon i BLData.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./moon.js'), require('./data.js'));
  } else {
    root.BLCalendar = factory(root.BLMoon, root.BLData);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (Moon, Data) {
  'use strict';

  function daysInMonth(year, month) { return new Date(Date.UTC(year, month, 0)).getUTCDate(); }

  /* Índex del dia de la setmana amb dilluns = 0. */
  function weekdayMondayFirst(year, month, day) {
    return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
  }

  /* Instant UTC corresponent a una hora local concreta. */
  function localInstant(year, month, day, hour, timeZone) {
    var guess = Date.UTC(year, month - 1, day, hour, 0, 0);
    var off = Moon.zoneOffsetMinutes(new Date(guess), timeZone);
    return new Date(guess - off * 60000);
  }

  /* Mapa de festius: clau "mes-dia". */
  function holidayMap(holidays) {
    var map = {};
    if (!holidays || !holidays.enabled) return map;
    (holidays.list || []).forEach(function (h) {
      map[h.month + '-' + h.day] = h.name || 'Festiu';
    });
    return map;
  }

  /* Fases del mes indexades per dia. */
  function phaseByDay(year, month, timeZone) {
    var byDay = {};
    Moon.phasesLocal(year, timeZone).forEach(function (p) {
      if (p.month === month) byDay[p.day] = p;
    });
    return byDay;
  }

  /* Graella d'un mes.
     Retorna { year, month, rows, weeks, daysInMonth, firstWeekday, holidayMap }.
     Cada cel·la: { day, inMonth, weekday, isSunday, isSaturday, holiday, moon } */
  function monthGrid(year, month, design) {
    design = design || {};
    var tz = design.timeZone || 'Europe/Madrid';
    var holidays = holidayMap(design.holidays);
    var phases = phaseByDay(year, month, tz);
    var moonCfg = design.moon || {};
    var total = daysInMonth(year, month);
    var first = weekdayMondayFirst(year, month, 1);

    var needed = Math.ceil((first + total) / 7);
    var rows = design.grid && design.grid.fixedRows === false ? needed : 6;
    if (rows < needed) rows = needed;

    var weeks = [];
    var dayCounter = 1 - first;   /* pot començar negatiu: dies del mes anterior */
    for (var w = 0; w < rows; w++) {
      var week = [];
      for (var d = 0; d < 7; d++) {
        var dayNum = dayCounter;
        var inMonth = dayNum >= 1 && dayNum <= total;
        var cell = {
          day: dayNum,
          inMonth: inMonth,
          weekday: d,
          isSunday: d === 6,
          isSaturday: d === 5,
          holiday: null,
          moon: null
        };
        if (inMonth) {
          var key = month + '-' + dayNum;
          cell.holiday = holidays[key] || null;
          var instant = localInstant(year, month, dayNum, 12, tz);
          var info = Moon.moonInfo(instant);
          var ph = phases[dayNum] || null;
          var showIcon = moonCfg.daily !== false || !!ph;
          cell.moon = {
            illuminated: info.illuminated,
            waxing: info.waxing,
            phaseType: ph ? ph.type : null,
            phaseLabel: ph ? (Moon.PHASE_LABEL_CA[ph.type] || '') : '',
            phaseTime: ph ? ph.time : '',
            showIcon: showIcon
          };
        }
        week.push(cell);
        dayCounter++;
      }
      weeks.push(week);
    }

    return {
      year: year,
      month: month,
      rows: rows,
      weeks: weeks,
      daysInMonth: total,
      firstWeekday: first,
      holidays: holidays
    };
  }

  /* Llista de tots els dies d'un any amb la seva lluna (per a exportacions). */
  function yearOverview(year, timeZone) {
    var out = [];
    for (var m = 1; m <= 12; m++) out.push(monthGrid(year, m, { timeZone: timeZone }));
    return out;
  }

  return {
    daysInMonth: daysInMonth,
    weekdayMondayFirst: weekdayMondayFirst,
    localInstant: localInstant,
    holidayMap: holidayMap,
    monthGrid: monthGrid,
    yearOverview: yearOverview
  };
});
