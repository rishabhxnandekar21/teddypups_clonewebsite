import styles from './PolaroidCard.module.css';

const TAPE_POSITIONS = [
  styles.tapeCenter,
  styles.tapeLeft,
  styles.tapeRight,
  styles.tapeTL,
  styles.tapeTR,
];

const TAPE_COLORS = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#e8dfd3', '#d9ecd0'];

export default function PolaroidCard({
  moment,
  index = 0,
  tilt = 0,
  onClick,
}) {
  const tapeClass = TAPE_POSITIONS[index % TAPE_POSITIONS.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];

  return (
    <button
      type="button"
      className={styles.polaroidBtn}
      onClick={onClick}
      aria-label={`View photo: ${moment.caption || 'Happy puppy family'}`}
    >
      <figure
        className={styles.polaroid}
        style={{
          '--tilt': `${tilt}deg`,
          '--tape': tapeColor,
          '--i': index,
        }}
      >
        {/* Washi Tape Strip */}
        <span aria-hidden="true" className={`${styles.tape} ${tapeClass}`} />

        {/* Photo */}
        <span className={styles.photoWrapper}>
          <img
            src={moment.image}
            alt={moment.caption || 'Happy TeddyPups family'}
            className={styles.photo}
            loading={index < 8 ? 'eager' : 'lazy'}
            width={300}
            height={345}
          />
        </span>

        {/* Caption */}
        <figcaption className={styles.caption}>
          {moment.caption}
        </figcaption>
      </figure>
    </button>
  );
}
