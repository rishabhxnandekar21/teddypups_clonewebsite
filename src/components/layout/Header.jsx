import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { MessageCircle, Phone, X } from 'lucide-react';
import { navLinks, BUSINESS } from '../../data/navigation.js';
import PawIcon from '../common/PawIcon.jsx';
import ScallopHem from '../common/ScallopHem.jsx';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className={styles.headerWrapper}>
        <header className={styles.header} id="site-header">
          <div className={styles.header__inner}>
            {/* Logo */}
            <Link to="/" className={styles.header__logo}>
              <img
                src="/brand/logo.png"
                alt="TeddyPups UAE logo"
                className={styles.header__logoImg}
                width={44}
                height={44}
              />
              <span className={styles.header__logoText}>TeddyPups</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.header__nav} aria-label="Main navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    [styles.header__navLink, isActive ? styles.active : ''].join(' ').trim()
                  }
                >
                  <span>{link.label}</span>
                  <span className={styles.header__navPaw} aria-hidden="true">
                    <PawIcon size={12} color="var(--color-toffee)" />
                  </span>
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className={styles.header__actions}>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-whatsapp btn-sm ${styles.header__cta}`}
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp us
              </a>

              <button
                className={styles.header__menuBtn}
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
              >
                <PawIcon size={16} color="var(--color-toffee)" />
                <span>Menu</span>
              </button>
            </div>
          </div>

          {/* Scalloped hem beneath the header */}
          <div className={styles.scallopBar}>
            <ScallopHem color="var(--color-milk)" height={14} />
          </div>
        </header>
      </div>

      {/* Honey Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className={styles.mobileMenu__head}>
            <span className={styles.mobileMenu__tagline}>where to, friend?</span>
            <button
              className={styles.mobileMenu__closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={16} aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <nav className={styles.mobileMenu__nav} aria-label="Mobile navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  [styles.mobileMenu__link, isActive ? styles.active : ''].join(' ').trim()
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && <PawIcon size={24} color="var(--color-toffee)" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileMenu__footer}>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ width: '100%' }}
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp us
            </a>
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className={styles.mobileMenu__phone}>
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Bar */}
      <aside className={styles.bottomBar} aria-label="Quick contact actions">
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-whatsapp btn-sm ${styles.bottomBar__whatsapp}`}
        >
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp us
        </a>
        <a
          href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
          className={`btn btn-outline btn-sm ${styles.bottomBar__call}`}
          aria-label="Call TeddyPups"
        >
          <Phone size={15} aria-hidden="true" />
          Call
        </a>
      </aside>
    </>
  );
}
