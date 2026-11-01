// File: src/pages/ContactPage.jsx
import { useState, useRef, useEffect } from 'react';
import { availablePuppies } from '../data/puppies.js';
import { BUSINESS } from '../data/navigation.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './ContactPage.module.css';

const PAW_PATH = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppy: '',
    message: '',
  });

  const [phase, setPhase] = useState('writing'); // 'writing' | 'sealing' | 'posting' | 'sent'
  const [minHeight, setMinHeight] = useState(undefined);
  const postRef = useRef(null);

  useEffect(() => {
    document.title = 'Visit & contact | TeddyPups U.A.E.';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getWhatsAppHref = () => {
    const puppyText = formData.puppy ? formData.puppy : 'any puppy (not sure yet)';
    const text = `Hi TeddyPups! My name is ${formData.name || 'Friend'}. I live in ${formData.area || 'Dubai'}. I am curious about ${puppyText}. ${formData.message ? `Note: ${formData.message}` : ''}`;
    return `https://wa.me/971541676733?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      window.open(getWhatsAppHref(), '_blank');
      setPhase('sent');
      return;
    }

    if (postRef.current) {
      setMinHeight(postRef.current.offsetHeight);
    }

    setPhase('sealing');

    const t1 = setTimeout(() => {
      setPhase('posting');
    }, 750);

    const t2 = setTimeout(() => {
      setMinHeight(undefined);
      setPhase('sent');
      window.open(getWhatsAppHref(), '_blank');
    }, 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      area: '',
      puppy: '',
      message: '',
    });
    setPhase('writing');
  };

  return (
    <div data-page="contact" className={styles.page}>
      <section
        data-pup-scene="true"
        data-tone="light"
        className={`tp-scene ${styles.contactScene}`}
        style={{
          '--sky-top': '#fff9ee',
          '--sky-bottom': '#f9dca4',
        }}
        aria-labelledby="contact-title"
      >
        <div className={`gutter mx-auto ${styles.inner}`}>
          {/* ── Header ── */}
          <header className={styles.headerGrid}>
            <h1 id="contact-title" className={`font-plush text-giant ${styles.title}`}>
              Get in touch with us
            </h1>
            <p className={`text-lede ${styles.lede}`}>
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
            </p>
          </header>

          <div className={styles.layoutGrid}>
            {/* ── Left Column: Direct Channels & Showroom Info ── */}
            <div className={styles.channelsCol}>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: 'fit-content' }}
              >
                WhatsApp +971 54 167 6733
              </a>

              <dl className={styles.contactList}>
                <div>
                  <dt className={`font-scrawl ${styles.contactLabel}`}>call us</dt>
                  <dd className={styles.contactValue}>
                    <a href={`tel:${BUSINESS.phone.replace(/\s+/g, '')}`}>
                      {BUSINESS.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={`font-scrawl ${styles.contactLabel}`}>email</dt>
                  <dd className={styles.contactValue}>
                    <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                  </dd>
                </div>
              </dl>

              {/* Showroom Card */}
              <section aria-labelledby="visit-title" className={styles.shopfront}>
                <svg viewBox="0 0 300 120" className={styles.shopfrontSkyline} aria-hidden="true">
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className={styles.visitInner}>
                  <div>
                    <h2 id="visit-title" className={`font-plush ${styles.visitTitle}`}>
                      Visit us in Downtown Dubai
                    </h2>
                    <p className={styles.visitDesc}>
                      Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.
                    </p>
                    <p className={styles.visitAddress}>
                      <svg viewBox="0 0 64 64" className={styles.addressPaw} aria-hidden="true" fill="currentColor">
                        <path d={PAW_PATH} />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>
                    <a
                      href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{ marginTop: '1.5rem', backgroundColor: '#fffdf8' }}
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className={styles.visitPhoto}>
                    <img
                      src="/media/gallery/maltipoo-max-male-1.jpg"
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      className={styles.visitImg}
                    />
                  </figure>
                </div>
              </section>
            </div>

            {/* ── Right Column: Airmail Letterfold & Postbox ── */}
            <div className={styles.letterCol}>
              <div
                ref={postRef}
                className={styles.postContainer}
                data-phase={phase}
                style={{ minHeight }}
              >
                {/* Phase: writing, sealing, posting */}
                {phase !== 'sent' && (
                  <form
                    onSubmit={handleSubmit}
                    noValidate={false}
                    className={styles.letterform}
                    aria-hidden={phase !== 'writing' ? 'true' : undefined}
                  >
                    {/* Postage Stamp */}
                    <span aria-hidden="true" className={styles.letterStamp}>
                      <svg viewBox="0 0 64 64" width={36} height={36} fill="currentColor">
                        <path d={PAW_PATH} />
                      </svg>
                    </span>

                    <p className={`font-scrawl ${styles.letterGreeting}`}>Dear TeddyPups,</p>

                    <p className={styles.letterLine}>
                      my name is{' '}
                      <span className={styles.blank} style={{ '--size': '16ch' }}>
                        <input
                          name="name"
                          aria-label="Your name (required)"
                          autoComplete="name"
                          required
                          minLength={2}
                          maxLength={80}
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </span>
                      , and you can reach me on{' '}
                      <span className={styles.blank} style={{ '--size': '15ch' }}>
                        <input
                          name="phone"
                          aria-label="Phone or WhatsApp number with country code (required)"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </span>{' '}
                      or by email at{' '}
                      <span className={styles.blank} style={{ '--size': '20ch' }}>
                        <input
                          name="email"
                          aria-label="Email (optional)"
                          type="email"
                          autoComplete="email"
                          placeholder="optional"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </span>
                      .
                    </p>

                    <p className={styles.letterLine}>
                      I live in{' '}
                      <span className={styles.blank} style={{ '--size': '13ch' }}>
                        <input
                          name="area"
                          aria-label="Your area (optional)"
                          autoComplete="address-level2"
                          maxLength={80}
                          placeholder="e.g. Dubai Marina"
                          value={formData.area}
                          onChange={handleChange}
                        />
                      </span>
                      , and I'm curious about{' '}
                      <span className={styles.blank}>
                        <select
                          name="puppy"
                          aria-label="Puppy you're interested in (optional)"
                          value={formData.puppy}
                          onChange={handleChange}
                        >
                          <option value="">any puppy (not sure yet)</option>
                          {availablePuppies.map(pup => (
                            <option key={pup.slug} value={`${pup.name} (${pup.breed}, ${pup.gender})`}>
                              {pup.name} ({pup.breed}, {pup.gender === 'male' ? 'boy' : 'girl'})
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    <textarea
                      name="message"
                      rows={4}
                      maxLength={2000}
                      placeholder="Anything else you'd like to tell us…"
                      className={styles.letterNote}
                      aria-label="Your message (optional)"
                      value={formData.message}
                      onChange={handleChange}
                    />

                    <div className={styles.letterSign}>
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button type="submit" className="btn btn-primary">
                        {phase === 'sealing' ? 'Sealing letter…' : 'Post my letter'}
                      </button>
                    </div>
                  </form>
                )}

                {/* 3D Envelope & Postbox Animation (sealing & posting) */}
                {(phase === 'sealing' || phase === 'posting') && (
                  <div aria-hidden="true" className={styles.postScene}>
                    {/* Envelope */}
                    <svg viewBox="0 0 160 112" className={styles.envelope}>
                      <rect x="4" y="18" width="152" height="90" rx="6" fill="#fffdf8" stroke="#2a170e" strokeWidth="4" />
                      <path d="M6 104 64 62M154 104 96 62" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
                      <path className={styles.envelopeFlap} d="M6 22 80 74 154 22" fill="#fbe3b4" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                      <circle cx="80" cy="72" r="11" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" />
                    </svg>

                    {/* Postbox */}
                    <svg viewBox="0 0 200 260" className={styles.postbox}>
                      <rect x="86" y="170" width="28" height="86" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
                      <path d="M30 70a70 54 0 0 1 140 0v104H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
                      <rect x="58" y="86" width="84" height="14" rx="7" fill="#2a170e" />
                      <path d="M44 128h112" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
                      <g className={styles.postboxFlag}>
                        <path d="M170 120V64" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
                        <path d="M170 64h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                      </g>
                    </svg>
                  </div>
                )}

                {/* Phase: sent */}
                {phase === 'sent' && (
                  <div role="status" className={styles.sentCard} tabIndex={-1}>
                    <svg viewBox="0 0 200 150" aria-hidden="true" className={styles.sentBox}>
                      <rect x="86" y="96" width="28" height="52" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
                      <path d="M30 50a70 44 0 0 1 140 0v52H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
                      <rect x="58" y="58" width="84" height="12" rx="6" fill="#2a170e" />
                      <g>
                        <path d="M170 92V22" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
                        <path d="M170 22h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                      </g>
                    </svg>

                    <h3 className={styles.sentTitle}>Message received!</h3>
                    <p className={styles.sentBody}>
                      Thank you — our team will get back to you promptly. For the quickest reply, message us on WhatsApp.
                    </p>

                    <div className={styles.sentActions}>
                      <a
                        href={getWhatsAppHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        WhatsApp us
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-outline"
                      >
                        Write another note
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Teddy Waiting Below Letterform */}
              <div className={styles.waitingTeddyWrap}>
                <MascotPup
                  pose="sitting"
                  facing="left"
                  ariaLabel="Teddy, waiting for your letter"
                  className={styles.waitingTeddy}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}