import { Link } from 'react-router-dom';
import styles from './BoardingTicket.module.css';

export default function BoardingTicket({ alumnus, index = 0, tilt = 0 }) {
  const genderLabel = alumnus.gender === 'male' ? 'boy' : alumnus.gender === 'female' ? 'girl' : alumnus.gender;
  const targetHref = alumnus.slug ? `/puppies/${alumnus.slug}` : `/puppies`;

  return (
    <li
      className={styles.ticket}
      style={{
        '--tilt': `${tilt}deg`,
        '--i': index,
      }}
    >
      <Link
        to={targetHref}
        className={styles.ticketLink}
        aria-label={`View boarding pass for ${alumnus.name}, ${alumnus.breed} ${genderLabel}`}
      >
        {/* Main Ticket Section */}
        <span className={styles.ticketMain}>
          <span className={styles.ticketPhoto}>
            <img
              src={alumnus.image}
              alt={`${alumnus.name}, ${genderLabel} ${alumnus.breed} puppy`}
              loading="lazy"
              decoding="async"
              width={100}
              height={100}
            />
          </span>

          <span className={styles.ticketBody}>
            <span className={styles.ticketKicker}>one ticket home</span>
            <span className={styles.ticketName}>{alumnus.name}</span>
            <span className={styles.ticketMeta}>
              {alumnus.breed}, {genderLabel}
            </span>
            <span className={styles.ticketRoute}>
              <span>TeddyPups</span>
              <svg viewBox="0 0 60 12" aria-hidden="true">
                <path d="M2 6h46" />
                <path d="M44 2l6 4-6 4" />
              </svg>
              <span>home ♥</span>
            </span>
          </span>
        </span>

        {/* Tear-away Stub */}
        <span aria-hidden="true" className={styles.ticketStub}>
          <span className={styles.stubText}>admit one</span>
        </span>
      </Link>
    </li>
  );
}
