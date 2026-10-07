// data/practice-routines-gen.ts - Generador de rutines personalitzades
import type { PracticalExercise } from './practical-exercises';

export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Focus = 'technique' | 'scales' | 'harmony' | 'improvisation' | 'rhythm' | 'integration';
export type Duration = 15 | 30 | 45 | 60;

export interface RoutineSegment {
  order: number;
  type: 'warmup' | 'technique' | 'scale' | 'harmony' | 'improvisation' | 'rhythm' | 'cooldown';
  title: string;
  duration: number; // minuts
  description: string;
  exerciseIds?: string[];
  tips: string[];
}

export interface GeneratedRoutine {
  id: string;
  name: string;
  level: Level;
  focus: Focus;
  totalDuration: number;
  segments: RoutineSegment[];
  goals: string[];
  createdAt: number;
}

const FOCUS_LABELS: Record<Focus, string> = {
  technique: 'Tècnica',
  scales: 'Escales i modos',
  harmony: 'Harmonia i acords',
  improvisation: 'Improvisació',
  rhythm: 'Ritme i comping',
  integration: 'Integració',
};

const LEVEL_FOCUS: Record<Level, Focus[]> = {
  beginner: ['technique', 'rhythm', 'harmony'],
  intermediate: ['technique', 'harmony', 'improvisation'],
  advanced: ['scales', 'improvisation', 'integration'],
};

// Rutines predefinides per inspirar
const ROUTINE_TEMPLATES: Record<Focus, RoutineSegment[]> = {
  technique: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament',
      duration: 3,
      description: 'Estiraments de dits i canell, digitació bàsica',
      tips: ['Sense pressió, fluïdesa > velocitat', 'Escalfa ambdues mans'],
    },
    {
      order: 2,
      type: 'technique',
      title: 'Alternança de dits',
      duration: 5,
      description: '1-2-3-4, 2-3-4-1, etc. Mà dreta i esquerra',
      tips: ['Comença a 60 BPM', 'Pujant gradualment'],
    },
    {
      order: 3,
      type: 'technique',
      title: 'Hammer-ons i pull-offs',
      duration: 7,
      description: 'Treball de lèxic en solos',
      tips: ['Mantén els dits propers al trast'],
    },
    {
      order: 4,
      type: 'technique',
      title: 'Bending i vibrato',
      duration: 10,
      description: 'Tècniques expressives',
      tips: ['Sintonitza amb la guitarra, escolta els bends'],
    },
    {
      order: 5,
      type: 'cooldown',
      title: 'Refredament',
      duration: 5,
      description: 'Digitació lenta, jersei lent',
      tips: ['Relaxa la mà'],
    },
  ],
  scales: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament',
      duration: 3,
      description: 'Escala de Do major a velocitat lenta',
      tips: ['Atenció al so net'],
    },
    {
      order: 2,
      type: 'scale',
      title: 'Escala jònica (major)',
      duration: 5,
      description: 'En 5 posicions, tota la mà',
      tips: ['Memoritza les notes'],
    },
    {
      order: 3,
      type: 'scale',
      title: 'Escala dòria',
      duration: 7,
      description: 'Mode de Re dòric (comença a 2a fret)',
      tips: ['Compara amb la major'],
    },
    {
      order: 4,
      type: 'scale',
      title: 'Modes menors (eòlia, frígia, lòdia)',
      duration: 10,
      description: 'Tres modes essencials per jazz fusió',
      tips: ['Cada mode té un color únic'],
    },
    {
      order: 5,
      type: 'scale',
      title: 'Escala cromàtica',
      duration: 5,
      description: 'Tots els semitons, fluïdesa',
      tips: ['Dits propers al trast'],
    },
  ],
  harmony: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament d\'oïda',
      duration: 3,
      description: 'Escolta progressions ii-V-I i canta\'ls',
      tips: ['Cantar primer, tocar després'],
    },
    {
      order: 2,
      type: 'harmony',
      title: 'Acords bàsics (maj7, m7, 7)',
      duration: 7,
      description: 'Tocar i canviar entre acords de 7ena',
      tips: ['Memo els shapes'],
    },
    {
      order: 3,
      type: 'harmony',
      title: 'Progressions ii-V-I',
      duration: 8,
      description: 'En diverses tonalitats',
      tips: ['Canvia de to cada 2 min'],
    },
    {
      order: 4,
      type: 'harmony',
      title: 'Substitucions tritonals',
      duration: 7,
      description: 'SubV per bII7',
      tips: ['Avançat: comença amb la progressió bàsica'],
    },
    {
      order: 5,
      type: 'harmony',
      title: 'Voice leading',
      duration: 5,
      description: 'Moviments suaus entre acords',
      tips: ['Mantén les veus properes'],
    },
  ],
  improvisation: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament',
      duration: 3,
      description: 'Escala jònica i dòria',
      tips: ['Relaxa\'t abans de improvisar'],
    },
    {
      order: 2,
      type: 'scale',
      title: 'Repàs d\'escales',
      duration: 7,
      description: 'Tots els 7 modes en una sola pujada',
      tips: ['Cada mode = color diferent'],
    },
    {
      order: 3,
      type: 'improvisation',
      title: 'Improvisació lliure sobre backing',
      duration: 12,
      description: 'Tria un to i toca sobre ii-V-I',
      tips: ['No pensis, escolta'],
    },
    {
      order: 4,
      type: 'improvisation',
      title: 'Motius i desenvolupament',
      duration: 13,
      description: 'Crea una frase curta i repeteix-la amb variacions',
      tips: ['La repetició amb variació és clau'],
    },
    {
      order: 5,
      type: 'cooldown',
      title: 'Escolta el que has tocat',
      duration: 5,
      description: 'Reprodueix la gravació i analitza',
      tips: ['Sigues honest, però amable amb tu mateix'],
    },
  ],
  rhythm: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament amb metrònom',
      duration: 3,
      description: 'Quarts a 80 BPM',
      tips: ['No pari fins que soni net'],
    },
    {
      order: 2,
      type: 'rhythm',
      title: 'Comping bàsic (terceres i setenes)',
      duration: 8,
      description: 'Sobre un ii-V-I',
      tips: ['Pensa com un pianista'],
    },
    {
      order: 3,
      type: 'rhythm',
      title: 'Anticipacions i retards',
      duration: 7,
      description: 'Tocar abans o després del temps',
      tips: ['Porta\'t amb confiança'],
    },
    {
      order: 4,
      type: 'rhythm',
      title: 'Síncope i bossa',
      duration: 10,
      description: 'Patrons de bossa nova',
      tips: ['Jo + 2 + 3 + 4 +'],
    },
    {
      order: 5,
      type: 'rhythm',
      title: 'Polirítmies senzilles',
      duration: 7,
      description: '3 contra 2',
      tips: ['Comença molt lent'],
    },
  ],
  integration: [
    {
      order: 1,
      type: 'warmup',
      title: 'Escalfament',
      duration: 3,
      description: 'Escala major + acords',
      tips: ['Mentalitza el que tocaràs'],
    },
    {
      order: 2,
      type: 'harmony',
      title: 'Progressions amb voicing',
      duration: 7,
      description: 'ii-V-I amb extensions (9, 11, 13)',
      tips: ['Un voicing per minut'],
    },
    {
      order: 3,
      type: 'scale',
      title: 'Modes sobre els acords',
      duration: 8,
      description: 'Tria el mode adequat per cada acord',
      tips: ['Dòric sobre m7, Mixolidi sobre 7'],
    },
    {
      order: 4,
      type: 'improvisation',
      title: 'Solo estructurat',
      duration: 12,
      description: 'Motiu → desenvolupament → climax → resolució',
      tips: ['Té sentit, no només notes'],
    },
    {
      order: 5,
      type: 'cooldown',
      title: 'Reflexió',
      duration: 5,
      description: 'Escolta, pren notes del que has après',
      tips: ['Què ha millorat avui?'],
    },
  ],
};

export function generateRoutine(
  level: Level,
  focus: Focus,
  duration: Duration,
  name?: string
): GeneratedRoutine {
  const template = ROUTINE_TEMPLATES[focus] || ROUTINE_TEMPLATES.integration;

  // Escalar les durades al temps total demanat
  const totalTemplate = template.reduce((sum, s) => sum + s.duration, 0);
  const scale = duration / totalTemplate;
  const segments: RoutineSegment[] = template.map(seg => ({
    ...seg,
    duration: Math.round(seg.duration * scale),
  }));

  // Generar objectius segons nivell i focus
  const goals: string[] = [
    `Millorar en ${FOCUS_LABELS[focus].toLowerCase()}`,
    `Mantenir la constància amb sessions de ${duration} min`,
  ];
  if (level === 'beginner') {
    goals.push('Construir una base sòlida');
  } else if (level === 'intermediate') {
    goals.push('Aprofundir en el llenguatge');
  } else {
    goals.push('Integrar tècniques avançades');
  }

  return {
    id: `routine-${Date.now()}`,
    name: name || `Rutina de ${FOCUS_LABELS[focus]} - ${duration}min`,
    level,
    focus,
    totalDuration: duration,
    segments,
    goals,
    createdAt: Date.now(),
  };
}

export function getAvailableFocuses(level: Level): Focus[] {
  return LEVEL_FOCUS[level];
}

export function getFocusLabel(focus: Focus): string {
  return FOCUS_LABELS[focus];
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}