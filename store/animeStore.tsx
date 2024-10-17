import { create } from "zustand";

interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: { image_url: string };
    webp: { image_url: string };
  };
  titles: { type: string; title: string }[];
  rating: string;
  score: number;
  genres: { name: string }[];
  synopsis: string;
}

interface AnimeStore {
  animeList: Anime[];
  watchlist: Anime[];
  setAnimeList: (animeList: Anime[]) => void;
  addToWatchlist: (anime: Anime) => void;
  removeFromWatchlist: (anime: Anime) => void;
}

const useAnimeStore = create<AnimeStore>((set) => ({
  animeList: [],
  watchlist: [],

  setAnimeList: (animeList) => set({ animeList }),

  addToWatchlist: (anime) =>
    set((state) => ({
      watchlist: state.watchlist.some((item) => item.mal_id === anime.mal_id)
        ? state.watchlist
        : [...state.watchlist, anime],
    })),

  removeFromWatchlist: (anime) =>
    set((state) => ({
      watchlist: state.watchlist.filter((item) => item.mal_id !== anime.mal_id),
    })),
}));

export default useAnimeStore;
