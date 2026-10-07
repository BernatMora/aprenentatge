export interface Scale {
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
}

export const scales: Scale[] = [
  {
    id: 'altered',
    name: 'Alterada (7mo modo menor melódica)',
    formula: '1 b2 b3 b4 b5 b6 b7 8',
    notes: ['C', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'C'],
    description: 'La escala por excelencia para acordes de dominante alterados. Contiene todas las tensiones alteradas (b9, #9, #11, b13).',
    usage: 'Usa sobre acordes 7alt, 7#5, 7b5, 7#9, 7b9. Perfecta para resoluciones tensas en ii-V-i menor.',
    chordTypes: ['G7alt', 'G7#5', 'G7b5', 'G7#9b13'],
    examples: [
      {
        artist: 'John Coltrane',
        song: 'Giant Steps',
        context: 'Dominantes que resuelven en ii-V rápidos'
      },
      {
        artist: 'Pat Metheny',
        song: 'Bright Size Life',
        context: 'Dominantes alterados en secciones modales'
      },
      {
        artist: 'Michael Brecker',
        song: 'Itsbynne Reel',
        context: 'Líneas alteradas sobre cambios rápidos'
      }
    ],
    exercises: [
      {
        title: 'Patrones de 3 notas',
        description: 'Toca la escala alterada en grupos de 3 notas ascendentes y descendentes.',
        tips: [
          'C-Db-Eb, Db-Eb-Fb, Eb-Fb-Gb...',
          'Practica en todas las tonalidades usando el círculo de quintas',
          'Aumenta tempo gradualmente desde 60 hasta 140 bpm'
        ]
      },
      {
        title: 'Resolución a mayor y menor',
        description: 'Practica G7alt → Cmaj7 y G7alt → Cm7 con líneas que conectan ambos acordes.',
        tips: [
          'Enfatiza b9 y #9 en tiempo fuerte del G7alt',
          'Resuelve cromáticamente a la 3era o 7ma del acorde de resolución',
          'Usa el Db (b5) como nota de aproximación cromática'
        ]
      },
      {
        title: 'Arpegios dentro de alterada',
        description: 'Identifica y practica los arpegios contenidos en la escala.',
        tips: [
          'Arpegio de Db Mayor (#9, b5, b7, b9)',
          'Arpegio de Eb menor (b9, b3, b13, 1)',
          'Triada de Gb Mayor (b5, b7, b9, #9)'
        ]
      }
    ]
  },
  {
    id: 'lydian-dominant',
    name: 'Lidia Dominante (4to modo menor melódica)',
    formula: '1 2 3 #4 5 6 b7 8',
    notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'Bb', 'C'],
    description: 'Combina el sonido brillante lidio con el b7 dominante. Sonido luminoso y sofisticado.',
    usage: 'Perfecta para acordes 7#11. Común en standards y jazz moderno. Funciona como V7 sin necesidad de resolución tensa.',
    chordTypes: ['C7#11', 'C13#11', 'C9#11'],
    examples: [
      {
        artist: 'Herbie Hancock',
        song: 'Maiden Voyage',
        context: 'Acordes dominantes suspendidos'
      },
      {
        artist: 'Wayne Shorter',
        song: 'Footprints',
        context: 'Dominantes modales'
      },
      {
        artist: 'Pat Metheny',
        song: 'James',
        context: 'Dominantes con color brillante'
      }
    ],
    exercises: [
      {
        title: 'Enfatizar #11',
        description: 'Crea líneas que destaquen el intervalo #11 del acorde.',
        tips: [
          'Resuelve F# a G (vuelta a la quinta)',
          'Usa F# como nota de paso entre E y G',
          'Combina con la 13 (A) para sonido moderno'
        ]
      },
      {
        title: 'Triadas superiores',
        description: 'Practica triadas mayores sobre la estructura dominante.',
        tips: [
          'Triada de D Mayor sobre C7 = 9, 3, #11',
          'Triada de A menor sobre C7 = 13, 1, b7',
          'Alterna entre ambas para crear tensión/reposo'
        ]
      },
      {
        title: 'Sustitución tritono',
        description: 'Usa Lidia Dominante en sustitución de V7 → I.',
        tips: [
          'Db7#11 sustituye G7 → Cmaj7',
          'Crea líneas que conectan Db7 con C usando cromatismo',
          'Enfatiza notas comunes entre ambos acordes'
        ]
      }
    ]
  },
  {
    id: 'diminished-hd',
    name: 'Disminuida Semitono-Tono',
    formula: '1 b2 b3 3 #4 5 6 b7 8',
    notes: ['C', 'Db', 'Eb', 'E', 'F#', 'G', 'A', 'Bb', 'C'],
    description: 'Escala simétrica con patrón semitono-tono. Rica en tensiones para dominantes.',
    usage: 'Sobre acordes 7b9, 7#9, 7b9#9, 7#11. Contiene b9, #9, #11 y 13 natural.',
    chordTypes: ['C7b9', 'C7#9', 'C7b9#9', 'C13b9'],
    examples: [
      {
        artist: 'Charlie Parker',
        song: 'Blues for Alice',
        context: 'Dominantes en progresiones de blues'
      },
      {
        artist: 'John Coltrane',
        song: 'Impressions',
        context: 'Dominantes sobre vamps modales'
      },
      {
        artist: 'Pat Martino',
        song: 'Sunny',
        context: 'Uso melódico sobre V7'
      }
    ],
    exercises: [
      {
        title: 'Patrón simétrico',
        description: 'Explota la simetría de la escala con patrones repetitivos.',
        tips: [
          'Toca 4 notas, sube una tercera menor, repite',
          'C-Db-Eb-E, Eb-E-F#-G, F#-G-A-Bb',
          'Funciona igual comenzando en cualquier nota'
        ]
      },
      {
        title: 'Arpegios disminuidos',
        description: 'Practica los 4 arpegios disminuidos contenidos.',
        tips: [
          'Cdim7: C-Eb-F#-A',
          'Dbdim7: Db-E-G-Bb',
          'Todos comparten las mismas notas',
          'Usa estos arpegios como guía melódica'
        ]
      },
      {
        title: 'Combinación b9 y #9',
        description: 'Crea líneas que alternan ambas tensiones.',
        tips: [
          'Db (b9) → E (#9) → F# (#11)',
          'Resuelve a notas del acorde (1, 3, 5, b7)',
          'Usa en dominantes de blues y rhythm changes'
        ]
      }
    ]
  },
  {
    id: 'diminished-wh',
    name: 'Disminuida Tono-Semitono',
    formula: '1 2 b3 4 b5 b6 6 7 8',
    notes: ['C', 'D', 'Eb', 'F', 'Gb', 'Ab', 'A', 'B', 'C'],
    description: 'Escala simétrica tono-semitono. Para acordes disminuidos.',
    usage: 'Sobre acordes disminuidos (dim7, °7). También en dominantes como paso cromático.',
    chordTypes: ['Cdim7', 'C°7'],
    examples: [
      {
        artist: 'Oscar Peterson',
        song: 'C Jam Blues',
        context: 'Acordes disminuidos de paso'
      },
      {
        artist: 'Art Tatum',
        song: 'Tiger Rag',
        context: 'Pasajes cromáticos disminuidos'
      }
    ],
    exercises: [
      {
        title: 'Tono-Semitono pattern',
        description: 'Practica el patrón característico de la escala.',
        tips: [
          'C-D (tono), D-Eb (semitono), Eb-F (tono)...',
          'Alterna direcciones: sube 2 baja 1',
          'Practica en tempo lento con metrónomo'
        ]
      }
    ]
  },
  {
    id: 'whole-tone',
    name: 'Tonos Enteros',
    formula: '1 2 3 #4 #5 b7 8',
    notes: ['C', 'D', 'E', 'F#', 'G#', 'Bb', 'C'],
    description: 'Escala simétrica de 6 notas. Sonido suspendido y ambiguo.',
    usage: 'Sobre acordes aumentados (7#5, maj7#5). Crea tensión flotante sin centro tonal claro.',
    chordTypes: ['C7#5', 'Cmaj7#5', 'Caug'],
    examples: [
      {
        artist: 'Thelonious Monk',
        song: 'Ugly Beauty',
        context: 'Acordes aumentados y ambigüedad tonal'
      },
      {
        artist: 'Chick Corea',
        song: 'Matrix',
        context: 'Tensión armónica en secciones modales'
      }
    ],
    exercises: [
      {
        title: 'Intervalos de tonos enteros',
        description: 'Explora los intervalos característicos.',
        tips: [
          'Solo hay 2 escalas de tonos enteros posibles',
          'C-D-E-F#-G#-Bb y Db-Eb-F-G-A-B',
          'Practica triadas aumentadas: C-E-G#'
        ]
      }
    ]
  },
  {
    id: 'melodic-minor',
    name: 'Menor Melódica',
    formula: '1 2 b3 4 5 6 7 8',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B', 'C'],
    description: 'Escala menor con 6ta y 7ma mayores. Genera múltiples modos útiles en jazz.',
    usage: 'Sobre acordes m(maj7), m6, m7. Base para alterada (modo 7) y lidia dominante (modo 4).',
    chordTypes: ['Cm(maj7)', 'Cm6', 'Cm7'],
    examples: [
      {
        artist: 'Bill Evans',
        song: 'Very Early',
        context: 'Acordes menores con maj7'
      },
      {
        artist: 'Pat Metheny',
        song: 'Question and Answer',
        context: 'Líneas menores melódicas modernas'
      }
    ],
    exercises: [
      {
        title: 'Los 7 modos',
        description: 'Practica los 7 modos de menor melódica.',
        tips: [
          '1. Menor melódica (sobre mMaj7)',
          '2. Dórico b2 (sobre sus)',
          '3. Lidio aumentado (sobre Maj7#5)',
          '4. Lidio dominante (sobre 7#11)',
          '5. Mixolidio b6 (sobre 7)',
          '6. Locrio #2 (sobre m7b5)',
          '7. Alterada (sobre 7alt)'
        ]
      }
    ]
  },
  {
    id: 'harmonic-minor',
    name: 'Menor Armónica',
    formula: '1 2 b3 4 5 b6 7 8',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B', 'C'],
    description: 'Escala menor con 7ma mayor. Sonido exótico por el intervalo de 2da aumentada.',
    usage: 'Sobre acordes m(maj7), 7b9. Color flamenco y árabe. Modo 5 (frigio dominante) muy usado.',
    chordTypes: ['Cm(maj7)', 'G7b9'],
    examples: [
      {
        artist: 'Chick Corea',
        song: 'Spain',
        context: 'Modo frigio dominante'
      },
      {
        artist: 'John McLaughlin',
        song: 'Meeting of the Spirits',
        context: 'Fusión con sonidos orientales'
      }
    ],
    exercises: [
      {
        title: 'Frigio dominante (modo 5)',
        description: 'El modo más usado: E frigio dominante de A menor armónica.',
        tips: [
          'E-F-G#-A-B-C-D sobre E7',
          'Enfatiza b9 (F) y b13 (C)',
          'Sonido español/flamenco'
        ]
      }
    ]
  },
  {
    id: 'bebop-dominant',
    name: 'Bebop Dominante',
    formula: '1 2 3 4 5 6 b7 7 8',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'B', 'C'],
    description: 'Mixolidio con 7ma mayor añadida. Permite melodías que caen en tiempos fuertes.',
    usage: 'Sobre acordes 7. La nota extra permite acentuar notas del acorde en tiempos 1 y 3.',
    chordTypes: ['C7', 'C9', 'C13'],
    examples: [
      {
        artist: 'Charlie Parker',
        song: 'Anthropology',
        context: 'Líneas bebop clásicas'
      },
      {
        artist: 'Clifford Brown',
        song: 'Joy Spring',
        context: 'Fraseo sobre dominantes'
      }
    ],
    exercises: [
      {
        title: 'Escala descendente',
        description: 'Practica bajando la escala para que las notas del acorde caigan en tiempos fuertes.',
        tips: [
          'Desde C: C-B-Bb-A-G-F-E-D-C',
          'Tiempos 1 y 3: C, Bb, G, E, C (1, b7, 5, 3, 1)',
          'La 7ma mayor (B) actúa como nota de paso cromática'
        ]
      }
    ]
  },
  {
    id: 'bebop-major',
    name: 'Bebop Mayor',
    formula: '1 2 3 4 5 #5 6 7 8',
    notes: ['C', 'D', 'E', 'F', 'G', 'G#', 'A', 'B', 'C'],
    description: 'Mayor con #5 cromática añadida entre 5 y 6.',
    usage: 'Sobre acordes maj7. Permite frases fluidas en tempo rápido.',
    chordTypes: ['Cmaj7', 'C6'],
    examples: [
      {
        artist: 'Barry Harris',
        song: 'Workshops',
        context: 'Movimiento bebop sobre mayores'
      }
    ],
    exercises: [
      {
        title: 'Movimiento cromático 5-6',
        description: 'Enfoca en el paso G-G#-A.',
        tips: [
          'Úsalo descendente: A-G#-G',
          'Combina con arpegios de Cmaj7',
          'Practica en ii-V-I: Dm7-G7-Cmaj7'
        ]
      }
    ]
  },
  {
    id: 'natural-minor',
    name: 'Menor Natural (Éolica)',
    formula: '1 2 b3 4 5 b6 b7 8',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
    description: 'La escala menor natural. Base de la tonalidad menor. También conocida como Éolica.',
    usage: 'Sobre acordes m7 en contexto menor. Baladas y progresiones menores naturales.',
    chordTypes: ['Cm7', 'Cm6'],
    examples: [
      {
        artist: 'Bill Evans',
        song: 'Waltz for Debby',
        context: 'Secciones menores con sonido natural'
      },
      {
        artist: 'Miles Davis',
        song: 'All Blues',
        context: 'Color menor natural en 6/8'
      },
      {
        artist: 'Radiohead',
        song: 'Exit Music',
        context: 'Menor natural en rock progresivo'
      }
    ],
    exercises: [
      {
        title: 'Diferencias con Dórico',
        description: 'Practica C menor natural vs C Dórico. La diferencia es la 6ta.',
        tips: [
          'C menor natural: Ab (b6)',
          'C Dórico: A (6)',
          'Escucha la diferencia de color',
          'Practica transiciones entre ambas escalas'
        ]
      },
      {
        title: 'Pentatónicas derivadas',
        description: 'Extrae pentatónicas de la escala menor natural.',
        tips: [
          'C menor pentatónica: C-Eb-F-G-Bb',
          'Eb Mayor pentatónica: Eb-F-G-Bb-C',
          'Ab Mayor pentatónica: Ab-Bb-C-Eb-F',
          'Todas provienen de C menor natural'
        ]
      },
      {
        title: 'Progresiones menores naturales',
        description: 'Practica sobre progresiones típicas.',
        tips: [
          'i-bVI-bVII-i en C: Cm-Ab-Bb-Cm',
          'i-bIII-bVII-bVI: Cm-Eb-Bb-Ab',
          'Sonido cinematográfico y emocional'
        ]
      }
    ]
  },
  {
    id: 'phrygian-dominant',
    name: 'Frigio Dominante (5to modo Harmónica)',
    formula: '1 b2 3 4 5 b6 b7 8',
    notes: ['C', 'Db', 'E', 'F', 'G', 'Ab', 'Bb', 'C'],
    description: 'Modo 5 de menor armónica. Sonido español/flamenco exótico. Combina b2 con 3ra Mayor.',
    usage: 'Sobre acordes 7b9. Perfecto para dominantes con sabor étnico o flamenco.',
    chordTypes: ['C7b9', 'C7b9b13'],
    examples: [
      {
        artist: 'Chick Corea',
        song: 'Spain',
        context: 'Sección A - G Frigio Dominante sobre G7'
      },
      {
        artist: 'Paco de Lucía',
        song: 'Entre Dos Aguas',
        context: 'Flamenco auténtico con Frigio Dominante'
      },
      {
        artist: 'John McLaughlin',
        song: 'Meeting of the Spirits',
        context: 'Fusion de jazz con modos exóticos'
      }
    ],
    exercises: [
      {
        title: 'Intervalo b2 a 3',
        description: 'Enfatiza el intervalo característico b2-3 (Db-E).',
        tips: [
          'Este intervalo de 2da aumentada es la firma',
          'Usa en tiempo fuerte para máximo impacto',
          'Resuelve la b2 a la fundamental',
          'Practica C-Db-E-F como motivo'
        ]
      },
      {
        title: 'Comparación con Frigio regular',
        description: 'Frigio regular tiene b3, Frigio Dominante tiene 3 Mayor.',
        tips: [
          'Frigio: 1-b2-b3-4-5-b6-b7',
          'Frigio Dominante: 1-b2-3-4-5-b6-b7',
          'La 3ra Mayor crea el sonido dominante',
          'Prueba ambos sobre E7 para escuchar diferencia'
        ]
      },
      {
        title: 'Aplicación en Spain',
        description: 'Practica el lick característico de Spain.',
        tips: [
          'Usa G Frigio Dominante sobre G7',
          'Enfatiza: G-Ab-B-C',
          'Resolución a Cmaj7',
          'Practica en bucle G7-Cmaj7'
        ]
      }
    ]
  },
  {
    id: 'bebop-minor',
    name: 'Bebop Menor',
    formula: '1 2 b3 3 4 5 6 b7 8',
    notes: ['C', 'D', 'Eb', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    description: 'Escala Dórica con 3ra Mayor añadida como nota cromática de paso.',
    usage: 'Sobre acordes m7. Permite fraseo bebop con notas del acorde en tiempos fuertes.',
    chordTypes: ['Cm7', 'Cm9', 'Cm6'],
    examples: [
      {
        artist: 'Charlie Parker',
        song: 'Donna Lee',
        context: 'Líneas menores bebop rápidas'
      },
      {
        artist: 'Barry Harris',
        song: 'Workshops',
        context: 'Enseñanza sistemática de bebop menor'
      },
      {
        artist: 'George Benson',
        song: 'Affirmation',
        context: 'Frases menores con timing perfecto'
      }
    ],
    exercises: [
      {
        title: 'Escalas descendentes',
        description: 'Practica bajando para que chord tones caigan en tiempos fuertes.',
        tips: [
          'Desde C: C-Bb-A-G-F-E-Eb-D-C',
          'Tiempos 1 y 3: C, A, F, Eb, C (1, 6, 4, b3, 1)',
          'La 3ra Mayor (E) como nota de paso cromática',
          'Practica a 60 BPM, aumenta gradualmente'
        ]
      },
      {
        title: 'Patterns de 4 notas',
        description: 'Secuencias de 4 notas en la escala.',
        tips: [
          'C-D-Eb-E, D-Eb-E-F, Eb-E-F-G...',
          'Practica ascendente y descendente',
          'Varía ritmos: corcheas, tripletas, semicorcheas',
          'Combina con arpegios de Cm7'
        ]
      },
      {
        title: 'En ii-V-i menor',
        description: 'Aplica sobre progresiones menores.',
        tips: [
          'Dm7b5 (D Locrio) - G7alt - Cm7 (C bebop menor)',
          'Transiciona suavemente entre escalas',
          'Enfatiza chord tones en cambios de acorde'
        ]
      }
    ]
  },
  {
    id: 'hexatonic',
    name: 'Hexatónica (Escala de 6 notas)',
    formula: 'Varía (ejemplos comúnes abajo)',
    notes: ['C', 'D', 'Eb', 'E', 'G', 'Ab', 'C'],
    description: 'Escalas de 6 notas creadas combinando triadas. Sonido moderno y angular.',
    usage: 'Jazz contemporáneo, outside playing, sonoridades ambiguas.',
    chordTypes: ['Varios - depende del tipo'],
    examples: [
      {
        artist: 'Michael Brecker',
        song: 'Itsbynne Reel',
        context: 'Hexatónicas sobre cambios rápidos'
      },
      {
        artist: 'Kurt Rosenwinkel',
        song: 'Zhivago',
        context: 'Hexatónicas en improvisación contemporánea'
      },
      {
        artist: 'Chris Potter',
        song: 'Pop Tune #1',
        context: 'Combinaciones hexatónicas modernas'
      }
    ],
    exercises: [
      {
        title: 'Hexatónica Mayor-menor',
        description: 'Combina triada Mayor + triada menor separadas por 3ra menor.',
        tips: [
          'C Mayor + Eb menor: C-D-Eb-E-G-Ab',
          'Contiene tanto C Mayor como Eb menor',
          'Sonido ambiguo mayor/menor',
          'Usa sobre Cm7 o Cmaj7'
        ]
      },
      {
        title: 'Hexatónica Aumentada',
        description: 'Dos triadas aumentadas a medio tono de distancia.',
        tips: [
          'Caug + Dbaug: C-E-G#-Db-F-A',
          'Simétrica cada 4 semitonos',
          'Usa sobre acordes aumentados',
          'Sonido flotante y amálico'
        ]
      },
      {
        title: 'Aplicación práctica',
        description: 'Usa hexatónicas como alternativa a escalas de 7 notas.',
        tips: [
          'Crea frases más angulares',
          'Evita notas "avoid"',
          'Combina con aproximaciones cromáticas',
          'Perfecto para outside que resuelve inside'
        ]
      }
    ]
  },
  {
    id: 'blues-scale',
    name: 'Escala Blues',
    formula: '1 b3 4 b5 5 b7 8',
    notes: ['C', 'Eb', 'F', 'Gb', 'G', 'Bb', 'C'],
    description: 'Pentatónica menor + b5 (blue note). La escala fundamental del blues y rock.',
    usage: 'Blues, rock, funk, soul. Funciona sobre toda la progresioni de blues.',
    chordTypes: ['C7', 'Cm7', 'C blues'],
    examples: [
      {
        artist: 'B.B. King',
        song: 'The Thrill is Gone',
        context: 'Blues puro con bends en la blue note'
      },
      {
        artist: 'John Coltrane',
        song: 'Blues to Bechet',
        context: 'Escala blues en jazz'
      },
      {
        artist: 'Stevie Ray Vaughan',
        song: 'Pride and Joy',
        context: 'Escala blues en texas blues/rock'
      }
    ],
    exercises: [
      {
        title: 'La Blue Note',
        description: 'Enfatiza la b5 (Gb en C blues).',
        tips: [
          'Usa bends desde F a Gb',
          'Resuelve a la 5ta justa (G)',
          'Alterna Gb-G para tensión',
          'Caracteriza el sonido blues'
        ]
      },
      {
        title: 'Call and Response',
        description: 'Crea frases de pregunta-respuesta.',
        tips: [
          'Frase 1 (call): C-Eb-F-Gb',
          'Frase 2 (response): G-F-Eb-C',
          'Deja espacio entre frases',
          'Imita el canto vocal del blues'
        ]
      },
      {
        title: 'Mezcla con Mayor',
        description: 'Combina blues menor con pentatónica mayor.',
        tips: [
          'C menor blues: C-Eb-F-Gb-G-Bb',
          'C Mayor pentatónica: C-D-E-G-A',
          'Alterna entre ambas',
          'Sonido bluesy sofisticado'
        ]
      }
    ]
  },
  {
    id: 'lydian-augmented',
    name: 'Lidia Aumentada (3er modo Menor Melódica)',
    formula: '1 2 3 #4 #5 6 7 8',
    notes: ['C', 'D', 'E', 'F#', 'G#', 'A', 'B', 'C'],
    description: 'Modo 3 de menor melódica. Escala Mayor con #4 y #5. Sonido brillante y etéreo.',
    usage: 'Sobre acordes maj7#5. Crea color exótico sobre acordes mayores.',
    chordTypes: ['Cmaj7#5', 'Cmaj7+'],
    examples: [
      {
        artist: 'Chick Corea',
        song: 'Crystal Silence',
        context: 'Voicings de acordes aumentados'
      },
      {
        artist: 'Wayne Shorter',
        song: 'Infant Eyes',
        context: 'Sonoridades armónicas exóticas'
      }
    ],
    exercises: [
      {
        title: 'Comparación con Lidia',
        description: 'Ambas tienen #4, pero Lidia Aumentada añade #5.',
        tips: [
          'Lidia: 1-2-3-#4-5-6-7',
          'Lidia Aumentada: 1-2-3-#4-#5-6-7',
          'La #5 crea sonido más exótico',
          'Usa sobre Cmaj7 para color aumentado'
        ]
      },
      {
        title: 'Arpegio de triada aumentada',
        description: 'Enfatiza el sonido aumentado.',
        tips: [
          'Triada C aumentada: C-E-G#',
          'Está dentro de C Lidia Aumentada',
          'Practica arpegio + notas de la escala',
          'Resuelve a acordes mayores normales'
        ]
      }
    ]
  },
  {
    id: 'super-locrian',
    name: 'Super Locria (Alterada)',
    formula: '1 b2 b3 b4 b5 b6 b7 8',
    notes: ['C', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'C'],
    description: 'Mismo que Alterada. Se puede pensar como Locria con b4 en vez de 4.',
    usage: 'Idéntico a Escala Alterada. Sobre V7alt.',
    chordTypes: ['C7alt', 'C7#5#9'],
    examples: [
      {
        artist: 'John Coltrane',
        song: 'Giant Steps',
        context: 'Dominantes alterados en cambios ultra-rápidos'
      }
    ],
    exercises: [
      {
        title: 'Nota: Igual que Alterada',
        description: 'Esta escala es idéntica a la Escala Alterada. Solo un nombre alternativo.',
        tips: [
          'Modo 7 de menor melódica',
          'Ver ejercicios de Escala Alterada',
          'Ambos términos se usan indistintamente en jazz'
        ]
      }
    ]
  },
  {
    id: 'dorian',
    name: 'Dórico',
    formula: '1 2 b3 4 5 6 b7 8',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb', 'C'],
    description: 'El modo menor más usado en jazz. Caracterizado por su 6ta Mayor que lo diferencia del menor natural.',
    usage: 'Sobre acordes m7 en contextos ii-V y vamps modales. Color más brillante que menor natural.',
    chordTypes: ['Cm7', 'Cm9', 'Cm11', 'Cm13'],
    examples: [
      {
        artist: 'Miles Davis',
        song: 'So What',
        context: 'Uso puro de Dórico en vamp modal'
      },
      {
        artist: 'Herbie Hancock',
        song: 'Maiden Voyage',
        context: 'Múltiples secciones dóricas'
      },
      {
        artist: 'John Coltrane',
        song: 'Impressions',
        context: 'D Dórico y Eb Dórico'
      }
    ],
    exercises: [
      {
        title: 'La 6ta Mayor',
        description: 'Enfatiza la diferencia clave con menor natural.',
        tips: [
          'Sobre Dm7: la nota A (6ta Mayor) define el sonido',
          'Compara Dm7 Dórico (A) vs menor natural (Bb)',
          'La 6ta crea sonido más luminoso y jazz',
          'Practica patterns que incluyan la 6ta'
        ]
      },
      {
        title: 'Pentatónicas derivadas',
        description: 'Extrae pentatónicas de Dórico.',
        tips: [
          'Pentatónica menor de la raíz: D-F-G-A-C',
          'Pentatónica menor de la 4ta: G-Bb-C-D-F',
          'Pentatónica Mayor de la b3: F-G-A-C-D',
          'Usa estas pentatónicas sobre Dm7'
        ]
      },
      {
        title: 'ii-V en menor',
        description: 'Aplica Dórico en progresiones ii-V-i.',
        tips: [
          'Dm7 (D Dórico) - G7alt - Cm7',
          'Enfatiza 9, 11, 13 del Dm7',
          'Transiciona suavemente a G7alt',
          'Practica en todas las tonalidades'
        ]
      }
    ]
  },
  {
    id: 'mixolydian',
    name: 'Mixolidio',
    formula: '1 2 3 4 5 6 b7 8',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    description: 'El modo dominante. Mayor con 7ma menor. Escala básica para acordes V7.',
    usage: 'Sobre todos los acordes 7 no alterados. Base del blues y rock.',
    chordTypes: ['C7', 'C9', 'C11', 'C13'],
    examples: [
      {
        artist: 'The Beatles',
        song: 'Norwegian Wood',
        context: 'Vamp mixolidio'
      },
      {
        artist: 'Grateful Dead',
        song: 'Dark Star',
        context: 'Improvisación modal mixolidia'
      }
    ],
    exercises: [
      {
        title: 'La b7 dominante',
        description: 'Enfatiza el intervalo característico.',
        tips: [
          'Sobre G7: F (b7) es la nota clave',
          'Compara con Mayor: G Jonio tiene F#',
          'La b7 crea tensión que pide resolución',
          'Usa en blues y rock extensivamente'
        ]
      }
    ]
  },
  {
    id: 'lydian',
    name: 'Lidio',
    formula: '1 2 3 #4 5 6 7 8',
    notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B', 'C'],
    description: 'Mayor con #11. Sonido brillante y flotante. Muy usado en jazz moderno.',
    usage: 'Sobre acordes Maj7, especialmente Imaj7 y IVmaj7. Color sofisticado.',
    chordTypes: ['Cmaj7', 'Cmaj7#11', 'Cmaj9#11'],
    examples: [
      {
        artist: 'Joe Satriani',
        song: 'Flying in a Blue Dream',
        context: 'Melodía lidia característica'
      },
      {
        artist: 'John Williams',
        song: 'Theme from E.T.',
        context: 'Sonido flotante lidio'
      }
    ],
    exercises: [
      {
        title: 'La #11 mágica',
        description: 'Explora el intervalo característico.',
        tips: [
          'Sobre Cmaj7: F# (#11) es la magia',
          'Evita la 4ta justa (F) - suena avoid',
          'Usa #11 para sonido moderno y sofisticado',
          'Muy común en bandas sonoras'
        ]
      }
    ]
  },
  {
    id: 'phrygian',
    name: 'Frigio',
    formula: '1 b2 b3 4 5 b6 b7 8',
    notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'],
    description: 'Modo menor oscuro con b2. Sonido español/flamenco.',
    usage: 'Sobre acordes menores en contextos modales. Color exótico y oscuro.',
    chordTypes: ['Cm7', 'Cmsus2'],
    examples: [
      {
        artist: 'Metallica',
        song: 'Wherever I May Roam',
        context: 'Riff frigio pesado'
      },
      {
        artist: 'Paco de Lucía',
        song: 'Río Ancho',
        context: 'Frigio flamenco auténtico'
      }
    ],
    exercises: [
      {
        title: 'El intervalo b2',
        description: 'Enfatiza el color frigio.',
        tips: [
          'Sobre Em: F (b2) es la firma',
          'Crea tensión inmediata',
          'Resuelve b2 a la fundamental',
          'Sonido andaluz/español'
        ]
      }
    ]
  },
  {
    id: 'locrian',
    name: 'Locrio',
    formula: '1 b2 b3 4 b5 b6 b7 8',
    notes: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    description: 'El modo más oscuro. Tiene b2 y b5. Inestable y tensional.',
    usage: 'Sobre acordes m7b5. Muy tenso, resuelve rápidamente.',
    chordTypes: ['Cm7b5', 'Cº7'],
    examples: [
      {
        artist: 'Joe Satriani',
        song: 'Midnight',
        context: 'Exploración del modo Locrio'
      }
    ],
    exercises: [
      {
        title: 'La b5 disminuida',
        description: 'Trabaja con la tensión del tritono.',
        tips: [
          'Sobre Bm7b5: F (b5) crea inestabilidad',
          'Modo difícil de dominar',
          'Resuelve rápido a acordes estables',
          'Usa en ii-V menores (Bm7b5-E7-Am)'
        ]
      }
    ]
  },
  {
    id: 'dorian-b2',
    name: 'Dórico b2 (2do modo Menor Melódica)',
    formula: '1 b2 b3 4 5 6 7 8',
    notes: ['C', 'Db', 'Eb', 'F', 'G', 'A', 'B', 'C'],
    description: 'Dórico con b2 y 7ma Mayor. Sonido exótico para sus chords.',
    usage: 'Sobre acordes sus, m7. Color modal único.',
    chordTypes: ['Csus', 'C7sus'],
    examples: [
      {
        artist: 'John Coltrane',
        song: 'Impressions (variaciones)',
        context: 'Exploración modal avanzada'
      }
    ],
    exercises: [
      {
        title: 'Combinación b2 con 7maj',
        description: 'Explora la sonoridad única.',
        tips: [
          'Db (b2) + B (7maj) = tensión especial',
          'Usa sobre acordes suspendidos',
          'Sonido muy moderno y angular',
          'Requiere oído entrenado'
        ]
      }
    ]
  },
  {
    id: 'mixolydian-b6',
    name: 'Mixolidio b6 (5to modo Menor Melódica)',
    formula: '1 2 3 4 5 b6 b7 8',
    notes: ['C', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'C'],
    description: 'Dominante con b6. Color oscuro sobre V7.',
    usage: 'Sobre dominantes que resuelven a menores. Alternativa a alterada.',
    chordTypes: ['C7', 'C7b13'],
    examples: [
      {
        artist: 'McCoy Tyner',
        song: 'The Real McCoy',
        context: 'Dominantes con color b6'
      }
    ],
    exercises: [
      {
        title: 'La b6 en dominantes',
        description: 'Usa b13 (=b6) en resoluciones.',
        tips: [
          'Sobre G7→Cm: usa G Mixo b6',
          'Ab (b6/b13) resuelve a G de Cm',
          'Más suave que Alterada',
          'Perfecto para blues menor'
        ]
      }
    ]
  },
  {
    id: 'augmented-scale',
    name: 'Escala Aumentada',
    formula: '1 #2 3 5 #5 7 8 (simétrica)',
    notes: ['C', 'Eb', 'E', 'G', 'G#', 'B', 'C'],
    description: 'Escala simétrica de 6 notas. Repite cada 4 semitonos. Sonido ambiguo.',
    usage: 'Sobre acordes aumentados y maj7#5. Crea tensión flotante.',
    chordTypes: ['Caug', 'Cmaj7#5'],
    examples: [
      {
        artist: 'Olivier Messiaen',
        song: 'Varias obras',
        context: 'Uso sistemático de escala aumentada'
      }
    ],
    exercises: [
      {
        title: 'Simetría aumentada',
        description: 'Explora la estructura simétrica.',
        tips: [
          'Solo hay 4 escalas aumentadas posibles',
          'Repite cada 3ra Mayor',
          'C-Eb-E-G-G#-B = E-G-G#-B-C-Eb = G#-B-C-Eb-E-G',
          'Usa para outside playing'
        ]
      }
    ]
  }
];
