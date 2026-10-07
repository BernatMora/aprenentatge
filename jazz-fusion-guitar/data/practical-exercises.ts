export interface PracticalExercise {
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
}

export const practicalExercises: PracticalExercise[] = [
  {
    id: 'voice-leading-workout',
    title: 'Voice Leading en ii-V-I',
    category: 'harmony',
    level: 'intermediate',
    duration: 20,
    goal: 'Dominar el movimiento suave entre acordes usando voice leading cromático',
    setup: [
      'Backing track de ii-V-I en C (o cualquier tonalidad)',
      'Metrónomo a 80 BPM',
      'Conocimiento de arpegios de 7ma'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca solo las guide tones (3ra y 7ma) de cada acorde',
        duration: 5,
        tempo: '80 BPM',
        tips: [
          'Dm7: F (3ra) → C (7ma)',
          'G7: B (3ra) → F (7ma)',
          'Cmaj7: E (3ra) → B (7ma)',
          'Observa: C→B (medio tono), F→F (común), B→C (medio tono), E→F (medio tono)'
        ]
      },
      {
        step: 2,
        instruction: 'Añade aproximaciones cromáticas a las guide tones',
        duration: 5,
        tips: [
          'Dm7: E→F (aprox. cromática a 3ra)',
          'G7: Bb→B (aprox. cromática a 3ra)',
          'Cmaj7: Eb→E (aprox. cromática a 3ra)',
          'Esto crea líneas muy cromáticas y fluidas'
        ]
      },
      {
        step: 3,
        instruction: 'Improvisa enfatizando guide tones en tiempos 1 y 3',
        duration: 10,
        tips: [
          'Las guide tones SIEMPRE en beats fuertes',
          'Usa aproximaciones en beats débiles',
          'Conecta con cromatismo o escalas',
          'Grábate y verifica que guide tones destacan'
        ]
      }
    ],
    progression: 'Dm7 - G7 - Cmaj7',
    evaluation: [
      '¿Puedo escuchar claramente los cambios de acordes?',
      '¿Las guide tones caen en beats fuertes?',
      '¿El movimiento entre acordes es suave?',
      '¿Suena bebop/jazz?'
    ],
    nextSteps: 'Aplica esta técnica a standards: Autumn Leaves, All The Things You Are, etc.'
  },
  {
    id: 'pentatonic-superimposition',
    title: 'Superposición de Pentatónicas',
    category: 'melody',
    level: 'advanced',
    duration: 25,
    goal: 'Crear sonidos outside controlados usando pentatónicas "incorrectas"',
    setup: [
      'Backing track de Cmaj7 vamp',
      'Conocimiento de pentatónicas en todas las posiciones',
      'Metrónomo opcional: 100 BPM'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca pentatónica "correcta": C Mayor (C-D-E-G-A)',
        duration: 5,
        tips: [
          'Esto es inside - suena bien',
          'Familiarízate con el sonido "seguro"',
          'Practica en diferentes posiciones'
        ]
      },
      {
        step: 2,
        instruction: 'Ahora D Mayor pentatónica sobre Cmaj7 (D-E-F#-A-B)',
        duration: 5,
        tips: [
          'F# es #11 de C - suena Lidio',
          'Esto es inside pero con color sofisticado',
          'Muy usado en jazz moderno'
        ]
      },
      {
        step: 3,
        instruction: 'Prueba Db Mayor pentatónica (Db-Eb-F-Ab-Bb)',
        duration: 5,
        tips: [
          'TODAS las notas son outside de Cmaj7',
          'Suena super tenso - pero controlado',
          'Úsalo brevemente, luego resuelve a C Mayor pent'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa alternando: C Mayor pent (inside) → pentatónica outside → resolve',
        duration: 10,
        tips: [
          'Formula: 4 beats inside → 2 beats outside → 2 beats resolving',
          'Opciones outside: Db, Eb, F#, Ab Mayor pentatónicas',
          'SIEMPRE resuelve de vuelta a inside',
          'Esto crea tensión y release controlados'
        ]
      }
    ],
    progression: 'Cmaj7 (vamp)',
    evaluation: [
      '¿Puedo controlar cuándo estoy inside vs outside?',
      '¿Mis resoluciones son claras y musicales?',
      '¿Uso el outside para crear tensión intencional?',
      '¿Suena caótico o controlado?'
    ],
    nextSteps: 'Aplica esta técnica en ii-V-I: usa pentatónicas outside en V7, resuelve en I'
  },
  {
    id: 'rhythmic-displacement',
    title: 'Desplazamiento Rítmico',
    category: 'rhythm',
    level: 'intermediate',
    duration: 15,
    goal: 'Crear interés rítmico desplazando patrones melódicos',
    setup: [
      'Metrónomo a 80 BPM con clicks en 2 y 4',
      'Backing track simple de Dm7 vamp',
      'Patrón melódico simple (ej: D-E-F-G)'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca patrón D-E-F-G empezando en beat 1',
        duration: 3,
        tempo: '80 BPM',
        tips: [
          'Toca en corcheas: D(1) E(&) F(2) G(&)',
          'Esto está "en el beat" - predecible',
          'Repite hasta que sea natural'
        ]
      },
      {
        step: 2,
        instruction: 'Ahora empieza el mismo patrón en el & de 1',
        duration: 3,
        tips: [
          'D(&1) E(2) F(&2) G(3)',
          'El patrón está desplazado medio beat',
          'Suena más interesante pero es el MISMO patrón'
        ]
      },
      {
        step: 3,
        instruction: 'Varía el punto de inicio: beat 1, &1, 2, &2, 3, &3, 4, &4',
        duration: 5,
        tips: [
          'Mismo patrón melódico, 8 posiciones rítmicas diferentes',
          'Cada una crea un feeling distinto',
          'Algunos puntos suenan más tensos que otros'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando desplazamiento intencional',
        duration: 4,
        tips: [
          'Toca una frase en el beat',
          'Repítela desplazada',
          'Esto crea conversación interna',
          'Técnica avanzada: desplazamiento de frases completas'
        ]
      }
    ],
    progression: 'Dm7 (vamp)',
    evaluation: [
      '¿Puedo mantener el tiempo mientras desplazo?',
      '¿El desplazamiento suena intencional?',
      '¿Uso el desplazamiento para crear interés?'
    ],
    nextSteps: 'Aplica desplazamiento a licks conocidos - los transforma completamente'
  },
  {
    id: 'target-note-control',
    title: 'Control de Target Notes',
    category: 'melody',
    level: 'beginner',
    duration: 15,
    goal: 'Colocar chord tones en tiempos fuertes de forma consistente',
    setup: [
      'Backing track de ii-V-I en cualquier tonalidad',
      'Metrónomo a 60-80 BPM',
      'Conocimiento de arpegios básicos'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Identifica las chord tones de cada acorde',
        duration: 2,
        tips: [
          'Dm7: D-F-A-C',
          'G7: G-B-D-F',
          'Cmaj7: C-E-G-B',
          'Estas son tus targets'
        ]
      },
      {
        step: 2,
        instruction: 'Toca solo chord tones en beats 1 y 3',
        duration: 5,
        tempo: '60 BPM',
        tips: [
          'Beat 1: chord tone, Beat 3: otra chord tone',
          'Beats 2 y 4: silencio o notas de paso',
          'Esto garantiza que "suene el acorde"'
        ]
      },
      {
        step: 3,
        instruction: 'Llena beats 2 y 4 con approach notes o passing tones',
        duration: 4,
        tips: [
          'Beat 1: D (root), Beat 2: E (approach), Beat 3: F (3rd)',
          'Las notas "extra" conectan las chord tones',
          'Pero el peso sigue en 1 y 3'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa con la regla: chord tones en 1 y 3',
        duration: 4,
        tips: [
          'Libertad total EXCEPTO beats 1 y 3',
          'Ahí DEBES tocar chord tones',
          'Esto es la base del bebop'
        ]
      }
    ],
    progression: 'Dm7 - G7 - Cmaj7',
    evaluation: [
      '¿Cada beat 1 y 3 tiene una chord tone?',
      '¿Se escucha claramente la progresión?',
      '¿Suena musical o mecánico?'
    ],
    nextSteps: 'Cuando domines 1 y 3, intenta colocar guide tones (3ra y 7ma) específicamente'
  },
  {
    id: 'motific-development',
    title: 'Desarrollo Motívico',
    category: 'melody',
    level: 'intermediate',
    duration: 20,
    goal: 'Desarrollar un motivo simple en un solo completo',
    setup: [
      'Backing track modal (ej: Dm7 vamp)',
      'Tempo medium: 100-120 BPM',
      'Mentalidad de "menos es más"'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Crea un motivo de 3-4 notas simple',
        duration: 2,
        tips: [
          'Ejemplo: D-E-F-A',
          'DEBE ser memorable y simple',
          'No más de 4 notas',
          'Asegúrate que tenga un ritmo interesante'
        ]
      },
      {
        step: 2,
        instruction: 'Repite el motivo exactamente 3 veces',
        duration: 3,
        tips: [
          'Sin cambios - repetición literal',
          'Esto establece el motivo en el oído',
          'La audiencia ahora "conoce" tu idea'
        ]
      },
      {
        step: 3,
        instruction: 'Varía el motivo usando estas técnicas',
        duration: 10,
        tips: [
          'Transposición: mueve a otra altura (D-E-F-A → A-B-C-E)',
          'Inversión: voltea las direcciones (D↑E↑F↑A → D↓C↓Bb↓F)',
          'Aumentación: hazlo más lento (corcheas → negras)',
          'Diminución: hazlo más rápido (negras → corcheas)',
          'Fragmentación: usa solo parte del motivo (D-E-F)',
          'Expansión: añade notas entre las existentes'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa un solo de 2 minutos usando SOLO este motivo y variaciones',
        duration: 5,
        tips: [
          'No introduzcas nuevo material',
          'Desarrolla el motivo original de todas las formas posibles',
          'Esto es como Sonny Rollins improvisaba'
        ]
      }
    ],
    progression: 'Dm7 (modal vamp) o cualquier progresión simple',
    evaluation: [
      '¿Mi solo suena cohesivo?',
      '¿Puedo escuchar el motivo original en las variaciones?',
      '¿He desarrollado el material o solo improvisé random?',
      '¿Suena como una historia o conversación?'
    ],
    nextSteps: 'Analiza solos de Sonny Rollins - maestro del desarrollo motívico'
  },
  {
    id: 'call-and-response',
    title: 'Call and Response',
    category: 'integration',
    level: 'beginner',
    duration: 15,
    goal: 'Crear conversación musical entre frases',
    setup: [
      'Backing track de blues o ii-V-I',
      'Metrónomo a tempo comfortable',
      'Mentalidad de "espacio es música"'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca una frase de 2 compases (call)',
        duration: 3,
        tips: [
          'Mantén simple - 4-6 notas',
          'Termina en una nota que "pide" resolución',
          'No llenes todos los espacios'
        ]
      },
      {
        step: 2,
        instruction: 'SILENCIO durante 2 compases',
        duration: 3,
        tips: [
          'No toques nada',
          'Escucha el silencio',
          'Piensa qué vas a "responder"',
          'Este espacio es crucial'
        ]
      },
      {
        step: 3,
        instruction: 'Toca una respuesta de 2 compases (response)',
        duration: 3,
        tips: [
          'Debe relacionarse con el call',
          'Puede ser una variación del call',
          'O puede contrastarlo',
          'Debe sentirse como "respuesta"'
        ]
      },
      {
        step: 4,
        instruction: 'Practica call-and-response durante 8 chorus',
        duration: 6,
        tips: [
          'Call (2 bars) → Silencio (2 bars) → Response (2 bars) → Silencio (2 bars)',
          'Esto es blues clásico',
          'Graba y escucha si suena conversacional'
        ]
      }
    ],
    progression: 'Blues en cualquier tonalidad',
    evaluation: [
      '¿Dejé suficiente espacio?',
      '¿Las respuestas se relacionan con los calls?',
      '¿Suena como una conversación?',
      '¿O solo una serie de frases random?'
    ],
    nextSteps: 'Trading 4s con otros músicos - call and response en tiempo real'
  },
  {
    id: 'chromaticism-integration',
    title: 'Integración de Cromatismo',
    category: 'technique',
    level: 'intermediate',
    duration: 20,
    goal: 'Usar cromatismo como herramienta expresiva, no como error',
    setup: [
      'Backing track de standards (ej: Autumn Leaves)',
      'Tempo medium: 120 BPM',
      'Conocimiento de approach notes'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Improvisa solo diatónico (inside) durante 1 chorus',
        duration: 4,
        tips: [
          'Solo notas de la escala correspondiente',
          'Sin cromatismo',
          'Establece el centro tonal',
          'Este es tu "home base"'
        ]
      },
      {
        step: 2,
        instruction: 'Añade aproximaciones cromáticas SOLO a chord tones',
        duration: 5,
        tips: [
          'Approach desde medio tono arriba o abajo',
          'Target siempre una chord tone',
          'El cromatismo es intencional, no random',
          'Ejemplo: Eb→E (3ra de Cmaj7)'
        ]
      },
      {
        step: 3,
        instruction: 'Usa enclosures cromáticos en beats débiles',
        duration: 5,
        tips: [
          'Beat 1: chord tone, Beat &1-2: enclosure, Beat &2: target',
          'G(1) → Ab-F#(enclosure) → G(3)',
          'Esto mantiene el centro pero añade color'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa integrando todas las técnicas cromáticas',
        duration: 6,
        tips: [
          'Base diatónica + aproximaciones + enclosures + passing chromaticism',
          'El cromatismo embellece, no reemplaza la base armónica',
          'Siempre resuelve a inside',
          'Grábate: debe sonar jazz, no caótico'
        ]
      }
    ],
    progression: 'Autumn Leaves o cualquier standard',
    evaluation: [
      '¿El cromatismo suena intencional?',
      '¿Mantengo el centro tonal?',
      '¿Resuelvo las tensiones cromáticas?',
      '¿Suena bebop/jazz profesional?'
    ],
    nextSteps: 'Transcribe 8 compases de Charlie Parker - analiza su uso de cromatismo'
  },
  {
    id: 'blues-mixing',
    title: 'Mezcla Blues-Jazz',
    category: 'integration',
    level: 'intermediate',
    duration: 20,
    goal: 'Combinar vocabulario blues con vocabulario bebop',
    setup: [
      'Backing track de blues en F',
      'Tempo medium swing: 120-140 BPM',
      'Conocimiento de pentatónica blues y bebop scales'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Primer chorus: solo F blues pentatónica',
        duration: 4,
        tips: [
          'F-Ab-Bb-Cb-C-Eb',
          'Enfatiza la blue note (Cb/B)',
          'Bends y vibrato',
          'Este es puro blues'
        ]
      },
      {
        step: 2,
        instruction: 'Segundo chorus: cambios específicos (F7, Bb7, C7)',
        duration: 4,
        tips: [
          'F7: F mixolidio o bebop dom',
          'Bb7: Bb mixolidio',
          'C7: C mixolidio o alterado',
          'Esto es puro jazz'
        ]
      },
      {
        step: 3,
        instruction: 'Tercer chorus: MEZCLA ambos approaches',
        duration: 5,
        tips: [
          'Compases 1-4: blues pentatónica',
          'Compases 5-6 (cambio a Bb7): bebop scales',
          'Compases 7-8: blues de nuevo',
          'Compases 9-10 (turnaround): jazz changes',
          'Compases 11-12: blues'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa 5 chorus mezclando libremente',
        duration: 7,
        tips: [
          'No hay reglas - mezcla según sientas',
          'Alterna entre "sentir blues" y "cambios jazz"',
          'Esto es lo que hacen Grant Green, Kenny Burrell',
          'Graba y escucha: debe sonar orgánico, no forzado'
        ]
      }
    ],
    progression: 'Blues en F (o cualquier tonalidad)',
    evaluation: [
      '¿Puedo alternar entre blues y jazz fluidamente?',
      '¿Ambos vocabularios se sienten naturales?',
      '¿La mezcla suena cohesiva o desarticulada?'
    ],
    nextSteps: 'Escucha "Blues for Alice" de Charlie Parker - blueprint perfecto'
  },
  {
    id: 'dynamics-expression',
    title: 'Dinámica y Expresión',
    category: 'integration',
    level: 'beginner',
    duration: 15,
    goal: 'Usar volumen y articulación como herramientas expresivas',
    setup: [
      'Backing track de balada',
      'Sin metrónomo - timing flexible',
      'Mentalidad de "cantar con el instrumento"'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Improvisa un chorus en fortissimo (muy fuerte)',
        duration: 3,
        tips: [
          'Máximo volumen en todas las notas',
          'Escucha cómo suena',
          'Probablemente agresivo, sin matices'
        ]
      },
      {
        step: 2,
        instruction: 'Ahora en pianissimo (muy suave)',
        duration: 3,
        tips: [
          'Mínimo volumen',
          'Íntimo y delicado',
          'Probablemente monótono si todo es igual'
        ]
      },
      {
        step: 3,
        instruction: 'Improvisa con MÁXIMO rango dinámico',
        duration: 5,
        tips: [
          'Empieza pp, crece a ff, baja a pp',
          'Usa crescendos y decrescendos dentro de frases',
          'Notas individuales: variar volumen',
          'Esto crea drama y emoción'
        ]
      },
      {
        step: 4,
        instruction: 'Añade articulación variada',
        duration: 4,
        tips: [
          'Legato (suave y conectado)',
          'Staccato (corto y separado)',
          'Acentos en notas específicas',
          'Vibrato en notas largas',
          'Combina con dinámica para máxima expresión'
        ]
      }
    ],
    progression: 'Balada lenta (ej: Body and Soul, Misty)',
    evaluation: [
      '¿Uso el rango dinámico completo?',
      '¿Varía mi articulación?',
      '¿Suena más expresivo que antes?',
      '¿Transmito emoción?'
    ],
    nextSteps: 'Escucha baladas de Bill Evans - maestro de dinámica y touch'
  },
  {
    id: 'metric-modulation',
    title: 'Modulación Métrica',
    category: 'rhythm',
    level: 'advanced',
    duration: 25,
    goal: 'Dominar cambios de tempo percibido manteniendo el pulso constante',
    setup: [
      'Metrónomo a 120 BPM con subdivision visual',
      'Grabadora para análisis',
      'Comprensión sólida de subdivisiones (corcheas, tresillos, semicorcheas)'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Establece el tempo base en corcheas a 120 BPM',
        duration: 5,
        tempo: '120 BPM',
        tips: [
          'Toca frases en corcheas regulares',
          'Siente el pulse de negra = 120',
          'Este es tu tempo "home base"',
          'Mantén esto estable durante 2 minutos'
        ]
      },
      {
        step: 2,
        instruction: 'Cambia a tresillos, luego haz que el tresillo = nueva corchea',
        duration: 8,
        tips: [
          'Paso 1: Toca tresillos a 120 BPM',
          'Paso 2: Ahora cada TRESILLO es una nueva corchea',
          'Resultado: has pasado a 180 BPM sin cambiar el metrónomo',
          'Formula: 120 × (3/2) = 180',
          'Practica el switch: corcheas → tresillos → nueva velocidad'
        ]
      },
      {
        step: 3,
        instruction: 'Modula de semicorcheas a corcheas',
        duration: 7,
        tips: [
          'Toca semicorcheas a 120 BPM',
          'Ahora cada SEMICORCHEA = nueva corchea',
          'Has pasado a 240 BPM (120 × 2)',
          'Esto crea sensación de "doble tiempo"',
          'Luego vuelve al tempo original'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando modulación métrica como herramienta expresiva',
        duration: 5,
        tips: [
          'Empieza a tempo normal',
          'Modula a tempo más rápido en momentos de tensión',
          'Vuelve al tempo original para resolución',
          'Esto es usado por Pat Metheny, Chick Corea',
          'Debe sentirse intencional, no como perder el tiempo'
        ]
      }
    ],
    progression: 'Cualquier progresión modal o vamp',
    evaluation: [
      '¿Puedo mantener el pulse original mientras modulo?',
      '¿Las modulaciones son limpias y precisas?',
      '¿Uso la modulación musicalmente, no solo técnicamente?',
      '¿Puedo volver al tempo original sin perdida?'
    ],
    nextSteps: 'Estudia "The Unity Band" de Pat Metheny - maestro de modulación métrica'
  },
  {
    id: 'reharmonization-real-time',
    title: 'Reharmonización en Tiempo Real',
    category: 'harmony',
    level: 'advanced',
    duration: 30,
    goal: 'Crear reharmonizaciones instantáneas mientras improvises',
    setup: [
      'Backing track de standard conocido (ej: All The Things You Are)',
      'Tempo medium: 140 BPM',
      'Conocimiento profundo de sustituciones tritono y acordes secundarios'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Improvisa 1 chorus tocando los cambios originales exactamente',
        duration: 5,
        tips: [
          'Sigue la armonía del standard',
          'Toca guide tones para confirmar armonía',
          'Este es tu punto de referencia',
          'Debe sonar "correcto" y familiar'
        ]
      },
      {
        step: 2,
        instruction: 'Sustituye SOLO dominantes con tritone subs',
        duration: 7,
        tips: [
          'Cada V7 → bII7 (tritone substitute)',
          'Ejemplo: G7 → Db7 sobre Cmaj7',
          'Toca las guide tones del sustituto',
          'Tu oído debe ajustarse a la nueva armonía',
          'Mantenlo consistente durante todo el chorus'
        ]
      },
      {
        step: 3,
        instruction: 'Añade acordes secundarios (dominantes secundarios)',
        duration: 8,
        tips: [
          'Antes de cada acorde, añade su V7',
          'Ejemplo: Cmaj7 → Gmaj7 se convierte en Cmaj7 → D7 → Gmaj7',
          'Esto "crea" cambios extras',
          'Combina con tritone subs para máxima densidad armónica',
          'Formula: cualquier acorde puede ser precedido por su V7'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa reharmonizando libremente en tiempo real',
        duration: 10,
        tips: [
          'Usa todas las herramientas: tritone subs, secundarios, acordes passing',
          'Reharmoniza diferente cada vez que pasa la progresión',
          'Mantén la estructura del standard pero cambia armonía',
          'Esto es nivel avanzado de Bill Evans, Herbie Hancock',
          'Graba: debe sonar coherente, no caótico'
        ]
      }
    ],
    progression: 'Any standard jazz (All The Things, Stella, Cherokee)',
    evaluation: [
      '¿Mis reharmonizaciones son consistentes?',
      '¿Suena más interesante que los cambios originales?',
      '¿Mantengo la estructura del tune?',
      '¿Las sustituciones son musicales y lógicas?'
    ],
    nextSteps: 'Transcribe reharmonizaciones de Bill Evans en "Waltz for Debby" album'
  },
  {
    id: 'multi-octave-sequences',
    title: 'Secuencias Multi-Octava',
    category: 'melody',
    level: 'advanced',
    duration: 25,
    goal: 'Crear líneas que abarquen todo el rango del instrumento fluidamente',
    setup: [
      'Backing track de ii-V-I en varias tonalidades',
      'Tempo medium: 140 BPM',
      'Conocimiento del diapasón en todas las posiciones'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca un arpegio de Dm7 en 3 octavas ascendente',
        duration: 5,
        tips: [
          'Empieza desde el D más grave posible',
          'Sube hasta el D más agudo',
          'Mantén el timing uniforme',
          'Debes conocer las digitaciones en todas las posiciones',
          'Practica en todas las tonalidades'
        ]
      },
      {
        step: 2,
        instruction: 'Crea secuencias que crucen octavas usando patrones',
        duration: 8,
        tips: [
          'Patrón: toca 4 notas arriba, salta octava abajo, repite',
          'Ejemplo: D-F-A-C (octava 1) → D-F-A-C (octava 2) → D-F-A-C (octava 3)',
          'Otro patrón: zigzag entre octavas',
          'Esto crea textura rica y movimiento dramático',
          'Usado extensivamente por Michael Brecker'
        ]
      },
      {
        step: 3,
        instruction: 'Practica "registral expansion" - expansión de registro',
        duration: 7,
        tips: [
          'Empieza en registro medio',
          'Cada frase va ligeramente más aguda o más grave',
          'Construye tensión subiendo de registro',
          'Resuelve bajando al registro cómodo',
          'Crea arco dramático en el solo'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando todo el rango del instrumento',
        duration: 5,
        tips: [
          'No te quedes en registro cómodo',
          'Usa saltos grandes (intervalos de 9na, 10ma, 11va)',
          'Alterna entre registros como herramienta expresiva',
          'Registro grave = peso, registro agudo = tensión',
          'Debe sonar intencional, no como ejercicio'
        ]
      }
    ],
    progression: 'ii-V-I en múltiples tonalidades',
    evaluation: [
      '¿Uso todo el rango de mi instrumento?',
      '¿Los cambios de registro son limpios?',
      '¿Suena musical o como ejercicio técnico?',
      '¿Los saltos de octava tienen propósito expresivo?'
    ],
    nextSteps: 'Transcribe solos de Michael Brecker - maestro del rango extendido'
  },
  {
    id: 'harmonic-transcription',
    title: 'Transcripción Armónica',
    category: 'ear',
    level: 'advanced',
    duration: 30,
    goal: 'Transcribir progresiones complejas con sustituciones y reharmonizaciones',
    setup: [
      'Grabación de standard con reharmonización (Bill Evans, Brad Mehldau)',
      'Instrumento',
      'Software para loop/slow down (opcional)',
      'Papel pentagramado o app de notación'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Escucha la grabación completa 5 veces sin instrumento',
        duration: 8,
        tips: [
          'Solo escucha - no analices todavía',
          'Identifica la forma del tune',
          '¿Reconoces el standard original?',
          '¿Qué está diferente armónicamente?',
          'Toma notas mentales de momentos interesantes'
        ]
      },
      {
        step: 2,
        instruction: 'Identifica la función armónica de cada acorde',
        duration: 10,
        tips: [
          'No te preocupes por voicings aún',
          'Identifica: I, ii, V, etc.',
          '¿Dónde hay sustituciones tritono?',
          '¿Hay acordes secundarios no originales?',
          'Trabaja sección por sección (4 compases)',
          'Usa loop para secciones difíciles'
        ]
      },
      {
        step: 3,
        instruction: 'Determina las extensiones y alteraciones',
        duration: 7,
        tips: [
          'Ya sabes la función, ahora las tensiones',
          '¿Es maj7, 7, 6, sus?',
          '¿Qué extensiones? 9, #11, 13?',
          '¿Hay alteraciones? b9, #9, b13?',
          'Toca junto con la grabación para confirmar',
          'Si no estás 100% seguro, escribe opciones'
        ]
      },
      {
        step: 4,
        instruction: 'Toca la progresión completa junto con la grabación',
        duration: 5,
        tips: [
          'Debe sonar en sincronía perfecta',
          'Si hay clash, revisa tu análisis',
          'Verifica secciones que sonaban "raras"',
          'Este proceso desarrolla oído armónico avanzado'
        ]
      }
    ],
    progression: 'Grabación específica a transcribir',
    evaluation: [
      '¿Puedo tocar los cambios exactos de la grabación?',
      '¿Identifiqué las reharmonizaciones correctamente?',
      '¿Mi transcripción suena igual que el original?',
      '¿Entiendo POR QUÉ eligieron esas armonías?'
    ],
    nextSteps: 'Aplica esas reharmonizaciones a otros standards - traslada conceptos'
  },
  {
    id: 'position-mastery',
    title: 'Dominio Posicional Completo',
    category: 'technique',
    level: 'advanced',
    duration: 30,
    goal: 'Tocar cualquier concepto en cualquier posición del instrumento',
    setup: [
      'Backing track de standard medium tempo',
      'Metrónomo',
      'Mentalidad de exploración sistemática'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Divide el diapasón en 7 posiciones (guitarristas) o rangos (otros)',
        duration: 5,
        tips: [
          'Posición 1: trastes 0-4 (o rango grave)',
          'Posición 2: trastes 3-7',
          'Etc., hasta cubrir todo el instrumento',
          'Cada posición tiene sus propios shapes y digitaciones',
          'Esto es fundamental para libertad total'
        ]
      },
      {
        step: 2,
        instruction: 'Improvisa 1 chorus COMPLETO en Posición 1 SOLAMENTE',
        duration: 4,
        tips: [
          'NO salgas de esa posición',
          'Encuentra todos los cambios dentro de esa área',
          'Esto fuerza creatividad dentro de límites',
          'Descubrirás digitaciones nuevas',
          'Debe sonar musical, no limitado'
        ]
      },
      {
        step: 3,
        instruction: 'Repite para cada posición (7 chorus total)',
        duration: 15,
        tips: [
          '1 chorus por posición',
          'Cada posición tiene su propio "sabor"',
          'Posiciones agudas: tensión',
          'Posiciones graves: peso',
          'Posiciones medias: balance',
          'Al final conocerás TODAS las opciones en TODO el diapasón'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa sin restricciones - usa TODO el diapasón libremente',
        duration: 6,
        tips: [
          'Ahora puedes moverte entre posiciones fluidamente',
          'Cada nota tiene múltiples ubicaciones - eliges la mejor',
          'Esto es libertad total',
          'Tu solo será más variado y expresivo',
          'Esta es la diferencia entre intermedios y avanzados'
        ]
      }
    ],
    progression: 'Cualquier standard jazz',
    evaluation: [
      '¿Puedo tocar fluidamente en TODAS las posiciones?',
      '¿Conozco múltiples opciones para cada nota?',
      '¿Me muevo entre posiciones sin pensarlo?',
      '¿Mi elección de posición es intencional y musical?'
    ],
    nextSteps: 'Practica esto con TODOS tus standards hasta que sea automático'
  },
  {
    id: 'style-fusion',
    title: 'Fusión de Estilos',
    category: 'integration',
    level: 'advanced',
    duration: 30,
    goal: 'Combinar vocabularios de diferentes eras y estilos en un solo cohesivo',
    setup: [
      'Backing track versátil (ej: blues, modal tune, o standard)',
      'Tempo flexible: 100-140 BPM',
      'Conocimiento de swing, bebop, modal, fusion, contemporary'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Improvisa 1 chorus en estilo swing/bebop (años 40-50)',
        duration: 5,
        tips: [
          'Vocabulario de Charlie Parker, Dizzy Gillespie',
          'Líneas de 8vos con cromatismo',
          'Guide tones en beats fuertes',
          'Approach notes y enclosures',
          'Debe sonar clásico y tradicional'
        ]
      },
      {
        step: 2,
        instruction: 'Improvisa 1 chorus en estilo modal (años 60)',
        duration: 5,
        tips: [
          'Vocabulario de John Coltrane, Wayne Shorter',
          'Menos cambios, más exploración de escala',
          'Patterns secuenciales',
          'Sheets of sound',
          'Debe sonar espacioso y exploratorio'
        ]
      },
      {
        step: 3,
        instruction: 'Improvisa 1 chorus en estilo fusion/contemporary (años 70-presente)',
        duration: 5,
        tips: [
          'Vocabulario de Pat Metheny, Mike Stern',
          'Pentatónicas superpuestas',
          'Ritmos más rock/funk',
          'Técnicas outside controladas',
          'Debe sonar moderno y fresco'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa fusionando TODOS los estilos en un solo',
        duration: 15,
        tips: [
          'Sección A: bebop tradicional',
          'Sección B: modal spaces',
          'Bridge: fusion techniques',
          'Último A: mezcla todo',
          'Transiciones deben ser orgánicas',
          'Esto es tu PROPIA VOZ - síntesis de influencias',
          'Ejemplos: Kurt Rosenwinkel, Jonathan Kreisberg',
          'Graba: debe sonar cohesivo, no esquizofrénico'
        ]
      }
    ],
    progression: 'Tune versátil que permita diferentes approaches',
    evaluation: [
      '¿Puedo acceder a diferentes vocabularios fluidamente?',
      '¿Las transiciones entre estilos son musicales?',
      '¿Suena como MI voz o como copiar estilos?',
      '¿He sintetizado influencias en algo personal?'
    ],
    nextSteps: 'Este es el nivel profesional - sigue desarrollando TU sonido único'
  },
  {
    id: 'polyrhythmic-independence',
    title: 'Independencia Polirrítmica',
    category: 'rhythm',
    level: 'advanced',
    duration: 25,
    goal: 'Tocar líneas que implican diferentes métricas simultáneamente',
    setup: [
      'Metrónomo a 90 BPM en 4/4',
      'Backing track simple o drone',
      'Comprensión de grupos irregulares'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Toca grupos de 3 contra el pulso de 4',
        duration: 7,
        tempo: '90 BPM',
        tips: [
          'Metrónomo en 4/4, tú tocas grupos de 3 notas',
          'Resultado: poliritmo 3:4',
          'Las notas caerán en lugares diferentes cada ciclo',
          'Ejemplo: D-E-F | G-A-Bb | C-D-E (3 notas cada grupo)',
          'Mantén los grupos de 3 uniformes sin acelerar',
          'Graba: debe sonar deliberado, no como error de timing'
        ]
      },
      {
        step: 2,
        instruction: 'Grupos de 5 contra pulso de 4',
        duration: 7,
        tips: [
          'Aún más desafiante: 5:4 polyrhythm',
          'Metrónomo en 4/4, tú en grupos de 5',
          'Se resolverá cada 20 beats (LCM de 4 y 5)',
          'Usado extensivamente en música india y jazz contemporáneo',
          'No aceleres - mantén los quintolets uniformes'
        ]
      },
      {
        step: 3,
        instruction: 'Alterna entre diferentes agrupaciones en la misma frase',
        duration: 6,
        tips: [
          'Compás 1: grupos de 3',
          'Compás 2: grupos de 5',
          'Compás 3: grupos de 7',
          'Compás 4: vuelve a 4/4 regular',
          'Esto crea textura rítmica compleja',
          'Ejemplo: Tigran Hamasyan, Mark Giuliana'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando poliritmos como herramienta compositiva',
        duration: 5,
        tips: [
          'Usa poliritmos en momentos de alta tensión',
          'Resuelve volviendo a tiempo regular',
          'Combina con cromatismo para máximo effect',
          'Debe sonar intencional y musical',
          'Graba y analiza: ¿suena vanguardista o caótico?'
        ]
      }
    ],
    progression: 'Modal vamp o drone',
    evaluation: [
      '¿Mantengo el pulso base mientras toco poliritmos?',
      '¿Las agrupaciones son uniformes?',
      '¿Suena como herramienta musical o error?',
      '¿Puedo volver a tiempo regular sin problemas?'
    ],
    nextSteps: 'Estudia música de Tigran Hamasyan y Meshuggah para poliritmos extremos'
  },
  {
    id: 'upper-structure-triads',
    title: 'Upper Structure Triads en Improvisación',
    category: 'harmony',
    level: 'advanced',
    duration: 25,
    goal: 'Usar tríadas sobre acordes para crear tensiones sofisticadas',
    setup: [
      'Backing track de ii-V-I',
      'Tempo medium: 120 BPM',
      'Conocimiento sólido de tríadas en todas las inversiones'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Identifica upper structures disponibles para cada acorde',
        duration: 7,
        tips: [
          'Sobre Dm7: toca tríada de F Mayor (F-A-C) = R-3-5 del acorde',
          'Sobre G7: toca tríada de Db Mayor (Db-F-Ab) = b5-7-b9',
          'Sobre Cmaj7: toca tríada de E menor (E-G-B) = 3-5-7',
          'Cada tríada crea un color específico',
          'No todas las tríadas funcionan - elige conscientemente'
        ]
      },
      {
        step: 2,
        instruction: 'Practica tríadas sobre G7 alterado',
        duration: 8,
        tips: [
          'G7alt puede usar: Db Mayor, Eb Mayor, Ab Mayor triads',
          'Db triad = b5-7-b9',
          'Eb triad = b13-b9-#9',
          'Ab triad = b9-3-b13',
          'Toca estas tríadas en todas las inversiones',
          'Suenan super tensos y modernos',
          'Esto es lo que toca Brad Mehldau, Aaron Parks'
        ]
      },
      {
        step: 3,
        instruction: 'Improvisa usando upper structures como bloques sonoros',
        duration: 6,
        tips: [
          'No pienses nota por nota - piensa tríadas completas',
          'Ejemplo: sobre G7alt toca Db triad completo rápido',
          'Crea frases usando arpegios de estas tríadas',
          'Combina con aproximaciones cromáticas',
          'Resultado: sonido denso y contemporáneo'
        ]
      },
      {
        step: 4,
        instruction: 'Integra en standards - compara con approach tradicional',
        duration: 4,
        tips: [
          'Chorus 1: improvisa tradicionalmente',
          'Chorus 2: usa solo upper structure triads',
          '¿Escuchas la diferencia de color?',
          'Esto es sonido de jazz contemporáneo',
          'Graba ambos - el contraste debe ser obvio'
        ]
      }
    ],
    progression: 'ii-V-I en múltiples tonalidades',
    evaluation: [
      '¿Puedo ejecutar upper structures fluidamente?',
      '¿Suena más contemporáneo que approach tradicional?',
      '¿Mantengo claridad armónica?',
      '¿El color armónico es intencional?'
    ],
    nextSteps: 'Transcribe solos de Brad Mehldau - maestro de upper structures'
  },
  {
    id: 'extended-voice-leading',
    title: 'Voice Leading con Extensiones',
    category: 'harmony',
    level: 'advanced',
    duration: 30,
    goal: 'Crear líneas con 9nas, 11nas y 13ras como parte del voice leading',
    setup: [
      'Backing track de standard complejo (Giant Steps, Countdown)',
      'Tempo: 140-180 BPM',
      'Conocimiento de extensiones disponibles por tipo de acorde'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Mapea extensiones disponibles para cada acorde del standard',
        duration: 8,
        tips: [
          'maj7: 9, #11, 13 (avoid 11 natural)',
          'm7: 9, 11, 13',
          '7 (dominante): 9, b9, #9, 11, #11, b13, 13',
          'm7b5: 9, 11, b13',
          'dim7: 9, 11, b13',
          'Escribe esto para cada acorde del tune'
        ]
      },
      {
        step: 2,
        instruction: 'Practica voice leading conectando 9nas entre acordes',
        duration: 7,
        tips: [
          'Dm9 (E) → G9 (A) - movimiento de tono entero',
          'G9 (A) → Cmaj9 (D) - cuarta ascendente',
          'Las 9nas crean línea superior fluida',
          'Toca solo las 9nas mientras backing track toca acordes',
          'Esto es voice leading de nivel superior'
        ]
      },
      {
        step: 3,
        instruction: 'Incorpora 11nas y 13ras en el voice leading',
        duration: 8,
        tips: [
          'Ahora tienes 3+ notas por acorde (3, 7, 9, 11/13)',
          'Construye líneas usando todas estas tensiones',
          'Ejemplo sobre Dm7: D-F-A-C-E-G',
          'Luego a G7: conecta suavemente a G-B-D-F-A-C-E',
          'Cada extensión es un target note potencial',
          'Esto crea líneas super sofisticadas'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando extensiones como part del vocabulario normal',
        duration: 7,
        tips: [
          'Las extensiones ya no son "extras" - son core vocabulary',
          'Target 9nas y 13ras tanto como 3ras y 7mas',
          'Crea frases que enfatizan color armónico',
          'Esto es sonido post-bop: McCoy Tyner, Herbie Hancock',
          'Debe sonar natural, no forzado o "colorful for the sake of it"'
        ]
      }
    ],
    progression: 'Standard complejo con cambios rápidos',
    evaluation: [
      '¿Incorporo extensiones naturalmente?',
      '¿El voice leading es suave incluyendo extensiones?',
      '¿Suena más sofisticado que solo triads/7th chords?',
      '¿Mantengo claridad armónica con tensiones añadidas?'
    ],
    nextSteps: 'Analiza voicings de McCoy Tyner - extensiones como foundation'
  },
  {
    id: 'melodic-cell-development',
    title: 'Desarrollo de Células Melódicas',
    category: 'melody',
    level: 'advanced',
    duration: 25,
    goal: 'Crear arquitectura melódica coherente usando células de 2-3 notas',
    setup: [
      'Backing track simple (blues, modal)',
      'Tempo flexible: 100-140 BPM',
      'Mentalidad compositiva, no solo improvisativa'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Crea 3 células melódicas únicas de 2-3 notas',
        duration: 5,
        tips: [
          'Célula A: intervalo de 3ra (D-F)',
          'Célula B: intervalo de 4ta (G-C)',
          'Célula C: intervalo de 2da (E-F)',
          'DEBEN ser simples y reconocibles',
          'Cada una tiene personalidad distinta',
          'Practica cada una hasta memorizarla'
        ]
      },
      {
        step: 2,
        instruction: 'Construye frases combinando células en diferentes órdenes',
        duration: 8,
        tips: [
          'A-B-A: crea simetría',
          'A-B-C: desarrollo lineal',
          'C-A-B-A: estructura compleja',
          'Las células son LEGO pieces - construye arquitecturas',
          'No agregues material nuevo todavía',
          'Ejemplo: Joe Henderson usaba este approach'
        ]
      },
      {
        step: 3,
        instruction: 'Varía las células usando técnicas de desarrollo',
        duration: 7,
        tips: [
          'Transposición: A en diferentes alturas',
          'Inversión: D-F se vuelve F-D (descendente)',
          'Expansión: D-F se vuelve D-E-F',
          'Contracción rítmica: células más rápidas',
          'Expansión rítmica: células más lentas',
          'Secuenciación: repite célula subiendo/bajando',
          'Cada variación mantiene "DNA" de célula original'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa solo completo usando únicamente estas 3 células',
        duration: 5,
        tips: [
          'Debe sonar como composición, no ejercicio',
          'Usa las células y sus variaciones exclusivamente',
          'Esto crea unidad temática extrema',
          'Es como escribir una composición en tiempo real',
          'Ejemplos: Steve Coleman, Mark Turner',
          'Graba: debe tener narrativa clara y cohesión'
        ]
      }
    ],
    progression: 'Modal vamp o blues',
    evaluation: [
      '¿Mi solo tiene unidad temática?',
      '¿Puedo escuchar las células originales en variaciones?',
      '¿Suena compositivo vs random improvisation?',
      '¿He creado una arquitectura melódica clara?'
    ],
    nextSteps: 'Estudia "Inner Urge" de Joe Henderson - blueprint de desarrollo celular'
  },
  {
    id: 'contrafact-composition',
    title: 'Composición de Contrafacts en Tiempo Real',
    category: 'melody',
    level: 'advanced',
    duration: 30,
    goal: 'Crear nuevas melodías sobre progresiones conocidas improvisando',
    setup: [
      'Backing track de standard conocido (Rhythm Changes, blues)',
      'Tempo medium: 140-180 BPM',
      'Mentalidad: componer, no solo improvisar'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Elige un standard y toca su melodía original',
        duration: 3,
        tips: [
          'Ejemplo: "I Got Rhythm" (Rhythm Changes)',
          'Familiarízate con la estructura melódica',
          'Observa puntos de tensión y resolución',
          'Nota dónde la melodía "respira"'
        ]
      },
      {
        step: 2,
        instruction: 'Crea nueva melodía usando los mismos puntos de reposo',
        duration: 10,
        tips: [
          'Mantén la estructura de frases: pregunta-respuesta',
          'Los puntos de llegada deben coincidir (cadencias)',
          'Pero el camino es completamente nuevo',
          'Esto es un contrafact - nueva melodía sobre cambios existentes',
          'Ejemplos históricos: "Anthropology" sobre Rhythm Changes',
          'Graba tu melodía y repítela - debe ser memorable'
        ]
      },
      {
        step: 3,
        instruction: 'Refina tu contrafact - hazlo "cantable"',
        duration: 8,
        tips: [
          'Una buena melodía debe poder ser cantada',
          'Simplifica saltos complejos',
          'Crea balance entre pasos y saltos',
          'Añade motivos repetibles',
          'Ajusta ritmo para que sea memorable',
          'Toca tu melodía sin backing track - debe funcionar sola'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa sobre tu contrafact como si fuera un standard',
        duration: 9,
        tips: [
          'Toca tu melodía, luego improvisa chorus',
          'Tu melodía se convierte en el "tema"',
          'Improvisa sobre los cambios originales',
          'Referencia motivos de tu nueva melodía en el solo',
          'Esto es composición instantánea nivel avanzado',
          'Has creado un nuevo tune en 30 minutos'
        ]
      }
    ],
    progression: 'Rhythm Changes, Blues, o cualquier standard conocido',
    evaluation: [
      '¿Mi contrafact es memorable y cantable?',
      '¿Funciona sobre los cambios armónicos?',
      '¿Tiene estructura clara (A-A-B-A, etc.)?',
      '¿Podría ser un standard por derecho propio?'
    ],
    nextSteps: 'Escribe tus mejores contrafacts - podrían ser tus composiciones originales'
  },
  {
    id: 'harmonic-rhythm-manipulation',
    title: 'Manipulación del Ritmo Armónico',
    category: 'integration',
    level: 'advanced',
    duration: 25,
    goal: 'Crear o eliminar cambios de acordes en tiempo real mientras improvises',
    setup: [
      'Backing track de standard medium-tempo',
      'Conocimiento profundo de la progresión',
      'Capacidad de implicar armonía sin backing track'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Improvisa siguiendo ritmo armónico exacto del standard',
        duration: 5,
        tips: [
          'Si el tune cambia cada 2 beats, tú también',
          'Esto establece el ritmo armónico "correcto"',
          'Tu línea debe hacer obvios los cambios',
          'Base para manipulación posterior'
        ]
      },
      {
        step: 2,
        instruction: 'Alarga acordes - haz que duren el doble',
        duration: 7,
        tips: [
          'Si standard dice: Dm7 (2 beats) G7 (2 beats)',
          'Tú tocas: Dm7 (4 beats) y omites G7 temporalmente',
          'O viceversa: omite Dm7, enfatiza G7',
          'Esto cambia el flow armónico',
          'Crea anticipación cuando finalmente cambias',
          'Técnica avanzada de Keith Jarrett'
        ]
      },
      {
        step: 3,
        instruction: 'Añade acordes extra (double-time harmony)',
        duration: 7,
        tips: [
          'Standard: Dm7 (4 beats) → G7 (4 beats)',
          'Tú: Dm7 (2) → Em7b5 (2) → G7 (2) → Db7 (2)',
          'Has doblado el ritmo armónico',
          'Crea densidad y movimiento',
          'Debe sonar intencional, no confuso',
          'Backing track mantiene original - tú creas nueva capa'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa alternando entre ritmo armónico expandido y contraído',
        duration: 6,
        tips: [
          'Sección A: alarga acordes (más espacioso)',
          'Sección B: añade cambios (más denso)',
          'Esto es manipulación arquitectónica del solo',
          'Controlas tensión y release a través del ritmo armónico',
          'Nivel de libertad máximo',
          'Graba con backing track - debe funcionar aunque no "coincida"'
        ]
      }
    ],
    progression: 'Standard con estructura clara',
    evaluation: [
      '¿Mantengo claridad mientras manipulo armonía?',
      '¿Las manipulaciones crean interés musical?',
      '¿Puedo volver al ritmo armónico original fluidamente?',
      '¿Suena como libertad controlada vs caos?'
    ],
    nextSteps: 'Estudia grabaciones de Keith Jarrett solo - master de manipulación armónica'
  },
  {
    id: 'scale-three-notes-per-string',
    title: 'Escalas: 3 Notas Por Cuerda',
    category: 'technique',
    level: 'intermediate',
    duration: 20,
    goal: 'Dominar patrones de 3 notas por cuerda en todas las escalas para velocidad y fluidez',
    setup: [
      'Metrónomo empezando a 60 BPM',
      'Una escala de 7 notas (ej: C Mayor, D Dórico, G Mixolidio)',
      'Conocimiento de posiciones del diapasón'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Aprende el patrón de 3 notas por cuerda de la escala elegida',
        duration: 5,
        tempo: '60 BPM',
        tips: [
          'C Mayor: E string (8-10-12), A string (7-9-10), D string (7-9-10), etc.',
          'Distribuye las 7 notas en grupos de 3-3-1 o 3-4',
          'Usa digitación: índice-medio-meñique o índice-anular-meñique',
          'Practica ascendente primero: E→A→D→G→B→E',
          'Mantén la mano relajada, evita tensión'
        ]
      },
      {
        step: 2,
        instruction: 'Practica descendente',
        duration: 5,
        tempo: '60-80 BPM',
        tips: [
          'Mismo patrón pero bajando',
          'La digitación inversa puede ser meñique-anular-índice',
          'Alterna picking: down-up-down-up consistentemente',
          'Sincroniza mano derecha e izquierda perfectamente',
          'Graba: debe sonar uniforme, no entrecortado'
        ]
      },
      {
        step: 3,
        instruction: 'Practica patrones de secuencia',
        duration: 6,
        tempo: '80-100 BPM',
        tips: [
          'Secuencia ascendente de 4: C-D-E-F, D-E-F-G, E-F-G-A...',
          'Secuencia de 3: C-D-E, D-E-F, E-F-G...',
          'Secuencia de 6: C-D-E-F-G-A, D-E-F-G-A-B...',
          'Cada secuencia entrena coordinación diferente',
          'Practica cada secuencia en bucle hasta dominar'
        ]
      },
      {
        step: 4,
        instruction: 'Aumenta velocidad gradualmente',
        duration: 4,
        tempo: '100-140 BPM',
        tips: [
          'Sube 5 BPM cada vez que domines un tempo',
          'Meta: 120-140 BPM con claridad perfecta',
          'Si pierdes precisión, baja el tempo',
          'Velocidad sin control no sirve',
          'Este patrón es usado en shred/fusion: Paul Gilbert, Greg Howe'
        ]
      }
    ],
    progression: 'Cualquier escala de 7 notas',
    evaluation: [
      '¿Cada nota suena clara sin buzz o muted?',
      '¿El timing es uniforme incluso a alta velocidad?',
      '¿Puedo tocar la escala sin mirar el diapasón?',
      '¿La técnica se mantiene relajada?'
    ],
    nextSteps: 'Aplica este patrón a TODAS las escalas: modos, menor melódica, alterada, etc.'
  },
  {
    id: 'scale-interval-training',
    title: 'Entrenamiento por Intervalos en Escala',
    category: 'technique',
    level: 'beginner',
    duration: 15,
    goal: 'Desarrollar oído interno y navegación del diapasón practicando intervalos específicos',
    setup: [
      'Una escala (ej: G Mayor)',
      'Metrónomo a 80 BPM',
      'Conocimiento de intervalos básicos'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Practica 3ras diatónicas',
        duration: 4,
        tempo: '80 BPM',
        tips: [
          'G-B, A-C, B-D, C-E, D-F#, E-G, F#-A',
          'Ascendente y descendente',
          'Escucha el sonido de cada 3ra',
          'Algunas son mayores (4 semitonos), otras menores (3 semitonos)',
          'Esto entrena oído para diferenciar cualidades'
        ]
      },
      {
        step: 2,
        instruction: 'Practica 4tas diatónicas',
        duration: 4,
        tips: [
          'G-C, A-D, B-E, C-F#, D-G, E-A, F#-B',
          'Nota: C-F# es una 4ta aumentada (tritono)',
          'Todas las demás son 4tas justas',
          'Identifica el tritono por su sonido único',
          'Practica en diferentes posiciones del diapasón'
        ]
      },
      {
        step: 3,
        instruction: 'Practica 5tas, 6tas y 7mas',
        duration: 4,
        tips: [
          '5tas: G-D, A-E, B-F#, etc.',
          '6tas: G-E, A-F#, B-G, etc.',
          '7mas: G-F#, A-G, B-A, etc.',
          'Cada intervalo tiene su propio color',
          'Memoriza el sonido de cada uno'
        ]
      },
      {
        step: 4,
        instruction: 'Crea patrones combinando intervalos',
        duration: 3,
        tips: [
          'Patrón: 3ra arriba, 2da abajo - G-B-A, A-C-B, B-D-C...',
          'Patrón: 4ta arriba, 3ra abajo - G-C-A, A-D-B...',
          'Inventa tus propios patrones',
          'Esto es la base de líneas melódicas interesantes'
        ]
      }
    ],
    progression: 'Cualquier escala diatónica',
    evaluation: [
      '¿Puedo identificar cada intervalo por sonido?',
      '¿Puedo tocar cualquier intervalo desde cualquier nota?',
      '¿Navego el diapasón con confianza?'
    ],
    nextSteps: 'Practica intervalos en escalas más complejas: menor melódica, alterada, disminuida'
  },
  {
    id: 'scale-lateral-shifting',
    title: 'Desplazamientos Laterales en Escalas',
    category: 'technique',
    level: 'intermediate',
    duration: 20,
    goal: 'Dominar el movimiento horizontal por el diapasón manteniendo la misma escala',
    setup: [
      'Una escala (ej: A Dórico)',
      'Metrónomo a 70 BPM',
      'Conocimiento de 3+ posiciones de la escala'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Identifica 3 posiciones de la misma escala',
        duration: 5,
        tips: [
          'Posición 1: trastes 5-8',
          'Posición 2: trastes 10-13',
          'Posición 3: trastes 15-17',
          'Todas tocan la misma escala A Dórico',
          'Dibuja o visualiza mentalmente cada posición'
        ]
      },
      {
        step: 2,
        instruction: 'Practica desplazamiento suave entre posiciones',
        duration: 7,
        tempo: '70 BPM',
        tips: [
          'Empieza en posición 1, toca 4 notas',
          'Desplázate a posición 2, continúa la escala',
          'Desplázate a posición 3, continúa',
          'Usa notas "pivot" - notas compartidas entre posiciones',
          'El desplazamiento debe ser imperceptible al oído',
          'Usa deslizamientos (slides) para suavizar transiciones'
        ]
      },
      {
        step: 3,
        instruction: 'Crea líneas que crucen todo el diapasón',
        duration: 5,
        tempo: '80 BPM',
        tips: [
          'Empieza en traste 5, termina en traste 17',
          'Solo notas de la escala, pero máximo rango',
          'Esto crea líneas dramáticas con amplio registro',
          'Técnica de Michael Brecker, John Coltrane',
          'Practica ascendente y descendente'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando desplazamientos intencionales',
        duration: 3,
        tips: [
          'No te quedes en una posición cómoda',
          'Fuerza cambios de posición cada 4-8 notas',
          'Resultado: líneas más variadas y menos predecibles',
          'Graba y escucha: debe sonar fluido, no entrecortado'
        ]
      }
    ],
    progression: 'Modal vamp en la tonalidad de tu escala',
    evaluation: [
      '¿Los desplazamientos son suaves y silenciosos?',
      '¿Puedo navegar todo el diapasón sin pensar?',
      '¿Mis líneas usan el rango completo del instrumento?'
    ],
    nextSteps: 'Practica desplazamientos en cambios rápidos: ii-V-I donde cada acorde está en posición diferente'
  },
  {
    id: 'scale-chromatic-integration',
    title: 'Integración de Cromatismo en Escalas',
    category: 'technique',
    level: 'intermediate',
    duration: 20,
    goal: 'Añadir notas cromáticas a escalas diatónicas para crear líneas más sofisticadas',
    setup: [
      'Una escala base (ej: C Jonio/Mayor)',
      'Metrónomo a 90 BPM',
      'Conocimiento de approach notes'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Practica aproximaciones cromáticas desde abajo',
        duration: 5,
        tempo: '90 BPM',
        tips: [
          'Para llegar a C: toca B-C (aproximación cromática)',
          'Para llegar a E: toca D#-E',
          'Para llegar a G: toca F#-G',
          'Añade medio tono antes de cada nota target',
          'Esto suena jazzy y sofisticado inmediatamente'
        ]
      },
      {
        step: 2,
        instruction: 'Practica aproximaciones desde arriba',
        duration: 5,
        tips: [
          'Para C: toca Db-C',
          'Para E: toca F-E',
          'Para G: toca Ab-G',
          'Aproximación desde arriba tiene sabor diferente',
          'Menos común que desde abajo - sorprende más'
        ]
      },
      {
        step: 3,
        instruction: 'Practica enclosures (rodeamiento cromático)',
        duration: 6,
        tips: [
          'Para llegar a C: B-Db-C (desde abajo y arriba)',
          'O Db-B-C (desde arriba y abajo)',
          'Rodea la target note completamente',
          'Sonido super bebop - Charlie Parker usaba esto constantemente',
          'Target notes deben caer en beats fuertes'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa mezclando escala + cromatismo',
        duration: 4,
        tempo: '100 BPM',
        tips: [
          'Base: escala diatónica (inside)',
          'Decoración: aproximaciones cromáticas',
          'Formula: 70% diatónico, 30% cromático',
          'El cromatismo debe sonar intencional, no como errores',
          'Graba y analiza: ¿suena jazz profesional?'
        ]
      }
    ],
    progression: 'Backing track simple (blues, ii-V-I)',
    evaluation: [
      '¿El cromatismo embellece sin oscurecer la armonía?',
      '¿Las aproximaciones resuelven limpiamente?',
      '¿Suena como bebop profesional?'
    ],
    nextSteps: 'Transcribe 16 compases de Charlie Parker - analiza su uso de cromatismo en detalle'
  },
  {
    id: 'scale-sequence-patterns',
    title: 'Patrones de Secuencia en Escalas',
    category: 'technique',
    level: 'beginner',
    duration: 15,
    goal: 'Desarrollar coordinación y visualización usando secuencias numéricas en escalas',
    setup: [
      'Una escala de 7 notas',
      'Metrónomo a 80 BPM',
      'Papel para anotar patrones'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Secuencia de 4 notas ascendente',
        duration: 4,
        tempo: '80 BPM',
        tips: [
          'Numeramos la escala: 1-2-3-4-5-6-7-8',
          'Patrón: 1-2-3-4, 2-3-4-5, 3-4-5-6, 4-5-6-7, etc.',
          'C Mayor: C-D-E-F, D-E-F-G, E-F-G-A, F-G-A-B...',
          'Practica hasta que sea automático',
          'Este patrón aparece en Bach, Mozart, y bebop'
        ]
      },
      {
        step: 2,
        instruction: 'Secuencia de 3 notas',
        duration: 4,
        tips: [
          'Patrón: 1-2-3, 2-3-4, 3-4-5, 4-5-6...',
          'C Mayor: C-D-E, D-E-F, E-F-G, F-G-A...',
          'Crea líneas más angulares',
          'Prueba variaciones rítmicas: tresillos, corcheas, semicorcheas'
        ]
      },
      {
        step: 3,
        instruction: 'Secuencias con saltos',
        duration: 4,
        tips: [
          'Patrón skip: 1-3, 2-4, 3-5, 4-6... (solo 3ras)',
          'Patrón 4tas: 1-4, 2-5, 3-6, 4-7...',
          'Patrón mixto: 1-2-4, 2-3-5, 3-4-6...',
          'Cada patrón entrena diferentes saltos',
          'Útil para construir vocabulario de intervalos'
        ]
      },
      {
        step: 4,
        instruction: 'Inventa tus propias secuencias',
        duration: 3,
        tips: [
          'Patrón reversa: 4-3-2-1, 5-4-3-2...',
          'Patrón cíclico: 1-3-2-4, 2-4-3-5...',
          'Infinitas posibilidades',
          'Anota las que suenan interesantes',
          'Cada secuencia puede convertirse en un lick'
        ]
      }
    ],
    progression: 'Practicar sin backing track primero',
    evaluation: [
      '¿Puedo ejecutar cada secuencia sin errores?',
      '¿Entiendo el patrón numérico?',
      '¿Puedo aplicar la misma secuencia a diferentes escalas?'
    ],
    nextSteps: 'Usa estas secuencias como base de improvisación - transfórmalas con ritmo y dinámica'
  },
  {
    id: 'scale-modal-mixture',
    title: 'Mezcla Modal en Escalas',
    category: 'technique',
    level: 'advanced',
    duration: 25,
    goal: 'Combinar notas de diferentes modos sobre el mismo centro tonal',
    setup: [
      'Backing track de vamp en C',
      'Conocimiento de modos de Mayor',
      'Metrónomo opcional'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Compara C Jonio (Mayor) vs C Mixolidio',
        duration: 5,
        tips: [
          'C Jonio: C-D-E-F-G-A-B',
          'C Mixolidio: C-D-E-F-G-A-Bb',
          'Diferencia: B vs Bb (7ma Mayor vs b7)',
          'Toca cada escala separadamente',
          'Escucha el cambio de color'
        ]
      },
      {
        step: 2,
        instruction: 'Mezcla ambos modos en una línea',
        duration: 8,
        tips: [
          'Compás 1: C Jonio con B natural',
          'Compás 2: C Mixolidio con Bb',
          'Alterna entre ambas 7mas',
          'Esto crea tensión/release interesante',
          'Común en rock progresivo y fusion'
        ]
      },
      {
        step: 3,
        instruction: 'Añade más modos: C Lidio y C Dórico',
        duration: 7,
        tips: [
          'C Lidio: añade F# (#11) - sonido brillante',
          'C Dórico (menos común sobre C): Eb, Bb',
          'Ahora tienes: B, Bb (de Mixo), F# (de Lidio)',
          'Mezcla todas estas alteraciones',
          'Sonido muy contemporáneo - jazz moderno'
        ]
      },
      {
        step: 4,
        instruction: 'Improvisa usando mixture modal libremente',
        duration: 5,
        tips: [
          'Centro tonal: C',
          'Escala base: C Mayor',
          'Alteraciones permitidas: Bb, F#, Eb',
          'Cambia alteraciones según feeling',
          'Esto es outside controlado',
          'Ejemplos: Frank Zappa, Allan Holdsworth'
        ]
      }
    ],
    progression: 'Vamp en C (o cualquier centro tonal)',
    evaluation: [
      '¿Mantengo el centro tonal claro?',
      '¿Las alteraciones suenan intencionales?',
      '¿Creo contraste entre secciones?',
      '¿Suena contemporáneo y sofisticado?'
    ],
    nextSteps: 'Estudia "Peaches en Regalia" de Frank Zappa - master class de modal mixture'
  },
  {
    id: 'scale-speed-builder',
    title: 'Constructor de Velocidad en Escalas',
    category: 'technique',
    level: 'advanced',
    duration: 30,
    goal: 'Desarrollar velocidad extrema manteniendo claridad y precisión',
    setup: [
      'Una escala dominada (ej: E menor pentatónica o A Dórico)',
      'Metrónomo con subdivisión audible',
      'Grabadora para verificar claridad'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Establece tu baseline de velocidad cómoda',
        duration: 5,
        tempo: '60-100 BPM',
        tips: [
          'Toca la escala en corcheas',
          'Encuentra el tempo donde puedes tocar 10 veces sin error',
          'Anota este tempo - es tu punto de partida',
          'No hay vergüenza si es lento - todos empezamos ahí',
          'Ejemplo: si es 80 BPM, está perfecto'
        ]
      },
      {
        step: 2,
        instruction: 'Práctica de sprint: 10 segundos máxima velocidad',
        duration: 10,
        tips: [
          'Toca la escala lo más rápido posible durante 10 segundos',
          'Descansa 20 segundos',
          'Repite 10 veces',
          'No importa si hay errores - empuja los límites',
          'Este método desarrolla velocidad explosiva',
          'Técnica de athletes aplicada a música'
        ]
      },
      {
        step: 3,
        instruction: 'Incremento gradual: método 5-10-15',
        duration: 10,
        tempo: 'Variable',
        tips: [
          'Toca a tu tempo base durante 5 minutos',
          'Sube 10 BPM, toca 10 minutos',
          'Si dominas, sube otros 10 BPM',
          'Si fallas más de 3 veces, baja 5 BPM',
          'Objetivo: aumentar 10-20 BPM por semana',
          'Paciencia - velocidad real toma meses, no días'
        ]
      },
      {
        step: 4,
        instruction: 'Verificación de claridad',
        duration: 5,
        tips: [
          'GRABA tu playing a alta velocidad',
          'Escucha: ¿cada nota es clara?',
          'Si hay notas fantasma, buzz, o muting accidental → BAJA TEMPO',
          'Velocidad sin claridad = basura',
          'La meta es velocidad USABLE, no solo rápido',
          'Ejemplo: Paul Gilbert es rápido Y claro'
        ]
      }
    ],
    progression: 'Solo con metrónomo inicialmente',
    evaluation: [
      '¿Puedo mantener la velocidad alta por 30+ segundos?',
      '¿Cada nota es audible y clara?',
      '¿La técnica se mantiene relajada?',
      '¿He aumentado mi velocidad base?'
    ],
    nextSteps: 'Aplica esta metodología a licks, arpegios, y frases completas - no solo escalas'
  },
  {
    id: 'scale-string-skipping',
    title: 'Salto de Cuerdas en Escalas',
    category: 'technique',
    level: 'advanced',
    duration: 20,
    goal: 'Dominar técnica de string-skipping para crear líneas con saltos de octava',
    setup: [
      'Una escala (ej: G Mayor)',
      'Metrónomo a 70 BPM',
      'Enfoque en mano derecha/picking'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Practica saltos simples: una cuerda',
        duration: 5,
        tempo: '70 BPM',
        tips: [
          'Toca en cuerda E, salta a cuerda D (salta cuerda A)',
          'Ejemplo: G en E grave → B en D',
          'Picking alterno: down-up incluso cuando saltas',
          'La cuerda intermedia NO debe sonar',
          'Control de mano derecha es crítico'
        ]
      },
      {
        step: 2,
        instruction: 'Secuencia con string-skipping',
        duration: 7,
        tips: [
          'Patrón: nota en E, nota en D, nota en E, nota en D...',
          'G(E)-B(D)-A(E)-C(D)-B(E)-D(D)-C(E)-E(D)...',
          'Crea textura angular y moderna',
          'Más difícil que escala regular pero suena único',
          'Usado por Steve Vai, Frank Gambale'
        ]
      },
      {
        step: 3,
        instruction: 'Saltos de 2 cuerdas',
        duration: 5,
        tips: [
          'Toca en E grave, salta a G (2 cuerdas)',
          'Incluso más desafiante',
          'Silencia las cuerdas intermedias con ambas manos',
          'Practica LENTO primero',
          'Claridad > velocidad'
        ]
      },
      {
        step: 4,
        instruction: 'Crea licks usando string-skipping',
        duration: 3,
        tips: [
          'Combina string-skipping con escala normal',
          'Ejemplo: 4 notas normal, 4 notas con skipping',
          'Esto hace tus líneas menos predecibles',
          'Sonido signature de guitarra shred',
          'Graba: debe sonar limpio sin cuerdas fantasma'
        ]
      }
    ],
    progression: 'Modal vamp o practice sin backing track',
    evaluation: [
      '¿Controlo qué cuerdas suenan y cuáles no?',
      '¿No hay cuerdas fantasma o buzz?',
      '¿Puedo usar string-skipping musicalmente?'
    ],
    nextSteps: 'Integra string-skipping en arpegios - aún más efectivo que en escalas'
  },
  {
    id: 'scale-rhythmic-variations',
    title: 'Variaciones Rítmicas de Escalas',
    category: 'technique',
    level: 'intermediate',
    duration: 20,
    goal: 'Transformar escalas aburridas en material melódico interesante usando ritmo',
    setup: [
      'Una escala memorizada',
      'Metrónomo a 100 BPM',
      'Mentalidad: el ritmo es tan importante como las notas'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Practica en negras, corcheas, tresillos, semicorcheas',
        duration: 6,
        tempo: '100 BPM',
        tips: [
          'Negras: 1 nota por beat',
          'Corcheas: 2 notas por beat',
          'Tresillos: 3 notas por beat',
          'Semicorcheas: 4 notas por beat',
          'Misma escala, 4 velocidades diferentes',
          'Domina cada subdivisión antes de mezclar'
        ]
      },
      {
        step: 2,
        instruction: 'Mezcla subdivisiones en una frase',
        duration: 6,
        tips: [
          'Compás 1: negras',
          'Compás 2: corcheas',
          'Compás 3: tresillos',
          'Compás 4: semicorcheas',
          'Esto crea aceleración dramática',
          'Prueba también deceleración (inverso)'
        ]
      },
      {
        step: 3,
        instruction: 'Añade silencios (rests)',
        duration: 5,
        tips: [
          'Toca 3 notas, silencio de 1 beat',
          'Toca 5 notas, silencio de 2 beats',
          'Los silencios son tan importantes como las notas',
          'Esto hace la escala sonar como melodía',
          'Miles Davis: "It\'s not the notes you play, it\'s the notes you don\'t play"'
        ]
      },
      {
        step: 4,
        instruction: 'Crea patrones rítmicos específicos',
        duration: 3,
        tips: [
          'Patrón jazz: corchea-tresillo-corchea',
          'Patrón funk: corta-larga-corta-larga (staccato-legato)',
          'Patrón rock: galopante (negra-corchea-corchea)',
          'El ritmo define el estilo más que las notas',
          'Misma escala suena blues, jazz, o rock según ritmo'
        ]
      }
    ],
    progression: 'Backing track de cualquier estilo',
    evaluation: [
      '¿Controlo diferentes subdivisiones?',
      '¿Uso silencios efectivamente?',
      '¿La escala suena musical en vez de ejercicio?',
      '¿Puedo tocar en el "pocket" de diferentes estilos?'
    ],
    nextSteps: 'Estudia fraseo rítmico de Sonny Rollins - master del ritmo en melodía'
  },
  {
    id: 'transcription-integration',
    title: 'Integración de Material Transcrito',
    category: 'ear',
    level: 'advanced',
    duration: 30,
    goal: 'Incorporar licks transcritos en tu vocabulario orgánicamente',
    setup: [
      '5-10 licks transcritos de un solo de Charlie Parker o similar',
      'Backing track del tune original',
      'Los licks escritos y memorizados'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Transporta cada lick a todas las 12 tonalidades',
        duration: 10,
        tips: [
          'Lick 1 en C, luego Db, D, Eb, E, F, etc.',
          'Toca lentamente hasta dominar cada tonalidad',
          'Usa metrónomo - mantén timing consistente',
          'Esto es tedioso pero ESENCIAL',
          'Sin esto, solo puedes usar el lick en una tonalidad',
          'Práctica diaria: 1 lick en 12 keys'
        ]
      },
      {
        step: 2,
        instruction: 'Identifica el contexto armónico de cada lick',
        duration: 5,
        tips: [
          '¿Sobre qué tipo de acorde funciona?',
          'ii-V? Solo V7? Solo I? Modal?',
          'Ejemplo: lick Parker usa sobre G7 → Cmaj7',
          'Ese lick funcionará sobre CUALQUIER V7 → I',
          'Transporta a otros contextos armónicos',
          'Lick se vuelve herramienta, no solo quote'
        ]
      },
      {
        step: 3,
        instruction: 'Practica "insertar" licks en tus improvisaciones',
        duration: 8,
        tips: [
          'Improvisa normalmente',
          'Cuando llegue el contexto correcto, usa el lick',
          'Primera vez será obvio y forzado - OK',
          'Con práctica se integra naturalmente',
          'El lick debe sonar como "tu" idea, no como quote',
          'Trabaja CADA lick hasta que sea automático'
        ]
      },
      {
        step: 4,
        instruction: 'Varía los licks - hazlos tuyos',
        duration: 7,
        tips: [
          'Cambia el ritmo del lick',
          'Usa solo la primera mitad',
          'Combina mitades de diferentes licks',
          'Añade cromatismo extra',
          'Transpone internamente',
          'Ahora no es el lick de Parker - es TU lick inspirado en Parker',
          'Este es el proceso de desarrollar voz propia'
        ]
      }
    ],
    progression: 'Standard donde originalmente transcribiste',
    evaluation: [
      '¿Puedo tocar cada lick en todas las tonalidades?',
      '¿Los licks suenan naturales en mi improvisación?',
      '¿He variado los licks para hacerlos míos?',
      '¿Amplió mi vocabulario o solo memoricé patterns?'
    ],
    nextSteps: 'Continuar transcribiendo - cada músico debe transcribir 100+ solos mínimo'
  },
  {
    id: 'advanced-comping-integration',
    title: 'Comping Avanzado Durante Solos',
    category: 'integration',
    level: 'advanced',
    duration: 25,
    goal: 'Acompañarte a ti mismo mientras improvises (técnica solo guitar/piano)',
    setup: [
      'Backing track opcional (o solo tú)',
      'Conocimiento de voicings complejos',
      'Habilidad de tocar acordes y melodía simultáneamente'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Practica voicings en medio del diapasón que permiten melodía encima',
        duration: 8,
        tips: [
          'Guitarristas: voicings en cuerdas 4-2, melodía en cuerda 1',
          'Pianistas: acordes con mano izquierda, melodía con derecha',
          'Voicings deben ser completos pero no ocupar TODO el espacio',
          'Practica cambios de acordes con estos voicings',
          'Debe ser automático antes de añadir melodía'
        ]
      },
      {
        step: 2,
        instruction: 'Comping en beats 2 y 4, melodía en beats 1 y 3',
        duration: 7,
        tips: [
          'Beat 1: nota melodía',
          'Beat 2: chunk del acorde',
          'Beat 3: nota melodía',
          'Beat 4: chunk del acorde',
          'Esto crea interlock entre comping y melodía',
          'Ritmo típico de stride piano o jazz guitar solo',
          'Practica LENTAMENTE primero'
        ]
      },
      {
        step: 3,
        instruction: 'Improvisa línea melódica mientras mantienes comping',
        duration: 6,
        tips: [
          'No detengas el comping para hacer melodía compleja',
          'Simplifica melodía si es necesario',
          'El comping establece armonía, melodía añade color',
          'Balance es clave - ni todo armonía ni todo melodía',
          'Escucha a Joe Pass, Tuck Andress (guitarra)',
          'O Bill Evans, Art Tatum (piano)'
        ]
      },
      {
        step: 4,
        instruction: 'Crea texturas variadas alternando densidad armónica',
        duration: 4,
        tips: [
          'Sección A: comping denso (acordes cada 2 beats)',
          'Sección B: comping sparse (acordes cada 4-8 beats)',
          'Sección C: solo melodía sin acordes (implica armonía)',
          'Sección D: acordes sin melodía',
          'Esto crea arquitectura dinámica en tu solo',
          'Cada textura tiene propósito expresivo'
        ]
      }
    ],
    progression: 'Cualquier standard - eventualmente sin backing track',
    evaluation: [
      '¿Mantengo independencia entre melodía y comping?',
      '¿El comping es rítmicamente interesante?',
      '¿La armonía está clara?',
      '¿Suena como una performance completa o secciones separadas?'
    ],
    nextSteps: 'Meta final: tocar standards completos solo, sin backing track'
  },
  {
    id: 'thematic-improvisation',
    title: 'Improvisación Temática Narrativa',
    category: 'integration',
    level: 'advanced',
    duration: 30,
    goal: 'Crear solos que cuenten una "historia" con inicio, desarrollo y conclusión',
    setup: [
      'Backing track de standard o blues',
      'Mentalidad de storytelling',
      'Sin restricciones técnicas - solo narrativa'
    ],
    steps: [
      {
        step: 1,
        instruction: 'Define 3 "capítulos" para tu solo antes de empezar',
        duration: 5,
        tips: [
          'Capítulo 1 (introducción): simple, establece tema',
          'Capítulo 2 (desarrollo): explora y expande',
          'Capítulo 3 (clímax y resolución): máxima intensidad → calma',
          'Piensa arquitectura antes de improvisar',
          'Como escribir novela vs stream of consciousness'
        ]
      },
      {
        step: 2,
        instruction: 'Chorus 1-2: Introducción - establece material temático',
        duration: 7,
        tips: [
          'Presenta 1-2 motivos simples',
          'NO muestres todo tu vocabulario todavía',
          'Deja espacio - menos es más',
          'Registro medio, dinámica moderada',
          'Como introducir personajes en una película',
          'Audience debe sentir que "hay más por venir"'
        ]
      },
      {
        step: 3,
        instruction: 'Chorus 3-5: Desarrollo - explora y transforma el material',
        duration: 10,
        tips: [
          'Toma los motivos del intro y desárrollalos',
          'Usa todas las técnicas: transposición, inversión, fragmentación',
          'Aumenta densidad gradualmente',
          'Sube de registro poco a poco',
          'Incrementa dinámica progresivamente',
          'Introduce cromatismo y técnicas outside',
          'Construcción de tensión hacia clímax'
        ]
      },
      {
        step: 4,
        instruction: 'Chorus 6-7: Clímax y Resolución',
        duration: 8,
        tips: [
          'Chorus 6: máxima intensidad',
          '- Registro más agudo',
          '- Máxima densidad',
          '- Fortissimo dinámico',
          '- Técnicas más outside',
          'Chorus 7: resolución',
          '- Vuelve a registro medio',
          '- Simplifica',
          '- Disminuye dinámica',
          '- Referencia el motivo inicial (cierre circular)',
          '- Finaliza en nota conclusiva, probablemente tónica',
          'Como resolver todos los conflictos al final de película'
        ]
      }
    ],
    progression: 'Cualquier standard o forma blues',
    evaluation: [
      '¿Mi solo tiene arco narrativo claro?',
      '¿Puedo escuchar inicio, desarrollo y conclusión?',
      '¿Hay sentido de viaje, no solo serie de licks?',
      '¿El clímax está en el lugar correcto?',
      '¿La resolución se siente satisfactoria?',
      '¿Contó una historia musical?'
    ],
    nextSteps: 'Analiza arquitectura de solos históricos: Coltrane "Giant Steps" (versión album) - perfección narrativa'
  }];

export const exerciseCategories = {
  rhythm: {
    name: 'Ritmo',
    description: 'Ejercicios enfocados en tiempo, groove y desplazamiento rítmico',
    color: '#FF6B6B'
  },
  harmony: {
    name: 'Armonía',
    description: 'Voice leading, substituciones y conceptos armónicos',
    color: '#4ECDC4'
  },
  melody: {
    name: 'Melodía',
    description: 'Construcción de líneas, motivos y desarrollo melódico',
    color: '#45B7D1'
  },
  ear: {
    name: 'Oído',
    description: 'Entrenamiento auditivo y transcripción',
    color: '#96CEB4'
  },
  technique: {
    name: 'Técnica',
    description: 'Desarrollo técnico y mecánico del instrumento',
    color: '#FFEAA7'
  },
  integration: {
    name: 'Integración',
    description: 'Combinar múltiples conceptos en contexto musical',
    color: '#DDA15E'
  }
};

export const progressionPath = {
  beginner: [
    'target-note-control',
    'call-and-response',
    'dynamics-expression',
    'scale-interval-training',
    'scale-sequence-patterns'
  ],
  intermediate: [
    'voice-leading-workout',
    'rhythmic-displacement',
    'motific-development',
    'chromaticism-integration',
    'blues-mixing',
    'scale-three-notes-per-string',
    'scale-lateral-shifting',
    'scale-chromatic-integration',
    'scale-rhythmic-variations'
  ],
  advanced: [
    'pentatonic-superimposition',
    'multi-octave-sequences',
    'metric-modulation',
    'reharmonization-real-time',
    'harmonic-transcription',
    'position-mastery',
    'style-fusion',
    'polyrhythmic-independence',
    'upper-structure-triads',
    'extended-voice-leading',
    'melodic-cell-development',
    'contrafact-composition',
    'harmonic-rhythm-manipulation',
    'scale-modal-mixture',
    'scale-speed-builder',
    'scale-string-skipping',
    'transcription-integration',
    'advanced-comping-integration',
    'thematic-improvisation'
  ]
};
