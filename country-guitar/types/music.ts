// Tipus compartits per a tota l'aplicació de jazz fusion

export type ChordQuality = 'm7' | '7' | '7alt' | 'maj7' | '7sus' | '7#11' | 'm7b5' | 'm(maj7)' | 'sus7' | '6/9' | 'aug7';

export type ChordType = {
  symbol: string;
  fullName: string;
  quality: ChordQuality;
  notes: string[];
  extensions: string[];
};

export type PentatonicSuperimposition = {
  pentatonic: string;
  relationship: string;
  extensions: string[];
  mode: string;
  description: string;
};

export type TriadSuperimposition = {
  triad: string;
  type: 'major' | 'minor' | 'augmented';
  ust: string;
  relationship: string;
  extensions: string[];
  resultingChord: string;
  scale: string;
  description: string;
};

export type ChordData = {
  chord: ChordType;
  pentatonics: PentatonicSuperimposition[];
  triads: TriadSuperimposition[];
};

export type Progression = {
  id: string;
  name: string;
  chords: string[];
  description: string;
  suggestions: {
    chord: string;
    pentatonics: string[];
    triads: string[];
  }[];
};

export type Artist = {
  id: string;
  name: string;
  bio: string;
  examples: {
    song: string;
    technique: string;
    description: string;
    chord?: string;
    scale?: string;
  }[];
};

export type ReferenceTable = {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
};

// Tipus per a la secció de pràctica
export type Exercise = {
  id: string;
  title: string;
  category: 'rhythm' | 'harmony' | 'melody' | 'ear' | 'technique' | 'integration';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  goal: string;
  setup: string[];
  steps: {
    step: number;
    instruction: string;
    duration?: number;
    tempo?: string;
    tips: string[];
  }[];
  progression?: string;
  evaluation: string[];
  nextSteps: string;
};

export type PracticeRoutine = {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  goals: string[];
  sections: {
    name: string;
    duration: number;
    exercises: string[];
    focus: string;
    tempo?: string;
  }[];
  tips: string[];
};

export type FusionTechnique = {
  id: string;
  name: string;
  category: 'triads' | 'polyChords' | 'pentatonics' | 'techniques';
  description: string;
  chordContext: string;
  application: string;
  sound: string;
  examples: {
    over: string;
    play: string;
    result: string;
  }[];
  artists: string[];
  difficulty: 'intermediate' | 'advanced' | 'expert';
};

export type Scale = {
  id: string;
  name: string;
  formula: string;
  notes: string[];
  description: string;
  usage: string;
  chordTypes: string[];
  examples: {
    artist: string;
    song: string;
    context: string;
  }[];
  exercises: {
    title: string;
    description: string;
    tips: string[];
  }[];
};
