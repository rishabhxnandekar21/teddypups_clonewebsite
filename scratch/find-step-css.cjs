const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const r = css.match(/[^{}]*tp-step[^{}]*\{[^{}]*\}/g) || [];
r.forEach(x => console.log(x.trim()));
