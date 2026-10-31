const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*tp-basket[^{}]*\{[^{}]*\}/g) || [];
console.log('--- TP-BASKET RULES ---');
matches.forEach(m => console.log(m.trim()));
