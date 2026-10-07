export interface ChromaticTechnique {
  name: string;
  description: string;
  application: string;
  example: string;
  tips: string[];
}

export interface ChromaticArtist {
  name: string;
  style: string;
  techniques: string[];
  approach: string;
  listeningRecommendations: string[];
}

export const chromaticTechniques: ChromaticTechnique[] = [
  {
    name: 'Aproximación Cromática',
    description: 'Acercarse a una nota objetivo desde un semitono arriba o abajo.',
    application: 'Se usa antes de notas del acorde o notas fuertes del tiempo. Crea tensión y resolución.',
    example: 'Para llegar a G (5ta de Cmaj7): tocar F# → G o Ab → G',
    tips: [
      'Funciona mejor en tiempos débiles',
      'Usa doble aproximación: F#-Ab-G',
      'Combina con notas del acorde',
    ],
  },
  {
    name: 'Enclosures (Encerramiento)',
    description: 'Rodear una nota objetivo desde arriba y abajo cromática o diatónicamente.',
    application: 'Técnica fundamental del bebop. Crea líneas sofisticadas y direccionales.',
    example: 'Para E (3ra de Cmaj7): D-F-E o D#-F-E (cromático)',
    tips: [
      'Practica patrones: abajo-arriba-objetivo',
      'Usa arriba-abajo-objetivo también',
      'Combina cromático con diatónico',
    ],
  },
  {
    name: 'Patrón Cromático Descendente',
    description: 'Línea cromática descendente que conecta acordes o crea tensión.',
    application: 'Común en jazz fusion para crear intensidad armónica sobre secciones estáticas.',
    example: 'Sobre Dm7: D-C#-C-B-Bb-A (6ta a 5ta cromáticamente)',
    tips: [
      'Pat Metheny usa esto extensivamente',
      'Combina con ritmos irregulares',
      'Resuelve en notas del acorde',
    ],
  },
  {
    name: 'Patrón Cromático Ascendente',
    description: 'Línea cromática ascendente que genera tensión hacia arriba.',
    application: 'Útil para construir clímaxes o para fills sobre acordes dominantes.',
    example: 'Sobre G7: A-Bb-B-C (9-#9-3-4)',
    tips: [
      'Genera mucha tensión',
      'Resuelve hacia extensiones',
      'Combina con bends en guitarra',
    ],
  },
  {
    name: 'Bebop Scales',
    description: 'Escalas de 8 notas con pasos cromáticos agregados para alinear con el tiempo.',
    application: 'Permite tocar escalas en corcheas con notas del acorde en tiempos fuertes.',
    example: 'Bebop Mayor: C-D-E-F-G-G#-A-B (cromático entre 5 y 6)',
    tips: [
      'Bebop Dominante: agrega cromático entre b7 y R',
      'Bebop Dórico: entre 3 y 4',
      'Practica con metrónomo',
    ],
  },
  {
    name: 'Cromatismo en Thirds (Terceras)',
    description: 'Movimiento cromático usando intervalos de tercera.',
    application: 'Crea líneas más gruesas y modernas. Característica del jazz contemporáneo.',
    example: 'Sobre Cmaj7: E-G, Eb-Gb, D-F, C#-E (terceras descendentes cromáticas)',
    tips: [
      'Pat Metheny y Kurt Rosenwinkel usan esto',
      'Practica en diferentes inversiones',
      'Combina con legato',
    ],
  },
  {
    name: 'Sustitución de Tritono Cromática',
    description: 'Usar material cromático del tritono del acorde.',
    application: 'Genera sonoridades alteradas y fuera.',
    example: 'Sobre C7: usar F# menor pentatónica (tritono) con aproximaciones cromáticas',
    tips: [
      'Resuelve a notas del acorde real',
      'Combina con alteraciones',
      'Crea tensión-resolución',
    ],
  },
  {
    name: 'Cromatismo Modal',
    description: 'Usar notas cromáticas para transitar entre modos.',
    application: 'Conecta diferentes colores modales suavemente.',
    example: 'De Dórico a Eólico: G Dórico (E natural) → Eb (cromático) → G Eólico (Eb)',
    tips: [
      'Piensa en intercambio modal',
      'Usa como puente entre secciones',
      'Allan Holdsworth explora esto',
    ],
  },
  {
    name: 'Cromatismo en Walking Bass',
    description: 'Uso de notas cromáticas para conectar acordes en líneas de bajo.',
    application: 'Fundamental en el jazz para crear líneas de bajo fluidas que conectan acordes.',
    example: 'De Dm7 a G7: D-F-A-C → C#(cromático)-D-F-B (llegando a G7)',
    tips: [
      'Usa cromatismo en el último beat para conectar',
      'Aproximaciones desde arriba o abajo al siguiente acorde',
      'Combina con double stops para enriquecer',
    ],
  },
  {
    name: 'Cromatismo en Comping',
    description: 'Movimientos cromáticos en voicings de acordes para crear voice leading suave.',
    application: 'Crear progresiones de acordes más sofisticadas y conectadas.',
    example: 'Cmaj7: C-E-G-B → moviendo una voz cromáticamente: C-E-G-Bb (C7)',
    tips: [
      'Mueve solo una o dos voces cromáticamente',
      'Mantén el bajo estable mientras mueves voces internas',
      'Pat Metheny usa esto en voicings abiertos',
    ],
  },
];

export const chromaticArtists: ChromaticArtist[] = [
  {
    name: 'Pat Metheny',
    style: 'Jazz Fusion / Contemporary Jazz',
    techniques: [
      'Líneas cromáticas largas y fluidas',
      'Cromatismo en terceras y cuartas',
      'Patrones cromáticos con delay',
      'Aproximaciones cromáticas en todos los tiempos',
    ],
    approach:
      'Pat Metheny es conocido por sus líneas largas y cantables que incorporan cromatismo de forma muy melódica. No piensa el cromatismo como "notas fuera" sino como parte integral de la melodía. Usa patrones cromáticos descendentes sobre acordes estáticos, y aproximaciones cromáticas para suavizar saltos. Su uso del delay amplifica los efectos cromáticos.',
    listeningRecommendations: [
      'Bright Size Life - "Bright Size Life"',
      '80/81 - "80/81" (con Michael Brecker)',
      'The Way Up - "The Way Up"',
      'Question and Answer - álbum completo',
    ],
  },
  {
    name: 'John Scofield',
    style: 'Jazz Fusion / Post-Bop',
    techniques: [
      'Bebop scales extensivamente',
      'Aproximaciones cromáticas sincopadas',
      'Cromatismo bluesy con alteraciones',
      'Double stops cromáticos',
    ],
    approach:
      'Scofield combina el lenguaje bebop tradicional con cromatismo más rudo y blues. Usa aproximaciones cromáticas de forma muy rítmica, a menudo en contratiempo. Sus líneas tienen un sabor más angular que Metheny, y abraza las disonancias cromáticas con confianza.',
    listeningRecommendations: [
      'A Go Go - "A Go Go"',
      'Time On My Hands - álbum completo',
      'Blue Matter - "Blue Matter"',
      'Quiet - "Quiet"',
    ],
  },
  {
    name: 'Michael Brecker',
    style: 'Jazz Fusion / Saxophone',
    techniques: [
      'Enclosures complejos (dobles y triples)',
      'Cromatismo combinado con escala disminuida',
      'Pasos cromáticos en secuencias',
      'Aproximaciones desde ambos lados',
    ],
    approach:
      'Aunque es saxofonista, sus conceptos son totalmente aplicables a guitarra. Brecker era maestro del enclosure y la aproximación cromática. Sus líneas son extremadamente direccionales, siempre empujando hacia adelante. Combina cromatismo con escalas alteradas y disminuidas para crear un vocabulario muy denso.',
    listeningRecommendations: [
      'Don\'t Try This at Home - álbum completo',
      'Tales from the Hudson - "Tales from the Hudson"',
      'Con Steps Ahead - "Modern Times"',
      'Pilgrimage - "Pilgrimage"',
    ],
  },
  {
    name: 'Kurt Rosenwinkel',
    style: 'Contemporary Jazz / Post-Bop',
    techniques: [
      'Cromatismo en intervalos (terceras, cuartas)',
      'Líneas cromáticas con efectos',
      'Aproximaciones melódicas largas',
      'Cromatismo dentro de arpegios extendidos',
    ],
    approach:
      'Rosenwinkel tiene un sonido muy moderno que integra cromatismo de forma casi imperceptible. Usa terceras paralelas cromáticas, y sus líneas a menudo suenan vocales a pesar de ser muy cromáticas. Combina cromatismo con chorus y delay para crear texturas únicas.',
    listeningRecommendations: [
      'The Next Step - álbum completo',
      'Deep Song - "Deep Song"',
      'The Enemies of Energy - álbum completo',
      'Star of Jupiter - "Star of Jupiter"',
    ],
  },
  {
    name: 'Allan Holdsworth',
    style: 'Fusion / Progressive',
    techniques: [
      'Líneas cromáticas legato ultra-rápidas',
      'Cromatismo entre escalas exóticas',
      'Acordes voicings cromáticos',
      'Cromatismo en secuencias de intervalos',
    ],
    approach:
      'Holdsworth pensaba en el cromatismo como parte de sus sistemas escalares únicos. Sus líneas cromáticas son increíblemente fluidas gracias a su técnica legato. No diferenciaba mucho entre cromático y diatónico - todo era parte del flujo melódico. Su aproximación es muy interválica y menos basada en patrones tradicionales.',
    listeningRecommendations: [
      'Metal Fatigue - "Metal Fatigue"',
      'Road Games - "Road Games"',
      'Atavachron - álbum completo',
      'Sand - "Sand"',
    ],
  },
  {
    name: 'George Benson',
    style: 'Jazz / Bebop / Soul Jazz',
    techniques: [
      'Bebop scales clásicas',
      'Aproximaciones cromáticas tradicionales',
      'Cromatismo en octavas',
      'Enclosures bebop',
    ],
    approach:
      'Benson representa el cromatismo bebop clásico aplicado de forma impecable. Su timing es perfecto, y sus aproximaciones cromáticas siempre resuelven exactamente donde deben. Es un maestro de hacer que el cromatismo suene natural y cantable, nunca forzado.',
    listeningRecommendations: [
      'Breezin\' - "Breezin\'"',
      'White Rabbit - "White Rabbit"',
      'The George Benson Cookbook - álbum completo',
      'Beyond the Blue Horizon - álbum completo',
    ],
  },
];

export const chromaticExercises = [
  {
    title: 'Aproximaciones Simples',
    description: 'Practica aproximar cada nota del acorde desde un semitono.',
    steps: [
      'Toca el arpegio de Cmaj7: C-E-G-B',
      'Aproxima cada nota desde abajo: B-C, Eb-E, F#-G, Bb-B',
      'Aproxima desde arriba: Db-C, F-E, Ab-G, C-B',
      'Combina: B-Db-C, Eb-F-E, etc.',
    ],
  },
  {
    title: 'Enclosures en ii-V-I',
    description: 'Aplica enclosures a progresiones comunes.',
    steps: [
      'Progresión: Dm7 - G7 - Cmaj7',
      'Enclosure a D (raíz Dm7): C#-Eb-D',
      'Enclosure a B (3ra G7): Bb-C-B',
      'Enclosure a C (raíz Cmaj7): B-Db-C',
      'Crea una línea conectando todo',
    ],
  },
  {
    title: 'Escala Bebop Mayor',
    description: 'Practica la escala bebop para mantener notas fuertes en tiempos.',
    steps: [
      'Escala: C-D-E-F-G-G#-A-B',
      'Toca en corcheas con metrónomo',
      'Asegura que C, E, G, B caen en tiempos 1, 2, 3, 4',
      'Practica descendente: B-Bb-A-G#-G-F-E-D-C',
    ],
  },
  {
    title: 'Terceras Cromáticas',
    description: 'Desarrolla líneas en terceras paralelas cromáticas.',
    steps: [
      'Terceras: E-G, Eb-Gb, D-F, Db-E',
      'Practica con diferentes digitaciones',
      'Aplica sobre Cmaj7',
      'Varía el ritmo y articulación',
    ],
  },
];
