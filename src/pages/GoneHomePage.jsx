import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { alumni } from '../data/alumni.js';
import { BUSINESS } from '../data/navigation.js';
import BoardingTicket from '../components/ui/BoardingTicket.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './GoneHomePage.module.css';

const TILTS = [-1.4, 1.2, -1.8, 1.5, -1.2, 1.8, -1.5, 1.3];

export default function GoneHomePage() {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    document.title = 'Gone Home ♡ — TeddyPups UAE Alumni';
  }, []);

  const filteredAlumni = useMemo(() => {
    if (filter === 'local') {
      return alumni.filter(a => a.routeType === 'local');
    }
    if (filter === 'international') {
      return alumni.filter(a => a.routeType === 'international');
    }
    return alumni;
  }, [filter]);

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.header} aria-labelledby="gone-home-title">
        <div className={`container ${styles.headerInner}`}>
          <div className="section-eyebrow">
            <PawIcon size={14} color="var(--color-toffee)" />
            <span>boarded their flight</span>
          </div>

          <h1 className={styles.title} id="gone-home-title">
            Gone home ♡
          </h1>

          <p className={styles.subhead}>
            Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
          </p>

          <div className={styles.headerActions}>
            <Link to="/puppies" className="btn btn-primary">
              See available puppies
            </Link>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Ask about a breed
            </a>
          </div>
        </div>
      </section>

      {/* ── Route Filter Bar ── */}
      <section className={styles.filterBar} aria-label="Alumni route filters">
        <div className="container">
          <div className={styles.filterRow}>
            <button
              type="button"
              className={`${styles.filterPill} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All boarding passes ({alumni.length})
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${filter === 'local' ? styles.active : ''}`}
              onClick={() => setFilter('local')}
            >
              Dubai Showroom Handover
            </button>
            <button
              type="button"
              className={`${styles.filterPill} ${filter === 'international' ? styles.active : ''}`}
              onClick={() => setFilter('international')}
            >
              International Flight Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* ── Tickets Gallery ── */}
      <main className="container">
        <ul className={styles.ticketsGrid} aria-label="Puppies who have gone home">
          {filteredAlumni.map((alumnus, idx) => (
            <BoardingTicket
              key={alumnus.id}
              alumnus={alumnus}
              index={idx}
              tilt={TILTS[idx % TILTS.length]}
            />
          ))}
        </ul>

        {/* ── Bottom Inquiry Box ── */}
        <aside className={styles.inquiryBox} aria-label="Request an alumni breed match">
          <PawIcon size={32} color="var(--color-toffee)" />
          <h2 className={styles.inquiryTitle}>Fell in love with one of our alumni?</h2>
          <p className={styles.inquiryText}>
            Our ethical breeders in South Korea, Europe, and Dubai frequently have new litters of Maltipoos, Poodles, and Pomeranians. Send us the name of your favorite alumnus!
          </p>
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Request a match on WhatsApp
          </a>
        </aside>
      </main>
    </div>
  );
}
