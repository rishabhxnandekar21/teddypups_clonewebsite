const fs = require('fs');

const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

function extractRules(prefix) {
  const re = new RegExp(`[^{}]*${prefix}[^{}]*\\{[^{}]*\\}`, 'g');
  return (css.match(re) || []).map(r => r.trim());
}

console.log('=== HERO RULES ===');
extractRules('tp-hero').forEach(r => console.log(r));

console.log('=== MEET RULES (DOORS) ===');
extractRules('tp-meet').slice(0, 15).forEach(r => console.log(r));

console.log('=== PATHS RULES (AIRPLANE) ===');
extractRules('tp-plane').concat(extractRules('tp-paths')).forEach(r => console.log(r));

console.log('=== DUSK RULES (HAPPY FAMILIES BG) ===');
extractRules('tp-dusk').forEach(r => console.log(r));

console.log('=== HOME/FOOTER RULES (BASKET) ===');
extractRules('tp-home').concat(extractRules('tp-basket')).forEach(r => console.log(r));
