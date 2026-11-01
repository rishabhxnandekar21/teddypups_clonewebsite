import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPuppyBySlug, puppies } from '../data/puppies.js';
import { BUSINESS } from '../data/navigation.js';
import MascotPup from '../components/common/MascotPup.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './PuppyDetailPage.module.css';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const puppy = slug ? getPuppyBySlug(slug) : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scrollScale, setScrollScale] = useState(0.1);
  const [enquirySent, setEnquirySent] = useState(false);

  // Storybook ribbon scroll progress
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) {
        const ratio = Math.min(1, Math.max(0.08, window.scrollY / docH));
        setScrollScale(ratio);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Title and scroll reset on slug change
  useEffect(() => {
    setActiveImageIndex(0);
    setEnquirySent(false);
    if (puppy) {
      document.title = `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`;
    } else {
      document.title = 'Puppy Not Found | TeddyPups U.A.E.';
    }
    window.scrollTo(0, 0);
  }, [puppy, slug]);

  if (!puppy) {
    return (
      <main className="container section-pad text-center">
        <PawIcon size={44} color="var(--color-toffee)" />
        <h1 className="section-heading" style={{ marginTop: '1rem' }}>Puppy not found</h1>
        <p className="section-subheading" style={{ margin: '1rem auto 2rem' }}>
          We could not find the puppy profile with slug: <code>{slug}</code>. They might have already found their forever family!
        </p>
        <Link to="/puppies" className="btn btn-primary">
          Browse all available puppies
        </Link>
      </main>
    );
  }

  const isGoneHome = puppy.status === 'gone-home' || puppy.status === 'adopted';
  const images = puppy.images && puppy.images.length > 0 ? puppy.images : ['/media/puppies/maltipoo-1.jpg'];
  const totalImages = images.length;
  const currentImage = images[activeImageIndex] || images[0];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  const whatsappInquiryUrl = isGoneHome
    ? `https://wa.me/971541676733?text=${encodeURIComponent(
        `Hi TeddyPups! I saw ${puppy.name} (${puppy.breed}) who has gone home. I would love to ask about upcoming puppies like ${puppy.name}!`
      )}`
    : `https://wa.me/971541676733?text=${encodeURIComponent(
        `Hi TeddyPups! I'm interested in ${puppy.name}, the ${puppy.breed}: https://puppy.instabizweb.com/puppies/${puppy.slug}`
      )}`;

  // Find previous and next puppies for bottom navigation cards
  const currentIndex = puppies.findIndex((p) => p.slug === puppy.slug);
  const prevPuppy = currentIndex > 0 ? puppies[currentIndex - 1] : puppies[puppies.length - 1];
  const nextPuppy = currentIndex < puppies.length - 1 ? puppies[currentIndex + 1] : puppies[0];

  const getCoatColor = (p) => {
    if (p.colorHex) return p.colorHex;
    const clr = (p.color || '').toLowerCase();
    if (clr.includes('white') || clr.includes('cream')) return '#e8d5be';
    if (clr.includes('apricot') || clr.includes('golden')) return '#c8965a';
    if (clr.includes('chocolate') || clr.includes('brown')) return '#5a3d28';
    if (clr.includes('red')) return '#964b28';
    return '#785838';
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySent(true);
  };

  return (
    <div data-page="pup" className="tp-page">
      <article
        className={styles.storybook}
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${getCoatColor(puppy)} 24%, var(--color-milk)) 0, var(--color-milk) 85%)`,
        }}
      >
        {/* Storybook Ribbon Bookmark */}
        <div aria-hidden="true" className={styles.ribbon}>
          <div className={styles.ribbonTrack}>
            <span
              className={styles.ribbonBand}
              style={{ transform: `scaleY(${scrollScale})` }}
            />
          </div>
        </div>

        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link to={isGoneHome ? '/gone-home' : '/puppies'} className={styles.breadcrumbLink}>
              {isGoneHome ? 'Gone home' : 'Available puppies'}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{puppy.name}</span>
          </nav>

          {/* ── Chapter 1: hello, it's me ── */}
          <p className={styles.chapter}>
            <span aria-hidden="true" className={styles.chapterN}>1</span>
            <span className={styles.chapterText}>hello, it's me</span>
          </p>

          <div className={styles.chapter1Grid}>
            {/* Left Media Display */}
            <div className={styles.mediaCol}>
              <div className={styles.storypage}>
                <div className={styles.photoFrame}>
                  {puppy.hasVideo && activeImageIndex === 1 ? (
                    <div className={styles.videoPlaceholder}>
                      <img
                        src={currentImage}
                        alt={`${puppy.name}, video thumbnail`}
                        className={styles.storyImg}
                      />
                      <span className={styles.videoCenterPlay}>▶</span>
                    </div>
                  ) : (
                    <img
                      src={currentImage}
                      alt={`${puppy.name}, ${puppy.gender === 'male' ? 'male' : 'female'} ${puppy.breed} puppy`}
                      className={styles.storyImg}
                    />
                  )}
                </div>

                {totalImages > 1 && (
                  <div className={styles.photoControls}>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className={styles.photoNavBtn}
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <span className={styles.photoBadge}>
                      {activeImageIndex + 1} / {totalImages}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className={styles.photoNavBtn}
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {totalImages > 1 && (
                <ul className={styles.thumbnailStrip} aria-label={`All photos of ${puppy.name}`}>
                  {images.map((imgUrl, idx) => {
                    const isActive = idx === activeImageIndex;
                    const isVideoThumb = puppy.hasVideo && idx === 1;
                    return (
                      <li key={imgUrl} className={styles.thumbItem}>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          aria-label={`${puppy.name}, ${isVideoThumb ? 'video' : 'photo'} ${idx + 1} of ${totalImages}`}
                          aria-current={isActive}
                          className={`${styles.thumbBtn} ${isActive ? styles.thumbBtnActive : ''}`}
                        >
                          <img src={imgUrl} alt="" className={styles.thumbImg} />
                          {isVideoThumb && (
                            <span className={styles.videoThumbPlay}>▶</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Right Tag Board */}
            <div className={styles.tagCol}>
              <div className={styles.tagSticky}>
                <div className={styles.tagBoard}>
                  <span aria-hidden="true" className={styles.tagRing} />
                  
                  {/* Peeking Mascot */}
                  <div className={styles.tagMascot} data-facing="right">
                    <MascotPup
                      pose="peeking"
                      facing="right"
                      ariaLabel={`Teddy, peeking over ${puppy.name}'s tag`}
                    />
                  </div>

                  <span className={styles.chip}>
                    <PawIcon size={14} color="var(--color-toffee)" />
                    <span>{isGoneHome ? 'Gone Home ♥' : 'Available'}</span>
                  </span>

                  <h1 className={styles.pupName}>{puppy.name}</h1>
                  <p className={styles.pupBreed}>{puppy.subBreed || puppy.breed}</p>

                  <dl className={styles.specsDl}>
                    <div>
                      <dt className={styles.specDt}>Breed</dt>
                      <dd className={styles.specDd}>{puppy.breed}</dd>
                    </div>
                    <div>
                      <dt className={styles.specDt}>Boy or girl</dt>
                      <dd className={styles.specDd}>{puppy.gender === 'male' ? 'Boy' : 'Girl'}</dd>
                    </div>
                    <div>
                      <dt className={styles.specDt}>Age</dt>
                      <dd className={styles.specDd}>{puppy.age || '3 months'}</dd>
                    </div>
                    <div>
                      <dt className={styles.specDt}>Where</dt>
                      <dd className={styles.specDd}>
                        {puppy.location || (puppy.origin === 'local' ? 'In Dubai showroom' : 'Imported for you')}
                      </dd>
                    </div>
                  </dl>

                  <div className={styles.tagActions}>
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                    >
                      {isGoneHome ? 'Ask about a puppy like this' : `Ask about ${puppy.name} on WhatsApp`}
                    </a>
                    <a href={`#enquire-${puppy.slug}`} className="btn btn-ghost">
                      Send an enquiry
                    </a>
                  </div>
                </div>

                {/* ── Chapter 2: what comes with puppy ── */}
                <div className={styles.paperNote}>
                  <p className={styles.chapter}>
                    <span aria-hidden="true" className={styles.chapterN}>2</span>
                    <span className={styles.chapterText}>what comes with {puppy.name}</span>
                  </p>
                  <h2 className={styles.paperTitle}>Every Teddy Pup comes</h2>
                  <ul className={styles.inclusionsList}>
                    <li className={styles.inclusionItem}>
                      <svg viewBox="0 0 32 32" className={styles.checkIcon} aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Vaccinated</span>
                    </li>
                    <li className={styles.inclusionItem}>
                      <svg viewBox="0 0 32 32" className={styles.checkIcon} aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Dewormed</span>
                    </li>
                    <li className={styles.inclusionItem}>
                      <svg viewBox="0 0 32 32" className={styles.checkIcon} aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Verified health certificate from licensed vets</span>
                    </li>
                    <li className={styles.inclusionItem}>
                      <svg viewBox="0 0 32 32" className={styles.checkIcon} aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Thoroughly checked before joining your family</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── Chapter 3: the way home ── */}
          <section aria-labelledby={`home-steps-${puppy.slug}`} className={styles.trailSection}>
            <p className={styles.chapter}>
              <span aria-hidden="true" className={styles.chapterN}>3</span>
              <span className={styles.chapterText}>the way home</span>
            </p>
            <h2 id={`home-steps-${puppy.slug}`} className={styles.trailTitle}>
              {puppy.origin === 'local' ? 'Bringing your puppy home in Dubai' : 'Coming home from abroad'}
            </h2>
            <ol className={styles.trailList}>
              <li className={styles.trailStep}>
                <span aria-hidden="true" className={styles.trailNum}>1</span>
                <h3 className={styles.stepHeading}>Reserve your puppy</h3>
                <p className={styles.stepCopy}>Tell us which puppy has captured your heart.</p>
              </li>
              <li className={styles.trailStep}>
                <span aria-hidden="true" className={styles.trailNum}>2</span>
                <h3 className={styles.stepHeading}>Personalized consultation</h3>
                <p className={styles.stepCopy}>We finalize details with you and share updates on your puppy's journey.</p>
              </li>
              <li className={styles.trailStep}>
                <span aria-hidden="true" className={styles.trailNum}>3</span>
                <h3 className={styles.stepHeading}>Import and arrival</h3>
                <p className={styles.stepCopy}>We manage health checks, travel arrangements, and documentation.</p>
              </li>
              <li className={styles.trailStep}>
                <span aria-hidden="true" className={styles.trailNum}>4</span>
                <h3 className={styles.stepHeading}>Welcome home</h3>
                <p className={styles.stepCopy}>We help your new puppy settle in and ensure a smooth transition into your home.</p>
              </li>
            </ol>
          </section>

          {/* ── Chapter 4: dear TeddyPups... ── */}
          <section id={`enquire-${puppy.slug}`} aria-labelledby={`enquire-title-${puppy.slug}`} className={styles.letterSection}>
            <span aria-hidden="true" className={styles.letterStamp}>
              <PawIcon size={32} color="var(--color-toffee-deep)" />
            </span>

            <div className={styles.letterCopy}>
              <p className={styles.chapter}>
                <span aria-hidden="true" className={styles.chapterN}>4</span>
                <span className={styles.chapterText}>dear TeddyPups…</span>
              </p>
              <h2 id={`enquire-title-${puppy.slug}`} className={styles.letterTitle}>
                Ask about {puppy.name}
              </h2>
              <p className={styles.letterLede}>
                Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.
              </p>
            </div>

            <div className={styles.letterFormCol}>
              {enquirySent ? (
                <div className={styles.sentBox}>
                  <PawIcon size={36} color="var(--color-toffee)" />
                  <p className={styles.sentTitle}>Thank you, friend!</p>
                  <p className={styles.sentDesc}>
                    We received your message about {puppy.name}. Our concierge will get back to you shortly!
                  </p>
                  <a href={whatsappInquiryUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-4">
                    Message us on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className={styles.letterForm}>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.formLabel}>
                        Your name <span className={styles.reqStar}>*</span>
                      </label>
                      <input
                        required
                        minLength={2}
                        maxLength={80}
                        name="name"
                        placeholder="your name"
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label className={styles.formLabel}>
                        Phone or WhatsApp <span className={styles.reqStar}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        placeholder="+971 50 123 4567"
                        className={styles.formInput}
                      />
                      <p className={styles.formHint}>With country code, e.g. +971 50 123 4567</p>
                    </div>
                    <div>
                      <label className={styles.formLabel}>
                        Email <span className={styles.optLabel}>(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your email"
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label className={styles.formLabel}>
                        Your area <span className={styles.optLabel}>(optional)</span>
                      </label>
                      <input
                        name="area"
                        placeholder="e.g. Dubai Marina"
                        className={styles.formInput}
                      />
                      <p className={styles.formHint}>e.g. Dubai Marina</p>
                    </div>
                  </div>

                  <div>
                    <label className={styles.formLabel}>
                      Message <span className={styles.optLabel}>(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={2000}
                      defaultValue={`Hi! I'd love to know more about ${puppy.name} (${puppy.breed}).`}
                      className={styles.formTextarea}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Send enquiry
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* ── Bottom Prev / Next Pup Navigation ── */}
          <nav aria-label="More puppies" className={styles.siblingNav}>
            <Link
              to={`/puppies/${prevPuppy.slug}`}
              className={styles.siblingCard}
            >
              <span className={styles.siblingThumb}>
                <img
                  src={prevPuppy.image || prevPuppy.images?.[0]}
                  alt={`${prevPuppy.gender === 'male' ? 'Male' : 'Female'} ${prevPuppy.breed} puppy`}
                  className={styles.siblingImg}
                />
              </span>
              <span>
                <span className={styles.siblingKicker}>Previous pup</span>
                <span className={styles.siblingTitle}>{prevPuppy.name || prevPuppy.breed}</span>
              </span>
            </Link>

            <Link
              to={`/puppies/${nextPuppy.slug}`}
              className={`${styles.siblingCard} ${styles.siblingCardNext}`}
            >
              <span className={styles.siblingThumb}>
                <img
                  src={nextPuppy.image || nextPuppy.images?.[0]}
                  alt={`${nextPuppy.gender === 'male' ? 'Male' : 'Female'} ${nextPuppy.breed} puppy`}
                  className={styles.siblingImg}
                />
              </span>
              <span>
                <span className={styles.siblingKicker}>Next pup</span>
                <span className={styles.siblingTitle}>{nextPuppy.name || nextPuppy.breed}</span>
              </span>
            </Link>
          </nav>
        </div>
      </article>
    </div>
  );
}
