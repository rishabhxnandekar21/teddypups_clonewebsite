import PawIcon from '../common/PawIcon.jsx';
import styles from './BoardingTicket.module.css';

export default function BoardingTicket({ alumnus }) {
  return (
    <article className={styles.ticket} aria-label={`Boarding pass for ${alumnus.name}`}>
      {/* Left main ticket body */}
      <div className={styles.main}>
        <div className={styles.photoWrapper}>
          <img
            src={alumnus.image}
            alt={`${alumnus.name} the ${alumnus.breed}`}
            className={styles.photo}
            loading="lazy"
            width={72}
            height={72}
          />
        </div>

        <div className={styles.info}>
          <span className={styles.scriptLabel}>one ticket home</span>
          <h3 className={styles.pupName}>{alumnus.name}</h3>
          <p className={styles.pupMeta}>
            {alumnus.breed}, {alumnus.gender === 'male' ? 'boy' : 'girl'}
          </p>
          <div className={styles.routeLine} aria-label={`Route: ${alumnus.route}`}>
            <span>{alumnus.route}</span>
          </div>
        </div>
      </div>

      {/* Perforation line with semi-circular notches */}
      <div className={styles.perforation} aria-hidden="true">
        <span className={styles.notchTop} />
        <span className={styles.notchBottom} />
      </div>

      {/* Right honey stub */}
      <div className={styles.stub} aria-hidden="true">
        <span className={styles.stubText}>admit one</span>
        <span className={styles.stubIcon}>
          <PawIcon size={14} color="var(--color-toffee-ink)" />
        </span>
      </div>
    </article>
  );
}
