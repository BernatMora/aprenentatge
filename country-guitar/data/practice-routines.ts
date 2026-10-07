export interface PracticeRoutine {
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
}

export const practiceRoutines: PracticeRoutine[] = [
  {
    id: 'beginner-30min',
    name: 'Rutina Principiante (30 min)',
    level: 'beginner',
    duration: 30,
    description: 'Rutina fundamental para construir bases sólidas en jazz',
    goals: [
      'Desarrollar control técnico básico',
      'Familiarizarse con acordes y arpegios fundamentales',
      'Comenzar a improvisar con confianza'
    ],
    sections: [
      {
        name: 'Calentamiento',
        duration: 5,
        focus: 'Preparar técnica y oído',
        tempo: '60-80 BPM',
        exercises: [
          'Escalas mayores en todas las posiciones (2 octavas)',
          'Cromáticos ascendentes y descendentes',
          'Ejercicios de digitación básicos'
        ]
      },
      {
        name: 'Acordes y Arpegios',
        duration: 10,
        focus: 'Construcción de vocabulario armónico',
        tempo: '60 BPM',
        exercises: [
          'Arpegios maj7, m7, dom7 en una tonalidad',
          'Practica conectar arpegios con notas de paso',
          'Tocar arpegios sobre backing track de ii-V-I'
        ]
      },
      {
        name: 'Patrones y Licks',
        duration: 10,
        focus: 'Construir vocabulario melódico',
        exercises: [
          'Aprender 1-2 licks bebop sobre ii-V-I',
          'Transportar licks a 3 tonalidades diferentes',
          'Practicar licks con metrónomo en beats 2 y 4'
        ]
      },
      {
        name: 'Improvisación',
        duration: 5,
        focus: 'Aplicar lo aprendido',
        exercises: [
          'Improvisar sobre blues en F (solo chord tones)',
          'Agregar approach notes a tus líneas',
          'Grabarte y escuchar críticamente'
        ]
      }
    ],
    tips: [
      'Usa metrónomo SIEMPRE, empieza lento',
      'Graba tu práctica para evaluar tu progreso',
      'Enfócate en la calidad del sonido, no en la velocidad',
      'Descansa 1-2 minutos entre secciones'
    ]
  },
  {
    id: 'intermediate-45min',
    name: 'Rutina Intermedia (45 min)',
    level: 'intermediate',
    duration: 45,
    description: 'Desarrollo de técnicas avanzadas y vocabulary más sofisticado',
    goals: [
      'Expandir vocabulario harmónico y melódico',
      'Desarrollar técnicas de improvisación avanzadas',
      'Trabajar en diferentes contextos armónicos'
    ],
    sections: [
      {
        name: 'Técnica',
        duration: 10,
        focus: 'Control técnico avanzado',
        tempo: '80-120 BPM',
        exercises: [
          'Escalas y modos en todas las posiciones',
          'Arpegios de 4 notas con inversiones',
          'Patterns de bebop (1235, 1237, etc.)',
          'Saltos de intervalos (3rds, 4ths, 5ths, 6ths)'
        ]
      },
      {
        name: 'Approach Notes y Enclosures',
        duration: 10,
        focus: 'Técnicas de aproximación',
        tempo: '80-100 BPM',
        exercises: [
          'Chromatic approaches a cada chord tone',
          'Diatonic approaches sobre ii-V-I',
          'Enclosures cromáticos y diatónicos',
          'Double chromatic approaches'
        ]
      },
      {
        name: 'Sustituciones Armónicas',
        duration: 10,
        focus: 'Reharmonización',
        exercises: [
          'Practica tritone subs sobre standards',
          'Dominantes secundarios en progresiones',
          'Improvisar sobre cambios sustituidos',
          'Analizar y transcribir reharmonizaciones'
        ]
      },
      {
        name: 'Repertorio',
        duration: 10,
        focus: 'Aplicar todo en contexto',
        exercises: [
          'Trabajar un standard (melodía + cambios)',
          'Improvisar integrando técnicas de la sesión',
          'Practicar comping (si aplica)',
          'Trading 4s o 8s con backing track'
        ]
      },
      {
        name: 'Transcripción',
        duration: 5,
        focus: 'Aprender de los maestros',
        exercises: [
          'Transcribir 2-4 compases de un solo',
          'Analizar las técnicas usadas',
          'Tocar el fragmento en diferentes tonalidades'
        ]
      }
    ],
    tips: [
      'Alterna días con énfasis diferente (técnica vs improvisación)',
      'Mantén un diario de práctica',
      'Trabaja con backing tracks de calidad',
      'No olvides trabajar time y groove'
    ]
  },
  {
    id: 'advanced-60min',
    name: 'Rutina Avanzada (60 min)',
    level: 'advanced',
    duration: 60,
    description: 'Rutina completa para músicos avanzados que buscan excelencia',
    goals: [
      'Mantener y expandir técnica de alto nivel',
      'Desarrollar voz personal única',
      'Dominar contextos armónicos complejos',
      'Preparación para performance profesional'
    ],
    sections: [
      {
        name: 'Calentamiento Técnico',
        duration: 10,
        focus: 'Técnica de alto nivel',
        tempo: '120-200+ BPM',
        exercises: [
          'Todas las escalas mayores y menores en tempo rápido',
          'Patterns bebop en todas las tonalidades',
          'Arpegios con alteraciones (♭9, #11, ♭13)',
          'Hexatonic scales y diminished patterns',
          'Pentatónicas sobrepuestas'
        ]
      },
      {
        name: 'Técnicas Avanzadas de Improvisación',
        duration: 15,
        focus: 'Outside playing y conceptos modernos',
        tempo: 'Variable',
        exercises: [
          'Side-slipping y superimposición',
          'Polyrhythms y metric modulation',
          'Coltrane changes y reharmonizaciones complejas',
          'Angular lines y wide intervals',
          'Integrar cromatismos avanzados',
          'Target notes con delayed resolution'
        ]
      },
      {
        name: 'Análisis y Aplicación',
        duration: 15,
        focus: 'Profundizar en armonía y melodía',
        exercises: [
          'Analizar un solo completo de un maestro',
          'Identificar sustituciones y técnicas',
          'Tocar el solo en diferentes tonalidades',
          'Extraer conceptos y aplicarlos a otros contextos',
          'Crear variaciones del material transcrito'
        ]
      },
      {
        name: 'Repertorio y Performance',
        duration: 15,
        focus: 'Preparación de material de concierto',
        exercises: [
          'Trabajar 2-3 tunes en profundidad',
          'Improvisar múltiples chorus desarrollando ideas',
          'Practicar intros, endings, y transiciones',
          'Simular situación de performance (grabarte)',
          'Trabajar interaction con ritmo (time, groove, dynamics)'
        ]
      },
      {
        name: 'Composición e Improvisación Libre',
        duration: 5,
        focus: 'Desarrollar voz personal',
        exercises: [
          'Improvisación libre sin cambios',
          'Crear motivos y desarrollarlos',
          'Experimentar con técnicas extendidas',
          'Composición espontánea'
        ]
      }
    ],
    tips: [
      'Varía tu rutina semanalmente para evitar estancamiento',
      'Dedica días específicos a diferentes aspectos (técnica, armonía, ritmo)',
      'Toca con otros músicos regularmente',
      'Escucha activamente música nueva constantemente',
      'Mantén la curiosidad y experimenta con nuevos conceptos',
      'Considera estudiar con un mentor o profesor'
    ]
  },
  {
    id: 'focused-technique',
    name: 'Sesión de Técnica Pura (30 min)',
    level: 'intermediate',
    duration: 30,
    description: 'Dedicada 100% al desarrollo técnico',
    goals: [
      'Mejorar velocidad y precisión',
      'Desarrollar independencia',
      'Construir resistencia'
    ],
    sections: [
      {
        name: 'Escalas',
        duration: 10,
        focus: 'Velocidad y limpieza',
        tempo: 'Incrementar gradualmente',
        exercises: [
          'Todas las escalas mayores en ciclo de 5tas',
          'Modos en posiciones fijas',
          'Escalas en 3rds, 4ths, 5ths, 6ths',
          'Patterns rítmicos (tripletas, semicorcheas, seisillos)'
        ]
      },
      {
        name: 'Arpegios',
        duration: 10,
        focus: 'Saltos y conexiones',
        exercises: [
          'Arpegios de 7ma con inversiones',
          'Arpegios extendidos (9na, 11va, 13va)',
          'Conectar arpegios en progresiones',
          'Arpegios en diferentes strings/posiciones'
        ]
      },
      {
        name: 'Patterns y Secuencias',
        duration: 10,
        focus: 'Vocabulario técnico',
        exercises: [
          'Bebop scales con passing tones',
          'Cycles: 1235, 1237, 5123, etc.',
          'Chromatic patterns',
          'Intervallic patterns'
        ]
      }
    ],
    tips: [
      'Usa metrónomo y aumenta tempo gradualmente',
      'Mantén la relajación y la economía de movimiento',
      'Practica con diferentes articulaciones',
      'Graba y analiza tu técnica'
    ]
  },
  {
    id: 'ear-training',
    name: 'Entrenamiento de Oído (20 min)',
    level: 'beginner',
    duration: 20,
    description: 'Desarrollar el oído y la conexión mente-instrumento',
    goals: [
      'Mejorar reconocimiento de intervalos y acordes',
      'Tocar lo que escuchas mentalmente',
      'Desarrollar oído relativo/absoluto'
    ],
    sections: [
      {
        name: 'Intervalos',
        duration: 5,
        focus: 'Reconocimiento melódico',
        exercises: [
          'Cantar y tocar intervalos desde cualquier nota',
          'Identificar intervalos en canciones',
          'Tocar melodías de oído'
        ]
      },
      {
        name: 'Acordes y Progresiones',
        duration: 10,
        focus: 'Reconocimiento armónico',
        exercises: [
          'Identificar calidad de acordes (maj7, m7, dom7, etc.)',
          'Reconocer progresiones comunes (ii-V-I, I-vi-ii-V)',
          'Tocar progresiones de oído',
          'Identificar bass lines'
        ]
      },
      {
        name: 'Transcripción',
        duration: 5,
        focus: 'Aplicación práctica',
        exercises: [
          'Transcribir frases cortas de solos',
          'Sacar melodías de standards',
          'Identificar sustituciones en grabaciones'
        ]
      }
    ],
    tips: [
      'Practica sin el instrumento también (solfeo)',
      'Usa apps de ear training como complemento',
      'Canta todo lo que tocas',
      'Transcribe pequeños fragmentos diariamente'
    ]
  },
  {
    id: 'blues-specific',
    name: 'Rutina Blues Específica (30 min)',
    level: 'intermediate',
    duration: 30,
    description: 'Enfoque total en el lenguaje blues y sus aplicaciones en jazz',
    goals: [
      'Dominar pentatónicas blues en todas las posiciones',
      'Desarrollar fraseo blues auténtico',
      'Integrar blues con jazz bebop'
    ],
    sections: [
      {
        name: 'Pentatónicas Blues',
        duration: 10,
        focus: 'Dominar las 5 posiciones',
        tempo: '80-100 BPM',
        exercises: [
          'Blues menor pentatónica en todas las posiciones',
          'Agregar blue note (b5) en cada posición',
          'Mixtas: pentatónica mayor + menor en un solo chorus',
          'Bends característicos del blues en cada posición'
        ]
      },
      {
        name: 'Blues Form y Changes',
        duration: 10,
        focus: 'Navegación de blues de 12 compases',
        exercises: [
          'Blues en F: trabajar cambios I7-IV7-I7-V7',
          'Aproximaciones cromáticas en cada cambio',
          'Riffs característicos sobre cada acorde',
          'Turnarounds blues (compases 11-12)'
        ]
      },
      {
        name: 'Blues Meets Bebop',
        duration: 10,
        focus: 'Integrar blues con lenguaje jazz',
        exercises: [
          'Bebop scales sobre blues en Bb',
          'Sustituciones en blues (iii-vi-ii-V en compases 9-10)',
          'Charlie Parker licks sobre blues',
          'Combinar pentatónicas con aproximaciones cromáticas'
        ]
      }
    ],
    tips: [
      'Escucha blues auténtico: B.B. King, Grant Green, Kenny Burrell',
      'El blues es sobre el feeling y el espacio, no solo las notas',
      'Practica call and response: toca una frase, responde con otra',
      'Trabaja el vibrato y los bends - son esenciales en el blues'
    ]
  },
  {
    id: 'comping-voicings',
    name: 'Rutina Comping y Voicings (20 min)',
    level: 'intermediate',
    duration: 20,
    description: 'Desarrollar habilidades de acompañamiento y voicings de acordes',
    goals: [
      'Construir vocabulario de voicings',
      'Desarrollar ritmo y groove en comping',
      'Crear voice leading suave'
    ],
    sections: [
      {
        name: 'Voicings Fundamentales',
        duration: 8,
        focus: 'Drop 2, Drop 3, Shell voicings',
        exercises: [
          'Drop 2 voicings de maj7, m7, dom7 en todas las cuerdas',
          'Shell voicings (3-7-R) en progresiones ii-V-I',
          'Voicings cuartales sobre acordes menores y dominantes',
          'Voicings de 3 notas con voice leading cromático'
        ]
      },
      {
        name: 'Ritmo y Comping',
        duration: 7,
        focus: 'Patrones rítmicos y groove',
        tempo: 'Medium swing, 120 BPM',
        exercises: [
          'Comping en 2 y 4 sobre ii-V-I',
          'Charleston rhythm en jazz',
          'Syncopated rhythms: anticipaciones y delays',
          'Comping mientras otro músico improvisa (backing track)'
        ]
      },
      {
        name: 'Voice Leading',
        duration: 5,
        focus: 'Conexiones suaves entre acordes',
        exercises: [
          'Movimientos de semitono entre acordes',
          'Voice leading cromático en ii-V-I',
          'Mantener notas comunes entre acordes',
          'Reharmonización con voice leading'
        ]
      }
    ],
    tips: [
      'Escucha grandes compers: Freddie Green, Jim Hall, Joe Pass',
      'Menos es más - no toques en cada beat',
      'Deja espacio para el solista',
      'Tu comping debe hacer que otros músicos suenen bien'
    ]
  },
  {
    id: 'standards-by-style',
    name: 'Standards por Estilo (30 min)',
    level: 'intermediate',
    duration: 30,
    description: 'Trabajar standards según diferentes estilos de jazz',
    goals: [
      'Dominar standards en diferentes contextos estilísticos',
      'Desarrollar vocabulario específico para cada estilo',
      'Entender las diferencias interpretativas'
    ],
    sections: [
      {
        name: 'Bebop Standard',
        duration: 10,
        focus: 'Tempo rápido, cambios densos',
        tempo: '200+ BPM',
        exercises: [
          'Ejemplo: "Confirmation" o "Donna Lee"',
          'Arpegios de 4 notas a tempo',
          'Aproximaciones cromáticas en cambios rápidos',
          'Bebop scales sobre cada acorde'
        ]
      },
      {
        name: 'Modal Standard',
        duration: 10,
        focus: 'Pocas cambios, exploración modal',
        tempo: 'Medium, 120-140 BPM',
        exercises: [
          'Ejemplo: "So What" o "Impressions"',
          'Explorar D Dórico con pentatónicas',
          'Desarrollar motivos melódicos',
          'Uso del espacio y dinámica'
        ]
      },
      {
        name: 'Balada',
        duration: 10,
        focus: 'Tempo lento, expresión',
        tempo: '60-80 BPM',
        exercises: [
          'Ejemplo: "Body and Soul" o "Misty"',
          'Rubato en melodía',
          'Voicings complejos y reharmonización',
          'Fraseo vocal y expresivo'
        ]
      }
    ],
    tips: [
      'Cada estilo requiere vocabulario y approach diferentes',
      'Escucha versiones definitivas de cada standard',
      'Adapta tu técnica al tempo y mood del standard',
      'Aprende la historia y contexto de cada tune'
    ]
  }
];

export const weeklySchedule = {
  title: 'Ejemplo de Rutina Semanal (Intermedio/Avanzado)',
  description: 'Distribución sugerida de práctica durante la semana',
  schedule: [
    {
      day: 'Lunes',
      focus: 'Técnica + Repertorio',
      routine: 'Rutina Intermedia (45 min) + Trabajar standards (30 min)'
    },
    {
      day: 'Martes',
      focus: 'Ear Training + Transcripción',
      routine: 'Ear Training (20 min) + Transcribir solos (40 min)'
    },
    {
      day: 'Miércoles',
      focus: 'Técnica Pura',
      routine: 'Sesión de Técnica (30 min) + Improvisación libre (20 min)'
    },
    {
      day: 'Jueves',
      focus: 'Armonía y Sustituciones',
      routine: 'Estudiar sustituciones (30 min) + Aplicar en standards (30 min)'
    },
    {
      day: 'Viernes',
      focus: 'Performance',
      routine: 'Rutina completa (45 min) + Simulacro de performance (grabar)'
    },
    {
      day: 'Sábado',
      focus: 'Jam session / Tocar con otros',
      routine: 'Aplicar todo lo aprendido en contexto real'
    },
    {
      day: 'Domingo',
      focus: 'Descanso / Escucha activa',
      routine: 'Escuchar álbumes completos y analizar'
    }
  ]
};

export const practiceGuidelines = [
  {
    title: 'Calidad sobre Cantidad',
    description: '30 minutos enfocados son mejores que 2 horas distraídas. Elimina distracciones y practica con intención.'
  },
  {
    title: 'Practica Lenta',
    description: 'Si no puedes tocarlo lento y limpio, no puedes tocarlo rápido. Empieza a 60-70% del tempo objetivo.'
  },
  {
    title: 'Usa Metrónomo',
    description: 'El tiempo es lo más importante. Practica con metrónomo en beats 2 y 4 para simular un baterista.'
  },
  {
    title: 'Grábate',
    description: 'Grabarte es la mejor manera de ser objetivo sobre tu progreso. Hazlo semanalmente.'
  },
  {
    title: 'Mantén un Diario',
    description: 'Anota qué practicaste, qué funcionó, y qué necesitas mejorar. Revísalo mensualmente.'
  },
  {
    title: 'Varía tu Rutina',
    description: 'No hagas exactamente lo mismo todos los días. Alterna focos para mantener el interés y desarrollo balanceado.'
  },
  {
    title: 'Descansa',
    description: 'El progreso ocurre durante el descanso. No practiques 7 días a la semana si estás cansado.'
  },
  {
    title: 'Toca Música',
    description: 'No olvides que el objetivo es hacer música. Incluye tiempo para simplemente disfrutar tocando.'
  }
];
