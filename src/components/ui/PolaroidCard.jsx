import styles from './PolaroidCard.module.css';

export default function PolaroidCard({ moment, rotation = 0, isBlush = false }) {
  return (
    <figure
      className={styles.polaroid}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label={moment.caption}
    >
      {/* Washi tape strip */}
      <div
        className={`${styles.tape} ${isBlush ? styles.tapeBlush : ''}`}
        aria-hidden="true"
      />

      {/* Photo */}
      <div className={styles.imageWrapper}>
        <img
          src={moment.image}
          alt={moment.caption}
          className={styles.image}
          loading="lazy"
          width={300}
          height={300}
        />
      </div>

      {/* Handwritten caption */}
      <figcaption className={styles.captionArea}>
        <p className={styles.caption}>{moment.caption}</p>
        {moment.tag && <span className={styles.tag}>#{moment.tag}</span>}
      </figcaption>
    </figure>
  );
}
