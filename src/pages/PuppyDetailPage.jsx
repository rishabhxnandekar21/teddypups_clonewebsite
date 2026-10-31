import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ChevronRight, Video, Mail } from 'lucide-react';
import { getPuppyBySlug, puppies } from '../data/puppies.js';
import PuppyCard from '../components/ui/PuppyCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './PuppyDetailPage.module.css';

export default function PuppyDetailPage() {
  const { slug } = useParams();
  const puppy = slug ? getPuppyBySlug(slug) : undefined;

  useEffect(() => {
    if (puppy) {
      document.title = `${puppy.name} (${puppy.breed}) — Available Puppy | TeddyPups UAE`;
    } else {
      document.title = 'Puppy Not Found — TeddyPups UAE';
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

  const whatsappInquiryUrl = `https://wa.me/971541676733?text=${encodeURIComponent(
    `Hi TeddyPups! I am inquiring about ${puppy.name} (${puppy.breed}). Is ${puppy.gender === 'male' ? 'he' : 'she'} still available?`
  )}`;

  const otherPuppies = puppies.filter(p => p.slug !== puppy.slug).slice(0, 3);

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
        {/* ── Breadcrumbs ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/puppies" className={styles.breadcrumbLink}>Available puppies</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span>{puppy.name}</span>
        </nav>

        {/* ── Detail Grid ── */}
        <div className={styles.detailGrid}>
          {/* Media Column */}
          <div className={styles.mediaCol}>
            <div className={styles.imageCard}>
              <img
                src={puppy.images[0]}
                alt={`${puppy.name}, ${puppy.breed}`}
                className={styles.mainImage}
                width={600}
                height={450}
              />
              {puppy.hasVideo && (
                <div className={styles.videoTag}>
                  <Video size={14} color="var(--color-toffee)" />
                  <span>▶ Video Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column / Spec Card with Stitch Border */}
          <div className={styles.specCard}>
            <div className={styles.specHeader}>
              <span className={styles.stepTag}>① hello, it's me!</span>
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
                <span className={styles.specValue}>{puppy.location || (puppy.origin === 'local' ? 'In Dubai showroom' : 'Imported for you')}</span>
              </div>
            </div>

            <p className={styles.description}>
              {puppy.description ||
                `${puppy.name} is a healthy, charming ${puppy.breed} puppy lovingly cared for. Contact our Dubai concierge team for full video footage, health certificates, and consultation.`}
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
                Ask about {puppy.name} on WhatsApp
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
            <span className="section-eyebrow">② what comes with {puppy.name}</span>
            <h2 className="section-heading" id="inclusions-title" style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
              Complete adoption inclusions
            </h2>
          </div>

          <div className={styles.inclusionsGrid}>
            {(puppy.features || defaultInclusions).map(feature => (
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

          <div className="puppiesGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {otherPuppies.map(other => (
              <PuppyCard key={other.slug} puppy={other} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
