import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { footerNavLinks, BUSINESS } from '../../data/navigation.js';
import ScallopHem from '../common/ScallopHem.jsx';
import styles from './Footer.module.css';

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
  const year = 2026;

  return (
    <footer className={styles.footer}>
      {/* Top scalloped hem transition */}
      <div className={styles.scallopTop}>
        <ScallopHem color="var(--color-night)" height={14} inverted={true} />
      </div>

      <div className={styles.footer__inner}>
        {/* Brand Column */}
        <div className={styles.footer__brand}>
          <Link to="/" className={styles.footer__logo}>
            <img
              src="/brand/logo.png"
              alt="TeddyPups UAE logo"
              className={styles.footer__logoImg}
              width={44}
              height={44}
            />
            <span className={styles.footer__logoText}>TeddyPups</span>
          </Link>
          <p className={styles.footer__tagline}>every puppy is family</p>
          <p className={styles.footer__desc}>
            Premium designer teacup & miniature puppies raised with love and certified veterinary care in Dubai, UAE.
          </p>
          <div className={styles.footer__social}>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__socialLink}
              aria-label="TeddyPups on Instagram"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__socialLink}
              aria-label="TeddyPups on TikTok"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__socialLink}
              aria-label="TeddyPups on Facebook"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        {/* Explore Navigation */}
        <div>
          <p className={styles.footer__colHeading}>Explore</p>
          <nav className={styles.footer__nav} aria-label="Footer explore links">
            {footerNavLinks.map(link => (
              <Link key={link.href} to={link.href} className={styles.footer__navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Column */}
        <div>
          <p className={styles.footer__colHeading}>Get in Touch</p>
          <address className={styles.footer__contact}>
            <div className={styles.footer__contactItem}>
              <Phone size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}>{BUSINESS.phone}</a>
            </div>
            <div className={styles.footer__contactItem}>
              <Mail size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
            <div className={styles.footer__contactItem}>
              <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <span>{BUSINESS.address}</span>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className={styles.footer__bottom}>
        <p className={styles.footer__copy}>
          &copy; {year} {BUSINESS.name} All rights reserved.
        </p>
        <p className={styles.footer__copy}>Downtown Dubai, United Arab Emirates</p>
      </div>
    </footer>
  );
}
