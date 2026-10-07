export interface ScaleProgressionConnection {
  progressionId: string;
  progressionName: string;
  recommendedScales: {
    chordSymbol: string;
    scaleOptions: {
      scaleId: string;
      scaleName: string;
      priority: 'primary' | 'alternative' | 'advanced';
      notes: string;
      why: string;
      exerciseTip: string;
    }[];
  }[];
  practicalExample: {
    description: string;
    scaleSequence: string;
    listenTo: string;
  };
}

export const scaleProgressionConnections: ScaleProgressionConnection[] = [
  {
    progressionId: 'ii-v-i-major',
    progressionName: 'ii-V-I Mayor',
    recommendedScales: [
      {
        chordSymbol: 'Dm7',
        scaleOptions: [
          {
            scaleId: 'dorian',
            scaleName: 'D Dórico',
            priority: 'primary',
            notes: 'D-E-F-G-A-B-C',
            why: 'La escala estándar para acordes m7. La 6ta Mayor (B) define el sonido Dórico y crea tensión que resuelve bien.',
            exerciseTip: 'Practica arpegios de Dm7 agregando la 9na (E) y 11va (G) en tus líneas'
          },
          {
            scaleId: 'natural-minor',
            scaleName: 'D Menor Natural',
            priority: 'alternative',
            notes: 'D-E-F-G-A-Bb-C',
            why: 'Para un color más oscuro. La b6 (Bb) crea un sonido más melancólico.',
            exerciseTip: 'Usa en baladas o cuando quieras un color más sombrío'
          },
          {
            scaleId: 'bebop-minor',
            scaleName: 'Bebop Menor',
            priority: 'advanced',
            notes: 'D-E-F-F#-G-A-B-C',
            why: 'La 3ra Mayor cromática (F#) permite líneas bebop donde chord tones caen en tiempos fuertes.',
            exerciseTip: 'Practica descendente para que D, B, G, F caigan en beats 1 y 3'
          }
        ]
      },
      {
        chordSymbol: 'G7',
        scaleOptions: [
          {
            scaleId: 'mixolydian',
            scaleName: 'G Mixolidio',
            priority: 'primary',
            notes: 'G-A-B-C-D-E-F',
            why: 'Escala básica para dominantes. Funciona siempre en ii-V-I mayores.',
            exerciseTip: 'Enfatiza el tritono B-F (3ra-b7ma) que crea la tensión dominante'
          },
          {
            scaleId: 'bebop-dominant',
            scaleName: 'Bebop Dominante',
            priority: 'primary',
            notes: 'G-A-B-C-D-E-F-F#',
            why: 'Añade 7ma Mayor cromática para líneas bebop perfectas. Notas del acorde en tiempos fuertes.',
            exerciseTip: 'Desciende: G-F#-F-E-D-C-B-A-G para chord tones en 1 y 3'
          },
          {
            scaleId: 'altered',
            scaleName: 'G Alterada',
            priority: 'advanced',
            notes: 'G-Ab-Bb-Cb-Db-Eb-F',
            why: 'Para color más tenso y moderno. Todas las alteraciones disponibles (b9,#9,b5,#5).',
            exerciseTip: 'Usa solo si quieres máxima tensión. Resuelve cromáticamente a Cmaj7'
          },
          {
            scaleId: 'diminished-hd',
            scaleName: 'Disminuida H-W',
            priority: 'advanced',
            notes: 'G-Ab-Bb-B-C#-D-E-F',
            why: 'Contiene b9, #9, #11 y 13 natural. Muy bebop.',
            exerciseTip: 'Explota la simetría: patterns de 4 notas se repiten cada 3 semitonos'
          }
        ]
      },
      {
        chordSymbol: 'Cmaj7',
        scaleOptions: [
          {
            scaleId: 'major',
            scaleName: 'C Mayor (Jónico)',
            priority: 'primary',
            notes: 'C-D-E-F-G-A-B',
            why: 'La escala básica. Segura y siempre funciona.',
            exerciseTip: 'Practica arpegios de Cmaj7 conectando con notas de escala'
          },
          {
            scaleId: 'lydian',
            scaleName: 'C Lidio',
            priority: 'alternative',
            notes: 'C-D-E-F#-G-A-B',
            why: 'La #11 (F#) añade color sofisticado y moderno. Evita la 4ta (F) que suena avoid.',
            exerciseTip: 'Enfatiza la #11 en tus líneas para sonido contemporáneo'
          },
          {
            scaleId: 'bebop-major',
            scaleName: 'Bebop Mayor',
            priority: 'advanced',
            notes: 'C-D-E-F-G-G#-A-B',
            why: '#5 cromática entre 5 y 6 para líneas bebop fluidas.',
            exerciseTip: 'Descendente: B-A-G#-G-F-E-D-C con chord tones en beats fuertes'
          }
        ]
      }
    ],
    practicalExample: {
      description: 'Una línea típica sobre ii-V-I combinando las escalas recomendadas',
      scaleSequence: 'D Dórico (Dm7) → G Bebop Dom (G7) → C Lidio (Cmaj7)',
      listenTo: 'Escucha "Autumn Leaves" de Bill Evans para ejemplos de esta combinación'
    }
  },
  {
    progressionId: 'ii-v-i-minor',
    progressionName: 'ii-V-i Menor',
    recommendedScales: [
      {
        chordSymbol: 'Dm7b5',
        scaleOptions: [
          {
            scaleId: 'locrian',
            scaleName: 'D Locrio',
            priority: 'primary',
            notes: 'D-Eb-F-G-Ab-Bb-C',
            why: 'La escala más común para m7b5. La b2 y b5 crean la tensión característica.',
            exerciseTip: 'Resuelve rápido - el Locrio es inestable. Enfatiza la b5 (Ab)'
          },
          {
            scaleId: 'locrian-#2',
            scaleName: 'Locrio #2',
            priority: 'alternative',
            notes: 'D-E-F-G-Ab-Bb-C',
            why: 'Mismo que Locrio pero con 9na Mayor (E) en vez de b9. Menos tenso.',
            exerciseTip: 'Mejor para ii-V menores más suaves o baladas'
          }
        ]
      },
      {
        chordSymbol: 'G7alt',
        scaleOptions: [
          {
            scaleId: 'altered',
            scaleName: 'G Alterada',
            priority: 'primary',
            notes: 'G-Ab-Bb-Cb-Db-Eb-F',
            why: 'LA escala para dominantes alterados. Contiene todas las alteraciones.',
            exerciseTip: 'Piénsala como Ab menor melódica - más fácil de visualizar'
          },
          {
            scaleId: 'diminished-hd',
            scaleName: 'Disminuida H-W',
            priority: 'alternative',
            notes: 'G-Ab-Bb-B-C#-D-E-F',
            why: 'Alternativa con 13 natural. Si el contexto permite, añade variedad.',
            exerciseTip: 'Alterna con Alterada para no sonar repetitivo'
          },
          {
            scaleId: 'harmonic-minor',
            scaleName: 'C Armónica Menor (modo 5)',
            priority: 'alternative',
            notes: 'G-Ab-B-C-D-Eb-F',
            why: 'Frigio Dominante sobre G7. Color español/exótico con b9 y b13.',
            exerciseTip: 'Usa cuando quieras color étnico o dramático'
          }
        ]
      },
      {
        chordSymbol: 'Cm7',
        scaleOptions: [
          {
            scaleId: 'dorian',
            scaleName: 'C Dórico',
            priority: 'primary',
            notes: 'C-D-Eb-F-G-A-Bb',
            why: 'Escala estándar para m7. La 13 natural (A) es clave.',
            exerciseTip: 'Enfatiza la 9na (D) y 13 (A) para sonido moderno'
          },
          {
            scaleId: 'natural-minor',
            scaleName: 'C Menor Natural',
            priority: 'alternative',
            notes: 'C-D-Eb-F-G-Ab-Bb',
            why: 'Para color más oscuro con b13 (Ab). Más melancólico.',
            exerciseTip: 'Usa en temas oscuros o dramáticos'
          },
          {
            scaleId: 'melodic-minor',
            scaleName: 'C Menor Melódica',
            priority: 'advanced',
            notes: 'C-D-Eb-F-G-A-B',
            why: 'Con 7ma Mayor para sonido sofisticado. Resuelve internamente.',
            exerciseTip: 'Crea líneas que enfaticen la 7ma Mayor (B) antes de resolver'
          }
        ]
      }
    ],
    practicalExample: {
      description: 'Línea típica sobre ii-V-i menor con máxima tensión',
      scaleSequence: 'D Locrio (Dm7b5) → G Alterada (G7alt) → C Dórico (Cm7)',
      listenTo: 'John Coltrane en "Impressions" usa estas escalas extensivamente'
    }
  },
  {
    progressionId: 'blues-jazz',
    progressionName: 'Blues de Jazz',
    recommendedScales: [
      {
        chordSymbol: 'F7 (I7)',
        scaleOptions: [
          {
            scaleId: 'blues-scale',
            scaleName: 'F Blues',
            priority: 'primary',
            notes: 'F-Ab-Bb-Cb-C-Eb',
            why: 'LA escala de blues. La blue note (Cb/B) es esencial.',
            exerciseTip: 'Bends y vibrato en la b5. Mezcla con F Mayor pentatónica'
          },
          {
            scaleId: 'mixolydian',
            scaleName: 'F Mixolidio',
            priority: 'primary',
            notes: 'F-G-A-Bb-C-D-Eb',
            why: 'Para líneas más jazzísticas sobre el dominante.',
            exerciseTip: 'Alterna entre blues y mixolidio para variety'
          },
          {
            scaleId: 'bebop-dominant',
            scaleName: 'Bebop Dominante',
            priority: 'advanced',
            notes: 'F-G-A-Bb-C-D-Eb-E',
            why: 'Para fraseo bebop sobre blues. Charlie Parker style.',
            exerciseTip: 'Desciende la escala para chord tones en tiempos fuertes'
          }
        ]
      },
      {
        chordSymbol: 'Bb7 (IV7)',
        scaleOptions: [
          {
            scaleId: 'mixolydian',
            scaleName: 'Bb Mixolidio',
            priority: 'primary',
            notes: 'Bb-C-D-Eb-F-G-Ab',
            why: 'Estándar para el IV7 en blues.',
            exerciseTip: 'Puedes usar F blues sobre todo el blues (one scale approach)'
          },
          {
            scaleId: 'blues-scale',
            scaleName: 'Bb Blues',
            priority: 'alternative',
            notes: 'Bb-Db-Eb-Fb-F-Ab',
            why: 'Para mantener el color blues sobre el IV.',
            exerciseTip: 'Mezcla Bb blues con F blues para líneas interesantes'
          }
        ]
      }
    ],
    practicalExample: {
      description: 'Aproximación típica de blues-jazz mixing pentatónicas',
      scaleSequence: 'F blues sobre todo + cambios específicos en IV7 y V7',
      listenTo: 'Charlie Parker "Blues for Alice" - mezcla perfecta de blues y bebop'
    }
  },
  {
    progressionId: 'coltrane-changes',
    progressionName: 'Coltrane Changes',
    recommendedScales: [
      {
        chordSymbol: 'Cmaj7',
        scaleOptions: [
          {
            scaleId: 'lydian',
            scaleName: 'C Lidio',
            priority: 'primary',
            notes: 'C-D-E-F#-G-A-B',
            why: 'Lidio es perfecto para los cambios rápidos de Coltrane. Evita avoid notes.',
            exerciseTip: 'En Giant Steps todo pasa rápido - piensa en arpegios + escala'
          },
          {
            scaleId: 'major',
            scaleName: 'C Mayor',
            priority: 'alternative',
            notes: 'C-D-E-F-G-A-B',
            why: 'También funciona, pero ten cuidado con la 4ta justa.',
            exerciseTip: 'Usa la 4ta (F) como passing tone, no como nota de descanso'
          }
        ]
      },
      {
        chordSymbol: 'Ebmaj7',
        scaleOptions: [
          {
            scaleId: 'lydian',
            scaleName: 'Eb Lidio',
            priority: 'primary',
            notes: 'Eb-F-G-A-Bb-C-D',
            why: 'Consistencia con los otros acordes mayores - todos Lidios.',
            exerciseTip: 'Practica patterns que conecten C-Eb-Ab-C cromáticamente'
          }
        ]
      }
    ],
    practicalExample: {
      description: 'Estrategia de Giant Steps: arpegios como esqueleto, escalas para conectar',
      scaleSequence: 'Arpegio de Cmaj7 → Escala C Lidia → Arpegio Ebmaj7 → Eb Lidia...',
      listenTo: 'Análisis de Giant Steps por John Coltrane - el blueprint definitivo'
    }
  },
  {
    progressionId: 'modal-vamp',
    progressionName: 'Vamp Modal (Dórico)',
    recommendedScales: [
      {
        chordSymbol: 'Em7 (modal)',
        scaleOptions: [
          {
            scaleId: 'dorian',
            scaleName: 'E Dórico',
            priority: 'primary',
            notes: 'E-F#-G-A-B-C#-D',
            why: 'LA escala para "So What". Define el sonido modal.',
            exerciseTip: 'Piensa en toda la sección como una sola escala, no acordes cambiantes'
          },
          {
            scaleId: 'blues-scale',
            scaleName: 'E Blues Menor',
            priority: 'alternative',
            notes: 'E-G-A-Bb-B-D',
            why: 'Para añadir color blues al modal. Miles lo hacía.',
            exerciseTip: 'Mezcla blues con Dórico para variety dentro del vamp'
          },
          {
            scaleId: 'melodic-minor',
            scaleName: 'E Menor Melódica',
            priority: 'advanced',
            notes: 'E-F#-G-A-B-C#-D#',
            why: 'Para momentos de máxima tensión. La 7ma Mayor (D#) es disonante.',
            exerciseTip: 'Usa sparingly para climax - luego vuelve a Dórico'
          }
        ]
      }
    ],
    practicalExample: {
      description: 'Aproximación modal: desarrolla motivos sobre una sola escala',
      scaleSequence: 'E Dórico como base + toques de E blues para color',
      listenTo: 'Miles Davis "So What" - el ejemplo definitivo de Dórico modal'
    }
  }
];

export const scaleConnectionExercises = [
  {
    title: 'Ejercicio 1: Escala por Acorde',
    description: 'Practica cambiar de escala en cada cambio de acorde',
    steps: [
      'Elige una progresión (empezar con ii-V-I)',
      'Toca la escala apropiada para cada acorde (2 octavas)',
      'Sin parar entre acordes - transición suave',
      'Aumenta tempo gradualmente: 60→80→100→120 BPM',
      'Cuando domines, improvisa usando solo esas escalas'
    ],
    difficulty: 'beginner'
  },
  {
    title: 'Ejercicio 2: Guía de Arpegios + Escalas',
    description: 'Combina arpegios como esqueleto con escalas para conectar',
    steps: [
      'Sobre ii-V-I: toca arpegio del acorde en tiempos 1-2',
      'Usa la escala para conectar al siguiente acorde en tiempos 3-4',
      'Ejemplo: Dm7 arpegio (D-F-A-C) → escala de paso → G7 arpegio',
      'Practica en todas las tonalidades',
      'Grábate y evalúa si suena musical'
    ],
    difficulty: 'intermediate'
  },
  {
    title: 'Ejercicio 3: Escala Primaria vs Alternativa',
    description: 'Compara el sonido de diferentes escalas sobre el mismo acorde',
    steps: [
      'Toca Dm7 con D Dórico - escucha el color',
      'Ahora toca Dm7 con D Menor Natural - diferente?',
      'Intenta D Bebop Menor sobre Dm7',
      'Improvisa alternando entre las escalas',
      'Decide cuándo usar cada una según el contexto'
    ],
    difficulty: 'intermediate'
  },
  {
    title: 'Ejercicio 4: Coltrane Changes Workout',
    description: 'Domina los cambios de terceras mayores',
    steps: [
      'Cmaj7 (4 beats): arpegio + C Lidio',
      'Ebmaj7 (4 beats): arpegio + Eb Lidio',
      'Abmaj7 (4 beats): arpegio + Ab Lidio',
      'Vuelve a Cmaj7',
      'Practica el ciclo completo lentamente (60 BPM)',
      'Incrementa tempo: 80, 100, 120, 150 BPM',
      'Meta final: 200+ BPM (tempo de Giant Steps)'
    ],
    difficulty: 'advanced'
  },
  {
    title: 'Ejercicio 5: One Scale Approach',
    description: 'Usa una escala sobre múltiples acordes (blues approach)',
    steps: [
      'Blues en F: usa F blues sobre TODOS los acordes',
      'Ahora prueba F mixolidio sobre todo',
      'Compara ambos approaches',
      'Finalmente mezcla: blues en I y IV, mixolidio en V',
      'Esta es la aproximación tradicional de blues-jazz'
    ],
    difficulty: 'beginner'
  },
  {
    title: 'Ejercicio 6: Escala → Pentatónica Derivada',
    description: 'Extrae pentatónicas de las escalas para simplificar',
    steps: [
      'D Dórico: extrae D menor pentatónica (D-F-G-A-C)',
      'También G Mayor pentatónica (G-A-B-D-E) está en D Dórico',
      'Practica alternar entre la escala completa y pentatónicas',
      'Las pentatónicas son más "seguras" para improvisar',
      'Usa escala completa para conectar, pentatónicas para frases'
    ],
    difficulty: 'intermediate'
  }
];

export const practicalTips = [
  {
    category: 'Estrategia General',
    tip: 'No necesitas cambiar de escala en cada acorde. En modal jazz, una escala puede funcionar durante toda una sección.',
    example: 'So What usa D Dórico durante 16 compases completos'
  },
  {
    category: 'Escalas de Paso',
    tip: 'Usa escalas cromáticas o disminuidas para conectar entre acordes sin confusión',
    example: 'Entre Cmaj7 y Dm7, puedes usar cromatismo para el movimiento C→D'
  },
  {
    category: 'Simplificación',
    tip: 'Si una progresión es muy compleja, simplifica a pentatónicas primero',
    example: 'Giant Steps: usa pentatónicas mayores de cada acorde maj7'
  },
  {
    category: 'Mixing Scales',
    tip: 'Los mejores improvisadores mezclan múltiples escalas/approaches en el mismo solo',
    example: 'Charlie Parker mezclaba blues, bebop, arpegios y cromatismo constantemente'
  },
  {
    category: 'Oído Primero',
    tip: 'Escucha la progresión primero, canta lo que quieres tocar, LUEGO encuentra las escalas',
    example: 'No pienses "necesito Dórico aquí" - piensa "quiero este sonido" y usa la escala apropiada'
  }
];
