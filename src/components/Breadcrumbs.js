import React from 'react';
import './Breadcrumbs.css';

export default function Breadcrumbs({ word, onNavigate }) {
  return (
    <nav className="breadcrumbs">
      <button onClick={() => onNavigate('home')} className="breadcrumb-link">Home</button>
      <span className="breadcrumb-separator">›</span>
      <button onClick={() => onNavigate('dictionary')} className="breadcrumb-link">Korean</button>
      <span className="breadcrumb-separator">›</span>
      <span className="breadcrumb-current">{word}</span>
    </nav>
  );
}

