import React, { useEffect } from 'react';
import './Header.css';
import Icon from '../Icon/Icon';

function Header({ menuOpen, setMenuOpen, active, scrollTo, nav, theme, setTheme }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header className="site-header">
        <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); setMenuOpen(false); }} aria-label="Home">
          <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
        </a>

        <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {nav.map((id, index) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
              style={{ '--i': index }}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollTo(id);
              }}
            >
              {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); setMenuOpen(false); }}>Let's talk <Icon name="arrow" /></a>
          <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            <span className="theme-orb">{theme === "dark" ? "☾" : "☼"}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
      </header>
    </>
  );
}

export default Header;