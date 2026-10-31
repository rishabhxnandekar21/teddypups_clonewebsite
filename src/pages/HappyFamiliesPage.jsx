import { useEffect } from 'react';
import { featuredReview, moments } from '../data/families.js';
import PolaroidCard from '../components/ui/PolaroidCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './HappyFamiliesPage.module.css';

const ROTATIONS = [-2, 1.8, -1.2, 2.5, -1.8, 1.5, -2.2, 2];

export default function HappyFamiliesPage() {
  useEffect(() => {
    document.title = 'Happy Families ♡ — TeddyPups UAE Client Stories';
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.header} aria-labelledby="families-page-title">
        <div className={`container ${styles.headerInner}`}>
          <div className="section-eyebrow">
            <PawIcon size={14} color="var(--color-toffee)" />
            <span>our wall of happy endings</span>
          </div>

          <h1 className={styles.title} id="families-page-title">
            Happy families ♡
          </h1>

          <p className={styles.subhead}>
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
          </p>

          <div className={styles.counterBadge}>
            <PawIcon size={14} color="var(--color-toffee-ink)" />
            <span>64 moments and counting</span>
          </div>
        </div>
      </section>

      <main className="container">
        {/* ── Featured Client Note ── */}
        <div className={styles.featuredNoteContainer}>
          <div className={styles.noteCard} role="region" aria-label="Featured client review">
            <div className={styles.noteTape} aria-hidden="true" />
            <blockquote className={styles.quoteText}>
              "{featuredReview.quote}"
            </blockquote>
            <div className={styles.noteAuthor}>
              <span className={styles.authorName}>{featuredReview.author}</span>
              <span className={styles.authorLocation}>{featuredReview.location}</span>
            </div>
          </div>
        </div>

        {/* ── Polaroids Collage Grid ── */}
        <div className={styles.polaroidGrid} aria-label="Client polaroids gallery">
          {moments.map((moment, idx) => (
            <PolaroidCard
              key={moment.id}
              moment={moment}
              rotation={ROTATIONS[idx % ROTATIONS.length]}
              isBlush={idx % 2 === 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
