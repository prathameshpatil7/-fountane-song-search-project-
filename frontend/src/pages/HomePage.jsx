import { useSearch } from "../hooks/useSearch";
import { Search } from "lucide-react";
import SongCard from "../components/SongCard";
import Header from "../components/Header";

const HomePage = ({ songs, currentUser, handleLogout }) => {
  const { query, setQuery, results, isSearching } = useSearch(songs, [
    "title",
    "artist",
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isSearching ? (
          <div className="text-center py-8">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">No songs found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {results.map((song) => (
              <SongCard key={song.id} song={song} currentUser={currentUser} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
