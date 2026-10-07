export interface Scale {
  id: string;
  name: string;
  formula: string;
  notes: string[];
  description: string;
  usage: string;
  chordTypes: string[];
  examples: { artist: string; song: string; context: string; }[];
  exercises: { title: string; description: string; tips: string[]; }[];
}

export const scales: Scale[] = [
  {
    id: 'major-pentatonic',
    name: 'Pentatònica major',
    formula: '1 2 3 5 6',
    notes: ['C', 'D', 'E', 'G', 'A'],
    description: 'La pentatònica major és la base del so country clàssic i del bluegrass. És la mateixa escala que la pentatònica menor de la seva relativa menor, però amb la tònica desplaçada. Son alegre, oberta i perfecta per a frases melòdiques i doble stops.',
    usage: 'Sobre acords majors i progressions I-IV-V en country, bluegrass i honky-tonk. És la primera escala que cal dominar per a solos i fills melòdics.',
    chordTypes: ['C', 'G', 'F', 'Am'],
    examples: [
      { artist: 'Chet Atkins', song: 'Mr. Sandman', context: 'Fraseig melòdic de pentatònica major sobre la melodia.' },
      { artist: 'Don Rich', song: 'Together Again', context: 'Fills i solos de pentatònica major amb doble stops.' },
      { artist: 'James Burton', song: 'Sweet Dreams', context: 'Licks de pentatònica major amb bending expressiu.' }
    ],
    exercises: [
      { title: 'Seqüències de 3 notes', description: 'Toca la pentatònica major en una sola posició fent grups de tres notes ascendents i descendents.', tips: ['Mantén la mà quieta i canvia de corda amb moviments mínims.', 'Comença lent i augmenta el tempo amb metrònom.'] },
      { title: 'Doble stops en terceres', description: 'Toca la pentatònica major en doble stops de tercera (C-E, D-G, E-A) sobre la progressió C-G-F.', tips: ['Pica les dues cordes alhora amb un atac net.', 'Escolta com cada doble stop ressona sobre l\'acord de fons.'] },
      { title: 'Fraseig amb bends', description: 'Crea frases curtes de 2-3 notes acabades amb un bend de to sencer cap a la tònica.', tips: ['El bend ha de sonar afinat: compara amb la nota oberta.', 'Acaba cada frase amb un vibrato lleuger.'] }
    ]
  },
  {
    id: 'minor-pentatonic',
    name: 'Pentatònica menor',
    formula: '1 b3 4 5 b7',
    notes: ['C', 'Eb', 'F', 'G', 'Bb'],
    description: 'La pentatònica menor és l\'escala més utilitzada en el country modern i el rockabilly. És la relativa menor de la pentatònica major i aporta un so més fosc i bluesy. És la base de la majoria de licks de guitarra country elèctrica.',
    usage: 'Sobre acords menors, progressions blues i per afegir tensió en solos country moderns. També funciona sobre acords majors en contextos bluesy (sobre el V).',
    chordTypes: ['Cm', 'Gm', 'F', 'Bb'],
    examples: [
      { artist: 'Brad Paisley', song: 'Whiskey Lullaby', context: 'Solos i fills amb pentatònica menor i bends bluesy.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Licks ràpids de pentatònica menor amb alternate picking.' },
      { artist: 'Danny Gatton', song: 'Funhouse', context: 'Fraseig de pentatònica menor amb tocs de blues i jazz.' }
    ],
    exercises: [
      { title: 'Licks de 4 notes', description: 'Toca la pentatònica menor en una posició fent licks de quatre notes amb alternate picking estricte.', tips: ['Alterna sempre down-up-down-up.', 'Practica cada lick sobre un acord de Cm de fons.'] },
      { title: 'Bends de to i de semitò', description: 'Practica bends de to sencer i de semitò sobre les notes de la pentatònica menor.', tips: ['Usa dos dits per fer el bend i guanya força.', 'Comprova l\'afinació del bend amb la nota oberta de referència.'] },
      { title: 'Fraseig cridaner', description: 'Crea frases curtes que comencin en temps febles i acabin amb un bend o un slide cap a la tònica.', tips: ['Respira entre frases: deixa espai.', 'Imagina que la guitarra canta una melodia vocal.'] }
    ]
  },
  {
    id: 'blues-scale',
    name: 'Escala de blues',
    formula: '1 b3 4 b5 5 b7',
    notes: ['C', 'Eb', 'F', 'Gb', 'G', 'Bb'],
    description: 'L\'escala de blues és la pentatònica menor amb la blue note (b5) afegida. Aquesta nota dóna el caràcter bluesy i expressiu tan característic del country elèctric i del rockabilly. És imprescindible per a licks amb bends i slides.',
    usage: 'Sobre progressions de blues en country, rockabilly i honky-tonk. La blue note s\'utilitza com a nota de pas o com a bend per crear tensió i resolució.',
    chordTypes: ['C7', 'F7', 'G7', 'Cm'],
    examples: [
      { artist: 'Danny Gatton', song: 'Elmira St. Boogie', context: 'Licks de blues scale amb bends i slides sobre un boogie.' },
      { artist: 'Jerry Reed', song: 'The Claw', context: 'Fraseig de blues scale amb atac percussiu i híbrid.' },
      { artist: 'James Burton', song: 'Suzie Q', context: 'Solos de blues scale amb bends expressius i vibrato.' }
    ],
    exercises: [
      { title: 'Blue note amb bend', description: 'Toca la blue note (Gb) i fes-li un bend de semitò cap a la quinta (G) sobre un acord de C7.', tips: ['El bend de la blue note és el gest més característic del blues.', 'Practica el vibrato sobre la nota resolta.'] },
      { title: 'Licks de blues en una posició', description: 'Aprèn tres licks clàssics de blues scale en la posició de C i toca\'ls sobre un backing de 12 compassos.', tips: ['Memoritza els licks en diferents cordes.', 'Toca\'ls amb groove, no només amb velocitat.'] },
      { title: 'Slides entre notes', description: 'Practica slides ascendents i descendents entre les notes de la blues scale.', tips: ['El slide ha de ser net i sense soroll de corda.', 'Combina slides amb bends per a un so més vocal.'] }
    ]
  },
  {
    id: 'mixolydian',
    name: 'Mode mixolidi',
    formula: '1 2 3 4 5 6 b7',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
    description: 'El mode mixolidi és l\'escala major amb la setena menor (b7). És el so fonamental del country, el bluegrass i el rockabilly, ja que la b7 crea la tensió que es resol sobre els acords de setena dominant. És l\'escala més important per a solos country sobre acords de setena.',
    usage: 'Sobre acords de setena dominant (C7, G7, F7) i progressions I-IV-V. És la base dels solos country clàssics i dels fills melòdics sobre acords de setena.',
    chordTypes: ['C7', 'G7', 'F7', 'D7'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Solos de mixolidi amb alternate picking i doble stops.' },
      { artist: 'Brad Paisley', song: 'Mud on the Tires', context: 'Fraseig de mixolidi amb bends i licks melòdics.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Licks ràpids de mixolidi sobre acords de setena.' }
    ],
    exercises: [
      { title: 'Arpegis sobre C7', description: 'Toca l\'escala mixolidi de C destacant les notes de l\'acord C7 (C-E-G-Bb) en cada posició.', tips: ['Marca les notes de l\'acord amb un accent.', 'Visualitza l\'arpegi dins de l\'escala.'] },
      { title: 'Licks de b7', description: 'Crea licks que acabin o comencin amb la b7 (Bb) per crear tensió que es resolgui cap a la tònica.', tips: ['La b7 és la nota que dóna el so country.', 'Resol sempre cap a una nota de l\'acord.'] },
      { title: 'Seqüències de 4 notes', description: 'Toca seqüències de quatre notes per l\'escala mixolidi en una posició, ascendents i descendents.', tips: ['Usa alternate picking estricte.', 'Augmenta el tempo gradualment amb metrònom.'] }
    ]
  },
  {
    id: 'dorian',
    name: 'Mode dòric',
    formula: '1 2 b3 4 5 6 b7',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
    description: 'El mode dòric és la escala menor amb la sisena major (6). Aquesta sisena major li dóna un so més brillant i menys fosc que la menor natural. És molt utilitzat en el country modern i en el bluegrass per a solos sobre acords menors.',
    usage: 'Sobre acords menors (Cm, Gm, Dm) i progressions menors en country i bluegrass. La sisena major (A) és la nota que el distingeix de la menor natural.',
    chordTypes: ['Cm', 'Gm', 'Dm', 'Am'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Passatges de dòric sobre acords menors en solos country.' },
      { artist: 'Brad Paisley', song: 'The World', context: 'Fraseig de dòric amb la sisena major com a color.' },
      { artist: 'Jerry Reed', song: 'East Bound and Down', context: 'Licks de dòric amb atac rítmic i híbrid.' }
    ],
    exercises: [
      { title: 'Destacar la sisena', description: 'Toca el dòric de C destacant la sisena major (A) sobre un acord de Cm de fons.', tips: ['La sisena és la nota que dóna el color dòric.', 'Alterna entre la sisena i la setena menor per sentir la diferència.'] },
      { title: 'Arpegis menors', description: 'Toca l\'arpegi de Cm (C-Eb-G) dins de l\'escala dòrica i afegeix la sisena com a nota de pas.', tips: ['Marca les notes de l\'arpegi.', 'Practica sobre una progressió Cm-Gm.'] },
      { title: 'Fraseig melòdic', description: 'Crea frases melòdiques de dòric que comencin en la tònica i acabin en la sisena o la tònica.', tips: ['Pensa en frases vocals, no en exercicis.', 'Deixa espai entre frases.'] }
    ]
  },
  {
    id: 'major',
    name: 'Escala major',
    formula: '1 2 3 4 5 6 7',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    description: 'L\'escala major és la base de tota la música occidental i del country. Totes les altres escales i modes deriven d\'ella. En country s\'utilitza per a melodies, arpegis i per entendre la relació entre acords i escales.',
    usage: 'Sobre acords majors i progressions diatòniques. És fonamental per entendre els modes i per construir arpegis i acords.',
    chordTypes: ['C', 'G', 'F', 'Am', 'Dm'],
    examples: [
      { artist: 'Chet Atkins', song: 'Mr. Sandman', context: 'Melodies i arpegis de l\'escala major.' },
      { artist: 'Merle Travis', song: 'I Am a Pilgrim', context: 'Fraseig de l\'escala major amb fingerpicking.' },
      { artist: 'Don Rich', song: 'Together Again', context: 'Fills melòdics de l\'escala major amb doble stops.' }
    ],
    exercises: [
      { title: 'Arpegis de l\'escala', description: 'Toca els arpegis de cada grau de l\'escala major de C (C, Dm, Em, F, G, Am, Bdim).', tips: ['Visualitza cada arpegi dins de la posició de l\'escala.', 'Practica sobre la progressió C-Am-F-G.'] },
      { title: 'Seqüències diatòniques', description: 'Toca seqüències de terceres i de quartes per l\'escala major de C.', tips: ['Les terceres són la base dels doble stops country.', 'Mantén un tempo constant.'] },
      { title: 'Melodies per graus', description: 'Toca la melodia de "Amazing Grace" o una melodia senzilla utilitzant només notes de l\'escala major de C.', tips: ['Escolta la melodia i canta-la abans de tocar-la.', 'Toca la melodia en diferents posicions.'] }
    ]
  },
  {
    id: 'natural-minor',
    name: 'Menor natural (eòlic)',
    formula: '1 2 b3 4 5 b6 b7',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    description: 'La menor natural és la relativa menor de l\'escala major i té un so més fosc i melancòlic. És la base de moltes cançons country i bluegrass en tonalitat menor. La sisena menor (Ab) és la nota que la distingeix del mode dòric.',
    usage: 'Sobre acords menors i progressions menors en country i bluegrass. S\'utilitza per a melodies i solos en tonalitats menors.',
    chordTypes: ['Cm', 'Gm', 'Fm', 'Ab'],
    examples: [
      { artist: 'Brad Paisley', song: 'Whiskey Lullaby', context: 'Melodies i solos en menor natural amb un so melancòlic.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Passatges de menor natural en solos ràpids.' },
      { artist: 'Chet Atkins', song: 'Black Mountain Rag', context: 'Fraseig de menor natural amb fingerpicking.' }
    ],
    exercises: [
      { title: 'Arpegis menors', description: 'Toca l\'arpegi de Cm (C-Eb-G) dins de l\'escala menor natural i afegeix la b6 i la b7 com a colors.', tips: ['Marca les notes de l\'arpegi.', 'Practica sobre una progressió Cm-Ab-Eb-Bb.'] },
      { title: 'Contrast dòric-menor', description: 'Toca la mateixa frase en dòric (amb la 6 major) i en menor natural (amb la b6) per sentir la diferència.', tips: ['La b6 dóna un so més fosc i melancòlic.', 'Usa la b6 com a nota de pas cap a la quinta.'] },
      { title: 'Melodies menors', description: 'Toca una melodia senzilla en menor natural de C, com "Greensleeves", en diferents posicions.', tips: ['Canta la melodia abans de tocar-la.', 'Practica el fraseig amb dinàmiques.'] }
    ]
  },
  {
    id: 'country-scale',
    name: 'Country scale (mixolidi amb b3)',
    formula: '1 2 b3 3 4 5 6 b7',
    notes: ['C', 'D', 'Eb', 'E', 'F', 'G', 'A', 'Bb'],
    description: 'La country scale és el mode mixolidi amb la tercera menor (b3) afegida com a nota cromàtica de pas. Aquesta nota dóna el so country característic, amb un toc bluesy que es resol cap a la tercera major. És l\'escala definitòria del country elèctric modern.',
    usage: 'Sobre acords de setena dominant (C7, G7) en country modern i rockabilly. La b3 s\'utilitza com a nota de pas cromàtica cap a la tercera major (E).',
    chordTypes: ['C7', 'G7', 'F7', 'C'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Licks de country scale amb la b3 com a nota de pas.' },
      { artist: 'Brad Paisley', song: 'Mud on the Tires', context: 'Fraseig de country scale amb bends i doble stops.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Licks ràpids de country scale amb alternate picking.' }
    ],
    exercises: [
      { title: 'La b3 com a nota de pas', description: 'Toca la seqüència Eb-E (b3 a 3) com a nota de pas cromàtica sobre un acord de C7.', tips: ['La b3 sempre es resol cap a la tercera major.', 'Practica el pas cromàtic en diferents cordes.'] },
      { title: 'Licks de country scale', description: 'Aprèn tres licks clàssics de country scale que utilitzin la b3 i toca\'ls sobre una progressió C7-G7.', tips: ['Usa alternate picking estricte.', 'Acaba cada lick amb un bend o un vibrato.'] },
      { title: 'Doble stops amb b3', description: 'Toca doble stops que incloguin la b3 i la tercera major per crear el so country característic.', tips: ['Pica les dues cordes alhora.', 'Escolta com la b3 crea tensió que es resol.'] }
    ]
  },
  {
    id: 'double-stop-scale',
    name: 'Escala de doble stops',
    formula: '1 2 3 4 5 6 b7 (en terceres)',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
    description: 'L\'escala de doble stops no és una escala pròpiament dita, sinó una manera de tocar l\'escala mixolidi en terceres (dues notes alhora). És el so més característic del country clàssic, utilitzat per Don Rich, Chet Atkins i tots els grans del Bakersfield sound.',
    usage: 'Sobre acords majors i de setena dominant en country clàssic i Bakersfield. Els doble stops en terceres creen el so ple i brillant del country tradicional.',
    chordTypes: ['C', 'G', 'F', 'C7'],
    examples: [
      { artist: 'Don Rich', song: 'Together Again', context: 'Doble stops en terceres sobre la progressió I-IV-V.' },
      { artist: 'Chet Atkins', song: 'Mr. Sandman', context: 'Doble stops melòdics amb fingerpicking.' },
      { artist: 'James Burton', song: 'Sweet Dreams', context: 'Doble stops amb bends i vibrato.' }
    ],
    exercises: [
      { title: 'Terceres diatòniques', description: 'Toca l\'escala mixolidi de C en terceres diatòniques (C-E, D-F, E-G, F-A, G-Bb, A-C).', tips: ['Pica les dues cordes alhora amb un atac net.', 'Mantén les dues notes afinades i equilibrades.'] },
      { title: 'Doble stops sobre la progressió', description: 'Toca doble stops en terceres sobre la progressió C-G-F, canviant de posició amb cada acord.', tips: ['Escolta com cada doble stop ressona sobre l\'acord de fons.', 'Usa el dit anular i el menovell per als doble stops.'] },
      { title: 'Doble stops amb bends', description: 'Practica doble stops on una de les notes fa un bend cap a la següent nota de l\'escala.', tips: ['El bend ha de sonar afinat en les dues notes.', 'Combina doble stops amb frases d\'una sola nota.'] }
    ]
  },
  {
    id: 'bebop-major',
    name: 'Bebop major',
    formula: '1 2 3 4 5 6 b7 7',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'B'],
    description: 'L\'escala bebop major és l\'escala major amb la setena menor (b7) afegida com a nota de pas. Aquesta nota extra permet que les frases de vuit notes caiguin en temps forts sobre notes de l\'acord. És molt utilitzada en el country modern i el country-jazz per a solos sofisticats.',
    usage: 'Sobre acords majors i de setena dominant en country modern i country-jazz. La b7 s\'utilitza com a nota de pas cromàtica per crear frases fluides.',
    chordTypes: ['C', 'C7', 'G', 'F'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Frases de bebop major amb alternate picking i cromatismes.' },
      { artist: 'Danny Gatton', song: 'Funhouse', context: 'Solos de bebop major amb tocs de jazz i country.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Licks de bebop major amb velocitat i precisió.' }
    ],
    exercises: [
      { title: 'Frases de 8 notes', description: 'Toca l\'escala bebop major de C en frases de vuit notes, començant i acabant en notes de l\'acord.', tips: ['La b7 és una nota de pas, no una nota d\'arribada.', 'Compta els temps forts per sentir on cauen les notes de l\'acord.'] },
      { title: 'Cromatismes de pas', description: 'Practica el pas cromàtic Bb-B (b7 a 7) dins de frases de l\'escala bebop major.', tips: ['El cromatisme ha de sonar com una nota de pas natural.', 'Usa alternate picking per a les notes cromàtiques.'] },
      { title: 'Licks de bebop', description: 'Aprèn tres licks de bebop major sobre una progressió C-Am-F-G.', tips: ['Memoritza els licks en diferents posicions.', 'Toca\'ls amb swing i groove.'] }
    ]
  },
  {
    id: 'bebop-dominant',
    name: 'Bebop dominant',
    formula: '1 2 3 4 5 6 b7 7',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'B'],
    description: 'L\'escala bebop dominant és el mode mixolidi amb la setena major (7) afegida com a nota de pas. És l\'escala més utilitzada per a solos sobre acords de setena dominant en country modern i country-jazz. La setena major crea un cromatisme que fa que les frases caiguin perfectament en els temps forts.',
    usage: 'Sobre acords de setena dominant (C7, G7, F7) en country modern, rockabilly i country-jazz. És ideal per a solos llargs i frases fluides sobre progressions de blues i I-IV-V.',
    chordTypes: ['C7', 'G7', 'F7', 'D7'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Solos de bebop dominant amb alternate picking i cromatismes.' },
      { artist: 'Danny Gatton', song: 'Elmira St. Boogie', context: 'Frases de bebop dominant sobre un boogie de setena.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Licks de bebop dominant amb velocitat i precisió.' }
    ],
    exercises: [
      { title: 'Frases de 8 notes sobre C7', description: 'Toca l\'escala bebop dominant de C en frases de vuit notes sobre un acord de C7 de fons.', tips: ['La setena major (B) és una nota de pas cap a la tònica.', 'Compta els temps forts per sentir les notes de l\'acord.'] },
      { title: 'Cromatisme B-Bb', description: 'Practica el pas cromàtic B-Bb (7 a b7) dins de frases de l\'escala bebop dominant.', tips: ['El cromatisme ha de sonar natural i fluid.', 'Usa alternate picking per a les notes cromàtiques.'] },
      { title: 'Licks sobre la progressió', description: 'Aprèn tres licks de bebop dominant sobre una progressió C7-F7-G7.', tips: ['Memoritza els licks en diferents posicions.', 'Toca\'ls amb groove i swing.'] }
    ]
  },
  {
    id: 'chromatic',
    name: 'Escala cromàtica (per a licks)',
    formula: '1 b2 2 b3 3 4 b5 5 b6 6 b7 7',
    notes: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
    description: 'L\'escala cromàtica inclou les dotze notes de l\'octava. No s\'utilitza com a escala melòdica, sinó com a font de notes de pas cromàtiques per crear licks i frases expressives. És essencial per al country modern, on els cromatismes afegeixen tensió i sofisticació als solos.',
    usage: 'Sobre qualsevol acord, com a notes de pas cromàtiques que es resolen cap a notes de l\'acord. S\'utilitza per crear licks ràpids i frases amb tensió i resolució.',
    chordTypes: ['C', 'C7', 'G', 'F', 'Am'],
    examples: [
      { artist: 'Brent Mason', song: 'Hot Wired', context: 'Licks cromàtics ràpids amb alternate picking.' },
      { artist: 'Danny Gatton', song: 'Funhouse', context: 'Cromatismes i frases de jazz-country.' },
      { artist: 'Albert Lee', song: 'Country Boy', context: 'Passatges cromàtics amb velocitat i precisió.' }
    ],
    exercises: [
      { title: 'Notes de pas cromàtiques', description: 'Toca frases de l\'escala mixolidi i afegeix notes cromàtiques de pas entre les notes de l\'acord.', tips: ['Les notes cromàtiques sempre es resolen cap a una nota de l\'acord.', 'No abusis dels cromatismes: usa\'ls amb intenció.'] },
      { title: 'Licks cromàtics ràpids', description: 'Aprèn tres licks cromàtics ràpids i toca\'ls sobre una progressió C-G-F.', tips: ['Usa alternate picking estricte per a la velocitat.', 'Comença lent i augmenta el tempo gradualment.'] },
      { title: 'Cromatisme cap a la tònica', description: 'Practica el pas cromàtic cap a la tònica (B-Bb o Bb-B) com a final de frase.', tips: ['El cromatisme final crea una resolució expressiva.', 'Acaba amb un vibrato sobre la tònica.'] }
    ]
  }
];
