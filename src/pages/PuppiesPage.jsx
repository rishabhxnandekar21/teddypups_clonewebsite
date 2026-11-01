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

const WASH_PATH =
  'M96.73 50.00C96.38 52.37 95.89 54.67 95.32 56.94C94.75 59.21 94.09 61.43 93.30 63.61C92.50 65.78 91.61 67.93 90.55 69.98C89.49 72.04 88.29 74.06 86.92 75.94C85.55 77.83 84.00 79.63 82.33 81.27C80.66 82.92 78.82 84.44 76.90 85.81C74.98 87.18 72.93 88.41 70.82 89.52C68.71 90.62 66.51 91.60 64.26 92.44C62.01 93.29 59.68 94.03 57.30 94.59C54.92 95.15 52.47 95.59 50.00 95.80C47.53 96.01 44.98 96.06 42.49 95.83C40.01 95.61 37.47 95.15 35.07 94.45C32.66 93.75 30.28 92.78 28.07 91.64C25.85 90.49 23.73 89.09 21.76 87.60C19.78 86.10 17.95 84.41 16.22 82.67C14.49 80.93 12.89 79.06 11.38 77.13C9.88 75.20 8.47 73.19 7.20 71.09C5.94 68.99 4.75 66.79 3.81 64.52C2.87 62.24 2.04 59.84 1.54 57.42C1.04 55.00 0.76 52.47 0.80 50.00C0.85 47.53 1.20 45.00 1.80 42.62C2.41 40.23 3.35 37.87 4.43 35.68C5.52 33.49 6.89 31.41 8.32 29.46C9.74 27.51 11.35 25.71 12.99 24.00C14.63 22.28 16.37 20.70 18.15 19.19C19.93 17.69 21.77 16.27 23.68 14.97C25.60 13.66 27.58 12.43 29.64 11.36C31.71 10.28 33.86 9.31 36.06 8.52C38.27 7.73 40.57 7.08 42.89 6.60C45.22 6.13 47.60 5.82 50.00 5.65C52.40 5.49 54.83 5.48 57.27 5.61C59.71 5.74 62.18 6.00 64.64 6.43C67.10 6.86 69.60 7.41 72.03 8.19C74.46 8.97 76.92 9.91 79.21 11.11C81.50 12.31 83.78 13.74 85.77 15.41C87.76 17.07 89.62 19.01 91.15 21.09C92.67 23.16 93.94 25.51 94.90 27.87C95.86 30.23 96.50 32.78 96.91 35.26C97.32 37.74 97.41 40.29 97.38 42.74C97.35 45.20 97.07 47.63 96.73 50.00Z';

const INK_PATH_MAIN =
  'M99.83 50.00C99.55 52.49 99.05 54.95 98.42 57.34C97.79 59.73 96.99 62.07 96.05 64.32C95.11 66.58 94.02 68.78 92.77 70.86C91.52 72.94 90.10 74.95 88.55 76.81C87.00 78.67 85.27 80.42 83.45 82.02C81.63 83.61 79.66 85.07 77.63 86.40C75.60 87.73 73.47 88.91 71.29 89.99C69.11 91.07 66.86 92.02 64.55 92.86C62.24 93.70 59.88 94.45 57.45 95.03C55.03 95.61 52.52 96.09 50.00 96.33C47.48 96.57 44.87 96.67 42.31 96.48C39.75 96.29 37.14 95.88 34.65 95.21C32.17 94.54 29.70 93.59 27.40 92.45C25.11 91.31 22.91 89.90 20.87 88.38C18.83 86.86 16.94 85.12 15.18 83.33C13.42 81.53 11.80 79.60 10.30 77.61C8.79 75.62 7.40 73.54 6.15 71.38C4.90 69.23 3.75 66.99 2.80 64.68C1.86 62.37 1.04 59.95 0.50 57.50C-0.04 55.06 -0.39 52.51 -0.44 50.00C-0.48 47.49 -0.26 44.92 0.23 42.45C0.71 39.99 1.50 37.53 2.48 35.22C3.45 32.91 4.70 30.67 6.07 28.58C7.44 26.48 9.02 24.50 10.68 22.65C12.34 20.80 14.14 19.08 16.03 17.48C17.91 15.89 19.91 14.41 21.98 13.09C24.06 11.77 26.24 10.57 28.48 9.57C30.72 8.56 33.06 7.71 35.42 7.06C37.79 6.41 40.23 5.95 42.66 5.64C45.09 5.34 47.56 5.24 50.00 5.25C52.44 5.26 54.89 5.44 57.33 5.71C59.77 5.98 62.20 6.36 64.64 6.87C67.08 7.38 69.53 7.98 71.95 8.76C74.37 9.55 76.83 10.44 79.16 11.58C81.50 12.72 83.84 14.03 85.95 15.59C88.06 17.15 90.09 18.95 91.81 20.92C93.53 22.90 95.06 25.13 96.26 27.44C97.47 29.74 98.38 32.26 99.03 34.75C99.67 37.25 100.00 39.86 100.13 42.40C100.27 44.94 100.12 47.51 99.83 50.00Z';

const INK_PATH_RETRACE =
  'M37.52 95.79C36.56 95.50 33.64 94.73 31.77 94.02C29.89 93.32 28.03 92.51 26.25 91.57C24.47 90.62 22.73 89.55 21.11 88.37C19.48 87.18 17.92 85.86 16.48 84.45C15.03 83.05 13.69 81.52 12.45 79.93C11.21 78.35 10.07 76.66 9.03 74.94C7.99 73.22 7.06 71.43 6.21 69.61C5.36 67.78 4.60 65.91 3.94 64.00C3.29 62.10 2.71 60.14 2.25 58.17C1.80 56.19 1.43 54.17 1.22 52.13C1.00 50.10 0.89 48.02 0.95 45.97C1.01 43.91 1.20 41.82 1.56 39.79C1.91 37.75 2.43 35.71 3.09 33.75C3.75 31.78 4.57 29.84 5.50 27.98C6.43 26.13 7.51 24.33 8.67 22.60C9.83 20.88 11.11 19.23 12.46 17.64C13.81 16.06 15.25 14.54 16.76 13.09C18.27 11.65 19.85 10.27 21.51 8.98C23.18 7.69 24.91 6.46 26.73 5.36C28.54 4.26 30.44 3.24 32.40 2.39C34.36 1.55 36.41 0.81 38.49 0.28C40.57 -0.24 42.72 -0.61 44.86 -0.77C47.00 -0.92 49.18 -0.88 51.30 -0.65C53.43 -0.42 55.55 0.03 57.58 0.61C59.62 1.20 61.61 1.99 63.50 2.86C65.40 3.74 67.21 4.78 68.95 5.86C70.69 6.94 72.33 8.14 73.92 9.36C75.51 10.58 77.01 11.86 78.47 13.18C79.94 14.50 81.98 16.58 82.68 17.26';

const PAW_DOODLE_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z';

export default function PuppiesPage() {
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = 'Available puppies | TeddyPups U.A.E.';
    const timer = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(timer);
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
                    data-reveal="true"
                    data-armed="true"
                    data-revealed={revealed ? 'true' : undefined}
                    style={{
                      '--tilt': `${tilt}deg`,
                      '--wash': washColor,
                      '--d': `${idx * 70}ms`,
                    }}
                    aria-label={`${pup.name}, ${pup.breed}, ${pup.gender === 'male' ? 'boy' : 'girl'}, ${pup.age}, available`}
                  >
                    <span className={styles.frame}>
                      {/* Organic Color Wash SVG */}
                      <svg viewBox="0 0 100 100" className={styles.wash} aria-hidden="true">
                        <path d={WASH_PATH} fill={washColor} />
                      </svg>

                      {/* Photo Container with expanding circular aperture reveal */}
                      <span className={styles.photo}>
                        <img
                          src={pup.images && pup.images[0] ? pup.images[0] : '/media/maltipoo-max-male.webp'}
                          alt={pup.name}
                          loading="lazy"
                          className={styles.pupImg}
                        />
                      </span>

                      {/* Hand-drawn Animated Ink Border SVGs */}
                      <svg viewBox="0 0 100 100" className={styles.ink} aria-hidden="true">
                        <path
                          d={INK_PATH_MAIN}
                          pathLength="1"
                          className={styles.sketchLine}
                        />
                        <path
                          d={INK_PATH_RETRACE}
                          pathLength="1"
                          className={`${styles.sketchLine} ${styles.sketchLineRetrace}`}
                        />
                        {/* Playful Doodles */}
                        <g className={styles.doodle}>
                          <path
                            d="M0 0c1.6-.6 2.4 1.4.8 2.6-2 1.4-4.6-.4-4-3 .7-3 4.8-3.8 6.8-1.2 2.4 3-0.2 7.4-3.8 7.2"
                            fill="none"
                            stroke="#c2622b"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(14, 18)"
                          />
                        </g>
                        <g className={styles.doodle}>
                          <path
                            d={PAW_DOODLE_PATH}
                            fill="#d4893f"
                            opacity="0.85"
                            transform="translate(82, 78) scale(.16) translate(-32 -34)"
                          />
                        </g>
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
