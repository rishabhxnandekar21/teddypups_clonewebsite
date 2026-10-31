import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { availablePuppies, recentlyAdoptedPuppies } from '../data/puppies.js';
import PuppyCard from '../components/ui/PuppyCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './PuppiesPage.module.css';

const ORIGIN_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'In Dubai', value: 'local' },
  { label: 'Imported', value: 'imported' },
];

const BREED_OPTIONS = [
  'All',
  'Maltipoo',
  'Pomeranian',
  'Poodle',
  'Cavapoo',
  'Shih-Tzu',
];

export default function PuppiesPage() {
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('All');

  useEffect(() => {
    document.title = 'Available Puppies — TeddyPups UAE';
  }, []);

  const filteredPuppies = useMemo(() => {
    return availablePuppies.filter(pup => {
      // Filter by origin
      if (selectedOrigin !== 'all' && pup.origin !== selectedOrigin) {
        return false;
      }
      // Filter by breed
      if (selectedBreed !== 'All') {
        const matchesBreed =
          pup.breed.toLowerCase().includes(selectedBreed.toLowerCase()) ||
          (pup.subBreed && pup.subBreed.toLowerCase().includes(selectedBreed.toLowerCase()));
        if (!matchesBreed) return false;
      }
      return true;
    });
  }, [selectedOrigin, selectedBreed]);

  return (
    <div className={styles.page}>
      {/* ── Banner ── */}
      <section className={styles.banner} aria-labelledby="puppies-heading">
        <div className={`container ${styles.bannerInner}`}>
          <div className="section-eyebrow">
            <PawIcon size={14} color="var(--color-toffee)" />
            <span>find your perfect companion</span>
          </div>
          <h1 className={styles.title} id="puppies-heading">
            Available puppies
          </h1>
          <p className={styles.subhead}>
            Meet our currently available designer teacup & miniature puppies. Every puppy includes microchipping, full vaccinations, and health certification.
          </p>
        </div>
      </section>

      {/* ── Filter Controls ── */}
      <section className={styles.filterSection} aria-label="Puppy filters">
        <div className="container">
          <div className={styles.filterControls}>
            {/* Origin filters */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Where:</span>
              {ORIGIN_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedOrigin === opt.value ? styles.active : ''
                  }`}
                  onClick={() => setSelectedOrigin(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Breed filters */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Breed:</span>
              {BREED_OPTIONS.map(breed => (
                <button
                  key={breed}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedBreed === breed ? styles.active : ''
                  }`}
                  onClick={() => setSelectedBreed(breed)}
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Puppies Grid ── */}
      <main className="container" style={{ marginTop: '2.5rem' }}>
        <div className={styles.resultsMeta}>
          <h2 className={styles.sectionHeading}>
            {selectedOrigin === 'all' && selectedBreed === 'All'
              ? '15 puppies looking for a home'
              : `Showing ${filteredPuppies.length} available ${
                  filteredPuppies.length === 1 ? 'puppy' : 'puppies'
                }`}
          </h2>

          {(selectedOrigin !== 'all' || selectedBreed !== 'All') && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSelectedOrigin('all');
                setSelectedBreed('All');
              }}
            >
              Reset filters
            </button>
          )}
        </div>

        {filteredPuppies.length > 0 ? (
          <div className={styles.grid}>
            {filteredPuppies.map(puppy => (
              <PuppyCard key={puppy.slug} puppy={puppy} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <PawIcon size={36} color="var(--color-toffee)" />
            <h3 className={styles.emptyTitle}>No puppies found</h3>
            <p className={styles.emptyDesc}>
              No available puppies match your current filter selection. Try selecting another breed or reset your filters.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedOrigin('all');
                setSelectedBreed('All');
              }}
            >
              Show all puppies
            </button>
          </div>
        )}

        {/* ── Recently Adopted Section: "Already gone home" ── */}
        <section className={styles.goneHomeSection} aria-labelledby="already-gone-home-heading">
          <div className={styles.goneHomeHeader}>
            <h2 id="already-gone-home-heading" className={styles.goneHomeTitle}>
              <span>Already gone home</span>
              <span style={{ color: 'var(--color-toffee)', fontSize: '1.6rem' }} aria-hidden="true">
                ♥
              </span>
            </h2>
            <p className={styles.goneHomeDesc}>
              These 5 adorable puppies have recently boarded their flights and joined their loving forever families in the UAE.
            </p>
          </div>

          <div className={styles.grid}>
            {recentlyAdoptedPuppies.map(puppy => (
              <PuppyCard key={puppy.slug} puppy={puppy} />
            ))}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/gone-home" className="btn btn-outline btn-lg">
              View all 27 boarding passes on Gone Home →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
