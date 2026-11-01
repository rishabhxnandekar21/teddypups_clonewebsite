import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alumni } from '../data/alumni.js';
import BoardingTicket from '../components/ui/BoardingTicket.jsx';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './GoneHomePage.module.css';

const TILTS = [-1.4, 1.1, -1.8, 1.4, -1.2, 1.7, -1.5, 1.2];

export default function GoneHomePage() {
  useEffect(() => {
    document.title = 'Gone home | TeddyPups U.A.E.';
  }, []);

  return (
    <div data-page="gone" className={styles.page}>
      <div className={styles.container}>
        {/* ── 2-Column Booth Header ── */}
        <header className={styles.boothHead}>
          <div className={styles.boothCopy}>
            <h1 className={styles.title}>
              Gone home
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
              Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
            </p>
            <Link to="/puppies" className="btn btn-primary mt-8">
              See available puppies
            </Link>
          </div>

          {/* ── Mascot Ticket Booth ── */}
          <div aria-hidden="true" className={styles.booth}>
            <div className={styles.boothTeddy}>
              <MascotPup
                pose="peeking"
                facing="right"
                ariaLabel="Teddy leaning on the ticket counter"
              />
            </div>
            <div className={styles.boothCounter}>
              <span className="font-plush">tickets home</span>
            </div>
          </div>
        </header>

        {/* ── Boarding Tickets Gallery ── */}
        <ul className={styles.ticketsGrid} aria-label="Puppies who have gone home">
          {alumni.map((alumnus, idx) => (
            <BoardingTicket
              key={alumnus.id || alumnus.slug}
              alumnus={alumnus}
              index={idx}
              tilt={TILTS[idx % TILTS.length]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
