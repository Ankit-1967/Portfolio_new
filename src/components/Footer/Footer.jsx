import React from 'react';
import './Footer.css';

function Footer({ scrollTo }) {
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
        <span>Frontend Developer · React & Shopify</span>
      </div>
    </footer>
  );
}

export default Footer;
