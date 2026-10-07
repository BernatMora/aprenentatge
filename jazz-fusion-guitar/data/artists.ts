import { Artist } from '../types/music';

export const artists: Artist[] = [
  {
    id: 'chick-corea',
    name: 'Chick Corea',
    bio: 'Maestro del piano de jazz fusion. Pionero en el uso innovador de pentatónicas superpuestas y secuencias rítmicas complejas.',
    examples: [
      {
        song: 'Spain',
        technique: 'Pentatónicas superpuestas',
        description: 'Líneas descendentes en Eb menor pentatónica. Secuencias en A menor → D Mayor pentatónica (intervalo de 4ta justa).',
        scale: 'Eb menor, A menor, D Mayor pentatónica',
      },
      {
        song: 'Spain',
        technique: 'Patrones rítmicos',
        description: 'Agrupaciones de 5 sobre 4 con material pentatónico, creando polirritmia característica.',
      },
      {
        song: 'Windows',
        technique: 'Sustitución de tritono',
        description: 'Eb Mayor pentatónica sobre A7 (como sustituto tritonal de Eb7).',
        chord: 'A7',
        scale: 'Eb Mayor pentatónica',
      },
      {
        song: 'Varios',
        technique: 'Pentatónicas vs Octatónica',
        description: 'Yuxtaposición de pentatónicas con escala octatónica (disminuida) para crear contraste y tensión armónica.',
      },
    ],
  },
  {
    id: 'herbie-hancock',
    name: 'Herbie Hancock',
    bio: 'Figura pionera del jazz modal y fusion. Maestro de texturas armónicas abiertas y voicings complejos.',
    examples: [
      {
        song: 'Maiden Voyage',
        technique: 'Jazz Modal',
        description: 'Modos Dóricos y pentatónicas menores sobre acordes m7/bajo. A menor pentatónica o A Dórico sobre Am7/D.',
        chord: 'Am7/D',
        scale: 'A menor pentatónica, A Dórico',
      },
      {
        song: 'Chameleon',
        technique: 'Línea de bajo modal',
        description: 'Construida sobre Bb Dórico, delineando Bbm7 - Eb7. Uso de Bb menor pentatónica sobre Bbm7 - Db7sus4.',
        chord: 'Bbm7',
        scale: 'Bb Dórico, Bb menor pentatónica',
      },
      {
        song: 'Varios (Miles Davis Quintet)',
        technique: '"Don\'t Play the Butter Notes"',
        description: 'Consejo de Miles: evitar 3ras y 7mas obvias. Fomenta enfoque en extensiones superiores (USTs y pentatónicas).',
      },
      {
        song: 'Varios',
        technique: 'Voicings cuartales y USTs',
        description: 'Armonía cuartal y estructuras como Bmaj7/Db (interpretable como Db13sus4).',
        chord: 'Db13sus4',
      },
    ],
  },
  {
    id: 'michael-brecker',
    name: 'Michael Brecker',
    bio: 'Saxofonista legendario. Vocabulario armónico sofisticado integrando pentatónicas, escalas alteradas y patrones complejos.',
    examples: [
      {
        song: 'Four Chords (Steps Ahead)',
        technique: 'Pentatónica con alteraciones',
        description: 'F# menor pentatónica con alteraciones Frigias (G y D) sobre F#-11.',
        chord: 'F#-11',
        scale: 'F# menor pentatónica + Frigio',
      },
      {
        song: 'Varios',
        technique: 'ii-V menor',
        description: 'Sobre C#-11 → F#7#9, usa Escala Alterada de F# o G menor melódica.',
        chord: 'F#7#9',
        scale: 'F# Alterada, G menor melódica',
      },
      {
        song: 'While My Lady Sleeps',
        technique: 'Pentatónica sobre Mayor',
        description: 'E menor pentatónica sobre Cmaj9/6. Estrategia: pentatónica menor del III grado para sonido Lidio extendido.',
        chord: 'Cmaj9/6',
        scale: 'E menor pentatónica',
      },
      {
        song: 'Varios',
        technique: 'Sustituciones complejas',
        description: 'C# menor pentatónica sobre Amaj7 (como sustituto de Eb7). Secuencias pentatónicas con notas repetidas.',
        chord: 'Amaj7',
        scale: 'C# menor pentatónica',
      },
    ],
  },
  {
    id: 'allan-holdsworth',
    name: 'Allan Holdsworth',
    bio: 'Guitarrista visionario con estilo fluido como saxofón. Enfoque armónico idiosincrático basado en escalas únicas.',
    examples: [
      {
        song: 'Varios',
        technique: 'Pensamiento escalar',
        description: 'Concebía acordes como implicaciones de escalas. Pensamiento modal o cada acorde como centro tonal propio.',
      },
      {
        song: 'Varios',
        technique: 'Escalas no convencionales',
        description: 'B armónica mayor, E Lidia menor, armónica menor sobre dominantes con b9 en el bajo.',
      },
      {
        song: 'Varios',
        technique: 'Voicings derivados de escalas',
        description: 'Formas de acordes no convencionales directamente derivadas de sus sistemas escalares únicos.',
      },
      {
        song: 'Varios',
        technique: 'Pentatónicas integradas',
        description: 'Pentatónicas en patrones de notas repetidas y secuencias complejas. Exploraba escalas de 5, 6, 7, 8 y 9 notas.',
      },
    ],
  },
  {
    id: 'wes-montgomery',
    name: 'Wes Montgomery',
    bio: 'Leyenda de la guitarra jazz. Famoso por sus octavas y su sonido con el pulgar. Maestro del blues y bebop.',
    examples: [
      {
        song: 'Four on Six',
        technique: 'Pentatónicas en octavas',
        description: 'Líneas en octavas usando pentatónicas menores y mayores. D menor pentatónica sobre Dm7.',
        chord: 'Dm7',
        scale: 'D menor pentatónica',
      },
      {
        song: 'West Coast Blues',
        technique: 'Blues con pentatónicas mixtas',
        description: 'Mezcla pentatónica mayor y menor blues sobre acordes dominantes. Bb mayor + Bb menor sobre Bb7.',
        chord: 'Bb7',
        scale: 'Bb Mayor/menor pentatónica',
      },
      {
        song: 'Varios',
        technique: 'Triadas sobre acordes',
        description: 'Uso extensivo de triadas diatónicas. D Mayor triada sobre G7 para sonar Lidio Dominante.',
        chord: 'G7',
      },
      {
        song: 'Round Midnight',
        technique: 'Aproximaciones cromáticas',
        description: 'Aproximaciones simples y dobles antes de chord tones. Estilo bebop aplicado a baladas.',
      },
    ],
  },
  {
    id: 'john-scofield',
    name: 'John Scofield',
    bio: 'Guitarrista de jazz fusion y post-bop. Conocido por su sonido funky y uso creativo de pentatónicas.',
    examples: [
      {
        song: 'A Go Go',
        technique: 'Pentatónicas superpuestas',
        description: 'Superpone múltiples pentatónicas sobre un acorde. C menor pent. + Eb Mayor pent. sobre Cm7.',
        chord: 'Cm7',
        scale: 'C menor, Eb Mayor pentatónica',
      },
      {
        song: 'Blue Matter',
        technique: 'Outside playing',
        description: 'Pentatónicas fuera de la tonalidad que resuelven. F# menor pent. sobre C7 (tritono).',
        chord: 'C7',
        scale: 'F# menor pentatónica',
      },
      {
        song: 'Varios',
        technique: 'Blues meets jazz',
        description: 'Combina pentatónica blues con escala disminuida. Alteraciones #9 y b9 sobre dominantes.',
      },
      {
        song: 'Time On My Hands',
        technique: 'Acordes cuartales',
        description: 'Voicings en cuartas que implican pentatónicas. Stack de cuartas = pentatónica implícita.',
      },
    ],
  },
  {
    id: 'pat-martino',
    name: 'Pat Martino',
    bio: 'Guitarrista con enfoque sistemático único. Convirtió todo en menor para simplificar la improvisación.',
    examples: [
      {
        song: 'Sunny',
        technique: 'Minor Conversion',
        description: 'Convierte acordes mayores y dominantes en sus relativos menores. Cmaj7 = Am7 en su mente.',
        chord: 'Cmaj7',
        scale: 'A menor (pensamiento)',
      },
      {
        song: 'Varios',
        technique: 'Pentatónicas desde menor',
        description: 'Todo deriva de la pentatónica menor. Visualiza el diapasón en grupos de menor pent.',
      },
      {
        song: 'Consciousness',
        technique: 'Sistema de círculos',
        description: 'Divide el diapasón en 3 formas circulares. Cada una contiene una pentatónica menor.',
      },
      {
        song: 'Varios',
        technique: 'Augmented triads',
        description: 'Usa triadas aumentadas para conectar diferentes áreas del mango. C-E-G# como puente.',
      },
    ],
  },
  {
    id: 'joe-pass',
    name: 'Joe Pass',
    bio: 'Maestro del solo guitar. Virtuoso en walking bass y líneas simultáneas. Bebop puro.',
    examples: [
      {
        song: 'Virtuoso Álbums',
        technique: 'Arpegios extendidos',
        description: 'Arpegios de 9na, 11va, 13va con voice leading perfecto. Cmaj9 = C-E-G-B-D conectado.',
        chord: 'Cmaj9',
      },
      {
        song: 'Varios',
        technique: 'Enclosures múltiples',
        description: 'Enclosures diatónicos y cromáticos consecutivos. Target note rodeado desde todos lados.',
      },
      {
        song: 'Standards en solo',
        technique: 'Walking bass + melodía',
        description: 'Bajo en beats fuertes, melodía en débiles. Uso de chord tones en bajo, tensiones arriba.',
      },
      {
        song: 'Blues en cualquier tono',
        technique: 'Bebop scales',
        description: 'Uso extensivo de escalas bebop. Dominant bebop sobre todos los V7s.',
      },
    ],
  },
  {
    id: 'bill-frisell',
    name: 'Bill Frisell',
    bio: 'Guitarrista único que mezcla americana, jazz y ambient. Maestro del espacio y la atmósfera.',
    examples: [
      {
        song: 'Have a Little Faith',
        technique: 'Pentatónicas espaciadas',
        description: 'Usa el espacio entre notas. Pentatónicas con largos silencios y reverb. Menos es más.',
      },
      {
        song: 'Varios',
        technique: 'Loops y delays',
        description: 'Pentatónicas simple se convierten en texturas complejas con delays. Layers de G menor pent.',
        scale: 'G menor pentatónica',
      },
      {
        song: 'Strange Meeting',
        technique: 'Americana meets jazz',
        description: 'Mezcla pentatónicas country con armonía jazz. Bends con voice leading sofisticado.',
      },
      {
        song: 'Throughout',
        technique: 'Ambient soundscapes',
        description: 'Pentatónicas como base para texturas. Volume swells y efectos crean paisajes sonoros.',
      },
    ],
  },
  {
    id: 'george-benson',
    name: 'George Benson',
    bio: 'Maestro del bebop y soul jazz. Técnica impecable y timing perfecto. Famoso por cantar al unísono.',
    examples: [
      {
        song: 'Breezin',
        technique: 'Pentatónicas en octavas',
        description: 'Octavas fluidas usando pentatónicas. Técnica similar a Wes pero más rapida y limpia.',
      },
      {
        song: 'Affirmation',
        technique: 'Bebop puro',
        description: 'Escalas bebop dominante y mayor. Chromatic passing tones en todos los tiempos débiles.',
      },
      {
        song: 'Varios Standards',
        technique: 'Aproximaciones perfectas',
        description: 'Target notes en beats 1 y 3 siempre. Aproximaciones cromáticas impecables en timing.',
      },
      {
        song: 'This Masquerade',
        technique: 'Melodías cantables',
        description: 'Pentatónicas que suenan vocales. Canta al mismo tiempo que toca (unison scatting).',
      },
    ],
  },
  {
    id: 'john-mclaughlin',
    name: 'John McLaughlin',
    bio: 'Pionero del jazz fusion. Velocidad extrema y escalas exóticas. Influencias indias y flamencas.',
    examples: [
      {
        song: 'Mahavishnu Orchestra',
        technique: 'Escalas exóticas',
        description: 'Escalas húngaras, harmónicas, melódicas. Combina pentatónicas con modos raros.',
      },
      {
        song: 'Birds of Fire',
        technique: 'Velocidad extrema',
        description: 'Pentatónicas a tempo ultra-rápido. Alternate picking perfecto en secuencias de 16avos.',
      },
      {
        song: 'Meeting of the Spirits',
        technique: 'Escalas indias',
        description: 'Ragas indias combinadas con jazz. Pentatónicas de 5 y 6 notas exóticas.',
      },
      {
        song: 'Varios',
        technique: 'Power y precisión',
        description: 'Ataque fuerte con picking híbrido. Pentatónicas con carácter percusivo y agresivo.',
      },
    ],
  },
  {
    id: 'jim-hall',
    name: 'Jim Hall',
    bio: 'Maestro del understatement. Economía en las notas, máximo impacto emocional. Armonía refinada.',
    examples: [
      {
        song: 'Concierto',
        technique: 'Espacio y silencio',
        description: 'Usa silencios como parte de la improvisación. Pocas notas, perfectamente colocadas.',
      },
      {
        song: 'Varios duos',
        technique: 'Voicings sutiles',
        description: 'Acordes de 3-4 notas con voice leading elegante. Implica pentatónicas sin tocarlas completas.',
      },
      {
        song: 'Standards',
        technique: 'Melodías rearmoinzadas',
        description: 'Cambia la armonía bajo melodias simples. Pentatónicas como base de reharmonización.',
      },
      {
        song: 'Ballads',
        technique: 'Rubato expresivo',
        description: 'Tempo libre con frases pentatónicas. Expresión máxima con mínimo material.',
      },
    ],
  },
  {
    id: 'charlie-parker',
    name: 'Charlie Parker',
    bio: 'El padre del bebop. Revolucionó el jazz con su velocidad, cromatismo y frases complejas.',
    examples: [
      {
        song: 'Confirmation',
        technique: 'Líneas bebop',
        description: 'Frases cromáticas a alta velocidad sobre cambios rápidos. Uso extensivo de aproximaciones cromáticas.',
      },
      {
        song: 'Blues For Alice',
        technique: 'Blues con sustituciones',
        description: 'Blues con cambios tipo Rhythm changes. Pentatónicas sobre cada acorde con aproximaciones.',
        chord: 'F7',
        scale: 'F bebop, pentatónicas',
      },
      {
        song: 'Anthropology',
        technique: 'Rhythm changes',
        description: 'Arpegios rápidos conectados cromáticamente. Base del vocabulario bebop moderno.',
      },
      {
        song: 'Ornithology',
        technique: 'Enclosures y aproximaciones',
        description: 'Dobles y triples aproximaciones a chord tones. Timing perfecto en 2 y 4.',
      },
    ],
  },
  {
    id: 'miles-davis',
    name: 'Miles Davis',
    bio: 'Trompetista legendario. Pionero del jazz modal y conceptos espaciales. Revolucionó múltiples eras del jazz.',
    examples: [
      {
        song: 'So What',
        technique: 'Jazz Modal',
        description: 'D Dórico durante 16 compases. Uso espaciado de pentatónicas menores y modos.',
        chord: 'Dm7',
        scale: 'D Dórico, D menor pentatónica',
      },
      {
        song: 'All Blues',
        technique: 'Blues modal',
        description: 'Blues en 6/8 con enfoque modal. G Mixolidio sobre todo el tema.',
        scale: 'G Mixolidio, G blues',
      },
      {
        song: 'Freddie Freeloader',
        technique: 'Blues tradicional',
        description: 'Bb blues con aproximaciones simples. Uso del espacio y notas económicas.',
        chord: 'Bb7',
        scale: 'Bb blues, Bb menor pentatónica',
      },
      {
        song: 'Bitches Brew',
        technique: 'Jazz fusion',
        description: 'Enfoque modal con pentatónicas sobre vamps. Texturas y atmósferas.',
      },
    ],
  },
  {
    id: 'grant-green',
    name: 'Grant Green',
    bio: 'Guitarrista de blues-jazz fusion. Sonido único sin acordes, solo líneas melódicas puras.',
    examples: [
      {
        song: 'Idle Moments',
        technique: 'Blues melódico',
        description: 'Líneas blues cantables con timing perfecto. Pentatónicas menores con blue notes.',
        scale: 'Blues menor pentatónica',
      },
      {
        song: 'Ain\'t It Funky Now',
        technique: 'Groove funk-jazz',
        description: 'Pentatónicas sobre vamps funky. Uso de repetición y desarrollo motívico.',
        chord: 'Cm7',
        scale: 'C menor pentatónica',
      },
      {
        song: 'Green Street',
        technique: 'Single-note lines',
        description: 'Solo líneas melódicas, sin acordes. Conexión directa entre blues y bebop.',
      },
      {
        song: 'Varios',
        technique: 'Soul-jazz',
        description: 'Fusión de blues, gospel y jazz. Uso extensivo de call-and-response.',
      },
    ],
  },
  {
    id: 'kenny-burrell',
    name: 'Kenny Burrell',
    bio: 'Maestro del blues sofisticado. Combinación perfecta de blues y bebop con técnica impecable.',
    examples: [
      {
        song: 'Midnight Blue',
        technique: 'Blues sofisticado',
        description: 'Blues con voicings complejos y líneas melódicas refinadas.',
        chord: 'C blues',
        scale: 'C blues, pentatónicas mixtas',
      },
      {
        song: 'Chitlins Con Carne',
        technique: 'Blues-bebop',
        description: 'Combina pentatónicas blues con aproximaciones bebop. Groove y sofisticación.',
      },
      {
        song: 'God Bless The Child',
        technique: 'Baladas',
        description: 'Voicings complejos con melodías sobre acordes. Uso de inner voices cromáticas.',
      },
      {
        song: 'Varios',
        technique: 'Chord melody',
        description: 'Walking bass + melodía + acordes simultáneamente. Armonía sofisticada.',
      },
    ],
  },
];
