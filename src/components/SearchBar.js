import React from 'react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, darkMode }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search Korean, Myanmar, or English..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          data-theme={darkMode ? 'dark' : 'light'}
        />
        {value && (
          <button
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
