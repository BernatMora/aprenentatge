/* dom.js — utilitats compartides de la interfície. */

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function sectionBadge(section) {
  const map = {
    Beginner: ['beg', 'Beginner'],
    Intermediate: ['int', 'Intermediate'],
    Advanced: ['adv', 'Advanced'],
    'Variació': ['step', 'Variació'],
  };
  const [cls, name] = map[section] || ['adv', section || '—'];
  return `<span class="badge ${cls}">${name}</span>`;
}

export function fmtMinutes(m) {
  if (m == null) return '—';
  const hh = Math.floor(m / 60), mm = Math.round(m % 60);
  return hh ? `${hh} h ${mm} min` : `${mm} min`;
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
  return d.toLocaleDateString('ca-ES', { day: '2-digit', month: 'short' });
}

export function fmtClock(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function fmtTime(seconds) {
  const s = Math.max(0, Math.round(seconds));
  const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
  return `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

/** Gràfic de línia simple (BPM al llarg del temps). */
export function sparkline(points, { width = 620, height = 130, label = 'BPM' } = {}) {
  if (!points.length) return '<p class="muted small">Encara no hi ha dades.</p>';
  const pad = 26;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys) - 2, maxY = Math.max(...ys) + 2;
  const sx = (x) => pad + ((x - minX) / Math.max(1, maxX - minX)) * (width - pad * 2);
  const sy = (y) => height - pad - ((y - minY) / Math.max(1, maxY - minY)) * (height - pad * 2);
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');
  const dots = points.map((p) => `<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="3" fill="#ffd166"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#2a2c38"/>
    <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#2a2c38"/>
    <path d="${path}" fill="none" stroke="#7bdff2" stroke-width="2"/>
    ${dots}
    <text x="${pad}" y="${pad - 10}" fill="#9a9cb0" font-size="11">${label} ${maxY - 2}</text>
    <text x="${pad}" y="${height - 8}" fill="#9a9cb0" font-size="11">${minY + 2}</text>
  </svg>`;
}

export function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 2200);
}

/** Lightbox per a imatges de figures/pàgines del llibre. */
export function openLightbox(src, alt = '') {
  let dlg = document.getElementById('lightbox');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'lightbox';
    dlg.className = 'lightbox';
    dlg.innerHTML = '<img alt="">';
    dlg.addEventListener('click', () => dlg.close());
    document.body.appendChild(dlg);
  }
  dlg.querySelector('img').src = src;
  dlg.querySelector('img').alt = alt;
  dlg.showModal();
}

/** Connecta tots els elements [data-zoom] a la lightbox. */
export function wireZoom(root = document) {
  root.querySelectorAll('[data-zoom]').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.getAttribute('data-zoom') || img.src, img.alt));
  });
}
