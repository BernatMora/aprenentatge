// app/rutines/page.tsx - Generador de rutines personalitzades
"use client";

import { useState, useEffect } from "react";
import { Sparkles, Clock, Target, BookOpen, Save, Trash2, Play } from "lucide-react";
import {
  generateRoutine,
  getAvailableFocuses,
  getFocusLabel,
  formatDuration,
  type GeneratedRoutine,
  type Level,
  type Focus,
  type Duration,
} from "@/data/practice-routines-gen";

const ROUTINES_KEY = "jazz-fusion:custom-routines";

export default function RutinesPage() {
  const [level, setLevel] = useState<Level>('intermediate');
  const [focus, setFocus] = useState<Focus>('improvisation');
  const [duration, setDuration] = useState<Duration>(30);
  const [customName, setCustomName] = useState('');
  const [currentRoutine, setCurrentRoutine] = useState<GeneratedRoutine | null>(null);
  const [savedRoutines, setSavedRoutines] = useState<GeneratedRoutine[]>([]);

  // Carregar rutines guardades
  useEffect(() => {
    try {
      const data = localStorage.getItem(ROUTINES_KEY);
      if (data) setSavedRoutines(JSON.parse(data));
    } catch (e) {
      console.warn('No s\'han pogut carregar les rutines:', e);
    }
  }, []);

  const saveRoutines = (routines: GeneratedRoutine[]) => {
    setSavedRoutines(routines);
    try {
      localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
    } catch (e) {
      console.warn('No s\'han pogut guardar les rutines:', e);
    }
  };

  const handleGenerate = () => {
    const routine = generateRoutine(level, focus, duration, customName || undefined);
    setCurrentRoutine(routine);
  };

  const handleSave = () => {
    if (!currentRoutine) return;
    const updated = [currentRoutine, ...savedRoutines.filter(r => r.id !== currentRoutine.id)];
    saveRoutines(updated);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Eliminar aquesta rutina?')) return;
    saveRoutines(savedRoutines.filter(r => r.id !== id));
  };

  const availableFocuses = getAvailableFocuses(level);

  // Quan canvia el nivell, actualitzem el focus si no és vàlid
  useEffect(() => {
    if (!availableFocuses.includes(focus)) {
      setFocus(availableFocuses[0]);
    }
  }, [level, focus, availableFocuses]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={28} /> Generador de Rutines
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Crea rutines personalitzades basant-te en el teu nivell i objectius
        </p>
      </header>

      {/* Formulari de generació */}
      <section style={{
        background: 'var(--bg-card)',
        padding: '1.25rem',
        borderRadius: 12,
        border: '1px solid #2a2d3a',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
              Nivell
            </label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value as Level)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid #2a2d3a',
                borderRadius: 6,
                fontSize: '1rem',
              }}
            >
              <option value="beginner">Principiant</option>
              <option value="intermediate">Intermedi</option>
              <option value="advanced">Avançat</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
              Focus
            </label>
            <select
              value={focus}
              onChange={e => setFocus(e.target.value as Focus)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid #2a2d3a',
                borderRadius: 6,
                fontSize: '1rem',
              }}
            >
              {availableFocuses.map(f => (
                <option key={f} value={f}>{getFocusLabel(f)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
              Durada
            </label>
            <select
              value={duration}
              onChange={e => setDuration(Number(e.target.value) as Duration)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid #2a2d3a',
                borderRadius: 6,
                fontSize: '1rem',
              }}
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
            Nom personalitzat (opcional)
          </label>
          <input
            type="text"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            placeholder={`Rutina de ${getFocusLabel(focus)}`}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid #2a2d3a',
              borderRadius: 6,
              fontSize: '1rem',
            }}
          />
        </div>

        <button
          onClick={handleGenerate}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.75rem',
            background: 'var(--accent-yellow)',
            color: 'var(--bg-primary)',
            border: 'none',
            borderRadius: 8,
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Sparkles size={20} /> Generar Rutina
        </button>
      </section>

      {/* Resultat actual */}
      {currentRoutine && (
        <section style={{
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 12,
          border: '1px solid var(--accent-yellow)',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0 }}>{currentRoutine.name}</h2>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={16} /> {formatDuration(currentRoutine.totalDuration)}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Target size={16} /> {getFocusLabel(currentRoutine.focus)}
                </span>
                <span>📊 {currentRoutine.level}</span>
              </div>
            </div>
            <button
              onClick={handleSave}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--accent-green)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: 6,
                fontSize: '0.875rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <Save size={16} /> Guardar
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.5rem' }}>
              Objectius:
            </strong>
            <ul style={{ marginLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              {currentRoutine.goals.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.75rem' }}>
              Segments ({currentRoutine.segments.length}):
            </strong>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {currentRoutine.segments.map((seg, i) => (
                <li key={i} style={{
                  background: 'var(--bg-primary)',
                  padding: '0.875rem',
                  borderRadius: 8,
                  marginBottom: '0.5rem',
                  borderLeft: '3px solid var(--accent-yellow)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1rem' }}>
                      {seg.order}. {seg.title}
                    </strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {seg.duration} min
                    </span>
                  </div>
                  <p style={{ margin: '0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                    {seg.description}
                  </p>
                  {seg.tips.length > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      💡 {seg.tips.join(' · ')}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Rutines guardades */}
      {savedRoutines.length > 0 && (
        <section>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} /> Rutines guardades ({savedRoutines.length})
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            {savedRoutines.map(r => (
              <div key={r.id} style={{
                background: 'var(--bg-card)',
                padding: '1rem',
                borderRadius: 8,
                border: '1px solid #2a2d3a',
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{r.name}</h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  {formatDuration(r.totalDuration)} · {getFocusLabel(r.focus)} · {r.segments.length} segments
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setCurrentRoutine(r)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      background: 'var(--accent-cyan)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Play size={14} /> Veure
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      border: '1px solid #2a2d3a',
                      borderRadius: 6,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}