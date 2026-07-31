import React from 'react'
import './Header.css'
import Icon from '../Icon/Icon'
function Header({ menuOpen, setMenuOpen, active, scrollTo, nav, theme, setTheme }) {
  return (
    <header className="site-header">
      <a className="logo" href="#home" onClick={() => scrollTo("home")} aria-label="Home">
        <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
      </a>

      <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        {nav.map(id => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}</a>)}
      </nav>

      <div className="header-actions">
        <a className="header-cta" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Let's talk <Icon name="arrow" /></a>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          <span className="theme-orb">{theme === "dark" ? "☾" : "☼"}</span>
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><Icon name={menuOpen ? "close" : "menu"} /></button>
      </div>
    </header>
  )
}

export default Header