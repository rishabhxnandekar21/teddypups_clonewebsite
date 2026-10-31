import { useEffect } from 'react';
import styles from './Placeholder.module.css';

export default function HomePage() {
  useEffect(() => {
    document.title = 'TeddyPups UAE — Premium Designer Puppies in Dubai';
  }, []);

  return (
    <section className={styles.placeholder}>
      <span className={styles.placeholder__badge}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>where every pup finds their person</p>
      <h1 className={styles.placeholder__title}>Home</h1>
      <p className={styles.placeholder__desc}>
        Full implementation coming in Phase 3. The design system, routing, and data layer are ready.
      </p>
    </section>
  );
}
