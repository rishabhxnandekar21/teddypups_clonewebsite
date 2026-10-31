import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoorCard from './DoorCard.jsx';
import MascotPup from '../common/MascotPup.jsx';
import { availablePuppies } from '../../data/puppies.js';
import styles from './DoorsSection.module.css';

const DOOR_PALETTE = ['#a24a1a', '#5a3a28', '#d4893f', '#b8644a', '#7a4a2e'];

export default function DoorsSection() {
  const pinRangeRef = useRef(null);
  const stageRef = useRef(null);
  const hallRef = useRef(null);
  const trackRef = useRef(null);

  const [isPinned, setIsPinned] = useState(false);
  const [scrollDist, setScrollDist] = useState(0);
  const [trackX, setTrackX] = useState(0);
  const [facing, setFacing] = useState('right');
  const [isMoving, setIsMoving] = useState(false);

  const lastScrollY = useRef(0);
  const moveTimer = useRef(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const rafId = useRef(null);

  // Check desktop pinning condition & compute track width
  useEffect(() => {
    const updateDimensions = () => {
      const desktop = window.innerWidth >= 1024;
      setIsPinned(desktop);

      if (desktop && trackRef.current) {
        const fullTrackWidth = trackRef.current.scrollWidth;
        const dist = Math.max(0, fullTrackWidth - window.innerWidth + 400);
        setScrollDist(dist);
      }
    };

    updateDimensions();
    const t = setTimeout(updateDimensions, 200);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Smooth animation frame loop for track translation and door triggers
  useEffect(() => {
    if (!isPinned) return;

    const animate = () => {
      // Smooth interpolation (spring-like feel)
      currentX.current += (targetX.current - currentX.current) * 0.14;
      const x = currentX.current;
      setTrackX(x);

      if (hallRef.current) {
        hallRef.current.style.setProperty('--floor-x', `${x.toFixed(1)}px`);
      }

      if (trackRef.current) {
        const threshold = 0.36 * window.innerWidth;
        const children = trackRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const isOpen = child.offsetLeft + x < threshold;
          if (child.dataset.open !== String(isOpen)) {
            child.dataset.open = String(isOpen);
          }
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPinned]);

  // Scroll handler for pinned treadmill
  useEffect(() => {
    if (!isPinned) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Update facing and moving status
      if (Math.abs(delta) > 1) {
        setIsMoving(true);
        if (delta > 0) setFacing('right');
        else if (delta < 0) setFacing('left');

        if (moveTimer.current) clearTimeout(moveTimer.current);
        moveTimer.current = setTimeout(() => {
          setIsMoving(false);
        }, 180);
      }

      if (!pinRangeRef.current) return;
      const rect = pinRangeRef.current.getBoundingClientRect();
      const totalRange = rect.height - window.innerHeight;

      if (totalRange <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalRange));
      targetX.current = -progress * scrollDist;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, [isPinned, scrollDist]);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className={`tp-scene tp-meet ${styles.meetSection}`}
      data-pinned={isPinned ? 'true' : undefined}
      aria-labelledby="meet-title"
    >
      <div
        ref={pinRangeRef}
        className={styles.pinRange}
        data-pin-range="true"
        style={{
          height: isPinned && scrollDist > 0 ? `calc(100vh + ${Math.round(0.8 * scrollDist)}px)` : undefined,
          '--pinned': isPinned ? 1 : 0,
        }}
      >
        <div ref={stageRef} className={styles.meetStage}>
          {/* Header */}
          <header className={styles.meetHead}>
            <div>
              <h2 id="meet-title" className={styles.meetHeading}>
                Meet the pups
              </h2>
              <p className={styles.meetSubhead}>
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link to="/puppies" className="btn btn-primary shrink-0">
              See all available puppies
            </Link>
          </header>

          {/* Hall with doors track and floor */}
          <div ref={hallRef} className={styles.meetHall}>
            <ol
              ref={trackRef}
              className={styles.doorsGrid}
              data-treadmill={isPinned ? 'true' : undefined}
              style={{
                transform: isPinned ? `translateX(${trackX.toFixed(1)}px)` : undefined,
              }}
              aria-label="Puppies looking for a family"
            >
              {availablePuppies.map((puppy, i) => (
                <DoorCard
                  key={puppy.slug}
                  puppy={puppy}
                  color={DOOR_PALETTE[i % DOOR_PALETTE.length]}
                />
              ))}
              <DoorCard isAll={true} />
            </ol>

            {/* 3D Scrolling Wooden Floor */}
            <div aria-hidden="true" className={styles.meetFloor} />

            {/* Walking Mascot Teddy */}
            <div className={styles.meetTeddy}>
              <MascotPup
                pose="walking"
                facing={facing}
                isMoving={isMoving}
                ariaLabel="Teddy walking down the showroom hallway"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
