import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { puppies } from '../data/puppies.js';
import styles from './Placeholder.module.css';

export default function PuppiesPage() {
  useEffect(() => {
    document.title = 'Available Puppies — TeddyPups UAE';
  }, []);

  return (
    <section className={styles.placeholder}>
      <span className={styles.placeholder__badge}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>find your perfect match</p>
      <h1 className={styles.placeholder__title}>Available Puppies</h1>
      <p className={styles.placeholder__desc}>
        {puppies.length} puppies loaded from data layer. Full grid implementation in Phase 3.
      </p>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        {puppies.map(p => (
          <li key={p.slug}>
            <Link to={`/puppies/${p.slug}`} className="btn btn-outline btn-sm">
              {p.name} ({p.breed})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
