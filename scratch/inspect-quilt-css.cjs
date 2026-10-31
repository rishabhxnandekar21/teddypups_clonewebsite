const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*tp-quilt[^{}]*\{[^{}]*\}/g) || [];
console.log('--- TP-QUILT RULES ---');
matches.forEach(m => console.log(m.trim()));

console.log('\n--- TP-HERO RULES ---');
const heroMatches = css.match(/[^{}]*tp-hero[^{}]*\{[^{}]*\}/g) || [];
heroMatches.forEach(m => console.log(m.trim()));
