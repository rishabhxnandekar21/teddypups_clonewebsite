// ============================================================
// TeddyPups UAE — Shared TypeScript Types
// ============================================================

// ── Puppy Listing ──────────────────────────────────────────

export type Gender = 'male' | 'female';
export type PuppyStatus = 'available' | 'reserved' | 'gone-home';
export type PuppyOrigin = 'local' | 'imported';

export interface Puppy {
  slug: string;
  name: string;
  breed: string;
  gender: Gender;
  ageWeeks: number;
  origin: PuppyOrigin;
  hasVideo: boolean;
  images: string[];       // paths under /media/
  status: PuppyStatus;
  price?: number;         // AED — only if displayed on reference
  description?: string;
  features?: string[];    // e.g. ['vaccinated', 'microchipped', 'vet-checked']
}

// ── Alumni / Gone-Home ────────────────────────────────────

export type RouteType = 'local' | 'international';

export interface AlumniPuppy {
  id: string;
  name: string;
  breed: string;
  gender: Gender;
  routeType: RouteType;
  image?: string;         // optional — not all have photos
  destination?: string;   // e.g. 'Dubai', 'Riyadh'
}

// ── FAQ ───────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// ── Happy Families / Testimonials ─────────────────────────

export interface Testimonial {
  id: string;
  puppy?: string;         // puppy name if mentioned
  breed?: string;
  image: string;          // gallery image path
  caption?: string;
}

// ── Navigation ────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}
