import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import MascotPup from '../common/MascotPup.jsx';
import { footerNavLinks, BUSINESS } from '../../data/navigation.js';
import styles from './Footer.module.css';

const STARS = [
  { left: '6%', top: '18%', width: 12.6, delay: '0.00s' },
  { left: '14%', top: '42%', width: 8.4, delay: '0.40s' },
  { left: '23%', top: '12%', width: 9.8, delay: '0.80s' },
  { left: '31%', top: '30%', width: 7.0, delay: '1.20s' },
  { left: '44%', top: '9%', width: 11.2, delay: '1.60s' },
  { left: '52%', top: '36%', width: 7.7, delay: '2.00s' },
  { left: '63%', top: '15%', width: 10.5, delay: '2.40s' },
  { left: '71%', top: '40%', width: 7.0, delay: '2.80s' },
  { left: '92%', top: '33%', width: 8.4, delay: '3.20s' },
];

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
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        TeddyPups UAE Footer
      </h2>

      {/* Top Rolling Hill Contour Boundary */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={styles.footerHill}
      >
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>

      {/* Starry Night Sky Canvas with Twinkling Stars and Crescent Moon */}
      <div aria-hidden="true" className={styles.skyCanvas}>
        {STARS.map((star, idx) => (
          <svg
            key={idx}
            viewBox="0 0 40 40"
            className={styles.star}
            style={{
              left: star.left,
              top: star.top,
              width: `${star.width}px`,
              animationDelay: star.delay,
            }}
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}
        <span className={styles.moon} />
      </div>

      <div className={styles.footerInner}>
        {/* Brand & Mascot in 3-Layer Woven Wicker Basket */}
        <div className={styles.basketCol}>
          <p className={styles.homeAtLast}>Home, at last.</p>
          <p className={styles.brandDesc}>
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>

          {/* 3-Layer Woven Wicker Basket */}
          <div className={styles.basket}>
            {/* 1. Back Basket SVG */}
            <svg aria-hidden="true" viewBox="0 0 300 240" className={styles.basketBack}>
              <ellipse cx="212" cy="145" rx="96" ry="12" className={styles.basketHollow} />
              <path d="M116 145 A96 12 0 0 1 308 145" className={styles.basketRimLine} />
              <path d="M116 145 A96 12 0 0 1 308 145" className={styles.basketRim} />
            </svg>

            {/* 2. Middle Mascot Layer: Snug in Basket */}
            <div className={styles.basketPup}>
              <MascotPup
                pose="snug"
                facing="right"
                ariaLabel="Teddy resting snug in his wicker basket"
              />
            </div>

            {/* 3. Front Basket Weave SVG */}
            <svg aria-hidden="true" viewBox="0 0 300 240" className={styles.basketFront}>
              <path
                d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z"
                className={styles.basketBody}
              />
              <path
                d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206"
                className={styles.basketWeave}
              />
              <path
                d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230"
                className={`${styles.basketWeave} ${styles.basketWeaveStakes}`}
              />
              <path d="M116 145 A96 12 0 0 0 308 145" className={styles.basketRimLine} />
              <path d="M116 145 A96 12 0 0 0 308 145" className={styles.basketRim} />
            </svg>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <p className={styles.colHeading}>Explore</p>
          <nav className={styles.nav} aria-label="Footer navigation">
            {footerNavLinks.map((link) => (
              <Link key={link.href} to={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Information & Socials */}
        <div>
          <p className={styles.colHeading}>Get in Touch</p>
          <address className={styles.contact}>
            <div className={styles.contactItem}>
              <Phone size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}>{BUSINESS.phone}</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
              <span>{BUSINESS.address}</span>
            </div>
          </address>

          <div className={styles.socialRow}>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="TeddyPups on Instagram"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="TeddyPups on TikTok"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="TeddyPups on Facebook"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className={styles.footerInner}>
        <div className={styles.bottom} style={{ width: '100%' }}>
          <p>&copy; {year} {BUSINESS.name}. All rights reserved.</p>
          <p>Downtown Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}
