"use client";

import React, { useMemo } from "react";

const STRING_NAMES = ["e", "B", "G", "D", "A", "E"];
const NUM_STRINGS = 6;
const FRET_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
const DOUBLE_DOT_FRETS = [12, 24];
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Tuning estàndard: low to high (E A D G B E)
// Per mostrar de dalt a baix: high to low (e B G D A E)
// Cada corda té el seu MIDI a l'octava 0 (open string)
const STRING_TUNING_MIDI = [40, 45, 50, 55, 59, 64]; // E2 A2 D3 G3 B3 E4

function midiToName(midi: number) {
  return NOTE_NAMES[midi % 12];
}

type Note = {
  degree?: number;
  interval?: string;
  string: number;
  fret: number;
  midiNote: number;
  type?: "scale" | "chromatic";
  isRoot?: boolean;
};

type FretboardProps = {
  notes: Note[];
  numFrets?: number;
  showNoteNames?: boolean;
  highlightRoot?: boolean;
};

export default function Fretboard({
  notes,
  numFrets = 15,
  showNoteNames = true,
  highlightRoot = true,
}: FretboardProps) {
  const minFret = notes.length > 0 ? Math.min(...notes.map((n) => n.fret)) : 0;
  const maxFret = notes.length > 0 ? Math.max(...notes.map((n) => n.fret)) : 12;
  const displayFrets = Math.max(maxFret - minFret + 3, numFrets);

  const noteMap = useMemo(() => {
    const map = new Map<string, Note>();
    notes.forEach((note) => {
      map.set(`${note.string}-${note.fret}`, note);
    });
    return map;
  }, [notes]);

  return (
    <div className="fretboard-wrapper">
      <div className="fretboard-container">
        <div className="string-names-column">
          <div className="fret-marker-space" />
          {STRING_NAMES.map((name, index) => (
            <div key={index} className="string-name-cell">
              <span className="string-name-text">{name}</span>
            </div>
          ))}
        </div>

        <div className="fretboard">
          <div className="fret-markers-row">
            {Array.from({ length: displayFrets }, (_, fretIndex) => {
              const fretNumber = minFret + fretIndex;
              const isMarker = FRET_MARKERS.includes(fretNumber);
              const isDoubleDot = DOUBLE_DOT_FRETS.includes(fretNumber);

              return (
                <div key={fretIndex} className="fret-marker-cell">
                  {isMarker && (
                    <div className="fret-marker-container">
                      {isDoubleDot ? (
                        <>
                          <div className="fret-marker-dot" />
                          <div className="fret-marker-dot" />
                        </>
                      ) : (
                        <div className="fret-marker-dot" />
                      )}
                    </div>
                  )}
                  <span className="fret-number-text">{fretNumber}</span>
                </div>
              );
            })}
          </div>

          <div className="strings-container">
            {Array.from({ length: NUM_STRINGS }, (_, stringIndex) => (
              <div key={stringIndex} className="string-row">
                {Array.from({ length: displayFrets }, (_, fretIndex) => {
                  const fretNumber = minFret + fretIndex;
                  const noteKey = `${stringIndex}-${fretNumber}`;
                  const note = noteMap.get(noteKey);

                  return (
                    <div key={`${stringIndex}-${fretNumber}`} className="fret-cell">
                      {note && (
                        <div
                          className={`note-circle ${
                            highlightRoot && note.isRoot ? "note-root" : ""
                          } note-size-${notes.length > 20 ? "sm" : notes.length > 15 ? "md" : "lg"}`}
                        >
                          {showNoteNames
                            ? midiToName(note.midiNote)
                            : note.degree !== undefined
                            ? note.degree
                            : midiToName(note.midiNote)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utilitat: genera les notes d'una escala al diapasó
export function generateScaleNotes(
  rootMidi: number,
  scaleIntervals: number[],
  numFrets: number = 15
): Note[] {
  const notes: Note[] = [];

  // Genera les notes per cada corda
  for (let stringIndex = 0; stringIndex < NUM_STRINGS; stringIndex++) {
    const openMidi = STRING_TUNING_MIDI[stringIndex];

    for (let fret = 0; fret <= numFrets; fret++) {
      const midiNote = openMidi + fret;
      const noteInScale = scaleIntervals.includes(((midiNote - rootMidi) % 12 + 12) % 12);

      if (noteInScale) {
        notes.push({
          string: stringIndex,
          fret,
          midiNote,
          isRoot: midiNote % 12 === rootMidi % 12,
          type: "scale",
        });
      }
    }
  }

  return notes;
}

// Intervals en semitons per a cada escala (1 = root)
export const SCALE_INTERVALS: Record<string, number[]> = {
  altered: [0, 1, 3, 4, 6, 8, 10],
  "lydian-dominant": [0, 2, 4, 6, 7, 9, 10],
  "diminished-hd": [0, 1, 3, 4, 6, 7, 9, 10],
  "diminished-wh": [0, 2, 3, 5, 6, 8, 9, 11],
  "whole-tone": [0, 2, 4, 6, 8, 10],
  "melodic-minor": [0, 2, 3, 5, 7, 9, 11],
  "harmonic-minor": [0, 2, 3, 5, 7, 8, 11],
  "bebop-dominant": [0, 2, 4, 5, 7, 9, 10, 11],
  "bebop-major": [0, 2, 4, 5, 7, 8, 9, 11],
  "natural-minor": [0, 2, 3, 5, 7, 8, 10],
  "phrygian-dominant": [0, 1, 4, 5, 7, 8, 10],
  "bebop-minor": [0, 2, 3, 4, 5, 7, 9, 10],
  hexatonic: [0, 2, 3, 4, 7, 8],
  "blues-scale": [0, 3, 5, 6, 7, 10],
  "lydian-augmented": [0, 2, 4, 6, 8, 9, 11],
  "super-locrian": [0, 1, 3, 4, 6, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  "dorian-b2": [0, 1, 3, 5, 7, 9, 11],
  "mixolydian-b6": [0, 2, 4, 5, 7, 8, 10],
  "augmented-scale": [0, 3, 4, 7, 8, 11],
};

// Root MIDI notes (octava 4 = C4 = 60)
export const ROOT_MIDI: Record<string, number> = {
  C: 60, "C#": 61, D: 62, "D#": 63, E: 64, F: 65,
  "F#": 66, G: 67, "G#": 68, A: 69, "A#": 70, B: 71,
};
