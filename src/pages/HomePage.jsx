import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, HeartHandshake, Plane, Stethoscope, Sparkles } from 'lucide-react';
import { puppies } from '../data/puppies.js';
import { faqItems } from '../data/faq.js';
import { moments } from '../data/families.js';
import { BUSINESS } from '../data/navigation.js';
import PuppyCard from '../components/ui/PuppyCard.jsx';
import AccordionItem from '../components/ui/AccordionItem.jsx';
import PolaroidCard from '../components/ui/PolaroidCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import SplashCurtain from '../components/common/SplashCurtain.jsx';
import styles from './HomePage.module.css';

const ARCH_PUPPIES = [
  { name: 'Max', breed: 'Maltipoo', img: '/media/maltipoo-max-male.webp' },
  { name: 'Luna', breed: 'Korean Teacup', img: '/media/korean-teacup-maltipoo-female.jpg' },
  { name: 'Coco', breed: 'Pomeranian', img: '/media/pomeranian-female.jpg' },
  { name: 'Teddy', breed: 'Cavapoo', img: '/media/maltipoo-cavapoo-male.jpg' },
  { name: 'Leo', breed: 'Toy Poodle', img: '/media/poodle-leo-male.jpg' },
  { name: 'Snow', breed: 'Maltipoo', img: '/media/maltipoo-female-2.jpg' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = 'TeddyPups UAE — Premium Teacup Puppies in Dubai';
  }, []);

  // First 6 puppies for homepage showcase
  const featuredPuppies = puppies.slice(0, 6);
  // First 4 moments for Happy Families preview
  const featuredMoments = moments.slice(0, 4);
  // First 4 FAQ items for FAQ preview
  const featuredFaqs = faqItems.slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Intro splash loader */}
      <SplashCurtain />

      {/* ── 1. Hero Section (tp-hero) ── */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <PawIcon size={16} color="var(--color-toffee)" />
            <span>every puppy is family</span>
          </div>

          <h1 className={styles.heroTitle} id="hero-title">
            Premium teacup puppies in Dubai
          </h1>

          <p className={styles.heroSubhead}>
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          <div className={styles.heroActions}>
            <Link to="/puppies" className="btn btn-primary btn-lg">
              View available puppies
            </Link>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>

          {/* Arched Puppy Carousel / Gallery */}
          <div className={styles.archesGallery} aria-label="Featured miniature puppy breeds">
            {ARCH_PUPPIES.map(item => (
              <div key={item.name} className={styles.archCard}>
                <img
                  src={item.img}
                  alt={`${item.name} the ${item.breed}`}
                  className={styles.archImage}
                  width={200}
                  height={300}
                />
                <div className={styles.archOverlay}>
                  <p className={styles.archTitle}>{item.breed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Meet the Pups Section (tp-meet) ── */}
      <section className={styles.meetSection} aria-labelledby="meet-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>hand-picked companions</span>
            <h2 className={styles.heading} id="meet-title">Meet the pups</h2>
            <p className={styles.subhead}>
              Every puppy is vaccinated, microchipped, and veterinary health-certified before joining your family.
            </p>
          </div>

          <div className={styles.puppiesGrid}>
            {featuredPuppies.map(puppy => (
              <PuppyCard key={puppy.slug} puppy={puppy} />
            ))}
          </div>

          <div className={styles.seeAllRow}>
            <Link to="/puppies" className="btn btn-primary btn-lg">
              See all available puppies →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Two Ways to Meet (tp-paths) ── */}
      <section className={styles.pathsSection} aria-labelledby="paths-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>simple, bespoke adoption</span>
            <h2 className={styles.heading} id="paths-title">Two ways to meet your puppy</h2>
            <p className={styles.subhead}>
              Whether you are ready to visit us today in Dubai or looking for a specific teacup bloodline from overseas.
            </p>
          </div>

          <div className={styles.pathsGrid}>
            {/* Track A */}
            <div className={styles.pathCard}>
              <div className={styles.pathIcon}>
                <HeartHandshake size={26} aria-hidden="true" />
              </div>
              <h3 className={styles.pathTitle}>Puppies in Dubai</h3>
              <p className={styles.pathDesc}>
                Visit our Downtown Dubai showroom to cuddle and meet available puppies in a calm, welcoming environment.
              </p>
              <div className={styles.pathList}>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Downtown Dubai showroom visit</span>
                </div>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Face-to-face bonding with your pup</span>
                </div>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Same-day handover for cleared pups</span>
                </div>
              </div>
              <Link to="/puppies" className="btn btn-outline" style={{ marginTop: 'auto' }}>
                Browse Dubai puppies
              </Link>
            </div>

            {/* Track B */}
            <div className={styles.pathCard}>
              <div className={styles.pathIcon}>
                <Plane size={26} aria-hidden="true" />
              </div>
              <h3 className={styles.pathTitle}>Imported for you</h3>
              <p className={styles.pathDesc}>
                Order rare Korean and European miniature breeds with certified bloodlines and in-cabin flight concierge delivery.
              </p>
              <div className={styles.pathList}>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Exclusive South Korean & EU breeders</span>
                </div>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Full video reports & parents pedigree</span>
                </div>
                <div className={styles.pathListItem}>
                  <PawIcon size={14} color="var(--color-toffee)" />
                  <span>Temperature-controlled cabin travel</span>
                </div>
              </div>
              <Link to="/how-it-works" className="btn btn-primary" style={{ marginTop: 'auto' }}>
                How import works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Your Puppy Journey (tp-chat) ── */}
      <section className={styles.journeySection} aria-labelledby="journey-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>the journey home</span>
            <h2 className={styles.heading} id="journey-title">Your puppy journey</h2>
            <p className={styles.subhead}>
              From your very first message to settling in at home, our dedicated puppy concierge guides every step.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>01</span>
              <h3 className={styles.stepTitle}>Choose your breed</h3>
              <p className={styles.stepDesc}>
                Explore our curated selection of hypoallergenic Maltipoos, micro Poodles, and fluffy Pomeranians online or via WhatsApp.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>02</span>
              <h3 className={styles.stepTitle}>Get photos & details</h3>
              <p className={styles.stepDesc}>
                Receive high-definition video clips, veterinary health cards, weight documentation, and parents’ pedigree records.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>Secure & safe delivery</h3>
              <p className={styles.stepDesc}>
                Pick up your puppy in our Downtown Dubai showroom, or enjoy doorstep chauffeur delivery across all UAE Emirates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Why Families Trust TeddyPups (tp-passport) ── */}
      <section className={styles.trustSection} aria-labelledby="trust-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>peace of mind guaranteed</span>
            <h2 className={styles.heading} id="trust-title">Why families trust TeddyPups</h2>
          </div>

          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <div className={styles.trustItemIcon}>
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.trustItemTitle}>100% Health Guarantee</h3>
              <p className={styles.trustItemDesc}>
                Every puppy is covered with a comprehensive veterinary health warranty and MOCCAE clearance.
              </p>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustItemIcon}>
                <Stethoscope size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.trustItemTitle}>Licensed Vet Check</h3>
              <p className={styles.trustItemDesc}>
                Full vaccinations, microchipping, and thorough clinical examinations before handover.
              </p>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustItemIcon}>
                <Sparkles size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.trustItemTitle}>Ethical Pedigrees</h3>
              <p className={styles.trustItemDesc}>
                Sourced exclusively from reputable, licensed home breeders with genuine pedigree records.
              </p>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustItemIcon}>
                <MessageCircle size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.trustItemTitle}>24/7 Concierge Care</h3>
              <p className={styles.trustItemDesc}>
                Direct WhatsApp assistance for diet, training, grooming, and routine after adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Happy Families Preview (tp-dusk) ── */}
      <section className={styles.familiesSection} aria-labelledby="families-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>our wall of happy endings</span>
            <h2 className={styles.heading} id="families-title">Happy families & puppies</h2>
            <p className={styles.subhead}>
              Over 64 moments of joy captured across Dubai, Abu Dhabi, and beyond.
            </p>
          </div>

          <div className={styles.familiesGrid}>
            {featuredMoments.map((moment, idx) => (
              <PolaroidCard
                key={moment.id}
                moment={moment}
                rotation={idx % 2 === 0 ? -2 : 2.5}
                isBlush={idx % 2 === 1}
              />
            ))}
          </div>

          <div className={styles.seeAllRow}>
            <Link to="/happy-families" className="btn btn-outline btn-lg">
              View all happy family stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ Preview (tp-night) ── */}
      <section className={styles.faqSection} aria-labelledby="faq-home-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>got questions?</span>
            <h2 className={styles.heading} id="faq-home-title">Questions, answered</h2>
          </div>

          <div className={styles.faqContainer}>
            {featuredFaqs.map((faq, idx) => (
              <AccordionItem
                key={faq.id}
                item={faq}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                index={idx}
              />
            ))}
          </div>

          <div className={styles.seeAllRow}>
            <Link to="/faq" className="btn btn-outline btn-lg">
              Read all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Final CTA (tp-home) ── */}
      <section className={styles.ctaSection} aria-labelledby="cta-title">
        <div className="container">
          <div className={styles.ctaCard}>
            <span className={styles.eyebrow}>let’s find your match</span>
            <h2 className={styles.ctaTitle} id="cta-title">
              Ready to meet your new best friend?
            </h2>
            <p className={styles.ctaSubhead}>
              Our puppy concierge is standing by to help you choose the puppy of your dreams. Reach out on WhatsApp or schedule your visit.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={20} aria-hidden="true" />
                WhatsApp us now
              </a>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Visit our showroom
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
