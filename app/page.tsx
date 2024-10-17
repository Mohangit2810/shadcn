import AnimeWatchlist from "@/components/AnimeWatchList/AnimeWatchList";
import AnimeSearch from "@/components/AnimeSearch/AnimeSearch";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-600 p-4">
      <h1 className="text-2xl font-bold mb-6">My Anime Watchlist</h1>
      <AnimeSearch />
      <AnimeWatchlist />
    </div>
  );
}
