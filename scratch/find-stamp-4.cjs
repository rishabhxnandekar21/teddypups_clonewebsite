const fs = require('fs');

const html = fs.readFileSync('scratch/scene3-passport.html', 'utf8');
const idx = html.indexOf('Support 24/7');
console.log(html.slice(idx, idx + 1000));
