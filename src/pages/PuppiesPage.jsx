import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { availablePuppies } from '../data/puppies.js';
import MascotPup from '../components/common/MascotPup.jsx';
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

const WASH_COLORS = ['#f2be6b', '#bfddf5', '#fbe3b4', '#e8c5b0'];

export default function PuppiesPage() {
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('All');

  useEffect(() => {
    document.title = 'Available puppies | TeddyPups U.A.E.';
  }, []);

  const filteredPuppies = useMemo(() => {
    return availablePuppies.filter(pup => {
      if (selectedOrigin !== 'all' && pup.origin !== selectedOrigin) {
        return false;
      }
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
    <div data-page="pups" className={styles.page}>
      <section aria-labelledby="pups-title" className={styles.sketchbook}>
        <div className={`gutter mx-auto ${styles.inner}`}>
          {/* Sketchbook Header */}
          <div className={styles.head}>
            <div className={styles.words}>
              <p className={`font-scrawl ${styles.eyebrow}`}>from Teddy&apos;s sketchbook</p>
              <h1 id="pups-title" className={`font-plush ${styles.title}`}>
                Available puppies
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 24"
                  preserveAspectRatio="none"
                  className={styles.underline}
                >
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className={styles.lede}>
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            <div className={styles.self}>
              <div className={styles.buddy}>
                <MascotPup pose="sitting" facing="left" ariaLabel="Teddy self-portrait" />
              </div>
              <span className={`font-scrawl ${styles.caption}`}>self-portrait</span>
            </div>
          </div>

          {/* Filter Pad */}
          <div className={styles.filterPad}>
            <div className={styles.filterRow}>
              <span className={styles.filterLabel}>Where:</span>
              <div className={styles.chips}>
                {ORIGIN_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.chip} ${selectedOrigin === opt.value ? styles.chipActive : ''}`}
                    onClick={() => setSelectedOrigin(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterRow}>
              <span className={styles.filterLabel}>Breed:</span>
              <div className={styles.chips}>
                {BREED_OPTIONS.map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`${styles.chip} ${selectedBreed === b ? styles.chipActive : ''}`}
                    onClick={() => setSelectedBreed(b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sketch Cards Grid */}
          <ul className={styles.sketches} aria-label="Available puppies grid">
            {filteredPuppies.map((pup, idx) => {
              const washColor = WASH_COLORS[idx % WASH_COLORS.length];
              const tilt = (idx % 2 === 0 ? 0.35 : -0.45) * ((idx % 3) + 1);

              return (
                <li key={pup.id || pup.slug}>
                  <Link
                    to={`/puppies/${pup.slug}`}
                    className={styles.sketch}
                    style={{
                      '--tilt': `${tilt}deg`,
                      '--wash': washColor,
                    }}
                    aria-label={`${pup.name}, ${pup.breed}, ${pup.gender === 'male' ? 'boy' : 'girl'}, ${pup.age}, available`}
                  >
                    <span className={styles.frame}>
                      {/* Color Wash SVG */}
                      <svg viewBox="0 0 100 100" className={styles.wash} aria-hidden="true">
                        <circle cx="50" cy="50" r="46" fill={washColor} />
                      </svg>

                      {/* Photo Container */}
                      <span className={styles.photo}>
                        <img
                          src={pup.images && pup.images[0] ? pup.images[0] : '/media/maltipoo-max-male.webp'}
                          alt={pup.name}
                          loading="lazy"
                          className={styles.pupImg}
                        />
                      </span>

                      {/* Hand-drawn Ink Border SVG */}
                      <svg viewBox="0 0 100 100" className={styles.ink} aria-hidden="true">
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="#2a170e"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Badges */}
                      <span className={`font-scrawl ${styles.sticker}`}>Available</span>
                      {(pup.hasVideo || pup.videoUrl) && (
                        <span className={styles.videoBadge}>▶ video</span>
                      )}
                    </span>

                    <span className={`font-plush ${styles.name}`}>{pup.name}</span>
                    <span className={styles.meta}>
                      {pup.breed} · {pup.gender === 'male' ? 'boy' : 'girl'} · {pup.age}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Gone Home Strip */}
          <div className={styles.goneStrip}>
            <div className={styles.goneInner}>
              <div>
                <p className={`font-scrawl ${styles.goneEyebrow}`}>found their forever families</p>
                <h2 className={`font-plush ${styles.goneTitle}`}>Recently gone home</h2>
              </div>
              <Link to="/gone-home" className="btn btn-outline">
                See all gone home puppies &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
