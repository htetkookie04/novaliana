import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Dictionary from './components/Dictionary';
import WordDetail from './components/WordDetail';
import About from './components/About';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [dictionary, setDictionary] = useState([]);
  const [language, setLanguage] = useState('KR-EN'); // 'KR-EN' or 'EN-KR'

  // Load dictionary data
  useEffect(() => {
    fetch('/data/dictionary.json')
      .then((res) => res.json())
      .then((data) => setDictionary(data))
      .catch((err) => console.error('Error loading dictionary:', err));
  }, []);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    }
  }, []);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'KR-EN' ? 'EN-KR' : 'KR-EN';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Handle navigation
  const handleNavigation = (page, word = null) => {
    if (page === 'word' && word) {
      setSelectedWord(word);
      setCurrentPage('word');
    } else {
      setCurrentPage(page);
      setSelectedWord(null);
      if (page !== 'word') {
        setSearchQuery(''); // Clear search when navigating
      }
    }
  };

  // Handle search from home page
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('dictionary');
  };

  // Handle word click
  const handleWordClick = (wordData) => {
    if (wordData && wordData.korean) {
      handleNavigation('word', wordData.korean);
    }
  };

  return (
    <div className="app-container" data-theme={darkMode ? 'dark' : 'light'}>
      <Header 
        darkMode={darkMode} 
        onToggleTheme={toggleDarkMode}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      
      {currentPage === 'home' ? (
        <Home onSearch={handleSearch} darkMode={darkMode} />
      ) : currentPage === 'word' ? (
        <WordDetail
          word={selectedWord}
          dictionary={dictionary}
          darkMode={darkMode}
          onNavigate={handleNavigation}
        />
      ) : currentPage === 'about' ? (
        <About darkMode={darkMode} />
      ) : (
        <Dictionary
          initialSearch={searchQuery}
          darkMode={darkMode}
          onToggleTheme={toggleDarkMode}
          onWordClick={handleWordClick}
          language={language}
        />
      )}
    </div>
  );
}

export default App;
