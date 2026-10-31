import { useState, useMemo, useEffect } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { faqItems } from '../data/faq.js';
import { BUSINESS } from '../data/navigation.js';
import AccordionItem from '../components/ui/AccordionItem.jsx';
import ScallopHem from '../components/common/ScallopHem.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './FaqPage.module.css';

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
    <div className={styles.page}>
      {/* ── Header Banner ── */}
      <section className={styles.header} aria-labelledby="faq-page-heading">
        <div className={`container ${styles.headerInner}`}>
          <span className={styles.eyebrow}>got questions?</span>
          <h1 className={styles.title} id="faq-page-heading">
            Questions & answers
          </h1>
          <p className={styles.subhead}>
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </div>

        <div className={styles.headerScallop}>
          <ScallopHem color="#ebd7b2" height={14} />
        </div>
      </section>

      {/* ── Corkboard Area ── */}
      <main className={styles.corkboardSection}>
        <div className={`container ${styles.corkboardLayout}`}>
          {/* Left Sidebar */}
          <aside className={styles.sidebarNote} aria-label="FAQ Search and Assistance">
            <span className={styles.noteCounter}>
              {filteredItems.length} {filteredItems.length === 1 ? 'note' : 'notes'} on the board
            </span>

            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} aria-hidden="true" />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="sniff out a question..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search frequently asked questions"
              />
            </div>

            <p className={styles.sidebarHelp}>
              Looking for something specific? Search by keyword like <em>vaccinated</em>, <em>delivery</em>, or <em>Korea</em>.
            </p>

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
          <section className={styles.accordionColumn} aria-label="FAQ questions list">
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
                  border: '2px dashed var(--color-cocoa)',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                }}
              >
                <PawIcon size={32} color="var(--color-toffee)" />
                <h3 style={{ fontFamily: 'var(--font-display)', marginTop: '0.5rem', color: 'var(--color-cocoa)' }}>
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
          </section>
        </div>
      </main>
    </div>
  );
}
