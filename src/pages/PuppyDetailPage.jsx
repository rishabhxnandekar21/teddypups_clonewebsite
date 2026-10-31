import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ChevronRight, Video, Mail, ChevronLeft } from 'lucide-react';
import { getPuppyBySlug, puppies } from '../data/puppies.js';
import PuppyCard from '../components/ui/PuppyCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './PuppyDetailPage.module.css';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const puppy = slug ? getPuppyBySlug(slug) : undefined;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index whenever slug changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (puppy) {
      const isGoneHome = puppy.status === 'gone-home' || puppy.status === 'adopted';
      const statusLabel = isGoneHome ? 'Gone Home ♥' : 'Available Puppy';
      document.title = `${puppy.name} (${puppy.breed}) — ${statusLabel} | TeddyPups UAE`;
    } else {
      document.title = 'Puppy Not Found — TeddyPups UAE';
    }
    window.scrollTo(0, 0);
  }, [puppy, slug]);

  // Keyboard navigation for image gallery
  useEffect(() => {
    if (!puppy || !puppy.images || puppy.images.length <= 1) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : puppy.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < puppy.images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [puppy]);

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
        `Hi TeddyPups! I am inquiring about ${puppy.name} (${puppy.breed}). Is ${puppy.gender === 'male' ? 'he' : 'she'} still available?`
      )}`;

  // Find previous and next puppies in the collection for navigation
  const currentIndex = puppies.findIndex((p) => p.slug === puppy.slug);
  const prevPuppy = currentIndex > 0 ? puppies[currentIndex - 1] : puppies[puppies.length - 1];
  const nextPuppy = currentIndex < puppies.length - 1 ? puppies[currentIndex + 1] : puppies[0];

  // Contextual related puppies: same breed or same status first, then other available
  const otherPuppies = puppies
    .filter((p) => p.slug !== puppy.slug)
    .sort((a, b) => {
      if (a.breed === puppy.breed && b.breed !== puppy.breed) return -1;
      if (b.breed === puppy.breed && a.breed !== puppy.breed) return 1;
      if (a.status === puppy.status && b.status !== puppy.status) return -1;
      return 0;
    })
    .slice(0, 3);

  const defaultInclusions = [
    'Complete veterinary health clearance',
    'Full age-appropriate vaccinations',
    'ISO microchip with UAE registration certificate',
    'Export & MOCCAE entry documentation',
    'Luxury puppy starter cuddle kit',
    '24/7 post-adoption care concierge',
  ];

  return (
    <div className={styles.page}>
      <div className="container">
        {/* ── Breadcrumbs & Prev/Next Bar ── */}
        <div className={styles.navRow}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
            {isGoneHome ? (
              <>
                <Link to="/gone-home" className={styles.breadcrumbLink}>
                  Gone home
                </Link>
                <span className={styles.breadcrumbSep} aria-hidden="true">
                  /
                </span>
                <span className={styles.breadcrumbCurrent}>{puppy.name}</span>
              </>
            ) : (
              <>
                <Link to="/puppies" className={styles.breadcrumbLink}>
                  Available puppies
                </Link>
                <span className={styles.breadcrumbSep} aria-hidden="true">
                  /
                </span>
                <span className={styles.breadcrumbCurrent}>{puppy.name}</span>
              </>
            )}
          </nav>

          {/* Sibling Puppy Quick Links */}
          <div className={styles.pupSiblingNav}>
            <Link
              to={`/puppies/${prevPuppy.slug}`}
              className={styles.pupSiblingLink}
              title={`Previous pup: ${prevPuppy.name}`}
            >
              <ChevronLeft size={14} aria-hidden="true" />
              <span>Previous pup</span>
            </Link>
            <span className={styles.pupSiblingDivider}>•</span>
            <Link
              to={`/puppies/${nextPuppy.slug}`}
              className={styles.pupSiblingLink}
              title={`Next pup: ${nextPuppy.name}`}
            >
              <span>Next pup</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── Detail Grid ── */}
        <div className={styles.detailGrid}>
          {/* Media Column / Gallery */}
          <div className={styles.mediaCol}>
            <div className={styles.imageCard}>
              <img
                src={currentImage}
                alt={`${puppy.name}, ${puppy.breed} photo ${activeImageIndex + 1} of ${totalImages}`}
                className={styles.mainImage}
                width={700}
                height={840}
              />

              {puppy.hasVideo && activeImageIndex === 0 && (
                <div className={styles.videoTag}>
                  <Video size={14} color="var(--color-toffee)" />
                  <span>▶ Video Available</span>
                </div>
              )}

              {/* Gallery Controls Overlay */}
              {totalImages > 1 && (
                <div className={styles.galleryControls}>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className={styles.navBtn}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <span className={styles.counterBadge}>
                    {activeImageIndex + 1} / {totalImages}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className={styles.navBtn}
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
                  return (
                    <li key={imgUrl} className={styles.thumbItem}>
                      <button
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`${styles.thumbBtn} ${isActive ? styles.thumbActive : ''}`}
                        aria-label={`${puppy.name}, photo ${idx + 1} of ${totalImages}`}
                        aria-current={isActive ? 'true' : 'false'}
                      >
                        <img src={imgUrl} alt="" className={styles.thumbImage} loading="lazy" />
                        {puppy.hasVideo && idx === 1 && (
                          <span className={styles.videoOverlay} aria-hidden="true">
                            ▶
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Right Column / Spec Card */}
          <div className={styles.specCard}>
            <div className={styles.specHeader}>
              <span className={styles.stepTag}>
                {isGoneHome ? "1 the day they went home" : "1 hello, it's me"}
              </span>

              {isGoneHome ? (
                <div className={`${styles.statusBadge} ${styles.statusBadgeGoneHome}`}>
                  GONE HOME ♥
                </div>
              ) : (
                <div className={`${styles.statusBadge} ${styles.statusBadgeAvailable}`}>
                  ● Available
                </div>
              )}

              <h1 className={styles.pupTitle}>{puppy.name}</h1>
              <p className={styles.pupBreed}>{puppy.subBreed || puppy.breed}</p>
            </div>

            {/* Specs Grid */}
            <div className={styles.specsTable}>
              <div className={styles.specCell}>
                <span className={styles.specLabel}>Breed</span>
                <span className={styles.specValue}>{puppy.breed}</span>
              </div>
              <div className={styles.specCell}>
                <span className={styles.specLabel}>Boy or girl</span>
                <span className={styles.specValue}>
                  {puppy.genderLabel || (puppy.gender === 'male' ? 'Boy' : 'Girl')}
                </span>
              </div>
              <div className={styles.specCell}>
                <span className={styles.specLabel}>Age</span>
                <span className={styles.specValue}>{puppy.age || `${puppy.ageWeeks} weeks`}</span>
              </div>
              <div className={styles.specCell}>
                <span className={styles.specLabel}>Where</span>
                <span className={styles.specValue}>
                  {puppy.location || (puppy.origin === 'local' ? 'In Dubai showroom' : 'Imported for you')}
                </span>
              </div>
            </div>

            <p className={styles.description}>
              {puppy.description ||
                (isGoneHome
                  ? `${puppy.name} has already found their loving forever family in the UAE! If you love ${puppy.breed}s, our concierge can find or import a healthy, certified puppy just like ${puppy.name}.`
                  : `${puppy.name} is a healthy, charming ${puppy.breed} puppy lovingly cared for. Contact our Dubai concierge team for full video footage, health certificates, and consultation.`)}
            </p>

            {/* Actions */}
            <div className={styles.ctaActions}>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {isGoneHome ? 'Ask about a puppy like this' : `Ask about ${puppy.name} on WhatsApp`}
              </a>
              <Link to="/contact" className="btn btn-outline btn-lg">
                <Mail size={18} aria-hidden="true" />
                Send an enquiry
              </Link>
            </div>
          </div>
        </div>

        {/* ── Section 2: Inclusions ── */}
        <section className={styles.inclusionsSection} aria-labelledby="inclusions-title">
          <div className={styles.inclusionsHeader}>
            <span className="section-eyebrow">
              {isGoneHome ? `② what came with ${puppy.name}` : `② what comes with ${puppy.name}`}
            </span>
            <h2
              className="section-heading"
              id="inclusions-title"
              style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}
            >
              Every Teddy Pup comes
            </h2>
          </div>

          <div className={styles.inclusionsGrid}>
            {(puppy.features || defaultInclusions).map((feature) => (
              <div key={feature} className={styles.inclusionItem}>
                <CheckCircle2 size={18} color="var(--color-whatsapp)" style={{ flexShrink: 0 }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Other Puppies ── */}
        <section className={styles.otherSection} aria-labelledby="other-pups-title">
          <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">more furry friends</span>
            <h2 className="section-heading" id="other-pups-title" style={{ fontSize: '2rem' }}>
              You might also love
            </h2>
          </div>

          <div className={styles.relatedGrid}>
            {otherPuppies.map((other) => (
              <PuppyCard key={other.slug} puppy={other} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
