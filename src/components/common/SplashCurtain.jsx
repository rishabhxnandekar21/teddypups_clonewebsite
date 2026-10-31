import { useState, useEffect } from 'react';
import PawIcon from './PawIcon.jsx';
import styles from './SplashCurtain.module.css';

export default function SplashCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only run splash on fresh session or let it fade out after 1.8 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.curtain} ${!visible ? styles.curtainHidden : ''}`}
      aria-hidden={!visible}
    >
      <div className={styles.pupContainer}>
        {/* Animated cute puppy illustration */}
        <svg
          className={styles.pupMascot}
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ears */}
          <ellipse cx="25" cy="38" rx="14" ry="24" fill="#c2622b" transform="rotate(-15 25 38)" />
          <ellipse cx="75" cy="38" rx="14" ry="24" fill="#c2622b" transform="rotate(15 75 38)" />
          {/* Head */}
          <circle cx="50" cy="50" r="34" fill="#f2be6b" />
          {/* Muzzle */}
          <ellipse cx="50" cy="58" rx="16" ry="12" fill="#fffdf8" />
          {/* Nose */}
          <ellipse cx="50" cy="53" rx="5" ry="3.5" fill="#2a170e" />
          {/* Mouth */}
          <path d="M47 57 Q50 62 53 57" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Eyes */}
          <circle cx="39" cy="45" r="4.5" fill="#2a170e" />
          <circle cx="41" cy="43.5" r="1.5" fill="#ffffff" />
          <circle cx="61" cy="45" r="4.5" fill="#2a170e" />
          <circle cx="63" cy="43.5" r="1.5" fill="#ffffff" />
          {/* Cheeks */}
          <circle cx="33" cy="54" r="5" fill="#f9cdbf" opacity="0.6" />
          <circle cx="67" cy="54" r="5" fill="#f9cdbf" opacity="0.6" />
        </svg>
      </div>

      <div className={styles.pawsRow}>
        <span className={styles.pawPrint}><PawIcon size={18} /></span>
        <span className={styles.pawPrint}><PawIcon size={20} /></span>
        <span className={styles.pawPrint}><PawIcon size={18} /></span>
      </div>

      <p className={styles.slogan}>every puppy is family</p>
      <span className={styles.brandName}>TeddyPups UAE</span>
    </div>
  );
}
