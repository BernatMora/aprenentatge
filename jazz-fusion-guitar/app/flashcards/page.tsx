"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Shuffle, Check, X } from "lucide-react";
import { scales } from "@/data/scales";
import { progressions } from "@/data/progressions";
import { fusionTechniques } from "@/data/fusion-techniques";

type Card = {
  id: string;
  category: string;
  question: string;
  answer: string;
  hint?: string;
};

function buildCards(): Card[] {
  const cards: Card[] = [];

  // Intervals
  const intervals = [
    { name: "Segona menor", semitones: 1, symbol: "b9 / b2" },
    { name: "Segona Major", semitones: 2, symbol: "9 / 2" },
    { name: "Tercera menor", semitones: 3, symbol: "b3 / #9" },
    { name: "Tercera Major", semitones: 4, symbol: "3" },
    { name: "Quarta justa", semitones: 5, symbol: "11 / 4" },
    { name: "Tritò", semitones: 6, symbol: "#11 / b5" },
    { name: "Quinta justa", semitones: 7, symbol: "5" },
    { name: "Sexta menor", semitones: 8, symbol: "b13 / b6" },
    { name: "Sexta Major", semitones: 9, symbol: "13 / 6" },
    { name: "Sèptima menor", semitones: 10, symbol: "b7" },
    { name: "Sèptima Major", semitones: 11, symbol: "7maj" },
    { name: "Octava", semitones: 12, symbol: "8" },
  ];
  for (const iv of intervals) {
    cards.push({
      id: `iv-${iv.semitones}`,
      category: "Intervals",
      question: `Quants semitons té l'interval "${iv.name}"?`,
      answer: `${iv.semitones} semitons (${iv.symbol})`,
      hint: "Compta des de la nota fonamental fins a la propera nota amb aquest nom.",
    });
  }

  // Escales (selecció de les 15 més importants)
  const importantScales = ["altered", "lydian-dominant", "bebop-dominant", "phrygian-dominant", "dorian", "mixolydian", "lydian", "harmonic-minor", "melodic-minor", "whole-tone", "bebop-major", "bebop-minor", "blues-scale", "diminished-hd", "hexatonic"];
  for (const id of importantScales) {
    const s = scales.find((sc) => sc.id === id);
    if (s) {
      cards.push({
        id: `sc-${s.id}`,
        category: "Escales",
        question: `Quina escala té la fórmula "${s.formula}"?`,
        answer: s.name,
        hint: s.description.substring(0, 100) + "...",
      });
    }
  }

  // Progressions
  const importantProgressions = ["ii-v-i-major", "ii-v-i-minor", "tritone-sub", "coltrane-changes", "modal-vamp", "blues-jazz", "rhythm-changes", "autumn-leaves"];
  for (const id of importantProgressions) {
    const p = progressions.find((pr) => pr.id === id);
    if (p) {
      cards.push({
        id: `pr-${p.id}`,
        category: "Progressions",
        question: `Quins acords formen la progressió "${p.name}"?`,
        answer: p.chords.join(" - "),
        hint: p.description.substring(0, 100) + "...",
      });
    }
  }

  // Tècniques
  for (const t of fusionTechniques.slice(0, 8)) {
    cards.push({
      id: `tc-${t.id}`,
      category: "Tècniques",
      question: `En què consisteix la tècnica "${t.name}"?`,
      answer: t.description,
      hint: `Categoria: ${t.category} · Dificultat: ${t.difficulty}`,
    });
  }

  return cards;
}

const STORAGE_KEY = "jfg-flashcards";

export default function FlashcardsPage() {
  const allCards = useMemo(() => buildCards(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [shuffled, setShuffled] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());

  // Carrega estat
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setKnownCards(new Set(d.known || []));
        setReviewCards(new Set(d.review || []));
      }
    } catch {}
  }, []);

  // Desa estat
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ known: Array.from(knownCards), review: Array.from(reviewCards) })
    );
  }, [knownCards, reviewCards]);

  const cards = useMemo(() => {
    let result = selectedCategory === "all" ? allCards : allCards.filter((c) => c.category === selectedCategory);
    if (shuffled.length === 0 || shuffled.length !== result.length) {
      return result;
    }
    return shuffled;
  }, [allCards, selectedCategory, shuffled]);

  const currentCard = cards[currentIndex];
  const categories = useMemo(() => Array.from(new Set(allCards.map((c) => c.category))), [allCards]);

  const handleShuffle = () => {
    const filtered = selectedCategory === "all" ? allCards : allCards.filter((c) => c.category === selectedCategory);
    setShuffled([...filtered].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const handleReset = () => {
    setShuffled([]);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const next = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const markKnown = () => {
    if (!currentCard) return;
    const newKnown = new Set(knownCards);
    newKnown.add(currentCard.id);
    setKnownCards(newKnown);
    const newReview = new Set(reviewCards);
    newReview.delete(currentCard.id);
    setReviewCards(newReview);
    setTimeout(() => next(), 300);
  };

  const markReview = () => {
    if (!currentCard) return;
    const newReview = new Set(reviewCards);
    newReview.add(currentCard.id);
    setReviewCards(newReview);
    const newKnown = new Set(knownCards);
    newKnown.delete(currentCard.id);
    setKnownCards(newKnown);
    setTimeout(() => next(), 300);
  };

  const knownCount = cards.filter((c) => knownCards.has(c.id)).length;
  const reviewCount = cards.filter((c) => reviewCards.has(c.id)).length;
  const progress = cards.length > 0 ? (knownCount / cards.length) * 100 : 0;

  return (
    <>
      <section className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <RotateCw size={32} color="var(--accent-amber)" />
          <h1 style={{ margin: 0 }}>Flashcards</h1>
        </div>
        <p>
          Repassa intervals, escales, progressions i tècniques amb un sistema de repetició espaciada.
          Marca cada targeta com a <strong style={{ color: "var(--color-success)" }}>sé</strong> o{" "}
          <strong style={{ color: "var(--color-warning)" }}>repassar</strong> per prioritzar.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        {/* Stats */}
        <div className="grid grid-3" style={{ marginBottom: "1.5rem" }}>
          <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-success)" }}>{knownCount}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Dominades</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-warning)" }}>{reviewCount}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>A repassar</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-amber)" }}>{Math.round(progress)}%</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>Progrés</div>
          </div>
        </div>

        {/* Filtres */}
        <div className="filter-group" style={{ marginBottom: "1rem" }}>
          <button
            className={`filter-button ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => { setSelectedCategory("all"); handleReset(); }}
          >
            Totes ({allCards.length})
          </button>
          {categories.map((c) => {
            const count = allCards.filter((card) => card.category === c).length;
            return (
              <button
                key={c}
                className={`filter-button ${selectedCategory === c ? "active" : ""}`}
                onClick={() => { setSelectedCategory(c); handleReset(); }}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button onClick={handleShuffle} className="button button-secondary">
            <Shuffle size={16} /> Barrejar
          </button>
          <button onClick={handleReset} className="button button-secondary">
            <RotateCw size={16} /> Reiniciar ordre
          </button>
        </div>

        {/* Targeta */}
        {currentCard ? (
          <div className="card" style={{ marginBottom: "1rem", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", padding: "2rem 1.5rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <span className="badge badge-copper">{currentCard.category}</span>
              <span className="badge" style={{ marginLeft: "0.5rem" }}>{currentIndex + 1} / {cards.length}</span>
            </div>

            <div style={{ fontSize: "1.375rem", color: "var(--text-primary)", marginBottom: "1rem", fontWeight: 500 }}>
              {currentCard.question}
            </div>

            {showAnswer ? (
              <div className="fade-in">
                <div
                  style={{
                    padding: "1.5rem",
                    background: "rgba(212, 161, 62, 0.1)",
                    border: "1px solid var(--accent-gold)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--accent-amber)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  {currentCard.answer}
                </div>
                {currentCard.hint && (
                  <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontStyle: "italic" }}>
                    💡 {currentCard.hint}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="button"
                style={{ alignSelf: "center" }}
              >
                Mostrar resposta
              </button>
            )}
          </div>
        ) : (
          <div className="card empty-state" style={{ padding: "3rem" }}>
            <p>No hi ha targetes en aquesta categoria.</p>
          </div>
        )}

        {/* Controls inferiors */}
        {currentCard && (
          <>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="button button-secondary"
                style={{ flex: 1, justifyContent: "center", opacity: currentIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft size={16} /> Anterior
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= cards.length - 1}
                className="button button-secondary"
                style={{ flex: 1, justifyContent: "center", opacity: currentIndex >= cards.length - 1 ? 0.5 : 1 }}
              >
                Següent <ChevronRight size={16} />
              </button>
            </div>

            {showAnswer && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={markReview}
                  className="button button-secondary"
                  style={{ flex: 1, justifyContent: "center", borderColor: "var(--color-warning)", color: "var(--color-warning)" }}
                >
                  <X size={16} /> A repassar
                </button>
                <button
                  onClick={markKnown}
                  className="button"
                  style={{ flex: 1, justifyContent: "center", background: "var(--color-success)" }}
                >
                  <Check size={16} /> Ho sé!
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
