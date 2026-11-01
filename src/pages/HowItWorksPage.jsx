import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/navigation.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './HowItWorksPage.module.css';

const STEPS_LOCAL = [
  {
    step: '1',
    title: 'Explore our puppies',
    desc: 'Browse our website to view available puppies. Each listing includes photos, breed details, age, and health information.',
    tint: '#fbe3b4',
    iconD: 'M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z',
  },
  {
    step: '2',
    title: 'Choose your puppy',
    desc: 'Once you find a puppy you love, open their profile for more information or reach out directly with any questions.',
    tint: '#fde6de',
    iconD: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  },
  {
    step: '3',
    title: 'Meet before you choose',
    desc: 'Spend time bonding in our Downtown Dubai showroom before making your final decision.',
    tint: '#e3f0fb',
    iconD: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    step: '4',
    title: 'Pick-up or delivery',
    desc: 'Pick up your puppy from our showroom or enjoy climate-controlled chauffeur delivery to your door across all Emirates.',
    tint: '#e6f2df',
    iconD: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4l3 3v5a1 1 0 01-1 1h-1',
  },
];

const STEPS_IMPORT = [
  {
    step: '1',
    title: 'Reserve your puppy',
    desc: 'Browse our selection of available breeds and place a reservation. Our model ensures each puppy is specifically sourced to meet your preferences.',
    tint: '#fbe3b4',
    iconD: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    step: '2',
    title: 'Personalized consultation',
    desc: "Once confirmed, we work closely with you on WhatsApp to finalize details and provide continuous updates on your puppy's journey.",
    tint: '#fde6de',
    iconD: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    step: '3',
    title: 'Import and arrival',
    desc: 'We manage every aspect of the import process, veterinary certificates, MOCCAE permits, and premium pet flight arrangements.',
    tint: '#e3f0fb',
    iconD: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
  },
  {
    step: '4',
    title: 'Welcome home',
    desc: 'Upon arrival, our concierge assists with gentle acclimation, nutrition guidelines, and 24/7 support for a seamless transition.',
    tint: '#e6f2df',
    iconD: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('local');

  useEffect(() => {
    document.title = 'How it works | TeddyPups U.A.E.';
  }, []);

  const currentSteps = activeTab === 'local' ? STEPS_LOCAL : STEPS_IMPORT;

  return (
    <div className={styles.page}>
      <section
        data-pup-scene="true"
        data-tone="light"
        className={`tp-scene ${styles.hiwScene}`}
        style={{
          '--sky-top': '#fffbf3',
          '--sky-bottom': '#f6cc85',
        }}
        aria-labelledby="how-title"
      >
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.headerGrid}>
            <h1 id="how-title" className={styles.title}>
              How it works
            </h1>
            <p className={styles.lede}>
              Whether you choose to visit us locally in Downtown Dubai or import a puppy from Korea, here is exactly how the process works.
            </p>
          </header>

          {/* Jump Pills */}
          <nav aria-label="Jump to section" className={styles.pills}>
            <a href="#two-ways" className={styles.pill}>
              <span>1</span> Two ways home
            </a>
            <a href="#promise" className={styles.pill}>
              <span>2</span> Our premium puppy promise
            </a>
            <a href="#delivery" className={styles.pill}>
              <span>3</span> Delivery &amp; collection
            </a>
            <a href="#why" className={styles.pill}>
              <span>4</span> Why choose us
            </a>
          </nav>

          {/* ── 1. Two Ways Home (tp-journeys) ── */}
          <div className={styles.journeysSection} id="two-ways">
            <div className={styles.journeysTop}>
              <div>
                <p className={styles.kicker}>choose your way</p>
                <h2 id="two-ways-title" className={styles.sectionHeading}>
                  Two ways home
                </h2>
              </div>
              <div className={styles.journeysPick}>
                <div
                  role="tablist"
                  aria-label="Ways to bring your puppy home"
                  className={styles.switchBar}
                >
                  <button
                    type="button"
                    role="tab"
                    id="tab-local"
                    aria-selected={activeTab === 'local'}
                    aria-controls="panel-steps"
                    className={`${styles.switchBtn} ${activeTab === 'local' ? styles.switchBtnActive : ''}`}
                    onClick={() => setActiveTab('local')}
                  >
                    In Dubai (meet in person)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-import"
                    aria-selected={activeTab === 'import'}
                    aria-controls="panel-steps"
                    className={`${styles.switchBtn} ${activeTab === 'import' ? styles.switchBtnActive : ''}`}
                    onClick={() => setActiveTab('import')}
                  >
                    Imported (order upon request)
                  </button>
                </div>
              </div>
            </div>

            <ol
              id="panel-steps"
              role="tabpanel"
              aria-labelledby={activeTab === 'local' ? 'tab-local' : 'tab-import'}
              className={styles.stepsGrid}
            >
              {currentSteps.map((item, idx) => (
                <li
                  key={item.step}
                  className={styles.stepCard}
                  style={{ '--tint': item.tint, '--i': idx }}
                >
                  <span aria-hidden="true" className={styles.stepIcon}>
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.iconD} />
                    </svg>
                  </span>
                  <span className={styles.stepNum}>Step {item.step}</span>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── 2. Our Premium Puppy Promise (tp-paper) ── */}
          <section id="promise" aria-labelledby="promise-title" className={styles.paperPromise}>
            <p aria-hidden="true" className={styles.paperKicker}>
              puppy passport
            </p>
            <h2 id="promise-title" className={styles.paperHeading}>
              Our premium puppy promise
            </h2>
            <ul className={styles.promiseList}>
              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#a24a1a', '--tilt': '-8deg' }}>
                <span className={`${styles.stamp} ${styles.stampRound}`}>
                  <svg viewBox="0 0 64 64" className={styles.stampSvg} aria-hidden="true">
                    <path
                      d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 30h7l3-7 4 13 3-6h7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.stampTitle}>Hand-selected breeders</span>
                </span>
                <p className={styles.entryText}>
                  We work only with breeders who uphold the highest ethical and health standards.
                </p>
              </li>

              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#1f6b45', '--tilt': '5deg' }}>
                <span className={`${styles.stamp} ${styles.stampTicket}`}>
                  <svg viewBox="0 0 64 64" className={styles.stampSvg} aria-hidden="true">
                    <path
                      d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 50c10 4 20 4 30 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="2 7"
                    />
                  </svg>
                  <span className={styles.stampTitle}>Full transparency</span>
                </span>
                <p className={styles.entryText}>
                  Photos, videos, and health certificates are shared before your puppy travels.
                </p>
              </li>

              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#5a3a28', '--tilt': '-4deg' }}>
                <span className={`${styles.stamp} ${styles.stampOval}`}>
                  <svg viewBox="0 0 64 64" className={styles.stampSvg} aria-hidden="true">
                    <path
                      d="M10 14h44v28H30l-12 10v-10h-8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 28h0M32 28h0M42 28h0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className={styles.stampTitle}>Safe, stress-free delivery</span>
                </span>
                <p className={styles.entryText}>
                  We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.
                </p>
              </li>
            </ul>
          </section>

          {/* ── 3. Delivery & Collection (2-Column with Dubai Skyline) ── */}
          <section id="delivery" aria-labelledby="delivery-title" className={styles.deliveryGrid}>
            <div className={styles.deliveryContent}>
              <h2 id="delivery-title" className={styles.sectionHeading}>
                Delivery &amp; collection
              </h2>
              <p className={styles.deliveryLede}>
                From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
              </p>
              <ul className={styles.deliveryList}>
                <li>
                  <h3 className={styles.deliveryItemTitle}>Take your puppy home the same day</h3>
                  <p className={styles.deliveryItemDesc}>
                    Local puppies are available immediately — visit, fall in love, and go home together.
                  </p>
                </li>
                <li>
                  <h3 className={styles.deliveryItemTitle}>Delivery within Dubai</h3>
                  <p className={styles.deliveryItemDesc}>
                    Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.
                  </p>
                </li>
                <li>
                  <h3 className={styles.deliveryItemTitle}>Safe international cargo</h3>
                  <p className={styles.deliveryItemDesc}>
                    We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.
                  </p>
                </li>
                <li>
                  <h3 className={styles.deliveryItemTitle}>Worldwide delivery</h3>
                  <p className={styles.deliveryItemDesc}>
                    We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.
                  </p>
                </li>
              </ul>
            </div>

            {/* Illustrated Dubai Skyline Card with Flight Path */}
            <div className={styles.deliveryVisual} aria-hidden="true">
              <svg viewBox="0 0 300 120" className={styles.skylineSvg}>
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className={styles.flightScene}>
                <svg viewBox="0 0 660 300" role="img" aria-label="A plane flying puppies from Korea to Dubai">
                  <path d="M40 250 C 170 40, 470 20, 620 168" className={styles.flightRoute} />
                  <circle cx="40" cy="250" r="7" className={styles.flightDot} />
                  <circle cx="620" cy="168" r="7" className={styles.flightDot} />
                  <text x="40" y="284" textAnchor="middle" className={styles.flightLabel}>
                    Korea
                  </text>
                  <text x="620" y="202" textAnchor="middle" className={styles.flightLabel}>
                    Dubai
                  </text>
                  <g transform="translate(480.0 90.0) rotate(16.5)">
                    <g transform="translate(-126 -78)">
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" fill="#d4893f" />
                      <path d="M108 112 L142 156 L172 156 L158 112 Z" fill="#b56e29" />
                      <path
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                        fill="#fffdf8"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                      />
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" fill="#d4893f" />
                      <path d="M206 64 C215 67 221 73 224 80" stroke="#2a170e" strokeWidth="2.4" fill="none" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          {/* ── 4. Why Choose Us (2-Column Grid) ── */}
          <section id="why" aria-labelledby="why-title" className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <h2 id="why-title" className={styles.sectionHeading}>
                Why choose us
              </h2>
              <p className={styles.whyLede}>
                We're here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we're with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
              </p>
            </div>
            <ul className={styles.whyFeatures}>
              <li className={styles.whyFeature}>
                <svg viewBox="0 0 64 64" className={styles.featureIcon} aria-hidden="true">
                  <path
                    d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 50c10 4 20 4 30 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2 7"
                  />
                </svg>
                <div>
                  <h3 className={styles.featureTitle}>International cargo</h3>
                  <p className={styles.featureDesc}>
                    We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.
                  </p>
                </div>
              </li>

              <li className={styles.whyFeature}>
                <svg viewBox="0 0 64 64" className={styles.featureIcon} aria-hidden="true">
                  <path
                    d="M10 14h44v28H30l-12 10v-10h-8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 28h0M32 28h0M42 28h0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className={styles.featureTitle}>Support 24/7</h3>
                  <p className={styles.featureDesc}>
                    Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away.
                  </p>
                </div>
              </li>

              <li className={styles.whyFeature}>
                <svg viewBox="0 0 64 64" className={styles.featureIcon} aria-hidden="true">
                  <path
                    d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 30h7l3-7 4 13 3-6h7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h3 className={styles.featureTitle}>Health guarantee</h3>
                  <p className={styles.featureDesc}>
                    All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* ── 5. Unique & High Quality Puppies Board ── */}
          <section aria-labelledby="care-title" className={styles.boardCard}>
            <div className={styles.boardContent}>
              <h2 id="care-title" className={styles.boardHeading}>
                Unique and high quality puppies
              </h2>
              <p className={styles.boardLede}>
                When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
              </p>
              <div className={styles.boardBtns}>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  Ask us on WhatsApp
                </a>
                <Link to="/puppies" className="btn btn-ghost">
                  See available puppies
                </Link>
              </div>
            </div>

            <div className={styles.boardBuddy}>
              <MascotPup pose="stand" facing="left" ariaLabel="Teddy ready to play" />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
