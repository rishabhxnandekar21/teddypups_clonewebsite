import { useEffect, useRef, useState } from 'react';
import MascotPup from './MascotPup.jsx';
import styles from './PupLayer.module.css';

const PAW_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z';

function lerp(a, b, t) { return a + (b - a) * t; }
function quintic(t) { const c = Math.max(0, Math.min(1, t)); return c * c * c * (c * (6 * c - 15) + 10); }

export default function PupLayer() {
  const actorRef = useRef(null);
  const printsRef = useRef(null);

  const [pose, setPose] = useState('sit');
  const [facing, setFacing] = useState('right');
  const [isMoving, setIsMoving] = useState(false);

  const stopsRef = useRef([]);
  const lastScrollY = useRef(0);
  const moveTimer = useRef(null);
  const lastPrintY = useRef(0);
  const printIndex = useRef(0);
  const rafPending = useRef(false);

  // Measure sections in document space and build section-relative stops
  const buildStops = () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH < 100) return;

    const getDocTop = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      return el.getBoundingClientRect().top + window.scrollY;
    };

    const heroTop  = 0;
    const meetTop  = getDocTop('.tp-meet, [class*="meetSection"]') || 900;
    const pathsTop = getDocTop('.tp-paths, [class*="paths"]') || 5340;
    const chatTop  = getDocTop('.tp-chat, [class*="journeySection"]') || 6419;
    const trustTop = getDocTop('[class*="trustSection"]') || 8319;
    const duskTop  = getDocTop('.tp-dusk, [class*="familiesSection"]') || 9214;
    const faqTop   = getDocTop('.tp-night, [class*="nightSection"], [class*="faqSection"]') || 10100;
    const ctaTop   = getDocTop('.tp-home, [class*="homeSection"], [class*="ctaSection"]') || 11300;
    const footerTop = getDocTop('footer, [class*="footer"]') || 12300;

    // Convert document offsets to progress fractions [0, 1]
    const fHero   = 0;
    const fMeetStart = meetTop / docH;
    // Meet is pinned; midpoint and end of meet section
    const meetEl = document.querySelector('.tp-meet, [class*="meetSection"]');
    const meetHeight = meetEl ? meetEl.offsetHeight : 4126;
    const fMeetEnd = (meetTop + meetHeight - 200) / docH;
    const fPathsStart = pathsTop / docH;
    const fPathsEnd = chatTop / docH;
    const fChat = chatTop / docH;
    const fTrust = trustTop / docH;
    const fDusk = duskTop / docH;
    const fFaq = faqTop / docH;
    const fCta = ctaTop / docH;
    const fFooter = footerTop / docH;
    const fEnd = 1.0;

    // Viewport-space coordinates matching live reference
    // Target viewport: 1440 × 900 (responsive via window dimensions)
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Basket position measured from footer
    const basketEl = document.querySelector('[class*="basketPup"]');
    const basketR = basketEl ? basketEl.getBoundingClientRect() : null;
    const basketX = basketR ? basketR.left : -26;
    const basketY = basketR ? basketR.top : 451;

    stopsRef.current = [
      // 1. Hero: sitting peek state matching hero position
      { frac: 0.00, vpX: Math.min(427, vw * 0.3), vpY: 548, scale: 1.35, pose: 'peek', facing: 'right' },
      // Transition into Meet section: walks towards wooden floor
      { frac: Math.max(0.02, fMeetStart - 0.02), vpX: 240, vpY: 640, scale: 0.65, pose: 'walk', facing: 'right' },
      // 2. Meet: Grounded walking-in-place at wooden floor (pinned section)
      // Mascot stays at vpX: 190, vpY: 670 across the whole pinned hallway
      { frac: fMeetStart, vpX: 190, vpY: 670, scale: 0.60, pose: 'walk', facing: 'right' },
      { frac: fMeetEnd,   vpX: 190, vpY: 670, scale: 0.60, pose: 'walk', facing: 'right' },
      // 3. Paths: Diagonal movement down wooden signpost, proportional to scroll
      // Starts near the top of the wooden post (vpX ~560, vpY ~500)
      { frac: fPathsStart, vpX: Math.min(560, vw * 0.42), vpY: 500, scale: 0.58, pose: 'walk', facing: 'right' },
      // Diagonal movement down along signpost to base (vpX ~680, vpY ~670)
      { frac: fPathsEnd,   vpX: Math.min(680, vw * 0.52), vpY: 670, scale: 0.58, pose: 'walk', facing: 'right' },
      // 4. Puppy Journey (Chat section)
      { frac: fChat,  vpX: 60, vpY: 620, scale: 0.52, pose: 'walk', facing: 'right' },
      // 5. Trust (PassportBook)
      { frac: fTrust, vpX: Math.min(920, vw - 360), vpY: 560, scale: 0.55, pose: 'sit', facing: 'left' },
      // 6. Dusk (Happy Families Preview)
      { frac: fDusk,  vpX: Math.min(960, vw - 340), vpY: 580, scale: 0.55, pose: 'sit', facing: 'left' },
      // 7. FAQ Preview
      { frac: fFaq,   vpX: 160, vpY: 630, scale: 0.55, pose: 'sit', facing: 'right' },
      // 8. Final CTA (Ready to meet, doorway)
      { frac: fCta,   vpX: 220, vpY: 640, scale: 0.65, pose: 'bow', facing: 'right' },
      // 9. Entering Footer: approaches basket
      { frac: Math.min(0.97, fFooter), vpX: 40, vpY: 520, scale: 0.85, pose: 'walk', facing: 'left' },
      // 10. Final snug position inside footer wicker basket
      { frac: 1.00, vpX: -26, vpY: 451, scale: 1.013, pose: 'snug', facing: 'right' },
    ];
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-pup', 'true');
    buildStops();

    const t1 = setTimeout(buildStops, 250);
    const t2 = setTimeout(buildStops, 1000);
    window.addEventListener('resize', buildStops);
    window.addEventListener('load', buildStops);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.removeAttribute('data-pup');
      window.removeEventListener('resize', buildStops);
      window.removeEventListener('load', buildStops);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      rafPending.current = false;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      // Motion detection (strictly scroll-driven, not autoplay)
      if (Math.abs(delta) > 1) {
        setIsMoving(true);
        setFacing(delta > 0 ? 'right' : 'left');

        if (moveTimer.current) clearTimeout(moveTimer.current);
        moveTimer.current = setTimeout(() => {
          setIsMoving(false);
        }, 150);
      }

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / (docH || 1)));
      const stops = stopsRef.current;
      if (!stops || stops.length < 2) {
        buildStops();
        return;
      }

      // Find active stop segment
      let seg = stops.length - 2;
      for (let i = 0; i < stops.length - 1; i++) {
        if (progress <= stops[i + 1].frac) {
          seg = i;
          break;
        }
      }

      const p0 = stops[seg];
      const p1 = stops[seg + 1];
      const segLen = p1.frac - p0.frac;
      const v = segLen > 0 ? Math.max(0, Math.min(1, (progress - p0.frac) / segLen)) : 1;
      const w = quintic(v);

      // Smooth interpolation in viewport space
      const vpX = lerp(p0.vpX, p1.vpX, w);
      const vpY = lerp(p0.vpY, p1.vpY, w);
      const sc  = lerp(p0.scale, p1.scale, w);

      // Bounded clamping: keeps mascot naturally within viewport boundaries
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = Math.max(-50, Math.min(vw - 200, vpX));
      const cy = Math.max(60, Math.min(vh - 180, vpY));

      if (actorRef.current) {
        actorRef.current.style.transform =
          `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0) scale(${sc.toFixed(3)})`;
        actorRef.current.style.opacity = '1';
      }

      // Pose: snug at final basket stop, peek at hero, otherwise walking or resting
      if (progress > 0.98) {
        setPose('snug');
      } else if (progress < 0.03) {
        setPose('peek');
      } else if (seg === 2 && v < 0.9) {
        // Wooden floor: grounded walking pose
        setPose('walk');
      } else if (v < 0.08) {
        setPose(p0.pose);
      } else if (v > 0.92) {
        setPose(p1.pose);
      } else {
        setPose('walk');
      }

      // Paw prints dropped every ~120px of scroll travel
      if (Math.abs(scrollY - lastPrintY.current) > 120 && printsRef.current) {
        lastPrintY.current = scrollY;
        const printSvgs = printsRef.current.children;
        if (printSvgs.length) {
          const idx = printIndex.current % printSvgs.length;
          printIndex.current++;
          const printEl = printSvgs[idx];
          const side = (idx % 2 === 0 ? 1 : -1) * 14 * sc;
          const px = cx + 90 * sc + side;
          const py = cy + 180 * sc;
          const rot = delta >= 0 ? 12 : -168;
          printEl.style.transform =
            `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) rotate(${rot}deg) scale(${sc.toFixed(2)})`;
          printEl.classList.add(styles.printActive);
        }
      }
    };

    const handleScroll = () => {
      if (!rafPending.current) {
        rafPending.current = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, []);

  return (
    <>
      {/* 24 Paw Prints along page trail */}
      <div ref={printsRef} className={`pup-prints ${styles.printsContainer}`} aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64" className={styles.print}>
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Fixed Mascot Layer */}
      <div className={`pup-layer ${styles.layer}`} data-front="true" aria-hidden="true">
        <div ref={actorRef} className={`pup-actor ${styles.actor}`}>
          <div className={`pup-actor__body ${styles.actorBody}`}>
            <MascotPup
              pose={pose}
              facing={facing}
              isMoving={isMoving}
              ariaLabel="Teddy the TeddyPups mascot"
            />
          </div>
        </div>
      </div>
    </>
  );
}
