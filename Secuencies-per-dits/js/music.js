/* music.js — patrons de dits, generació de tablatura, mànec i variacions.
   Regla del llibre: un dit per traste → traste = posició + dit − 1. */

export const FINGER_NAMES = { 1: 'índex', 2: 'cor', 3: 'anular', 4: 'menovell' };
export const FINGER_SHORT = { 1: '1', 2: '2', 3: '3', 4: '4' };
export const STRING_LABELS = ['e', 'B', 'G', 'D', 'A', 'E'];   // 1a (aguda) → 6a (greu)
export const ALL_STRINGS = [1, 2, 3, 4, 5, 6];
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];

export const POSITION_BLOCKS = [1, 4, 7, 10];   // 1-4 / 4-7 / 7-10 / 10-13

export function fingerFret(finger, position) { return position + finger - 1; }
export function positionLabel(p) { return ROMAN[p] || String(p); }

/** Una "passada" del patró en una posició, sobre les cordes triades. */
export function buildSystem({ pattern, position = 1, strings = ALL_STRINGS, descend = false }) {
  const seq = descend ? [...pattern].reverse() : [...pattern];
  const rows = STRING_LABELS.map((label, idx) => {
    const stringNo = idx + 1;
    const on = strings.includes(stringNo);
    return {
      stringNo,
      label,
      notes: on ? seq.map((f, i) => ({ fret: fingerFret(f, position), finger: f, step: i })) : null,
    };
  });
  return { position, rows, columns: seq.length, strings: [...strings], descend };
}

/** Sistemes per a l'exercici: una posició o el recorregut complet del mànec. */
export function buildSystems({ pattern, position = 1, strings = ALL_STRINGS, extend = false, descend = false }) {
  const positions = extend ? POSITION_BLOCKS : [position];
  return positions.map((p) => buildSystem({ pattern, position: p, strings, descend }));
}

/** Files de text monospace, com la tablatura del llibre. */
export function renderSystemLines(system) {
  const cell = (n) => (n === null ? '---' : String(n.fret).padStart(2, '-') + '-');
  const lines = system.rows.map((row) => {
    const body = row.notes ? row.notes.map(cell).join('') : '---'.repeat(system.columns) + '-'.repeat(0);
    return `${row.label.padEnd(2, ' ')}|${body}${row.notes ? '' : '---'.repeat(0)}|`;
  });
  return lines;
}

/** Nombre total de notes d'un sistema (per al metrònom / comptador). */
export function systemNoteCount(system) {
  return system.rows.filter((r) => r.notes).reduce((a, r) => a + r.notes.length, 0);
}

/* ------------------------------------------------------------------ variacions
   El llibre diu que hi ha 456 variacions possibles; aquí les generem combinant
   els 24 patrons amb recorreguts i direccions. */

export const ROUTES = [
  { id: 'per-string-up', name: 'Corda a corda, pujant', desc: 'Una passada a cada corda, de la 6a a la 1a.', opts: { strings: [6, 5, 4, 3, 2, 1], extend: false } },
  { id: 'per-string-down', name: 'Corda a corda, baixant', desc: 'Una passada a cada corda, de la 1a a la 6a.', opts: { strings: [1, 2, 3, 4, 5, 6], extend: false } },
  { id: 'one-string', name: 'Una corda, tot el mànec', desc: 'Tot el patró en una sola corda, pujant de posició.', opts: { strings: [6], extend: true } },
  { id: 'blocks-up', name: 'Blocs amunt i avall', desc: 'El patró per les quatre posicions del mànec, pujant i baixant.', opts: { strings: ALL_STRINGS, extend: true, descend: false } },
];

export function variationCount(patternCount = 24) { return patternCount * ROUTES.length * 2; }

/** Construeix el tab d'una variació (patró × recorregut × direcció). */
export function buildVariation({ pattern, routeId, descend = false, position = 1 }) {
  const route = ROUTES.find((r) => r.id === routeId) || ROUTES[0];
  const systems = buildSystems({
    pattern,
    position,
    strings: route.opts.strings,
    extend: !!route.opts.extend,
    descend,
  });
  return { route, systems };
}

/* --------------------------------------------------------------------- mànec */

/** Dibuix SVG del mànec amb els punts de l'exercici ressaltats. */
export function fretboardSVG(system, frets = 13) {
  const W = 900, H = 220, padL = 46, padR = 18, padT = 26, padB = 30;
  const boardW = W - padL - padR, boardH = H - padT - padB;
  const stepX = boardW / frets, stepY = boardH / 5;
  const colors = { 1: '#ffd166', 2: '#7bdff2', 3: '#f78c6b', 4: '#c792ea' };
  const out = [];
  out.push(`<svg viewBox="0 0 ${W} ${H}" class="fretboard" role="img" aria-label="Mànec">`);
  out.push(`<rect x="${padL}" y="${padT}" width="${boardW}" height="${boardH}" rx="4" fill="#1b1b22" stroke="#4a4a58"/>`);
  const dots = { 3: 1, 5: 1, 7: 1, 9: 1, 12: 2 };
  for (let f = 1; f <= frets; f++) {
    const x = padL + f * stepX;
    out.push(`<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + boardH}" stroke="#3a3a46" stroke-width="1.2"/>`);
    if (dots[f]) {
      for (let d = 0; d < dots[f]; d++) {
        const cy = padT + boardH * (dots[f] === 1 ? 0.5 : 0.35 + d * 0.3);
        out.push(`<circle cx="${x - stepX / 2}" cy="${cy}" r="4" fill="#5c5c6e"/>`);
      }
    }
    out.push(`<text x="${x - stepX / 2}" y="${H - 10}" fill="#8b8b9c" font-size="12" text-anchor="middle">${f}</text>`);
  }
  for (let s = 0; s < 6; s++) {
    const y = padT + s * stepY;
    out.push(`<line x1="${padL}" y1="${y}" x2="${padL + boardW}" y2="${y}" stroke="#6f6f82" stroke-width="${1 + s * 0.28}"/>`);
    out.push(`<text x="${padL - 12}" y="${y + 4}" fill="#9a9aae" font-size="12" text-anchor="middle">${STRING_LABELS[s]}</text>`);
  }
  for (const row of system.rows) {
    if (!row.notes) continue;
    for (const n of row.notes) {
      if (n.fret < 1 || n.fret > frets) continue;
      const cx = padL + (n.fret - 0.5) * stepX;
      const cy = padT + (row.stringNo - 1) * stepY;
      out.push(`<circle cx="${cx}" cy="${cy}" r="12" fill="${colors[n.finger] || '#fff'}" fill-opacity="0.9"/>`);
      out.push(`<text x="${cx}" y="${cy + 4}" font-size="12" font-weight="700" fill="#101014" text-anchor="middle">${n.finger}</text>`);
    }
  }
  out.push('</svg>');
  return out.join('');
}

/** Text d'ajuda del patró: 1-2-3-4 → "índex, cor, anular, menovell". */
export function patternHelp(pattern) {
  return pattern.map((f) => FINGER_NAMES[f] || f).join(' · ');
}

/** Noms de cordes triades (per mostrar a la UI). */
export function stringsLabel(strings) {
  return strings.map((s) => STRING_LABELS[s - 1]).join(' ');
}
