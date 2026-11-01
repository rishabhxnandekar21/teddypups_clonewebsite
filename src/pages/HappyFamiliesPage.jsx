import { useEffect } from 'react';
import { featuredReview, moments } from '../data/families.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './HappyFamiliesPage.module.css';

const TILTS = [-2.2, 1.6, -1.4, 2.4, -2.0, 1.8, -1.8, 2.2, -2.5, 1.5, -1.2, 2.0];
const TAPES = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#d7e7c8', '#f0d8e8'];

export default function HappyFamiliesPage() {
  useEffect(() => {
    document.title = 'Happy families | TeddyPups U.A.E.';
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
                    style={{ '--d': `${(idx % 12) * 50}ms` }}
                  >
                    <div className={`tp-wall__print ${styles.wallPrint}`}>
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
                            src={moment.src}
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
                    </div>
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
