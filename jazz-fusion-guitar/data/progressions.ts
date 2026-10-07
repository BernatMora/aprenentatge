import { Progression } from '../types/music';

export const progressions: Progression[] = [
  {
    id: 'ii-v-i-major',
    name: 'ii-V-I Mayor',
    chords: ['Dm7', 'G7', 'Cmaj7'],
    description: 'La progresión más fundamental del jazz. Base de innumerables standards.',
    suggestions: [
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor (9,11,13)', 'G Mayor'],
        triads: ['F Mayor (USII)'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor (Mixolidio)', 'G Dom', 'A menor (sus)'],
        triads: ['D Mayor (USII - Lidio Dom)', 'A menor (USvi)'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor', 'A menor'],
        triads: ['D Mayor (USII - Lidio)'],
      },
    ],
  },
  {
    id: 'ii-v-i-minor',
    name: 'ii-V-i Menor',
    chords: ['Dm7b5', 'G7alt', 'Cm7'],
    description: 'Progresión menor con dominante alterado. Común en standards y fusion.',
    suggestions: [
      {
        chord: 'Dm7b5',
        pentatonics: ['F menor', 'Ab Mayor'],
        triads: ['Ab Mayor', 'Fm'],
      },
      {
        chord: 'G7alt',
        pentatonics: ['Db menor (Alterado)', 'Ab menor melódica'],
        triads: ['Db menor (USbii)', 'Eb menor (USbiii)', 'Gb Mayor (USbV)', 'Ab Mayor (USbVI)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Fm'],
      },
    ],
  },
  {
    id: 'rhythm-changes',
    name: 'Rhythm Changes (A)',
    chords: ['Bbmaj7', 'G7', 'Cm7', 'F7'],
    description: 'Basado en "I Got Rhythm". Una de las formas más tocadas en jazz.',
    suggestions: [
      {
        chord: 'Bbmaj7',
        pentatonics: ['Bb Mayor', 'F Mayor', 'C Mayor (Lidio)', 'G menor'],
        triads: ['C Mayor (USII)'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'D Mayor pentatónica'],
        triads: ['D Mayor (USII)', 'Eb Mayor (#9)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor'],
        triads: ['Gm', 'Fm (USII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor pentatónica'],
        triads: ['C Mayor (USII)', 'Db Mayor (#9)'],
      },
    ],
  },
  {
    id: 'coltrane-changes',
    name: 'Coltrane Changes',
    chords: ['Cmaj7', 'Ebmaj7', 'Abmaj7', 'Cmaj7'],
    description: 'Sustitución de terceras mayores. Usado en "Giant Steps" y "Countdown".',
    suggestions: [
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor'],
        triads: ['F Mayor (USII)', 'Gm'],
      },
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor'],
        triads: ['Bb Mayor (USII)', 'Cm'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'A menor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
    ],
  },
  {
    id: 'modal-vamp',
    name: 'Vamp Modal (Dórico)',
    chords: ['Em7', 'Em7'],
    description: 'Armonía modal estática. Estilo "So What", "Maiden Voyage".',
    suggestions: [
      {
        chord: 'Em7',
        pentatonics: ['E menor', 'B menor (9,11,13)', 'D Mayor', 'A Mayor (Dórico brillante)'],
        triads: ['Bm', 'G Mayor', 'D Mayor'],
      },
    ],
  },
  {
    id: 'backdoor',
    name: 'Backdoor ii-V',
    chords: ['Fm7', 'Bb7', 'Cmaj7'],
    description: 'Resolución bVII7 → I. Color distintivo, menos tensión que V7 → I.',
    suggestions: [
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm', 'Bb Mayor (USII)'],
      },
      {
        chord: 'Bb7',
        pentatonics: ['Bb Mayor', 'Bb Dom', 'F Mayor', 'C Mayor pentatónica'],
        triads: ['F Mayor (USII - Lidio Dom)', 'Cm (USvi)'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
    ],
  },
  {
    id: 'ii-v-i-major-extended',
    name: 'ii-V-I Mayor (Extendido)',
    chords: ['Dm9', 'G13', 'Cmaj9'],
    description: 'Versión extendida del ii-V-I con tensiones. Sonido más rico y moderno.',
    suggestions: [
      {
        chord: 'Dm9',
        pentatonics: ['D menor', 'A menor (9,11,13)', 'G Mayor', 'F Mayor'],
        triads: ['F Mayor (USII)', 'Am'],
      },
      {
        chord: 'G13',
        pentatonics: ['G Mayor', 'G Dom', 'D Mayor (Lidio Dom)', 'A menor (sus)'],
        triads: ['D Mayor (USII)', 'A menor (USvi)', 'Em (USII)'],
      },
      {
        chord: 'Cmaj9',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor', 'A menor', 'E menor'],
        triads: ['D Mayor (USII)', 'Em', 'G Mayor'],
      },
    ],
  },
  {
    id: 'tritone-sub',
    name: 'Sustitución de Tritono',
    chords: ['Dm7', 'Db7', 'Cmaj7'],
    description: 'Db7 sustituye G7. Resolución cromática descendente hacia Cmaj7.',
    suggestions: [
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor'],
        triads: ['F Mayor (USII)', 'Am'],
      },
      {
        chord: 'Db7',
        pentatonics: ['Db Lidio Dom', 'Gb Mayor', 'Ab Mayor'],
        triads: ['Eb Mayor (USII - Lidio Dom)', 'Bbm (USvi)'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
    ],
  },
  {
    id: 'minor-line-cliche',
    name: 'Línea Cliché Menor',
    chords: ['Am', 'Am(maj7)', 'Am7', 'Am6'],
    description: 'Movimiento cromático descendente del bajo: A-G#-G-F#. Muy cinematográfico.',
    suggestions: [
      {
        chord: 'Am',
        pentatonics: ['A menor', 'E menor', 'C Mayor'],
        triads: ['Em', 'C Mayor'],
      },
      {
        chord: 'Am(maj7)',
        pentatonics: ['A menor melódica', 'C Mayor', 'F Mayor'],
        triads: ['C Mayor', 'Em'],
      },
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'D Mayor (Dórico)', 'C Mayor'],
        triads: ['Em', 'C Mayor', 'Dm'],
      },
      {
        chord: 'Am6',
        pentatonics: ['A menor', 'D Mayor', 'F# menor'],
        triads: ['F#m', 'D Mayor'],
      },
    ],
  },
  {
    id: 'turnaround-jazz',
    name: 'Turnaround de Jazz',
    chords: ['Cmaj7', 'A7', 'Dm7', 'G7'],
    description: 'I-VI-ii-V. El turnaround más usado en jazz. A7 funciona como dominante secundario.',
    suggestions: [
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'G Mayor', 'A menor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
      {
        chord: 'A7',
        pentatonics: ['A Mayor', 'A Dom', 'A Mixo b6 (para Dm)', 'E menor'],
        triads: ['E Mayor (USII)', 'F#m (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['F Mayor (USII)', 'Am'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'A menor (sus)', 'D Mayor'],
        triads: ['D Mayor (USII)', 'Am (USvi)'],
      },
    ],
  },
  {
    id: 'lady-bird',
    name: 'Progresión "Lady Bird"',
    chords: ['Cmaj7', 'Abmaj7', 'Dbmaj7', 'Cmaj7'],
    description: 'Movimiento de terceras menores. Usado por Tadd Dameron. Sonido sofisticado.',
    suggestions: [
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor'],
        triads: ['Bb Mayor (USII)', 'Cm'],
      },
      {
        chord: 'Dbmaj7',
        pentatonics: ['Db Mayor', 'Eb Mayor (Lidio)', 'Ab Mayor'],
        triads: ['Eb Mayor (USII)', 'Fm'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'A menor'],
        triads: ['D Mayor (USII)', 'Em'],
      },
    ],
  },
  {
    id: 'blues-jazz',
    name: 'Blues de Jazz (primeros 4)',
    chords: ['F7', 'Bb7', 'F7', 'Cm7-F7'],
    description: 'Primeros 4 compases de blues de jazz con sustituciones. Más movimiento que blues básico.',
    suggestions: [
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor', 'F menor (blues)'],
        triads: ['C Mayor (USII)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Bb7',
        pentatonics: ['Bb Mayor', 'Bb Dom', 'F Mayor', 'Bb menor (blues)'],
        triads: ['F Mayor (USII)', 'Gb Mayor (#9)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)'],
      },
      {
        chord: 'Cm7-F7',
        pentatonics: ['C menor (Cm7)', 'F Dom (F7)', 'Bb Mayor'],
        triads: ['Gm (Cm7)', 'C Mayor (F7 USII)'],
      },
    ],
  },
  {
    id: 'montgomery',
    name: 'Progresión "Four on Six"',
    chords: ['Dm7', 'Db7', 'Cm7', 'F7'],
    description: 'Popularizada por Wes Montgomery. Sustituciones cromáticas descendentes.',
    suggestions: [
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor'],
        triads: ['F Mayor (USII)', 'Am'],
      },
      {
        chord: 'Db7',
        pentatonics: ['Db Lidio Dom', 'Gb Mayor', 'Ab Mayor'],
        triads: ['Eb Mayor (USII)', 'Bbm (USvi)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor'],
        triads: ['Gm', 'Fm (USII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)'],
      },
    ],
  },
  {
    id: 'autumn-leaves',
    name: 'Autumn Leaves (A section)',
    chords: ['Cm7', 'F7', 'Bbmaj7', 'Ebmaj7'],
    description: 'Una de las progresiones más tocadas. Perfecto para principiantes e improvisación.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm (USII)', 'Eb Mayor (USbIII)', 'Fm (USII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'G menor (sus)', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Bbmaj7',
        pentatonics: ['Bb Mayor', 'C Mayor (Lidio)', 'F Mayor', 'G menor'],
        triads: ['C Mayor (USII)', 'F Mayor (USV)', 'Dm'],
      },
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
    ],
  },
  {
    id: 'stella-by-starlight',
    name: 'Stella by Starlight (primeros 4)',
    chords: ['Em7b5', 'A7b9', 'Cm7', 'F7'],
    description: 'Progresión compleja y hermosa. Múltiples ii-Vs en diferentes tonalidades.',
    suggestions: [
      {
        chord: 'Em7b5',
        pentatonics: ['G menor', 'Bb Mayor', 'D menor (Locrio)'],
        triads: ['Bb Mayor (USbV)', 'Gm (USbIII)', 'Dm (USbVII)'],
      },
      {
        chord: 'A7b9',
        pentatonics: ['Bb menor melódica (Alterado)', 'Eb menor'],
        triads: ['Eb menor (USbii)', 'F menor (USbiii)', 'Bb Mayor (USbVI)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor (USbIII)', 'Fm (USII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'G menor (sus)', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
    ],
  },
  {
    id: 'all-the-things',
    name: 'All The Things You Are (A section)',
    chords: ['Fm7', 'Bbm7', 'Eb7', 'Abmaj7'],
    description: 'Standard de Kern. Modulación elegante y cambios sofisticados.',
    suggestions: [
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
      {
        chord: 'Bbm7',
        pentatonics: ['Bb menor', 'F menor', 'Db Mayor', 'Ab Mayor'],
        triads: ['Fm (USII)', 'Db Mayor (USbIII)', 'Ebm'],
      },
      {
        chord: 'Eb7',
        pentatonics: ['Eb Mayor', 'Eb Dom', 'F menor (sus)', 'Bb Mayor'],
        triads: ['Bb Mayor (USII)', 'Fm (USvi)', 'A Mayor (#9)'],
      },
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor', 'F menor'],
        triads: ['Bb Mayor (USII)', 'Eb Mayor (USV)', 'Cm'],
      },
    ],
  },
  {
    id: 'take-five',
    name: 'Take Five Vamp',
    chords: ['Em7', 'Bm7'],
    description: 'Vamp modal en 5/4. Compuesto por Paul Desmond, interpretado por Dave Brubeck.',
    suggestions: [
      {
        chord: 'Em7',
        pentatonics: ['E menor', 'B menor (9,11,13)', 'D Mayor (Dórico)', 'G Mayor'],
        triads: ['Bm (USII)', 'G Mayor (USbIII)', 'D Mayor'],
      },
      {
        chord: 'Bm7',
        pentatonics: ['B menor', 'F# menor', 'D Mayor', 'A Mayor (Dórico)'],
        triads: ['F#m (USII)', 'D Mayor (USbIII)', 'A Mayor'],
      },
    ],
  },
  {
    id: 'cherokee',
    name: 'Cherokee (Bridge)',
    chords: ['F#7', 'B7', 'E7', 'A7'],
    description: 'Modulación rápida de dominantes por cuartas. Desafiante para improvisación.',
    suggestions: [
      {
        chord: 'F#7',
        pentatonics: ['F# Mayor', 'F# Dom', 'G menor (Alterado)', 'C# Mayor'],
        triads: ['C# Mayor (USII)', 'Eb menor (USbiii)', 'G Mayor (#9)'],
      },
      {
        chord: 'B7',
        pentatonics: ['B Mayor', 'B Dom', 'C menor (Alterado)', 'F# Mayor'],
        triads: ['F# Mayor (USII)', 'G# menor (USbiii)', 'C Mayor (#9)'],
      },
      {
        chord: 'E7',
        pentatonics: ['E Mayor', 'E Dom', 'F menor (Alterado)', 'B Mayor'],
        triads: ['B Mayor (USII)', 'C# menor (USbiii)', 'F Mayor (#9)'],
      },
      {
        chord: 'A7',
        pentatonics: ['A Mayor', 'A Dom', 'Bb menor (Alterado)', 'E Mayor'],
        triads: ['E Mayor (USII)', 'F# menor (USbiii)', 'Bb Mayor (#9)'],
      },
    ],
  },
  {
    id: 'blue-bossa',
    name: 'Blue Bossa',
    chords: ['Cm7', 'Fm7', 'Dm7b5', 'G7alt'],
    description: 'Bossa nova con sabor modal. Mezcla de menor melódico con ii-V.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor (USbIII)', 'Fm'],
      },
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
      {
        chord: 'Dm7b5',
        pentatonics: ['F menor', 'Ab Mayor', 'Bb menor (Locrio)'],
        triads: ['Ab Mayor (USbV)', 'Fm (USbIII)'],
      },
      {
        chord: 'G7alt',
        pentatonics: ['Db menor (Alterado)', 'Ab menor melódica'],
        triads: ['Db menor (USbii)', 'Eb menor (USbiii)', 'Gb Mayor (USbV)'],
      },
    ],
  },
  {
    id: 'giant-steps-cycle',
    name: 'Giant Steps (8 compases)',
    chords: ['Bmaj7', 'D7', 'Gmaj7', 'Bb7', 'Ebmaj7'],
    description: 'Los famosos cambios de Coltrane. Movimiento de terceras mayores ultra-rápido.',
    suggestions: [
      {
        chord: 'Bmaj7',
        pentatonics: ['B Mayor', 'C# Mayor (Lidio)', 'F# Mayor', 'G# menor'],
        triads: ['C# Mayor (USII)', 'F# Mayor (USV)', 'D#m'],
      },
      {
        chord: 'D7',
        pentatonics: ['D Mayor', 'D Dom', 'E menor (sus)', 'A Mayor'],
        triads: ['A Mayor (USII)', 'Em (USvi)', 'Eb Mayor (#9)'],
      },
      {
        chord: 'Gmaj7',
        pentatonics: ['G Mayor', 'A Mayor (Lidio)', 'D Mayor', 'E menor'],
        triads: ['A Mayor (USII)', 'D Mayor (USV)', 'Bm'],
      },
      {
        chord: 'Bb7',
        pentatonics: ['Bb Mayor', 'Bb Dom', 'C menor (sus)', 'F Mayor'],
        triads: ['F Mayor (USII)', 'Cm (USvi)', 'E Mayor (#9)'],
      },
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
    ],
  },
  {
    id: 'black-orpheus',
    name: 'Black Orpheus (Manha de Carnaval)',
    chords: ['Am7', 'Bm7b5', 'E7alt', 'Am7'],
    description: 'Bossa nova clásica. Menor natural con dominante alterado.',
    suggestions: [
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'C Mayor', 'D Mayor (Dórico)'],
        triads: ['Em (USII)', 'C Mayor (USbIII)', 'Dm'],
      },
      {
        chord: 'Bm7b5',
        pentatonics: ['D menor', 'F Mayor', 'G menor (Locrio)'],
        triads: ['F Mayor (USbV)', 'Dm (USbIII)'],
      },
      {
        chord: 'E7alt',
        pentatonics: ['Bb menor (Alterado)', 'F menor melódica'],
        triads: ['Bb menor (USbii)', 'C menor (USbiii)', 'Db Mayor (USbV)'],
      },
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'C Mayor', 'D Mayor'],
        triads: ['Em', 'C Mayor', 'Dm (USII)'],
      },
    ],
  },
  {
    id: 'solar',
    name: 'Solar (Miles Davis)',
    chords: ['Cm7', 'Gm7', 'C7', 'Fmaj7'],
    description: 'Composición de Miles. Mezcla de menor y mayor con dominantes.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor', 'Fm (USII)'],
      },
      {
        chord: 'Gm7',
        pentatonics: ['G menor', 'D menor', 'Bb Mayor', 'F Mayor'],
        triads: ['Dm (USII)', 'Bb Mayor (USbIII)', 'Cm'],
      },
      {
        chord: 'C7',
        pentatonics: ['C Mayor', 'C Dom', 'D menor (sus)', 'G Mayor'],
        triads: ['G Mayor (USII)', 'Dm (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Fmaj7',
        pentatonics: ['F Mayor', 'G Mayor (Lidio)', 'C Mayor', 'D menor'],
        triads: ['G Mayor (USII)', 'C Mayor (USV)', 'Am'],
      },
    ],
  },
  {
    id: 'cantaloupe-island',
    name: 'Cantaloupe Island',
    chords: ['Fm7', 'Db7', 'Dm7', 'Cm7'],
    description: 'Groove modal de Herbie Hancock. Dórico con dominantes no funcionales.',
    suggestions: [
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
      {
        chord: 'Db7',
        pentatonics: ['Db Lidio Dom', 'Gb Mayor', 'Ab Mayor', 'Eb menor (sus)'],
        triads: ['Ab Mayor (USII - Lidio Dom)', 'Ebm (USvi)'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['Am (USII)', 'F Mayor (USbIII)', 'Gm'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor', 'Fm (USII)'],
      },
    ],
  },
  {
    id: 'satin-doll',
    name: 'Satin Doll (A section)',
    chords: ['Dm7', 'G7', 'Em7', 'A7'],
    description: 'Standard de Ellington. Dos ii-Vs seguidos, perfecto para practicar.',
    suggestions: [
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor (9,11,13)', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'A menor (sus)', 'D Mayor'],
        triads: ['D Mayor (USII)', 'Am (USvi)', 'Eb Mayor (#9)'],
      },
      {
        chord: 'Em7',
        pentatonics: ['E menor', 'B menor', 'G Mayor', 'D Mayor'],
        triads: ['Bm (USII)', 'G Mayor (USbIII)', 'Am'],
      },
      {
        chord: 'A7',
        pentatonics: ['A Mayor', 'A Dom', 'B menor (sus)', 'E Mayor'],
        triads: ['E Mayor (USII)', 'Bm (USvi)', 'Bb Mayor (#9)'],
      },
    ],
  },
  {
    id: 'watermelon-man',
    name: 'Watermelon Man',
    chords: ['F7', 'F7', 'Bb7', 'F7'],
    description: 'Blues funk de Herbie Hancock. Groove pesado, pentatónicas mixtas.',
    suggestions: [
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'F menor (blues)', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Bb7',
        pentatonics: ['Bb Mayor', 'Bb Dom', 'Bb menor (blues)', 'F Mayor'],
        triads: ['F Mayor (USII)', 'Cm (USvi)', 'Gb Mayor (#9)'],
      },
    ],
  },
  {
    id: 'afro-blue',
    name: 'Afro Blue (Vamp)',
    chords: ['Fm7', 'Cm7', 'Fm7', 'Cm7'],
    description: 'Vamp menor modal de John Coltrane. Simplifícalo: piensa en F menor Dórico sobre todo.',
    suggestions: [
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor (Dórico)'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'F menor'],
        triads: ['Gm', 'Eb Mayor', 'Fm (USII)'],
      },
    ],
  },
  {
    id: 'girl-from-ipanema',
    name: 'Girl from Ipanema (A section)',
    chords: ['Fmaj7', 'G7', 'Gm7', 'Gb7'],
    description: 'Bossa nova clásica. Movimiento cromático G7 → Gb7. Color brasileiro.',
    suggestions: [
      {
        chord: 'Fmaj7',
        pentatonics: ['F Mayor', 'G Mayor (Lidio)', 'C Mayor', 'D menor'],
        triads: ['G Mayor (USII)', 'C Mayor (USV)', 'Am'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'D Mayor (Lidio Dom)', 'A menor (sus)'],
        triads: ['D Mayor (USII)', 'Am (USvi)', 'Eb Mayor (#9)'],
      },
      {
        chord: 'Gm7',
        pentatonics: ['G menor', 'D menor', 'Bb Mayor', 'F Mayor'],
        triads: ['Dm (USII)', 'Bb Mayor (USbIII)', 'Cm'],
      },
      {
        chord: 'Gb7',
        pentatonics: ['Gb Lidio Dom', 'Db Mayor', 'Ab Mayor', 'Eb menor (sus)'],
        triads: ['Db Mayor (USII - Lidio Dom)', 'Ebm (USvi)'],
      },
    ],
  },
  {
    id: 'nardis',
    name: 'Nardis (Miles Davis)',
    chords: ['Em7', 'F7', 'Bbmaj7', 'Ebmaj7'],
    description: 'Modulación bella a través de tritono. Usa Escala Alterada en F7.',
    suggestions: [
      {
        chord: 'Em7',
        pentatonics: ['E menor', 'B menor', 'D Mayor (Dórico)', 'G Mayor'],
        triads: ['Bm (USII)', 'G Mayor (USbIII)', 'D Mayor'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor', 'Cb menor (Alterado)'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Bbmaj7',
        pentatonics: ['Bb Mayor', 'C Mayor (Lidio)', 'F Mayor', 'G menor'],
        triads: ['C Mayor (USII)', 'F Mayor (USV)', 'Dm'],
      },
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
    ],
  },
  {
    id: 'donna-lee',
    name: 'Donna Lee (Primeros 8)',
    chords: ['Abmaj7', 'F7', 'Bbm7', 'Eb7'],
    description: 'Bebop puro. Velocidad rápida, usa escalas bebop y aproximaciones cromáticas.',
    suggestions: [
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor', 'F menor'],
        triads: ['Bb Mayor (USII)', 'Eb Mayor (USV)', 'Cm'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'G menor (sus)', 'C Mayor'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
      {
        chord: 'Bbm7',
        pentatonics: ['Bb menor', 'F menor', 'Db Mayor', 'Ab Mayor'],
        triads: ['Fm (USII)', 'Db Mayor (USbIII)', 'Ebm'],
      },
      {
        chord: 'Eb7',
        pentatonics: ['Eb Mayor', 'Eb Dom', 'F menor (sus)', 'Bb Mayor'],
        triads: ['Bb Mayor (USII)', 'Fm (USvi)', 'A Mayor (#9)'],
      },
    ],
  },
  {
    id: 'oleo',
    name: 'Oleo (Sonny Rollins)',
    chords: ['Bbmaj7', 'G7', 'Cm7', 'F7'],
    description: 'Contrafact de "I Got Rhythm". Mismo concepto que Rhythm Changes.',
    suggestions: [
      {
        chord: 'Bbmaj7',
        pentatonics: ['Bb Mayor', 'F Mayor', 'C Mayor (Lidio)', 'G menor'],
        triads: ['C Mayor (USII)', 'F Mayor (USV)', 'Dm'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'D Mayor pentatónica', 'A menor (sus)'],
        triads: ['D Mayor (USII)', 'Eb Mayor (#9)', 'Am (USvi)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Fm (USII)', 'Eb Mayor (USbIII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor pentatónica', 'G menor (sus)'],
        triads: ['C Mayor (USII)', 'Db Mayor (#9)', 'Gm (USvi)'],
      },
    ],
  },
  {
    id: 'nefertiti',
    name: 'Nefertiti (Wayne Shorter)',
    chords: ['Cm', 'Cmaj7', 'Cm7', 'Fmaj7'],
    description: 'Modulación menor-mayor. Sonido misterioso y contemplativo.',
    suggestions: [
      {
        chord: 'Cm',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'Bb Mayor'],
        triads: ['Gm', 'Eb Mayor (USbIII)', 'Fm'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor', 'A menor'],
        triads: ['D Mayor (USII)', 'Em', 'G Mayor (USV)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor', 'Fm (USII)'],
      },
      {
        chord: 'Fmaj7',
        pentatonics: ['F Mayor', 'G Mayor (Lidio)', 'C Mayor', 'D menor'],
        triads: ['G Mayor (USII)', 'C Mayor (USV)', 'Am'],
      },
    ],
  },
  {
    id: 'recorda-me',
    name: 'Recorda Me (Joe Henderson)',
    chords: ['Am7', 'Dm7', 'Am7', 'C#m7b5-F#7alt'],
    description: 'Bossa/Latin jazz modal con ii-V menor al final. Color brasileiro moderno.',
    suggestions: [
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'C Mayor', 'D Mayor (Dórico)'],
        triads: ['Em (USII)', 'C Mayor (USbIII)', 'Dm'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor (9,11,13)', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
      {
        chord: 'C#m7b5',
        pentatonics: ['E menor', 'G Mayor', 'A menor (Locrio)'],
        triads: ['G Mayor (USbV)', 'Em (USbIII)'],
      },
      {
        chord: 'F#7alt',
        pentatonics: ['C menor (Alterado)', 'G menor melódica'],
        triads: ['C menor (USbii)', 'D menor (USbiii)', 'Gb Mayor (USbV)'],
      },
    ],
  },
  {
    id: 'footprints',
    name: 'Footprints (Wayne Shorter)',
    chords: ['Cm7', 'Cm7', 'Fm7', 'Cm7'],
    description: 'Blues menor modal. Vamp en C menor Dórico. Piensa en una sola escala.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor (9,11,13)', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor (USbIII)', 'Fm (USII)'],
      },
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
    ],
  },
  {
    id: 'inner-urge',
    name: 'Inner Urge (Joe Henderson)',
    chords: ['Cm7', 'C#m7', 'Ebmaj7', 'Dm7'],
    description: 'Movimiento cromático complejo. Modulación continua, desafío armónico.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor', 'Fm (USII)'],
      },
      {
        chord: 'C#m7',
        pentatonics: ['C# menor', 'G# menor', 'E Mayor', 'D# menor (Dórico)'],
        triads: ['G#m', 'E Mayor', 'F#m (USII)'],
      },
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows (Chick Corea)',
    chords: ['Bbm7', 'Eb7', 'Abmaj7', 'Dbmaj7'],
    description: 'ii-V-I en Ab mayor. Usa sustituciones de tritono para variaciones.',
    suggestions: [
      {
        chord: 'Bbm7',
        pentatonics: ['Bb menor', 'F menor', 'Db Mayor', 'Ab Mayor'],
        triads: ['Fm (USII)', 'Db Mayor (USbIII)', 'Ebm'],
      },
      {
        chord: 'Eb7',
        pentatonics: ['Eb Mayor', 'Eb Dom', 'F menor (sus)', 'Bb Mayor'],
        triads: ['Bb Mayor (USII)', 'Fm (USvi)', 'A Mayor (#9)'],
      },
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor', 'F menor'],
        triads: ['Bb Mayor (USII)', 'Eb Mayor (USV)', 'Cm'],
      },
      {
        chord: 'Dbmaj7',
        pentatonics: ['Db Mayor', 'Eb Mayor (Lidio)', 'Ab Mayor', 'Bb menor'],
        triads: ['Eb Mayor (USII)', 'Ab Mayor (USV)', 'Fm'],
      },
    ],
  },
  {
    id: 'just-friends',
    name: 'Just Friends (A section)',
    chords: ['Cmaj7', 'E7', 'Am7', 'Dm7'],
    description: 'Progresión clásica I-III7-vi-ii. El III7 actúa como dominante secundario del vi.',
    suggestions: [
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor', 'A menor'],
        triads: ['D Mayor (USII)', 'Em', 'G Mayor (USV)'],
      },
      {
        chord: 'E7',
        pentatonics: ['E Mayor', 'E Dom', 'Bb menor (Alterado)', 'F# menor (sus)'],
        triads: ['B Mayor (USII)', 'F# menor (USvi)', 'Db Mayor (USbVI)'],
      },
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'D Mayor (Dórico)', 'C Mayor'],
        triads: ['Em (USII)', 'C Mayor (USbIII)', 'Dm'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
    ],
  },
  {
    id: 'summertime',
    name: 'Summertime (Gershwin)',
    chords: ['Am7', 'D7', 'Gmaj7', 'Cmaj7'],
    description: 'Progresión vi-II7-V-I en G mayor. Movimiento fuerte con dominante secundario.',
    suggestions: [
      {
        chord: 'Am7',
        pentatonics: ['A menor', 'E menor', 'C Mayor', 'D Mayor (Dórico)'],
        triads: ['Em (USII)', 'C Mayor (USbIII)', 'Dm'],
      },
      {
        chord: 'D7',
        pentatonics: ['D Mayor', 'D Dom', 'E menor (sus)', 'A Mayor'],
        triads: ['A Mayor (USII)', 'Em (USvi)', 'Eb Mayor (#9)'],
      },
      {
        chord: 'Gmaj7',
        pentatonics: ['G Mayor', 'A Mayor (Lidio)', 'D Mayor', 'E menor'],
        triads: ['A Mayor (USII)', 'D Mayor (USV)', 'Bm'],
      },
      {
        chord: 'Cmaj7',
        pentatonics: ['C Mayor', 'D Mayor (Lidio)', 'G Mayor', 'A menor'],
        triads: ['D Mayor (USII)', 'Em', 'G Mayor (USV)'],
      },
    ],
  },
  {
    id: 'body-and-soul',
    name: 'Body and Soul (Bridge)',
    chords: ['Ebmaj7', 'Ebm7', 'Dm7', 'Db7'],
    description: 'Modulación dramática con intercambio modal. Movimiento cromático descendente.',
    suggestions: [
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
      {
        chord: 'Ebm7',
        pentatonics: ['Eb menor', 'Bb menor', 'Gb Mayor', 'Db Mayor'],
        triads: ['Bbm (USII)', 'Gb Mayor (USbIII)', 'Abm'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
      {
        chord: 'Db7',
        pentatonics: ['Db Lidio Dom', 'Gb Mayor', 'Ab Mayor', 'Eb menor (sus)'],
        triads: ['Ab Mayor (USII - Lidio Dom)', 'Ebm (USvi)'],
      },
    ],
  },
  {
    id: 'wave',
    name: 'Wave (Jobim)',
    chords: ['Dmaj7', 'D#dim', 'Em7', 'A7'],
    description: 'Progresión de bossa nova con acorde disminuido de paso. Movimiento cromático elegante.',
    suggestions: [
      {
        chord: 'Dmaj7',
        pentatonics: ['D Mayor', 'E Mayor (Lidio)', 'A Mayor', 'B menor'],
        triads: ['E Mayor (USII)', 'A Mayor (USV)', 'F#m'],
      },
      {
        chord: 'D#dim',
        pentatonics: ['E menor', 'F# menor (Locrio)', 'D Mayor'],
        triads: ['F# menor (USbiii)', 'B Mayor (USV)'],
      },
      {
        chord: 'Em7',
        pentatonics: ['E menor', 'B menor', 'D Mayor (Dórico)', 'G Mayor'],
        triads: ['Bm (USII)', 'G Mayor (USbIII)', 'D Mayor'],
      },
      {
        chord: 'A7',
        pentatonics: ['A Mayor', 'A Dom', 'B menor (sus)', 'E Mayor'],
        triads: ['E Mayor (USII)', 'Bm (USvi)', 'Bb Mayor (#9)'],
      },
    ],
  },
  {
    id: 'misty',
    name: 'Misty (Garner)',
    chords: ['Ebmaj7', 'Bbm7', 'Eb7', 'Abmaj7'],
    description: 'Standard romántico con IV menor como color especial (intercambio modal).',
    suggestions: [
      {
        chord: 'Ebmaj7',
        pentatonics: ['Eb Mayor', 'F Mayor (Lidio)', 'Bb Mayor', 'C menor'],
        triads: ['F Mayor (USII)', 'Bb Mayor (USV)', 'Gm'],
      },
      {
        chord: 'Bbm7',
        pentatonics: ['Bb menor', 'F menor', 'Db Mayor', 'Ab Mayor'],
        triads: ['Fm (USII)', 'Db Mayor (USbIII)', 'Ebm'],
      },
      {
        chord: 'Eb7',
        pentatonics: ['Eb Mayor', 'Eb Dom', 'F menor (sus)', 'Bb Mayor'],
        triads: ['Bb Mayor (USII)', 'Fm (USvi)', 'A Mayor (#9)'],
      },
      {
        chord: 'Abmaj7',
        pentatonics: ['Ab Mayor', 'Bb Mayor (Lidio)', 'Eb Mayor', 'F menor'],
        triads: ['Bb Mayor (USII)', 'Eb Mayor (USV)', 'Cm'],
      },
    ],
  },
  {
    id: 'mr-pc',
    name: 'Mr. P.C. (Coltrane)',
    chords: ['Cm7', 'Cm7', 'Fm7', 'Cm7'],
    description: 'Blues menor simple. Piensa en C menor Dórico durante toda la progresión.',
    suggestions: [
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor (9,11,13)', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Eb Mayor (USbIII)', 'Fm (USII)'],
      },
      {
        chord: 'Fm7',
        pentatonics: ['F menor', 'C menor', 'Ab Mayor', 'Eb Mayor'],
        triads: ['Cm (USII)', 'Ab Mayor (USbIII)', 'Bbm'],
      },
    ],
  },
  {
    id: 'impressions',
    name: 'Impressions (Coltrane)',
    chords: ['Dm7', 'Dm7', 'Ebm7', 'Ebm7'],
    description: 'Modal jazz. 16 compases en D Dórico, 8 en Eb Dórico. Piensa en una escala por sección.',
    suggestions: [
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor (9,11,13)', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
      {
        chord: 'Ebm7',
        pentatonics: ['Eb menor', 'Bb menor (9,11,13)', 'Gb Mayor', 'Ab Mayor'],
        triads: ['Bbm', 'Gb Mayor (USII)', 'Abm'],
      },
    ],
  },
  {
    id: 'tenor-madness',
    name: 'Tenor Madness (Rollins)',
    chords: ['Bb7', 'Eb7', 'Bb7', 'F7'],
    description: 'Blues de jazz en Bb. Usa pentatónicas blues y escala dominante bebop.',
    suggestions: [
      {
        chord: 'Bb7',
        pentatonics: ['Bb Mayor', 'Bb Dom', 'F Mayor', 'Bb menor (blues)'],
        triads: ['F Mayor (USII)', 'Cm (USvi)', 'Gb Mayor (#9)'],
      },
      {
        chord: 'Eb7',
        pentatonics: ['Eb Mayor', 'Eb Dom', 'Bb Mayor', 'Eb menor (blues)'],
        triads: ['Bb Mayor (USII)', 'Fm (USvi)', 'A Mayor (#9)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor', 'F menor (blues)'],
        triads: ['C Mayor (USII)', 'Gm (USvi)', 'Db Mayor (#9)'],
      },
    ],
  },
  {
    id: 'confirmation',
    name: 'Confirmation (Parker)',
    chords: ['Fmaj7', 'Em7b5', 'A7alt', 'Dm7'],
    description: 'Bebop clásico. Modulación rápida con alteraciones. Trabaja voice leading cromático.',
    suggestions: [
      {
        chord: 'Fmaj7',
        pentatonics: ['F Mayor', 'G Mayor (Lidio)', 'C Mayor', 'D menor'],
        triads: ['G Mayor (USII)', 'C Mayor (USV)', 'Am'],
      },
      {
        chord: 'Em7b5',
        pentatonics: ['G menor', 'Bb Mayor', 'D menor (Locrio)'],
        triads: ['Bb Mayor (USbV)', 'Gm (USbIII)', 'Dm (USbVII)'],
      },
      {
        chord: 'A7alt',
        pentatonics: ['Bb menor melódica (Alterado)', 'Eb menor'],
        triads: ['Eb menor (USbii)', 'F menor (USbiii)', 'Bb Mayor (USbVI)'],
      },
      {
        chord: 'Dm7',
        pentatonics: ['D menor', 'A menor', 'F Mayor', 'G Mayor'],
        triads: ['Am', 'F Mayor (USII)', 'Gm'],
      },
    ],
  },
  {
    id: 'anthropology',
    name: 'Anthropology (Parker)',
    chords: ['Bbmaj7', 'G7', 'Cm7', 'F7'],
    description: 'Contrafact de Rhythm Changes. Practica bebop scales y aproximaciones cromáticas.',
    suggestions: [
      {
        chord: 'Bbmaj7',
        pentatonics: ['Bb Mayor', 'C Mayor (Lidio)', 'F Mayor', 'G menor'],
        triads: ['C Mayor (USII)', 'F Mayor (USV)', 'Dm'],
      },
      {
        chord: 'G7',
        pentatonics: ['G Mayor', 'G Dom', 'D Mayor pentatónica', 'A menor (sus)'],
        triads: ['D Mayor (USII)', 'Eb Mayor (#9)', 'Am (USvi)'],
      },
      {
        chord: 'Cm7',
        pentatonics: ['C menor', 'G menor', 'Eb Mayor', 'D menor (Dórico)'],
        triads: ['Gm', 'Fm (USII)', 'Eb Mayor (USbIII)'],
      },
      {
        chord: 'F7',
        pentatonics: ['F Mayor', 'F Dom', 'C Mayor pentatónica', 'G menor (sus)'],
        triads: ['C Mayor (USII)', 'Db Mayor (#9)', 'Gm (USvi)'],
      },
    ],
  },
];
