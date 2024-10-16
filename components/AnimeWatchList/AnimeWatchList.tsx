"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AnimeCard from "../AnimeCard/AnimeCard";

interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  titles: { type: string; title: string }[];
  rating: string;
  score: number;
  genres: { name: string }[];
  synopsis: string;
}

export default function AnimeWatchlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [watchlist, setWatchlist] = useState<Anime[]>([]);

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

  const addToWatchlist = (anime: Anime) => {
    if (!watchlist.some((item) => item.mal_id === anime.mal_id)) {
      setWatchlist((prev) => [...prev, anime]);
    }
  };

  const removeFromWatchlist = (anime: Anime) => {
    setWatchlist((prev) => prev.filter((item) => item.mal_id !== anime.mal_id));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-600 p-4">
      <h1 className="text-2xl font-bold mb-6">My Anime Watchlist</h1>

      <div className="">
        {/* Search Input */}
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

        {/* Watchlist Section */}
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
      </div>
    </div>
  );
}
