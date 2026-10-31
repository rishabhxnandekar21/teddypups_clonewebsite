import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Placeholder.module.css';

export default function NotFoundPage() {
  useEffect(() => { document.title = 'Page Not Found — TeddyPups UAE'; }, []);
  return (
    <section className={styles.placeholder}>
      <span className={styles['placeholder__badge']}>404</span>
      <p className={styles.placeholder__tag}>lost pup alert</p>
      <h1 className={styles.placeholder__title}>Page Not Found</h1>
      <p className={styles.placeholder__desc}>
        This page seems to have wandered off. Let's get you back home.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
        Back to Home
      </Link>
    </section>
  );
}
