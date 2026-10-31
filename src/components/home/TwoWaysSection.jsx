import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MascotPup from '../common/MascotPup.jsx';
import styles from './TwoWaysSection.module.css';

export default function TwoWaysSection() {
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const sceneRightRef = useRef(null);

  const [planeTransform, setPlaneTransform] = useState('translate(410 70) rotate(18)');
  const [planeOpacity, setPlaneOpacity] = useState(1);

  const targetProgress = useRef(0.62);
  const currentProgress = useRef(0.62);
  const rafId = useRef(null);

  // Flight tangent math updater
  const updatePlanePosition = (t) => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;

    const totalLen = path.getTotalLength();
    const len = Math.min(totalLen, Math.max(0, t * totalLen));

    const p = path.getPointAtLength(len);
    const pNext = path.getPointAtLength(Math.min(totalLen, len + 1));
    const pPrev = path.getPointAtLength(Math.max(0, len - 1));

    const angle = (180 * Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x)) / Math.PI;

    const transformStr = `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`;
    const opacityVal = Math.min(1, Math.max(0, (t - 0.11) / 0.06));

    setPlaneTransform(transformStr);
    setPlaneOpacity(opacityVal);
  };

  // Smooth animation loop towards targetProgress
  useEffect(() => {
    const loop = () => {
      currentProgress.current += (targetProgress.current - currentProgress.current) * 0.08;
      updatePlanePosition(currentProgress.current);
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Handle pointer tracking on the right branch scene
  const handlePointerMove = (e) => {
    if (!sceneRightRef.current) return;
    const rect = sceneRightRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    // Map relX from [0, 1] to progress range [0.15, 0.95]
    const clampedProgress = Math.max(0.15, Math.min(0.95, 0.15 + relX * 0.8));
    targetProgress.current = clampedProgress;
  };

  const handlePointerLeave = () => {
    // Return gracefully to rest position
    targetProgress.current = 0.62;
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className={`tp-scene tp-paths ${styles.paths}`}
      style={{
        '--sky-top': '#fbe3b4',
        '--sky-bottom': '#f7d18d',
      }}
      aria-labelledby="paths-title"
    >
      <div className={styles.container}>
        <h2 id="paths-title" className={styles.pathsTitle}>
          Two ways to meet your puppy
        </h2>

        <div className={styles.fork}>
          {/* Center Wooden Signpost */}
          <div aria-hidden="true" className={styles.forkPost} />

          {/* Left Branch: Puppies in Dubai */}
          <article className={`${styles.way} ${styles.wayLeft}`} aria-labelledby="way-local">
            <h3 id="way-local" className={`${styles.sign} ${styles.signLeft}`}>
              Puppies in Dubai
            </h3>

            <div className={styles.wayScene}>
              {/* Dubai Skyline SVG */}
              <svg viewBox="0 0 300 120" className={styles.waySkyline} aria-hidden="true">
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Showroom Window with Striped Awning */}
              <figure className={styles.window}>
                <span className={styles.windowGlass}>
                  <img
                    alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                    src="/media/korean-teacup-maltipoo-female.jpg"
                    loading="lazy"
                    decoding="async"
                    width={200}
                    height={230}
                  />
                </span>
                <figcaption className={styles.windowCaption}>In our showroom</figcaption>
              </figure>
            </div>

            <p className={styles.wayText}>
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>
            <Link to="/puppies?origin=dubai" className={`btn btn-primary ${styles.wayBtn}`}>
              Browse Dubai puppies
            </Link>
          </article>

          {/* Right Branch: Imported for you */}
          <article
            className={`${styles.way} ${styles.wayRight}`}
            aria-labelledby="way-imported"
            onPointerMove={handlePointerMove}
            onMouseMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onMouseLeave={handlePointerLeave}
          >
            <h3 id="way-imported" className={`${styles.sign} ${styles.signRight}`}>
              Imported for you
            </h3>

            <div
              ref={sceneRightRef}
              className={styles.wayScene}
              onPointerMove={handlePointerMove}
              onMouseMove={handlePointerMove}
            >
              {/* Interactive Flight Canvas */}
              <div className={styles.flightCanvas}>
                <svg
                  viewBox="0 0 660 300"
                  role="img"
                  aria-label="A plane bringing a Korean Teacup puppy from Korea to Dubai"
                >
                  <defs>
                    <clipPath id="flight-porthole-clip">
                      <circle r="25" />
                    </clipPath>
                  </defs>

                  {/* Bezier Curved Flight Path */}
                  <path
                    ref={pathRef}
                    d="M40 250 C 170 40, 470 20, 620 168"
                    className={styles.flightRoute}
                  />

                  {/* Waypoint Dots & Hand-lettered City Labels */}
                  <circle cx="40" cy="250" r="7" className={styles.flightDot} />
                  <circle cx="620" cy="168" r="7" className={styles.flightDot} />
                  <text x="40" y="284" textAnchor="middle" className={styles.flightLabel}>
                    Korea
                  </text>
                  <text x="620" y="202" textAnchor="middle" className={styles.flightLabel}>
                    Dubai
                  </text>

                  {/* Tangent-Rotated Airplane Group */}
                  <g
                    ref={planeRef}
                    transform={planeTransform}
                    style={{ opacity: planeOpacity, transition: 'opacity 0.2s ease' }}
                  >
                    <g transform="translate(-126 -78)">
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" className={styles.flightWing} />
                      <path
                        d="M108 112 L142 156 L172 156 L158 112 Z"
                        className={`${styles.flightWing} ${styles.flightWingFar}`}
                      />
                      <path
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                        className={styles.flightBody}
                      />
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" className={styles.flightWing} />
                      <path d="M206 64 C215 67 221 73 224 80" className={styles.flightLine} />
                    </g>
                    {/* Porthole with puppy face */}
                    <g transform="translate(10 2)">
                      <image
                        href="/media/korean-teacup-maltipoo-female.jpg"
                        x="-25"
                        y="-25"
                        width="50"
                        height="50"
                        clipPath="url(#flight-porthole-clip)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="25" className={styles.flightPorthole} />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className={styles.wayText}>
              Exclusive Korean teacup puppies, delivered. Order from the world&#39;s most reputable breeders and let us handle the import.
            </p>
            <Link to="/puppies?origin=imported" className={`btn btn-primary ${styles.wayBtn}`}>
              See imported puppies
            </Link>
          </article>

          {/* Center Sitting Mascot Teddy */}
          <div className={styles.forkTeddy}>
            <MascotPup
              pose="sitting"
              facing="right"
              ariaLabel="Teddy sitting by the fork in the road"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
