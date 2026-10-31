import { useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS } from '../data/navigation';
import styles from './Placeholder.module.css';

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact — TeddyPups UAE'; }, []);
  return (
    <section className={styles.placeholder}>
      <span className={styles['placeholder__badge']}>Phase 2 — Placeholder</span>
      <p className={styles.placeholder__tag}>let's connect</p>
      <h1 className={styles.placeholder__title}>Contact Us</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', marginTop: '1rem' }}>
        <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp Us
        </a>
        <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="btn btn-outline btn-sm">
          <Phone size={16} aria-hidden="true" /> {BUSINESS.phone}
        </a>
        <a href={`mailto:${BUSINESS.email}`} className="btn btn-outline btn-sm">
          <Mail size={16} aria-hidden="true" /> {BUSINESS.email}
        </a>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-cocoa-soft)' }}>
          <MapPin size={16} aria-hidden="true" /> {BUSINESS.address}
        </p>
      </div>
    </section>
  );
}
