import React, { useState, useEffect } from 'react';
import './Sidebar.css';

export default function Sidebar({ dictionary, darkMode, onWordClick }) {
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Get Word of the Day
  useEffect(() => {
    if (dictionary.length > 0) {
      const today = new Date().getDate();
      const wotd = dictionary[today % dictionary.length];
      setWordOfTheDay(wotd);
    }
  }, [dictionary]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading recent searches:', err);
      }
    }
  }, []);

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleRecentClick = (search) => {
    if (onWordClick) {
      onWordClick(search);
    }
  };

  return (
    <aside className="dictionary-sidebar">
      {/* Word of the Day */}
      {wordOfTheDay && (
        <div className="sidebar-card wotd-card">
          <div className="wotd-header">
            <span className="wotd-icon-sidebar">📅</span>
            <h3 className="wotd-title">WORD OF THE DAY</h3>
          </div>
          <div className="wotd-content">
            <h4 className="wotd-word">{wordOfTheDay.korean}</h4>
            <p className="wotd-translation">{wordOfTheDay.myanmar}</p>
            <p className="wotd-description">
              {wordOfTheDay.pos}: {wordOfTheDay.english || ''}
            </p>
            <button 
              className="wotd-button"
              onClick={() => onWordClick && onWordClick(wordOfTheDay.korean)}
            >
              Learn more
            </button>
          </div>
        </div>
      )}

      {/* Recent Searches */}
      <div className="sidebar-card recent-searches-card">
        <div className="recent-header">
          <h3 className="recent-title">Recent Searches</h3>
          {recentSearches.length > 0 && (
            <button className="clear-button" onClick={handleClearRecent}>
              Clear
            </button>
          )}
        </div>
        {recentSearches.length === 0 ? (
          <p className="recent-empty">No recent searches</p>
        ) : (
          <ul className="recent-list">
            {recentSearches.slice(0, 5).map((search, index) => (
              <li 
                key={index} 
                className="recent-item"
                onClick={() => handleRecentClick(search)}
              >
                <span className="recent-icon">🕐</span>
                <span className="recent-text">{search}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Promotional Card */}
      <div className="sidebar-card promo-card">
        <div className="promo-icon">🎓</div>
        <h3 className="promo-title">Master Korean Faster</h3>
        <p className="promo-description">
          Join our warm community of learners and discover why Korean language skills open doors to incredible opportunities in education, career, and cultural understanding. Let's embark on this exciting journey together!
        </p>
        <a 
          href="https://koreanwithus.netlify.app/courses" 
          target="_blank" 
          rel="noopener noreferrer"
          className="promo-button"
        >
          View Courses
        </a>
      </div>
    </aside>
  );
}

