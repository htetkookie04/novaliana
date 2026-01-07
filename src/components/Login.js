import React, { useState, useEffect } from 'react';
import './Login.css';

// Predefined accounts stored as an array
const PREDEFINED_ACCOUNTS = [
  { username: 'novalianaadmin', password: '3112004' },
  { username: 'koreanwithusstudent', password: 'kws@student' },
  { username: 'novalianadictionary', password: 'dictionary@nova' }
];

export default function Login({ darkMode, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Clear fields when component mounts (e.g., after logout)
  useEffect(() => {
    setUsername('');
    setPassword('');
    setMessage('');
    setMessageType('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    // Check if username and password are provided
    if (!username.trim() || !password.trim()) {
      setMessage('Please enter both username and password');
      setMessageType('error');
      return;
    }

    // Check credentials against predefined accounts
    const account = PREDEFINED_ACCOUNTS.find(
      (acc) => acc.username === username.trim() && acc.password === password.trim()
    );

    if (account) {
      // Login successful
      setMessage('Login Successful');
      setMessageType('success');
      
      // Call the success callback after a short delay
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(username);
        }
      }, 1000);
    } else {
      // Login failed
      setMessage('Invalid username or password');
      setMessageType('error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Novaliana</h1>
            <p className="login-subtitle">Log in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // Eye open icon (password visible)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    // Eye closed icon (password hidden)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

