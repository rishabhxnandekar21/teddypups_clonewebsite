import { useEffect } from 'react';
import styles from './Placeholder.module.css';

export default function HowItWorksPage() {
  useEffect(() => { document.title = 'How It Works — TeddyPups UAE'; }, []);
  return (
    <section className={styles.placeholder}>
      <span className={styles['placeholder__badge']}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>the journey home</p>
      <h1 className={styles.placeholder__title}>How It Works</h1>
      <p className={styles.placeholder__desc}>
        Interactive adoption guide with step switcher. Full implementation in Phase 3.
      </p>
    </section>
  );
}
