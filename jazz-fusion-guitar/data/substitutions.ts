export interface HarmonicSubstitution {
  id: string;
  name: string;
  description: string;
  type: 'tritone' | 'diatonic' | 'modal' | 'chromatic' | 'reharmonization';
  original: string;
  substitution: string;
  example: {
    progression: string;
    substituted: string;
    context: string;
  };
  theory: string;
  useCases: string[];
  soundDescription: string;
  artists: string[];
}

export const harmonicSubstitutions: HarmonicSubstitution[] = [
  {
    id: 'tritone-sub',
    name: 'Tritone Substitution',
    description: 'Sustituir un acorde dominante por otro dominante a distancia de tritono',
    type: 'tritone',
    original: 'G7',
    substitution: 'D♭7',
    example: {
      progression: 'Dm7 - G7 - Cmaj7',
      substituted: 'Dm7 - D♭7 - Cmaj7',
      context: 'ii-V-I en C mayor'
    },
    theory: 'Los acordes dominantes separados por un tritono comparten las mismas guide tones (3ra y 7ma). G7 (B-F) vs D♭7 (F-C♭/B). Al resolver, D♭ baja medio tono a C, creando un voice leading cromático descendente muy suave.',
    useCases: [
      'En progresiones ii-V-I para crear movimiento cromático',
      'En turnarounds de blues y jazz',
      'Para crear reharmonizaciones más sofisticadas',
      'Antes de resoluciones importantes'
    ],
    soundDescription: 'Suena más sofisticado y "jazzy". El movimiento cromático descendente del bajo es muy característico del bebop.',
    artists: ['Charlie Parker', 'Dizzy Gillespie', 'Thelonious Monk', 'Bill Evans']
  },
  {
    id: 'tritone-sub-extended',
    name: 'Tritone Sub con ii-V',
    description: 'Sustituir todo el ii-V por su tritone sub',
    type: 'tritone',
    original: 'Dm7 - G7',
    substitution: 'A♭m7 - D♭7',
    example: {
      progression: 'Dm7 - G7 - Cmaj7',
      substituted: 'A♭m7 - D♭7 - Cmaj7',
      context: 'ii-V-I completo sustituido'
    },
    theory: 'No solo sustituimos el V7, sino también su ii correspondiente. Mantenemos la relación ii-V pero a distancia de tritono. Esto crea una progresión paralela en otra tonalidad que resuelve cromáticamente.',
    useCases: [
      'Para crear secciones más complejas armónicamente',
      'En reharmonizaciones de standards',
      'Para modular a tonalidades lejanas',
      'En contextos de jazz moderno y fusion'
    ],
    soundDescription: 'Muy outside pero con lógica funcional. Suena a "otra dimensión" que resuelve perfectamente.',
    artists: ['Herbie Hancock', 'Wayne Shorter', 'McCoy Tyner']
  },
  {
    id: 'diatonic-sub',
    name: 'Substitución Diatónica',
    description: 'Reemplazar un acorde por otro de la misma familia funcional en la escala',
    type: 'diatonic',
    original: 'Cmaj7',
    substitution: 'Em7 o Am7',
    example: {
      progression: 'Cmaj7 - Am7 - Dm7 - G7',
      substituted: 'Em7 - Am7 - Dm7 - G7',
      context: 'Sustituir I por iii'
    },
    theory: 'Los acordes diatónicos comparten notas y función. I-iii-vi son tónicos, ii-IV son subdominantes, V-vii° son dominantes. Cmaj7 (C-E-G-B) y Em7 (E-G-B-D) comparten 3 notas.',
    useCases: [
      'Para crear movimiento armónico sin cambiar la función',
      'En baladas para evitar acordes repetidos',
      'Para crear bajo walking más interesante',
      'En composición para variar secciones'
    ],
    soundDescription: 'Suave y natural. No cambia drásticamente el color pero añade variedad.',
    artists: ['Bill Evans', 'Oscar Peterson', 'Brad Mehldau']
  },
  {
    id: 'secondary-dominant',
    name: 'Dominantes Secundarios',
    description: 'Preceder cualquier acorde con su V7',
    type: 'chromatic',
    original: 'Dm7',
    substitution: 'A7 - Dm7',
    example: {
      progression: 'Cmaj7 - Dm7 - G7 - Cmaj7',
      substituted: 'Cmaj7 - A7 - Dm7 - G7 - Cmaj7',
      context: 'Agregar V7/ii antes del ii'
    },
    theory: 'Cualquier acorde puede ser precedido por su dominante (V7). A7 es el V de D menor. Esto crea mini-modulaciones temporales y añade tensión y resolución.',
    useCases: [
      'Para crear más movimiento armónico',
      'En walking bass para añadir cromatismo',
      'Para hacer progresiones más interesantes',
      'En jazz tradicional y bebop'
    ],
    soundDescription: 'Añade energía y dirección. Cada acorde "pide" llegar al siguiente.',
    artists: ['Charlie Parker', 'Bud Powell', 'Art Tatum']
  },
  {
    id: 'modal-interchange',
    name: 'Modal Interchange (Intercambio Modal)',
    description: 'Tomar acordes prestados de escalas paralelas',
    type: 'modal',
    original: 'C - Dm - Em - F (C Mayor)',
    substitution: 'C - Dm - E♭ - F (tomar ♭III de C menor)',
    example: {
      progression: 'C - F - G - C',
      substituted: 'C - A♭ - B♭ - C',
      context: 'Usar ♭VI y ♭VII de C menor en C mayor'
    },
    theory: 'Las escalas paralelas (C mayor y C menor) comparten la tónica pero tienen diferentes acordes. Podemos "prestar" acordes de una a otra. A♭ y B♭ vienen de C menor natural.',
    useCases: [
      'Para crear progresiones más cinematicas',
      'En rock progresivo y metal',
      'Para oscurecer progresiones mayores',
      'En baladas y temas emotivos'
    ],
    soundDescription: 'Añade drama y emoción. Mezcla mayor/menor de forma efectiva.',
    artists: ['The Beatles', 'Radiohead', 'Steely Dan', 'Chick Corea']
  },
  {
    id: 'diminished-sub',
    name: 'Substitución Disminuida',
    description: 'Usar acordes disminuidos como acordes de paso cromáticos',
    type: 'chromatic',
    original: 'C - Dm',
    substitution: 'C - C#dim - Dm',
    example: {
      progression: 'Cmaj7 - Dm7',
      substituted: 'Cmaj7 - C#dim7 - Dm7',
      context: 'Acorde disminuido de paso'
    },
    theory: 'Los acordes disminuidos son simétricos (cada 3 semitonos) y pueden resolver a acordes medio tono arriba o abajo. C#dim7 (C#-E-G-B♭) contiene la 7ma de Dm7 y crea tensión que resuelve.',
    useCases: [
      'Como acordes de paso entre grados',
      'Para crear movimiento cromático en el bajo',
      'En jazz tradicional y swing',
      'Para suavizar saltos grandes entre acordes'
    ],
    soundDescription: 'Clásico del jazz tradicional. Suena vintage y sofisticado.',
    artists: ['Art Tatum', 'Oscar Peterson', 'George Shearing']
  },
  {
    id: 'sus-sub',
    name: 'Substitución por Suspensión',
    description: 'Reemplazar dominantes V7 por V7sus4',
    type: 'reharmonization',
    original: 'G7',
    substitution: 'G7sus4',
    example: {
      progression: 'Dm7 - G7 - Cmaj7',
      substituted: 'Dm7 - G7sus4 - Cmaj7',
      context: 'Suspender el V7 antes de resolver'
    },
    theory: 'En lugar de la 3ra, usamos la 4ta suspendida. G7sus4 = G-C-D-F. Elimina el tritono temporalmente, creando más ambigüedad y tensión que se resuelve mejor.',
    useCases: [
      'Para crear más tensión antes de resolver',
      'En baladas y temas lentos',
      'En jazz modal y fusion',
      'Para evitar sonidos muy tradicionales'
    ],
    soundDescription: 'Más modal y moderno. Menos definido funcionalmente pero más colorido.',
    artists: ['McCoy Tyner', 'Herbie Hancock', 'Pat Metheny']
  },
  {
    id: 'backdoor-ii-v',
    name: 'Backdoor ii-V',
    description: 'Usar ♭VII7-IV en lugar de V7-I',
    type: 'reharmonization',
    original: 'G7 - Cmaj7',
    substitution: 'B♭7 - Cmaj7',
    example: {
      progression: 'Dm7 - G7 - Cmaj7',
      substituted: 'Fm7 - B♭7 - Cmaj7',
      context: 'Backdoor resolution en vez de dominante normal'
    },
    theory: 'En lugar del V7 (G7), usamos el ♭VII7 (B♭7) que proviene del mixolidio. B♭ (♭VII) resuelve medio tono arriba a C, y F (4ta de C) actúa como nota guía. Es una resolución plagal con color dominante.',
    useCases: [
      'Para evitar la resolución V-I tradicional',
      'En standards de jazz y bossa nova',
      'Para crear finales más suaves',
      'En reharmonizaciones sofisticadas'
    ],
    soundDescription: 'Más suave que V7-I. Suena elegante y menos conclusivo.',
    artists: ['Bill Evans', 'Wes Montgomery', 'Joe Pass']
  },
  {
    id: 'coltrane-changes',
    name: 'Coltrane Changes',
    description: 'Dividir un acorde en 3 tonalidades mayores separadas por 3ras mayores',
    type: 'reharmonization',
    original: 'Cmaj7 (4 compases)',
    substitution: 'Cmaj7 - E♭maj7 - G♭maj7 - Cmaj7',
    example: {
      progression: 'Cmaj7',
      substituted: 'Cmaj7 - E♭7 - A♭maj7 - B7 - Emaj7 - G7 - Cmaj7',
      context: 'Giant Steps changes'
    },
    theory: 'Dividir la armonía en 3 centros tonales equidistantes (C-E-G♯). Cada cambio se conecta con ii-Vs. Esto crea un ciclo de 3ras mayores que eventualmente regresa al inicio. Extremadamente cromático y desafiante.',
    useCases: [
      'Para crear secciones ultra-complejas',
      'En jazz moderno y vanguardia',
      'Como ejercicio de técnica armónica',
      'Para reharmonizar secciones estáticas'
    ],
    soundDescription: 'Extremadamente denso y cromático. Requiere técnica avanzada para improvisar.',
    artists: ['John Coltrane', 'Michael Brecker', 'Chris Potter', 'Kurt Rosenwinkel']
  },
  {
    id: 'approach-chords',
    name: 'Approach Chords',
    description: 'Aproximarse a un acorde desde medio tono arriba o abajo',
    type: 'chromatic',
    original: 'Cmaj7',
    substitution: 'Dmaj7 - D♭maj7 - Cmaj7',
    example: {
      progression: 'Fmaj7 - Cmaj7',
      substituted: 'Fmaj7 - D♭maj7 - Cmaj7',
      context: 'Approach chord cromático'
    },
    theory: 'Similar a approach notes pero con acordes completos. El acorde a medio tono arriba o abajo crea tensión que resuelve cromáticamente. Puedes usar la misma calidad (maj7, m7, dom7) o variarla.',
    useCases: [
      'Para añadir acordes extra sin cambiar la función',
      'En intros y endings',
      'Para crear movimiento de bajo cromático',
      'En jazz contemporáneo'
    ],
    soundDescription: 'Sofisticado y fluido. El movimiento cromático es muy elegante.',
    artists: ['Pat Metheny', 'Brad Mehldau', 'Kurt Rosenwinkel']
  },
  {
    id: 'extended-dominants',
    name: 'Cadena de Dominantes Extendidos',
    description: 'Crear una cadena de dominantes secundarios que resuelven entre sí',
    type: 'chromatic',
    original: 'Dm7 - G7 - Cmaj7',
    substitution: 'A7 - D7 - G7 - Cmaj7',
    example: {
      progression: 'ii-V-I en C',
      substituted: 'V7/ii - V7/V - V7 - I',
      context: 'Cadena de resoluciones por quintas'
    },
    theory: 'Cada acorde es el V7 del siguiente. Crea máximo movimiento armónico. A7→D, D7→G, G7→C. Muy usado en bebop y en turnarounds.',
    useCases: [
      'En turnarounds para añadir cromatismo',
      'En secciones de puente',
      'Para crear builds antes de resoluciones importantes',
      'En jazz tradicional y bebop'
    ],
    soundDescription: 'Energético y direccional. Cada acorde "pide" llegar al siguiente con urgencia.',
    artists: ['Charlie Parker', 'Clifford Brown', 'Sonny Rollins']
  },
  {
    id: 'multi-tritone',
    name: 'Cadena de Sustituciones de Tritono',
    description: 'Sustituir múltiples dominantes con sus tritones',
    type: 'tritone',
    original: 'A7 - D7 - G7 - Cmaj7',
    substitution: 'Eb7 - Ab7 - Db7 - Cmaj7',
    example: {
      progression: 'Cadena de dominantes',
      substituted: 'Cadena de tritones cromáticos',
      context: 'Movimiento descendente de semitonos'
    },
    theory: 'Cada dominante se sustituye por su tritono. Crea línea de bajo cromática descendente Eb-Ab-Db-C. Movimiento de medio tono es muy smooth.',
    useCases: [
      'Para crear líneas de bajo cromáticas elegantes',
      'En reharmonizaciones sofisticadas',
      'Jazz moderno y bebop avanzado',
      'En endings y turnarounds especiales'
    ],
    soundDescription: 'Sofisticadísimo. El movimiento cromático del bajo es irresistible.',
    artists: ['Bill Evans', 'Oscar Peterson', 'Barry Harris']
  },
  {
    id: 'relative-ii-v',
    name: 'Sustitución por ii-V Relativo',
    description: 'Sustituir un acorde estático con un ii-V que resuelve a él',
    type: 'reharmonization',
    original: 'Cmaj7 (4 compases)',
    substitution: 'Cmaj7 - Dm7 - G7 - Cmaj7',
    example: {
      progression: 'Cmaj7 estático',
      substituted: 'I - ii - V - I',
      context: 'Añadir movimiento a sección estática'
    },
    theory: 'En lugar de mantener un acorde estático, crear ii-V que resuelve al mismo acorde. Añade movimiento sin cambiar la función fundamental.',
    useCases: [
      'En secciones de acordes largos',
      'Para añadir interés armónico',
      'En acompañamiento y comping',
      'Standards con acordes de varios compases'
    ],
    soundDescription: 'Añade dirección y movimiento sin sorpresas dramáticas.',
    artists: ['Bill Evans', 'Herbie Hancock', 'Kenny Barron']
  },
  {
    id: 'hybrid-substitution',
    name: 'Sustitución Híbrida (Tritono + Intercambio Modal)',
    description: 'Combinar sustituciones de tritono con intercambio modal',
    type: 'reharmonization',
    original: 'Dm7 - G7 - Cmaj7',
    substitution: 'Fm7 - Bb7 - Cmaj7',
    example: {
      progression: 'ii-V-I en C Mayor',
      substituted: 'ii-V prestado de C menor + backdoor',
      context: 'Mezcla conceptos de sustitucón'
    },
    theory: 'Fm7-Bb7 viene de C menor (intercambio modal) y Bb7 también funciona como backdoor ii-V. Doble función: prestado Y sustituto.',
    useCases: [
      'Reharmonizaciones avanzadas',
      'Jazz contemporáneo',
      'Para oscurecer progresiones mayores',
      'Transiciones dramáticas'
    ],
    soundDescription: 'Dramático y emotivo. Mezcla oscuridad del menor con sofisticación del backdoor.',
    artists: ['Brad Mehldau', 'Robert Glasper', 'Bill Evans']
  },
  {
    id: 'slash-chord-sub',
    name: 'Sustitución con Slash Chords',
    description: 'Usar acordes slash (triada/bajo) como sustitutos de acordes complejos',
    type: 'reharmonization',
    original: 'Cmaj9',
    substitution: 'Em7/C o G/C',
    example: {
      progression: 'Cmaj9',
      substituted: 'Em7/C (mismo sonido, diferente voicing)',
      context: 'Voicings modernos y abiertos'
    },
    theory: 'Em7 sobre bajo C contiene: E-G-B-D sobre C = Cmaj9. G sobre C: G-B-D sobre C = Cmaj7(9). Misma armonía, visualización más simple.',
    useCases: [
      'Voicings de piano y guitarra',
      'Jazz contemporáneo y fusion',
      'Para simplificar la visualización',
      'Comping moderno'
    ],
    soundDescription: 'Suena a jazz moderno. Voicings más abiertos y espaciados.',
    artists: ['Bill Evans', 'Keith Jarrett', 'Brad Mehldau', 'Chick Corea']
  }
];

export const reharmonizationStrategies = [
  {
    title: 'Densificar Armonía',
    description: 'Agregar más cambios de acordes a una progresión existente',
    techniques: ['Dominantes secundarios', 'Approach chords', 'Acordes disminuidos de paso'],
    example: 'C - G - C → C - A7 - Dm - G7 - C'
  },
  {
    title: 'Simplificar Armonía',
    description: 'Reducir acordes manteniendo la función',
    techniques: ['Eliminar dominantes secundarios', 'Usar pedal tones', 'Modal interchange'],
    example: 'Dm - G7 - Em - A7 - Dm → Dm (pedal) durante toda la sección'
  },
  {
    title: 'Cambiar Color',
    description: 'Mantener la función pero cambiar el color armónico',
    techniques: ['Sus chords', 'Add9/add11', 'Modal interchange'],
    example: 'G7 - Cmaj7 → G7sus4 - Cmaj7 o G7 - Cm(maj7)'
  },
  {
    title: 'Resoluciones Alternativas',
    description: 'Cambiar hacia dónde resuelven los acordes',
    techniques: ['Deceptive resolutions', 'Tritone subs', 'Backdoor ii-V'],
    example: 'G7 - Cmaj7 → G7 - A♭maj7 (resolución de tritono a ♭VI)'
  }
];
