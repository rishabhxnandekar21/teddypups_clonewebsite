import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { BUSINESS } from '../data/navigation.js';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    puppyInterest: 'Any puppy (not sure yet)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Get in touch with us — TeddyPups UAE';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate send / generate pre-filled WhatsApp link
    const whatsappText = `Hello TeddyPups! My name is ${formData.name || 'Friend'}. I live in ${formData.location || 'UAE'}. I am curious about: ${formData.puppyInterest}. Note: ${formData.message || 'Looking forward to hearing from you!'}`;
    window.open(`https://wa.me/971541676733?text=${encodeURIComponent(whatsappText)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.header} aria-labelledby="contact-heading">
        <div className={`container ${styles.headerInner}`}>
          <div className="section-eyebrow">
            <PawIcon size={14} color="var(--color-toffee)" />
            <span>we’d love to hear from you</span>
          </div>

          <h1 className={styles.title} id="contact-heading">
            Get in touch with us
          </h1>

          <p className={styles.subhead}>
            Whether you want to visit our Downtown Dubai showroom, ask questions about our available puppies, or inquire about an international import.
          </p>
        </div>
      </section>

      <main className="container">
        <div className={styles.layoutGrid}>
          {/* ── Left Column: Direct Channels & Showroom Info ── */}
          <div className={styles.channelsCol}>
            {/* Showroom Card */}
            <div className={styles.channelCard}>
              <h2 className={styles.channelTitle}>Visit us in Downtown Dubai</h2>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MapPin size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Location</span>
                    <p className={styles.infoValue}>{BUSINESS.address}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Clock size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Hours</span>
                    <p className={styles.infoValue}>{BUSINESS.hours}</p>
                  </div>
                </div>
              </div>

              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <MessageCircle size={18} aria-hidden="true" />
                Schedule a showroom visit
              </a>
            </div>

            {/* Direct Channels Card */}
            <div className={styles.channelCard}>
              <h2 className={styles.channelTitle}>Direct channels</h2>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Phone size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Phone & Call</span>
                    <p className={styles.infoValue}>
                      <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}>{BUSINESS.phone}</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>Email</span>
                    <p className={styles.infoValue}>
                      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Vintage Airmail Stationery Letterform ── */}
          <form className={styles.stationeryCard} onSubmit={handleSubmit} aria-label="Adoption Inquiry Letter">
            <div className={styles.airmailBorder} aria-hidden="true" />

            {/* Postage Stamp */}
            <div className={styles.stamp} aria-hidden="true">
              <PawIcon size={24} color="var(--color-toffee-ink)" />
              <span className={styles.stampPrice}>AIR MAIL</span>
            </div>

            <p className={styles.letterSalutation}>Dear TeddyPups,</p>

            <div className={styles.letterBody}>
              <span>my name is</span>
              <input
                type="text"
                name="name"
                required
                className={styles.inlineInput}
                placeholder="your name"
                style={{ width: '160px' }}
                value={formData.name}
                onChange={handleChange}
                aria-label="Your name"
              />
              <span>, and you can reach me on</span>
              <input
                type="tel"
                name="phone"
                required
                className={styles.inlineInput}
                placeholder="+971 50 123 4567"
                style={{ width: '180px' }}
                value={formData.phone}
                onChange={handleChange}
                aria-label="Your phone number"
              />
              <span>or by email at</span>
              <input
                type="email"
                name="email"
                className={styles.inlineInput}
                placeholder="email (optional)"
                style={{ width: '180px' }}
                value={formData.email}
                onChange={handleChange}
                aria-label="Your email"
              />
              <span>. I live in</span>
              <input
                type="text"
                name="location"
                className={styles.inlineInput}
                placeholder="e.g. Dubai Marina"
                style={{ width: '170px' }}
                value={formData.location}
                onChange={handleChange}
                aria-label="Your living location"
              />
              <span>, and I'm curious about</span>
              <select
                name="puppyInterest"
                className={styles.inlineSelect}
                value={formData.puppyInterest}
                onChange={handleChange}
                aria-label="Puppy interest selection"
              >
                <option value="Any puppy (not sure yet)">any puppy (not sure yet) ▼</option>
                <option value="Maltipoo">Maltipoo ▼</option>
                <option value="Teacup Pomeranian">Teacup Pomeranian ▼</option>
                <option value="Korean Teacup Poodle">Korean Teacup Poodle ▼</option>
                <option value="Cavapoo">Cavapoo ▼</option>
                <option value="Shih-Tzu">Shih-Tzu ▼</option>
              </select>
              <span>.</span>

              <textarea
                name="message"
                className={styles.letterTextarea}
                placeholder="Anything else you'd like to tell us about your family, home, or questions..."
                value={formData.message}
                onChange={handleChange}
                aria-label="Additional notes"
              />
            </div>

            {submitted && (
              <div className={styles.successMsg} role="status">
                ✓ Thank you! Opening WhatsApp to send your letter directly to our concierge team...
              </div>
            )}

            <div className={styles.submitRow}>
              <button type="submit" className="btn btn-primary btn-lg">
                <Send size={18} aria-hidden="true" />
                Post my letter
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
