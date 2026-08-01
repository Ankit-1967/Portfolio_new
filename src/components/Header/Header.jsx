import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Header.css';
import Icon from '../Icon/Icon';

function Header({ menuOpen, setMenuOpen, active, scrollTo, nav, theme, setTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);

    if (id === 'projects') {
      navigate('/projects');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      scrollTo(id);
    }
  };

  const isProjectsPage = location.pathname === '/projects';

  return (
    <>
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header className="site-header">
        <Link 
          className="logo" 
          to="/" 
          onClick={() => { 
            handleNavClick("home"); 
          }} 
          aria-label="Home"
        >
          <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {nav.map((id, index) => {
            const isActive = isProjectsPage ? id === 'projects' : active === id;
            const getHref = () => {
              if (id === 'home') return '/';
              if (id === 'projects') return '/projects';
              return `#${id}`;
            };

            return (
              <a
                key={id}
                className={isActive ? "active" : ""}
                href={getHref()}
                style={{ '--i': index }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(id);
                }}
              >
                {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <a 
            className="header-cta" 
            href="#contact" 
            onClick={(e) => { 
              e.preventDefault(); 
              handleNavClick("contact"); 
            }}
          >
            Let's talk <Icon name="arrow" />
          </a>
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span className="theme-orb">{theme === "dark" ? "☾" : "☼"}</span>
          </button>
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-expanded={menuOpen} 
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;