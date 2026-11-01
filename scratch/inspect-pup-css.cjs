const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*\.pup-[^{}]*\{[^{}]*\}/g) || [];
console.log('--- ALL PUP RULES ---');
matches.forEach(m => console.log(m.trim()));
