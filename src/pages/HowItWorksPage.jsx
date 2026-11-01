// File: src/pages/HowItWorksPage.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/navigation.js';
import MascotPup from '../components/common/MascotPup.jsx';
import styles from './HowItWorksPage.module.css';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('local'); // 'local' | 'imported'
  const flightContainerRef = useRef(null);
  const flightPathRef = useRef(null);
  const flightPlaneRef = useRef(null);

  useEffect(() => {
    document.title = 'How it works | TeddyPups U.A.E.';
  }, []);

  useEffect(() => {
    const container = flightContainerRef.current;
    const path = flightPathRef.current;
    const plane = flightPlaneRef.current;
    if (!container || !path || !plane) return;

    const updatePlane = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.95;
      const endY = vh * 0.25 - rect.height;
      const progress = Math.min(1, Math.max(0, (startY - rect.top) / (startY - endY)));

      const len = path.getTotalLength();
      const l = Math.min(len, Math.max(0, progress * len));
      const p = path.getPointAtLength(l);
      const pNext = path.getPointAtLength(Math.min(len, l + 1));
      const pPrev = path.getPointAtLength(Math.max(0, l - 1));
      const angle = (180 * Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x)) / Math.PI;

      plane.setAttribute(
        'transform',
        `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
      plane.style.opacity = String(Math.min(1, Math.max(0, (progress - 0.11) / 0.06)));
    };

    updatePlane();
    window.addEventListener('scroll', updatePlane, { passive: true });
    window.addEventListener('resize', updatePlane, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePlane);
      window.removeEventListener('resize', updatePlane);
    };
  }, []);

  return (
    <div data-page="how" className={styles.page}>
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
            <h1 id="how-title" className={`font-plush text-giant ${styles.title}`}>
              How it works
            </h1>
            <p className={styles.lede}>
              Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          {/* Jump Pills */}
          <nav aria-label="On this page" className={styles.pills}>
            <a href="#two-ways" className={`chip ${styles.pill}`}>
              <span className="font-plush">1</span> Two ways home
            </a>
            <a href="#promise" className={`chip ${styles.pill}`}>
              <span className="font-plush">2</span> Our premium puppy promise
            </a>
            <a href="#delivery" className={`chip ${styles.pill}`}>
              <span className="font-plush">3</span> Delivery &amp; collection
            </a>
            <a href="#why" className={`chip ${styles.pill}`}>
              <span className="font-plush">4</span> Why choose us
            </a>
          </nav>

          {/* ── 1. Two Ways Home (tp-journeys) ── */}
          <div className={styles.journeysSection} id="two-ways">
            <div className={styles.journeysTop}>
              <div>
                <p className={`font-scrawl ${styles.kicker}`}>choose your way</p>
                <h2 id="two-ways-title" className={`font-plush text-big ${styles.sectionHeading}`}>
                  Two ways home
                </h2>
              </div>
              <div className={styles.journeysPick}>
                <div
                  role="tablist"
                  aria-label="Ways to bring your puppy home"
                  className={styles.switchBar}
                  style={{ '--at': activeTab === 'local' ? 0 : 1, '--n': 2 }}
                >
                  <button
                    type="button"
                    role="tab"
                    id="tab-local"
                    aria-selected={activeTab === 'local'}
                    aria-controls="panel-local"
                    className={`${styles.switchBtn} ${activeTab === 'local' ? styles.switchBtnActive : ''}`}
                    onClick={() => setActiveTab('local')}
                  >
                    <span className={`font-plush ${styles.switchLabel}`}>In Dubai</span>
                    <span className={styles.switchHint}>meet in person</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-imported"
                    aria-selected={activeTab === 'imported'}
                    aria-controls="panel-imported"
                    className={`${styles.switchBtn} ${activeTab === 'imported' ? styles.switchBtnActive : ''}`}
                    onClick={() => setActiveTab('imported')}
                  >
                    <span className={`font-plush ${styles.switchLabel}`}>Imported</span>
                    <span className={styles.switchHint}>order upon request</span>
                  </button>
                </div>

                <div className={styles.journeysTeddy}>
                  <MascotPup
                    pose="sitting"
                    facing="right"
                    ariaLabel="Teddy, waiting to see which way you pick"
                    className={styles.tabMascot}
                  />
                </div>
              </div>
            </div>

            {/* TAB PANEL 1: IN DUBAI */}
            {activeTab === 'local' && (
              <div role="tabpanel" id="panel-local" aria-labelledby="tab-local" className={styles.journeyPanel}>
                <div className={styles.journeyHead}>
                  <div>
                    <h3 className={`font-plush ${styles.journeyTitle}`}>Meet your puppy in person</h3>
                    <p className={`text-lede ${styles.journeyLede}`}>
                      Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.
                    </p>
                  </div>

                  {/* Postcard: Downtown Dubai Skyline */}
                  <div aria-hidden="true" className={styles.postcard}>
                    <span className={styles.postcardSun}></span>
                    <svg viewBox="0 0 300 120" className={styles.postcardCity} aria-hidden="true">
                      <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={`font-scrawl ${styles.postcardTo} ${styles.postcardToLeft}`}>Downtown Dubai</span>
                  </div>
                </div>

                <ol className={styles.stepsGrid}>
                  <li className={styles.stepCard} style={{ '--tint': '#fbe3b4', '--i': 0 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <circle cx="21" cy="21" r="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <path d="m30 30 10 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M21 27c-3-2-4.4-3.6-4.4-5.2a2.2 2.2 0 0 1 4.4-.4 2.2 2.2 0 0 1 4.4.4c0 1.6-1.4 3.2-4.4 5.2z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 1</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Explore our puppies</h4>
                    <p className={styles.stepDesc}>Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#fde6de', '--i': 1 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path d="M24 40C11 31 6 24.5 6 17.8 6 12.4 10.2 8 15.4 8c3.7 0 6.8 2.1 8.6 5.3C25.8 10.1 28.9 8 32.6 8 37.8 8 42 12.4 42 17.8 42 24.5 37 31 24 40z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="m17 22 5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 2</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Choose your puppy</h4>
                    <p className={styles.stepDesc}>Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#e3f0fb', '--i': 2 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path d="M14 18c-3-6-1-10 3-10s5 4 4 8M34 18c3-6 1-10-3-10s-5 4-4 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <ellipse cx="24" cy="27" rx="13" ry="12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></ellipse>
                        <circle cx="19.5" cy="25" r="1.6" fill="currentColor"></circle>
                        <circle cx="28.5" cy="25" r="1.6" fill="currentColor"></circle>
                        <path d="M22 31h4l-2 2z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 3</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Meet before you choose</h4>
                    <p className={styles.stepDesc}>Spend time bonding before making your decision.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#e6f2df', '--i': 3 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path d="M5 30V18h22v12M27 22h8l6 6v2H27" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 30h36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <circle cx="13" cy="33" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <circle cx="34" cy="33" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <path d="M16 26c-2.3-1.6-3.4-2.8-3.4-4a1.7 1.7 0 0 1 3.4-.4 1.7 1.7 0 0 1 3.4.4c0 1.2-1.1 2.4-3.4 4z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 4</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Pick-up or delivery</h4>
                    <p className={styles.stepDesc}>Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.</p>
                  </li>
                </ol>
              </div>
            )}

            {/* TAB PANEL 2: IMPORTED */}
            {activeTab === 'imported' && (
              <div role="tabpanel" id="panel-imported" aria-labelledby="tab-imported" className={styles.journeyPanel}>
                <div className={styles.journeyHead}>
                  <div>
                    <h3 className={`font-plush ${styles.journeyTitle}`}>Order upon request</h3>
                    <p className={`text-lede ${styles.journeyLede}`}>
                      Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world's most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.
                    </p>
                    <p className={`font-scrawl ${styles.journeyHandwrite}`}>
                      From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines, we bring the world's finest puppies to Dubai, just for you.
                    </p>
                  </div>

                  {/* Postcard: International Sky Route */}
                  <div aria-hidden="true" className={`${styles.postcard} ${styles.postcardSky}`}>
                    <svg viewBox="0 0 320 150" className={styles.postcardRoute} preserveAspectRatio="none">
                      <path d="M28 128C90 20 230 20 292 118" />
                    </svg>
                    <svg viewBox="0 0 64 40" className={styles.postcardPlane} aria-hidden="true">
                      <path d="M4 22l20-2 12-14h6l-6 14 14-1 6-7h4l-3 10 3 10h-4l-6-7-14-1 6 14h-6L24 24 4 22z" fill="#fffdf8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={`font-scrawl ${styles.postcardFrom}`}>Europe · Korea</span>
                    <span className={`font-scrawl ${styles.postcardTo}`}>Dubai</span>
                  </div>
                </div>

                <ol className={styles.stepsGrid}>
                  <li className={styles.stepCard} style={{ '--tint': '#fbe3b4', '--i': 0 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <rect x="7" y="10" width="34" height="30" rx="5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></rect>
                        <path d="M7 19h34M16 6v8M32 6v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="m17 29 5 5 9-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 1</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Reserve your puppy</h4>
                    <p className={styles.stepDesc}>Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#fde6de', '--i': 1 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path d="M6 12a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-9l-6 5v-5h-1a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M36 17h1a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-1v5l-6-5h-6a5 5 0 0 1-4-2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 2</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Personalized consultation</h4>
                    <p className={styles.stepDesc}>Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#e3f0fb', '--i': 2 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path transform="matrix(-1 0 0 1 48 0)" d="M4 27l13-1.5 8-10h4l-4 9.5 9-.8 4-4.7h3l-2 6.6 2 6.6h-3l-4-4.7-9-.8 4 9.5h-4l-8-10L4 29z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 3</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Import and arrival</h4>
                    <p className={styles.stepDesc}>We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.</p>
                  </li>

                  <li className={styles.stepCard} style={{ '--tint': '#e6f2df', '--i': 3 }}>
                    <span aria-hidden="true" className={styles.stepIcon}>
                      <svg viewBox="0 0 48 48">
                        <path d="M6 23 24 8l18 15M11 19v21h26V19" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M24 35c-4.6-3.2-6.8-5.7-6.8-8.2a3.4 3.4 0 0 1 6.8-.8 3.4 3.4 0 0 1 6.8.8c0 2.5-2.2 5-6.8 8.2z" fill="currentColor"></path>
                      </svg>
                    </span>
                    <span className={`font-plush ${styles.stepNum}`}>Step 4</span>
                    <h4 className={`font-plush-text ${styles.stepTitle}`}>Welcome home</h4>
                    <p className={styles.stepDesc}>Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.</p>
                  </li>
                </ol>
              </div>
            )}
          </div>

          {/* ── 2. Our Premium Puppy Promise (tp-paper) ── */}
          <section id="promise" aria-labelledby="promise-title" className={`tp-paper ${styles.paperPromise}`}>
            <p aria-hidden="true" className={`font-scrawl ${styles.paperKicker}`}>
              puppy passport
            </p>
            <h2 id="promise-title" className={`font-plush ${styles.paperHeading}`}>
              Our premium puppy promise
            </h2>
            <ul className={styles.promiseList}>
              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#a24a1a', '--tilt': '-8deg', '--i': 0 }}>
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
                  <span className={`font-plush ${styles.stampTitle}`}>Hand-selected breeders</span>
                </span>
                <p className={styles.entryText}>
                  We work only with breeders who uphold the highest ethical and health standards.
                </p>
              </li>

              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#1f6b45', '--tilt': '5deg', '--i': 1 }}>
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
                  <span className={`font-plush ${styles.stampTitle}`}>Full transparency</span>
                </span>
                <p className={styles.entryText}>
                  Photos, videos, and health certificates are shared before your puppy travels.
                </p>
              </li>

              <li className={styles.promiseEntry} style={{ '--ink-stamp': '#5a3a28', '--tilt': '-4deg', '--i': 2 }}>
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
                  <span className={`font-plush ${styles.stampTitle}`}>Safe, stress-free delivery</span>
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
              <h2 id="delivery-title" className={`font-plush ${styles.sectionHeading}`}>
                Delivery &amp; collection
              </h2>
              <p className={styles.deliveryLede}>
                From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
              </p>
              <ul className={styles.deliveryList}>
                <li>
                  <h3 className={`font-plush-text ${styles.deliveryItemTitle}`}>Take your puppy home the same day</h3>
                  <p className={styles.deliveryItemDesc}>
                    Local puppies are available immediately — visit, fall in love, and go home together.
                  </p>
                </li>
                <li>
                  <h3 className={`font-plush-text ${styles.deliveryItemTitle}`}>Delivery within Dubai</h3>
                  <p className={styles.deliveryItemDesc}>
                    Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.
                  </p>
                </li>
                <li>
                  <h3 className={`font-plush-text ${styles.deliveryItemTitle}`}>Safe international cargo</h3>
                  <p className={styles.deliveryItemDesc}>
                    We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.
                  </p>
                </li>
                <li>
                  <h3 className={`font-plush-text ${styles.deliveryItemTitle}`}>Worldwide delivery</h3>
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
              <div ref={flightContainerRef} className={styles.flightScene}>
                <svg viewBox="0 0 660 300" role="img" aria-label="A plane flying puppies from Korea to Dubai">
                  <path
                    ref={flightPathRef}
                    d="M40 250 C 170 40, 470 20, 620 168"
                    className={styles.flightRoute}
                  />
                  <circle cx="40" cy="250" r="7" className={styles.flightDot} />
                  <circle cx="620" cy="168" r="7" className={styles.flightDot} />
                  <text x="40" y="284" textAnchor="middle" className={styles.flightLabel}>
                    Korea
                  </text>
                  <text x="620" y="202" textAnchor="middle" className={styles.flightLabel}>
                    Dubai
                  </text>
                  <g
                    ref={flightPlaneRef}
                    transform="translate(40.0 250.0) rotate(-58.1)"
                    style={{ opacity: 0 }}
                  >
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
              <h2 id="why-title" className={`font-plush ${styles.sectionHeading}`}>
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
                  <h3 className={`font-plush ${styles.featureTitle}`}>International cargo</h3>
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
                  <h3 className={`font-plush ${styles.featureTitle}`}>Support 24/7</h3>
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
                  <h3 className={`font-plush ${styles.featureTitle}`}>Health guarantee</h3>
                  <p className={styles.featureDesc}>
                    All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* ── 5. Unique & High Quality Puppies Board ── */}
          <section aria-labelledby="care-title" className={`tp-board ${styles.boardCard}`}>
            <div className={styles.boardContent}>
              <h2 id="care-title" className={`font-plush text-big ${styles.boardHeading}`}>
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
              <MascotPup pose="walking" facing="left" ariaLabel="Teddy, ready to play" className={styles.playfulTeddy} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}