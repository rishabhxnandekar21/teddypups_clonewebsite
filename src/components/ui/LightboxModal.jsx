import { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './LightboxModal.module.css';

export default function LightboxModal({
  isOpen,
  photos = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Family photo viewer"
      onClick={handleBackdropClick}
    >
      {/* Top Header */}
      <div className={styles.header}>
        <p className={styles.counter}>
          {currentIndex + 1} / {photos.length}
        </p>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close photo viewer"
        >
          Close
        </button>
      </div>

      {/* Main Stage */}
      <div className={styles.stage} onClick={handleBackdropClick}>
        {/* Previous Button */}
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>

        {/* Photo & Caption */}
        <div className={styles.photoFrame}>
          <img
            src={currentPhoto?.image}
            alt={currentPhoto?.caption || 'Happy puppy family'}
            className={styles.mainPhoto}
          />
          {currentPhoto?.caption && (
            <p className={styles.photoCaption}>{currentPhoto.caption}</p>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
