import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { faqItems } from '../data/faq.js';
import { moments } from '../data/families.js';
import { BUSINESS } from '../data/navigation.js';
import AccordionItem from '../components/ui/AccordionItem.jsx';
import PolaroidCard from '../components/ui/PolaroidCard.jsx';
import SplashCurtain from '../components/common/SplashCurtain.jsx';
import PupLayer from '../components/common/PupLayer.jsx';
import MascotPup from '../components/common/MascotPup.jsx';
import HeroSection from '../components/home/HeroSection.jsx';
import DoorsSection from '../components/home/DoorsSection.jsx';
import TwoWaysSection from '../components/home/TwoWaysSection.jsx';
import PhoneMockup from '../components/home/PhoneMockup.jsx';
import PassportBook from '../components/home/PassportBook.jsx';
import styles from './HomePage.module.css';

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
  const journeySectionRef = useRef(null);

  useEffect(() => {
    document.title = 'TeddyPups UAE — Premium Teacup Puppies in Dubai';
  }, []);

  // Scroll-linked progression for the 3-step journey:
  // Step 0: Choose breed, Step 1: Photos & details, Step 2: Secure delivery
  useEffect(() => {
    const handleScroll = () => {
      const section = journeySectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollOffset = -rect.top;

      // Each step has min-height: 380px in CSS, keeping the section pinned
      if (scrollOffset < 340) {
        setActiveStep(0);
      } else if (scrollOffset < 720) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8 moments for Happy Families dusk preview (see all on /happy-families)
  const featuredMoments = moments.slice(0, 8);
  // First 4 FAQ items for FAQ preview
  const featuredFaqs = faqItems.slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Intro splash loader */}
      <SplashCurtain />

      {/* Active Scroll Mascot Layer */}
      <PupLayer />

      {/* ── 1. Hero Section (tp-hero) ── */}
      <HeroSection />

      {/* ── 2. Meet the Pups Section (tp-meet 3D Wooden Doors) ── */}
      <DoorsSection />

      {/* ── 3. Two Ways to Meet Your Puppy (tp-paths) ── */}
      <TwoWaysSection />

      {/* ── 4. Your Puppy Journey (tp-chat Interactive Phone Mockup) ── */}
      <section
        ref={journeySectionRef}
        className={`tp-scene tp-chat ${styles.journeySection}`}
        aria-labelledby="journey-title"
      >
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
                  data-done={activeStep > idx}
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

            <Link to="/how-it-works" className={`btn btn-ghost ${styles.chatCta}`}>
              How it works
            </Link>
          </div>

          {/* Right Column: Sticky Interactive Phone Mockup */}
          <div className={styles.chatSide}>
            <PhoneMockup activeStep={activeStep} onSelectBreed={() => setActiveStep(0)} />
          </div>
        </div>
      </section>

      {/* ── 5. Why Families Trust TeddyPups (tp-passport PassportBook) ── */}
      <section className={styles.trustSection}>
        <PassportBook />
      </section>

      {/* ── 6. Happy Families Preview (tp-dusk Sunset-to-Dusk Transition) ── */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className={`tp-scene tp-dusk ${styles.familiesSection}`}
        style={{
          '--sky-top': '#a65a30',
          '--sky-bottom': '#4d2b19',
        }}
        aria-labelledby="families-title"
      >
        <div className="container">
          <div className={styles.duskSky}>
            <div className={styles.duskHead}>
              <h2 className={styles.duskHeading} id="families-title">
                Happy families &amp; puppies
              </h2>
              <p className={styles.duskSubhead}>
                We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
              </p>
            </div>

            {/* Testimonial speech bubble */}
            <figure className={styles.duskNote}>
              <blockquote>
                &ldquo;TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.&rdquo;
              </blockquote>
              <figcaption>Sarah M., Dubai, UAE</figcaption>
            </figure>

            {/* Horizon Mascot */}
            <div
              className={styles.duskTeddy}
              data-pup-stop="true"
              data-pose="sit"
              data-facing="left"
            >
              <MascotPup
                pose="sitting"
                facing="left"
                ariaLabel="Teddy watching over the sunset moments"
              />
            </div>
          </div>

          {/* Polaroid Cards Grid — 32 Verified Moments */}
          <div className={styles.familiesGrid}>
            {featuredMoments.map((moment, idx) => (
              <PolaroidCard
                key={moment.id}
                moment={moment}
                index={idx}
                tilt={idx % 4 === 0 ? -2.2 : idx % 4 === 1 ? 1.6 : idx % 4 === 2 ? -0.9 : 2.4}
              />
            ))}
          </div>

          <div className={styles.seeAllRow} style={{ marginTop: '4rem', textAlign: 'center' }}>
            <Link to="/happy-families" className="btn btn-primary btn-lg">
              See every happy family
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
              Read all frequently asked questions &rarr;
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
