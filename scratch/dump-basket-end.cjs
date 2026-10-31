const fs = require('fs');
const html = fs.readFileSync('scratch/live-basket.html', 'utf8');

const idx = html.lastIndexOf('tp-basket__pup');
const after = html.slice(idx);
const endOfPup = after.indexOf('</div></div>') + 12;
console.log('--- REST OF BASKET ---');
console.log(after.slice(endOfPup));
