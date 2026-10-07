export type Interval = {
  id: string;
  name: string;
  semitones: number;
  symbol: string;
  category: 'perfect' | 'major' | 'minor' | 'augmented' | 'diminished';
  description: string;
};

export const INTERVALS: Interval[] = [
  {
    id: 'unison',
    name: 'Unísono',
    semitones: 0,
    symbol: 'U',
    category: 'perfect',
    description: 'La misma nota',
  },
  {
    id: 'minor-2nd',
    name: '2ª menor',
    semitones: 1,
    symbol: 'm2',
    category: 'minor',
    description: 'Intervalo de medio tono',
  },
  {
    id: 'major-2nd',
    name: '2ª Mayor',
    semitones: 2,
    symbol: 'M2',
    category: 'major',
    description: 'Intervalo de un tono',
  },
  {
    id: 'minor-3rd',
    name: '3ª menor',
    semitones: 3,
    symbol: 'm3',
    category: 'minor',
    description: 'Carácter menor',
  },
  {
    id: 'major-3rd',
    name: '3ª Mayor',
    semitones: 4,
    symbol: 'M3',
    category: 'major',
    description: 'Carácter mayor',
  },
  {
    id: 'perfect-4th',
    name: '4ª Justa',
    semitones: 5,
    symbol: 'P4',
    category: 'perfect',
    description: 'Intervalo consonante',
  },
  {
    id: 'tritone',
    name: 'Tritono',
    semitones: 6,
    symbol: 'TT',
    category: 'augmented',
    description: 'Intervalo disonante (4ª aumentada/5ª disminuida)',
  },
  {
    id: 'perfect-5th',
    name: '5ª Justa',
    semitones: 7,
    symbol: 'P5',
    category: 'perfect',
    description: 'Intervalo muy consonante',
  },
  {
    id: 'minor-6th',
    name: '6ª menor',
    semitones: 8,
    symbol: 'm6',
    category: 'minor',
    description: 'Inversión de la 3ª Mayor',
  },
  {
    id: 'major-6th',
    name: '6ª Mayor',
    semitones: 9,
    symbol: 'M6',
    category: 'major',
    description: 'Inversión de la 3ª menor',
  },
  {
    id: 'minor-7th',
    name: '7ª menor',
    semitones: 10,
    symbol: 'm7',
    category: 'minor',
    description: 'Extensión de acordes dominantes',
  },
  {
    id: 'major-7th',
    name: '7ª Mayor',
    semitones: 11,
    symbol: 'M7',
    category: 'major',
    description: 'Extensión de acordes mayores',
  },
  {
    id: 'octave',
    name: 'Octava',
    semitones: 12,
    symbol: '8va',
    category: 'perfect',
    description: 'La misma nota una octava arriba',
  },
];

export type IntervalChallenge = {
  root: string;
  interval: Interval;
  targetNote: string;
};

const NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function calculateIntervalNote(root: string, semitones: number): string {
  const rootIndex = NOTES.indexOf(root);
  if (rootIndex === -1) return root;
  
  const targetIndex = (rootIndex + semitones) % 12;
  return NOTES[targetIndex];
}

export function generateIntervalChallenge(): IntervalChallenge {
  const root = NOTES[Math.floor(Math.random() * NOTES.length)];
  const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  const targetNote = calculateIntervalNote(root, interval.semitones);
  
  return { root, interval, targetNote };
}

export type IntervalPair = {
  interval1: Interval;
  interval2: Interval;
};

export const COMMON_INTERVAL_PAIRS: IntervalPair[] = [
  { interval1: INTERVALS[3], interval2: INTERVALS[7] },
  { interval1: INTERVALS[4], interval2: INTERVALS[7] },
  { interval1: INTERVALS[10], interval2: INTERVALS[5] },
  { interval1: INTERVALS[11], interval2: INTERVALS[4] },
  { interval1: INTERVALS[6], interval2: INTERVALS[7] },
  { interval1: INTERVALS[2], interval2: INTERVALS[5] },
];
