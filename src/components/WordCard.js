import React from 'react';
import './WordCard.css';

export default function WordCard({ 
  korean, 
  myanmar,
  english,
  pos,
  level,
  category,
  koreanExample,
  englishExample,
  darkMode,
  language = 'KR-EN',
  onCardClick
}) {

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick({ korean, myanmar, english, pos, level, category, koreanExample, englishExample });
    }
  };

  return (
    <div 
      className="word-card-detailed"
      data-theme={darkMode ? 'dark' : 'light'}
      onClick={handleCardClick}
    >
      <div className="word-card-main">
        <div className="word-card-top">
          <div className="word-info-left">
            <h3 className="word-korean-detailed">{language === 'EN-KR' ? (english || korean) : korean}</h3>
            <div className="word-meta">
              {category && <span className="word-category">{category}</span>}
              {pos && <span className="word-pos">{pos}</span>}
              {level && <span className="word-level">{level}</span>}
            </div>
          </div>
          <div className="word-actions">
            <button className="arrow-btn" aria-label="View details">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="word-translations">
          {language === 'EN-KR' ? (
            <>
              <p className="word-myanmar-detailed">{korean}</p>
              {myanmar && <p className="word-english">{myanmar}</p>}
            </>
          ) : (
            <>
          <p className="word-myanmar-detailed">{myanmar}</p>
          {english && <p className="word-english">{english}</p>}
            </>
          )}
        </div>

        {(koreanExample || englishExample) && (
          <div className="word-examples">
            {koreanExample && (
              <div className="example-item">
                <span className="example-label">Korean:</span>
                <span className="example-text">{koreanExample}</span>
              </div>
            )}
            {englishExample && (
              <div className="example-item">
                <span className="example-label">English:</span>
                <span className="example-text">{englishExample}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
