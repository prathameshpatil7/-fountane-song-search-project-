import { useState, useEffect, useCallback } from 'react';
import debounce from '../utils/debounce';

export const useSearch = (data, searchKeys) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(
    debounce((searchQuery) => {
      setIsSearching(true);
      const filtered = data.filter((item) =>
        searchKeys.some((key) =>
          item[key].toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setResults(filtered);
      setIsSearching(false);
    }, 300),
    [data, searchKeys]
  );

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setResults(data);
    }
  }, [query, performSearch]);

  return {
    query,
    setQuery,
    results,
    isSearching
  };
};