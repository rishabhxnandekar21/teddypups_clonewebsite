const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*tp-flight[^{}]*\{[^{}]*\}/g) || [];
console.log('--- TP-FLIGHT RULES ---');
matches.forEach(m => console.log(m.trim()));

const pathsMatches = css.match(/[^{}]*tp-paths[^{}]*\{[^{}]*\}/g) || [];
console.log('\n--- TP-PATHS RULES ---');
pathsMatches.forEach(m => console.log(m.trim()));
