import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { navLinks, BUSINESS } from '../../data/navigation.js';
import styles from './Header.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          {/* Logo */}
          <Link to="/" className={styles.header__logo} onClick={closeMenu}>
            <img src="/brand/logo.png" alt="TeddyPups UAE logo" width={40} height={40} />
            <span className={styles['header__logo-text']}>TeddyPups</span>
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.header__nav} aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  [styles['header__nav-link'], isActive ? styles.active : ''].join(' ').trim()
                }
              >
                {link.label}
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
              WhatsApp Us
            </a>
            <button
              className={styles['header__menu-btn']}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={styles['mobile-menu']}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className={styles['mobile-menu__header']}>
            <Link to="/" className={styles.header__logo} onClick={closeMenu}>
              <img src="/brand/logo.png" alt="TeddyPups UAE logo" width={40} height={40} />
              <span className={styles['header__logo-text']}>TeddyPups</span>
            </Link>
            <button
              className={styles['header__menu-btn']}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav className={styles['mobile-menu__nav']} aria-label="Mobile navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  [styles['mobile-menu__link'], isActive ? styles.active : '']
                    .join(' ')
                    .trim()
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles['mobile-menu__footer']}>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              onClick={closeMenu}
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
