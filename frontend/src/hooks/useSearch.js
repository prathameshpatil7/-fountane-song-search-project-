import { useState, useEffect, useCallback } from "react";
import debounce from "../utils/debounce";
import { fetch } from "../services/fetch";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = useCallback(
    debounce(async (searchQuery, searchOffset) => {
      setIsSearching(true);
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
        setResults((prevResults) =>
          searchOffset === 0 ? data : [...prevResults, ...data]
        ); // Append new data if offset > 0, otherwise replace
      } catch (err) {
        setError(err.message);
        if (searchOffset === 0) setResults([]); // Clear results only on the first page
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      setOffset(0); // Reset offset when query changes
      performSearch(query, 0);
    } else {
      console.log("inside");
      setResults([]); // Clear results if query is empty
    }
  }, [query, performSearch]);

  const loadMore = () => {
    const newOffset = offset + 10; // Adjust the increment based on API page size
    setOffset(newOffset);
    performSearch(query, newOffset);
  };

  return {
    query,
    setQuery,
    results,
    isSearching,
    loadMore, // Expose loadMore for pagination
    error,
  };
};
