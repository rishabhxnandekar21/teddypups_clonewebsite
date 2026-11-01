// File: src/pages/HappyFamiliesPage.jsx
import { useState, useEffect } from 'react';
import { featuredReview, moments } from '../data/families.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './HappyFamiliesPage.module.css';

const TILTS = [-2.2, 1.6, -0.9, 2.4, -2.0, 0.8, -2.6, 1.2, -2.2, 1.6, -0.9, 2.4];
const TAPES = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#e9dcc4', '#cfe5f6'];

export default function HappyFamiliesPage() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = 'Happy families | TeddyPups U.A.E.';
    const timer = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div data-page="families" className={styles.page}>
      <section aria-labelledby="families-title" className={`tp-memories ${styles.memories}`}>
        <div className={`gutter mx-auto ${styles.inner}`}>
          {/* ── Memories Header ── */}
          <div className={styles.head}>
            <div className={styles.intro}>
              <p className={`font-scrawl ${styles.eyebrow}`}>our wall of happy endings</p>
              <h1 id="families-title" className={`font-plush ${styles.title}`}>
                Happy families
                <svg viewBox="0 0 48 44" className={styles.heart} aria-hidden="true">
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
              <p className={styles.lede}>
                Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className={`font-scrawl ${styles.count}`}>64 moments and counting</p>
            </div>

            {/* Featured Client Note */}
            <figure className={styles.note}>
              <span aria-hidden="true" className={styles.noteTape} style={{ '--tape': '#cfe5f6' }}></span>
              <blockquote className="font-plush-text">
                “{featuredReview.quote}”
              </blockquote>
              <figcaption className="font-scrawl">
                {featuredReview.author}, {featuredReview.location}
              </figcaption>
            </figure>
          </div>

          {/* ── Polaroids Masonry Gallery Wall ── */}
          <div className={styles.wallWrapper}>
            <ul className={`tp-wall ${styles.wall}`} aria-label="Photos from TeddyPups families">
              {moments.map((moment, idx) => {
                const tilt = TILTS[idx % TILTS.length];
                const tapeColor = TAPES[idx % TAPES.length];
                const tapePosIndex = idx % 5;

                return (
                  <li
                    key={moment.id || idx}
                    className={`tp-wall__item ${styles.wallItem}`}
                    style={{ '--d': `${(idx % 4) * 60}ms` }}
                    data-armed="true"
                    data-revealed={revealed ? "true" : undefined}
                  >
                    <button
                      type="button"
                      className={`tp-wall__print ${styles.wallPrint}`}
                      aria-label={`Open photo ${idx + 1} of ${moments.length}`}
                    >
                      <span
                        className={`tp-polaroid ${styles.polaroid}`}
                        style={{
                          '--tilt': `${tilt}deg`,
                          '--tape': tapeColor,
                          '--i': idx,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className={`tp-tape ${styles.tape} ${styles[`tapePos${tapePosIndex}`]}`}
                        ></span>
                        <span className={`tp-polaroid__photo ${styles.photo}`}>
                          <img
                            src={moment.image || moment.src}
                            alt={moment.alt || 'A happy TeddyPups family with their new puppy'}
                            loading={idx < 8 ? 'eager' : 'lazy'}
                            width="960"
                            height="1280"
                            className={styles.img}
                          />
                        </span>
                        <span className={`tp-polaroid__caption font-scrawl ${styles.caption}`}>
                          {moment.caption || ''}
                        </span>
                      </span>

                      {/* Watermark Paw */}
                      <svg viewBox="0 0 64 64" className={styles.wallPaw} aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Closing Scene: "every one of them was a Teddy Pup once" ── */}
        <div className={`tp-memories__foot ${styles.foot}`}>
          <div className={styles.footInner}>
            <div className={styles.footMascot}>
              <MascotPup
                pose="sitting"
                facing="left"
                ariaLabel="Teddy, admiring the wall"
                className={styles.pup}
              />
            </div>
            <p className={`font-scrawl ${styles.footTagline}`}>
              every one of them was a Teddy Pup once
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}