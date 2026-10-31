const fs = require('fs');
const html = fs.readFileSync('scratch/live-basket.html', 'utf8');

const idx = html.indexOf('tp-basket__pup');
const after = html.slice(idx);
console.log('After tp-basket__pup length:', after.length);
// print from 1000 characters to end
console.log(after.slice(after.indexOf('</svg></div></div>') + 18));
