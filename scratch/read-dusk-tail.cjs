const fs = require('fs');
const html = fs.readFileSync('scratch/ref_dusk_full.html', 'utf8');

const lastLiIndex = html.lastIndexOf('</li>');
console.log('After last </li>:');
console.log(html.substring(lastLiIndex + 5));
