import { Plus } from 'lucide-react';
import styles from './AccordionItem.module.css';

const PIN_COLORS = ['#c2622b', '#1f7a4d', '#f2be6b', '#bfddf5', '#f9cdbf'];

export default function AccordionItem({ item, isOpen, onToggle, index = 0 }) {
  const pinColor = PIN_COLORS[index % PIN_COLORS.length];

  return (
    <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-btn-${item.id}`}
      >
        <div className={styles.questionWrapper}>
          <span
            className={styles.pin}
            style={{ backgroundColor: pinColor }}
            aria-hidden="true"
          />
          <span className={styles.question}>{item.question}</span>
        </div>

        <span className={styles.toggleIcon} aria-hidden="true">
          <Plus size={16} />
        </span>
      </button>

      {isOpen && (
        <div
          id={`faq-answer-${item.id}`}
          role="region"
          aria-labelledby={`faq-btn-${item.id}`}
          className={styles.body}
        >
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}
