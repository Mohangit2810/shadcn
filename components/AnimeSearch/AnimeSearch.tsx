"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AnimeCard from "../AnimeCard/AnimeCard";
import useAnimeStore from "@/store/animeStore";

export default function AnimeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const setAnimeList = useAnimeStore((state) => state.setAnimeList);
  const animeList = useAnimeStore((state) => state.animeList);
  const addToWatchlist = useAnimeStore((state) => state.addToWatchlist);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=9`
      );
      setAnimeList(response.data.data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime..."
          className="mr-2"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
        {animeList.map((anime) => (
          <div key={anime.mal_id}>
            <AnimeCard anime={anime} addToWatchlist={addToWatchlist} />
          </div>
        ))}
      </div>
    </div>
  );
}
