import React from 'react';
import './FeatureCards.css';

export default function FeatureCards() {
  const features = [
    {
      id: 1,
      icon: '📖',
      title: 'Comprehensive',
      description: 'Over 50,000 words covering daily life, academic terms, and slang.',
    },
    {
      id: 2,
      icon: '🔊',
      title: 'Pronunciation',
      description: 'Audio pronunciations for both Korean and Myanmar words by native speakers.',
    },
    {
      id: 3,
      icon: '📝',
      title: 'Examples',
      description: 'Real-world sentence examples to help you understand context and usage.',
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

