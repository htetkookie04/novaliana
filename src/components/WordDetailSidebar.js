import React from 'react';
import './WordDetailSidebar.css';

export default function WordDetailSidebar({ wordData, dictionary, onNavigate, darkMode }) {
  return (
    <aside className="word-detail-sidebar">
      {/* Promotional Card */}
      <div className="sidebar-card-detail promo-card">
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

