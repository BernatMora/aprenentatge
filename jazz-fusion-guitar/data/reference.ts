import { ReferenceTable } from '../types/music';

export const explanations = {
  pentaDomic: `La pentatónica dominante es una escala de 5 notas derivada de la escala mixolidia que enfatiza el sonido dominante.

PENTATÓNICA MAYOR vs PENTATÓNICA DOMINANTE:

• Pentatónica Mayor: 1, 2, 3, 5, 6
  Ejemplo en G: G, A, B, D, E
  Uso: Acordes mayores (Maj7), sonido consonante

• Pentatónica Dominante: 1, 3, 4, 5, b7
  Ejemplo en G: G, B, C, D, F
  Uso: Acordes dominantes (G7), sonido bluesy

¿POR QUÉ ES ÚTIL EN DOMINANTES?

La pentatónica dominante incluye la 3ra mayor y la 7ma menor (b7), que son las notas guía del acorde dominante. También incluye la 4ta justa, que crea una tensión característica del blues y el jazz.

En G7:
• G (fundamental)
• B (3ra mayor - nota guía)
• C (4ta - tensión, evita problemas con alteraciones)
• D (5ta - estabilidad)
• F (7ma menor - nota guía)

Contraste con la pentatónica mayor en G:
• G, A, B, D, E - no incluye el F (b7) que define el sonido dominante

APLICACIÓN PRÁCTICA:

Sobre G7 → Cmaj7:
- Pentatónica G dominante (G B C D F) = sonido dominante, bluesy
- Pentatónica G mayor (G A B D E) = sonido más suave, menos tensión
- Pentatónica Db menor (Db E Gb Ab Cb) = escala alterada, tensión máxima

La pentatónica dominante es perfecta para:
• Blues y jazz
• Líneas de walking bass
• Comping rítmico
• Aproximaciones cromáticas`,

  ust: `Upper Structure Triads (USTs) o Tríadas Superpuestas son una técnica avanzada de armonía jazz que simplifica acordes complejos.

¿QUÉ ES UN UST?

Es una tríada simple (mayor o menor de 3 notas) que se toca sobre las notas guía (3ra y 7ma) de un acorde dominante, generando automáticamente extensiones y alteraciones.

FUNDAMENTO TEÓRICO:

En un acorde dominante, las notas guía (3ra y 7ma) son fijas. Las extensiones (9, 11, 13) y alteraciones (b9, #9, #11, b13) se agregan "encima" de estas notas guía.

En lugar de pensar todas las notas individualmente, agrupamos las extensiones en forma de tríadas que son más fáciles de visualizar y tocar.

EJEMPLO DETALLADO - C7alt:

Notas del acorde completo: C, E, G, Bb, Db, Eb, Gb, A
• C = fundamental
• E = 3ra mayor (nota guía)
• Bb = 7ma menor (nota guía)
• Db = b9
• Eb = #9
• Gb = b5 o #11
• A = b13

UST: Tríada de Db menor (Db, Fb/E, Ab/Gb)
• Se toca sobre E y Bb (notas guía de C7)
• Genera: b9 (Db), #9 (Eb), #11 (Gb), b13 (Ab)

¿POR QUÉ FUNCIONA?

1. SIMPLICIDAD COGNITIVA: Es más fácil pensar "toco Db menor" que "toco b9, #9, #11, b13"

2. VISUALIZACIÓN: Las tríadas son formas conocidas en el instrumento

3. VOICING AUTOMÁTICO: La tríada ya tiene un espaciado armónico correcto

4. TRANSFERIBILIDAD: La misma tríada funciona en diferentes inversiones

USTs MÁS COMUNES:

Para C7:
• USII (D Mayor) = C7(9,#11,13) - Lidio Dominante
• USbIII (Eb Mayor) = C7(#9) - color disminuido
• USbV (Gb Mayor) = C7(b9,#11) - Alterado
• USbVI (Ab Mayor) = C7(#9,b13) - Alterado
• USVI (A Mayor) = C7(b9,13) - Mixolidio b9

Menores:
• USbii (Db menor) = C7(b9,b13) - Alterado
• USbiii (Eb menor) = C7(#9,#11) - Alterado
• US#iv (F# menor) = C7(b9,#11,13) - Alterado/Disminuida

APLICACIÓN PRÁCTICA:

En una progresión ii-V-I en C mayor:
- Dm7 | G7alt | Cmaj7

En G7alt, en lugar de pensar todas las alteraciones, simplemente tocas:
• Tríada de Db menor (USbii relativo a G)
• Esto genera todas las alteraciones correctas automáticamente

VENTAJAS:
✓ Improvisación más fluida
✓ Voicings más ricos al acompañar
✓ Menos pensamiento teórico, más musical
✓ Transferible entre instrumentos`,

  pentatonicApplications: `APLICACIONES PRÁCTICAS DE PENTATÓNICAS

Las pentatónicas son herramientas versátiles que simplifican la improvisación y el acompañamiento. Aquí hay una guía práctica:

1. SOBRE ACORDES MENORES (m7):

• Pentatónica de la raíz menor (Dm pent. sobre Dm7)
  - Sonido: Básico, dórico
  - Notas evitadas: 6ta (B)
  - Uso: Walking bass, melodías simples

• Pentatónica IV menor (Gm pent. sobre Dm7)
  - Sonido: Dórico rico, todas las extensiones
  - Genera: 9, 11, 13
  - Uso: Solos modales, sonido moderno

• Pentatónica bIII Mayor (F pent. sobre Dm7)
  - Sonido: Eólico, melancólico
  - Genera: 9, 11, b13
  - Uso: Baladas, sonido oscuro

2. SOBRE ACORDES DOMINANTES (7):

• Pentatónica Raíz Mayor (G pent. sobre G7)
  - Sonido: Mixolidio, clásico
  - Evita: 4ta (C)
  - Uso: Blues tradicional, rock

• Pentatónica Raíz Dominante (G dom pent. sobre G7)
  - Sonido: Blues, groove
  - Incluye: 3, 4, 5, b7 (notas del blues)
  - Uso: Funk, blues moderno, comping

• Pentatónica Tritono menor (Db pent. sobre G7)
  - Sonido: Alterado, tensión máxima
  - Genera: b9, #9, #11, b13
  - Uso: Jazz moderno, resoluciones cromáticas

• Pentatónica II menor (Am pent. sobre G7)
  - Sonido: Suspendido, abierto
  - Genera: 9, 4, 13 (G7sus)
  - Uso: Vamps, sonidos modales

3. SOBRE ACORDES MAYORES (Maj7):

• Pentatónica Raíz Mayor (C pent. sobre Cmaj7)
  - Sonido: Mayor puro
  - Evita: 4ta (F)
  - Uso: Melodías claras, pop

• Pentatónica V Mayor (G pent. sobre Cmaj7)
  - Sonido: Mayor extendido, brillante
  - Incluye todas las notas del acorde
  - Uso: Jazz, bossa nova

• Pentatónica II Mayor (D pent. sobre Cmaj7)
  - Sonido: Lidio, mágico
  - Genera: 9, 3, #11, 13, Maj7
  - Uso: Baladas, sonido cinematográfico

• Pentatónica VI menor (Am pent. sobre Cmaj7)
  - Sonido: Relativo menor, nostálgico
  - Uso: Contraste, secciones B

COMBINACIONES AVANZADAS:

En una progresión ii-V-I:
Dm7 | G7alt | Cmaj7

• Dm7: Gm pentatónica (IV menor) → extensiones ricas
• G7alt: Db pentatónica menor (Tritono) → máxima tensión
• Cmaj7: D pentatónica Mayor (II Mayor) → resolución lidia

Esto crea un sonido cohesivo y moderno sin pensar en cada nota individual.

REGLA DE ORO:
Las pentatónicas eliminan notas problemáticas (avoid notes) automáticamente, haciendo que siempre suenen bien. Es mejor dominar 3-4 posiciones pentatónicas sobre cada acorde que intentar usar todas las notas de una escala de 7 u 8 notas.`
};

export const referenceTables: ReferenceTable[] = [
  {
    id: 'pentatonic-minor-chords',
    title: 'Pentatónicas sobre Acordes Menores',
    headers: ['Acorde', 'Pentatónica', 'Relación', 'Extensiones', 'Modo/Color'],
    rows: [
      ['m7', 'Raíz menor', 'Raíz', '11', 'Dórico Básico'],
      ['m7', 'IV menor', 'P4 arriba', '9, 11, 13', 'Dórico'],
      ['m7', 'II menor', 'M2 arriba', '9, 11, 13', 'Dórico (con 13)'],
      ['m7', 'bIII Mayor', 'M3 arriba', '9, 11, b13', 'Eólico'],
      ['m7', 'VI menor', 'M6 arriba', '9, 11, 13', 'Dórico'],
    ],
  },
  {
    id: 'pentatonic-dominant-chords',
    title: 'Pentatónicas sobre Acordes Dominantes',
    headers: ['Acorde', 'Pentatónica', 'Relación', 'Extensiones', 'Modo/Color'],
    rows: [
      ['7', 'Raíz Mayor', 'Raíz', '9, 13', 'Mixolidio'],
      ['7', 'Raíz Dom', 'Raíz', '3, 4, 5, b7', 'Dominante'],
      ['7alt', 'Tritono menor', 'Tritono', 'b9, #9, #11, b13', 'Alterado'],
      ['7sus', 'II menor', 'M2 arriba', '9, 4, 13', 'Suspendido'],
      ['7#11', 'Raíz Mayor', 'Raíz', '(funciona)', 'Lidio Dominante'],
    ],
  },
  {
    id: 'pentatonic-major-chords',
    title: 'Pentatónicas sobre Acordes Mayores',
    headers: ['Acorde', 'Pentatónica', 'Relación', 'Extensiones', 'Modo/Color'],
    rows: [
      ['Maj7', 'Raíz Mayor', 'Raíz', '9, 13', 'Mayor Básico'],
      ['Maj7', 'V Mayor', 'P5 arriba', '9, 3, 5, 13, Maj7', 'Mayor extendido'],
      ['Maj7', 'II Mayor', 'M2 arriba', '9, 3, #11, 13, Maj7', 'Lidio (#11)'],
      ['Maj7', 'VI menor', 'M6 arriba', '9, 3, 5, 13', 'Mayor (rel. menor)'],
    ],
  },
  {
    id: 'ust-major-triads',
    title: 'Tríadas Mayores Superpuestas (USTs)',
    headers: ['UST', 'Tríada', 'Acorde Result.', 'Extensiones', 'Escala'],
    rows: [
      ['USII', 'II Mayor', '13#11', '9, #11, 13', 'Lidia Dominante'],
      ['USbIII', 'bIII Mayor', '7#9', '#9', 'Dom. Disminuida'],
      ['USbV', 'bV Mayor', '7b9#11', 'b9, #11', 'Alterada'],
      ['USbVI', 'bVI Mayor', '7#9b13', '#9, b13', 'Alterada'],
      ['USVI', 'VI Mayor', '13b9', 'b9, 13', 'Mixolidia b9'],
    ],
  },
  {
    id: 'ust-minor-triads',
    title: 'Tríadas Menores Superpuestas (USTs)',
    headers: ['UST', 'Tríada', 'Acorde Result.', 'Extensiones', 'Escala'],
    rows: [
      ['USi', 'i menor', '7#9', '#9', '(Varias)'],
      ['USbii', 'bii menor', '7b9b13', 'b9, b13', 'Alterada'],
      ['USbiii', 'biii menor', '7#9#11', '#9, #11', 'Alterada'],
      ['US#iv', '#iv menor', '7b9#11', 'b9, #11, 13', 'Alterada/Dom. Dim.'],
      ['USv', 'v menor', '9', '9', 'Mixolidio'],
      ['USvi', 'vi menor', '13', '13', 'Mixolidio'],
    ],
  },
  {
    id: 'scales-modes',
    title: 'Escalas y Modos Asociados',
    headers: ['Escala/Modo', 'Fórmula', 'Uso Principal', 'UST/Pentatónica Clave'],
    rows: [
      ['Lidia Dominante', '1 2 3 #4 5 6 b7', 'V7#11 no funcional', 'USII, II Mayor pent.'],
      ['Alterada', '1 b9 #9 3 b5 b13 b7', 'V7alt → I', 'USbV, USbVI, Tritono menor pent.'],
      ['Dórico', '1 2 b3 4 5 6 b7', 'ii7 menor', 'IV menor pent., II menor pent.'],
      ['Lidio', '1 2 3 #4 5 6 7', 'Imaj7, IVmaj7', 'II Mayor pent.'],
      ['Mixolidio', '1 2 3 4 5 6 b7', 'V7 diatónico', 'Raíz Mayor pent., USvi'],
      ['Disminuida (ST-T)', '1 b9 #9 3 #11 5 13 b7', 'V7b9, V7#9', 'USVI'],
    ],
  },
  {
    id: 'intervals-sonority',
    title: 'Intervalos y su Sonoridad',
    headers: ['Intervalo', 'Semitonos', 'Sonoridad', 'Uso en Jazz', 'Ejemplo'],
    rows: [
      ['2da menor (m2)', '1', 'Muy tensa, disonante', 'Aproximaciones cromáticas, clusters', 'C-Db'],
      ['2da Mayor (M2)', '2', 'Tensa, moderna', 'Add9, sus2, voicings abiertos', 'C-D'],
      ['3ra menor (m3)', '3', 'Melancólica, oscura', 'Acordes menores, blues', 'C-Eb'],
      ['3ra Mayor (M3)', '4', 'Alegre, brillante', 'Acordes mayores, triadas', 'C-E'],
      ['4ta Justa (P4)', '5', 'Suspendida, abierta', 'Sus4, voicings cuartales', 'C-F'],
      ['4ta aumentada (#4)', '6', 'Tensa, lidia', 'Lidio, alteraciones', 'C-F#'],
      ['5ta Justa (P5)', '7', 'Consonante, vacía', 'Power chords, base armónica', 'C-G'],
      ['6ta menor (m6)', '8', 'Tensa, exótica', 'Blues, escala alterada', 'C-Ab'],
      ['6ta Mayor (M6)', '9', 'Dulce, añoranza', 'Maj6, Dórico', 'C-A'],
      ['7ma menor (m7)', '10', 'Relajada, jazz', 'Dom7, m7', 'C-Bb'],
      ['7ma Mayor (M7)', '11', 'Brillante, sofisticada', 'Maj7, Lidio', 'C-B'],
      ['Octava (P8)', '12', 'Idéntica, enfática', 'Octavas, refuerzo', 'C-C'],
    ],
  },
  {
    id: 'voice-leading',
    title: 'Voice Leading Común',
    headers: ['Progresión', 'Voice Leading', 'Movimiento', 'Notas Guía', 'Tips'],
    rows: [
      ['ii-V', 'Dm7 → G7', '3ra y 7ma intercambian', 'F-C → B-F', 'Movimiento de semitono'],
      ['V-I', 'G7 → Cmaj7', '3ra y 7ma resuelven', 'B-F → C-E', 'Resolución clásica'],
      ['I-vi', 'C → Am', 'Notas comunes', 'C-E-G común', 'Mantener C, E, G'],
      ['iv-I', 'Fm → C', 'Cromático descendente', 'Ab → G, F → E', 'Modal interchange'],
      ['Tritone sub', 'Db7 → Cmaj7', 'Cromático descendente', 'Todas bajan 1/2 tono', 'Muy suave'],
      ['ii-bII-I', 'Dm7-Db7-C', 'Cromático', 'Todas descienden', 'Approach chord'],
    ],
  },
  {
    id: 'reharmonizations',
    title: 'Reharmonizaciones Comunes',
    headers: ['Original', 'Reharmonización', 'Técnica', 'Efecto', 'Ejemplo Standard'],
    rows: [
      ['I', 'I-vi-ii-V', 'Expansión', 'Más movimiento', 'Autumn Leaves intro'],
      ['V7', 'bII7 (Tritone sub)', 'Sustitución tritono', 'Cromático', 'Cualquier V-I'],
      ['I', 'iii-vi-ii-V', 'Turnaround extendido', 'Más color', 'Rhythm changes'],
      ['ii-V-I', 'ii-bII-I', 'Approach chord', 'Cromático elegante', 'Baladas'],
      ['ii-V', 'iiø-V7alt', 'Minorización', 'Más oscuro', 'Standards menores'],
      ['I-IV', 'I-#ivø-IV', 'Cliché cromático', 'Línea descendente', 'Girl From Ipanema'],
      ['I', 'bVImaj7-bVII7-I', 'Backdoor ii-V', 'Resolución desde abajo', 'Ladybird'],
    ],
  },
];
