/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useEffect } from "react";
import debounce from "../utils/debounce";
import { fetch } from "../services/fetch";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState(""); // Search query
  const [results, setResults] = useState([]); // Tracks results
  const [isSearching, setIsSearching] = useState(false); // Loading state for search
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Separate loading state for "Load More"
  const [error, setError] = useState(null); // Error state
  const [offset, setOffset] = useState(0); // Pagination offset
  const [fetchedTrackIds, setFetchedTrackIds] = useState(new Set()); // Track IDs to prevent duplicates

  // Perform search with debounce and pagination
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = useCallback(
    debounce(
      async (searchQuery, searchOffset, enableSearchingLoader = true) => {
        if (enableSearchingLoader) {
          setIsSearching(true); // Start searching
        } else {
          setIsLoadingMore(true); // Start loading more
        }
        setError(null);

        try {
          const response = await fetch(
            {
              url: `/api/songs/search?query=${encodeURIComponent(
                searchQuery
              )}&offset=${searchOffset}`,
            },
            "GET"
          );

          if (!response.success) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = response.tracks;

          // Filter out tracks that have already been fetched (to avoid duplicates)
          const uniqueTracks = data.filter(
            (track) => !fetchedTrackIds.has(track.id)
          );

          if (uniqueTracks.length > 0) {
            // Update the fetched track IDs and append the new results
            setFetchedTrackIds(
              (prevIds) =>
                new Set([...prevIds, ...uniqueTracks.map((track) => track.id)])
            );
            setResults((prevResults) =>
              searchOffset === 0
                ? uniqueTracks
                : [...prevResults, ...uniqueTracks]
            );
          }
        } catch (err) {
          setError(err.message);
          if (searchOffset === 0) setResults([]); // Clear results only on the first page
        } finally {
          setIsSearching(false); // Stop the initial search loader
          setIsLoadingMore(false); // Stop the "Load More" loader
        }
      },
      300
    ),
    []
  );

  // Handle loading more results
  const loadMore = async () => {
    if (isLoadingMore) return;
    const newOffset = offset + 15;
    setOffset(newOffset);
    try {
      await performSearch(query, newOffset, false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Trigger search when the query changes
  useEffect(() => {
    if (query) {
      setOffset(0); // Reset offset when query changes
      setFetchedTrackIds(new Set()); // Reset fetched track IDs on new query
      performSearch(query, 0);
    } else {
      setResults([]); // Clear results if query is empty
    }
  }, [query, performSearch]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        isSearching,
        loadMore,
        isLoadingMore,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
