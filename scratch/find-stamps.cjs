const fs = require('fs');

const html = fs.readFileSync('scratch/scene3-passport.html', 'utf8');
const idx = html.indexOf('tp-stamp');
console.log('Index of tp-stamp:', idx);
if (idx !== -1) {
  console.log(html.slice(idx - 50, idx + 2000));
}
