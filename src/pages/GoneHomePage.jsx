import { useEffect } from 'react';
import { alumni } from '../data/alumni.js';
import styles from './Placeholder.module.css';

export default function GoneHomePage() {
  useEffect(() => {
    document.title = 'Gone Home — TeddyPups UAE';
  }, []);

  return (
    <section className={styles.placeholder}>
      <span className={styles.placeholder__badge}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>boarded their flight</p>
      <h1 className={styles.placeholder__title}>Gone Home</h1>
      <p className={styles.placeholder__desc}>
        {alumni.length} alumni boarding passes loaded. Full grid implementation in Phase 3.
      </p>
    </section>
  );
}
