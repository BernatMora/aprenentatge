export interface FusionTechnique {
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
}

export const fusionTechniques: FusionTechnique[] = [
  {
    id: 'major-triad-dom',
    name: 'Tríada Mayor sobre Dominante',
    category: 'triads',
    description: 'Superponer tríadas mayores sobre acordes dominantes para crear extensiones y tensiones fusion',
    chordContext: 'Acordes dominantes (V7, 7alt, 7sus)',
    application: 'Crear sonidos de 9, 11, 13 automáticamente sin pensar en las extensiones individuales',
    sound: 'Sonido abierto, moderno, típico del fusion. Menos bebop, más Metheny/Henderson',
    examples: [
      {
        over: 'G7',
        play: 'Tríada de D Mayor (D-F#-A)',
        result: 'G7(9,11,13) - Sonido lydio dominante'
      },
      {
        over: 'G7',
        play: 'Tríada de A Mayor (A-C#-E)',
        result: 'G7(9,#11,13) - Muy outside, tensión máxima'
      },
      {
        over: 'G7',
        play: 'Tríada de Db Mayor (Db-F-Ab)',
        result: 'G7(b5,b9,#9) - Alterado total'
      },
      {
        over: 'G7',
        play: 'Tríada de Eb Mayor (Eb-G-Bb)',
        result: 'G7(b9,b13) - Color oscuro HW diminished'
      }
    ],
    artists: ['Pat Metheny', 'Scott Henderson', 'Mike Stern', 'John Scofield'],
    difficulty: 'intermediate'
  },
  {
    id: 'major-triad-minor',
    name: 'Tríada Mayor sobre Menor',
    category: 'triads',
    description: 'Tríadas mayores sobre acordes menores para sonido dorico/eólico avanzado',
    chordContext: 'Acordes menores (m7, m9, m11)',
    application: 'Explorar diferentes colores modales sin salir del centro tonal',
    sound: 'Suena a modal jazz, fusion, música brasileña avanzada',
    examples: [
      {
        over: 'Dm7',
        play: 'Tríada de F Mayor (F-A-C)',
        result: 'Dm9 - Sonido dorico natural'
      },
      {
        over: 'Dm7',
        play: 'Tríada de C Mayor (C-E-G)',
        result: 'Dm7(9,11) - Muy dorico, suena a Metheny'
      },
      {
        over: 'Dm7',
        play: 'Tríada de Bb Mayor (Bb-D-F)',
        result: 'Dm7(b13) - Color eólico'
      },
      {
        over: 'Dm7',
        play: 'Tríada de G Mayor (G-B-D)',
        result: 'Dm7(#9,13) - Muy outside pero funciona'
      }
    ],
    artists: ['Pat Metheny', 'Chick Corea', 'Wayne Shorter'],
    difficulty: 'intermediate'
  },
  {
    id: 'major-triad-major',
    name: 'Tríada Mayor sobre Mayor',
    category: 'triads',
    description: 'Tríadas mayores sobre acordes mayores para voicings abiertos y extensiones',
    chordContext: 'Acordes mayores (maj7, maj9, maj13)',
    application: 'Crear voicings de piano/guitarra modernos y espaciados',
    sound: 'Sonido contemporáneo, abierto, cinematográfico',
    examples: [
      {
        over: 'Cmaj7',
        play: 'Tríada de G Mayor (G-B-D)',
        result: 'Cmaj9 - Voicing clásico de Bill Evans'
      },
      {
        over: 'Cmaj7',
        play: 'Tríada de D Mayor (D-F#-A)',
        result: 'Cmaj7(9,#11,13) - Lydian, muy Metheny'
      },
      {
        over: 'Cmaj7',
        play: 'Tríada de Em (E-G-B)',
        result: 'Cmaj9 - Mismo que G/C, otra visualización'
      },
      {
        over: 'Cmaj7',
        play: 'Tríada de A Mayor (A-C#-E)',
        result: 'Cmaj7(#9,#11,13) - Muy outside pero resuelve bien'
      }
    ],
    artists: ['Bill Evans', 'Keith Jarrett', 'Brad Mehldau'],
    difficulty: 'intermediate'
  },
  {
    id: 'minor-triad-dom',
    name: 'Tríada Menor sobre Dominante',
    category: 'triads',
    description: 'Tríadas menores sobre dominantes para sonido alterado',
    chordContext: 'Acordes dominantes alterados',
    application: 'Acceso fácil a escala alterada sin memorizar patrones complejos',
    sound: 'Dark, tenso, moderno - típico del jazz contemporáneo',
    examples: [
      {
        over: 'G7',
        play: 'Tríada de Dm (D-F-A)',
        result: 'G7(9,11,13) - Mixolydio'
      },
      {
        over: 'G7',
        play: 'Tríada de Am (A-C-E)',
        result: 'G7(9,11,#13) - Lydio dominante parcial'
      },
      {
        over: 'G7',
        play: 'Tríada de Abm (Ab-Cb-Eb)',
        result: 'G7(b9,#9,b13) - Alterado clásico'
      },
      {
        over: 'G7',
        play: 'Tríada de Ebm (Eb-Gb-Bb)',
        result: 'G7(b9,b13) - HW diminished sound'
      }
    ],
    artists: ['John Coltrane', 'Michael Brecker', 'Chris Potter'],
    difficulty: 'advanced'
  },
  {
    id: 'polychords-major',
    name: 'Poliacordes Mayor sobre Mayor',
    category: 'polyChords',
    description: 'Superponer dos tríadas mayores para crear poliacordes complejos',
    chordContext: 'Contextos maj7 para máximo color',
    application: 'Voicings de piano/guitarra ultra-modernos, rearmmonización instantánea',
    sound: 'Suena a jazz contemporáneo, fusion avanzado, casi clasico moderno',
    examples: [
      {
        over: 'Cmaj7',
        play: 'D Mayor / C (bajo)',
        result: 'Cmaj13(#11) - Polytonal, muy lydio'
      },
      {
        over: 'Cmaj7',
        play: 'F# Mayor / C (bajo)',
        result: 'Cmaj7(#9,#11,#5) - Extremadamente outside'
      },
      {
        over: 'Cmaj7',
        play: 'Bb Mayor / C (bajo)',
        result: 'C7(9,11,13) - Mixolydio, cambia a dominante'
      },
      {
        over: 'Fmaj7',
        play: 'G Mayor / F (bajo)',
        result: 'Fmaj13 - Voicing de Metheny/Mays'
      }
    ],
    artists: ['Pat Metheny', 'Lyle Mays', 'Chick Corea', 'Herbie Hancock'],
    difficulty: 'expert'
  },
  {
    id: 'polychords-dom',
    name: 'Poliacordes sobre Dominante',
    category: 'polyChords',
    description: 'Slash chords complejos sobre dominantes para reharmo avanzada',
    chordContext: 'Dominantes (V7) en contextos ii-V-I',
    application: 'Crear sustituciones armónicas instantáneas sin pensar',
    sound: 'Denso, cromático, muy fusion/jazz moderno',
    examples: [
      {
        over: 'G7',
        play: 'Db Mayor / G (bajo)',
        result: 'Db/G = G7alt - Sustitución de tritono implícita'
      },
      {
        over: 'G7',
        play: 'E Mayor / G (bajo)',
        result: 'G7(#9,#5) - Muy alterado'
      },
      {
        over: 'G7',
        play: 'Bb Mayor / G (bajo)',
        result: 'G7(9,b13) - HW diminished'
      },
      {
        over: 'G7 → Cmaj7',
        play: 'Am / G → Cmaj7',
        result: 'Suspensión modal que resuelve'
      }
    ],
    artists: ['McCoy Tyner', 'Herbie Hancock', 'Wayne Shorter'],
    difficulty: 'expert'
  },
  {
    id: 'pent-outside',
    name: 'Pentatónicas Outside que Resuelven',
    category: 'pentatonics',
    description: 'Usar pentatónicas "incorrectas" que crean tensión pero resuelven perfectamente',
    chordContext: 'Cualquier acorde, especialmente dominantes',
    application: 'Crear frases outside controladas con resolución inside',
    sound: 'Tension-release dramático, muy efectivo para climax de solos',
    examples: [
      {
        over: 'G7 → Cmaj7',
        play: 'Gb pentatónico → C pentatónico',
        result: 'Tritono outside que resuelve - clásico de Coltrane'
      },
      {
        over: 'Cmaj7',
        play: 'F# pentatónico (sobre Cmaj7)',
        result: 'Cmaj7(#11,#9,13) - Lydio extremo'
      },
      {
        over: 'Dm7',
        play: 'Ab pentatónico (sobre Dm7)',
        result: 'Dm7(b5,b9,b13) - Locrio, muy dark'
      },
      {
        over: 'G7',
        play: 'Bb pentatónico → C pentatónico',
        result: 'Mixolidio → Mayor, suave resolución'
      }
    ],
    artists: ['John Coltrane', 'Pat Metheny', 'Michael Brecker', 'Kurt Rosenwinkel'],
    difficulty: 'advanced'
  },
  {
    id: 'metheny-technique',
    name: 'Técnica Metheny: Lydian Shift',
    category: 'techniques',
    description: 'Cambiar entre ionian y lydian constantemente sobre acordes mayores',
    chordContext: 'Acordes maj7, especialmente I y IV',
    application: 'Crear ambigüedad armónica característica del fusion',
    sound: 'Flotante, etéreo, muy Pat Metheny/Kurt Rosenwinkel',
    examples: [
      {
        over: 'Cmaj7',
        play: 'Alternar C ionian (F natural) con C lydian (F#)',
        result: 'Sonido que flota entre estable y brillante'
      },
      {
        over: 'Fmaj7',
        play: 'F ionian → F lydian usando triada de G Mayor',
        result: 'Instant Metheny sound'
      },
      {
        over: 'Progresión I-IV',
        play: 'Usar lydian en ambos acordes',
        result: 'Elimina el intervalo de 4ta justa, todo suena flotante'
      }
    ],
    artists: ['Pat Metheny', 'Kurt Rosenwinkel', 'Lage Lund'],
    difficulty: 'advanced'
  },
  {
    id: 'holdsworth-technique',
    name: 'Técnica Holdsworth: Symmetric Divisions',
    category: 'techniques',
    description: 'Dividir la octava en partes iguales (whole tone, diminished, augmented)',
    chordContext: 'Dominantes y acordes alterados',
    application: 'Crear líneas que suenan "fuera de este mundo"',
    sound: 'Alienígena, flotante, sin centro tonal aparente',
    examples: [
      {
        over: 'G7',
        play: 'Whole tone scale (G-A-B-C#-D#-F)',
        result: 'Simétrico cada tono, sin resolución clara'
      },
      {
        over: 'G7alt',
        play: 'HW diminished (G-Ab-Bb-B-C#-D-E-F)',
        result: 'Simétrico tono-semitono, máximo color alterado'
      },
      {
        over: 'Cmaj7',
        play: 'Augmented scale (C-Eb-E-G-Ab-B)',
        result: 'Simétrico cada 3 semitonos + 1'
      },
      {
        over: 'Cualquier acorde',
        play: 'Chromatic fourths (cuartas cromáticas)',
        result: 'Intervalos de 4tas moviéndose cromáticamente - signature Holdsworth'
      }
    ],
    artists: ['Allan Holdsworth', 'John McLaughlin', 'Shawn Lane'],
    difficulty: 'expert'
  },
  {
    id: 'henderson-technique',
    name: 'Técnica Henderson: Blues + Bebop Hybrid',
    category: 'techniques',
    description: 'Mezclar escalas de blues con aproximaciones bebop sobre cambios complejos',
    chordContext: 'Blues, rhythm changes, cualquier progresión rápida',
    application: 'Mantener el feeling del blues mientras navegas cambios complejos',
    sound: 'Gutural, bluesy pero sofisticado armónicamente',
    examples: [
      {
        over: 'G7 (en blues)',
        play: 'G blues + chromatic approaches a chord tones',
        result: 'Suena a blues pero con sofisticación jazz'
      },
      {
        over: 'Dm7-G7-Cmaj7',
        play: 'C blues pentatonic + guide tone line',
        result: 'Bebop meets blues - signature Henderson'
      },
      {
        over: 'Cambios rápidos',
        play: 'Mantener pentatónica del centro tonal + approach notes a cambios',
        result: 'Línea coherente que respeta los cambios'
      },
      {
        over: 'Cualquier dominante',
        play: 'Blues scale + b9 (blue note como extensión)',
        result: 'Color blues que funciona en jazz'
      }
    ],
    artists: ['Scott Henderson', 'Mike Stern', 'Robben Ford'],
    difficulty: 'advanced'
  },
  {
    id: 'scofield-technique',
    name: 'Técnica Scofield: Rhythmic Displacement',
    category: 'techniques',
    description: 'Desplazar rítmicamente frases simples para crear complejidad',
    chordContext: 'Funciona sobre cualquier progresión',
    application: 'Crear interés sin cambiar las notas, solo el ritmo',
    sound: 'Groovy pero impredecible, muy funky y moderno',
    examples: [
      {
        over: 'Cualquier acorde',
        play: 'Frase de 3 notas repetida en 4/4',
        result: 'Polirritmia 3 contra 4 - signature Scofield'
      },
      {
        over: 'Groove de funk',
        play: 'Riff simple empezando en &2 en vez de 1',
        result: 'Mismo riff, nuevo groove'
      },
      {
        over: 'ii-V-I',
        play: 'Arpegio simple con acentos desplazados',
        result: 'Sofisticación rítmica sin complejidad armónica'
      },
      {
        over: 'Vamp',
        play: 'Frase que cruza la barra de compás',
        result: 'Crea ambigüedad métrica - muy Scofield/Metheny'
      }
    ],
    artists: ['John Scofield', 'Pat Metheny', 'Mike Stern'],
    difficulty: 'intermediate'
  },
  {
    id: 'quartal-harmony',
    name: 'Armonía Cuartal',
    category: 'techniques',
    description: 'Construir acordes y líneas con intervalos de 4ta en vez de 3ras',
    chordContext: 'Modal jazz, fusion, temas modernos',
    application: 'Voicings ambiguos que funcionan en múltiples contextos',
    sound: 'Suspendido, modal, moderno - piensa McCoy Tyner',
    examples: [
      {
        over: 'Dm7',
        play: 'Stack de 4tas: D-G-C-F',
        result: 'Dm11 sin 3ra - ambiguo y espacioso'
      },
      {
        over: 'Cmaj7',
        play: 'Stack: C-F-Bb-E',
        result: 'Cmaj7sus - lydian vibe'
      },
      {
        over: 'G7',
        play: 'Stack: G-C-F-Bb',
        result: 'G7sus4 - muy modal'
      },
      {
        over: 'Cualquier acorde',
        play: 'Línea melódica en intervalos de 4ta',
        result: 'Suena a Coltrane "Impressions" o Metheny'
      }
    ],
    artists: ['McCoy Tyner', 'John Coltrane', 'Chick Corea', 'Pat Metheny'],
    difficulty: 'intermediate'
  }
];

export const fusionPracticeRoutines = [
  {
    title: 'Triadas sobre Dominantes',
    description: 'Practica todas las tríadas mayores y menores sobre G7',
    steps: [
      'Toca cada tríada como arpegio sobre G7 backing track',
      'Identifica el color resultante (9, #11, b9, etc)',
      'Crea frases de 2 compases usando cada tríada',
      'Mezcla 2-3 tríadas en la misma frase'
    ],
    duration: '15-20 minutos',
    level: 'intermediate'
  },
  {
    title: 'Pentatónicas Outside-Inside',
    description: 'Practica resoluciones de pentatónicas outside a inside',
    steps: [
      'Elige un ii-V-I (ej: Dm7-G7-Cmaj7)',
      'Toca pentatónicas "incorrectas" sobre G7',
      'Resuelve a pentatónicas "correctas" sobre Cmaj7',
      'Experimenta con diferentes distancias (semitono, tritono, tono)',
      'Graba y analiza cuáles resoluciones suenan mejor'
    ],
    duration: '20 minutos',
    level: 'advanced'
  },
  {
    title: 'Poliacordes y Slash Chords',
    description: 'Desarrolla voicings modernos usando poliacordes',
    steps: [
      'Practica Cmaj7 como: Em/C, G/C, Am/C, Dm/C',
      'Toca cada voicing como acorde y como arpegio',
      'Úsalos para acompañar una melodía',
      'Crea progresiones usando solo slash chords',
      'Transcribe un tema de Metheny notando sus slash chords'
    ],
    duration: '20-25 minutos',
    level: 'expert'
  },
  {
    title: 'Lydian Shifts (Metheny)',
    description: 'Domina el cambio entre ionian y lydian',
    steps: [
      'Sobre Cmaj7, alterna entre F natural y F#',
      'Crea frases que usen ambas notas musicalmente',
      'Practica sobre progresión I-IV alternando modos',
      'Transcribe un solo de Metheny identificando lydian shifts',
      'Compón una melodía usando esta técnica'
    ],
    duration: '15 minutos',
    level: 'advanced'
  },
  {
    title: 'Symmetric Systems (Holdsworth)',
    description: 'Explora divisiones simétricas de la octava',
    steps: [
      'Whole tone: Improvisa sobre G7 usando solo tonos enteros',
      'Diminished: HW sobre G7alt',
      'Augmented: Sobre Cmaj7 usando augmented scale',
      'Combina sistemas en una sola frase',
      'Analiza un solo de Holdsworth identificando simetrías'
    ],
    duration: '20 minutos',
    level: 'expert'
  }
];

export const fusionArtistApproaches = [
  {
    artist: 'Pat Metheny',
    characteristics: [
      'Lydian sobre todo (incluso cuando no debería)',
      'Líneas largas y melódicas',
      'Cambios sutiles entre inside/outside',
      'Poliacordes y slash chords en comping',
      'Desplazamiento métrico'
    ],
    keyTechniques: ['Lydian shifts', 'Triads over chords', 'Quartal harmony']
  },
  {
    artist: 'Allan Holdsworth',
    characteristics: [
      'Escalas simétricas (whole tone, diminished, augmented)',
      'Legato extenso con intervalos impredecibles',
      'Armonía de cuartas y quintas',
      'Evita patrones tradicionales',
      'Sonido flotante sin centro tonal claro'
    ],
    keyTechniques: ['Symmetric divisions', 'Chromatic fourths', 'Wide intervals']
  },
  {
    artist: 'Scott Henderson',
    characteristics: [
      'Blues meets bebop',
      'Pentatónicas con cromatismos inteligentes',
      'Superposiciones de tríadas sobre dominantes',
      'Frases vocales y cantables',
      'Uso extenso de double-stops'
    ],
    keyTechniques: ['Blues-bebop hybrid', 'Triads over dominants', 'Chromatic approaches']
  },
  {
    artist: 'John Scofield',
    characteristics: [
      'Desplazamiento rítmico constante',
      'Frases simples en contextos complejos',
      'Blues y funk meets jazz',
      'Acentos desplazados',
      'Polirritmia 3 contra 4'
    ],
    keyTechniques: ['Rhythmic displacement', 'Blues vocabulary', 'Metric modulation']
  },
  {
    artist: 'Mike Stern',
    characteristics: [
      'Mezcla de blues, bebop y fusion',
      'Bends expresivos en contextos jazz',
      'Pentatónicas con cromatismo',
      'Energía y velocidad',
      'Superposiciones avanzadas'
    ],
    keyTechniques: ['All fusion techniques', 'Blues-jazz integration', 'High-energy playing']
  },
  {
    artist: 'Kurt Rosenwinkel',
    characteristics: [
      'Lydian augmented',
      'Resoluciones retrasadas',
      'Armonía densa y compleja',
      'Melodías largas y cantables',
      'Uso único de efectos (reverb/delay) como parte de la técnica'
    ],
    keyTechniques: ['Lydian augmented', 'Delayed resolutions', 'Complex harmony']
  }
];
