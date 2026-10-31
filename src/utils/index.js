// ============================================================
// TeddyPups UAE — Utilities
// ============================================================

/**
 * Merge CSS class names, filtering falsy values.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format age in weeks to human-readable string.
 */
export function formatAge(weeks) {
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} old`;
  const months = Math.round(weeks / 4.33);
  return `${months} month${months !== 1 ? 's' : ''} old`;
}

/**
 * Capitalise the first letter of a string.
 */
export function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
