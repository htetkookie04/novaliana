import React, { useState, useEffect } from 'react';
import Breadcrumbs from './Breadcrumbs';
import WordDetailSidebar from './WordDetailSidebar';
import './WordDetail.css';

export default function WordDetail({ word, dictionary, darkMode, onNavigate, onToggleFavorite }) {
  const [wordData, setWordData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (word && dictionary) {
      const found = dictionary.find(w => w.korean === word);
      setWordData(found || null);
    }
  }, [word, dictionary]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        const favs = JSON.parse(saved);
        setFavorites(favs);
        setIsFavorite(favs.includes(word));
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }
  }, [word]);

  const handleToggleFavorite = () => {
    const newFav = !isFavorite;
    setIsFavorite(newFav);
    if (newFav) {
      const updated = [...favorites, word];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      const updated = favorites.filter(w => w !== word);
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
    if (onToggleFavorite) {
      onToggleFavorite(word, newFav);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${wordData?.korean} - K-M Dictionary`,
        text: `${wordData?.korean}: ${wordData?.myanmar}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleListen = () => {
    // This would integrate with a text-to-speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData?.korean);
      utterance.lang = 'ko-KR';
      speechSynthesis.speak(utterance);
    }
  };

  if (!wordData) {
    return (
      <div className="word-detail-page">
        <div className="word-detail-container">
          <div className="word-not-found">
            <h2>Word not found</h2>
            <button onClick={() => onNavigate('dictionary')} className="back-button">
              Back to Dictionary
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dictionary');
    } else {
      window.history.back();
    }
  };

  return (
    <div className="word-detail-page">
      <div className="word-detail-container">
        <button className="back-button-detail" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <Breadcrumbs word={wordData.korean} onNavigate={onNavigate} />

        <div className="word-detail-layout">
          {/* Main Content */}
          <div className="word-detail-main">
            {/* Word Header */}
            <div className="word-header-section">
              <div className="word-header-left">
                <h1 className="word-title">{wordData.korean}</h1>
                <div className="word-badges">
                  {wordData.pos && <span className="word-badge pos-badge">{wordData.pos}</span>}
                  {wordData.formality && <span className="word-badge formality-badge">{wordData.formality}</span>}
                </div>
                <p className="word-pronunciation">{wordData.pronunciation || `[${wordData.korean}]`}</p>
                <p className="word-myanmar-main">{wordData.myanmar}</p>
                <button className="listen-button" onClick={handleListen}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                  Listen
                </button>
              </div>
              <div className="word-header-actions">
                <button
                  className={`bookmark-button ${isFavorite ? 'active' : ''}`}
                  onClick={handleToggleFavorite}
                  aria-label="Bookmark"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button className="share-button" onClick={handleShare} aria-label="Share">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Definitions */}
            {wordData.definitions && wordData.definitions.length > 0 && (
              <section className="detail-section">
                <h2 className="section-title">
                  <span className="section-icon">📖</span>
                  Definitions
                </h2>
                <div className="definitions-list">
                  {wordData.definitions.map((def, index) => (
                    <div key={index} className="definition-item">
                      <p className="definition-meaning">{def.meaning}</p>
                      <p className="definition-english">{def.english}</p>
                      {def.example && (
                        <div className="definition-example">
                          <p className="example-korean">{def.example.korean}</p>
                          <p className="example-myanmar">{def.example.myanmar}</p>
                          <p className="example-english">{def.example.english}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Usage Examples */}
            {(wordData.usageExamples && wordData.usageExamples.length > 0) || wordData.koreanExample || wordData.englishExample ? (
              <section className="detail-section">
                <h2 className="section-title">
                  <span className="section-icon">💬</span>
                  Usage Examples
                </h2>
                <div className="usage-examples-list">
                  {wordData.usageExamples && wordData.usageExamples.map((example, index) => (
                    <div key={index} className="usage-example-item">
                      <p className="usage-korean">{example.korean}</p>
                      <p className="usage-myanmar">{example.myanmar}</p>
                      <p className="usage-english">{example.english}</p>
                    </div>
                  ))}
                  {wordData.koreanExample && (
                    <div className="usage-example-item">
                      <p className="usage-korean">{wordData.koreanExample}</p>
                      {wordData.englishExample && <p className="usage-english">{wordData.englishExample}</p>}
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* Synonyms */}
            {wordData.synonyms && wordData.synonyms.length > 0 && (
              <section className="detail-section">
                <h2 className="section-title">
                  <span className="section-icon">✓</span>
                  SYNONYMS
                </h2>
                <div className="tags-list">
                  {wordData.synonyms.map((synonym, index) => (
                    <button
                      key={index}
                      className="tag-button synonym-tag"
                      onClick={() => onNavigate && onNavigate('word', synonym)}
                    >
                      {synonym}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Antonyms */}
            {wordData.antonyms && wordData.antonyms.length > 0 && (
              <section className="detail-section">
                <h2 className="section-title">
                  <span className="section-icon">✗</span>
                  ANTONYMS
                </h2>
                <div className="tags-list">
                  {wordData.antonyms.map((antonym, index) => (
                    <button
                      key={index}
                      className="tag-button antonym-tag"
                      onClick={() => onNavigate && onNavigate('word', antonym)}
                    >
                      {antonym}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <WordDetailSidebar wordData={wordData} dictionary={dictionary} onNavigate={onNavigate} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

