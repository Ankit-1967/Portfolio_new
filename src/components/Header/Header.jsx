import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Header.css';
import Icon from '../Icon/Icon';

function Header({ menuOpen, setMenuOpen, active, scrollTo, navLinks, pages, theme, setTheme }) {
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

  const defaultNavLinks = [
    { id: 'home', label: 'Home', target: '/', visible: true },
    { id: 'about', label: 'About', target: '#about', visible: true },
    { id: 'skills', label: 'Skills', target: '#skills', visible: true },
    { id: 'projects', label: 'Projects', target: '/projects', visible: true },
    { id: 'experience', label: 'Experience', target: '#experience', visible: true },
    { id: 'services', label: 'Services', target: '/services', visible: true },
    { id: 'contact', label: 'Contact', target: '#contact', visible: true }
  ];

  const activeNavLinks = (navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks).filter(link => link.visible !== false);

  const handleNavClick = (link) => {
    setMenuOpen(false);

    const { id, target } = link;

    if (target && target.startsWith('/')) {
      if (location.pathname === target) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(target);
      }
      return;
    }

    const sectionId = target ? target.replace('#', '') : id;

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'home' || sectionId === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      scrollTo(sectionId);
    }
  };

  const isProjectsPage = location.pathname === '/projects';
  const isServicesPage = location.pathname === '/services';

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
            handleNavClick({ id: 'home', target: '/' }); 
          }} 
          aria-label="Home"
        >
          <span className="logo-mark">A</span><span>Ankit<span className="accent">.</span></span>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {activeNavLinks.map((item, index) => {
            const sectionId = item.target ? item.target.replace('#', '') : item.id;
            let isActive = active === sectionId || active === item.id;
            if (isProjectsPage && (item.target === '/projects' || item.id === 'projects')) isActive = true;
            if (isServicesPage && (item.target === '/services' || item.id === 'services')) isActive = true;
            if (location.pathname === item.target) isActive = true;

            return (
              <a
                key={item.id || index}
                className={isActive ? "active" : ""}
                href={item.target || `#${item.id}`}
                style={{ '--i': index }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
              >
                {item.label}
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
              handleNavClick({ id: 'contact', target: '#contact' }); 
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