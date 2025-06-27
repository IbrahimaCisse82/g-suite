
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useAdvancedCache } from '@/hooks/useAdvancedCache';

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  action?: () => void;
}

interface FastSearchProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
  onResultSelect?: (result: SearchResult) => void;
  placeholder?: string;
  debounceMs?: number;
  minQueryLength?: number;
  maxResults?: number;
  className?: string;
}

export const FastSearch = ({
  onSearch,
  onResultSelect,
  placeholder = "Rechercher...",
  debounceMs = 300,
  minQueryLength = 2,
  maxResults = 10,
  className
}: FastSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, debounceMs);
  const cache = useAdvancedCache<SearchResult[]>({
    maxSize: 50,
    defaultTTL: 2 * 60 * 1000, // 2 minutes
    persistToStorage: false
  });

  const filteredResults = useMemo(() => {
    return results.slice(0, maxResults);
  }, [results, maxResults]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < minQueryLength) {
      setResults([]);
      setShowResults(false);
      return;
    }

    // Check cache first
    const cacheKey = `search:${searchQuery.toLowerCase()}`;
    const cachedResults = cache.get(cacheKey);
    
    if (cachedResults) {
      setResults(cachedResults);
      setShowResults(true);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await onSearch(searchQuery);
      setResults(searchResults);
      setShowResults(true);
      
      // Cache results
      cache.set(cacheKey, searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [onSearch, minQueryLength, cache]);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleResultClick = useCallback((result: SearchResult) => {
    setQuery('');
    setShowResults(false);
    setSelectedIndex(-1);
    
    if (result.action) {
      result.action();
    }
    
    if (onResultSelect) {
      onResultSelect(result);
    }
  }, [onResultSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showResults) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
          handleResultClick(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  }, [showResults, selectedIndex, filteredResults, handleResultClick]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    setSelectedIndex(-1);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= minQueryLength && setShowResults(true)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Recherche en cours...
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Aucun résultat trouvé
            </div>
          ) : (
            <div className="py-2">
              {filteredResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-gray-50' : ''
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {result.title}
                      </div>
                      {result.subtitle && (
                        <div className="text-sm text-gray-500 truncate mt-1">
                          {result.subtitle}
                        </div>
                      )}
                    </div>
                    {result.category && (
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {result.category}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
