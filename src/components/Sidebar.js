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
        ကိုရီးယားအတန်းများကို အတွေ့အကြုံရှိတဲ့ ကိုရီးယားဆရာများနှင့် သင်ယူလိုပြီး ယုံကြည်မှုရှိရှိနဲ့ ကိုရီးယားစကားပြောတတ်ချင်ပါသလား ?</p>
        <a 
          href="https://koreanwithus.netlify.app/courses" 
          target="_blank" 
          rel="noopener noreferrer"
          className="promo-button"
        >
          ကြည့်ရှု့ရန်နှိပ်ပါ
        </a>
      </div>

      {/* Contact Us Card */}
      <div className="sidebar-card contact-card">
        <h3 className="contact-title">ဆက်သွယ်ရန်</h3>
        <div className="contact-info">
          <a href="tel:+959774677855" className="contact-item">
            <i className="fas fa-phone contact-icon"></i>
            <span>+959 774 677 855</span>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hangulwithus@gmail.com" className="contact-item">
            <i className="fas fa-envelope contact-icon"></i>
            <span>hangulwithus@gmail.com</span>
          </a>
          <a 
            href="https://koreanwithus.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-item"
          >
            <i className="fas fa-globe contact-icon"></i>
            <span>koreanwithus.netlify.app</span>
          </a>
        </div>
        <div className="social-media">
          <a 
            href="https://www.facebook.com/share/17BJs4SwuG/?mibextid=wwXIfr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon facebook"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a 
            href="https://www.tiktok.com/@korean.with.us?_r=1&_t=ZS-92qBc3XsJJh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon tiktok"
            aria-label="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a 
            href="https://t.me/naryaal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon telegram"
            aria-label="Telegram"
          >
            <i className="fab fa-telegram-plane"></i>
          </a>
        </div>
      </div>
    </aside>
  );
}

