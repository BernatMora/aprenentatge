export interface ImprovisationTechnique {
  id: string;
  name: string;
  description: string;
  category: 'approach' | 'enclosures' | 'target' | 'chord-tones';
  examples: {
    context: string;
    notes: string;
    explanation: string;
  }[];
  exercises: string[];
  usedBy: string[];
}

export const improvisationTechniques: ImprovisationTechnique[] = [
  {
    id: 'chromatic-approach',
    name: 'Chromatic Approach Notes',
    description: 'Aproximación cromática desde medio tono arriba o abajo del target note',
    category: 'approach',
    examples: [
      {
        context: 'Cmaj7 (target: E)',
        notes: 'D# → E o F → E',
        explanation: 'Llegar a la 3ra mayor desde medio tono arriba o abajo crea tensión y resolución'
      },
      {
        context: 'Dm7 (target: D)',
        notes: 'C# → D o D# → D',
        explanation: 'Aproximación cromática a la tónica en tiempo fuerte'
      }
    ],
    exercises: [
      'Practica aproximaciones cromáticas a cada nota del arpegio en tempo lento',
      'Improvisa usando solo approach notes + chord tones sobre ii-V-I',
      'Combina approach notes con cromatismos en secuencias de 8vos'
    ],
    usedBy: ['Charlie Parker', 'Pat Metheny', 'Kurt Rosenwinkel']
  },
  {
    id: 'diatonic-approach',
    name: 'Diatonic Approach Notes',
    description: 'Aproximación diatónica desde un tono arriba o abajo',
    category: 'approach',
    examples: [
      {
        context: 'Gmaj7 (target: B)',
        notes: 'A → B o C → B',
        explanation: 'Usar notas de la escala para aproximarse crea un sonido más suave'
      },
      {
        context: 'Am7 (target: C)',
        notes: 'B → C o D → C',
        explanation: 'Aproximación diatónica a la 3ra menor'
      }
    ],
    exercises: [
      'Practica aproximaciones diatónicas en todas las notas del acorde',
      'Alterna approach cromático y diatónico en la misma progresión',
      'Usa solo approach diatónicos sobre standards de jazz'
    ],
    usedBy: ['Bill Evans', 'Brad Mehldau', 'Chick Corea']
  },
  {
    id: 'double-chromatic',
    name: 'Double Chromatic Approach',
    description: 'Dos aproximaciones cromáticas consecutivas al target note',
    category: 'approach',
    examples: [
      {
        context: 'Cmaj7 (target: G)',
        notes: 'F → F# → G o G# → G# → G',
        explanation: 'Dos medios tonos seguidos crean máxima tensión antes de resolver'
      },
      {
        context: 'E7 (target: G#)',
        notes: 'F# → G → G# o A → A♭ → G#',
        explanation: 'Doble approach a la 3ra mayor del dominante'
      }
    ],
    exercises: [
      'Practica double chromatic approach en corcheas sobre cada chord tone',
      'Combina con ritmos sincopados para crear interés rítmico',
      'Aplica en contextos bebop sobre blues'
    ],
    usedBy: ['Charlie Parker', 'Dizzy Gillespie', 'Sonny Stitt']
  },
  {
    id: 'enclosures',
    name: 'Enclosures (Cercados)',
    description: 'Rodear el target note desde arriba y abajo simultáneamente',
    category: 'enclosures',
    examples: [
      {
        context: 'Cmaj7 (target: C)',
        notes: 'B → D♭ → C o D♭ → B → C',
        explanation: 'Cercar la tónica desde medio tono arriba y abajo'
      },
      {
        context: 'Dm7 (target: F)',
        notes: 'E → G♭ → F o G♭ → E → F',
        explanation: 'Enclosure cromático a la 3ra menor'
      }
    ],
    exercises: [
      'Practica enclosures a cada chord tone en tempo lento',
      'Improvisa usando solo enclosures + arpegios sobre ii-V-I',
      'Combina enclosures con escalas en frases de 4 compases'
    ],
    usedBy: ['Joe Pass', 'Wes Montgomery', 'Pat Martino']
  },
  {
    id: 'diatonic-enclosures',
    name: 'Diatonic Enclosures',
    description: 'Cercar usando notas diatónicas de la escala',
    category: 'enclosures',
    examples: [
      {
        context: 'Gmaj7 (target: D)',
        notes: 'C → E → D o E → C → D',
        explanation: 'Enclosure diatónico suena más inside'
      },
      {
        context: 'Am7 (target: A)',
        notes: 'G → B → A o B → G → A',
        explanation: 'Cercar la root usando la escala'
      }
    ],
    exercises: [
      'Practica diatonic enclosures en progresiones modales',
      'Alterna chromatic y diatonic enclosures en la misma frase',
      'Usa en contextos de jazz latino y fusion'
    ],
    usedBy: ['John Scofield', 'Mike Stern', 'Bill Frisell']
  },
  {
    id: 'target-notes',
    name: 'Target Notes',
    description: 'Identificar y resolver a notas objetivo en tiempos fuertes',
    category: 'target',
    examples: [
      {
        context: 'Cmaj7',
        notes: 'Target: C (root), E (3rd), G (5th), B (7th)',
        explanation: 'Las chord tones son los mejores target notes'
      },
      {
        context: 'G7',
        notes: 'Target: B (3rd) y F (7th) en tiempo 1 y 3',
        explanation: 'Las guide tones (3ra y 7ma) son targets prioritarios'
      }
    ],
    exercises: [
      'Improvisa resolviendo siempre a chord tones en tiempo 1',
      'Usa guide tones como targets principales en progresiones',
      'Practica target notes con diferentes approach techniques'
    ],
    usedBy: ['Todos los grandes improvisadores']
  },
  {
    id: 'chord-tones-vs-passing',
    name: 'Chord Tones vs Passing Tones',
    description: 'Diferenciar entre notas estructurales y notas de paso',
    category: 'chord-tones',
    examples: [
      {
        context: 'Cmaj7',
        notes: 'Chord tones: C-E-G-B | Passing: D-F-A',
        explanation: 'Chord tones en tiempos fuertes, passing tones en débiles'
      },
      {
        context: 'Dm7',
        notes: 'Chord tones: D-F-A-C | Passing: E-G-B',
        explanation: 'Las passing tones conectan chord tones'
      }
    ],
    exercises: [
      'Improvisa usando solo chord tones primero, luego agrega passing tones',
      'Practica colocar chord tones en tiempos 1 y 3, passing en 2 y 4',
      'Analiza solos de Parker identificando chord vs passing tones'
    ],
    usedBy: ['Barry Harris', 'Charlie Parker', 'Bud Powell']
  },
  {
    id: 'delayed-resolution',
    name: 'Delayed Resolution',
    description: 'Retrasar la resolución al target note para crear tensión',
    category: 'target',
    examples: [
      {
        context: 'Cmaj7 (target: E en beat 1)',
        notes: 'Tocar D# en beat 1, resolver a E en &1',
        explanation: 'Retrasar la resolución crea anticipación'
      },
      {
        context: 'G7→Cmaj7',
        notes: 'Mantener F del G7 sobre Cmaj7, resolver a E después',
        explanation: 'Suspensión que resuelve después crea interés'
      }
    ],
    exercises: [
      'Practica llegar medio beat tarde a cada target note',
      'Improvisa con resoluciones retrasadas sobre ii-V-I',
      'Combina con aproximaciones para frases más sofisticadas'
    ],
    usedBy: ['Pat Metheny', 'Kurt Rosenwinkel', 'Lage Lund']
  },
  {
    id: 'surrounds',
    name: 'Surrounds (Rodeos extendidos)',
    description: 'Técnica extendida de enclosure con más notas',
    category: 'enclosures',
    examples: [
      {
        context: 'Cmaj7 (target: G)',
        notes: 'F# → G# → F → A♭ → G',
        explanation: 'Rodear el target desde múltiples direcciones'
      },
      {
        context: 'Am7 (target: E)',
        notes: 'D# → F → D → F# → E',
        explanation: 'Surround extendido crea máxima tensión'
      }
    ],
    exercises: [
      'Practica surrounds de 4-5 notas antes del target',
      'Combina con ritmos irregulares para ocultar la métrica',
      'Aplica en contextos outside para luego resolver inside'
    ],
    usedBy: ['Michael Brecker', 'Chris Potter', 'Seamus Blake']
  }
];

export const improvisationConcepts = [
  {
    title: 'Jerarquía de Notas',
    description: 'No todas las notas tienen el mismo peso. Chord tones > Guide tones > Tensions > Passing tones',
    importance: 'Entender esta jerarquía te permite controlar la tensión y resolución en tus solos'
  },
  {
    title: 'Strong Beats',
    description: 'Los beats 1 y 3 son fuertes. Coloca chord tones aquí para sonar "inside"',
    importance: 'Esta es la base del bebop y el jazz moderno'
  },
  {
    title: 'Weak Beats',
    description: 'Los beats 2 y 4 (y los &) son débiles. Perfectos para cromatismos y passing tones',
    importance: 'Te permite tocar outside sin sonar perdido'
  },
  {
    title: 'Voice Leading',
    description: 'Muévete por el camino más corto entre chord tones de acordes consecutivos',
    importance: 'Crea líneas fluidas y melódicas como los grandes'
  }
];
