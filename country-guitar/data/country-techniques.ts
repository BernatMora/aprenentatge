// country-techniques.ts
// Dades de tècniques de guitarra country (modern, clàssic i bluegrass) en català.

export interface CountryTechnique {
  id: string;
  name: string;
  category: 'picking' | 'bending' | 'harmony' | 'techniques';
  description: string;
  chordContext: string;
  application: string;
  sound: string;
  examples: { over: string; play: string; result: string; }[];
  artists: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const countryTechniques: CountryTechnique[] = [
  {
    id: 'chicken-pickin',
    name: 'Chicken Pickin\'',
    category: 'picking',
    description: 'Tècnica de plectre que combina notes "pops" (atacades amb el plectre) amb notes "clicks" (muted amb la mà de la corda) per crear un so percussiu i entrecortat, típic del country modern de Nashville.',
    chordContext: 'Acords majors i dominants, especialment sobre progressions I-IV-V en tonalitats com G, A i E.',
    application: 'Solos ràpids i fills entre frases vocals; és la base del so de guitarristes de sessió de Nashville.',
    sound: 'Percussiu, sec i "nasal", amb atacs molt definits i notes que "cliquen" com una màquina d\'escriure.',
    examples: [
      { over: 'G major', play: 'Pica la nota G (3a corda, traste 0) i immediatament muta la corda amb la mà de la corda per fer un "click".', result: 'Un pop seguit d\'un click sec, el so característic del chicken pickin\'.' },
      { over: 'G major', play: 'Alterna pops a la 3a corda amb clicks a la 2a corda en semicorxeres.', result: 'Un patró rítmic entrecortat que "camina" sobre l\'acord.' },
      { over: 'C major', play: 'Fes un pop a la nota C (2a corda, traste 1) i un click a la 1a corda oberta.', result: 'Un fill brillant i percussiu que ressalta sobre l\'acord de C.' },
      { over: 'D major', play: 'Combina pops i clicks en una escala de D major en semicorxeres ascendents.', result: 'Un passatge ràpid i "cliquejant" que puja amb energia.' }
    ],
    artists: ['Brent Mason', 'Brad Paisley', 'Johnny Hiland', 'Redd Volkaert'],
    difficulty: 'advanced'
  },
  {
    id: 'hybrid-picking',
    name: 'Hybrid Picking',
    category: 'picking',
    description: 'Tècnica que combina el plectre amb els dits (normalment mig i anular) per tocar cordes simultàniament o en seqüències ràpides que serien difícils només amb plectre.',
    chordContext: 'Acords majors, dominants i intervals de doble corda sobre progressions country estàndard.',
    application: 'Arpegis ràpids, dobles cordes i fills amb textura; permet tocar notes creuades entre cordes amb gran velocitat.',
    sound: 'Nítid i articulat, amb una barreja de l\'atac del plectre i la calidesa dels dits.',
    examples: [
      { over: 'G major', play: 'Pica la nota G (3a corda) amb el plectre i simultàniament pica la nota B (2a corda) amb el dit mig.', result: 'Una doble corda que sona com un acord de dues notes.' },
      { over: 'C major', play: 'Fes un arpegi de C major alternant plectre i dit en cordes creuades.', result: 'Un arpegi fluid i ràpid sense saltar de corda amb el plectre.' },
      { over: 'A major', play: 'Pica la nota A (3a corda) amb el plectre i la nota E (1a corda) amb el dit anular.', result: 'Un interval obert i brillant que ressalta sobre l\'acord.' },
      { over: 'E major', play: 'Combina plectre i dits en una seqüència de dobles cordes descendents.', result: 'Un passatge de dobles cordes amb textura i moviment.' }
    ],
    artists: ['Brent Mason', 'Albert Lee', 'Johnny Hiland', 'Danny Gatton'],
    difficulty: 'advanced'
  },
  {
    id: 'banjo-rolls',
    name: 'Banjo Rolls',
    category: 'picking',
    description: 'Patrons de plectre alternat inspirats en el banjo de 5 cordes, aplicats a la guitarra per crear un flux continu de notes sobre un acord.',
    chordContext: 'Acords majors i dominants, sovint sobre progressions de bluegrass i country clàssic.',
    application: 'Acompanyament i solos amb moviment constant; dona sensació de "roll" i energia a la música.',
    sound: 'Continu, ràpid i "rodant", com un banjo que no s\'atura mai.',
    examples: [
      { over: 'G major', play: 'Toca un patró de 8 notes alternant cordes baixes i altes sobre l\'acord de G.', result: 'Un roll continu que omple l\'espai sonor.' },
      { over: 'C major', play: 'Fes un roll de 16 notes sobre l\'acord de C amb plectre alternat.', result: 'Un flux ràpid i constant que "roda" sobre l\'acord.' },
      { over: 'D major', play: 'Alterna la corda baixa (D) amb les cordes altes en un patró de banjo.', result: 'Un roll que baixa i puja amb moviment rítmic.' },
      { over: 'G major', play: 'Combina rolls amb una nota pedal de G a la corda baixa.', result: 'Un roll amb una base estable que sona com un banjo.' }
    ],
    artists: ['Jerry Reed', 'Chet Atkins', 'Albert Lee'],
    difficulty: 'intermediate'
  },
  {
    id: 'double-stops',
    name: 'Double Stops',
    category: 'harmony',
    description: 'Tècnica de tocar dues notes simultàniament (intervals de tercera o sisena) per crear harmonia melòdica, molt típica del country i el rockabilly.',
    chordContext: 'Acords majors i dominants; les dobles cordes es mouen en paral·lel sobre la progressió.',
    application: 'Solos i fills amb harmonia; dona un so "dolç" i melòdic, ideal per a melodies country.',
    sound: 'Dolç, harmònic i "cantable", amb dues veus que es mouen juntes.',
    examples: [
      { over: 'G major', play: 'Toca les notes G i B (3a i 2a corda) juntes, després mou-te a A i C.', result: 'Una doble corda que puja en paral·lel sobre l\'acord.' },
      { over: 'C major', play: 'Fes una doble corda de tercera (C i E) i baixa a B i D.', result: 'Un interval de tercera que "canta" sobre l\'acord.' },
      { over: 'D major', play: 'Toca dobles cordes de sisena (D i B) i mou-te per l\'escala.', result: 'Un so harmònic i dolç, típic del country clàssic.' },
      { over: 'A major', play: 'Combina dobles cordes en una frase melòdica ascendent.', result: 'Una melodia a dues veus que ressalta sobre l\'acord.' }
    ],
    artists: ['Don Rich', 'James Burton', 'Albert Lee', 'Brad Paisley'],
    difficulty: 'intermediate'
  },
  {
    id: 'pedal-steel-bends',
    name: 'Pedal Steel Bends',
    category: 'bending',
    description: 'Bends lents i controlats que imiten el so del pedal steel guitar, amb un glissando suau entre notes, sovint combinats amb vibrato.',
    chordContext: 'Acords majors i dominants, especialment sobre progressions lentes i balades country.',
    application: 'Notes sostingudes i frases emotives; dona el so "plorós" i expressiu del country.',
    sound: 'Suau, "plorós" i expressiu, amb un glissando que llisca entre notes.',
    examples: [
      { over: 'G major', play: 'Pica la nota B (2a corda, traste 3) i fes un bend lent fins a C.', result: 'Un glissando suau que "plora" com un pedal steel.' },
      { over: 'C major', play: 'Fes un bend de to sencer a la 2a corda i mantén el vibrato.', result: 'Una nota sostinguda amb vibrato, molt expressiva.' },
      { over: 'D major', play: 'Pica la nota E (1a corda, traste 12) i fes un bend lent fins a F#.', result: 'Un bend alt i brillant que imita el pedal steel.' },
      { over: 'A major', play: 'Combina un bend amb un slide cap avall per tancar la frase.', result: 'Una frase que "cau" suaument, molt country.' }
    ],
    artists: ['Brad Paisley', 'Redd Volkaert', 'Brent Mason'],
    difficulty: 'intermediate'
  },
  {
    id: 'travis-picking',
    name: 'Travis Picking',
    category: 'picking',
    description: 'Patró de fingerpicking amb un baix alternat (thumb) i una melodia als dits, que crea un acompanyament rítmic i melòdic alhora.',
    chordContext: 'Acords majors, menors i setenes sobre progressions de country clàssic i folk.',
    application: 'Acompanyament solista; permet tocar baix, acord i melodia simultàniament.',
    sound: 'Càlid, rítmic i "arrelat", amb un baix que "camina" sota la melodia.',
    examples: [
      { over: 'G major', play: 'Alterna el baix (G i D) amb el polze mentre els dits toquen la melodia a les cordes altes.', result: 'Un patró de baix alternat amb melodia a sobre.' },
      { over: 'C major', play: 'Toca un patró de baix alternat (C i G) amb acords als dits.', result: 'Un acompanyament complet que sona com dos guitarristes.' },
      { over: 'D major', play: 'Afegeix una melodia simple als dits sobre el baix alternat.', result: 'Una peça solista amb baix i melodia alhora.' },
      { over: 'A major', play: 'Combina el patró de Travis amb un canvi d\'acord a cada compàs.', result: 'Un acompanyament fluid que acompanya una cançó sencera.' }
    ],
    artists: ['Merle Travis', 'Chet Atkins', 'Jerry Reed'],
    difficulty: 'intermediate'
  },
  {
    id: 'crosspicking',
    name: 'Crosspicking',
    category: 'picking',
    description: 'Tècnica de plectre que creua les cordes en patrons repetitius per arpegiar acords amb un flux continu, típica del bluegrass i el country.',
    chordContext: 'Acords majors i dominants sobre progressions ràpides de bluegrass.',
    application: 'Acompanyament i solos amb arpegis ràpids; dona un so "brillant" i enèrgic.',
    sound: 'Ràpid, brillant i "arpegiat", amb un flux constant de notes.',
    examples: [
      { over: 'G major', play: 'Arpegia l\'acord de G creuant les cordes en un patró de 3 notes.', result: 'Un arpegi ràpid i brillant que "brilla" sobre l\'acord.' },
      { over: 'C major', play: 'Fes un crosspicking de 6 notes sobre l\'acord de C.', result: 'Un flux continu d\'arpegis que omple l\'espai.' },
      { over: 'D major', play: 'Alterna arpegis de D i G en un patró de crosspicking.', result: 'Un moviment harmònic ràpid entre acords.' },
      { over: 'A major', play: 'Combina crosspicking amb una nota pedal a la corda baixa.', result: 'Un arpegi amb base estable, molt bluegrass.' }
    ],
    artists: ['Albert Lee', 'Jerry Reed', 'Chet Atkins'],
    difficulty: 'advanced'
  },
  {
    id: 'open-string-licks',
    name: 'Open-String Licks',
    category: 'techniques',
    description: 'Fraseig que aprofita les cordes a l\'aire per crear sons brillants i "oberts", sovint combinant notes trastejades amb cordes obertes.',
    chordContext: 'Tonalitats obertes com G, D, A i E, on les cordes a l\'aire ressonen naturalment.',
    application: 'Fills i solos amb so brillant; dona un caràcter "country" inconfusible.',
    sound: 'Brillant, obert i ressonant, amb un timbre "airejat".',
    examples: [
      { over: 'G major', play: 'Toca la nota G (3a corda, traste 0) i llisca cap a la nota B (2a corda, traste 0).', result: 'Un fill obert i brillant que ressona sobre l\'acord.' },
      { over: 'D major', play: 'Combina la corda D a l\'aire amb notes trastejades a la 2a corda.', result: 'Un passatge amb cordes obertes que "brilla".' },
      { over: 'A major', play: 'Fes un lick amb la corda E a l\'aire i notes de l\'escala d\'A.', result: 'Un fill obert i enèrgic, molt country.' },
      { over: 'E major', play: 'Alterna cordes obertes i trastejades en una frase ràpida.', result: 'Un lick ràpid amb ressonància oberta.' }
    ],
    artists: ['Don Rich', 'James Burton', 'Brad Paisley'],
    difficulty: 'beginner'
  },
  {
    id: 'string-bending',
    name: 'String Bending',
    category: 'bending',
    description: 'Tècnica de doblegar la corda per pujar el to, creant tensió i expressió; essencial per al so "plorós" del country.',
    chordContext: 'Acords majors i dominants; els bends es fan sobre notes de l\'escala.',
    application: 'Solos i frases expressives; dona tensió i "veu" a les notes.',
    sound: 'Tens, expressiu i "cantable", amb un to que puja i baixa.',
    examples: [
      { over: 'G major', play: 'Pica la nota B (2a corda, traste 3) i fes un bend de to sencer fins a C#.', result: 'Un bend de to que puja la nota amb tensió.' },
      { over: 'C major', play: 'Fes un bend de mig to a la 2a corda i torna a baixar.', result: 'Un bend subtil que "canta" sobre l\'acord.' },
      { over: 'D major', play: 'Pica la nota E (1a corda, traste 12) i fes un bend de to sencer.', result: 'Un bend alt i brillant, molt expressiu.' },
      { over: 'A major', play: 'Combina un bend amb un vibrato per sostenir la nota.', result: 'Una nota sostinguda amb vibrato i tensió.' }
    ],
    artists: ['Brad Paisley', 'Redd Volkaert', 'Brent Mason'],
    difficulty: 'beginner'
  },
  {
    id: 'palm-muting',
    name: 'Palm Muting',
    category: 'techniques',
    description: 'Tècnica de mutar les cordes amb la palma de la mà de la corda per crear un so sec i percussiu, típic del country rock i el rockabilly.',
    chordContext: 'Acords majors i dominants sobre ritmes de country rock i rockabilly.',
    application: 'Ritmes i fills amb atac sec; dona un so "trencat" i enèrgic.',
    sound: 'Sec, percussiu i "trencat", amb un atac molt definit.',
    examples: [
      { over: 'G major', play: 'Muta les cordes amb la palma i pica acords de G en semicorxeres.', result: 'Un ritme sec i percussiu, molt rockabilly.' },
      { over: 'C major', play: 'Alterna acords mutats i oberts en un patró rítmic.', result: 'Un contrast entre so sec i so obert.' },
      { over: 'D major', play: 'Fes un fill mutat amb notes individuals sobre l\'acord de D.', result: 'Un fill sec i "cliquejant".' },
      { over: 'A major', play: 'Combina palm muting amb un ritme de country rock.', result: 'Un ritme enèrgic i percussiu.' }
    ],
    artists: ['James Burton', 'Danny Gatton', 'Don Rich'],
    difficulty: 'beginner'
  },
  {
    id: 'flatpicking',
    name: 'Flatpicking',
    category: 'picking',
    description: 'Tècnica de plectre amb atacs alternats i ràpids, típica del bluegrass, per tocar melodies i solos amb gran velocitat i precisió.',
    chordContext: 'Acords majors i dominants sobre progressions ràpides de bluegrass.',
    application: 'Solos i melodies ràpides; dona un so "brillant" i enèrgic.',
    sound: 'Ràpid, brillant i precís, amb atacs alternats molt definits.',
    examples: [
      { over: 'G major', play: 'Toca una escala de G major en semicorxeres amb plectre alternat.', result: 'Una escala ràpida i brillant, molt bluegrass.' },
      { over: 'C major', play: 'Fes un arpegi de C major amb atacs alternats.', result: 'Un arpegi ràpid i precís.' },
      { over: 'D major', play: 'Toca una melodia de bluegrass sobre l\'acord de D.', result: 'Una melodia ràpida i enèrgica.' },
      { over: 'A major', play: 'Combina escales i arpegis en un solo de flatpicking.', result: 'Un solo ràpid i brillant, molt bluegrass.' }
    ],
    artists: ['Albert Lee', 'Jerry Reed', 'Don Rich'],
    difficulty: 'intermediate'
  },
  {
    id: 'fingerpicking',
    name: 'Fingerpicking',
    category: 'picking',
    description: 'Tècnica de tocar amb els dits (sense plectre) per crear textures riques amb baix, acord i melodia simultàniament.',
    chordContext: 'Acords majors, menors i setenes sobre progressions de country clàssic i folk.',
    application: 'Acompanyament solista i peces instrumentals; dona un so càlid i íntim.',
    sound: 'Càlid, íntim i "arrelat", amb una textura rica i completa.',
    examples: [
      { over: 'G major', play: 'Toca un patró de fingerpicking amb baix i acord sobre G.', result: 'Un acompanyament càlid i complet.' },
      { over: 'C major', play: 'Afegeix una melodia als dits sobre el baix de C.', result: 'Una peça solista amb baix i melodia.' },
      { over: 'D major', play: 'Fes un patró de fingerpicking amb canvis d\'acord.', result: 'Un acompanyament fluid que acompanya una cançó.' },
      { over: 'A major', play: 'Combina fingerpicking amb un arpegi de A major.', result: 'Un arpegi càlid i expressiu.' }
    ],
    artists: ['Chet Atkins', 'Merle Travis', 'Jerry Reed'],
    difficulty: 'intermediate'
  }
];

export interface CountryPracticeRoutine {
  title: string;
  description: string;
  steps: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export const countryPracticeRoutines: CountryPracticeRoutine[] = [
  {
    title: 'Chicken Pickin\' Basics',
    description: 'Rutina per dominar els pops i clicks del chicken pickin\', la base del so country de Nashville.',
    steps: [
      'Escalfa amb acords de G major i practica el pop a la 3a corda.',
      'Afegeix el click mutant la corda amb la mà de la corda.',
      'Alterna pops i clicks en semicorxeres sobre G.',
      'Practica fills de chicken pickin\' sobre una progressió I-IV-V.',
      'Grava\'t i escolta la precisió dels atacs.'
    ],
    duration: '15 min',
    level: 'advanced'
  },
  {
    title: 'Hybrid Picking',
    description: 'Rutina per combinar plectre i dits en arpegis i dobles cordes ràpids.',
    steps: [
      'Practica plectre + dit mig sobre una doble corda de G.',
      'Fes arpegis de C major alternant plectre i dits.',
      'Afegeix el dit anular per a intervals de tres notes.',
      'Practica seqüències de dobles cordes descendents.',
      'Aplica-ho a un solo sobre una progressió country.'
    ],
    duration: '20 min',
    level: 'advanced'
  },
  {
    title: 'Banjo Rolls',
    description: 'Rutina per crear flux continu de notes inspirat en el banjo de 5 cordes.',
    steps: [
      'Practica un patró de 8 notes sobre G major.',
      'Augmenta la velocitat amb plectre alternat.',
      'Fes rolls de 16 notes sobre C major.',
      'Afegeix una nota pedal de G a la corda baixa.',
      'Combina rolls amb canvis d\'acord.'
    ],
    duration: '15 min',
    level: 'intermediate'
  },
  {
    title: 'Pedal Steel Bends',
    description: 'Rutina per dominar els bends lents i el vibrato que imiten el pedal steel guitar.',
    steps: [
      'Practica bends lents de to sencer a la 2a corda.',
      'Afegeix vibrato a les notes sostingudes.',
      'Fes bends de to sencer a la 1a corda (traste 12).',
      'Combina bends amb slides cap avall.',
      'Aplica-ho a una balada country lenta.'
    ],
    duration: '15 min',
    level: 'intermediate'
  },
  {
    title: 'Travis Picking',
    description: 'Rutina per dominar el patró de fingerpicking amb baix alternat i melodia.',
    steps: [
      'Practica el baix alternat (G i D) amb el polze.',
      'Afegeix acords als dits sobre el baix.',
      'Incorpora una melodia simple als dits.',
      'Practica canvis d\'acord amb el patró de Travis.',
      'Toca una cançó sencera amb acompanyament solista.'
    ],
    duration: '20 min',
    level: 'intermediate'
  },
  {
    title: 'Double Stops',
    description: 'Rutina per tocar intervals de tercera i sisena en paral·lel, el so harmònic del country.',
    steps: [
      'Practica dobles cordes de tercera sobre G major.',
      'Mou-te en paral·lel per l\'escala de C.',
      'Fes dobles cordes de sisena sobre D major.',
      'Combina dobles cordes en una frase melòdica.',
      'Aplica-ho a un solo amb harmonia.'
    ],
    duration: '15 min',
    level: 'intermediate'
  }
];

export interface CountryArtistApproach {
  artist: string;
  characteristics: string[];
  keyTechniques: string[];
}

export const countryArtistApproaches: CountryArtistApproach[] = [
  {
    artist: 'Brent Mason',
    characteristics: [
      'El guitarrista de sessió més influent de Nashville, amb un so modern i precís.',
      'Ús extensiu del chicken pickin\' i el hybrid picking en solos ràpids.',
      'Gran control del to i dels atacs, amb un so net i articulat.'
    ],
    keyTechniques: ['Chicken Pickin\'', 'Hybrid Picking', 'Pedal Steel Bends', 'String Bending']
  },
  {
    artist: 'Albert Lee',
    characteristics: [
      'Pioner del country rock i el flatpicking ràpid.',
      'Velocitat extrema amb plectre alternat i arpegis brillants.',
      'Estil enèrgic i "brillant", molt influent en el country modern.'
    ],
    keyTechniques: ['Flatpicking', 'Crosspicking', 'Hybrid Picking', 'Double Stops']
  },
  {
    artist: 'Brad Paisley',
    characteristics: [
      'Guitarrista modern amb un so "plorós" i expressiu.',
      'Mestratge dels pedal steel bends i el vibrato.',
      'Combina tècnica clàssica amb un fraseig melòdic i cantable.'
    ],
    keyTechniques: ['Pedal Steel Bends', 'Chicken Pickin\'', 'String Bending', 'Open-String Licks']
  },
  {
    artist: 'Danny Gatton',
    characteristics: [
      'El "teletubby" del country, amb un so brut i versàtil.',
      'Mestratge del hybrid picking i el palm muting.',
      'Barreja country, rockabilly i jazz amb gran virtuosisme.'
    ],
    keyTechniques: ['Hybrid Picking', 'Palm Muting', 'String Bending', 'Double Stops']
  },
  {
    artist: 'Jerry Reed',
    characteristics: [
      'Guitarrista i compositor amb un estil percussiu i rítmic.',
      'Ús extensiu dels banjo rolls i el fingerpicking.',
      'So "rodant" i enèrgic, molt influent en el country clàssic.'
    ],
    keyTechniques: ['Banjo Rolls', 'Fingerpicking', 'Crosspicking', 'Travis Picking']
  },
  {
    artist: 'Chet Atkins',
    characteristics: [
      'El "Mr. Guitar", pioner del fingerpicking i el country clàssic.',
      'Estil càlid i íntim, amb un so "arrelat" i complet.',
      'Mestratge del Travis picking i el fingerpicking solista.'
    ],
    keyTechniques: ['Fingerpicking', 'Travis Picking', 'Banjo Rolls', 'Crosspicking']
  }
];
