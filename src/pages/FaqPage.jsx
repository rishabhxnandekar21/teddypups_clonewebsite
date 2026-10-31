import { useState, useMemo, useEffect } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { faqItems } from '../data/faq.js';
import { BUSINESS } from '../data/navigation.js';
import AccordionItem from '../components/ui/AccordionItem.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './FaqPage.module.css';

const STARS = [
  { left: '6%', top: '18%', width: '12.6px', delay: '0.00s' },
  { left: '14%', top: '42%', width: '8.4px', delay: '0.40s' },
  { left: '23%', top: '12%', width: '9.8px', delay: '0.80s' },
  { left: '31%', top: '30%', width: '7px', delay: '1.20s' },
  { left: '44%', top: '9%', width: '11.2px', delay: '1.60s' },
  { left: '52%', top: '36%', width: '7.7px', delay: '2.00s' },
  { left: '63%', top: '15%', width: '10.5px', delay: '2.40s' },
  { left: '71%', top: '40%', width: '7px', delay: '2.80s' },
  { left: '92%', top: '33%', width: '8.4px', delay: '3.20s' },
];

const STAR_PATH = "M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z";

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState({ 'faq-1': true }); // First open by default per reference

  useEffect(() => {
    document.title = 'Questions & answers — TeddyPups UAE';
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
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles.faqroom} role="main">
      {/* ── Layered Twinkling Stars (Scene 4) ── */}
      {STARS.map((star, idx) => (
        <svg
          key={idx}
          viewBox="0 0 40 40"
          className={styles.starburst}
          style={{
            left: star.left,
            top: star.top,
            width: star.width,
            height: star.width,
            animationDelay: star.delay,
          }}
          aria-hidden="true"
        >
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      ))}

      {/* ── Header ── */}
      <section className={styles.header} aria-labelledby="faq-page-heading">
        <div className={`container ${styles.headerInner}`}>
          <h1 className={styles.title} id="faq-page-heading">
            Questions & answers
          </h1>
          <p className={styles.subhead}>
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </div>
      </section>

      {/* ── Corkboard Area ── */}
      <section className={`container ${styles.notesArea}`}>
        <div className={styles.notesLayout}>
          {/* Left Sidebar */}
          <aside className={styles.sidebarNote} aria-label="FAQ Search and Assistance">
            <span className={styles.sidebarLabel}>sniff out a question</span>

            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} aria-hidden="true" />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="delivery, Korea, vaccinated…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search frequently asked questions"
              />
            </div>

            <span className={styles.noteCounter}>
              {filteredItems.length} {filteredItems.length === 1 ? 'note' : 'notes'} on the board
            </span>

            <p className={styles.sidebarHelp}>
              Looking for something specific? Search by keyword like <em>vaccinated</em>, <em>delivery</em>, or <em>Korea</em>.
            </p>

            {/* Floating Mascot in Sidebar */}
            <div className={styles.sidebarTeddy} aria-hidden="true">
              <span className={styles.wonderBubble}>
                <span>?</span>
                <span>!</span>
              </span>
              <PawIcon size={24} color="var(--color-toffee)" />
            </div>

            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ width: '100%' }}
            >
              <MessageCircle size={16} aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </aside>

          {/* Accordion Notes */}
          <div className={styles.accordionColumn} aria-label="FAQ questions list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={!!openItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                  index={idx}
                />
              ))
            ) : (
              <div
                style={{
                  padding: '3rem 2rem',
                  backgroundColor: '#fffdf2',
                  border: '3px dashed var(--color-cocoa)',
                  borderRadius: '1.25rem',
                  textAlign: 'center',
                  color: 'var(--color-cocoa)',
                }}
              >
                <PawIcon size={32} color="var(--color-toffee)" />
                <h3 style={{ fontFamily: 'var(--font-plush, "Fraunces", serif)', marginTop: '0.75rem', fontSize: '1.4rem' }}>
                  No matching notes found
                </h3>
                <p style={{ color: 'var(--color-cocoa-soft)', margin: '0.5rem auto 1.25rem', maxWidth: '36ch' }}>
                  We couldn’t find an answer matching "{search}". Reach out directly and we’ll answer in minutes!
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSearch('')}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
