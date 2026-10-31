import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, CheckCircle, Truck, Building, Search, Heart, Sparkles, Plane, Home } from 'lucide-react';
import { BUSINESS } from '../data/navigation.js';
import PawIcon from '../components/common/PawIcon.jsx';
import styles from './HowItWorksPage.module.css';

const STEPS_LOCAL = [
  {
    step: '1',
    title: 'Explore our puppies',
    desc: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.',
    tint: '#fbe3b4',
    icon: Search,
  },
  {
    step: '2',
    title: 'Choose your puppy',
    desc: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.',
    tint: '#fde6de',
    icon: Heart,
  },
  {
    step: '3',
    title: 'Meet before you choose',
    desc: 'Spend time bonding before making your decision.',
    tint: '#e3f0fb',
    icon: Building,
  },
  {
    step: '4',
    title: 'Pick-up or delivery',
    desc: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.',
    tint: '#e6f2df',
    icon: Truck,
  },
];

const STEPS_IMPORT = [
  {
    step: '1',
    title: 'Reserve your puppy',
    desc: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.',
    tint: '#fbe3b4',
    icon: Sparkles,
  },
  {
    step: '2',
    title: 'Personalized consultation',
    desc: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey.",
    tint: '#fde6de',
    icon: MessageCircle,
  },
  {
    step: '3',
    title: 'Import and arrival',
    desc: 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.',
    tint: '#e3f0fb',
    icon: Plane,
  },
  {
    step: '4',
    title: 'Welcome home',
    desc: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.',
    tint: '#e6f2df',
    icon: Home,
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

          <ol className={styles.timelineGrid}>
            {currentSteps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <li
                  key={item.step}
                  className={styles.timelineCard}
                  style={{ '--tint': item.tint, '--i': idx }}
                >
                  <span aria-hidden="true" className={styles.stepIcon}>
                    <IconComp size={26} strokeWidth={2.2} />
                  </span>
                  <span className={styles.stepNum}>Step {item.step}</span>
                  <h3 className={styles.stepName}>{item.title}</h3>
                  <p className={styles.stepDetails}>{item.desc}</p>
                </li>
              );
            })}
          </ol>
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
