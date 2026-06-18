import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/navData';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cross-page hash navigation
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (isHome) {
        // Already on home — scroll directly
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // On another page — navigate home first, then scroll after render
        navigate('/' + href);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle hash scroll when landing on home from another page
  useEffect(() => {
    if (isHome && location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isHome, location.hash]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container container">
          {isHome ? (
            <a href="#" className="navbar__logo" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              FORM<span className="navbar__logo-dot">.</span>
            </a>
          ) : (
            <Link to="/" className="navbar__logo" onClick={scrollToTop}>
              FORM<span className="navbar__logo-dot">.</span>
            </Link>
          )}

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('#') ? (
                  <a
                    href={link.href}
                    className="navbar__link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="navbar__link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Start a Project
          </a>

          <button
            className="navbar__toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith('#') ? (
                <a
                  href={link.href}
                  className="mobile-menu__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="mobile-menu__link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mobile-menu__cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Start a Project
        </a>
      </div>
    </>
  );
};

export default Navbar;