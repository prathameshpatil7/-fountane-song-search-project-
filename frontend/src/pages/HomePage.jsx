import { useEffect, useContext, useCallback } from "react";
import { Search } from "lucide-react";
import SongCard from "../components/SongCard";
import Header from "../components/Header";
import { SearchContext } from "../context/SearchContext";
import searchSongPng from "../assets/images/search-song.png";

const HomePage = ({ currentUser, handleLogout }) => {
  const {
    query,
    setQuery,
    results,
    isSearching,
    loadMore,
    isLoadingMore,
    error,
  } = useContext(SearchContext);

  // Infinite scrolling handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        currentUser={currentUser}
        handleLogout={() => {
          setQuery("");
          handleLogout();
        }}
      />
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
        ) : query === "" ? (
          <div className="text-center py-8">
            <img
              src={searchSongPng}
              width={600}
              alt="Music"
              className="mx-auto"
            />
            <p className="font-medium text-gray-800">
              Search your favourite tracks featuring{" "}
              <span className="font-semibold text-black">
                {"'"}Arijit{"'"}
              </span>
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">No songs found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
            {results.map((song) => (
              <SongCard key={song.id} song={song} currentUser={currentUser} />
            ))}
          </div>
        )}
        {isLoadingMore && (
          <div className="text-center pb-8 mb-32">Loading more songs...</div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
