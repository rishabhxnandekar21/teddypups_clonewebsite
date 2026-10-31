import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PawIcon from '../components/common/PawIcon.jsx';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found — TeddyPups UAE';
  }, []);

  return (
    <main
      className="container section-pad text-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        gap: '1.25rem',
      }}
    >
      <PawIcon size={56} color="var(--color-toffee)" />
      <span className="section-eyebrow">lost pup alert!</span>
      <h1 className="section-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
        404 — Page Not Found
      </h1>
      <p className="section-subheading" style={{ maxWidth: '46ch', marginInline: 'auto' }}>
        This page seems to have wandered off for a walk. Don't worry, let's get you back home or help you find your new best friend!
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
        <Link to="/puppies" className="btn btn-outline btn-lg">
          Browse Available Puppies
        </Link>
      </div>
    </main>
  );
}
