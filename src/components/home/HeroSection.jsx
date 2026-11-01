import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MascotPup from '../common/MascotPup.jsx';
import { BUSINESS } from '../../data/navigation.js';
import styles from './HeroSection.module.css';

const LINEUP_PUPS = [
  {
    name: 'Max',
    label: 'Meet Max, Maltipoo',
    slug: 'maltipoo-max-male',
    img: '/media/maltipoo-max-male.webp',
    x: '9%',
    w: '8.6rem',
    peek: 0.62,
    tilt: '-5deg',
    tagX: '-12%',
  },
  {
    name: 'Korean Teacup Maltipoo',
    label: 'Meet Korean Teacup Maltipoo',
    slug: 'korean-teacup-maltipoo-female',
    img: '/media/korean-teacup-maltipoo-female.jpg',
    x: '22.5%',
    w: '10.4rem',
    peek: 0.8,
    tilt: '3deg',
    tagX: '-30%',
  },
  {
    name: 'Korean Teacup Poodle',
    label: 'Meet Korean Teacup Poodle',
    slug: 'poodle-leo-male',
    img: '/media/poodle-leo-male.jpg',
    x: '35%',
    w: '9.2rem',
    peek: 0.7,
    tilt: '-2deg',
    tagX: '-50%',
  },
  {
    name: 'Maltipoo & Cavapoo',
    label: 'Meet Maltipoo & Cavapoo',
    slug: 'maltipoo-cavapoo-male',
    img: '/media/maltipoo-cavapoo-male.jpg',
    x: '65%',
    w: '9.4rem',
    peek: 0.74,
    tilt: '3deg',
    tagX: '-50%',
  },
  {
    name: 'Toy Poodle',
    label: 'Meet Toy Poodle',
    slug: 'pomeranian-female',
    img: '/media/pomeranian-female.jpg',
    x: '77.5%',
    w: '10.6rem',
    peek: 0.82,
    tilt: '-3deg',
    tagX: '-70%',
  },
  {
    name: 'Maltipoo',
    label: 'Meet Maltipoo',
    slug: 'maltipoo-female-2',
    img: '/media/maltipoo-female-2.jpg',
    x: '91%',
    w: '8.4rem',
    peek: 0.6,
    tilt: '4deg',
    tagX: '-88%',
  },
];

export default function HeroSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [poppingIdx, setPoppingIdx] = useState(null);

  // Periodic natural pop-up cycle
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random puppy that isn't currently hovered
      const randomIdx = Math.floor(Math.random() * LINEUP_PUPS.length);
      setPoppingIdx(randomIdx);
      const popTimer = setTimeout(() => {
        setPoppingIdx(null);
      }, 700);
      return () => clearTimeout(popTimer);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className={`tp-scene tp-hero ${styles.hero}`}
      style={{
        '--sky-top': '#fffdf8',
        '--sky-bottom': '#fff1d8',
        '--quilt': '#fff1d8',
      }}
      aria-labelledby="hero-title"
    >
      {/* 1. Warm radial peach glow */}
      <span aria-hidden="true" className={styles.heroSun} />

      {/* 2. Hero Copy */}
      <div className={styles.heroCopy}>
        <p className={styles.heroNote}>
          every puppy is family
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className={styles.heroUnderline}
            aria-hidden="true"
          >
            <path
              d="M4 18 C 30 18, 50 8, 80 12 C 110 16, 140 6, 170 12 C 190 16, 210 10, 216 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>

        <h1 id="hero-title" className={styles.heroTitle}>
          <span className={styles.heroLine}>Premium teacup</span>
          <span className={`${styles.heroLine} ${styles.heroLine2}`}>puppies in Dubai</span>
        </h1>

        <p className={styles.heroLede}>
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        <div className={styles.heroActions}>
          <Link to="/puppies" className="btn btn-primary">
            View available puppies
          </Link>
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* 3. Hero Stage: 6 Arched Tiles + Mascot + Quilt */}
      <div className={styles.heroStage}>
        {/* Puppy Tiles List */}
        <ul className={styles.lineup} aria-label="Some of the puppies in our showroom">
          {LINEUP_PUPS.map((pup, idx) => {
            const isHovered = hoveredIdx === idx;
            const isPopping = poppingIdx === idx && !isHovered;
            const state = isPopping ? 'pop' : undefined;

            return (
              <li
                key={pup.slug}
                className={styles.lineupSeat}
                style={{
                  '--x': pup.x,
                  '--w': pup.w,
                  '--peek': pup.peek,
                  '--tilt': pup.tilt,
                  '--i': idx,
                  '--tag-x': pup.tagX,
                  zIndex: idx === 1 || idx === 4 ? 3 : idx === 2 || idx === 3 ? 2 : 1,
                }}
              >
                <Link
                  to={`/puppies/${pup.slug}`}
                  className={styles.lineupPup}
                  data-state={state}
                  aria-label={pup.label}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(idx)}
                  onBlur={() => setHoveredIdx(null)}
                >
                  <span className={styles.lineupPhoto}>
                    <img
                      src={pup.img}
                      alt={pup.name}
                      loading="eager"
                      decoding="async"
                      width={180}
                      height={240}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Floating Name Tags Overlay */}
        <ul aria-hidden="true" className={`${styles.lineup} ${styles.lineupTags}`}>
          {LINEUP_PUPS.map((pup, idx) => (
            <li
              key={`tag-${pup.slug}`}
              className={styles.lineupSeat}
              style={{
                '--x': pup.x,
                '--w': pup.w,
                '--peek': pup.peek,
                '--tilt': pup.tilt,
                '--i': idx,
                '--tag-x': pup.tagX,
                zIndex: 32,
              }}
            >
              <span
                className={styles.lineupGhost}
                data-tag={hoveredIdx === idx ? 'show' : undefined}
              >
                <span className={styles.lineupName}>{pup.name}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Center Peeking Mascot Teddy */}
        <div
          className={styles.heroTeddy}
          data-pup-stop="true"
          data-pose="peek"
          data-facing="right"
        >
          <MascotPup
            pose="peeking"
            facing="right"
            ariaLabel="Teddy peeking over the quilt"
          />
        </div>

        {/* Layered Scalloped Quilt Bottom Boundary */}
        <div aria-hidden="true" className={styles.quilt}>
          <svg className={styles.quiltEdge} preserveAspectRatio="none">
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }} />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity="0.42"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
