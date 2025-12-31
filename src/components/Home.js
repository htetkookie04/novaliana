import React, { useState } from 'react';
import './Home.css';
import FeatureCards from './FeatureCards';
import Footer from './Footer';

export default function Home({ onSearch, darkMode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock the <span className="title-highlight">Language</span>
          </h1>
          <p className="hero-subtitle">
            The most accurate and comprehensive Korean to Myanmar translation resource for learners and professionals.
          </p>

          {/* Search Bar */}
          <div className="hero-search-container">
            <div className="hero-search-bar">
              <span className="search-icon-left">🔍</span>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Type a word in Korean, Myanmar, or English..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <span className="search-icon-right">⌨️</span>
            </div>
            <button className="hero-search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

        </div>
      </section>

      {/* Feature Cards */}
      <FeatureCards />

      {/* Footer */}
      <Footer />
    </div>
  );
}

