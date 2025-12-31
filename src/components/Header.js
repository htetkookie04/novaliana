import React from 'react';
import './Header.css';
import novalianaLogo from '../image/novaliana.jpg';

export default function Header({ darkMode, onToggleTheme, currentPage, onNavigate }) {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section" onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>
          <img src={novalianaLogo} alt="Novaliana Logo" className="logo-image" />
          <span className="logo-text">Novaliana Dictionary</span>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <button 
            onClick={() => onNavigate && onNavigate('home')} 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('dictionary')} 
            className={`nav-link ${currentPage === 'dictionary' || currentPage === 'word' ? 'active' : ''}`}
          >
            Dictionary
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('about')} 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          >
            About Us
          </button>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button 
            className="theme-toggle-btn" 
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              // Sun icon for light mode (when in dark mode)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              // Moon icon for dark mode (when in light mode)
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

