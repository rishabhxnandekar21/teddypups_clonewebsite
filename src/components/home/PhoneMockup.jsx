import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { BUSINESS } from '../../data/navigation.js';
import styles from './PhoneMockup.module.css';

const BREEDS = [
  { label: 'Maltipoo', slug: 'maltipoo' },
  { label: 'Pomeranian', slug: 'pomeranian' },
  { label: 'Poodle', slug: 'poodle' },
  { label: 'Cavapoo', slug: 'cavapoo' },
  { label: 'Shih Tzu', slug: 'shih-tzu' },
];

export default function PhoneMockup({ activeStep = 0, onSelectBreed }) {
  const [isTyping, setIsTyping] = useState(false);

  // Trigger typing indicator momentarily when switching steps
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 650);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className={styles.phoneWrapper}>
      <div
        className={styles.phone}
        aria-label="A WhatsApp conversation with TeddyPups U.A.E."
        role="group"
      >
        {/* Top Header Bar */}
        <div className={styles.phoneBar}>
          <img
            src="/brand/logo.png"
            alt="TeddyPups Logo"
            className={styles.phoneAvatar}
            width={40}
            height={40}
          />
          <div className={styles.phoneBarInfo}>
            <span className={styles.phoneName}>TeddyPups U.A.E.</span>
            <span className={styles.phoneStatus}>
              <span className={styles.onlineDot} />
              online
            </span>
          </div>
        </div>

        {/* WhatsApp Chat Screen */}
        <div className={styles.phoneScreen}>
          {/* Default user greeting message */}
          <p className={`${styles.msg} ${styles.msgMe}`}>
            Hi TeddyPups! I'd love to know more about your puppies.
          </p>

          {/* Step 0: Choose your breed */}
          {activeStep === 0 && (
            <div className={styles.msgGroup} data-step="0">
              <div className={`${styles.msg} ${styles.msgThem}`}>
                <p>
                  Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                </p>
                <ul className={styles.chips} aria-label="Breeds we have now">
                  {BREEDS.map(breed => (
                    <li key={breed.slug}>
                      <Link
                        to={`/puppies?breed=${breed.slug}`}
                        className={styles.chipLink}
                        onClick={() => onSelectBreed && onSelectBreed(breed.slug)}
                      >
                        {breed.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step 1: Photos & details */}
          {activeStep === 1 && (
            <div className={styles.msgGroup} data-step="1">
              <div className={`${styles.msg} ${styles.msgThem} ${styles.msgMedia}`}>
                <div className={styles.snaps}>
                  <img
                    src="/media/maltipoo-max-male.webp"
                    alt="A tiny apricot puppy held in our Dubai showroom"
                    className={styles.snapImg}
                  />
                  <img
                    src="/media/pomeranian-female.jpg"
                    alt="Pomeranian puppy close up"
                    className={styles.snapImg}
                  />
                </div>
                <div className={styles.videoBanner}>
                  <Play size={14} fill="currentColor" aria-hidden="true" />
                  <span>2 video clips + passport records</span>
                </div>
              </div>
              <p className={`${styles.msg} ${styles.msgThem}`}>
                Here are high-definition video reports of Max and Luna, complete with their current vet checks and parents’ pedigree!
              </p>
            </div>
          )}

          {/* Step 2: Delivery & handover */}
          {activeStep === 2 && (
            <div className={styles.msgGroup} data-step="2">
              <div className={`${styles.msg} ${styles.msgThem}`}>
                <p>
                  Your puppy is ready! Would you prefer visiting our Downtown Dubai showroom for cuddle time, or home delivery with our climate-controlled chauffeur?
                </p>
              </div>
              <p className={`${styles.msg} ${styles.msgMe}`}>
                We'd love to visit the showroom this weekend!
              </p>
              <p className={`${styles.msg} ${styles.msgThem}`}>
                Reserved for you! VIP suite booked with puppy care package included ♥
              </p>
            </div>
          )}

          {/* Animated typing indicator */}
          {isTyping && (
            <div className={styles.typing} aria-label="TeddyPups is typing…">
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          )}
        </div>

        {/* WhatsApp Compose Link */}
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.phoneCompose}
          aria-label="Reply to TeddyPups on WhatsApp"
        >
          <span>Reply on WhatsApp…</span>
          <div className={styles.sendBtn} aria-hidden="true">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}
