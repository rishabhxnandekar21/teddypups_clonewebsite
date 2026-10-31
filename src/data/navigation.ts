// ============================================================
// TeddyPups UAE — Navigation Links
// Verified labels from reference site header
// ============================================================

import type { NavLink } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Puppies', href: '/puppies' },
  { label: 'Gone Home', href: '/gone-home' },
  { label: 'Happy Families', href: '/happy-families' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

// Business contact constants — VERIFIED, do not alter
export const BUSINESS = {
  phone: '+971 54 167 6733',
  whatsappUrl:
    "https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.",
  email: 'teddypupsadmin@gmail.com',
  address: 'Downtown Dubai, United Arab Emirates',
  instagram: 'https://www.instagram.com/teddypups.worldwide/',
  tiktok: 'https://www.tiktok.com/@teddypupsuae',
  facebook: 'https://www.facebook.com/profile.php?id=61567496944539',
} as const;
