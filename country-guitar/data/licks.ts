export interface CountryLick {
  id: string;
  name: string;
  category: 'chicken-pickin' | 'hybrid-picking' | 'banjo-roll' | 'double-stop' | 'bend' | 'open-string' | 'travis-picking' | 'crosspicking' | 'flatpicking' | 'fingerpicking';
  description: string;
  tab: string;
  key: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  artists: string[];
  tips: string[];
}

export const licks: CountryLick[] = [
  {
    id: 'chicken-pickin-roll',
    name: 'Chicken Pickin\' Roll en G',
    category: 'chicken-pickin',
    description: 'El típic roll de quinta palm-mute sobre les cordes B i G, amb la nota alta que rellisca avall fins a la tònica. És la base del so sec i saltironat de Brent Mason: cinquena que balla cap a la resolució amb atac de pua sec.',
    tab: `e|-----------------------------------8-|
B|--8-8-8-8-8-8-8-8-8-8-8-8-8-8-8-8---|
G|--7-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7---|
D|------------------------------------|
A|------------------------------------|
E|------------------------------------|`,
    key: 'G',
    difficulty: 'advanced',
    artists: ['Brent Mason', 'Brad Paisley', 'Johnny Hiland'],
    tips: [
      'B(8) i G(7) són la quintena (D-G); deixa que sonin juntes sota palm mute lleuger, només per esmorteir.',
      'Alterna pua estricta (D U D U) a 16ens; la velocitat surt del canell, no del braç.',
      'Acaba en la G aguda (E, 8è traste) per resoldre a la tònica amb un "pop" de pua.'
    ]
  },
  {
    id: 'banjo-roll-en-g',
    name: 'Banjo Roll en G',
    category: 'banjo-roll',
    description: 'Adaptació del forward roll del banjo de 5 cordes a la guitarra: el baix alterna tònica i quinta a la corda D mentre el discant desfila 3-2-1, recordant la corda aguda del banjo. La repetició en travessa de cordes ÉS el roll, no farcit.',
    tab: `e|-------------------------------3-3-3--|
B|-----------------3----3----3----3-3-3--|
G|-----------2----2----2----2-----------|
D|---0-5---0-5---0-5---0-5---0-5--------|
A|-3---------3----3----3----3-----------|
E|--------------------------------------|`,
    key: 'G',
    difficulty: 'intermediate',
    artists: ['Don Rich', 'Albert Lee', 'Redd Volkaert'],
    tips: [
      'El polze marca constant (0-5 / 3) al baix; els dits fan la travessa de cordes agudes com si fos el banjo.',
      'Pica amb pua alternada estricta i deixa ressonar les cordes a l\'aire per l\'efecte dron.',
      'El D(5ta) sota el G(0) crea la quinta; mantén-lo estable mentre el discant es mou.'
    ]
  },
  {
    id: 'double-stop-shuffle',
    name: 'Double Stop Shuffle',
    category: 'double-stop',
    description: 'Shuffle amb dobles terceres i sisenes sobre C-G: la parella de notes puja i baixa per graus amb swing llarga-curta, com el so ple i ballable del country de Nashville. Cada doble parada és una tercera que sona contra el baix.',
    tab: `e|-----------8----------------7--------|
B|--------8-----8----------7-----7-----|
G|------7-----------7----8---------8---|
D|---10-----------10---9---------------|
A|------------------------------------|
E|------------------------------------|`,
    key: 'C',
    difficulty: 'intermediate',
    artists: ['Chet Atkins', 'James Burton', 'Don Rich'],
    tips: [
      'Toca les parelles amb un moviment de canell únic i swing llarga-curta (l\'estàndard del shufflle honky-tonk).',
      'La primera doble parada (D10/G7 o G8/B8) és la tercera i quinta de C; la segona resolt sobre el G.',
      'Mantén els dos dits a la mateixa forma mentre canvieu de traste per no trencar el doble.'
    ]
  },
  {
    id: 'pedal-steel-bend',
    name: 'Pedal Steel Bend',
    category: 'bend',
    description: 'Bend d\'un to sostingut que imita el lliscament del pedal steel, amb vibrato ample mentre sona. La nota de destí (F# sobre E) és la tercera major, la nota country per excel·lència: s\'hi arriba lliscant des de la segona (E) amb control.',
    tab: `e|--7b9--------7b9--------7b9-----7~|
B|---------------------------------|
G|---------------------------------|
D|---------------------------------|
A|---------------------------------|
E|---------------------------------|`,
    key: 'E',
    difficulty: 'intermediate',
    artists: ['Albert Lee', 'Redd Volkaert', 'Danny Gatton'],
    tips: [
      'El bend de B(7 a 9) puja amb el canell girant-lo, no amb la força del dit; el dit índex reforça el mig.',
      'Mantén el vibrato AMB bend actiu movent tot el canell sense rebaixar la nota.',
      'El to s\'aconsegueix pujant fins que soni exactament com el F# pisat (cordes D/E); comprova-ho amb la nota real.'
    ]
  },
  {
    id: 'open-string-g-lick',
    name: 'Open String G Lick',
    category: 'open-string',
    description: 'Lick que aprofita el dron de la corda G a l\'aire sota una frase de B i E, amb final a la tònica. La corda lliure ressona de fons i dona el so brillant i obert del country clàssic; la melodia puja i torna a caure a la G.',
    tab: `e|---------------------------------------|
B|-----3--0-----3--0-----3--0-----3--0---|
G|--0--------0--------0--------0---------|
D|---------------------------------------|
A|-----------------------------4--2--3---|
E|---------------------------------------|`,
    key: 'G',
    difficulty: 'beginner',
    artists: ['Don Rich', 'Chet Atkins', 'James Burton'],
    tips: [
      'La G a l\'aire (corda 3) drona sota les notes de la B; deixa-la ressonar, no l\'apaguis.',
      'Alterna pua i dit perquè la frase flueixi com un cant.',
      'Acaba a D(4) C(2) G(3) a la corda A per resoldre clarament a la tònica.'
    ]
  },
  {
    id: 'travis-picking-pattern',
    name: 'Travis Picking Pattern',
    category: 'travis-picking',
    description: 'El patró de Travis de veritat: el polze alterna constantment entre la tònica i la quinta (E i A) mentre el dit mig i l\'índex toquen la melodia a les cordes agudes. Tota la gràcia és el baix alternat que NO para mai.',
    tab: `e|-----------------------------|
B|--3--3--3--3--3--3--3--3--3--|
G|--0-----0-----0-----0-----0--|
D|-----------------------------|
A|--5-----5-----5-----5-----5--|
E|--3-----3-----3-----3-----3--|`,
    key: 'G',
    difficulty: 'intermediate',
    artists: ['Merle Travis', 'Chet Atkins', 'Jerry Reed'],
    tips: [
      'El polze ALTERNA sempre Tònica (E-3) amb Quinta (A-5); no el deixis clavat a una sola corda o no és Travis.',
      'L\'índex toca el G(0) i el mig el D(3, corda B) de manera independent del polze.',
      'Comença només amb el baix alternant E-3 / A-5 fins a interioritzar-lo, després afegeix els dits.'
    ]
  },
  {
    id: 'crosspicking-arpeggio',
    name: 'Crosspicking Arpeggio',
    category: 'crosspicking',
    description: 'Arpegi de G amb patró de pua creuat (D-U-D-M o D-U-D) sobre tres cordes, com el roll de banjo però amb pua plana. El canvi de corda és constant i el moviment del canell fa el "flaix" dens característic del bluegrass.',
    tab: `e|-----------------------------5--7--8--7--5--|
B|------------------3--5--7--8-----------------|
G|-------0--2--4--5----------------------------|
D|----0--5-------------------------------------|
A|---------------------------------------------|
E|---------------------------------------------|`,
    key: 'G',
    difficulty: 'advanced',
    artists: ['Don Rich', 'Albert Lee', 'Johnny Hiland'],
    tips: [
      'Pica amb patró creuat constant (D-U-D-U) i deixa que la pua "reboti" d\'una corda a l\'altra.',
      'És un arpegi de G amb la sètima (F#) de pas cap al D i de tornada a la tònica.',
      'Practica cada travessa de corda aïllada abans d\'unir les tres; la velocitat ve de la regularitat del canell.'
    ]
  },
  {
    id: 'flatpicking-g-run',
    name: 'Flatpicking G-Run',
    category: 'flatpicking',
    description: 'La baixada de G per graus que connecta acords: de la sètima (F#) baixant cromàtic fins a la tònica amb pua alternada. És el "turnaround" essencial del bluegrass, i cada grau toca el corresponent de l\'acord de destí.',
    tab: `e|----------------------------3--5--7--8--7--|
B|----------------------3--6-----------------|
G|--------------0--2--5----------------------|
D|--------0--2--4----------------------------|
A|--0--3--5----------------------------------|
E|-------------------------------------------|`,
    key: 'G',
    difficulty: 'intermediate',
    artists: ['Don Rich', 'Redd Volkaert', 'Albert Lee'],
    tips: [
      'Pica alternada estricta i deixa que les notes s\'encadenin com un roll, sense picar-les marcades aïllades.',
      'El D(5è, corda A) és la quinta; el C(3è) la quarta; el B(2è) la tercera — els graus de l\'acord de G.',
      'Pratca la baixada i la tornada per separat fins que el canvi de corda sigui invisible.'
    ]
  },
  {
    id: 'hybrid-picking-arpeggio',
    name: 'Hybrid Picking Arpeggio',
    category: 'hybrid-picking',
    description: 'Arpegi de G amb hybrid picking: la pua ataca les cordes greus i els dits (índex, mig, anular) les agudes, permetent salts grans entre cordes sense moure massa la mà. És el so tècnic i nítid del country modern de Brent Mason.',
    tab: `e|--------------------------15--17--12--15--|
B|-----------------12--15--------------------|
G|--------10--12-----------------------------|
D|-------12----------------------------------|
A|--10--12----------------------------------|
E|-------------------------------------------|`,
    key: 'G',
    difficulty: 'advanced',
    artists: ['Brent Mason', 'Brad Paisley', 'Johnny Hiland'],
    tips: [
      'Pua per les cordes greus (A, D) i dit índex/mig/anular per les agudes; el canvi de corda és immediat.',
      'És un arpegi de G major que salta octaves: G-D-G-B-G-D-G-E-D.',
      'Mantén la mà quieta i fes els salts amb els DITS, no amb el canell, per anar ràpid i net.'
    ]
  },
  {
    id: 'string-bend-release',
    name: 'String Bend + Release',
    category: 'bend',
    description: 'Bend i alliberament amb un to per sota: puja a la tercera des de la segona i torna a caure, creant un so vocal i expressiu. El "release" és el gest més cantable del country; el bend arriba net i la tornada és controlada.',
    tab: `e|--7b9-7b9--9---9b11-9---9b11-9---9b11--|
B|-----------------------------------------|
G|-----------------------------------------|
D|-----------------------------------------|
A|-----------------------------------------|
E|-----------------------------------------|`,
    key: 'E',
    difficulty: 'intermediate',
    artists: ['Danny Gatton', 'Albert Lee', 'Redd Volkaert'],
    tips: [
      'Puja el bend amb el canell i TORNA a baixar amb el mateix dit sense soltar la corda.',
      'Controla la velocitat del release — la baixada lenta és el que sona com a cant; la ràpida com a slap.',
      'Vibra lleugerament al cim del bend (9b11) abans d\'alliberar.'
    ]
  },
  {
    id: 'palm-mute-chicken-pickin',
    name: 'Palm Mute Chicken Pickin\'',
    category: 'chicken-pickin',
    description: 'Chicken pickin\' amb atac de pua accentuat i escapada a la corda a l\'aire: la nota "click" del palm mute seguida d\'una nota oberta que ressona. És la seqüència seca-pop que defineix el so de Brad Paisley.',
    tab: `e|------------------------------------|
B|--------------8----------8----------|
G|--7pm--7pm--7----7pm--7----7pm--7---|
D|--7pm--7pm--7----7pm--7----7pm--7---|
A|------------------------------------|
E|------------------------------------|`,
    key: 'G',
    difficulty: 'advanced',
    artists: ['Brent Mason', 'Brad Paisley', 'Johnny Hiland'],
    tips: [
      'El palm mute ha de ser lleuger (esmorteir, no silenciar) i cada nota atacada amb un "pop" de pua.',
      'Alterna 7pm amb les notes obertes a l\'aire perquè el so "pup" i ressoni.',
      'El D(7) doblat a les cordes G i D dona la quinta; la nota oberta següent és la que sona neta.'
    ]
  },
  {
    id: 'fingerpicking-pattern',
    name: 'Fingerpicking Pattern',
    category: 'fingerpicking',
    description: 'Patró de fingerpicking amb el baix independent: el polze toca tònica-quinta (E i A) mentre l\'índex i el mig fan la melodia als aguts, tots tres en moviment constant. És l\'estil Chet Atkins: el baix no sembla parar mai.',
    tab: `e|--3--------------------3-----------|
B|--0--3--0--3--0--3--0--3-----------|
G|--0-----0-----0-----0--------------|
D|-----------------------------------|
A|--5-----5-----5-----5-------------|
E|--3-----3-----3-----3-------------|`,
    key: 'G',
    difficulty: 'beginner',
    artists: ['Chet Atkins', 'Merle Travis', 'Jerry Reed'],
    tips: [
      'L\'índex toca el G(0), el mig alterna E(3) i D(3, corda B), i el polze alterna E-3 / A-5.',
      'Mantén el ritme del polze absolutament constant, com un metrònom, perquè suporti tota la melodia.',
      'Practica lentíssim i augmenta la velocitat només quan el polze no tingui ni una pausa.'
    ]
  },
  {
    id: 'double-stop-slide',
    name: 'Double Stop Slide',
    category: 'double-stop',
    description: 'Dobles terceres que llisquen avall i pugen resoltant sobre l\'acord, amb el so suau del western swing de Don Rich. La doble parada sona primer sobre el marge alt i llisca fins al traste de destí, expressiu i net.',
    tab: `e|-----------------8--7--------|
B|-----------8--10--8--7--10----|
G|--------7--7-----------------|
D|-----10--9-------------------|
A|-----------------------------|
E|-----------------------------|`,
    key: 'C',
    difficulty: 'intermediate',
    artists: ['Don Rich', 'Chet Atkins', 'James Burton'],
    tips: [
      'Llisca les dues cordes JUNTES amb la mateixa pressió per no trencar la tercera.',
      'La doble parada de C (D10/G7/E8/B8) és tercera i quinta; la segona (D9/G7/E8/B10) resolt sobre el G.',
      'Afegeix un vibrato suau just abans d\'arribar al traste de destí.'
    ]
  },
  {
    id: 'open-e-lick',
    name: 'Open E Lick',
    category: 'open-string',
    description: 'Lick rockabilly/country sobre el dron de la corda E a l\'aire: la melodia puja per la corda B i el dron ressona de fons, creant l\'efecte de pedal steel obert. La segona i la tercera es resolen contra el dron greu.',
    tab: `e|---------------------------------|
B|--2--4--2--0----------------------|
G|-----------------1--0-------------|
D|----------------------------------|
A|----------------------------------|
E|--0--0--0--0---0--0--0--0--------|`,
    key: 'E',
    difficulty: 'beginner',
    artists: ['James Burton', 'Don Rich', 'Danny Gatton'],
    tips: [
      'El dron de la corda E a l\'aire sona sempre de fons; no l\'apaguis mentre toques el B(2) i F#(4).',
      'Alterna pua i dit i deixa que les notes agudes ressonin contra el baix obert.',
      'És la tercera (G#, corda G 1) i segona (F#, corda G 2) que es resolen sobre el dron greu.'
    ]
  },
  {
    id: 'bluegrass-g-run',
    name: 'Bluegrass G-Run (Amunt)',
    category: 'flatpicking',
    description: 'La pujada de G cromàtica i per graus que connecta dos acords a l\'inrevés: puja des de la tònica fins a la tercera passant per la segona, per la quinta i per la sètima. Complement del G-Run avall, tots dos indispensables al turnaround.',
    tab: `e|----------------------------7--8--7--|
B|----------------------5--7--8---------|
G|--------------0--2--4--5--------------|
D|--------0--2--3-----------------------|
A|--0--3--5-----------------------------|
E|---------------------------------------|`,
    key: 'G',
    difficulty: 'intermediate',
    artists: ['Don Rich', 'Redd Volkaert', 'Albert Lee'],
    tips: [
      'Pica alternada estricta; el roll ha de sonar encadenat, no amb notes marcades.',
      'El G(0), A(2), B(3), C(3), D(5), E(4/5) — els graus naturals de G major en pujada.',
      'Pratca el G-Run avall (l\'altre lick) i aquest pujant per dominar el turnaround complet.'
    ]
  },
  {
    id: 'honky-tonk-turnaround',
    name: 'Honky-Tonk Turnaround',
    category: 'double-stop',
    description: 'El turnaround honky-tonk per excel·lència: dobles parades en terceres i sisenes que cauen cap a la tònica amb swing. Cada parella sona la tercera o sisena del grau, creant la tensió que torna a l\'acord inicial, el cor del country clàssic.',
    tab: `e|-----------10--8--------------|
B|--------8-----10--8-----------|
G|-----7-----------10--9-------|
D|--10------------------10--7--|
A|-----------------------------|
E|-----------------------------|`,
    key: 'C',
    difficulty: 'intermediate',
    artists: ['Chet Atkins', 'Merle Travis', 'James Burton'],
    tips: [
      'Les dobles parades amb swing llarga-curta; la tensió ve de la sisena (E-B) que resolt avall a la tercera.',
      'Cada parella és tercera i quinta d\'un grau: C (D10/G7), G (D9/G7), C alt (E10/G7).',
      'Mantén la mateixa digitació de doble parada en baixar perquè el turnaround fluïxi sense reiniciar.'
    ]
  },
  {
    id: 'western-swing-lick',
    name: 'Western Swing Lick',
    category: 'hybrid-picking',
    description: 'Lick de western swing amb arpegis híbrids que salten octaves amb pua i dits, elegant i ballable. Cada salt aprofita la pua per les greus i els dits per les agudes, perquè el swing flueixi sense moure la mà.',
    tab: `e|---------------12----------12-------------------8--|
B|--------10------------8-10------------8-10-------10--|
G|-----10------10-----9-------12----10------10---9-----|
D|--12--------------------------------------------------|
A|------------------------------------12---------------|
E|---------------------8--------------------------------|`,
    key: 'G',
    difficulty: 'expert',
    artists: ['Redd Volkaert', 'Albert Lee', 'Danny Gatton'],
    tips: [
      'Pua per D(12) i A(10/8), dits per les agudes; els salts d\'octava surten canviant de "tècnica" no de mà.',
      'És un arpegi de G amb la sètima (F#) que fa passar la melodia entre registres.',
      'Pratca els arpegis per separat (G, D, G a l\'octava) abans de lligar-los en el swing.'
    ]
  },
  {
    id: 'country-blues-bend',
    name: 'Country Blues Bend',
    category: 'bend',
    description: 'Bend de blues amb resolució country: puja a la tercera menor (G) i es resol avall a la segona, amb el vibrato vocal de Danny Gatton. La nota "girant" sobre la progressió de E crea la tensió bluesy que el country ha agafat prestada.',
    tab: `e|--7b9-7b9--7r--9b11-9-9b11-9--9b11-9-----------|
B|---------------------------------------------------|
G|---------------------------------------------------|
D|---------------------------------------------------|
A|---------------------------------------------------|
E|---------------------------------------------------|`,
    key: 'E',
    difficulty: 'intermediate',
    artists: ['Danny Gatton', 'Albert Lee', 'Redd Volkaert'],
    tips: [
      'El bend a la tercera menor de E (G, 7b9) és el so blues; la resolució avall a la segona (F#, 7) és el gest country.',
      'Puja lent, vibra al cim i resol controladament; la velocitat de la resolució fa el caràcter.',
      'Comprova els bends contra les notes reals (cordes B/E) perquè quedin afinats.'
    ]
  }
];
