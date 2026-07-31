import React from 'react';
import './Footer.css';

function Footer({ scrollTo, onOpenAdmin }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
          <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
        </a>
        <p>Designed & built with React, CSS and curiosity.</p>
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>Back to top ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Ankit Thakur</span>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Frontend Developer · React & Shopify</span>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'transparent',
                border: '1px dashed var(--line)',
                color: 'var(--accent)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.65rem',
                cursor: 'pointer'
              }}
            >
              ⚙ Admin Panel
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
