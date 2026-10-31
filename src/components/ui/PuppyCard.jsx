import { Link } from 'react-router-dom';
import { MessageCircle, Video } from 'lucide-react';
import PawIcon from '../common/PawIcon.jsx';
import styles from './PuppyCard.module.css';

export default function PuppyCard({ puppy }) {
  const whatsappInquiryUrl = `https://wa.me/971541676733?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}). Could you please share more details?`
  )}`;

  return (
    <article className={styles.card} aria-labelledby={`pup-title-${puppy.slug}`}>
      {/* Image & Badges */}
      <div className={styles.mediaContainer}>
        <img
          src={puppy.images[0] || '/media/maltipoo-max-male.webp'}
          alt={`${puppy.name}, ${puppy.breed} puppy`}
          className={styles.image}
          loading="lazy"
          width={400}
          height={300}
        />

        {/* Origin Badge */}
        <div className={styles.badgeTopLeft}>
          <span
            className={`${styles.originBadge} ${
              puppy.origin === 'local' ? styles.originBadgeLocal : styles.originBadgeImported
            }`}
          >
            {puppy.origin === 'local' ? 'In Dubai' : 'Imported'}
          </span>
        </div>

        {/* Video Badge */}
        {puppy.hasVideo && (
          <div className={styles.badgeTopRight}>
            <span className={styles.videoBadge}>
              <Video size={13} aria-hidden="true" />
              <span>▶ video</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.name} id={`pup-title-${puppy.slug}`}>
            <Link to={`/puppies/${puppy.slug}`} className={styles.nameLink}>
              {puppy.name}
            </Link>
          </h3>
        </div>

        <p className={styles.breed}>{puppy.breed}</p>

        {/* Specs tags */}
        <div className={styles.specs}>
          <span className={styles.chip}>
            <PawIcon size={12} color="var(--color-toffee)" />
            {puppy.genderLabel || (puppy.gender === 'male' ? 'Boy' : 'Girl')}
          </span>
          <span className={styles.chip}>{puppy.age || `${puppy.ageWeeks} wks`}</span>
          <span className={styles.chip}>🐾 Available</span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Link to={`/puppies/${puppy.slug}`} className={`btn btn-outline btn-sm ${styles.btnSecondary}`}>
            View profile
          </Link>
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-whatsapp btn-sm ${styles.btnPrimary}`}
            aria-label={`Ask about ${puppy.name} on WhatsApp`}
          >
            <MessageCircle size={15} aria-hidden="true" />
            Ask
          </a>
        </div>
      </div>
    </article>
  );
}
