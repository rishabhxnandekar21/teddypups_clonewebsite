const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const rules = [];
const r1 = css.match(/[^{}]*tp-curtain[^{}]*\{[^{}]*\}/g) || [];
const r2 = css.match(/[^{}]*tp-runner[^{}]*\{[^{}]*\}/g) || [];
const kf = css.match(/@keyframes\s+tp-[^{}]*\{[^{}]*\{[^{}]*\}[^{}]*\}/g) || [];

console.log('--- CURTAIN RULES ---');
r1.forEach(r => console.log(r.trim()));
console.log('--- RUNNER RULES ---');
r2.forEach(r => console.log(r.trim()));
console.log('--- KEYFRAMES ---');
kf.filter(k => k.includes('trot') || k.includes('runner') || k.includes('curtain') || k.includes('print')).forEach(k => console.log(k.trim()));
