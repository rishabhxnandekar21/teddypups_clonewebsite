import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, HeartHandshake, Plane } from 'lucide-react';
import { availablePuppies } from '../data/puppies.js';
import { faqItems } from '../data/faq.js';
import { moments } from '../data/families.js';
import { BUSINESS } from '../data/navigation.js';
import AccordionItem from '../components/ui/AccordionItem.jsx';
import PolaroidCard from '../components/ui/PolaroidCard.jsx';
import PawIcon from '../components/common/PawIcon.jsx';
import SplashCurtain from '../components/common/SplashCurtain.jsx';
import DoorCard from '../components/home/DoorCard.jsx';
import PhoneMockup from '../components/home/PhoneMockup.jsx';
import PassportBook from '../components/home/PassportBook.jsx';
import styles from './HomePage.module.css';

const ARCH_PUPPIES = [
  { name: 'Max', breed: 'Maltipoo', img: '/media/maltipoo-max-male.webp' },
  { name: 'Luna', breed: 'Korean Teacup', img: '/media/korean-teacup-maltipoo-female.jpg' },
  { name: 'Coco', breed: 'Pomeranian', img: '/media/pomeranian-female.jpg' },
  { name: 'Teddy', breed: 'Cavapoo', img: '/media/maltipoo-cavapoo-male.jpg' },
  { name: 'Leo', breed: 'Toy Poodle', img: '/media/poodle-leo-male.jpg' },
  { name: 'Snow', breed: 'Maltipoo', img: '/media/maltipoo-female-2.jpg' },
];

const DOOR_PALETTE = ['#a24a1a', '#5a3a28', '#d4893f', '#b8644a', '#7a4a2e'];

const JOURNEY_STEPS = [
  {
    num: '1',
    title: 'Choose your breed',
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    num: '2',
    title: 'Get photos & details',
    text: "Receive high-definition video clips, veterinary health cards, weight documentation, and parents' pedigree records.",
  },
  {
    num: '3',
    title: 'Secure & safe delivery',
    text: 'Pick up your puppy in our Downtown Dubai showroom, or enjoy doorstep chauffeur delivery across all UAE Emirates.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    document.title = 'TeddyPups UAE — Premium Teacup Puppies in Dubai';
  }, []);

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

      {/* ── 2. Meet the Pups Section (tp-meet 3D Wooden Doors) ── */}
      <section className={styles.meetSection} aria-labelledby="meet-title">
        <div className="container">
          <header className={styles.meetHead}>
            <div>
              <h2 className={styles.meetHeading} id="meet-title">
                Meet the pups
              </h2>
              <p className={styles.meetSubhead}>
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link to="/puppies" className="btn btn-primary btn-lg">
              See all available puppies
            </Link>
          </header>

          <ol className={styles.doorsGrid} aria-label="Puppies looking for a family">
            {availablePuppies.map((puppy, i) => (
              <DoorCard
                key={puppy.slug}
                puppy={puppy}
                color={DOOR_PALETTE[i % DOOR_PALETTE.length]}
              />
            ))}
            <DoorCard isAll={true} />
          </ol>
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

      {/* ── 4. Your Puppy Journey (tp-chat Interactive Phone Mockup) ── */}
      <section className={styles.journeySection} aria-labelledby="journey-title">
        <div className={styles.chatGrid}>
          {/* Left Column: Interactive Story Steps */}
          <div className={styles.chatStory}>
            <h2 className={styles.chatHeading} id="journey-title">
              Your puppy journey
            </h2>
            <p className={styles.chatLede}>
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol className={styles.chatSteps} role="tablist" aria-label="Journey steps">
              {JOURNEY_STEPS.map((step, idx) => (
                <li
                  key={step.num}
                  className={styles.chatStep}
                  data-active={activeStep === idx}
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeStep === idx}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStep(idx);
                    }
                  }}
                >
                  <span className={styles.chatNum} aria-hidden="true">
                    {step.num}
                  </span>
                  <div>
                    <h3 className={styles.chatTitle}>{step.title}</h3>
                    <p className={styles.chatText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <div className={styles.chatSide}>
            <PhoneMockup activeStep={activeStep} onSelectBreed={() => setActiveStep(0)} />
          </div>
        </div>
      </section>

      {/* ── 5. Why Families Trust TeddyPups (tp-passport PassportBook) ── */}
      <section className={styles.trustSection}>
        <PassportBook />
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
                index={idx}
                tilt={idx % 2 === 0 ? -2 : 2.5}
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
