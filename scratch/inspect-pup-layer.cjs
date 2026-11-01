const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*pup-layer[^{}]*\{[^{}]*\}/g) || [];
console.log('--- PUP-LAYER RULES ---');
matches.forEach(m => console.log(m.trim()));

const actorMatches = css.match(/[^{}]*pup-actor[^{}]*\{[^{}]*\}/g) || [];
console.log('\n--- PUP-ACTOR RULES ---');
actorMatches.forEach(m => console.log(m.trim()));

const printMatches = css.match(/[^{}]*pup-prints[^{}]*\{[^{}]*\}/g) || [];
console.log('\n--- PUP-PRINTS RULES ---');
printMatches.forEach(m => console.log(m.trim()));
