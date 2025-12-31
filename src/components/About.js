import React from 'react';
import './About.css';
import kookieImage from '../image/Kookie.png';

export default function About({ darkMode }) {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bridging Korea and Myanmar</h1>
          <p className="hero-subtitle">
            We are building the ultimate dictionary tool for students, workers, and travelers. 
            Breaking language barriers one word at a time to foster deeper connection.
          </p>
          <a 
            href="https://koreanwithus.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-button"
          >
            Our Website
          </a>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="statistics-container">
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <p className="stat-label">Words Defined</p>
            <p className="stat-value">50,000+</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <p className="stat-label">Daily Searches</p>
            <p className="stat-value">12,000</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <p className="stat-label">Active Users</p>
            <p className="stat-value">25,000+</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <p className="stat-label">Years Online</p>
            <p className="stat-value">3</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-header">
            <span className="mission-label">OUR MISSION</span>
            <h2 className="mission-title">Why We Built This</h2>
            <p className="mission-description">
              Our goal is to foster better communication and understanding between Korean and Myanmar 
              communities through accurate and accessible language tools. We believe that language is 
              the key to opportunity.
            </p>
          </div>

          <div className="mission-cards">
            <div className="mission-card">
              <div className="mission-card-icon">✓</div>
              <h3 className="mission-card-title">Accuracy First</h3>
              <p className="mission-card-text">
                Verified definitions by linguistic experts from both countries to ensure every 
                translation is culturally correct.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-card-icon">👥</div>
              <h3 className="mission-card-title">Community Driven</h3>
              <p className="mission-card-text">
                Constantly updated with suggestions from our active user base. You help us grow 
                the database daily.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-card-icon">🎓</div>
              <h3 className="mission-card-title">Accessible Education</h3>
              <p className="mission-card-text">
                Free for everyone, forever. We believe that quality education should have no 
                financial barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="team-title">Meet the Team</h2>
          <p className="team-intro">
            The passionate developers and linguists working behind the scenes to bring you the 
            best Korean-Myanmar dictionary.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">
                <img src={kookieImage} alt="Htet Myat Linn(Naryaal)"  />
              </div>  
              <h3 className="team-name">Htet Myat Linn(Naryaal)</h3>
              <p className="team-role">Founder, Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to start learning?</h2>
          </div>
          <div className="cta-buttons">
            <a 
              href="https://koreanwithus.netlify.app/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button-secondary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
