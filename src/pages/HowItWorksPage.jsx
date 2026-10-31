import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, CheckCircle, Truck, Building } from 'lucide-react';
import { BUSINESS } from '../data/navigation.js';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './HowItWorksPage.module.css';

const STEPS_LOCAL = [
  {
    step: '01',
    title: 'Explore our puppies',
    desc: 'Browse our live gallery of available puppies or WhatsApp us to ask about specific miniature designer breeds.',
  },
  {
    step: '02',
    title: 'Choose your puppy',
    desc: 'Receive updated video clips, photos, veterinary certificates, and personal guidance on puppy personality.',
  },
  {
    step: '03',
    title: 'Meet before you choose',
    desc: 'Visit our welcoming Downtown Dubai showroom for an unhurried, private play session with your chosen pup.',
  },
  {
    step: '04',
    title: 'Pick-up or delivery',
    desc: 'Complete simple adoption documentation and bring your puppy home the same day, or book private chauffeur delivery.',
  },
];

const STEPS_IMPORT = [
  {
    step: '01',
    title: 'Reserve your puppy',
    desc: 'Share your dream breed, color, gender, and size preferences with our international breeding concierge.',
  },
  {
    step: '02',
    title: 'Personalized consultation',
    desc: 'Review high-resolution videos, parents’ pedigree documents, and certified veterinary pre-export screenings.',
  },
  {
    step: '03',
    title: 'Import & arrival',
    desc: 'We secure UAE MOCCAE import permits and arrange in-cabin flight nanny transport with temperature control.',
  },
  {
    step: '04',
    title: 'Welcome home',
    desc: 'Airport customs clearance handled seamlessly. Meet your new companion directly at our showroom or at your doorstep.',
  },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('local');

  useEffect(() => {
    document.title = 'How It Works — TeddyPups UAE Adoption Guide';
  }, []);

  const currentSteps = activeTab === 'local' ? STEPS_LOCAL : STEPS_IMPORT;

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.header} aria-labelledby="how-heading">
        <div className={`container ${styles.headerInner}`}>
          <div className="section-eyebrow">
            <PawIcon size={14} color="var(--color-toffee)" />
            <span>the journey home</span>
          </div>

          <h1 className={styles.title} id="how-heading">
            How it works
          </h1>

          <p className={styles.subhead}>
            Whether you choose to visit us locally in Downtown Dubai or order a rare miniature breed from overseas, TeddyPups is here to make the experience seamless and unforgettable.
          </p>

          <nav className={styles.jumpPills} aria-label="Quick jump section links">
            <a href="#two-ways" className={styles.jumpPill}>1 Two ways home</a>
            <a href="#promise" className={styles.jumpPill}>2 Our premium puppy promise</a>
            <a href="#delivery" className={styles.jumpPill}>3 Delivery & collection</a>
            <a href="#why-us" className={styles.jumpPill}>4 Why choose us</a>
          </nav>
        </div>
      </section>

      {/* ── Two Ways Switcher ── */}
      <section className={styles.switcherSection} id="two-ways" aria-labelledby="switcher-heading">
        <div className="container">
          <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-eyebrow">step by step</span>
            <h2 className="section-heading" id="switcher-heading">Two ways home</h2>
          </div>

          <div className={styles.switchControls}>
            <button
              type="button"
              className={`${styles.switchTab} ${activeTab === 'local' ? styles.active : ''}`}
              onClick={() => setActiveTab('local')}
            >
              In Dubai (meet in person)
            </button>
            <button
              type="button"
              className={`${styles.switchTab} ${activeTab === 'import' ? styles.active : ''}`}
              onClick={() => setActiveTab('import')}
            >
              Imported (order upon request)
            </button>
          </div>

          <div className={styles.timelineGrid}>
            {currentSteps.map(item => (
              <div key={item.step} className={styles.timelineCard}>
                <span className={styles.stepNum}>{item.step}</span>
                <h3 className={styles.stepName}>{item.title}</h3>
                <p className={styles.stepDetails}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Premium Puppy Promise ── */}
      <section className={styles.promiseSection} id="promise" aria-labelledby="promise-heading">
        <div className="container">
          <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">uncompromising standards</span>
            <h2 className="section-heading" id="promise-heading">Our premium puppy promise</h2>
          </div>

          <div className={styles.promiseGrid}>
            <div className={styles.promiseCard}>
              <Shield size={32} color="var(--color-toffee)" />
              <h3 className={styles.promiseTitle}>100% Health Guarantee</h3>
              <p className={styles.promiseText}>
                Every puppy is covered by our comprehensive veterinary warranty. If any genetic issue arises within the covered period, we provide immediate medical support and solutions.
              </p>
            </div>

            <div className={styles.promiseCard}>
              <CheckCircle size={32} color="var(--color-whatsapp)" />
              <h3 className={styles.promiseTitle}>MOCCAE & Vet Clearance</h3>
              <p className={styles.promiseText}>
                Every puppy undergoes stringent clinical veterinary checks, full age-appropriate vaccinations, deworming, and microchipping under UAE government regulations.
              </p>
            </div>

            <div className={styles.promiseCard}>
              <MessageCircle size={32} color="var(--color-toffee)" />
              <h3 className={styles.promiseTitle}>Lifetime Care Guidance</h3>
              <p className={styles.promiseText}>
                Our relationship doesn’t end when your puppy goes home. Reach out to our concierge team 24/7 for nutrition advice, potty training tips, and recommended vet contacts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Delivery & Collection ── */}
      <section className={styles.deliverySection} id="delivery" aria-labelledby="delivery-heading">
        <div className="container">
          <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">convenience & care</span>
            <h2 className="section-heading" id="delivery-heading">Delivery & collection</h2>
          </div>

          <div className={styles.deliveryGrid}>
            <div className={styles.deliveryCard}>
              <Building size={32} color="var(--color-toffee)" />
              <h3 className={styles.deliveryTitle}>Downtown Dubai Showroom Pickup</h3>
              <p className={styles.deliveryDesc}>
                Experience a private, relaxed handover in our Downtown Dubai showroom. Review all paperwork with our specialist and receive your complimentary puppy starter cuddle kit.
              </p>
            </div>

            <div className={styles.deliveryCard}>
              <Truck size={32} color="var(--color-whatsapp)" />
              <h3 className={styles.deliveryTitle}>Doorstep Chauffeur Delivery</h3>
              <p className={styles.deliveryDesc}>
                We provide climate-controlled, gentle pet chauffeur delivery throughout Dubai, Abu Dhabi, Sharjah, and all other Emirates directly to your residence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ready to take the next step ── */}
      <section className="container" id="why-us" style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3.5rem 2rem', border: '3px solid var(--color-cocoa)', borderRadius: 'var(--radius-xl)' }}>
          <h2 className="section-heading" style={{ fontSize: '2rem' }}>Ready to take the next step?</h2>
          <p className="section-subheading" style={{ margin: '1rem auto 1.5rem' }}>
            Our team is available right now on WhatsApp to answer your questions or arrange a showroom visit.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link to="/puppies" className="btn btn-primary btn-lg">
              View available puppies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
