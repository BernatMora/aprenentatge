export type Progression = {
  id: string;
  name: string;
  chords: string[];
  description: string;
  suggestions: {
    chord: string;
    pentatonics: string[];
    triads: string[];
  }[];
};

export const progressions: Progression[] = [
  {
    id: "country-i-iv-v",
    name: "Country I-IV-V",
    chords: ["G", "C", "D"],
    description:
      "La progressió més fonamental del country. Tres acords majors que ho sustenten gairebé tot, des de Hank Williams fins al country modern. Perfecta per practicar canvis nets i ritmes de boom-chicka.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
    ],
  },
  {
    id: "country-i-v-vi-iv",
    name: "Country I-V-vi-IV",
    chords: ["G", "D", "Em", "C"],
    description:
      "La progressió pop-country per excel·lència, present en centenars d'èxits moderns. El moviment de baix descendent i l'alternança major-menor li donen un caràcter emotiu i cantable.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
      {
        chord: "Em",
        pentatonics: ["E menor pentatònica", "G major pentatònica"],
        triads: ["Em (E-G-B)", "G major (G-B-D)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
    ],
  },
  {
    id: "bluegrass-g-run",
    name: "Bluegrass G-run",
    chords: ["G", "C", "G", "D"],
    description:
      "El patró clàssic del bluegrass amb el famós 'G-run' de baix. La tornada a G des de C i la resolució a D creen el moviment característic de la música de muntanya.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
    ],
  },
  {
    id: "honky-tonk-i-vi-iv-v",
    name: "Honky-tonk I-vi-IV-V",
    chords: ["C", "Am", "F", "G"],
    description:
      "La progressió dels bars i les jukeboxes. El I-vi-IV-V és el cor del honky-tonk i del rock and roll primigeni, amb un moviment de baix descendent irresistible.",
    suggestions: [
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "Am",
        pentatonics: ["A menor pentatònica", "C major pentatònica"],
        triads: ["Am (A-C-E)", "C major (C-E-G)"],
      },
      {
        chord: "F",
        pentatonics: ["F major pentatònica", "D menor pentatònica"],
        triads: ["F major (F-A-C)", "Dm (D-F-A)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "country-ii-v-i",
    name: "Country ii-V-I",
    chords: ["Am7", "D7", "G"],
    description:
      "La cadència jazzística aplicada al country. El ii-V-I afegeix tensió i resolució, i és la base de molts solos i intros de country sofisticat i western swing.",
    suggestions: [
      {
        chord: "Am7",
        pentatonics: ["A menor pentatònica", "C major pentatònica"],
        triads: ["Am (A-C-E)", "C major (C-E-G)"],
      },
      {
        chord: "D7",
        pentatonics: ["D mixolidi / D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "F#m (F#-A-C#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "western-swing",
    name: "Western swing",
    chords: ["G", "E7", "A7", "D7"],
    description:
      "La progressió de turnaround del western swing, plena d'acords de setena que donen moviment i swing. Bob Wills i els Texas Playboys la van fer immortal.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "E7",
        pentatonics: ["E mixolidi / E major pentatònica", "C# menor pentatònica"],
        triads: ["E major (E-G#-B)", "G#m (G#-B-D#)"],
      },
      {
        chord: "A7",
        pentatonics: ["A mixolidi / A major pentatònica", "F# menor pentatònica"],
        triads: ["A major (A-C#-E)", "F#m (F#-A-C#)"],
      },
      {
        chord: "D7",
        pentatonics: ["D mixolidi / D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "F#m (F#-A-C#)"],
      },
    ],
  },
  {
    id: "country-ballad",
    name: "Country ballad",
    chords: ["G", "Em", "C", "D"],
    description:
      "La progressió de balada country per excel·lència. El moviment de baix descendent G-Em-C-D crea una sensació nostàlgica i emotiva, ideal per a cançons lentes.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "Em",
        pentatonics: ["E menor pentatònica", "G major pentatònica"],
        triads: ["Em (E-G-B)", "G major (G-B-D)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
    ],
  },
  {
    id: "bluegrass-breakdown",
    name: "Bluegrass breakdown",
    chords: ["G", "C", "G", "D", "G"],
    description:
      "El patró instrumental del breakdown, el cor del bluegrass ràpid. La repetició de G amb la volta a C i D crea el marc perfecte per a solos de banjo i mandolina.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "country-rock",
    name: "Country rock",
    chords: ["E", "A", "B"],
    description:
      "La progressió de tres acords del country rock, popularitzada per bandes com els Eagles i Lynyrd Skynyrd. El so obert i elèctric de E-A-B és inconfusible.",
    suggestions: [
      {
        chord: "E",
        pentatonics: ["E major pentatònica", "C# menor pentatònica"],
        triads: ["E major (E-G#-B)", "C#m (C#-E-G#)"],
      },
      {
        chord: "A",
        pentatonics: ["A major pentatònica", "F# menor pentatònica"],
        triads: ["A major (A-C#-E)", "F#m (F#-A-C#)"],
      },
      {
        chord: "B",
        pentatonics: ["B major pentatònica", "G# menor pentatònica"],
        triads: ["B major (B-D#-F#)", "G#m (G#-B-D#)"],
      },
    ],
  },
  {
    id: "nashville-number-system",
    name: "Nashville number system",
    chords: ["1", "4", "5"],
    description:
      "El sistema de números de Nashville, la notació universal dels músics de sessió. Representa la progressió I-IV-V en qualsevol tonalitat, la base de tot el country.",
    suggestions: [
      {
        chord: "1",
        pentatonics: ["Tònica major pentatònica", "Relativa menor pentatònica"],
        triads: ["Tríada major (1-3-5)", "Tríada menor relativa (6-1-3)"],
      },
      {
        chord: "4",
        pentatonics: ["Subdominant major pentatònica", "Relativa menor pentatònica"],
        triads: ["Tríada major (4-6-1)", "Tríada menor relativa (2-4-6)"],
      },
      {
        chord: "5",
        pentatonics: ["Dominant major pentatònica", "Relativa menor pentatònica"],
        triads: ["Tríada major (5-7-2)", "Tríada menor relativa (3-5-7)"],
      },
    ],
  },
  {
    id: "country-shuffle",
    name: "Country shuffle",
    chords: ["G", "C", "G", "D", "G"],
    description:
      "El shuffle country amb el seu ritme de tresets característic. La progressió G-C-G-D-G és el vehicle perfecte per practicar el swing del country clàssic.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "bluegrass-waltz",
    name: "Bluegrass waltz",
    chords: ["G", "C", "G", "D", "G"],
    description:
      "La mateixa progressió bàsica però en compàs de 3/4, el vals bluegrass. El ritme de tres temps li dona un aire dolç i dansaire, típic de les balades de muntanya.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "country-minor",
    name: "Country minor",
    chords: ["Em", "C", "G", "D"],
    description:
      "La progressió menor del country, amb un to més fosc i melancòlic. El moviment Em-C-G-D és habitual en cançons de desamor i balades country modernes.",
    suggestions: [
      {
        chord: "Em",
        pentatonics: ["E menor pentatònica", "G major pentatònica"],
        triads: ["Em (E-G-B)", "G major (G-B-D)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
    ],
  },
  {
    id: "western-swing-ii-v",
    name: "Western swing ii-V",
    chords: ["Am7", "D7", "G"],
    description:
      "El ii-V-I del western swing, amb acords de setena que donen un aire jazzístic i elegant. És la progressió preferida per a intros i finals sofisticats.",
    suggestions: [
      {
        chord: "Am7",
        pentatonics: ["A menor pentatònica", "C major pentatònica"],
        triads: ["Am (A-C-E)", "C major (C-E-G)"],
      },
      {
        chord: "D7",
        pentatonics: ["D mixolidi / D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "F#m (F#-A-C#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "country-pop",
    name: "Country pop",
    chords: ["C", "G", "Am", "F"],
    description:
      "La progressió pop-country més utilitzada en els èxits de ràdio actuals. El C-G-Am-F és càlid, optimista i extremadament cantable, present en infinitat de cançons.",
    suggestions: [
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "Am",
        pentatonics: ["A menor pentatònica", "C major pentatònica"],
        triads: ["Am (A-C-E)", "C major (C-E-G)"],
      },
      {
        chord: "F",
        pentatonics: ["F major pentatònica", "D menor pentatònica"],
        triads: ["F major (F-A-C)", "Dm (D-F-A)"],
      },
    ],
  },
  {
    id: "bluegrass-modal",
    name: "Bluegrass modal",
    chords: ["G", "A", "G", "A"],
    description:
      "La progressió modal del bluegrass, basada en la tonalitat mixolídia. L'alternança G-A crea un so arcaic i hipnòtic, típic de les cançons de muntanya més antigues.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G mixolidi / G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "A",
        pentatonics: ["A mixolidi / A major pentatònica", "F# menor pentatònica"],
        triads: ["A major (A-C#-E)", "F#m (F#-A-C#)"],
      },
      {
        chord: "G",
        pentatonics: ["G mixolidi / G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "A",
        pentatonics: ["A mixolidi / A major pentatònica", "F# menor pentatònica"],
        triads: ["A major (A-C#-E)", "F#m (F#-A-C#)"],
      },
    ],
  },
  {
    id: "country-blues",
    name: "Country blues",
    chords: ["E", "A", "E", "B7"],
    description:
      "La progressió de blues country, amb la dominant B7 que crea tensió i resolució. És la base del blues de 12 compassos adaptat al so country i al rockabilly.",
    suggestions: [
      {
        chord: "E",
        pentatonics: ["E menor pentatònica", "E major pentatònica"],
        triads: ["E major (E-G#-B)", "E menor (E-G-B)"],
      },
      {
        chord: "A",
        pentatonics: ["A menor pentatònica", "A major pentatònica"],
        triads: ["A major (A-C#-E)", "A menor (A-C-E)"],
      },
      {
        chord: "E",
        pentatonics: ["E menor pentatònica", "E major pentatònica"],
        triads: ["E major (E-G#-B)", "E menor (E-G-B)"],
      },
      {
        chord: "B7",
        pentatonics: ["B mixolidi / B major pentatònica", "G# menor pentatònica"],
        triads: ["B major (B-D#-F#)", "G#m (G#-B-D#)"],
      },
    ],
  },
  {
    id: "honky-tonk-shuffle",
    name: "Honky-tonk shuffle",
    chords: ["C", "C7", "F", "G7"],
    description:
      "El shuffle honky-tonk amb acords de setena, el so dels bars de Texas i Oklahoma. La dominant C7 i G7 donen un caràcter gras i dansaire inconfusible.",
    suggestions: [
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "C7",
        pentatonics: ["C mixolidi / C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "F",
        pentatonics: ["F major pentatònica", "D menor pentatònica"],
        triads: ["F major (F-A-C)", "Dm (D-F-A)"],
      },
      {
        chord: "G7",
        pentatonics: ["G mixolidi / G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "country-gospel",
    name: "Country gospel",
    chords: ["G", "C", "G", "D", "G"],
    description:
      "La progressió gospel del country, plena de llum i esperança. El moviment G-C-G-D-G amb les seves resolucions obertes és el cor de la música gospel i del country espiritual.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "C",
        pentatonics: ["C major pentatònica", "A menor pentatònica"],
        triads: ["C major (C-E-G)", "Am (A-C-E)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "D",
        pentatonics: ["D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "Bm (B-D-F#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
  {
    id: "western-swing-turnaround",
    name: "Western swing turnaround",
    chords: ["G", "E7", "A7", "D7", "G"],
    description:
      "El turnaround complet del western swing, una cascada de setenes que torna a la tònica. És el final clàssic de molts temes de Bob Wills i del swing de Texas.",
    suggestions: [
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
      {
        chord: "E7",
        pentatonics: ["E mixolidi / E major pentatònica", "C# menor pentatònica"],
        triads: ["E major (E-G#-B)", "G#m (G#-B-D#)"],
      },
      {
        chord: "A7",
        pentatonics: ["A mixolidi / A major pentatònica", "F# menor pentatònica"],
        triads: ["A major (A-C#-E)", "F#m (F#-A-C#)"],
      },
      {
        chord: "D7",
        pentatonics: ["D mixolidi / D major pentatònica", "B menor pentatònica"],
        triads: ["D major (D-F#-A)", "F#m (F#-A-C#)"],
      },
      {
        chord: "G",
        pentatonics: ["G major pentatònica", "E menor pentatònica"],
        triads: ["G major (G-B-D)", "Em (E-G-B)"],
      },
    ],
  },
];
