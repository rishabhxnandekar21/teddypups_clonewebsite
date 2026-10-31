const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const matches = css.match(/[^{}]*tp-meet[^{}]*\{[^{}]*\}/g) || [];
console.log('--- TP-MEET RULES ---');
matches.forEach(m => console.log(m.trim()));
