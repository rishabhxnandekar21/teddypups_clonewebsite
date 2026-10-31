const fs = require('fs');
const css = fs.readFileSync('scratch/reference-full.css', 'utf8');

const names = [
  'tp-curtain-lift',
  'tp-curtain-cover',
  'tp-runner-x',
  'tp-print-step',
  'tp-runner-leg-a',
  'tp-runner-leg-b',
  'tp-runner-bob',
  'tp-runner-wag',
  'tp-runner-ear'
];

names.forEach(name => {
  const re = new RegExp(`@keyframes\\s+${name}[^{]*\\{[\\s\\S]*?\\n?\\}`, 'g');
  const match = css.match(new RegExp(`@keyframes\\s+${name}[\\s\\S]*?}\\s*}`, 'g'));
  if (match) {
    console.log(`\n=== ${name} ===`);
    console.log(match[0]);
  } else {
    // simpler match
    const idx = css.indexOf(`@keyframes ${name}`);
    if (idx !== -1) {
      console.log(`\n=== ${name} (from index ${idx}) ===`);
      console.log(css.slice(idx, idx + 400));
    }
  }
});
