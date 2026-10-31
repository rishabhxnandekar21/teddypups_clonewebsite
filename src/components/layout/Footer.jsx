import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { navLinks, BUSINESS } from '../../data/navigation.js';
import styles from './Footer.module.css';

// Simple TikTok icon (not in Lucide)
function TikTokIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
    </svg>
  );
}

// Simple Facebook icon
function FacebookIcon({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        {/* Brand column */}
        <div className={styles.footer__brand}>
          <Link to="/" className={styles.footer__logo}>
            <img src="/brand/logo.png" alt="TeddyPups UAE logo" width={36} height={36} />
            <span className={styles['footer__logo-text']}>TeddyPups</span>
          </Link>
          <p className={styles.footer__tagline}>
            Premium designer puppies lovingly raised in Dubai, UAE.
          </p>
          <div className={styles.footer__social}>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['footer__social-link']}
              aria-label="TeddyPups on Instagram"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['footer__social-link']}
              aria-label="TeddyPups on TikTok"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles['footer__social-link']}
              aria-label="TeddyPups on Facebook"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p className={styles['footer__col-heading']}>Explore</p>
          <nav className={styles.footer__nav} aria-label="Footer navigation">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} className={styles['footer__nav-link']}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact column */}
        <div>
          <p className={styles['footer__col-heading']}>Get in Touch</p>
          <address className={styles.footer__contact} style={{ fontStyle: 'normal' }}>
            <div className={styles['footer__contact-item']}>
              <Phone size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}>{BUSINESS.phone}</a>
            </div>
            <div className={styles['footer__contact-item']}>
              <Mail size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
            <div className={styles['footer__contact-item']}>
              <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <span>{BUSINESS.address}</span>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footer__bottom}>
        <p className={styles.footer__copy}>
          &copy; {year} TeddyPups UAE. All rights reserved.
        </p>
        <p className={styles.footer__copy}>Downtown Dubai, UAE</p>
      </div>
    </footer>
  );
}
