import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Twitter, Instagram, Linkedin, Dribbble } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" onClick={scrollToTop}>
              FORM<span className="footer__logo-dot">.</span>
            </Link>
            <p className="footer__tagline">
              Bold design for brands that refuse to blend in.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer__social" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="footer__social" aria-label="Dribbble">
                <Dribbble size={20} />
              </a>
            </div>
          </div>

          <div className="footer__columns">
            <div className="footer__column">
              <h4 className="footer__column-title">Studio</h4>
              <ul className="footer__column-links">
                <li><Link to="/#about">About</Link></li>
                <li><Link to="/#team">Team</Link></li>
                <li><Link to="/#process">Process</Link></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Services</h4>
              <ul className="footer__column-links">
                <li><Link to="/#services">Branding</Link></li>
                <li><Link to="/#services">Web Design</Link></li>
                <li><Link to="/#services">Packaging</Link></li>
                <li><Link to="/#services">Motion</Link></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Connect</h4>
              <ul className="footer__column-links">
                <li><Link to="/#contact">Contact</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><a href="#">Newsletter</a></li>
                <li><a href="#">Press Kit</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">© 2024 FORM Studio. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <button className="footer__back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
