import { useEffect } from 'react';
import styles from './Placeholder.module.css';

export default function HappyFamiliesPage() {
  useEffect(() => {
    document.title = 'Happy Families — TeddyPups UAE';
  }, []);

  return (
    <section className={styles.placeholder}>
      <span className={styles.placeholder__badge}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>64 moments of joy</p>
      <h1 className={styles.placeholder__title}>Happy Families</h1>
      <p className={styles.placeholder__desc}>
        Testimonials gallery. Full masonry/grid implementation in Phase 3.
      </p>
    </section>
  );
}
