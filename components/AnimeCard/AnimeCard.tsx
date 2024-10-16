import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";

interface AnimeCardProps {
  anime: {
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
  };
  addToWatchlist?: (anime: AnimeCardProps["anime"]) => void;
  removeFromWatchlist?: (anime: AnimeCardProps["anime"]) => void;
}

export default function AnimeCard({
  anime,
  addToWatchlist,
  removeFromWatchlist,
}: AnimeCardProps) {
  return (
    <Card className="border-0 w-[280px] bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="relative">
        <Image
          className="rounded-lg h-56 w-full object-cover"
          src={anime.images.webp.image_url}
          alt={anime.titles[0].title}
          width={400}
          height={225}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
          <h3 className="text-white text-lg font-semibold">
            {anime.titles[0].title}
          </h3>
          <p className="text-sm text-yellow-300">{anime.rating}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600 text-sm mb-2">
          {anime.synopsis?.slice(0, 100)}...
        </p>
        <p className="text-gray-700 font-semibold">Score: {anime.score}</p>
        <div className="mt-2">
          <span className="text-sm font-medium">Genres: </span>
          {anime.genres.map((genre, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs mr-1"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </CardContent>
      {!addToWatchlist ? (
        <div className="p-4 bg-black">
          <Button
            onClick={() => removeFromWatchlist && removeFromWatchlist(anime)}
            variant="outline"
            className="w-full text-black border-0"
          >
            Remove from Watchlist
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-black">
          <Button
            onClick={() => addToWatchlist && addToWatchlist(anime)}
            variant="outline"
            className="w-full text-black border-0"
          >
            Add to Watchlist
          </Button>
        </div>
      )}
    </Card>
  );
}
