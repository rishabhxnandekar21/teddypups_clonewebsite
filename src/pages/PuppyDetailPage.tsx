import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPuppyBySlug } from '../data/puppies';
import styles from './Placeholder.module.css';

export default function PuppyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const puppy = slug ? getPuppyBySlug(slug) : undefined;

  useEffect(() => {
    document.title = puppy
      ? `${puppy.name} the ${puppy.breed} — TeddyPups UAE`
      : 'Puppy Not Found — TeddyPups UAE';
  }, [puppy]);

  if (!puppy) {
    return (
      <section className={styles.placeholder}>
        <span className={styles['placeholder__badge']}>404</span>
        <h1 className={styles.placeholder__title}>Puppy not found</h1>
        <p className={styles.placeholder__desc}>No puppy found with slug: <code>{slug}</code></p>
        <Link to="/puppies" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          View All Puppies
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.placeholder}>
      <span className={styles['placeholder__badge']}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>one ticket home</p>
      <h1 className={styles.placeholder__title}>{puppy.name}</h1>
      <p className={styles.placeholder__desc}>
        {puppy.breed} · {puppy.gender} · {puppy.ageWeeks} weeks old · {puppy.origin}
      </p>
      <Link to="/puppies" className="btn btn-outline" style={{ marginTop: '1rem' }}>
        ← Back to Puppies
      </Link>
    </section>
  );
}
