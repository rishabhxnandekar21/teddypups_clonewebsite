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
      if (scrollOffset < 280) {
        setActiveStep(0);
      } else if (scrollOffset < 580) {
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

      {/* ── 7. Questions, answered (tp-night 2-Column Storybook) ── */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className={`tp-scene tp-night ${styles.nightSection}`}
        style={{
          '--sky-top': '#4d2b19',
          '--sky-bottom': '#2f1a10',
        }}
        aria-labelledby="questions-title"
      >
        {/* 11 Golden Twinkling SVG Stars */}
        <div aria-hidden="true" className={styles.nightStars}>
          {[
            { left: '8%', top: '12%', width: 16.2, delay: '0.00s' },
            { left: '22%', top: '30%', width: 9.0, delay: '0.40s' },
            { left: '41%', top: '8%', width: 12.6, delay: '0.80s' },
            { left: '57%', top: '22%', width: 8.1, delay: '1.20s' },
            { left: '72%', top: '6%', width: 14.4, delay: '1.60s' },
            { left: '88%', top: '18%', width: 10.8, delay: '2.00s' },
            { left: '95%', top: '42%', width: 9.0, delay: '2.40s' },
            { left: '4%', top: '58%', width: 10.8, delay: '2.80s' },
            { left: '34%', top: '70%', width: 7.2, delay: '3.20s' },
            { left: '63%', top: '84%', width: 9.9, delay: '3.60s' },
            { left: '83%', top: '66%', width: 12.6, delay: '4.00s' },
          ].map((star, i) => (
            <svg
              key={i}
              viewBox="0 0 40 40"
              className={styles.twinkleStar}
              style={{
                left: star.left,
                top: star.top,
                width: `${star.width}px`,
                animationDelay: star.delay,
              }}
              aria-hidden="true"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>

        <div className={`gutter ${styles.nightGrid}`}>
          {/* Left Column: Heading, Ghost CTA, Mascot with ? bubble */}
          <div className={styles.nightIntro}>
            <h2 id="questions-title" className={`font-plush ${styles.nightHeading}`}>
              Questions, answered
            </h2>
            <Link to="/faq" className={`btn btn-ghost ${styles.nightCta}`}>
              Read all questions
            </Link>
            <div className={styles.nightPup}>
              <span aria-hidden="true" className={`font-plush ${styles.nightWonder}`}>
                ?
              </span>
              <div
                data-pup-stop="true"
                data-pose="sit"
                data-facing="right"
                data-act="tilt"
                className={`pup-stop ${styles.nightTeddy}`}
              >
                <MascotPup pose="sitting" facing="right" ariaLabel="Teddy wondering about questions" />
              </div>
            </div>
          </div>

          {/* Right Column: Definition List with 3 reference Q&As */}
          <dl className={styles.nightList}>
            <div className={styles.qaItem}>
              <dt className={`font-plush ${styles.qaQ}`}>
                <svg viewBox="0 0 40 40" className={styles.qaStar} aria-hidden="true">
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Are your puppies vaccinated and health-checked?
              </dt>
              <dd className={styles.qaA}>
                Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.
              </dd>
            </div>

            <div className={styles.qaItem}>
              <dt className={`font-plush ${styles.qaQ}`}>
                <svg viewBox="0 0 40 40" className={styles.qaStar} aria-hidden="true">
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Can I meet a puppy before I decide?
              </dt>
              <dd className={styles.qaA}>
                Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.
              </dd>
            </div>

            <div className={styles.qaItem}>
              <dt className={`font-plush ${styles.qaQ}`}>
                <svg viewBox="0 0 40 40" className={styles.qaStar} aria-hidden="true">
                  <path
                    d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                    fill="currentColor"
                  />
                </svg>
                Can I take my puppy home the same day?
              </dt>
              <dd className={styles.qaA}>
                Local puppies are available immediately, so you can take your puppy home the same day.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 8. Final CTA (tp-home Illustrated House Doorway Scene) ── */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className={`tp-scene tp-home ${styles.homeSection}`}
        style={{
          '--sky-top': '#2f1a10',
          '--sky-bottom': '#24130b',
        }}
        aria-labelledby="cta-title"
      >
        <div className={`gutter ${styles.homeCopy}`}>
          <h2 id="cta-title" className={`font-plush ${styles.homeHeading}`}>
            Ready to meet your new best friend?
          </h2>
          <p className={styles.homeLede}>
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        <div className={styles.house}>
          <span aria-hidden="true" className={`${styles.housePlant} ${styles.housePlantLeft}`} />
          <span aria-hidden="true" className={styles.houseLamp} />
          <div className={styles.houseDoorway}>
            <span className={styles.houseInside}>
              <img
                src="/media/maltipoo-max-male.webp"
                alt="Max, waiting inside"
                className={styles.houseDoorwayImg}
              />
            </span>
            <span aria-hidden="true" className={styles.houseDoor}>
              <span className={styles.housePeep} />
              <span className={styles.houseKnob} />
            </span>
          </div>
          <span aria-hidden="true" className={`${styles.housePlant} ${styles.housePlantRight}`} />
          <span aria-hidden="true" className={`font-scrawl ${styles.houseMat}`}>
            welcome home
          </span>
          <div
            data-pup-stop="true"
            data-pose="bow"
            data-facing="right"
            className={`pup-stop ${styles.houseTeddy}`}
          >
            <MascotPup pose="bow" facing="right" ariaLabel="Teddy bowing at the doorway" />
          </div>
        </div>

        <div className={`gutter ${styles.homeActions}`}>
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Enquire on WhatsApp
          </a>
          <Link to="/contact" className={`btn btn-ghost ${styles.homeGhost}`}>
            Visit &amp; contact
          </Link>
        </div>
      </section>
    </div>
  );
}
