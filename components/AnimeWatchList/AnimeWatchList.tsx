"use client";

import useAnimeStore from "@/store/animeStore";
import AnimeCard from "../AnimeCard/AnimeCard";

export default function AnimeWatchlist() {
  const watchlist = useAnimeStore((state) => state.watchlist);
  const removeFromWatchlist = useAnimeStore(
    (state) => state.removeFromWatchlist
  );

  return (
    <div>
      <h2 className="text-xl text-center font-bold mt-8">Your Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {watchlist.map((anime) => (
          <div key={anime.mal_id}>
            <AnimeCard
              anime={anime}
              removeFromWatchlist={removeFromWatchlist}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
