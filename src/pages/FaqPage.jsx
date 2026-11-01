import { useState, useMemo, useEffect } from 'react';
import { faqItems } from '../data/faq.js';
import { BUSINESS } from '../data/navigation.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './FaqPage.module.css';

const TILTS = [-1.6, 1.2, -1.1, 1.5, -1.4, 1.3, -1.2, 1.6, -1.0];
const PIN_COLORS = [
  'var(--color-toffee, #d97736)',
  'var(--color-sky-deep, #3a7ca5)',
  'var(--color-leaf, #4b8f52)',
  '#d9534f',
  '#f0ad4e',
  '#5bc0de',
  '#9b59b6',
  '#34495e',
  '#16a085',
];

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState('faq-1'); // First open by default

  useEffect(() => {
    document.title = 'Questions & answers | TeddyPups U.A.E.';
  }, []);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return faqItems;
    return faqItems.filter(
      item =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleItem = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div data-page="faq" className={styles.page}>
      <section
        data-pup-scene="true"
        data-tone="dark"
        className={`tp-scene tp-faqroom ${styles.scene}`}
        style={{
          '--sky-top': '#a95e32',
          '--sky-bottom': '#331c11',
        }}
        aria-labelledby="faq-title"
      >
        <div className={`gutter mx-auto ${styles.inner}`}>
          {/* ── Header ── */}
          <header className={styles.header}>
            <h1 id="faq-title" className={`font-plush ${styles.title}`}>
              Questions &amp; answers
            </h1>
            <p className={styles.subhead}>
              Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>

          <div className={styles.content}>
            <div className={`tp-notes ${styles.notes}`}>
              {/* ── Left Sidebar: Search & Mascot ── */}
              <aside className={`tp-notes__side ${styles.side}`} aria-label="Find a question">
                <label htmlFor="faq-search-input" className={`font-scrawl ${styles.label}`}>
                  sniff out a question
                </label>

                <div className={`tp-notes__search ${styles.searchBox}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.lens}>
                    <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    id="faq-search-input"
                    type="search"
                    placeholder="delivery, Korea, vaccinated…"
                    autoComplete="off"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <p className={`tp-notes__count ${styles.count}`} aria-live="polite">
                  {filteredItems.length} {filteredItems.length === 1 ? 'note' : 'notes'} on the board
                </p>

                <div className={`tp-notes__teddy ${styles.teddyWrap}`}>
                  <span aria-hidden="true" className={`tp-notes__bubble font-plush ${styles.bubble}`}>
                    <span className={styles.bubbleQ}>?</span>
                    <span className={styles.bubbleA}>!</span>
                  </span>
                  <MascotPup
                    pose="sitting"
                    facing="right"
                    ariaLabel="Teddy, reading the notes"
                    className={styles.mascot}
                  />
                </div>

                <div className={`tp-notes__cta ${styles.cta}`}>
                  <a
                    href={BUSINESS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-primary ${styles.ctaBtn}`}
                  >
                    Ask your own question
                  </a>
                </div>
              </aside>

              {/* ── Right Column: Pinned Notes Board ── */}
              <div className={`tp-notes__board ${styles.board}`}>
                {filteredItems.length > 0 ? (
                  <ul className={`tp-notes__list ${styles.list}`}>
                    {filteredItems.map((item, idx) => {
                      const isOpen = openId === item.id;
                      const tilt = TILTS[idx % TILTS.length];
                      const pinColor = PIN_COLORS[idx % PIN_COLORS.length];

                      return (
                        <li
                          key={item.id}
                          className={`tp-note ${styles.note}`}
                          data-reveal="true"
                          style={{
                            '--tilt': `${tilt}deg`,
                            '--pin': pinColor,
                            '--i': idx,
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className={`tp-note__pin ${styles.pin}`}
                            style={{ backgroundColor: pinColor }}
                          ></span>

                          <h2 className={`tp-note__q ${styles.qHeader}`}>
                            <button
                              type="button"
                              id={`q-${item.id}`}
                              aria-expanded={isOpen}
                              aria-controls={`a-${item.id}`}
                              onClick={() => toggleItem(item.id)}
                              className={styles.qButton}
                            >
                              <span className="font-plush-text">{item.question}</span>
                              <span
                                aria-hidden="true"
                                className={`tp-note__chevron ${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                              >
                                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chevronSvg}>
                                  <path d="M5 7.5L10 12.5L15 7.5" />
                                </svg>
                              </span>
                            </button>
                          </h2>

                          {isOpen && (
                            <div
                              id={`a-${item.id}`}
                              role="region"
                              aria-labelledby={`q-${item.id}`}
                              className={`tp-note__answer ${styles.answer}`}
                            >
                              <div className={`tp-note__flap ${styles.flap}`}>
                                <p>{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className={styles.empty}>
                    <p className="font-scrawl" style={{ fontSize: '1.4rem' }}>
                      no notes found matching "{search}"
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSearch('')}
                      style={{ marginTop: '1rem' }}
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
