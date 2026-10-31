const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const idx = html.indexOf('tp-basket');
console.log('tp-basket found at:', idx);
const slice = html.slice(idx, idx + 12000);
const frontIdx = slice.indexOf('tp-basket__front');
console.log('tp-basket__front in slice?', frontIdx);
if (frontIdx !== -1) {
  console.log(slice.slice(frontIdx - 50, frontIdx + 800));
} else {
  // list all class occurrences
  const classes = slice.match(/class="[^"]*basket[^"]*"/g);
  console.log('Classes found:', classes);
}
