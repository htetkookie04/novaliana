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
        ကိုရီးယားအတန်းများကို အတွေ့အကြုံရှိတဲ့ ကိုရီးယားဆရာများနှင့် သင်ယူလိုပြီး ယုံကြည်မှုရှိရှိနဲ့ ကိုရီးယားစကားပြောတတ်ချင်ပါသလား ?
        </p>
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
      <div className="sidebar-card-detail contact-card">
        <h3 className="contact-title">ဆက်သွယ်ရန်</h3>
        <div className="contact-info">
          <a href="tel:+959774677855" className="contact-item">
            <i className="fas fa-phone contact-icon"></i>
            <span>+959 774 677 855</span>
          </a>
          <a href="hangulwithus@gmail.com" className="contact-item">
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
            href="@naryaal" 
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

