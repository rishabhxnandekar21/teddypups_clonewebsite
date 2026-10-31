import styles from './PassportBook.module.css';

const STAMPS = [
  {
    id: 'vet',
    title: 'Vet-checked & healthy',
    text: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
    shape: styles.stampRound,
    color: '#a24a1a',
    tilt: '-8deg',
    svg: (
      <>
        <path d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 30h7l3-7 4 13 3-6h7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'flight',
    title: 'Korea to Dubai, safely',
    text: 'Trusted breeders, safe travel, and premium care from start to finish.',
    shape: styles.stampTicket,
    color: '#1f6b45',
    tilt: '5deg',
    svg: (
      <>
        <path d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 50c10 4 20 4 30 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7" />
      </>
    ),
  },
  {
    id: 'support',
    title: 'Support 24/7',
    text: 'Always here to help, from choosing your puppy to post-delivery support.',
    shape: styles.stampOval,
    color: '#5a3a28',
    tilt: '-4deg',
    svg: (
      <>
        <path d="M10 14h44v28H30l-12 10v-10h-8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 28h0M32 28h0M42 28h0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'worldwide',
    title: 'Trusted by families worldwide',
    text: 'Puppies delivered to loving homes all around the world.',
    shape: styles.stampScallop,
    color: '#c2622b',
    tilt: '7deg',
    svg: (
      <>
        <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function PassportBook() {
  return (
    <section className={styles.passportSection} aria-labelledby="trust-title">
      <div className="container">
        <div className={styles.book} role="region" aria-label="Puppy Passport and Trust Guarantee Stamps">
          {/* ── Left Page: Storybook Title & Mascot ── */}
          <div className={`${styles.bookPage} ${styles.pageLeft}`}>
            <p aria-hidden="true" className={styles.bookKicker}>
              puppy passport
            </p>
            <h2 id="trust-title" className={styles.bookTitle}>
              Why families trust TeddyPups
            </h2>
            <p className={styles.bookBody}>
              Every puppy is covered with full veterinary certification, UAE MOCCAE import permits, ISO standard microchips, and a comprehensive health warranty before leaving our care.
            </p>

            <div className={styles.bookTeddy} aria-hidden="true">
              <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sitting Puppy Silhouette / Mascot */}
                <ellipse cx="80" cy="130" rx="55" ry="8" fill="#2a170e" opacity="0.15" />
                <circle cx="80" cy="70" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                {/* Ears */}
                <ellipse cx="44" cy="54" rx="14" ry="24" fill="#e4a352" stroke="#2a170e" strokeWidth="3" transform="rotate(-15 44 54)" />
                <ellipse cx="116" cy="54" rx="14" ry="24" fill="#e4a352" stroke="#2a170e" strokeWidth="3" transform="rotate(15 116 54)" />
                {/* Eyes */}
                <circle cx="68" cy="66" r="5" fill="#2a170e" />
                <circle cx="69.5" cy="64.5" r="1.5" fill="#fff" />
                <circle cx="92" cy="66" r="5" fill="#2a170e" />
                <circle cx="93.5" cy="64.5" r="1.5" fill="#fff" />
                {/* Snout & Nose */}
                <ellipse cx="80" cy="80" rx="14" ry="10" fill="#fbe3b4" />
                <polygon points="76,75 84,75 80,80" fill="#2a170e" />
                {/* Collar */}
                <path d="M58 98 Q80 106 102 98" stroke="#a24a1a" strokeWidth="5" strokeLinecap="round" fill="none" />
                <circle cx="80" cy="104" r="4" fill="#f2be6b" stroke="#2a170e" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* ── Right Page: 4 Rubber Guarantee Stamps with text ── */}
          <ul className={`${styles.bookPage} ${styles.pageRight}`}>
            {STAMPS.map((stamp, i) => (
              <li
                key={stamp.id}
                className={styles.entry}
                style={{
                  '--ink-stamp': stamp.color,
                  '--tilt': stamp.tilt,
                  '--i': i,
                }}
              >
                <span className={`${styles.stamp} ${stamp.shape}`}>
                  <svg viewBox="0 0 64 64" className={styles.stampIcon} aria-hidden="true">
                    {stamp.svg}
                  </svg>
                  <span className={styles.stampTitle}>{stamp.title}</span>
                </span>
                <p className={styles.entryText}>{stamp.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── City Skyline Horizon at Bottom ── */}
      <div aria-hidden="true" className={styles.horizon}>
        <span className={styles.sun}></span>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className={styles.city}>
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
}
