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

    let rawTarget = (link.target || link.id || '').trim();
    if (!rawTarget) rawTarget = '/';

    // 1. External Links (http://, https://, mailto:, tel:)
    if (rawTarget.startsWith('http://') || rawTarget.startsWith('https://')) {
      window.open(rawTarget, '_blank', 'noreferrer,noopener');
      return;
    }
    if (rawTarget.startsWith('mailto:') || rawTarget.startsWith('tel:')) {
      window.location.href = rawTarget;
      return;
    }

    // 2. Direct Registered React Page Routes (/projects, /services, /admin)
    const validRoutes = ['/projects', '/services', '/admin'];
    const customPageRoutes = (pages || []).map(p => p.path);
    const registeredRoutes = [...validRoutes, ...customPageRoutes];

    if (registeredRoutes.includes(rawTarget)) {
      if (location.pathname === rawTarget) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(rawTarget);
      }
      return;
    }

    // 3. Section Anchor Targets (e.g. #about, /about, about, #skills, /skills, skills, #contact, contact)
    let cleanSectionId = rawTarget.replace(/^[/#]+/, ''); // removes leading / or #
    if (!cleanSectionId) cleanSectionId = 'home';

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (cleanSectionId === 'home' || cleanSectionId === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(cleanSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 180);
    } else {
      if (cleanSectionId === 'home' || cleanSectionId === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(cleanSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          scrollTo(cleanSectionId);
        }
      }
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
            const rawTarget = item.target || item.id || '';
            const cleanId = rawTarget.replace(/^[/#]+/, '');
            let isActive = active === cleanId || active === item.id;
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