import { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";


type WatchlistContextType = {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  toggleWatchlist: (movie: Movie) => void;
};

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    if (watchlist.some((m) => m.id === movie.id)) {
      alert("Movie already in Watchlist ❤️");
      return;
    }
    setWatchlist([...watchlist, movie]);
    toast.success("Added to Watchlist 🎬");
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
    toast("Removed from Watchlist 💔");
  };


  const toggleWatchlist = (movie: Movie) => {
  const exists = watchlist.some((m) => m.id === movie.id);

  if (exists) {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  } else {
    setWatchlist([...watchlist, movie]);
  }
};


  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist,toggleWatchlist, }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be inside WatchlistProvider");
  return ctx;
};
