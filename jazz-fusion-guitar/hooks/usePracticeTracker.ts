"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "jfg-practice-tracker";

export type PracticeSession = {
  date: string; // YYYY-MM-DD
  minutes: number;
  category: "tecnic" | "escala" | "progressio" | "improvisacio" | "rutina" | "exercici" | "biblioteca" | "practica" | "altres";
  notes?: string;
};

export type PracticeData = {
  sessions: PracticeSession[];
  goals: {
    dailyMinutes: number;
    weeklyDays: number;
  };
};

const DEFAULT_DATA: PracticeData = {
  sessions: [],
  goals: {
    dailyMinutes: 30,
    weeklyDays: 5,
  },
};

function loadData(): PracticeData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DATA;
  }
}

function saveData(data: PracticeData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("jfg-practice-changed"));
}

export function usePracticeTracker() {
  const [data, setData] = useState<PracticeData>(DEFAULT_DATA);

  useEffect(() => {
    const update = () => setData(loadData());
    update();
    window.addEventListener("jfg-practice-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("jfg-practice-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const addSession = useCallback((session: Omit<PracticeSession, "date"> & { date?: string }) => {
    const current = loadData();
    const newSession: PracticeSession = {
      date: session.date || new Date().toISOString().split("T")[0],
      minutes: session.minutes,
      category: session.category,
      notes: session.notes,
    };
    current.sessions.push(newSession);
    saveData(current);
    setData(current);
  }, []);

  const removeSession = useCallback((index: number) => {
    const current = loadData();
    current.sessions.splice(index, 1);
    saveData(current);
    setData(current);
  }, []);

  const setGoals = useCallback((goals: PracticeData["goals"]) => {
    const current = loadData();
    current.goals = goals;
    saveData(current);
    setData(current);
  }, []);

  const clearAll = useCallback(() => {
    saveData(DEFAULT_DATA);
    setData(DEFAULT_DATA);
  }, []);

  // Estadístiques derivades
  const stats = useMemoStats(data);

  return { data, addSession, removeSession, setGoals, clearAll, stats };
}

// Hook auxiliar per a estadístiques
function useMemoStats(data: PracticeData) {
  const today = new Date().toISOString().split("T")[0];
  const todayMinutes = data.sessions.filter((s) => s.date === today).reduce((sum, s) => sum + s.minutes, 0);

  // Streak actual (dies consecutius amb pràctica)
  const dates = new Set(data.sessions.map((s) => s.date));
  let streak = 0;
  let d = new Date();
  while (dates.has(d.toISOString().split("T")[0])) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  // Total aquesta setmana
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekMinutes = data.sessions
    .filter((s) => new Date(s.date) >= weekAgo)
    .reduce((sum, s) => sum + s.minutes, 0);

  // Dies practicats aquesta setmana
  const weekDates = new Set(
    data.sessions
      .filter((s) => new Date(s.date) >= weekAgo)
      .map((s) => s.date)
  );

  // Gràfic dels últims 90 dies
  const chart: { date: string; minutes: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  for (let i = 89; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const minutes = data.sessions.filter((s) => s.date === dateStr).reduce((sum, s) => sum + s.minutes, 0);
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (minutes > 0 && minutes < 15) level = 1;
    else if (minutes < 30) level = 2;
    else if (minutes < 60) level = 3;
    else if (minutes >= 60) level = 4;
    chart.push({ date: dateStr, minutes, level });
  }

  // Total acumulat
  const totalMinutes = data.sessions.reduce((sum, s) => sum + s.minutes, 0);
  const totalSessions = data.sessions.length;

  return {
    todayMinutes,
    streak,
    weekMinutes,
    weekDays: weekDates.size,
    chart,
    totalMinutes,
    totalSessions,
  };
}
