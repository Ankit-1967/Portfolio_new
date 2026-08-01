import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Header.css';
import Icon from '../Icon/Icon';

function Header({ menuOpen, setMenuOpen, active, scrollTo, nav, pages, homeSections, theme, setTheme }) {
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

  const handleNavClick = (id, targetPath) => {
    setMenuOpen(false);

    if (targetPath && targetPath.startsWith('/')) {
      if (location.pathname === targetPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(targetPath);
      }
      return;
    }

    if (id === 'projects') {
      navigate('/projects');
      return;
    }

    if (id === 'services') {
      navigate('/services');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      scrollTo(id);
    }
  };

  const isProjectsPage = location.pathname === '/projects';
  const isServicesPage = location.pathname === '/services';

  // Include base nav plus custom pages from pages prop if registered
  const customPages = (pages || []).filter(p => p.path !== '/' && p.path !== '/projects' && p.path !== '/services' && p.path !== '/admin' && p.status === 'Active');

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
            handleNavClick("home", "/"); 
          }} 
          aria-label="Home"
        >
          <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {nav.map((id, index) => {
            let isActive = active === id;
            if (isProjectsPage && id === 'projects') isActive = true;
            if (isServicesPage && id === 'services') isActive = true;

            const getHref = () => {
              if (id === 'home') return '/';
              if (id === 'projects') return '/projects';
              if (id === 'services') return '/services';
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
                  if (id === 'projects') handleNavClick(id, '/projects');
                  else if (id === 'services') handleNavClick(id, '/services');
                  else handleNavClick(id);
                }}
              >
                {id === "home" ? "Home" : id[0].toUpperCase() + id.slice(1)}
              </a>
            );
          })}

          {customPages.map((cp, idx) => {
            const isActive = location.pathname === cp.path;
            return (
              <a
                key={cp.id || cp.path}
                className={isActive ? "active" : ""}
                href={cp.path}
                style={{ '--i': nav.length + idx }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(cp.id, cp.path);
                }}
              >
                {cp.name}
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