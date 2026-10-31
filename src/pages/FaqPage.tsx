import { useEffect } from 'react';
import { faqItems } from '../data/faq';
import styles from './Placeholder.module.css';

export default function FaqPage() {
  useEffect(() => { document.title = 'FAQ — TeddyPups UAE'; }, []);
  return (
    <section className={styles.placeholder}>
      <span className={styles['placeholder__badge']}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>got questions?</p>
      <h1 className={styles.placeholder__title}>Frequently Asked Questions</h1>
      <p className={styles.placeholder__desc}>
        {faqItems.length} FAQ items loaded. Accordion implementation in Phase 3.
      </p>
    </section>
  );
}
