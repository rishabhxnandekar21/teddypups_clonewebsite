const fs = require('fs');
const html = fs.readFileSync('scratch/live-homepage.html', 'utf8');

const idx = html.indexOf('pup-layer');
console.log('pup-layer found in live-homepage.html?', idx);
if (idx !== -1) {
  console.log(html.slice(idx, idx + 1500));
}
