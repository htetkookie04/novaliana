import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import WordCard from './WordCard';
import Sidebar from './Sidebar';
import './Dictionary.css';

export default function Dictionary({ initialSearch = '', darkMode, onToggleTheme, onWordClick, language = 'KR-EN' }) {
  const [dictionary, setDictionary] = useState([]);
  
  // Load saved state from localStorage or use initial values
  const loadSavedState = () => {
    // If initialSearch is provided (e.g., from home page), don't restore saved state
    if (initialSearch) {
      return {
        search: initialSearch,
        selectedCategory: 'All',
        currentPage: 1,
        pageRangeStart: 1
      };
    }
    
    // Otherwise, try to restore saved state
    try {
      const saved = localStorage.getItem('dictionaryState');
      if (saved) {
        const state = JSON.parse(saved);
        return {
          search: state.search || '',
          selectedCategory: state.selectedCategory || 'All',
          currentPage: state.currentPage || 1,
          pageRangeStart: state.pageRangeStart || 1
        };
      }
    } catch (err) {
      console.error('Error loading saved state:', err);
    }
    return {
      search: '',
      selectedCategory: 'All',
      currentPage: 1,
      pageRangeStart: 1
    };
  };

  const initialState = loadSavedState();
  const [search, setSearch] = useState(initialState.search);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialState.selectedCategory);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const [pageRangeStart, setPageRangeStart] = useState(initialState.pageRangeStart);
  const itemsPerPage = 10;

  // Load dictionary data
  useEffect(() => {
    fetch('/data/dictionary.json')
      .then((res) => res.json())
      .then((data) => setDictionary(data))
      .catch((err) => console.error('Error loading dictionary:', err));
  }, []);

  // Restore scroll position when component mounts and data is loaded
  useEffect(() => {
    if (dictionary.length > 0) {
      const savedScrollPosition = localStorage.getItem('dictionaryScrollPosition');
      if (savedScrollPosition) {
        // Use setTimeout to ensure DOM is rendered
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedScrollPosition, 10), behavior: 'auto' });
          localStorage.removeItem('dictionaryScrollPosition');
        }, 200);
      }
    }
  }, [dictionary.length]);

  // Update search when initialSearch prop changes (e.g., from home page search)
  useEffect(() => {
    if (initialSearch && initialSearch !== search) {
      setSearch(initialSearch);
      setCurrentPage(1);
      setPageRangeStart(1);
      // Clear saved state when new search comes from home page
      localStorage.removeItem('dictionaryState');
    }
  }, [initialSearch]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      search,
      selectedCategory,
      currentPage,
      pageRangeStart
    };
    localStorage.setItem('dictionaryState', JSON.stringify(stateToSave));
  }, [search, selectedCategory, currentPage, pageRangeStart]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (favorites.length >= 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Save search to recent searches
  useEffect(() => {
    if (search.trim()) {
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const updated = [search.trim(), ...recent.filter(s => s !== search.trim())].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  }, [search]);

  // Toggle favorite
  const toggleFavorite = (korean, isFavorite) => {
    if (isFavorite) {
      setFavorites((prev) => [...prev, korean]);
    } else {
      setFavorites((prev) => prev.filter((word) => word !== korean));
    }
  };

  // Handle word click from sidebar
  const handleWordClick = (word) => {
    // Save current state before changing
    const stateToSave = {
      search: word,
      selectedCategory,
      currentPage: 1,
      pageRangeStart: 1
    };
    localStorage.setItem('dictionaryState', JSON.stringify(stateToSave));
    setSearch(word);
    setCurrentPage(1);
    setPageRangeStart(1);
  };

  // Get unique categories - keep 'All' at the top, sort the rest
  const otherCategories = [...new Set(dictionary.map(item => item.category).filter(Boolean))].sort();
  const categories = ['All', ...otherCategories];

  // Filter data based on search and active filter
  let filteredData = dictionary.filter((item) => {
    const searchLower = search.toLowerCase();
    // Prioritize search based on language mode
    if (language === 'EN-KR') {
      // English → Korean: prioritize English
      return (
        (item.english && item.english.toLowerCase().includes(searchLower)) ||
        item.korean.toLowerCase().includes(searchLower) ||
        (item.myanmar && item.myanmar.toLowerCase().includes(searchLower)) ||
        (item.koreanExample && item.koreanExample.toLowerCase().includes(searchLower)) ||
        (item.englishExample && item.englishExample.toLowerCase().includes(searchLower))
      );
    } else if (language === 'MM-KR') {
      // Myanmar → Korean: prioritize Myanmar
      return (
        (item.myanmar && item.myanmar.toLowerCase().includes(searchLower)) ||
        item.korean.toLowerCase().includes(searchLower) ||
        (item.english && item.english.toLowerCase().includes(searchLower)) ||
        (item.koreanExample && item.koreanExample.toLowerCase().includes(searchLower)) ||
        (item.englishExample && item.englishExample.toLowerCase().includes(searchLower))
      );
    } else {
      // KR-EN or KR-MM: prioritize Korean
      return (
        item.korean.toLowerCase().includes(searchLower) ||
        (language === 'KR-EN' && item.english && item.english.toLowerCase().includes(searchLower)) ||
        (language === 'KR-MM' && item.myanmar && item.myanmar.toLowerCase().includes(searchLower)) ||
        (item.english && item.english.toLowerCase().includes(searchLower)) ||
        (item.myanmar && item.myanmar.toLowerCase().includes(searchLower)) ||
        (item.koreanExample && item.koreanExample.toLowerCase().includes(searchLower)) ||
        (item.englishExample && item.englishExample.toLowerCase().includes(searchLower))
      );
    }
  });

  // Apply category filter
  if (selectedCategory !== 'All') {
    filteredData = filteredData.filter((item) => item.category === selectedCategory);
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Sync page range start with current page
  useEffect(() => {
    if (totalPages > 5) {
      if (currentPage < pageRangeStart) {
        setPageRangeStart(Math.max(1, currentPage - 4));
      } else if (currentPage > pageRangeStart + 4) {
        setPageRangeStart(Math.min(totalPages - 4, currentPage));
      }
    } else {
      setPageRangeStart(1);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate visible page range (always show 5 pages)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const end = Math.min(pageRangeStart + 4, totalPages);
    return Array.from({ length: end - pageRangeStart + 1 }, (_, i) => pageRangeStart + i);
  };

  const visiblePages = getVisiblePages();

  // Handle arrow navigation to shift page range
  const handlePreviousRange = () => {
    const newStart = Math.max(1, pageRangeStart - 5);
    setPageRangeStart(newStart);
    setCurrentPage(newStart);
  };

  const handleNextRange = () => {
    const newStart = Math.min(totalPages - 4, pageRangeStart + 5);
    setPageRangeStart(newStart);
    setCurrentPage(newStart);
  };

  return (
    <div className="dictionary-page">
      <div className="dictionary-container">
        {/* Main Content */}
        <div className="dictionary-main">
          {/* Search Bar */}
          <div className="search-container-main">
            <div className="search-filter-wrapper">
            <SearchBar value={search} onChange={setSearch} darkMode={darkMode} />
              <select
                className="category-dropdown"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                  setPageRangeStart(1);
                }}
                data-theme={darkMode ? 'dark' : 'light'}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Header */}
          {search && (
            <div className="results-header-main">
              <h2 className="results-count-main">
                {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for '{search}'
              </h2>
              
            </div>
          )}

          {/* Word List */}
          <div className="word-list-main">
            {paginatedData.length === 0 ? (
              <div className="word-list-empty">
                <div className="word-list-empty-icon">🔍</div>
                <p>No words found matching "{search}"</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>
                  Try searching for a different word
                </p>
              </div>
            ) : (
              paginatedData.map((item, index) => (
                <WordCard
                  key={`${item.korean}-${index}`}
                  korean={item.korean}
                  myanmar={item.myanmar}
                  english={item.english}
                  pos={item.pos}
                  level={item.level}
                  category={item.category}
                  koreanExample={item.koreanExample}
                  englishExample={item.englishExample}
                  darkMode={darkMode}
                  language={language}
                  onCardClick={(wordData) => {
                    // Save current state and scroll position before navigating
                    const stateToSave = {
                      search,
                      selectedCategory,
                      currentPage,
                      pageRangeStart
                    };
                    localStorage.setItem('dictionaryState', JSON.stringify(stateToSave));
                    localStorage.setItem('dictionaryScrollPosition', window.scrollY.toString());
                    if (onWordClick) {
                      onWordClick(wordData);
                    }
                  }}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredData.length > itemsPerPage && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={handlePreviousRange}
                disabled={pageRangeStart <= 1}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              
              {visiblePages.map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className="pagination-btn"
                onClick={handleNextRange}
                disabled={pageRangeStart + 4 >= totalPages}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar dictionary={dictionary} darkMode={darkMode} onWordClick={handleWordClick} />
      </div>
    </div>
  );
}
