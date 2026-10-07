"use client";

import { useState, useEffect } from "react";
import { Star, StarOff } from "lucide-react";

const STORAGE_KEY = "jfg-favorites";

type Favorites = Record<string, { type: string; title: string; subtitle?: string; href: string; addedAt: number }>;

function getFavorites(): Favorites {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setFavorites(favs: Favorites) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  // Notifica altres components
  window.dispatchEvent(new Event("jfg-favorites-changed"));
}

export function FavoriteButton({
  id,
  type,
  title,
  subtitle,
  href,
  size = 16,
}: {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  href: string;
  size?: number;
}) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const update = () => {
      const favs = getFavorites();
      setIsFav(!!favs[id]);
    };
    update();
    window.addEventListener("jfg-favorites-changed", update);
    return () => window.removeEventListener("jfg-favorites-changed", update);
  }, [id]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = getFavorites();
    if (favs[id]) {
      delete favs[id];
    } else {
      favs[id] = { type, title, subtitle, href, addedAt: Date.now() };
    }
    setFavorites(favs);
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={toggle}
      title={isFav ? "Treure de favorits" : "Afegir a favorits"}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isFav ? "var(--accent-amber)" : "var(--text-muted)",
        transition: "color 0.15s ease",
      }}
    >
      {isFav ? <Star size={size} fill="currentColor" /> : <StarOff size={size} />}
    </button>
  );
}

// Hook per obtenir favorits (per a pàgina de favorits)
export function useFavorites() {
  const [favorites, setFavs] = useState<Favorites>({});

  useEffect(() => {
    const update = () => setFavs(getFavorites());
    update();
    window.addEventListener("jfg-favorites-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("jfg-favorites-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const clearAll = () => {
    setFavorites({});
    setFavs({});
  };

  const remove = (id: string) => {
    const favs = getFavorites();
    delete favs[id];
    setFavorites(favs);
    setFavs(favs);
  };

  return { favorites, clearAll, remove };
}
